export interface IConfigInitialState {
    difficulty: "easy" | "medium" | "hard" | "custom";
    mode: "shapes" | "countries" | "capitals" | "currencies";
    custom?: {
        questions: number;
        time: number;
    }
}

