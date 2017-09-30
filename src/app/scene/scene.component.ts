import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {DataService} from '../DataHandlers/DataService';
declare let require: any;
const OrbitControls = require('three-orbit-controls')(THREE);

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements AfterViewInit {

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private grid: THREE.GridHelper;
  private axis: THREE.AxisHelper;
  private controls: any;
  private spotLight: THREE.SpotLight;
  @ViewChild('canvas')
  private canvasRef: ElementRef;
  @Input() fov = 45;
  @Input() nearClip = 0.1;
  @Input() farClip = 100000;
  @Input() camera_x = 400;
  @Input() camera_y = 150;
  @Input() camera_z = 400;

  constructor(private _dataService: DataService) { }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private getAspectRatio(): number {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private createScene(): void {
    const aspectRatio = this.getAspectRatio();
    const cameraPosition = new THREE.Vector3(this.camera_x,
      this.camera_y,
      this.camera_z);

    /* Scene */
    this.scene = new THREE.Scene();

    /* Camera */
    this.camera = new THREE.PerspectiveCamera(this.fov,
      aspectRatio,
      this.nearClip,
      this.farClip);
    this.camera.position.copy(cameraPosition);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    /* Grid */
    this.grid = new THREE.GridHelper(500, 100, 0xffffff, 0x000000);
    this.grid.material.opacity = 0.08;
    this.grid.material.transparent = true;

    /* Axis */
    this.axis = new THREE.AxisHelper(200);

    /* orbit controls */
    this.controls = new OrbitControls(this.camera, this.canvas);

    /* ambient light */
    const ambientLight = new THREE.AmbientLight( 0xffffff, 1);

    /* Spot light */

    this.spotLight = new THREE.SpotLight( 0xffffff, 1);
    this.spotLight.decay = 2;
    this.spotLight.angle = Math.PI / 2;

    /* Adding ambient light, grid, axis to scene */
    this.scene.add(this.spotLight, ambientLight, this.grid, this.axis);

  }

  private startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias:true});
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    const component: SceneComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.renderer.render(component.scene, component.camera);
    }());
  }

  /**
   * Update scene after resizing.
   */
  public onResize() {
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
  }

  public getScene(): THREE.Scene {
    return this.scene;
}

  public ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
    this._dataService.scene = this.scene;
    this._dataService.renderer = this.renderer;
    }

}
