import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../../components/Admin/Modals";
import adminStore from "../../store/items";
import { FaTrashAlt, FaPencilAlt, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import RelationDropDown from "../../components/Admin/RelationDropDown";
import { createSome } from "../../provider/query";
import useAuthStore from "../../store/user";
import Toggle from "../../components/Admin/Toggle";

export default function ProductTable({ name, fields, create }) {
    const setItems = adminStore(state => state.setItems);
    const items = adminStore(state => state.items);
    const removeItem = adminStore(state => state.removeItem);
    const updateItem = adminStore(state => state.updateItem);

    const token = useAuthStore(state => state.token);


    const [loaded, setLoaded] = useState(false);
    const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState({});

    const [expanded, setExpanded] = useState([]);
    const [stockModal, setStockModal] = useState(false);


    const [state, setState] = useState({
        color: '',
        size: '',
        quantity: 0,
    });

    let location = useLocation();

    async function FetchData(params) {
        let res = await fetch(`/api/${name}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());

        setItems(res);
        setLoaded(true);
    }


    function open() {
        setSelected({});
        setModal(true);
    }

    async function submit(e) {
        e.preventDefault();
        console.log(state);
        console.log('here')

        createSome('stocks', {
            product: `/api/products/${stockModal}`,
            ...state
        }, token)

        setStockModal(false);
    }


    function change(data) {
        state[data.target.name] = data.target.type === 'number' ? parseInt(data.target.value) : data.target.value;
        setState({ ...state });
    }

    async function remove(id) {
        fetch(`/api/${name}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status == 204) {
                removeItem({ id: id });
            }
        });
    }

    function toggleExpand(id) {
        if (expanded.includes(id)) {
            let res = expanded.filter(x => x !== id);
            setExpanded([...res]);
            return;
        }
        setExpanded(state => [...state, id])
    }

    function openStock(id) {
        setStockModal(id)
    }

    function setPromoted(id, state) {
        fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                promoted: state,
            })

        }).then(res => res.json())
            .then(updateItem)
    }

    useEffect(() => {
        FetchData();
    }, [location]);
    return (
        <>
            {modal ?
                <Modal close={setModal} >
                    <create.type edit={selected} name={name} />
                </Modal> : null}
            <input onClick={open} type="button" value="Open modal" className="rounded-md py-2 px-4 hover:bg-cyan-600 cursor-pointer border-solid border-[1px] text-lg bg-cyan-500 text-white my-2 " />
            <table className="table-auto w-full border-solid border-[1px] border-gray rounded-3xl">
                <thead className="bg-gray-100">
                    <tr>
                        {
                            fields.map(({ display_name }) => <th className="p-3">{display_name}</th>)
                        }
                        <th>Promoted</th>
                        <th>action</th>
                    </tr>
                </thead>

                <tbody>
                    {loaded ?
                        items.map(entry => (
                            <>
                                <tr key={entry.id}>
                                    {
                                        fields.map(({ field }) => <th key={entry.id} className="p-3 border-y-[1px] bg-gray-50 ">{entry[field]}</th>)
                                    }
                                    <th>
                                        <Toggle checked={entry.promoted} onChange={() => setPromoted(entry.id, !entry.promoted)} />
                                    </th>
                                    <th className="p-3 border-y-[1px] bg-gray-50 flex">
                                        <button className="cursor-pointer p-2  bg-red-500 hover:bg-red-400 hover:text-gray-50 text-white mx-1 rounded" onClick={() => remove(entry.id)}><FaTrashAlt /></button >
                                        <button className="cursor-pointer p-2 bg-yellow-500 hover:bg-yellow-400 hover:text-gray-50 text-white" onClick={() => { setSelected(entry); setModal(true) }}><FaPencilAlt /></button>
                                        <button className="p-2" onClick={() => toggleExpand(entry.id)}>
                                            {expanded.includes(entry.id) ? <FaChevronDown /> : <FaChevronUp />}
                                        </button>
                                    </th>
                                </tr>
                                {expanded.includes(entry.id) &&
                                    <tr >
                                        <th colSpan="100%" >
                                            <div className="w-full flex flex-col ">
                                                {
                                                    stockModal == entry.id
                                                    &&
                                                    <Modal close={setStockModal}>
                                                        <form onSubmit={submit}>
                                                            <div className="space-y-6 p-6">
                                                                <RelationDropDown required={true} onSelect={(select) => setState({ ...state, size: select })} name="sizes" search_field="size" label="Taille du stock:" />
                                                                <RelationDropDown required={true} onSelect={(select) => setState({ ...state, color: select })} name="colors" search_field="colorName" label="Couleur du stock:" />
                                                                <div className="flex flex-col">
                                                                    <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900" >Quantiter d'article:</label>
                                                                    <input onChange={change} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark" type="number" name="quantity" id="" />
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 ">
                                                                <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none cursor-pointer" value={'Nouvelle entrer'} />
                                                            </div>
                                                        </form>

                                                    </Modal>
                                                }
                                                <table className="border">
                                                    <tr className="bg-gray-200 border">
                                                        <th colSpan={1}>
                                                            <button onClick={() => setStockModal(entry.id)} className="m-1 px-1 py-2.5 bg-black text-white block w-fit ">Ajouter du stock</button>
                                                        </th>
                                                        <th className="py-3">
                                                            Couleur
                                                        </th>
                                                        <th className="py-3">
                                                            Taille
                                                        </th>
                                                        <th className="py-3">
                                                            Quantité
                                                        </th>
                                                    </tr>
                                                    {entry.stocks.map(entry => (
                                                        <tr key={entry.id} className="transition border-b even:bg-gray-50 odd:bg-gray-100">
                                                            <th className="py-3" colSpan={2}>
                                                                {entry.color?.colorName}
                                                            </th>
                                                            <th className="py-3">
                                                                {entry.size?.size}
                                                            </th>
                                                            <th className="py-3">
                                                                {entry.quantity}
                                                            </th>
                                                        </tr>

                                                    ))}

                                                </table>
                                            </div>
                                        </th>
                                    </tr>
                                }
                            </>
                        ))
                        : 'Loading...'
                    }
                </tbody>
            </table>
        </>
    )
}