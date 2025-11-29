'use client';

import AppBar from '../../AppBar';
import Card from '../../Card';
import Footer from '../../Footer';
import BarChart from '../BarChart';

const BarChartPage = () => {
  const salesData = [
    { label: 'Mon', value: 45, color: '#187DBA' },
    { label: 'Tue', value: 62, color: '#187DBA' },
    { label: 'Wed', value: 38, color: '#187DBA' },
    { label: 'Thu', value: 71, color: '#187DBA' },
    { label: 'Fri', value: 55, color: '#187DBA' },
    { label: 'Sat', value: 82, color: '#187DBA' },
    { label: 'Sun', value: 49, color: '#187DBA' },
  ];

  const performanceData = [
    { label: 'Q1', value: 23, color: '#8B5CF6' },
    { label: 'Q2', value: 34, color: '#10B981' },
    { label: 'Q3', value: 28, color: '#F59E0B' },
    { label: 'Q4', value: 41, color: '#BA181B' },
  ];

  const productData = [
    { label: 'Prod A', value: 120 },
    { label: 'Prod B', value: 95 },
    { label: 'Prod C', value: 140 },
    { label: 'Prod D', value: 78 },
    { label: 'Prod E', value: 105 },
  ];

  const monthlyData = [
    { label: 'Jan', value: 32 },
    { label: 'Feb', value: 41 },
    { label: 'Mar', value: 35 },
    { label: 'Apr', value: 48 },
    { label: 'May', value: 52 },
    { label: 'Jun', value: 61 },
    { label: 'Jul', value: 58 },
    { label: 'Aug', value: 67 },
    { label: 'Sep', value: 55 },
    { label: 'Oct', value: 72 },
    { label: 'Nov', value: 68 },
    { label: 'Dec', value: 81 },
  ];

  return (
    <div className='min-h-screen flex flex-col'>
      <AppBar />
      <div className='container self-center flex flex-col gap-8 px-4 py-8 flex-1'>
        <div>
          <h1 className='text-4xl font-bold text-gray-300 mb-2'>BarChart</h1>
          <p className='text-lg text-gray-400'>
            Displays data in vertical bars for easy comparison across
            categories.
          </p>
        </div>

        <div>
          <h1 className='text-3xl font-bold text-gray-300 mb-4'>Usage</h1>
          <div className='bg-[#161A1D] rounded-lg p-6'>
            <code className='text-sm text-gray-300'>
              import &#123; BarChart &#125; from
              &quot;./app/components/charts/BarChart&quot;
            </code>
          </div>
        </div>

        <div className='mb-12'>
          <h2 className='text-3xl font-bold text-gray-300 mb-6'>Examples</h2>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Weekly Sales */}
            <Card variant='elevated' padding='lg'>
              <h3 className='text-xl font-semibold text-gray-300 mb-4'>
                Weekly Sales
              </h3>
              <BarChart
                data={salesData}
                title='Sales Performance'
                height={280}
              />
              <div className='mt-6 pt-6 border-t border-gray-300'>
                <pre className='text-xs text-gray-300 overflow-x-auto'>
                  <code>{`const salesData = [
  { label: 'Mon', value: 45, color: '#187DBA' },
  { label: 'Tue', value: 62, color: '#187DBA' },
  { label: 'Wed', value: 38, color: '#187DBA' },
  { label: 'Thu', value: 71, color: '#187DBA' },
  { label: 'Fri', value: 55, color: '#187DBA' },
  { label: 'Sat', value: 82, color: '#187DBA' },
  { label: 'Sun', value: 49, color: '#187DBA' },
];

<BarChart 
  data={salesData} 
  title="Sales Performance"
  height={280}
/>`}</code>
                </pre>
              </div>
            </Card>

            {/* Quarterly Performance */}
            <Card variant='elevated' padding='lg'>
              <h3 className='text-xl font-semibold text-gray-300 mb-4'>
                Quarterly Performance
              </h3>
              <BarChart
                data={performanceData}
                title='Q1-Q4 Revenue'
                height={280}
              />
              <div className='mt-6 pt-6 border-t border-gray-700'>
                <pre className='text-xs text-gray-300 overflow-x-auto'>
                  <code>{`const performanceData = [
  { label: 'Q1', value: 23, color: '#8B5CF6' },
  { label: 'Q2', value: 34, color: '#10B981' },
  { label: 'Q3', value: 28, color: '#F59E0B' },
  { label: 'Q4', value: 41, color: '#BA181B' },
];

<BarChart 
  data={performanceData}
  title="Q1-Q4 Revenue"
  height={280}
/>`}</code>
                </pre>
              </div>
            </Card>

            {/* Product Comparison */}
            <Card variant='outlined' padding='lg'>
              <h3 className='text-xl font-semibold text-gray-300 mb-4'>
                Product Sales Comparison
              </h3>
              <BarChart
                data={productData}
                title='Units Sold by Product'
                height={300}
              />
              <div className='mt-6 pt-6 border-t border-gray-700'>
                <pre className='text-xs text-gray-300 overflow-x-auto'>
                  <code>{`const productData = [
  { label: 'Prod A', value: 120 },
  { label: 'Prod B', value: 95 },
  { label: 'Prod C', value: 140 },
  { label: 'Prod D', value: 78 },
  { label: 'Prod E', value: 105 },
];

<BarChart 
  data={productData}
  title="Units Sold by Product"
  height={300}
/>`}</code>
                </pre>
              </div>
            </Card>

            {/* Monthly Trends */}
            <Card variant='outlined' padding='lg'>
              <h3 className='text-xl font-semibold text-gray-300 mb-4'>
                Monthly Trends
              </h3>
              <BarChart
                data={monthlyData}
                title='Monthly Revenue ($K)'
                height={300}
              />
              <div className='mt-6 pt-6 border-t border-gray-700'>
                <pre className='text-xs text-gray-300 overflow-x-auto'>
                  <code>{`const monthlyData = [
  { label: 'Jan', value: 32 },
  { label: 'Feb', value: 41 },
  // ... more months
  { label: 'Dec', value: 81 },
];

<BarChart 
  data={monthlyData}
  title="Monthly Revenue ($K)"
  height={300}
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
                    <td className='py-2 px-3 font-mono text-blue-400'>
                      height
                    </td>
                    <td className='py-2 px-3'>number</td>
                    <td className='py-2 px-3'>300</td>
                    <td className='py-2 px-3'>Chart height in pixels</td>
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

export default BarChartPage;
