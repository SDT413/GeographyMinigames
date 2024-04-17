import React, {FC} from 'react';
import styles from './ModesSelection.module.scss';
import Map from "@/components/map/Map";
import MenuButton from "@/components/UI/menu-button/MenuButton";
import LayoutMenuWide from "@/components/UI/ylayout/menu-layout/wide-buttons-layout/LayoutMenuWide";

const ModesSelection: FC = () => {
    return (
        <div className={styles.container}>
            <LayoutMenuWide title=""
                        description={""}
                        addStyles={""}
            >
                <div className={styles.buttons}>
                    <MenuButton addStyles={styles.wideButton}>
                        Shapes
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton}>
                        Capital cities
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton}>
                        Countries
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton}>
                        Currencies
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton} link={'/'}>
                        Back to main menu
                    </MenuButton>
                </div>
                <br/>
                    <Map addStyles={styles.map}/>

            </LayoutMenuWide>
        </div>
    );
};

export default ModesSelection;