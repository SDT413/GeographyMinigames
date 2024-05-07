export interface IQuestionsInitialState {
    questions: IQuestion[] | IShape[];

    currentQuestion: IQuestion | IShape | null;
    currentQuestionIndex: number;
    questionsLeft: number;

}

export interface IQuestion {
    question: string;
    correct_answer: string;
}

export interface IShape {
    place: string;
}

