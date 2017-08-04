/**
 * Created by MW on 2017/5/11.
 */
var AddressDialog = (function () {
    function AddressDialog() {
        this.dialogElement = null;
        this.map = null;
        this.districtTime = null;
        this.init();
    }
    AddressDialog.prototype.refreshCountry = function () {
        /*        AddressDialog.$.ajax({
                    type: 'get',
                    url:"http://10.99.2.70:9097/company/list",
                    data: {},
                    success: (json)=>{
                        if(json.data && json.status == 2000){
        
                        }
                        AddressDialog.$('.disable-example',this.dialogElement).selectpicker('refresh');
                    }
                });
                */
    };
    AddressDialog.prototype.refreshProvince = function () {
    };
    AddressDialog.prototype.refreshCity = function () {
    };
    AddressDialog.prototype.refreshCounty = function () {
    };
    AddressDialog.prototype.toHandle = function (name) {
        switch (name) {
            case "country":
                this.refreshCountry();
                /*  AddressDialog.$('.disable-example',this.dialogElement).selectpicker('refresh');*/
                break;
            case "province":
                break;
            case "city":
                break;
            case "county":
                break;
        }
    };
    AddressDialog.prototype.init = function () {
        var _this = this;
        this.initDialog();
        var selectEl = AddressDialog.$(".selectpicker", this.dialogElement);
        var district = AddressDialog.$("input[name=district]", this.dialogElement);
        selectEl.selectpicker();
        selectEl.bind('changed.bs.select', function (e) {
            var name = AddressDialog.$(e.currentTarget).attr("name");
            _this.toHandle(name);
            _this.setPlace(_this.map, _this.getMyValue());
        });
        district.bind("input", function (e) {
            clearTimeout(_this.districtTime);
            _this.districtTime = setTimeout(function () {
                _this.setPlace(_this.map, _this.getMyValue());
            }, 1000);
        });
    };
    AddressDialog.prototype.initDialog = function () {
        var _this = this;
        this.dialogElement = AddressDialog.bootbox.dialog({
            title: "新增收货地址",
            animate: false,
            className: "dialog-address-box shop-dialog",
            show: true,
            message: AddressDialog.$("#address-dialog-xhtml").text(),
            buttons: {
                Cancel: {
                    label: "取消",
                    className: "btn-default",
                    callback: function () {
                        this.modal('hide');
                    }
                },
                OK: {
                    label: "确定",
                    className: "btn-primary",
                    callback: function () {
                        this.modal('hide');
                    }
                }
            }
        });
        this.dialogElement.init(function (e) { return (_this.show()); });
    };
    AddressDialog.prototype.show = function () {
        this.initMap();
    };
    AddressDialog.prototype.initMap = function () {
        var BMap = AddressDialog.BMap;
        // 百度地图API功能
        var map = new BMap.Map("address-map"); // 创建Map实例
        this.map = map;
        map.enableScrollWheelZoom(true);
        //根据IP 定位      // 初始化地图,用城市名设置地图中心点
        new BMap.LocalCity().get(function (result) {
            map.centerAndZoom(result.name, 15);
        });
        /*   var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
               {
                   input: "address-input-hidden",
                   location: map,
                   onSearchComplete: function () {
   
                       console.log("aaa")
                   }
               }
           );
   
   
           ac.addEventListener("onconfirm",(e)=> {    //鼠标点击下拉列表后的事件
               let _value = e.item.value;
               let myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
               this.setPlace(map,this.getMyValue());
           });*/
    };
    AddressDialog.prototype.getMyValue = function () {
        var obj = AddressDialog.$("#address-dialog-form").serializeArray();
        var myValue = "";
        obj.forEach(function (itme, index) {
            myValue += itme.value;
        });
        return myValue;
    };
    AddressDialog.prototype.setPlace = function (map, myValue) {
        var BMap = AddressDialog.BMap;
        map.clearOverlays(); //清除地图上所有覆盖物
        AddressDialog.$("#district-error").text("");
        var local = new BMap.LocalSearch(map, {
            onSearchComplete: myFun
        });
        function myFun() {
            var poi = local.getResults().getPoi(0); //获取第一个智能搜索的结果\
            if (poi) {
                map.centerAndZoom(poi.point, 18);
                map.addOverlay(new BMap.Marker(poi.point)); //添加标注
            }
            else {
                AddressDialog.$("#district-error").text("没有搜索到地址!");
                console.log("没有搜索到地址!");
            }
        }
        local.search(myValue);
    };
    AddressDialog.BMap = window["BMap"] || {};
    AddressDialog.bootbox = window["bootbox"] || {};
    AddressDialog.$ = window["$"] || {};
    return AddressDialog;
}());
AddressDialog.$("#handler-address-dialog").click(function (e) {
    new AddressDialog();
});
