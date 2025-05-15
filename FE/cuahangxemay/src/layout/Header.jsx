import React from "react";
import { Search, User, MapPin, Phone } from "lucide-react";
import { Outlet } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full">
      {/* Top header - contact info */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#"
                className="flex items-center text-gray-600 hover:text-red-600"
              >
                <MapPin size={16} className="mr-1" />
                <span>Đại lý</span>
              </a>
              <a
                href="#"
                className="flex items-center text-gray-600 hover:text-red-600"
              >
                <Phone size={16} className="mr-1" />
                <span>Liên hệ</span>
              </a>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-red-600">
                Tin tức
              </a>
              <a href="#" className="text-gray-600 hover:text-red-600">
                Tuyển dụng
              </a>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">VN</span>
                <span>|</span>
                <span className="ml-2">EN</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header - logo and navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/">
              <div className="flex items-center">
                <div className="flex items-center justify-center  bg-red-600 h-10 w-40 ">
                  <span className="text-white font-bold text-lg ">
                    T-MOTOSHOP
                  </span>
                </div>
              </div>
            </a>

            {/* Main Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-red-600 font-medium border-b-2 border-transparent hover:border-red-600 py-5"
              >
                Giới thiệu
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-red-600 font-medium border-b-2 border-transparent hover:border-red-600 py-5"
              >
                Ô tô
              </a>
              <a
                href="#"
                className="text-red-600 font-medium border-b-2 border-red-600 py-5"
              >
                Xe máy
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-red-600 font-medium border-b-2 border-transparent hover:border-red-600 py-5"
              >
                Dịch vụ sau bán hàng
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-red-600 font-medium border-b-2 border-transparent hover:border-red-600 py-5"
              >
                Đóng góp xã hội
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-red-600 font-medium border-b-2 border-transparent hover:border-red-600 py-5"
              >
                Motorsports
              </a>
            </nav>

            {/* Right side - Search and User */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-red-600">
                <Search size={20} />
              </button>
              <button className="text-gray-700 hover:text-red-600">
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-header - motorcycle specific menu */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-3 space-x-6 no-scrollbar">
            <a
              href="#"
              className="text-gray-700 hover:text-red-600 whitespace-nowrap text-sm font-medium"
            >
              Trang chủ
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-red-600 whitespace-nowrap text-sm font-medium"
            >
              Sản phẩm
            </a>
            <a
              href="#"
              className="text-red-600 whitespace-nowrap text-sm font-medium"
            >
              Bảng giá
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-red-600 whitespace-nowrap text-sm font-medium"
            >
              Khuyến mãi
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-red-600 whitespace-nowrap text-sm font-medium"
            >
              Tư vấn mua xe
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-red-600 whitespace-nowrap text-sm font-medium"
            >
              Đăng ký lái thử
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-red-600 whitespace-nowrap text-sm font-medium"
            >
              Tin tức
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-red-600 whitespace-nowrap text-sm font-medium"
            >
              Phụ tùng & phụ kiện
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-red-600 whitespace-nowrap text-sm font-medium"
            >
              An toàn giao thông
            </a>
          </div>
        </div>
      </div>

      {/* Add Outlet to render child routes */}
      <Outlet />
    </div>
  );
};

export default Header;
