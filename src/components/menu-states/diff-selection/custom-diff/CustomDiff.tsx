import React, {FC} from 'react';
import styles from './CustomDiff.module.scss';
import MenuButton from "@/components/UI/menu-button/MenuButton";
import GridLayout from "@/components/UI/ylayout/grid-layout/GridLayout";
import {useConfig} from "@/hooks/useConfig";
import {useActions} from "@/hooks/useActions";
import CustomDiffButton from "@/components/UI/menu-button/custom-diff button/CustomDiffButton";
import CustomDiffRow from "@/components/menu-states/diff-selection/custom-diff/custom-diff-row/CustomDiffRow";
import LinkButton from "@/components/UI/menu-button/link-button/LinkButton";

const CustomDiff: FC = () => {
    const config = useConfig()
    const {setCustomQuestionsDiff, setCustomHelperPunishment, setCustomHelperEfficiency, setCustomTime, setCustomQuestionsAmount} = useActions()
    return (
        <div className={styles.container}>
            <GridLayout title=""
                        description={""}
                        addStyles={""}
            >
                <CustomDiffRow setParam={setCustomQuestionsDiff} paramName={"Popups difficultly"} easySelectedParam={config.questionsDiff === "easy"} mediumSelectedParam={config.questionsDiff === "medium"} hardSelectedParam={config.questionsDiff === "hard"} />
                <CustomDiffRow setParam={setCustomHelperPunishment} paramName={"Punishment for Helper"} easySelectedParam={config.helperPunishment === "easy"} mediumSelectedParam={config.helperPunishment === "medium"} hardSelectedParam={config.helperPunishment === "hard"} />
                <CustomDiffRow setParam={setCustomHelperEfficiency} paramName={"Helper Efficiency"} easySelectedParam={config.helperEfficiency === "easy"} mediumSelectedParam={config.helperEfficiency === "medium"} hardSelectedParam={config.helperEfficiency === "hard"} />
                <CustomDiffRow setParam={setCustomTime} paramName={"Time to answer"} easySelectedParam={config.time === "easy"} mediumSelectedParam={config.time === "medium"} hardSelectedParam={config.time === "hard"} />
                <CustomDiffRow setParam={setCustomQuestionsAmount} paramName={"Popups amount"} easySelectedParam={config.questionsAmount === "easy"} mediumSelectedParam={config.questionsAmount === "medium"} hardSelectedParam={config.questionsAmount === "hard"} />

                <LinkButton link={'/'} onClick={
                    () => {
                        console.log(config)
                    }}>
                    Back to main menu
                </LinkButton>
            </GridLayout>
        </div>
    );
};

export default CustomDiff;