import React, {FC} from 'react';
import Layout from "@/components/UI/Layout";
import Title from "@/components/UI/title/Title";

const MainMenu: FC = () => {
    return (
        <div>
            <Layout title="Home"
                    description={"More than just great coffee. Explore the menu, sign up for Starbucks® Rewards, manage your gift card and more."}>
                <Title title={"Geography"} subtitle={"Minigames"}/>
            </Layout>
        </div>
    );
};

export default MainMenu;