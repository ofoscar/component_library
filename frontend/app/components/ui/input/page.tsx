'use client';

import AppBar from '../../AppBar';
import Card from '../../Card';
import Footer from '../../Footer';
import Input from '../../Input';

const InputPage = () => {
  return (
    <div className='min-h-screen'>
      <AppBar />
      <div className='container flex flex-col gap-8 px-4 py-8'>
        <div>
          <h1 className='text-4xl font-bold text-gray-300 mb-2'>Input</h1>
          <p className='text-lg text-gray-400'>
            Displays a form input field for collecting user input.
          </p>
        </div>

        <div>
          <h1 className='text-3xl font-bold text-gray-300 mb-4'>Usage</h1>
          <div className='bg-[#161A1D] rounded-lg p-6'>
            <code className='text-sm text-gray-300'>
              import &#123; Input &#125; from
              &quot;./app/components/ui/Input.tsx&quot;
            </code>
          </div>
        </div>

        <div className='mb-12'>
          <Card variant='elevated' padding='lg' className='max-w-2xl'>
            <div className='flex flex-col gap-4'>
              <Input placeholder='Basic input' />
              <Input label='With label' placeholder='Enter text' />
              <Input
                label='With error'
                placeholder='Enter text'
                error='This field is required'
              />
              <Input placeholder='Full width input' fullWidth />
              <Input
                label='Disabled input'
                placeholder='Cannot edit'
                disabled
              />
            </div>
            <div className='mt-6 pt-6 border-t border-gray-700'>
              <pre className='text-xs text-gray-300 overflow-x-auto'>
                <code>{`<Input placeholder="Basic input" />

<Input label="With label" placeholder="Enter text" />

<Input
  label="With error"
  placeholder="Enter text"
  error="This field is required"
/>

<Input placeholder="Full width input" fullWidth />

<Input
  label="Disabled input"
  placeholder="Cannot edit"
  disabled
/>`}</code>
              </pre>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InputPage;
