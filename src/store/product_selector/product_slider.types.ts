import {EnumSort} from "@/components/interfaces/sorting.interface";
import {IProduct} from "@/components/interfaces/Product.interface";

export interface IProductSliderInitialState {
    selectedItemIndex: number;
    items: IProduct[];
    sortType: EnumSort;
    searchQuery: string;
}
