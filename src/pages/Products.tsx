import { useEffect, useState } from "react";
import FilterIcon from "../icons/FilterIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import { IProduct, ISort, ProductsRequestParams } from "../types/Product.type";
import { ProductAPI } from "../apis/products.api";
import ProductCard from "../components/ProductCard";
import Dropdown from "../components/Dropdown";
import DropdownItem from "../components/DropdownItem";
import { CategoryAPI } from "../apis/categories.api";
import Checkbox from "../components/Checkbox";
import Pagination from "../components/Pagination";
import { ICategory } from "../types/Category.type";
import { INITIAL_FILTERS } from "../constants/common.constant";
import { useLoading } from "../contexts/LoadingContext";
import { useSearchParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import { useToast } from "../contexts/ToastContext";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const Products = () => {
  const { showToast } = useToast();
  const { showLoading, hideLoading } = useLoading();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);
  const [selectedRating, setSelectedRating] = useState<number | undefined>(
    undefined
  );
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [searchParams, setSearchParams] = useSearchParams();

  const parseSearchParams = (): ProductsRequestParams => {
    const params = new URLSearchParams(window.location.search);
    console.log(params);
    const existedFilters: ProductsRequestParams = {
      page: Number(params.get("page")) || 1,
      sort: params.get("sort")
        ? {
            key: params.get("sort") as ISort["key"],
            type: (params.get("order") as ISort["type"]) || "asc",
          }
        : undefined,
      categoryId: params.has("categoryId")
        ? Number(params.get("categoryId"))
        : undefined,
      rating: params.has("rating") ? Number(params.get("rating")) : undefined,
      minPrice: params.has("minPrice")
        ? Number(params.get("minPrice"))
        : undefined,
      maxPrice: params.has("maxPrice")
        ? Number(params.get("maxPrice"))
        : undefined,
    };
    return existedFilters;
  };

  const [filters, setFilters] = useState<ProductsRequestParams>(
    parseSearchParams()
  );

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

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (key === "sort" && value) {
        params.set("sort", value.key.toString());
        params.set("order", value.type.toString());
      } else if (value !== undefined) {
        params.set(key, value.toString());
      }
    });
    setSearchParams(params);

    getProducts();
  }, [JSON.stringify(filters), setSearchParams]);

  const getProducts = async () => {
    showLoading();
    setIsFetching(true);
    try {
      const response = await ProductAPI.getAllProducts(filters);
      if (response.pagination._totalPages < filters.page) {
        setFilters((prev) => ({ ...prev, page: 1 }));
      }
      setTotalPages(response.pagination._totalPages);
      setProducts(response.data);
    } catch (error) {
      showToast("error", "Have errors when fetching!");
    } finally {
      setIsFetching(false);
      setTimeout(() => hideLoading(), 200);
    }
  };

  const getCategories = async () => {
    const categoriesList = await CategoryAPI.getAllCategories();
    setCategories(categoriesList);
  };

  const hideFilters = () => {
    setShowFilters(false);
  };

  const handleSort = (sort: ISort) => {
    setFilters((prev) => {
      if (
        prev.sort &&
        prev.sort.key === sort.key &&
        prev.sort.type === sort.type
      ) {
        return { ...prev, sort: undefined };
      }
      return { ...prev, sort: sort };
    });
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
    if (selectedCategoryId) {
      setFilters((prev) => ({ ...prev, categoryId: selectedCategoryId }));
    }
    if (selectedRating) {
      setFilters((prev) => ({ ...prev, rating: selectedRating }));
    }
    if (minPrice) {
      if (minPrice === -Infinity) {
        setFilters((prev) => {
          delete prev.minPrice;
          return prev;
        });
      } else {
        setFilters((prev) => ({ ...prev, minPrice }));
      }
    }
    if (maxPrice) {
      if (maxPrice === Infinity) {
        setFilters((prev) => {
          delete prev.maxPrice;
          return prev;
        });
      } else {
        setFilters((prev) => ({ ...prev, maxPrice }));
      }
    }
    hideFilters();
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSelectedCategoryId(undefined);
    setSelectedRating(undefined);
    hideFilters();
  };

  return (
    <div className="relative">
      <div className="flex justify-end gap-x-4">
        <div
          className="flex gap-x-2 items-center cursor-pointer"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          <span>{showFilters ? "Hide" : "Show"} Filters</span>
          <FilterIcon className="size-6" />
        </div>
        <Dropdown title="Sort By" icon={<ArrowDownIcon className="size-6" />}>
          <DropdownItem
            onClick={() => handleSort({ key: "price", type: "desc" })}
            isActive={
              filters.sort?.key === "price" && filters.sort.type === "desc"
            }
          >
            Price: High-Low
          </DropdownItem>
          <DropdownItem
            onClick={() => handleSort({ key: "price", type: "asc" })}
            isActive={
              filters.sort?.key === "price" && filters.sort.type === "asc"
            }
          >
            Price: Low-High
          </DropdownItem>
          <DropdownItem
            onClick={() => handleSort({ key: "title", type: "asc" })}
            isActive={
              filters.sort?.key === "title" && filters.sort.type === "asc"
            }
          >
            Name: Asc-Desc
          </DropdownItem>
          <DropdownItem
            onClick={() => handleSort({ key: "title", type: "desc" })}
            isActive={
              filters.sort?.key === "title" && filters.sort.type === "desc"
            }
          >
            Name: Desc-Asc
          </DropdownItem>
          <DropdownItem
            onClick={() => handleSort({ key: "rating", type: "desc" })}
            isActive={
              filters.sort?.key === "rating" && filters.sort.type === "desc"
            }
          >
            Rate: High-Low
          </DropdownItem>
          <DropdownItem
            onClick={() => handleSort({ key: "rating", type: "asc" })}
            isActive={
              filters.sort?.key === "rating" && filters.sort.type === "asc"
            }
          >
            Rate: Low-High
          </DropdownItem>
        </Dropdown>
      </div>
      {/* Show Products */}
      <div className="flex gap-x-4">
        {showFilters && (
          <div className="fixed overflow-scroll md:overflow-auto md:relative inset-0 w-full md:w-[200px] bg-white flex-shrink-0 rounded-sm p-6 md:p-2 z-10">
            <h5 className="font-medium text-base">Category</h5>
            {categories &&
              categories.map((category) => (
                <div className="w-full p-2 text-sm" key={category.id}>
                  <Checkbox
                    isChecked={selectedCategoryId === category.id}
                    id={category.id.toString()}
                    onChange={() =>
                      handleCheckboxChange("categoryId", category.id)
                    }
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
                value={minPrice || undefined}
                className="p-2 outline-none border border-gray-300 text-xs appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={(e) => handleChangePrice("min", e)}
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice || undefined}
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
        )}
        {isFetching ? (
          <div className="w-full">
            <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
              {Array.from({ length: 12 }, (_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {products.length > 0 ? (
              <div className="w-full">
                <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
                  {products.map((product) => (
                    <ProductCard product={product} key={product.id} />
                  ))}
                </div>
                <div className="my-6 flex justify-center">
                  <Pagination
                    current={filters.page}
                    onChange={setFilters}
                    total={totalPages}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-center items-center">
                Not found any products
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
