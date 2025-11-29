'use client';

import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className = '',
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    const animate = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Create fluid gradient similar to the shader
      const gradient1 = ctx.createLinearGradient(0, 0, width, height);
      const gradient2 = ctx.createRadialGradient(
        width * 0.3 + Math.sin(time * 0.002) * 100,
        height * 0.7 + Math.cos(time * 0.003) * 80,
        0,
        width * 0.7,
        height * 0.3,
        Math.max(width, height) * 0.8,
      );

      // Colors similar to the shader (dark purple/black tones with orange accents)
      const colors = {
        dark1: `rgba(${Math.floor(
          22 + Math.sin(time * 0.001) * 10,
        )}, ${Math.floor(18 + Math.cos(time * 0.0015) * 8)}, ${Math.floor(
          20 + Math.sin(time * 0.0008) * 12,
        )}, 1)`,
        dark2: `rgba(${Math.floor(
          44 + Math.sin(time * 0.0012) * 15,
        )}, ${Math.floor(36 + Math.cos(time * 0.0018) * 12)}, ${Math.floor(
          40 + Math.sin(time * 0.001) * 18,
        )}, 1)`,
        accent1: `rgba(${Math.floor(
          186 + Math.sin(time * 0.001) * 20,
        )}, ${Math.floor(24 + Math.cos(time * 0.0008) * 8)}, ${Math.floor(
          27 + Math.sin(time * 0.0012) * 10,
        )}, ${0.8 + Math.sin(time * 0.002) * 0.2})`,
        accent2: `rgba(${Math.floor(
          229 + Math.sin(time * 0.0015) * 15,
        )}, ${Math.floor(56 + Math.cos(time * 0.001) * 12)}, ${Math.floor(
          59 + Math.sin(time * 0.0018) * 15,
        )}, ${0.6 + Math.cos(time * 0.0025) * 0.3})`,
      };

      // First gradient layer
      gradient1.addColorStop(0, colors.dark1);
      gradient1.addColorStop(0.3, colors.accent1);
      gradient1.addColorStop(0.7, colors.dark2);
      gradient1.addColorStop(1, colors.accent2);

      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);

      // Second gradient layer for complexity
      gradient2.addColorStop(0, colors.accent1);
      gradient2.addColorStop(0.4, 'rgba(0, 0, 0, 0.1)');
      gradient2.addColorStop(0.8, colors.dark2);
      gradient2.addColorStop(1, 'rgba(0, 0, 0, 0.3)');

      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      // Add animated wave patterns
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < 3; i++) {
        const waveGradient = ctx.createLinearGradient(
          0,
          0,
          width + Math.sin(time * 0.001 + i) * 200,
          height + Math.cos(time * 0.0015 + i) * 150,
        );

        const opacity = 0.1 + Math.sin(time * 0.002 + i) * 0.05;
        waveGradient.addColorStop(0, `rgba(186, 24, 27, 0)`);
        waveGradient.addColorStop(0.5, `rgba(229, 56, 59, ${opacity})`);
        waveGradient.addColorStop(1, `rgba(186, 24, 27, 0)`);

        ctx.fillStyle = waveGradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';

      time += 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
    };

    // Initialize
    resizeCanvas();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className='absolute inset-0 w-full h-full'
        style={{ background: 'transparent' }}
      />
      <div className='relative z-10'>{children}</div>
    </div>
  );
};

export default AnimatedBackground;
