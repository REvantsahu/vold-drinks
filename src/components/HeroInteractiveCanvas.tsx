import React, { useEffect, useRef } from 'react';

interface HeroInteractiveCanvasProps {
  accentColor: string;
}

export const HeroInteractiveCanvas: React.FC<HeroInteractiveCanvasProps> = ({ accentColor }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<string>(accentColor);
  colorRef.current = accentColor;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth || window.innerWidth);
    let height = (canvas.height = container.clientHeight || window.innerHeight);

    // Mouse tracking for reactive physics
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      width = canvas.width = container.clientWidth || window.innerWidth;
      height = canvas.height = container.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Rising Carbonated Effervescent Bubbles (55 particles)
    const bubbleCount = prefersReducedMotion ? 15 : 55;
    const bubbles = Array.from({ length: bubbleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.5 + Math.random() * 4.5,
      speed: 0.5 + Math.random() * 1.6,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      alpha: 0.3 + Math.random() * 0.5,
    }));

    // 2. 3D Prismatic Crystal Ice Cubes with simulated refraction & specular sheen
    const iceCubes = [
      { xRatio: 0.16, yRatio: 0.32, size: 52, rot: 0.25, rotSpeed: 0.003, depth: 0.7 },
      { xRatio: 0.84, yRatio: 0.26, size: 64, rot: -0.35, rotSpeed: -0.0025, depth: 1.1 },
      { xRatio: 0.22, yRatio: 0.74, size: 44, rot: 0.52, rotSpeed: 0.004, depth: 0.5 },
      { xRatio: 0.80, yRatio: 0.68, size: 56, rot: -0.22, rotSpeed: 0.0035, depth: 0.9 },
      { xRatio: 0.35, yRatio: 0.18, size: 36, rot: 0.8, rotSpeed: 0.002, depth: 0.4 },
      { xRatio: 0.68, yRatio: 0.82, size: 42, rot: -0.6, rotSpeed: -0.003, depth: 0.6 },
    ];

    // 3. Shimmering Light Glints / Caustic Flares
    const glints = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 10 + Math.random() * 25,
      phase: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.03,
    }));

    let animId: number;
    let tick = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      tick += 0.018;

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;
      const mouseParallaxX = (mouseX / width - 0.5) * 20;
      const mouseParallaxY = (mouseY / height - 0.5) * 20;

      ctx.clearRect(0, 0, width, height);

      // Render Rising Effervescent Bubbles
      bubbles.forEach((b) => {
        if (!prefersReducedMotion) {
          b.y -= b.speed;
          b.wobble += b.wobbleSpeed;
          if (b.y < -15) {
            b.y = height + 15;
            b.x = Math.random() * width;
          }
        }

        const currentX = b.x + Math.sin(b.wobble) * 2.5 + mouseParallaxX * 0.3;
        const currentY = b.y + mouseParallaxY * 0.3;

        // Bubble glow
        ctx.beginPath();
        ctx.arc(currentX, currentY, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha})`;
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // High specular dot
        ctx.beginPath();
        ctx.arc(currentX - b.r * 0.35, currentY - b.r * 0.35, b.r * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
      });

      // Render Floating 3D Crystal Ice Cubes
      iceCubes.forEach((cube, idx) => {
        if (!prefersReducedMotion) {
          cube.rot += cube.rotSpeed;
        }

        const baseX = cube.xRatio * width;
        const baseY = cube.yRatio * height;
        const floatY = baseY + Math.sin(tick * 1.4 + idx * 1.5) * 14 + mouseParallaxY * cube.depth;
        const floatX = baseX + mouseParallaxX * cube.depth;
        const s = cube.size;

        ctx.save();
        ctx.translate(floatX, floatY);
        ctx.rotate(cube.rot);

        // Glass shadow/ambient occlusion
        ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
        ctx.shadowBlur = 18;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 10;

        // Crystal body fill with subtle chromatic tint of active flavor
        ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
        ctx.beginPath();
        ctx.roundRect(-s / 2, -s / 2, s, s, 8);
        ctx.fill();

        ctx.shadowColor = 'transparent';

        // Crystal border / refraction edge
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // 3D Isometric Facet Illusion lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-s / 2, -s / 2 + 10);
        ctx.lineTo(s / 2 - 10, s / 2);
        ctx.moveTo(-s / 2 + 10, -s / 2);
        ctx.lineTo(s / 2, s / 2 - 10);
        ctx.stroke();

        // Bright Specular Top-Left Glint
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-s / 2 + 6, -s / 2 + 16);
        ctx.lineTo(-s / 2 + 6, -s / 2 + 6);
        ctx.lineTo(-s / 2 + 16, -s / 2 + 6);
        ctx.stroke();

        ctx.restore();
      });

      // Render Shimmering Caustic Light Glints
      glints.forEach((g) => {
        g.phase += g.speed;
        const opacity = (Math.sin(g.phase) + 1) * 0.25;
        if (opacity > 0.05) {
          ctx.save();
          ctx.translate(g.x + mouseParallaxX * 0.2, g.y + mouseParallaxY * 0.2);
          const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, g.size);
          grad.addColorStop(0, `rgba(255, 255, 255, ${opacity * 1.5})`);
          grad.addColorStop(0.3, `rgba(255, 240, 200, ${opacity * 0.8})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, g.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
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
