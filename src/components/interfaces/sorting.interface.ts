import {Dispatch, SetStateAction} from "react";

export enum EnumSort {
    INCREASING_PRICE = 'INCREASING_PRICE',
    DECREASING_PRICE = 'DECREASING_PRICE',
    NEWEST = 'NEWEST',
    OLDEST = 'OLDEST'
}

export interface SortingInterface {
    name: 'Increasing price' | 'Decreasing price' | 'Newest' | 'Oldest';
    value: EnumSort;
}

export interface ISortingProps {
    sortType: EnumSort;
    setSortType: Dispatch<SetStateAction<EnumSort>>
}

export interface BackendSortingInterface {
    sortType: "price" | "date";
    sortOrder: "asc" | "desc";
}