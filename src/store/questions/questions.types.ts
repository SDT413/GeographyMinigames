export interface IQuestionsInitialState {
    questions: IQuestion[] | IShape[];

    currentQuestion: IQuestion | IShape | null;
    questionsLeft: number;

}

export interface IQuestion {
    question: string;
    correct_answer: string;
}

export interface IShape {
    country: string;
}

