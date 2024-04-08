import {EnumSort, SortingInterface} from "@/components/interfaces/sorting.interface";

export const SortingData:SortingInterface[]
    = [
    {
        name: 'Increasing price',
        value: EnumSort.INCREASING_PRICE,
    },
    {
        name: 'Decreasing price',
        value: EnumSort.DECREASING_PRICE,
    },
    {
        name: 'Newest',
        value: EnumSort.NEWEST,
    },
    {
        name: 'Oldest',
        value: EnumSort.OLDEST,
    }
];