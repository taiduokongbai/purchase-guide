/**
 * Created by MW on 2017/5/10.
 */

// $('.second-content').hide();
// $('.third-content').hide();

//菜单
$('.first:gt(0)').click(function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $('.second').removeClass('active').first().addClass('active');
    $('.third').removeClass('active').first().addClass('active');
    $(".second-content").slideDown("slow");
    $(".third-content").slideUp("slow");
    $('.total-price').addClass('active').siblings().removeClass('active');

});

$(".first:first").click(function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $(".second-content").slideUp("slow");
    $(".third-content").slideUp("slow");
    $('.total-price').addClass('active').siblings().removeClass('active');

});

$('.second:gt(0)').click(function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $(".third-content").slideDown("slow");
    $('.third').removeClass('active').first().addClass('active');
    $('.total-price').addClass('active').siblings().removeClass('active');
});

$(".second:first").click(function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $(".third-content").slideUp("slow");
    $('.total-price').addClass('active').siblings().removeClass('active');
});

$('.third').click(function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $('.total-price').addClass('active').siblings().removeClass('active');
});

$('.interval-price').click(function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
});

//排序样式
$('.sort-content').click(function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
});

//点击默认排序，恢复后面的
$('.sort-default').click(function () {
    $(this).siblings('.sort-content').children('span').removeClass('icon-order-invert').removeClass('icon-order-proper').addClass('icon-order-default');
});

//点击时间排序、点击价格排序，恢复价格
$('.sort-choose').click(function () {
    $(this).siblings('.sort-choose').children('span').removeClass('icon-order-invert').removeClass('icon-order-proper').addClass('icon-order-default');
    if($(this).children('span').hasClass('icon-order-proper')) {
        $(this).children('span').removeClass('icon-order-proper').addClass('icon-order-invert');
    } else {
        $(this).children('span').removeClass('icon-order-default').removeClass('icon-order-proper').addClass('icon-order-proper');
    }
});

//图片缩放
$('.change').mouseover(function(){
    $(this).siblings().removeClass('hover');
    $(this).removeClass('nohover');
    $(this).addClass('hover');
}).mouseout(function(){
    $(this).siblings().removeClass('nohover');
    $(this).removeClass('hover');
    $(this).addClass('nohover');
});

$(".return-top").click(function() {
    $('body,html').animate({
            scrollTop: 0
        },
        1000);
    return false;
});

$(window).scroll(function(){
    if($(this).scrollTop()>10){
        $(".return-top").fadeIn('slow')
    }else{
        $(".return-top").fadeOut('slow')
    }
})
