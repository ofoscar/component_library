'use client';

import React, { useEffect, useRef } from 'react';

interface RadarChartData {
  label: string;
  value: number;
  color?: string;
}

interface RadarChartProps {
  data: RadarChartData[];
  size?: number;
  className?: string;
}

const RadarChart: React.FC<RadarChartProps> = ({
  data,
  size = 300,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Add padding to prevent label cropping
    const padding = 40;
    const drawableSize = size - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (drawableSize / 2) * 0.8;
    const numPoints = data.length;

    // Find max value for scaling
    const maxValue = Math.max(...data.map((d) => d.value), 1);

    // Draw concentric circles (grid)
    const levels = 5;
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;

    for (let i = 1; i <= levels; i++) {
      const levelRadius = (radius / levels) * i;
      ctx.beginPath();

      for (let j = 0; j <= numPoints; j++) {
        const angle = (Math.PI * 2 * j) / numPoints - Math.PI / 2;
        const x = centerX + levelRadius * Math.cos(angle);
        const y = centerY + levelRadius * Math.sin(angle);

        if (j === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 1;

    for (let i = 0; i < numPoints; i++) {
      const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // Draw data polygon
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
    ctx.lineWidth = 2;

    ctx.beginPath();
    for (let i = 0; i < numPoints; i++) {
      const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
      const value = data[i].value;
      const scaledValue = (value / maxValue) * radius;
      const x = centerX + scaledValue * Math.cos(angle);
      const y = centerY + scaledValue * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = '#3B82F6';
    for (let i = 0; i < numPoints; i++) {
      const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
      const value = data[i].value;
      const scaledValue = (value / maxValue) * radius;
      const x = centerX + scaledValue * Math.cos(angle);
      const y = centerY + scaledValue * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < numPoints; i++) {
      const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
      const labelRadius = radius + 25;
      const x = centerX + labelRadius * Math.cos(angle);
      const y = centerY + labelRadius * Math.sin(angle);

      // Adjust text alignment based on position
      if (Math.abs(angle + Math.PI / 2) < 0.1) {
        ctx.textBaseline = 'bottom';
      } else if (Math.abs(angle - Math.PI / 2) < 0.1) {
        ctx.textBaseline = 'top';
      } else {
        ctx.textBaseline = 'middle';
      }

      if (angle > -Math.PI / 2 && angle < Math.PI / 2) {
        ctx.textAlign = 'left';
      } else if (angle > Math.PI / 2 || angle < -Math.PI / 2) {
        ctx.textAlign = 'right';
      } else {
        ctx.textAlign = 'center';
      }

      ctx.fillStyle = '#3B82F6';
      ctx.fillText(data[i].label, x, y);

      // Draw value below label
      ctx.fillStyle = '#c7c7c7ff';
      const valueY =
        y +
        (ctx.textBaseline === 'bottom'
          ? -12
          : ctx.textBaseline === 'top'
          ? 12
          : 12);
      ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
      ctx.fillText(String(data[i].value), x, valueY);
      ctx.fillStyle = '#374151';
      ctx.font = '12px system-ui, -apple-system, sans-serif';
    }
  }, [data, size]);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <canvas ref={canvasRef} width={size} height={size} />
    </div>
  );
};

export default RadarChart;
