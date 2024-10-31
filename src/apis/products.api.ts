import { LIMIT } from '../constants/common.constant';
import { IProduct, ProductsRequestParams, ProductsResponse } from '../types/Product.type';

const concatParams = (params: ProductsRequestParams): string => {
  let url = `https://jsonserverec.onrender.com/products?_limit=${LIMIT}`;
  if (params.page) {
    url += `&_page=${params.page}`;
  }
  if (params.categoryId) {
    url += `&category.id=${params.categoryId}`;
  }
  if (params.rating) {
    url += `&rating=${params.rating}`;
  }
  if (params.minPrice) {
    url += `&price_gte=${params.minPrice}`;
  }
  if (params.maxPrice) {
    url += `&price_lte=${params.maxPrice}`;
  }
  if (params.sort) {
    url += `&_sort=${params.sort.key}&_order=${params.sort.type}`;
  }
  return url;
};

export class ProductAPI {
  static getAllProducts = async (params: ProductsRequestParams): Promise<ProductsResponse> => {
    const url = concatParams(params);
    const response = await fetch(url);
    const data: ProductsResponse = await response.json();
    return data;
  };

  static searchProducts = async (text: string): Promise<IProduct[]> => {
    const response = await fetch(`https://jsonserverec.onrender.com/products?title_like=${text}`);
    const data = await response.json();
    return data;
  };
}
