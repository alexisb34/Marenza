import React, { Component } from "react";
import Slider from "react-slick";
// import { useParams } from "react-router-dom";

export default function CarouselProduct({product}){

	let path = "http://localhost:3001/photos/";

	function SampleNextArrow(props) {
		const { className, style, onClick } = props;
		return (
		  <div
		  	className={className}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		  />
		);
	  }
	  
	  function SamplePrevArrow(props) {
		const { className, style, onClick } = props;
		return (
		  <div
			className={className}
			style={{ ...style, display: "block" }}
			onClick={onClick}
		  />
		);
	  }

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
	  swipeToSlide: true,
	  nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return(

      <div>
        <Slider {...settings}>
		{
			product.photos.map(photo =>(
				<div key={photo.path}>
					<img src={path + photo.path} alt="" />
				</div>
			))	
		}
        </Slider>
      </div>
    );
}
