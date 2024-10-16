import useAuthStore from "../store/user";
import moment from "moment";
import GenderMenu from "../components/GenderMenu";
import CardPhone from "../components/CardPhone";
import SoldcardPhone from "../components/SoldcardPhone";
import Avantages from "../components/Avantages"
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import CarouselSold from "../components/CarouselSold";
//import PanierHoverWeb from "../components/PanierHoverWeb";

import CoupdeCoeur from "../components/CoupdeCoeur";
import { useEffect, useState } from "react";
import { getAllProducts } from "../provider/query";

export default function Home() {
    const [populars, setPopulars] = useState([]);
    const [news, setNews] = useState([]);
    const [filter, setFilter] = useState(false);


    useEffect(() => {
        let date = new Date();
        date.setMinutes(date.getMinutes() - 2)
        date.setHours(date.getHours() + (moment().isDST() ? 2 : 0))

        setFilter(date.toISOString());
    }, [])
    useEffect(() => {

        getAllProducts('products').then(setPopulars);

        if (filter)
            getAllProducts('products', `?createdAt[strictly_after]=${filter}`).then(setNews)

    }, [filter])




    return (
        <>

            <GenderMenu />

            {news.length > 0 &&
                <>
                    <h1 className="text-center font-[impact]  text-6xl my-3">NOUVEAUTES</h1>
                    <div className="grid grid-cols-5 p-16 content-center ">
                        {news.map((card) => (
                            !card.clearance ? <SoldcardPhone {...card} /> : <CardPhone {...card} />
                        ))}
                    </div>
                </>
            }
            <Carousel products={populars} />
            <CoupdeCoeur />
            <Avantages />
            <Footer />
        </>
    )
}