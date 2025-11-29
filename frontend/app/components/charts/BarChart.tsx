'use client';

import React from 'react';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: DataPoint[];
  title?: string;
  height?: number;
  className?: string;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  height = 300,
  className = '',
}) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1); // Ensure minimum of 1 to avoid division by zero
  const colors = [
    '#187DBA', // blue
    '#BA181B', // red
    '#8B5CF6', // purple
    '#10B981', // green
    '#F59E0B', // yellow
    '#6B7280', // gray
  ];

  // Calculate adaptive grid intervals based on max value
  const getGridValues = (max: number) => {
    if (max <= 5) return [0, 1, 2, 3, 4, 5];
    if (max <= 10) return [0, 2, 4, 6, 8, 10];
    if (max <= 25) return [0, 5, 10, 15, 20, 25];
    if (max <= 50) return [0, 10, 20, 30, 40, 50];
    if (max <= 100) return [0, 20, 40, 60, 80, 100];

    // For larger values, create 5 intervals
    const interval = Math.ceil(max / 5);
    const roundedMax = interval * 5;
    return Array.from({ length: 6 }, (_, i) => i * interval);
  };

  const gridValues = getGridValues(maxValue);
  const actualMaxValue = Math.max(maxValue, gridValues[gridValues.length - 1]);
  const chartHeight = height - 60; // Reserve space for labels

  return (
    <div className={`bg-[#292828]/40 rounded-lg px-2 py-4 ${className}`}>
      {title && (
        <h3 className='text-lg font-semibold text-gray-300 mb-4'>{title}</h3>
      )}

      <div className='flex'>
        {/* Y-axis labels and grid */}
        <div
          className='flex flex-col justify-between text-xs text-gray-500'
          style={{ height: `${height}px`, paddingBottom: '40px' }}
        >
          {gridValues
            .slice()
            .reverse()
            .map((value, index) => (
              <div key={value} className='flex items-center'>
                <span className='w-8 text-right pr-2 font-mono'>{value}</span>
              </div>
            ))}
        </div>

        {/* Chart area with grid and bars */}
        <div className='flex-1 relative'>
          {/* Grid lines */}
          <div
            className='absolute inset-0'
            style={{ height: `${chartHeight}px`, top: 0 }}
          >
            {/* Horizontal grid lines */}
            {gridValues
              .slice()
              .reverse()
              .map((value, index) => {
                const y = (index / (gridValues.length - 1)) * chartHeight;
                return (
                  <div
                    key={value}
                    className='absolute w-full border-t border-dashed border-gray-300/30'
                    style={{ top: `${y}px` }}
                  />
                );
              })}

            {/* Vertical grid lines */}
            {data.map((item, index) => {
              const x = ((index + 0.5) / data.length) * 100;
              return (
                <div
                  key={`v-${item.label}-${index}`}
                  className='absolute h-full border-l border-dashed border-gray-300/30'
                  style={{ left: `${x}%` }}
                />
              );
            })}
          </div>

          {/* Bars */}
          <div
            className='relative flex items-end justify-between gap-2'
            style={{ height: `${chartHeight}px` }}
          >
            {data.map((item, index) => {
              const barHeight =
                actualMaxValue > 0
                  ? (item.value / actualMaxValue) * chartHeight
                  : 0;
              const barColor = item.color || colors[index % colors.length];

              return (
                <div
                  key={item.label}
                  className='flex flex-col items-center justify-end flex-1 group relative'
                >
                  {/* Value display above bar */}
                  {item.value > 0 && (
                    <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-200 whitespace-nowrap'>
                      {item.value}
                    </div>
                  )}

                  {/* Bar */}
                  <div
                    className='w-full rounded-t-md transition-all duration-300 hover:opacity-80 relative'
                    style={{
                      height: `${barHeight}px`,
                      backgroundColor: barColor,
                      minHeight: item.value > 0 ? '2px' : '0px',
                    }}
                  >
                    {/* Hover tooltip */}
                    <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10'>
                      {item.label}: {item.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* X-axis labels */}
          <div className='flex justify-between gap-2 mt-2'>
            {data.map((item) => (
              <div key={item.label} className='flex-1 text-center'>
                <span className='text-sm text-gray-600 break-words'>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
