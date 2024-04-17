import React, {FC, PropsWithChildren} from 'react';
import Header from "@/components/UI/header/Header";
import styles from './LayoutEnd.module.scss';
import Meta from "@/components/UI/meta/Meta";
import classNames from "classnames";
import StatisticsImage from "@/components/UI/images/statistics-image/StatisticsImage";

interface Props {
    children?: any,
    title: string,
    description?: string,
    image?: string,
    type?: string
    addStyles?: string;
}

const LayoutEnd:FC<PropsWithChildren<Props>> = ({children, title, description, addStyles}) => {
    return (
        <>
            <Meta {...{title, description}}/>
            <StatisticsImage/>
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

export default LayoutEnd;