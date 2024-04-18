"use client";
import {NextPage} from "next";
import GameScreen from "@/components/game-screen/GameScreen";

interface PageProps {
   params: {
         slug: "shapes" | "countries" | "capitals" | "currencies";
   }
}
const ProductPage: NextPage<PageProps> = ({params}) => {

    return (
        <GameScreen gameMode={params.slug}/>
    );
};

export default ProductPage;