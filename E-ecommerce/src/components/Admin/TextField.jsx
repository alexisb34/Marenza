
export default function TextField({ label, value, onChange, ...props }) {

    return (

        <div>
            <label htmlFor={props.name} className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input onChange={onChange} value={value} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark" {...props} />
        </div>
    )
}