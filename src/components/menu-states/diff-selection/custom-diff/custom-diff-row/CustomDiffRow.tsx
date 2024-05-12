import React, {FC, useState} from 'react';
import styles from './CustomDiffRow.module.scss';
import MenuButton from "@/components/UI/menu-button/MenuButton";
import GridLayout from "@/components/UI/ylayout/grid-layout/GridLayout";
import {useConfig} from "@/hooks/useConfig";
import {useActions} from "@/hooks/useActions";
import CustomDiffButton from "@/components/UI/menu-button/custom-diff button/CustomDiffButton";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

interface Props {
    setParam: ActionCreatorWithPayload<"easy" | "medium" | "hard">
    paramName: string
    easySelectedParam: boolean
    mediumSelectedParam: boolean
    hardSelectedParam: boolean
}

const CustomDiffRow: FC<Props> = ({setParam, paramName, easySelectedParam, mediumSelectedParam, hardSelectedParam}) => {
    const [easySelected, setEasySelected] = useState(easySelectedParam)
    const [mediumSelected, setMediumSelected] = useState(mediumSelectedParam)
    const [hardSelected, setHardSelected] = useState(hardSelectedParam)
    return (
        <div className={styles.row}>
            <div className={styles.upperButton}>
            <CustomDiffButton addStyles={styles.wideButton} color={styles.colorOrange}>
                {paramName}
            </CustomDiffButton>
            </div>

            <div className={styles.lowerButtons}>
                <CustomDiffButton addStyles={styles.customButton} onClick={() => {
                        setParam("easy")
                        console.log("easy")
                        setEasySelected(true)
                        setMediumSelected(false)
                        setHardSelected(false)
                    }
                } selected={easySelected} color={styles.colorEasy}>
                    easy
                </CustomDiffButton>

                <CustomDiffButton addStyles={styles.customButton} onClick={() => {
                        setParam("medium")
                        console.log("medium")
                        setMediumSelected(true)
                        setEasySelected(false)
                        setHardSelected(false)
                    }
                } selected={mediumSelected} color={styles.colorMedium}>
                    medium
                </CustomDiffButton>

                <CustomDiffButton addStyles={styles.customButton} onClick={() => {
                        setParam("hard")
                        console.log("hard")
                        setHardSelected(true)
                        setEasySelected(false)
                        setMediumSelected(false)
                    }
                } selected={hardSelected} color={styles.colorHard}>
                    hard
                </CustomDiffButton>
                </div>
        </div>
    );
};

export default CustomDiffRow;