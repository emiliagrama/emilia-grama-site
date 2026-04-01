import { useEffect, useRef } from "react";

const vertexShader = `
precision mediump float;

varying vec2 vUv;
attribute vec2 a_position;

void main() {
  vUv = 0.5 * (a_position + 1.0);
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;
precision highp sampler2D;

varying vec2 vUv;
uniform sampler2D u_image_texture;
uniform float u_edge_thickness;
uniform float u_ratio;
uniform vec2 u_pointer_position;
uniform float u_img_ratio;
uniform float u_click_randomizer;
uniform float u_rotation;
uniform float u_effect;
uniform float u_effect_active;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

float random(float x) {
  return fract(sin(x * 12.9898) * 43758.5453);
}

float random2(vec2 p) {
  return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u * u * (3.0 - 2.0 * u);

  float res = mix(
    mix(random2(ip), random2(ip + vec2(1.0, 0.0)), u.x),
    mix(random2(ip + vec2(0.0, 1.0)), random2(ip + vec2(1.0, 1.0)), u.x),
    u.y
  );
  return res * res;
}

float get_sector_shape(float d, float a, float angle, float edges) {
  float angle1 = PI;
  float angle2 = angle1 + angle;

  float safeD = max(d, 0.0001);
  float edge1 = smoothstep(angle1 - edges / safeD, angle1 + edges / safeD, a);
  float edge2 = smoothstep(angle2 - edges / safeD, angle2 + edges / safeD, a);

  return edge1 * (1.0 - edge2);
}

float get_img_frame_alpha(vec2 uv, float img_frame_width) {
  float img_frame_alpha = smoothstep(0.0, img_frame_width, uv.x) * smoothstep(1.0, 1.0 - img_frame_width, uv.x);
  img_frame_alpha *= smoothstep(0.0, img_frame_width, uv.y) * smoothstep(1.0, 1.0 - img_frame_width, uv.y);
  return img_frame_alpha;
}

float get_simple_cracks(float a, float d, float n) {
  a *= (1.0 + sin(2.0 * a + PI + 2.0 * u_click_randomizer));
  float simple_cracks_number = 10.0;
  float simple_cracks_angle_step = TWO_PI / simple_cracks_number;
  float simple_crack_angle = mod(a + n + u_click_randomizer, simple_cracks_angle_step);
  float cracks_shape = 4.0 * abs(simple_crack_angle - 0.5 * simple_cracks_angle_step);
  cracks_shape = mix(cracks_shape, 1.0, smoothstep(0.9, 1.0, d));
  cracks_shape *= pow(d + 0.4 * u_click_randomizer * max(0.0, cos(2.0 * a + u_click_randomizer) * sin(1.0 * a)), 12.0);
  cracks_shape = (1.0 + n) * (1.0 + sin(4.0 * a)) * step(0.9, cracks_shape);
  return cracks_shape;
}

vec2 get_img_uv() {
  vec2 img_uv = vUv;
  img_uv -= 0.5;

  if (u_ratio > u_img_ratio) {
    img_uv.x = img_uv.x * u_ratio / u_img_ratio;
  } else {
    img_uv.y = img_uv.y * u_img_ratio / u_ratio;
  }

  float scale_factor = 1.08;
  img_uv *= scale_factor;
  img_uv += 0.5;
  img_uv.y = 1.0 - img_uv.y;
  img_uv = clamp(img_uv, 0.001, 0.999);

  return img_uv;
}

vec2 get_disturbed_uv(vec2 uv, float section_constant, float edge, vec2 direction, float border) {
  float img_distortion = 0.8 * u_effect * (section_constant - 0.5);
  vec2 disturbed_uv = uv;

  disturbed_uv += 2.0 * img_distortion;
  disturbed_uv.x -= mix(0.015 * edge * direction.x, -0.04 * edge, border);
  disturbed_uv.y -= mix(0.015 * edge * direction.y, -0.04 * edge, border);

  vec2 center = vec2(0.5, 0.5);
  disturbed_uv -= center;

  float cosA = cos(4.0 * img_distortion);
  float sinA = sin(4.0 * img_distortion);
  float perspective = 1.0 + img_distortion * disturbed_uv.y;

  disturbed_uv = vec2(
    perspective * (cosA * disturbed_uv.x - sinA * disturbed_uv.y),
    perspective * (sinA * disturbed_uv.x + cosA * disturbed_uv.y)
  );

  disturbed_uv += center;
  disturbed_uv = clamp(disturbed_uv, 0.001, 0.999);

  return disturbed_uv;
}

void main() {
  vec2 uv = vUv;
  uv.y = 1.0 - uv.y;
  uv.x *= u_ratio;

  vec2 pointer = u_pointer_position;
  vec2 diff = u_pointer_position - vec2(vUv.x, 1.0 - vUv.y);
  vec2 pointer_direction = normalize(diff + vec2(0.0001));
  pointer.x *= u_ratio;
  pointer = pointer - uv;

  float pointer_angle = atan(pointer.y, pointer.x);
  float pointer_distance = length(pointer);
  float pointer_distance_normalized = (1.0 - clamp(pointer_distance, 0.0, 1.0));

  vec3 color = vec3(0.0);
  vec2 img_uv = get_img_uv();

  float sector_constant = 0.0;
  float sector_start_angle = 0.0;
  float is_sector_edge = 0.0;
  float is_grid_edge = 0.0;
  float is_central_edge = 0.0;

  float angle_noise = 0.3 * noise(3.0 * img_uv);

  for (int i = 0; i < 12; i++) {
    float sector_seed = float(i) + u_click_randomizer + 2.0;

    float angle_normalised = mod((pointer_angle - sector_start_angle) / TWO_PI, 1.0);
    angle_normalised += 0.1 * angle_noise;

    float angle = angle_normalised * TWO_PI;
    float sector_size = (0.01 + 2.0 * random2(vec2(float(i) + u_click_randomizer, u_pointer_position.x)));
    sector_size = min(sector_size, TWO_PI - sector_start_angle);

    float thickness = u_edge_thickness * (0.2 + random(3.0 * sector_seed));
    thickness += angle_noise * 0.03 * pow(pointer_distance_normalized, 80.0);

    float shape = get_sector_shape(pointer_distance, angle, sector_size, thickness);
    is_sector_edge = max(is_sector_edge, smoothstep(0.6, 1.0, shape));
    sector_constant = mix(sector_constant, random(sector_seed), smoothstep(0.2, 0.8, shape));

    vec2 grid_uv = 2.0 * (0.8 + 0.5 * pointer_distance_normalized) * img_uv;
    float grid_noise = noise(grid_uv + sector_seed);
    float grid_thickness = (0.4 + 0.4 * random(10.0 * sector_seed)) * u_edge_thickness;
    float grid_shape = shape * smoothstep(0.27, 0.27 + grid_thickness, grid_noise);
    is_grid_edge += (smoothstep(0.1, 0.5, grid_shape) * smoothstep(0.9, 0.6, grid_shape));

    sector_constant = mix(sector_constant, random(sector_seed + 100.0), smoothstep(0.2, 0.8, grid_shape));

    vec2 central_grid_uv = img_uv * (3.0 + 3.0 * pow(pointer_distance_normalized, 10.0));
    float central_grid_noise = noise(central_grid_uv + sector_seed);
    float central_grid_thickness = (1.0 + 0.5 * random(-2.0 + sector_seed)) * u_edge_thickness;
    float central_grid_shape = step(0.7, shape) * smoothstep(0.27, 0.27 + central_grid_thickness, central_grid_noise);
    is_central_edge += (smoothstep(0.0, 0.5, central_grid_shape) * smoothstep(1.0, 0.5, central_grid_shape));
    is_central_edge *= step(0.8, pointer_distance_normalized);

    sector_constant = mix(sector_constant, random(sector_seed + 100.0), smoothstep(0.2, 0.8, central_grid_shape));
    sector_start_angle += sector_size;
  }

  float img_edge_alpha = get_img_frame_alpha(img_uv, 0.004);

  is_sector_edge = 1.0 - is_sector_edge;

  float cracks_edge = max(is_grid_edge, is_sector_edge);
  cracks_edge = max(cracks_edge, is_central_edge);

  float central_cracks = get_simple_cracks(pointer_angle, pointer_distance_normalized, angle_noise);
  cracks_edge += central_cracks;

  if (u_effect_active > 0.0) {
    img_uv = get_disturbed_uv(
      img_uv,
      sector_constant,
      cracks_edge,
      pointer_direction,
      get_img_frame_alpha(img_uv, 0.2)
    );
  }

  vec4 img = texture2D(u_image_texture, img_uv);
  color = img.rgb;
  color += 0.08 * u_effect_active * (sector_constant - 0.5);

  img_edge_alpha = get_img_frame_alpha(img_uv, 0.004);
  float opacity = img_edge_alpha;
  opacity -= 0.12 * u_effect_active * pow(is_grid_edge, 3.0);
  opacity -= 0.12 * u_effect_active * is_central_edge;
  opacity -= 0.02 * u_effect_active * pow(central_cracks, 4.0);

  gl_FragColor = vec4(color, opacity);
}
`;

