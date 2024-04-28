import React, {FC, useState} from 'react';
import styles from './ReviewMap.module.scss';
import Map from "@/components/map/Map";
import MenuButton from "@/components/UI/menu-button/MenuButton";
import LayoutMenu from "@/components/UI/ylayout/menu-layout/LayoutMenu";
import {PrepareMapStyle} from "@/components/utils/PrepareMapStyle";
import {useConfig} from "@/hooks/useConfig";

const ReviewMap: FC = () => {
    const config = useConfig()
    const [mapStyle, setMapStyle] = useState(PrepareMapStyle(config.mode))
    return (
        <div className={styles.container}>
            <LayoutMenu title=""
                        description={""}
                        addStyles={""}
            >
                <Map addStyles={styles.map} mapStyle={mapStyle}/>
                <MenuButton link={'/'} addStyles={styles.wideButton}>
                    Back to main menu
                </MenuButton>
            </LayoutMenu>
        </div>
    );
};

export default ReviewMap;