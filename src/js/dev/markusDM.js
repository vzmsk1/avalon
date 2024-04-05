import $ from 'jquery';

$('.news-p__btn').click(function() {
    var id = $(this).attr('data-tab');
    
    $('.news-p__btn.active').removeClass('active'); // 1
    $(this).addClass('active'); // 2
    
   
});


if (window.innerWidth > 768) {
    $('.catalog').each(function () {
		let more = $(this).find('.catalog__categories-all');
		let hide = $(this).find('.catalog__categories-list-inner--two');
		hide.hide(300);
		more.click(function () {
			hide.slideToggle(300);
			more.toggleClass('active');
		});
	});
}