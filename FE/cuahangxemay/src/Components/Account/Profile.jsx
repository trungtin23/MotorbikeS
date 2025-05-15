import React from "react";
import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  CreditCard,
  Clock,
  CheckCircle,
  Bike,
} from "lucide-react";

export default function CustomerProfile() {
  const [activeTab, setActiveTab] = useState("personal");

  // Dữ liệu mẫu khách hàng
  const customer = {
    id: "KH-00123",
    name: "Nguyễn Văn A",
    phone: "0912345678",
    email: "nguyenvana@email.com",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    dob: "15/05/1990",
    joinDate: "10/03/2025",
    motorbike: {
      model: "Honda Wave RSX",
      licensePlate: "59F1-12345",
      purchaseDate: "15/04/2025",
      warrantyEnd: "15/04/2028",
      color: "Đỏ-Đen",
      engineNumber: "VINHC12345678",
      chassisNumber: "HNDA9876543210",
    },
    transactions: [
      {
        id: "HD-00456",
        date: "15/04/2025",
        amount: "25.500.000 VNĐ",
        type: "Mua xe mới",
        status: "Hoàn thành",
      },
      {
        id: "DV-00078",
        date: "02/05/2025",
        amount: "350.000 VNĐ",
        type: "Bảo dưỡng lần 1",
        status: "Đã thanh toán",
      },
    ],
    serviceHistory: [
      {
        date: "02/05/2025",
        service: "Bảo dưỡng lần 1",
        technician: "Kỹ thuật viên: Trần Văn B",
        notes: "Thay nhớt, kiểm tra tổng quát",
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-red-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Bike className="mr-2" size={24} />
            <h1 className="text-xl font-bold">QUẢN LÝ KHÁCH HÀNG XE MÁY</h1>
          </div>
          <div className="text-sm">Ngày: 15/05/2025</div>
        </div>
      </div>

      {/* Customer Profile Card */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-red-600 text-white p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-white rounded-full p-3 mr-4">
                  <User className="text-red-600" size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{customer.name}</h2>
                  <p className="text-red-100">Mã KH: {customer.id}</p>
                </div>
              </div>
              <div className="bg-white text-red-600 px-4 py-2 rounded-full font-bold">
                Khách hàng VIP
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "personal"
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("personal")}
            >
              Thông tin cá nhân
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "vehicle"
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("vehicle")}
            >
              Thông tin xe
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === "transactions"
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("transactions")}
            >
              Lịch sử giao dịch
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Personal Information Tab */}
            {activeTab === "personal" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  Thông tin liên hệ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <Phone className="text-red-600 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Số điện thoại</p>
                      <p className="font-medium">{customer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="text-red-600 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{customer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="text-red-600 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Địa chỉ</p>
                      <p className="font-medium">{customer.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="text-red-600 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Ngày sinh</p>
                      <p className="font-medium">{customer.dob}</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-8">
                  Thông tin tài khoản
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <Calendar className="text-red-600 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Ngày tham gia</p>
                      <p className="font-medium">{customer.joinDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="text-green-600 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Trạng thái</p>
                      <p className="font-medium text-green-600">
                        Đang hoạt động
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vehicle Information Tab */}
            {activeTab === "vehicle" && (
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-red-800">
                      {customer.motorbike.model}
                    </h3>
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                      {customer.motorbike.licensePlate}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <Calendar className="text-red-600 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Ngày mua</p>
                      <p className="font-medium">
                        {customer.motorbike.purchaseDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="text-red-600 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Bảo hành đến</p>
                      <p className="font-medium">
                        {customer.motorbike.warrantyEnd}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Bike className="text-red-600 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Màu sắc</p>
                      <p className="font-medium">{customer.motorbike.color}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FileText className="text-red-600 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Số máy</p>
                      <p className="font-medium">
                        {customer.motorbike.engineNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center col-span-2">
                    <FileText className="text-red-600 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Số khung</p>
                      <p className="font-medium">
                        {customer.motorbike.chassisNumber}
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-8">
                  Lịch sử bảo dưỡng
                </h3>
                {customer.serviceHistory.map((service, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-red-500 pl-4 py-2"
                  >
                    <div className="flex justify-between">
                      <p className="font-medium">{service.service}</p>
                      <p className="text-gray-500 text-sm">{service.date}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {service.technician}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {service.notes}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === "transactions" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  Lịch sử giao dịch
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead className="bg-red-50">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-medium text-red-800">
                          Mã giao dịch
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-red-800">
                          Ngày
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-red-800">
                          Loại giao dịch
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-red-800">
                          Số tiền
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-red-800">
                          Trạng thái
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {customer.transactions.map((transaction, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="py-3 px-4 text-sm">
                            {transaction.id}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {transaction.date}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {transaction.type}
                          </td>
                          <td className="py-3 px-4 text-sm font-medium">
                            {transaction.amount}
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50">
              In hồ sơ
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Chỉnh sửa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
