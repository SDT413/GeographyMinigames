import React, {FC} from 'react';
import MenuButton from "@/components/UI/menu-button/MenuButton";
import styles from './GameScreen.module.scss';
import LayoutGame from "@/components/UI/ylayout/game-layout/LayoutGame";
import Map from "@/components/map/Map";

interface Props {
    gamemode?: string
}

const GameScreen: FC<Props> = () => {
    const centerLayout = "max-w-7xl mx-auto"
    const mainMenuButtonsStyles = "ml-auto mr-auto flex justify-center items-center w-96"
    return (
        <div className={styles.gameContainer}>
            <LayoutGame title="Geography game"
                        description={"Everything you need to know about geography"}
            >
                <span className={"text-5xl text-white mr-5"}>
                    1: Czech Republic
                </span>
                <button className={"text-2xl text-white bg-green p-2 rounded-lg ml-auto mr-5"}>
                    Use Helper
                </button>
                <MenuButton link={"/statistics"} addStyles={"mr-5"}>
                    end game
                </MenuButton>
                <span className={"text-2xl text-white bg-green p-2 rounded-lg ml-auto mr-5"}>
                    Time: 10:00
                </span>
                <Map addStyles={styles.map}/>
            </LayoutGame>
        </div>
    );
};

export default GameScreen;