import {easyCountriesData} from "@/components/data/countries/easyCountries.data";
import {mediumCountriesData} from "@/components/data/countries/mediumCountries.data";
import {hardCountriesData} from "@/components/data/countries/hardCountries.data";
import {easyCapitalsData} from "@/components/data/capitals/easyCapitals.data";
import {easyCurrenciesData} from "@/components/data/currencies/easyCurrencies.data";
import {easyShapesData} from "@/components/data/shapes/easyShapes.data";
import {IQuestion, IShape} from "@/store/questions/questions.types";
import {mediumShapesData} from "@/components/data/shapes/mediumShapes.data";
import {hardShapesData} from "@/components/data/shapes/hardShapes.data";

export const TakeRandomQuestions = (questions: IQuestion[], amount: number) => {
    let randomQuestions: IQuestion[] = []
    for (let i = 0; i < amount; i++) {
        const randomIndex = Math.floor(Math.random() * questions.length)
        if (randomQuestions.includes(questions[randomIndex])) {
            i--
            continue
        }
        randomQuestions.push(questions[randomIndex])
    }
    return randomQuestions
}

export const PrepareQuestions = (gameMode: string, difficulty: string, amount: number) => {
    if (gameMode === "countries") {
        if (difficulty === "easy") {
            return TakeRandomQuestions(easyCountriesData, amount)
        }
        if (difficulty === "medium") {
            return TakeRandomQuestions(mediumCountriesData, amount)
        }
        if (difficulty === "hard") {
            return TakeRandomQuestions(hardCountriesData, amount)
        }
    }
    if (gameMode === "capitals") {
        if (difficulty === "easy") {
            return TakeRandomQuestions(easyCapitalsData, amount)
        }
        if (difficulty === "medium") {
            return TakeRandomQuestions(mediumCountriesData, amount)
        }
        if (difficulty === "hard") {
            return TakeRandomQuestions(hardCountriesData, amount)
        }
    }
    if (gameMode === "currencies") {
       if (difficulty === "easy") {
              return TakeRandomQuestions(easyCurrenciesData, amount)
       }
       if (difficulty === "medium") {
           return TakeRandomQuestions(mediumCountriesData, amount)
       }
         if (difficulty === "hard") {
              return TakeRandomQuestions(hardCountriesData, amount)
         }
    }
    return []
}