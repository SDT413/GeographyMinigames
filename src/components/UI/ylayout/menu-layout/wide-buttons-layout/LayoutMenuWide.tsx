import React, {FC, PropsWithChildren} from 'react';
import Header from "@/components/UI/header/Header";
import styles from './LayoutMenuWide.module.scss';
import Meta from "@/components/UI/meta/Meta";
import classNames from "classnames";
import MenuImage from "@/components/UI/images/menu-image/MenuImage";

interface Props {
    children?: any,
    title: string,
    description?: string,
    image?: string,
    type?: string
    addStyles?: string;
}

const LayoutMenuWide:FC<PropsWithChildren<Props>> = ({children, title, description, addStyles}) => {
    return (
        <>
            <Meta {...{title, description}}/>
            <MenuImage/>
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

export default LayoutMenuWide;