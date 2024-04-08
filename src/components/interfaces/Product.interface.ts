export interface IProductEntity {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    reviews: IProductReview[];
    images: string[];
    createdAt: string;
    updatedAt: string;
}

export interface IProduct extends Omit<IProductEntity, "createdAt" | "updatedAt"> {
    category: string;
    quantity: number;
}

export interface IProductReview {
    id: number;
    product_id: number;
    content: string;
    rating: number;
}

export interface IProductProps {
    product: IProduct;
}