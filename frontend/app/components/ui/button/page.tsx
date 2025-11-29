'use client';

import AppBar from '../../AppBar';
import Button from '../../Button';
import Card from '../../Card';
import Footer from '../../Footer';

const ButtonPage = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <AppBar />
      <div className='container flex flex-col gap-8 px-4 py-8 flex-1'>
        <div>
          <h1 className='text-4xl font-bold text-gray-300 mb-2'>Button</h1>
          <p className='text-lg text-gray-400'>
            Displays a button or a component that looks like a button.
          </p>
        </div>

        <div>
          <h1 className='text-3xl font-bold text-gray-300 mb-4'>Usage</h1>
          <div className='bg-[#161A1D] rounded-lg p-6'>
            <code className='text-sm text-gray-300'>
              import &#123; Button &#125; from
              &quot;./app/components/ui/Button.tsx&quot;
            </code>
          </div>
        </div>

        <div className='mb-12'>
          <Card variant='elevated' padding='lg' className='max-w-2xl'>
            <div className='flex flex-col gap-4 items-center'>
              <div className='flex flex-wrap gap-3 justify-center'>
                <Button variant='primary' size='md'>
                  Primary
                </Button>
                <Button variant='secondary' size='md'>
                  Secondary
                </Button>
                <Button variant='outline' size='md'>
                  Outline
                </Button>
                <Button variant='danger' size='md'>
                  Danger
                </Button>
              </div>
              <div className='flex flex-wrap gap-3 justify-center'>
                <Button variant='primary' size='sm'>
                  Small
                </Button>
                <Button variant='primary' size='md'>
                  Medium
                </Button>
                <Button variant='primary' size='lg'>
                  Large
                </Button>
              </div>
            </div>
            <div className='mt-6 pt-6 border-t border-gray-700'>
              <pre className='text-xs text-gray-300 overflow-x-auto'>
                <code>{`<Button variant="primary" size="md">
  Primary Button
</Button>

<Button variant="secondary" size="md">
  Secondary Button
</Button>

<Button variant="outline" size="md">
  Outline Button
</Button>

<Button variant="danger" size="md">
  Danger Button
</Button>`}</code>
              </pre>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ButtonPage;
