import {IConfigInitialState} from "@/store/config/config.types";

export const DiffToNumbersConverter = (config: IConfigInitialState) => {
    let questionsDiff: number;
    let helperPunishment: number;
    let helperEfficiency: number;
    let time: number;
    let questionsAmount: number;

    if (config.difficulty === "easy") {
        return {
            questionsDiff: 1,
            helperPunishment: 1,
            helperEfficiency: 1,
            time: 1,
            questionsAmount: 1
        }
    }
    if (config.difficulty === "medium") {
        return {
            questionsDiff: 2,
            helperPunishment: 2,
            helperEfficiency: 2,
            time: 2,
            questionsAmount: 2
        }
    }
    if (config.difficulty === "hard") {
        return {
            questionsDiff: 3,
            helperPunishment: 3,
            helperEfficiency: 3,
            time: 3,
            questionsAmount: 3
        }
    }
    if (config.difficulty === "custom") {
    switch (config.questionsDiff) {
        case "easy":
            questionsDiff = 1;
            break;
        case "medium":
            questionsDiff = 2;
            break;
        case "hard":
            questionsDiff = 3;
            break;
        default:
            questionsDiff = 1;
    }

    switch (config.helperPunishment) {
        case "easy":
            helperPunishment = 1;
            break;
        case "medium":
            helperPunishment = 2;
            break;
        case "hard":
            helperPunishment = 3;
            break;
        default:
            helperPunishment = 1;
    }

    switch (config.helperEfficiency) {
        case "easy":
            helperEfficiency = 1;
            break;
        case "medium":
            helperEfficiency = 2;
            break;
        case "hard":
            helperEfficiency = 3;
            break;
        default:
            helperEfficiency = 1;
    }

    switch (config.time) {
        case "easy":
            time = 10;
            break;
        case "medium":
            time = 5;
            break;
        case "hard":
            time = 2;
            break;
        default:
            time = 10;
    }

    switch (config.questionsAmount) {
        case "easy":
            questionsAmount = 1;
            break;
        case "medium":
            questionsAmount = 2;
            break;
        case "hard":
            questionsAmount = 3;
            break;
        default:
            questionsAmount = 1;
    }
    return {
        questionsDiff,
        helperPunishment,
        helperEfficiency,
        time,
        questionsAmount
    }
}
    return {
        questionsDiff: 1,
        helperPunishment: 1,
        helperEfficiency: 1,
        time: 1,
        questionsAmount: 1
    }
}