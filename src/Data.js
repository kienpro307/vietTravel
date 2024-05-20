export const userInfoFake = {
  userId: '123456',
  avatar:
    'https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg',
  name: 'Lisa',
  phoneNumber: '0901578833',
  email: 'lisa@gmail.com',
  numOfPlacesVisited: 5,
  numOfLiked: 10,
};

export const userInfoListFake = [
  {
    userId: '123456',
    avatar:
      'https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg',
    name: 'Lisa',
    phoneNumber: '0901578833',
    email: 'lisa@gmail.com',
    numOfPlacesVisited: 5,
    numOfLiked: 10,
  },
  {
    userId: '123456',
    avatar:
      'https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg',
    name: 'Admin',
    phoneNumber: '0901586633',
    email: 'admin@gmail.com',
    numOfPlacesVisited: 5,
    numOfLiked: 10,
  },
];

// Danh sách các địa điểm
export const placesFake = [
  {
    placeId: 'place_1',
    name: 'Chùa Một Cột',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/9/90/One_Pillar_Pagoda_Hanoi.jpg',
      'https://ik.imagekit.io/tvlk/blog/2022/09/chua-mot-cot-1.jpg?tr=dpr-2,w-675',
    ],
    location: 'Số 93A Đội Cấn, Đội Cấn, Ba Đình, Hà Nội, Việt Nam',
    rate: 5,
    summary:
      'Chùa Một Cột được biết đến với rất nhiều tên gọi khác nhau như Diên Hựu Tự, Liên Hoa Đài hay chùa Mật. Đây là một trong số những ngôi chùa Hà Nội cổ kính được xây dựng từ thời vua Lý Thái Tông. ',
    description:
      'Chùa Một Cột có tên ban đầu là Liên Hoa Đài (蓮花臺) tức là Đài Hoa Sen với lối kiến trúc độc đáo: một điện thờ đặt trên một cột trụ duy nhất. Liên Hoa Đài là công trình nổi tiếng nhất nằm trong quần thể kiến trúc Chùa Diên Hựu (延祐寺), có nghĩa là ngôi chùa "Phúc lành dài lâu". Công trình Chùa Diên Hựu nguyên bản được xây vào thời vua Lý Thái Tông mùa đông năm 1049  và hoàn thiện vào năm 1105 thời vua Lý Nhân Tông nay đã không còn. Công trình Liên Hoa Đài hiện tại nằm ở Hà Nội là một phiên bản được chỉnh sửa nhiều lần qua các thời kỳ, bị Pháp phá huỷ khi rút khỏi Hà Nội ngày 11/9/1954 và được dựng lại năm 1955 bởi kiến trúc sư Nguyễn Bá Lăng theo kiến trúc để lại từ thời Nguyễn. Đây là ngôi chùa có kiến trúc độc đáo ở Việt Nam.',
  },
  {
    placeId: 'place_2',
    name: 'Chùa Tam Chúc',
    images: [
      'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/8/16/1081598/297099429_1805714239.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/5/57/Ch%C3%B9a_H%C6%B0%C6%A1ng.jpg',
    ],
    location: 'Thị trấn Ba Sao, xã Khả Phong, huyện Kim Bảng, tỉnh Hà Nam',
    rate: 5,
    summary:
      'Chùa Tam Chúc tọa lạc tại thị trấn Ba Sao, xã Khả Phong, huyện Kim Bảng, tỉnh Hà Nam, cách trung tâm Hà Nội khoảng 60km. Nằm trong trục tam giác “du lịch tâm linh” lớn nhất cả nước, nơi đây được ví như cầu nối giữa chùa Hương - Hà Nội và chùa Bái Đính - Ninh Bình. Chùa nằm trong quần thể khu du lịch Tam Chúc thơ mộng, được bao quanh bởi hồ nước, núi đá, rừng tự nhiên và các thung lũng với tổng diện tích lên tới 5.000 ha',
    description:
      'Được thiên nhiên ưu đãi, Chùa Tam Chúc mang trong mình vẻ đẹp vừa cổ kính, nên thơ, vừa hùng vĩ, tráng lệ, và được mệnh danh là “chốn bồng lai tiên cảnh trên mặt đất”. Chùa có địa thế "Tiền lục nhạn, hậu thất tinh". Gọi là "Tiền lục nhạn" vì mặt trước chùa có 6 quả núi giữa lòng hồ, tương truyền đây là 6 quả chuông mà trời ban, còn "Hậu thất tinh" vì đằng sau chùa có 7 ngọn núi có thể phát sáng khi có ánh sáng vào ban đêm.',
  },
  {
    placeId: 'place_3',
    name: 'Chùa Thành',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/5/57/Ch%C3%B9a_H%C6%B0%C6%A1ng.jpg',
      'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/8/16/1081598/297099429_1805714239.jpg',
    ],
    location:
      'Số 3 đường Hùng Vương, phường Chi Lăng, thành phố Lạng Sơn, tỉnh Lạng Sơn, Việt Nam',
    rate: 4,
    summary: 'Chùa Thành (tên chữ là Diên Khánh Tự) là một ngôi cổ tự',
    description:
      'Chùa do nhân dân quanh vùng lập vào thế kỷ 15, thời Lê sơ. Lúc ấy, chùa có tên là Hương Lâm, nhưng vì ở cạnh Đoàn Thành, nên người dân quen gọi là chùa Thành. Năm 1796, dưới triều vua Cảnh Thịnh, chùa được chuyển về vị trí hiện nay (cách vị trí cũ khoảng 200 mét), tức ở khu vực Bến đá Kỳ Cùng, bên bờ nam sông Kỳ Cùng và cạnh bến đò Thạch Độ (chỗ cầu Kỳ Cùng bây giờ) và lấy tên là Diên Khánh Tự (Diên Khánh có nghĩa là tích thiện để có nhiều phúc cho đời sau). Năm 1846, dưới triều vua Thiệu Trị, chùa đổi tên là Tuần Khánh Tự. Về sau, chùa đổi lại tên cũ là Diên Khánh Tự cho đến ngày nay.',
  },
  // Thêm các địa điểm khác ở đây
];
