"use client";
import React, {FC, useState} from 'react';
import MenuButton from "@/components/UI/menu-button/MenuButton";
import styles from './GameScreen.module.scss';
import LayoutGame from "@/components/UI/ylayout/game-layout/LayoutGame";
import Map from "@/components/map/Map";
import {useQuestions} from "@/hooks/useQuestions";
import {useGameInfo} from "@/hooks/useGameInfo";
import {useConfig} from "@/hooks/useConfig";
import {DiffToNumbersConverter} from "@/components/utils/DiffToNumbersConverter";
import {useActions} from "@/hooks/useActions";
import {PrepareQuestions} from "@/components/utils/PrepareQuestions";
import {IQuestion, IShape} from "@/store/questions/questions.types";
import {PrepareShapes} from "@/components/utils/PrepareShapes";

interface Props {
    gameMode?: string
}

const GameScreen: FC<Props> = ({gameMode}) => {
    const centerLayout = "max-w-7xl mx-auto"
    const mainMenuButtonsStyles = "ml-auto mr-auto flex justify-center items-center w-96"
    const styles_for_question = "text-5xl text-white mr-5"
    const {setQuestions, setQuestionsLeft, decreaseQuestionsLeft, setCurrentQuestion, increseFailed, increseHelperUsed, increseScore, setTime} = useActions()
    const questions = useQuestions()
    const gameInfo = useGameInfo()
    const config = useConfig()

    const {questionsDiff, helperPunishment, helperEfficiency, time, questionsAmount} = DiffToNumbersConverter(config);
    if (!gameMode) gameMode = config.mode

    const mode_diff = config.difficulty === "custom" ? config.questionsDiff : config.difficulty

    const mode_questions = PrepareQuestions(gameMode, mode_diff, questionsAmount)
    const mode_shapes = PrepareShapes(gameMode, mode_diff, questionsAmount)

    const [currentQuestion, setCurrentQuestionState] = useState(mode_questions[0]);
    const [currentShape, setCurrentShape] = useState(mode_shapes[0]);



    useState(() => {
        setQuestions(mode_questions)
        setQuestionsLeft(questionsAmount)
        setCurrentQuestion(mode_questions[0])
        setTime(time)
    }, [gameMode])

    return (
        <div className={styles.gameContainer}>
            <LayoutGame title="Geography game"
                        description={"Everything you need to know about geography"}
            >
                <span className={styles_for_question}>
                   {
                          currentQuestion ? currentQuestion.question : currentShape.country
                   }
                </span>
                <button className={"text-2xl text-white bg-green p-2 rounded-lg ml-auto mr-5"}>
                    Use Helper
                </button>
                <MenuButton link={"/statistics"} addStyles={"mr-5"}>
                    end game
                </MenuButton>
                <span className={"text-2xl text-white bg-green p-2 rounded-lg ml-auto mr-5"}>
                   Time: {gameInfo.time}
                </span>
                <Map addStyles={styles.map}/>
            </LayoutGame>
        </div>
    );
};

export default GameScreen;