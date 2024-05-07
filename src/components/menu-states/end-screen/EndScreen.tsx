import React, {FC} from 'react';
import styles from './EndScreen.module.scss';
import MenuButton from "@/components/UI/menu-button/MenuButton";
import LayoutEnd from "@/components/UI/ylayout/end-layout/LayoutEnd";
import Title from "@/components/UI/title/Title";
import {useGameInfo} from "@/hooks/useGameInfo";

const EndScreen: FC = () => {
    const gameInfo = useGameInfo()
    console.log("gameInfo", gameInfo)
    return (
        <div className={styles.container}>
            <LayoutEnd title=""
                        description={""}
                        addStyles={""}
            >
                <div className={styles.buttons}>
                    <Title title={"Congratulations"} subtitle={"your results:"} classNameTitle={"text-6xl"} classNameSubtitle={"text-5xl"}/>
                <MenuButton addStyles={styles.wideButton}>
                    <p> Score:  <span style={
                    gameInfo.score > 0 ? {color: 'green'} : {color: 'red'}
                    }> {gameInfo.score} </span> </p>
                </MenuButton>
                    <MenuButton addStyles={styles.wideButton}>
                        <p> Failed: <span style={
                            gameInfo.failed > 0 ? {color: 'red'} : {color: 'green'}
                        }> {gameInfo.failed} </span> </p>
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton}>
                        <p> Time:
                            <span style={
                                 {color: 'fuchsia'}
                            }> {gameInfo.time} </span> </p>
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton}>
                        <p> Helper used:
                            <span style={
                                gameInfo.helperUsed > 0 ? {color: 'red'} : {color: 'green'}
                            }> {gameInfo.helperUsed} </span> </p>
                </MenuButton>
                <MenuButton addStyles={styles.wideButton} link={'/'}>
                    Back to main menu
                </MenuButton>
                </div>
            </LayoutEnd>
        </div>
    );
};

export default EndScreen;