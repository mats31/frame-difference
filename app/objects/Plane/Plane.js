import * as THREE from 'three';
const glsl = require('glslify');

export default class Plane extends THREE.Object3D {
  constructor() {
    super();

    this._geometry = new THREE.PlaneBufferGeometry( 1, 1, 1, 1 );

    this._uniforms = {
      tCanvas: { type: 't', value: null },
      tPreviousCanvas: { type: 't', value: null },
    };

    this._material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: this._uniforms,
      vertexShader: glsl.file('./shaders/plane.vs'),
      fragmentShader: glsl.file('./shaders/plane.fs'),
    });

    this._mesh = new THREE.Mesh( this._geometry, this._material );

    this.add( this._mesh );
  }

  setFirstCanvas(canvas) {
    this._uniforms.tCanvas.value = new THREE.Texture(canvas);
    this._uniforms.tCanvas.value.needsUpdate = true;
  }

  setPreviousCanvas(canvas) {
    this._uniforms.tPreviousCanvas.value = new THREE.Texture(canvas);
    this._uniforms.tPreviousCanvas.value.needsUpdate = true;
  }

  update() {
    if (this._uniforms.tCanvas.value) {
      this._uniforms.tCanvas.value.needsUpdate = true;
    }

    if (this._uniforms.tPreviousCanvas.value) {
      this._uniforms.tPreviousCanvas.value.needsUpdate = true;
    }
  }
}
