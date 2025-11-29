'use client';

import AppBar from '../../AppBar';
import Card from '../../Card';
import Footer from '../../Footer';
import RadarChart from '../RadarChart';

const RadarChartPage = () => {
  const skillsData = [
    { label: 'JavaScript', value: 90 },
    { label: 'TypeScript', value: 85 },
    { label: 'React', value: 88 },
    { label: 'Node.js', value: 75 },
    { label: 'CSS', value: 80 },
    { label: 'Testing', value: 70 },
  ];

  const performanceMetrics = [
    { label: 'Speed', value: 85 },
    { label: 'Reliability', value: 92 },
    { label: 'Security', value: 88 },
    { label: 'Scalability', value: 78 },
    { label: 'UX', value: 90 },
  ];

  const teamStrengths = [
    { label: 'Communication', value: 88 },
    { label: 'Problem Solving', value: 92 },
    { label: 'Creativity', value: 85 },
    { label: 'Collaboration', value: 90 },
    { label: 'Leadership', value: 80 },
    { label: 'Technical', value: 95 },
  ];

  const productMetrics = [
    { label: 'Quality', value: 87 },
    { label: 'Innovation', value: 82 },
    { label: 'Value', value: 90 },
    { label: 'Support', value: 85 },
  ];

  return (
    <div className='min-h-screen flex flex-col'>
      <AppBar />
      <div className='container flex flex-col gap-8 px-4 py-8 flex-1'>
        <div>
          <h1 className='text-4xl font-bold text-gray-300 mb-2'>RadarChart</h1>
          <p className='text-lg text-gray-400'>
            Displays multivariate data in a two-dimensional chart showing
            relative performance across multiple variables.
          </p>
        </div>

        <div>
          <h1 className='text-3xl font-bold text-gray-300 mb-4'>Usage</h1>
          <div className='bg-[#161A1D] rounded-lg p-6'>
            <code className='text-sm text-gray-300'>
              import &#123; RadarChart &#125; from
              &quot;./app/components/charts/RadarChart&quot;
            </code>
          </div>
        </div>

        <div className='mb-12'>
          <h2 className='text-3xl font-bold text-gray-300 mb-6'>Examples</h2>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Skills Assessment */}
            <Card variant='elevated' padding='lg'>
              <h3 className='text-xl font-semibold text-gray-300 mb-4'>
                Technical Skills Assessment
              </h3>
              <div className='flex justify-center bg-white/5 rounded-lg p-4'>
                <RadarChart data={skillsData} size={320} />
              </div>
              <div className='mt-6 pt-6 border-t border-gray-700'>
                <pre className='text-xs text-gray-300 overflow-x-auto'>
                  <code>{`const skillsData = [
  { label: 'JavaScript', value: 90 },
  { label: 'TypeScript', value: 85 },
  { label: 'React', value: 88 },
  { label: 'Node.js', value: 75 },
  { label: 'CSS', value: 80 },
  { label: 'Testing', value: 70 },
];

<RadarChart 
  data={skillsData}
  size={320}
/>`}</code>
                </pre>
              </div>
            </Card>

            {/* Performance Metrics */}
            <Card variant='elevated' padding='lg'>
              <h3 className='text-xl font-semibold text-gray-300 mb-4'>
                Application Performance
              </h3>
              <div className='flex justify-center bg-white/5 rounded-lg p-4'>
                <RadarChart data={performanceMetrics} size={320} />
              </div>
              <div className='mt-6 pt-6 border-t border-gray-700'>
                <pre className='text-xs text-gray-300 overflow-x-auto'>
                  <code>{`const performanceMetrics = [
  { label: 'Speed', value: 85 },
  { label: 'Reliability', value: 92 },
  { label: 'Security', value: 88 },
  { label: 'Scalability', value: 78 },
  { label: 'UX', value: 90 },
];

<RadarChart 
  data={performanceMetrics}
  size={320}
/>`}</code>
                </pre>
              </div>
            </Card>

            {/* Team Strengths */}
            <Card variant='outlined' padding='lg'>
              <h3 className='text-xl font-semibold text-gray-300 mb-4'>
                Team Strengths Profile
              </h3>
              <div className='flex justify-center bg-white/5 rounded-lg p-4'>
                <RadarChart data={teamStrengths} size={300} />
              </div>
              <div className='mt-6 pt-6 border-t border-gray-700'>
                <pre className='text-xs text-gray-300 overflow-x-auto'>
                  <code>{`const teamStrengths = [
  { label: 'Communication', value: 88 },
  { label: 'Problem Solving', value: 92 },
  { label: 'Creativity', value: 85 },
  { label: 'Collaboration', value: 90 },
  { label: 'Leadership', value: 80 },
  { label: 'Technical', value: 95 },
];

<RadarChart 
  data={teamStrengths}
  size={300}
/>`}</code>
                </pre>
              </div>
            </Card>

            {/* Product Metrics */}
            <Card variant='outlined' padding='lg'>
              <h3 className='text-xl font-semibold text-gray-300 mb-4'>
                Product Quality Metrics
              </h3>
              <div className='flex justify-center bg-white/5 rounded-lg p-4'>
                <RadarChart data={productMetrics} size={300} />
              </div>
              <div className='mt-6 pt-6 border-t border-gray-700'>
                <pre className='text-xs text-gray-300 overflow-x-auto'>
                  <code>{`const productMetrics = [
  { label: 'Quality', value: 87 },
  { label: 'Innovation', value: 82 },
  { label: 'Value', value: 90 },
  { label: 'Support', value: 85 },
];

<RadarChart 
  data={productMetrics}
  size={300}
/>`}</code>
                </pre>
              </div>
            </Card>

            {/* Custom Size */}
            <Card variant='default' padding='lg' className='lg:col-span-2'>
              <h3 className='text-xl font-semibold text-gray-300 mb-4'>
                Compact Size
              </h3>
              <div className='flex justify-center bg-white/5 rounded-lg p-4'>
                <RadarChart data={performanceMetrics} size={250} />
              </div>
              <div className='mt-6 pt-6 border-t border-gray-700'>
                <pre className='text-xs text-gray-300 overflow-x-auto'>
                  <code>{`<RadarChart 
  data={performanceMetrics}
  size={250}
/>`}</code>
                </pre>
              </div>
            </Card>
          </div>

          {/* Props Documentation */}
          <Card variant='default' padding='lg' className='mt-6'>
            <h3 className='text-xl font-semibold text-gray-300 mb-4'>Props</h3>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b border-gray-700'>
                    <th className='text-left py-2 px-3 text-gray-300'>Prop</th>
                    <th className='text-left py-2 px-3 text-gray-300'>Type</th>
                    <th className='text-left py-2 px-3 text-gray-300'>
                      Default
                    </th>
                    <th className='text-left py-2 px-3 text-gray-300'>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className='text-gray-400'>
                  <tr className='border-b border-gray-700/50'>
                    <td className='py-2 px-3 font-mono text-blue-400'>data</td>
                    <td className='py-2 px-3'>RadarChartData[]</td>
                    <td className='py-2 px-3'>-</td>
                    <td className='py-2 px-3'>
                      Array of data points with label, value, and optional color
                    </td>
                  </tr>
                  <tr className='border-b border-gray-700/50'>
                    <td className='py-2 px-3 font-mono text-blue-400'>size</td>
                    <td className='py-2 px-3'>number</td>
                    <td className='py-2 px-3'>300</td>
                    <td className='py-2 px-3'>
                      Chart size in pixels (width and height)
                    </td>
                  </tr>
                  <tr>
                    <td className='py-2 px-3 font-mono text-blue-400'>
                      className
                    </td>
                    <td className='py-2 px-3'>string</td>
                    <td className='py-2 px-3'>&quot;&quot;</td>
                    <td className='py-2 px-3'>Additional CSS classes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Usage Notes */}
          <Card variant='default' padding='lg' className='mt-6'>
            <h3 className='text-xl font-semibold text-gray-300 mb-4'>
              Usage Notes
            </h3>
            <div className='space-y-3 text-gray-400'>
              <p>
                • RadarChart is ideal for comparing multiple variables across
                different categories
              </p>
              <p>• Works best with 3-8 data points for optimal readability</p>
              <p>
                • Data values are automatically scaled relative to the maximum
                value
              </p>
              <p>
                • Interactive hover states show detailed values for each data
                point
              </p>
              <p>
                • Canvas-based rendering ensures smooth performance and crisp
                visuals
              </p>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RadarChartPage;
