import { useState } from "react";
import Tooltip from "./Tooltip";
import { IProduct } from "../types/Product.type";
import StarIcon from "../icons/StarIcon";
import { useCart } from "../contexts/CartContext";
import { useToast } from "../contexts/ToastContext";

type Props = {
  product: IProduct;
};

const ProductCard = (props: Props) => {
  const { product } = props;
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    showToast("success", "Add successfully!");
  };
  return (
    <div className="bg-white shadow-md rounded-md cursor-pointer hover:translate-y-[-6px] transition-all">
      <div className="aspect-square mb-2 relative">
        {!isImageLoaded && (
          <div className="absolute inset-0 w-full h-full bg-gray-300 animate-pulse rounded-md"></div>
        )}
        <img
          src={isError ? "/images/placehoderImg.png" : product.image}
          loading="lazy"
          alt={`IMG-${product.title}`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsError(true)}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-2">
        <Tooltip text={product.title}>
          <h6 className="font-medium text-sm truncate">{product.title}</h6>
        </Tooltip>
        <p className="text-sm text-gray-600">
          {product.category.name.toUpperCase()}
        </p>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-800">{product.price} $</span>
          <p className="flex items-center gap-x-1">
            <span>{product.rating}</span>
            <StarIcon className="size-4 text-yellow-500" />
          </p>
        </div>
      </div>
      <button
        className="w-full text-center py-2 bg-gray-900 text-white rounded-b-md hover:bg-gray-800"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
