import { useState, useEffect, useRef } from "react";
import { getAllProducts } from "../provider/query";
import { BsChevronUp, BsChevronDown, BsCheckLg } from 'react-icons/bs';

export const Dropdown = ({ label, name, field, change, filter }) => {
    const [open, setOpen] = useState(false);
    const [choices, setChoices] = useState([]);
    const [selected, setSelected] = useState([]);

    const drop = useRef();


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);


        getAllProducts(name).then(json => {
            setChoices(json);
        })

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [drop])



    useEffect(() => {
        change({
            name,
            filter: selected.length > 0 ? `&${filter}[]=` + selected.map(x => x.id).join(`&${filter}[]=`) : ''
        });
    }, [selected])

    const handleClickOutside = ({ target }) => {
        if (!drop.current.contains(target)) {
            setOpen(false);
        }
    }

    const add = (entry) => {
        if (selected.includes(entry)) {
            let res = selected.filter(x => x !== entry);

            setSelected(state => [...res])

            return;
        }

        setSelected(state => [...state, entry])
    }

    return (
        <div ref={drop} className=" m-auto group relative cursor-pointer text-center sm:mx-2 mb-2 mt-2 select-none fadeIn border w-80 h-10 shadow-md  inline-flex justify-between  place-items-center px-5 py-1"
        >
            <div className='w-full' onClick={() => setOpen(state => !state)}>
                <span className='text-center '>{label}</span>
            </div>

            {open ?
                <BsChevronDown className='absolute' onClick={() => setOpen(state => !state)} />
                :
                <BsChevronUp className='absolute' onClick={() => setOpen(state => !state)} />
            }
            {open &&
                <div className='bg-white absolute  max-h-32  overflow-y-scroll  top-full left-0 right-0 border-l border-b border-rshadow-md'>
                    <ul>
                        {
                            choices.map(choice => (
                                selected.includes(choice)
                                    ?
                                    <li onClick={() => add(choice)} className='px-5 py-2 bold font-semibold bg-amber-50 relative place-items-center'>{choice[field]}</li>
                                    :
                                    <li onClick={() => add(choice)} className='px-5 py-2 bold font-semibold hover:bg-amber-50'>{choice[field]}</li>
                            ))
                        }
                    </ul>
                </div>
            }
        </div>
    );
}