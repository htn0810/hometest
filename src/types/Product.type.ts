import { ICategory } from "./Category.type"

export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  category: ICategory
  image: string
  rating: number
}

export interface IProductInCart  extends IProduct {
  quantity: number
}

export interface IPagination {
    _page: number,
    _limit: number,
    _totalRows: number,
    _totalPages: number
}

export interface ISort {
  key: "price" | "title" | "rating",
  type: "asc" | "desc"
}

export interface ProductsRequestParams {
  page: number,
  sort?: ISort,
  categoryId?: number,
  rating?: number,
  minPrice?: number,
  maxPrice?: number
}

export interface ProductsResponse {
  data: IProduct[],
  pagination: IPagination
}