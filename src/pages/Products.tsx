import { useEffect, useState } from "react";
import FilterIcon from "../icons/FilterIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import { IProduct, ISort, ProductsRequestParams } from "../types/Product.type";
import { ProductAPI } from "../apis/products.api";
import ProductCard from "../components/ProductCard";
import Dropdown from "../components/Dropdown";
import DropdownItem from "../components/DropdownItem";
import Pagination from "../components/Pagination";
import { useLoading } from "../contexts/LoadingContext";
import { useSearchParams } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import FiltersBar from "../components/FiltersBar";
import { parseSearchParams } from "../utils/parseSearchParams";

const Products = () => {
  const { showToast } = useToast();
  const { showLoading, hideLoading } = useLoading();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<ProductsRequestParams>(
    parseSearchParams()
  );

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
            Name: A-Z
          </DropdownItem>
          <DropdownItem
            onClick={() => handleSort({ key: "title", type: "desc" })}
            isActive={
              filters.sort?.key === "title" && filters.sort.type === "desc"
            }
          >
            Name: Z-A
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
      <div className="flex gap-x-4">
        {showFilters && (
          <FiltersBar onFilter={setFilters} onClose={hideFilters} />
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
