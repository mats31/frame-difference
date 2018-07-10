import * as THREE from 'three';
import Plane from './objects/Plane/Plane';
const OrbitControls = require( 'three-orbit-controls' )( THREE );

export default class Webgl {
  constructor( width, height ) {
    this.params = {};

    this.scene = new THREE.Scene();

    // this.camera = new THREE.PerspectiveCamera( 50, width / height, 1, 1000 );
    // this.camera.position.z = 100;

    this.camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
    this.camera.position.z = 1;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( width, height );
    this.renderer.setClearColor( 0x262626 );

    this.controls = new OrbitControls( this.camera );

    this.composer = null;

    this._plane = new Plane();
    this._plane.position.set( 0, 0, 0 );
    this._plane.scale.set(window.innerWidth, window.innerHeight, 1);
    this.scene.add( this._plane );
  }

  // State --------

  setCanvas(canvas, previousCanvas, previousCanvas2) {
    this._plane.setFirstCanvas(canvas);
    this._plane.setPreviousCanvas(previousCanvas);
    this._plane.setPreviousCanvas2(previousCanvas2);
  }

  resize( width, height ) {
    if ( this.composer ) {
      this.composer.setSize( width, height );
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }

  render() {
    this.renderer.render( this.scene, this.camera );

    this._plane.update();
  }
}
