-- Dữ liệu mẫu cho bảng comments (giả sử productId = 1 và có một số account)
INSERT INTO comments (accountId, productId, content, rating, created) VALUES
(1, 1, 'Xe rất tốt, thiết kế đẹp và chạy êm. Rất hài lòng với sản phẩm này!', 5, NOW()),
(2, 1, 'Xe ổn, giá cả hợp lý. Tiết kiệm xăng nhưng hơi ồn một chút.', 4, DATE_SUB(NOW(), INTERVAL 5 DAY)),
(3, 1, 'Mình đã sử dụng 3 tháng, xe chạy tốt, bảo hành chu đáo.', 5, DATE_SUB(NOW(), INTERVAL 10 DAY)),
(4, 1, 'Xe đẹp nhưng cốp hơi nhỏ, không chứa được nhiều đồ.', 3, DATE_SUB(NOW(), INTERVAL 15 DAY));

-- Kiểm tra dữ liệu
SELECT c.*, a.username, a.name 
FROM comments c 
JOIN accounts a ON c.accountId = a.id 
WHERE c.productId = 1 
ORDER BY c.created DESC; 