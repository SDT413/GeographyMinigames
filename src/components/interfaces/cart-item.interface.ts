import {IProduct} from "@/components/interfaces/Product.interface";
import {TypeSize} from "@/store/cart/cart.types";

export interface ICartItem {
    id: number;
    product: IProduct;
    products_quantity: number;
    size: TypeSize;
}