import * as THREE from 'three'
import { gsap } from 'gsap'

const vertexShader = 'varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.);}'
const fragmentShader = `
varying vec2 vUv;
uniform sampler2D uTexture1, uTexture2;
uniform vec2 uResolution, uTexture1Size, uTexture2Size;
uniform float uProgress, uPhoto1Y, uPhoto2Y;

const float uGlobalIntensity = 1.0;
const float uSpeedMultiplier = 1.0;
const float uDistortionStrength = 1.0;
const float uGlassRefractionStrength = 1.0;
const float uGlassChromaticAberration = 1.0;
const float uGlassBubbleClarity = 1.0;
const float uGlassEdgeGlow = 1.0;
const float uGlassLiquidFlow = 1.0;

vec2 getCoverUV(vec2 uv, vec2 textureSize, float positionY) {
    vec2 scale = uResolution / textureSize;
    vec2 scaledSize = textureSize * max(scale.x, scale.y);
    vec2 offset = (uResolution - scaledSize) * vec2(0.5, 1.0 - positionY);
    return (uv * uResolution - offset) / scaledSize;
}

vec4 glassEffect(vec2 uv, float progress) {
    float time = progress * 5.0 * uSpeedMultiplier;
    vec2 uv1 = getCoverUV(uv, uTexture1Size, uPhoto1Y); vec2 uv2 = getCoverUV(uv, uTexture2Size, uPhoto2Y);
    float maxR = length(uResolution) * 0.85; float br = progress * maxR;
    vec2 p = uv * uResolution; vec2 c = uResolution * 0.5;
    float d = length(p - c); float nd = d / max(br, 0.001);
    float param = 1.0 - smoothstep(br - 3.0, br + 3.0, d); // Inside circle
    vec4 img;
    if (param > 0.0) {
         float ro = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity * pow(smoothstep(0.3 * uGlassBubbleClarity, 1.0, nd), 1.5);
         vec2 dir = (d > 0.0) ? (p - c) / d : vec2(0.0);
         vec2 distUV = uv2 - dir * ro;
         distUV += vec2(sin(time + nd * 10.0), cos(time * 0.8 + nd * 8.0)) * 0.015 * uGlassLiquidFlow * uSpeedMultiplier * nd * param;
         float ca = 0.02 * uGlassChromaticAberration * uGlobalIntensity * pow(smoothstep(0.3, 1.0, nd), 1.2);
         img = vec4(texture2D(uTexture2, distUV + dir * ca * 1.2).r, texture2D(uTexture2, distUV + dir * ca * 0.2).g, texture2D(uTexture2, distUV - dir * ca * 0.8).b, 1.0);
         if (uGlassEdgeGlow > 0.0) {
            float rim = smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd));
            img.rgb += rim * 0.08 * uGlassEdgeGlow * uGlobalIntensity;
         }
    } else { img = texture2D(uTexture2, uv2); }
    vec4 oldImg = texture2D(uTexture1, uv1);
    if (progress > 0.95) img = mix(img, texture2D(uTexture2, uv2), (progress - 0.95) / 0.05);
    return mix(oldImg, img, param);
}

void main() {
    gl_FragColor = glassEffect(vUv, uProgress);
}
`

export function playGlass(canvas: HTMLCanvasElement, from: HTMLImageElement, to: HTMLImageElement, fit?: { background: string; duration: number }) {
  if (!from.complete || !to.complete || !from.naturalWidth || !to.naturalWidth) return
  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
  } catch {
    return
  }
  const dimensions = canvas.getBoundingClientRect()
  const size = (img: HTMLImageElement) => new THREE.Vector2(
    fit ? dimensions.width : img.naturalWidth,
    fit ? dimensions.height : img.naturalHeight,
  )
  const vertical = (img: HTMLImageElement) => (parseFloat(getComputedStyle(img).objectPosition.split(' ')[1]) || 0) / 100
  const texture = (image: HTMLImageElement) => {
    const surface = document.createElement("canvas")
    surface.width = fit ? Math.round(dimensions.width) : image.naturalWidth
    surface.height = fit ? Math.round(dimensions.height) : image.naturalHeight
    const context = surface.getContext('2d')
    if (context && fit) {
      const scale = Math.min(surface.width / image.naturalWidth, surface.height / image.naturalHeight)
      const width = image.naturalWidth * scale
      const height = image.naturalHeight * scale
      context.fillStyle = fit.background
      context.fillRect(0, 0, surface.width, surface.height)
      context.drawImage(image, (surface.width - width) / 2, (surface.height - height) / 2, width, height)
    } else {
      context?.drawImage(image, 0, 0)
    }
    const result = new THREE.CanvasTexture(surface)
    result.minFilter = THREE.LinearFilter
    result.generateMipmaps = false
    return result
  }
  const a = texture(from)
  const b = texture(to)
  const geometry = new THREE.PlaneGeometry(2, 2)
  const uniforms = { uTexture1: { value: a }, uTexture2: { value: b }, uResolution: { value: new THREE.Vector2(dimensions.width, dimensions.height) }, uTexture1Size: { value: size(from) }, uTexture2Size: { value: size(to) }, uPhoto1Y: { value: vertical(from) }, uPhoto2Y: { value: vertical(to) }, uProgress: { value: 0 } }
  const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
  const scene = new THREE.Scene()
  const camera = new THREE.Camera()
  const mesh = new THREE.Mesh(geometry, material)
  mesh.frustumCulled = false
  scene.add(mesh)
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.setSize(dimensions.width, dimensions.height, false)
  renderer.render(scene, camera)
  canvas.style.opacity = '1'
  let disposed = false
  const release = () => {
    if (disposed) return
    disposed = true
    canvas.style.opacity = '0'
    geometry.dispose()
    material.dispose()
    a.dispose()
    b.dispose()
    renderer.dispose()
  }
  const tween = gsap.to(uniforms.uProgress, { value: 1, duration: fit?.duration ?? 2.5, ease: 'power2.inOut', onUpdate: () => renderer.render(scene, camera), onComplete: release })
  return () => { tween.kill(); release() }
}
