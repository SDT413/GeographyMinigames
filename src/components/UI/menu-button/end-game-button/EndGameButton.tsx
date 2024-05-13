import React, {FC, PropsWithChildren} from 'react';
import styles from './EndGameButton.module.scss';
import classNames from "classnames";
import Link from "next/link";

interface Props {
    addStyles?: string;
    onClick?: () => void;
    link?: string;
}

const EndGameButton: FC<PropsWithChildren<Props>> = ({addStyles, onClick, children, link}) => {
    const [starWidth, setStarWidth] = React.useState(window.innerWidth >= 1980 ? 120 :
        window.innerWidth >= 1680 ? 120 :
            window.innerWidth >= 1280 ? 100 :
                window.innerWidth >= 1024 ? 100 :
                    window.innerWidth >= 800 ? 100 :
                        window.innerWidth >= 768 ? 90 :
                            window.innerWidth >= 640 ? 80 :
                                window.innerWidth >= 480 ? 20 :
                                    window.innerWidth >= 375 ? 20 :
                                        window.innerWidth >= 360 ? 20 :
                                            window.innerWidth >= 320 ? 10 : 10);
    const [starHeight, setStarHeight] = React.useState(window.innerWidth >= 1980 ? 45 :
        window.innerWidth >= 1680 ? 45 :
            window.innerWidth >= 1280 ? 40 :
                window.innerWidth >= 1024 ? 40 :
                    window.innerWidth >= 800 ? 40 :
                        window.innerWidth >= 768 ? 40 :
                            window.innerWidth >= 640 ? 35 :
                                window.innerWidth >= 480 ? 10 :
                                    window.innerWidth >= 375 ? 10 :
                                        window.innerWidth >= 360 ? 10 :
                                            window.innerWidth >= 320 ? 5 : 5);
    /*console.log(starWidth, starHeight)*/
    React.useEffect(() => {
        const handleResize = () => {
            setStarWidth(window.innerWidth >= 1980 ? 120 :
                window.innerWidth >= 1680 ? 120 :
                    window.innerWidth >= 1280 ? 100 :
                        window.innerWidth >= 1024 ? 100 :
                            window.innerWidth >= 800 ? 100 :
                                window.innerWidth >= 768 ? 90 :
                                    window.innerWidth >= 640 ? 80 :
                                        window.innerWidth >= 480 ? 20 :
                                            window.innerWidth >= 375 ? 20 :
                                                window.innerWidth >= 360 ? 20 :
                                                    window.innerWidth >= 320 ? 10 : 10);
            setStarHeight(window.innerWidth >= 1980 ? 45 :
                window.innerWidth >= 1680 ? 45 :
                    window.innerWidth >= 1280 ? 40 :
                        window.innerWidth >= 1024 ? 40 :
                            window.innerWidth >= 800 ? 40 :
                                window.innerWidth >= 768 ? 40 :
                                    window.innerWidth >= 640 ? 35 :
                                        window.innerWidth >= 480 ? 10 :
                                            window.innerWidth >= 375 ? 10 :
                                                window.innerWidth >= 360 ? 10 :
                                                    window.innerWidth >= 320 ? 5 : 5);
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [starWidth, starHeight])
    return (
        <>
            {
                link ?
                    <Link href={link} className={classNames(styles.button, addStyles)}>
                        <button
                                onClick={onClick}>
                            {children}
                        </button>
                    </Link>
                    :
                        <button className={classNames(styles.button, addStyles)}
                                onClick={onClick}>
                            {children}
                        </button>
            }
        </>
    );
};

export default EndGameButton;