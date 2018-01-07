
$(window).on("scroll", function () {
    scroll_top = $(window).scrollTop();
    $("#num_block").html(scroll_top);
});

var floorId_item =[], //拥有ID的楼层集合
	floorId_item_top = [],  //拥有ID的楼层的子元素距离顶部的距离
	floorTab_item =[];  //导航集合

var a =$(document).find('#nav_block'),
	b =$(document).find('#nav_tab'),
    allFloor = a.children('.floor'),
    allNavtab = b.children('.tab');
    h = $(window);

getFloor = function() {
	for (var i = 0; i <= allFloor.length; i++) {

		var selectedFloor = allFloor.eq(i).attr('id');//获取楼层id

		if(selectedFloor){
			floorId_item.push(selectedFloor);
			floorId_item_top.push($('#'+selectedFloor).offset().top);

		}
	}
}
$(document).ready(getFloor());
//console.log($(allNavtab[2]).children().attr('href'));
swiperFloor = {

	changeSwiper: function() {

		var c = swiperFloor;
		// console.log(floorId_item_top.length);
		// console.log(floorId_item.length);
		for (var i = 0 ; i <= floorId_item_top.length-1; i++) {

			var navTab_now = $('#'+floorId_item[i]),//获取楼层ID
				navTabTop_now = $('#'+floorId_item_top[i]),//获取楼层高度
				navTabLink = $(allNavtab[i]).children();//获取楼层导航条子集

			//console.log(floorId_item_top[i] + navTab_now.height());
			if ( ( floorId_item_top[i] <= h.scrollTop() ) && ( floorId_item_top[i] + navTab_now.height() > h.scrollTop() ) ) {

				var navNow = navTabLink.attr('href');//获取当前导航的地址楼层

				if( navNow == ('#' + floorId_item[i]) ) {
					navTabLink.parent().addClass('on');
				}
			}else {
				navTabLink.parent().removeClass('on');
			}
		}
		
	},
	init: function(){

		var c = swiperFloor;

	    c.changeSwiper();
	}
}

$(window).on("scroll", swiperFloor.init);