import { ISort, ProductsRequestParams } from '../types/Product.type';

export const parseSearchParams = (): ProductsRequestParams => {
  const params = new URLSearchParams(window.location.search);
  const existedFilters: ProductsRequestParams = {
    page: Number(params.get('page')) || 1,
    sort: params.get('sort')
      ? {
          key: params.get('sort') as ISort['key'],
          type: (params.get('order') as ISort['type']) || 'asc',
        }
      : undefined,
    categoryId: params.has('categoryId') ? Number(params.get('categoryId')) : undefined,
    rating: params.has('rating') ? Number(params.get('rating')) : undefined,
    minPrice: params.has('minPrice') ? Number(params.get('minPrice')) : undefined,
    maxPrice: params.has('maxPrice') ? Number(params.get('maxPrice')) : undefined,
  };
  return existedFilters;
};
