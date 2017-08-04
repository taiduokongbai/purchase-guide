$(function () {
    getGoods();
});

function getGoods() {
    var data = {
        key:"4585247",
        img: "../images/goods3.png",
        intro: "小米6新版手机，智能双摄，值得拥有",
        price: "2500",
        inventory: 99,
    };
    var k = 1;
    for (i = 0; i < 12; i++) {
        var goods = null;
        if (i == (4 * k - 1)) {
            k++;
            goods = `<div class="col-md-3" onclick=(getGoodsDetail(${data.key})) style="width:295px;margin-bottom:20px">
                        <div style="overflow:hidden;height:295px">
                            <img class="goods-pic" src="${data.img}" alt="">
                        </div>
                        <div>
                            <div class="goods-intro">
                                <span>${data.intro}</span>
                            </div>
                            <div class="goods-price">
                                <span>￥</span><span style="font-size:24px">${data.price}</span><span style="margin-right:12px">.00</span>|<span style="margin-left:12px;color:#666666">库存${data.inventory}件</span>
                            </div>
                        </div>
                    </div>`
        } else {
            goods = `<div class="col-md-3" onclick=(getGoodsDetail(${data.key})) style="margin-right:20px;width:295px;margin-bottom:20px">
                        <div style="overflow:hidden;height:295px">
                            <img class="goods-pic" src="${data.img}" alt="">
                        </div>
                        <div>
                            <div class="goods-intro">
                                <span>${data.intro}</span>
                            </div>
                            <div class="goods-price">
                                <span>￥</span><span style="font-size:24px">${data.price}</span><span style="margin-right:12px">.00</span>|<span style="margin-left:12px;color:#666666">库存${data.inventory}件</span>
                            </div>
                        </div>
                    </div>`
        }
        $('#showGoods').append(goods);
    }
    $('#showGoods').children().mouseover(function(){
        $(this).find('img').removeClass("noEnlarge");
        $(this).find('img').addClass("enlarge");
        $(this).addClass("changBroder");
    }).mouseout(function(){
        $(this).find('img').removeClass("enlarge");
        $(this).find('img').addClass("noEnlarge");
        $(this).removeClass("changBroder");
    });
};


function getGoodsDetail(key){
    console.log(key);
}