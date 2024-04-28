'use client'

import { useRouter } from 'next/navigation'
import React, {FC, useEffect, useState} from 'react';
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
import {PrepareShapes} from "@/components/utils/PrepareShapes";
import {PrepareMapStyle} from "@/components/utils/PrepareMapStyle";
import {IQuestion, IShape} from "@/store/questions/questions.types";
import MapGame from "@/components/map/MapGame";

interface Props {
    gameMode: string
}

const GameScreen: FC<Props> = ({gameMode}) => {
    const mapStyle = PrepareMapStyle(gameMode as string);
    const styles_for_question = "text-5xl text-white mr-5"
    const {setQuestions, setQuestionsLeft, decreaseQuestionsLeft, setInitCurrentQuestion, setNextQuestion, increaseScore, increaseFailed, setTime} = useActions()
    const questions = useQuestions()
    const gameInfo = useGameInfo()
    const config = useConfig()
    const router = useRouter()

    const {questionsDiff, helperPunishment, helperEfficiency, time, questionsAmount} = DiffToNumbersConverter(config);

    const mode_diff = config.difficulty === "custom" ? config.questionsDiff : config.difficulty

    const mode_questions = PrepareQuestions(gameMode, mode_diff, questionsAmount)
    const mode_shapes = PrepareShapes(gameMode, mode_diff, questionsAmount)

    const [gameStarted, setGameStarted] = useState<boolean>(false)

    const [currentQuestion, setCurrentQuestionState] = useState(mode_questions[0] as IQuestion)
    const [currentShape, setCurrentShape] = useState(mode_shapes[0] as IShape)

    const [answer, setAnswer] = useState<string>("")


    useEffect(() => {
        if (mode_questions.length !== 0) {
            setQuestions(mode_questions)
        }
        else {
            setQuestions(mode_shapes)
        }
        setQuestionsLeft(questionsAmount)
        setInitCurrentQuestion()
        setTime(time)
        setGameStarted(true)
        /*console.log("UseEffect worked")*/
    }, [])

    useEffect(() => {
        if (!gameStarted) {
            return;
        }
       /* console.log("Current question index", questions.currentQuestionIndex)*/
        setCurrentQuestionState(questions.questions[questions.currentQuestionIndex] as IQuestion)
        setCurrentShape(questions.questions[questions.currentQuestionIndex] as IShape)
    }, [gameStarted, questions.currentQuestionIndex])

    useEffect(() => {
        if (!gameStarted) {
            return;
        }
        if (answer) {
            if (gameMode === "shapes" || gameMode === "currencies") {
                checkAnswer(answer, currentShape.country, gameMode)

            }
            else if (gameMode === "countries" || gameMode === "capitals") {
                checkAnswer(answer, currentQuestion.correct_answer, gameMode)
            }
        }
            console.log("Answer checked", answer)
    }, [gameStarted, answer, gameMode])

    useEffect(() => {
        if (!gameStarted) {
            return;
        }
        /*console.log("Questions Left check", questions.questionsLeft)*/
        if (questions.questionsLeft === 0) {
            router.push('/statistics')
            return;
        }
    }, [gameStarted, questions.questionsLeft])

    const checkAnswer = (answer: string, correctAnswer: string, gameMode: string) => {
       /* if (questions.questionsLeft === 1) {
            router.push('/statistics')
            return;
        }*/
        console.log(answer, correctAnswer)
        if (gameMode === "countries") {
            checkIQuestion(answer, correctAnswer)
        }
        if (gameMode === "capitals") {
            checkIQuestion(answer, correctAnswer)
        }
        if (gameMode === "shapes") {
            checkIShape(answer, correctAnswer)
        }
        if (gameMode === "currencies") {
            checkIShape(answer, correctAnswer)
        }
    }

    const checkIQuestion = (answer: string, correctAnswer: string) => {
        if (answer === correctAnswer) {
            increaseScore()
            decreaseQuestionsLeft()
            setNextQuestion()
            setCurrentQuestionState(questions.questions[questions.currentQuestionIndex] as IQuestion)
        } else {
            increaseFailed()
            decreaseQuestionsLeft()
            setNextQuestion()
            setCurrentQuestionState(questions.questions[questions.currentQuestionIndex] as IQuestion)
        }
    }

    const checkIShape = (answer: string, correctAnswer: string) => {
        if (answer === correctAnswer) {
            increaseScore()
            decreaseQuestionsLeft()
            setNextQuestion()
            setCurrentShape(questions.questions[questions.currentQuestionIndex] as IShape)
        } else {
            increaseFailed()
            decreaseQuestionsLeft()
            setNextQuestion()
            setCurrentShape(questions.questions[questions.currentQuestionIndex] as IShape)
        }
    }


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
                <span className={"text-2xl text-white bg-green p-2 rounded-lg ml-auto mr-5"}>
                   Time: {gameInfo.time}
                </span>
                {
                    gameMode === "shapes" ?
                        <MapGame addStyles={styles.map} mapStyle={mapStyle} setAnswer={setAnswer} gameMode={gameMode}/>
                        :
                        gameMode === "countries" ?
                            <MapGame addStyles={styles.map} mapStyle={mapStyle} setAnswer={setAnswer} gameMode={gameMode}/>
                            : gameMode === "capitals" ?
                                <MapGame addStyles={styles.map} mapStyle={mapStyle} setAnswer={setAnswer} gameMode={gameMode}/>
                                : gameMode === "currencies" ?
                                    <MapGame addStyles={styles.map} mapStyle={mapStyle} setAnswer={setAnswer} gameMode={gameMode}/>
                                    : <MapGame addStyles={styles.map} mapStyle={mapStyle} setAnswer={setAnswer} gameMode={gameMode}/>
                }
            </LayoutGame>
        </div>
    );
};

export default GameScreen;