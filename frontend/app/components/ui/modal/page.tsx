'use client';

import { useState } from 'react';
import AppBar from '../../AppBar';
import Button from '../../Button';
import Card from '../../Card';
import Modal from '../Modal';

const ModalPage = () => {
  const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);
  const [isMediumModalOpen, setIsMediumModalOpen] = useState(false);
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
  const [isFooterModalOpen, setIsFooterModalOpen] = useState(false);

  return (
    <div className='min-h-screen'>
      <AppBar />
      <div className='container flex flex-col gap-8 px-4 py-8'>
        <div>
          <h1 className='text-4xl font-bold text-gray-300 mb-2'>Modal</h1>
          <p className='text-lg text-gray-400'>
            A dialog window that displays content over the main page.
          </p>
        </div>

        <div>
          <h1 className='text-3xl font-bold text-gray-300 mb-4'>Usage</h1>
          <div className='bg-[#161A1D] rounded-lg p-6'>
            <code className='text-sm text-gray-300'>
              import &#123; Modal &#125; from
              &quot;./app/components/ui/Modal.tsx&quot;
            </code>
          </div>
        </div>

        <div className='mb-12'>
          <Card variant='elevated' padding='lg' className='max-w-2xl'>
            <div className='flex flex-col gap-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <Button
                  variant='primary'
                  size='md'
                  onClick={() => setIsSmallModalOpen(true)}
                >
                  Small Modal
                </Button>
                <Button
                  variant='secondary'
                  size='md'
                  onClick={() => setIsMediumModalOpen(true)}
                >
                  Medium Modal
                </Button>
                <Button
                  variant='outline'
                  size='md'
                  onClick={() => setIsLargeModalOpen(true)}
                >
                  Large Modal
                </Button>
                <Button
                  variant='danger'
                  size='md'
                  onClick={() => setIsFooterModalOpen(true)}
                >
                  Modal with Footer
                </Button>
              </div>
            </div>
            <div className='mt-6 pt-6 border-t border-gray-700'>
              <pre className='text-xs text-gray-300 overflow-x-auto'>
                <code>{`<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  <p>Modal content goes here</p>
</Modal>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="With Footer"
  size="md"
  footer={
    <>
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onSave}>
        Save
      </Button>
    </>
  }
>
  <p>Modal with footer actions</p>
</Modal>`}</code>
              </pre>
            </div>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isSmallModalOpen}
        onClose={() => setIsSmallModalOpen(false)}
        title='Small Modal'
        size='sm'
      >
        <p className='text-gray-700'>
          This is a small modal. It&apos;s perfect for brief messages or simple
          confirmations.
        </p>
      </Modal>

      <Modal
        isOpen={isMediumModalOpen}
        onClose={() => setIsMediumModalOpen(false)}
        title='Medium Modal'
        size='md'
      >
        <p className='text-gray-700'>
          This is a medium modal with more content space. You can use it for
          forms, detailed information, or any content that needs a bit more
          room.
        </p>
        <p className='text-gray-700 mt-4'>
          Medium modals are the default size and work well for most use cases.
        </p>
      </Modal>

      <Modal
        isOpen={isLargeModalOpen}
        onClose={() => setIsLargeModalOpen(false)}
        title='Large Modal'
        size='lg'
      >
        <p className='text-gray-700'>
          This is a large modal with plenty of space for complex content. Use it
          when you need to display detailed information, large forms, or
          multiple sections.
        </p>
        <p className='text-gray-700 mt-4'>
          Large modals are great for workflows that require multiple steps or
          extensive user interaction.
        </p>
        <div className='mt-4 p-4 bg-gray-100 rounded'>
          <h4 className='font-semibold text-gray-900 mb-2'>Example Section</h4>
          <p className='text-gray-700 text-sm'>
            You can include multiple sections, images, or other components
            within a large modal.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={isFooterModalOpen}
        onClose={() => setIsFooterModalOpen(false)}
        title='Modal with Footer'
        size='md'
        footer={
          <>
            <Button
              variant='outline'
              size='md'
              onClick={() => setIsFooterModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant='primary'
              size='md'
              onClick={() => setIsFooterModalOpen(false)}
            >
              Save Changes
            </Button>
          </>
        }
      >
        <p className='text-gray-700'>
          This modal includes a footer with action buttons. It&apos;s commonly
          used for forms or confirmations where you need clear call-to-action
          buttons.
        </p>
        <div className='mt-4 space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Example Field
            </label>
            <input
              type='text'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter some text'
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalPage;
