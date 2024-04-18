import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useMemo} from "react";

export const useConfig = () => {
    const {
        difficulty,
        questionsDiff,
        helperPunishment,
        helperEfficiency,
        time,
        questionsAmount,
        mode
    } = useTypedSelector(state => state.config);
    return useMemo(() => ({ difficulty, questionsDiff, helperPunishment, helperEfficiency, time, questionsAmount, mode }), [difficulty, questionsDiff, helperPunishment, helperEfficiency, time, questionsAmount, mode]);
}