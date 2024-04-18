import React, {FC} from 'react';
import styles from './CustomDiff.module.scss';
import MenuButton from "@/components/UI/menu-button/MenuButton";
import GridLayout from "@/components/UI/ylayout/grid-layout/GridLayout";
import {useConfig} from "@/hooks/useConfig";
import {useActions} from "@/hooks/useActions";

const CustomDiff: FC = () => {
    const config = useConfig()
    const {setCustomQuestionsDiff, setCustomHelperPunishment, setCustomHelperEfficiency, setCustomTime, setCustomQuestionsAmount} = useActions()
    return (
        <div className={styles.container}>
            <GridLayout title=""
                        description={""}
                        addStyles={""}
            >
                    <MenuButton addStyles={styles.wideButton} onClick={() => {
                        setCustomQuestionsDiff("easy")
                        console.log("easy")
                    }}>
                     Popups difficultly
                    </MenuButton>

                    <MenuButton addStyles={styles.wideButton} onClick={() => {
                        setCustomHelperPunishment("easy")
                        console.log("easy")

                    } }>
                        Punishment for Helper
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton} onClick={() => {
                        setCustomHelperEfficiency("easy")
                        console.log("easy")
                    }}>
                        Helper Efficiency
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton} onClick={() => {
                        setCustomTime("easy")
                        console.log("easy")
                    }}>
                        Time to answer
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton} onClick={() => {
                        setCustomQuestionsAmount("easy")
                        console.log("easy")
                    } }>
                        Popups amount
                    </MenuButton>
                <MenuButton addStyles={""} link={'/'} onClick={
                    () => {
                        console.log(config)
                    }}>
                    Back to main menu
                </MenuButton>
            </GridLayout>
        </div>
    );
};

export default CustomDiff;