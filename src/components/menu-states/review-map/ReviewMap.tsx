import React, {FC} from 'react';
import styles from './ReviewMap.module.scss';
import Map from "@/components/map/Map";
import MenuButton from "@/components/UI/menu-button/MenuButton";
import LayoutMenu from "@/components/UI/ylayout/menu-layout/LayoutMenu";

const ReviewMap: FC = () => {
    return (
        <div className={styles.container}>
            <LayoutMenu title=""
                        description={""}
                        addStyles={""}
            >
                <Map addStyles={styles.map}/>
                <MenuButton link={'/'} addStyles={styles.wideButton}>
                    Back to main menu
                </MenuButton>
            </LayoutMenu>
        </div>
    );
};

export default ReviewMap;