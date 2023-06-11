![nextjs](https://www.altamira.ai/wp-content/uploads/2022/12/CSR-vs-SSR-768x432.png.webp)

- [1. Mở đầu](#1-mở-đầu)
  - [2.1 Server Side Rendering (SSR) và Client Side Rendering (CSR)](#21-server-side-rendering-ssr-và-client-side-rendering-csr)
- [3. Kết luận](#3-kết-luận)

# 1. Mở đầu

---

Dạo gần đây mình bắt đầu chuyển dần từ create-react-app và Vite sang create-next-app (vì nhìn nó xịn vcl) nên là cũng phải học mấy cái bản chất của các thằng này, thì cái đầu tiên mình học đó là về SSR (Server Side Rendering) VÀ CSR (Client Side Rendering) để hiểu được tại sao mà thằng React lại chia ra nhiều thằng như thế.

2. Giải thích

---

## 2.1 Server Side Rendering (SSR) và Client Side Rendering (CSR)

- ### Server Side Rendering:
  ![ssr](https://vomanhkien.com/wp-content/uploads/2020/09/ssr.png 'Cách thức hoạt động của Server Side Rendering')
  <p align='center' text=''>
  <i>  Cách thức hoạt động của SSR</i>

</p>
Đây là một khái niệm đã được biết tới từ thời kỳ sơ khai của website.
 Bạn request một trang web, server xử lý nội dung thành HTML, return lại cho browser hiển thị lại lên màn hình. 
 <br/>
 Gọi là Server side render vì phần lớn logic của web sẽ được xử lý ở phía server
Client (người dùng), trung gian là trình duyệt.

- Khi người dùng nhấn vào một trang web, web browser sẽ gửi 1 request đến thằng server.
- server lúc này sẽ chuẩn bị HTML render hết tất cả rồi để cho gửi lại cho thằng Client hiển thị ra màn hình, HTML là chỉ hiển thị thôi nhé, lúc đấy server nó vẫn còn âm thầm tải cả Javascript đến khi xong thì Client mới tương tác được trên web cơ (nhấn button các thứ..) <br/> => Có thể thấy là server là cha, là bố của tất cả khi dùng SSR :)) <br> <br/>

_Cho bạn nào chưa biết thì khi chúng ta code trên máy tính (chạy local host) thì server chính là máy tính của mình luôn. Nhưng nếu chúng ta cần deploy để người khác có thể truy cập thì Server lúc này có hai trường hợp. Một là cái máy to đùng nào đó cả tỷ, hai là dịch vụ Clouding cho phép chúng ta thuê server trên đó. Ở đây web mình hiện tại đang deploy bằng Vercel và dùng server của Vercel luôn._

<br/>
Ơ thế ngày nay máy tính cá nhân hiện tại rất là mạnh rồi, tại sao không để cái việc render đó cho thằng Client xử lý luôn cho thằng Server đỡ nặng việc, lúc này Server chỉ cần xử lý các logic phức tạp thôi? Lại còn giảm được tình trạng quá tải request bên Server nữa. 
Đây là lúc mà Client Side Rendering vào cuộc chơi

![csr](https://vomanhkien.com/wp-content/uploads/2020/09/csr.png)

  <p align='center' text=''>
  <i> Client side rendering</i>

- Khi Client gửi request lên server thì server trả về HTML rỗng và 1 tập tin Javascript cùng mấy cái dữ liệu thô thôi
- Trình duyệt tiến hành chạy file JavaScript này thông qua các Javascript framework (ví dụ dùng React) bằng chính máy của người dùng để render nó ra HTML rồi hiển thị lên màn hình, thế là xong

---

Vậy thì nếu cách thức hoạt động hai thằng khác nhau như thế thì sẽ có điểm mạnh và yếu như thế nào? <br/> Có một câu nói như thế này: <br/>

> “Với kết xuất phía máy chủ (SSR), bất cứ khi nào bạn muốn xem một trang web mới, bạn phải ra ngoài và lấy nó, điều này tương tự như việc bạn lái xe đến siêu thị mỗi khi bạn muốn ăn. Với kết xuất phía khách hàng (CSR), bạn đi đến siêu thị một lần và dành 45 phút dạo quanh để mua một loạt thực phẩm cho tháng. Sau đó, bất cứ khi nào bạn muốn ăn, bạn chỉ cần mở tủ lạnh ” - Adam Zerner

Đọc qua thì cũng hiểu sơ sơ rồi ha :)) Nói không vòng vo thì ban đầu thằng SSR nó load nhanh hơn tí vì nó không cần xử lý với download Javascript còn SSR nó phải tự down rồi tự render ra hết, nhưng sau đó thì bởi vì thế mà CSR nó chuyển trang nhanh vcl mà chả cần load luôn, vào tủ lạnh mà lấy thôi, còn SSR đi tới đâu load tới đó, muốn mua đồ ăn thì vào siêu thị mà mua :)))

**Tổng quát cả hai:**

1. Đối với SSR thời gian khởi tạo ban đầu của trang web là như nhau với mọi người dùng (mạng yếu thì chịu) vì server render ra html hết rồi Browser chỉ hiển thị lên thôi. Còn CSR thì Client chỉ nhận được 1 thằng Javascript rồi dùng framework mà tạo nó ra HTML mới hiển thị được và thời gian nhanh hay chậm tùy vào cấu hình máy của Client, Pay to win <br/>=>Thằng SSR ban đầu nó sẽ load trang nhanh hơn nhưng các lần sau cũng đều sẽ load như thường, còn CSR là kiểu khổ trước sướng sau, render ra hết tất cả trang rồi nên chỉ thời gian chuyển trang rất nhanh (Gọi là Single Page Application- Chỉ cần load 1 trang ban đầu tất cả các trang còn lại có thể truy cập mà không cần full page reload).

2. SSR: Dễ hiểu, dễ code, không cần tách ra front end, back end<br/> CSR: Cần chia front end và back end

3. Điểm lợi nhất của thằng SSR là về SEO (Search Engine Optimization). Nghĩa là cái độ phổ biến của web bạn khi mà hiển thị trên kết quả tìm kiếm của Google. Khi mà thằng Google nó gửi 1 con spider để đi dò trang web, mỗi lần nó đi tới trang web của SSR nó sẽ nhận được đầy đủ nội dung HTML của trang web, nhờ vậy mà nó hiểu được để sắp xếp Indexing cho trang web. Còn trường hợp thằng CSR thì khả năng đọc hiểu Javascript của nó rất chậm (nay đang được cải thiện hơn tí) nên là nó không hiểu được hết nội dung của trang web là cái gì => Khá là khó để lên được search Google<br> **yếu tố này khá quan trọng đối với các website bán hàng hay của các doanh nghiêp, cũng là lý do mà thằng SSR vẫn còn tồn tại tới bây giờ dù thằng CSR mang lại trải nghiệm người dùng rất tốt.**

# 3. Kết luận

---

Việc lựa chọn sử dụng SSR hay CSR sẽ tùy thuộc vào nhu cầu của trang web. Các trang web cần yếu tố SEO cao (như thegioididong, bán đồ các thứ) thì sẽ dùng SSR nhiều còn các trang web ưu tiên về trải nghiệm người dùng như Facebook, Instagram thì sẽ dùng CSR.

![ex](https://toidicodedao.files.wordpress.com/2018/08/netflix-airbnb-airbnb-the-largest-accommodation-provider-owns-no-real-24787760-e1534063448684.png)

<p align='center'> <i>Các trang web sử dụng CSR<i/> <br/>

---

Gõ mỏi tay quá huhu
