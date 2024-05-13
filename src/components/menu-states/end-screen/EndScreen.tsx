import React, {FC} from 'react';
import styles from './EndScreen.module.scss';
import MenuButton from "@/components/UI/menu-button/MenuButton";
import LayoutEnd from "@/components/UI/ylayout/end-layout/LayoutEnd";
import Title from "@/components/UI/title/Title";
import {useGameInfo} from "@/hooks/useGameInfo";
import CustomDiffButton from "@/components/UI/menu-button/custom-diff button/CustomDiffButton";
import EndGameTitle from "@/components/UI/title/end-game-title/EndGameTitle";
import EndGameButton from "@/components/UI/menu-button/end-game-button/EndGameButton";

const EndScreen: FC = () => {
    const gameInfo = useGameInfo()
    console.log("gameInfo", gameInfo)
    return (
        <div className={styles.container}>
            <LayoutEnd title=""
                        description={""}
                        addStyles={""}
            >
                <div className={styles.inside_container}>
                    <div className={styles.title_container}>
                    <EndGameTitle title={"Congratulations"} subtitle={"your results:"}/>
                </div>
                    <div className={styles.buttons}>
                <EndGameButton addStyles={styles.wideButton}>
                    <p> Score:  <span style={
                    gameInfo.score > 0 ? {color: 'green'} : {color: 'red'}
                    }> {gameInfo.score} </span> </p>
                </EndGameButton>
                    <EndGameButton addStyles={styles.wideButton}>
                        <p> Failed: <span style={
                            gameInfo.failed > 0 ? {color: 'red'} : {color: 'green'}
                        }> {gameInfo.failed} </span> </p>
                    </EndGameButton>
                    <EndGameButton addStyles={styles.wideButton}>
                        <p> Time:
                            <span style={
                                 {color: 'fuchsia'}
                            }> {gameInfo.time} </span> </p>
                    </EndGameButton>
                    <EndGameButton addStyles={styles.wideButton}>
                        <p> Helper used:
                            <span style={
                                gameInfo.helperUsed > 0 ? {color: 'red'} : {color: 'green'}
                            }> {gameInfo.helperUsed} </span> </p>
                </EndGameButton>
                <EndGameButton addStyles={styles.wideButton} link={'/'}>
                    Back to main menu
                </EndGameButton>
                    </div>
                </div>
            </LayoutEnd>
        </div>
    );
};

export default EndScreen;