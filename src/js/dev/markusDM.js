import $ from 'jquery';



$(document).ready(function(){

    $('.news-p__btn').click(function() {
        var id = $(this).attr('data-tab');
        
        $('.news-p__btn.active').removeClass('active'); // 1
        $(this).addClass('active'); // 2
     
    });


    if($(window).width() > 768) { 
        
        $('.catalog').each(function () {
            let more = $(this).find('.catalog__products-button-categories');
            let hide = $(this).find('.catalog__categories-list-wrap--two');
            hide.hide(300);
            more.click(function () {
                hide.slideToggle(400);
                more.toggleClass('active');
            });
        });
    }

  

    $('.catalog__products-button-categories').click(function(){
        if (!$(this).data('status')) {
            $(this).html('скрыть');
          $(this).data('status', true);
        }
        else {
            $(this).html('Смотреть все');
          $(this).data('status', false);
        }
      });
});

