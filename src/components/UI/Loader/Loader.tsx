import {FC} from 'react';
import styles from './Loader.module.scss';
import {Spinner} from "@chakra-ui/react";
import {COLORS} from "@/config/color.config";

const Loader :FC= () => {
    return (
       <Spinner className={styles.loader}
                size={'xl'}
                thickness={'4px'}
                speed={'0.65s'}
                emptyColor={'gray.200'}
                color={COLORS.green}
                display={'block'}
                marginTop = {'20px'}
       />
    );
};

export default Loader;