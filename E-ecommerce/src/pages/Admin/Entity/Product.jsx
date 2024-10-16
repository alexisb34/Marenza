import { useState } from "react";

import TextField from "../../../components/Admin/TextField";
import TextArea from '../../../components/Admin/TextArea';
import UploadFile from "../../../components/Admin/UploadFile";
import adminStore from "../../../store/items";
import RelationDropDown from "../../../components/Admin/RelationDropDown";
import { adminQuery } from "../../../provider/query";

export default function Product({ edit, name }) {

    const addItem = adminStore(state => state.addItem);
    const updateItem = adminStore(state => state.updateItem);

    const [state, setState] = useState({
        available: edit.available ?? true,
        price: edit.price ?? 0,
        description: edit.description ?? '',
        brand: edit.brand ?? '',
        genre: edit.genre ?? '',
        name: edit.name ?? '',
        weight: edit.weight ?? 0,
        clearance: edit.clearance ?? 0,
    });

    function change(data) {
        state[data.target.name] = data.target.type === 'number' ? parseInt(data.target.value) : data.target.value;
        setState({ ...state });
    }

    async function submit(e) {
        e.preventDefault()
        let result = await adminQuery(name, { ...state, available: true }, edit);
        // console.log(state);
        // console.log(edit.id);
        // let id = edit.id
        // console.log("id:"+id)

        edit.id ?
            updateItem(result)
            :
            addItem(result);
    }
    return (
        <><form onSubmit={submit}>
            <div className="p-6 space-y-6">
                <div>
                    <input type="button" value={state.available} className="p-1 text-md bg-blue-400" onClick={() => { setState({ ...state, available: !state.available }) }} />
                </div>
                <TextField value={state.price} onChange={change} label="Prix de l'article:" type='number' name="price" />
                <TextField value={state.weight} onChange={change} label="Poids de l'article:" type='number' name="weight" />
                <TextField value={state.name} onChange={change} label="Nom:" type='text' name="name" />
                <div className="py-2 text-sm">
                    <label htmlFor="clearance">Solde:</label>
                    <select value={edit.clearance} onChange={({ target }) => setState({ ...state, clearance: parseInt(target.value) })} name="clearance" type="number" className="block px-3 py-3 bg-white border rounded ">
                        <option value="0">0% </option>
                        <option value="10">10% </option>
                        <option value="20">20%</option>
                        <option value="30">30%</option>
                        <option value="40">40%</option>
                        <option value="50">50%</option>
                    </select>
                </div>
                <TextArea value={state.description} onChange={change} label="Description:" name="description" />
                <RelationDropDown onSelect={(select) => setState({ ...state, brand: select })} name="brands" search_field="brand_name" label="Marque du produit:" />
                <RelationDropDown onSelect={(select) => setState({ ...state, genre: select })} name="genres" search_field="name" label="Genre:" />
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 ">
                <input type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none cursor-pointer" value={edit.id ? 'Modifier entrer' : 'Nouvelle entrer'} />
            </div>
        </form>
            <UploadFile id={edit.id} label="Sélectionner les images ( JPG/PNG ):" />

        </>
    )
}