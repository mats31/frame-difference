import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import createCanvas from './utils/canvas/createCanvas';
import resizeCanvas from './utils/canvas/resizeCanvas';
import 'gsap';

let webgl;
let gui;

// canvas settings
const ctx = createCanvas(512, 512, false, 1);
ctx.canvas.style.position = 'absolute';
ctx.canvas.style.left = '0px';
ctx.canvas.style.top = '0px';
// document.body.appendChild( ctx.canvas );

const previousCtx = createCanvas(512, 512, false, 1);
previousCtx.canvas.style.position = 'absolute';
previousCtx.canvas.style.right = '0px';
previousCtx.canvas.style.top = '0px';
// document.body.appendChild( previousCtx.canvas );

const previousCtx2 = createCanvas(512, 512, false, 1);

// video settings
const video = document.createElement('video');
const videoData = [];

// webgl settings
webgl = new Webgl( window.innerWidth, window.innerHeight );
document.body.appendChild( webgl.renderer.domElement );

// GUI settings
gui = new dat.GUI();

function resizeHandler() {
  webgl.resize( window.innerWidth, window.innerHeight );
}

function updateCanvas() {
  ctx.drawImage(video, 0, 0, 512, 512);

  videoData.push(ctx.getImageData(0, 0, 512, 512));

  if (videoData.length > 20) {
    videoData.shift();
  }

  previousCtx.putImageData(videoData[0], 0, 0, 0, 0, 512, 512);
  if (videoData[10]) {
    previousCtx2.putImageData(videoData[10], 0, 0, 0, 0, 512, 512);
  }
}

function animate() {
  raf( animate );

  updateCanvas();

  webgl.render();
}

function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function handleSuccess(stream) {
  video.srcObject = stream;
  video.play();
}

function handleError(error) {
  console.error('Reeeejected!', error);
}

function startUserMedia() {
    const constraints = { video: true };
    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);

    webgl.setCanvas(ctx.canvas, previousCtx.canvas, previousCtx2.canvas);
}

// handle resize
window.addEventListener( 'resize', resizeHandler );

// let's play !
animate();



if (hasGetUserMedia()) {
  // Good to go!
  startUserMedia();
} else {
  alert('getUserMedia() is not supported by your browser');
}

setTimeout(() => {
  console.log(videoData);
}, 2000);
