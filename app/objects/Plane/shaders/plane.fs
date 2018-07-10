uniform sampler2D tCanvas;
uniform sampler2D tPreviousCanvas;

varying vec2 vUv;

void main() {

  vec4 firstTexture = texture2D(tCanvas, vUv);
  vec4 previousTexture = texture2D(tPreviousCanvas, vUv);

  vec3 color = firstTexture.rgb - previousTexture.rgb;
  float alpha = 1.;

  gl_FragColor = vec4(color, alpha);
}
