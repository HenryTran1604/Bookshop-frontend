use bookshopdb;
insert into `user` (`username`, `password`, `full_name`, `email`, `avatar_url`, `role`, `active`)
values('admin', 'admin', 'Trần Quang Huy', 'admin@gmail.com', '/static/avatars/Admin.jpg','admin', 1),
('user1', 'user1', 'Trần Văn A', 'A@gmail.com', '/static/web-images/Hung.jpg', 'user',  1),
('user2', 'user2', 'Nguyễn Văn B', 'B@yahoo.com', '/static/web-images/Han.jpg', 'user', 1); 

insert into `category` (`category_name`)
values('Hài hước'),
('Kinh dị'),
('Khoa học viễn tưởng'),
('Trinh thám'),
('Truyện tranh'),
('Tiểu thuyết'),
('Văn học dân gian'),
('Văn học đương đại'),
('Tự lực'),
('Tài liệu tham khảo');

insert into `book` (`title`, `author`, `pages`, `publication_date`, `category_id`, `price`, `image_url`, `description`)
values('Đắc nhân tâm', 'Dale Carnegie', 1000, '2010-07-15', 9, 1500000, '/static/book-covers/DacNhanTam.jpg', 'Quyển sách đưa ra các lời khuyên về cách thức cư xử, ứng xử và giao tiếp với mọi người để đạt được thành công trong cuộc sống'),
('Tuổi trẻ đáng giá bao nhiêu', 'Rosie Nguyễn', 598, '2013-07-15', 10, 200000, '/static/book-covers/TuoiTreDangGiaBaoNhieu.jpg', 'Quyển sách là những câu chuyện của 1 người đã sắp đi qua thời tuổi trẻ của mình để lại những bài học quý giá trên hành trình rèn luyện bản thân, học hỏi, cống hiến'),
('Bố già', 'Mario Puzo', 100, '2012-04-11', 6, 13500,'/static/book-covers/BoGia.jpg','Quyển sách tập trung vào sự biến đổi của cậu con trai út Michael Corleone (Pacino), từ một người ngoài gia đình bất đắc dĩ trở thành trùm mafia tàn nhẫn.'),
('Khi lỗi thuộc về những vì sao', 'John Green', 130, '2000-07-15', 6, 70000,'/static/book-covers/KhiLoiThuocVeNhungViSao.jpg', 'Câu chuyện được kể bằng lời của một cô gái Hazel Grace Lancaster, mắc chứng bệnh ung thư và bị cha mẹ bắt phải tham dự một nhóm giúp đỡ, đây cũng là nơi cô sẽ gặp và đem lòng yêu chàng trai Augustus Waters, một vận động viên bóng rổ trong quá khứ và phải đoạn chi để chữa bệnh.'),
('Người trong lưới', 'Trần Hào Cổ', 250, '2010-07-15', 4, 85000,'/static/book-covers/NguoiTrongLuoi.jpg', 'Câu chuyện trinh thám hấp dẫn, điều tra tỉ mỉ, nhiều kiến thức chuyên ngành mạng'),
('Tớ thích cậu hơn cả Harvard', 'Lan Rua', 132, '2010-07-15', 6, 96000,'/static/book-covers/ToThichCauHonCaHarvard.jpg', 'Một quyển sách ngôn tình sến sẩm'),
('Chân trời góc bể', 'Diệp Lạc Vô Tận', 720, '2010-07-15', 8, 145000,'/static/book-covers/ChanTroiGocBe.jpg', 'Cốt truyện đan xen sủng ngược xuyên suốt chuyện tình giữa 2 nhân vật chính là Trần Lăng và Diêu Băng Vũ mang đến cho người đọc những xúc cảm khó tả.'),
('Bí mật của Naoko', 'Higashino Keigo', 156, '2020-04-05', 4, 50000,'/static/book-covers/BiMatCuaNaoko.jpg', 'Câu truyện trong tiểu thuyết xoay quanh một người đàn ông có vợ con gặp phải một vụ tai nan thảm khốc. Vợ anh qua đời, nhưng khi con gái anh tỉnh dậy sau khi hôn mê, anh đã phát hiện ra linh hồn của người vợ đã mắc kẹt trong thể xác của người con gái.'),
('Mật mã Da Vincii', 'Dan Brown', 781, '2010-07-15', 6, 89500,'/static/book-covers/MatMaDaVincii.jpg', 'Mật mã và viễn tưởng, đáng để đọc'),
('Gatsby Vĩ Đại', 'F.Scott Fitzgera', 1000, '2010-07-15', 6, 20000,'/static/book-covers/GatsbyV_idai.jpg', ''),
('bách dạ hành', 'Higashino Keigo', 1000, '2010-07-15', 6, 45000,'/static/book-covers/BachDaHanh.jpg', 'Truyện kể về quãng thời gian 20 năm của Yukiho và Ryoji sau vụ án mạng, từ hai đứa trẻ mười một tuổi đến tận lúc trưởng thành.'),
('Tôi thấy hoa vàng trên cỏ xanh', 'Nguyễn Nhật Ánh', 300, '2011-01-11', 6, 90000,'/static/book-covers/ToiThayHoaVangTrenCoXanh.jpg', 'Câu chuyện là những trang nhật ký về cuộc sống thường ngày và tâm tư của cậu bé Thiều. Thiều đang là học sinh lớp 7 sống ở một vùng quê nghèo'),
('Cuốn theo chiều gió', 'Margaret Mitchell', 1000, '2010-07-15', 6, 100000,'/static/book-covers/CuonTheoChieuGio.jpg' ,'Một câu chuyện thú vị'),
('Nhà giả kim', 'Dale Carnegie', 1000, '2010-07-15', 7, 15000,'/static/book-covers/NhaGiaKim.jpg', 'Không có'),
('Chí phèo', 'Nam Cao', 1000, '2010-07-15', 7, 30000,'/static/book-covers/ChiPheo.jpg', 'Câu chuyện về xã hội đương đại Việt Nam của thế kỉ trước'),
('Số đỏ', 'Vũ Trọng Phụng', 23, '2010-07-15', 8, 180000,'/static/book-covers/SoDo.jpg', 'Tiểu thuyết này kể về cuộc đời “may mắn” của Xuân - biệt danh là Xuân Tóc đỏ'),
('Truyện Kiều', 'Nguyễn Du', 1000, '2010-07-15', 8, 87000,'/static/book-covers/TruyenKieu.jpg', 'Là kiệt tác của văn chương Việt Nam, viết về cuộc đời của nàng Thúy Kiều'),
('Tuyển tập văn học dân gian', 'Dân gian', 200, '2000-12-12', 7, 150000,'/static/book-covers/TuyenTapVanHocDanGian.jpg', 'Tổng hợp các tác phẩm dân gian Việt Nam'),
('Thỏ bày màu', 'Huỳnh Thái Học', 121, '2022-04-02', 1, 85000,'/static/book-covers/ThoBayMau.jpg', 'Truyện tranh về con thỏ và én'),
('Những người thích đùa', 'Azit Nexin', 90, '1999-08-09', 1, 150000,'/static/book-covers/NhungNguoiThichDua.jpg', 'Truyện hài hước'),
('Iron man', 'Marvel', 200, '2010-05-16', 3, 36000,'/static/book-covers/IronMan.jpg', 'Cuốn sách về siêu anh hùng nhưng không mang sức mạnh đặc biệt'),
('Doraemon tập 10', 'FuJiko Fujio', 70, '2016-10-09', 5, 15000,'/static/book-covers/DoraemonTap10.jpg', 'Truyện tranh Doraemon tập 10');

insert into `purchase`(`user_id`,`purchase_date`, `purchase_status`)
values(2, '2023-01-23', 'on-going'),
(3, '2020-02-12', 'completed'),
(3, '2020-02-13', 'on-going');

insert into `purchase_detail`(`purchase_id`, `book_id`, `Quantity`)
values(1, 1, 10),
(1, 5, 20),
(2, 3, 4);


insert into `comment`(`user_id`, `book_id`, `stars`, `content`, `comment_date`)
values(2, 2, 1, 'Chán', '2023-01-30'),
(2, 5, 5, 'Trên cả tuyệt vời', '2023-02-07'),
(3, 10, 4, 'Cũng tạm', '2020-02-14');