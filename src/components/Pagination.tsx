import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import { ProductsRequestParams } from '../types/Product.type';

type Props = {
  current: number;
  total: number;
  onChange: React.Dispatch<React.SetStateAction<ProductsRequestParams>>;
};

const Pagination = (props: Props) => {
  const { current, total, onChange } = props;
  const handleDecrease = () => {
    onChange((prev) => ({ ...prev, page: current - 1 }));
  };

  const handleIncrease = () => {
    onChange((prev) => ({ ...prev, page: current + 1 }));
  };
  return (
    <div className='flex items-center gap-8'>
      <button
        disabled={current === 1}
        className='rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
        type='button'
        onClick={handleDecrease}
      >
        <ArrowLeftIcon />
      </button>
      <p className='text-slate-600'>
        Page <strong className='text-slate-800'>{current}</strong> of&nbsp;
        <strong className='text-slate-800'>{total}</strong>
      </p>
      <button
        disabled={current === total}
        className='rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
        type='button'
        onClick={handleIncrease}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
