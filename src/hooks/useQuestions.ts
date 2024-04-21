import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useMemo} from "react";

export const useQuestions = () => {
    const {
        questions,
        currentQuestion,
        currentQuestionIndex,
        questionsLeft
    } = useTypedSelector(state => state.questions);
    return useMemo(() => ({ questions, currentQuestion, currentQuestionIndex, questionsLeft }), [questions, currentQuestion, currentQuestionIndex, questionsLeft]);
}