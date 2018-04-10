$(function(){
    //липкая правая колонка
    $(".sticky").sticky({
        topSpacing: 10,
        zIndex:2,
        stopper: "#stop-sticky"
    });
    //******************************************

    var cardConf = '',
        cardConfWidth = '',
        windowWidth = $(window).width();
    // var confCategoryItem = $('.conf-category__item');
    $(document).on('click', '.conf-list__link', function(e){
        e.preventDefault();
        $this = $(this);
        $this.toggleClass('show-submenu');
        $this.siblings('.conf-list').slideToggle(100);
        // $this.siblings('.conf-list').children('.conf-list__item').find('.conf-form').slideToggle(100);
        cardConf = $('.c-card-configurator'),
        cardConfWidth = cardConf.width();
    });


    $(document).on('click', '.configurator-total__price', function(e){
        e.preventDefault();
        $this = $(this);
        $this.siblings('.configurator-total__body').toggleClass('show-conf-total');
    });

    $(document).on('click', '.configurator-total__del', function(e){
        e.preventDefault();
        $this = $(this);
        $this.parents('.configurator-total__item').remove();
    });




    $(document).on('click', '.conf-list__title', function(e){
        e.preventDefault();
        $this = $(this);
        $this.siblings('.conf-list').slideToggle(100);
    });

    var cardConf = $('.c-card-configurator'),
        cardConfWidth = cardConf.width();

    $(window).resize(function(){
        console.log('Ширина карточки' + cardConfWidth);
    });


});