import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useMemo} from "react";

export const useGameInfo = () => {
    const {
        score,
        failed,
        time,
        helperUsed
    } = useTypedSelector(state => state.gameInfo);
    return useMemo(() => ({ score, failed, time, helperUsed }), [score, failed, time, helperUsed]);
}