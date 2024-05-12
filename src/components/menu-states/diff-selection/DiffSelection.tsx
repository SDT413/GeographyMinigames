import React, {FC} from 'react';
import MenuButton from "@/components/UI/menu-button/MenuButton";
import Title from "@/components/UI/title/Title";
import { usePathname } from 'next/navigation'
import LayoutMenu from "@/components/UI/ylayout/menu-layout/LayoutMenu";
import {useActions} from "@/hooks/useActions";
import {useConfig} from "@/hooks/useConfig";
import styles from './DiffSelection.module.scss';

const DiffSelection: FC = () => {
    const pathname = usePathname()
    const {setConfigDifficulty} = useActions()
    const config = useConfig()
    const centerLayout = "max-w-7xl mx-auto"
    const mainMenuButtonsStyles = "ml-auto mr-auto flex justify-center items-center w-96"
    return (
        <div className={styles.container}>
            <LayoutMenu title="Geography game"
                        description={"Everything you need to know about geography"}
                        addStyles={centerLayout}
            >
                <Title title={"Geography"} subtitle={"Minigames"} classNameTitle={"text-9xl"} classNameSubtitle={"text-7xl"}/>
                <MenuButton addStyles={mainMenuButtonsStyles} onClick={() => {
                    setConfigDifficulty("easy")
                    /*console.log("easy")*/
                }} selected={config.difficulty === "easy"}>
                   Easy
                </MenuButton>
                    <MenuButton addStyles={mainMenuButtonsStyles} onClick={() => {
                        setConfigDifficulty("medium")
                        /*console.log("medium")*/
                    }} selected={config.difficulty === "medium"}>
                        Medium
                    </MenuButton>
                <MenuButton addStyles={mainMenuButtonsStyles} onClick={() => {
                    setConfigDifficulty("hard")
                    /*console.log("hard")*/
                }} selected={config.difficulty === "hard"}>
                    Hard
                </MenuButton>
                <MenuButton addStyles={mainMenuButtonsStyles} onClick={
                    () => {
                        setConfigDifficulty("custom")
                        /*console.log("custom")*/
                    } } selected={config.difficulty === "custom"} link={pathname+'/custom'}>
                    custom
                </MenuButton>
                <MenuButton addStyles={mainMenuButtonsStyles} link={'/'} onClick={
                    () => {
                        console.log(config)
                    }}>
                    Back to main menu
                </MenuButton>

            </LayoutMenu>
        </div>
    );
};

export default DiffSelection;