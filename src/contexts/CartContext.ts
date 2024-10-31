import { createContext, useContext } from 'react';
import { IProductInCart } from '../types/Product.type';
import { CartState } from '../types/Cart.type';

interface CartContextProps {
  state: CartState;
  addToCart: (product: IProductInCart) => void;
  removeFromCart: (productId: number) => void;
  updateCart: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  subTotalPrice: number;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
