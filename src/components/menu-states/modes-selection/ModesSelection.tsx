import React, {FC, useState} from 'react';
import styles from './ModesSelection.module.scss';
import Map from "@/components/map/Map";
import MenuButton from "@/components/UI/menu-button/MenuButton";
import LayoutMenuWide from "@/components/UI/ylayout/menu-layout/wide-buttons-layout/LayoutMenuWide";
import {useActions} from "@/hooks/useActions";
import {useConfig} from "@/hooks/useConfig";
import {PrepareMapStyle} from "@/components/utils/PrepareMapStyle";

const ModesSelection: FC = () => {
    const {setConfigMode} = useActions()
    const config = useConfig()
    const [mapStyle, setMapStyle] = useState(PrepareMapStyle(config.mode))
    const [showShapes, setShowShapes] = useState(true)
    return (
        <div className={styles.container}>
            <LayoutMenuWide title=""
                        description={""}
                        addStyles={""}
            >
                <div className={styles.buttons}>
                    <MenuButton addStyles={styles.wideButton} onClick={() => {
                        setConfigMode("shapes")
                        setMapStyle(PrepareMapStyle("shapes"))
                        setShowShapes(true)
                        console.log("shapes")
                    }} selected={config.mode === "shapes"}>
                        Shapes
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton} onClick={() => {
                        setConfigMode("capitals")
                        setMapStyle(PrepareMapStyle("capitals"))
                        setShowShapes(false)
                    }} selected={config.mode === "capitals"}>
                        Capital cities
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton} onClick={() => {
                        setConfigMode("countries")
                        setMapStyle(PrepareMapStyle("countries"))
                        setShowShapes(false)
                    }} selected={config.mode === "countries"}>
                        Countries
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton} onClick={() => {
                        setConfigMode("currencies")
                        setMapStyle(PrepareMapStyle("currencies"))
                        setShowShapes(true)
                    }} selected={config.mode === "currencies"}>
                        Currencies
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton} link={'/'} onClick={
                        () => {
                            console.log(config)
                        }
                    }>
                        Back to main menu
                    </MenuButton>
                </div>
                <br/>
                {
                    showShapes ? <Map addStyles={styles.map} mapStyle={mapStyle}/> :
                        <>
                            <Map addStyles={styles.map} mapStyle={mapStyle}/>
                        </>

                }
            </LayoutMenuWide>
        </div>
    );
};

export default ModesSelection;