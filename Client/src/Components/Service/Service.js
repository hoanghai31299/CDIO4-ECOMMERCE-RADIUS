import React,{useState} from 'react'
import "./Service.css";
import AwesomeSlider from "react-awesome-slider"
import 'react-awesome-slider/dist/styles.css';
export default function Service() {
    return (
        <div className="service-wrapper">
            {/* back-ground */}
            <div className="main-bg-wrap">
                <video className="pc-video" playsinline="" autoPlay muted loop>
                    <source src="https://www.gentlemonster.com/video/service/main_web_0626.mp4"/>
                </video>   
                <div className="text-box">
                    <div className="text-inner">
                        <div className="bg-txt text-center">
                            <h1>Radius-E service at your finger tips, no matter where you are.</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* list service */}
            <div className="scroll-tab-wrap relative">
                <div className="tab-menu">
                    <ul className="list-service">
                        <li><a href="#online"><span>ONLINE PRODUCT SERVICE</span></a></li>
                        <li><a href="#in-store"><span>IN-STORE PRODUCT SERVICE</span></a></li>
                        <li><a href="#product"><span>PRODUCT SERVICE CENTER</span></a></li>
                        <li><a href="#" className="not-scroll"><span>SERVICE LOOKUP</span></a></li>
                        <li><a href="#" className="not-scroll"><span>REPAIR SERVICE GUIDE</span></a></li>
                    </ul>
                </div>
            </div>

            {/* online service */}
            <div id="online" className="service-section">
                <div className="section-title text-center">
                    <h2>ONLINE PRODUCT SERVICE</h2>
                </div>
                <div className="description">
                    <div className="text-content">
                        <p>Our Repair Department offers repair services no matter where you are located. You’ll receive your product back repaired and ready to wear.</p>
                    </div>
                </div>
            </div>
            <a href="#" class="service-btn">Request Repair</a>

            {/* list video online service */}
            <div>
                <AwesomeSlider
                >
                    <li className="swiper-slide each-slide">
                        <video className="pc-video" playsinline="" autoPlay muted loop>
                            <source src="https://www.gentlemonster.com/video/service/func_web_0625_01.mp4"/>
                        </video> 
                    </li>
                    <li className="swiper-slide each-slide swiper-slide-duplicate" data-swiper-slide-index="1">
                        <video className="pc-video" playsinline="" autoPlay muted loop>
                            <source src="https://www.gentlemonster.com/video/service/func_web_2.mp4"/>
                        </video>  
                    </li>
                    <li className="swiper-slide each-slide swiper-slide-duplicate swiper-slide-duplicate-prev" data-swiper-slide-index="2">
                        <video className="pc-video" playsinline="" autoPlay muted loop>
                            <source src="https://www.gentlemonster.com/video/service/func_web_0625_03.mp4"/>
                        </video>    
                    </li>
                  </AwesomeSlider>
              
                <div className="caption-online-list">
                    <p>All completed products will be safely packaged and shipped back to you.</p>
                </div>
            </div>

            {/* in store */}
            <div id="in-store" className="service-section">
                <div className="section-title text-center">
                    <h2>IN-STORE PRODUCT SERVICE</h2>
                </div>
                <div className="description">
                    <div className="text-content">
                        <p>Our global flagship stores offer complimentary adjustments for the utmost experience with our Radius products for your convivence. In the case that in-store adjustments are not available, we will take in your product and ship it back to you.</p>
                    </div>
                </div>
            </div>
            {/* store list */}
            <div className="store-list">
                <div className="feed">
                    <div className="feed_img">
                        <img src="https://eyewearstore.vn/uploads/tiny_uploads/CAM%2006.jpg"></img>
                    </div>
                    <div className="feed_text_wrap">
                        <div className="feed_title">
                            <h3>Da Nang</h3>							
                        </div>
                        <div className="feed_desc">
                            <p>119 Pham Nhu Xuong, Lien Chieu, Da Nang, Viet Nam<br/>+84 123 456 789<br/></p>
                        </div>
                    </div>
                </div>
                <div className="feed">
                    <div className="feed_img">
                        <img src="https://eyewearstore.vn/uploads/tiny_uploads/CAM%2005.jpg"></img>
                    </div>
                    <div className="feed_text_wrap">
                        <div className="feed_title">
                            <h3>France</h3>							
                        </div>
                        <div className="feed_desc">
                            <p>57-61 Boulevard Saint-Germain, 75005 Paris, France<br/>+84 123 456 789<br/></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* product service */}
            <div id="product" className="service-section">
                <div className="section-title text-center">
                    <h2>PRODUCT SERVICE CENTER</h2>
                </div>
                <div className="description">
                    <div className="text-content">
                        <p>Visit the Sinsa Flagship store for a private experience dedicated to you and your product. You’ll receive a thorough analysis along with some tips to best care for your product suited to your lifestyle. All appointments will be personalized to you, guided by a member from our team of devoted experts. Schedule an appointment online to service your product at your convenience.</p>
                    </div>
                </div>
            </div>
            <a href="#" class="service-btn">Make an Appointment</a>
            {/* list product service */}
            <div className="list-product-service">
                <AwesomeSlider
                >
                    <li className="swiper-slide each-slide">
                        <img src="https://img.vn/uploads/thuvien/viber-image-2019-08-06-10-40-38-jpg-20190807145944LO3qbinQdG.jpg"></img>
                    </li>
                    <li className="swiper-slide each-slide swiper-slide-duplicate" data-swiper-slide-index="1">
                        <img src="https://uploads-ssl.webflow.com/5e96913c9bac7c0b5cb3391c/5f44a7398c0cdf460857e744_img-image.jpg"></img>
                    </li>
                    <li className="swiper-slide each-slide swiper-slide-duplicate swiper-slide-duplicate-prev" data-swiper-slide-index="2">
                        <img src="https://img.vn/uploads/thuvien/viber-image-2019-08-06-10-40-38-jpg-20190807145944LO3qbinQdG.jpg"></img>
                    </li>
                  </AwesomeSlider>
            </div>

            {/* service guide */}
            <div className="main-service">
                <table>
                    <tr>
                        <th><img src="https://www.gentlemonster.com/img/service/pc/s3_07_2.jpg"></img></th>
                        <th>
                            <ul>
                                <li>
                                    <h3>SERVICE GUILD</h3>
                                </li>
                                <li>
                                    <span className="subject">ADJUSTMENT SERVICES</span>
                                    <p>Products with minor blemishes due to accidental damages or daily use can be adjusted to fit you comfortably.</p>
                                </li>
                                <li>
                                    <span className="subject">REPLACEMENT SERVICES</span>
                                    <p>Products with severe damages and distortions will be replaced.</p>
                                </li><li>
                                    <span className="subject">RESTORATION SERVICES</span>
                                    <p>Acetate products with scratches and dents can be polished and restored back to its original condition. </p>
                                </li><li>
                                    <span className="subject">CLEANING SERVICES</span>
                                    <p>Deep clean your product to thoroughly clean built-up debris from daily use.</p>
                                </li>
                            </ul>
                        </th>
                    </tr>
                </table>
            </div>

            {/* Visit */}
            <div className="visit">
                <img src="https://www.gentlemonster.com/img/service/pc/3_08_f.jpg"></img>
                <div className="description">
                    <h2>Visit Us</h2>
                    <p className="store-name">Radius Store</p>
                    <p>119 Pham Nhu Xuong, Lien Chieu, Da Nang, Viet Nam</p>
                    <p>Store Hours Monday – Sunday. 12:00pm - 9:00pm</p>
                    <p>Phone +84 123 456 789</p>
                </div>
                <div className="map">
                    <a href="https://www.google.com/maps/place/199+Ph%E1%BA%A1m+Nh%C6%B0+X%C6%B0%C6%A1ng,+Ho%C3%A0+Kh%C3%A1nh+Nam,+Li%C3%AAn+Chi%E1%BB%83u,+%C4%90%C3%A0+N%E1%BA%B5ng+550000,+Vi%E1%BB%87t+Nam/@16.0655342,108.1462606,17z/data=!3m1!4b1!4m5!3m4!1s0x3142192be35c2841:0x6caa9f7687e23a3f!8m2!3d16.0655291!4d108.1484493?hl=vi-VN" target="_blank">
                        View on map            </a>
                </div>
            </div>

        </div>
    )
}