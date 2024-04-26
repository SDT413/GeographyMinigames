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
import {PrepareShapes} from "@/components/utils/PrepareShapes";
import {PrepareMapStyle} from "@/components/utils/PrepareMapStyle";
import {IQuestion, IShape} from "@/store/questions/questions.types";

interface Props {
    gameMode: string
}

const GameScreen: FC<Props> = ({gameMode}) => {
    const mapStyle = PrepareMapStyle(gameMode as string);
    const styles_for_question = "text-5xl text-white mr-5"
    const {setQuestions, setQuestionsLeft, decreaseQuestionsLeft, setInitCurrentQuestion, setNextQuestion, increaseScore, increaseFailed, setTime} = useActions()
    const questions = useQuestions()
    console.log("Questions index first show", questions.currentQuestionIndex)
    const gameInfo = useGameInfo()
    const config = useConfig()

    const {questionsDiff, helperPunishment, helperEfficiency, time, questionsAmount} = DiffToNumbersConverter(config);

    const mode_diff = config.difficulty === "custom" ? config.questionsDiff : config.difficulty

    const mode_questions = PrepareQuestions(gameMode, mode_diff, questionsAmount)
    const mode_shapes = PrepareShapes(gameMode, mode_diff, questionsAmount)

    const [currentQuestion, setCurrentQuestionState] = useState(mode_questions[0])
    const [currentShape, setCurrentShape] = useState(mode_shapes[0])

    useState(() => {
        setQuestions(mode_questions)
        setQuestionsLeft(questionsAmount)
        setInitCurrentQuestion()
        console.log("UseEffect worked")
        setTime(time)
        console.log("mode_questions", mode_questions)
        console.log(mode_shapes)
    })

    const checkAnswer = (answer: string, correctAnswer: string, gameMode: string) => {
        if (questions.questions.length === questions.currentQuestionIndex + 1) {
            window.location.href = "/statistics"
            return;
        }
        console.log(answer, correctAnswer)
            if (gameMode === "shapes") {
                checkIShape(answer, correctAnswer)
            }
            if (gameMode === "countries") {
                checkIQuestion(answer, correctAnswer)
            }
            if (gameMode === "capitals") {
               checkIQuestion(answer, correctAnswer)
            }
            if (gameMode === "currencies") {
               checkIQuestion(answer, correctAnswer)
            }
    }

    const checkIQuestion = (answer: string, correctAnswer: string) => {
        if (answer === correctAnswer) {
            increaseScore()
            decreaseQuestionsLeft()
            setNextQuestion()
            setCurrentQuestionState(questions.questions[questions.currentQuestionIndex + 1] as IQuestion)
            console.log("Correct")
        } else {
            increaseFailed()
            decreaseQuestionsLeft()
            setNextQuestion()
            setCurrentQuestionState(questions.questions[questions.currentQuestionIndex + 1] as IQuestion)
            console.log("Incorrect")
        }
    }

    const checkIShape = (answer: string, correctAnswer: string) => {
        if (answer === correctAnswer) {
            increaseScore()
            decreaseQuestionsLeft()
            setNextQuestion()
            setCurrentShape(questions.questions[questions.currentQuestionIndex + 1] as IShape)
            console.log("Correct")
        } else {
            increaseFailed()
            decreaseQuestionsLeft()
            setNextQuestion()
            setCurrentShape(questions.questions[questions.currentQuestionIndex + 1] as IShape)
            console.log("Incorrect")
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
                    <Map addStyles={styles.map} mapStyle={mapStyle} gameMode={gameMode} correctAnswer={currentShape.country} onCheckAnswer={checkAnswer}/>
                :
                    gameMode === "countries" ?
                    <Map addStyles={styles.map} mapStyle={mapStyle} gameMode={gameMode} correctAnswer={currentQuestion.correct_answer} onCheckAnswer={checkAnswer}/>
                : gameMode === "capitals" ?
                    <Map addStyles={styles.map} mapStyle={mapStyle} gameMode={gameMode} correctAnswer={currentQuestion.correct_answer} onCheckAnswer={checkAnswer}/>
                : gameMode === "currencies" ?
                    <Map addStyles={styles.map} mapStyle={mapStyle} gameMode={gameMode} correctAnswer={currentQuestion.correct_answer} onCheckAnswer={checkAnswer}/>
                    : <Map addStyles={styles.map} mapStyle={mapStyle}/>
                }
            </LayoutGame>
        </div>
    );
};

export default GameScreen;