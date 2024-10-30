import CartItem from '../components/CartItem'
import { SHIPPING_FEE } from '../constants/common.constant';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const {state, totalPrice, subTotalPrice} = useCart();

  return (
    <div className='grid grid-cols-12 gap-x-6 2xl:gap-x-10 gap-y-2 md:gap-y-0'>
      <div className='col-span-full md:col-span-9'>
        <h6 className='font-medium text-lg mb-4'>Cart</h6>
        {
          state.products.length > 0 ? 
          state.products.map((product) => (
            <CartItem product={product} key={product.id}/>
          ))
          : 
          <div className='w-full text-sm'>Your cart is empty! Start shopping.</div>
        }
      </div>
      <div className='col-span-full md:col-span-3'>
        <h6 className='font-medium text-lg mb-4'>Summary</h6>
        <div className='flex justify-between text-sm '>
          <span>Subtotal</span>
          <span>{subTotalPrice} $</span>
        </div>
        <div className='flex justify-between text-sm my-2'>
          <span>Shipping Fee</span>
          <span>{state.products.length > 0 ? SHIPPING_FEE : 0} $</span>
        </div>
        <div className='w-full border-[1px] border-gray-200 my-2'></div>
        <div className='flex justify-between text-sm'>
          <span>Total</span>
          <span>{totalPrice} $</span>
        </div>
        <div className='w-full border-[1px] border-gray-200 my-2'></div> 
        <button className='w-full rounded-3xl py-2 bg-black text-white hover:bg-gray-900 mt-4'>Checkout</button>
      </div>
    </div>
  )
}

export default Cart
