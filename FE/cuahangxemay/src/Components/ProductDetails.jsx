import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Share2,
  ArrowLeft,
  Calendar,
  Wrench,
  CheckCircle2,
  Info,
  CircleDollarSign,
} from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [versionColors, setVersionColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("specs");

  useEffect(() => {
    async function fetchProductDetail() {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8080/api/products/${id}`);
        console.log("Dữ liệu API:", res.data);
        setProduct(res.data.product);
        setVersionColors(res.data.versionColors);

        // Thiết lập phiên bản và màu mặc định
        if (res.data.versionColors.length > 0) {
          setSelectedVersion(res.data.versionColors[0]);
          setSelectedColor(res.data.versionColors[0]?.colors[0]);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchProductDetail();
  }, [id]);

  // Hàm xử lý khi thay đổi phiên bản
  const handleVersionChange = (version) => {
    setSelectedVersion(version);
    setSelectedColor(version.colors[0]);
  };

  // Hàm xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    // Thực hiện logic thêm vào giỏ hàng
    console.log("Thêm vào giỏ hàng:", {
      product,
      version: selectedVersion?.versionName,
      color: selectedColor?.color,
      quantity,
    });
  };

  // Hàm xử lý đặt lịch xem xe
  const handleBookTestRide = () => {
    console.log("Đặt lịch lái thử xe:", {
      product: product.name,
      version: selectedVersion?.versionName,
      color: selectedColor?.color,
    });
    // TODO: Mở form đặt lịch hoặc chuyển hướng đến trang đặt lịch
  };

  // Hiển thị trạng thái đang tải
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Hiển thị thông báo lỗi nếu không tìm thấy sản phẩm
  if (!product || !selectedColor) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Không tìm thấy sản phẩm
        </h2>
        <p className="mt-2 text-gray-600">
          Sản phẩm không tồn tại hoặc đã bị xóa
        </p>
        <Link
          to="/product"
          className="mt-4 inline-flex items-center text-red-600 hover:text-red-700"
        >
          <ArrowLeft size={16} className="mr-1" />
          Quay lại trang sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Đường dẫn điều hướng */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-red-600">
          Trang chủ
        </Link>{" "}
        /
        <Link to="/product" className="hover:text-red-600">
          {" "}
          Xe máy
        </Link>{" "}
        /{" "}
        <Link
          to={`/product?brand=${product.brandName}`}
          className="hover:text-red-600"
        >
          {product.brandName}
        </Link>{" "}
        /<span className="text-gray-800"> {product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Phần hình ảnh bên trái */}
        <div className="bg-gray-50 rounded-lg overflow-hidden p-4">
          <div className="relative pb-4">
            <img
              src={`http://localhost:8080/api/files/${product.avatar}`}
              alt={product.name}
              className="w-full h-auto object-contain rounded-lg"
              style={{ maxHeight: "400px" }}
            />

            {/* Huy hiệu khuyến mãi và thông tin nổi bật */}
            <div className="absolute top-4 left-4 right-4 flex justify-between">
              {product.discount > 0 && (
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Giảm {product.discount}%
                </div>
              )}

              {product.isNew && (
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium ml-2">
                  Mẫu mới 2024
                </div>
              )}
            </div>
          </div>

          {/* Thêm hình ảnh chi tiết */}
          <div className="grid grid-cols-5 gap-2 mt-4">
            <div className="border-2 border-red-500 rounded-md overflow-hidden">
              <img
                src={`http://localhost:8080/api/files/${product.avatar}`}
                alt={`${product.name} chính diện`}
                className="w-full h-16 object-cover"
              />
            </div>
            {/* Hình ảnh các góc nhìn khác */}
            <div className="border border-gray-200 hover:border-red-500 rounded-md overflow-hidden cursor-pointer">
              <img
                src={`http://localhost:8080/api/files/${product.avatar}`}
                alt={`${product.name} bên trái`}
                className="w-full h-16 object-cover"
              />
            </div>
            <div className="border border-gray-200 hover:border-red-500 rounded-md overflow-hidden cursor-pointer">
              <img
                src={`http://localhost:8080/api/files/${product.avatar}`}
                alt={`${product.name} bên phải`}
                className="w-full h-16 object-cover"
              />
            </div>
            <div className="border border-gray-200 hover:border-red-500 rounded-md overflow-hidden cursor-pointer">
              <img
                src={`http://localhost:8080/api/files/${product.avatar}`}
                alt={`${product.name} phía sau`}
                className="w-full h-16 object-cover"
              />
            </div>
            <div className="border border-gray-200 hover:border-red-500 rounded-md overflow-hidden cursor-pointer">
              <img
                src={`http://localhost:8080/api/files/${product.avatar}`}
                alt={`${product.name} chi tiết`}
                className="w-full h-16 object-cover"
              />
            </div>
          </div>

          {/* Thêm thông tin công nghệ nổi bật */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Công nghệ nổi bật
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start">
                <CheckCircle2
                  size={16}
                  className="text-green-600 mr-1 mt-0.5"
                />
                <span className="text-sm text-gray-600">
                  Động cơ {product.category === "xe số" ? "eSP" : "BlueCore"}
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle2
                  size={16}
                  className="text-green-600 mr-1 mt-0.5"
                />
                <span className="text-sm text-gray-600">
                  Phanh{" "}
                  {product.category === "xe phân khối lớn" ? "ABS" : "CBS"}
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle2
                  size={16}
                  className="text-green-600 mr-1 mt-0.5"
                />
                <span className="text-sm text-gray-600">
                  Hệ thống phun xăng điện tử
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle2
                  size={16}
                  className="text-green-600 mr-1 mt-0.5"
                />
                <span className="text-sm text-gray-600">
                  Smart Key{" "}
                  {product.category === "xe ga" ? "tiêu chuẩn" : "tùy chọn"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Phần thông tin sản phẩm bên phải */}
        <div className="flex flex-col">
          {/* Tên và đánh giá */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <div className="flex items-center mt-2 md:mt-0">
              <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                {product.category}
              </div>
            </div>
          </div>

          <div className="flex items-center mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600 text-sm">25 đánh giá</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-green-600 text-sm">
              Có sẵn {selectedColor?.quantity} xe
            </span>
          </div>

          {/* Giá và tính năng */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-baseline">
              <h2 className="text-3xl font-bold text-red-600">
                {selectedColor?.price.toLocaleString()} VNĐ
              </h2>
              {product.discount > 0 && (
                <span className="ml-3 text-gray-500 line-through text-lg">
                  {(
                    (selectedColor?.price * 100) /
                    (100 - product.discount)
                  ).toLocaleString()}{" "}
                  VNĐ
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Giá đã bao gồm VAT (chưa bao gồm phí đăng ký biển số)
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium flex items-center">
                <CircleDollarSign size={14} className="mr-1" /> Trả góp 0%
              </div>
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium flex items-center">
                <Info size={14} className="mr-1" /> Bảo hành 3 năm
              </div>
            </div>
          </div>

          {/* Chọn phiên bản */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Phiên bản</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {versionColors.map((version, vi) => (
                <button
                  key={vi}
                  type="button"
                  className={`px-4 py-2 text-sm rounded-md ${
                    selectedVersion?.versionName === version.versionName
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  onClick={() => handleVersionChange(version)}
                >
                  {version.versionName}
                </button>
              ))}
            </div>
          </div>

          {/* Chọn màu sắc */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Màu sắc</h3>
            <div className="flex flex-wrap gap-4 mt-3">
              {selectedVersion?.colors.map((color, ci) => (
                <div
                  key={ci}
                  className={`flex flex-col items-center cursor-pointer ${
                    selectedColor?.color === color.color
                      ? "opacity-100"
                      : "opacity-70"
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  <div
                    className={`w-14 h-14 rounded-full border-2 ${
                      selectedColor?.color === color.color
                        ? "border-red-600"
                        : "border-gray-300"
                    }`}
                  >
                    <div
                      className="w-full h-full rounded-full m-0.5"
                      style={{ backgroundColor: color.value || "#ccc" }}
                    ></div>
                  </div>
                  <span className="mt-1 text-xs text-gray-700">
                    {color.color}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Chọn số lượng */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Số lượng</h3>
            <div className="flex items-center mt-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-l border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                min="1"
                max={selectedColor?.quantity || 1}
                className="w-14 h-10 text-center border-y border-gray-300"
              />
              <button
                onClick={() =>
                  setQuantity(
                    Math.min(selectedColor?.quantity || 1, quantity + 1)
                  )
                }
                className="w-10 h-10 flex items-center justify-center rounded-r border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              className="bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 flex items-center justify-center text-sm font-medium w-full sm:flex-1"
            >
              <ShoppingCart size={18} className="mr-2" />
              Thêm vào giỏ hàng
            </button>

            <button
              onClick={handleBookTestRide}
              className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 flex items-center justify-center text-sm font-medium w-full sm:flex-1"
            >
              <Calendar size={18} className="mr-2" />
              Đặt lịch lái thử
            </button>
          </div>

          <div className="mt-3 flex gap-3">
            <button className="border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 py-2 px-4 text-sm w-full sm:flex-1">
              <Heart size={18} className="text-gray-600 mr-2" />
              <span>Yêu thích</span>
            </button>

            <button className="border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 py-2 px-4 text-sm w-full sm:flex-1">
              <Share2 size={18} className="text-gray-600 mr-2" />
              <span>Chia sẻ</span>
            </button>
          </div>

          {/* Thông tin giao hàng */}
          <div className="mt-8 p-4 bg-gray-50 rounded-md">
            <h3 className="font-medium text-gray-900 mb-3">
              Chính sách mua hàng
            </h3>
            <div className="flex items-start mb-3">
              <svg
                className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0"
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
              <span className="text-gray-600 text-sm">
                Hỗ trợ đăng ký, đăng kiểm xe
              </span>
            </div>
            <div className="flex items-start mb-3">
              <svg
                className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0"
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
              <span className="text-gray-600 text-sm">
                Bảo hành chính hãng 3 năm hoặc 30.000 km
              </span>
            </div>
            <div className="flex items-start mb-3">
              <svg
                className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0"
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
              <span className="text-gray-600 text-sm">
                Tặng bảo hiểm xe 1 năm đầu tiên
              </span>
            </div>
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0"
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
              <span className="text-gray-600 text-sm">
                Hỗ trợ trả góp lãi suất 0% trong 6 tháng
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin chi tiết sản phẩm */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 overflow-x-auto">
            <button
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === "specs"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("specs")}
            >
              Thông số kỹ thuật
            </button>
            <button
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === "features"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("features")}
            >
              Tính năng nổi bật
            </button>
            <button
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === "reviews"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Đánh giá
            </button>
            <button
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === "support"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("support")}
            >
              Bảo hành & hỗ trợ
            </button>
          </nav>
        </div>

        <div className="py-6">
          {activeTab === "specs" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Thông số kỹ thuật
                </h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 text-sm text-gray-500 w-1/2">
                        Hãng sản xuất
                      </td>
                      <td className="py-3 text-sm font-medium text-gray-900">
                        {product.brandName}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm text-gray-500">Loại xe</td>
                      <td className="py-3 text-sm font-medium text-gray-900">
                        {product.category}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm text-gray-500">
                        Loại động cơ
                      </td>
                      <td className="py-3 text-sm font-medium text-gray-900">
                        {product.category === "xe điện"
                          ? "Động cơ điện"
                          : "4 thì, xy-lanh đơn, làm mát bằng không khí"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm text-gray-500">
                        {product.category === "xe điện"
                          ? "Công suất động cơ"
                          : "Dung tích xy-lanh"}
                      </td>
                      <td className="py-3 text-sm font-medium text-gray-900">
                        {product.category === "xe điện"
                          ? "1200W"
                          : product.category === "xe phân khối lớn"
                          ? "250cc - 1000cc"
                          : product.category === "xe côn tay"
                          ? "150cc - 175cc"
                          : "110cc - 125cc"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm text-gray-500">
                        Công suất tối đa
                      </td>
                      <td className="py-3 text-sm font-medium text-gray-900">
                        {product.category === "xe phân khối lớn"
                          ? "35 mã lực @ 8,000 rpm"
                          : product.category === "xe côn tay"
                          ? "15 mã lực @ 9,000 rpm"
                          : product.category === "xe số"
                          ? "8.5 mã lực @ 8,000 rpm"
                          : "12 mã lực @ 8,500 rpm"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm text-gray-500">
                        Dung tích bình xăng
                      </td>
                      <td className="py-3 text-sm font-medium text-gray-900">
                        {product.category === "xe phân khối lớn"
                          ? "14 lít"
                          : product.category === "xe điện"
                          ? "Không có"
                          : "4.5 lít"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm text-gray-500">
                        Hệ thống phanh trước/sau
                      </td>
                      <td className="py-3 text-sm font-medium text-gray-900">
                        {product.category === "xe phân khối lớn" ||
                        product.category === "xe côn tay"
                          ? "Đĩa/Đĩa"
                          : "Đĩa/Tang trống"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm text-gray-500">
                        Kích thước lốp trước/sau
                      </td>
                      <td className="py-3 text-sm font-medium text-gray-900">
                        {product.category === "xe phân khối lớn"
                          ? "110/70-17 / 150/60-17"
                          : product.category === "xe côn tay"
                          ? "90/90-17 / 120/70-17"
                          : "80/90-16 / 90/90-14"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm text-gray-500">
                        Khối lượng bản thân
                      </td>
                      <td className="py-3 text-sm font-medium text-gray-900">
                        {product.category === "xe phân khối lớn"
                          ? "185 kg"
                          : product.category === "xe côn tay"
                          ? "135 kg"
                          : product.category === "xe số"
                          ? "99 kg"
                          : "114 kg"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 text-sm text-gray-500">
                        Chiều cao yên
                      </td>
                      <td className="py-3 text-sm font-medium text-gray-900">
                        {product.category === "xe phân khối lớn"
                          ? "830 mm"
                          : product.category === "xe côn tay"
                          ? "795 mm"
                          : "760 mm"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Mô tả sản phẩm
                </h3>
                <div className="prose text-gray-600">
                  <p>
                    {product.description ||
                      `${product.name} - ${product.category} mới nhất từ ${product.brandName}. Thiết kế hiện đại, mạnh mẽ kết hợp với công nghệ tiên tiến, đem đến trải nghiệm lái xe tuyệt vời cho người dùng.`}
                  </p>

                  <div className="mt-6">
                    <h4 className="text-base font-medium text-gray-800">
                      Điểm nổi bật:
                    </h4>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span>
                          Thiết kế thể thao, hiện đại phù hợp với giới trẻ
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span>Động cơ mạnh mẽ, tiết kiệm nhiên liệu</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span>
                          Hệ thống phanh an toàn{" "}
                          {product.category === "xe phân khối lớn"
                            ? "ABS"
                            : "CBS"}
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span>Khung xe vững chắc, cân bằng tốt</span>
                      </li>
                    </ul>
                  </div>

                  <p className="mt-4 text-sm text-gray-500">
                    Sản phẩm 100% chính hãng {product.brandName}. Xe được bảo
                    hành chính hãng 3 năm hoặc 30,000 km (tùy điều kiện nào đến
                    trước). Liên hệ showroom để nhận thêm ưu đãi mới nhất.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src={`http://localhost:8080/api/files/${product.avatar}`}
                  alt="Tính năng nổi bật"
                  className="rounded-lg w-full object-cover h-64"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Tính năng nổi bật
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">
                        Động cơ mạnh mẽ, tiết kiệm
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.category === "xe điện"
                          ? "Động cơ điện tiết kiệm năng lượng, vận hành êm ái"
                          : "Động cơ 4 thì tiên tiến, phun xăng điện tử, tiết kiệm nhiên liệu tối ưu"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">
                        Hệ thống an toàn tiên tiến
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.category === "xe phân khối lớn"
                          ? "Trang bị hệ thống phanh ABS 2 kênh, kiểm soát lực kéo"
                          : "Hệ thống phanh CBS kết hợp, đảm bảo an toàn khi phanh gấp"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">
                        Công nghệ tiên tiến
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.category === "xe ga" ||
                        product.category === "xe phân khối lớn"
                          ? "Hệ thống khóa thông minh Smart Key, màn hình LCD hiển thị đa thông tin"
                          : "Đèn LED tiết kiệm điện, hiển thị ECO thông minh"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">
                        Thiết kế tiện lợi
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.category === "xe ga"
                          ? "Cốp xe rộng rãi, chứa được 2 mũ bảo hiểm cùng nhiều vật dụng cá nhân"
                          : "Thiết kế gọn gàng, cân đối, dễ di chuyển trong đô thị đông đúc"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Đánh giá từ khách hàng
                </h3>
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0">
                    <div className="text-5xl font-bold text-gray-900">4.8</div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`h-5 w-5 ${
                            star <= 4 ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      Dựa trên 25 đánh giá
                    </div>
                  </div>
                  <div className="ml-6 flex-1">
                    <div className="flex items-center mb-2">
                      <div className="text-sm text-gray-600 w-12">5 sao</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                        <div
                          className="h-2 bg-yellow-400 rounded-full"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 w-12">80%</div>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="text-sm text-gray-600 w-12">4 sao</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                        <div
                          className="h-2 bg-yellow-400 rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 w-12">15%</div>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="text-sm text-gray-600 w-12">3 sao</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                        <div
                          className="h-2 bg-yellow-400 rounded-full"
                          style={{ width: "5%" }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 w-12">5%</div>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="text-sm text-gray-600 w-12">2 sao</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                        <div
                          className="h-2 bg-yellow-400 rounded-full"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 w-12">0%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-sm text-gray-600 w-12">1 sao</div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                        <div
                          className="h-2 bg-yellow-400 rounded-full"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 w-12">0%</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">
                        Nguyễn Văn A
                      </span>
                      <span className="text-sm text-gray-500">
                        2 tuần trước
                      </span>
                    </div>
                    <div className="flex mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="h-4 w-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-2 text-gray-600">
                      Sau 3 tháng sử dụng, xe vẫn chạy rất êm, tiết kiệm xăng và
                      thiết kế hiện đại, nhiều người hỏi mua. Rất hài lòng với
                      chất lượng sản phẩm và dịch vụ chăm sóc khách hàng.
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">
                        Trần Thị B
                      </span>
                      <span className="text-sm text-gray-500">
                        1 tháng trước
                      </span>
                    </div>
                    <div className="flex mt-1">
                      {[1, 2, 3, 4, 5].map((star, i) => (
                        <svg
                          key={star}
                          className={`h-4 w-4 ${
                            i < 5 ? "text-yellow-400" : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-2 text-gray-600">
                      Xe rất phù hợp với di chuyển trong thành phố, nhỏ gọn và
                      dễ điều khiển. Dịch vụ bảo hành nhanh chóng, chu đáo. Chỉ
                      tiếc là cốp xe hơi nhỏ.
                    </p>
                  </div>
                </div>

                <button className="mt-6 text-sm font-medium text-red-600 hover:text-red-700">
                  Xem tất cả đánh giá
                </button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Viết đánh giá
                </h3>
                <div className="flex items-center mb-4">
                  <span className="text-sm text-gray-700 mr-2">
                    Đánh giá của bạn:
                  </span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="h-5 w-5 text-gray-300 cursor-pointer hover:text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-red-500 focus:border-red-500"
                  rows="4"
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                ></textarea>
                <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium">
                  Gửi đánh giá
                </button>
              </div>
            </div>
          )}

          {activeTab === "support" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                  <Tool size={24} className="text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-center text-gray-900 mb-2">
                  Chế độ bảo hành
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  Bảo hành chính hãng 3 năm hoặc 30,000 km (tùy điều kiện nào
                  đến trước). Được bảo hành tại tất cả các đại lý{" "}
                  {product.brandName} trên toàn quốc.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full mb-4">
                  <Calendar size={24} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-center text-gray-900 mb-2">
                  Bảo dưỡng định kỳ
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  Lần đầu: 1,000 km
                  <br />
                  Các lần tiếp theo: mỗi 3,000 km
                  <br />
                  Đặt lịch bảo dưỡng trực tuyến để được ưu tiên phục vụ.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full mb-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-center text-gray-900 mb-2">
                  Hỗ trợ khách hàng
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  Hotline: 1800-9999
                  <br />
                  Email: support@tmotoshop.com
                  <br />
                  Giờ làm việc: 8:00 - 20:00 (Tất cả các ngày)
                </p>
              </div>

              <div className="md:col-span-3 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Câu hỏi thường gặp
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Làm thế nào để đặt lịch bảo dưỡng?
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Bạn có thể đặt lịch bảo dưỡng trực tuyến qua website chính
                      thức hoặc gọi hotline 1800-9999. Chúng tôi khuyến nghị đặt
                      lịch trước 2-3 ngày để đảm bảo được phục vụ đúng thời
                      gian.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Tôi có thể mua trả góp không?
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Có, chúng tôi cung cấp nhiều gói trả góp với lãi suất ưu
                      đãi, thời gian từ 6-24 tháng. Bạn chỉ cần chuẩn bị CMND,
                      sổ hộ khẩu và chứng minh thu nhập (nếu cần).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Thời gian giao xe sau khi đặt cọc?
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Thông thường xe có sẵn sẽ được giao trong vòng 1-3 ngày
                      làm việc. Với những phiên bản đặc biệt hoặc màu sắc hiếm
                      có thể mất 7-15 ngày tùy tình trạng kho.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sản phẩm tương tự */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Xe máy cùng phân khúc
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                  src={`http://localhost:8080/api/files/${product.avatar}`}
                  alt="Related Product"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  {product.brandName} {index % 2 === 0 ? "Wave" : "Vision"}{" "}
                  {110 + index * 10}
                </h3>
                <p className="mt-1 text-xs text-gray-500">{product.category}</p>
                <div className="mt-2 font-bold text-red-600">
                  {(25000000 + index * 5000000).toLocaleString()} VNĐ
                </div>
                <div className="mt-3">
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded text-sm">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
