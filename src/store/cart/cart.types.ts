import {ICartItem} from "@/components/interfaces/cart-item.interface";


export interface ICartInitialState {
    items: ICartItem[];
}

export interface IAddToCartPayload extends Omit<ICartItem, 'id'> {

}

export interface IRemoveFromCartPayload extends Omit<ICartItem, 'products_quantity'> {

}

export interface IChangeQuantityPayload extends Pick<ICartItem, 'id'> {
    type: 'increase' | 'decrease';
}

export type TypeSize = 'short' | 'tall' | 'grande' | 'venti';
export interface IChangeSizePayload extends Pick<ICartItem, 'id'> {
    size: TypeSize;
}