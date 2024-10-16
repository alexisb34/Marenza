import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsChevronRight, BsFillTrashFill, BsChevronCompactDown, BsCardChecklist } from "react-icons/bs";
import converse1 from "../assets/images/converse1.jpg"
import basketStore from "../store/basket";
import ShippingModal from "../components/ShippingModal";
import PromptLogin from "../components/PromptLogin";
import Avantages from "../components/Avantages"
import useAuthStore from "../store/user";

const DropQuantity = ({ count, max, identifier }) => {

    const drop = useRef();
    const updateQuantity = basketStore(state => state.updateQuantity);
    const basket = basketStore(state => state.basket);

    const [open, setOpen] = useState(false);

    const handleClickOutside = ({ target }) => {
        if (!drop.current.contains(target)) {
            setOpen(false);
        }
    }



    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [drop])


    useEffect(() => {
        setOpen(false);
    }, [basket])




    return (
        <div onClick={() => setOpen(true)} ref={drop} className=" relative md:h-min border px-3 py-2 flex justify-between items-center cursor-pointer font-semibold md:w-min">
            <div className="md:hidden">Quantité:</div>
            <div className="flex items-center gap-1 ">
                {count}
                <BsChevronCompactDown />
            </div>
            {
                open &&
                <div className="z-[50] hide-scroll max-h-60 overflow-scroll flex flex-col absolute top-full bg-white border-x border-b  -left-[1px] -right-[1px] ">
                    {
                        [...Array(max + 1).keys()].map((quantity) => (
                            <span onClick={() => { updateQuantity(identifier, quantity) }} className="bg-white hover:bg-gray-100 py-2 px-2 odd:bg-gray-50  text-center w-full justify-center items-center flex ">{quantity}</span>
                        ))
                    }
                </div>
            }
        </div>
    )
};

const CheckoutCard = ({ product, count }) => {
    const removeItem = basketStore(state => state.removeItem)

    return (
        <div className=" mt-3  w-full border p-6 flex gap-4 flex-col md:flex-row">
            <div className="w-full md:w-10/12 flex gap-4 ">
                <img src={converse1} className='aspect-auto h-36' />
                <div className="flex flex-col">
                    <span className="text-lg font-extrabold uppercase">{product.brand_name} - {product.name}</span>
                    <span className="text-md text-gray-400">TAILLE: {product.size?.size}</span>
                    <span className="text-md text-gray-400">COULEUR: {product.color.colorName}</span>
                    <span className="flex items-center my-6 cursor-pointer" onClick={() => removeItem(product.key)}><BsFillTrashFill /> Supprimer</span>
                </div>
            </div>

            <div className="flex gap-y-3 flex-col md:flex-row md:gap-3 md:items-center" >
                <DropQuantity count={count} max={product.quantity} identifier={product.key} />
                <div className="md:h-min border md:border-none px-3 md:px-0 py-2 flex justify-between items-center cursor-pointer font-semibold md:w-min">
                    <div className="md:hidden">Prix:</div>

                    {product.clearance_price ?
                        <div className="flex flex-col">
                            <span className="text-red-500 font-extrabold">{product.clearance_price * count}€</span>
                            <span className="line-through font-light">{product.price * count}€</span>
                        </div>
                        : <span>{product.price * count}€</span>}
                </div>
            </div>
        </div>)
}

export default function Checkout() {
    const [modal, setModal] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [region, setRegion] = useState(false);
    const [total, setTotal] = useState({});
    const [prompt, setPrompt] = useState(false);
    const navigate = useNavigate();

    const basket = basketStore(state => state.basket)
    const is_auth = useAuthStore(state => state.is_authenticated);


    //choose the screen size 
    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }


    useEffect(() => {
        handleResize();

        //TODO move this outside of this file
        if (region !== false && basket.length > 0) {
            fetch('/api/calculate_fee', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ basket, region })
            }).then(res => res.json())
                .then(setTotal)
        }

        return window.addEventListener("resize", handleResize);
    }, [region, basket])
    return (
        <>
            {modal && <ShippingModal control={setModal} setRegion={setRegion}  ></ShippingModal>}
            <div className="flex justify-center mb-6">
                <div class="w-10/12 flex flex-col">
                    <h1 className="text-3xl uppercase font-Impact">Mon panier</h1>
                    <span className="text-xl text-gray-400">({basket.length} article(s))</span>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="grid md:grid-cols-3  w-10/12 md:gap-x-5 gap-y-5">
                    <div className=" md:col-span-2">
                        {basket.map(card => (
                            <CheckoutCard {...card} />
                        ))}
                    </div>
                    <div className=" w-full">
                        <div className={`border-t border-l border-r rounded shadow-sm ${basket.length == 0 ? 'opacity-40' : false}`} >
                            <div className="bg-gray-50 border-b p-3 uppercase font-extrabold text-lg border-gray-300">
                                Recapitulatif
                            </div>
                            <div className="border-b grid grid-cols-3 p-3">
                                <span className="col-span-2">SOUS-TOTAL</span>
                                <div className="flex justify-center">{total.sub_total}€</div>
                            </div>
                            <div className="border-b grid grid-cols-3 p-3">
                                <span className="col-span-2">FRAIS DE GESTION</span>
                                <div className="flex justify-center">{total.fee}€</div>
                            </div>
                            <div className="border-b grid grid-cols-3 p-3">
                                <span className="col-span-2">FRAIS DE LIVRAISON</span>
                                {
                                    total.shipping_cost ? <div onClick={() => setModal(true)} className=" cursor-pointer text-blue-400 flex justify-center font-semibold">{total.shipping_cost}€</div> : <span className="text-blue-700 cursor-pointer hover:text-blue-600 text-xs " onClick={() => setModal(true)}>choisir ma livraison</span>
                                }                            </div>
                            <div className="border-b grid grid-cols-3 p-3 text-lg">
                                <span className="col-span-2 text-bold font-extrabold">TOTAL</span>
                                <div className="flex justify-center font-semibold">{total.total}€</div>
                            </div>
                        </div>
                        <div className="w-full flex justify-center py-1">
                            {
                                prompt && <PromptLogin />
                            }
                            <button onClick={() => is_auth ? navigate('/shipping') : setPrompt(true)} disabled={basket.length == 0 ? true : false} className="disabled:bg-gray-300 disabled:cursor-default cursor-pointer shadow-md hover:bg-orange-400 px-4 py-2 mt-1 bg-orange-500 text-white text-xl flex justify-between items-center">Passer commande <BsChevronRight /> </button>
                        </div>
                    </div>
                </div>
            </div>
            <Avantages/>
        </>
    )
}