import React from "react";
import {Link} from "react-router-dom";
import messages from "./Helpers/Messages.jsx";

const Home = () => {
    return (
        <div>
            {/* Carousel Start */}
            <div className="container-fluid ">
                <div id="header-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="w-100" src="/assets/user/Image/Honda/tayga/header_honda_SHmode.jpg" alt="Image" />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-end">
                                <div className="p-3" style={{ maxWidth: 900 }}>
                                    <a href="/motobike" className="btn btn-primary py-md-3 px-md-5 mt-2">Mua ngay</a>
                                </div>
                            </div>
                        </div>
                        {/* Add more carousel-item blocks as needed */}
                    </div>
                </div>
            </div>

            {/*About Start */}
            <div className="container-fluid py-1">
                <div className="container ">
                    <h1 className=" display-1 text-primary text-center">01</h1>
                    <h1 className="display-4 text-uppercase text-center mb-5">Chào mừng <span
                        className="text-primary">T-Motoshop</span></h1>
                    <div className="row justify-content-center">
                        <div className="col-lg-10 text-center">
                            <img className="w-75 mb-4" src="/assets/user/Image/Honda/xeSo/header_honda_CBR.jpg" alt=""/>
                            <p>T-Motoshop – Điểm đến tin cậy cho mọi tín đồ xe máy!</p> <br/>
                               <p> Chuyên cung cấp các dòng xe máy chất lượng, phụ tùng chính hãng và dịch vụ sửa chữa uy tín. Với đội ngũ kỹ thuật viên lành nghề,
                                T-Motoshop cam kết mang đến cho bạn trải nghiệm tốt nhất, từ mua xe đến bảo dưỡng.
                                Hãy đến T-Motoshop để chọn cho mình chiếc xe ưng ý và đồng hành cùng bạn trên mọi nẻo đường!</p>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-4 mb-2">
                            <div className="d-flex align-items-center bg-light p-4 mb-4" style={{height: 150}}>
                                <div
                                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                                    style={{width: 100, height: 100}}>
                                    <i className="fa fa-2x fa-headset text-secondary"></i>
                                </div>
                                <h4 className="text-uppercase m-0">{messages.ho_tro}</h4>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-2">
                            <div className="d-flex align-items-center bg-secondary p-4 mb-4" style={{height: 150}}>
                                <div
                                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                                    style={{width: 100, height: 100}}>
                                    <i className="fa fa-2x fa-car text-secondary"></i>
                                </div>
                                <h4 className="text-light text-uppercase m-0">{messages.xem_xe}</h4>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-2">
                            <div className="d-flex align-items-center bg-light p-4 mb-4" style={{height: 150}}>
                                <div
                                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                                    style={{width: 100, height: 100}}>
                                    <i className="fa fa-2x fa-map-marker-alt text-secondary"></i>
                                </div>
                                <h4 className="text-uppercase m-0">{messages.chi_nhanh}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*About End */}

             {/*Services Start */}
                        <div className="container-fluid">
                            <div className="container">
                                <h1 className=" display-1 text-primary text-center">02</h1>
                                <h1 className="display-4 text-uppercase text-center mb-5">{messages["dich_vu"]}</h1>
                                <div className="row">
                                    {[
                                        {
                                            id: "01",
                                            icon: ["fa-cycle", "fa-cogs"],
                                            title: "phu_kien",
                                            content: "content_phukien"
                                        },
                                        {
                                            id: "02",
                                            icon: ["fa-money-check-alt"],
                                            title: "bao_hiem",
                                            content: "content_baohiem",
                                            active: true
                                        },
                                        {
                                            id: "03",
                                            icon: ["fa-motorcycle"],
                                            title: "kiem_tra_dinh_ki",
                                            content: "content_kiemtradinhki"
                                        },
                                        {
                                            id: "04",
                                            icon: ["fa-screwdriver-wrench"],
                                            title: "sua_chua_nang_cap",
                                            content: "content_suachuanangcap"
                                        },
                                        {id: "05", icon: ["fa-spray-can"], title: "bao_hanh", content: "content_baohanh"},
                                        {id: "06", icon: ["fa-pump-soap"], title: "rua_xe", content: "content_ruaxe"},
                                    ].map((service) => (
                                        <div key={service.id} className="col-lg-4 col-md-6 mb-2">
                                            <div
                                                className={`service-item d-flex flex-column justify-content-center px-4 mb-4 ${service.active ? "active" : ""}`}>
                                                <div className="d-flex align-items-center justify-content-between mb-3">
                                                    <div
                                                        className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                                                        style={{width: "80px", height: "80px"}}
                                                    >
                                                        {service.icon.map((icon, index) => (
                                                            <i key={index}
                                                               className={`fa fa-2x ${icon} text-secondary`}></i>
                                                        ))}
                                                    </div>
                                                    <h1 className="display-2 text-white mt-n2 m-0">{service.id}</h1>
                                                </div>
                                                <h4 className="text-uppercase mb-3">{messages[service.title]}</h4>
                                                <p className="m-0">{messages[service.content]}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
             {/*Services End */}

           {/*Banner Start */}
                    <div className="container-fluid py-1">
                        <div className="container py-5">
                            <div className="bg-banner py-5 px-4 text-center">
                                <div className="py-5">
                                    <h1 className="display-1 text-uppercase text-primary mb-4">{messages["giam"]}</h1>
                                    <h1 className="text-uppercase text-light mb-4">{messages["uu_dai"]}</h1>
                                    <p className="mb-4">{messages["content_uudai"]}</p>
                                    <Link className="btn btn-primary mt-2 py-3 px-5" to="/motobike">
                                        {messages["mua_ngay"]}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
             {/*Banner End */}


             {/*Rent A Car Start */}
                    <div className="container-fluid py-1">
                        <div className="container">
                            <h1 className="display-1 text-primary text-center">03</h1>
                            <h1 className="display-4 text-uppercase text-center mb-5">{messages["xe_moi_nhat"]}</h1>
                            <div className="row">
                                {/*{products.slice(-6).reverse().map((p) => (*/}
                                {/*    <div key={p.id} className="col-lg-4 col-md-6 mb-2">*/}
                                {/*        <div className="rent-item mb-4 text-center">*/}
                                {/*            <img*/}
                                {/*                className="img-fluid mb-4"*/}
                                {/*                style={{width: "230px", height: "170px"}}*/}
                                {/*                src={`${contextPath}/assets/user/Image/${p.avatar}`}*/}
                                {/*                alt=""*/}
                                {/*            />*/}
                                {/*            <h4 className="text-uppercase mb-4">{p.name}</h4>*/}
                                {/*            <div className="d-flex justify-content-center mb-4">*/}
                                {/*                <div className="px-6">*/}
                                {/*                    <i className="fa fa-road text-primary mr-1"></i>*/}
                                {/*                    <span>{new Intl.NumberFormat("vi-VN", {*/}
                                {/*                        style: "currency",*/}
                                {/*                        currency: "VND"*/}
                                {/*                    }).format(p.price)}</span>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*            <a className="btn btn-primary px-3"*/}
                                {/*               href={`${contextPath}/details?id=${p.id}`}>Xem Chi Tiết</a>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*))}*/}
                            </div>
                        </div>
                    </div>
             {/*Rent A Car End*/}

            {/*Team start */}
                            <div className="container-fluid py-0">
                                <div className="container py-1">
                                    <h1 className="display-1 text-primary text-center">04</h1>
                                    <h1 className="display-4 text-uppercase text-center mb-5">{messages["dieu_gi_cho_doi"]}</h1>
                                    <div className="owl-carousel team-carousel position-relative"
                                         style={{padding: "0 30px"}}>
                                        {/*{bikes.map((bike, index) => (*/}
                                        {/*    <div key={index} className="team-item">*/}
                                        {/*        <img*/}
                                        {/*            className="img-fluid w-100"*/}
                                        {/*            src={`${contextPath}/assets/user/Image/Honda/tayga/${bike.image}`}*/}
                                        {/*            alt=""*/}
                                        {/*        />*/}
                                        {/*        <div className="position-relative py-4 text-center">*/}
                                        {/*            <h4>{bike.name}</h4>*/}
                                        {/*            <p className="m-0">Sắp ra mắt...</p>*/}
                                        {/*            <div*/}
                                        {/*                className="team-social position-absolute w-100 h-100 d-flex align-items-center justify-content-center">*/}
                                        {/*                <a className="btn btn-lg btn-primary btn-lg-square mx-1"*/}
                                        {/*                   href="#">*/}
                                        {/*                    <i className="fab fa-twitter"></i>*/}
                                        {/*                </a>*/}
                                        {/*                <a className="btn btn-lg btn-primary btn-lg-square mx-1"*/}
                                        {/*                   href="#">*/}
                                        {/*                    <i className="fab fa-facebook-f"></i>*/}
                                        {/*                </a>*/}
                                        {/*                <a className="btn btn-lg btn-primary btn-lg-square mx-1"*/}
                                        {/*                   href="#">*/}
                                        {/*                    <i className="fab fa-linkedin-in"></i>*/}
                                        {/*                </a>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*))}*/}
                                    </div>
                                </div>
                            </div>
             {/*Team End */}

             {/*Banner Start */}
                            <div className="container-fluid py-1">
                                <div className="container py-5">
                                    <div className="row mx-0">
                                        <div className="col-lg-6 px-2">
                                            <div
                                                className="px-7 py-3 bg-secondary d-flex align-items-center justify-content-between">
                                                <img
                                                    className="img-fluid flex-shrink-10 ml-n5 w-50 h-60 mr-2"
                                                    // src={`${contextPath}/assets/user/Image/Honda/xeSo/Win_trang.png`}
                                                    alt=""
                                                />
                                                <div className="text-right">
                                                    <h3 className="text-uppercase text-light mb-3 mr-3">{messages["ban_co_muon"]}</h3>
                                                    <p className="mb-4 mr-3">{messages["content_bancomuon"]}</p>
                                                    <a className="btn btn-primary py-2 px-4 mr-3" href="">
                                                        {messages["tham_gia_ngay"]}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 px-2">
                                            <div
                                                className="px-7 py-3 bg-dark d-flex align-items-center justify-content-between">
                                                <div className="text-left">
                                                    <h3 className="text-uppercase text-light mb-3 ml-3">{messages["lai_thu"]}</h3>
                                                    <p className="mb-4 ml-3">{messages["content_bancomuon"]}</p>
                                                    <a className="btn btn-primary py-2 px-4 ml-3" href="">
                                                        {messages["tham_gia_ngay"]}
                                                    </a>
                                                </div>
                                                <img
                                                    className="img-fluid flex-shrink-0 mr-n5 w-50 h-60 ml-2"
                                                    // src={`${contextPath}/assets/user/Image/Honda/tayga/Sh160_special.png`}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
            {/*Banner End*/}

            {/*Testimonial Start */}
                            <div className="container-fluid py-1">
                                <div className="container">
                                    <h1 className="display-1 text-primary text-center">05</h1>
                                    <h1 className="display-4 text-uppercase text-center mb-5">
                                        {messages.thuong_hieu}
                                    </h1>
                                    <div className="owl-carousel testimonial-carousel">
                                        <div
                                            className="testimonial-item d-flex flex-column justify-content-center px-4">
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <img
                                                    className="img-fluid ml-n6"
                                                    // src={`${contextPath}/assets/user/Image/Honda/Honda_Logo.svg.png`}
                                                    alt=""
                                                />
                                                <h1 className="display-2 text-white m-0 fa fa-quote-right"></h1>
                                            </div>
                                            <h4 className="text-uppercase mb-2">Honda</h4>
                                            <i className="mb-2">{messages.brand_honda}</i>
                                            <p className="m-0">{messages.content_honda}</p>
                                        </div>
                                        <div
                                            className="testimonial-item d-flex flex-column justify-content-center px-4">
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <img
                                                    className="img-fluid ml-n6"
                                                    // src={`${contextPath}/assets/user/Image/Honda/yamaha.png`}
                                                    alt=""
                                                />
                                                <h1 className="display-2 text-white m-0 fa fa-quote-right"></h1>
                                            </div>
                                            <h4 className="text-uppercase mb-2">Yamaha</h4>
                                            <i className="mb-2">{messages.brand_yamaha}</i>
                                            <p className="m-0">{messages.content_yamaha}</p>
                                        </div>
                                        <div
                                            className="testimonial-item d-flex flex-column justify-content-center px-4">
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <img
                                                    className="img-fluid ml-n6"
                                                    // src={`${contextPath}/assets/user/Image/Vinfast/logo-vinfast-1.png`}
                                                    alt=""
                                                />
                                                <h1 className="display-2 text-white m-0 fa fa-quote-right"></h1>
                                            </div>
                                            <h4 className="text-uppercase mb-2">Vinfast</h4>
                                            <i className="mb-2">{messages.brand_vinfast}</i>
                                            <p className="m-0">{messages.content_vinfast}</p>
                                        </div>
                                        <div
                                            className="testimonial-item d-flex flex-column justify-content-center px-4">
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <img
                                                    className="img-fluid ml-n6"
                                                    // src={`${contextPath}/assets/user/Image/Piaggio(Vespa)/logo-Piaggio.png`}
                                                    alt=""
                                                />
                                                <h1 className="display-2 text-white m-0 fa fa-quote-right"></h1>
                                            </div>
                                            <h4 className="text-uppercase mb-2">Piaggio</h4>
                                            <i className="mb-2">{messages.brand_piago}</i>
                                            <p className="m-0">{messages.content_piago}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
            {/*Testimonial End*/}

         {/*Vender Start*/}
                            <div className="container-fluid py-5">
                                <div className="container py-5">
                                    <div className="owl-carousel vendor-carousel">
                                        <div className="bg-light p-4">
                                            <img
                                                src="/assets/user/Image/Honda/logo-vinfast.png"
                                                alt="Vinfast"
                                            />
                                        </div>
                                        <div className="bg-light p-4">
                                            <img src="/assets/user/Image/Honda/suzuki.png" alt="Suzuki"/>
                                        </div>
                                        <div className="bg-light p-4">
                                            <img
                                                src="/assets/user/Image/Honda/logo_ducati.png"
                                                alt="Ducati"
                                            />
                                        </div>
                                        <div className="bg-light p-4">
                                            <img src="/assets/user/Image/Honda/yamaha.png" alt="Yamaha"/>
                                        </div>
                                        <div className="bg-light p-4">
                                            <img src="/assets/user/Image/Honda/piago.png" alt="Piaggio"/>
                                        </div>
                                        <div className="bg-light p-4">
                                            <img
                                                style={{width: '114px', height: '114px'}}
                                                src="/assets/user/Image/Honda/logohonda2.png"
                                                alt="Honda"
                                            />
                                        </div>
                                        <div className="bg-light p-4">
                                            <img
                                                src="/assets/user/img/vendor-7.png"
                                                alt="Vendor 7"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
             {/*Vender End */}
                            <div className="containers">
                                <div className="menu-toggle">
                                    <img
                                        src="/assets/user/Image/mess.png"
                                        alt="Menu Toggle"
                                    />
                                </div>
                                <div className="menu-line">
                                    <div className="btn-app">
                                        <a href="https://bit.ly/3lGliU5">
                                            <img
                                                src="/assets/user/Image/zalo-sharecs.png"
                                                className="iconf"
                                                alt="Zalo"
                                            />
                                            <span className="tooltip">Lên hệ Zalo</span>
                                        </a>
                                    </div>
                                    <div className="btn-app">
                                        <a href="https://www.facebook.com/phanthethinh.official26/">
                                            <img
                                                src="/assets/user/Image/fanpage-facebook-sharecs.png"
                                                className="iconf"
                                                alt="Facebook"
                                            />
                                            <span className="tooltip">Lên hệ Facebook</span>
                                        </a>
                                    </div>
                                    <div className="btn-app">
                                        <a href="https://maps.app.goo.gl/grxTQXjVAMgBRy2w9">
                                            <img
                                                src="/assets/user/Image/icon-map-sharecs.png"
                                                className="iconf"
                                                alt="Location"
                                            />
                                            <span className="tooltip">Xem địa chỉ văn phòng</span>
                                        </a>
                                    </div>
                                    <div className="btn-app">
                                        <a href="mailto:21130548@st.hcmuaf.edu.vn">
                                            <img
                                                src="/assets/user/Image/icon-mail-sharecs.png"
                                                className="iconf"
                                                alt="Email"
                                            />
                                            <span className="tooltip">Email hỗ trợ</span>
                                        </a>
                                    </div>
                                    <div className="btn-app">
                                        <a href="tel:0326767031">
                                            <img
                                                src="/assets/user/Image/icon-phone-sharecs.png"
                                                className="iconf"
                                                alt="Hotline"
                                            />
                                            <span className="tooltip">Hotline</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
        </div>
    );
};

export default Home;
