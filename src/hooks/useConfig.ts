import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useMemo} from "react";

export const useConfig = () => {
    const {
        difficulty,
        mode,
        custom
    } = useTypedSelector(state => state.config);
    return useMemo(() => ({ difficulty, mode, custom }), [difficulty, mode, custom]);
}