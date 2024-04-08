import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useMemo} from "react";

export const useCart = () => {
    const cart = useTypedSelector(state => state.cart.items);
    const total = cart.reduce((acc, item) => acc + item.product.price * item.products_quantity, 0);
    return useMemo(() => ({cart, total}), [cart, total]);
}