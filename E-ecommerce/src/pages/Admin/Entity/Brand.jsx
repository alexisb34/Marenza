import { useState } from "react";

import TextField from "../../../components/Admin/TextField";
import adminStore from "../../../store/items";
import { adminQuery } from "../../../provider/query";
//import TextField from "../../components/Admin/TextField"
// import FastForm from "../../components/FastForm";
// import adminStore from "../../store/items";

export default function Brand({ edit, name }) {

    const addItem = adminStore(state => state.addItem);
    const updateItem = adminStore(state => state.updateItem);


    const [state, setState] = useState({
        brandName: edit.brandName ?? "",
        logoPath: edit.logoPath ?? "",
    });


    //!!! TODO move to an api call file
    async function submit(e) {
        e.preventDefault()
        let result = await adminQuery(name, state, edit)

        console.log(result);
        edit.id ?
            updateItem(result)
            :
            addItem(result);
    }

    function change(data) {
        state[data.target.name] = data.target.value
        setState({ ...state });
        console.log({ ...state });
    }
    return (
        <>
            <form onSubmit={submit}>
                <div className="p-6 space-y-6">
                    <TextField value={state.brandName} onChange={change} name="brandName" label="Nom de la marque:" placeholder="Nike ..." />
                    <TextField value={state.logoPath} onChange={change} name="logoPath" label="Chemin du logo:" placeholder="http://www.example.com" />
                </div>
                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 ">
                    <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none cursor-pointer" value={edit.id ? 'Modifier entrer' : 'Nouvelle entrer'} />
                </div>
            </form>

        </>
    )
}