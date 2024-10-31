import TrashIcon from '../icons/TrashIcon';
import { useCart } from '../contexts/CartContext';

type Props = {
  prodId: number;
  quantity: number;
};

const InputCounter = (props: Props) => {
  const { removeFromCart, updateCart } = useCart();
  const { prodId, quantity } = props;

  const handleDecreaseItem = () => {
    if (quantity === 1) {
      removeFromCart(prodId);
      return -1;
    } else {
      updateCart(prodId, quantity - 1);
      return quantity - 1;
    }
  };

  const handleIncreseItem = () => {
    updateCart(prodId, quantity + 1);
    return quantity + 1;
  };

  return (
    <div className='border-[1px] border-gray-300 inline-block rounded-full'>
      <button className='px-3 py-1 text-base lg:text-xl rounded-full hover:bg-gray-100' onClick={handleDecreaseItem}>
        {quantity === 1 ? <TrashIcon className='size-3 lg:size-4 hover:text-red-500' /> : '-'}
      </button>
      <input type='text' disabled value={quantity} className='bg-white px-2 w-10 text-center text-sm lg:text-base' />
      <button className='px-3 py-1 text-base lg:text-xl rounded-full hover:bg-gray-100' onClick={handleIncreseItem}>
        +
      </button>
    </div>
  );
};

export default InputCounter;
