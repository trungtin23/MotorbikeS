import React, { useState, useEffect } from "react";
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
  Edit,
  Save,
  X,
} from "lucide-react";

export default function CustomerProfile() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    address: "",
    dob: "",
  });

  // Lấy thông tin profile từ backend
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/profile", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProfile(data);
        
        // Khởi tạo form edit với dữ liệu hiện tại
        setEditForm({
          name: data.name || "",
          phone: data.phone || "",
          address: data.address || "",
          dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : "",
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form về dữ liệu gốc khi hủy
      setEditForm({
        name: profile.name || "",
        phone: profile.phone || "",
        address: profile.address || "",
        dob: profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("jwtToken");
    
    try {
      const updateData = {
        name: editForm.name,
        phone: editForm.phone,
        address: editForm.address,
        dob: editForm.dob ? new Date(editForm.dob).toISOString() : null,
      };

      const response = await fetch("http://localhost:8080/api/profile", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        // Cập nhật profile với dữ liệu mới
        setProfile(prev => ({
          ...prev,
          name: editForm.name,
          phone: editForm.phone,
          address: editForm.address,
          dob: editForm.dob ? new Date(editForm.dob).toISOString() : prev.dob,
        }));
        
        setIsEditing(false);
        alert("Cập nhật thông tin thành công!");
      } else {
        alert(result.message || "Có lỗi xảy ra khi cập nhật thông tin");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Có lỗi xảy ra khi cập nhật thông tin");
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Không thể tải thông tin profile</h2>
          <p className="text-gray-600">Vui lòng đăng nhập lại</p>
        </div>
      </div>
    );
  }

  // Dữ liệu mẫu cho xe và giao dịch (sẽ được thay thế bằng API thực tế sau)
  const customer = {
    id: "KH-00123",
    joinDate: profile.created ? new Date(profile.created).toLocaleDateString('vi-VN') : "N/A",
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
            <h1 className="text-xl font-bold">HỒ SƠ CÁ NHÂN</h1>
          </div>
          <div className="text-sm">Ngày: {new Date().toLocaleDateString('vi-VN')}</div>
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
                  <h2 className="text-2xl font-bold">{profile.name || profile.username}</h2>
                  <p className="text-red-100">Username: {profile.username}</p>
                </div>
              </div>
              <div className="bg-white text-red-600 px-4 py-2 rounded-full font-bold">
                {profile.role === "0" ? "Admin" : profile.role === "1" ? "User" : "Manager"}
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
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                    Thông tin liên hệ
                  </h3>
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center px-3 py-1 text-sm border border-red-600 text-red-600 rounded hover:bg-red-50"
                  >
                    {isEditing ? (
                      <>
                        <X size={16} className="mr-1" />
                        Hủy
                      </>
                    ) : (
                      <>
                        <Edit size={16} className="mr-1" />
                        Chỉnh sửa
                      </>
                    )}
                  </button>
                </div>

                {isEditing ? (
                  // Form chỉnh sửa
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email (không thể chỉnh sửa)
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ngày sinh
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={editForm.dob}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Địa chỉ
                      </label>
                      <textarea
                        name="address"
                        value={editForm.address}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Nhập địa chỉ"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        <Save size={16} className="mr-2" />
                        Lưu thay đổi
                      </button>
                    </div>
                  </div>
                ) : (
                  // Hiển thị thông tin
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center">
                      <User className="text-red-600 mr-3" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Họ và tên</p>
                        <p className="font-medium">{profile.name || "Chưa cập nhật"}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="text-red-600 mr-3" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Số điện thoại</p>
                        <p className="font-medium">{profile.phone || "Chưa cập nhật"}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="text-red-600 mr-3" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{profile.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="text-red-600 mr-3" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Ngày sinh</p>
                        <p className="font-medium">
                          {profile.dob ? new Date(profile.dob).toLocaleDateString('vi-VN') : "Chưa cập nhật"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start md:col-span-2">
                      <MapPin className="text-red-600 mr-3 mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-500">Địa chỉ</p>
                        <p className="font-medium">{profile.address || "Chưa cập nhật"}</p>
                      </div>
                    </div>
                  </div>
                )}

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
                        {profile.status === "ACTIVE" ? "Đang hoạt động" : "Chưa kích hoạt"}
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
            <button 
              onClick={() => window.print()}
              className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50"
            >
              In hồ sơ
            </button>
            {!isEditing && (
              <button 
                onClick={handleEditToggle}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
