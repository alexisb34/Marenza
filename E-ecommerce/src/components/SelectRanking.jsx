import React from 'react';

export default function Filter() {
  const [ranking, setRanking] = React.useState('');

  const handleChangeRanking = (event) => {
    setRanking(event.target.value);
  };

  return (
		<div className="md:flex md:w-4/5 m-auto md:justify-end fadeIn text-center block justify-center mt-4 mb-2 ">
			<label className="py-3">TRIER PAR: </label><br/>
			<select onChange={handleChangeRanking}
				name="ranking"
				value={ranking}
				id="ranking-select" 
				className="text-center font-medium sm:mx-2 mb-2 mt-2 border w-80 h-10 shadow-md"
			>
				<option value="">-- Sélection--</option>
				<option value="lower">du - cher au + cher</option>
				<option value="higher">du + cher au - cher</option>
				<option value="newest">Nouveautés</option>
				<option value="popular">Populaire</option>
				
			</select>
		</div>
 	);
}