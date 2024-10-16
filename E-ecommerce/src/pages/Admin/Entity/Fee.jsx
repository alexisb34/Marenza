import { useState } from "react";
import TextField from "../../../components/Admin/TextField";
import { adminQuery } from "../../../provider/query";
import adminStore from "../../../store/items";

export default function Fee({ name, edit }) {


    const addItem = adminStore(state => state.addItem);
    const updateItem = adminStore(state => state.updateItem);


    const [state, setState] = useState({
        fee: edit.fee ?? 0,
    });

    function change(data) {
        state[data.target.name] = data.target.type === 'number' ? parseInt(data.target.value) : data.target.value;
        setState({ ...state });
        console.log({ ...state });
    }

    async function submit(e) {
        e.preventDefault()
        let result = await adminQuery(name, state, edit)

        edit.id ?
            updateItem(result)
            :
            addItem(result);
    }
    return (
        <form onSubmit={submit}>
            <div className="p-6 space-y-6">
                <TextField type="number" onChange={change} name="fee" label="Nom de la couleur:" placeholder="10" />
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 ">
                <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none cursor-pointer" value={edit.id ? 'Modifier entrer' : 'Nouvelle entrer'} />
            </div>
        </form>
    );
}