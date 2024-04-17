import React, {FC, PropsWithChildren} from 'react';
import styles from './MenuButton.module.scss';
import classNames from "classnames";
import Link from "next/link";

interface Props {
    addStyles?: string;
    onClick?: () => void;
    link?: string;
}

const MenuButton: FC<PropsWithChildren<Props>> = ({children, addStyles, onClick, link}) => {
    return (
        <>
        {link ?
            <Link href={link}>
            <button className={classNames(styles.button, addStyles)}
                    onClick={onClick}>
                {children}
            </button>
        </Link> :
        <button className={classNames(styles.button, addStyles)}
                onClick={onClick}>
            {children}
        </button>
        }
        </>
    );
};

export default MenuButton;