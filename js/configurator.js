$(function(){
    // var confCategoryItem = $('.conf-category__item');
    $(document).on('click', '.conf-list__link', function(e){
        e.preventDefault();
        $this = $(this);
        $this.toggleClass('show-submenu');
        $this.siblings('.conf-list').slideToggle(100);
    });

    $(document).on('click', '.conf-list__title', function(e){
        e.preventDefault();
        $this = $(this);
        $this.siblings('.conf-list').slideToggle(100);
    });


});