import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import converse1 from '../assets/images/converse1.jpg'
import { getProducts } from "../provider/query";
import filterStore from "../store/filter";
import { Link } from "react-router-dom";
export default function SearchBar(params) {
    const setSearch = filterStore(state => state.setSearch);
    const navigate = useNavigate();
    const [focus, setFocus] = useState(false)

    const [value, setValue] = useState('');
    const [results, setResults] = useState([]);

    const search = useRef();

    const submitSearch = (e) => {
        e.preventDefault();

        setSearch(value);
        setFocus(false);
        navigate('/search', {
            replace: true
        });
    }

    useEffect(() => {
        getProducts('', value).then(res => {
            setResults(res);
        })
    }, [value])


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [search])


    function handleClickOutside({ target }) {
        if (!search.current.contains(target)) {
            setFocus(false);
        }
    }

    return (
        <div ref={search} className="bg-gray-200 flex fadeIn md:relative">
            <AiOutlineSearch className="text-orange-600 my-auto ml-3 align-middle text-3xl fadeIn" />
            <form onSubmit={submitSearch}>
                <input onFocus={() => setFocus(true)} value={value} onChange={e => setValue(e.target.value)} className="focus:outline-none bg-gray-200 pl-8 pr-5 w-full h-11 fadeIn" placeholder="Que recherchez-vous ?" />
            </form>
            {(focus && value !== '') && <div className="absolute z-50 top-full bg-white left-0 right-0 max-h-44 overflow-x-auto">
                <ul className="">
                    {results.map(result => (
                        <Link to={`/product/${result.id}`}>
                            < li className="px-5 py-1.5 border-b hover:bg-gray-50 cursor-pointer bg-white z-[9999999999999]">
                                <div className="flex">
                                    <img src={converse1} className=" h-9 md:h-12" srcset="" />
                                    <div className="px-5">
                                        <p className="font-bold">{result.name}</p>
                                        <span className="text-gray-600">{result.clearance_price ?? result.price}€</span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    ))
                    }
                </ul>
            </div>}
        </div >
    )
}