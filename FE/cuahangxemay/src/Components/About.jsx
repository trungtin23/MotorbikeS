import React from "react";
import messages from "./Helpers/Messages.jsx";
const About = () => {
    return (
            <div className="container-fluid">
                <div className="container">
                    <h1 className="display-1 text-primary text-center">01</h1>
                    <h1 className="display-4 text-uppercase text-center mb-5">Chào mừng <span
                        className="text-primary">T-Motoshop</span></h1>
                    <div className="row justify-content-center">
                        <div className="col-lg-10 text-center">
                            <img className="w-75 mb-4" src="/assets/user/Image/Honda/xeSo/header_honda_CBR.jpg" alt=""/>
                            <p>Nội dung giới thiệu cửa hàng...</p>
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
                <div className="container py-5">
                    <div className="row mx-0">
                        <div className="col-lg-6 px-2">
                            <div
                                className="px-9 bg-secondary d-flex align-items-center justify-content-between">
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
                                className="px-9 bg-dark d-flex align-items-center justify-content-between">
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
            </div>
    )
}
export default About;