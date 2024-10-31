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
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
          <path
            fillRule='evenodd'
            d='M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z'
            clipRule='evenodd'
          />
        </svg>
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
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
          <path
            fillRule='evenodd'
            d='M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z'
            clipRule='evenodd'
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
