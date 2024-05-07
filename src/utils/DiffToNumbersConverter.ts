import {IConfigInitialState} from "@/store/config/config.types";

export const DiffToNumbersConverter = (config: IConfigInitialState) => {
    let questionsDiff: number;
    let helperPunishment: number;
    let helperEfficiency: number;
    let time: number;
    let questionsAmount: number;

    let questionsDiffEasyModifier = 3;
    let questionsDiffMediumModifier = 4;
    let questionsDiffHardModifier = 5;

    let helperPunishmentEasyModifier = 3;
    let helperPunishmentMediumModifier = 4;
    let helperPunishmentHardModifier = 5;

    let helperEfficiencyEasyModifier = 1000;
    let helperEfficiencyMediumModifier = 1500;
    let helperEfficiencyHardModifier = 2000;

    let timeEasyModifier = 60;
    let timeMediumModifier = 30;
    let timeHardModifier = 20;

    let questionsAmountEasyModifier = 10;
    let questionsAmountMediumModifier = 11;
    let questionsAmountHardModifier = 12;

    if (config.difficulty === "easy") {
        return {
            questionsDiff: questionsDiffEasyModifier,
            helperPunishment: helperPunishmentEasyModifier,
            helperEfficiency: helperEfficiencyEasyModifier,
            time: timeEasyModifier,
            questionsAmount: questionsAmountEasyModifier
        }
    }
    if (config.difficulty === "medium") {
        return {
            questionsDiff: questionsDiffMediumModifier,
            helperPunishment: helperPunishmentMediumModifier,
            helperEfficiency: helperEfficiencyMediumModifier,
            time: timeMediumModifier,
            questionsAmount: questionsAmountMediumModifier
        }
    }
    if (config.difficulty === "hard") {
        return {
            questionsDiff: questionsDiffHardModifier,
            helperPunishment: helperPunishmentHardModifier,
            helperEfficiency: helperEfficiencyHardModifier,
            time: timeHardModifier,
            questionsAmount: questionsAmountHardModifier
        }
    }
    if (config.difficulty === "custom") {
    switch (config.questionsDiff) {
        case "easy":
            questionsDiff = questionsDiffEasyModifier;
            break;
        case "medium":
            questionsDiff = questionsDiffMediumModifier;
            break;
        case "hard":
            questionsDiff = questionsDiffHardModifier;
            break;
        default:
            questionsDiff = questionsDiffEasyModifier
    }

    switch (config.helperPunishment) {
        case "easy":
            helperPunishment = helperPunishmentEasyModifier;
            break;
        case "medium":
            helperPunishment = helperPunishmentMediumModifier;
            break;
        case "hard":
            helperPunishment = helperPunishmentHardModifier;
            break;
        default:
            helperPunishment = helperPunishmentEasyModifier;
    }

    switch (config.helperEfficiency) {
        case "easy":
            helperEfficiency = helperEfficiencyEasyModifier;
            break;
        case "medium":
            helperEfficiency = helperEfficiencyMediumModifier;
            break;
        case "hard":
            helperEfficiency = helperEfficiencyHardModifier;
            break;
        default:
            helperEfficiency = helperEfficiencyEasyModifier;
    }

    switch (config.time) {
        case "easy":
            time = timeEasyModifier;
            break;
        case "medium":
            time = timeMediumModifier;
            break;
        case "hard":
            time = timeHardModifier;
            break;
        default:
            time = timeEasyModifier;
    }

    switch (config.questionsAmount) {
        case "easy":
            questionsAmount = questionsAmountEasyModifier;
            break;
        case "medium":
            questionsAmount = questionsAmountMediumModifier;
            break;
        case "hard":
            questionsAmount = questionsAmountHardModifier;
            break;
        default:
            questionsAmount = questionsAmountEasyModifier;
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