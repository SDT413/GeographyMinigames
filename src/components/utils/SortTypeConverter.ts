import {BackendSortingInterface, EnumSort} from "@/components/interfaces/sorting.interface";

const SortTypeConverter = (sortType: EnumSort) : BackendSortingInterface => {
    if (sortType === EnumSort.INCREASING_PRICE) {
        return {
            sortType: "price",
            sortOrder: "asc"
        }
    } else if (sortType === EnumSort.DECREASING_PRICE) {
        return {
            sortType: "price",
            sortOrder: "desc"
        }
    }
    else if (sortType === EnumSort.NEWEST) {
        return {
            sortType: "date",
            sortOrder: "desc"
        }
    }
    else if (sortType === EnumSort.OLDEST) {
        return {
            sortType: "date",
            sortOrder: "asc"
        }
    }
    else {
        throw new Error("Sort type not found");
    }

}

export default SortTypeConverter;