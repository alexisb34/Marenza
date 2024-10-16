import { useState } from "react";
export default function Field({ type, name, label, onChange, error, ...props }) {
    const [field_error, setError] = useState(error);

    return (

        <div className="p-1 flex flex-col  gap-1">
            <label htmlFor={name}><strong>{label}</strong></label>
            <input {...props} onChange={onChange} className={`focus:outline-none px-3 py-2 border-solid border-[1px]  ${field_error ? 'bg-red-100 border-red-600' : 'bg-white border-gray-600'}`} type={type} name={name} id="" />
        </div>
    )
} 
