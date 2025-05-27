<<<<<<< Updated upstream

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
=======
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  Heart,
  Share2,
  ArrowLeft,
  Calendar,
  Info,
} from "lucide-react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Lay cart luu trong db
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    fetch("http://localhost:8080/api/cart", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading cart:", error);
        setCartItems([]);
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };
  //Xoa sp khoi cart
  const handleRemoveItem = async (id) => {
    const token = localStorage.getItem("jwtToken");
    try {
      const res = await fetch(
        `http://localhost:8080/api/cart/remove?productColorId=${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Không thể xóa sản phẩm khỏi giỏ hàng");
      }
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      alert("Xóa sản phẩm thất bại");
    }
  };
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const discountedPrice =
        item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price;
      return total + discountedPrice * item.quantity;
    }, 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((total, item) => {
      if (item.discount > 0) {
        const savings = ((item.price * item.discount) / 100) * item.quantity;
        return total + savings;
      }
      return total;
    }, 0);
  };

  const handleCheckout = () => {
    // Navigate to payment page
    navigate("/payment");
  };

  const handleScheduleVisit = () => {
    alert(
      "Đặt lịch xem xe thành công! Chúng tôi sẽ liên hệ để xác nhận lịch hẹn."
    );
  };

  // Hiển thị trạng thái đang tải
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Hiển thị giỏ hàng trống
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Giỏ hàng của bạn đang trống
        </h2>
        <p className="text-gray-600 mb-6">
          Hãy thêm các mẫu xe máy bạn yêu thích vào giỏ hàng
        </p>
        <Link
          to="/product"
          className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          <ArrowLeft size={16} className="mr-2" />
          Xem danh sách xe máy
        </Link>
      </div>
    );
  }

  // Hiển thị giỏ hàng với sản phẩm
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Giỏ hàng của bạn
      </h1>
      <p className="text-gray-600 mb-6">
        {cartItems.length} sản phẩm trong giỏ hàng
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Danh sách sản phẩm */}
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="mb-6 bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Hình ảnh sản phẩm */}
                <div className="w-full sm:w-1/3 h-52 sm:h-auto bg-gray-100 relative">
                  <img
                    src={`http://localhost:8080/api/files/${item.photo}`}
                    alt={item.color}
                    className="w-full h-full object-contain p-4"
                  />
                  {item.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                      -{item.discount}%
>>>>>>> Stashed changes
                    </div>
                </div>
            ))}

<<<<<<< Updated upstream
            <div className="row mt-5">
                <div className="col-lg-10 text-end">{t("tong_cong")}:</div>
                <div className="col-lg-2">{total.toLocaleString()} VNĐ</div>
=======
                {/* Thông tin sản phẩm */}
                <div className="flex-1 p-4 sm:p-6 flex flex-col">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.color}
                      </h3>
                      {/*<p className="text-sm text-gray-600">*/}
                      {/*  {item.brandName} | {item.category}*/}
                      {/*</p>*/}
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="text-sm">
                      <span className="text-gray-500">Phiên bản:</span>{" "}
                      <span className="font-medium">{item.version}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Động cơ:</span>{" "}
                      <span className="font-medium">{item.engieType}</span>
                    </div>
                    <div className="text-sm flex items-center">
                      <span className="text-gray-500 mr-1">Màu sắc:</span>{" "}
                      <span
                        className="inline-block w-3 h-3 rounded-full mr-1"
                        style={{ backgroundColor: item.value }}
                      ></span>
                      <span className="font-medium">{item.color}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">
                        Tiết kiệm nhiên liệu:
                      </span>{" "}
                      <span className="font-medium">
                        {item.fuelConsumption}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap justify-between items-end">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-3 py-1 border-r"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-3 py-1 border-l"
                        disabled={item.quantity >= item.inStock}
                      >
                        +
                      </button>
                    </div>

                    <div className="flex flex-col items-end mt-2 sm:mt-0">
                      <span className="text-xl font-bold text-red-600">
                        {!isNaN(item.price)
                          ? Number(item.price).toLocaleString() + " VNĐ"
                          : "0 VNĐ"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nút thao tác bổ sung */}
              <div className="bg-gray-50 px-4 py-3 flex justify-between border-t border-gray-200">
                <Link
                  to={`/productdetail/${
                    item.versionID
                  }?version=${encodeURIComponent(
                    item.version
                  )}&color=${encodeURIComponent(item.color)}`}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Xem chi tiết xe
                </Link>
                <div className="flex space-x-4">
                  <button className="text-gray-500 hover:text-red-600 flex items-center text-sm">
                    <Heart size={16} className="mr-1" />
                    <span className="hidden sm:inline">Yêu thích</span>
                  </button>
                  <button className="text-gray-500 hover:text-blue-600 flex items-center text-sm">
                    <Share2 size={16} className="mr-1" />
                    <span className="hidden sm:inline">Chia sẻ</span>
                  </button>
                </div>
              </div>
>>>>>>> Stashed changes
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
