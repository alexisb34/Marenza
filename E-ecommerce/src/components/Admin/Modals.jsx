import ReactDOM from "react-dom";
import FastForm from "../FastForm";

export default function Modal({ title, children, close }) {
    function _onChange(event) {
        console.log()
        state[event.target.name] = event.target.value
        setState(
            { ...state }
        );
        console.log(state);
    }
    return ReactDOM.createPortal(
        <>
            <div className="bg-[rgba(0,0,0,0.5)] absolute  top-0 right-0 left-0 flex justify-center">
                <div className="w-6/12 overflow-scroll mt-40 mb-80">
                    <div className="bg-white rounded-lg shadow h-full">
                        <div className="flex justify-between items-start p-4 rounded-t border-b  overflow-scroll">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                {title}
                            </h3>
                            <button onClick={() => close(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  dark:hover:text-white" data-modal-toggle="defaultModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {children}
                    </div>
                </div>

            </div>
        </>
        , document.getElementById('root')
    )
}