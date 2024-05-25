import React, {FC, PropsWithChildren} from 'react';
import styles from './LinkButton.module.scss';
import classNames from "classnames";
import Link from "next/link";

interface Props {
    addStyles?: string;
    onClick?: () => void;
    link: string;
}

const LinkButton: FC<PropsWithChildren<Props>> = ({children, onClick, link}) => {
    return (
        <>
            <Link href={link} className={styles.link}>
                <button style={{width: "fit-content", marginTop: "50px"}}
                        onClick={onClick}>
                    {children}
                </button>
            </Link>

        </>
    );
};

export default LinkButton;