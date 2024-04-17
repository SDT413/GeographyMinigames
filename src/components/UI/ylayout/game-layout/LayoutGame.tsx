import React, {FC, PropsWithChildren} from 'react';
import Header from "@/components/UI/header/Header";
import Meta from "@/components/UI/meta/Meta";
import classNames from "classnames";
import GameImage from "@/components/UI/images/game-image/GameImage";
import styles from './LayoutGame.module.scss';

interface Props {
    children?: any,
    title: string,
    description?: string,
    image?: string,
    type?: string
    addStyles?: string;
}

const LayoutGame:FC<PropsWithChildren<Props>> = ({children, title, description, addStyles}) => {
    return (
        <>
            <Meta {...{title, description}}/>
            <GameImage/>
            <div className={styles.layout}>
                <main>
                    <section className={classNames(styles.content, addStyles)}>
                        {children}
                    </section>
                </main>
            </div>
        </>
    );
};

export default LayoutGame;