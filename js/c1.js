
$(function () {
    /*--- plus ---*/
    $('button.btn-plus').click(function () {
        var index = $(this).index('.btn-plus'),
            num = $(this).prev().text(),
            addNum = parseInt(num) + 1;
        $(this).prev().text(addNum);
        $(this).prevAll('.btn-sub').removeClass('sub-style')
        if ($('input[name=check-self]').eq(index).prop('checked')) {
            settlePrice(index, addNum);
            checkSingleGoods();
        } else {
            settlePrice(index, addNum);
        }
    })
    /*--- sub ---*/
    $('button.btn-sub').click(function () {
        var index = $(this).index('.btn-sub'),
            num = $(this).next().text(),
            subNum;
        if (num > 1) {
            subNum = parseInt(num) - 1;
        } else {
            subNum = 1;
        }
        subNum == 1 ? $(this).addClass('sub-style') : $(this).removeClass('sub-style')
        $(this).next().text(subNum);
        if ($('input[name=check-self]').eq(index).prop('checked')) {
            settlePrice(index, subNum);
            checkSingleGoods();
        } else {
            settlePrice(index, subNum);
        }
    })
    /*--- settle single goods price ---*/
    var settlePrice = function (index, num) {
        var singlePrice = $('.purchaseOrders-price .integer').eq(index).text() + '.' + $('.purchaseOrders-price .decimal').eq(index).text();
        var totalPrice = singlePrice * 1 * num;
        $('.purchaseOrders-money .integer').eq(index).text(parseInt(totalPrice.toFixed(2)))
        $('.purchaseOrders-money .decimal').eq(index).text(totalPrice.toFixed(2).toString().split('.')[1])
    }
    /*--- check-all ---*/
    $('input[name=checkAll]').bind('click', function () {
        checkAll('checkAll')
    })

    $('input[name=checkAllGoods]').bind('click', function () {
        checkAll('checkAllGoods')
    })
    var checkAll = function (nameVal) {
        if ($('input[name=check-part]').length) {
            if ($('input[name=' + nameVal + ']').prop('checked')) {
                $('input[type=checkbox]').each(function () {
                    $(this).prop('checked', true)
                })
            } else {
                $('input[type=checkbox]').each(function () {
                    $(this).prop('checked', false)
                })
            }
        } else {
            $('input[name=' + nameVal + ']').prop('checked', false)
        }
        checkSingleGoods();
    }
    /*--- check-part ---*/
    $('input[name=check-part]').bind('click', function () {
        var index = $(this).index('input[name=check-part]');
        var identify = $(this).attr('identify')
        if ($('input[name=check-part]').eq(index).prop('checked')) {
            $('input[identify^= ' + identify + ']').each(function () {
                $(this).prop('checked', true)
            })
        } else {
            $('input[identify^= ' + identify + ']').each(function () {
                $(this).prop('checked', false)
            })
            $('input[name=checkAllGoods]').prop('checked', false);
            $('input[name=checkAll]').prop('checked', false);
        }
        checkSingleGoods();
        isCheckAll();
    })

    /*--- check-self ---*/
    $('input[name=check-self]').bind('click', function () {
        var ident = $(this).attr('identify').split('_')[0];
        checkSingleGoods();
        isCheckPart(ident);
    })

    var checkSingleGoods = function () {
        var totalPrice = 0,
            totalNum = 0,
            goodsType = 0,
            sellersNum = 0,
            sellersArr = [];

        for (var i = 0; i < $('input[name=check-self]').length; i++) {
            var identify = $('input[name=check-self]').eq(i).attr('identify').split('_')[0];
            if ($('input[name=check-self]').eq(i).prop('checked')) {
                var goodsPrice = $('.purchaseOrders-money .integer').eq(i).text() + '.' + $('.purchaseOrders-money .decimal').eq(i).text();
                totalPrice += goodsPrice * 1;
                var goodsNum = $('.btn-num').eq(i).text();
                totalNum += goodsNum * 1;
                goodsType++;

                if (sellersArr.indexOf(identify) == -1) {
                    sellersArr.push(identify);
                }
            } else {
                $('input[identify^= ' + identify + '][name=check-part]').prop('checked', false)
                $('input[name=checkAllGoods]').prop('checked', false);
                $('input[name=checkAll]').prop('checked', false);
            }
        }
        $('.total-price .integer').text(parseInt(totalPrice.toFixed(2)));
        $('.total-price .decimal').text(totalPrice.toFixed(2).toString().split('.')[1])
        $('.total-num span').text(totalNum);
        $('.goods-types span').text(goodsType);
        $('.sellers span').text(sellersArr.length)
    }

    var isCheckPart = function (identify) {
        var len_all = $('input[identify^= ' + identify + '_]').length,
            len_checked = $('input[identify^= ' + identify + '_]:checked').length;
        if (len_all == len_checked) {
            $('input[identify=' + identify + '][name=check-part]').prop('checked', true);
        } else {
            $('input[identify=' + identify + '][name=check-part]').prop('checked', false);
        }
        isCheckAll();
    }

    var isCheckAll = function () {
        var len_check_part = $('input[name=check-part]').length;
        var len_checked_part = $('input[name=check-part]:checked').length;
        if (len_check_part == len_checked_part) {
            $('input[name=checkAllGoods]').prop('checked', true);
            $('input[name=checkAll]').prop('checked', true);
        } else {
            $('input[name=checkAllGoods]').prop('checked', false);
            $('input[name=checkAll]').prop('checked', false);
        }
    }

    //弹窗
    $(".purchaseOrders-closebtn").on("click", function () {
        var dialog = bootbox.dialog({
            className: "dialog-delete shop-dialog",
            message: $("#dialog-delete").html(),
        });
        $(".dialog-delete").on("click", "#btn_ok", function () {
            dialog.modal('hide');

        });
        $(".dialog-delete").on("click", "#btn_close", function () {
            dialog.modal('hide');
        });

        $('.selectpicker').selectpicker({
            size: 4
        });
    });

    // 批量删除
    $('.delete-btn').on('click', function () {
        var checked_identify = [];
        for (var i = 0; i < $('input[name=check-self]:checked').length; i++) {
            var identify = $('input[name=check-self]:checked').eq(i).attr('identify');
            $('input[name=check-self]:checked').parent().parent().remove();
            $('input[name=check-part]:checked').parents('.c1-purchaseList').remove();
            if (checked_identify.indexOf(identify) == -1) {
                checked_identify.push(identify);
            } else {

            }
        }
        checkPurchaseOrdersList();
    })

    var checkPurchaseOrdersList = function () {
        if ($('#c1-content').has('.c1-purchaseList').length == 0) {
            $('input[name=checkAllGoods]').prop('checked', false);
            $('input[name=checkAll]').prop('checked', false);
            $('.total-price .integer').text(0);
            $('.total-price .decimal').text(00)
            $('.total-num span').text(0);
            $('.goods-types span').text(0);
            $('.sellers span').text(0)
        } else {

        }
    }

    // 单个商品删除
    /*$('.purchaseOrders-closebtn span').on('click', function(){
        var index = $(this).index('.purchaseOrders-closebtn span');
            identify = $('input[name=check-self]').eq(index).attr('identify');  // 该商品id
        $('.c1-purchaseOrders').eq(index).remove();   // delete 
    })*/
})