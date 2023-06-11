# 1. Pagination

## Cách dùng

```js
import Pagination from '@mui/material/Pagination';

//Cái này mình không cần bỏ vào
var blogs; //Tổng data hiển thị
const [currentPage, setCurrentPage] = useState(1); //Trang hiện tại
const [blogsPerPage] = useState(4); //Số data hiển thị trên 1 trang
const indexOfLastBlog = currentPage * blogsPerPage;
//index của thằng cuối cùng trong trang hiện tại đang xét
//ví dụ mình ở trang 3 thì index của thằng cuối là 3*4=12
const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//index của thằng đầu trong trang hiện tại
//chủ yếu tìm thằng đầu với cuối để mình cắt nó ra thành array để hiển thị trên 1 trang
const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
const paginate = (event, value) => {
  setCurrentPage(value);
};
//handle này là sẽ thay đổi state CurrentPage, dẫn tới việc những thằng có sử dụng tính toán bên trên cũng bị thay đổi theo

// =. thằng currentBlogs lúc này cũng đã bị cắt ra theo index đầu và cuối=>
//hiển thị đúng trang mình cần

//code trong component
{
  blogData.length > 3 && (
    <Pagination
      color="secondary"
      shape="rounded"
      defaultPage={1}
      count={Math.ceil(blogData.length / blogsPerPage)}
      //này là để tính số trang cần
      page={currentPage}
      // state của trang hiện tại
      onChange={paginate}
      //handle khi thay đổi trang ở phía trên
      size="large"
    />
  );
}
```
