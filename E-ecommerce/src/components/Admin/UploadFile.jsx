import { uploadFile } from "../../provider/query"
import { useRef } from "react";


export default function UploadFile({id,label}) {
	const form = useRef();
	async function submit(e) {
        e.preventDefault()
		const newForm = new FormData()
		let i = 0;
		newForm.append("file",  form.current.files[0]); 
		for(const file of form.current.files){
			newForm.append("file" + i++, file, file.name)
		}
        uploadFile(newForm,id);
    }

    return (

        <div>
			<form onSubmit={submit} className="pl-6 pb-3">
				<div>
					<label for="file" className="block text-sm font-medium text-gray-900">{label}</label><br/>
					<input classname="pb-5"type="file" id="file" name="file[]" ref={form} multiple/>
				</div>
				<div className="pt-2">
					<button  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-3 focus:outline-none cursor-pointer">Envoyer</button>
				</div>
			</form>

        </div>
    )
}