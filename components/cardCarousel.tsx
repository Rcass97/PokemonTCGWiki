'use client'
import Link from 'next/link';
import { motion } from "framer-motion";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function CardCarousel(params: { data: any }) {


    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        pauseOnHover: true,
        autoplaySpeed: 2500,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    infinite: true,
                    dots: false,
                    autoplay: true,
                    pauseOnHover: true,
                    autoplaySpeed: 2500,
                    cssEase: "linear",
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    infinite: true,
                    dots: false,
                    autoplay: true,
                    pauseOnHover: true,
                    autoplaySpeed: 2500,
                    cssEase: "linear",
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 0,
                    infinite: true,
                    dots: false,
                    autoplay: true,
                    pauseOnHover: true,
                    autoplaySpeed: 2500,
                    cssEase: "linear",
                }
            }
        ]
    };

    return (
        <div>
            <div className="flex justify-center mx-10">
                <Slider ef={slider => (this.slider = slider)}{...settings} className='w-full'>
                    {params.data.map((data: any, index: number) => (
                        <div key={index}>
                            <Link href={'/card/' + data.id}>
                                <motion.div className='flex sm:p-5 p-5'
                                    transition={{ duration: 0.2 }}
                                    whileHover={{ scale: 1.07 }}
                                    whileTap={{ scale: 1.1 }}>
                                    <img src={data.images.large} className='w-full rounded-xl shadow-xl hover:shadow-2xl' />
                                </motion.div>
                            </Link>
                            <div className='flex flex-col'>
                                <p className='text-lg font-bold text-center'>{data.name}</p>
                                <div className='flex items-center justify-center'>
                                    <p className='sm:text-base text-sm text-center'>{data.rarity} - {data.number + '/' + data.set.total}</p>
                                </div>
                                <p className='sm:text-base text-[13px] text-center flex justify-center'>{data.set.series} - {data.set.name}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

        </div>
    );
}
