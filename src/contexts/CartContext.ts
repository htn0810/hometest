import { createContext, useContext } from 'react';
import { IProductInCart } from '../types/Product.type';
import { CartState } from '../types/Cart.type';

// Define the context interface
interface CartContextProps {
  state: CartState;
  addToCart: (product: IProductInCart) => void;
  removeFromCart: (productId: number) => void;
  updateCart: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  subTotalPrice: number;
}

// Create context
export const CartContext = createContext<CartContextProps | undefined>(undefined);

// Custom hook to use the CartContext
export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
