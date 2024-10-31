import Checkbox from './Checkbox';
import StarIcon from '../icons/StarIcon';

type Props = {
  rating: number;
  selectedRating: number | undefined;
  onChange: (key: 'rating', rating: number) => void;
};

const StarRating = (props: Props) => {
  const { rating, selectedRating, onChange } = props;
  return (
    <Checkbox id={`star-${rating}`} isChecked={selectedRating === rating} onChange={() => onChange('rating', rating)}>
      <div className='flex gap-x-1 p-2'>
        {Array.from({ length: 5 }, (_, index) => (
          <StarIcon key={index} className={`size-5 ${index < rating ? 'text-yellow-500' : 'text-white'}`} />
        ))}
      </div>
    </Checkbox>
  );
};

export default StarRating;
