$(function(){
    $(".select-contacts-title-two").on("click",function(){
        var dialog = bootbox.dialog({
            title:"新增临时联系人",
            className:"dialog-add-contact shop-dialog",
            message: $("#dialog-add-contact").html(),
            callback:function (result) {
                console.log('This was logged in the callback: ' + result);
            }
        });
        $(".dialog-add-contact").on("click","#btn_ok",function(){
            // $(".new-invoice-information").css("display:none");
            // $(".new-invoice-information-show").css("display:inline-block");
            dialog.modal('hide');
            
        });
        $(".dialog-add-contact").on("click","#btn_close",function(){
            dialog.modal('hide');
        });

        $('.selectpicker').selectpicker({
            size: 4
        });
    });
    $("#new-invoice").on("click",function(){
        var dialog = bootbox.dialog({
            title:"发票信息",
            className:"dialog-add-invoice shop-dialog",
            message: $("#dialog-add-invoice").html()
        });
        $(".dialog-add-invoice").on("click","#btn_ok",function(){
            // $(".new-invoice-information").css("display:none");
            // $(".new-invoice-information-show").css("display:inline-block");
            dialog.modal('hide');
            
        });
        $(".dialog-add-invoice").on("click","#btn_close",function(){
            dialog.modal('hide');
        });

        $('.selectpicker').selectpicker({
            size: 4
        });
    });
     $(".price-total-right-btn").on("click",function(){
        var dialog = bootbox.dialog({
            className:"dialog-submit shop-dialog",
            message: $("#dialog-submit").html()
        });
        $(".dialog-submit").on("click","#btn_ok",function(){
            dialog.modal('hide');
        });
        $(".dialog-submit").on("click","#btn_close",function(){
            dialog.modal('hide');
        });

        $('.selectpicker').selectpicker({
            size: 4
        });
    });
    
    

});