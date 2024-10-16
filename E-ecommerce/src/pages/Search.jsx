import Avantages from "../components/Avantages"
import Filter from "../components/Filter"
import SelectRanking from "../components/SelectRanking"
import { ResultSearch } from "../components/ResultSearch"
import { getProducts } from "../provider/query"
import { useEffect } from "react"
import { useState } from "react"
import filterStore from "../store/filter"
export default function Search() {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState([]);
    const search = filterStore(state => state.search);

    useEffect(() => {
        getProducts(filter.map(x => x.filter).join(''), search).then((json) => {
            setProducts(json);
        })
    }, [filter, search])
    return (
        <>
            <Filter onFilter={setFilter} />
            <SelectRanking />
            <ResultSearch products={products} />
            <Avantages />
        </>
    )
}