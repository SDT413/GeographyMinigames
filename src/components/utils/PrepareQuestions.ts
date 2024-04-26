import {easyCountriesData} from "@/components/data/countries/easyCountries.data";
import {mediumCountriesData} from "@/components/data/countries/mediumCountries.data";
import {hardCountriesData} from "@/components/data/countries/hardCountries.data";
import {easyCapitalsData} from "@/components/data/capitals/easyCapitals.data";
import {easyCurrenciesData} from "@/components/data/currencies/easyCurrencies.data";
import {IQuestion} from "@/store/questions/questions.types";
import {mediumCapitalsData} from "@/components/data/capitals/mediumCapitals.data";
import {hardCapitalsData} from "@/components/data/capitals/hardCapitals.data";
import {mediumCurrenciesData} from "@/components/data/currencies/mediumCurrencies.data";
import {hardCurrenciesData} from "@/components/data/currencies/hardCurrencies.data";

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
    /*console.log('gameMode:', gameMode);
    console.log('difficulty:', difficulty);*/
    if (gameMode === "countries") {
        if (difficulty === "easy") {
            /*console.log('easyCountriesData:', easyCountriesData);*/
            return TakeRandomQuestions(easyCountriesData, amount)
        }
        if (difficulty === "medium") {
            /*console.log('mediumCountriesData:', mediumCountriesData);*/
            return TakeRandomQuestions(mediumCountriesData, amount)
        }
        if (difficulty === "hard") {
            /*console.log('hardCountriesData:', hardCountriesData);*/
            return TakeRandomQuestions(hardCountriesData, amount)
        }
    }
    if (gameMode === "capitals") {
        if (difficulty === "easy") {
            /*console.log('easyCapitalsData:', easyCapitalsData);*/
            return TakeRandomQuestions(easyCapitalsData, amount)
        }
        if (difficulty === "medium") {
            /*console.log('mediumCapitalsData:', mediumCapitalsData);*/
            return TakeRandomQuestions(mediumCapitalsData, amount)
        }
        if (difficulty === "hard") {
            /*console.log('hardCapitalsData:', hardCapitalsData);*/
            return TakeRandomQuestions(hardCapitalsData, amount)
        }
    }
    if (gameMode === "currencies") {
       if (difficulty === "easy") {
          /* console.log('easyCurrenciesData:', easyCurrenciesData);*/
              return TakeRandomQuestions(easyCurrenciesData, amount)
       }
       if (difficulty === "medium") {
              /*console.log('mediumCurrenciesData:', mediumCurrenciesData);*/
           return TakeRandomQuestions(mediumCurrenciesData, amount)
       }
         if (difficulty === "hard") {
                /*console.log('hardCurrenciesData:', hardCurrenciesData);*/
              return TakeRandomQuestions(hardCurrenciesData, amount)
         }
    }
    return []
}