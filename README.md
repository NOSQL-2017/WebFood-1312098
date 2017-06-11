# Project - *Go AWAY*

**project-1312098** là repository cho đồ án nhóm. Nhóm tối đa 4 thành viên.

Thành viên:
* [x] **1312098** - Phùng Văn Dũng - dungvatoi12 - dungvatoi12@gmail.com - 100%

URL: **URL hosting của bài tập**
Báo cáo: **URL Github Page của đề tài**

## Yêu cầu

Trong đề tài, sinh viên cần mô tả các chức năng có thể thực hiện bên dưới. Sinh viên check vào các mục bên dưới và ghi mã sinh viên đã làm vào chức năng theo mẫu. Mục nào ko có MSSV là tính điểm theo nhóm. Cần sắp xếp các chức năng bên dưới theo thứ tự MSSV đã thực hiện.

Yêu cầu **GIT**
* [x] Có sử dụng GIT.
* [ ] Sử dụng GIT theo Centralized Workflow.
* [ ] Sử dụng GIT theo Feature Branch Workflow.
* [ ] Sử dụng GIT theo Gitflow Workflow.

## Mô tả chung ứng dụng
Ứng dụng cho phép người dùng đăng ảnh và chia sẻ ảnh với người dùng khác. Sinh viên có thể phát triển ứng dụng theo nhiều hướng như tạo thành mạng xã hội chia sẻ ảnh (Instagram), website chia sẻ ảnh (Flickr), nơi bán ảnh (500px) hoặc các ứng dụng cho phép người dùng tạo ảnh nền,...

Sau khi thực hiện xong giai đoạn 1, sinh viên sẽ được cung cấp một số yêu cầu nâng cao để cải tiến hệ thống.

## Lập trình server
### MVC
* [ ] MVC 
* [ ] Config 
* [x] REST routing 
* [ ] Layout & partial 

### Lập trình dữ liệu
+ Cassandra:
* [x] Thêm người dùng
* [ ] Xóa 
* [ ] Sửa 
* [ ] Tìm kiếm 
+ Mongo:
* [x] Thêm 
* [x] Xóa 
* [ ] Sửa 
* [x] Tìm kiếm 
+ Neo4j:
* [x] Thêm 
* [x] Xóa 
* [ ] Sửa 
* [x] Tìm kiếm 
+ ElasticSearch:
* [x] Thêm 
* [ ] Xóa 
* [ ] Sửa 
* [x] Tìm kiếm 
+ Redis:
* [x] Thêm 
* [x] Xóa 
* [ ] Sửa 
* [x] Tìm kiếm 

### Xử lý lỗi
* [x] Xử lý lỗi trong cùng trang web 
* [x] Xử lý lỗi dùng trang web riêng 
   * [ ] 401 (MSSV1)
   * [x] 404 (MSSV1)
   * [x] 500 (MSSV1)

### Tương tác API khác
Liệt kê các API nhóm đã sử dụng được ở đây
* [ ] Facebook API: mô tả (MSSV1)
* [ ] Google API: mô tả (MSSV1)
* [ ] ...

## Lập trình client
* [x] Sử dụng frameword React + Redux


## Bảo mật
* [x] Sử dụng Token khi đăng ký và đăng nhập vào trang web.
* [ ] Phân quyền sử dụng một số trang web với nhiều vai trò khác nhau (MSSV1)
   * [ ] Không cho phép thao tác vào trang web khi không có quyền (MSSV1)
   * [ ] Thể hiện các chức năng khác nhau trên cùng giao diện khi người dùng có quyền khác nhau (MSSV1)
   * [ ] Thể hiện lỗi khi không truy xuất được trang khi không có quyền (MSSV1)

## Cải tiến hệ thống với NoSQL
* [ ] Chứng thực (Key-value)
* [ ] Quản lý tập tin (Key-value hoặc Document)
* [ ] Quản lý quan hệ của người dùng (Graph Database)
* [ ] Theo dõi truy xuất của hệ thống (Column Family)
* [ ] Cân bằng tải ứng dụng bằng proxy
* [x] Quản lý thông tin ảnh bằng redis
* [x] Quản lý danh sách ảnh của người dùng bằng mongodb.
* [x] Quản lý người dùng bằng Cassandra.
* [x] Quản lý theo dõi, thích ảnh bằng Neo4j

## Nâng cao
* [ ] ...

## Chức năng đã thực hiện
Các **yêu cầu chức năng** (check và ghi MSSV vào các phần chức năng đã thực hiện)
* [x] Upload hình ảnh.
* [x] Xem lại hình đã upload.
* [x] Xem cộng đồng đăng hình ảnh.
* [x] Theo dõi người dùng.
* [x] Tìm kiếm theo họ tên.
* [x] Xem hình ảnh của những người mình đã theo dõi.

## Chức năng
Các **yêu cầu chức năng** (check và ghi MSSV vào các phần chức năng đã thực hiện)
* [ ] Yêu cầu 1. (MSSV1)

## Chú ý: 
* Khi chạy lần đầu cần cài các module cho tất cả server lẫn client.
* Khi khởii chạy docker-compose lần đầu cần chạy lại reduxintagrams, webmongo để khởi tạo cơ sở dữ liệu.
* Khi chạy nếu bị lỗi slow của mongodb thì cần tắt cả 2 mongodb và webmongo chờ cho chạy xong hết rồi chạy lại.

## Demo

Link ảnh GIF demo ứng dụng:

![Video Walkthrough](demo.gif)

Tạo ảnh GIF với chương trình [LiceCap](http://www.cockos.com/licecap/).


## License

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
