import {FC, useState} from 'react';
import styles from './Search.module.scss';
import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";

const Search:FC = () => {
    const [search, setSearch] = useState<string>('')
    return (
        <div className={styles.search}>
            <InputGroup size = 'xs'>
                <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color="gray.500" />}
                />
            <Input className={styles.input}
                variant="flushed"
                   size = 'base'
                   type = 'search'
                   placeholder = 'Search'
                   value = {search}
                   onChange = {(e) => setSearch(e.target.value)}
                    _focus={
                        {
                            borderColor: 'green.400'
                        }
                    }
            />
            </InputGroup>
        </div>
    );
};

export default Search;