import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import converse1 from "../assets/images/converse1.jpg"
import CardPhone from "./CardPhone";
import SoldcardPhone from "./SoldcardPhone";
export default function MultipleItems({ products }) {

	const settings = {
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		dots: true,
		autoplaySpeed: 3000,
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: 1250,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 760,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 2
				}
			},
			{
				breakpoint: 515,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					swipeToSlide: true,
					centerMode: true
				}
			}
		]
	}


	return (
		<div className="w-11/12 m-auto">
			<Slider {...settings} className="mb-6 fadeIn">
				{products.map((card, index) => (
					<div>
						{card.clearance > 0 ? <SoldcardPhone {...card} key={index} />
							: < CardPhone {...card} key={index} />}

					</div>
				))}
			</Slider>
		</div>
	);

}