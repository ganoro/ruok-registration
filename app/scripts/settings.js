/****************************************************************************************
Description: Cấu hình website
*****************************************************************************************/
// Base URL
var baseUrl = '';

// Phiên bản API
var apiVersion = '';

// Đặt lại ease mặc định cho TweenMax
TweenMax.defaultEase = Linear.easeNone;

// Quản lý breakpoint responsive
var jDevices = jRespond([ { label: 'mobile', enter: 0, exit: 767 },{ label: 'tablet', enter: 768, exit: 1023 },{ label: 'desktop', enter: 1024, exit: 10000 } ]);

/****************************************************************************************
Description: Cấu hình website Angular
*****************************************************************************************/
// Số trang hiển thị
var pageVisibleCount = 5;

// Sử dụng html5Mode (History pushState)
var enabledHtml5Mode = false;

// Giới tính
var gender = [
	{key:1, value:'Nam'},
	{key:0, value:'Nữ'}
];