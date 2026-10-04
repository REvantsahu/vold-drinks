import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroThreeCanvasProps {
  accentColor: string;
}

export const HeroThreeCanvas: React.FC<HeroThreeCanvasProps> = ({ accentColor }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<string>(accentColor);
  colorRef.current = accentColor;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let cleanup = () => {};

    // 2D Canvas Engine: 60fps rising bubbles and floating crystal ice prisms
    const run2DFallback = () => {
      const canvas = document.createElement('canvas');
      canvas.width = container.clientWidth || window.innerWidth;
      canvas.height = container.clientHeight || window.innerHeight;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      container.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const bubbleCount = 45;
      const bubbles = Array.from({ length: bubbleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 2 + Math.random() * 5,
        speed: 0.6 + Math.random() * 1.5,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
      }));

      const iceCubes = [
        { x: canvas.width * 0.15, y: canvas.height * 0.35, size: 40, rot: 0.2, rotSpeed: 0.003 },
        { x: canvas.width * 0.82, y: canvas.height * 0.28, size: 48, rot: -0.4, rotSpeed: -0.002 },
        { x: canvas.width * 0.22, y: canvas.height * 0.75, size: 36, rot: 0.5, rotSpeed: 0.004 },
        { x: canvas.width * 0.78, y: canvas.height * 0.68, size: 44, rot: -0.2, rotSpeed: 0.003 },
      ];

      let animId: number;
      let tick = 0;

      const handleResize = () => {
        if (!container) return;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      };
      window.addEventListener('resize', handleResize);

      const render = () => {
        animId = requestAnimationFrame(render);
        tick += 0.015;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw rising fizzy bubbles
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1;

        bubbles.forEach((b) => {
          b.y -= b.speed;
          b.wobble += b.wobbleSpeed;
          const currentX = b.x + Math.sin(b.wobble) * 2;
          if (b.y < -10) {
            b.y = canvas.height + 10;
            b.x = Math.random() * canvas.width;
          }

          ctx.beginPath();
          ctx.arc(currentX, b.y, b.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Bubble specular glint
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.beginPath();
          ctx.arc(currentX - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.25, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        });

        // Draw floating crystal ice cubes
        iceCubes.forEach((cube, i) => {
          cube.rot += cube.rotSpeed;
          const floatY = cube.y + Math.sin(tick + i) * 12;

          ctx.save();
          ctx.translate(cube.x, floatY);
          ctx.rotate(cube.rot);

          // Glass cube body
          ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1.5;

          const s = cube.size;
          ctx.beginPath();
          ctx.roundRect(-s / 2, -s / 2, s, s, 6);
          ctx.fill();
          ctx.stroke();

          // Specular glint
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-s / 2 + 4, -s / 2 + 8);
          ctx.lineTo(-s / 2 + 8, -s / 2 + 4);
          ctx.stroke();

          ctx.restore();
        });
      };

      render();

      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', handleResize);
        if (container.contains(canvas)) {
          container.removeChild(canvas);
        }
      };
    };

    // Safely check WebGL support
    let hasWebGL = false;
    try {
      const probe = document.createElement('canvas');
      const gl = probe.getContext('webgl2') || probe.getContext('webgl');
      hasWebGL = !!gl;
    } catch {
      hasWebGL = false;
    }

    if (!hasWebGL) {
      run2DFallback();
      return () => cleanup();
    }

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.z = 12;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
      });

      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffedd5, 2.5);
      dirLight.position.set(5, 8, 5);
      scene.add(dirLight);

      const pointLight = new THREE.PointLight(new THREE.Color(colorRef.current), 3, 20);
      pointLight.position.set(-2, 2, 4);
      scene.add(pointLight);

      const iceGroup = new THREE.Group();
      scene.add(iceGroup);

      const iceMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.88,
        opacity: 0.92,
        transparent: true,
        roughness: 0.08,
        ior: 1.31,
        thickness: 1.5,
        specularIntensity: 1.2,
        clearcoat: 1.0,
      });

      const iceCubeGeom = new THREE.BoxGeometry(0.7, 0.7, 0.7);
      const iceCubes: { mesh: THREE.Mesh; rotSpeed: { x: number; y: number; z: number }; baseY: number }[] = [];

      const positions = [
        { x: -3.8, y: 1.2, z: 1.5, scale: 0.9 },
        { x: -2.4, y: -2.5, z: 2.2, scale: 0.7 },
        { x: 3.2, y: -1.8, z: 1.8, scale: 0.85 },
        { x: 4.1, y: 2.1, z: -0.5, scale: 0.65 },
        { x: -1.2, y: 3.5, z: 0.5, scale: 0.55 },
        { x: 2.5, y: 3.2, z: 1.0, scale: 0.6 }
      ];

      positions.forEach((pos) => {
        const mesh = new THREE.Mesh(iceCubeGeom, iceMaterial);
        mesh.position.set(pos.x, pos.y, pos.z);
        mesh.scale.setScalar(pos.scale);
        iceGroup.add(mesh);
        iceCubes.push({
          mesh,
          rotSpeed: {
            x: (Math.random() - 0.5) * 0.008,
            y: (Math.random() - 0.5) * 0.008,
            z: (Math.random() - 0.5) * 0.006,
          },
          baseY: pos.y,
        });
      });

      const bubbleCount = 60;
      const bubbleGeom = new THREE.BufferGeometry();
      const bubblePositions = new Float32Array(bubbleCount * 3);
      const bubbleSpeeds = new Float32Array(bubbleCount);

      for (let i = 0; i < bubbleCount; i++) {
        bubblePositions[i * 3] = (Math.random() - 0.5) * 10;
        bubblePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        bubblePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
        bubbleSpeeds[i] = 0.015 + Math.random() * 0.03;
      }

      bubbleGeom.setAttribute('position', new THREE.BufferAttribute(bubblePositions, 3));

      const particleCanvas = document.createElement('canvas');
      particleCanvas.width = 32;
      particleCanvas.height = 32;
      const pctx = particleCanvas.getContext('2d')!;
      const grad = pctx.createRadialGradient(16, 16, 1, 16, 16, 15);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(0.4, 'rgba(255, 240, 200, 0.6)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      pctx.fillStyle = grad;
      pctx.beginPath();
      pctx.arc(16, 16, 15, 0, Math.PI * 2);
      pctx.fill();

      const bubbleTexture = new THREE.CanvasTexture(particleCanvas);
      const bubbleMaterial = new THREE.PointsMaterial({
        size: 0.35,
        map: bubbleTexture,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const bubbleParticles = new THREE.Points(bubbleGeom, bubbleMaterial);
      scene.add(bubbleParticles);

      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const onMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        mouseX = (e.clientX / innerWidth - 0.5) * 2;
        mouseY = -(e.clientY / innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMouseMove, { passive: true });

      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      let animId: number;
      const clock = new THREE.Clock();

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        targetX += (mouseX * 0.6 - targetX) * 0.05;
        targetY += (mouseY * 0.4 - targetY) * 0.05;
        camera.position.x = targetX;
        camera.position.y = targetY;
        camera.lookAt(0, 0, 0);

        pointLight.color.lerp(new THREE.Color(colorRef.current), 0.05);

        iceCubes.forEach((cube) => {
          cube.mesh.rotation.x += cube.rotSpeed.x;
          cube.mesh.rotation.y += cube.rotSpeed.y;
          cube.mesh.position.y = cube.baseY + Math.sin(elapsedTime * 1.5 + cube.baseY) * 0.2;
        });

        const positionsArr = bubbleGeom.attributes.position.array as Float32Array;
        for (let i = 0; i < bubbleCount; i++) {
          positionsArr[i * 3 + 1] += bubbleSpeeds[i];
          if (positionsArr[i * 3 + 1] > 6) {
            positionsArr[i * 3 + 1] = -6;
            positionsArr[i * 3] = (Math.random() - 0.5) * 10;
          }
        }
        bubbleGeom.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      };

      animate();

      cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', handleResize);
        iceCubeGeom.dispose();
        iceMaterial.dispose();
        bubbleGeom.dispose();
        bubbleMaterial.dispose();
        bubbleTexture.dispose();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch {
      run2DFallback();
    }

    return () => {
      cleanup();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};
