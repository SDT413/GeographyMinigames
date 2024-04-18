import React, {FC, useState} from 'react';
import styles from './ModesSelection.module.scss';
import Map from "@/components/map/Map";
import MenuButton from "@/components/UI/menu-button/MenuButton";
import LayoutMenuWide from "@/components/UI/ylayout/menu-layout/wide-buttons-layout/LayoutMenuWide";
import {useActions} from "@/hooks/useActions";
import {useConfig} from "@/hooks/useConfig";

const ModesSelection: FC = () => {
    const {setConfigMode} = useActions()
    const config = useConfig()
    return (
        <div className={styles.container}>
            <LayoutMenuWide title=""
                        description={""}
                        addStyles={""}
            >
                <div className={styles.buttons}>
                    <MenuButton addStyles={styles.wideButton} onClick={() => {
                        setConfigMode("shapes")
                        console.log("shapes")
                    }} selected={config.mode === "shapes"}>
                        Shapes
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton} onClick={() => {
                        setConfigMode("capitals")
                        console.log("capitals")
                    }} selected={config.mode === "capitals"}>
                        Capital cities
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton} onClick={() => {
                        setConfigMode("countries")
                        console.log("countries")
                    }} selected={config.mode === "countries"}>
                        Countries
                    </MenuButton>
                    <MenuButton addStyles={styles.wideButton} onClick={() => {
                        setConfigMode("currencies")
                        console.log("currencies")
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
                    <Map addStyles={styles.map}/>

            </LayoutMenuWide>
        </div>
    );
};

export default ModesSelection;