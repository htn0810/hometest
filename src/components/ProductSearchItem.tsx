import { IProduct } from '../types/Product.type';

type Props = {
  product: IProduct;
};

const ProductSearchItem = (props: Props) => {
  const { product } = props;
  return (
    <div className='flex gap-x-2 mb-1 text-sm hover:bg-gray-100 cursor-pointer'>
      <div className='flex-shrink-0 size-8 xl:size-10'>
        <img src={product.image} alt={product.title} className='w-full h-full object-contain' />
      </div>
      <div className='flex flex-col'>
        <div className='text-sm line-clamp-1'>{product.title}</div>
        <span className='text-xs text-gray-600'>{product.price} $</span>
      </div>
    </div>
  );
};

export default ProductSearchItem;
