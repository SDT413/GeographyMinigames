import React, {FC} from 'react';
import styles from './CustomDiff.module.scss';
import MenuButton from "@/components/UI/menu-button/MenuButton";
import GridLayout from "@/components/UI/ylayout/grid-layout/GridLayout";

const CustomDiff: FC = () => {
    return (
        <div className={styles.container}>
            <GridLayout title=""
                        description={""}
                        addStyles={""}
            >
                    <MenuButton addStyles={styles.wideButton}>
                     Popups difficultly
                    </MenuButton>

                    <MenuButton addStyles={styles.wideButton}>
                        Punishment for Helper
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton}>
                        Helper Efficiency
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton}>
                        Time to answer
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton}>
                        Popups amount
                    </MenuButton>
                <MenuButton addStyles={""} link={'/'}>
                    Back to main menu
                </MenuButton>
            </GridLayout>
        </div>
    );
};

export default CustomDiff;