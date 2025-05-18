
import React from "react";
export default function Cart(){
    return (
        <div className="container">
            <h2><i className="fas fa-cart-shopping mr-3"></i>{t("theo_doi_quan_tam")}</h2>
            <p>{t("them_san_pham_vao_gio_hang")}</p>
            {cartItems.map((item, i) => (
                <div className="row rent-item m-2" key={i}>
                    <div className="col-lg-4">
                        <img
                            src={`/assets/user/Image/${item.productcolor.photo}`}
                            alt=""
                            className="img-fluid w-50"
                        />
                        <h4 className="text-uppercase">
                            {item.productName} {item.versionName} - Màu {item.productcolor.color}
                        </h4>
                    </div>
                    <div className="col-lg-3">
                        <p>{t("so_luong")}: {item.quantity}</p>
                        <p>{t("don_gia")}: {item.productcolor.price.toLocaleString()} VNĐ</p>
                    </div>
                    <div className="col-lg-3">
                        <p>{t("tong_cong")}: {(item.productcolor.price * item.quantity).toLocaleString()} VNĐ</p>
                        <button onClick={() => handleOpenPreview(i)} className="btn btn-primary">
                            Xem Ngay
                        </button>
                    </div>
                    <div className="col-lg-2">
                        <button className="btn btn-danger">{t("xoa")}</button>
                        <input
                            type="checkbox"
                            onChange={() => handleTick(i)}
                            style={{transform: "scale(1.5)"}}
                        />
                    </div>
                </div>
            ))}

            <div className="row mt-5">
                <div className="col-lg-10 text-end">{t("tong_cong")}:</div>
                <div className="col-lg-2">{total.toLocaleString()} VNĐ</div>
            </div>

            <Button className="mt-3" onClick={() => setShowModal(true)}>
                {t("mua_tat_ca")} ({selectedItems.length})
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{t("gui_lich_hen")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleAppointmentSubmit}>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder={t("ten_cua_ban")}
                            required
                            value={appointment.name}
                            onChange={(e) => setAppointment({...appointment, name: e.target.value})}
                        />
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Email"
                            required
                            value={appointment.email}
                            onChange={(e) => setAppointment({...appointment, email: e.target.value})}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder={t("so_dien_thoai")}
                            required
                            value={appointment.phone}
                            onChange={(e) => setAppointment({...appointment, phone: e.target.value})}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder={t("cccd")}
                            required
                            value={appointment.cccd}
                            onChange={(e) => setAppointment({...appointment, cccd: e.target.value})}
                        />
                        <input
                            type="date"
                            className="form-control mb-2"
                            required
                            value={appointment.date}
                            onChange={(e) => setAppointment({...appointment, date: e.target.value})}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder={t("ghi_chu")}
                            value={appointment.content}
                            onChange={(e) => setAppointment({...appointment, content: e.target.value})}
                        />
                        <Button type="submit">{t("gui_lich_hen")}</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
