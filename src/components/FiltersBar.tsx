import React, { useEffect, useState } from "react";
import { CategoryAPI } from "../apis/categories.api";
import { INITIAL_FILTERS } from "../constants/common.constant";
import { useToast } from "../contexts/ToastContext";
import { ICategory } from "../types/Category.type";
import { ISort, ProductsRequestParams } from "../types/Product.type";
import { parseSearchParams } from "../utils/parseSearchParams";
import Checkbox from "./Checkbox";
import StarRating from "./StarRating";

type Props = {
  onFilter: React.Dispatch<React.SetStateAction<ProductsRequestParams>>;
  onClose: () => void;
};

const FiltersBar = (props: Props) => {
  const { onFilter, onClose } = props;
  const { showToast } = useToast();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);
  const [selectedRating, setSelectedRating] = useState<number | undefined>(
    undefined
  );
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  useEffect(() => {
    getCategories();
    const existedFilters = parseSearchParams();
    if (existedFilters.categoryId !== undefined) {
      setSelectedCategoryId(existedFilters.categoryId);
    }
    if (existedFilters.rating !== undefined) {
      setSelectedRating(existedFilters.rating);
    }
    if (existedFilters.minPrice !== undefined) {
      setMinPrice(existedFilters.minPrice);
    }
    if (existedFilters.maxPrice !== undefined) {
      setMaxPrice(existedFilters.maxPrice);
    }
  }, []);

  const getCategories = async () => {
    const categoriesList = await CategoryAPI.getAllCategories();
    setCategories(categoriesList);
  };

  const handleCheckboxChange = (
    key: keyof Pick<ProductsRequestParams, "categoryId" | "rating">,
    value: number
  ) => {
    if (key === "categoryId") {
      setSelectedCategoryId((prev) => (prev === value ? undefined : value));
    } else {
      setSelectedRating((prev) => (prev === value ? undefined : value));
    }
  };

  const handleChangePrice = (
    type: "min" | "max",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Math.max(Number.parseFloat(event.target.value), 0);
    if (type === "min") {
      setMinPrice(Number.isNaN(value) ? -Infinity : value);
    } else {
      setMaxPrice(Number.isNaN(value) ? Infinity : value);
    }
  };

  const handleApplyFilters = () => {
    if (minPrice && maxPrice && minPrice >= maxPrice) {
      showToast("error", "Min price must be smaller than max price!");
      return;
    }
    onFilter((prev) => ({
      ...prev,
      categoryId: selectedCategoryId,
      rating: selectedRating,
    }));
    if (minPrice) {
      if (minPrice === -Infinity) {
        onFilter((prev) => {
          delete prev.minPrice;
          return prev;
        });
      } else {
        onFilter((prev) => ({ ...prev, minPrice }));
      }
    }
    if (maxPrice) {
      if (maxPrice === Infinity) {
        onFilter((prev) => {
          delete prev.maxPrice;
          return prev;
        });
      } else {
        onFilter((prev) => ({ ...prev, maxPrice }));
      }
    }
    onClose();
  };

  const handleClearFilters = () => {
    onFilter(INITIAL_FILTERS);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSelectedCategoryId(undefined);
    setSelectedRating(undefined);
    onClose();
  };

  return (
    <div className="fixed overflow-scroll md:overflow-auto md:relative inset-0 w-full md:w-[200px] bg-white flex-shrink-0 rounded-sm p-6 md:p-2 z-10">
      <h5 className="font-medium text-base">Category</h5>
      {categories &&
        categories.map((category) => (
          <div className="w-full p-2 text-sm" key={category.id}>
            <Checkbox
              isChecked={selectedCategoryId === category.id}
              id={category.id.toString()}
              onChange={() => handleCheckboxChange("categoryId", category.id)}
            >
              {category.name.toUpperCase()}
            </Checkbox>
          </div>
        ))}
      <h5 className="font-medium text-base">Price</h5>
      <div className="grid grid-cols-2 gap-x-2 w-full mt-2">
        <input
          type="number"
          placeholder="Min"
          value={minPrice ?? ""}
          className="p-2 outline-none border border-gray-300 text-xs appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={(e) => handleChangePrice("min", e)}
        />
        <input
          type="number"
          placeholder="Max"
          value={maxPrice ?? ""}
          className="p-2 outline-none border border-gray-300 text-xs appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={(e) => handleChangePrice("max", e)}
        />
      </div>
      <h5 className="font-medium text-base mt-2">Rating</h5>
      <div className="flex flex-col">
        {Array.from({ length: 5 }, (_, index) => (
          <StarRating
            key={5 - index}
            rating={5 - index}
            selectedRating={selectedRating}
            onChange={handleCheckboxChange}
          />
        ))}
      </div>
      <div className="flex justify-end gap-x-4 mt-4">
        <button
          className="text-sm px-3 py-1 border-[1px] border-black hover:bg-gray-200 rounded-md"
          onClick={handleClearFilters}
        >
          Clear
        </button>
        <button
          className="bg-gray-900 hover:bg-gray-700 px-3 py-1 text-white rounded-md"
          onClick={handleApplyFilters}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FiltersBar;
