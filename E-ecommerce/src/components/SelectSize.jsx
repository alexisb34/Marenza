import React from 'react';

export default function SelectSize({ current, onSelectSize }) {
	return (
		<div className="hidden sm:flex justify-center mt-4 mb-2 ">
			<select onChange={(e) => onSelectSize(e.target.value)}
				name="size"
				id="size-select"
				className=" text-center fadeIn border w-80 h-10 shadow-md"
			>
				<option value="">-- Pointure --</option>
				{current.map((entry) => (
					<option value={entry.size?.size}>{entry.size?.size}</option>
				))}
			</select>
		</div>
	);
}