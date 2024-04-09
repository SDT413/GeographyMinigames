import React, {FC, PropsWithChildren} from 'react';
import styles from './MenuButton.module.scss';

const MenuButton: FC<PropsWithChildren<{}>> = ({children}) => {
    return (
        <button className={styles.button}>
            {children}
        </button>
    );
};

export default MenuButton;