import { ICategory } from "../types/Category.type";


export class CategoryAPI {
  static getAllCategories = async (): Promise<ICategory[]> => {
    const response = await fetch('https://jsonserverec.onrender.com/categories')
    const data : ICategory[] = await response.json();
    return data;
  }
}