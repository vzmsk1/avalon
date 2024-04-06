import $ from 'jquery';
$( document ).ready(function() {
    $('.news-p__btn').click(function() {
        var id = $(this).attr('data-tab');
        
        $('.news-p__btn.active').removeClass('active'); // 1
        $(this).addClass('active'); // 2
        
       
    });
    
    $('.catalog__categories-all').click(function(){
        if (!$(this).data('status')) {
            $(this).html('скрыть');
          $(this).data('status', true);
        }
        else {
            $(this).html('Смотреть все');
          $(this).data('status', false);
        }
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

    $('.breadcrumbs__select').each(function () {
        let more = $(this).find('.breadcrumbs__select-btn');
        let hide = $(this).find('.breadcrumbs__select-lists');
        hide.hide(300);
        more.click(function () {
            hide.slideToggle(400);
            more.toggleClass('active');
        });
    });
});
