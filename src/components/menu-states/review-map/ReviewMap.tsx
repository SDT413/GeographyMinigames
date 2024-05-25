import React, {FC, useState} from 'react';
import styles from './ReviewMap.module.scss';
import Map from "@/components/map/Map";
import MenuButton from "@/components/UI/menu-button/MenuButton";
import LayoutMenu from "@/components/UI/ylayout/menu-layout/LayoutMenu";
import {useConfig} from "@/hooks/useConfig";
import {PrepareMapStyle} from "@/utils/PrepareMapStyle";
import LinkButton from "@/components/UI/menu-button/link-button/LinkButton";

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
                <LinkButton link={'/'}>
                    Back to main menu
                </LinkButton>
            </LayoutMenu>
        </div>
    );
};

export default ReviewMap;