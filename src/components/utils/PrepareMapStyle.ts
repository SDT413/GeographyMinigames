import {easyCountriesData} from "@/components/data/countries/easyCountries.data";
import {mediumCountriesData} from "@/components/data/countries/mediumCountries.data";
import {hardCountriesData} from "@/components/data/countries/hardCountries.data";
import {easyCapitalsData} from "@/components/data/capitals/easyCapitals.data";
import {easyCurrenciesData} from "@/components/data/currencies/easyCurrencies.data";
import {easyShapesData} from "@/components/data/shapes/easyShapes.data";
import {IQuestion, IShape} from "@/store/questions/questions.types";
import {mediumShapesData} from "@/components/data/shapes/mediumShapes.data";
import {hardShapesData} from "@/components/data/shapes/hardShapes.data";

export const PrepareMapStyle = (gameMode: string) => {
    if (gameMode === "countries") {
        return "mapbox://styles/mapbox/streets-v12"
    }
    if (gameMode === "capitals") {
        return "mapbox://styles/mapbox/streets-v12"
    }
    if (gameMode === "currencies") {
        return "mapbox://styles/dk413/clv9sggnm00qx01qveclgctu2"
    }
    if (gameMode === "shapes") {
        return "mapbox://styles/dk413/clv9sggnm00qx01qveclgctu2"
    }
    return "mapbox://styles/mapbox/streets-v12"
}