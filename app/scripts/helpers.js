/****************************************************************************************
Description: Functions
*****************************************************************************************/
/****************************************************************************************
Description: Đổi số giây sang định dạnh hh:mm:ss
*****************************************************************************************/
Number.prototype.toHHMMSS = function(){
    return ('0'+Math.floor(this/3600) % 24).slice(-2)+':'+('0'+Math.floor(this/60)%60).slice(-2)+':'+('0' + this % 60).slice(-2);
};
/****************************************************************************************
Description: Sắp xếp mảng
arrObj.sortBy("LastName", "FirstName", "-Age")
*****************************************************************************************/
Array.prototype.sortBy = function() {
    function _sortByAttr(attr) {
        var sortOrder = 1;
        if (attr[0] == "-") {
            sortOrder = -1;
            attr = attr.substr(1);
        }
        return function(a, b) {
            var result = (a[attr] < b[attr]) ? -1 : (a[attr] > b[attr]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    function _getSortFunc() {
        if (arguments.length == 0) {
            throw "Zero length arguments not allowed for Array.sortBy()";
        }
        var args = arguments;
        return function(a, b) {
            for (var result = 0, i = 0; result == 0 && i < args.length; i++) {
                result = _sortByAttr(args[i])(a, b);
            }
            return result;
        }
    }
    return this.sort(_getSortFunc.apply(null, arguments));
};
/****************************************************************************************
Description: String.format
*****************************************************************************************/
String.prototype.format = function(){var e=arguments;return this.replace(/\{\{|\}\}|\{(\d+)\}/g,function(t,n){if(t=="{{"){return"{"}if(t=="}}"){return"}"}return e[n]})};
/****************************************************************************************
Description: Cân bằng chiều cao cho các item
*****************************************************************************************/
$.fn.equalizeHeights = function() {
    var maxHeight = this.map(function( i, e ) {
        return $( e ).height();
    }).get();
    return this.height( Math.max.apply( this, maxHeight ) );
};
/****************************************************************************************
Description: Tabs
*****************************************************************************************/
$.fn.tTab = function (settings) {
    var def = {
        fadeSpeed: 100,
        beforeClicked: function(){},
        afterClicked: function(){}
    };
    var opts = $.extend({}, def, settings);
    var myhash = window.location.hash;
    return this.each(function () {
        var options = $.extend({}, opts, $(this).data());
        var self = $(this);
        var tab = self.find(">ul>li");
        var tabItem = self.find(">div");
        //Ẩn nội dung các tab
        tabItem.css({position:'absolute',bottom:0,left:-9999999}).fadeTo(opts.fadeSpeed,0);
        //Hashlink
        if(myhash.length > 0){
            tab.removeClass("active");
            tab.find('a[href="' + myhash + '"]').parent().addClass("active");
            tabItem.find(myhash).css({position:'relative',bottom:'auto',left:'auto'}).fadeTo(opts.fadeSpeed,1);
        }           
        //Nếu tab chưa kích hoạt thì tự động kích hoạt tab đầu tiên
        var hasActive = self.find(">ul>li.active").length;
        if(hasActive == 0){
            tab.first().addClass("active");
            tabItem.first().css({position:'relative',bottom:'auto',left:'auto'}).fadeTo(opts.fadeSpeed,1);
        } 
        else {
            var activeContent = self.find(">ul>li.active a").attr("href");
            self.find(">div" + activeContent).css({position:'relative',bottom:'auto',left:'auto'}).fadeTo(opts.fadeSpeed,1);
        }
        //Sự kiện click vào tab
        tab.on('click', function(event) {
            if($(this).hasClass("active")) return false;
            options.beforeClicked.call(this);
            tab.removeClass("active");
            $(this).addClass("active");
            self.find(">div").css({position:'absolute',bottom:0,left:-9999999}).fadeTo(opts.fadeSpeed,0);
            var activeTab = $(this).find("a").attr("href");
            $(activeTab).css({position:'relative',bottom:'auto',left:'auto'}).fadeTo(opts.fadeSpeed,1);
            options.afterClicked.call(this);
            event.preventDefault();
        });
    });
};
/****************************************************************************************
Description: Tạo google map
*****************************************************************************************/
$.fn.gMap = function(latlondef,zoom,myContent) {
    try {
        //Create Map
        var myLatLong = new google.maps.LatLng(latlondef[0],latlondef[1]);
        var myOptions = {
            zoom: zoom,
            center: myLatLong,              
            mapTypeId: google.maps.MapTypeId.ROADMAP/*,
            styles: [
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [
                    { "color": "#004483" }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    { "color": "#fff" }
                ]
            }]*/
        }
        var myMap = new google.maps.Map($(this).get(0), myOptions);
        //InfoWindow
        var myInfoWinow = new google.maps.InfoWindow({
            content: myContent,
            maxWidth: 350
        });
        //Marker
        var myImage = new google.maps.MarkerImage("images/pointer.png", new google.maps.Size(30, 48), new google.maps.Point(0, 0), new google.maps.Point(24, 30));
        var myMarker = new google.maps.Marker({
            position: myLatLong,
            map: myMap,
            icon: myImage
        });
        //Add events
        google.maps.event.addListener(myMarker, 'click', function (e) {
            myInfoWinow.open(myMap, myMarker);
        });
    }
    catch (ex) {
    }
};
/****************************************************************************************
Description: Custom style for checkbox, radio
*****************************************************************************************/
$.fn.customRadioCheckbox = function () {
    return this.each(function () {
        var $this = $(this),
        $span = $('<span/>');
        $span.addClass('custom-' + ($this.is(':checkbox') ? 'check' : 'radio'));
        $this.is(':checked') && $span.addClass('checked'); // init
        $span.insertAfter($this);
        $this.parent('label').addClass('custom-label').attr('onclick', ''); // Fix clicking label in iOS
        // hide by shifting left
        $this.css({
            position: 'absolute',
            left: '-9999px'
        });
        // Events
        $this.on({
            change: function () {
                if ($this.is(':radio'))
                    $this.parent().siblings('label').find('.custom-radio').removeClass('checked');
                $span.toggleClass('checked', $this.is(':checked'));
            },
            focus: function () {
                $span.addClass('focus');
            },
            blur: function () {
                $span.removeClass('focus');
            }
        });
    });
};
/****************************************************************************************
Description: Arrcordion
param:
autoCollapse (bool): Chỉ cho phép mở rộng 1 item
expandFirstItem (bool): Hiển thị nội dung item đầu tiên
*****************************************************************************************/
$.fn.myAccordion = function (autoCollapse, expandFirstItem) {
    var $accord = this.find('.item');

    if(expandFirstItem){
        $accord.first().find('.question').addClass('expanded');
        $accord.first().find('.answer').show();
    }

    $accord.find('.question').click(function () {
        if ($(this).hasClass('expanded')) {
            $(this).removeClass('expanded');
            $(this).parent().find('.answer').slideUp(200);
            collapse();
        } else {
            if (autoCollapse) {
                $.each($accord.find('.question'), function (i, o) {
                    $(o).removeClass('expanded');
                    $(o).parent().find('.answer').slideUp(200);
                });
            }
            $(this).addClass('expanded');
            $(this).parent().find('.answer').slideDown(200);
        }
    });
};
/****************************************************************************************
Description: Chỉ cho nhập số vào input
*****************************************************************************************/
$.fn.onlyNumber = function () {
    return this.each(function () {
        $(this).bind('keydown paste', function (e) {
            var t = e.which || e.keyCode;
            if ((!e.shiftKey && !e.altKey && !e.ctrlKey && t >= 48 && t <= 57) || (t >= 96 && t <= 105) || t === 109 || t === 110 || t === 8 || t === 9 || t === 13 || t === 35 || t === 36 || t === 37 || t === 39 || t === 46 || t === 45) {
                return true;
            }
            return false;
        });
    });
};
/****************************************************************************************
Description: Không cho nhập dữ liệu vào input text
param:
value (bool): true = lock, false: unlock
*****************************************************************************************/
$.fn.lockInput = function (value) {
    this.each(function () {
        if (value) {
            $(this).keydown(function (e) {
                e.preventDefault();
            });
        } else {
            $(this).unbind('keydown');
        }
    });
};
/****************************************************************************************
Description: Tính số tháng giữa 2 giá trị ngày
*****************************************************************************************/
function monthDiff(dateTo, dateForm) {
    return (dateTo.getMonth()) - (dateForm.getMonth()) + (12 * (dateTo.getFullYear() - dateForm.getFullYear())) + 1;
}
/****************************************************************************************
Description: Bao ngoài các item chỉ định 1 thẻ DIV
*****************************************************************************************/
function autoRow(params) {
    var o = $.extend({
        object: '',
        itemInRow:4,
        className: 'myRow',
        addClearfix: true
    }, params);

    var len = o.object.length;
    var a;
    for (var i = 0; i < len; i += o.itemInRow) {
        a = i + o.itemInRow;
        var d = o.object.slice(i, i + o.itemInRow).wrapAll('<div class="' + o.className + '"></div>');
        if(o.addClearfix){
            d.parent().append("<div class='clearfix'></div>");
        }
    }
}
/****************************************************************************************
Description: Cuộn trang xuống đối tượng chỉ định
*****************************************************************************************/
function scrollToElement(selector, time, verticalOffset) {
    time = typeof(time) != 'undefined' ? time : 1000;
    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = $(selector);
    offset = element.offset();
    offsetTop = offset.top + verticalOffset;
    $('html,body').animate({ scrollTop: offsetTop }, time);
}
/****************************************************************************************
Description: Đổi hệ màu RGB sang HEX
*****************************************************************************************/
function rgbToHex(rgb){
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" + ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    }
/****************************************************************************************
Description: Đổi hệ màu HEX sang RGB
*****************************************************************************************/
function hexToRgb(hex,opacity){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);
    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return result;
}
/****************************************************************************************
Description: Tính độ rộng màn hình
*****************************************************************************************/
function debugScreen(){
    var docW = $(document).width();
    $("#debug").text("").text(docW);
}
/****************************************************************************************
Description: Co giãn chiều rộng/cao theo tỉ lệ
param:
srcWidth (number): 
srcHeight (number):
maxWidth (number):
maxHeight (number):
*****************************************************************************************/
function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth*ratio, height: srcHeight*ratio };
}
/****************************************************************************************
Description: Kiểm tra flash player trên máy
*****************************************************************************************/
function checkFlashInstalled(a,b){
    try{
        a=new ActiveXObject(a+b+'.'+a+b)
    }
    catch(e){
        a=navigator.plugins[a+' '+b]
    }
    return!!a;
}('Shockwave','Flash');
/****************************************************************************************
Description: Kiểm tra phiên bản IE
param:
version (int): số phiên bản.
*****************************************************************************************/
function checkIeVersion(version) {
    var val = false;
    switch (version) {
        case 7:
        val = /MSIE 7/.test(navigator.userAgent);
        break;
        case 8:
        val = /MSIE 8/.test(navigator.userAgent);
        break;
        case 9:
        val = /MSIE 9/.test(navigator.userAgent);
        break;
        case 10:
        val = /MSIE 10/.test(navigator.userAgent);
        break;
        case 11:
        val = /rv:11/.test(navigator.userAgent);
        break;
    }
    return val;
}
/****************************************************************************************
Description: Phát hiện và phân biệt trình duyệt (html class="brower name")
*****************************************************************************************/
function browserDetect() {
    var isExplorer = (navigator.userAgent.indexOf('MSIE') || navigator.userAgent.indexOf('rv:11')) > -1,
    isFirefox = navigator.userAgent.indexOf('Firefox') > -1,
    isSafari = navigator.userAgent.indexOf("Safari") > -1,
    isChrome = navigator.userAgent.indexOf('Chrome') > -1,
    isOpera = navigator.userAgent.indexOf("OPR") > -1,
    isMac = navigator.userAgent.indexOf('Mac OS') > -1;

    if (isMac && isFirefox) {
        $('html').addClass('macFirefox');
    }
    if (isMac && isChrome) {
        $('html').addClass('macChrome');
    }
    if (isExplorer) {
        $('html').addClass('allIe');
    }
    if (isFirefox) {
        $('html').addClass('firefox');
    }
    if (isChrome && isSafari && !isOpera) {
        $('html').addClass('chrome');
    }
    if (!isChrome && isSafari) {
        $('html').addClass('safari');
    }
    if (isOpera) {
        $('html').addClass('opera');
    }
    if (checkIeVersion(7)) {
        $('html').addClass('ie7');
    }
    if (checkIeVersion(8)) {
        $('html').addClass('ie8');
    }
    if (checkIeVersion(9)) {
        $('html').addClass('ie9');
    }
    if (checkIeVersion(10)) {
        $('html').addClass('ie10');
    }
    if (checkIeVersion(11)) {
        $('html').addClass('ie11');
    }
}
/****************************************************************************************
Description: Popup video
params: {
    title (string): Tiêu đề video,
    videoUrl (string): Tập tin video hoặc url youtube,
    pictureUrl (string): Hình ảnh đại diện cho video,
    width (number - optional): Chiều dài video,
    height (number - optional): Chiều cao video,
    autoPlay (bool - optional): Tự động playvideo,
    ratio (string - optional): Tỉ lệ màn hình (16:9, 4:3),
    playerSkin (string - optional): Giao diện player,
    closeOnBg (bool - optional): Tắt popup khi click overlay
}
*****************************************************************************************/
function myPopupVideo(params) {
    if (typeof ($.magnificPopup) === 'undefined') {
        alert('myPopupVideo: Không tìm thấy thư viện magnificPopup');
        return;
    }
    if (typeof (jwplayer) === 'undefined') {
        alert('myPopupVideo: Không tìm thấy thư viện jwplayer');
        return;
    } else {
        var o = $.extend({
            title: 'Video',
            videoUrl: '',
            pictureUrl: '',
            width: '100%',
            height: 439,
            autoPlay: false,
            playerSkin: 'scripts/libs/jwplayer/five.xml',
            closeOnBg: true,
            ratio: '16:9',
            delay:0
        }, params);

        var markup = ['<div id="popupVideoWrap" class="animated magnificPopup magnificPopupVideo">',
        '<div class="headControls">',
        '<h4>'+o.title+'</h4>',
        '</div>',        
        '<div class="embed-responsive embed-responsive-16by9"><div id="popupVideoPlayer" class="embed-responsive-item"></div></div>',
        '<div class="footControls">',
        '<a class="btn btnClosePopup">Đóng</a>',
        '</div>',
        '</div>'
        ].join('');
        $.magnificPopup.open({
            removalDelay: o.delay,
            callbacks: {
                open: function(){
                    this.content.addClass('flipInX');
                },
                beforeClose: function() {
                    this.content.addClass('flipOutX');
                }, 
                close: function() {
                    this.content.removeClass('flipOutX'); 
                }
            },
            items: {
                src: markup,
                type: 'inline'
            },
            closeOnBgClick: o.closeOnBg
        });
        jwplayer('popupVideoPlayer').setup({
            aspectratio: o.ratio,
            file: o.videoUrl,
            image: o.pictureUrl,
            width: o.width,
            height: o.height,
            autostart: o.autoPlay,
            skin: o.playerSkin
        });
    }
}
/****************************************************************************************
Description: Popup thông báo
params: {
    title (string): Tiêu đề,
    content (string): Nội dung,
    closeOnBg (bool - optional): Tắt popup khi click overlay,
    redirecTo (string - optional): Chuyển sang trang chỉ định
}
*****************************************************************************************/
function myPopupAlert(params) {
    if (typeof ($.magnificPopup) === 'undefined') {
        alert('myPopupAlert: Không tìm thấy thư viện magnificPopup');
        return;
    } else {
        var o = $.extend({
            title: 'Thông báo',
            content: '',
            closeOnBg: true,
            delay:0,
            redirecTo: ''
        }, params);
        
        var markup = ['<div id="popupAlertWrap" class="animated magnificPopup magnificPopupAlert">',
        '<div class="headControls">',
        '<h4>'+o.title+'</h4>',
        '</div>',        
        o.content === '' ? '' : '<p class="content">' + o.content + '</p>',
        '<div class="footControls">',
        '<a class="btn btnClosePopupLink">Đóng</a>',
        '</div>',
        '</div>'
        ].join('');

        $.magnificPopup.open({
            removalDelay: o.delay,
            callbacks: {
                open: function(){
                    this.content.addClass('flipInX');
                },
                beforeClose: function() {
                    this.content.addClass('flipOutX');
                }, 
                close: function() {
                    this.content.removeClass('flipOutX'); 
                }
            },
            items: {
                src: markup,
                type: 'inline'
            },
            closeOnBgClick: o.closeOnBg
        });
        $(document).delegate('.btnClosePopupLink', 'click', function () {
            if (o.redirecTo === '') {
                $('.mfp-close').trigger('click');
            } else {
                window.top.location.href = o.redirecTo;
            }
        });
    }
}
/****************************************************************************************
Description: Popup nội dung
params: {
    rel (string): Id đối tượng,
    closeOnBg (bool - optional): Tắt popup khi click overlay,
    width (number - optional): chiều rộng popup
}
*****************************************************************************************/
function myPopupContent(params) {
    if (typeof ($.magnificPopup) === 'undefined') {
        alert('myPopupContent: Không tìm thấy thư viện magnificPopup');
        return;
    } else {
        var o = $.extend({
            rel: '',
            width:700,
            delay:0,
            closeOnBg: true,
            customClass:''
        }, params);

        var $element = $(o.rel);
        if ($element.length > 0) {
            $element.css({maxWidth: o.width});
            $.magnificPopup.open({
                removalDelay: o.delay,
                mainClass: o.customClass,
                callbacks: {
                    open: function(){
                        this.content.addClass('flipInX');
                    },
                    beforeClose: function() {
                        this.content.addClass('flipOutX');
                    }, 
                    close: function() {
                        this.content.removeClass('flipOutX'); 
                    }
                },
                items: {
                    src: o.rel,
                    type: 'inline'
                },
                closeOnBgClick: o.closeOnBg
            });
        } else {
            alert('myPopupContent: Không tìm thấy nội dung!');
            return;
        }
    }
}
function removeStorage(name) {
    localStorage.removeItem(name);
    localStorage.removeItem(name+'_time');
}

function setStorage(name, value, expires) {
    if (expires==undefined || expires=='null') { var expires = 604800; } // default: 1w
    var date = new Date();
    var schedule = Math.round((date.setSeconds(date.getSeconds()+expires))/1000);
    localStorage.setItem(name, value);
    localStorage.setItem(name+'_time', schedule);
}

function getStorage(name) {
    var date = new Date();
    var current = Math.round(+date/1000);
    // Get Schedule
    var stored_time = localStorage.getItem(name+'_time');
    if (stored_time==undefined || stored_time=='null') { var stored_time = 0; }
    // Expired
    if (stored_time < current) {
        // Remove
        removeHtmlStorage(name);
        return 0;
    } else {
        return 1;
    }
}
/****************************************************************************************
Description: Tạo cookie
param: 
name (string): key
value (string): Giá trị
minuteExpires (number): Thời gian tồn tại
*****************************************************************************************/
function setCookie(name, value, minuteExpires, path, domain, secure) {
    var today = new Date();
    today.setTime(today.getTime());
    if (minuteExpires) {
        minuteExpires = minuteExpires * 1000 * 60;
    }
    var expiresDate = new Date(today.getTime() + (minuteExpires));
    document.cookie = name + '=' + escape(value) +
    ((minuteExpires) ? ';expires=' + expiresDate.toGMTString() : '') +
    ((path) ? ';path=' + path : '') +
    ((domain) ? ';domain=' + domain : '') +
    ((secure) ? ';secure' : '');
}
/****************************************************************************************
Description: Lấy thông tin cookie
param: 
name (string): key
*****************************************************************************************/
function getCookie(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return null;
    }
    if (start == -1) return null;
    var end = document.cookie.indexOf(';', len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}
/****************************************************************************************
Description: Xóa cookie
param:
name (string): key,
path (string): path,
domain (string): domain,
*****************************************************************************************/
function deleteCookie(name, path, domain) {
    if (getCookie(name)) document.cookie = name + '=' +
        ((path) ? ';path=' + path : '') +
    ((domain) ? ';domain=' + domain : '') +
    ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}
/****************************************************************************************
Description: Lấy chiều rộng và chiều cao nội dung trang
*****************************************************************************************/
function getDocumentSize(){
    return [Math.max(document.body.scrollWidth, document.documentElement.scrollWidth), Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)];
}
/****************************************************************************************
Description: Lấy chiều rộng và chiều cao cửa sổ trình duyệt
*****************************************************************************************/
function getWindowSize() {
    var myWidth = 0,
    myHeight = 0;
    if (typeof (window.innerWidth) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }
    return [myWidth, myHeight];
}
/****************************************************************************************
Description: Nhúng link youtube vào webiste
*****************************************************************************************/
function embedYoutube(link, options) {
    var o = $.extend({
        width: 480,
        height: 320,
        params: ''
    }, options);
    var id = /\?v\=(\w+)/.exec(link)[1];
    return '<iframe style="visibility:hidden;" onload="this.style.visibility=\'visible\';" class="youtube-video" type="text/html" width="' + o.width + '" height="' + o.height + ' "src="http://www.youtube.com/embed/' + id + '?' + o.params + '&amp;wmode=transparent" frameborder="0" />';
}
/****************************************************************************************
Description: Giới hạn số từ hiển thị
*****************************************************************************************/
function limitWords(text, nWords) {
    var words = text.split(' ');
    words.splice(nWords, words.length - 1);
    return words.join(' ') + (words.length !== text.split(' ').length ? '...' : '');
}
/****************************************************************************************
Description: Tạo số ngẫu nhiêu giữa 2 giá trị cho trước (Số thực)
*****************************************************************************************/
function randomRangeFloat(min, max) {
    return Math.random() * (max - min) + min;
}
/****************************************************************************************
Description: Tạo số ngẫu nhiêu giữa 2 giá trị cho trước (Số nguyên)
*****************************************************************************************/
function randomRangeInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
/****************************************************************************************
Description: Convert sang số nguyên
*****************************************************************************************/
function parseIntEx(value) {
    var num = isNaN(parseInt(value)) ? 0 : parseInt(value);
    return num;
}
/****************************************************************************************
Description: Convert sang số thực
*****************************************************************************************/
function parseFloatEx(value) {
    var num = isNaN(value) ? 0 : value;
    return num;
}
/****************************************************************************************
Description: Lấy querystring url
*****************************************************************************************/
function getQueryString(url, name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}
/****************************************************************************************
Description: QueryString trên hashtag
*****************************************************************************************/
function getHashParams() {
    var params = {};
    window.location.hash.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
        params[key] = value;
    });
    return params;
}
/****************************************************************************************
Description: Thay thế dấu + trên URL thành %2B
param:
url (string): Url website
*****************************************************************************************/
function escapeURIparam(url) {
    if (encodeURIComponent) url = encodeURIComponent(url);
    else if (encodeURI) url = encodeURI(url);
    else url = escape(url);
    url = url.replace(/\+/g, '%2B'); // Force the replacement of "+"
    return url;
};
/****************************************************************************************
Description: Mở cửa sổ mới của trình duyệt
param:
winWidth (int): Chiều rộng,
winHeight (int): Chiều cao,
url (string): Url website
*****************************************************************************************/
function openWindow(winWidth, winHeight, url) {
    var w = ($(window).width() - winWidth) / 2;
    var h = ($(window).height() - winHeight) / 2;
    newParameter = "width=" + winWidth + ",height=" + winHeight + ",addressbar=no,scrollbars=yes,toolbar=no,top=" + h + ",left=" + w + ", resizable=no";
    newWindow = window.open(url, "a", newParameter);
    newWindow.focus();
}