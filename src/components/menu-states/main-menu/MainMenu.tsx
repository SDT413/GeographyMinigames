import React, {FC} from 'react';
import Title from "@/components/UI/title/Title";
import MenuButton from "@/components/UI/menu-button/MenuButton";
import styles from './MainMenu.module.scss';
import LayoutMenu from "@/components/UI/ylayout/menu-layout/LayoutMenu";


const MainMenu: FC = () => {
    const centerLayout = "max-w-7xl mx-auto"
    const mainMenuButtonsStyles = "ml-auto mr-auto flex justify-center items-center w-96"
    return (
        <div className={styles.mainMenuContainer}>
            <LayoutMenu title="Geography game"
                    description={"Everything you need to know about geography"}
                        addStyles={centerLayout}
            >
                <Title title={"Geography"} subtitle={"Minigames"} classNameTitle={"text-9xl"} classNameSubtitle={"text-7xl"}/>
                <MenuButton addStyles={mainMenuButtonsStyles} link={'/game/shapes'}>
                    Start Game
                </MenuButton>
                <MenuButton addStyles={mainMenuButtonsStyles} link={'/modes'}>
                    Play Mode
                </MenuButton>

                <MenuButton addStyles={mainMenuButtonsStyles} link={'/diff'}>
                    Difficulty
                </MenuButton>

                <MenuButton addStyles={mainMenuButtonsStyles} link={'/map'}>
                    Review Game Map
                </MenuButton>

            </LayoutMenu>
        </div>
    );
};

export default MainMenu;