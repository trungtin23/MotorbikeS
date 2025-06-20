# BÁO CÁO DỰ ÁN CỬA HÀNG XE MÁY
## (MOTORBIKE STORE E-COMMERCE PLATFORM)

---

## I. TỔNG QUAN DỰ ÁN

### 1.1 Giới thiệu
Dự án "Cửa hàng xe máy" là một hệ thống thương mại điện tử hoàn chỉnh được phát triển để quản lý và bán hàng trực tuyến các sản phẩm xe máy. Hệ thống được xây dựng với kiến trúc Full-Stack, sử dụng các công nghệ hiện đại để đảm bảo hiệu suất cao và trải nghiệm người dùng tốt nhất.

### 1.2 Mục tiêu dự án
- Xây dựng hệ thống bán hàng trực tuyến chuyên về xe máy
- Quản lý danh mục sản phẩm, thương hiệu và dòng xe
- Hỗ trợ đặt hàng, thanh toán trực tuyến
- Quản lý tài khoản người dùng và nhân viên
- Hệ thống đánh giá và bình luận sản phẩm
- Tích hợp thanh toán VNPay
- Hệ thống xác thực email và bảo mật

---

## II. KIẾN TRÚC VÀ CÔNG NGHỆ SỬ DỤNG

### 2.1 Kiến trúc tổng thể
Dự án được xây dựng theo mô hình **3-tier architecture**:
- **Presentation Layer**: Frontend React.js
- **Business Logic Layer**: Backend Spring Boot
- **Data Access Layer**: MySQL Database

### 2.2 Công nghệ Backend

#### 2.2.1 Framework và Dependencies chính
- **Spring Boot 3.4.4**: Framework chính cho phát triển backend
- **Java 17**: Ngôn ngữ lập trình chính
- **Spring Data JPA**: Quản lý dữ liệu và ORM
- **Spring Security**: Bảo mật và xác thực
- **Spring Boot Web**: Phát triển REST API
- **MySQL Connector**: Kết nối cơ sở dữ liệu

#### 2.2.2 Libraries và Tools
- **JWT (jsonwebtoken 0.12.6)**: Xác thực và phân quyền
- **ModelMapper 3.0.0**: Mapping giữa entities và DTOs
- **Lombok**: Giảm boilerplate code
- **Spring Boot Mail**: Gửi email xác thực
- **Spring Boot DevTools**: Hỗ trợ phát triển

#### 2.2.3 Database
- **MySQL**: Hệ quản trị cơ sở dữ liệu chính
- **Hibernate**: ORM framework
- **Connection Pool**: Quản lý kết nối database

### 2.3 Công nghệ Frontend

#### 2.3.1 Framework và Libraries
- **React 19.1.0**: Framework JavaScript chính
- **Vite 6.2.0**: Build tool và development server
- **React Router DOM 7.6.0**: Routing navigation
- **Axios 1.9.0**: HTTP client cho API calls

#### 2.3.2 UI/UX Libraries
- **Material-UI (MUI) 7.1.0**: Component library
- **TailwindCSS 4.1.6**: Utility-first CSS framework
- **Lucide React 0.509.0**: Icon library
- **Emotion React/Styled**: CSS-in-JS styling

#### 2.3.3 Authentication
- **JWT Decode 4.0.0**: Xử lý JWT tokens

---

## III. CẤU TRÚC DỮ LIỆU

### 3.1 Database Schema
Hệ thống sử dụng MySQL với tên database: `motobike_web`

### 3.2 Các Entity chính

#### 3.2.1 Account (Tài khoản)
```
- id (Integer): Primary key
- username (String): Tên đăng nhập
- password (String): Mật khẩu đã mã hóa
- email (String): Email người dùng
- phone (String): Số điện thoại
- name (String): Họ và tên
- role (String): Vai trò (1=User, 2=Admin)
- status (String): Trạng thái (ACTIVE/PENDING)
- securityCode (String): Mã xác thực
- address (String): Địa chỉ
- dob (Instant): Ngày sinh
- avatar (String): Ảnh đại diện
- created (Instant): Ngày tạo
```

