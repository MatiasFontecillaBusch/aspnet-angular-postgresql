export interface Product {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
  stock: number;

  createdAt: Date | string;
}

export interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  id: number;
}

export interface ProductsParams {
  page: number;
  pageSize: number;
}
