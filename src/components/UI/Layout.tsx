import React, {FC, PropsWithChildren} from 'react';
import Header from "@/components/UI/header/Header";
import styles from './Layout.module.scss';
import Meta from "@/components/UI/meta/Meta";
import {IMeta} from "@/components/UI/meta/meta.interface";
import BackgroundImage from "@/components/background-image/BackgroundImage";

const Layout:FC<PropsWithChildren<IMeta>> = ({children, ...rest}) => {
    return (
        <>
            <Meta {...rest}/>
            <BackgroundImage/>
        <div className={styles.layout}>
           <main>
              <section className={styles.content}>
                  {children}
                </section>
              </main>
        </div>
        </>
    );
};

export default Layout;