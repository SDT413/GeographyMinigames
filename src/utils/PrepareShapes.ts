import {easyCountriesData} from "@/components/data/countries/easyCountries.data";
import {mediumCountriesData} from "@/components/data/countries/mediumCountries.data";
import {hardCountriesData} from "@/components/data/countries/hardCountries.data";
import {easyStatesData} from "@/components/data/states/easyStates.data";
import {easyCurrenciesData} from "@/components/data/currencies/easyCurrencies.data";
import {easyShapesData} from "@/components/data/shapes/easyShapes.data";
import {IQuestion, IShape} from "@/store/questions/questions.types";
import {mediumShapesData} from "@/components/data/shapes/mediumShapes.data";
import {hardShapesData} from "@/components/data/shapes/hardShapes.data";
import {mediumStatesData} from "@/components/data/states/mediumStates.data";
import {hardStatesData} from "@/components/data/states/hardStates.data";
import {mediumCurrenciesData} from "@/components/data/currencies/mediumCurrencies.data";
import {hardCurrenciesData} from "@/components/data/currencies/hardCurrencies.data";
import {TakeRandomQuestions} from "@/utils/PrepareQuestions";

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
    if (gameMode === "states") {
        if (difficulty === "easy") {
            /*console.log('easyCapitalsData:', easyCapitalsData);*/
            return TakeRandomShapes(easyStatesData, amount)
        }
        if (difficulty === "medium") {
            /*console.log('mediumCapitalsData:', mediumCapitalsData);*/
            return TakeRandomShapes(mediumStatesData, amount)
        }
        if (difficulty === "hard") {
            /*console.log('hardCapitalsData:', hardCapitalsData);*/
            return TakeRandomShapes(hardStatesData, amount)
        }
    }

    return []
}