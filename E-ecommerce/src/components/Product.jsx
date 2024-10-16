
import React, { useEffect, useState } from 'react';
import AddBasketPhone from './AddBasketPhone';
import SelectSizePhone from './SelectSizePhone';
import SelectSize from './SelectSize';
import AddBasket from './AddBasket';
import GenderMenu from './GenderMenu';
import { getProduct } from '../provider/query';
import { putCountProduct } from '../provider/query';
import CarouselProduct from "./CarouselProduct";
import { useParams } from "react-router-dom";
import useBasketStore from '../store/basket';

export default function Product() {


	let { id } = useParams();
	const [product, setProduct] = useState(false);
	const [stocks, setStock] = useState(false);
	const [current, setCurrent] = useState([]);
	const [count, setCount] = useState(1);

	const [key, setKey] = useState();

	const addItems = useBasketStore(state => state.addItems);

	const [size, setSize] = useState(false);



	useEffect(() => {
		getProduct(id).then(product => {
			console.log(id);
			let counter = product.counter;
			if (counter == null) {
				counter = 0;
			}
			counter++;
			putCountProduct(id, counter).then(setProduct => {
				console.log(counter);
			})

			getProduct(id).then(setProduct)

			setStock(product.stocks.reduce(function (r, a) {
				r[a.color.colorName] = r[a.color.colorName] || [];
				r[a.color.colorName].push(a)
				return r;
			}, Object.create(null)));

		})

	}, [])


	function changeSize(value) {
		let max = current.filter((stock) => {
			return stock.size.size == value;
		})

		setSize(value);
	}

	function getStock() {
		let res = [];
		for (const stock in stocks) {
			res.push(<>
				<p className={`pl-2 pr-2 h-full flex p-1 aspect-square items-center justify-center cursor-pointer hover:border-2 hover:border-black ${current == stocks[stock] ? 'border-black' : ''} border-2 box-border  `} onClick={() => setCurrent(stocks[stock])}>{stock}</p>
			</>)
		}
		return res;

	}


	function addToBasket() {
		let max = current.filter((stock) => {
			return stock.size.size == size;
		});
		let key = (Math.random() + 1).toString(36).substring(7);
		addItems({
			count,
			product: {
				key, ...max[0], ...product.brand, id: product.id, name: product.name, clearance_price: product.clearance_price ?? false, price: product.price
			},
		})
	}
	return (
		<>

			{product &&
				<>
					<GenderMenu />
					<div className="justify-center text-center">
						<div className="block sm:flex justify-center">

							<div className="relative w-80 m-auto pr-5 sm:m-0 sm:mr-6">
								<CarouselProduct product={product} />
							</div>

							{product && <div>
								<div id="description" className="justify-between fadeIn m-auto flex w-80">
									<h3 className="text-left fadeIn font-Impact tracking-wide text-lg">  {product.brand.brand_name} - {product.name} </h3>
								</div>
								<p id="color" className="text-sm fadeIn text-left w-80 flex m-auto text-gray-400">Couleur: Rouge Bordeau Noir</p>
								<p id="color" className="text-sm fadeIn text-left w-80 flex m-auto text-gray-400">Description:<br />{product.description}</p>
								<br className="hidden sm:block" />
								{
									!product.clearance ?
										<p className="hidden fadeIn sm:flex text-lg">{product.price}€</p>
										:
										<p className='hidden fadeIn sm:flex text-lg'><strike>{product.price}</strike>€ <span className='ml-5 text-[#EB001B]'>{product.price - (product.price * product.clearance) / 100}€</span></p>
								}
								<br />
								<p className={`${!size ? 'invisible' : ''} flex pb-3  fadeIn mb-1 text-green-500 font-bold`}>En stock: {size && current.filter(stock => stock.size.size == size)[0].quantity}</p>
								<div className="flex mb-2 ml-9 fadeIn m-auto sm:m-0 ">

									<div className="grid grid-flow-col gap-4">{getStock()}</div>
								</div>
								<input type="number" name="count" value={count} onChange={({ target }) => target.value > 0 ? setCount(target.value) : null} className='ml-9 sm:ml-0 w-14 px-1 py-2 block focus:outline-none bg-white border border-grey-300 mt-4 rounded-sm shadow-md' id="" />
								<SelectSize current={current} onSelectSize={changeSize} />
								<AddBasket curr={size} onClick={addToBasket} />
							</div>}
						</div>
						<SelectSizePhone />
						<AddBasketPhone />
					</div>
					<SelectSizePhone />
					<AddBasketPhone />


				</>
			}
		</>

	);

}