export default function GlassBreakCanvas({ isActive = true }) {
  const canvasRef = useRef(null);
  const activeRef = useRef(isActive);

  useEffect(() => {
    activeRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let disposed = false;
    let rafId = null;
    let resizeObserver = null;
    let texture = null;
    let program = null;
    let vertex = null;
    let fragment = null;
    let image = null;
    let uniforms = {};

    const pointer = { x: 0.55, y: 0.5 };
    const params = {
      clickRandomizer: 0.332,
      distance: 0.015,
      effectOn: true,
      edgeThickness: 0.006,
      rotation: 0,
    };

    function safeUseProgram() {
      if (disposed || !program) return false;
      gl.useProgram(program);
      return true;
    }

    function createShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    }

    function createProgram() {
      vertex = createShader(gl.VERTEX_SHADER, vertexShader);
      fragment = createShader(gl.FRAGMENT_SHADER, fragmentShader);
      if (!vertex || !fragment) return null;

      const shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertex);
      gl.attachShader(shaderProgram, fragment);
      gl.linkProgram(shaderProgram);

      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(shaderProgram));
        gl.deleteProgram(shaderProgram);
        return null;
      }

      return shaderProgram;
    }

    function getUniformLocations(shaderProgram) {
      const result = {};
      const count = gl.getProgramParameter(shaderProgram, gl.ACTIVE_UNIFORMS);

      for (let i = 0; i < count; i += 1) {
        const info = gl.getActiveUniform(shaderProgram, i);
        result[info.name] = gl.getUniformLocation(shaderProgram, info.name);
      }

      return result;
    }

    function setupScene() {
      program = createProgram();
      if (!program) return false;

      if (!safeUseProgram()) return false;
      uniforms = getUniformLocations(program);

      const vertices = new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
         1,  1,
      ]);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      const positionLocation = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      return true;
    }

    function updateUniforms() {
      if (!safeUseProgram()) return;

      gl.uniform1f(uniforms.u_click_randomizer, params.clickRandomizer);
      gl.uniform1f(uniforms.u_rotation, params.rotation);
      gl.uniform1f(uniforms.u_effect, params.distance);
      gl.uniform1f(uniforms.u_effect_active, params.effectOn ? 1 : 0);
      gl.uniform1f(uniforms.u_edge_thickness, params.edgeThickness);
      gl.uniform2f(uniforms.u_pointer_position, pointer.x, pointer.y);
    }

    function resizeCanvas() {
      if (disposed || !image || !program) return;

      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);

      const imgRatio = image.naturalWidth / image.naturalHeight;

      if (!safeUseProgram()) return;
      gl.uniform1f(uniforms.u_ratio, canvas.width / canvas.height);
      gl.uniform1f(uniforms.u_img_ratio, imgRatio);
    }

    function stopRender() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    function render() {
      if (disposed) return;

      if (!activeRef.current) {
        rafId = requestAnimationFrame(render);
        return;
      }

      if (!safeUseProgram()) return;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      rafId = requestAnimationFrame(render);
    }

    function startRender() {
      if (!rafId && !disposed) {
        rafId = requestAnimationFrame(render);
      }
    }

    function loadTexture(src) {
      image = new Image();
      image.crossOrigin = "anonymous";

      image.onload = () => {
        if (disposed) return;

        texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

        if (!safeUseProgram()) return;
        gl.uniform1i(uniforms.u_image_texture, 0);

        resizeCanvas();
        updateUniforms();
        startRender();
      };

      image.onerror = () => {
        if (!disposed) {
          console.error("IMAGE FAILED TO LOAD:", src);
        }
      };

      image.src = src;
    }

    function handlePointerMove(event) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    pointer.x = (event.clientX - rect.left) / rect.width;
    pointer.y = (event.clientY - rect.top) / rect.height;
    updateUniforms();
    }

    function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    pointer.x = (event.clientX - rect.left) / rect.width;
    pointer.y = (event.clientY - rect.top) / rect.height;
    params.clickRandomizer = Math.random();
    updateUniforms();
    }

    const ok = setupScene();
    if (!ok) return;

    loadTexture("/images/universe/space-fracture.jpg");

    
    canvas.addEventListener("click", handleClick);

    resizeObserver = new ResizeObserver(() => {
      if (disposed) return;
      resizeCanvas();
      updateUniforms();
    });

    resizeObserver.observe(canvas);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      disposed = true;
      stopRender();

      resizeObserver?.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("click", handleClick);

      if (texture) gl.deleteTexture(texture);
      if (program) gl.deleteProgram(program);
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-showcase-canvas" />;
}