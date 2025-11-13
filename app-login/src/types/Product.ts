export interface Product {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: string; // Optional: to track who created the product
}

export interface CreateProductRequest {
  title: string;
  description: string;
}

export interface UpdateProductRequest {
  title?: string;
  description?: string;
}
