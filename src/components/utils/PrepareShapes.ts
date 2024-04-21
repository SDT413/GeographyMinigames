import {easyCountriesData} from "@/components/data/countries/easyCountries.data";
import {mediumCountriesData} from "@/components/data/countries/mediumCountries.data";
import {hardCountriesData} from "@/components/data/countries/hardCountries.data";
import {easyCapitalsData} from "@/components/data/capitals/easyCapitals.data";
import {easyCurrenciesData} from "@/components/data/currencies/easyCurrencies.data";
import {easyShapesData} from "@/components/data/shapes/easyShapes.data";
import {IQuestion, IShape} from "@/store/questions/questions.types";
import {mediumShapesData} from "@/components/data/shapes/mediumShapes.data";
import {hardShapesData} from "@/components/data/shapes/hardShapes.data";

export const TakeRandomShapes = (shapes: IShape[], amount: number) => {
    let randomShapes: IShape[] = []
    for (let i = 0; i < amount; i++) {
        const randomIndex = Math.floor(Math.random() * shapes.length)
        if (randomShapes.includes(shapes[randomIndex])) {
            i--
            continue
        }
        randomShapes.push(shapes[randomIndex])
    }
    return randomShapes
}

export const PrepareShapes = (gameMode: string, difficulty: string, amount: number) => {
    if (gameMode === "shapes") {
        if (difficulty === "easy") {
            return TakeRandomShapes(easyShapesData, amount)
        }
        if (difficulty === "medium") {
            return TakeRandomShapes(easyShapesData, amount)
        }
        if (difficulty === "hard") {
            return TakeRandomShapes(easyShapesData, amount)
        }
    }
    return []
}