#### 3.2.2 Product (Sản phẩm)
```
- id (Integer): Primary key
- name (String): Tên sản phẩm
- description (String): Mô tả
- price (Double): Giá
- avatar (String): Ảnh đại diện
- weight (String): Khối lượng
- size (String): Kích thước
- petrolCapacity (String): Dung tích bình xăng
- saddleHeight (String): Chiều cao yên
- wheelSize (String): Kích thước bánh xe
- beforeFork/afterFork (String): Hệ thống treo
- maxiumCapacity (String): Công suất tối đa
- oilCapacity (String): Dung tích nhớt
- fuelConsumption (String): Mức tiêu thụ nhiên liệu
- cylinderCapacity (String): Dung tích xi-lanh
- maxiumMoment (String): Mô-men xoắn tối đa
- compressionRatio (String): Tỷ số nén
- engieType (String): Loại động cơ
- brandId (Integer): Thương hiệu
- motolineId (Integer): Dòng xe
```

#### 3.2.3 Brand (Thương hiệu)
```
- id (Integer): Primary key
- name (String): Tên thương hiệu
- photo (String): Logo thương hiệu
- description (String): Mô tả
```

#### 3.2.4 Order (Đơn hàng)
```
- id (Integer): Primary key
- user_id (Integer): Người đặt hàng
- order_date (Instant): Ngày đặt hàng
- total_amount (Double): Tổng tiền
- status (String): Trạng thái đơn hàng
- payment_method (String): Phương thức thanh toán
- transaction_id (String): Mã giao dịch
- shipping_address (String): Địa chỉ giao hàng
- shipping_phone (String): SĐT nhận hàng
- shipping_name (String): Tên người nhận
```

#### 3.2.5 Các Entity khác
- **Motoline**: Dòng xe máy
- **Productversion**: Phiên bản sản phẩm
- **Productcolor**: Màu sắc sản phẩm
- **OrderDetail**: Chi tiết đơn hàng
- **Cart**: Giỏ hàng
- **Comment**: Bình luận đánh giá
- **Appointment**: Đặt lịch hẹn
- **Employee**: Nhân viên

---

## IV. CHỨC NĂNG CHÍNH

### 4.1 Hệ thống Authentication & Authorization

#### 4.1.1 Đăng ký tài khoản
- Validation dữ liệu đầu vào
- Mã hóa mật khẩu với BCrypt
- Gửi email xác thực
- Trạng thái tài khoản PENDING cho đến khi xác thực

#### 4.1.2 Đăng nhập
- Xác thực username/password
- Tạo JWT token với thông tin user và role
- Kiểm tra trạng thái tài khoản ACTIVE

#### 4.1.3 Quên mật khẩu
- Gửi link reset password qua email
- Token có thời hạn cho bảo mật
- Đặt lại mật khẩu mới

#### 4.1.4 Xác thực email
- Gửi mã xác thực UUID qua email
- Trang xác thực với UI/UX thân thiện
- Tự động redirect sau khi thành công

### 4.2 Quản lý sản phẩm
- CRUD operations cho sản phẩm
- Quản lý thương hiệu và dòng xe
- Upload và quản lý hình ảnh
- Quản lý phiên bản và màu sắc sản phẩm

### 4.3 Hệ thống đặt hàng
- Thêm sản phẩm vào giỏ hàng
- Quản lý đơn hàng
- Tính toán tổng tiền
- Quản lý trạng thái đơn hàng

### 4.4 Thanh toán
- Tích hợp VNPay Gateway
- Hỗ trợ nhiều phương thức thanh toán
- Xử lý callback từ cổng thanh toán

### 4.5 Hệ thống đánh giá
- Đánh giá sao (1-5)
- Bình luận sản phẩm
- Quản lý feedback khách hàng

---

## V. BẢO MẬT VÀ XÁC THỰC

### 5.1 Bảo mật Backend
- **Spring Security**: Framework bảo mật chính
- **JWT Authentication**: Stateless authentication
- **Password Encryption**: BCrypt hashing
- **CORS Configuration**: Kiểm soát cross-origin requests

### 5.2 Validation và Sanitization
- Input validation cho all endpoints
- SQL Injection prevention với JPA
- XSS protection

