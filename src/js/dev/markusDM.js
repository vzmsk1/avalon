import $ from 'jquery';

$('.news-p__btn').click(function() {
    var id = $(this).attr('data-tab');
    
    $('.news-p__btn.active').removeClass('active'); // 1
    $(this).addClass('active'); // 2
    
   
});