'use client';

import React, { useState } from 'react';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface PieChartProps {
  data: DataPoint[];
  title?: string;
  size?: number;
  className?: string;
  showLegend?: boolean;
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  title,
  size = 200,
  className = '',
  showLegend = true,
}) => {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const colors = [
    '#3B82F6', // blue
    '#8B5CF6', // purple
    '#10B981', // green
    '#F59E0B', // yellow
    '#EF4444', // red
    '#6B7280', // gray
  ];

  // Filter out zero values and calculate total
  const filteredData = data.filter((item) => item.value > 0);
  const total = filteredData.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return (
      <div className={`bg-[#292828]/40 rounded-lg px-3 py-4 ${className}`}>
        {title && (
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>{title}</h3>
        )}
        <div
          className='flex flex-col items-center justify-center'
          style={{ height: size }}
        >
          <div
            className='rounded-full border-4 border-gray-200 flex items-center justify-center'
            style={{ width: size * 0.8, height: size * 0.8 }}
          >
            <span className='text-gray-500 text-sm font-medium'>No data</span>
          </div>
        </div>
      </div>
    );
  }

  // Calculate angles for each slice
  let currentAngle = 0;
  const slices = filteredData.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;

    const color = item.color || colors[index % colors.length];

    return {
      ...item,
      percentage,
      startAngle,
      endAngle,
      color,
    };
  });

  // Function to create SVG path for pie slice
  const createPath = (startAngle: number, endAngle: number, radius: number) => {
    const centerX = size / 2;
    const centerY = size / 2;

    const startAngleRad = (startAngle - 90) * (Math.PI / 180);
    const endAngleRad = (endAngle - 90) * (Math.PI / 180);

    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  // Function to calculate label position (middle of the slice)
  const getLabelPosition = (
    startAngle: number,
    endAngle: number,
    radius: number,
  ) => {
    const centerX = size / 2;
    const centerY = size / 2;
    const midAngle = (startAngle + endAngle) / 2;
    const midAngleRad = (midAngle - 90) * (Math.PI / 180);

    // Position label at 60% of radius from center
    const labelRadius = radius * 0.6;
    const x = centerX + labelRadius * Math.cos(midAngleRad);
    const y = centerY + labelRadius * Math.sin(midAngleRad);

    return { x, y };
  };

  return (
    <div className={`bg-[#292828]/40 rounded-lg px-3 py-4 ${className}`}>
      {title && (
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>{title}</h3>
      )}

      <div
        className={`flex flex-col md:flex-row ${
          showLegend ? 'gap-6 md:items-center' : 'justify-center items-center'
        }`}
      >
        {/* Pie Chart SVG */}
        <div className='relative group flex justify-center md:justify-start'>
          <svg
            width={size}
            height={size}
            className='drop-shadow-sm'
            onMouseLeave={() => setHoveredSlice(null)}
          >
            {slices.map((slice, index) => {
              const labelPos = getLabelPosition(
                slice.startAngle,
                slice.endAngle,
                size * 0.4,
              );

              return (
                <g
                  key={slice.label}
                  className='hover:opacity-80 transition-opacity duration-200'
                  onMouseEnter={(e) => {
                    setHoveredSlice(index);
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltipPos({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseMove={(e) => {
                    setTooltipPos({ x: e.clientX, y: e.clientY });
                  }}
                >
                  <path
                    d={createPath(slice.startAngle, slice.endAngle, size * 0.4)}
                    fill={slice.color}
                    stroke='white'
                    strokeWidth='2'
                    className='cursor-pointer'
                  />
                  {/* Label inside slice */}
                  {slice.percentage > 5 && ( // Only show label if slice is large enough
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      textAnchor='middle'
                      dominantBaseline='middle'
                      className='pointer-events-none'
                    >
                      <tspan
                        x={labelPos.x}
                        dy='-0.3em'
                        className='fill-white text-xs font-semibold'
                        style={{ fontSize: size > 150 ? '12px' : '10px' }}
                      >
                        {slice.label}
                      </tspan>
                      <tspan
                        x={labelPos.x}
                        dy='1.2em'
                        className='fill-white text-xs'
                        style={{ fontSize: size > 150 ? '11px' : '9px' }}
                      >
                        {slice.value}
                      </tspan>
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Custom Tooltip */}
          {hoveredSlice !== null && (
            <div
              className='fixed bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm pointer-events-none z-50'
              style={{
                left: `${tooltipPos.x + 10}px`,
                top: `${tooltipPos.y + 10}px`,
              }}
            >
              {slices[hoveredSlice].label}: {slices[hoveredSlice].value} (
              {slices[hoveredSlice].percentage.toFixed(1)}%)
            </div>
          )}

          {/* Center label showing total */}
          {/* <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-gray-900'>{total}</div>
              <div className='text-xs text-gray-500'>Total</div>
            </div>
          </div> */}
        </div>

        {/* Legend */}
        {showLegend && (
          <div className='grid grid-cols-2 md:flex md:flex-col gap-3 mt-4 md:mt-0 w-full md:w-auto'>
            {slices.map((slice) => (
              <div key={slice.label} className='flex items-center gap-3'>
                <div
                  className='w-4 h-4 rounded-full border border-gray-200 flex-shrink-0'
                  style={{ backgroundColor: slice.color }}
                />
                <div className='flex flex-col min-w-0'>
                  <span className='text-sm font-medium text-gray-300 truncate'>
                    {slice.label}
                  </span>
                  <span className='text-xs text-gray-500'>
                    {slice.value} ({slice.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary stats */}
      <div className='mt-4 pt-4 border-t border-gray-100'>
        <div className='flex justify-between items-center text-sm'>
          <span className='text-gray-300'>
            {slices.length} component{slices.length !== 1 ? 's' : ''} tracked
          </span>
          <span className='font-medium text-gray-900'>
            {total} total interactions
          </span>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
