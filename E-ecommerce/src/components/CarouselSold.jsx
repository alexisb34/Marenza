import React, { Component } from "react";
import Slider from "react-slick";
import converse1 from "../assets/images/converse1.jpg"
import SoldcardPhone from "./SoldcardPhone";

export default class MultipleItems extends Component {
  render() {
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
    };
    return (
      
		<div className="pb-16">
      		<div className='border-t-[1px] border-orange-600 mt-20 flex justify-center pb-20'>
        	<h1 className='flex justify-center font mt-10 font-Impact text-6xl'>SOLDES</h1>
      	</div>
		<div className="w-11/12 m-auto">
			<Slider {...settings} className="mb-6 fadeIn">

				<SoldcardPhone />
				<SoldcardPhone />
				<SoldcardPhone />
				<SoldcardPhone />
				<SoldcardPhone />
				<SoldcardPhone />
				<SoldcardPhone />
				<SoldcardPhone />
				<SoldcardPhone />
				
			</Slider>
		</div>
      </div>
    );
  }
}