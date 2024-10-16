import React, { useEffect, useRef, useState } from 'react';
import { Dropdown } from './Dropdown';

export default function Filter({ onFilter }) {
	const [filter, setFilter] = useState([]);

	const fill = (change) => {


		setFilter(state => {
			if (state.map(x => x.name).includes(change.name)) {
				let res = state.filter(x => x.name !== change.name);
				return [...res, change];
			}
			return [...state, change];
		})
	}

	useEffect(() => onFilter(filter), [filter])

	return (
		<div className="sm:inline-block w-full text-center flex  flex-col justify-center mt-4 mb-2 ">
			<Dropdown label="Marque" name="brands" field="brand_name" filter="brand" change={fill} />
			<Dropdown label="Categorie" name="genres" field="name" filter="genre" change={fill} />


			{/* <select onChange={handleChangeCategory}
				name="category"
				value={category}
				id="category-select" 
				className=" text-center sm:mx-2 mb-2 mt-2 fadeIn border w-80 h-10 shadow-md"
			>
				<option value="">-- Categorie --</option>
				<option value="HOMME">Homme</option>
				<option value="FEMME">Femme</option>
				<option value="ENFANT">Enfant</option>
				
				
			</select>
			
			<select onChange={handleChangeType}
				name="type"
				value={type}
				id="type-select" 
				className=" text-center sm:mx-2 mb-2 mt-2 fadeIn border w-80 h-10 shadow-md"
			>
				<option value="">-- Type --</option>
				<option value="SPORT">Sport</option>
				<option value="SNEAKER">Sneakers</option>
				<option value="VILLE">Ville</option>
				<option value="ETE">Eté</option>
				
			</select>

			<select onChange={handleChangeColor}
				name="color"
				value={color}
				id="color-select" 
				className=" text-center sm:mx-2 mb-2 mt-2 fadeIn border w-80 h-10 shadow-md"
			>
				<option value="">-- Couleurs --</option>
				<option value="noir">noir</option>
				<option value="bleu">bleu</option>
				<option value="rouge">rouge</option>
				<option value="vert">vert</option>
				<option value="jaune">jaune</option>
				<option value="rose">rose</option>
				<option value="blanc">blanc</option>
				
			</select>

			<select onChange={handleChangeSize}
				name="size"
				value={size}
				id="size-select" 
				className=" text-center sm:mx-2 mb-2 mt-2 fadeIn border w-80 h-10 shadow-md"
			>
				<option value="">-- Pointure --</option>
				<option value="20">20</option>
				<option value="21">21</option>
				<option value="22">22</option>
				<option value="23">23</option>
				<option value="24">24</option>
				<option value="25">25</option>
				<option value="26">26</option>
				<option value="27">27</option>
				<option value="28">28</option>
				<option value="29">29</option>
				<option value="30">30</option>
				<option value="31">31</option>
				<option value="32">32</option>
				<option value="33">33</option>
				<option value="34">34</option>
				<option value="35">35</option>
				<option value="36">36</option>
				<option value="37">37</option>
				<option value="38">38</option>
				<option value="39">39</option>
				<option value="40">40</option>
				<option value="41">41</option>
				<option value="42">42</option>
				<option value="43">43</option>
				<option value="44">44</option>
				<option value="45">45</option>
				
				
			</select>
			<br/>
			<button className="bg-gray-200 text-gray-400 h-9 cursor-pointer shadow-md transition duration-700 ease-in-out hover:text-orange-600 fadeIn px-3 mt-2">Effacer vos filtres</button>

		 */}
		</div>
	);
}