import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  // Fake data - không cần gọi API
  useEffect(() => {
    // Giả lập thời gian tải
    const timer = setTimeout(() => {
      setCartItems([
        {
          id: 1,
          name: "Honda Wave Alpha",
          brandName: "Honda",
          version: "Tiêu chuẩn",
          color: "Đỏ đen",
          colorValue: "#D10000",
          price: 18800000,
          discount: 5,
          quantity: 1,
          avatar: "honda-wave-alpha.jpg",
          inStock: 10,
          category: "Xe số",
          engineSize: "110cc",
          fuelConsumption: "1.8L/100km",
          description:
            "Honda Wave Alpha phiên bản mới với thiết kế trẻ trung, năng động cùng với khả năng vận hành mạnh mẽ và tiết kiệm nhiên liệu vượt trội.",
        },
        {
          id: 2,
          name: "Yamaha Exciter",
          brandName: "Yamaha",
          version: "GP Edition",
          color: "Xanh GP",
          colorValue: "#0046AD",
          price: 50900000,
          discount: 0,
          quantity: 1,
          avatar: "yamaha-exciter-gp.jpg",
          inStock: 5,
          category: "Xe côn tay",
          engineSize: "155cc",
          fuelConsumption: "2.2L/100km",
          description:
            "Yamaha Exciter 155 VVA - mẫu xe côn tay thể thao số 1 tại Việt Nam với thiết kế góc cạnh đậm chất thể thao và khả năng vận hành mạnh mẽ.",
        },
        {
          id: 3,
          name: "Honda SH Mode",
          brandName: "Honda",
          version: "Cao cấp",
          color: "Xanh lam đen",
          colorValue: "#003A70",
          price: 61990000,
          discount: 3,
          quantity: 1,
          avatar: "honda-sh-mode.jpg",
          inStock: 7,
          category: "Xe tay ga",
          engineSize: "125cc",
          fuelConsumption: "2.0L/100km",
          description:
            "Honda SH Mode 125cc - dòng xe tay ga cao cấp dành cho nữ với thiết kế sang trọng, tinh tế và công nghệ hiện đại.",
        },
      ]);
      setLoading(false);
    }, 800); // Giả lập tải trong 800ms

    return () => clearTimeout(timer);
  }, []);

  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(
            1,
            Math.min(item.inStock, item.quantity + change)
          );
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
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
    alert(
      "Xác nhận đơn hàng xe máy thành công! Nhân viên của chúng tôi sẽ liên hệ để hướng dẫn bạn các thủ tục tiếp theo."
    );
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
        <MotorBike size={64} className="mx-auto text-gray-300 mb-4" />
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
                    src={`/images/${item.avatar}`}
                    alt={item.name}
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        item.brandName === "Honda"
                          ? "https://cdn.honda.com.vn/motorbikes/October2022/YiiPIJUwzxYl1mitV9Kx.png"
                          : item.brandName === "Yamaha"
                          ? "https://yamaha-motor.com.vn/wp-content/uploads/2023/01/Exciter-155-GP-003.png"
                          : "https://via.placeholder.com/400x300?text=Xe+máy";
                    }}
                  />
                  {item.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                      -{item.discount}%
                    </div>
                  )}
                </div>

                {/* Thông tin sản phẩm */}
                <div className="flex-1 p-4 sm:p-6 flex flex-col">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.brandName} | {item.category}
                      </p>
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
                      <span className="font-medium">{item.engineSize}</span>
                    </div>
                    <div className="text-sm flex items-center">
                      <span className="text-gray-500 mr-1">Màu sắc:</span>{" "}
                      <span
                        className="inline-block w-3 h-3 rounded-full mr-1"
                        style={{ backgroundColor: item.colorValue }}
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
                      {item.discount > 0 && (
                        <span className="text-sm text-gray-500 line-through">
                          {item.price.toLocaleString()} VNĐ
                        </span>
                      )}
                      <span className="text-xl font-bold text-red-600">
                        {Math.round(
                          item.price * (1 - item.discount / 100)
                        ).toLocaleString()}{" "}
                        VNĐ
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nút thao tác bổ sung */}
              <div className="bg-gray-50 px-4 py-3 flex justify-between border-t border-gray-200">
                <Link
                  to={`/productdetail/${item.id}`}
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
            </div>
          ))}
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="lg:col-span-1 h-fit">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-4">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
              Tóm tắt đơn hàng
            </h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính:</span>
                <span>{calculateTotal().toLocaleString()} VNĐ</span>
              </div>

              {calculateSavings() > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Tiết kiệm:</span>
                  <span>-{calculateSavings().toLocaleString()} VNĐ</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <span>Phí đăng ký:</span>
                <span>Theo quy định</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3 mb-6">
              <div className="flex justify-between font-bold">
                <span className="text-lg">Tổng tiền:</span>
                <span className="text-xl text-red-600">
                  {calculateTotal().toLocaleString()} VNĐ
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                * Giá đã bao gồm VAT, chưa bao gồm phí đăng ký biển số.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md transition flex items-center justify-center"
              >
                <ShoppingCart size={18} className="mr-2" />
                Tiếp tục đặt hàng
              </button>

              <button
                onClick={handleScheduleVisit}
                className="w-full bg-white border border-red-600 text-red-600 py-3 rounded-md hover:bg-red-50 transition flex items-center justify-center"
              >
                <Calendar size={18} className="mr-2" />
                Đặt lịch xem xe
              </button>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <div className="flex">
                <Info
                  size={16}
                  className="text-blue-600 flex-shrink-0 mt-0.5 mr-2"
                />
                <p className="text-xs text-blue-700">
                  Để đảm bảo tính pháp lý khi mua xe, quý khách vui lòng đến
                  showroom để hoàn thiện hồ sơ và thủ tục đăng ký. Nhân viên tư
                  vấn sẽ liên hệ sau khi bạn xác nhận đơn hàng.
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Hỗ trợ trả góp 0% lãi suất
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Bảo hành chính hãng 3 năm
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Tư vấn đăng ký, đăng kiểm
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
