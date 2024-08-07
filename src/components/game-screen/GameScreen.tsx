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
import {useActions} from "@/hooks/useActions";
import {IQuestion, IShape} from "@/store/questions/questions.types";
import MapGame from "@/components/map/MapGame";
import {PrepareMapStyle} from "@/utils/PrepareMapStyle";
import {DiffToNumbersConverter} from "@/utils/DiffToNumbersConverter";
import {PrepareQuestions} from "@/utils/PrepareQuestions";
import {PrepareShapes} from "@/utils/PrepareShapes";

interface Props {
    gameMode: string
}

const GameScreen: FC<Props> = ({gameMode}) => {
    const mapStyle = PrepareMapStyle(gameMode as string);
    const styles_for_question = "text-5xl text-white mr-5"
    const {setQuestions, setQuestionsLeft, decreaseQuestionsLeft, setInitCurrentQuestion, setNextQuestion, increaseScore, increaseFailed, setTime} = useActions()
    const questions = useQuestions()
    const config = useConfig()
    const router = useRouter()

    const {questionsDiff, helperPunishment, helperEfficiency, time, questionsAmount} = DiffToNumbersConverter(config);

    const mode_diff = config.difficulty === "custom" ? config.questionsDiff : config.difficulty

    const mode_questions = PrepareQuestions(gameMode, mode_diff, questionsAmount)
    const mode_shapes = PrepareShapes(gameMode, mode_diff, questionsAmount)

    const [gameStarted, setGameStarted] = useState<boolean>(false)
    const [mapClicked, setMapClicked] = useState<boolean>(false)

    const [currentQuestion, setCurrentQuestionState] = useState(mode_questions[0] as IQuestion)
    const [currentShape, setCurrentShape] = useState(mode_shapes[0] as IShape)

    const [answer, setAnswer] = useState<string>("")
    const [actualChosenState, setActualChosenState] = useState<string>("")
    const [useHelper, setUseHelper] = useState<boolean>(false)
    const [timer, setTimer] = useState<number>(time)

    const state_range = mode_diff === "easy" ? 5 : mode_diff === "medium" ? 3 : 2
    const state_zoom = window.innerWidth >= 1980 ? 4.1 :
        window.innerWidth >= 1680 ? 4 :
            window.innerWidth >= 1280 ? 3.5 :
                window.innerWidth >= 1024 ? 3.4 :
                    window.innerWidth >= 800 ? 3.3 :
                        window.innerWidth >= 768 ? 3.2 :
                            window.innerWidth >= 640 ? 3.1 :
                                window.innerWidth >= 480 ? 2.4 :
                                    window.innerWidth >= 375 ? 2.3 :
                                        window.innerWidth >= 360 ? 2 :
                                            window.innerWidth >= 320 ? 1.9 : 1.9;

    const param_lng = window.innerWidth >= 1980 ? -100.96275568376927 : -98;

    const param_lat = window.innerWidth >= 1980 ? 39.631808154818856 : 39.5;

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer === 0) {
                setNextQuestion()
                decreaseQuestionsLeft()
                setTimer(time)
            }
            setTimer(timer => timer - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [ timer ])


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
        if (!mapClicked) {
            return;
        }
        if (answer && mapClicked) {
            if (gameMode === "shapes" || gameMode === "states") {
                checkAnswer(answer, currentShape.place, gameMode)
                setMapClicked(false)
            }
            else if (gameMode === "countries" || gameMode === "currencies") {
                checkAnswer(answer, currentQuestion.correct_answer, gameMode)
                setMapClicked(false)
            }
        }
            /*console.log("Answer checked", answer)*/
    }, [gameStarted, mapClicked, gameMode])

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

    const resetTimer = () => {
        setTimer(time)
    }

    const checkAnswer = (answer: string, correctAnswer: string, gameMode: string) => {
       /* if (questions.questionsLeft === 1) {
            router.push('/statistics')
            return;
        }*/
        console.log(answer, correctAnswer)
        if (gameMode === "countries") {
            checkIQuestion(answer, correctAnswer)
            resetTimer()
        }
        if (gameMode === "states") {
            checkIShape(answer, correctAnswer)
            resetTimer()
        }
        if (gameMode === "shapes") {
            checkIShape(answer, correctAnswer)
            resetTimer()
        }
        if (gameMode === "currencies") {
            checkIQuestion(answer, correctAnswer)
            resetTimer()
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
        console.log("Check IShape", answer, correctAnswer)
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

    const handleClick = (e: any) => {
        if (gameStarted && mapClicked && gameMode === "states") {
            let popups = [];
            let mouseX = e.clientX;
            let mouseY = e.clientY;
            let popup;
            if (answer === currentQuestion.correct_answer || answer === currentShape.place) {
                popup = createRightPopup(mouseX, mouseY, actualChosenState);
            } else {
                popup = wrongPopup(mouseX, mouseY, actualChosenState);
            }
            popups.push(popup);
            setTimeout(() => {
                popups.forEach((popup) => {
                    document.body.removeChild(popup);
                });
            }, 1000);
        }
    }

    const createRightPopup = (mouseX: number, mouseY: number, text: string) => {
        let popup = document.createElement('div');
        popup.className = styles.rightAnswerPopup;
        popup.style.left = mouseX + 'px';
        popup.style.top = mouseY + 'px';
        popup.innerHTML = text;
        document.body.appendChild(popup);
        return popup;
    }

    const wrongPopup = (mouseX: number, mouseY: number, text: string) => {
        let popup = document.createElement('div');
        popup.className = styles.wrongAnswerPopup;
        popup.style.left = mouseX + 'px';
        popup.style.top = mouseY + 'px';
        popup.innerHTML = text;
        document.body.appendChild(popup);
        return popup;
    }


    return (
        <div className={styles.gameContainer} onClick={handleClick}>
            <LayoutGame title="Geography game"
                        description={"Everything you need to know about geography"}
            >
                <span className={styles.question_styles}>
                   {
                       currentShape && currentShape.place}
                    {
                        currentQuestion && currentQuestion.question
                    }
                </span>
                <button className={styles.helper_styles} onClick={() => setUseHelper(true)}>
                    Use Helper
                </button>
                <span className={styles.timer_styles}>
                 <span> Time: <span style={
                     {
                         color: 'fuchsia',
                         fontSize: '1.1em'
                     }
                 }> {timer} </span></span>
                </span>
                {gameStarted &&
                gameMode === "shapes" ?
                    <MapGame addStyles={styles.map} mapStyle={mapStyle} setAnswer={setAnswer} gameMode={gameMode} useHelper={useHelper} setUseHelper={setUseHelper} helperSize={helperEfficiency}
                             setMapClicked={setMapClicked} currentTime={timer} setTimer={setTimer} helperPunishment={helperPunishment}/>
                    :
                    gameMode === "countries" ?
                        <MapGame addStyles={styles.map} mapStyle={mapStyle} setAnswer={setAnswer} gameMode={gameMode} useHelper={useHelper} setUseHelper={setUseHelper}
                                 helperSize={helperEfficiency} setMapClicked={setMapClicked} currentTime={timer} setTimer={setTimer} helperPunishment={helperPunishment}/>
                        : gameMode === "states" ?
                            <>
                                <MapGame addStyles={styles.map} mapStyle={mapStyle} setAnswer={setAnswer} gameMode={gameMode} useHelper={useHelper} setUseHelper={setUseHelper}
                                         helperSize={helperEfficiency} setMapClicked={setMapClicked} currentTime={timer} setTimer={setTimer} helperPunishment={helperPunishment}
                                         param_lng={param_lng} param_lat={param_lat} param_zoom={state_zoom} fixed={true} setActualChosenState={setActualChosenState}/>
                                <br/>
                                <div className={styles.note_styles}>
                                    <b style={
                                        {
                                            color: 'red',
                                        }
                                    }
                                    >Note</b>: the score will increase if right answer is in <b>{state_range}</b> closest states from point of click
                                </div>
                            </>
                            : gameMode === "currencies" ?
                                <MapGame addStyles={styles.map} mapStyle={mapStyle} setAnswer={setAnswer} gameMode={gameMode} useHelper={useHelper} setUseHelper={setUseHelper}
                                         helperSize={helperEfficiency} setMapClicked={setMapClicked} currentTime={timer} setTimer={setTimer} helperPunishment={helperPunishment}/>
                                : <MapGame addStyles={styles.map} mapStyle={mapStyle} setAnswer={setAnswer} gameMode={gameMode} useHelper={useHelper} setUseHelper={setUseHelper}
                                           helperSize={helperEfficiency} setMapClicked={setMapClicked} currentTime={timer} setTimer={setTimer} helperPunishment={helperPunishment}/>
                }

            </LayoutGame>
        </div>
    );
};

export default GameScreen;