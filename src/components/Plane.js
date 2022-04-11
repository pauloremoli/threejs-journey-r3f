import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color } from "three";

const vertexShader = `
    uniform vec2 uFrequency;
    uniform float uTime;
    uniform vec3 uColor;

    varying vec2 vUv;
    varying float vElevation;

    void main() {
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
      vUv = uv;
    }
`;

const fragmentShader = `
    #define PI 3.1415926535897932384626433832795
    
    uniform vec3 uColor;
    
    varying vec2 vUv;

    float random(vec2 st)
    {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    vec2 rotate(vec2 uv, float rotation, vec2 mid)
    {
        return vec2(
          cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
          cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
        );
    }

    //	Classic Perlin 3D Noise 
    //	by Stefan Gustavson
    //
    vec2 fade(vec2 t) {
        return t*t*t*(t*(t*6.0-15.0)+10.0);
    }

    vec4 permute(vec4 x)
    {
        return mod(((x*34.0)+1.0)*x, 289.0);
    }

    float cnoise(vec2 P){
        vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
        vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
        Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
        vec4 ix = Pi.xzxz;
        vec4 iy = Pi.yyww;
        vec4 fx = Pf.xzxz;
        vec4 fy = Pf.yyww;
        vec4 i = permute(permute(ix) + iy);
        vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
        vec4 gy = abs(gx) - 0.5;
        vec4 tx = floor(gx + 0.5);
        gx = gx - tx;
        vec2 g00 = vec2(gx.x,gy.x);
        vec2 g10 = vec2(gx.y,gy.y);
        vec2 g01 = vec2(gx.z,gy.z);
        vec2 g11 = vec2(gx.w,gy.w);
        vec4 norm = 1.79284291400159 - 0.85373472095314 * 
          vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
        g00 *= norm.x;
        g01 *= norm.y;
        g10 *= norm.z;
        g11 *= norm.w;
        float n00 = dot(g00, vec2(fx.x, fy.x));
        float n10 = dot(g10, vec2(fx.y, fy.y));
        float n01 = dot(g01, vec2(fx.z, fy.z));
        float n11 = dot(g11, vec2(fx.w, fy.w));
        vec2 fade_xy = fade(Pf.xy);
        vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
        float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
        return 2.3 * n_xy;
    }

    //	end Classic Perlin 3D Noise 

    void main() {
      
      float strength = vUv.x;
      
      // pattern 1 - gradiant blue/pink/white
      // gl_FragColor = vec4(vUv, 1, 1);

      
      // pattern 2 - gradiant green/red/black
      // gl_FragColor = vec4(vUv, 0, 1);

      // pattern 3 - gray scale black/white x
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 4 - gray scale white/black y
      // strength = vUv.y;
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 5 - gray scale black/white y
      // strength = 1.0 - vUv.y;
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 6 - gray scale mostly white y
      // strength = vUv.y * 10.0;
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 7 - repeating pattern gray scale white/black y
      // strength = mod(vUv.y * 10.0, 1.0);
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 8 - repeating pattern gray scale white/black y
      // strength = mod(vUv.y * 10.0, 1.0) < 0.5 ? 0. : 1.0;
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 8 - repeating pattern white/black y with step
      // strength = mod(vUv.y * 10.0, 1.0) < 0.5 ? 0. : 1.0;
      // strength = step(0.5, strength);
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 9 - repeating pattern small stripes white/black y
      // strength = mod(vUv.y * 10.0, 1.0);
      // strength = step(0.8, strength);
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 10 - repeating pattern small stripes white/black x
      // strength = mod(vUv.x * 10.0, 1.0);
      // strength = step(0.8, strength);
      // gl_FragColor = vec4(strength, strength, strength, 1);
      
      // pattern 11 - grid
      // strength = step(0.8, mod(vUv.y * 10.0, 1.0));
      // strength += step(0.8, mod(vUv.x * 10.0, 1.0));
      // gl_FragColor = vec4(strength, strength, strength, 1);
      
      // pattern 12 - dots
      // strength = step(0.8, mod(vUv.y * 10.0, 1.0));
      // strength *= step(0.8, mod(vUv.x * 10.0, 1.0));
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 13 - minus
      // strength = step(0.4, mod(vUv.x * 10.0, 1.0));
      // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
      // gl_FragColor = vec4(strength, strength, strength, 1);
      
      
      // pattern 14 - combine minus pattern x and y
      
      // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
      // barX *= step(0.8, mod(vUv.y * 10.0, 1.0));

      // float barY = step(0.8, mod(vUv.x * 10.0, 1.0));
      // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));
      // strength = barX + barY;
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 15 - cross
      
      // float barX = step(0.4, mod(vUv.x * 10.0 , 1.0));
      // barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));

      // float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
      // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));
      // strength = barX + barY;
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 16 - gray scale gradiant black in the center
      // strength = abs(vUv.x - 0.5);
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 17 - cross with gradiant
      // strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 18 - gradiant with x in black
      // strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 19 - black square in the middle
      // strength =  step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 20 - intersection between two squares
      // float square1 =  step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
      // float square2 =  1. - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
      // strength = square1 * square2;
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 21 - gray scale gradient with 10  
      // strength =  floor(vUv.x * 10.) / 10.;
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 22 - gray scale gradient with 10 slices in both axis
      // strength =  floor(vUv.x * 10.) / 10.;
      // strength *=  floor(vUv.y * 10.) / 10.;
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 23 - random value
      // strength = random(vUv);
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 24 - random value 10x10 grid
      // vec2 gridUv = vec2(floor(vUv.x * 10.) / 10., floor(vUv.y * 10.) / 10.);
      // strength = random(gridUv);
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 24 - twisted 10x10 grid
      // vec2 gridUv = vec2(floor(vUv.x * 10.) / 10., floor((vUv.y + vUv.x  * 0.5) * 10.) / 10.);
      // strength = random(gridUv);
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 25 - dark corner
      // strength =  length(vUv);
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 26 - circle
      // strength =  length(vUv - 0.5);
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 27 - circle in the corner
      // strength =  distance(vUv, vec2(0.2, 0.8));
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 28 - white circle in the middle
      // strength =  1. - distance(vUv, vec2(0.5));
      // gl_FragColor = vec4(strength, strength, strength, 1);


      
      // pattern 29 - small bright circle
      // strength =  0.015 / distance(vUv, vec2(0.5));
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 30 - stretched bright circle
      // vec2 lightUv = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);
      // strength =  0.015 / distance(lightUv, vec2(0.5));
      // gl_FragColor = vec4(strength, strength, strength, 1);


      // pattern 31 - bright star
      // vec2 lightUvX = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);
      // float strengthX =  0.015 / distance(lightUvX, vec2(0.5));

      // vec2 lightUvY = vec2(vUv.y * 0.1 + 0.45, vUv.x * 0.5 + 0.25);
      // float strengthY =  0.015 / distance(lightUvY, vec2(0.5));

      // strength = strengthX * strengthY;
      // gl_FragColor = vec4(strength, strength, strength, 1);


      // pattern 32 - rotated bright star
      // vec2 rotatedUv = rotate(vUv, PI * 0.25, vec2(0.5));
      // vec2 lightUvX = vec2(rotatedUv.x * 0.1 + 0.45, rotatedUv.y * 0.5 + 0.25);
      // float strengthX =  0.015 / distance(lightUvX, vec2(0.5));

      // vec2 lightUvY = vec2(rotatedUv.y * 0.1 + 0.45, rotatedUv.x * 0.5 + 0.25);
      // float strengthY =  0.015 / distance(lightUvY, vec2(0.5));

      // strength = strengthX * strengthY;
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 33 - black circle on white 
      // strength =  step(0.25, length(vUv - 0.5));
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 34 - black circle with gradient
      // strength =  abs(distance(vUv, vec2(0.5)) - 0.25);
      // gl_FragColor = vec4(strength, strength, strength, 1);
      
      // pattern 35 - thin circle 
      // strength =  step(0.01, abs(length(vUv - 0.5) - 0.25));
      // gl_FragColor = vec4(strength, strength, strength, 1);
      
      // pattern 36 - thin white circle 
      // strength =  1. - step(0.01, abs(length(vUv - 0.5) - 0.25));
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 37 - distorted white circle
      // vec2 wavedUv = vec2(vUv.x, vUv.y + sin(vUv.x * 30. ) * 0.1);
      // strength =  1. - step(0.01, abs(length(wavedUv - 0.5) - 0.25));
      // gl_FragColor = vec4(strength, strength, strength, 1);


      // pattern 38 - distorted white circle both axis
      // vec2 wavedUv = vec2(vUv.x + sin(vUv.y * 30.) * 0.1, vUv.y + sin(vUv.x * 30. ) * 0.1);
      // strength =  1. - step(0.01, abs(length(wavedUv - 0.5) - 0.25));
      // gl_FragColor = vec4(strength, strength, strength, 1);


      // pattern 39 - distorted white circle both axis
      // vec2 wavedUv = vec2(vUv.x + sin(vUv.y * 100.) * 0.1, vUv.y + sin(vUv.x * 100. ) * 0.1);
      // strength =  1. - step(0.01, abs(length(wavedUv - 0.5) - 0.25));
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 40 - gradiant with an angle
      // strength = atan(vUv.x, vUv.y);
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 41 - gradiant with an angle from center
      // strength = atan(vUv.x -.5, vUv.y - 0.5);
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 42 - 360 gradiant from center
      // strength = atan(vUv.x -.5, vUv.y - 0.5);
      // strength /= PI * 2.;
      // strength += 0.5;
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 43 - 360 gradiant from center with 20 slices
      // strength = atan(vUv.x -.5, vUv.y - 0.5);
      // strength /= PI * 2.;
      // strength += 0.5;
      // strength = mod(strength * 20., 1.);
      // gl_FragColor = vec4(strength, strength, strength, 1);
      
      // pattern 44 - 20 slices from center black/white
      // strength = atan(vUv.x -.5, vUv.y - 0.5);
      // strength /= PI * 2.;
      // strength += 0.5;
      // strength = sin(strength * 100.);
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 45 - thin circle with sinusoid
      // float angle = atan(vUv.x -.5, vUv.y - 0.5);
      // angle /= PI * 2.;
      // angle += 0.5;
      // float sinusoid = sin(angle * 100.);
      
      // float radius = 0.25 + sinusoid * 0.02;
      // strength =  1. - step(0.01, abs(length(vUv - 0.5) - radius));
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 46 - perlin noise
      // strength = cnoise(vUv * 10.);
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 47 - perlin noise black/white
      // strength = step(0., cnoise(vUv * 10.));
      // gl_FragColor = vec4(strength, strength, strength, 1);

      // pattern 48 - perlin noise white
      // strength = 1. - abs(cnoise(vUv * 10.));
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 49 - perlin noise with sin
      // strength = sin(cnoise(vUv * 10.) * 20.);
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 50 - perlin noise with sin and step
      // strength = step(0.9, sin(cnoise(vUv * 10.) * 20.));
      // gl_FragColor = vec4(strength, strength, strength, 1);

      
      // pattern 50 - mixing color with the shapes
      strength = step(0.9, sin(cnoise(vUv * 10.) * 20.));
      strength = clamp(strength, 0., 1.);
      vec3 blackColor = vec3(0.);
      vec3 uvColor = vec3(vUv, 0.2);
      vec3 mixedColor = mix(blackColor, uvColor, strength);
      gl_FragColor = vec4(mixedColor, 1);
    }
`;

const Plane = (props) => {
  // const { uFrequency } = useControls({ uFrequency: { x: 10, y: 5 } });
  const ref = useRef();

  useFrame(({ clock }) => {});

  const data = useMemo(
    () => ({
      fragmentShader,
      vertexShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color("orange") },
      },
    }),
    []
  );

  return (
    <mesh ref={ref} {...props}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial attach="material" {...data} />
    </mesh>
  );
};

export default Plane;
