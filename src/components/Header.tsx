import React, { useEffect, useRef, useState } from 'react';
import CartIcon from '../icons/CartIcon';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import ProductSearchItem from './ProductSearchItem';
import { IProduct } from '../types/Product.type';
import { ProductAPI } from '../apis/products.api';
import { debounce } from '../utils/debounce';

const Header = () => {
  const { state } = useCart();
  const navigate = useNavigate();
  const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleSearchProducts = async (text: string) => {
    const data = await ProductAPI.searchProducts(text);
    setSearchedProducts(data);
    setIsPopupVisible(true);
  };

  const debouncedSearch = debounce(handleSearchProducts, 500);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    debouncedSearch(text);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsPopupVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='sticky top-0 left-0 right-0 z-20 flex gap-x-2 items-center justify-between bg-slate-900 px-4 -mx-4 sm:px-6 sm:-mx-6 md:px-10 md:-mx-10 lg:-mx-20 lg:px-20 py-3 shadow-md'>
      <h3 className='font-semibold cursor-pointer text-white text-lg md:text-xl hidden xs:block'>HOME TEST</h3>
      <div className='flex-grow xs:flex-grow-0 xs:min-w-[200px] md:min-w-[360px] relative' ref={popupRef}>
        <input
          type='text'
          className='border-none outline-none px-3 py-2 rounded-sm text-xs md:text-sm w-full'
          placeholder='Search product...'
          onChange={handleInputChange}
        />
        {isPopupVisible && searchedProducts.length > 0 && (
          <div className='absolute z-10 mt-1 w-full h-auto max-h-[160px] overflow-y-scroll overflow-x-hidden bg-white rounded-sm shadow-md px-3 py-2'>
            {searchedProducts.map((product) => (
              <ProductSearchItem product={product} key={product.id} />
            ))}
          </div>
        )}
      </div>
      <div className='relative cursor-pointer' onClick={() => navigate('/cart')}>
        <CartIcon className='text-white size-6 md:size-7' />
        {state.products.length > 0 && (
          <span className='absolute -top-1/4 -right-1/4 size-5 rounded-full bg-red-600 text-center text-white text-sm'>
            {state.products.length}
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
