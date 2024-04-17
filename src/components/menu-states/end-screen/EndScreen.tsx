import React, {FC} from 'react';
import styles from './EndScreen.module.scss';
import MenuButton from "@/components/UI/menu-button/MenuButton";
import LayoutEnd from "@/components/UI/ylayout/end-layout/LayoutEnd";
import Title from "@/components/UI/title/Title";

const EndScreen: FC = () => {
    return (
        <div className={styles.container}>
            <LayoutEnd title=""
                        description={""}
                        addStyles={""}
            >
                <div className={styles.buttons}>
                    <Title title={"Congratulations"} subtitle={"you won"} classNameTitle={"text-7xl"} classNameSubtitle={"text-5xl"}/>
                <MenuButton addStyles={styles.wideButton}>
                    Score: 1
                </MenuButton>
                <MenuButton addStyles={styles.wideButton}>
                    Failed: 0
                </MenuButton>
                <MenuButton addStyles={styles.wideButton}>
                    Time: 10:00
                </MenuButton>
                <MenuButton addStyles={styles.wideButton}>
                    Helper used: 0
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