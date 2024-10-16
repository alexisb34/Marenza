import ReactDOM from "react-dom";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import { useEffect } from "react";

export default function ShippingModal({ control, setRegion, region }) {
    const [selected, setSelected] = useState(region);

    useEffect(() => {
        setRegion(selected);
    }, [selected])
    return ReactDOM.createPortal(
        <>
            <div className="z-[999999999] grid grid-cols-8 grid-rows-6 top-0 bottom-0 left-0 right-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] fixed ">
                <div className=" bg-white col-span-4 col-start-3 row-start-2 row-span-3 rounded-xl overflow-hidden shadow-sm">
                    <div className=" flex flex-row  items-center justify-between bg-gradient-to-b from-gray-200 to-gray-100 shadow-sm text-2xl font-[roboto]  px-8 py-6 border-b border-dash">
                        <h1 >Choisir votre region:</h1>
                        <span onClick={() => control(false)} className="border rounded-md hover:bg-gray-100 text-black hover:text-blue-300 p-2 cursor-pointer text-sm">
                            <GrClose />
                        </span>
                    </div>

                    <div className="flex justify-center flex-col mt-7">
                        <fieldset className="flex flex-col text-xl h-full gap-4">
                            <div onClick={() => setSelected(1)} className="select-none hover:shadow-blue-200 flex gap-2 cursor-pointer items-center px-3 py-3 border shadow-sm  mx-3 rounded bg-gray-100 bg-gradient-to-b from-gray-50 to-gray-100">
                                <input checked={selected == 1} type="radio" id="france" name="france" value={1} />
                                <label htmlFor="france">France Métropolitaine</label>
                            </div>
                            <div onClick={() => setSelected(2)} className="select-none hover:shadow-blue-200 flex gap-2 cursor-pointer items-center px-3 py-3 border shadow-sm  mx-3 rounded bg-gray-100 bg-gradient-to-b from-gray-50 to-gray-100">
                                <input checked={selected == 2} type="radio" id="europe" name="europe" value={2} />
                                <label htmlFor="europe" >Europe</label>
                            </div>
                            <div onClick={() => setSelected(3)} className="select-none hover:shadow-blue-200 flex gap-2 cursor-pointer items-center px-3 py-3 border shadow-sm  mx-3 rounded bg-gray-100 bg-gradient-to-b from-gray-50 to-gray-100">
                                <input checked={selected == 3} type="radio" id="asia" name="asia" value={3} />
                                <label htmlFor="asia">Asie</label>
                            </div>
                            <div onClick={() => setSelected(4)} className="select-none hover:shadow-blue-200 flex gap-2 cursor-pointer items-center px-3 py-3 border shadow-sm  mx-3 rounded bg-gray-100 bg-gradient-to-b from-gray-50 to-gray-100">
                                <input checked={selected == 4} type="radio" id="america" name="america" value={4} />
                                <label htmlFor="america">Amérique</label>
                            </div>
                        </fieldset>
                    </div>

                    <div className="mb-0">
                        <button className="m-3  text-white px-3 py-2 bg-orange-500 hover:bg-orange-600 rounded" onClick={() => control(false)}>Fermer</button>
                    </div>
                </div>
            </div>
        </>
        , document.getElementById('root')
    )
}