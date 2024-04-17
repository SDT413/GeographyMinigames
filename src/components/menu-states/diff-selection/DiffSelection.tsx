import React, {FC} from 'react';
import MenuButton from "@/components/UI/menu-button/MenuButton";
import Title from "@/components/UI/title/Title";
import { usePathname } from 'next/navigation'
import LayoutMenu from "@/components/UI/ylayout/menu-layout/LayoutMenu";

const DiffSelection: FC = () => {
    const pathname = usePathname()
    const centerLayout = "max-w-7xl mx-auto"
    const mainMenuButtonsStyles = "ml-auto mr-auto flex justify-center items-center w-96"
    return (
        <div>
            <LayoutMenu title="Geography game"
                        description={"Everything you need to know about geography"}
                        addStyles={centerLayout}
            >
                <Title title={"Geography"} subtitle={"Minigames"} classNameTitle={"text-9xl"} classNameSubtitle={"text-7xl"}/>
                <MenuButton addStyles={mainMenuButtonsStyles}>
                   Easy
                </MenuButton>
                    <MenuButton addStyles={mainMenuButtonsStyles}>
                        Medium
                    </MenuButton>
                <MenuButton addStyles={mainMenuButtonsStyles}>
                    Hard
                </MenuButton>
                <MenuButton addStyles={mainMenuButtonsStyles} link={pathname+'/custom'}>
                    custom
                </MenuButton>
                <MenuButton addStyles={mainMenuButtonsStyles} link={'/'}>
                    Back to main menu
                </MenuButton>

            </LayoutMenu>
        </div>
    );
};

export default DiffSelection;