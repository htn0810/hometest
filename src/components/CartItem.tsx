import { IProductInCart } from '../types/Product.type'
import InputCounter from './InputCounter'
import Tooltip from './Tooltip'

type Props = {
  product: IProductInCart
}

const CartItem = (props: Props) => {
  const {product} = props;

  return (
    <div className='flex gap-x-2 items-center pb-4 mb-4 border-b-[1px] border-b-gray-200'> 
      <div className='flex-shrink-0 size-24 lg:size-40 mb-2 bg-white'>
        <img src={product.image} alt="" className='w-full h-full object-contain'/>
      </div>
      <div className='flex-grow'>
        <h3 className='text-xs lg:text-sm text-gray-500'>{product.category.name.toUpperCase()}</h3>
        <div className='flex justify-between'>
          <Tooltip text={product.title} className='w-3/5'>
            <h5 className='text-sm lg:text-base font-medium mb-2 md:mb-4 w-full line-clamp-1'>{product.title}</h5>
          </Tooltip>
          <span className='text-sm lg:text-base'>{product.price} $</span>
        </div>
        <InputCounter prodId={product.id} quantity={product.quantity}/>
      </div>
    </div>
  )
}

export default CartItem
