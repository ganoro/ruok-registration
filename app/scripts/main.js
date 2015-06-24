var mainJs = (function(){
	var items;
	var ind=0;
	var old=0;
	var delta;
	var topItem;
	var listItem;
	var topInd=0;
	var start=0;
	function scrollOver(){
		$("body,html").animate({scrollTop:0});
			$("#startName").focus();
			items=$(".item-scroll");
			$(".item-scroll").removeClass("active");
			$(items[0]).addClass("active");
			var h3=$(window).scrollTop();
			items.each(function(e){
				var h4= $(this).offset().top;
				if(h4>h3+100 && h4<h3+$(window).height()-300){
					$(".item-scroll").removeClass("active");
					$(items[e]).addClass("active");
					ind=old=e;
				}
			})
			$(window).scroll(checkValue);
			
		
	};
	function checkValue(){
		if($("#startName").val()!=""){
			var h3= $(items[old]).offset().top;
			var h1 = $(window).scrollTop();
			var h2 = $(items[ind]).offset().top;
			if(delta<h1){
				if(h2<h1+100){
					ind++;
					if(ind>items.length-1){
						ind--;
					}
					$(items[old]).removeClass("active");
					$(items[ind]).addClass("active");
					$(items[ind]).find("input").focus();

					keyind=$(items[ind]).find("input").attr("rel");
					old=ind;
				}
			}else{
				if(h2+$(items[old]).height()>h1+$(window).height()-100){
					ind--;
					if(ind<0) ind=0;
					$(items[old]).removeClass("active");
					$(items[ind]).addClass("active");
					$(items[ind]).find("input").focus();
					keyind=$(items[ind]).find("input").attr("rel");
					old=ind;
				}
			}
			
			delta=h1;
		}else{

		}
	};
	
	function checkTop(){

		var h1= $(window).scrollTop();
		var h2=$(topItem[topInd]).offset().top;
	
		var h3=$(topItem[topInd]).closest(".question-row").height()-100+h2;
		if(h1>h2){
			$("#header-section .question-row").html("");
				$(topItem[topInd]).appendTo("#header-section .question-row");
				$("#header-section").animate({top:0});
		}
		if(h1<h2){
			topInd--;
			if(ind<0){
				ind=0;
				$("#header-section").animate({top:-200});
			}
		}
		if(h1>h3){
			topInd++;
			if(ind>topItem.length-1){
				ind=topItem.length-1;
				$("#header-section").animate({top:-200});
			}
		}
	};
	function checkscroll(){
		
					var h= $(document).height();
					var w= $(window).height();
					if($(window).scrollTop()> h-w-200){
						$("#btn-group-style").fadeIn();
						$("#footer-submit").animate({bottom:0});
					}else{
						$("#footer-submit").animate({bottom:-300});
					}
				listItem.each(function(){
		
			var a=this;
		
				var h1= $(window).scrollTop();
				var h2=$(a).offset().top;
			
				var h3=$(a).closest(".question-row").height()+h2;
				if(h1>h2 && h1<h3){
						$("#header-section .question-row").html("<h3>"+$(a).html()+"</h3>");
						
						$(a).addClass("active");
				}else{
					$(a).removeClass("active");
					
				}

			
		});	
				
	};
	function init(){
		listItem = $(".pin-top");
		topItem=$(".pin-top");
		if($("#startName").val()==""){
					var h= $(document).height();
					var w= $(window).height();
					$("#getname").removeClass("active");
					$("#question-section").fadeOut();
					$(".btn-top,.btn-down").removeClass("ok").addClass("no-ok");
				}else{
					$("#question-section").fadeIn();
					$("#btn-group-style").fadeIn();
					$("#getname").addClass("active");
					$(".btn-top,.btn-down").removeClass("no-ok").addClass("ok");
				}
		$(".form-control input").each(function(){
			if($(this).val()==""){
				$(this).closest(".form-control").removeClass("active");
			}
		});
		$(".form-control input").each(function(){
			if($(this).val()==""){
				$(this).closest(".item-scroll").find(".view-btn").removeClass("active").fadeOut();
			}else{
				$(this).closest(".item-scroll").find(".view-btn").addClass("active").fadeIn();
			}
		});
		$(".form-control input").keyup(function(){
			if($(this).val()==""){
				$(this).closest(".item-scroll").find(".view-btn").removeClass("active").fadeOut();
			}else{
				$(this).closest(".item-scroll").find(".view-btn").addClass("active").fadeIn();
			}
		});
		$(".form-control input").focusin(function(){
			$(this).closest(".form-control").addClass("active");
		});
		$(".form-control input").focusout(function(){
			if($(this).val()==""){
				$(this).closest(".form-control").removeClass("active");
			}else{

			}
			
		});
		var lazyLayout = _.throttle(checkscroll, 500,false);

		$(window).scroll(lazyLayout);
		$("#getname").click(function(){
			if($("#startName").val()==""){
				$(".message").addClass("active");
				$("#question-section").fadeOut();
				$(".btn-top,.btn-down").removeClass("ok").addClass("no-ok");
			}else{
				$(".message").removeClass("active");
				$("#question-section").fadeIn();
				$(".btn-top,.btn-down").removeClass("no-ok").addClass("ok");
			}
		});
		$("#startName").keyup(function(){
			if($("#startName").val()==""){
				$(".message").addClass("active");
				$("#question-section").fadeOut();
				$("#btn-group-style").fadeIn();
				$("#getname").removeClass("active");
				$(".btn-top,.btn-down").removeClass("ok").addClass("no-ok");
			}else{
				$(".message").removeClass("active");
				$("#btn-group-style").fadeIn();
				$("#getname").addClass("active");
				$("#question-section").fadeIn();
				$(".btn-top,.btn-down").removeClass("no-ok").addClass("ok");
			}
		});
		$(".form-control input[type=text]").focusin(function(){
			if(!$(this).closest(".item-scroll").hasClass("active")){
				keyind=$(this).attr("rel");
				if(keyind>1)
				$("body,html").animate({scrollTop:$(keyitems[keyind-1]).closest(".item-scroll").offset().top});
			}
			

		});
		$(".check-div").click(function(){
			if(!$(this).closest(".item-scroll").hasClass("active")){
				keyind=$(this).closest(".item-scroll").find(".col-sm-3:first-child input").attr("rel");
				if(keyind>1)
				$("body,html").animate({scrollTop:$(keyitems[keyind]).closest(".item-scroll").offset().top});
			}
		});
		$("#start-btn").click(function(){
			$("#question-wrapper").fadeIn();
			$("#start-wrapper").fadeOut();
			start=1;
			setTimeout(function(){
				scrollOver();

			},500);
			
		});
		$(".check-div").click(function(){
			if($(this).hasClass("active")){

			}else{
				$(this).closest(".check-box-section").find(".check-div").removeClass("active");
				$(this).closest(".check-box-section").find(".check-div input").removeAttr("checked");
				$(this).addClass("active");
				$(this).find("input").attr("checked","checked");

			}
		});
		$(".view-btn .btn,.check-div").click(function(){
			if($(this).closest(".item-scroll").hasClass("active")){
				var h=$(this).closest(".item-scroll").offset().top;
				$("body,html").animate({scrollTop:h});
			}
		});
		$(".btn-top").click(function(){
			if($(this).hasClass("ok")){
				var h= $(".item-scroll.active").offset().top-400;
				$("body,html").animate({scrollTop:h});
			}
			if($(this).hasClass("no-ok")){
				$("body,html").animate({scrollTop:0});
			}
		});
		$(".btn-down").click(function(){
			if($(this).hasClass("ok")){
				var h= $(".item-scroll.active").offset().top;
				$("body,html").animate({scrollTop:h});
			}
			if($(this).hasClass("no-ok")){
				var h= $(document).height();
				$("body,html").animate({scrollTop:h});
			}
		});
		scrollAtTop();
		coundAnswer();
		$(".btn-line").click(function(){
			reset();
		});
		keypress();
		setInterval(function(){
			$(".pin-top").each(function(){
				if($(this).closest(".question-row").find(".item-scroll.active").length>0){
					$(this).addClass("active2");
				}else{
					$(this).removeClass("active2");
				}
			});
			if($(window).scrollTop()<10){
				$(".btn-top").fadeTo(0.5,0.5);
			}else{
				$(".btn-top").fadeTo(1,1);
			}
			if($(window).scrollTop()>$(document).height()-$(window).height()-100){
				$(".btn-down").fadeTo(0.5,0.5);
			}else{
				$(".btn-down").fadeTo(1,1);
			}
		},500);
	};
	var minhkt=0;
	var maxhkt=0;
	function scrollAtTop(){
		
		
		setInterval(function(){
			if($(".pin-top.active").length>0 ){
				$("#header-section").animate({top:0});
			}else{
				$("#header-section").animate({top:-200});
				//$("#alert-submit").fadeOut();
			}
		},1000);
	};
	var iit;
	var count=0;
	function coundAnswer(){
		iit=$(".item-scroll");
		$(".progress-bar").width(0);
		$("#sum").html(iit.length);
		$("#count").html(count);
		
		setInterval(function(){
			count=0;
			iit.each(function(){
				if($(this).find(".form-control input").length>0){
					if ($(this).find(".form-control input").val()!="") {
						count++;
						
					}
				}else{
					if ($(this).find(".check-div.active").length>0) {
						count++;
					}
				}
			});
			$(".progress-bar").width(count/iit.length*100+"%");
			$("#count").html(count);
            var missing = missingMandatory();
			$("#sum-number").html(missing);
		},500);
	};
	var keyitems;
	var keyind=0;
	function keypress(){
		keyitems=$(".itemkey");
		$(document).keyup(function(e){
			if(e.keyCode==38){
                        if($("#startName").val()==""){
                        	$("body,html").animate({scrollTop:0});
                        }else{
                        	
                        	keyind--;
                        	if(keyind<0) keyind=0;
                        	$(keyitems[keyind]).focus();
                        	if(keyind==0){
                        		$("body,html").animate({scrollTop:$(keyitems[keyind]).closest(".item-scroll").offset().top-200});
                        	}else{
                        		if($(keyitems[keyind]).closest(".item-scroll").find(".check-div").length>0){
                        			$("body,html").animate({scrollTop:$(keyitems[keyind-1]).closest(".item-scroll").offset().top});
                        		}else{
                        			$("body,html").animate({scrollTop:$(keyitems[keyind-1]).closest(".item-scroll").offset().top-50});
                        		}
                        		
                        	}
                        	
                        }
                  }
                  if(e.keyCode==40){
                        if($("#startName").val()==""){
                        	$("body,html").animate({scrollTop:10000});
                        }else{
                        	keyind++;
                        	if(keyind>keyitems.length-1) keyind--;
                        	$(keyitems[keyind]).focus();
                        	$("body,html").animate({scrollTop:$(keyitems[keyind-1]).closest(".item-scroll").offset().top});
                        }
                  }
                   if(e.keyCode==13){
                   		if(start==0){
                   			$("#question-wrapper").fadeIn();
							$("#start-wrapper").fadeOut();
							start=1;
							setTimeout(function(){
								scrollOver();

							},500);
                   		}else{
                   			if($("#startName").val()==""){
	                        	$("body,html").animate({scrollTop:10000});
	                        }else{
	                        	keyind++;
	                        	if(keyind>keyitems.length-1){
	                        		keyind--;
	                        		$("body,html").animate({scrollTop:$(document).height()});
	                        	} else{
	                        		if(keyind==1){
		                        		$(keyitems[keyind]).focus();
		                        		$("body,html").animate({scrollTop:$(keyitems[keyind-1]).closest(".item-scroll").offset().top});
		                        	}else{
		                        		$(keyitems[keyind]).focus();
		                        		$("body,html").animate({scrollTop:$(keyitems[keyind-1]).closest(".item-scroll").offset().top});

		                        	}
	                        	}
	                        	
	                        	
	                        }
                   		}
                  }
		});

		$("#submit-btn").click(function(){
			if(!$("#startName").val()==""){
				var missing = missingMandatory();
                if(missing == 0){
					$("#alert-submit").fadeOut();
					$("#thankyou-section").fadeIn();
					$("#question-wrapper").fadeOut();                   
                    addCustomer();
				}else{
					$("#alert-submit").fadeIn();
					$("#sum-number").html(missing);
				}
			}else{
				$("#alert-submit").fadeIn();
                $("#sum-number").html(1);
			}
		})

	};
    
    function addCustomer() {
        var mandatory = ["full_name", "primary_number", "secondary_number", "checkin_time", "state", "address", 
                         "contact1_name", "contact1_phone", "contact1_email", "contact2_name", "contact2_phone", "contact2_email"];
        
        var user = { is_self: 'true' };
        _.each(mandatory, function(key, i) {
            user[key] = $($('input[rel]')[i]).val();
        });
        
        create('Users', user);
    }
    
    function create(collection, object) {
        var url = "https://script.google.com/macros/s/AKfycbyEb1I71iIUogV14MAFUVEAdsBTR2QlqLaOXSd-cR2_uH2D808/exec";
        var operation = "?action=create&sheet=" + collection;
        var key = "&key=B6EC82FB-6564-4AAC-B3D7-BF8B45A1A551";
        $.post(url + operation + key, JSON.stringify(object));
    }
    
    function missingMandatory() {
        var mandatory = [1, 3, 4, 6, 7, 8];
        var c = 0;
        _.each(mandatory, function(i) {
            c += $($('input[rel]')[i]).val().length > 0 ? 1 :0;  
        });
        return mandatory.length - c;
    }
    
	function reset(){
		$(".item-scroll input").val("");
		$("body,html").animate({scrollTop:0});
		$(".check-div").removeClass("active").find("input").removeAttr("checked");
		$("#question-wrapper").fadeOut();
		$("#start-wrapper").fadeIn();
		window.location.reload();
	};

	return {
		init:init
	}
})();

$(function(){
	mainJs.init();
})