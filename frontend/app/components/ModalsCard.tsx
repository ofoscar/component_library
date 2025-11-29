import Button from './Button';
import Card from './Card';

interface ModalsCardProps {
  onOpenModal: () => void;
}

export const ModalsCard = ({ onOpenModal }: ModalsCardProps) => {
  return (
    <Card
      title='Modals'
      subtitle='Dialog and overlay components'
      variant='default'
      padding='md'
    >
      <div className='flex flex-col gap-4 h-full'>
        <div className='flex flex-col gap-4 flex-1'>
          <p className='text-gray-300 text-sm'>
            Modals provide focused interaction surfaces for important content
            and actions.
          </p>
          <div className='flex flex-col gap-2'>
            <Button variant='primary' size='sm' fullWidth onClick={onOpenModal}>
              Open Analytics Modal
            </Button>
            <Button variant='outline' size='sm' fullWidth>
              View More Examples
            </Button>
          </div>
        </div>
        <Button>Learn More</Button>
      </div>
    </Card>
  );
};
