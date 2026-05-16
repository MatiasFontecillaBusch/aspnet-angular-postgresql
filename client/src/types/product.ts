export interface Product {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;

  createdAt: Date | string;
}

export interface CreateProductDto {
  name: string;
  price: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  id: number;
}

export interface ProductsParams {
  page: number;
  pageSize: number;
}
