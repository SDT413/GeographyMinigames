import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    IAddToCartPayload,
    ICartInitialState,
    IChangeQuantityPayload,
    IChangeSizePayload, IRemoveFromCartPayload
} from "@/store/cart/cart.types";
import {ICartItem} from "@/components/interfaces/cart-item.interface";



const initialState: ICartInitialState = {
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
            const {product, size} = action.payload;
            const item = state.items.find((item) => item.product.id === product.id && item.size === size);
            if (!item) {
                state.items.push({
                    id: state.items.length + 1,
                    product,
                    products_quantity: 1,
                    size
                })
            }
        },
        removeCoffee: (state, action: PayloadAction<IRemoveFromCartPayload>) => {
            const {product, size} = action.payload;
            const item = state.items.find((item) => item.product.id === product.id && item.size === size);
            if (item) {
                state.items = state.items.filter((item) => item.product.id !== product.id || item.size !== size);
            }
        },
        changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
            const {type, id} = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item?.products_quantity === 1 && type === 'decrease') {
              item.products_quantity = 1;
            } else {
            if (item ) {
                if (type === 'increase') {
                    item.products_quantity++;
                } else {
                    item.products_quantity--;
                }
            }
            }
        },
        resetAndFillCart: (state, action: PayloadAction<ICartItem[]>) => {
            state.items = action.payload;
        },
        changeSize: (state, action: PayloadAction<IChangeSizePayload>) => {
            const {id, size} = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item) {
                item.size = size;
            }
        }
    }
});
