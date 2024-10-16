import React from 'react';

export default function SelectSizePhone() {
  const [size, setSize] = React.useState('');

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  return (
		<div className="sm:hidden flex justify-center mt-4 mb-2 ">
			<select onChange={handleChange}
				name="size"
				value={size}
				id="size-select" 
				className=" text-center fadeIn border w-80 h-10 shadow-md"
			>
				<option value="">-- Pointure --</option>
				<option value={40}>40</option>
				<option value={41}>41</option>
				<option value={42}>42</option>
				<option value={43}>43</option>
			</select>
		</div>
 	);
}