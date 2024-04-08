import {IProduct} from "@/components/interfaces/Product.interface";

export interface IProductSliderItem {
    product: IProduct;
    index: number;
    productsCount: number;
}

export interface IProductSliderItemHeader extends Omit<IProductSliderItem, 'index'> {
    isActive: boolean;
    onSelectItem: () => void;
}