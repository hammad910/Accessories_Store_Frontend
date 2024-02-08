import React from "react";
import 'react-slideshow-image/dist/styles.css'
import { Fade, Zoom, Slide } from 'react-slideshow-image'
import "./Banner.scss";
import BannerImg4 from "../../../assets/banner-img-4.webp";
import BannerImg5 from "../../../assets/banner-img-5.webp";
import BannerImg6 from "../../../assets/banner-img-6.webp";
import BannerImg7 from "../../../assets/banner-img-7.webp";

const slideImages = [
    {
        img: BannerImg4
    },
    {
        img: BannerImg5
    },
    {
        img: BannerImg6
    },
    {
        img: BannerImg7
    },
]
const Banner = () => {
    return (
        <div className="hero-banner" >
            <Slide duration={3000} pauseOnHover={false}>
                {slideImages.map((item, index) => (
                    <div key={index}>
                        <img src={item.img} style={{ width: '100%' }} />
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default Banner;
{/* <img src={item.url} width={'100%'}  /> */ }
{/* <div className="content">
                <div className="text-content">
                    <h1>SALES</h1>
                    <p>
                        Convallis interdum purus adipiscing dis parturient
                        posuere ac a quam a eleifend montes parturient posuere
                        curae tempor
                    </p>
                    <div className="ctas">
                        <div className="banner-cta">Read More</div>
                        <div className="banner-cta v2">Shop Now</div>
                    </div>
                </div>
            </div> */}