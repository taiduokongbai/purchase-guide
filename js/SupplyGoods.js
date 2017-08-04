$(function () {
    getGoods();
    getMenu();
    goodSort()
});

function getGoods() {
    var data = {
        key: "024518",
        img: "../images/goods3.png",
        intro: "小米6新版手机，智能双摄，值得拥有",
        price: "2500",
        inventory: 99,
    };
    var k = 1;
    for (i = 0; i < 12; i++) {
        var goods = null;
        if (i == (3 * k - 1)) {
            k++;
            goods = `<div class="col-md-3" onclick=(getGoodsDetail(${data.key}))>
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
            goods = `<div class="col-md-3" onclick=(getGoodsDetail(${data.key})) style="margin-right:20px">
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
        $('.goods-list').append(goods);
    }
    $('.goods-list').children().mouseover(function () {
        $(this).find('img').removeClass("noEnlarge");
        $(this).find('img').addClass("enlarge");
        $(this).addClass("changBroder");
    }).mouseout(function () {
        $(this).find('img').removeClass("enlarge");
        $(this).find('img').addClass("noEnlarge");
        $(this).removeClass("changBroder");
        //$(this).stop().animate($(this).removeClass("enlarge"), 500 );
    });
}

function getGoodsDetail(key) {
    console.log(key);
}

function getMenu() {
    var data = [
        {
            key: "1",
            title: "服装",
            ChildNode: [
                {
                    key: "1.1",
                    title: "运动"
                },
                {
                    key: "1.2",
                    title: "休闲"
                },
                {
                    key: "1.3",
                    title: "商务"
                }
            ]
        },
        {
            key: "2",
            title: "数码产品",
            ChildNode: [
                {
                    key: "2.1",
                    title: "手机"
                },
                {
                    key: "2.2",
                    title: "电脑"
                },
                {
                    key: "2.3",
                    title: "相机"
                }
            ]
        },
        {
            key: "3",
            title: "食品",
            ChildNode: [
                {
                    key: "3.1",
                    title: "生鲜"
                },
                {
                    key: "3.2",
                    title: "肉类"
                },
                {
                    key: "3.3",
                    title: "蔬菜"
                }
            ]
        }
    ];
    for (i = 0; i < data.length; i++) {
        if (data[i].ChildNode) {
            var nodes = data[i].ChildNode;
            $(".menu").first("ul").append(`<li class="menu-line"></li><li class="menu-li" id="menu-${data[i].key}"><a onclick=spread(${data[i].key})>${data[i].title}</a>
                                <span class="iconfont icon-minus menu-siderbar"></span>
                                    <ul class="menu-li-ul"></ul>
                            </li>`);
        }
        for (j = 0; j < nodes.length; j++) {
            $(".menu").find("#menu-" + data[i].key + " ul").append(`<li onclick="searchGoods(${nodes[j].key})">${nodes[j].title}</li>`);
        }
    }
}

function spread(id) {
    if ($("#menu-" + id + " ul").css("display") == "block") {
        $("#menu-" + id + " ul").hide();
        $("#menu-" + id + " span").removeClass("icon-minus");
        $("#menu-" + id + " span").addClass("icon-plus");
    } else {
        $("#menu-" + id + " ul").show();
        $("#menu-" + id + " span").removeClass("icon-plus");
        $("#menu-" + id + " span").addClass("icon-minus");
    }
}

function searchGoods(key) {
    alert("666")
}


function goodSort() {
    $(".goods-sort>span").click(function () {
        $(this).siblings().removeClass("active-sort");
        $(this).addClass("active-sort");
    });
    $(".sort-choose").click(function () {
        $(this).siblings('.sort-choose').children('span').removeClass("icon-order-invert").removeClass("icon-order-proper").addClass("icon-order-default");
        if ($(this).children('span').hasClass("icon-order-proper")) {
            $(this).children('span').removeClass('icon-order-proper').addClass('icon-order-invert');
        } else {
            $(this).children('span').removeClass('icon-order-default').removeClass('icon-order-proper').addClass('icon-order-proper');
        };
    });
}