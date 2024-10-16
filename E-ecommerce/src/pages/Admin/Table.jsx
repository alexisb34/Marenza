import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../../components/Admin/Modals";
import adminStore from "../../store/items";
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
//import ressources from "../../ressources";

export default function Table({ name, fields, create }) {
    const setItems = adminStore(state => state.setItems);
    const items = adminStore(state => state.items);
    const removeItem = adminStore(state => state.removeItem);

    const [loaded, setLoaded] = useState(false);
    const [modal, setModal] = useState(false);
    const [selected, setSelected] = useState({});

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
                        <th> action</th>
                    </tr>
                </thead>

                <tbody>
                    {loaded ?
                        items.map(entry => (
                            <tr key={entry.id}>
                                {
                                    fields.map(({ field }) => <th key={entry.id} className="p-3 border-y-[1px] bg-gray-50 ">{entry[field]}</th>)
                                }

                                <th className="p-3 border-y-[1px] bg-gray-50">
                                    <button className="cursor-pointer p-2  bg-red-500 hover:bg-red-400 hover:text-gray-50 text-white mx-1 rounded" onClick={() => remove(entry.id)}><FaTrashAlt /></button >
                                    <button className="cursor-pointer p-2 bg-yellow-500 hover:bg-yellow-400 hover:text-gray-50 text-white" onClick={() => { setSelected(entry); setModal(true) }}><FaPencilAlt /></button>
                                </th>
                            </tr>
                        ))
                        : 'Loading...'
                    }
                </tbody>
            </table>
        </>
    )
}