import React, {FC} from 'react';
import styles from './Header.module.scss';
import Search from "@/components/UI/search/Search";


const Header: FC = () => {
    return (
        <header className={styles.header}>
            <Search/>
        </header>
    );
};

export default Header;