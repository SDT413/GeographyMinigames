import {FC, PropsWithChildren} from 'react';
import styles from './EndGameTitle.module.scss';
import cn from "clsx";

interface ITitle {
    title: string;
    subtitle: string;
    classNameTitle?: string;
    classNameSubtitle?: string;
}

const EndGameTitle:FC<PropsWithChildren<ITitle>> = ({title, subtitle, classNameTitle, classNameSubtitle}) => {
    return (
        <div>
            <h1 className={cn(styles.title, classNameTitle
            )}>
                {title}

            </h1>
            <h2 className={cn(styles.subtitle, classNameSubtitle)}>{subtitle}</h2>
        </div>
    );
};

export default EndGameTitle;