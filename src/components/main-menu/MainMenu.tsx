import React, {FC} from 'react';
import Layout from "@/components/UI/Layout";
import Title from "@/components/UI/title/Title";
import MenuButton from "@/components/menu-button/MenuButton";

const MainMenu: FC = () => {
    return (
        <div>
            <Layout title="Geography game"
                    description={"Everything you need to know about geography"}>
                <Title title={"Geography"} subtitle={"Minigames"}/>
                <MenuButton>
                    Start Game
                </MenuButton>
                <MenuButton>
                    Play Mode
                </MenuButton>
                <MenuButton>
                    Difficulty
                </MenuButton>
                <MenuButton>
                    Review Game Map
                </MenuButton>

            </Layout>
        </div>
    );
};

export default MainMenu;