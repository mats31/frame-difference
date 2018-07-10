uniform sampler2D tCanvas;
uniform sampler2D tPreviousCanvas;
uniform sampler2D tPreviousCanvas2;

varying vec2 vUv;

void main() {

  vec4 firstTexture = texture2D(tCanvas, vUv);
  vec4 previousTexture = texture2D(tPreviousCanvas, vUv);
  vec4 previousTexture2 = texture2D(tPreviousCanvas2, vUv);

  // vec3 color = firstTexture.rgb - previousTexture.rgb + previousTexture2.rgb;
  // vec3 color = firstTexture.rgb - abs( ( firstTexture.rgb - previousTexture.rgb ) + ( firstTexture.rgb - previousTexture2.rgb ) );

  vec3 firstColor = mix( firstTexture.rgb, previousTexture.rgb, ( firstTexture.rgb - previousTexture.rgb ) );
  vec3 secondColor = mix( firstTexture.rgb, previousTexture2.rgb, ( firstTexture.rgb - previousTexture2.rgb ) );

  // vec3 color = firstTexture.rgb - previousTexture.rgb + firstTexture.rgb - previousTexture2.rgb;

  // vec3 color = firstTexture.rgb - previousTexture.rgb + firstTexture.rgb - secondColor.rgb;

  vec3 color = firstTexture.rgb - firstColor.rgb + firstTexture.rgb - secondColor.rgb;

  float alpha = 1.;

  gl_FragColor = vec4(color, alpha);
}
