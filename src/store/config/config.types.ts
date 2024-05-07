export interface IConfigInitialState {
    difficulty: "easy" | "medium" | "hard" | "custom";
    mode: "shapes" | "countries" | "states" | "currencies";
    // if difficulty is custom:
    questionsDiff: "easy" | "medium" | "hard";
    helperPunishment: "easy" | "medium" | "hard";
    helperEfficiency: "easy" | "medium" | "hard";
    time: "easy" | "medium" | "hard";
    questionsAmount: "easy" | "medium" | "hard";

}

