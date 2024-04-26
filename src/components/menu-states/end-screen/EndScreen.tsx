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
                    <Title title={"Congratulations"} subtitle={"you won"} classNameTitle={"text-7xl"} classNameSubtitle={"text-5xl"}/>
                <MenuButton addStyles={styles.wideButton}>
                    Score: {gameInfo.score}
                </MenuButton>
                <MenuButton addStyles={styles.wideButton}>
                    Failed: {gameInfo.failed}
                </MenuButton>
                <MenuButton addStyles={styles.wideButton}>
                    Time: {gameInfo.time}
                </MenuButton>
                <MenuButton addStyles={styles.wideButton}>
                    Helper used: {gameInfo.helperUsed}
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