### 5.3 Email Security
- Secure email configuration với Gmail SMTP
- App password authentication
- Email template security

---

## VI. TÍCH HỢP THIRD-PARTY

### 6.1 VNPay Payment Gateway
- **Terminal ID**: JRNO6CET
- **Sandbox Environment**: Testing payments
- **Return URL Handling**: Xử lý kết quả thanh toán
- **Security**: Hash validation

### 6.2 Email Service
- **Gmail SMTP**: smtp.gmail.com:587
- **HTML Email Templates**: Rich email content
- **Verification Links**: Secure token-based verification

---

## VII. CẤU HÌNH VÀ DEPLOYMENT

### 7.1 Backend Configuration
```properties
Server Port: 8080
Database: MySQL (motobike_web)
JPA: Hibernate with MySQL dialect
Email: Gmail SMTP
VNPay: Sandbox environment
```

### 7.2 Frontend Configuration
```json
Development Server: Vite
Port: 5173 (default)
Build Tool: Vite
Package Manager: npm
```

### 7.3 Development Environment
- **Backend**: Spring Boot với DevTools
- **Frontend**: Vite với Hot Module Replacement
- **Database**: MySQL local hoặc remote
- **IDE**: IntelliJ IDEA / Visual Studio Code

---

## VIII. TESTING VÀ DEBUGGING

### 8.1 Backend Testing
- Spring Boot Test framework
- JUnit integration
- API endpoint testing

### 8.2 Database Testing
- Test data với SQL scripts
- Database migration testing

### 8.3 Frontend Testing
- React component testing
- User interaction testing

---

## IX. TỐI ƯU HOÁ VÀ PERFORMANCE

### 9.1 Backend Optimization
- **Database Indexing**: Tối ưu query performance
- **Lazy Loading**: JPA entity relationships
- **Connection Pooling**: Database connection management
- **Caching**: Hibernate second-level cache

### 9.2 Frontend Optimization
- **Code Splitting**: React lazy loading
- **Bundle Optimization**: Vite build optimization
- **Image Optimization**: Responsive images
- **CSS Optimization**: TailwindCSS purge

---

## X. HƯỚNG PHÁT TRIỂN

### 10.1 Tính năng mở rộng
- **Real-time Chat**: Customer support
- **Push Notifications**: Order updates
- **Analytics Dashboard**: Business intelligence
- **Mobile App**: React Native development
- **Inventory Management**: Stock control
- **Multi-language Support**: Internationalization

### 10.2 Technical Improvements
- **Microservices Architecture**: Service decomposition
- **Docker Containerization**: Deployment optimization
- **Redis Caching**: Performance enhancement
- **Elasticsearch**: Advanced search capabilities
- **CI/CD Pipeline**: Automated deployment

---

## XI. KẾT LUẬN

Dự án "Cửa hàng xe máy" đã được phát triển thành công với kiến trúc hiện đại và các tính năng đầy đủ cho một hệ thống thương mại điện tử. Việc sử dụng Spring Boot cho backend và React cho frontend đảm bảo khả năng mở rộng và bảo trì tốt trong tương lai.

### Ưu điểm của dự án:
- **Kiến trúc rõ ràng**: Separation of concerns tốt
- **Bảo mật cao**: JWT + Spring Security
- **UX/UI hiện đại**: Material-UI + TailwindCSS
- **Tích hợp thanh toán**: VNPay gateway
- **Email verification**: Bảo mật tài khoản
- **Responsive design**: Hỗ trợ mobile

### Công nghệ sử dụng đáng chú ý:
- **Java 17** + **Spring Boot 3.4.4**
- **React 19.1.0** + **Vite 6.2.0**
- **MySQL** + **JPA/Hibernate**
- **JWT Authentication**
- **Material-UI** + **TailwindCSS**
- **VNPay Integration**

Dự án này thể hiện sự kết hợp tốt giữa các công nghệ backend và frontend hiện đại, tạo ra một sản phẩm hoàn chỉnh và có thể triển khai thực tế.

---

**Ngày báo cáo**: [Ngày hiện tại]  
**Tác giả**: [Tên tác giả]  
**Phiên bản**: 1.0 