import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useMemo} from "react";

export const useQuestions = () => {
    const {
        questions,
        currentQuestion,
        questionsLeft
    } = useTypedSelector(state => state.questions);
    return useMemo(() => ({ questions, currentQuestion, questionsLeft }), [questions, currentQuestion, questionsLeft]);
}