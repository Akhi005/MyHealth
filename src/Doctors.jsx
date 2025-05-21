import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '/src/styles/swiper.css'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
const Doctors = () => {
    return (
        <div className='doctors-section'>
            <h1 className='text-center text-4xl font-bold italic'>Meet the Doctors</h1>
           <div className='w-full flex justify-center'><img className=' px-[120px] mt-[-54px]' src="https://i.ibb.co/pXmPwR8/underline.png" /></div> 
            <Swiper  effect={'coverflow'} grabCursor={true} centeredSlides={true} loop={true} slidesPerView={'auto'} coverflowEffect={{
                    rotate: 0, stretch: 0, depth: 100, modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className='swiper-container '>
                <div className='flex w-full'>
                    <SwiperSlide className='rounded'>
                        <div className="card w-[300px] bg-blue-800">
                            <img src="https://i.ibb.co/9nfPfr5/doctor-1.jpg" />
                            <div className="card-body text-white">
                                <h5 className="card-title">Dr. Farjana Sharmin Mitul</h5>
                                <p className="card-text text-[13px]">MBBS
                                    BCS (Health)
                                    FCPS (Gynae & Obs)
                                    Gynecologist & Obstetrician</p>
                                <a href="#" className="btn bg-yellow-400 my-2">Details</a>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide> <div className="card w-[300px] bg-blue-800">
                        <img src="https://i.ibb.co/dJ2Y2ZS/doctor-2.jpg"/>
                        <div className="card-body text-white ">
                            <h5 className="card-title">Asst. Prof. Dr. Runa Akter Dola</h5>
                            <p className="card-text text-[13px]">MBBS
                                BCS (Health)
                                FCPS (OBGYN)
                                Gynecologist & Obstetrician</p>
                            <a href="#" className="btn bg-yellow-400 my-2">Details</a>
                        </div>
                    </div></SwiperSlide>
                    <SwiperSlide> <div className="card w-[300px] bg-blue-800">
                        <img src="https://i.ibb.co/wzTz2bX/doctor-3.jpg"  />
                        <div className="card-body text-white">
                            <h5 className="card-title">DR. MAHMUD CHOWDHURY</h5>
                            <p className="card-text text-[13px]">MBBS, DDV, MCPS, FCPS
                                Consultant & Coordinator, Dept. of Dermatology, BSHL. Allergy Skin-VD, Sexual Medicine Specialist & Laser Dermatosurgeon</p>

                            <a href="#" className="btn bg-yellow-400 my-2">Details</a>
                        </div>
                    </div></SwiperSlide>
                    <SwiperSlide> <div className="card w-[300px] bg-blue-800">
                        <img src="https://i.ibb.co/DzNQHPg/doctor-4.jpg"/>
                        <div className="card-body text-white">
                            <h5 className="card-title">Prof. Dr. Rashida Akhter</h5>
                            <p className="card-text text-[13px]">MBBS, FCPS (Gynae & Obs)Gynae and Obs. Specialist and Surgeon</p>
                            <a href="#" className="btn bg-yellow-400 my-2">Details</a>
                        </div>
                    </div></SwiperSlide>
                    <SwiperSlide> <div className="card w-[300px] bg-blue-800">
                        <img src="https://i.ibb.co/kG7hhVD/doctor-5.jpg" />
                        <div className="card-body text-white">
                            <h5 className="card-title">Prof. Dr. Md. Nazrul Islam</h5>
                            <p className="card-text text-[13px]">MBBS, MCPS (Medicine),
                                MD(Neurology)Neuro Medicine Specialist</p>
                            <a href="#" className="btn bg-yellow-400 my-2">Details</a>
                        </div>
                    </div></SwiperSlide>
                    <SwiperSlide> <div className="card w-[300px] bg-blue-800">
                        <img src="https://i.ibb.co/dJ2Y2ZS/doctor-2.jpg" />
                        <div className="card-body text-white">
                            <h5 className="card-title">Prof. Dr. Muna Shalima Jahan</h5>
                            <p className="card-text text-[13px]">MBBS
                                BCS (Health)
                                FCPS (OBGYN)
                                MS (OBGYN)
                                Gynecologist & Obstetrician</p>
                            <a href="#" className="btn bg-yellow-400 my-2">Details</a>
                        </div>
                    </div></SwiperSlide>
                </div>

            </Swiper>
        </div>
    );
};
export default Doctors;