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
  const maxValue = Math.max(...data.map((d) => d.value));
  const colors = [
    '#3B82F6', // blue
    '#8B5CF6', // purple
    '#10B981', // green
    '#F59E0B', // yellow
    '#EF4444', // red
    '#6B7280', // gray
  ];

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}
    >
      {title && (
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>{title}</h3>
      )}

      <div
        className='relative flex items-end justify-between gap-2'
        style={{ height: `${height}px` }}
      >
        {data.map((item, index) => {
          const barHeight =
            maxValue > 0 ? (item.value / maxValue) * (height - 60) : 0;
          const barColor = item.color || colors[index % colors.length];

          return (
            <div
              key={item.label}
              className='flex flex-col items-center justify-end flex-1 group'
            >
              {/* Bar */}
              <div
                className='w-full rounded-t-md transition-all duration-300 hover:opacity-80 relative'
                style={{
                  height: `${barHeight}px`,
                  backgroundColor: barColor,
                  minHeight: item.value > 0 ? '4px' : '0px',
                }}
              >
                {/* Value tooltip */}
                <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap'>
                  {item.value}
                </div>
              </div>

              {/* Label */}
              <div className='mt-2 text-sm text-gray-600 text-center w-full'>
                <span className='break-words'>{item.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Y-axis labels */}
      <div className='absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-8'>
        <span>{maxValue}</span>
        <span>{Math.round(maxValue * 0.75)}</span>
        <span>{Math.round(maxValue * 0.5)}</span>
        <span>{Math.round(maxValue * 0.25)}</span>
        <span>0</span>
      </div>
    </div>
  );
};

export default BarChart;
