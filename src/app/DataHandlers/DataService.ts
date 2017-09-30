import * as THREE from 'three';
import {Injectable} from '@angular/core';

declare let require: any;
const MTLLoader = require('three-mtl-loader');
const OBJLoader = require('three-obj-loader')(THREE);

@Injectable()
export class DataService {
  get mtlLoader(): any {
    return this._mtlLoader;
  }

  set mtlLoader(value: any) {
    this._mtlLoader = value;
  }


  private _scene: THREE.Scene;
  private _renderer: THREE.WebGLRenderer;
  private _OBJLoader: THREE.OBJLoader;
  private _mtlLoader: any;


  constructor() {
    this.OBJLoader = new THREE.OBJLoader();
    this.mtlLoader = new MTLLoader();
  }

  get scene(): THREE.Scene {
    return this._scene;
  }

  set scene(value: THREE.Scene) {
    this._scene = value;
  }

  get renderer(): THREE.WebGLRenderer {
    return this._renderer;
  }

  set renderer(value: THREE.WebGLRenderer) {
    this._renderer = value;
  }

  get OBJLoader(): THREE.OBJLoader {
    return this._OBJLoader;
  }

  set OBJLoader(value: THREE.OBJLoader) {
    this._OBJLoader = value;
  }

}


