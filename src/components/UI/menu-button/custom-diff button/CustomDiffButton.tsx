import React, {FC, PropsWithChildren} from 'react';
import styles from './CustomDiffButton.module.scss';
import classNames from "classnames";

interface Props {
    addStyles?: string;
    onClick?: () => void;
    selected?: boolean;
    color: string
}

const CustomDiffButton: FC<PropsWithChildren<Props>> = ({addStyles, onClick, selected, children, color}) => {
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
        selected ?
                <button className={classNames(styles.button, addStyles, styles.selected, color)}
                        onClick={onClick}>
                    {children}
                    <svg width={starWidth} height={starHeight} viewBox="0 0 152 141" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M76 0L93.7366 53.5512L151.133 53.5512L104.698 86.6476L122.435 140.199L76 107.102L29.565 140.199L47.3016 86.6476L0.866539 53.5512L58.2634 53.5512L76 0Z"
                              fill="#D9D9D9"/>
                    </svg>

                </button> :
                <button className={classNames(styles.button, addStyles, color)}
                        onClick={onClick}>
                    {children}
                </button>
        }
        </>
    );
};

export default CustomDiffButton;