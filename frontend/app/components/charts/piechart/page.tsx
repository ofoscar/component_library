'use client';

import AppBar from '../../AppBar';
import Card from '../../Card';
import Footer from '../../Footer';
import PieChart from '../PieChart';

const PieChartPage = () => {
  const marketShareData = [
    { label: 'Product A', value: 35, color: '#3B82F6' },
    { label: 'Product B', value: 25, color: '#8B5CF6' },
    { label: 'Product C', value: 20, color: '#10B981' },
    { label: 'Product D', value: 15, color: '#F59E0B' },
    { label: 'Product E', value: 5, color: '#EF4444' },
  ];

  const browserData = [
    { label: 'Chrome', value: 48 },
    { label: 'Safari', value: 32 },
    { label: 'Firefox', value: 12 },
    { label: 'Edge', value: 8 },
  ];

  const deviceData = [
    { label: 'Mobile', value: 55, color: '#3B82F6' },
    { label: 'Desktop', value: 35, color: '#8B5CF6' },
    { label: 'Tablet', value: 10, color: '#10B981' },
  ];

  const categoryData = [
    { label: 'Electronics', value: 42 },
    { label: 'Clothing', value: 28 },
    { label: 'Home & Garden', value: 18 },
    { label: 'Sports', value: 12 },
  ];

  return (
    <div className='min-h-screen flex flex-col'>
      <AppBar />
      <div className='container self-center flex flex-col gap-8 px-4 py-8 flex-1'>
        <div>
          <h1 className='text-4xl font-bold text-gray-300 mb-2'>PieChart</h1>
          <p className='text-lg text-gray-400'>
            Displays data in a circular chart divided into slices to illustrate
            numerical proportions.
          </p>
        </div>

        <div>
          <h1 className='text-3xl font-bold text-gray-300 mb-4'>Usage</h1>
          <div className='bg-[#161A1D] rounded-lg p-6'>
            <code className='text-sm text-gray-300'>
              import &#123; PieChart &#125; from
              &quot;./app/components/charts/PieChart&quot;
            </code>
          </div>
        </div>

        <div className='mb-12'>
          <h2 className='text-3xl font-bold text-gray-300 mb-6'>Examples</h2>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Market Share */}
            <Card variant='elevated' padding='lg'>
              <h3 className='text-xl font-semibold text-gray-300 mb-4'>
                Market Share Analysis
              </h3>
              <PieChart
                data={marketShareData}
                title='Market Distribution'
                size={240}
                showLegend={true}
              />
              <div className='mt-6 pt-6 border-t border-gray-700'>
                <pre className='text-xs text-gray-300 overflow-x-auto'>
                  <code>{`const marketShareData = [
  { label: 'Product A', value: 35, color: '#3B82F6' },
  { label: 'Product B', value: 25, color: '#8B5CF6' },
  { label: 'Product C', value: 20, color: '#10B981' },
  { label: 'Product D', value: 15, color: '#F59E0B' },
  { label: 'Product E', value: 5, color: '#EF4444' },
];

<PieChart 
  data={marketShareData}
  title="Market Distribution"
  size={240}
  showLegend={true}
/>`}</code>
                </pre>
              </div>
            </Card>

            {/* Browser Usage */}
            <Card variant='elevated' padding='lg'>
              <h3 className='text-xl font-semibold text-gray-300 mb-4'>
                Browser Usage
              </h3>
              <PieChart
                data={browserData}
                title='Browser Statistics'
                size={240}
                showLegend={true}
              />
              <div className='mt-6 pt-6 border-t border-gray-700'>
                <pre className='text-xs text-gray-300 overflow-x-auto'>
                  <code>{`const browserData = [
  { label: 'Chrome', value: 48 },
  { label: 'Safari', value: 32 },
  { label: 'Firefox', value: 12 },
  { label: 'Edge', value: 8 },
];

<PieChart 
  data={browserData}
  title="Browser Statistics"
  size={240}
  showLegend={true}
/>`}</code>
                </pre>
              </div>
            </Card>

            {/* Device Distribution */}
            <Card variant='outlined' padding='lg'>
              <h3 className='text-xl font-semibold text-gray-300 mb-4'>
                Device Distribution
              </h3>
              <PieChart
                data={deviceData}
                title='Traffic by Device'
                size={220}
                showLegend={true}
              />
              <div className='mt-6 pt-6 border-t border-gray-700'>
                <pre className='text-xs text-gray-300 overflow-x-auto'>
                  <code>{`const deviceData = [
  { label: 'Mobile', value: 55, color: '#3B82F6' },
  { label: 'Desktop', value: 35, color: '#8B5CF6' },
  { label: 'Tablet', value: 10, color: '#10B981' },
];

<PieChart 
  data={deviceData}
  title="Traffic by Device"
  size={220}
  showLegend={true}
/>`}</code>
                </pre>
              </div>
            </Card>

            {/* Category Sales */}
            <Card variant='outlined' padding='lg'>
              <h3 className='text-xl font-semibold text-gray-300 mb-4'>
                Sales by Category
              </h3>
              <PieChart
                data={categoryData}
                title='Category Breakdown'
                size={220}
                showLegend={true}
              />
              <div className='mt-6 pt-6 border-t border-gray-700'>
                <pre className='text-xs text-gray-300 overflow-x-auto'>
                  <code>{`const categoryData = [
  { label: 'Electronics', value: 42 },
  { label: 'Clothing', value: 28 },
  { label: 'Home & Garden', value: 18 },
  { label: 'Sports', value: 12 },
];

<PieChart 
  data={categoryData}
  title="Category Breakdown"
  size={220}
  showLegend={true}
/>`}</code>
                </pre>
              </div>
            </Card>

            {/* Without Legend */}
            <Card variant='default' padding='lg' className='lg:col-span-2'>
              <h3 className='text-xl font-semibold text-gray-300 mb-4'>
                Compact View (No Legend)
              </h3>
              <div className='flex justify-center'>
                <PieChart
                  data={marketShareData}
                  title='Simple Distribution'
                  size={200}
                  showLegend={false}
                />
              </div>
              <div className='mt-6 pt-6 border-t border-gray-700'>
                <pre className='text-xs text-gray-300 overflow-x-auto'>
                  <code>{`<PieChart 
  data={marketShareData}
  title="Simple Distribution"
  size={200}
  showLegend={false}
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
                    <td className='py-2 px-3'>DataPoint[]</td>
                    <td className='py-2 px-3'>-</td>
                    <td className='py-2 px-3'>
                      Array of data points with label, value, and optional color
                    </td>
                  </tr>
                  <tr className='border-b border-gray-700/50'>
                    <td className='py-2 px-3 font-mono text-blue-400'>title</td>
                    <td className='py-2 px-3'>string</td>
                    <td className='py-2 px-3'>-</td>
                    <td className='py-2 px-3'>Chart title</td>
                  </tr>
                  <tr className='border-b border-gray-700/50'>
                    <td className='py-2 px-3 font-mono text-blue-400'>size</td>
                    <td className='py-2 px-3'>number</td>
                    <td className='py-2 px-3'>200</td>
                    <td className='py-2 px-3'>Chart size in pixels</td>
                  </tr>
                  <tr className='border-b border-gray-700/50'>
                    <td className='py-2 px-3 font-mono text-blue-400'>
                      showLegend
                    </td>
                    <td className='py-2 px-3'>boolean</td>
                    <td className='py-2 px-3'>true</td>
                    <td className='py-2 px-3'>Whether to display the legend</td>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PieChartPage;
