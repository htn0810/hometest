import { useEffect, useMemo, useReducer } from "react";
import { IProductInCart } from "../types/Product.type";
import { CartState } from "../types/Cart.type";
import { CartContext } from "../contexts/CartContext";
import { SHIPPING_FEE } from "../constants/common.constant";
import useLocalStorage from "../customhooks/useLocalStorage";

// Define the types of actions we’ll use
type CartAction =
  | { type: "ADD_TO_CART"; product: IProductInCart }
  | { type: "REMOVE_FROM_CART"; productId: number }
  | { type: "UPDATE_CART"; productId: number; quantity: number }
  | { type: "CLEAR_CART" };

// Initial state for the cart
const initialCartState: CartState = {
  products: [],
};

// Reducer function to manage cart state
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProduct = state.products.find(
        (product) => product.id === action.product.id
      );
      if (existingProduct) {
        // Update quantity if product already in cart
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === action.product.id
              ? {
                  ...product,
                  quantity: product.quantity + action.product.quantity,
                }
              : product
          ),
        };
      } else {
        // Add new product to cart
        return {
          ...state,
          products: [...state.products, { ...action.product, quantity: 1 }],
        };
      }
    }
    case "UPDATE_CART": {
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.productId
            ? { ...product, quantity: action.quantity }
            : product
        ),
      };
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.productId
        ),
      };
    }
    case "CLEAR_CART": {
      return initialCartState;
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [storedCart, setStoredCart] = useLocalStorage<CartState>(
    "cart",
    initialCartState
  );
  const [state, dispatch] = useReducer(
    cartReducer,
    storedCart || initialCartState
  );

  useEffect(() => {
    setStoredCart(state);
  }, [state, setStoredCart]);

  // Define actions
  const addToCart = (product: IProductInCart) => {
    dispatch({ type: "ADD_TO_CART", product });
  };

  const updateCart = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_CART", productId, quantity });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", productId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const subTotalPrice = useMemo(() => {
    if (state.products.length === 0) return 0;
    return parseFloat(
      state.products
        .reduce((prev, current) => prev + current.quantity * current.price, 0)
        .toFixed(2)
    );
  }, [state.products]);

  const totalPrice = useMemo(() => {
    return subTotalPrice + state.products.length > 0 ? SHIPPING_FEE : 0;
  }, [subTotalPrice]);

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        updateCart,
        removeFromCart,
        clearCart,
        subTotalPrice,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
