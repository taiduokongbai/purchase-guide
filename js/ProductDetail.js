$(function(){
    let attrImg=['../images/product-bigbanner01.jpg','../images/product-bigbanner02.jpg','../images/product-bigbanner03.jpg','../images/product-bigbanner04.jpg','../images/product-bigbanner05.jpg'];
       $('.product-smallBanner ul li').click(function(){
           var i=$(this).index();
        $('.product-Bigbanner img').attr('src',attrImg[i]); 
        $(".product-smallBanner ol li").eq(i).addClass('current').siblings().removeClass('current');
     })

    //订购数量
        let num=1;
        $('.product-addimg img').click(function(){
            num++;
            $('.product-add s').html(num);
        })
        $('.product-delimg img').click(function(){
            num--;
            if(num<1){
                num=1;
            }
            $('.product-add s').html(num);
        })
   
})