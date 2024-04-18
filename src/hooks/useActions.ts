import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {useMemo} from "react";
import {configSlice} from "@/store/config/config,slice";
import {questionsSlice} from "@/store/questions/questions.slice";
import {gameInfoSlice} from "@/store/game-info/gameInfo.slice";

const rootAction = {
    ...configSlice.actions,
    ...gameInfoSlice.actions,
    ...questionsSlice.actions
}

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
}