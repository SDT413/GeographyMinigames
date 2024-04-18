import React, {FC, PropsWithChildren} from 'react';
import styles from './MenuButton.module.scss';
import classNames from "classnames";
import Link from "next/link";

interface Props {
    addStyles?: string;
    onClick?: () => void;
    link?: string;
    selected?: boolean;
}

const MenuButton: FC<PropsWithChildren<Props>> = ({children, addStyles, onClick, link, selected}) => {
    return (
        <>
            { link && selected ?
            <Link href={link}>
                <button className={classNames(styles.button, addStyles, styles.selected)}
                        onClick={onClick}>
                    {children}
                    <svg width="120" height="45" viewBox="0 0 152 141" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M76 0L93.7366 53.5512L151.133 53.5512L104.698 86.6476L122.435 140.199L76 107.102L29.565 140.199L47.3016 86.6476L0.866539 53.5512L58.2634 53.5512L76 0Z"
                              fill="#D9D9D9"/>
                    </svg>

                </button>
            </Link>
            :
            link && !selected ?
            <Link href={link}>
            <button className={classNames(styles.button, addStyles)}
                    onClick={onClick}>
                {children}
            </button>
        </Link>
        :
        selected ?
                <button className={classNames(styles.button, addStyles, styles.selected)}
                        onClick={onClick}>
                    {children}
                    <svg width="120" height="45" viewBox="0 0 152 141" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M76 0L93.7366 53.5512L151.133 53.5512L104.698 86.6476L122.435 140.199L76 107.102L29.565 140.199L47.3016 86.6476L0.866539 53.5512L58.2634 53.5512L76 0Z"
                              fill="#D9D9D9"/>
                    </svg>

                </button> :
                <button className={classNames(styles.button, addStyles)}
                        onClick={onClick}>
                    {children}
                </button>
        }
        </>
    );
};

export default MenuButton;