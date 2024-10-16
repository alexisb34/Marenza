import { useEffect } from "react";
import { useState } from "react";

export default function RelationDropDown({ search_field, name, relation, onChange, onSelect, label, ...props }) {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);

    async function onChange(e) {
        setSearch(e.target.value);

        let json = await fetch(`/api/${name}?${search_field}=${search}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())


        setResult(json);
        console.log(json);
    }

    async function focusIn() {
        setShow(true);
    }

    async function focusOut(params) {
        setTimeout(() => {
            setShow(false);
        }, 100);
    }

    async function selected(entry) {
        setSearch(entry[search_field])
        focusOut();
        onSelect(`/api/${name}/${entry.id}`)
    }
    return (
        <div onMouseLeave={focusOut}>
            <label htmlFor={props.name} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <div className="relative">
                <input onChange={onChange} value={search} onFocus={focusIn} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark" {...props} />

                {show ?
                    <div className="w-full absolute bg-white max-h-20  overflow-scroll">
                        <ul>
                            {
                                result.map((entry) => (
                                    <li onClick={() => selected(entry)} className="-top-1 p-2 text-md hover:bg-gray-100 cursor-pointer border-b-[1px]">{entry[search_field]}</li>
                                ))
                            }
                        </ul>
                    </div> : null}
            </div>
        </div>
    );
}