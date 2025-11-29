import Button from './Button';
import Card from './Card';

export const ButtonsCard = () => {
  return (
    <Card
      title='Buttons'
      subtitle='Interactive button components'
      variant='elevated'
      padding='md'
    >
      <div className='flex flex-col gap-3 h-full'>
        <div className='flex flex-col gap-4 flex-1 items-center justify-center'>
          <div className='flex flex-wrap gap-2 justify-center'>
            <Button variant='primary' size='sm'>
              Primary
            </Button>
            <Button variant='secondary' size='sm'>
              Secondary
            </Button>
            <Button variant='outline' size='sm'>
              Outline
            </Button>
            <Button variant='danger' size='sm'>
              Danger
            </Button>
            <Button variant='primary' disabled size='sm'>
              Disabled
            </Button>
          </div>
          <div className='flex flex-wrap gap-2 justify-center'>
            <Button
              variant='primary'
              size='sm'
              startIcon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path d='M5 12h14M12 5l7 7-7 7' />
                </svg>
              }
            >
              With Icon
            </Button>
            <Button
              variant='outline'
              size='sm'
              endIcon={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <polyline points='9 18 15 12 9 6' />
                </svg>
              }
            >
              Next
            </Button>
          </div>
        </div>

        <div className='flex gap-2'>
          <Button variant='primary' size='md' fullWidth>
            Full Width
          </Button>
        </div>
      </div>
    </Card>
  );
};
