//===================================================================
// 文件名:		AiOBox.js
// 版权:		Copyright (C) 2011 Elong
// 创建人:		weiliang.li
// 创建日期:	2011-5-9
// 描述:		All in One Search
// 备注:		
// 示例代码：
//
//    基本用法

//===================================================================
//var AiOBox = Elong.Control.AiOBox;
//AiOBox = Class.create();
//Object.extend(AiOBox.prototype, {
//    name: "AiOBox",
//    windowElement: null,
//    timeout: null,
//    errtimeout: null,
//    resultData: null,
//    selectItem: null,
//    currentCity: null,
//    hotCacheList: null,
//    dataCacheList: null,
//    KeyCode: {
//        Left: 37,
//        Up: 38,
//        Right: 39,
//        Down: 40,
//        Del: 46,
//        Tab: 9,
//        Return: 13,
//        Esc: 27,
//        Command: 188,
//        PageUp: 33,
//        PageDown: 34,
//        BackSpace: 8,
//        Tab: 9
//    },
//    m_Hot: new Template("<div style=\"width:#{HotWidth}px;\" class=\"com_hotresults\"><div style=\"width:100%;\"><div class=\"hotel_near\">#{HotData}</div></div><div class=\"clear\"></div><div class=\"com_cbox_b com_cbox_lt\"></div><div class=\"com_cbox_b com_cbox_rt\"></div><div class=\"com_cbox_b com_cbox_lb\"></div><div class=\"com_cbox_b com_cbox_rb\"></div><div class=\"clear\"></div></div>"),
//    m_Result: new Template("<div style=\"width:#{DataWidth}px;position:relative;\" class=\"com_results com_hotel_results\"><div style=\"width: 100%;\">#{Default}<ul method=\"ulData\">#{Data}</ul></div><div class=\"clear\"></div><div class=\"com_cbox_b com_cbox_lt\"></div><div class=\"com_cbox_b com_cbox_rt\"></div><div class=\"com_cbox_b com_cbox_lb\"></div><div class=\"com_cbox_b com_cbox_rb\"></div><div class=\"clear\"></div></div>"),
//
//    options: {
//        eventElement: null,
//        lang: "cn",
//        cityId: "0101",
//        onSelect: null,
//        onClose: null,
//        hotWidth: 300,
//        hotHeight: 138,
//        searchWidth: 260,
//        hotData: null,
//        cityData: null,
//        colLen: 4,          //一排的个数
//        maxLen: 10,          //搜索最大显示个数
//        enableSearch: true,
//        delay: 200,
//        isJsonp: 0,
//        resultNextId: "",
//        searchUrl: "http://travel.elong.com/hotel/keywordssuggest.html",
//        hotUrl: "http://openapi.elong.com/suggest/hotsuggest.html",
//        aioType: 0    //AllInOne修改，添加类型区分地标和名称。地标：1;名称：2;无类型:0   hjl 2012-3-30
//    },
//    //初始化
//    initialize: function (options) {
//        Object.extend(Object.extend(this, this.options), options);
//        this.hotCacheList = new Array();
//        this.eventElement.attr("datacheck", "");
//        this.eventElement.attr("selectIndex", -1);
//        this.eventElement.unbind("click");
//        this.eventElement.unbind("keyup");
//        this.eventElement.bind("click", this.onInputClick.bindAsEventListener(this));
//        this.eventElement.bind("keyup", this.onInputKeyUp.bindAsEventListener(this));
//        this.setHotSuggest(this.cityId);
//    },
//
//    getSelect: function () {
//        return this.selectCity;
//    },
//
//    setHotSuggest: function (cityId) {
//        if (!String.isNullOrEmpty(cityId)) {
//            //初始化
//            if (this.eventElement != null) {
//
//                var isCached = false;
//
//                for (var i = 0; i < this.hotCacheList.length; i++) {
//                    if (this.hotCacheList[i].CityId == this.cityId) {
//                        this.currentCity = this.hotCacheList[i];
//                        isCached = true;
//                        break;
//                    }
//                }
//                if (!isCached) {
//                    simpleAjax.callBack(this.hotUrl, "cityId=" + this.cityId + "&language=" + this.lang, function (data) {
//                        var cacheItem = { CityId: this.cityId, Data: data };
//                        this.hotCacheList.push(cacheItem);
//                        this.currentCity = cacheItem;
//                        //this.eventElement.trigger("click"); //当数据返回时促发点击事件
//
//                    } .bind(this), true, "get", (this.isJsonp == "1") ? "jsonp" : "json");
//                }
//            }
//        }
//    },
//
//    destroyDOM: function () {
//        this.windowElement = null;
//        this.contentEndRegion = null;
//        this.options = null;
//    },
//
//    initializeEvent: function () {
//        if (this.windowElement) {
//            this.windowElement.bind("click", this.onClickRegion.bindAsEventListener(this));
//            this.windowElement.bind("mouseout", this.onMouseOutRegion.bindAsEventListener(this));
//            this.windowElement.bind("mouseover", this.onMouseOverRegion.bindAsEventListener(this));
//            FunctionExt.defer(this.onOutClick.bindAsEventListener(this), 100);
//        }
//    },
//
//    destroyEvent: function () {
//        this.windowElement.unbind("click");
//        this.windowElement.unbind("mouseout");
//        this.windowElement.unbind("mouseover");
//    },
//
//
//    buildHtml: function (keyword) {
//        var temp = encodeURIComponent(keyword.toLowerCase());
//        var url = this.searchUrl;
//        if (this.isJsonp == 0) {
//            var appPath = "";
//            var host = window.location.host;
//            if (host.toLowerCase().indexOf("travel.elong") > -1) {
//                var path = window.location.pathname;
//                var pathtemp = path.split("/");
//                if (pathtemp.length > 1)
//                    appPath = "/" + pathtemp[1];
//            }
//            url = appPath + "hotsuggest.html";
//        }
//        if (this.windowElement) {
//            this.windowElement.remove();
//        }
//        this.contentEndRegion = $("#m_contentend");
//        this.windowElement = $("<div  style=\"display:none; position: absolute; z-index: 2000;\"></div>").appendTo(this.contentEndRegion);
//        var defaultHtml = "<div class='tuijian'><p method='fromArea' keyword='" + keyword + "'>地点在<strong> " + keyword + "</strong> 附近的酒店</p><p method='fromName' keyword='" + keyword + "'></tt>名称含 <strong>" + keyword + "</strong> 的酒店</p></div>";
//        this.windowElement.html(this.m_Result.eval({
//            DataWidth: this.searchWidth,
//            Default: defaultHtml,
//            Data: ""
//        }));
//
//        this.initializeEvent();
//        this.render();
//        //拆分AllInOne hjl 2012.4.5->>根据类型搜索，多个类型用逗号隔开
//        var queryString = "q=" + temp + "&limit=" + this.maxLen + "&cityid=" + this.cityId + "&language=" + this.lang;
//        if (this.aioType == 2) {
//            queryString += "&type=5,9";
//        }
//        else if (this.aioType == 1) {
//            queryString += "&type=1,2,3,6,99";
//        }
//
//        simpleAjax.callBack(url, queryString, function (data) {
//            this.eventElement[0]["Data"] = null;
//            if (data != null && data.length > 0) {
//                this.eventElement.attr("TypeId", "");
//                this.eventElement.removeAttr("firstSType");
//                this.resultData = data || [];
//                this.selectItem = this.resultData[0];
//                this.eventElement[0]["Data"] = this.resultData[0];
//
//                //有suggest时，把suggest的第一个类型保存到元素中,由此判断是否有suggest
//                this.eventElement.attr("firstSType", this.resultData[0].Type);
//                this.eventElement.attr("firstSPId", this.resultData[0].PropertiesId);
//                if (!String.isNullOrEmpty(this.resultData[0].Lat) && !String.isNullOrEmpty(this.resultData[0].Lng)) {
//                    this.eventElement.attr("firstSLat", this.resultData[0].Lat);
//                    this.eventElement.attr("firstSLng", this.resultData[0].Lng);
//                }
//
//                if (this.ie6FilterIFrame != null) {
//                    Globals.closeIE6Fliter(this.ie6FilterIFrame);
//                }
//                var listResult = [];
//                var liTypeList = [{ "type": "0", "list": "1, 2, 3, 999, 100, 0", "icon": "grass" }, { "type": "1", "list": "6", "icon": "district" }, { "type": "2", "list": "5,9", "icon": "hotel" }, { "type": "3", "list": "4", "icon": ""}];
//
//                for (var i = 0; i < this.resultData.length; i++) {
//                    var termArr = new Array();
//                    termArr = keyword.split(' ');
//                    var hightResult = this.resultData[i].Name;
//                    for (var j = 0; j < termArr.length; j++) {
//                        if ($.trim(termArr[j]).length > 0) {
//                            hightResult = this.highlight(hightResult, $.trim(termArr[j]))
//                        }
//                    }
//                    var highName = hightResult;
//                    var bigType = -1;
//                    var icon = ""
//                    for (var k = 0; k < liTypeList.length; k++) {
//                        var arrSubType = liTypeList[k].list.split(','); //子分类
//                        for (var l = 0; l < arrSubType.length; l++) {
//                            if (arrSubType[l] == this.resultData[i].Type) {
//                                bigType = liTypeList[k].type;
//                                icon = liTypeList[k].icon;
//                                break;
//                            }
//                        }
//                    }
//
//                    var containIndex = -1; //是否包含
//                    for (var m = 0; m < listResult.length; m++) {
//                        if (listResult[m].type == bigType) {
//                            listResult[m].value = listResult[m].value + " <li method=\"liData\" data=\"" + i + "\" class=\"ac_odd\"><i></i><span method=\"spanData\" data=\"" + i + "\" typeid=\"" + this.resultData[i].Type + "\">" + highName + "</span></li>";
//                            containIndex = bigType;
//                            break;
//                        }
//                    }
//                    if (containIndex == -1) {
//                        listResult.push({
//                            "type": bigType,
//                            "value": "<li method=\"liData\" data=\"" + i + "\" class=\"ac_odd\"><i class=\"" + icon + "\"></i><span method=\"spanData\" data=\"" + i + "\" typeid=\"" + this.resultData[i].Type + "\">" + highName + "</span></li>"
//                        })
//                    }
//                }
//                var dataSb = new StringBuilder();
//                for (var i = 0; i < listResult.length; i++) {
//                    dataSb.append(listResult[i].value);
//                }
//                this.windowElement.html(this.m_Result.eval({
//                    DataWidth: this.searchWidth,
//                    Default: defaultHtml,
//                    Data: dataSb.toString()
//                }));
//
//                this.windowElement.attr("winstyle", "data");
//
//            } else {
//                //输入值变化，为匹配suggest时，清空两个属性
//                this.eventElement.removeAttr("firstSType");
//                this.eventElement.removeAttr("firstSPId");
//                this.eventElement.removeAttr("firstSLat");
//                this.eventElement.removeAttr("firstSLng");
//                //                if (this.windowElement) {
//                //                    this.windowElement.hide();
//                //                }
//            }
//        } .bind(this), true, "GET", (this.isJsonp == "1") ? "jsonp" : "json");
//    },
//
//    buildHotHtml: function () {
//        this.reloadData();
//        //与语言相关的参数的处理
//
//        if (this.windowElement) {
//            this.windowElement.remove();
//        }
//        this.contentEndRegion = $("#m_contentend");
//        this.windowElement = $("<div style=\"display:none; position: absolute; z-index: 2000;\"></div>").appendTo(this.contentEndRegion);
//
//        var hotNameSb = new StringBuilder();
//        var hotDataSb = new StringBuilder();
//        if (this.currentCity != null && !Object.isNull(this.currentCity.Data) && this.currentCity.Data.length > 0) {
//            for (var i = 0; i < this.currentCity.Data.length; i++) {
//                var t = this.currentCity.Data[i].Type;
//                if (this.aioType == 1 && (t == 1 || t == 2 || t == 3)) {
//                    hotDataSb.append("<p>");
//                    hotDataSb.append("<tt class=\"t14 bold\">" + this.currentCity.Data[i].Name + "</tt><br />");
//                    for (var j = 0; j < this.currentCity.Data[i].TypeNameList.length; j++) {
//                        hotDataSb.append(" <span method=\"hotData\"  data=\"" + i + "|" + j + "\">" + this.currentCity.Data[i].TypeNameList[j].Name + "</span>");
//                    }
//                    hotDataSb.append("</p>");
//                } else if (this.aioType == 2 && t == 5) {
//                    if (this.currentCity.Data[i].TypeNameList.length > 0) {
//                        hotDataSb.append("<p>");
//                        hotDataSb.append("<tt class=\"t14 bold\">" + this.currentCity.Data[i].Name + "</tt><br />");
//                        for (var j = 0; j < this.currentCity.Data[i].TypeNameList.length; j++) {
//                            hotDataSb.append(" <span method=\"hotData\"  data=\"" + i + "|" + j + "\">" + this.currentCity.Data[i].TypeNameList[j].Name + "</span>");
//                        }
//                        hotDataSb.append("</p>");
//                    } else {
//                        this.windowElement.remove();
//                        return false;
//                    }
//                }
//                if (this.aioType == 0) {
//                    hotDataSb.append("<p>");
//                    hotDataSb.append("<tt class=\"t14 bold\">" + this.currentCity.Data[i].Name + "</tt><br />");
//                    for (var j = 0; j < this.currentCity.Data[i].TypeNameList.length; j++) {
//                        hotDataSb.append(" <span method=\"hotData\"  data=\"" + i + "|" + j + "\">" + this.currentCity.Data[i].TypeNameList[j].Name + "</span>");
//                    }
//                    hotDataSb.append("</p>");
//                }
//            }
//            if (String.isNullOrEmpty(hotDataSb.toString())) {
//                this.windowElement.remove();
//                return false;
//            }
//            this.windowElement.html(this.m_Hot.eval({
//                HotData: hotDataSb.toString(),
//                HotWidth: this.hotWidth
//            }));
//        }
//        this.windowElement.attr("winstyle", "hot");
//    },
//    highlight: function (value, term) {
//        return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<b>$1</b>");
//    },
//    reloadData: function () {
//        if (this.windowElement) {
//            this.windowElement.remove();
//            if (this.ie6FilterIFrame != null) {
//                Globals.closeIE6Fliter(this.ie6FilterIFrame);
//            }
//        }
//    },
//    onInputClick: function (evt) {
//        if (!Object.isNull(this.currentCity) && this.windowElement == null) {
//            this.buildHotHtml();
//            this.initializeEvent();
//            this.render();
//            this.eventElement.select();
//        }
//    },
//    onInputKeyUp: function (evt) {
//        if (!this.enableSearch)
//            return;
//        var element = Event.element(evt);
//        if (this.windowElement && this.windowElement.attr("winstyle") == "data") {
//            var ulData = this.windowElement.find("ul[method='ulData']");
//            var select = this.windowElement.find("ul[method='ulData'] li[class*='ac_over']");
//            switch (evt.keyCode) {
//                case this.KeyCode.Up:
//                    {
//                        select.removeClass("ac_over");
//                        if (select.prev("li").length > 0)
//                            select.prev("li").addClass("ac_over");
//                        else
//                            this.windowElement.find("ul[method='ulData'] li:last").addClass("ac_over");
//                        ulData.scrollTop((select.offset().top - ulData.offset().top) < ulData.height() - 30 && (select.offset().top - ulData.offset().top) > 0 ? (select.offset().top - ulData.offset().top) : select.offset().top);
//                        var select = this.windowElement.find("ul[method='ulData'] li[class*='ac_over']");
//                        this.selectData(select);
//                    }
//                    break;
//                case this.KeyCode.Down:
//                    {
//                        select.removeClass("ac_over");
//                        if (select.next("li").length > 0)
//
//                            select.next("li").addClass("ac_over");
//                        else
//                            this.windowElement.find("ul[method='ulData'] li:first").addClass("ac_over");
//                        ulData.scrollTop((select.offset().top - ulData.offset().top) > ulData.height() - 30 ? 0 : (select.offset().top - ulData.offset().top));
//                        var select = this.windowElement.find("ul[method='ulData'] li[class*='ac_over']");
//                        this.selectData(select);
//                    }
//                    break;
//                case this.KeyCode.Return:
//                    {
//                        var select = this.windowElement.find("ul[method='ulData'] li[class*='ac_over']");
//                        this.selectData(select);
//                    }
//                    break;
//                default:
//                    clearTimeout(this.timeout);
//                    this.timeout = setTimeout(function () { this.reBuildData(element); } .bind(this), this.delay);
//            }
//        }
//        else {
//            switch (evt.keyCode) {
//                case this.KeyCode.Up:
//                case this.KeyCode.Down:
//                case this.KeyCode.Left:
//                case this.KeyCode.Right:
//                case this.KeyCode.Return: { }
//                    break;
//                default:
//                    {
//                        clearTimeout(this.timeout);
//                        this.timeout = setTimeout(function () { this.reBuildData(element); } .bind(this), this.delay);
//                    }
//            }
//        }
//        evt.stopPropagation();
//    },
//
//    reBuildData: function (evt) {
//        var element = evt;
//        if (!String.isNullOrEmpty(this.cityId)) {
//            if (String.isNullOrEmpty(element.val())) {
//                //输入值变化，为匹配suggest时，清空四个属性
//                this.eventElement.removeAttr("firstSType");
//                this.eventElement.removeAttr("firstSPId");
//                this.eventElement.removeAttr("firstSLat");
//                this.eventElement.removeAttr("firstSLng");
//                this.buildHotHtml();
//                this.initializeEvent();
//                this.render();
//            }
//            else {
//                this.buildHtml(element.val());
//            }
//        }
//    },
//
//    onOutClick: function () {//由绑定一次one，改为每次绑定bind，确保点击弹窗外时，弹窗关闭
//        $(document).bind("click", function (evt) {
//            var element = Event.element(evt);
//            if (this.windowElement != null && this.windowElement.find("*").index(element) == -1 && (this.eventElement[0] != element[0] && this.eventElement.find("*").index(element)==-1)) {
//                this.dispose();
//            }
//        } .bindAsEventListener(this));
//    },
//
//    selectData: function (elem) {
//        if (!String.isNullOrEmpty(elem.attr("data"))) {
//            var selectData;
//            if (this.windowElement.attr("winstyle") == "hot") {
//                var pos = elem.attr("data").split("|");
//                var m_TypeName = decodeURIComponent(this.currentCity.Data[pos[0]].TypeNameList[pos[1]].Name);
//                this.eventElement.val(m_TypeName);
//                this.eventElement.attr("datacheck", elem.attr("data"));
//                selectData = this.currentCity.Data[pos[0]].TypeNameList[pos[1]];
//                selectData.Accept = true;
//            }
//            else {
//                var pos = elem.attr("data");
//                var m_TypeName = this.resultData[pos].Name;
//                this.eventElement.val(m_TypeName);
//                this.eventElement.attr("datacheck", pos);
//                this.eventElement.attr("selectIndex", pos);
//                selectData = this.resultData[pos];
//                selectData.Accept = true;
//            }
//
//            this.selectItem = selectData;
//            this.eventElement[0]["Data"] = selectData;
//            this.eventElement.attr("TypeId", selectData.Type);
//            if (this.onSelect) {
//                this.onSelect(this.eventElement, selectData);
//            }
//            this.eventElement.focus();
//            if (!String.isNullOrEmpty(this.resultNextId)) {
//                //$("#" + this.resultNextId).focus();
//            }
//            //this.dispose();
//        }
//    },
//    onClickRegion: function (evt) {
//        var elem = Event.element(evt);
//        var method = elem.attr("method");
//        if (method == null || method == "") {
//            elem = elem.parent();
//            method = elem.attr("method");
//        }
//        switch (method) {
//            case "hotData":
//                this.selectData(elem);
//                this.directSearch(this.selectItem); //AllInOne中点击推荐直接搜索
//                return;
//            case "liData":
//            case "spanData":
//                this.selectData((method == "liData") ? elem : elem.parent());
//                this.directSearch(this.selectItem); //AllInOne中点击推荐直接搜索
//                return;
//            case "fromArea":
//                if (this.directSearch) {
//                    this.eventElement.attr("selectIndex", "-5");
//                    this.directSearch({ Name: elem.attr("keyword"), Type: 99, PropertiesId: 0, Lat: 0, Lng: 0, Accept: true }); //位置中搜索
//                }
//                return;
//            case "fromName":
//                if (this.directSearch) {
//                    this.eventElement.attr("selectIndex", "-6");
//                    this.directSearch({ Name: elem.attr("keyword"), Type: 9, PropertiesId: 0, Lat: 0, Lng: 0, Accept: true }); //名称中搜索
//                }
//                return;
//            case "close":
//                this.dispose();
//                return;
//            default:
//                this.dispose();
//                return;
//        }
//    },
//
//    onMouseOverRegion: function (evt) {
//        var element = Event.element(evt);
//        if (this.outTimer != null) {
//            clearTimeout(this.outTimer);
//            this.outTimer = null;
//        }
//        this.removeAllClass(element);
//        if (element.is("li") || element.parent().is("li")) {
//            var focus = element.is("li") ? element : element.parent();
//            focus.removeClass("ac_odd");
//            focus.addClass("ac_even ac_over");
//            //focus.siblings("li[class*=ac_over]").removeClass("ac_over");
//        }
//        /*this.selectData(element);*/
//    },
//    removeAllClass: function (element) {
//        if (element.is("li") || element.parent().is("li")) {
//            var focus = element.is("li") ? element : element.parent();
//            focus.removeClass("ac_even ac_over");
//            focus.addClass("ac_odd");
//            focus.siblings("li[class*=ac_over]").removeClass("ac_even ac_over");
//        }
//        else {
//            this.windowElement.find("li").removeClass("ac_even ac_over");
//        }
//    },
//    onMouseOutRegion: function (evt) {
//        /*var element = Event.element(evt);
//        var method = element.attr("method");
//        if (element.is("li") || element.parent().is("li")) {
//        var focus = element.is("li") ? element : element.parent();
//        focus.removeClass("ac_over");
//        }*/
//    },
//
//    render: function () {
//        // 设置大小位置    
//        if (this.windowElement) {
//
//            var top = this.eventElement.offset().top + this.eventElement.height() + 6;
//            var left = this.eventElement.offset().left;
//
//            var scroll = Globals.getScrollPosition();
//            var browserRegion = Globals.browserDimensions();
//            if (browserRegion.width - (this.eventElement.offset().left - scroll.x) > this.windowElement.width()) {
//                this.windowElement[0].style.top = top + "px";
//                this.windowElement[0].style.left = left + "px";
//            }
//            else {
//                this.windowElement[0].style.top = top + "px";
//                left = left - this.windowElement.width() + this.eventElement.width();
//                this.windowElement[0].style.left = left + "px";
//            }
//
//            this.ie6FilterIFrame = Globals.addIE6Filter(this.windowElement.width(), this.windowElement.height(), left, top, 1999);
//            this.windowElement.show();
//        }
//    },
//    dispose: function () {
//        if (this.windowElement) {
//            //this.windowElement.fadeOut("normal");
//            this.windowElement.hide();
//            FunctionExt.defer(function () {
//                if (this.windowElement) {
//                    Globals.closeIE6Fliter(this.ie6FilterIFrame);
//
//                    if (this.windowElement.attr("winstyle") == "data") {
//                        if (this.onClose != null) {
//                            this.onClose(this.eventElement, this.windowElement);
//                        }
//                    }
//                    this.windowElement.remove();
//                    this.destroyEvent();
//                    this.destroyDOM();
//
//                }
//            } .bind(this), 500);
//        }
//    }
//});
//
//var AiOWindow = Elong.Control.AiOWindow;
//AiOWindow = Class.create();
//Object.extend(AiOWindow.prototype, {
//    name: "AiOWindow",
//    aioSearch: null,
//    options: {
//        eventElement: null,
//        lang: "cn",
//        resultNextId: "",
//        cityId: "0101",
//        onSelect: null,
//        directSearch:null,
//        onClose: null,
//        hotWidth: 300,
//        hotHeight: 138,
//        searchWidth: 260,
//        delay: 200,
//        maxLen: 10,          //搜索最大显示个数
//        enableSearch: true,
//        isJsonp: 0,
//        searchUrl: "http://travel.elong.com/hotel/keywordssuggest.html",
//        hotUrl: "http://openapi.elong.com/suggest/hotsuggest.html",
//        aioType: 0    //AllInOne修改，添加类型区分地标和名称。地表：1;名称：2;无类型:0   hjl 2012-3-30
//    },
//    //初始化
//    initialize: function (options) {
//        Object.extend(Object.extend(this, this.options), options);
//        //if (options.aioType == 0) return false;
//        this.aioSearch = new AiOBox(options);
//        //this.AiOWindow.bind("click", this.testOnSelect.bindAsEventListener(this));
//    },
//
//    getSelect: function () {
//        return this.aioSearch.getSelect();
//    },
//    setHotSuggest: function (cityId) {
//        this.aioSearch.setHotSuggest();
//    }
//});
///*
// * jQuery  HotelSuggest Autocomplete plugin 1.1
// *
// * Copyright (c) 2010 
// *
// * Dual licensed under the MIT and GPL licenses:
// *   http://www.opensource.org/licenses/mit-license.php
// *   http://www.gnu.org/licenses/gpl.html
// *
// * Revision: $Id: jquery.autocomplete.js 15 2009-08-22 10:30:27Z joern.zaefferer $
// */
//
//;(function($) {
//	
//$.fn.extend({
//	HotelSuggest: function(urlOrData, options) {
//		var isUrl = typeof urlOrData == "string";
//		options = $.extend({}, $.HotelAutoCompleter.defaults, {
//			url: isUrl ? urlOrData : null,
//			data: isUrl ? null : urlOrData,
//			delay: isUrl ? $.HotelAutoCompleter.defaults.delay : 10,
//			max: options && !options.scroll ? 10 : 150
//		}, options);
//		
//		// if highlight is set to false, replace it with a do-nothing function
//		options.highlight = options.highlight || function(value) { return value; };
//		
//		// if the formatMatch option is not specified, then use formatItem for backwards compatibility
//		options.formatMatch = options.formatMatch || options.formatItem;
//		
//		return this.each(function() {
//			new $.HotelAutoCompleter(this, options);
//		});
//	},
//	result: function(handler) {
//		return this.bind("result", handler);
//	},
//	search: function(handler) {
//		return this.trigger("search", [handler]);
//	},
//	flushCache: function() {
//		return this.trigger("flushCache");
//	},
//	setOptions: function(options){
//		return this.trigger("setOptions", [options]);
//	},
//	unautocomplete: function() {
//		return this.trigger("unautocomplete");
//	}
//});
//
//$.HotelAutoCompleter = function(input, options) {
//
//	var KEY = {
//		UP: 38,
//		DOWN: 40,
//		DEL: 46,
//		TAB: 9,
//		RETURN: 13,
//		ESC: 27,
//		COMMA: 188,
//		PAGEUP: 33,
//		PAGEDOWN: 34,
//		BACKSPACE: 8
//	};
//
//	// Create $ object for input element
//	var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);
//
//	var timeout;
//	var previousValue = "";
//	var cache = $.HotelAutoCompleter.Cache(options);
//	var hasFocus = 0;
//	var lastKeyPressCode;
//	var config = {
//		mouseDownOnSelect: false
//	};
//	var select = $.HotelAutoCompleter.Select(options, input, selectCurrent, config);
//	
//	var blockSubmit;
//	
//	// prevent form submit in opera when selecting with return key
//	$.browser.opera && $(input.form).bind("submit.autocomplete", function() {
//		if (blockSubmit) {
//			blockSubmit = false;
//			return false;
//		}
//	});
//	
//	// only opera doesn't trigger keydown multiple times while pressed, others don't work with keypress at all
//	$input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete", function(event) {
//		// a keypress means the input has focus
//		// avoids issue where input had focus before the autocomplete was applied
//		hasFocus = 1;
//		// track last key pressed
//		lastKeyPressCode = event.keyCode;
//		switch(event.keyCode) {
//		
//			case KEY.UP:
//				event.preventDefault();
//				if ( select.visible() ) {
//					select.prev();
//				} else {
//					onChange(0, true);
//				}
//				break;
//				
//			case KEY.DOWN:
//				event.preventDefault();
//				if ( select.visible() ) {
//					select.next();
//				} else {
//					onChange(0, true);
//				}
//				break;
//				
//			case KEY.PAGEUP:
//				event.preventDefault();
//				if ( select.visible() ) {
//					select.pageUp();
//				} else {
//					onChange(0, true);
//				}
//				break;
//				
//			case KEY.PAGEDOWN:
//				event.preventDefault();
//				if ( select.visible() ) {
//					select.pageDown();
//				} else {
//					onChange(0, true);
//				}
//				break;
//			
//			// matches also semicolon
//			case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
//			case KEY.TAB:
//			case KEY.RETURN:
//				if( selectCurrent() ) {
//				    if(options.isSubmit)
//				    {
//				        return true;
//				    }else
//				    {
//				        	// stop default to prevent a form submit, Opera needs special handling
//		                 event.preventDefault();
//			             blockSubmit = true;
//			             return false;
//				    }
//				
//				}else
//				{
//				    select.hide();
//				}
//				break;
//				
//			case KEY.ESC:
//				select.hide();
//				break;
//				
//			default:
//				clearTimeout(timeout);
//				timeout = setTimeout(onChange, options.delay);
//				break;
//		}
//	}).focus(function(){
//		// track whether the field has focus, we shouldn't process any
//		// results if the field no longer has focus
//		hasFocus++;
//	}).blur(function() {
//		hasFocus = 0;
//		if (!config.mouseDownOnSelect) {
//			hideResults();
//		}
//	}).click(function() {
//		// show select when clicking in a focused field
//		if ( hasFocus++ > 1 && !select.visible() ) {
//			onChange(0, true);
//		}}).bind("search", function() {
//		// TODO why not just specifying both arguments?
//		var fn = (arguments.length > 1) ? arguments[1] : null;
//		function findValueCallback(q, data) {
//			var result;
//			if( data && data.length ) {
//				for (var i=0; i < data.length; i++) {
//					if( data[i].result.toLowerCase() == q.toLowerCase() ) {
//						result = data[i];
//						break;
//					}
//				}
//			}
//			if( typeof fn == "function" ) fn(result);
//			else $input.trigger("result", result && [result.data, result.value]);
//		}
//		$.each(trimWords($input.val()), function(i, value) {
//			//request(value, findValueCallback, findValueCallback);
//		});
//	}).bind("flushCache", function() {
//		cache.flush();
//	}).bind("input",function() {
//		// fix firefox chinese input
//		clearTimeout(timeout);
//		timeout = setTimeout(onChange, options.delay);
//		//onChange(0, true);
//	}).bind("setOptions", function() {
//		$.extend(options, arguments[1]);
//		// if we've updated the data, repopulate
//		if ( "data" in arguments[1] )
//			cache.populate();
//	}).bind("unautocomplete", function() {
//		select.unbind();
//		$input.unbind();
//		$(input.form).unbind(".autocomplete");
//	});
//	
//	
//	function selectCurrent() {
//		var selected = select.selected();
//		if( !selected )
//			return false;
//		var v=selected;
//		previousValue = v;
//		
//		if ( options.multiple ) {
//			var words = trimWords($input.val());
//			if ( words.length > 1 ) {
//				var seperator = options.multipleSeparator.length;
//				var cursorAt = $(input).selection().start;
//				var wordAt, progress = 0;
//				$.each(words, function(i, word) {
//					progress += word.length;
//					if (cursorAt <= progress) {
//						wordAt = i;
//						return false;
//					}
//					progress += seperator;
//				});
//				words[wordAt] = v;
//				// TODO this should set the cursor to the right position, but it gets overriden somewhere
//				//$.HotelAutoCompleter.Selection(input, progress + seperator, progress + seperator);
//				v = words.join( options.multipleSeparator );
//			}
//			v += options.multipleSeparator;
//		}
//		$input.focus();
//        var finalText = $('<div>' + v + '</div>').text();
//		$input.val(finalText);
//		hideResultsNow();
//		$input.trigger("result", [selected.data, selected.value]);
//		return true;
//	}
//	
//	function onChange(crap, skipPrevCheck) {
//		if( lastKeyPressCode == KEY.DEL ) {
//			select.hide();
//			return;
//		}
//		
//		var currentValue = $input.val();
//		
//		if ( !skipPrevCheck && currentValue == previousValue )
//			return;
//		
//		previousValue = currentValue;
//		
//		currentValue = lastWord(currentValue);
//		if ( currentValue.length >= options.minChars) {
//			$input.addClass(options.loadingClass);
//			if (!options.matchCase)
//				currentValue = currentValue.toLowerCase();
//			request(currentValue, receiveData, hideResultsNow);
//		} else {
//			stopLoading();
//			select.hide();
//		}
//	};
//	
//	function trimWords(value) {
//		if (!value)
//			return [""];
//		if (!options.multiple)
//			return [$.trim(value)];
//		return $.map(value.split(options.multipleSeparator), function(word) {
//			return $.trim(value).length ? $.trim(word) : null;
//		});
//	}
//	
//	function lastWord(value) {
//		if ( !options.multiple )
//			return value;
//		var words = trimWords(value);
//		if (words.length == 1) 
//			return words[0];
//		var cursorAt = $(input).selection().start;
//		if (cursorAt == value.length) {
//			words = trimWords(value)
//		} else {
//			words = trimWords(value.replace(value.substring(cursorAt), ""));
//		}
//		return words[words.length - 1];
//	}
//
//	function hideResults() {
//		clearTimeout(timeout);
//		timeout = setTimeout(hideResultsNow, 200);
//	};
//
//	function hideResultsNow() {
//		var wasVisible = select.visible();
//		select.hide();
//		clearTimeout(timeout);
//		stopLoading();
//		if (options.mustMatch) {
//			// call search and run callback
//			$input.search(
//				function (result){
//					// if no value found, clear the input box
//					if( !result ) {
//						if (options.multiple) {
//							var words = trimWords($input.val()).slice(0, -1);
//							$input.val( words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : "") );
//						}
//						else {
//							$input.val( "" );
//							$input.trigger("result", null);
//						}
//					}
//				}
//			);
//		}
//	};
//
//	function receiveData(q, data) {
//		if ( data && data.length && hasFocus ) {
//			stopLoading();
//			select.display(data, q);
//			select.show();
//		} else {
//			hideResultsNow();
//		}
//	};
//
//	function request(term, success, failure) {
//		if (!options.matchCase)
//			term = term.toLowerCase();
//		var data= options.data;
//		// recieve the cached data
//		if (data && data.length) {
//		//alert("not ajax data="+data);
//			success(term, data);
//		// if an AJAX url has been supplied, try loading the data now
//		} else if( (typeof options.url == "string") && (options.url.length > 0) ){
//			
//			var extraParams = {
////				timestamp: +new Date()
//			};
//			$.each(options.extraParams, function(key, param) {
//				extraParams[key] = typeof param == "function" ? param() : param;
//			});
//			
//			$.ajax({
//				// try to leverage ajaxQueue plugin to abort previous requests
//				mode: "abort",
//				// limit abortion to this input
//				port: "autocomplete" + input.name,
//				dataType: options.dataType,
//				url: options.url,
//				type: 'GET',
//                jsonp:"callback",
//				data: $.extend({
//					q: lastWord(term),
//					limit: options.max
//				}, extraParams),
//				success: function(data) {
//					cache.add(term,data);
//					success(term,data);
//				
//				}
//				
//			});
//		} else {
//			// if we have a failure, we need to empty the list -- this prevents the the [TAB] key from selecting the last successful match
//			select.emptyList();
//			failure(term);
//		}
//	};
//	
//	function parse(data) {
//		var parsed = [];
//		
//		var rows = data.split("\n");
//		
//		for (var i=0; i < rows.length; i++) {
//			var row = $.trim(rows[i]);
//			if (row) {
//				row = row.split("|");
//				parsed[parsed.length] = {
//					data: row,
//					value: row[0],
//					result: options.formatResult && options.formatResult(row, row[0]) || row[0]
//				};
//			}
//		}
//		
//		return parsed;
//	};
//
//	function stopLoading() {
//		//$input.removeClass(options.loadingClass);
//	};
//
//};
//
//$.HotelAutoCompleter.defaults = {
//	inputClass: "com_input",
//	resultsClass: "ac_results com_results",
//	//loadingClass: "com_loading",
//	minChars: 1,
//	submitId:null,
//	delay: 400,
//	matchCase: false,
////	matchSubset: true,
//	matchContains: false,
//	cacheLength: 10,
//	max: 10,
//	mustMatch: false,
//	extraParams: {},
//	selectFirst: false,
//	formatItem: function(row) { return row[0]; },
//    //formatItem: null,
//    contentType: "application/json; charset=GB2312",
//	formatMatch: null,
////	autoFill: false,
//	width: 230,
//	isSubmit:false,
//	multiple: false,
//	multipleSeparator: ", ",
//	highlight: function(value, term) {
//		return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<b>$1</b>");
//	},
//    scroll: true,
//    scrollHeight: 180
//};
//
//$.HotelAutoCompleter.Cache = function(options) {
//
//	var data = {};
//	var length = 0;
//	
//
//	
//	function add(q, value) {
//		if (length > options.cacheLength){
//			flush();
//		}
//		if (!data[q]){ 
//			length++;
//		}
//		data[q] = value;
//	}
//	
//	function populate(){
//		if( !options.data ) return false;
//		// track the matches
//		else{
//		    return options.data;
//		}
//	}
//	
//	// populate any existing data
//	setTimeout(populate, 25);
//	
//	function flush(){
//		data = {};
//		length = 0;
//	}
//	
//	return {
//		flush: flush,
//		add: add,
//		populate: populate,
//		load: function(q) {
//			if (!options.cacheLength || !length)
//				return null;
//			/* 
//			 * if dealing w/local data and matchContains than we must make sure
//			 * to loop through all the data collections looking for matches
//			 */
//
//        return options.data;
//		}
//    };
//};
//
//$.HotelAutoCompleter.Select = function (options, input, select, config) {
////alert("select="+select)
//	var CLASSES = {
//		ACTIVE: "ac_over"
//	};
//	
//	var listItems,
//		active = -1,
//		data,
//		term = "",
//		needsInit = true,
//		element,
//		list;
//	
//	// Create results
//	function init() {
//		if (!needsInit)
//			return;
//		element = $("<div/>")
//		.hide()
//		.addClass(options.resultsClass)
//		.css("position", "absolute")
//		.appendTo(document.body);
//	
//		list = $("<ul/>").appendTo(element).mouseover( function(event) {
//		  //  alert("CLASSES.ACTIVE="+CLASSES.ACTIVE);
//		 // var node=target(event).
//			if(target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
//	            active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
//	            //如果有更多条记录，最后一条记录是显示更多操作的
//	            if(active<options.max)
//	            {
//	                 $(target(event)).addClass(CLASSES.ACTIVE);      
//	            }else
//	            {
//	                active=-1;
//	            }
//			         
//	        }
//	        //alert("active="+active)
//		}).click(function(event) {
//		    if(options.max>=data.length)
//		    {
//		        $(target(event)).addClass(CLASSES.ACTIVE);
//			    select();
//			    // TODO provide option to avoid setting focus again after selection? useful for cleanup-on-focus
//			    input.focus();
//			    return false;
//		    }else
//		    {
//		        if(Event.element(event).parent().attr("id")=="moreSuggest")
//		        {
//		              options.submitId.click();
//		              element && element.hide();
//		        }else
//		        {
//		             $(target(event)).addClass(CLASSES.ACTIVE);
//			        select();
//			        // TODO provide option to avoid setting focus again after selection? useful for cleanup-on-focus
//			        input.focus();
//			        return false;
//		        }
//		      
//		    }
//			
//		}).mousedown(function() {
//			config.mouseDownOnSelect = true;
//		}).mouseup(function() {
//			config.mouseDownOnSelect = false;
//		});
//		//alert("list="+list);
//		if( options.width > 0 )
//			element.css("width", options.width);
//			
//		needsInit = false;
//		//alert("init data:"+options.data);
//	} 
//	
//	function target(event) {
//		var element = event.target;
//		while(element && element.tagName != "LI")
//			element = element.parentNode;
//		// more fun with IE, sometimes event.target is empty, just ignore it then
//		if(!element)
//			return [];
//		return element;
//	}
//
//	function moveSelect(step) {
//	    //alert(active);
//	    //if(active<options.max)
//	   // {
//	        listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
//		    movePosition(step);
//            var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
//            //alert("activeItem="+activeItem.val());
//            if(options.scroll) {
//                var offset = 0;
//                listItems.slice(0, active).each(function() {
//				    offset += this.offsetHeight;
//			    });
//                if((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
//                    list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
//                } else if(offset < list.scrollTop()) {
//                    list.scrollTop(offset);
//                }
//            }
//	   // }
//		
//	};
//	
//	function movePosition(step) {
//	    if(active<options.max){
//	        var selected = select();
//		    active += step;
//		    if (active < 0) {
//			    active = options.max - 1;
//		    } else if (active >= options.max) {
//			    active = 0;
//		    }
//	    }else
//	    {
//	        active=-1;
//	    }
//		
//	}
//	
//	function limitNumberOfItems(available) {
//		return options.max && options.max < available
//			? options.max
//			: available;
//	}
//	
//	function fillList() {
//		list.empty();
//	    //("called list");
//		var max = limitNumberOfItems(data.length);
//		for (var i=0; i < max; i++) {
//		//alert("data[i].data="+data[i].data);
//			if (!data[i])
//				continue;
//        		
//            var termArr = new Array();
//            termArr = term.split(' ');
//            var hightResult = data[i];
//            for (var j = 0; j < termArr.length; j++) {
//                if ($.trim(termArr[j]).length > 0) {
//                    hightResult = options.highlight(hightResult, $.trim(termArr[j]))
//                }
//
//            }
//            var li = $("<li/>").html(options.highlight(hightResult, term)).addClass(i % 2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
//            $.data(li, "ac_data", data[i]);
//		}
//		if(data.length>options.max)
//		{
////		      var Ul = $("<li/>").html("<a href='#?' id='moreSuggest'><span style='margin-left:180px;'>更多</a><span>").appendTo(list)[0];
//            var Ul = $("<li/>").html("<a href='#?' id='moreSuggest'><span style='margin-left:170px;'>更多</span></a>").appendTo(list)[0];
//		}
//		listItems = list.find("li");
//		if ( options.selectFirst ) {
//			listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
//			active = 0;
//		}
//		//alert("listItem="+listItems);
//		// apply bgiframe if available
//		if ( $.fn.bgiframe )
//			list.bgiframe();
//	}
//	
//	return {
//		display: function(d, q) {
//			init();
//			data = d;
//			//alert("display data:"+data);
//			term = q;
//			fillList();
//		},
//		next: function() {
//			moveSelect(1);
//		},
//		prev: function() {
//			moveSelect(-1);
//		},
//		pageUp: function() {
//			if (active != 0 && active - 8 < 0) {
//				moveSelect( -active );
//			} else {
//				moveSelect(-8);
//			}
//		},
//		pageDown: function() {
//			if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
//				moveSelect( listItems.size() - 1 - active );
//			} else {
//				moveSelect(8);
//			}
//		},
//		hide: function() {
//			element && element.hide();
//			listItems && listItems.removeClass(CLASSES.ACTIVE);
//			active = -1;
//		},
//		visible : function() {
//			return element && element.is(":visible");
//		},
//		current: function() {
//			return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
//		},
//		show: function() {
//			var offset = $(input).offset();
//			element.css({
//				width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(),
//				top: offset.top + input.offsetHeight,
//				left: offset.left
//			}).show();
//            if(options.scroll) {
//                list.scrollTop(0);
//                list.css({
//					maxHeight: options.scrollHeight,
//					overflow: 'auto'
//				});
//				
//                if($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
//                    if($.browser.msie&&($.browser.version == "6.0")&&!$.support.style)
//                    {
//                        //IE6直接赋值成scrollHeight
//                        // list.css('height', options.scrollHeight);
//                        var listHeight = 0;
//					    listItems.each(function() {
//					   	listHeight += this.offsetHeight;
//					    });
//					    //alert("listHeight="+(listHeight+20));
//					    var scrollbarsVisible = listHeight > options.scrollHeight;
//                        list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight );
//					    if (!scrollbarsVisible) {
//						// IE doesn't recalculate width when scrollbar disappears
//						  //  listItems.width( list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")) );
//					    }
//                    }else
//                    {
//                        var listHeight = 0;
//					    listItems.each(function() {
//					   	listHeight += this.offsetHeight;
//					    });
//					    var scrollbarsVisible = listHeight > options.scrollHeight;
//                        list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight );
//					    if (!scrollbarsVisible) {
//						// IE doesn't recalculate width when scrollbar disappears
//						    listItems.width( list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")) );
//					    }
//                    }
//					
//                }
//                
//            }
//		},
//		selected: function() {
//			var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
//			return selected && selected.length && $.data(selected[0], "ac_data");
//		},
//		emptyList: function (){
//			list && list.empty();
//		},
//		unbind: function() {
//			element && element.remove();
//		}
//	};
//};
//
//$.fn.selection = function(start, end) {
//	if (start !== undefined) {
//		return this.each(function() {
//			if( this.createTextRange ){
//				var selRange = this.createTextRange();
//				if (end === undefined || start == end) {
//					selRange.move("character", start);
//					selRange.select();
//				} else {
//					selRange.collapse(true);
//					selRange.moveStart("character", start);
//					selRange.moveEnd("character", end);
//					selRange.select();
//				}
//			} else if( this.setSelectionRange ){
//				this.setSelectionRange(start, end);
//			} else if( this.selectionStart ){
//				this.selectionStart = start;
//				this.selectionEnd = end;
//			}
//		});
//	}
//	var field = this[0];
//	if ( field.createTextRange ) {
//		var range = document.selection.createRange(),
//			orig = field.value,
//			teststring = "<->",
//			textLength = range.text.length;
//		range.text = teststring;
//		var caretAt = field.value.indexOf(teststring);
//		field.value = orig;
//		this.selection(caretAt, caretAt + textLength);
//		return {
//			start: caretAt,
//			end: caretAt + textLength
//		}
//	} else if( field.selectionStart !== undefined ){
//		return {
//			start: field.selectionStart,
//			end: field.selectionEnd
//		}
//	}
//};
//
//})(jQuery);
/**
*   Unslider by @idiot
*/

(function ($, f) {
    //  If there's no jQuery, Unslider can't work, so kill the operation.
    if (!$) return f;

    var Unslider = function () {
        //  Set up our elements
        this.el = f;
        this.items = f;

        //  Dimensions
        this.sizes = [];
        this.max = [0, 0];

        //  Current inded
        this.current = 0;

        //  Start/stop timer
        this.interval = f;

        //  Set some options
        this.opts = {
            speed: 500,
            delay: 3000, // f for no autoplay
            complete: f, // when a slide's finished
            keys: !f, // keyboard shortcuts - disable if it breaks things
            dots: f, // display 鈥⑩€⑩€⑩€鈥� pagination
            fluid: f // is it a percentage width?,
        };

        //  Create a deep clone for methods where context changes
        var _ = this;

        this.init = function (el, opts) {
            this.el = el;
            this.ul = el.children('ul');
            this.max = [el.outerWidth(), el.outerHeight()];
            this.items = this.ul.children('li').each(this.calculate);

            //  Check whether we're passing any options in to Unslider
            this.opts = $.extend(this.opts, opts);

            //  Set up the Unslider
            this.setup();

            return this;
        };

        //  Get the width for an element
        //  Pass a jQuery element as the context with .call(), and the index as a parameter: Unslider.calculate.call($('li:first'), 0)
        this.calculate = function (index) {
            var me = $(this),
				width = me.outerWidth(), height = me.outerHeight();

            //  Add it to the sizes list
            _.sizes[index] = [width, height];

            //  Set the max values
            if (width > _.max[0]) _.max[0] = width;
            if (height > _.max[1]) _.max[1] = height;
        };

        //  Work out what methods need calling
        this.setup = function () {
            //  Set the main element
            this.el.css({
                overflow: 'hidden',
                width: _.max[0],
                height: this.items.eq(0).outerHeight()
            });

            //  Set the relative widths
            //this.ul.css({ width: (this.items.length * 100) + '%', position: 'relative' });
            //this.items.css('width', (100 / this.items.length) + '%');

            if (this.opts.delay !== f) {
                this.start();
                this.el.hover(this.stop, this.start);
            }

            //  Custom keyboard support
            this.opts.keys && $(document).keydown(this.keys);

            //  Dot pagination
            this.opts.dots && this.dots();

            //  Little patch for fluid-width sliders. Screw those guys.
            if (this.opts.fluid) {
                var resize = function () {
                    _.el.css('width', Math.min(Math.round((_.el.outerWidth() / _.el.parent().outerWidth()) * 100), 100) + '%');
                };

                resize();
                $(window).resize(resize);
            }

            if (this.opts.arrows) {
                this.el.parent().append('<p class="arrows"><span class="prev">鈫�</span><span class="next">鈫�</span></p>')
					.find('.arrows span').click(function () {
					    $.isFunction(_[this.className]) && _[this.className]();
					});
            };

            //  Swipe support
            if ($.event.swipe) {
                this.el.on('swipeleft', _.prev).on('swiperight', _.next);
            }
        };

        //  Move Unslider to a slide index
        this.move = function (index, cb) {
            //  If it's out of bounds, go to the first slide
            if (!this.items.eq(index).length) index = 0;
            if (index < 0) index = (this.items.length - 1);

            var target = this.items.eq(index);
            var obj = { height: target.outerHeight() };
            var speed = cb ? 5 : this.opts.speed;

            if (!this.ul.is(':animated')) {


                this.ul.find('li:visible').fadeOut(1200);
                //  Handle those pesky dots
                _.el.find('.dot:eq(' + index + ')').addClass('active').siblings().removeClass('active');
                this.ul.find('li:eq(' + index + ')').fadeIn(1000);
                _.current = index;
                $.isFunction(_.opts.complete) && !cb && _.opts.complete(_.el);

                //                this.el.animate(obj, speed) && this.ul.animate($.extend({ left: '-' + index + '00%' }, obj), speed, function (data) {
                //                    _.current = index;
                //                    $.isFunction(_.opts.complete) && !cb && _.opts.complete(_.el);
                //                });
            }
        };

        //  Autoplay functionality
        this.start = function () {
            _.interval = setInterval(function () {
                _.move(_.current + 1);
            }, _.opts.delay);
        };

        //  Stop autoplay
        this.stop = function () {
            _.interval = clearInterval(_.interval);
            return _;
        };

        //  Keypresses
        this.keys = function (e) {
            var key = e.which;
            var map = {
                //  Prev/next
                37: _.prev,
                39: _.next,

                //  Esc
                27: _.stop
            };

            if ($.isFunction(map[key])) {
                map[key]();
            }
        };

        //  Arrow navigation
        this.next = function () { return _.stop().move(_.current + 1) };
        this.prev = function () { return _.stop().move(_.current - 1) };

        this.dots = function () {
            //  Create the HTML
            var html = '<ol class="dots">';
            $.each(this.items, function (index) { html += '<li class="dot' + (index < 1 ? ' active' : '') + '">' + (index + 1) + '</li>'; });
            html += '</ol>';

            //  Add it to the Unslider
            this.el.addClass('has-dots').append(html).find('.dot').click(function () {
                _.move($(".dots").find(".dot").index($(this)));
            });
        };
    };

    //  Create a jQuery plugin
    $.fn.unslider = function (o) {
        var len = this.length;

        //  Enable multiple-slider support
        return this.each(function (index) {
            //  Cache a copy of $(this), so it 
            var me = $(this);
            var instance = (new Unslider).init(me, o);

            //  Invoke an Unslider instance
            me.data('unslider' + (len > 1 ? '-' + (index + 1) : ''), instance);
        });
    };
})(window.jQuery, false);
//CityTabList   城市选择控件上显示的所有城市名称
/*var TrainCityHot = [{ "CityType": "train", "TabList": [{ "TabId": "1", "Name": "\u70ED\u95E8", "NameEn": "Hot", "CityList": [{ "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5317\u4EAC", "CityNameEn": "beijing", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u4E0A\u6D77", "CityNameEn": "shanghai", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5929\u6D25", "CityNameEn": "tianjin", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u91CD\u5E86", "CityNameEn": "chongqing", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u957F\u6C99", "CityNameEn": "changsha", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u957F\u6625", "CityNameEn": "changchun", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6210\u90FD", "CityNameEn": "chengdu", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u798F\u5DDE", "CityNameEn": "fuzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5E7F\u5DDE", "CityNameEn": "guangzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u8D35\u9633", "CityNameEn": "guiyang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u547C\u548C\u6D69\u7279", "CityNameEn": "hohhot", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u54C8\u5C14\u6EE8", "CityNameEn": "haerbin", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5408\u80A5", "CityNameEn": "hefei", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u676D\u5DDE", "CityNameEn": "hangzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6D77\u53E3", "CityNameEn": "haikou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6D4E\u5357", "CityNameEn": "jinan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6606\u660E", "CityNameEn": "kunming", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u62C9\u8428", "CityNameEn": "lasa", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5170\u5DDE", "CityNameEn": "lanzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5357\u5B81", "CityNameEn": "nanning", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5357\u4EAC", "CityNameEn": "nanjing", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5357\u660C", "CityNameEn": "nanchang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6C88\u9633", "CityNameEn": "shenyang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u77F3\u5BB6\u5E84", "CityNameEn": "shijiazhuang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u592A\u539F", "CityNameEn": "taiyuan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u4E4C\u9C81\u6728\u9F50", "CityNameEn": "wulumuqi", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6B66\u6C49", "CityNameEn": "wuhan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u897F\u5B81\u897F", "CityNameEn": "xiningxi", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u897F\u5B89", "CityNameEn": "xian", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u94F6\u5DDD", "CityNameEn": "yinchuan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u90D1\u5DDE", "CityNameEn": "zhengzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6DF1\u5733", "CityNameEn": "shenzhen", "CityThreeSign": "", "CityType": "train", "OldEnglishName": ""}] }, { "TabId": "2", "Name": "ABCD", "NameEn": "ABCD", "CityList": [{ "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5B89\u5E86", "CityNameEn": "anqing", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5B89\u987A", "CityNameEn": "anshun", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u963F\u5C14\u5C71", "CityNameEn": "aershan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u963F\u514B\u82CF", "CityNameEn": "akesu", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5317\u4EAC", "CityNameEn": "beijing", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5305\u5934", "CityNameEn": "baotou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5317\u6D77", "CityNameEn": "beihai", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5B9D\u9E21", "CityNameEn": "baoji", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u767E\u8272", "CityNameEn": "baise", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6210\u90FD", "CityNameEn": "chengdu", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u91CD\u5E86", "CityNameEn": "chongqing", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u957F\u6C99", "CityNameEn": "changsha", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u957F\u6625", "CityNameEn": "changchun", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5E38\u5DDE", "CityNameEn": "changzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u957F\u6CBB", "CityNameEn": "changzhi", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u8D64\u5CF0", "CityNameEn": "chifeng", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5E38\u5FB7", "CityNameEn": "changde", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5927\u8FDE", "CityNameEn": "dalian", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5927\u7406", "CityNameEn": "dali", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5927\u540C", "CityNameEn": "datong", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5927\u5E86", "CityNameEn": "daqing", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u4E39\u4E1C", "CityNameEn": "dandong", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6566\u714C", "CityNameEn": "dunhuang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u4E1C\u839E", "CityNameEn": "dongguan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u4E1C\u8425", "CityNameEn": "dongying", "CityThreeSign": "", "CityType": "train", "OldEnglishName": ""}] }, { "TabId": "3", "Name": "EFGHJ", "NameEn": "EFGHJ", "CityList": [{ "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6069\u65BD", "CityNameEn": "enshi", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u989D\u6D4E\u7EB3", "CityNameEn": "ejina", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5CE8\u7709", "CityNameEn": "emei", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u9102\u5DDE", "CityNameEn": "ezhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u798F\u5DDE", "CityNameEn": "fuzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u4F5B\u5C71", "CityNameEn": "foshan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5E7F\u5DDE", "CityNameEn": "guangzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6842\u6797", "CityNameEn": "guilin", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u8D35\u9633", "CityNameEn": "guiyang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u8D63\u5DDE", "CityNameEn": "ganzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u683C\u5C14\u6728", "CityNameEn": "geermu", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5E7F\u5143", "CityNameEn": "guangyuan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u676D\u5DDE", "CityNameEn": "hangzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u54C8\u5C14\u6EE8", "CityNameEn": "haerbin", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6D77\u53E3", "CityNameEn": "haikou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u547C\u548C\u6D69\u7279", "CityNameEn": "hohhot", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5408\u80A5", "CityNameEn": "hefei", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u90AF\u90F8", "CityNameEn": "handan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u9ED1\u6CB3", "CityNameEn": "heihe", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6C49\u4E2D", "CityNameEn": "hanzhong", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6C49\u53E3", "CityNameEn": "hankou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6D77\u62C9\u5C14", "CityNameEn": "hailaer", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6D4E\u5357", "CityNameEn": "jinan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u664B\u6C5F", "CityNameEn": "jinjiang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u666F\u5FB7\u9547", "CityNameEn": "jingdezhen", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6D4E\u5B81", "CityNameEn": "jining", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u4F73\u6728\u65AF", "CityNameEn": "jiamusi", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u9526\u5DDE", "CityNameEn": "jinzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u4E95\u5188\u5C71", "CityNameEn": "jinggangshan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u4E5D\u6C5F", "CityNameEn": "jiujiang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": ""}] }, { "TabId": "3", "Name": "KLMN", "NameEn": "KLMN", "CityList": [{ "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6606\u660E", "CityNameEn": "kunming", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5E93\u5C14\u52D2", "CityNameEn": "kuerle", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u62C9\u8428", "CityNameEn": "lasa", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5170\u5DDE", "CityNameEn": "lanzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u4E34\u6C82", "CityNameEn": "linyi", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u8FDE\u4E91\u6E2F", "CityNameEn": "lianyungang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5229\u5DDD", "CityNameEn": "lichuan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6D1B\u9633", "CityNameEn": "luoyang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u4E34\u6C7E", "CityNameEn": "linfen", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6F2F\u6CB3", "CityNameEn": "luohe", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u9F99\u5CA9", "CityNameEn": "longyan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u67F3\u5DDE", "CityNameEn": "liuzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u8FBD\u4E2D", "CityNameEn": "liaozhong", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u7261\u4E39\u6C5F", "CityNameEn": "mudanjiang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6F20\u6CB3", "CityNameEn": "mohe", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u8302\u540D", "CityNameEn": "maoming", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6EE1\u6D32\u91CC", "CityNameEn": "manzhouli", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u9A6C\u978D\u5C71", "CityNameEn": "maanshan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5357\u660C", "CityNameEn": "nanchang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5357\u4EAC", "CityNameEn": "nanjing", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5357\u5B81", "CityNameEn": "nanning", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5357\u901A", "CityNameEn": "nantong", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5357\u9633", "CityNameEn": "nanyang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5357\u5145", "CityNameEn": "nanchong", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5B81\u6CE2", "CityNameEn": "ningbo", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5185\u6C5F", "CityNameEn": "neijiang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": ""}] }, { "TabId": "3", "Name": "PQRSTW", "NameEn": "PQRSTW", "CityList": [{ "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6500\u679D\u82B1", "CityNameEn": "panzhihua", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u76D8\u9526", "CityNameEn": "panjin", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5E73\u9876\u5C71", "CityNameEn": "pingdingshan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u79E6\u7687\u5C9B", "CityNameEn": "qinhuangdao", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u9752\u5C9B", "CityNameEn": "qingdao", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u9F50\u9F50\u54C8\u5C14", "CityNameEn": "qiqihaer", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u8862\u5DDE", "CityNameEn": "quzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u65E5\u7167", "CityNameEn": "rizhao", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5982\u768B", "CityNameEn": "rugao", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u745E\u5B89", "CityNameEn": "ruian", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u745E\u91D1", "CityNameEn": "ruijin", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u4E0A\u6D77", "CityNameEn": "shanghai", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6DF1\u5733", "CityNameEn": "shenzhen", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6C88\u9633", "CityNameEn": "shenyang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u77F3\u5BB6\u5E84", "CityNameEn": "shijiazhuang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6C55\u5934", "CityNameEn": "shantou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5929\u6D25", "CityNameEn": "tianjin", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6CF0\u5B89", "CityNameEn": "taian", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u592A\u539F", "CityNameEn": "taiyuan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u901A\u8FBD", "CityNameEn": "tongliao", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u94DC\u4EC1", "CityNameEn": "tongren", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5929\u6C34", "CityNameEn": "tianshui", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u901A\u5316", "CityNameEn": "tonghua", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5510\u5C71", "CityNameEn": "tangshan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u592A\u6E56", "CityNameEn": "taihu", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u94C1\u5CAD", "CityNameEn": "tieling", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6B66\u6C49", "CityNameEn": "wuhan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6E29\u5DDE", "CityNameEn": "wenzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u65E0\u9521", "CityNameEn": "wuxi", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u4E4C\u9C81\u6728\u9F50", "CityNameEn": "wulumuqi", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5A01\u6D77", "CityNameEn": "weihai", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6F4D\u574A", "CityNameEn": "weifang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u4E4C\u6D77", "CityNameEn": "wuhai", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u68A7\u5DDE", "CityNameEn": "wuzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": ""}] }, { "TabId": "3", "Name": "XYZ", "NameEn": "XYZ", "CityList": [{ "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u897F\u5B89", "CityNameEn": "xian", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u53A6\u95E8", "CityNameEn": "xiamen", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u897F\u5B81\u897F", "CityNameEn": "xiningxi", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5F90\u5DDE", "CityNameEn": "xuzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u8944\u9633", "CityNameEn": "xiangyang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u9521\u6797\u6D69\u7279", "CityNameEn": "xilinhaote", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u65B0\u4E61", "CityNameEn": "xinxiang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u54B8\u9633", "CityNameEn": "xianyang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u4E49\u4E4C", "CityNameEn": "yiwu", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u70DF\u53F0", "CityNameEn": "yantai", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u94F6\u5DDD", "CityNameEn": "yinchuan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u626C\u5DDE", "CityNameEn": "yangzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5B9C\u660C", "CityNameEn": "yichang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5EF6\u5409", "CityNameEn": "yanji", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6986\u6797", "CityNameEn": "yulin1", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u8FD0\u57CE", "CityNameEn": "yuncheng", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u76D0\u57CE", "CityNameEn": "yancheng", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5B9C\u5BBE", "CityNameEn": "yibin", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5EF6\u5B89", "CityNameEn": "yanan", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u90D1\u5DDE", "CityNameEn": "zhengzhou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u73E0\u6D77", "CityNameEn": "zhuhai", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5F20\u5BB6\u754C", "CityNameEn": "zhangjiajie", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u5F20\u5BB6\u53E3", "CityNameEn": "zhangjiakou", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6E5B\u6C5F", "CityNameEn": "zhanjiang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u8087\u5E86", "CityNameEn": "zhaoqing", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u9547\u6C5F", "CityNameEn": "zhenjiang", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u6DC4\u535A", "CityNameEn": "zibo", "CityThreeSign": "", "CityType": "train", "OldEnglishName": "" }, { "ProvinceId": null, "CityId": "", "CityCode": "", "CityNameCn": "\u81EA\u8D21", "CityNameEn": "zigong", "CityThreeSign": "", "CityType": "train", "OldEnglishName": ""}]}]}]; var PageSwitch = { "JsErrorMonitor": "0", "IsLogOutDIY": "0", "LogOutUrl": "" };
*/
//StationName     用于拼音，中文，拼音缩写的搜索
/*var station_names = '@ZZY|\u5b50\u6d32|zizhou|zz|zizhou@ZZW|\u8d44\u4e2d|zizhong|zz|zizhong@ZZQ|\u682a\u6d32|zhuzhou|zz|zhuzhou@ZZM|\u4e2d\u5be8|zhongzhai|zz|zhongzhai@ZZF|\u90d1\u5dde|zhengzhou|zz|zhengzhou@ZZC|\u5353\u8d44\u5c71|zhuozishan|zzs|zhuozishan@ZYW|\u8d44\u9633|ziyang|zy|ziyang@ZYP|\u7d2b\u8346\u5173|zijingguan|zjg|zijingguan@ZYN|\u67a3\u9633|zaoyang|zy|zaoyang@ZYJ|\u5f20\u6396|zhangye|zy|zhangye@ZXX|\u624e\u8d49\u8bfa\u5c14\u897f|jalainurxi|zlnex|jalainurxi@ZXW|\u6731\u6768\u6eaa|zhuyangxi|zyx|zhuyangxi@ZXS|\u8d44\u6eaa|zixi|zx|zixi@ZXP|\u6dbf\u5dde|zhuozhou|zz|zhuozhou@ZXC|\u6b63\u9576\u767d\u65d7|zhengxiangbaiqi|zxbq|zhengxiangbaiqi@ZWT|\u4e16\u535a\u56ed|shiboyuan|sby|shiboyuan@ZWQ|\u6e5b\u6c5f\u897f|zhanjiangxi|zjx|zhanjiangxi@ZWJ|\u4e2d\u536b|zhongwei|zw|zhongwei@ZWD|\u5f70\u6b66|zhangwu|zw|zhangwu@ZWB|\u5f20\u7ef4\u5c6f|zhangweitun|zwt|zhangweitun@ZVY|\u7d2b\u9633|ziyang|zy|ziyang1@ZVT|\u9547\u897f|zhenxi|zx|zhenxi@ZVQ|\u8087\u5e86|zhaoqing|zq|zhaoqing@ZVP|\u67a3\u5f3a|zaoqiang|zq|zaoqiang@ZUX|\u58ee\u5fd7|zhuangzhi|zz|zhuangzhi@ZUW|\u9547\u8fdc|zhenyuan|zy|zhenyuan@ZUS|\u6f33\u5dde|zhangzhou|zz|zhangzhou@ZUP|\u5f20\u767e\u6e7e|zhangbaiwan|zbw|zhangbaiwan@ZUJ|\u6731\u5bb6\u7a91|zhujiayao|zjy|zhujiayao@ZUB|\u6731\u5bb6\u6c9f|zhujiagou|zjg|zhujiagou@ZTX|\u624e\u5170\u5c6f|zhalantun|zlt|zhalantun@ZTN|\u949f\u7965|zhongxiang|zx|zhongxiang@ZTK|\u7ae0\u4e18|zhangqiu|zq|zhangqiu@ZSZ|\u949f\u5c71|zhongshan|zs|zhongshan1@ZSY|\u67de\u6c34|zhashui|zs|zhashui@ZSQ|\u4e2d\u5c71|zhongshan|zs|zhongshan@ZSN|\u5de6\u5cad|zuoling|zl|zuoling@ZSG|\u6a1f\u6811|zhangshu|zs|zhangshu@ZRC|\u6731\u65e5\u548c|zhurihe|zrh|zhurihe@ZQY|\u5f20\u6865|zhangqiao|zq|zhangqiao@ZQK|\u8bf8\u57ce|zhucheng|zc|zhucheng@ZQH|\u5e84\u6865|zhuangqiao|zq|zhuangqiao@ZPS|\u6f33\u5e73|zhangping|zp|zhangping@ZPR|\u6cfd\u666e|zepu|zp|zepu@ZPF|\u9547\u5e73|zhenping|zp|zhenping@ZOY|\u68d5\u6eaa|zongxi|zx|zongxi@ZOQ|\u6a1f\u6728\u5934|zhangmutou|zmt|zhangmutou@ZOP|\u73e0\u7a9d|zhuwo|zw|zhuwo@ZOG|\u6a1f\u6811\u4e1c|zhangshudong|zsd|zhangshudong@ZOD|\u5468\u5bb6\u5c6f|zhoujiatun|zjt|zhoujiatun@ZOB|\u5468\u5bb6|zhoujia|zj|zhoujia@ZNJ|\u4e2d\u5b81\u5357|zhongningnan|znn|zhongningnan@ZMP|\u5f20\u5bb6\u53e3\u5357|zhangjiakounan|zjkn|zhangjiakounan@ZMN|\u7eb8\u574a\u4e1c|zhifangdong|zfd|zhifangdong@ZLV|\u5f20\u5170|zhanglan|zla|zhanglan@ZLT|\u9547\u8d49|zhenlai|zl|zhenlai@ZLN|\u9a7b\u9a6c\u5e97\u897f|zhumadianxi|zmdx|zhumadianxi@ZLM|\u6cfd\u6da6\u91cc|zerunli|zrl|zerunli@ZLD|\u624e\u9c81\u7279|zhalute|zlt|zhalute@ZLC|\u54f2\u91cc\u6728|zhelimu|zlm|zhelimu@ZKP|\u5f20\u5bb6\u53e3|zhangjiakou|zjk|zhangjiakou@ZKN|\u5468\u53e3|zhoukou|zk|zhoukou@ZJZ|\u6e5b\u6c5f|zhanjiang|zj|zhanjiang@ZJY|\u949f\u5bb6\u6751|zhongjiacun|zjc|zhongjiacun@ZJH|\u9547\u6c5f|zhenjiang|zj|zhenjiang@ZJD|\u53cc\u8fbd|shuangliao|sl|zhengjiatun@ZIW|\u9075\u4e49|zunyi|zy|zunyi@ZIV|\u67a3\u6797|zaolin|zl|zaolin@ZIT|\u5468\u6c34\u5b50|zhoushuizi|zsz|zhoushuizi@ZIQ|\u73e0\u6d77\u5317|zhuhaibei|zhb|zhuhaibei@ZIP|\u5f20\u8f9b|zhangxin|zx|zhangxin@ZIN|\u679d\u6c5f\u5317|zhijiangbei|zjb|zhijiangbei@ZIK|\u90b9\u57ce|zoucheng|zc|zoucheng@ZHY|\u5b50\u957f|zichang|zc|zichang@ZHX|\u4e2d\u548c|zhonghe|zh|zhonghe@ZHT|\u7ae0\u515a|zhangdang|zd|zhangdang@ZHQ|\u73e0\u6d77|zhuhai|zh|zhuhai@ZHP|\u6b63\u5b9a\u673a\u573a|zhengdingjichang|zdjc|zhengdingjichang@ZGW|\u81ea\u8d21|zigong|zg|zigong@ZGQ|\u4e2d\u5c71\u5317|zhongshanbei|zsb|zhongshanbei@ZGF|\u4e2d\u725f|zhongmu|zm|zhongmu@ZGD|\u7ae0\u53e4\u53f0|zhanggutai|zgt|zhanggutai@ZGB|\u8d75\u5149|zhaoguang|zg|zhaoguang@ZFM|\u7167\u798f\u94fa|zhaofupu|zfp|zhaofupu@ZFK|\u67a3\u5e84\u897f|zaozhuangxi|zzx|zaozhuangxi@ZEY|\u9547\u5b89|zhenan|za|zhenan@ZEK|\u67a3\u5e84|zaozhuang|zz|zaozhuang@ZEH|\u9547\u6c5f\u5357|zhenjiangnan|zjn|zhenjiangnan@ZDW|\u662d\u901a|zhaotong|zt|zhaotong@ZDV|\u9547\u57ce\u5e95|zhenchengdi|zcd|zhenchengdi@ZDS|\u8bcf\u5b89|zhaoan|za|zhaoan@ZDN|\u9a7b\u9a6c\u5e97|zhumadian|zmd|zhumadian@ZDJ|\u4e2d\u5b81\u4e1c|zhongningdong|znd|zhongningdong@ZDH|\u8bf8\u66a8|zhuji|zj|zhuji@ZDC|\u5353\u8d44\u4e1c|zhuozidong|zzd|zhuozidong@ZDB|\u8087\u4e1c|zhaodong|zd|zhaodong@ZCV|\u8d75\u57ce|zhaocheng|zc|zhaocheng@ZCS|\u6f33\u6d66|zhangpu|zp|zhangpu@ZCN|\u679d\u57ce|zhicheng|zc|zhicheng@ZBW|\u66fe\u5bb6\u576a\u5b50|caojiapingzi|zjpz|caojiapingzi@ZBP|\u62db\u67cf|zhaobai|zb|zhaobai@ZBK|\u6dc4\u535a|zibo|zb|zibo@ZAW|\u7af9\u56ed\u575d|zhuyuanba|zyb|zhuyuanba@ZAQ|\u682a\u6d32\u897f|zhuzhouxi|zzx|zhuzhouxi@ZAP|\u6dbf\u5dde\u4e1c|zhuozhoudong|zzd|zhuozhoudong@ZAL|\u548b\u5b50|zhazi|zz|zhazi@ZAF|\u90d1\u5dde\u4e1c|zhengzhoudong|zzd|zhengzhoudong@ZAD|\u6cbb\u5b89|zhian|za|zhian@YZY|\u71d5\u5b50\u782d|yanzibian|yzb|yanzibian@YZW|\u7389\u5c4f|yuping|yp|yuping@YZK|\u5156\u5dde|yanzhou|yz|yanzhou@YZJ|\u8425\u76d8\u6c34|yingpanshui|yps|yingpanshui@YZD|\u6768\u6756\u5b50|yangzhangzi|yzz|yangzhangzi@YYY|\u781a\u5ddd|yanchuan|yc|yanchuan@YYV|\u9633\u6cc9\u66f2|yangquanqu|yqq|yangquanqu@YYQ|\u5cb3\u9633|yueyang|yy|yueyang@YYM|\u6c38\u4e30\u8425|yongfengying|yfy|yongfengying@YYL|\u9e2d\u56ed|yayuan|yy|yayuan@YYJ|\u9e33\u9e2f\u9547|yuanyangzhen|yyz|yuanyangzhen@YYH|\u4f59\u59da|yuyao|yy|yuyao@YYB|\u8fce\u6625|yingchun|yc|yingchun@YXS|\u5c24\u6eaa|youxi|yx|youxi@YXM|\u7389\u6eaa|yuxi|yx|yuxi@YXJ|\u7389\u95e8|yumen|ym|yumen@YXD|\u4e49\u53bf|yixian|yx|yixian@YWY|\u5ef6\u5b89|yanan|ya|yanan@YWM|\u7f8a\u5c3e\u54e8|yangweishao|yws|yangweishao@YWH|\u4e49\u4e4c|yiwu|yw|yiwu@YWB|\u4e9a\u5e03\u529b\u5357|yabulinan|ybln|yabulinan@YVV|\u9633\u660e\u5821|yangmingpu|ymp|yangmingpu@YVM|\u5b9c\u8010|yinai|yn|yinai@YUX|\u70df\u7b52\u5c6f|yantongtun|ytt|yantongtun@YUT|\u6986\u6811\u53f0|yushutai|yst|yushutai@YUM|\u6708\u4eae\u7530|yueliangtian|ylt|yueliangtian@YUK|\u6c82\u6c34|yishui|ys|yishui@YUH|\u5b9c\u5174|yixing|yx|yixing@YUD|\u5143\u5b9d\u5c71|yuanbaoshan|ybs|yuanbaoshan@YTZ|\u7259\u5c6f\u5821|yatunpu|ytb|yatunpu@YTS|\u6c38\u6cf0|yongtai|yt|yongtai@YTQ|\u6e90\u6f6d|yuantan|yt|yuantan@YTG|\u9e70\u6f6d|yingtan|yt|yingtan@YSZ|\u5b9c\u5dde|yizhou|yz|yizhou@YSY|\u6768\u9675|yangling|yl|yanglingzhen@YSX|\u6986\u6811\u5c6f|yushutun|yst|yushutun@YSV|\u6986\u793e|yushe|ys|yushe@YST|\u4e00\u9762\u5c71|yimianshan|yms|yimianshan@YSR|\u7109\u8006|yanqi|yq|yanqi@YSP|\u5143\u6c0f|yuanshi|ys|yuanshi@YSM|\u5b9c\u826f\u5317|yiliangbei|ylb|yiliangbei@YSL|\u70df\u7b52\u5c71|yantongshan|yts|yantongshan@YSJ|\u7389\u77f3|yushi|ys|yushi@YSF|\u5043\u5e08|yanshi|ys|yanshi@YRT|\u6986\u6811|yushu|ys|yushu@YRB|\u6768\u5c97|yanggang|yg|yanggang@YQV|\u9633\u66f2|yangqu|yq|yangqu@YQT|\u59da\u5343\u6237\u5c6f|yaoqianhutun|yqht|yaoqianhutun@YQQ|\u9633\u6625|yangchun|yc|yangchun@YQP|\u6768\u67f3\u9752|yangliuqing|ylq|yangliuqing@YQM|\u8fe4\u8d44|yizi|yz|yizi@YQB|\u7389\u6cc9|yuquan|yq|yuquan@YPV|\u539f\u5e73|yuanping|yp|yuanping@YPP|\u9633\u6cc9\u5317|yangquanbei|yqb|yangquanbei@YPK|\u90d3\u57ce|yuncheng|yc|yuncheng1@YPB|\u4e00\u9762\u5761|yimianpo|ymp|yimianpo@YOV|\u9633\u9ad8|yanggao|yg|yanggao@YON|\u9633\u65b0|yangxin|yx|yangxin@YOG|\u6538\u53bf|youxian|yx|youxian@YOB|\u53cb\u597d|youhao|yh|youhao@YNY|\u960e\u826f|yanliang|yl|yanliang@YNV|\u8fd0\u57ce|yuncheng|yc|yuncheng@YNR|\u4f0a\u5b81\u4e1c|yiningdong|ynd|yiningdong@YNP|\u5ef6\u5e86|yanqing|yq|yanqing@YNK|\u6c82\u5357|yinan|yn|yinan@YNG|\u7389\u5c71|yushan|ys|yushan@YNF|\u9633\u57ce|yangcheng|yc|yangcheng@YNB|\u6c38\u5b89\u4e61|yonganxiang|yax|yonganxiang@YMR|\u4f0a\u5b81|yining|yn|yining@YMN|\u4e91\u68a6|yunmeng|ym|yunmeng@YMM|\u5143\u8c0b|yuanmou|ym|yuanmou@YMF|\u4e49\u9a6c|yima|ym|yima@YLZ|\u7389\u6797|yulin|yl|yulin@YLX|\u4f0a\u62c9\u54c8|yilaha|ylh|yilaha@YLW|\u6c38\u90ce|yonglang|yl|yonglang@YLM|\u6768\u6797|yanglin|yl|yanglin@YLH|\u626c\u5dde|yangzhou|yz|yangzhou@YLD|\u4f59\u7cae\u5821|yuliangpu|ylb|yuliangpu@YLB|\u4f0a\u6797|yilin|yl|yilin@YKX|\u7259\u514b\u77f3|yakeshi|yks|yakeshi@YKT|\u8425\u53e3|yingkou|yk|yingkou@YKM|\u79e7\u8349\u5730|yangcaodi|ycd|yangcaodi@YKJ|\u76d0\u6c60|yanchi|yc|yanchi@YJX|\u94f6\u6d6a|yinlang|yl|yinlang@YJT|\u4e00\u95f4\u5821|yijianpu|yjb|yijianpu@YJL|\u5ef6\u5409|yanji|yj|yanji@YIV|\u6c38\u6d4e|yongji|yj|yongji@YIR|\u82f1\u5409\u6c99|yingjisha|yjs|yingjisha@YIQ|\u5cb3\u9633\u4e1c|yueyangdong|yyd|yueyangdong@YIP|\u9e70\u624b\u8425\u5b50|yingshouyingzi|ysyz|yingshouyingzi@YIN|\u5b9c\u57ce|yicheng|yc|yicheng@YIK|\u9633\u8c37|yanggu|yg|yanggu@YIJ|\u94f6\u5ddd|yinchuan|yc|yinchuan@YIG|\u5f0b\u9633\u4e1c|yiyangdong|yyd|yiyangdong@YHW|\u8d8a\u897f|yuexi|yx|yuexi@YHP|\u6cbf\u6cb3\u57ce|yanhecheng|yhc|yanhecheng@YHN|\u5e94\u57ce|yingcheng|yc|yingcheng@YHM|\u7f8a\u81fc\u6cb3|yangjiuhe|yjh|yangjiuhe@YHG|\u4f59\u6c5f|yujiang|yj|yujiang@YGW|\u71d5\u5c97|yangang|yg|yangang@YGT|\u8425\u53e3\u4e1c|yingkoudong|ykd|yingkoudong@YGS|\u6c38\u5b9a|yongding|yd|yongding@YGP|\u6986\u6811\u6c9f|yushugou|ysg|yushugou@YGJ|\u5cb3\u5bb6\u4e95|yuejiajing|yjj|yuejiajing@YGH|\u96c1\u8361\u5c71|yandangshan|yds|yandangshan@YFW|\u8fce\u5bbe\u8def|yingbinlu|ybl|yingbinlu@YEY|\u6768\u9675\u5357|yanglingnan|yln|yanglingnan@YEX|\u4f0a\u56fe\u91cc\u6cb3|yitulihe|ytlh|yitulihe@YET|\u4f0a\u5c14\u65bd|yirshi|yes|yirshi@YER|\u53f6\u57ce|yecheng|yc|yecheng@YED|\u7f8a\u573a|yangchang|yc|yangchang@YDY|\u6c38\u4e50\u5e97|yongledian|yld|yongledian@YDQ|\u82f1\u5fb7|yingde|yd|yingde@YDM|\u5c39\u5730|yindi|yd|yindi@YDJ|\u6c38\u767b|yongdeng|yd|yongdeng@YDG|\u4e8e\u90fd|yudu|yd|yudu@YCW|\u6c38\u5ddd|yongchuan|yc|yongchuan@YCV|\u6986\u6b21|yuci|yc|yuci@YCT|\u8425\u57ce\u5b50|yingchengzi|ycz|yingchengzi@YCN|\u5b9c\u660c|yichang|yc|yichang@YCK|\u79b9\u57ce|yucheng|yc|yucheng@YCH|\u53f6\u96c6|yeji|yj|yeji@YCG|\u5b9c\u6625|yichun|yc|yichun@YCB|\u4f0a\u6625|yichun|yc|yichun1@YBZ|\u6c38\u798f\u5357|yongfunan|yfn|yongfunan@YBW|\u5b9c\u5bbe|yibin|yb|yibin@YBS|\u4e91\u9704|yunxiao|yx|yunxiao@YBP|\u6768\u6751|yangcun|yc|yangcun@YBF|\u6708\u5c71|yueshan|ys|yueshan@YBD|\u53f6\u67cf\u5bff|yebaishou|ybs|yebaishou@YBB|\u4e9a\u5e03\u529b|yabuli|ybl|yabuli@YAY|\u9633\u5e73\u5173|yangpingguan|ypg|yangpingguan@YAX|\u4f9d\u5b89|yian|ya|yian@YAT|\u59da\u5bb6|yaojia|yj|yaojia@YAS|\u6c38\u5b89|yongan|ya|yongan@YAP|\u96c1\u7fc5|yanchi|yc|yanchi1@YAM|\u8425\u8857|yingjie|yj|yingjie@YAL|\u9633\u5c94|yangcha|yc|yangcha@YAK|\u70df\u53f0|yantai|yt|yantai@YAJ|\u56ed\u58a9|yuandun|yd|yuandun@YAD|\u6768\u6811\u5cad|yangshuling|ysl|yangshuling@YAC|\u59da\u5b89|yaoan|ya|yaoan@YAB|\u7f8a\u8349|yangcao|yc|yangcao@XZX|\u65b0\u5e10\u623f|xinzhangfang|xzf|xinzhangfang@XZT|\u65b0\u8087|xinzhao|xz|xinzhao@XZN|\u6d60\u6c34|xishui|xs|xishui@XZJ|\u65b0\u9633\u9547|xinyangzhen|xyz|xinyangzhen@XZD|\u6c50\u5b50|xizi|xz|xizi@XZC|\u897f\u5c0f\u53ec|xixiaozhao|xxz|xixiaozhao@XZB|\u5174\u9686\u9547|xinglongzhen|xlz|xinglongzhen@XYY|\u54b8\u9633|xianyang|xy|xianyang@XYX|\u5c0f\u626c\u6c14|xiaoyangqi|xyq|xiaoyangqi@XYT|\u718a\u5cb3\u57ce|xiongyuecheng|xyc|xiongyuecheng@XYP|\u4e0b\u82b1\u56ed|xiahuayuan|xhy|xiahuayuan@XYD|\u5c0f\u6cb3\u6cbf|xiaoheyan|xhy|xiaoheyan@XYB|\u897f\u6797|xilin|xl|xilin@XXV|\u5ffb\u5dde|xinzhou|xz|xinzhou@XXQ|\u6e58\u4e61|xiangxiang|xx|xiangxiang@XXP|\u5c0f\u897f\u5e84|xiaoxizhuang|xxz|xiaoxizhuang@XXO|\u897f\u5b81\u897f|xiningxi|xnx|xiningxi@XXM|\u5c0f\u65b0\u8857|xiaoxinjie|xxj|xiaoxinjie@XXF|\u65b0\u4e61|xinxiang|xx|xinxiang@XXB|\u8944\u6cb3|xianghe|xh|xianghe@XWN|\u8944\u9633\u4e1c|xiangyangdong|xyd|xiangyangdong@XWM|\u5ba3\u5a01|xuanwei|xw|xuanwei@XWJ|\u5ba3\u548c|xuanhe|xh|xuanhe@XWF|\u4fee\u6b66|xiuwu|xw|xiuwu@XVF|\u8bb8\u660c\u4e1c|xuchangdong|xcd|xuchangdong@XUY|\u65ec\u9633|xunyang|xy|xunyang@XUN|\u4fe1\u9633|xinyang|xy|xinyang@XUJ|\u897f\u56fa\u57ce|xigucheng|xgc|xigucheng@XUG|\u65b0\u4f59|xinyu|xy|xinyu@XTQ|\u6e58\u6f6d|xiangtan|xt|xiangtan@XTP|\u90a2\u53f0|xingtai|xt|xingtai@XTJ|\u8bb8\u5bb6\u53f0|xujiatai|xjt|xujiatai@XTG|\u5411\u5858|xiangtang|xt|xiangtang@XTC|\u9521\u6797\u6d69\u7279|xilinhaote|xlht|xilinhaote@XSV|\u4e0b\u793e|xiashe|xs|xiashe@XST|\u5c0f\u5e02|xiaoshi|xs|xiaoshi@XSP|\u5f90\u6c34|xushui|xs|xushui@XSN|\u65b0\u53bf|xinxian|xx|xinxian@XSJ|\u8bb8\u4e09\u6e7e|xusanwan|xsw|xusanwan@XSB|\u674f\u6811|xingshu|xs|xingshu@XRZ|\u5174\u4e49|xingyi|xy|xingyi@XRX|\u65b0\u7ef0\u6e90|xinchuoyuan|xcy|xinchuoyuan@XRP|\u60ac\u949f|xuanzhong|xz|xuanzhong@XRN|\u54b8\u5b81\u5317|xianningbei|xnb|xianningbei@XRL|\u4ed9\u4eba\u6865|xianrenqiao|xrq|xianrenqiao@XRD|\u897f\u54f2\u91cc\u6728|xizhelimu|xzlm|xizhelimu@XQY|\u897f\u4e61|xixiang|xx|xixiang@XQJ|\u5174\u6cc9\u5821|xingquanpu|xqp|xingquanpu@XQF|\u897f\u9633\u6751|xiyangcun|xyc|xiyangcun@XQD|\u65b0\u90b1|xinqiu|xq|xinqiu@XQB|\u65b0\u9752|xinqing|xq|xinqing@XPY|\u5174\u5e73|xingping|xp|xingping@XPX|\u65b0\u6797|xinlin|xl|xinlin@XPN|\u897f\u5e73|xiping|xp|xiping@XPM|\u65b0\u576a\u7530|xinpingtian|xpt|xinpingtian@XPH|\u4ed9\u6797|xianlin|xl|xianlin@XOY|\u54b8\u9633\u79e6\u90fd|xianyangqindu|xyqd|xianyangqindu@XOV|\u5b5d\u897f|xiaoxi|xx|xiaoxi@XOS|\u971e\u6d66|xiapu|xp|xiapu@XOD|\u5c0f\u4e1c|xiaodong|xdo|xiaodong@XOB|\u65b0\u677e\u6d66|xinsongpu|xsp|xinsongpu@XNV|\u5b5d\u5357|xiaonan|xn|xiaonan@XNN|\u54b8\u5b81|xianning|xn|xianning@XNB|\u9999\u5170|xianglan|xl|xianglan@XMT|\u8c22\u5bb6\u9547|xiejiazhen|xjz|xiejiazhen@XMS|\u53a6\u95e8|xiamen|xm|xiamen@XMP|\u897f\u5927\u5e99|xidamiao|xdm|xidamiao@XMD|\u65b0\u6c11|xinmin|xm|xinmin@XMB|\u897f\u9ebb\u5c71|ximashan|xms|ximashan@XLQ|\u65b0\u6643|xinhuang|xh|xinhuang@XLP|\u897f\u516b\u91cc|xibali|xbl|xibali@XLJ|\u65b0\u674e|xinli|xl|xinli@XLD|\u65b0\u7acb\u5c6f|xinlitun|xlt|xinlitun@XLB|\u5c0f\u5cad|xiaoling|xl|xiaoling@XKS|\u53a6\u95e8\u5317|xiamenbei|xmb|xiamenbei@XKN|\u54b8\u5b81\u4e1c|xianningdong|xnd|xianningdong@XJV|\u65b0\u7edb|xinjiang|xj|xinjiang@XJT|\u8bb8\u5bb6\u5c6f|xujiatun|xjt|xujiatun@XJQ|\u5f90\u95fb|xuwen|xw|xuwen@XJN|\u5b5d\u611f\u5317|xiaoganbei|xgb|xiaoganbei@XJM|\u65b0\u6c5f|xinjiang|xj|xinjiang1@XJB|\u5f90\u5bb6|xujia|xj|xujia@XIZ|\u590f\u77f3|xiashi|xs|xiashi@XIW|\u7280\u6d66|xipu|xp|xipu@XIR|\u65b0\u548c|xinhe|xh|xinhe@XIF|\u897f\u5ce1|xixia|xx|xixia@XHY|\u5ba3\u6c49|xuanhan|xh|xuanhan@XHP|\u5ba3\u5316|xuanhua|xh|xuanhua@XHM|\u5c0f\u96e8\u8c37|xiaoyugu|xyg|xiaoyugu@XHH|\u676d\u5dde\u5357|hangzhounan|hzn|hangzhounan@XHB|\u65b0\u534e|xinhua|xh|xinhua@XGV|\u8f69\u5c97|xuangang|xg|xuangang@XGT|\u65b0\u7acb\u9547|xinlizhen|xlz|xinlizhen@XGQ|\u65b0\u5174\u53bf|xinxingxian|xxx|xinxingxian@XGN|\u5b5d\u611f|xiaogan|xg|xiaogan@XGJ|\u590f\u5b98\u8425|xiaguanying|xgy|xiaguanying@XFW|\u606f\u70fd|xifeng|xf|xifeng@XFV|\u8944\u6c7e|xiangfen|xf|xiangfen@XFT|\u897f\u4e30|xifeng|xf|xifeng1@XFN|\u8944\u9633|xiangyang|xy|xiangyang@XFM|\u5c0f\u6708\u65e7|xiaoyuejiu|xyj|xiaoyuejiu@XFB|\u9999\u574a|xiangfang|xf|xiangfang@XEZ|\u5c0f\u8463|xiaodong|xd|xiaodong1@XEM|\u5c0f\u6751|xiaocun|xc|xiaocun@XEC|\u5174\u548c\u897f|xinghexi|xhx|xinghexi@XDZ|\u5174\u5b89\u5317|xinganbei|xab|xinganbei@XDT|\u674f\u6811\u5c6f|xingshutun|xst|xingshutun@XDD|\u5174\u9686\u5e97|xinglongdian|xld|xinglongdian@XDB|\u5411\u9633|xiangyang|xy|xiangyang1@XCT|\u65b0\u57ce\u5b50|xinchengzi|xcz|xinchengzi@XCH|\u5f90\u5dde|xuzhou|xz|xuzhou@XCF|\u8bb8\u660c|xuchang|xc|xuchang@XCD|\u5174\u57ce|xingcheng|xc|xingcheng@XCB|\u4e0b\u57ce\u5b50|xiachengzi|xcz|xiachengzi@XBY|\u65ec\u9633\u5317|xunyangbei|xyb|xunyangbei@XBS|\u53a6\u95e8\u9ad8\u5d0e|xiamengaoqi|xmgq|xiamengaoqi@XAZ|\u5174\u5b89|xingan|xa|xingan1@XAY|\u897f\u5b89|xian|xa|xian@XAX|\u65b0\u534e\u5c6f|xinhuatun|xht|xinhuatun@XAT|\u4e0b\u9a6c\u5858|xiamatang|xmt|xiamatang@XAP|\u65b0\u4fdd\u5b89|xinbaoan|xba|xinbaoan@XAN|\u4ed9\u6843\u897f|xiantaoxi|xtx|xiantaoxi@XAM|\u5c0f\u54e8|xiaoshao|xs|xiaoshao@XAF|\u65b0\u5b89\u53bf|xinanxian|xax|xinanxian@WZZ|\u68a7\u5dde|wuzhou|wz|wuzhou@WZY|\u97e6\u5e84|weizhuang|wz|weizhuang@WZV|\u4e94\u5be8|wuzhai|wz|wuzhai@WZL|\u82c7\u5b50\u6c9f|weizigou|wzg|weizigou@WZJ|\u738b\u56e2\u5e84|wangtuanzhuang|wtz|wangtuanzhuang@WZB|\u738b\u5146\u5c6f|wangzhaotun|wzt|wangzhaotun@WYZ|\u5434\u5729|wuxu|wy|wuxu@WYY|\u4e07\u6e90|wanyuan|wy|wanyuan@WYW|\u4e07\u5dde|wanzhou|wz|wanzhou@WYC|\u4e94\u539f|wuyuan|wy|wuyuan@WYB|\u738b\u6768|wangyang|wy|wangyang@WXV|\u95fb\u559c|wenxi|wx|wenxi@WXT|\u74e6\u623f\u5e97\u897f|wafangdianxi|wfdx|wafangdianxi@WXR|\u4e4c\u897f|wuxi|wx|wuxi1@WXN|\u6b66\u7a74|wuxue|wx|wuxue@WXH|\u65e0\u9521|wuxi|wx|wuxi@WXC|\u4e4c\u6d77\u897f|wuhaixi|whx|wuhaixi@WWT|\u4e4c\u5170\u6d69\u7279|ulanhot|wlht|ulanhot@WWP|\u6b66\u6e05|wuqing|wq|wuqing@WWJ|\u6b66\u5a01\u5357|wuweinan|wwn|wuweinan@WWG|\u4e07\u5e74|wannian|wn|wannian@WWB|\u4e94\u8425|wuying|wy|wuying@WVY|\u6e2d\u5357\u5357|weinannan|wnn|weinannan@WVX|\u74e6\u62c9\u5e72|walagan|wlg|walagan@WVV|\u6b66\u4e61|wuxiang|wx|wuxiang@WVT|\u536b\u4e1c|weidong|wd|weidong@WVR|\u4e94\u4e94|wuwu|ww|wuwu@WVP|\u738b\u5b89\u9547|wanganzhen|waz|wanganzhen@WVC|\u4e4c\u6d77|wuhai|wh|wuhai@WVB|\u536b\u661f|weixing|wx|weixing@WUY|\u5434\u5821|wupu|wb|wupu@WUT|\u738b\u5e9c|wangfu|wf|wangfu@WUP|\u5434\u6865|wuqiao|wq|wuqiao@WUJ|\u6b66\u5a01|wuwei|ww|wuwei@WUB|\u4e94\u5bb6|wujia|wj|wujia@WTP|\u738b\u77b3|wangtong|wt|wangtong@WSV|\u4e94\u53f0\u5c71|wutaishan|wts|wutaishan@WSP|\u9b4f\u5584\u5e84|weishanzhuang|wsz|weishanzhuang@WSM|\u5a01\u820d|weishe|ws|weishe@WSJ|\u6b66\u5c71|wushan|ws|wushan@WSC|\u4e4c\u62c9\u5c71|wulashan|wls|wulashan@WRX|\u4e4c\u5974\u8033|onor|wne|onor@WRN|\u6b66\u5f53\u5c71|wudangshan|wds|wudangshan@WRB|\u4e94\u5927\u8fde\u6c60|wudalianchi|wdlc|wudalianchi@WQP|\u5fae\u5b50\u9547|weizizhen|wzz|weizizhen@WQL|\u6c6a\u6e05|wangqing|wq|wangqing@WQC|\u4e4c\u62c9\u7279\u524d\u65d7|uradqranqi|wltqq|uradqranqi@WQB|\u502d\u80af|woken|wk|woken@WPT|\u6c83\u76ae|wopi|wp|wopi@WPB|\u4e4c\u4f0a\u5cad|wuyiling|wyl|wuyiling@WNZ|\u6587\u5730|wendi|wd|wendi@WNY|\u6e2d\u5357|weinan|wn|weinan@WNQ|\u4e07\u5b81|wanning|wn|wanning@WNJ|\u6e2d\u5357\u9547|weinanzhen|wnz|weinanzhen@WMR|\u4e4c\u9c81\u6728\u9f50|wulumuqi|wlmq|wulumuqi@WLX|\u5367\u91cc\u5c6f|wolitun|wlt|wolitun@WLW|\u6b66\u9686|wulong|wl|wulong@WLK|\u4e94\u83b2|wulian|wl|wulian@WLC|\u4e4c\u5170\u54c8\u8fbe|ulanhad|wlhd|ulanhad@WKW|\u5408\u5ddd|hechuan|hc|hechuan@WKT|\u4e94\u68f5\u6811|wukeshu|wks|wukeshu@WKK|\u5a01\u6d77|weihai|wh|weihai@WKD|\u9b4f\u6756\u5b50|weizhangzi|wzz|weizhangzi@WJT|\u5434\u5bb6\u5c6f|wujiatun|wjt|wujiatun@WJP|\u5348\u6c72|wuji|wj|wuji@WJL|\u6e2d\u6d25|weijin|wj|weijin@WJJ|\u738b\u5bb6\u6e7e|wangjiawan|wjw|wangjiawan@WIT|\u6b6a\u5934\u5c71|waitoushan|wts|waitoushan@WIM|\u74e6\u7a91\u7530|wayaotian|wjt|wayaotian@WHX|\u4e4c\u5c14\u65d7\u6c57|orqohan|weqh|orqohan@WHW|\u6c49\u6e90|hanyuan|hy|hanyuan@WHP|\u4e94\u9053\u6cb3|wudaohe|wdh|wudaohe@WHN|\u6b66\u6c49|wuhan|wh|wuhan@WHH|\u829c\u6e56|wuhu|wh|wuhu@WHF|\u536b\u8f89|weihui|wh|weihui@WHB|\u82c7\u6cb3|weihe|wh|weihe@WGY|\u6b66\u529f|wugong|wg|wugong@WGM|\u5434\u5b98\u7530|wuguantian|wgt|wuguantian@WGL|\u6e7e\u6c9f|wangou|wg|wangou@WGH|\u65e0\u9521\u4e1c|wuxidong|wxd|wuxidong@WGB|\u738b\u5c97|wanggang|wg|wanggang@WFN|\u4e4c\u9f99\u6cc9\u5357|wulongquannan|wlqn|wulongquannan@WFK|\u6f4d\u574a|weifang|wf|weifang@WFB|\u4e07\u53d1\u5c6f|wanfatun|wft|wanfatun@WEW|\u65fa\u82cd|wangcang|wc|wangcang@WEV|\u6587\u6c34|wenshui|ws|wenshui@WET|\u4e94\u5973\u5c71|wunvshan|wns|wunvshan@WEQ|\u6587\u660c|wenchang|wc|wenchang@WEF|\u7126\u4f5c\u4e1c|jiaozuodong|jzd|jiaozuodong@WEB|\u4e07\u4e50|wanle|wl|wanle@WDT|\u74e6\u623f\u5e97|wafangdian|wfd|wafangdian@WDP|\u671b\u90fd|wangdu|wd|wangdu@WDL|\u4e94\u9053\u6c9f|wudaogou|wdg|wudaogou@WDB|\u6e29\u6625|wenchun|wc|wenchun@WCT|\u4e94\u53c9\u6c9f|wuchagou|wcg|wuchagou@WCN|\u6b66\u660c|wuchang|wc|wuchang@WCJ|\u5434\u5bb6\u5ddd|wujiachuan|wjc|wujiachuan@WCB|\u4e94\u5e38|wuchang|wc|wuchang1@WBZ|\u68a7\u5dde\u5357|wuzhounan|wzn|wuzhounan@WBY|\u6e2d\u5357\u5317|weinanbei|wnb|weinanbei@WBW|\u8349\u6d77|caohai|ch|caohai@WBT|\u4e94\u9f99\u80cc|wulongbei|wlb|wulongbei@WBP|\u6587\u5b89|wenan|wa|wenan@WBK|\u6587\u767b|wendeng|wd|wendeng@WAS|\u6b66\u5937\u5c71|wuyishan|wys|wuyishan@WAP|\u6b66\u5b89|wuan|wa|wuan@WAM|\u5a01\u7b90|weiqing|wq|weiqing@WAH|\u74e6\u5c4b\u5c71|wawushan|wws|wawushan@VZK|\u8303\u9547|fanzhen|fz|fanzhen@VZH|\u6e56\u5dde|huzhou|hz|huzhou@VYT|\u677e\u539f|songyuan|sy|songyuan@VXQ|\u60e0\u5dde\u897f|huizhouxi|hzx|huizhouxi@VXN|\u7ea2\u5b89\u897f|honganxi|hax|honganxi@VXD|\u516b\u4ed9\u7b52|baxiantong|bxt|baxiantong@VXB|\u7ea2\u661f|hongxing|hx|hongxing@VVP|\u77f3\u5bb6\u5e84\u5317|shijiazhuangbei|sjzb|shijiazhuangbei@VUQ|\u6d77\u53e3|haikou|hk|haikou@VTR|\u548c\u7530|hetian|ht|hetian@VTQ|\u4f1a\u540c|huitong|ht|huitong@VTM|\u96e8\u683c|yuge|yg|yuge@VTK|\u6853\u53f0|huantai|ht|huantai@VTJ|\u547c\u9c81\u65af\u592a|hulstai|hlst|hulstai@VTB|\u6362\u65b0\u5929|huanxintian|hxt|huanxintian@VSR|\u548c\u4ec0\u6258\u6d1b\u76d6|heshituoluogai|hstlg|heshituoluogai@VSQ|\u6c49\u5bff|hanshou|hs|hanshou@VSJ|\u7ea2\u7802\u5c98|hongshaxian|hsj|hongshaxian@VSB|\u7ea2\u5c71|hongshan|hs|hongshan@VRH|\u6e29\u5dde\u5357|wenzhounan|wzn|wenzhounan@VQH|\u82b1\u6865|huaqiao|hq|huaqiao@VOW|\u7518\u6d1b|ganluo|gl|ganluo@VOP|\u6c99\u6cb3\u5e02|shaheshi|shs|shaheshi@VON|\u9ec4\u5dde|huangzhou|hz|huangzhou@VNP|\u5317\u4eac\u5357|beijingnan|bjn|beijingnan@VNJ|\u4e2d\u5b81|zhongning|zn|zhongning@VNH|\u4e2d\u534e\u95e8|zhonghuamen|zhm|zhonghuamen@VMW|\u798f\u6cc9|fuquan|fq|fuquan@VLJ|\u674e\u65fa|liwang|lw|liwang@VLD|\u820d\u529b\u864e|shelihu|slh|shelihu@VLB|\u864e\u6797|hulin|hl|hulin@VJW|\u5e7f\u5b89|guangan|ga|guangan@VJD|\u7eaa\u5bb6\u6c9f|jijiagou|jjg|jijiagou@VIX|\u7ea2\u5f66|hongyan|hy|hongyan@VIQ|\u6cb3\u6e90|heyuan|hy|heyuan@VIH|\u65b0\u6c82|xinyi|xy|xinyi@VHH|\u6e29\u5cad|wenling|wl|wenling@VHD|\u7ea2\u82b1\u6c9f|honghuagou|hhg|honghuagou@VHB|\u7ea2\u5174\u9686|hongxinglong|hxl|hongxinglong@VGQ|\u5e38\u5fb7|changde|cd|changde@VGP|\u91d1\u6c9f\u5c6f|jingoutun|jgt|jingoutun@VFQ|\u77f3\u95e8\u53bf\u5317|shimenxianbei|smxb|shimenxianbei@VEH|\u9ec4\u6885|huangmei|hm|huangmei@VCQ|\u534e\u57ce|huacheng|hc|huacheng@VCH|\u60e0\u5c71|huishan|hs|huishan@VBP|\u660c\u5e73\u5317|changpingbei|cpb|changpingbei@VBB|\u54c8\u5c14\u6ee8\u4e1c|harbindong|hebd|harbindong@VAW|\u9ebb\u5c3e|mawei|mw|mawei@VAQ|\u548c\u5e73|heping|hp|heping@VAP|\u5317\u4eac\u5317|beijingbei|bjb|beijingbei@VAG|\u5409\u5b89|jian|ja|jian@VAB|\u54c8\u5c14\u6ee8\u897f|haerbinxi|hebx|haerbinxi@UZH|\u4eea\u5f81|yizheng|yz|yizheng@UYK|\u4e34\u6c82\u5317|linyibei|lyb|linyibei@UXP|\u6ee6\u53bf|luanxian|lx|luanxian@UXK|\u83b1\u829c\u897f|laiwuxi|lwx|laiwuxi@UWZ|\u96f6\u9675|lingling|ll|lingling@UUH|\u5f90\u5dde\u4e1c|xuzhoudong|xzd|xuzhoudong@UTW|\u4e50\u5c71|leshan|ls|leshan@UTP|\u6f5e\u57ce|lucheng|lc|lucheng@UTH|\u6cf0\u5dde|taizhou|tz|taizhou@USP|\u6d41\u6c34\u6c9f|liushuigou|lsg|liushuigou@USH|\u4e3d\u6c34|lishui|ls|lishui@URH|\u6c38\u5609|yongjia|yj|yongjia@UQW|\u6881\u5e73|liangping|lp|liangping@UQK|\u4e34\u6e05|linqing|lq|linqing@UQJ|\u9f99\u6cc9\u5bfa|longquansi|lqs|longquansi@UPP|\u6ee6\u5e73|luanping|lp|luanping@UPJ|\u516d\u76d8\u5c71|liupanshan|lps|liupanshan@UPH|\u4e50\u6e05|yueqing|yq|yueqing@UNP|\u6ee6\u6cb3\u6cbf|luanheyan|lhy|luanheyan@UNN|\u54b8\u5b81\u5357|xianningnan|xnn|xianningnan@UNG|\u9f99\u5357|longnan|ln|longnan@UMW|\u516d\u76d8\u6c34|liupanshui|lps|liupanshui@ULZ|\u90a3\u7f57|naluo|nl|naluo@ULY|\u9ec4\u9675|huangling|hl|huangling@ULK|\u853a\u5bb6\u697c|linjialou|ljl|linjialou@UKH|\u8fde\u4e91\u6e2f\u4e1c|lianyungangdong|lygd|lianyungangdong@UJT|\u4e24\u5bb6|liangjia|lj|liangjia@UJL|\u9f99\u5609|longjia|lj|longjia@UJH|\u5e90\u6c5f|lujiang|lj|lujiang@UIH|\u8fde\u4e91\u6e2f|lianyungang|lyg|lianyungang@UHP|\u9686\u5316|longhua|lh|longhua@UGW|\u5195\u5b81|mianning|mn|mianning@UFQ|\u4e1c\u65b9|dongfang|df|dongfang@UFH|\u4e34\u6d77|linhai|lh|linhai@UFD|\u8001\u5e9c|laofu|lf|laofu@UEP|\u4e34\u897f|linxi|lx|linxi@UEH|\u59dc\u5830|jiangyan|jy|jiangyan@UDT|\u5218\u5bb6\u5e97|liujiadian|ljd|liujiadian@UDQ|\u51b7\u6c34\u6c5f\u4e1c|lengshuijiangdong|lsjd|lengshuijiangdong@UDP|\u6ee6\u6cb3|luanhe|lh|luanhe@UDH|\u6c5f\u90fd|jiangdu|jd|jiangdu@UCP|\u9ece\u57ce|licheng|lc|licheng@UCK|\u804a\u57ce|liaocheng|lc|liaocheng@UCH|\u82a6\u6f6e\u6e2f|luchaogang|lcg|luchaogang@UBZ|\u6765\u5bbe|laibin|lb|laibin@UAQ|\u96f7\u5dde|leizhou|lz|leizhou@UAP|\u5362\u9f99|lulong|ll|lulong@UAH|\u516d\u5b89|luan|la|luan@TZW|\u6850\u6893|tongzi|tz|tongzi@TZV|\u5929\u9547|tianzhen|tz|tianzhen@TZP|\u7edf\u519b\u5e84|tongjunzhuang|tjz|tongjunzhuang@TZK|\u90ef\u57ce|tancheng|tc|tancheng@TZJ|\u5929\u795d|tianzhu|tz|tianzhu@TZH|\u53f0\u5dde|taizhou|tz|taizhou1@TYV|\u592a\u539f|taiyuan|ty|taiyuan@TYT|\u901a\u8fdc\u5821|tongyuanpu|tyb|tongyuanpu@TYP|\u5854\u5d16\u9a7f|tayanyi|tyy|tayanyi@TYJ|\u592a\u9633\u5c71|taiyangshan|tys|taiyangshan@TYF|\u6c64\u9634|tangyin|ty|tangyin@TYB|\u6c64\u539f|tangyuan|ty|tangyuan@TXX|\u5854\u6cb3|tahe|th|tahe@TXP|\u5929\u6d25\u897f|tianjinxi|tjx|tianjinxi@TXL|\u901a\u5316\u53bf|tonghuaxian|thx|tonghuaxian@TXK|\u6ed5\u5dde|tengzhou|tz|tengzhou@TXJ|\u540c\u5fc3|tongxin|tx|tongxin@TWQ|\u4e9a\u9f99\u6e7e|yalongwan|ylw|yalongwan@TVX|\u5854\u5c14\u6c14|tarqi|teq|tarqi@TVW|\u6f7c\u5357|tongnan|tn|tongnan@TVT|\u6d2e\u5357|taonan|tn|taonan@TUT|\u901a\u9014|tongtu|tt|tongtu@TTN|\u571f\u5730\u5802\u4e1c|tuditangdong|tdtd|tuditangdong@TTK|\u53f0\u524d|taiqian|tq|taiqian@TTH|\u6850\u57ce|tongcheng|tc|tongcheng@TSW|\u571f\u6eaa|tuxi|tx|tuxi@TSP|\u5510\u5c71|tangshan|ts|tangshan@TSJ|\u5929\u6c34|tianshui|ts|tianshui@TRZ|\u7530\u9633|tianyang|ty|tianyang@TRQ|\u901a\u9053|tongdao|td|tongdao@TRC|\u571f\u7267\u5c14\u53f0|tomortei|tmet|tomortei@TQX|\u56fe\u5f3a|tuqiang|tq|tuqiang@TQT|\u592a\u9633\u5347|taiyangsheng|tys|taiyangsheng@TQL|\u5929\u6865\u5cad|tianqiaoling|tql|tianqiaoling@TQJ|\u571f\u6865\u5b50|tuqiaozi|tqz|tuqiaozi@TPT|\u9676\u8d56\u662d|taolaizhao|tlz|taolaizhao@TOT|\u9676\u5bb6\u5c6f|taojiatun|tjt|taojiatun@TOL|\u901a\u6c9f|tonggou|tg|tonggou@TNS|\u6cf0\u5b81|taining|tn|taining@TNN|\u5929\u95e8\u5357|tianmennan|tmn|tianmennan@TNJ|\u8c2d\u5bb6\u4e95|tanjiajing|tjj|tanjiajing@TND|\u5929\u4e49|tianyi|ty|tianyi@TMN|\u5929\u95e8|tianmen|tm|tianmen@TML|\u56fe\u4eec|tumen|tm|tumen@TMK|\u6cf0\u5b89|taian|ta|taian@TMD|\u5410\u5217\u6bdb\u675c|tuliemaodu|tlmd|tuliemaodu@TLX|\u6cf0\u6765|tailai|tl|tailai@TLT|\u94c1\u5cad|tieling|tl|tieling@TLS|\u592a\u59e5\u5c71|taimushan|tms|taimushan@TLD|\u901a\u8fbd|tongliao|tl|tongliao@TLB|\u94c1\u529b|tieli|tl|tieli@TKX|\u6cf0\u5eb7|taikang|tk|taikang@TKH|\u592a\u6e56|taihu|th|taihu@TJP|\u5929\u6d25|tianjin|tj|tianjin@TJH|\u94dc\u9675|tongling|tl|tongling@TIZ|\u4ead\u4eae|tingliang|tl|tingliang@TIX|\u56e2\u7ed3|tuanjie|tj|tuanjie@TIT|\u592a\u5e73\u5ddd|taipingchuan|tpc|taipingchuan@TIP|\u5929\u6d25\u5357|tianjinnan|tjn|tianjinnan@TIM|\u5854\u77f3\u5634|tashizui|tsz|tashizui@TIL|\u9a7c\u8170\u5cad|tuoyaoling|tyl|tuoyaoling@TID|\u53f0\u5b89|taian|ta|taian1@THX|\u5854\u54c8|taha|th|taha@THN|\u6c64\u900a\u6e56|tangxunhu|txh|tangxunhu@THM|\u68e0\u6d77|tanghai|th|tanghai@THL|\u901a\u5316|tonghua|th|tonghua@THG|\u6cf0\u548c|taihe|th|taihe@THF|\u5510\u6cb3|tanghe|th|tanghe@THB|\u6c64\u65fa\u6cb3|tangwanghe|twh|tangwanghe@TGY|\u6f7c\u5173|tongguan|tg|tongguan@TGV|\u592a\u8c37|taigu|tg|taigu@TGP|\u5858\u6cbd|tanggu|tg|tanggu@TGL|\u5929\u5c97|tiangang|tg|tiangang@TGC|\u571f\u8d35\u4e4c\u62c9|togrogul|tgwl|togrogul@TFZ|\u7530\u6797|tianlin|tl|tianlin@TFT|\u7530\u5e08\u5e9c|tianshifu|tsf|tianshifu@TFR|\u5410\u9c81\u756a|tulufan|tlf|tulufan@TEX|\u56fe\u91cc\u6cb3|tulihe|tlh|tulihe@TEW|\u6850\u5b50\u6797|tongzilin|tzl|tongzilin@TEK|\u6ed5\u5dde\u4e1c|tengzhoudong|tzd|tengzhoudong@TEB|\u592a\u5e73\u9547|taipingzhen|tpz|taipingzhen@TDZ|\u7530\u4e1c|tiandong|td|tiandong@TDV|\u592a\u539f\u4e1c|taiyuandong|tyd|taiyuandong@TCX|\u6c64\u6c60|tangchi|tc|tangchi@TCT|\u6c64\u5c71\u57ce|tangshancheng|tsc|tangshancheng@TCL|\u94c1\u5382|tiechang|tc|tiechang@TCK|\u6843\u6751|taocun|tc|taocun@TCJ|\u571f\u95e8\u5b50|tumenzi|tmz|tumenzi@TCH|\u6850\u4e61|tongxiang|tx|tongxiang@TBV|\u592a\u539f\u5317|taiyuanbei|tyb|taiyuanbei@TBQ|\u5858\u8c79|tangbao|tb|tangbao@TBP|\u5929\u6d25\u5317|tianjinbei|tjb|tianjinbei@TBF|\u6850\u67cf|tongbai|tb|tongbai@TBB|\u901a\u5317|tongbei|tb|tongbei@TAZ|\u85e4\u53bf|tengxian|tx|tengxian@TAP|\u901a\u5dde\u897f|tongzhouxi|tzx|tongzhouxi@TAM|\u901a\u6d77|tonghai|th|tonghai@TAK|\u6cf0\u5c71|taishan|ts|taishan@TAJ|\u901a\u5b89\u9a7f|tonganyi|tay|tonganyi@TAB|\u6843\u5c71|taoshan|ts|taoshan@SZR|\u77f3\u6cb3\u5b50|shihezi|shz|shihezi@SZQ|\u6df1\u5733|shenzhen|sz|shenzhen@SZN|\u968f\u5dde|suizhou|sz|suizhou@SZL|\u6c5f\u6e90|jiangyuan|jy|jiangyuan@SZH|\u82cf\u5dde|suzhou|sz|suzhou@SZD|\u7ee5\u4e2d|suizhong|sz|suizhong@SZB|\u5c1a\u5fd7|shangzhi|sz|shangzhi@SYV|\u5bff\u9633|shouyang|sy|shouyang@SYT|\u6c88\u9633|shenyang|sy|shenyang@SYQ|\u90b5\u9633|shaoyang|sy|shaoyang@SYP|\u8083\u5b81|suning|sn|suning@SYL|\u4e09\u6e90\u6d66|sanyuanpu|syp|sanyuanpu@SYJ|\u4e09\u9633\u5ddd|sanyangchuan|syc|sanyangchuan@SYB|\u7ee5\u9633|suiyang|sy|suiyang@SXZ|\u9042\u6eaa|suixi|sx|suixi@SXY|\u77f3\u6cc9\u53bf|shiquanxian|sqx|shiquanxian@SXT|\u82cf\u5bb6\u5c6f|sujiatun|sjt|sujiatun@SXR|\u6c99\u6e7e\u53bf|shawanxian|swx|shawanxian@SXM|\u4e0a\u897f\u94fa|shangxipu|sxp|shangxipu@SXL|\u77f3\u5c98|shixian|sj|shixian@SXJ|\u77f3\u5ce1\u5b50|shixiazi|sxz|shixiazi@SXH|\u4e0a\u6d77\u897f|shanghaixi|shx|shanghaixi@SXF|\u4e09\u95e8\u5ce1\u897f|sanmenxiaxi|smxx|sanmenxiaxi@SXC|\u5546\u90fd|shangdu|sd|shangdu@SWT|\u6df1\u4e95\u5b50|shenjingzi|sjz|shenjingzi@SWS|\u90b5\u6b66|shaowu|sw|shaowu@SWP|\u4e0a\u4e07|shangwan|sw|shangwan@SWN|\u5546\u57ce|shangcheng|sc|shangcheng@SWB|\u795e\u6811|shenshu|ss|shenshu@SVP|\u4e09\u5408\u5e84|sanhezhuang|shz|sanhezhuang@SVK|\u4e0a\u9ad8\u9547|shanggaozhen|sgz|shanggaozhen@SUV|\u6714\u5dde|shuozhou|sz|shuozhou@SUR|\u758f\u52d2|shule|sl|shule@SUD|\u4e0a\u56ed|shangyuan|sy|shangyuan@SUB|\u5b59\u5bb6|sunjia|sj|sunjia@STB|\u56db\u65b9\u53f0|sifangtai|sft|sifangtai@SSX|\u4e5d\u4e09|jiusan|js|jiusan@SST|\u4e09\u5341\u91cc\u5821|sanshilipu|sslb|sanshilipu@SSR|\u912f\u5584|shanshan|ss|shanshan@SSQ|\u97f6\u5c71|shaoshan|ss|shaoshan@SSL|\u677e\u6811\u9547|songshuzhen|ssz|songshuzhen@SSH|\u4e0a\u865e\u5317|shangyubei|syb|shangyubei@SSD|\u6c99\u540e\u6240|shahousuo|shs|shahousuo@SSB|\u53cc\u9e2d\u5c71|shuangyashan|sys|shuangyashan@SRQ|\u795e\u5dde|shenzhou|sz|shenzhou@SRP|\u77f3\u666f\u5c71\u5357|shijingshannan|sjsn|shijingshannan@SRL|\u77f3\u4eba|shiren|sr|shiren@SRH|\u5bbf\u5dde\u4e1c|suzhoudong|szd|suzhoudong@SRG|\u4e0a\u9976|shangrao|sr|shangrao@SRD|\u4e09\u5341\u5bb6|sanshijia|ssj|sanshijia@SRB|\u77f3\u4eba\u57ce|shirencheng|src|shirencheng@SQT|\u77f3\u6865\u5b50|shiqiaozi|sqz|shiqiaozi@SQH|\u6c34\u5bb6\u6e56|shuijiahu|sjh|shuijiahu@SQF|\u5546\u4e18|shangqiu|sq|shangqiu@SQB|\u5c71\u5e02|shanshi|ss|shanshi@SPT|\u56db\u5e73|siping|sp|siping@SPJ|\u4e0a\u8170\u58a9|shangyaodun|syd|shangyaodun@SPF|\u5546\u4e18\u5357|shangqiunan|sqn|shangqiunan@SPB|\u77f3\u78f7|shilin|sl|shilin1@SOZ|\u4e09\u6c5f\u53bf|sanjiangxian|sjx|sanjiangxian@SOQ|\u90b5\u4e1c|shaodong|sd|shaodong@SOP|\u987a\u4e49|shunyi|sy|shunyi@SON|\u9042\u5e73|suiping|sp|suiping@SOL|\u77f3\u5cad|shiling|sl|shiling@SOH|\u7ecd\u5174|shaoxing|sx|shaoxing@SOB|\u5b8b|song|s|song@SNZ|\u5174\u4e1a|xingye|xy|xingye@SNT|\u7d22\u4f26|suolun|sl|suolun@SNQ|\u97f6\u5173|shaoguan|sg|shaoguan@SNN|\u5341\u5830|shiyan|sy|shiyan@SNM|\u5e08\u5e84|shizhuang|sz|shizhuang@SNH|\u4e0a\u6d77\u5357|shanghainan|shn|shanghainan@SND|\u7ee5\u4e2d\u5317|suizhongbei|szb|suizhongbei@SMV|\u795e\u6c60|shenchi|sc|shenchi@SMS|\u4e09\u660e|sanming|sm|sanming@SMM|\u4e09\u5bb6\u5be8|sanjiazhai|sjz|sanjiazhai@SMF|\u4e09\u95e8\u5ce1|sanmenxia|smx|sanmenxia@SLQ|\u77f3\u9f99|shilong|sl|shilong@SLP|\u6c99\u5cad\u5b50|shalingzi|slz|shalingzi@SLM|\u77f3\u6797|shilin|sl|shilin@SLL|\u8212\u5170|shulan|sl|shulan@SLH|\u7ecd\u5174\u5317|shaoxingbei|sxb|shaoxingbei@SLC|\u8428\u62c9\u9f50|salaqi|slq|salaqi@SKT|\u6c99\u6cb3\u53e3|shahekou|shk|shahekou@SKD|\u4e09\u6c5f\u53e3|sanjiangkou|sjk|sanjiangkou@SKB|\u5b59\u5434|sunwu|sw|sunwu@SJQ|\u4e09\u6c34|sanshui|ss|sanshui@SJP|\u77f3\u5bb6\u5e84|shijiazhuang|sjz|shijiazhuang@SJL|\u677e\u6c5f\u6cb3|songjianghe|sjh|songjianghe@SJJ|\u90b5\u5bb6\u5802|shaojiatang|sjt|shaojiatang@SJD|\u5341\u5bb6\u5b50|shijiazi|sjz|shijiazi@SJB|\u5c1a\u5bb6|shangjia|sj|shangjia@SIN|\u677e\u6ecb|songzi|sz|songzi@SIL|\u6c34\u6d1e|shuidong|sd|shuidong@SID|\u6c34\u6cc9|shuiquan|sq|shuiquan@SIB|\u7ee5\u68f1|suiling|sl|suiling@SHX|\u7d22\u56fe\u7f55|suotuhan|sth|suotuhan@SHS|\u4e09\u660e\u5317|sanmingbei|smb|sanmingbei@SHP|\u6c99\u6cb3|shahe|sh|shahe@SHM|\u65bd\u5bb6\u5634|shijiazui|sjz|shijiazui@SHL|\u5c71\u6cb3\u5c6f|shanhetun|sht|shanhetun@SHJ|\u758f\u52d2\u6cb3|shulehe|slh|shulehe@SHH|\u4e0a\u6d77|shanghai|sh|shanghai@SHD|\u5c71\u6d77\u5173|shanhaiguan|shg|shanhaiguan@SHC|\u8d5b\u6c57\u5854\u62c9|saihantai|shtl|saihantai@SHB|\u7ee5\u5316|suihua|sh|suihua@SGQ|\u97f6\u5173\u4e1c|shaoguandong|sgd|shaoguandong@SFX|\u4e09\u95f4\u623f|sanjianfang|sjf|sanjianfang@SFT|\u677e\u6811|songshu|ss|songshu@SFM|\u6c99\u6cb1|shatuo|st|shatuo@SFJ|\u6c99\u5761\u5934|shapotou|spt|shapotou@SFB|\u7ee5\u82ac\u6cb3|suifenhe|sfh|suifenhe@SEV|\u795e\u5934|shentou|st|shentou@SEQ|\u4e09\u4e9a|sanya|sy|sanya@SEP|\u5341\u6e21|shidu|sd|shidu@SEM|\u5e08\u5b97|shizong|sz|shizong@SEL|\u53cc\u6cb3\u9547|shuanghezhen|shz|shuanghezhen@SED|\u6c99\u6d77|shahai|sh|shahai@SDT|\u6c88\u9633\u4e1c|shenyangdong|syd|shenyangdong@SDJ|\u5c71\u4e39|shandan|sd|shandan@SDH|\u4e09\u5802\u96c6|santangji|stj|santangji@SCT|\u77f3\u57ce|shicheng|sc|shicheng@SCS|\u987a\u660c|shunchang|sc|shunchang@SCR|\u838e\u8f66|shache|sc|shache@SCP|\u6c99\u57ce|shacheng|sc|shacheng@SCL|\u5c71\u57ce\u9547|shanchengzhen|scz|shanchengzhen@SCF|\u4e09\u95e8\u5ce1\u5357|sanmenxianan|smxn|sanmenxianan@SCB|\u53cc\u57ce\u5821|shuangchengpu|scb|shuangchengpu@SBZ|\u53cc\u724c|shuangpai|sp|shuangpai@SBT|\u6c88\u9633\u5317|shenyangbei|syb|shenyangbei@SBP|\u4e0a\u677f\u57ce|shangbancheng|sbc|shangbancheng@SBN|\u5c71\u5761\u4e1c|shanpodong|spd|shanpodong@SBM|\u677e\u6cb3|songhe|sh|songhe@SBB|\u53cc\u57ce\u5317|shuangchengbei|scb|shuangchengbei@SAY|\u4e09\u539f|sanyuan|sy|sanyuan@SAT|\u9996\u5c71|shoushan|ss|shoushan@SAS|\u6c99\u53bf|shaxian|sx|shaxian@SAJ|\u6851\u56ed\u5b50|sangyuanzi|syz|sangyuanzi@SAH|\u677e\u6c5f|songjiang|sj|songjiang@SAD|\u77f3\u5c71|shishan|ss|shishan@RZT|\u5927\u77f3\u5be8|dashizhai|dsz|dashizhai@RZP|\u8c46\u5f20\u5e84|douzhangzhuang|dzz|douzhangzhuang@RZK|\u65e5\u7167|rizhao|rz|rizhao@RZH|\u6e29\u5dde|wenzhou|wz|wenzhou@RYW|\u90fd\u5300|duyun|dy|duyun@RYV|\u5cb1\u5cb3|daiyue|dy|daiyue@RYJ|\u4e8c\u8425|erying|ey|erying@RYH|\u6b66\u4e49|wuyi|wy|wuyi@RYF|\u6c5d\u9633|ruyang|ry|ruyang@RXZ|\u5bb9\u53bf|rongxian|rx|rongxian@RXW|\u8fbe\u5dde|dazhou|dz|dazhou@RXP|\u4e1c\u620c|dongxu|dx|dongxu@RWW|\u72ec\u5c71|dushan|ds|dushan@RWH|\u6d77\u6e7e|haiwan|hw|haiwan@RVQ|\u9976\u5e73|raoping|rp|raoping@RVP|\u9976\u9633|raoyang|ry|raoyang@RVD|\u4e1c\u6765|donglai|dl|donglai@RUQ|\u5bb9\u6842|ronggui|rg|ronggui@RUH|\u4e39\u5f92|dantu|dt|dantu@RTQ|\u4e1c\u839e|dongguan|dg|dongguan@RSZ|\u878d\u6c34|rongshui|rs|rongshui@RSD|\u70ed\u6c34|reshui|rs|reshui@RQP|\u4efb\u4e18|renqiu|rq|renqiu@RQJ|\u6c5d\u7b95\u6c9f|rujigou|rqg|rujigou@RPP|\u5927\u76d8\u77f3|dapanshi|dps|dapanshi@RPD|\u5317\u7968\u5357|beipiaonan|bpn|beipiaonan@ROP|\u8c46\u5e84|douzhuang|dz|douzhuang@ROK|\u4e73\u5c71|rushan|rs|rushan@ROF|\u6c5d\u5dde|ruzhou|rz|ruzhou@RNT|\u5927\u5b89\u5317|daanbei|dab|daanbei@RNH|\u91d1\u534e\u5357|jinhuanan|jhn|jinhuanan@RMP|\u9738\u5dde|bazhou|bz|bazhou@RML|\u4e8c\u5bc6\u6cb3|ermihe|emh|ermihe@RLD|\u4e8c\u9f99|erlong|el|erlong@RLC|\u4e8c\u8fde|erlian|el|erlian@RJG|\u745e\u91d1|ruijin|rj|ruijin@RIH|\u5982\u4e1c|rudong|rd|rudong@RHX|\u5927\u5e86\u897f|daqingxi|dqx|daqingxi@RHD|\u7ed5\u9633\u6cb3|raoyanghe|ryh|raoyanghe@RGW|\u5927\u5173|daguan|dg|daguan@RFH|\u6c38\u5eb7|yongkang|yk|yongkang@RDX|\u4e8c\u9053\u6e7e|erdaowan|edw|erdaowan@RDT|\u5fb7\u4f2f\u65af|debosi|dbs|debosi@RDQ|\u94dc\u4ec1|tongren|tr|tongren@RDP|\u4e8c\u9053\u6c9f\u95e8|erdaogoumen|edgm|erdaogoumen@RDD|\u4e1c\u6234\u6cb3|dongdaihe|ddh|dongdaihe@RCW|\u8363\u660c|rongchang|rc|rongchang@RCG|\u745e\u660c|ruichang|rc|ruichang@RBT|\u5230\u4fdd|daobao|db|daobao@RBH|\u5982\u768b|rugao|rg|rugao@RAZ|\u878d\u5b89|rongan|ra|rongan@RAT|\u5927\u5b89|daan|da|daan@RAH|\u745e\u5b89|ruian|ra|ruian@QZV|\u79e6\u5bb6\u5e84|qinjiazhuang|qjz|qinjiazhuang@QZK|\u9752\u5dde\u5e02|qingzhoushi|qzs|qingzhoushi@QYT|\u6e05\u539f|qingyuan|qy|qingyuan1@QYS|\u6cc9\u5dde|quanzhou|qz|quanzhou@QYQ|\u743c\u6d77|qionghai|qh|qionghai@QYP|\u6e05\u6cb3\u57ce|qinghecheng|qhc|qinghecheng@QYL|\u6cc9\u9633|quanyang|qy|quanyang@QYJ|\u4e03\u8425|qiying|qy|qiying@QYH|\u621a\u5885\u5830|qishuyan|qsy|qishuyan@QYF|\u6c81\u9633|qinyang|qy|qinyang@QXV|\u7941\u53bf|qixian|qx|qixian@QXQ|\u524d\u5c71|qianshan|qs|qianshan@QXP|\u9752\u53bf|qingxian|qx|qingxian@QXJ|\u6865\u897f|qiaoxi|qx|qiaoxi@QXC|\u65d7\u4e0b\u8425|qixiaying|qxy|qixiaying@QWQ|\u7941\u9633|qiyang|qy|qiyang@QWP|\u524d\u82c7\u5858|qianweitang|qwt|qianweitang@QWH|\u5929\u67f1\u5c71|tianzhushan|tzs|tianzhushan@QWD|\u524d\u536b|qianwei|qw|qianwei@QVV|\u6c81\u53bf|qinxian|qx|qinxian@QVQ|\u7941\u9633\u5317|qiyangbei|qy|qiyangbei@QVP|\u5947\u5cf0\u5854|qifengta|qft|qifengta@QVH|\u9752\u7530|qingtian|qt|qingtian@QUY|\u5343\u6cb3|qianhe|qh|qianhe@QUV|\u6e05\u5f90|qingxu|qx|qingxu@QUJ|\u6e05\u6c34|qingshui|qs|qingshui@QTP|\u79e6\u7687\u5c9b|qinhuangdao|qhd|qinhuangdao@QTJ|\u9752\u94dc\u5ce1|qingtongxia|qtx|qingtongxia@QTB|\u4e03\u53f0\u6cb3|qitaihe|qth|qitaihe@QSW|\u9752\u57ce\u5c71|qingchengshan|qcs|qingchengshan@QSQ|\u5e86\u76db|qingsheng|qs|qingsheng@QSN|\u786e\u5c71|queshan|qs|queshan@QSJ|\u5e86\u9633\u5c71|qingyangshan|qys|qingyangshan@QSB|\u9752\u5c71|qingshan|qs|qingshan@QRZ|\u94a6\u5dde|qinzhou|qz|qinzhou@QRW|\u6e20\u53bf|quxian|qx|quxian@QRS|\u6cc9\u5dde\u4e1c|quanzhoudong|qzd|quanzhoudong@QRQ|\u7941\u4e1c\u5317|qidongbei|qd|qidongbei@QRN|\u8572\u6625|qichun|qc|qichun@QQP|\u8fc1\u5b89|qianan|qa|qianan@QQJ|\u77f3\u5634\u5c71|shizuishan|szs|shizuishan@QOY|\u5343\u9633|qianyang|qy|qianyang@QOT|\u4e7e\u5b89|qianan|qa|qianan1@QNZ|\u5168\u5dde\u5357|quanzhounan|qzn|quanzhounan@QNY|\u6e05\u6da7\u53bf|qingjianxian|qjx|qingjianxian@QNW|\u9ed4\u6c5f|qianjiang|qj|qianjiang@QMQ|\u7941\u4e1c|qidong|qd|qidong@QMP|\u524d\u78e8\u5934|qianmotou|qmt|qianmotou@QLZ|\u6e20\u9ece|quli|ql|quli@QLY|\u79e6\u5cad|qinling|ql|qinling@QLD|\u4e03\u91cc\u6cb3|qilihe|qlh|qilihe@QJZ|\u6e20\u65e7|qujiu|qj|qujiu@QJW|\u7da6\u6c5f|qijiang|qj|qijiang@QJN|\u6f5c\u6c5f|qianjiang|qj|qianjiang1@QJM|\u66f2\u9756|qujing|qj|qujing@QJB|\u79e6\u5bb6|qinjia|qj|qinjia@QIP|\u6e05\u6cb3|qinghe|qh|qinghe@QIH|\u7941\u95e8|qimen|qm|qimen@QHX|\u9f50\u9f50\u54c8\u5c14|qiqihaer|qqhe|qiqihaer@QHP|\u6e05\u534e\u56ed|qinghuayuan|qhy|qinghuayuan@QHK|\u9752\u5c9b\u5317|qingdaobei|qdb|qingdaobei@QHD|\u6e05\u6cb3\u95e8|qinghemen|qhm|qinghemen@QGH|\u9752\u9f99\u5c71|qinglongshan|qls|qinglongshan@QFT|\u5e86\u4e30|qingfeng|qf|qingfeng@QFK|\u66f2\u961c|qufu|qf|qufu@QFB|\u524d\u950b|qianfeng|qf|qianfeng@QEH|\u8862\u5dde|quzhou|qz|quzhou@QEB|\u524d\u8fdb\u9547|qianjinzhen|qjz|qianjinzhen@QDZ|\u94a6\u5dde\u4e1c|qinzhoudong|qzd|qinzhoudong@QDM|\u4e03\u7538|qidian|qd|qidian@QDK|\u9752\u5c9b|qingdao|qd|qingdao@QBT|\u7941\u5bb6\u5821|qijiapu|qjb|qijiapu@QBQ|\u6e05\u8fdc|qingyuan|qy|qingyuan@QAY|\u5c90\u5c71|qishan|qs|qishan@QAT|\u6865\u5934|qiaotou|qt|qiaotou@QAK|\u66f2\u961c\u4e1c|qufudong|qfd|qufudong@QAB|\u5e86\u5b89|qingan|qa|qingan@PZT|\u5e73\u5b89\u9547|pinganzhen|paz|pinganzhen@PZG|\u5f6d\u6cfd|pengze|pz|pengze@PZD|\u5e73\u5e84|pingzhuang|pz|pingzhuang@PYX|\u5e73\u6d0b|pingyang|py|pingyang@PYV|\u5e73\u9065|pingyao|py|pingyao@PYP|\u5e73\u5cea|pingyu|py|pingyu@PYK|\u5e73\u539f|pingyuan|py|pingyuan@PYJ|\u5f6d\u9633|pengyang|py|pengyang@PXZ|\u51ed\u7965|pingxiang|px|pingxiang@PXT|\u94c1\u5cad\u897f|tielingxi|tlx|tielingxi@PXJ|\u5761\u5e95\u4e0b|podixia|pdx|podixia@PXG|\u840d\u4e61|pingxiang|px|pingxiang1@PWV|\u5e73\u65fa|pingwang|pw|pingwang@PWT|\u666e\u6e7e|puwan|pw|puwan@PVT|\u5e73\u53f0|pingtai|pt|pingtai@PVD|\u76d8\u9526|panjin|pj|panjin@PTW|\u8461\u8404\u83c1|putaoqing|ptj|putaoqing@PTS|\u8386\u7530|putian|pt|putian@PTM|\u5e73\u7530|pingtian|pt|pingtian@PSW|\u5f6d\u5c71|pengshan|ps|pengshan@PSV|\u5e73\u793e|pingshe|ps|pingshe@PSR|\u76ae\u5c71|pishan|ps|pishan@PSQ|\u576a\u77f3|pingshi|ps|pingshi@PSL|\u78d0\u77f3|panshi|ps|panshi@PSB|\u5e73\u5c71|pingshan|ps|pingshan@PRW|\u6500\u679d\u82b1|panzhihua|pzh|panzhihua@PRT|\u74e2\u513f\u5c6f|piaoertun|pet|piaoertun@PRP|\u504f\u5e97|piandian|pd|piandian@PQP|\u5e73\u6cc9|pingquan|pq|pingquan@PPT|\u56db\u5e73\u4e1c|sipingdong|spd|sipingdong@PPJ|\u5e73\u539f\u5821|pingyuanpu|pyp|pingyuanpu@POW|\u666e\u96c4|puxiong|px|puxiong@POJ|\u5e73\u51c9\u5357|pingliangnan|pln|pingliangnan@POD|\u6ce1\u5b50|paozi|pz|paozi@PNT|\u504f\u5cad|pianling|pl|pianling@PNO|\u5e73\u5b89\u9a7f|pinganyi|pay|pinganyi@PND|\u5e73\u5e84\u5357|pingzhuangnan|pzn|pingzhuangnan@PMW|\u5f6d\u5dde|pengzhou|pz|pengzhou@PLT|\u666e\u5170\u5e97|pulandian|pld|pulandian@PKT|\u76ae\u53e3|pikou|pk|pikou@PKQ|\u5b89\u5316|anhua|ah|anhua@PJH|\u90b3\u5dde|pizhou|pz|pizhou@PIK|\u5e73\u9091|pingyi|py|pingyi@PIJ|\u5e73\u51c9|pingliang|pl|pingliang@PHW|\u5f6d\u6c34|pengshui|ps|pengshui@PHP|\u5f98\u5f8a\u5317|paihuibei|phb|paihuibei@PHM|\u5e73\u6cb3\u53e3|pinghekou|phk|pinghekou@PGZ|\u5e73\u679c|pingguo|pg|pingguo@PGV|\u5e73\u578b\u5173|pingxingguan|pxg|pingxingguan@PGM|\u5e73\u5173|pingguan|pg|pingguan@PGL|\u5e73\u5c97|pinggang|pg|pinggang@PFB|\u5e73\u623f|pingfang|pf|pingfang@PEY|\u84b2\u57ce\u4e1c|puchengdong|pcd|puchengdong@PEQ|\u666e\u5b81|puning|pn|puning@PEN|\u5e73\u9876\u5c71|pingdingshan|pds|pingdingshan@PDQ|\u5510\u5bb6\u6e7e|tangjiawan|tjw|tangjiawan@PDP|\u6f58\u5bb6\u5e97|panjiadian|pjd|panjiadian@PDB|\u88f4\u5fb7|peide|pd|peide@PCY|\u84b2\u57ce|pucheng|pc|pucheng@PCW|\u90eb\u53bf\u897f|pixianxi|pxx|pixianxi@PBD|\u76d8\u9526\u5317|panjinbei|pjb|panjinbei@PAZ|\u5e73\u5357\u5357|pingnannan|pn|pingnannan@PAW|\u84ec\u5b89|pengan|pa|pengan@PAN|\u666e\u5b89|puan|pa|puan@PAM|\u76d8\u5173|panguan|pg|panguan@PAL|\u5e73\u5b89|pingan|pa|pingan@PAJ|\u78d0\u5b89\u9547|pananzhen|paz|pananzhen@OZY|\u5b59\u9547|sunzhen|sz|sunzhen@OZW|\u4e09\u6c47\u9547|sanhuizhen|shz|sanhuizhen@OZP|\u6df1\u5dde|shenzhou|sz|shenzhou@OZL|\u677e\u6c5f\u9547|songjiangzhen|sjz|songjiangzhen@OYP|\u6c34\u6d0b|shuiyang|sy|shuiyang@OYN|\u4fe1\u9633\u4e1c|xinyangdong|xyd|xinyangdong@OYJ|\u6c34\u6e90|shuiyuan|sy|shuiyuan@OYD|\u4e09\u4e49\u4e95|sanyijing|syj|sanyijing@OXP|\u4e09\u6cb3\u53bf|sanhexian|shx|sanhexian@OXH|\u5bbf\u5dde|suzhou|sz|suzhou1@OVH|\u6b59\u53bf|shexian|sx|shexian@OUD|\u56db\u9053\u6e7e|sidaowan|sdw|sidaowan@OTW|\u6c34\u5bcc|shuifu|sf|shuifu@OTQ|\u6c55\u5934|shantou|st|shantou@OTB|\u77f3\u5934|shitou|st|shitou@OSW|\u77f3\u67f1\u53bf|shizhuxian|szx|shizhuxian@OSQ|\u6df1\u5733\u897f|shenzhenxi|szx|shenzhenxi@OSN|\u9ec4\u77f3\u4e1c|huangshidong|hsd|huangshidong@OSK|\u6cd7\u6c34|sishui|ss|sishui@ORQ|\u987a\u5fb7|shunde|sd|shunde@OQH|\u4e09\u95e8\u53bf|sanmenxian|smx|sanmenxian@ONY|\u5546\u5357|shangnan|sn|shangnan@OMY|\u795e\u6728|shenmu|sm|shenmu@OMQ|\u77f3\u95e8\u53bf|shimenxian|smx|shimenxian@OMP|\u4ec0\u91cc\u5e97|shilidian|sld|shilidian@OLY|\u5546\u6d1b|shangluo|sl|shangluo@OLK|\u53f8\u5bb6\u5cad|sijialing|sjl|sijialing@OLH|\u7ec5\u574a|shenfang|sf|shenfang@OKJ|\u4e09\u5173\u53e3|sanguankou|sgk|sanguankou@OJQ|\u987a\u5fb7\u5b66\u9662|shundexueyuan|sdxy|shundexueyuan@OJJ|\u6c88\u5bb6\u6cb3|shenjiahe|sjh|shenjiahe@OJB|\u6c88\u5bb6|shenjia|sj|shenjia@OHH|\u82cf\u5dde\u5317|suzhoubei|szb|suzhoubei@OHD|\u56db\u5408\u6c38|siheyong|shy|siheyong@OGQ|\u6c55\u5c3e|shanwei|sw|shanwei@OGC|\u6851\u6839\u8fbe\u6765|sanggendalai|sgdl|sanggendalai@OFB|\u53cc\u4e30|shuangfeng|sf|shuangfeng@OEP|\u6d89\u53bf|shexian|sx|shexian1@OEJ|\u4e09\u8425|sanying|sy|sanying@ODY|\u7ee5\u5fb7|suide|sd|suide@ODP|\u4e09\u5bb6\u5e97|sanjiadian|sjd|sanjiadian@OCH|\u8212\u57ce|shucheng|sc|shucheng@OBP|\u4e0a\u677f\u57ce\u5357|shangbanchengnan|sbcn|shangbanchengnan@OBJ|\u77f3\u575d|shiba|sb|shiba@OAH|\u5bbf\u677e|susong|ss|susong@NZX|\u78be\u5b50\u5c71|nianzishan|nzs|nianzishan@NZT|\u5357\u6742\u6728|nanzamu|nzm|nanzamu@NXT|\u725b\u5fc3\u53f0|niuxintai|nxt|niuxintai@NXQ|\u5b81\u4e61|ningxiang|nx|ningxiang@NXG|\u5357\u660c\u897f|nanchangxi|ncx|nanchangxi@NXF|\u5185\u4e61|neixiang|nx|neixiang@NWV|\u5b81\u6b66|ningwu|nw|ningwu@NWP|\u5357\u6e7e\u5b50|nanwanzi|nwz|nanwanzi@NVT|\u5b81\u5bb6|ningjia|nj|ningjia@NVH|\u5b81\u6ce2\u4e1c|ningbodong|nbd|ningbodong@NUW|\u8425\u5c71|yingshan|ys|yingshan@NUP|\u5357\u5cea|nanyu|ny|nanyu@NUH|\u5357\u901a|nantong|nt|nantong@NTT|\u5357\u53f0|nantai|nt|nantai@NSP|\u5357\u57ce\u53f8|nanchengsi|ncs|nanchengsi@NQO|\u90a3\u66f2|naqu|nq|naqu@NQJ|\u6696\u6cc9|nuanquan|nq|nuanquan@NQD|\u5357\u6865|nanqiao|nq|nanqiao@NPZ|\u90a3\u94fa|napu|np|napu@NPS|\u5357\u5e73|nanping|np|nanping@NOQ|\u5357\u5934|nantou|nt|nantou@NNZ|\u5357\u5b81|nanning|nn|nanning@NNS|\u5357\u5e73\u5357|nanpingnan|npn|nanpingnan@NNQ|\u5357\u6717|nanlang|nl|nanlang@NNH|\u5b81\u56fd|ningguo|ng|ningguo@NMZ|\u5b81\u660e|ningming|nm|ningming@NMX|\u5357\u6728|nanmu|nm|nanmu@NMP|\u5357\u5927\u5e99|nandamiao|ndm|nandamiao@NMD|\u5948\u66fc|naiman|nm|naiman@NLT|\u5357\u5173\u5cad|nanguanling|ngl|nanguanling@NLF|\u5b81\u9675\u53bf|ninglingxian|nlx|ninglingxian@NLD|\u4e43\u6797|nailin|nl|nailin@NKT|\u5357\u53e3\u524d|nankouqian|nkq|nankouqian@NKP|\u5357\u53e3|nankou|nk|nankou@NKH|\u5357\u4eac\u5357|nanjingnan|njn|nanjingnan@NJW|\u5185\u6c5f|neijiang|nj|neijiang@NJS|\u5357\u9756|nanjing|nj|nanjing1@NJH|\u5357\u4eac|nanjing|nj|nanjing@NJD|\u80fd\u5bb6|nengjia|nj|nengjia@NJB|\u725b\u5bb6|niujia|nj|niujia@NIW|\u9042\u5b81|suining|sn|suining@NIR|\u5c3c\u52d2\u514b|nileke|nlk|nileke@NIP|\u5a18\u5b50\u5173|niangziguan|nzg|niangziguan@NHX|\u8bb7\u6cb3|nehe|nh|nehe@NHS|\u5357\u534e|nanhua|nh|nanhua@NHJ|\u5357\u6cb3\u5ddd|nanhechuan|nhc|nanhechuan@NHH|\u5b81\u6d77|ninghai|nh|ninghai@NHD|\u6ce5\u6cb3\u5b50|nihezi|nhz|nihezi@NGX|\u5ae9\u6c5f|nenjiang|nj|nenjiang@NGP|\u5357\u89c2\u6751|nanguancun|ngc|nanguancun@NGH|\u5b81\u6ce2|ningbo|nb|ningbo@NFT|\u5357\u82ac|nanfen|nf|nanfen@NFP|\u5357\u5bab\u4e1c|nangongdong|ngd|nangongdong@NFG|\u5357\u4e30|nanfeng|nf|nanfeng@NFF|\u5357\u9633|nanyang|ny|nanyang@NES|\u5b81\u5fb7|ningde|nd|ningde@NEH|\u5357\u7fd4\u5317|nanxiangbei|nxb|nanxiangbei@NDZ|\u5357\u4e39|nandan|nd|nandan@NDN|\u5357\u6e56\u4e1c|nanhudong|nhd|nanhudong@NDG|\u5357\u57ce|nancheng|nc|nancheng@NDC|\u547c\u548c\u6d69\u7279\u4e1c|huhehaotedong|hhhtd|huhehaotedong@NCZ|\u5b81\u6751|ningcun|nc|ningcun@NCW|\u5357\u5145|nanchong|nc|nanchong@NCK|\u5357\u4ec7|nanchou|nc|nanchou@NCG|\u5357\u660c|nanchang|nc|nanchang@NCB|\u5357\u5c94|nancha|nc|nancha@NBK|\u5357\u535a\u5c71|nanboshan|nbs|nanboshan@NBB|\u897f\u5c97\u5b50|xigangzi|xgz|xigangzi@NAT|\u519c\u5b89|nongan|na|nongan@NAF|\u5357\u53ec|nanzhao|nz|nanzhao@NAB|\u5b81\u5b89|ningan|na|ningan@MZQ|\u677e\u6843|songtao|st|songtao@MZJ|\u5e99\u5e84|miaozhuang|mz|miaozhuang@MYW|\u7ef5\u9633|mianyang|my|mianyang@MYS|\u9ea6\u56ed|maiyuan|my|maiyuan@MVY|\u52c9\u53bf|mianxian|mx|mianxian@MVX|\u6f20\u6cb3|mohe|mh|mohe@MVQ|\u9ebb\u9633|mayang|my|mayang@MUT|\u660e\u6c34\u6cb3|mingshuihe|msh|mingshuihe@MUR|\u58a8\u7389|moyu|my|moyu@MUQ|\u731b\u6d1e\u6cb3|mengdonghe|mdh|mengdonghe@MUP|\u5bc6\u4e91|miyun|my|miyun@MUD|\u6728\u91cc\u56fe|mulitu|mlt|mulitu@MSW|\u7709\u5c71|meishan|ms|meishan@MST|\u7c73\u6c99\u5b50|mishazi|msz|mishazi@MSN|\u5e99\u5c71|miaoshan|ms|miaoshan@MSB|\u5bc6\u5c71|mishan|ms|mishan@MRX|\u83ab\u5c14\u9053\u560e|mordaga|medg|mordaga@MRB|\u5e3d\u513f\u5c71|maoershan|mes|maoershan@MQS|\u95fd\u6e05|minqing|mq|minqing@MQQ|\u6c68\u7f57\u4e1c|miluodong|mld|miluodong@MQF|\u6c11\u6743|minquan|mq|minquan@MQB|\u9a6c\u6865\u6cb3|maqiaohe|mqh|maqiaohe@MPQ|\u6c90\u6ec2|mupang|mp|mupang@MPH|\u6cd7\u9633|siyang|sy|siyang@MOQ|\u6885\u5dde|meizhou|mz|meizhou@MOM|\u8302\u820d\u7956|maoshezu|msz|maoshezu@MOH|\u5fb7\u6e05\u897f|deqingxi|dqx|deqingxi@MOB|\u78e8\u5200\u77f3|modaoshi|mds|modaoshi@MNR|\u739b\u7eb3\u65af\u6e56|manasihu|mnsh|manasihu@MNF|\u6e11\u6c60\u5357|mianchinan|mcn|mianchinan@MMZ|\u8302\u540d|maoming|mm|maoming@MMW|\u7c73\u6613|miyi|my|miyi@MLZ|\u8305\u5cad|maoling|ml|maoling@MLX|\u6ee1\u6d32\u91cc|manzhouli|mzl|manzhouli@MLQ|\u6c68\u7f57|miluo|ml|miluo@MLL|\u5e99\u5cad|miaoling|ml|miaoling@MLD|\u8302\u6797|maolin|ml|maolin@MLB|\u7a46\u68f1|muling|ml|muling@MKW|\u6f2b\u6c34\u6e7e|manshuiwan|msw|manshuiwan@MJT|\u9a6c\u4e09\u5bb6|masanjia|msj|masanjia@MID|\u9a6c\u6797|malin|ml|malin@MHZ|\u9a6c\u7687|mahuang|mh|mahuang@MHX|\u6ee1\u5f52|mangui|mg|mangui@MHQ|\u7f8e\u5170|meilan|ml|meilan@MHL|\u6885\u6cb3\u53e3|meihekou|mhk|meihekou@MHB|\u9a6c\u83b2\u6cb3|malianhe|mlh|malianhe@MGY|\u6bdb\u575d\u5173|maobaguan|mbg|maobaguan@MGN|\u660e\u6e2f|minggang|mg|minggang@MGM|\u9a6c\u9f99|malong|ml|malong@MGH|\u660e\u5149|mingguang|mg|mingguang@MGB|\u5b5f\u5bb6\u5c97|mengjiagang|mjg|mengjiagang@MFQ|\u660e\u73e0|mingzhu|mz|mingzhu@MEY|\u7c73\u8102|mizhi|mz|mizhi@MEB|\u7f8e\u6eaa|meixi|mx|meixi@MDX|\u514d\u6e21\u6cb3|mianduhe|mdh|mianduhe@MDQ|\u8302\u540d\u4e1c|maomingdong|mmd|maomingdong@MDN|\u660e\u6e2f\u4e1c|minggangdong|mgd|minggangdong@MDF|\u5f25\u6e21|midu|md|midu@MDB|\u7261\u4e39\u6c5f|mudanjiang|mdj|mudanjiang@MCN|\u9ebb\u57ce|macheng|mc|macheng@MCL|\u660e\u57ce|mingcheng|mc|mingcheng@MCF|\u6e11\u6c60|mianchi|mc|mianchi@MBY|\u6bdb\u575d|maoba|mb|maoba@MBN|\u9ebb\u57ce\u5317|machengbei|mcb|machengbei@MBM|\u8499\u81ea\u5317|mengzibei|mzb|mengzibei@MAP|\u5e99\u57ce|miaocheng|mc|miaocheng@MAH|\u9a6c\u978d\u5c71|maanshan|mas|maanshan@MAB|\u9ebb\u5c71|mashan|ms|mashan@LZZ|\u67f3\u5dde|liuzhou|lz|liuzhou@LZX|\u7acb\u5fd7|lizhi|lz|lizhi@LZT|\u9f99\u722a\u6c9f|longzhaogou|lzg|longzhaogou@LZS|\u6765\u821f|laizhou|lz|laizhou@LZJ|\u5170\u5dde|lanzhou|lz|lanzhou@LZD|\u8fbd\u4e2d|liaozhong|lz|liaozhong@LZA|\u9f99\u9547|longzhen|lz|longzhen@LYY|\u7565\u9633|lueyang|ly|lueyang@LYX|\u6797\u6e90|linyuan|ly|linyuan@LYT|\u8fbd\u9633|liaoyang|ly|liaoyang@LYS|\u9f99\u5ca9|longyan|ly|longyan@LYQ|\u8012\u9633|leiyang|ly|leiyang@LYP|\u6d9e\u6e90|laiyuan|ly|laiyuan@LYL|\u8fbd\u6e90|liaoyuan|ly|liaoyuan@LYF|\u6d1b\u9633|luoyang|ly|luoyang@LYD|\u51cc\u6e90|lingyuan|ly|lingyuan@LXY|\u9647\u53bf|longxian|lx|longxian@LXX|\u6797\u6d77|linhai|lh|linhai1@LXQ|\u4e34\u6e58|linxiang|lx|linxiang@LXL|\u8001\u8425|laoying|ly|laoying@LXJ|\u9647\u897f|longxi|lx|longxi@LXC|\u6797\u897f|linxi|lx|linxi1@LXB|\u6717\u4e61|langxiang|lx|langxiang@LWQ|\u4e34\u6fa7|linli|ll|linli@LWK|\u83b1\u829c\u4e1c|laiwudong|lwd|laiwudong@LWJ|\u7eff\u5316|lvhua|lh|lvhua@LWH|\u5170\u6eaa|lanxi|lx|lanxi@LVZ|\u6fd1\u6e4d|laituan|lt|laituan@LVV|\u7075\u4e18|lingqiu|lq|lingqiu@LVT|\u5218\u5bb6\u6cb3|liujiahe|ljh|liujiahe@LVS|\u7f57\u6e90|luoyuan|ly|luoyuan@LVP|\u516d\u9053\u6cb3\u5b50|liudaohezi|ldhz|liudaohezi@LVM|\u9c81\u756a|lufan|lf|lufan@LVK|\u4e34\u6c82|linyi|ly|linyi@LVJ|\u5170\u5dde\u4e1c|lanzhoudong|lzd|lanzhoudong@LUQ|\u9f99\u5ddd|longchuan|lc|longchuan@LUM|\u4e50\u5584\u6751|leshancun|lsc|leshancun@LUL|\u9732\u6c34\u6cb3|lushuihe|lsh|lushuihe@LUG|\u82a6\u6eaa|luxi|lx|luxi@LTZ|\u9ece\u5858|litang|lt|litang@LTP|\u82a6\u53f0|lutai|lt|lutai@LTJ|\u9a86\u9a7c\u5df7|luotuoxiang|ltx|luotuoxiang@LSV|\u7075\u77f3|lingshi|ls|lingshi@LST|\u65c5\u987a|lvshun|ls|lvshun@LSO|\u62c9\u8428|lasa|ls|lasa@LSG|\u5e90\u5c71|lushan|ls|lushan@LSD|\u67f3\u6811\u5c6f|liushutun|lst|liushutun@LSB|\u68a8\u6811\u9547|lishuzhen|lsz|lishuzhen@LRT|\u4eae\u7532\u5e97|liangjiadian|ljd|liangjiadian@LRN|\u7f57\u5c71|luoshan|ls|luoshan@LRM|\u9646\u826f|luliang|ll|luliang@LRJ|\u72fc\u5c3e\u5c71|langweishan|lws|langweishan@LRC|\u6797\u4e1c|lindong|ld|lindong@LQM|\u7984\u4e30\u5357|lufengnan|lfn|lufengnan@LQL|\u4e34\u6c5f|linjiang|lj|linjiang@LPQ|\u8012\u9633\u897f|leiyangxi|lyx|leiyangxi@LPP|\u843d\u5761\u5cad|luopoling|lpl|luopoling@LPM|\u7f57\u5e73|luoping|lp|luoping@LPG|\u4e50\u5e73\u5e02|lepingshi|lps|lepingshi@LPF|\u7075\u5b9d\u897f|lingbaoxi|lbx|lingbaoxi@LOP|\u843d\u57a1|luofa|lf|luofa@LON|\u6f2f\u6cb3|luohe|lh|luohe@LOM|\u82a6\u6c9f|lugou|lg|lugou@LNM|\u77f3\u6797\u5357|shilinnan|sln|shilinnan@LNL|\u67f3\u6cb3|liuhe|lh|liuhe@LNJ|\u7075\u6b66|lingwu|lw|lingwu@LNF|\u4e34\u988d|linying|ly|linying@LNB|\u5170\u5c97|langang|lg|langang@LMX|\u5587\u561b\u7538|lamadian|lmd|lamadian@LMK|\u6881\u5c71|liangshan|ls|liangshan@LMJ|\u6d1b\u95e8|luomen|lm|luomen@LMH|\u9f99\u6e38|longyou|ly|longyou@LMB|\u91cc\u6728\u5e97|limudian|lmd|limudian@LLW|\u9f99\u91cc|longli|ll|longli@LLT|\u8001\u8fb9|laobian|lb|laobian@LLQ|\u9646\u4e30|lufeng|lf|lufeng@LLG|\u91b4\u9675|liling|ll|liling@LLF|\u6d1b\u9633\u9f99\u95e8|luoyanglongmen|lylm|luoyanglongmen@LLB|\u5170\u68f1|lanling|ll|lanling@LKZ|\u9646\u5ddd|luchuan|lc|luchuan@LKV|\u67f3\u6797\u5357|liulinnan|lln|liulinnan@LKS|\u8fde\u6c5f|lianjiang|lj|lianjiang@LKQ|\u8def\u53e3\u94fa|lukoupu|lkp|lukoupu@LKF|\u5170\u8003|lankao|lk|lankao@LKB|\u6797\u53e3|linkou|lk|linkou@LJZ|\u5ec9\u6c5f|lianjiang|lj|lianjiang1@LJX|\u9f99\u6c5f|longjiang|lj|longjiang@LJW|\u7f57\u6c5f|luojiang|lj|luojiang@LJP|\u5eca\u574a|langfang|lf|langfang@LJL|\u9f99\u4e95|longjing|lj|longjing@LJB|\u674e\u5bb6|lijia|lj|lijia@LIZ|\u9e7f\u5be8|luzhai|lz|luzhai@LIW|\u516d\u679d|liuzhi|lz|liuzhi@LIQ|\u9675\u6c34|lingshui|ls|lingshui@LIJ|\u674e\u5bb6\u576a|lijiaping|ljp|lijiaping@LHX|\u62c9\u54c8|laha|lh|laha@LHV|\u5415\u6881|lvliang|ll|lvliang@LHP|\u9f99\u534e|longhua|lh|longhua1@LHM|\u4e3d\u6c5f|lijiang|lj|lijiang@LHC|\u4e34\u6cb3|linhe|lh|linhe@LHB|\u83b2\u6c5f\u53e3|lianjiangkou|ljk|lianjiangkou@LGT|\u8fde\u5c71\u5173|lianshanguan|lsg|lianshanguan@LGP|\u826f\u5404\u5e84|lianggezhuang|lgz|lianggezhuang@LGM|\u9f99\u9aa8\u7538|longgudian|lgd|longgudian@LGJ|\u9f99\u6c9f|longgou|lg|longgou@LGB|\u62c9\u53e4|lagu|lg|lagu@LFV|\u4e34\u6c7e|linfen|lf|linfen@LFP|\u5eca\u574a\u5317|langfangbei|lfb|langfangbei@LEX|\u516d\u5408\u9547|liuhezhen|lhz|liuhezhen@LET|\u674e\u77f3\u5be8|lishizhai|lsz|lishizhai@LEQ|\u6fa7\u53bf|lixian|lx|lixian@LEM|\u62c9\u9c8a|lazha|lz|lazha@LEJ|\u4e34\u6cfd|linze|lz|linze@LEH|\u6ea7\u9633|liyang|ly|liyang@LDQ|\u5a04\u5e95|loudi|ld|loudi@LDP|\u6881\u5e95\u4e0b|liangdixia|ldx|liangdixia@LDO|\u4e50\u90fd|ledu|ld|ledu@LDL|\u9e7f\u9053|ludao|ld|ludao@LDH|\u6ea7\u6c34|lishui|ls|lishui1@LDF|\u6d1b\u9633\u4e1c|luoyangdong|lyd|luoyangdong@LDD|\u51cc\u6e90\u4e1c|lingyuandong|lyd|lingyuandong@LCW|\u9686\u660c|longchang|lc|longchang@LCQ|\u4e50\u660c|lechang|lc|lechang@LCN|\u5229\u5ddd|lichuan|lc|lichuan@LCK|\u84dd\u6751|lancun|lc|lancun@LCG|\u4e34\u5ddd|linchuan|lc|linchuan@LBT|\u6797\u76db\u5821|linshengpu|lsp|linshengpu@LBN|\u6f2f\u6cb3\u897f|luohexi|lhx|luohexi@LBM|\u9f99\u5858\u575d|longtangba|ltb|longtangba@LBF|\u7075\u5b9d|lingbao|lb|lingbao@LAX|\u8001\u83b1|laolai|ll|laolai@LAS|\u9f99\u5c71\u9547|longshanzhen|lsz|longshanzhen@LAR|\u8f6e\u53f0|luntai|lt|luntai@LAQ|\u6d9f\u6e90|lianyuan|ly|lianyuan@LAJ|\u5170\u5dde\u897f|lanzhouxi|lzx|lanzhouxi@LAF|\u9c81\u5c71|lushan|ls|lushan1@LAB|\u62c9\u6797|lalin|ll|lalin@KZP|\u5eb7\u5e84|kangzhuang|kz|kangzhuang@KYT|\u5f00\u539f|kaiyuan|ky|kaiyuan@KXZ|\u5eb7\u7199\u5cad|kangxiling|kxl|kangxiling@KXT|\u5f00\u539f\u897f|kaiyuanxi|kyx|kaiyuanxi@KXN|\u9ec4\u5188\u897f|huanggangxi|hgx|huanggangxi@KXM|\u6606\u660e\u897f|kunmingxi|kmx|kunmingxi@KTT|\u5f00\u901a|kaitong|kt|kaitong@KTR|\u594e\u5c6f|kuitun|kt|kuitun@KTQ|\u8475\u6f6d|kuitan|kt|kuitan@KSR|\u5580\u4ec0|kashi|ks|kashi@KSN|\u9ec4\u77f3\u5317|huangshibei|hsb|huangshibei@KSH|\u6606\u5c71|kunshan|ks|kunshan@KSB|\u514b\u5c71|keshan|ks|keshan@KRN|\u534e\u5bb9\u5357|huarongnan|hrn|huarongnan@KQX|\u5580\u5587\u5176|kalaqi|klq|kalaqi@KQL|\u53e3\u524d|kouqian|kq|kouqian@KPM|\u8305\u8349\u576a|maocaoping|mcp|maocaoping@KOH|\u9ec4\u53e3|huangkou|hk|huangkou@KOB|\u514b\u4e1c|kedong|kd|kedong@KNQ|\u60e0\u5dde\u5357|huizhounan|hzn|huizhounan@KNN|\u82b1\u5c71\u5357|huashannan|hsn|huashannan@KNM|\u738b\u5bb6\u8425\u897f|wangjiayingxi|wjyx|wangjiayingxi@KNH|\u6606\u5c71\u5357|kunshannan|ksn|kunshannan@KMQ|\u9c98\u95e8|houmen|hm|houmen@KMM|\u6606\u660e|kunming|km|kunming@KLW|\u51ef\u91cc|kaili|kl|kaili@KLV|\u5ca2\u5c9a|kelan|kl|kelan@KLR|\u5e93\u5c14\u52d2|kuerle|kel|kuerle@KLH|\u516d\u5408|luhe|lh|luhe@KLD|\u5e93\u4f26|kulun|kl|kulun@KLC|\u5f00\u9c81|kailu|kl|kailu@KJB|\u5eb7\u91d1\u4e95|kangjinjing|kjj|kangjinjing@KHX|\u514b\u4e00\u6cb3|keyihe|kyh|keyihe@KHR|\u514b\u62c9\u739b\u4f9d|kelamayi|klmy|kelamayi@KHN|\u82b1\u6e56|huahu|hh|huahu@KGN|\u9ec4\u5188|huanggang|hg|huanggang@KFF|\u5f00\u5c01|kaifeng|kf|kaifeng@KEP|\u5b98\u5385\u897f|guantingxi|gtx|guantingxi@KDX|\u5e93\u90fd\u5c14|huder|kde|huder@KDT|\u5bbd\u7538|kuandian|kd|kuandian@KDQ|\u60e0\u4e1c|huidong|hd|huidong@KCR|\u5e93\u8f66|kuche|kc|kuche@KCP|\u5eb7\u57ce|kangcheng|kc|kangcheng@KCN|\u6f62\u5ddd|huangchuan|hc|huangchuan@KAW|\u5f00\u6c5f|kaijiang|kj|kaijiang@KAT|\u5f00\u5b89|kaian|ka|kaian@KAN|\u9ec4\u5188\u4e1c|huanggangdong|hgd|huanggangdong@KAM|\u6606\u9633|kunyang|ky|kunyang@KAH|\u82cf\u5dde\u56ed\u533a|suzhouyuanqu|szyq|suzhouyuanqu@KAB|\u594e\u5c71|kuishan|ks|kuishan@JZT|\u91d1\u5dde|jinzhou|jz|jinzhou@JZK|\u80f6\u5dde\u5317|jiaozhoubei|jzb|jiaozhoubei@JZH|\u91d1\u5be8|jinzhai|jz|jinzhai@JZD|\u9526\u5dde|jinzhou|jz|jinzhou2@JYZ|\u6c5f\u6c38|jiangyong|jy|jiangyong@JYW|\u7b80\u9633|jianyang|jy|jianyang@JYS|\u5efa\u9633|jianyang|jy|jianyang1@JYK|\u5de8\u91ce|juye|jy|juye@JYJ|\u9756\u8fdc|jingyuan|jy|jingyuan@JYH|\u7f19\u4e91|jinyun|jy|jinyun@JYF|\u6d4e\u6e90|jiyuan|jy|jiyuan@JYD|\u91d1\u6756\u5b50|jinzhangzi|jzz|jinzhangzi@JXV|\u4ecb\u4f11|jiexiu|jx|jiexiu@JXT|\u5939\u5fc3\u5b50|jiaxinzi|jxz|jiaxinzi@JXP|\u664b\u5dde|jinzhou|jz|jinzhou1@JXK|\u80f6\u5dde|jiaozhou|jz|jiaozhou@JXJ|\u9756\u8fdc\u897f|jingyuanxi|jyx|jingyuanxi@JXH|\u5609\u5174|jiaxing|jx|jiaxing@JXB|\u9e21\u897f|jixi|jx|jixi@JWX|\u5409\u6587|jiwen|jw|jiwen@JWQ|\u6c5f\u95e8|jiangmen|jm|jiangmen@JWH|\u53e5\u5bb9\u897f|jurongxi|jrx|jurongxi@JVV|\u7a37\u5c71|jishan|js|jishan@JVS|\u5efa\u74ef|jianou|jo|jianou@JVP|\u65e7\u5e84\u7a9d|jiuzhuangwo|jzw|jiuzhuangwo@JVJ|\u955c\u94c1\u5c71|jingtieshan|jts|jingtieshan@JUK|\u5609\u7965|jiaxiang|jx|jiaxiang@JUH|\u6c5f\u5c71|jiangshan|js|jiangshan@JUG|\u8fdb\u8d24|jinxian|jx|jinxian@JTX|\u963f\u6728\u5c14|amuer|ame|amuer@JTL|\u4e5d\u53f0|jiutai|jt|jiutai@JTJ|\u666f\u6cf0|jingtai|jt|jingtai@JTB|\u91d1\u5c71\u5c6f|jinshantun|jst|jinshantun@JST|\u9e21\u51a0\u5c71|jiguanshan|jgs|jiguanshan@JSM|\u5efa\u6c34|jianshui|js|jianshui@JSL|\u5409\u8212|jishu|js|jishu@JSH|\u5609\u5584|jiashan|js|jiashan@JRT|\u5de8\u5b9d|jubao|jb|jubao@JRQ|\u63ed\u9633|jieyang|jy|jieyang@JRN|\u5efa\u59cb|jianshi|js|jianshi@JRH|\u7ee9\u6eaa\u53bf|jixixian|jxx|jixixian@JQX|\u6c5f\u6865|jiangqiao|jq|jiangqiao@JQJ|\u9152\u6cc9|jiuquan|jq|jiuquan@JPC|\u7ecf\u68da|jingpeng|jp|jingpeng@JOP|\u7532\u5c71|jiashan|js|jiashan1@JOM|\u6c5f\u6240\u7530|jiangsuotian|jst|jiangsuotian@JOK|\u8392\u5357|junan|jn|junan@JOF|\u7126\u4f5c|jiaozuo|jz|jiaozuo@JOD|\u9526\u5dde\u5357|jinzhounan|jzn|jinzhounan@JOB|\u9e21\u4e1c|jidong|jd|jidong@JNV|\u4ea4\u57ce|jiaocheng|jc|jiaocheng@JNP|\u4e95\u5357|jingnan|jn|jingnan@JNL|\u4e5d\u53f0\u5357|jiutainan|jtn|jiutainan@JNK|\u6d4e\u5357|jinan|jn|jinan@JMP|\u519b\u7cae\u57ce\u5317|junliangchengbei|jlcb|junliangchengbei@JMN|\u8346\u95e8|jingmen|jm|jingmen@JMM|\u91d1\u9a6c\u6751|jinmacun|jmc|jinmacun@JMB|\u4f73\u6728\u65af|jiamusi|jms|jiamusi@JLS|\u5c06\u4e50|jiangle|jl|jiangle@JLL|\u5409\u6797|jilin|jl|jilin@JLJ|\u82a8\u5cad|jiling|jl|jiling@JKT|\u91d1\u5751|jinkeng|jk|jinkeng@JKP|\u84df\u53bf|jixian|jx|jixian@JKK|\u8392\u53bf|juxian|jx|juxian@JJZ|\u91d1\u57ce\u6c5f|jinchengjiang|jcj|jinchengjiang@JJW|\u6c5f\u6d25|jiangjin|jj|jiangjin@JJS|\u664b\u6c5f|jinjiang|jj|jinjiang@JJP|\u4e95\u9649|jingxing|jx|jingxing@JJH|\u6c5f\u5b81|jiangning|jn|jiangning@JJG|\u4e5d\u6c5f|jiujiang|jj|jiujiang@JJB|\u59dc\u5bb6|jiangjia|jj|jiangjia@JIY|\u9756\u8fb9|jingbian|jb|jingbian@JIR|\u7cbe\u6cb3\u5357|jinghenan|jhn|jinghenan@JIQ|\u5409\u9996|jishou|js|jishou@JIK|\u6d4e\u5b81|jining|jn|jining@JID|\u51cc\u6d77|linghai|lh|linghai@JIB|\u5efa\u4e09\u6c5f|jiansanjiang|jsj|jiansanjiang@JHZ|\u6c5f\u534e|jianghua|jh|jianghua@JHX|\u91d1\u6cb3|jinhe|jh|jinhe@JHR|\u7cbe\u6cb3|jinghe|jh|jinghe@JHP|\u9759\u6d77|jinghai|jh|jinghai@JHL|\u86df\u6cb3|jiaohe|jh|jiaohe@JHB|\u9526\u6cb3|jinhe|jh|jinhe1@JGX|\u52a0\u683c\u8fbe\u5947|jagdaqi|jgdq|jagdaqi@JGK|\u6d4e\u5357\u897f|jinanxi|jnx|jinanxi@JGJ|\u5609\u5cea\u5173|jiayuguan|jyg|jiayuguan@JGG|\u4e95\u5188\u5c71|jinggangshan|jgs|jinggangshan@JFW|\u6c5f\u6cb9|jiangyou|jy|jiangyou@JFP|\u4e95\u5e97|jingdian|jd|jingdian@JFF|\u5609\u5cf0|jiafeng|jf|jiafeng@JFD|\u5efa\u660c|jianchang|jc|jianchang@JET|\u5efa\u8bbe|jianshe|js|jianshe@JES|\u89d2\u7f8e|jiaomei|jm|jiaomei@JEQ|\u9756\u5dde|jingzhou|jz|jingzhou@JEF|\u664b\u57ce\u5317|jinchengbei|jcb|jinchengbei@JDB|\u5cfb\u5fb7|junde|jd|junde@JCS|\u5efa\u5b81\u53bf\u5317|jianningxianbei|jnxb|jianningxianbei@JCN|\u4eac\u5c71|jingshan|js|jingshan@JCK|\u9104\u57ce|juancheng|jc|juancheng@JCJ|\u91d1\u660c|jinchang|jc|jinchang@JCG|\u666f\u5fb7\u9547|jingdezhen|jdz|jingdezhen@JCF|\u664b\u57ce|jincheng|jc|jincheng@JBS|\u4e0a\u676d|shanghang|sh|shanghang@JBN|\u8346\u5dde|jingzhou|jz|jingzhou1@JBH|\u91d1\u534e\u897f|jinhuaxi|jhx|jinhuaxi@JBG|\u6c5f\u8fb9\u6751|jiangbiancun|jbc|jiangbiancun@JBD|\u91d1\u5b9d\u5c6f|jinbaotun|jbt|jinbaotun@JAL|\u96c6\u5b89|jian|ja|jian1@JAK|\u6d4e\u5357\u4e1c|jinandong|jnd|jinandong@JAC|\u96c6\u5b81\u5357|jiningnan|jnn|jiningnan@IZW|\u7ec7\u91d1|zhijin|zj|zhijin@IZQ|\u5e7f\u5dde\u5357|guangzhounan|gzn|guangzhounan@IYH|\u6c60\u5dde|chizhou|cz|chizhou@IXH|\u865e\u57ce\u53bf|yuchengxian|ycx|yuchengxian@IUQ|\u864e\u95e8|humen|hm|humen@ITH|\u82cf\u5dde\u65b0\u533a|suzhouxinqu|szxq|suzhouxinqu@IOQ|\u6df1\u5733\u5317|shenzhenbei|szb|shenzhenbei@INW|\u79bb\u5806\u516c\u56ed|liduigongyuan|ldgy|liduigongyuan@INH|\u5168\u6912|quanjiao|qj|quanjiao@IMQ|\u5149\u660e\u57ce|guangmingcheng|gmc|guangmingcheng@IMH|\u677e\u6c5f\u5357|songjiangnan|sjn|songjiangnan@ILP|\u516b\u8fbe\u5cad|badaling|bdl|badaling@IIQ|\u82f1\u5fb7\u897f|yingdexi|ydx|yingdexi@IGW|\u7ea2\u5149\u9547|hongguangzhen|hgz|hongguangzhen@IFQ|\u6df1\u5733\u576a\u5c71|shenzhenpingshan|szps|shenzhenpingshan@IFH|\u65e0\u9521\u65b0\u533a|wuxixinqu|wxxq|wuxixinqu@IEW|\u5df4\u4e2d|bazhong|bz|bazhong@IDW|\u8d35\u5b9a\u5357|guidingnan|gdn|guidingnan@ICW|\u6210\u90fd\u4e1c|chengdudong|cdd|chengdudong@ICQ|\u90f4\u5dde\u897f|chenzhouxi|czx|chenzhouxi@IBQ|\u5317\u6ed8|beijiao|b|beijiao@IAW|\u5927\u82f1\u4e1c|dayingdong|dyd|dayingdong@HZZ|\u5316\u5dde|huazhou|hz|huazhou@HZV|\u970d\u5dde|huozhou|hz|huozhou@HZT|\u6d77\u5768\u5b50|haituozi|htz|haituozi@HZM|\u82b1\u68da\u5b50|huapengzi|hpz|huapengzi@HZH|\u676d\u5dde|hangzhou|hz|hangzhou@HYY|\u5fbd\u53bf|huixian|hx|huixian@HYQ|\u8861\u9633|hengyang|hy|hengyang@HYP|\u97e9\u9ebb\u8425|hanmaying|hmy|hanmaying@HYK|\u6d77\u9633|haiyang|hy|haiyang@HYJ|\u9ec4\u7f8a\u9547|huangyangzhen|hyz|huangyangzhen@HXZ|\u8d3a\u5dde|hezhou|hz|hezhou@HXT|\u6d77\u57ce\u897f|haichengxi|hcx|haichengxi@HXP|\u6cb3\u95f4\u897f|hejianxi|hjx|hejianxi@HXJ|\u97e9\u5e9c\u6e7e|hanfuwan|hfw|hanfuwan@HWN|\u7ea2\u5b89|hongan|ha|hongan@HWK|\u9ed1\u65fa|heiwang|hw|heiwang@HWD|\u970d\u6797\u90ed\u52d2|huolinguole|hlgl|huolinguole@HVQ|\u8861\u9633\u4e1c|hengyangdong|hyd|hengyangdong@HVN|\u6dee\u6ee8|huaibin|hb|huaibin@HUW|\u534e\u84e5|huaying|hy|huaying@HUT|\u864e\u77f3\u53f0|hushitai|hst|hushitai@HUN|\u82b1\u56ed|huayuan|hy|huayuan@HUD|\u9ec4\u82b1\u7b52|huanghuatong|hht|huanghuatong@HUB|\u547c\u5170|hulan|hl|hulan@HTT|\u7687\u59d1\u5c6f|huanggutun|hgt|huanggutun@HTJ|\u7ea2\u5c98\u53f0|hongxiantai|hxt|hongxiantai@HSY|\u534e\u5c71|huashan|hs|huashan@HSQ|\u8861\u5c71|hengshan|hs|hengshan@HSP|\u8861\u6c34|hengshui|hs|hengshui@HSO|\u6d77\u77f3\u6e7e|haishiwan|hsw|haishiwan@HSN|\u9ec4\u77f3|huangshi|hs|huangshi@HSJ|\u7ea2\u5bfa\u5821|hongsipu|hsb|hongsipu@HRX|\u6d77\u62c9\u5c14|hailaer|hle|hailaer@HRV|\u6000\u4ec1|huairen|hr|huairen@HRP|\u6000\u67d4|huairou|hr|huairou@HRN|\u534e\u5bb9|huarong|hr|huarong@HRH|\u6dee\u5317|huaibei|hb|huaibei@HRB|\u6d77\u6797|hailin|hl|hailin@HQY|\u6c49\u9634|hanyin|hy|hanyin@HQM|\u9e64\u5e86|heqing|hq|heqing@HQB|\u9ed1\u53f0|heitai|ht|heitai@HPP|\u90af\u90f8\u4e1c|handandong|hdd|handandong@HPN|\u534e\u5bb9\u4e1c|huarongdong|hrd|huarongdong@HPD|\u846b\u82a6\u5c9b\u5317|huludaobei|hldb|huludaobei@HPB|\u6d2a\u6cb3|honghe|hh|honghe@HOY|\u6c49\u4e2d|hanzhong|hz|hanzhong@HOT|\u9ed1\u6c34|heishui|hs|heishui@HOH|\u6dee\u5357\u4e1c|huainandong|hnd|huainandong@HOB|\u9e64\u7acb|heli|hl|heli@HNO|\u6e5f\u6e90|huangyuan|hy|huangyuan@HNN|\u6a2a\u6c9f\u6865\u4e1c|henggouqiaodong|hgqd|henggouqiaodong@HNH|\u6d77\u5b81|haining|hn|haining@HNB|\u6866\u5357|huanan|hn|huanan@HMV|\u4faf\u9a6c|houma|hm|houma@HMT|\u86e4\u87c6\u5858|hamatang|gmt|hamatang@HMR|\u54c8\u5bc6|hami|hm|hami@HMQ|\u6d77\u53e3\u4e1c|haikoudong|hkd|haikoudong@HMJ|\u60e0\u519c|huinong|hn|huinong@HMB|\u9e64\u5317|hebei|hb|hebei@HLT|\u706b\u8fde\u5be8|huolianzhai|hlz|huolianzhai@HLR|\u54c8\u5bc6\u5357|haminan|hmn|haminan@HLN|\u8d3a\u80dc\u6865\u4e1c|heshengqiaodong|hsqd|heshengqiaodong@HLL|\u548c\u9f99|helong|hl|helong@HLD|\u846b\u82a6\u5c9b|huludao|hld|huludao@HLB|\u6d77\u4f26|hailun|hl|hailun@HKN|\u6c49\u53e3|hankou|hk|hankou@HKJ|\u6cb3\u53e3\u5357|hekounan|hkn|hekounan@HKH|\u9ec4\u5c71|huangshan|hs|huangshan@HKG|\u6e56\u53e3|hukou|hk|hukou@HKB|\u5bd2\u8471\u6c9f|hanconggou|hcg|hanconggou@HJV|\u6cb3\u6d25|hejin|hj|hejin@HJT|\u534e\u5bb6|huajia|hj|huajia@HJS|\u6db5\u6c5f|hanjiang|hj|hanjiang@HJR|\u548c\u9759|hejing|hj|hejing@HJM|\u82b1\u5bb6\u5e84|huajiazhuang|hjz|huajiazhuang@HJL|\u767d\u5c71\u5e02|baishanshi|bss|baishanshi@HJJ|\u8d3a\u5bb6\u5e97|hejiadian|hjd|hejiadian@HJF|\u83b7\u5609|huojia|hj|huojia@HJB|\u9ed1\u6cb3|heihe|hh|heihe@HIT|\u54c8\u62c9\u6d77|halahai|hlh|halahai@HIM|\u9ed1\u4e95|heijing|hj|heijing@HIL|\u6d77\u9f99|hailong|hl|hailong@HIK|\u83cf\u6cfd|heze|hz|heze@HIH|\u6d77\u5b89\u53bf|haianxian|hax|haianxian@HIB|\u6866\u6797|hualin|hl|hualin@HHT|\u6d51\u6cb3|hunhe|hh|hunhe@HHQ|\u6000\u5316|huaihua|hh|huaihua@HHP|\u864e\u4ec0\u54c8|hushiha|hsh|hushiha@HHL|\u9ec4\u6ce5\u6cb3|huangnihe|hnh|huangnihe@HHC|\u547c\u548c\u6d69\u7279|hohhot|hhht|hohhot@HHB|\u6d69\u826f\u6cb3|haolianghe|hlh|haolianghe@HGP|\u6c49\u6cbd|hangu|hg|hangu@HGJ|\u9ec4\u7f8a\u6ee9|huangyangtan|hyt|huangyangtan@HGH|\u676d\u5dde\u4e1c|hangzhoudong|hzd|hangzhoudong@HGC|\u5316\u5fb7|huade|hd|huade@HGB|\u9e64\u5c97|hegang|hg|hegang@HFR|\u970d\u5c14\u679c\u65af|huoerguosi|hegs|huoerguosi@HFM|\u7ea2\u6c5f|hongjiang|hj|hongjiang@HFH|\u5408\u80a5|hefei|hf|hefei@HFG|\u6a2a\u5cf0|hengfeng|hf|hengfeng@HFF|\u9e64\u58c1\u4e1c|hebidong|hbd|hebidong@HEY|\u5b8f\u5e86|hongqing|hq|hongqing@HEQ|\u8861\u5c71\u897f|hengshanxi|hsx|hengshanxi@HEM|\u7ea2\u679c|hongguo|hg|hongguo@HEB|\u6d77\u5317|haibei|hb|haibei@HDY|\u534e\u5c71\u5317|huashanbei|hsb|huashanbei@HDV|\u6d2a\u6d1e|hongdong|hd|hongdong@HDP|\u90af\u90f8|handan|hd|handan@HDL|\u9ec4\u677e\u7538|huangsongdian|hsd|huangsongdian@HDB|\u6a2a\u9053\u6cb3\u5b50|hengdaohezi|hdhz|hengdaohezi@HCZ|\u6cb3\u5507|hechun|hc|hechun@HCY|\u97e9\u57ce|hancheng|hc|hancheng@HCT|\u6d77\u57ce|haicheng|hc|haicheng@HCQ|\u60e0\u5dde|huizhou|hz|huizhou@HCP|\u9ec4\u6751|huangcun|hc|huangcun@HCN|\u6c49\u5ddd|hanchuan|hc|hanchuan@HCJ|\u9ed1\u51b2\u6ee9|heichongtan|hct|heichongtan@HBV|\u6cb3\u8fb9|hebian|hb|hebian@HBP|\u6000\u67d4\u5317|huairoubei|hrb|huairoubei@HBL|\u9ec4\u67cf|huangbai|hb|huangbai@HBB|\u54c8\u5c14\u6ee8|haerbin|heb|haerbin@HAY|\u5408\u9633|heyang|hy|heyang@HAX|\u54c8\u62c9\u82cf|harus|hls|harus@HAT|\u5bd2\u5cad|hanling|hl|hanling@HAN|\u5b9c\u660c\u4e1c|yichangdong|ycd|yichangdong@HAH|\u6dee\u5357|huainan|hn|huainan@HAF|\u9e64\u58c1|hebi|hb|hebi@GZT|\u9769\u9547\u5821|gezhenpu|gzb|gezhenpu@GZS|\u5149\u6cfd|guangze|gz|guangze@GZQ|\u5e7f\u5dde|guangzhou|gz|guangzhou@GZJ|\u74dc\u5dde|guazhou|gz|guazhou@GZG|\u8d63\u5dde|ganzhou|gz|ganzhou@GZD|\u9ad8\u6865\u9547|gaoqiaozhen|gqz|gaoqiaozhen@GZB|\u53e4\u57ce\u9547|guchengzhen|gcz|guchengzhen@GYW|\u5e7f\u5143|guangyuan|gy|guangyuan@GYL|\u83c7\u56ed|guyuan|gy|guyuan@GYH|\u6da1\u9633|guoyang|gy|guoyang@GYF|\u5de9\u4e49\u5357|gongyinan|gyn|gongyinan@GYD|\u516c\u8425\u5b50|gongyingzi|gyz|gongyingzi@GXT|\u76d6\u5dde|gaizhou|gz|gaizhou@GXQ|\u5e7f\u5dde\u897f|guangzhouxi|gzx|guangzhouxi@GXN|\u56fa\u59cb|gushi|gs|gushi@GXG|\u8d35\u6eaa|guixi|gx|guixi@GXF|\u5de9\u4e49|gongyi|gy|gongyi@GXD|\u560e\u4ec0\u7538\u5b50|gashidianzi|gsdz|gashidianzi@GVP|\u5b98\u9ad8|guangao|gg|guangao@GUJ|\u56fa\u539f|guyuan|gy|guyuan1@GTW|\u8d35\u5b9a|guiding|gd|guiding@GTS|\u53e4\u7530|gutian|gt|gutian@GTP|\u5b98\u5385|guanting|gt|guanting@GTJ|\u9ad8\u53f0|gaotai|gt|gaotai@GTH|\u6d0b\u6cb3|yanghe|yh|yanghe@GSW|\u8d76\u6c34|ganshui|gs|ganshui@GST|\u704c\u6c34|guanshui|gs|guanshui@GSS|\u51a0\u8c78\u5c71|guanzhishan|gzs|guanzhishan@GSQ|\u9ad8\u5dde|gaozhou|gz|gaozhou@GSP|\u5b64\u5c71\u53e3|gushankou|gsk|gushankou@GSN|\u5e7f\u6c34|guangshui|gs|guangshui@GSL|\u679c\u677e|guosong|gs|guosong@GSD|\u9ad8\u5c71\u5b50|gaoshanzi|gsz|gaoshanzi@GRX|\u53e4\u83b2|gulian|gl|gulian@GRT|\u5de5\u519c\u6e56|gongnonghu|gnh|gongnonghu@GRO|\u683c\u5c14\u6728|geermu|gem|geermu@GRH|\u5e7f\u5fb7|guangde|gd|guangde@GQY|\u7518\u6cc9|ganquan|gq|ganquan@GQH|\u6cd7\u6d2a|sihong|sh|sihong@GQD|\u7518\u65d7\u5361|ganqika|gqk|ganqika@GPM|\u5e7f\u901a\u5317|guangtongbei|gtb|guangtongbei@GPH|\u6cd7\u53bf|sixian|sx|sixian@GPF|\u9ad8\u5e73|gaoping|gp|gaoping@GOT|\u5b98\u5b57\u4e95|guanzijing|gzj|guanzijing@GOS|\u6f33\u5dde\u4e1c|zhangzhoudong|zzd|zhangzhoudong@GNT|\u5e7f\u5b81\u5bfa|guangningsi|gns|guangningsi@GNQ|\u53e4\u9547|guzhen|gz|guzhen@GNP|\u9ad8\u9091\u897f|gaoyixi|gyx|gaoyixi@GNN|\u845b\u5e97\u5357|gediannan|gdn|gediannan@GNM|\u5e7f\u5357\u536b|guangnanwei|gnw|guangnanwei@GNJ|\u5e72\u5858|gantang|gt|gantang@GMP|\u9ad8\u7891\u5e97\u4e1c|gaobeidiandong|gbdd|gaobeidiandong@GMK|\u9ad8\u5bc6|gaomi|gm|gaomi@GMH|\u7075\u74a7|lingbi|lb|lingbi@GMC|\u516c\u5e99\u5b50|gongmiaozi|gmz|gongmiaozi@GLZ|\u6842\u6797|guilin|gl|guilin@GLT|\u516c\u4e3b\u5cad|gongzhuling|gzl|gongzhuling@GLP|\u90ed\u78ca\u5e84|guoleizhuang|glz|guoleizhuang@GLJ|\u53e4\u6d6a|gulang|gl|gulang@GLF|\u5173\u6797|guanlin|gl|guanlin@GKT|\u5b64\u5bb6\u5b50|gujiazi|gjz|gujiazi@GJV|\u53e4\u4ea4|gujiao|gj|gujiao@GIW|\u8d35\u9633|guiyang|gy|guiyang@GIP|\u9ad8\u9091|gaoyi|gy|gaoyi@GHW|\u5e7f\u6c49|guanghan|gh|guanghan@GHT|\u5f52\u6d41\u6cb3|guiliuhe|glh|guiliuhe@GGZ|\u8d35\u6e2f|guigang|gg|guigang@GGT|\u845b\u6839\u5e99|gegenmiao|ggm|gegenmiao@GGQ|\u5e7f\u5dde\u4e1c|guangzhoudong|gzd|guangzhoudong@GGP|\u9ad8\u5404\u5e84|gaogezhuang|ggz|gaogezhuang@GGL|\u5e72\u6c9f|gangou|gg|gangou@GGJ|\u7518\u8c37|gangu|gg|gangu@GFP|\u56fa\u5b89|guan|ga|guan@GFM|\u9ad8\u697c\u623f|gaoloufang|glf|gaoloufang@GEY|\u7518\u6cc9\u5317|ganquanbei|gqb|ganquanbei@GEX|\u6839\u6cb3|genhe|gh|genhe@GEP|\u85c1\u57ce|gaocheng|gc|gaocheng@GEM|\u9769\u5c45|geju|gj|geju@GEJ|\u768b\u5170|gaolan|gl|gaolan@GEH|\u56fa\u9547|guzhen|gz|guzhen1@GDV|\u53e4\u4e1c|gudong|gd|gudong@GDT|\u90ed\u5bb6\u5e97|guojiadian|gjd|guojiadian@GDJ|\u7518\u8349\u5e97|gancaodian|gcd|gancaodian@GCV|\u9ad8\u6751|gaocun|gc|gaocun@GCT|\u897f\u67f3|xiliu|xl|xiliu@GCN|\u8c37\u57ce|gucheng|gc|gucheng@GBZ|\u6842\u6797\u5317|guilinbei|glb|guilinbei@GBT|\u516c\u4e3b\u5cad\u5357|gongzhulingnan|gzln|gongzhulingnan@GBQ|\u5e7f\u5dde\u5317|guangzhoubei|gzb|guangzhoubei@GBP|\u9ad8\u7891\u5e97|gaobeidian|gbd|gaobeidian@GBD|\u6c9f\u5e2e\u5b50|goubangzi|gbz|goubangzi@GAZ|\u6842\u5e73|guiping|gp|guiping@GAY|\u9ad8\u6ee9|gaotan|gt|gaotan@GAX|\u7518\u6cb3|ganhe|gh|ganhe@GAT|\u76d6\u5dde\u897f|gaizhouxi|gzx|gaizhouxi@GAG|\u5171\u9752\u57ce|gongqingcheng|gqc|gongqingcheng@FZY|\u51e4\u5dde|fengzhou|fz|fengzhou@FZS|\u798f\u5dde|fuzhou|fz|fuzhou@FZG|\u629a\u5dde|fuzhou|fz|fuzhou1@FZC|\u4e30\u9547|fengzhen|fz|fengzhen@FZB|\u4e30\u4e50\u9547|fenglezhen|flz|fenglezhen@FYX|\u5bcc\u88d5|fuyu|fy|fuyu@FYT|\u6276\u4f59|fuyu|fy|fuyu1@FYS|\u798f\u5dde\u5357|fuzhounan|fzn|fuzhounan@FYP|\u6d6e\u56fe\u5cea|futuyu|fty|futuyu@FYM|\u5bcc\u6e90|fuyuan|fy|fuyuan@FYH|\u961c\u9633|fuyang|fy|fuyang@FYG|\u5206\u5b9c|fenyi|fy|fenyi@FYB|\u629a\u8fdc|fuyuan|fy|fuyuan1@FXY|\u51e4\u53bf|fengxian|fx|fengxian@FXK|\u8d39\u53bf|feixian|fx|feixian@FXD|\u961c\u65b0|fuxin|fx|fuxin@FWH|\u681f\u8336|bencha|bc|bencha@FUW|\u4e30\u90fd|fengdu|fd|fengdu@FUQ|\u4e30\u987a|fengshun|fs|fengshun@FUP|\u5510\u5c71\u5317|tangshanbei|tsb|tangshanbei@FUH|\u51e4\u9633|fengyang|fy|fengyang@FTX|\u51af\u5c6f|fengtun|ft|fengtun@FTT|\u8303\u5bb6\u5c6f|fanjiatun|fjt|fanjiatun@FTB|\u798f\u5229\u5c6f|fulitun|flt|fulitun@FSZ|\u6276\u7ee5|fusui|fs|fusui@FSV|\u7e41\u5cd9|fanshi|fs|fanshi@FST|\u629a\u987a|fushun|fs|fushun@FSQ|\u4f5b\u5c71|foshan|fs|foshan@FSJ|\u4e30\u6c34\u6751|fengshuicun|fsc|fengshuicun@FRX|\u5bcc\u62c9\u5c14\u57fa|fulaerji|flej|fulaerji@FQS|\u798f\u6e05|fuqing|fq|fuqing@FNP|\u629a\u5b81|funing|fn|funing@FNH|\u961c\u5357|funan|fn|funan@FNG|\u4e30\u57ce\u5357|fengchengnan|fcn|fengchengnan@FMH|\u6cad\u9633|shuyang|sy|shuyang@FLW|\u6daa\u9675|fuling|fl|fuling@FLV|\u98ce\u9675\u6e21|fenglingdu|fld|fenglingdu@FKP|\u798f\u5c71\u53e3|fushankou|fsk|fushankou@FIH|\u80a5\u4e1c|feidong|fd|feidong@FIB|\u5bcc\u9526|fujin|fj|fujin@FHX|\u5bcc\u6d77|fuhai|fh|fuhai@FHT|\u51e4\u51f0\u57ce|fenghuangcheng|fhc|fenghuangcheng@FHR|\u798f\u6d77|fuhai|fh|fuhai1@FHP|\u6ee8\u6d77|binhai|bh|binhai@FHH|\u5949\u5316|fenghua|fh|fenghua@FEY|\u5bcc\u53bf|fuxian|fx|fuxian@FEW|\u6daa\u9675\u5317|fulingbei|flb|fulingbei@FET|\u629a\u987a\u5317|fushunbei|fsb|fushunbei@FES|\u798f\u9f0e|fuding|fd|fuding@FEM|\u53d1\u8033|faer|fe|faer@FDZ|\u5bcc\u5ddd|fuchuan|fc|fuchuan@FDY|\u5bcc\u53bf\u4e1c|fuxiandong|fxd|fuxiandong@FCP|\u6ee8\u6d77\u5317|binhaibei|bhb|binhaibei@FCG|\u4e30\u57ce|fengcheng|fc|fengcheng@FBZ|\u9632\u57ce\u6e2f\u5317|fangchenggangbei|fcgb|fangchenggangbei@FBT|\u6276\u4f59\u5317|fuyubei|fyb|fuyubei@FBH|\u970d\u90b1|huoqiu|hq|huoqiu@FBG|\u629a\u5dde\u5317|fuzhoubei|fzb|fuzhoubei@FAV|\u6c7e\u9633|fenyang|fy|fenyang@FAS|\u798f\u5b89|fuan|fa|fuan@EYB|\u65b0\u53cb\u8c0a|xinyouyi|xyy|xinyouyi@EXP|\u5174\u9686\u53bf|xinglongxian|xlx|xinglongxian@EXM|\u7965\u4e91|xiangyun|xy|xiangyun@EXH|\u4e39\u9633\u5317|danyangbei|dyb|danyangbei@EWH|\u5b9a\u8fdc|dingyuan|dy|dingyuan@EVH|\u4f59\u676d|yuhang|yh|yuhang@EUH|\u6d77\u5b81\u897f|hainingxi|hnx|hainingxi@EUG|\u5174\u56fd|xingguo|xg|xingguo@ETW|\u79c0\u5c71|xiushan|xs|xiushan@ESP|\u5c0f\u5bfa\u6c9f|xiaosigou|xsg|xiaosigou@ESN|\u6069\u65bd|enshi|es|enshi@ESH|\u5e38\u5dde\u5317|changzhoubei|czb|changzhoubei@ERP|\u65b0\u6756\u5b50|xinzhangzi|xzz|xinzhangzi@EPQ|\u6e86\u6d66|xupu|xp|xupu@EPH|\u5609\u5174\u5357|jiaxingnan|jxn|jiaxingnan@EPD|\u65b0\u7a9d\u94fa|xinwopu|xwp|xinwopu@ENW|\u897f\u660c\u5357|xichangnan|xcn|xichangnan@ENQ|\u5174\u5b81|xingning|xn|xingning@ENP|\u8f9b\u96c6|xinji|xj|xinji@EMW|\u5ce8\u7709|emei|em|emei@ELP|\u65b0\u4e50|xinle|xl|xinle@ELA|\u4e8c\u9f99\u5c71\u5c6f|erlongshantun|elst|erlongshantun@EKY|\u5c0f\u6cb3\u9547|xiaohezhen|xhz|xiaohezhen@EKM|\u897f\u8857\u53e3|xijiekou|xjk|xijiekou@EKB|\u5174\u51ef|xingkai|xk|xingkai@EJM|\u5c0f\u5f97\u6c5f|xiaodejiang|xdj|xiaodejiang@EJH|\u590f\u9091\u53bf|xiayixian|xyx|xiayixian@EJG|\u5ce1\u6c5f|xiajiang|xj|xiajiang@EJC|\u989d\u6d4e\u7eb3|ejina|ejn|ejina@EIP|\u4e0b\u53f0\u5b50|xiataizi|xtz|xiataizi@EIF|\u8944\u57a3|xiangyuan|xy|xiangyuan@EHQ|\u65b0\u5316|xinhua|xh|xinhua1@EGH|\u91d1\u5c71\u5317|jinshanbei|jsb|jinshanbei@EGG|\u65b0\u5e72|xingan|xg|xingan@EGF|\u65b0\u4e61\u4e1c|xinxiangdong|xxd|xinxiangdong@EFW|\u957f\u5bff|changshou|cs|changshou@EFQ|\u65b0\u4f1a|xinhui|xh|xinhui@EFN|\u9102\u5dde\u4e1c|ezhoudong|ezd|ezhoudong@EFG|\u4fe1\u4e30|xinfeng|xf|xinfeng@EEQ|\u4fe1\u5b9c|xinyi|xy|xinyi1@EEP|\u659c\u6cb3\u6da7|xiehejian|xhj|xiehejian@EDW|\u559c\u5fb7|xide|xd|xide@EDP|\u90a2\u53f0\u4e1c|xingtaidong|xtd|xingtaidong@ECW|\u897f\u660c|xichang|xc|xichang@ECN|\u9102\u5dde|ezhou|ez|ezhou@ECH|\u5ba3\u57ce|xuancheng|xc|xuancheng@EBW|\u5ce8\u8fb9|ebian|eb|ebian@EBP|\u4e0b\u677f\u57ce|xiabancheng|xbc|xiabancheng@EAY|\u897f\u5b89\u5317|xianbei|xab|xianbei@EAQ|\u5c0f\u6984|xiaolan|xl|xiaolan@EAM|\u65b0\u5b89|xinan|xa|xinan@EAH|\u5609\u5584\u5357|jiashannan|jsn|jiashannan@DZZ|\u5927\u738b\u6ee9|dawangtan|dwt|dawangtan@DZY|\u5927\u7af9\u56ed|dazhuyuan|dzy|dazhuyuan@DZX|\u5927\u5e86|daqing|dq|daqing@DZV|\u4e1c\u5e84|dongzhuang|dz|dongzhuang@DZP|\u5fb7\u5dde|dezhou|dz|dezhou@DZD|\u5927\u8425\u5b50|dayingzi|dyz|dayingzi@DYZ|\u5927\u5143|dayuan|dy|dayuan@DYX|\u5927\u96c1|dayan|dy|dayan@DYW|\u5fb7\u9633|deyang|dy|deyang@DYV|\u5927\u8425|daying|dy|daying@DYN|\u5f53\u9633|dangyang|dy|dangyang@DYJ|\u5b9a\u8fb9|dingbian|db|dingbian@DYH|\u4e39\u9633|danyang|dy|danyang@DYC|\u4e1c\u80dc\u897f|dongshengxi|dsx|dongshengxi@DXX|\u5927\u5174|daxing|dx|daxing@DXV|\u5b9a\u8944|dingxiang|dx|dingxiang@DXT|\u5fb7\u60e0\u897f|dehuixi|dhx|dehuixi@DXP|\u5b9a\u5dde|dingzhou|dz|dingzhou@DXM|\u7538\u5fc3|dianxin|dx|dianxin@DXL|\u5927\u5174\u6c9f|daxinggou|dxg|daxinggou@DXG|\u4e1c\u4e61|dongxiang|dx|dongxiang@DXD|\u4e1c\u8f9b\u5e84|dongxinzhuang|dxz|dongxinzhuang@DWV|\u5151\u9547|duizhen|dz|duizhen@DWT|\u767b\u6c99\u6cb3|dengshahe|dsh|dengshahe@DWJ|\u4f4e\u7a9d\u94fa|diwopu|dwp|diwopu@DVW|\u5fb7\u660c|dechang|dc|dechang@DVT|\u5927\u5821|dapu|db|dapu@DVQ|\u4f4e\u5e84|dizhuang|dz|dizhuang@DUX|\u5927\u6768\u6811|dayangshu|dys|dayangshu@DUT|\u4e39\u4e1c|dandong|dd|dandong@DTX|\u72ec\u7acb\u5c6f|dulitun|dlt|dulitun@DTV|\u5927\u540c|datong|dt|datong@DTT|\u5927\u5b98\u5c6f|daguantun|dgt|daguantun@DTL|\u4e1c\u901a\u5316|dongtonghua|dth|dongtonghua@DTJ|\u5927\u6218\u573a|dazhanchang|dzc|dazhanchang@DSL|\u5927\u77f3\u5934|dashitou|dst|dashitou@DSJ|\u5b9a\u897f|dingxi|dx|dingxi@DSD|\u5927\u9752\u6c9f|daqinggou|dqg|daqinggou@DRX|\u5f97\u8033\u5e03\u5c14|derbur|debe|derbur@DRQ|\u4e1c\u5347|dongsheng|ds|dongsheng@DRJ|\u4e1c\u6e7e|dongwan|dw|dongwan@DRH|\u5fb7\u6e05|deqing|dq|deqing@DRD|\u5200\u5c14\u767b|daoerdeng|ded|daoerdeng@DRB|\u4e1c\u4e8c\u9053\u6cb3|dongerdaohe|dedh|dongerdaohe@DQX|\u5927\u5176\u62c9\u54c8|daqilaha|dqlh|daqilaha@DQT|\u5927\u77f3\u6865|dashiqiao|dsq|dashiqiao@DQK|\u5b9a\u9676|dingtao|dt|dingtao@DQH|\u4e1c\u6d77\u53bf|donghaixian|dhx|donghaixian@DQD|\u5927\u7ea2\u65d7|dahongqi|dhq|dahongqi@DQB|\u5bf9\u9752\u5c71|duiqingshan|dqs|duiqingshan@DPM|\u8bfb\u4e66\u94fa|dushupu|dsp|dushupu@DPK|\u4e1c\u8425|dongying|dy|dongying@DPI|\u5927\u57d4|dapu|dp|dapu1@DPD|\u5927\u5e73\u623f|dapingfang|dpf|dapingfang@DOP|\u5b9a\u5dde\u4e1c|dingzhoudong|dzd|dingzhoudong@DOF|\u9093\u5dde|dengzhou|dz|dengzhou@DOC|\u4e1c\u80dc|dongsheng|ds|dongsheng1@DNZ|\u5927\u62df|dani|dn|dani@DNV|\u4e1c\u9547|dongzhen|dz|dongzhen@DNT|\u5927\u5c6f|datun|dt|datun@DNG|\u5b9a\u5357|dingnan|dn|dingnan@DNF|\u4e1c\u660e\u53bf|dongmingxian|dmx|dongmingxian@DNC|\u8fbe\u62c9\u7279\u897f|dalatexi|dltx|dalatexi@DMQ|\u4e1c\u839e\u4e1c|dongguandong|dgd|dongguandong@DMM|\u90fd\u683c|duge|dg|duge@DML|\u9053\u6e05|daoqing|dq|daoqing@DMD|\u4e1c\u660e\u6751|dongmingcun|dmc|dongmingcun@DLV|\u8c46\u7f57|douluo|dl|douluo@DLT|\u5927\u8fde|dalian|dl|dalian@DLD|\u5927\u6797|dalin|dl|dalin@DLC|\u5927\u9646\u53f7|daluhao|dlh|daluhao@DLB|\u5e26\u5cad|dailing|dl|dailing@DKV|\u4ee3\u53bf|daixian|dx|daixian@DKP|\u5927\u53e3\u5c6f|dakoutun|dkt|dakoutun@DKM|\u5927\u7406|dali|dl|dali@DKJ|\u5927\u78f4\u6c9f|dadenggou|ddg|dadenggou@DKH|\u7800\u5c71|dangshan|ds|dangshan@DKB|\u4e1c\u6d25|dongjin|dj|dongjin@DJT|\u8fbe\u5bb6\u6c9f|dajiagou|djg|dajiagou@DJP|\u5927\u8425\u9547|dayingzhen|dyz|dayingzhen@DJL|\u675c\u5bb6|dujia|dj|dujia@DJB|\u4e1c\u4eac\u57ce|dongjingcheng|djc|dongjingcheng@DIQ|\u5f20\u5bb6\u754c|zhangjiajie|zjj|zhangjiajie@DIP|\u5fb7\u5dde\u4e1c|dezhoudong|dzd|dezhoudong@DIM|\u5927\u82f4|daju|dj|daju@DIL|\u4e1c\u4e30|dongfeng|df|dongfeng@DIC|\u8fbe\u62c9\u7279\u65d7|dalateqi|dltq|dalateqi@DHT|\u5fb7\u60e0|dehui|dh|dehui@DHR|\u67f3\u56ed|liuyuan|ly|liuyuan@DHP|\u5927\u7070\u5382|dahuichang|dhc|dahuichang@DHO|\u5fb7\u4ee4\u54c8|delingha|dlh|delingha@DHL|\u6566\u5316|dunhua|dh|dunhua@DHJ|\u6566\u714c|dunhuang|dh|dunhuang@DHD|\u5927\u864e\u5c71|dahushan|dhs|dahushan@DHB|\u4e1c\u6d77|donghai|dh|donghai@DGY|\u4e39\u51e4|danfeng|df|danfeng@DGT|\u706f\u5854|dengta|dt|dengta@DGP|\u4e1c\u5149|dongguang|dg|dongguang@DGJ|\u6253\u67f4\u6c9f|dachaigou|dcg|dachaigou@DFZ|\u9053\u5dde|daozhou|dz|daozhou@DFT|\u5927\u8fde\u5317|dalianbei|dlb|dalianbei@DFP|\u5927\u6da7|dajian|dj|dajian@DFM|\u5927\u6e7e\u5b50|dawanzi|dwz|dawanzi@DFJ|\u5927\u6b66\u53e3|dawukou|dwk|dawukou@DFB|\u4e1c\u65b9\u7ea2|dongfanghong|dfh|dongfanghong@DEP|\u6d1e\u5e99\u6cb3|dongmiaohe|dmh|dongmiaohe@DDW|\u90fd\u6c5f\u5830|dujiangyan|djy|dujiangyan@DDB|\u6ef4\u9053|didao|dd|didao@DCZ|\u4e1c\u5b89\u4e1c|dongandong|dad|dongandong@DCT|\u5927\u6210|dacheng|dc|dacheng@DCH|\u4e1c\u81f3|dongzhi|dz|dongzhi@DBV|\u4e1c\u6de4\u5730|dongyudi|dyd|dongyudi@DBN|\u5927\u51b6\u5317|dayebei|dyb|dayebei@DBM|\u5927\u7530\u8fb9|datianbian|dtb|datianbian@DBJ|\u5927\u575d|daba|db|daba@DBH|\u4e1c\u53f0|dongtai|dt|dongtai@DBD|\u5927\u5df4|daba|db|daba1@DBC|\u5927\u677f|daban|db|daban@DBB|\u4e1c\u8fb9\u4e95|dongbianjing|dbj|dongbianjing@DAQ|\u5e38\u5e73|changping|cp|changping@DAP|\u5927\u6756\u5b50|dazhangzi|dzz|dazhangzi@DAG|\u5fb7\u5b89|dean|da|dean@CZZ|\u5d07\u5de6|chongzuo|cz|chongzuo@CZQ|\u90f4\u5dde|chenzhou|cz|chenzhou@CZL|\u671d\u9633\u9547|chaoyangzhen|cyz|chaoyangzhen@CZJ|\u957f\u5f81|changzheng|cz|changzheng@CZH|\u5e38\u5dde|changzhou|cz|changzhou@CZF|\u957f\u6cbb|changzhi|cz|changzhi@CZB|\u6210\u9ad8\u5b50|chenggaozi|cgz|chenggaozi@CYP|\u8d85\u6881\u6c9f|chaolianggou|clg|chaolianggou@CYN|\u957f\u9633|changyang|cy|changyang@CYL|\u671d\u9633\u5ddd|chaoyangchuan|cyc|chaoyangchuan@CYK|\u78c1\u7a91|ciyao|cy|ciyao@CYF|\u957f\u57a3|changyuan|cy|changyuan@CYD|\u671d\u9633|chaoyang|cy|chaoyang@CXT|\u9648\u76f8\u5c6f|chenxiangtun|cxt|chenxiangtun@CXQ|\u8fb0\u6eaa|chenxi|cx|chenxi@CXK|\u66f9\u53bf|caoxian|cx|caoxian@CXH|\u6ec1\u5dde|chuzhou|cz|chuzhou@CWQ|\u957f\u6c99\u5357|changshanan|csn|changshanan@CWM|\u8f66\u8f6c\u6e7e|chezhuanwan|czw|chezhuanwan@CWJ|\u891a\u5bb6\u6e7e|zhujiawan|cjw|zhujiawan@CVT|\u957f\u5c71\u5c6f|changshantun|cst|changshantun@CVK|\u5e38\u5e84|changzhuang|cz|changzhuang@CUW|\u91cd\u5e86\u5317|chongqingbei|cqb|chongqingbei@CUQ|\u6148\u5229|cili|cl|cili@CUH|\u6ec1\u5dde\u5317|chuzhoubei|czb|chuzhoubei@CTT|\u660c\u56fe|changtu|ct|changtu@CTH|\u4f59\u59da\u5317|yuyaobei|yyb|yuyaobei@CST|\u82cd\u77f3|cangshi|cs|cangshi@CSQ|\u957f\u6c99|changsha|cs|changsha@CSP|\u78c1\u5c71|cishan|cs|cishan@CSL|\u8349\u5e02|caoshi|cs|caoshi@CSC|\u5bdf\u7d20\u9f50|chasuqi|csq|chasuqi@CSB|\u695a\u5c71|chushan|cs|chushan@CRW|\u91cd\u5e86\u5357|chongqingnan|cqn|chongqingnan@CRT|\u957f\u6625\u897f|changchunxi|ccx|changchunxi@CRP|\u78c1\u897f|cixi|cx|cixi@CRG|\u5d07\u4ec1|chongren|cr|chongren@CQW|\u91cd\u5e86|chongqing|cq|chongqing@CQQ|\u6625\u6e7e|chunwan|cw|chunwan@CQB|\u8fb0\u6e05|chenqing|cq|chenqing@CPT|\u660c\u56fe\u897f|changtuxi|ctx|changtuxi@CPP|\u660c\u5e73|changping|cp|changping1@CPM|\u957f\u5761\u5cad|changpoling|cpl|changpoling@COW|\u957f\u5bff\u5317|changshoubei|csb|changshoubei@COP|\u6ca7\u5dde|cangzhou|cz|cangzhou@COM|\u695a\u96c4|chuxiong|cx|chuxiong@COH|\u5408\u80a5\u5317\u57ce|hefeibeicheng|hfbc|hefeibeicheng@CNZ|\u5c91\u6eaa|cenxi|cx|cenxi@CNW|\u6210\u90fd\u5357|chengdunan|cdn|chengdunan@CNQ|\u6f6e\u9633|chaoyang|cy|chaoyang@CNJ|\u957f\u519c|changnong|cn|changnong@CMB|\u6668\u660e|chenming|cm|chenming@CLT|\u957f\u5cad\u5b50|changlingzi|clz|changlingzi@CLP|\u660c\u9ece|changli|cl|changli@CLK|\u660c\u4e50|changle|cl|changle@CKT|\u8349\u6cb3\u53e3|caohekou|chk|caohekou@CKQ|\u6f6e\u5dde|chaozhou|cz|chaozhou@CJY|\u8521\u5bb6\u5761|caijiapo|cjp|caijiapo@CJX|\u6210\u5409\u601d\u6c57|qinggishan|cjsh|qinggishan@CJT|\u8521\u5bb6\u6c9f|caijiagou|cjg|caijiagou@CIP|\u78c1\u53bf|cixian|cx|cixian@CIN|\u8d64\u58c1\u5317|chibibei|cbb|chibibei@CIH|\u5de2\u6e56|chaohu|ch|chaohu@CID|\u8d64\u5cf0\u897f|chifengxi|cfx|chifengxi@CHZ|\u518c\u4ea8|ceheng|ch|ceheng@CHP|\u5d14\u9ec4\u53e3|cuihuangkou|chk|cuihuangkou@CHB|\u67f4\u6cb3|chaihe|ch|chaihe@CGY|\u57ce\u56fa|chenggu|cg|chenggu@CGV|\u67f4\u6c9f\u5821|chaigoupu|cgb|chaigoupu@CGT|\u67f4\u5c97|chaigang|cg|chaigang@CFP|\u66f9\u5b50\u91cc|caozili|czl|caozili@CFH|\u957f\u5174\u5357|changxingnan|cxn|changxingnan@CFD|\u8d64\u5cf0|chifeng|cf|chifeng@CEX|\u521b\u4e1a\u6751|chuangyecun|cyc|chuangyecun@CET|\u957f\u6625\u5357|changchunnan|ccn|changchunnan@CES|\u957f\u6c40|changting|ct|changting@CEK|\u57ce\u9633|chengyang|cy|chengyang@CEJ|\u957f\u57ce|changcheng|cc|changcheng@CEH|\u82cd\u5357|cangnan|cn|cangnan@CEF|\u957f\u845b|changge|cg|changge@CDW|\u6210\u90fd|chengdu|cd|chengdu@CDT|\u957f\u7538|changdian|cd|changdian@CDP|\u627f\u5fb7|chengde|cd|chengde@CDG|\u8336\u9675|chaling|cl|chaling@CDD|\u671d\u9633\u5730|chaoyangdi|cyd|chaoyangdi@CDB|\u957f\u6c40\u9547|changtingzhen|ctz|changtingzhen@CCT|\u957f\u6625|changchun|cc|changchun@CCP|\u627f\u5fb7\u4e1c|chengdedong|cdd|chengdedong@CCM|\u957f\u51b2|changchong|cc|changchong@CBQ|\u6f6e\u6c55|chaoshan|cs|chaoshan@CBP|\u6ca7\u5dde\u897f|cangzhouxi|czx|cangzhouxi@CBN|\u8d64\u58c1|chibi|cb|chibi@CBH|\u957f\u5174|changxing|cx|changxing@CBF|\u957f\u6cbb\u5317|changzhibei|czb|changzhibei@CBC|\u67e5\u5e03\u560e|chabuga|cbg|chabuga@CAY|\u897f\u5b89\u5357|xiannan|xan|xiannan@CAX|\u5d6f\u5c97|cuogang|cg|cuogang@CAM|\u5c94\u6c5f|chajiang|cj|chajiang@CAL|\u6625\u9633|chunyang|cy|chunyang@CAJ|\u9648\u5b98\u8425|chenguanying|cgy|chenguanying@BZP|\u6cca\u5934|botou|bt|botou@BZH|\u4eb3\u5dde|bozhou|bz|bozhou@BYT|\u9c85\u9c7c\u5708|bayuquan|byq|bayuquan@BYP|\u5317\u5c6f|beitun|bt|beitun@BYC|\u767d\u97f3\u5bdf\u5e72|bayanqagan|bycg|bayanqagan@BYB|\u80cc\u836b\u6cb3|beiyinhe|byh|beiyinhe@BXT|\u672c\u6eaa|benxi|bx|benxi@BXR|\u5317\u5c6f\u5e02|beitunshi|bts|beitunshi@BXP|\u5317\u4eac\u897f|beijingxi|bjx|beijingxi@BXK|\u535a\u5174|boxing|bx|boxing@BXJ|\u767d\u94f6\u897f|baiyinxi|byx|baiyinxi@BWQ|\u535a\u9ccc|boao|ba|boao@BWH|\u5b9d\u534e\u5c71|baohuashan|bhs|baohuashan@BVP|\u5317\u5b85|beizhai|bz|beizhai@BVC|\u8d32\u7ea2|benhong|bh|benhong@BUT|\u5e03\u6d77|buhai|bh|buhai@BUP|\u677f\u57ce|bancheng|bc|bancheng@BUM|\u767d\u6c34\u9547|baishuizhen|bsz|baishuizhen@BTT|\u5317\u53f0|beitai|bt|beitai@BTQ|\u5742\u7530|bantian|bt|bantian@BTD|\u516b\u89d2\u53f0|bajiaotai|bjt|bajiaotai@BTC|\u5305\u5934|baotou|bt|baotou@BSY|\u767d\u6c34\u6c5f|baishuijiang|bsj|baishuijiang@BSW|\u767d\u6c99|baisha|bs|baisha@BSB|\u7b14\u67b6\u5c71|bijiashan|bjs|bijiashan@BRZ|\u767e\u6d6a|bailang|bl|bailang@BRP|\u5317\u9a6c\u5708\u5b50|beimajuanzi|bmqz|beimajuanzi@BQP|\u767d\u65d7|baiqi|bq|baiqi@BQL|\u767d\u6cc9|baiquan|bq|baiquan@BQC|\u5b9d\u62c9\u683c|baolage|blg|baolage@BQB|\u5b9d\u6cc9\u5cad|baoquanling|bql|baoquanling@BPW|\u5317\u789a|beibei|bb|beibei@BPP|\u5b9d\u577b|baodi|bd|baodi@BPM|\u767d\u6c99\u5761|baishapo|bsp|baishapo@BOZ|\u5317\u6d41|beiliu|bl|beiliu@BOR|\u535a\u4e50|bole|bl|bole@BOP|\u5317\u4eac\u4e1c|beijingdong|bjd|beijingdong@BNN|\u5df4\u4e1c|badong|bd|badong@BNM|\u73ed\u732b\u7b90|banmaoqing|bmj|banmaoqing@BNJ|\u767d\u94f6\u5e02|baiyinshi|bys|baiyinshi@BND|\u5b9d\u9f99\u5c71|baolongshan|bls|baolongshan@BNB|\u5b9d\u6797|baolin|bl|baolin@BMP|\u4fdd\u5b9a\u4e1c|baodingdong|bdd|baodingdong@BMH|\u868c\u57e0\u5357|bengbunan|bbn|bengbunan@BMD|\u516b\u9762\u57ce|bamiancheng|bmc|bamiancheng@BMB|\u516b\u9762\u901a|bamiantong|bmt|bamiantong@BLX|\u5df4\u6797|balin|bl|balin@BLR|\u5e03\u5217\u5f00|buliekai|blk|buliekai@BLQ|\u78a7\u6c5f|bijiang|bj|bijiang@BLB|\u52c3\u5229|boli|bl|boli@BKX|\u535a\u514b\u56fe|bugt|bkt|bugt@BKD|\u4fdd\u5eb7|baokang|bk|baokang@BKB|\u767d\u594e\u5821|baikuipu|bkb|baikuipu@BJY|\u5b9d\u9e21|baoji|bj|baoji@BJQ|\u6df1\u5733\u4e1c|shenzhendong|szd|shenzhendong@BJP|\u5317\u4eac|beijing|bj|beijing@BJM|\u78a7\u9e21\u5173|bijiguan|bjg|bijiguan@BJJ|\u767d\u82a8\u6c9f|baijigou|bjg|baijigou@BJB|\u6ee8\u6c5f|binjiang|bj|binjiang@BIZ|\u767e\u8272|baise|bs|baise@BIY|\u767d\u6cb3\u4e1c|baihedong|bhd|baihedong@BIV|\u5317\u8425|beiying|by|beiying@BID|\u767d\u97f3\u4ed6\u62c9|baiyintala|bytl|baiyintala@BHZ|\u5317\u6d77|beihai|bh|beihai@BHT|\u672c\u6eaa\u6e56|benxihu|bxh|benxihu@BGV|\u767d\u58c1\u5173|baibiguan|bbg|baibiguan@BGM|\u67cf\u679c|baiguo|bg|baiguo@BFF|\u5e73\u9876\u5c71\u897f|pingdingshanxi|pdsx|pingdingshanxi@BEY|\u767d\u6cb3\u53bf|baihexian|bhx|baihexian@BEP|\u5317\u6234\u6cb3|beidaihe|bdh|beidaihe@BEL|\u767d\u6cb3|baihe|bh|baihe@BEC|\u767d\u4e91\u9102\u535a|bayanobo|byeb|bayanobo@BDP|\u4fdd\u5b9a|baoding|bd|baoding@BDH|\u4e0a\u865e|shangyu|sy|shangyu@BDC|\u5305\u5934\u4e1c|baotoudong|btd|baotoudong@BCT|\u767d\u57ce|baicheng|bc|baicheng@BCR|\u5df4\u695a|bachu|bc|bachu@BCD|\u767d\u97f3\u80e1\u7855|baiyinhushuo|byhs|baiyinhushuo@BBY|\u5b9d\u9e21\u5357|baojinan|bjn|baojinan@BBM|\u767d\u9e21\u5761|baijipo|bjp|baijipo@BBH|\u868c\u57e0|bengbu|bb|bengbu@BAY|\u5df4\u5c71|bashan|bs|bashan@BAT|\u767d\u72fc|bailang|bl|bailang1@BAP|\u767d\u6da7|baijian|bj|baijian@BAL|\u767d\u77f3\u5c71|baishishan|bss|baishishan@BAC|\u5df4\u5f66\u9ad8\u52d2|bayangol|bygl|bayangol@BAB|\u5317\u5b89|beian|ba|beian@AZM|\u963f\u5357\u5e84|ananzhuang|anz|ananzhuang@AZK|\u71d5\u5bb6\u5e84|yanjiazhuang|yjz|yanjiazhuang@AYY|\u5b89\u53e3\u7a91|ankouyao|aky|ankouyao@AYF|\u5b89\u9633|anyang|ay|anyang@AXT|\u978d\u5c71\u897f|anshanxi|asx|anshanxi@AXS|\u5b89\u6eaa|anxi|ax|anxi@AUZ|\u5b89\u9f99|anlong|al|anlong@AUH|\u6dee\u5b89|huaian|ha|huaian@ATV|\u5b89\u5858|antang|at|antang@ATR|\u963f\u56fe\u4ec0|atushi|ats|atushi@ATP|\u7389\u7530\u53bf|yutianxian|ytx|yutianxian@ATL|\u5b89\u56fe|antu|at|antu@ASX|\u963f\u9f99\u5c71|alongshan|als|alongshan@ASW|\u5b89\u987a|anshun|as|anshun@AST|\u978d\u5c71|anshan|as|anshan@ASR|\u963f\u514b\u82cf|akesu|aks|akesu@ASP|\u7a91\u4e0a|yaoshang|ys|yaoshang@ASH|\u5b89\u4ead\u5317|antingbei|atb|antingbei@ART|\u963f\u5c14\u5c71|aershan|aes|aershan@ARP|\u9633\u9091|yangyi|yy|yangyi@ARH|\u9ccc\u6c5f|aojiang|aj|aojiang@AQW|\u65bd\u79c9|shibing|sb|shibing@AQP|\u9633\u6cc9|yangquan|yq|yangquan@AQK|\u6e90\u8fc1|yuanqian|yq|yuanqian@AQH|\u5b89\u5e86|anqing|aq|anqing@APT|\u5b89\u5e73|anping|ap|anping@APH|\u5b89\u5e86\u897f|anqingxi|aqx|anqingxi@AOQ|\u6c38\u5dde|yongzhou|yz|yongzhou@AOP|\u71d5\u5c71|yanshan|ys|yanshan@AOH|\u4e0a\u6d77\u8679\u6865|shanghaihongqiao|shhq|shanghaihongqiao@AMH|\u6dee\u5b89\u5357|huaiannan|han|huaiannan@ALY|\u6986\u6797|yulin|yl|yulin1@ALW|\u5f5d\u826f|yiliang|yl|yiliang@ALN|\u5b89\u9646|anlu|al|anlu@ALD|\u6556\u529b\u5e03\u544a|aolibugao|albg|aolibugao@AKY|\u5b89\u5eb7|ankang|ak|ankang@AKR|\u963f\u62c9\u5c71\u53e3|alashankou|alsk|alashankou@AKH|\u961c\u5b81|funing|fn|funing1@AJP|\u71d5\u90ca|yanjiao|yj|yanjiao@AJJ|\u827e\u5bb6\u6751|aijiacun|ajc|aijiacun@AJH|\u5efa\u6e56|jianhu|jh|jianhu@AJD|\u963f\u91d1|ajin|aj|ajin@AJB|\u5b89\u5bb6|anjia|aj|anjia@AIP|\u91ce\u4e09\u5761|yesanpo|ysp|yesanpo@AIH|\u9633\u6f84\u6e56|yangchenghu|ych|yangchenghu@AHX|\u963f\u91cc\u6cb3|alihe|alh|alihe@AHP|\u827e\u6cb3|aihe|ah|aihe@AGT|\u5b89\u5e7f|anguang|ag|anguang@AFW|\u9149\u9633|youyang|yy|youyang@AFP|\u4e91\u5c45\u5bfa|yunjusi|yjs|yunjusi@AFH|\u76d0\u57ce|yancheng|yc|yancheng@AEW|\u76d0\u6d25|yanjin|yj|yanjin@AER|\u963f\u514b\u9676|aketao|akt|aketao@AEQ|\u76ca\u9633|yiyang|yy|yiyang@AEP|\u5ca9\u4f1a|yanhui|yh|yanhui@AEM|\u7f8a\u8005\u7a9d|yangzhewo|wzw|yangzhewo@ADX|\u5b89\u8fbe|anda|ad|anda@ADP|\u5b89\u5b9a|anding|ad|anding@ADF|\u5b89\u9633\u4e1c|anyangdong|ayd|anyangdong@ACP|\u4e91\u5f69\u5cad|yuncailing|ycl|yuncailing@ACG|\u6c38\u4fee|yongxiu|yx|yongxiu@ACB|\u963f\u57ce|acheng|ac|acheng@ABM|\u7f8a\u5821|yangpu|yp|yangpu@AAX|\u6602\u6602\u6eaa|angangxi|aax|angangxi@TNV|\u592a\u539f\u5357|taiyuannan|tyn|taiyuannan';
*/
//CityWindow   引入Systemall中的city.js文件，针对火车票站点做了部分改动
//var CityPadNew = Elong.Control.CityPadNew;
//CityPadNew = Class.create();
//Object.extend(CityPadNew.prototype, {
//    name: "CityPadNew",
//    timeout: null,
//    errtimeout: null,
//    selectCity: null,
//    StationList: null,
//    KeyCode: {
//        Left: 37,
//        Up: 38,
//        Right: 39,
//        Down: 40,
//        Del: 46,
//        Tab: 9,
//        Return: 13,
//        Esc: 27,
//        Command: 188,
//        PageUp: 33,
//        PageDown: 34,
//        BackSpace: 8,
//        Tab: 9,
//        newStyle: false
//    },
//    m_Container: new Template("<div style=\"width:#{HotWidth}px;display:block \" class=\"#{ContainerClass}\"><div style=\"width:100%;\">#{HotTitle}<ul method=\"hotTab\" class=\"#{AbcSearch} clx\">#{HotTab}</ul><ul method=\"hotData\" class=\"#{Popcitylist}#{Language}\" style=\"#{PopcitylistStyle}\">#{HotData}</ul></div><div class=\"clear\"></div><div class=\"clear\"></div></div>"),
//    m_Result: new Template("<div style=\"width: 230px;position:relative;\" class=\"com_results\"><div style=\"width: 100%;\">#{ResultTitleHtml}<ul method=\"cityData\" style=\"#{ULStyle}\">#{ResultDataHtml}</ul></div><div class=\"clear\"></div><div class=\"clear\"></div></div>"),
//    m_ResultTitleCn: "<span class=\"l_black\">{0}, 按照拼音排序 <a method=\"close\" class=\"ac_close\" href=\"#?\" title=\"关闭\"></a></span>",
//    m_ResultTitleEn: "  <span class=\"l_black\">{0}, sort by spelling <a method=\"close\" class=\"ac_close\" href=\"#?\" title=\"close\"></a></span>",
//    m_TitleCn: "<div class=\"ac_title\"><span>拼音支持首字母输入, 或<span style=\"font-family: simsun;\">&nbsp;←↑↓→&nbsp;</span>选择</span><a class=\"ac_close\" href=\"#?\" method=\"close\"  title=\"关闭\"></a></div>",
//    m_TitleEn: "<div class=\"ac_title\"><span>Please enter or select from below</span><a class=\"ac_close\" href=\"#?\"   method=\"close\" title=\"close\"></a></div>",
//    m_Error: new Template("<div class=\"com_error\" style=\"width: #{ErrorWidth}px;position:relative;\"><div style=\"width:100%;\"><ul><li>#{Error}</li></ul></div><div class=\"clear\"></div><div class=\"clear\"></div></div>"),
//    m_ErrorCn: "对不起，找不到<span class=\"ml5\">{0}</span>",
//    m_ErrorEn: "No matches!",
//    isHotelStyle: false,
//    options: {
//        eventElement: null,
//        lang: "cn",
//        cityType: "train",
//        hotType: "train",
//        onSelect: null,
//        onClose: null,
//        onBeforClick: null,
//        hotWidth: 340,
//        hotHeight: 138,
//        hotData: null,
//        cityData: null,
//        colLen: 4,          //一排的个数
//        maxLen: 10,          //搜索最大显示个数
//        enableSearch: true,
//        isAutoSelect: false,
//        isJsonp: 0,
//        resultNextId: "",
//        searchField: "",
//        searchType: "",
//        searchUrl: "http://home.elong.com/city/",
//        containerClass: "com_hotresults",
//        abcSearch: "AbcSearch",
//        popcitylist: "popcitylist",
//        popcitylistStyle: "overflow: auto; max-height: 260px;",
//        errorWidth: 230
//    },
//    //初始化
//    initialize: function (options) {
//        Object.extend(Object.extend(this, this.options), options);
//        if (typeof (options.isHotelStyle) == "undefined") {
//            this.isHotelStyle =
//                (this.lang == "cn" && this.cityType == "train" && this.hotType == "train") ||
//                document.domain == "train.elong.com";
//        }
//        this.prepareData();
//        if (this.isHotelStyle) {
//            this.hotWidth = 430;
//            this.colLen = 5;
//            this.m_TitleCn = "<div class=\"ac_title\"><span>支持中文/拼音/简拼输入</span></div>";
//            this.containerClass = "com_hotrenew";
//            this.abcSearch = "AbcSearchnew";
//            this.popcitylist = "popcitylistnew";
//            this.popcitylistStyle = "";
//            this.errorWidth = 280;
//        }
//        if (this.lang == "en" && this.hotWidth < 425) {
//            this.hotWidth = 425;
//        }
//        this.eventElement.attr("datacheck", "");
//        this.eventElement.unbind("click");
//        this.eventElement.unbind("keyup");
//        this.eventElement.unbind("keydown");
//        this.eventElement.bind("click", this.onInputClick.bindAsEventListener(this));
//        this.eventElement.bind("keyup", this.onInputKeyUp.bindAsEventListener(this));
//        if (!this.isHotelStyle) {
//            this.eventElement.bind("keydown", this.onInputKeyDown.bindAsEventListener(this));
//        }
//        this.eventElement.bind("blur", this.onInputBlur.bindAsEventListener(this));
//        this.initData();
//    },
//
//    getSelect: function () {
//        return this.selectCity;
//    },
//    onInputBlur: function () {
//        if (this.onSelect && !Object.isNull(this.selectCity)) {
//            var cityName = (this.lang.toLowerCase() == "cn") ? this.selectCity.CityNameCn : this.selectCity.CityNameEn;
//            this.eventElement.val(cityName);
//            this.eventElement.removeClass("gray");
//            if (this.isAutoSelect)
//                this.onSelect(this.eventElement, this.selectCity);
//        }
//    },
//
//    prepareData: function () {
//        if (!String.isNullOrEmpty(this.cityType)) {
//            //初始化
//            if (this.eventElement != null) {
//                var city = {
//                    "CityId": this.eventElement.attr("CityId"),
//                    "CityThreeSign": this.eventElement.attr("CityThreeSign"),
//                    "CityNameCn": (this.lang.toLowerCase() == "cn") ? this.eventElement.val() : this.eventElement.attr("CityName"),
//                    "CityNameEn": (this.lang.toLowerCase() == "en") ? this.eventElement.val() : this.eventElement.attr("CityNameEn")
//                };
//                this.eventElement[0]["City"] = city;
//            }
//
//            var _checkHotData = false;
//            var _checkDataId = false;
//            _checkHotData = !((typeof TrainCityHot) == "undefined");
//            if (_checkHotData) {
//                var typeStr = !String.isNullOrEmpty(this.hotType) ? this.hotType : this.cityType;
//                for (var i = 0; i < TrainCityHot.length; i++) {
//                    if (TrainCityHot[i].CityType == typeStr) {
//                        this.hotData = TrainCityHot[i].TabList;
//                    }
//                }
//            }
//        }
//    },
//
//    destroyDOM: function () {
//        this.windowElement = null;
//        this.contentEndRegion = null;
//        this.options = null;
//    },
//
//    initializeEvent: function () {
//        if (this.windowElement) {
//            this.windowElement.bind("click", this.onClickRegion.bindAsEventListener(this));
//            this.windowElement.bind("mouseout", this.onMouseOutRegion.bindAsEventListener(this));
//            this.windowElement.bind("mouseover", this.onMouseOverRegion.bindAsEventListener(this));
//            FunctionExt.defer(this.onOutClick.bindAsEventListener(this), 100);
//        }
//    },
//
//    destroyEvent: function () {
//        this.windowElement.unbind("click");
//        this.windowElement.unbind("mouseout");
//        this.windowElement.unbind("mouseover");
//    },
//
//    UnicodeChr: function () {
//        return '00A4,00A7,00A8,00B0,00B1,00B7,00D7,00E0,00E1,00E8,00E9,00EA,00EC,00ED,00F2,00F3,00F7,00F9,00FA,00FC,0101,0113,011B,012B,014D,016B,01CE,01D0,01D2,01D4,01D6,01D8,01DA,01DC,02C7,02C9,0391,0392,0393,0394,0395,0396,0397,0398,0399,039A,039B,039C,039D,039E,039F,03A0,03A1,03A3,03A4,03A5,03A6,03A7,03A8,03A9,03B1,03B2,03B3,03B4,03B5,03B6,03B7,03B8,03B9,03BA,03BB,03BC,03BD,03BE,03BF,03C0,03C1,03C3,03C4,03C5,03C6,03C7,03C8,03C9,0401,0410,0411,0412,0413,0414,0415,0416,0417,0418,0419,041A,041B,041C,041D,041E,041F,0420,0421,0422,0423,0424,0425,0426,0427,0428,0429,042A,042B,042C,042D,042E,042F,0430,0431,0432,0433,0434,0435,0436,0437,0438,0439,043A,043B,043C,043D,043E,043F,0440,0441,0442,0443,0444,0445,0446,0447,0448,0449,044A,044B,044C,044D,044E,044F,0451,2014,2016,2018,2019,201C,201D,2026,2030,2032,2033,203B,2103,2116,2160,2161,2162,2163,2164,2165,2166,2167,2168,2169,216A,216B,2190,2191,2192,2193,2208,220F,2211,221A,221D,221E,2220,2225,2227,2228,2229,222A,222B,222E,2234,2235,2236,2237,223D,2248,224C,2260,2261,2264,2265,226E,226F,2299,22A5,2312,2460,2461,2462,2463,2464,2465,2466,2467,2468,2469,2474,2475,2476,2477,2478,2479,247A,247B,247C,247D,247E,247F,2480,2481,2482,2483,2484,2485,2486,2487,2488,2489,248A,248B,248C,248D,248E,248F,2490,2491,2492,2493,2494,2495,2496,2497,2498,2499,249A,249B,2500,2501,2502,2503,2504,2505,2506,2507,2508,2509,250A,250B,250C,250D,250E,250F,2510,2511,2512,2513,2514,2515,2516,2517,2518,2519,251A,251B,251C,251D,251E,251F,2520,2521,2522,2523,2524,2525,2526,2527,2528,2529,252A,252B,252C,252D,252E,252F,2530,2531,2532,2533,2534,2535,2536,2537,2538,2539,253A,253B,253C,253D,253E,253F,2540,2541,2542,2543,2544,2545,2546,2547,2548,2549,254A,254B,25A0,25A1,25B2,25B3,25C6,25C7,25CB,25CE,25CF,2605,2606,2640,2642,3000,3001,3002,3003,3005,3008,3009,300A,300B,300C,300D,300E,300F,3010,3011,3013,3014,3015,3016,3017,3041,3042,3043,3044,3045,3046,3047,3048,3049,304A,304B,304C,304D,304E,304F,3050,3051,3052,3053,3054,3055,3056,3057,3058,3059,305A,305B,305C,305D,305E,305F,3060,3061,3062,3063,3064,3065,3066,3067,3068,3069,306A,306B,306C,306D,306E,306F,3070,3071,3072,3073,3074,3075,3076,3077,3078,3079,307A,307B,307C,307D,307E,307F,3080,3081,3082,3083,3084,3085,3086,3087,3088,3089,308A,308B,308C,308D,308E,308F,3090,3091,3092,3093,30A1,30A2,30A3,30A4,30A5,30A6,30A7,30A8,30A9,30AA,30AB,30AC,30AD,30AE,30AF,30B0,30B1,30B2,30B3,30B4,30B5,30B6,30B7,30B8,30B9,30BA,30BB,30BC,30BD,30BE,30BF,30C0,30C1,30C2,30C3,30C4,30C5,30C6,30C7,30C8,30C9,30CA,30CB,30CC,30CD,30CE,30CF,30D0,30D1,30D2,30D3,30D4,30D5,30D6,30D7,30D8,30D9,30DA,30DB,30DC,30DD,30DE,30DF,30E0,30E1,30E2,30E3,30E4,30E5,30E6,30E7,30E8,30E9,30EA,30EB,30EC,30ED,30EE,30EF,30F0,30F1,30F2,30F3,30F4,30F5,30F6,3105,3106,3107,3108,3109,310A,310B,310C,310D,310E,310F,3110,3111,3112,3113,3114,3115,3116,3117,3118,3119,311A,311B,311C,311D,311E,311F,3120,3121,3122,3123,3124,3125,3126,3127,3128,3129,3220,3221,3222,3223,3224,3225,3226,3227,3228,3229,4E00,4E01,4E03,4E07,4E08,4E09,4E0A,4E0B,4E0C,4E0D,4E0E,4E10,4E11,4E13,4E14,4E15,4E16,4E18,4E19,4E1A,4E1B,4E1C,4E1D,4E1E,4E22,4E24,4E25,4E27,4E28,4E2A,4E2B,4E2C,4E2D,4E30,4E32,4E34,4E36,4E38,4E39,4E3A,4E3B,4E3D,4E3E,4E3F,4E43,4E45,4E47,4E48,4E49,4E4B,4E4C,4E4D,4E4E,4E4F,4E50,4E52,4E53,4E54,4E56,4E58,4E59,4E5C,4E5D,4E5E,4E5F,4E60,4E61,4E66,4E69,4E70,4E71,4E73,4E7E,4E86,4E88,4E89,4E8B,4E8C,4E8D,4E8E,4E8F,4E91,4E92,4E93,4E94,4E95,4E98,4E9A,4E9B,4E9F,4EA0,4EA1,4EA2,4EA4,4EA5,4EA6,4EA7,4EA8,4EA9,4EAB,4EAC,4EAD,4EAE,4EB2,4EB3,4EB5,4EBA,4EBB,4EBF,4EC0,4EC1,4EC2,4EC3,4EC4,4EC5,4EC6,4EC7,4EC9,4ECA,4ECB,4ECD,4ECE,4ED1,4ED3,4ED4,4ED5,4ED6,4ED7,4ED8,4ED9,4EDD,4EDE,4EDF,4EE1,4EE3,4EE4,4EE5,4EE8,4EEA,4EEB,4EEC,4EF0,4EF2,4EF3,4EF5,4EF6,4EF7,4EFB,4EFD,4EFF,4F01,4F09,4F0A,4F0D,4F0E,4F0F,4F10,4F11,4F17,4F18,4F19,4F1A,4F1B,4F1E,4F1F,4F20,4F22,4F24,4F25,4F26,4F27,4F2A,4F2B,4F2F,4F30,4F32,4F34,4F36,4F38,4F3A,4F3C,4F3D,4F43,4F46,4F4D,4F4E,4F4F,4F50,4F51,4F53,4F55,4F57,4F58,4F59,4F5A,4F5B,4F5C,4F5D,4F5E,4F5F,4F60,4F63,4F64,4F65,4F67,4F69,4F6C,4F6F,4F70,4F73,4F74,4F76,4F7B,4F7C,4F7E,4F7F,4F83,4F84,4F88,4F89,4F8B,4F8D,4F8F,4F91,4F94,4F97,4F9B,4F9D,4FA0,4FA3,4FA5,4FA6,4FA7,4FA8,4FA9,4FAA,4FAC,4FAE,4FAF,4FB5,4FBF,4FC3,4FC4,4FC5,4FCA,4FCE,4FCF,4FD0,4FD1,4FD7,4FD8,4FDA,4FDC,4FDD,4FDE,4FDF,4FE1,4FE3,4FE6,4FE8,4FE9,4FEA,4FED,4FEE,4FEF,4FF1,4FF3,4FF8,4FFA,4FFE,500C,500D,500F,5012,5014,5018,5019,501A,501C,501F,5021,5025,5026,5028,5029,502A,502C,502D,502E,503A,503C,503E,5043,5047,5048,504C,504E,504F,5055,505A,505C,5065,506C,5076,5077,507B,507E,507F,5080,5085,5088,508D,50A3,50A5,50A7,50A8,50A9,50AC,50B2,50BA,50BB,50CF,50D6,50DA,50E6,50E7,50EC,50ED,50EE,50F3,50F5,50FB,5106,5107,510B,5112,5121,513F,5140,5141,5143,5144,5145,5146,5148,5149,514B,514D,5151,5154,5155,5156,515A,515C,5162,5165,5168,516B,516C,516D,516E,5170,5171,5173,5174,5175,5176,5177,5178,5179,517B,517C,517D,5180,5181,5182,5185,5188,5189,518C,518D,5192,5195,5196,5197,5199,519B,519C,51A0,51A2,51A4,51A5,51AB,51AC,51AF,51B0,51B1,51B2,51B3,51B5,51B6,51B7,51BB,51BC,51BD,51C0,51C4,51C6,51C7,51C9,51CB,51CC,51CF,51D1,51DB,51DD,51E0,51E1,51E4,51EB,51ED,51EF,51F0,51F3,51F5,51F6,51F8,51F9,51FA,51FB,51FC,51FD,51FF,5200,5201,5202,5203,5206,5207,5208,520A,520D,520E,5211,5212,5216,5217,5218,5219,521A,521B,521D,5220,5224,5228,5229,522B,522D,522E,5230,5233,5236,5237,5238,5239,523A,523B,523D,523F,5240,5241,5242,5243,524A,524C,524D,5250,5251,5254,5256,525C,525E,5261,5265,5267,5269,526A,526F,5272,527D,527F,5281,5282,5288,5290,5293,529B,529D,529E,529F,52A0,52A1,52A2,52A3,52A8,52A9,52AA,52AB,52AC,52AD,52B1,52B2,52B3,52BE,52BF,52C3,52C7,52C9,52CB,52D0,52D2,52D6,52D8,52DF,52E4,52F0,52F9,52FA,52FE,52FF,5300,5305,5306,5308,530D,530F,5310,5315,5316,5317,5319,531A,531D,5320,5321,5323,5326,532A,532E,5339,533A,533B,533E,533F,5341,5343,5345,5347,5348,5349,534A,534E,534F,5351,5352,5353,5355,5356,5357,535A,535C,535E,535F,5360,5361,5362,5363,5364,5366,5367,5369,536B,536E,536F,5370,5371,5373,5374,5375,5377,5378,537A,537F,5382,5384,5385,5386,5389,538B,538C,538D,5395,5398,539A,539D,539F,53A2,53A3,53A5,53A6,53A8,53A9,53AE,53B6,53BB,53BF,53C1,53C2,53C8,53C9,53CA,53CB,53CC,53CD,53D1,53D4,53D6,53D7,53D8,53D9,53DB,53DF,53E0,53E3,53E4,53E5,53E6,53E8,53E9,53EA,53EB,53EC,53ED,53EE,53EF,53F0,53F1,53F2,53F3,53F5,53F6,53F7,53F8,53F9,53FB,53FC,53FD,5401,5403,5404,5406,5408,5409,540A,540C,540D,540E,540F,5410,5411,5412,5413,5415,5416,5417,541B,541D,541E,541F,5420,5421,5423,5426,5427,5428,5429,542B,542C,542D,542E,542F,5431,5432,5434,5435,5438,5439,543B,543C,543E,5440,5443,5446,5448,544A,544B,5450,5452,5453,5454,5455,5456,5457,5458,5459,545B,545C,5462,5464,5466,5468,5471,5472,5473,5475,5476,5477,5478,547B,547C,547D,5480,5482,5484,5486,548B,548C,548E,548F,5490,5492,5494,5495,5496,5499,549A,549B,549D,54A3,54A4,54A6,54A7,54A8,54A9,54AA,54AB,54AC,54AD,54AF,54B1,54B3,54B4,54B8,54BB,54BD,54BF,54C0,54C1,54C2,54C4,54C6,54C7,54C8,54C9,54CC,54CD,54CE,54CF,54D0,54D1,54D2,54D3,54D4,54D5,54D7,54D9,54DA,54DC,54DD,54DE,54DF,54E5,54E6,54E7,54E8,54E9,54EA,54ED,54EE,54F2,54F3,54FA,54FC,54FD,54FF,5501,5506,5507,5509,550F,5510,5511,5514,551B,5520,5522,5523,5524,5527,552A,552C,552E,552F,5530,5531,5533,5537,553C,553E,553F,5541,5543,5544,5546,5549,554A,5550,5555,5556,555C,5561,5564,5565,5566,5567,556A,556C,556D,556E,5575,5576,5577,5578,557B,557C,557E,5580,5581,5582,5583,5584,5587,5588,5589,558A,558B,558F,5591,5594,5598,5599,559C,559D,559F,55A7,55B1,55B3,55B5,55B7,55B9,55BB,55BD,55BE,55C4,55C5,55C9,55CC,55CD,55D1,55D2,55D3,55D4,55D6,55DC,55DD,55DF,55E1,55E3,55E4,55E5,55E6,55E8,55EA,55EB,55EC,55EF,55F2,55F3,55F5,55F7,55FD,55FE,5600,5601,5608,5609,560C,560E,560F,5618,561B,561E,561F,5623,5624,5627,562C,562D,5631,5632,5634,5636,5639,563B,563F,564C,564D,564E,5654,5657,5658,5659,565C,5662,5664,5668,5669,566A,566B,566C,5671,5676,567B,567C,5685,5686,568E,568F,5693,56A3,56AF,56B7,56BC,56CA,56D4,56D7,56DA,56DB,56DD,56DE,56DF,56E0,56E1,56E2,56E4,56EB,56ED,56F0,56F1,56F4,56F5,56F9,56FA,56FD,56FE,56FF,5703,5704,5706,5708,5709,570A,571C,571F,5723,5728,5729,572A,572C,572D,572E,572F,5730,5733,5739,573A,573B,573E,5740,5742,5747,574A,574C,574D,574E,574F,5750,5751,5757,575A,575B,575C,575D,575E,575F,5760,5761,5764,5766,5768,5769,576A,576B,576D,576F,5773,5776,5777,577B,577C,5782,5783,5784,5785,5786,578B,578C,5792,5793,579B,57A0,57A1,57A2,57A3,57A4,57A6,57A7,57A9,57AB,57AD,57AE,57B2,57B4,57B8,57C2,57C3,57CB,57CE,57CF,57D2,57D4,57D5,57D8,57D9,57DA,57DD,57DF,57E0,57E4,57ED,57EF,57F4,57F8,57F9,57FA,57FD,5800,5802,5806,5807,580B,580D,5811,5815,5819,581E,5820,5821,5824,582A,5830,5835,5844,584C,584D,5851,5854,5858,585E,5865,586B,586C,587E,5880,5881,5883,5885,5889,5892,5893,5899,589A,589E,589F,58A8,58A9,58BC,58C1,58C5,58D1,58D5,58E4,58EB,58EC,58EE,58F0,58F3,58F6,58F9,5902,5904,5907,590D,590F,5914,5915,5916,5919,591A,591C,591F,5924,5925,5927,5929,592A,592B,592D,592E,592F,5931,5934,5937,5938,5939,593A,593C,5941,5942,5944,5947,5948,5949,594B,594E,594F,5951,5954,5955,5956,5957,5958,595A,5960,5962,5965,5973,5974,5976,5978,5979,597D,5981,5982,5983,5984,5986,5987,5988,598A,598D,5992,5993,5996,5997,5999,599E,59A3,59A4,59A5,59A8,59A9,59AA,59AB,59AE,59AF,59B2,59B9,59BB,59BE,59C6,59CA,59CB,59D0,59D1,59D2,59D3,59D4,59D7,59D8,59DA,59DC,59DD,59E3,59E5,59E8,59EC,59F9,59FB,59FF,5A01,5A03,5A04,5A05,5A06,5A07,5A08,5A09,5A0C,5A11,5A13,5A18,5A1C,5A1F,5A20,5A23,5A25,5A29,5A31,5A32,5A34,5A36,5A3C,5A40,5A46,5A49,5A4A,5A55,5A5A,5A62,5A67,5A6A,5A74,5A75,5A76,5A77,5A7A,5A7F,5A92,5A9A,5A9B,5AAA,5AB2,5AB3,5AB5,5AB8,5ABE,5AC1,5AC2,5AC9,5ACC,5AD2,5AD4,5AD6,5AD8,5ADC,5AE0,5AE1,5AE3,5AE6,5AE9,5AEB,5AF1,5B09,5B16,5B17,5B32,5B34,5B37,5B40,5B50,5B51,5B53,5B54,5B55,5B57,5B58,5B59,5B5A,5B5B,5B5C,5B5D,5B5F,5B62,5B63,5B64,5B65,5B66,5B69,5B6A,5B6C,5B70,5B71,5B73,5B75,5B7A,5B7D,5B80,5B81,5B83,5B84,5B85,5B87,5B88,5B89,5B8B,5B8C,5B8F,5B93,5B95,5B97,5B98,5B99,5B9A,5B9B,5B9C,5B9D,5B9E,5BA0,5BA1,5BA2,5BA3,5BA4,5BA5,5BA6,5BAA,5BAB,5BB0,5BB3,5BB4,5BB5,5BB6,5BB8,5BB9,5BBD,5BBE,5BBF,5BC2,5BC4,5BC5,5BC6,5BC7,5BCC,5BD0,5BD2,5BD3,5BDD,5BDE,5BDF,5BE1,5BE4,5BE5,5BE8,5BEE,5BF0,5BF8,5BF9,5BFA,5BFB,5BFC,5BFF,5C01,5C04,5C06,5C09,5C0A,5C0F,5C11,5C14,5C15,5C16,5C18,5C1A,5C1C,5C1D,5C22,5C24,5C25,5C27,5C2C,5C31,5C34,5C38,5C39,5C3A,5C3B,5C3C,5C3D,5C3E,5C3F,5C40,5C41,5C42,5C45,5C48,5C49,5C4A,5C4B,5C4E,5C4F,5C50,5C51,5C55,5C59,5C5E,5C60,5C61,5C63,5C65,5C66,5C6E,5C6F,5C71,5C79,5C7A,5C7F,5C81,5C82,5C88,5C8C,5C8D,5C90,5C91,5C94,5C96,5C97,5C98,5C99,5C9A,5C9B,5C9C,5CA2,5CA3,5CA9,5CAB,5CAC,5CAD,5CB1,5CB3,5CB5,5CB7,5CB8,5CBD,5CBF,5CC1,5CC4,5CCB,5CD2,5CD9,5CE1,5CE4,5CE5,5CE6,5CE8,5CEA,5CED,5CF0,5CFB,5D02,5D03,5D06,5D07,5D0E,5D14,5D16,5D1B,5D1E,5D24,5D26,5D27,5D29,5D2D,5D2E,5D34,5D3D,5D3E,5D47,5D4A,5D4B,5D4C,5D58,5D5B,5D5D,5D69,5D6B,5D6C,5D6F,5D74,5D82,5D99,5D9D,5DB7,5DC5,5DCD,5DDB,5DDD,5DDE,5DE1,5DE2,5DE5,5DE6,5DE7,5DE8,5DE9,5DEB,5DEE,5DEF,5DF1,5DF2,5DF3,5DF4,5DF7,5DFD,5DFE,5E01,5E02,5E03,5E05,5E06,5E08,5E0C,5E0F,5E10,5E11,5E14,5E15,5E16,5E18,5E19,5E1A,5E1B,5E1C,5E1D,5E26,5E27,5E2D,5E2E,5E31,5E37,5E38,5E3B,5E3C,5E3D,5E42,5E44,5E45,5E4C,5E54,5E55,5E5B,5E5E,5E61,5E62,5E72,5E73,5E74,5E76,5E78,5E7A,5E7B,5E7C,5E7D,5E7F,5E80,5E84,5E86,5E87,5E8A,5E8B,5E8F,5E90,5E91,5E93,5E94,5E95,5E96,5E97,5E99,5E9A,5E9C,5E9E,5E9F,5EA0,5EA5,5EA6,5EA7,5EAD,5EB3,5EB5,5EB6,5EB7,5EB8,5EB9,5EBE,5EC9,5ECA,5ED1,5ED2,5ED3,5ED6,5EDB,5EE8,5EEA,5EF4,5EF6,5EF7,5EFA,5EFE,5EFF,5F00,5F01,5F02,5F03,5F04,5F08,5F0A,5F0B,5F0F,5F11,5F13,5F15,5F17,5F18,5F1B,5F1F,5F20,5F25,5F26,5F27,5F29,5F2A,5F2D,5F2F,5F31,5F39,5F3A,5F3C,5F40,5F50,5F52,5F53,5F55,5F56,5F57,5F58,5F5D,5F61,5F62,5F64,5F66,5F69,5F6A,5F6C,5F6D,5F70,5F71,5F73,5F77,5F79,5F7B,5F7C,5F80,5F81,5F82,5F84,5F85,5F87,5F88,5F89,5F8A,5F8B,5F8C,5F90,5F92,5F95,5F97,5F98,5F99,5F9C,5FA1,5FA8,5FAA,5FAD,5FAE,5FB5,5FB7,5FBC,5FBD,5FC3,5FC4,5FC5,5FC6,5FC9,5FCC,5FCD,5FCF,5FD0,5FD1,5FD2,5FD6,5FD7,5FD8,5FD9,5FDD,5FE0,5FE1,5FE4,5FE7,5FEA,5FEB,5FED,5FEE,5FF1,5FF5,5FF8,5FFB,5FFD,5FFE,5FFF,6000,6001,6002,6003,6004,6005,6006,600A,600D,600E,600F,6012,6014,6015,6016,6019,601B,601C,601D,6020,6021,6025,6026,6027,6028,6029,602A,602B,602F,6035,603B,603C,603F,6041,6042,6043,604B,604D,6050,6052,6055,6059,605A,605D,6062,6063,6064,6067,6068,6069,606A,606B,606C,606D,606F,6070,6073,6076,6078,6079,607A,607B,607C,607D,607F,6083,6084,6089,608C,608D,6092,6094,6096,609A,609B,609D,609F,60A0,60A3,60A6,60A8,60AB,60AC,60AD,60AF,60B1,60B2,60B4,60B8,60BB,60BC,60C5,60C6,60CA,60CB,60D1,60D5,60D8,60DA,60DC,60DD,60DF,60E0,60E6,60E7,60E8,60E9,60EB,60EC,60ED,60EE,60EF,60F0,60F3,60F4,60F6,60F9,60FA,6100,6101,6106,6108,6109,610D,610E,610F,6115,611A,611F,6120,6123,6124,6126,6127,612B,613F,6148,614A,614C,614E,6151,6155,615D,6162,6167,6168,6170,6175,6177,618B,618E,6194,619D,61A7,61A8,61A9,61AC,61B7,61BE,61C2,61C8,61CA,61CB,61D1,61D2,61D4,61E6,61F5,61FF,6206,6208,620A,620B,620C,620D,620E,620F,6210,6211,6212,6215,6216,6217,6218,621A,621B,621F,6221,6222,6224,6225,622A,622C,622E,6233,6234,6237,623D,623E,623F,6240,6241,6243,6247,6248,6249,624B,624C,624D,624E,6251,6252,6253,6254,6258,625B,6263,6266,6267,6269,626A,626B,626C,626D,626E,626F,6270,6273,6276,6279,627C,627E,627F,6280,6284,6289,628A,6291,6292,6293,6295,6296,6297,6298,629A,629B,629F,62A0,62A1,62A2,62A4,62A5,62A8,62AB,62AC,62B1,62B5,62B9,62BB,62BC,62BD,62BF,62C2,62C4,62C5,62C6,62C7,62C8,62C9,62CA,62CC,62CD,62CE,62D0,62D2,62D3,62D4,62D6,62D7,62D8,62D9,62DA,62DB,62DC,62DF,62E2,62E3,62E5,62E6,62E7,62E8,62E9,62EC,62ED,62EE,62EF,62F1,62F3,62F4,62F6,62F7,62FC,62FD,62FE,62FF,6301,6302,6307,6308,6309,630E,6311,6316,631A,631B,631D,631E,631F,6320,6321,6322,6323,6324,6325,6328,632A,632B,632F,6332,6339,633A,633D,6342,6343,6345,6346,6349,634B,634C,634D,634E,634F,6350,6355,635E,635F,6361,6362,6363,6367,6369,636D,636E,6371,6376,6377,637A,637B,6380,6382,6387,6388,6389,638A,638C,638E,638F,6390,6392,6396,6398,63A0,63A2,63A3,63A5,63A7,63A8,63A9,63AA,63AC,63AD,63AE,63B0,63B3,63B4,63B7,63B8,63BA,63BC,63BE,63C4,63C6,63C9,63CD,63CE,63CF,63D0,63D2,63D6,63DE,63E0,63E1,63E3,63E9,63EA,63ED,63F2,63F4,63F6,63F8,63FD,63FF,6400,6401,6402,6405,640B,640C,640F,6410,6413,6414,641B,641C,641E,6420,6421,6426,642A,642C,642D,6434,643A,643D,643F,6441,6444,6445,6446,6447,6448,644A,6452,6454,6458,645E,6467,6469,646D,6478,6479,647A,6482,6484,6485,6487,6491,6492,6495,6496,6499,649E,64A4,64A9,64AC,64AD,64AE,64B0,64B5,64B7,64B8,64BA,64BC,64C0,64C2,64C5,64CD,64CE,64D0,64D2,64D7,64D8,64DE,64E2,64E4,64E6,6500,6509,6512,6518,6525,652B,652E,652F,6534,6535,6536,6538,6539,653B,653E,653F,6545,6548,6549,654C,654F,6551,6555,6556,6559,655B,655D,655E,6562,6563,6566,656B,656C,6570,6572,6574,6577,6587,658B,658C,6590,6591,6593,6597,6599,659B,659C,659F,65A1,65A4,65A5,65A7,65A9,65AB,65AD,65AF,65B0,65B9,65BC,65BD,65C1,65C3,65C4,65C5,65C6,65CB,65CC,65CE,65CF,65D2,65D6,65D7,65E0,65E2,65E5,65E6,65E7,65E8,65E9,65EC,65ED,65EE,65EF,65F0,65F1,65F6,65F7,65FA,6600,6602,6603,6606,660A,660C,660E,660F,6613,6614,6615,6619,661D,661F,6620,6625,6627,6628,662D,662F,6631,6634,6635,6636,663C,663E,6641,6643,664B,664C,664F,6652,6653,6654,6655,6656,6657,665A,665F,6661,6664,6666,6668,666E,666F,6670,6674,6676,6677,667A,667E,6682,6684,6687,668C,6691,6696,6697,669D,66A7,66A8,66AE,66B4,66B9,66BE,66D9,66DB,66DC,66DD,66E6,66E9,66F0,66F2,66F3,66F4,66F7,66F9,66FC,66FE,66FF,6700,6708,6709,670A,670B,670D,6710,6714,6715,6717,671B,671D,671F,6726,6728,672A,672B,672C,672D,672F,6731,6734,6735,673A,673D,6740,6742,6743,6746,6748,6749,674C,674E,674F,6750,6751,6753,6756,675C,675E,675F,6760,6761,6765,6768,6769,676A,676D,676F,6770,6772,6773,6775,6777,677C,677E,677F,6781,6784,6787,6789,678B,6790,6795,6797,6798,679A,679C,679D,679E,67A2,67A3,67A5,67A7,67A8,67AA,67AB,67AD,67AF,67B0,67B3,67B5,67B6,67B7,67B8,67C1,67C3,67C4,67CF,67D0,67D1,67D2,67D3,67D4,67D8,67D9,67DA,67DC,67DD,67DE,67E0,67E2,67E5,67E9,67EC,67EF,67F0,67F1,67F3,67F4,67FD,67FF,6800,6805,6807,6808,6809,680A,680B,680C,680E,680F,6811,6813,6816,6817,681D,6821,6829,682A,6832,6833,6837,6838,6839,683C,683D,683E,6840,6841,6842,6843,6844,6845,6846,6848,6849,684A,684C,684E,6850,6851,6853,6854,6855,6860,6861,6862,6863,6864,6865,6866,6867,6868,6869,686B,6874,6876,6877,6881,6883,6885,6886,688F,6893,6897,68A2,68A6,68A7,68A8,68AD,68AF,68B0,68B3,68B5,68C0,68C2,68C9,68CB,68CD,68D2,68D5,68D8,68DA,68E0,68E3,68EE,68F0,68F1,68F5,68F9,68FA,68FC,6901,6905,690B,690D,690E,6910,6912,691F,6920,6924,692D,6930,6934,6939,693D,693F,6942,6954,6957,695A,695D,695E,6960,6963,6966,696B,696E,6971,6977,6978,6979,697C,6980,6982,6984,6986,6987,6988,6989,698D,6994,6995,6998,699B,699C,69A7,69A8,69AB,69AD,69B1,69B4,69B7,69BB,69C1,69CA,69CC,69CE,69D0,69D4,69DB,69DF,69E0,69ED,69F2,69FD,69FF,6A0A,6A17,6A18,6A1F,6A21,6A28,6A2A,6A2F,6A31,6A35,6A3D,6A3E,6A44,6A47,6A50,6A58,6A59,6A5B,6A61,6A65,6A71,6A79,6A7C,6A80,6A84,6A8E,6A90,6A91,6A97,6AA0,6AA9,6AAB,6AAC,6B20,6B21,6B22,6B23,6B24,6B27,6B32,6B37,6B39,6B3A,6B3E,6B43,6B46,6B47,6B49,6B4C,6B59,6B62,6B63,6B64,6B65,6B66,6B67,6B6A,6B79,6B7B,6B7C,6B81,6B82,6B83,6B84,6B86,6B87,6B89,6B8A,6B8B,6B8D,6B92,6B93,6B96,6B9A,6B9B,6BA1,6BAA,6BB3,6BB4,6BB5,6BB7,6BBF,6BC1,6BC2,6BC5,6BCB,6BCD,6BCF,6BD2,6BD3,6BD4,6BD5,6BD6,6BD7,6BD9,6BDB,6BE1,6BEA,6BEB,6BEF,6BF3,6BF5,6BF9,6BFD,6C05,6C06,6C07,6C0D,6C0F,6C10,6C11,6C13,6C14,6C15,6C16,6C18,6C19,6C1A,6C1B,6C1F,6C21,6C22,6C24,6C26,6C27,6C28,6C29,6C2A,6C2E,6C2F,6C30,6C32,6C34,6C35,6C38,6C3D,6C40,6C41,6C42,6C46,6C47,6C49,6C4A,6C50,6C54,6C55,6C57,6C5B,6C5C,6C5D,6C5E,6C5F,6C60,6C61,6C64,6C68,6C69,6C6A,6C70,6C72,6C74,6C76,6C79,6C7D,6C7E,6C81,6C82,6C83,6C85,6C86,6C88,6C89,6C8C,6C8F,6C90,6C93,6C94,6C99,6C9B,6C9F,6CA1,6CA3,6CA4,6CA5,6CA6,6CA7,6CA9,6CAA,6CAB,6CAD,6CAE,6CB1,6CB2,6CB3,6CB8,6CB9,6CBB,6CBC,6CBD,6CBE,6CBF,6CC4,6CC5,6CC9,6CCA,6CCC,6CD0,6CD3,6CD4,6CD5,6CD6,6CD7,6CDB,6CDE,6CE0,6CE1,6CE2,6CE3,6CE5,6CE8,6CEA,6CEB,6CEE,6CEF,6CF0,6CF1,6CF3,6CF5,6CF6,6CF7,6CF8,6CFA,6CFB,6CFC,6CFD,6CFE,6D01,6D04,6D07,6D0B,6D0C,6D0E,6D12,6D17,6D19,6D1A,6D1B,6D1E,6D25,6D27,6D2A,6D2B,6D2E,6D31,6D32,6D33,6D35,6D39,6D3B,6D3C,6D3D,6D3E,6D41,6D43,6D45,6D46,6D47,6D48,6D4A,6D4B,6D4D,6D4E,6D4F,6D51,6D52,6D53,6D54,6D59,6D5A,6D5C,6D5E,6D60,6D63,6D66,6D69,6D6A,6D6E,6D6F,6D74,6D77,6D78,6D7C,6D82,6D85,6D88,6D89,6D8C,6D8E,6D91,6D93,6D94,6D95,6D9B,6D9D,6D9E,6D9F,6DA0,6DA1,6DA3,6DA4,6DA6,6DA7,6DA8,6DA9,6DAA,6DAB,6DAE,6DAF,6DB2,6DB5,6DB8,6DBF,6DC0,6DC4,6DC5,6DC6,6DC7,6DCB,6DCC,6DD1,6DD6,6DD8,6DD9,6DDD,6DDE,6DE0,6DE1,6DE4,6DE6,6DEB,6DEC,6DEE,6DF1,6DF3,6DF7,6DF9,6DFB,6DFC,6E05,6E0A,6E0C,6E0D,6E0E,6E10,6E11,6E14,6E16,6E17,6E1A,6E1D,6E20,6E21,6E23,6E24,6E25,6E29,6E2B,6E2D,6E2F,6E32,6E34,6E38,6E3A,6E43,6E44,6E4D,6E4E,6E53,6E54,6E56,6E58,6E5B,6E5F,6E6B,6E6E,6E7E,6E7F,6E83,6E85,6E86,6E89,6E8F,6E90,6E98,6E9C,6E9F,6EA2,6EA5,6EA7,6EAA,6EAF,6EB1,6EB2,6EB4,6EB6,6EB7,6EBA,6EBB,6EBD,6EC1,6EC2,6EC7,6ECB,6ECF,6ED1,6ED3,6ED4,6ED5,6ED7,6EDA,6EDE,6EDF,6EE0,6EE1,6EE2,6EE4,6EE5,6EE6,6EE8,6EE9,6EF4,6EF9,6F02,6F06,6F09,6F0F,6F13,6F14,6F15,6F20,6F24,6F29,6F2A,6F2B,6F2D,6F2F,6F31,6F33,6F36,6F3E,6F46,6F47,6F4B,6F4D,6F58,6F5C,6F5E,6F62,6F66,6F6D,6F6E,6F72,6F74,6F78,6F7A,6F7C,6F84,6F88,6F89,6F8C,6F8D,6F8E,6F9C,6FA1,6FA7,6FB3,6FB6,6FB9,6FC0,6FC2,6FC9,6FD1,6FD2,6FDE,6FE0,6FE1,6FEE,6FEF,7011,701A,701B,7023,7035,7039,704C,704F,705E,706B,706C,706D,706F,7070,7075,7076,7078,707C,707E,707F,7080,7085,7089,708A,708E,7092,7094,7095,7096,7099,709C,709D,70AB,70AC,70AD,70AE,70AF,70B1,70B3,70B7,70B8,70B9,70BB,70BC,70BD,70C0,70C1,70C2,70C3,70C8,70CA,70D8,70D9,70DB,70DF,70E4,70E6,70E7,70E8,70E9,70EB,70EC,70ED,70EF,70F7,70F9,70FD,7109,710A,7110,7113,7115,7116,7118,7119,711A,7126,712F,7130,7131,7136,7145,714A,714C,714E,715C,715E,7164,7166,7167,7168,716E,7172,7173,7178,717A,717D,7184,718A,718F,7194,7198,7199,719F,71A0,71A8,71AC,71B3,71B5,71B9,71C3,71CE,71D4,71D5,71E0,71E5,71E7,71EE,71F9,7206,721D,7228,722A,722C,7230,7231,7235,7236,7237,7238,7239,723B,723D,723F,7247,7248,724C,724D,7252,7256,7259,725B,725D,725F,7261,7262,7266,7267,7269,726E,726F,7272,7275,7279,727A,727E,727F,7280,7281,7284,728A,728B,728D,728F,7292,729F,72AC,72AD,72AF,72B0,72B4,72B6,72B7,72B8,72B9,72C1,72C2,72C3,72C4,72C8,72CD,72CE,72D0,72D2,72D7,72D9,72DE,72E0,72E1,72E8,72E9,72EC,72ED,72EE,72EF,72F0,72F1,72F2,72F3,72F4,72F7,72F8,72FA,72FB,72FC,7301,7303,730A,730E,7313,7315,7316,7317,731B,731C,731D,731E,7321,7322,7325,7329,732A,732B,732C,732E,7331,7334,7337,7338,7339,733E,733F,734D,7350,7352,7357,7360,736C,736D,736F,737E,7384,7387,7389,738B,738E,7391,7396,739B,739F,73A2,73A9,73AB,73AE,73AF,73B0,73B2,73B3,73B7,73BA,73BB,73C0,73C2,73C8,73C9,73CA,73CD,73CF,73D0,73D1,73D9,73DE,73E0,73E5,73E7,73E9,73ED,73F2,7403,7405,7406,7409,740A,740F,7410,741A,741B,7422,7425,7426,7428,742A,742C,742E,7430,7433,7434,7435,7436,743C,7441,7455,7457,7459,745A,745B,745C,745E,745F,746D,7470,7476,7477,747E,7480,7481,7483,7487,748B,748E,7490,749C,749E,74A7,74A8,74A9,74BA,74D2,74DC,74DE,74E0,74E2,74E3,74E4,74E6,74EE,74EF,74F4,74F6,74F7,74FF,7504,750D,750F,7511,7513,7518,7519,751A,751C,751F,7525,7528,7529,752B,752C,752D,752F,7530,7531,7532,7533,7535,7537,7538,753A,753B,753E,7540,7545,7548,754B,754C,754E,754F,7554,7559,755A,755B,755C,7565,7566,756A,7572,7574,7578,7579,757F,7583,7586,758B,758F,7591,7592,7594,7596,7597,7599,759A,759D,759F,75A0,75A1,75A3,75A4,75A5,75AB,75AC,75AE,75AF,75B0,75B1,75B2,75B3,75B4,75B5,75B8,75B9,75BC,75BD,75BE,75C2,75C3,75C4,75C5,75C7,75C8,75C9,75CA,75CD,75D2,75D4,75D5,75D6,75D8,75DB,75DE,75E2,75E3,75E4,75E6,75E7,75E8,75EA,75EB,75F0,75F1,75F4,75F9,75FC,75FF,7600,7601,7603,7605,760A,760C,7610,7615,7617,7618,7619,761B,761F,7620,7622,7624,7625,7626,7629,762A,762B,762D,7630,7633,7634,7635,7638,763C,763E,763F,7640,7643,764C,764D,7654,7656,765C,765E,7663,766B,766F,7678,767B,767D,767E,7682,7684,7686,7687,7688,768B,768E,7691,7693,7696,7699,76A4,76AE,76B1,76B2,76B4,76BF,76C2,76C5,76C6,76C8,76CA,76CD,76CE,76CF,76D0,76D1,76D2,76D4,76D6,76D7,76D8,76DB,76DF,76E5,76EE,76EF,76F1,76F2,76F4,76F8,76F9,76FC,76FE,7701,7704,7707,7708,7709,770B,770D,7719,771A,771F,7720,7722,7726,7728,7729,772D,772F,7735,7736,7737,7738,773A,773C,7740,7741,7743,7747,7750,7751,775A,775B,7761,7762,7763,7765,7766,7768,776B,776C,7779,777D,777E,777F,7780,7784,7785,778C,778D,778E,7791,7792,779F,77A0,77A2,77A5,77A7,77A9,77AA,77AC,77B0,77B3,77B5,77BB,77BD,77BF,77CD,77D7,77DB,77DC,77E2,77E3,77E5,77E7,77E9,77EB,77EC,77ED,77EE,77F3,77F6,77F8,77FD,77FE,77FF,7800,7801,7802,7809,780C,780D,7811,7812,7814,7816,7817,7818,781A,781C,781D,781F,7823,7825,7826,7827,7829,782C,782D,7830,7834,7837,7838,7839,783A,783B,783C,783E,7840,7845,7847,784C,784E,7850,7852,7855,7856,7857,785D,786A,786B,786C,786D,786E,7877,787C,7887,7889,788C,788D,788E,7891,7893,7897,7898,789A,789B,789C,789F,78A1,78A3,78A5,78A7,78B0,78B1,78B2,78B3,78B4,78B9,78BE,78C1,78C5,78C9,78CA,78CB,78D0,78D4,78D5,78D9,78E8,78EC,78F2,78F4,78F7,78FA,7901,7905,7913,791E,7924,7934,793A,793B,793C,793E,7940,7941,7946,7948,7949,7953,7956,7957,795A,795B,795C,795D,795E,795F,7960,7962,7965,7967,7968,796D,796F,7977,7978,797A,7980,7981,7984,7985,798A,798F,799A,79A7,79B3,79B9,79BA,79BB,79BD,79BE,79C0,79C1,79C3,79C6,79C9,79CB,79CD,79D1,79D2,79D5,79D8,79DF,79E3,79E4,79E6,79E7,79E9,79EB,79ED,79EF,79F0,79F8,79FB,79FD,7A00,7A02,7A03,7A06,7A0B,7A0D,7A0E,7A14,7A17,7A1A,7A1E,7A20,7A23,7A33,7A37,7A39,7A3B,7A3C,7A3D,7A3F,7A46,7A51,7A57,7A70,7A74,7A76,7A77,7A78,7A79,7A7A,7A7F,7A80,7A81,7A83,7A84,7A86,7A88,7A8D,7A91,7A92,7A95,7A96,7A97,7A98,7A9C,7A9D,7A9F,7AA0,7AA5,7AA6,7AA8,7AAC,7AAD,7AB3,7ABF,7ACB,7AD6,7AD9,7ADE,7ADF,7AE0,7AE3,7AE5,7AE6,7AED,7AEF,7AF9,7AFA,7AFD,7AFF,7B03,7B04,7B06,7B08,7B0A,7B0B,7B0F,7B11,7B14,7B15,7B19,7B1B,7B1E,7B20,7B24,7B25,7B26,7B28,7B2A,7B2B,7B2C,7B2E,7B31,7B33,7B38,7B3A,7B3C,7B3E,7B45,7B47,7B49,7B4B,7B4C,7B4F,7B50,7B51,7B52,7B54,7B56,7B58,7B5A,7B5B,7B5D,7B60,7B62,7B6E,7B71,7B72,7B75,7B77,7B79,7B7B,7B7E,7B80,7B85,7B8D,7B90,7B94,7B95,7B97,7B9C,7B9D,7BA1,7BA2,7BA6,7BA7,7BA8,7BA9,7BAA,7BAB,7BAC,7BAD,7BB1,7BB4,7BB8,7BC1,7BC6,7BC7,7BCC,7BD1,7BD3,7BD9,7BDA,7BDD,7BE1,7BE5,7BE6,7BEA,7BEE,7BF1,7BF7,7BFC,7BFE,7C07,7C0B,7C0C,7C0F,7C16,7C1F,7C26,7C27,7C2A,7C38,7C3F,7C40,7C41,7C4D,7C73,7C74,7C7B,7C7C,7C7D,7C89,7C91,7C92,7C95,7C97,7C98,7C9C,7C9D,7C9E,7C9F,7CA2,7CA4,7CA5,7CAA,7CAE,7CB1,7CB2,7CB3,7CB9,7CBC,7CBD,7CBE,7CC1,7CC5,7CC7,7CC8,7CCA,7CCC,7CCD,7CD5,7CD6,7CD7,7CD9,7CDC,7CDF,7CE0,7CE8,7CEF,7CF8,7CFB,7D0A,7D20,7D22,7D27,7D2B,7D2F,7D6E,7D77,7DA6,7DAE,7E3B,7E41,7E47,7E82,7E9B,7E9F,7EA0,7EA1,7EA2,7EA3,7EA4,7EA5,7EA6,7EA7,7EA8,7EA9,7EAA,7EAB,7EAC,7EAD,7EAF,7EB0,7EB1,7EB2,7EB3,7EB5,7EB6,7EB7,7EB8,7EB9,7EBA,7EBD,7EBE,7EBF,7EC0,7EC1,7EC2,7EC3,7EC4,7EC5,7EC6,7EC7,7EC8,7EC9,7ECA,7ECB,7ECC,7ECD,7ECE,7ECF,7ED0,7ED1,7ED2,7ED3,7ED4,7ED5,7ED7,7ED8,7ED9,7EDA,7EDB,7EDC,7EDD,7EDE,7EDF,7EE0,7EE1,7EE2,7EE3,7EE5,7EE6,7EE7,7EE8,7EE9,7EEA,7EEB,7EED,7EEE,7EEF,7EF0,7EF1,7EF2,7EF3,7EF4,7EF5,7EF6,7EF7,7EF8,7EFA,7EFB,7EFC,7EFD,7EFE,7EFF,7F00,7F01,7F02,7F03,7F04,7F05,7F06,7F07,7F08,7F09,7F0B,7F0C,7F0D,7F0E,7F0F,7F11,7F12,7F13,7F14,7F15,7F16,7F17,7F18,7F19,7F1A,7F1B,7F1C,7F1D,7F1F,7F20,7F21,7F22,7F23,7F24,7F25,7F26,7F27,7F28,7F29,7F2A,7F2B,7F2C,7F2D,7F2E,7F2F,7F30,7F31,7F32,7F33,7F34,7F35,7F36,7F38,7F3A,7F42,7F44,7F45,7F50,7F51,7F54,7F55,7F57,7F58,7F5A,7F5F,7F61,7F62,7F68,7F69,7F6A,7F6E,7F71,7F72,7F74,7F79,7F7E,7F81,7F8A,7F8C,7F8E,7F94,7F9A,7F9D,7F9E,7F9F,7FA1,7FA4,7FA7,7FAF,7FB0,7FB2,7FB8,7FB9,7FBC,7FBD,7FBF,7FC1,7FC5,7FCA,7FCC,7FCE,7FD4,7FD5,7FD8,7FDF,7FE0,7FE1,7FE5,7FE6,7FE9,7FEE,7FF0,7FF1,7FF3,7FFB,7FFC,8000,8001,8003,8004,8005,8006,800B,800C,800D,8010,8012,8014,8015,8016,8017,8018,8019,801C,8020,8022,8025,8026,8027,8028,8029,802A,8031,8033,8035,8036,8037,8038,803B,803D,803F,8042,8043,8046,804A,804B,804C,804D,8052,8054,8058,805A,8069,806A,8071,807F,8080,8083,8084,8086,8087,8089,808B,808C,8093,8096,8098,809A,809B,809C,809D,809F,80A0,80A1,80A2,80A4,80A5,80A9,80AA,80AB,80AD,80AE,80AF,80B1,80B2,80B4,80B7,80BA,80BC,80BD,80BE,80BF,80C0,80C1,80C2,80C3,80C4,80C6,80CC,80CD,80CE,80D6,80D7,80D9,80DA,80DB,80DC,80DD,80DE,80E1,80E4,80E5,80E7,80E8,80E9,80EA,80EB,80EC,80ED,80EF,80F0,80F1,80F2,80F3,80F4,80F6,80F8,80FA,80FC,80FD,8102,8106,8109,810A,810D,810E,810F,8110,8111,8112,8113,8114,8116,8118,811A,811E,812C,812F,8131,8132,8136,8138,813E,8146,8148,814A,814B,814C,8150,8151,8153,8154,8155,8159,815A,8160,8165,8167,8169,816D,816E,8170,8171,8174,8179,817A,817B,817C,817D,817E,817F,8180,8182,8188,818A,818F,8191,8198,819B,819C,819D,81A3,81A6,81A8,81AA,81B3,81BA,81BB,81C0,81C1,81C2,81C3,81C6,81CA,81CC,81E3,81E7,81EA,81EC,81ED,81F3,81F4,81FB,81FC,81FE,8200,8201,8202,8204,8205,8206,820C,820D,8210,8212,8214,821B,821C,821E,821F,8221,8222,8223,8228,822A,822B,822C,822D,822F,8230,8231,8233,8234,8235,8236,8237,8238,8239,823B,823E,8244,8247,8249,824B,824F,8258,825A,825F,8268,826E,826F,8270,8272,8273,8274,8279,827A,827D,827E,827F,8282,8284,8288,828A,828B,828D,828E,828F,8291,8292,8297,8298,8299,829C,829D,829F,82A1,82A4,82A5,82A6,82A8,82A9,82AA,82AB,82AC,82AD,82AE,82AF,82B0,82B1,82B3,82B4,82B7,82B8,82B9,82BD,82BE,82C1,82C4,82C7,82C8,82CA,82CB,82CC,82CD,82CE,82CF,82D1,82D2,82D3,82D4,82D5,82D7,82D8,82DB,82DC,82DE,82DF,82E0,82E1,82E3,82E4,82E5,82E6,82EB,82EF,82F1,82F4,82F7,82F9,82FB,8301,8302,8303,8304,8305,8306,8307,8308,8309,830C,830E,830F,8311,8314,8315,8317,831A,831B,831C,8327,8328,832B,832C,832D,832F,8331,8333,8334,8335,8336,8338,8339,833A,833C,8340,8343,8346,8347,8349,834F,8350,8351,8352,8354,835A,835B,835C,835E,835F,8360,8361,8363,8364,8365,8366,8367,8368,8369,836A,836B,836C,836D,836E,836F,8377,8378,837B,837C,837D,8385,8386,8389,838E,8392,8393,8398,839B,839C,839E,83A0,83A8,83A9,83AA,83AB,83B0,83B1,83B2,83B3,83B4,83B6,83B7,83B8,83B9,83BA,83BC,83BD,83C0,83C1,83C5,83C7,83CA,83CC,83CF,83D4,83D6,83D8,83DC,83DD,83DF,83E0,83E1,83E5,83E9,83EA,83F0,83F1,83F2,83F8,83F9,83FD,8401,8403,8404,8406,840B,840C,840D,840E,840F,8411,8418,841C,841D,8424,8425,8426,8427,8428,8431,8438,843C,843D,8446,8451,8457,8459,845A,845B,845C,8461,8463,8469,846B,846C,846D,8471,8473,8475,8476,8478,847A,8482,8487,8488,8489,848B,848C,848E,8497,8499,849C,84A1,84AF,84B2,84B4,84B8,84B9,84BA,84BD,84BF,84C1,84C4,84C9,84CA,84CD,84D0,84D1,84D3,84D6,84DD,84DF,84E0,84E3,84E5,84E6,84EC,84F0,84FC,84FF,850C,8511,8513,8517,851A,851F,8521,852B,852C,8537,8538,8539,853A,853B,853C,853D,8543,8548,8549,854A,8556,8559,855E,8564,8568,8572,8574,8579,857A,857B,857E,8584,8585,8587,858F,859B,859C,85A4,85A8,85AA,85AE,85AF,85B0,85B7,85B9,85C1,85C9,85CF,85D0,85D3,85D5,85DC,85E4,85E9,85FB,85FF,8605,8611,8616,8627,8629,8638,863C,864D,864E,864F,8650,8651,8654,865A,865E,8662,866B,866C,866E,8671,8679,867A,867B,867C,867D,867E,867F,8680,8681,8682,868A,868B,868C,868D,8693,8695,869C,869D,86A3,86A4,86A7,86A8,86A9,86AA,86AC,86AF,86B0,86B1,86B4,86B5,86B6,86BA,86C0,86C4,86C6,86C7,86C9,86CA,86CB,86CE,86CF,86D0,86D1,86D4,86D8,86D9,86DB,86DE,86DF,86E4,86E9,86ED,86EE,86F0,86F1,86F2,86F3,86F4,86F8,86F9,86FE,8700,8702,8703,8707,8708,8709,870A,870D,8712,8713,8715,8717,8718,871A,871C,871E,8721,8722,8723,8725,8729,872E,8731,8734,8737,873B,873E,873F,8747,8748,8749,874C,874E,8753,8757,8759,8760,8763,8764,8765,876E,8770,8774,8776,877B,877C,877D,877E,8782,8783,8785,8788,878B,878D,8793,8797,879F,87A8,87AB,87AC,87AD,87AF,87B3,87B5,87BA,87BD,87C0,87C6,87CA,87CB,87D1,87D2,87D3,87DB,87E0,87E5,87EA,87EE,87F9,87FE,8803,880A,8813,8815,8816,881B,8821,8822,8832,8839,883C,8840,8844,8845,884C,884D,8854,8857,8859,8861,8862,8863,8864,8865,8868,8869,886B,886C,886E,8870,8872,8877,887D,887E,887F,8881,8882,8884,8885,8888,888B,888D,8892,8896,889C,88A2,88A4,88AB,88AD,88B1,88B7,88BC,88C1,88C2,88C5,88C6,88C9,88CE,88D2,88D4,88D5,88D8,88D9,88DF,88E2,88E3,88E4,88E5,88E8,88F0,88F1,88F3,88F4,88F8,88F9,88FC,88FE,8902,890A,8910,8912,8913,8919,891A,891B,8921,8925,892A,892B,8930,8934,8936,8941,8944,895E,895F,8966,897B,897F,8981,8983,8986,89C1,89C2,89C4,89C5,89C6,89C7,89C8,89C9,89CA,89CB,89CC,89CE,89CF,89D0,89D1,89D2,89D6,89DA,89DC,89DE,89E3,89E5,89E6,89EB,89EF,89F3,8A00,8A07,8A3E,8A48,8A79,8A89,8A8A,8A93,8B07,8B26,8B66,8B6C,8BA0,8BA1,8BA2,8BA3,8BA4,8BA5,8BA6,8BA7,8BA8,8BA9,8BAA,8BAB,8BAD,8BAE,8BAF,8BB0,8BB2,8BB3,8BB4,8BB5,8BB6,8BB7,8BB8,8BB9,8BBA,8BBC,8BBD,8BBE,8BBF,8BC0,8BC1,8BC2,8BC3,8BC4,8BC5,8BC6,8BC8,8BC9,8BCA,8BCB,8BCC,8BCD,8BCE,8BCF,8BD1,8BD2,8BD3,8BD4,8BD5,8BD6,8BD7,8BD8,8BD9,8BDA,8BDB,8BDC,8BDD,8BDE,8BDF,8BE0,8BE1,8BE2,8BE3,8BE4,8BE5,8BE6,8BE7,8BE8,8BE9,8BEB,8BEC,8BED,8BEE,8BEF,8BF0,8BF1,8BF2,8BF3,8BF4,8BF5,8BF6,8BF7,8BF8,8BF9,8BFA,8BFB,8BFC,8BFD,8BFE,8BFF,8C00,8C01,8C02,8C03,8C04,8C05,8C06,8C07,8C08,8C0A,8C0B,8C0C,8C0D,8C0E,8C0F,8C10,8C11,8C12,8C13,8C14,8C15,8C16,8C17,8C18,8C19,8C1A,8C1B,8C1C,8C1D,8C1F,8C20,8C21,8C22,8C23,8C24,8C25,8C26,8C27,8C28,8C29,8C2A,8C2B,8C2C,8C2D,8C2E,8C2F,8C30,8C31,8C32,8C33,8C34,8C35,8C36,8C37,8C41,8C46,8C47,8C49,8C4C,8C55,8C5A,8C61,8C62,8C6A,8C6B,8C73,8C78,8C79,8C7A,8C82,8C85,8C89,8C8A,8C8C,8C94,8C98,8D1D,8D1E,8D1F,8D21,8D22,8D23,8D24,8D25,8D26,8D27,8D28,8D29,8D2A,8D2B,8D2C,8D2D,8D2E,8D2F,8D30,8D31,8D32,8D33,8D34,8D35,8D36,8D37,8D38,8D39,8D3A,8D3B,8D3C,8D3D,8D3E,8D3F,8D40,8D41,8D42,8D43,8D44,8D45,8D46,8D47,8D48,8D49,8D4A,8D4B,8D4C,8D4D,8D4E,8D4F,8D50,8D53,8D54,8D55,8D56,8D58,8D59,8D5A,8D5B,8D5C,8D5D,8D5E,8D60,8D61,8D62,8D63,8D64,8D66,8D67,8D6B,8D6D,8D70,8D73,8D74,8D75,8D76,8D77,8D81,8D84,8D85,8D8A,8D8B,8D91,8D94,8D9F,8DA3,8DB1,8DB3,8DB4,8DB5,8DB8,8DBA,8DBC,8DBE,8DBF,8DC3,8DC4,8DC6,8DCB,8DCC,8DCE,8DCF,8DD1,8DD6,8DD7,8DDA,8DDB,8DDD,8DDE,8DDF,8DE3,8DE4,8DE8,8DEA,8DEB,8DEC,8DEF,8DF3,8DF5,8DF7,8DF8,8DF9,8DFA,8DFB,8DFD,8E05,8E09,8E0A,8E0C,8E0F,8E14,8E1D,8E1E,8E1F,8E22,8E23,8E29,8E2A,8E2C,8E2E,8E2F,8E31,8E35,8E39,8E3A,8E3D,8E40,8E41,8E42,8E44,8E47,8E48,8E49,8E4A,8E4B,8E51,8E52,8E59,8E66,8E69,8E6C,8E6D,8E6F,8E70,8E72,8E74,8E76,8E7C,8E7F,8E81,8E85,8E87,8E8F,8E90,8E94,8E9C,8E9E,8EAB,8EAC,8EAF,8EB2,8EBA,8ECE,8F66,8F67,8F68,8F69,8F6B,8F6C,8F6D,8F6E,8F6F,8F70,8F71,8F72,8F73,8F74,8F75,8F76,8F77,8F78,8F79,8F7A,8F7B,8F7C,8F7D,8F7E,8F7F,8F81,8F82,8F83,8F84,8F85,8F86,8F87,8F88,8F89,8F8A,8F8B,8F8D,8F8E,8F8F,8F90,8F91,8F93,8F94,8F95,8F96,8F97,8F98,8F99,8F9A,8F9B,8F9C,8F9E,8F9F,8FA3,8FA8,8FA9,8FAB,8FB0,8FB1,8FB6,8FB9,8FBD,8FBE,8FC1,8FC2,8FC4,8FC5,8FC7,8FC8,8FCE,8FD0,8FD1,8FD3,8FD4,8FD5,8FD8,8FD9,8FDB,8FDC,8FDD,8FDE,8FDF,8FE2,8FE4,8FE5,8FE6,8FE8,8FE9,8FEA,8FEB,8FED,8FEE,8FF0,8FF3,8FF7,8FF8,8FF9,8FFD,9000,9001,9002,9003,9004,9005,9006,9009,900A,900B,900D,900F,9010,9011,9012,9014,9016,9017,901A,901B,901D,901E,901F,9020,9021,9022,9026,902D,902E,902F,9035,9036,9038,903B,903C,903E,9041,9042,9044,9047,904D,904F,9050,9051,9052,9053,9057,9058,905B,9062,9063,9065,9068,906D,906E,9074,9075,907D,907F,9080,9082,9083,9088,908B,9091,9093,9095,9097,9099,909B,909D,90A1,90A2,90A3,90A6,90AA,90AC,90AE,90AF,90B0,90B1,90B3,90B4,90B5,90B6,90B8,90B9,90BA,90BB,90BE,90C1,90C4,90C5,90C7,90CA,90CE,90CF,90D0,90D1,90D3,90D7,90DB,90DC,90DD,90E1,90E2,90E6,90E7,90E8,90EB,90ED,90EF,90F4,90F8,90FD,90FE,9102,9104,9119,911E,9122,9123,912F,9131,9139,9143,9146,9149,914A,914B,914C,914D,914E,914F,9150,9152,9157,915A,915D,915E,9161,9162,9163,9164,9165,9169,916A,916C,916E,916F,9170,9171,9172,9174,9175,9176,9177,9178,9179,917D,917E,917F,9185,9187,9189,918B,918C,918D,9190,9191,9192,919A,919B,91A2,91A3,91AA,91AD,91AE,91AF,91B4,91B5,91BA,91C7,91C9,91CA,91CC,91CD,91CE,91CF,91D1,91DC,9274,928E,92AE,92C8,933E,936A,938F,93CA,93D6,943E,946B,9485,9486,9487,9488,9489,948A,948B,948C,948D,948E,948F,9490,9492,9493,9494,9495,9497,9499,949A,949B,949C,949D,949E,949F,94A0,94A1,94A2,94A3,94A4,94A5,94A6,94A7,94A8,94A9,94AA,94AB,94AC,94AD,94AE,94AF,94B0,94B1,94B2,94B3,94B4,94B5,94B6,94B7,94B8,94B9,94BA,94BB,94BC,94BD,94BE,94BF,94C0,94C1,94C2,94C3,94C4,94C5,94C6,94C8,94C9,94CA,94CB,94CC,94CD,94CE,94D0,94D1,94D2,94D5,94D6,94D7,94D8,94D9,94DB,94DC,94DD,94DE,94DF,94E0,94E1,94E2,94E3,94E4,94E5,94E7,94E8,94E9,94EA,94EB,94EC,94ED,94EE,94EF,94F0,94F1,94F2,94F3,94F4,94F5,94F6,94F7,94F8,94F9,94FA,94FC,94FD,94FE,94FF,9500,9501,9502,9503,9504,9505,9506,9507,9508,9509,950A,950B,950C,950D,950E,950F,9510,9511,9512,9513,9514,9515,9516,9517,9518,9519,951A,951B,951D,951E,951F,9521,9522,9523,9524,9525,9526,9528,9529,952A,952B,952C,952D,952E,952F,9530,9531,9532,9534,9535,9536,9537,9538,9539,953A,953B,953C,953E,953F,9540,9541,9542,9544,9545,9546,9547,9549,954A,954C,954D,954E,954F,9550,9551,9552,9553,9554,9556,9557,9558,9559,955B,955C,955D,955E,955F,9561,9562,9563,9564,9565,9566,9567,9568,9569,956A,956B,956C,956D,956F,9570,9571,9572,9573,9576,957F,95E8,95E9,95EA,95EB,95ED,95EE,95EF,95F0,95F1,95F2,95F3,95F4,95F5,95F6,95F7,95F8,95F9,95FA,95FB,95FC,95FD,95FE,9600,9601,9602,9603,9604,9605,9606,9608,9609,960A,960B,960C,960D,960E,960F,9610,9611,9612,9614,9615,9616,9617,9619,961A,961C,961D,961F,9621,9622,962A,962E,9631,9632,9633,9634,9635,9636,963B,963C,963D,963F,9640,9642,9644,9645,9646,9647,9648,9649,964B,964C,964D,9650,9654,9655,965B,965F,9661,9662,9664,9667,9668,9669,966A,966C,9672,9674,9675,9676,9677,9685,9686,9688,968B,968D,968F,9690,9694,9697,9698,9699,969C,96A7,96B0,96B3,96B6,96B9,96BC,96BD,96BE,96C0,96C1,96C4,96C5,96C6,96C7,96C9,96CC,96CD,96CE,96CF,96D2,96D5,96E0,96E8,96E9,96EA,96EF,96F3,96F6,96F7,96F9,96FE,9700,9701,9704,9706,9707,9708,9709,970D,970E,970F,9713,9716,971C,971E,972A,972D,9730,9732,9738,9739,973E,9752,9753,9756,9759,975B,975E,9760,9761,9762,9765,9769,9773,9774,9776,977C,9785,978B,978D,9791,9792,9794,9798,97A0,97A3,97AB,97AD,97AF,97B2,97B4,97E6,97E7,97E9,97EA,97EB,97EC,97ED,97F3,97F5,97F6,9875,9876,9877,9878,9879,987A,987B,987C,987D,987E,987F,9880,9881,9882,9883,9884,9885,9886,9887,9888,9889,988A,988C,988D,988F,9890,9891,9893,9894,9896,9897,9898,989A,989B,989C,989D,989E,989F,98A0,98A1,98A2,98A4,98A5,98A6,98A7,98CE,98D1,98D2,98D3,98D5,98D8,98D9,98DA,98DE,98DF,98E7,98E8,990D,9910,992E,9954,9955,9963,9965,9967,9968,9969,996A,996B,996C,996D,996E,996F,9970,9971,9972,9974,9975,9976,9977,997A,997C,997D,997F,9980,9981,9984,9985,9986,9987,9988,998A,998B,998D,998F,9990,9991,9992,9993,9994,9995,9996,9997,9998,9999,99A5,99A8,9A6C,9A6D,9A6E,9A6F,9A70,9A71,9A73,9A74,9A75,9A76,9A77,9A78,9A79,9A7A,9A7B,9A7C,9A7D,9A7E,9A7F,9A80,9A81,9A82,9A84,9A85,9A86,9A87,9A88,9A8A,9A8B,9A8C,9A8F,9A90,9A91,9A92,9A93,9A96,9A97,9A98,9A9A,9A9B,9A9C,9A9D,9A9E,9A9F,9AA0,9AA1,9AA2,9AA3,9AA4,9AA5,9AA7,9AA8,9AB0,9AB1,9AB6,9AB7,9AB8,9ABA,9ABC,9AC0,9AC1,9AC2,9AC5,9ACB,9ACC,9AD1,9AD3,9AD8,9ADF,9AE1,9AE6,9AEB,9AED,9AEF,9AF9,9AFB,9B03,9B08,9B0F,9B13,9B1F,9B23,9B2F,9B32,9B3B,9B3C,9B41,9B42,9B43,9B44,9B45,9B47,9B48,9B49,9B4D,9B4F,9B51,9B54,9C7C,9C7F,9C81,9C82,9C85,9C86,9C87,9C88,9C8B,9C8D,9C8E,9C90,9C91,9C92,9C94,9C95,9C9A,9C9B,9C9C,9C9E,9C9F,9CA0,9CA1,9CA2,9CA3,9CA4,9CA5,9CA6,9CA7,9CA8,9CA9,9CAB,9CAD,9CAE,9CB0,9CB1,9CB2,9CB3,9CB4,9CB5,9CB6,9CB7,9CB8,9CBA,9CBB,9CBC,9CBD,9CC3,9CC4,9CC5,9CC6,9CC7,9CCA,9CCB,9CCC,9CCD,9CCE,9CCF,9CD0,9CD3,9CD4,9CD5,9CD6,9CD7,9CD8,9CD9,9CDC,9CDD,9CDE,9CDF,9CE2,9E1F,9E20,9E21,9E22,9E23,9E25,9E26,9E28,9E29,9E2A,9E2B,9E2C,9E2D,9E2F,9E31,9E32,9E33,9E35,9E36,9E37,9E38,9E39,9E3A,9E3D,9E3E,9E3F,9E41,9E42,9E43,9E44,9E45,9E46,9E47,9E48,9E49,9E4A,9E4B,9E4C,9E4E,9E4F,9E51,9E55,9E57,9E58,9E5A,9E5B,9E5C,9E5E,9E63,9E64,9E66,9E67,9E68,9E69,9E6A,9E6B,9E6C,9E6D,9E70,9E71,9E73,9E7E,9E7F,9E82,9E87,9E88,9E8B,9E92,9E93,9E9D,9E9F,9EA6,9EB4,9EB8,9EBB,9EBD,9EBE,9EC4,9EC9,9ECD,9ECE,9ECF,9ED1,9ED4,9ED8,9EDB,9EDC,9EDD,9EDF,9EE0,9EE2,9EE5,9EE7,9EE9,9EEA,9EEF,9EF9,9EFB,9EFC,9EFE,9F0B,9F0D,9F0E,9F10,9F13,9F17,9F19,9F20,9F22,9F2C,9F2F,9F37,9F39,9F3B,9F3D,9F3E,9F44,9F50,9F51,9F7F,9F80,9F83,9F84,9F85,9F86,9F87,9F88,9F89,9F8A,9F8B,9F8C,9F99,9F9A,9F9B,9F9F,9FA0,FF01,FF02,FF03,FF04,FF05,FF06,FF07,FF08,FF09,FF0A,FF0B,FF0C,FF0D,FF0E,FF0F,FF10,FF11,FF12,FF13,FF14,FF15,FF16,FF17,FF18,FF19,FF1A,FF1B,FF1C,FF1D,FF1E,FF1F,FF20,FF21,FF22,FF23,FF24,FF25,FF26,FF27,FF28,FF29,FF2A,FF2B,FF2C,FF2D,FF2E,FF2F,FF30,FF31,FF32,FF33,FF34,FF35,FF36,FF37,FF38,FF39,FF3A,FF3B,FF3C,FF3D,FF3E,FF3F,FF40,FF41,FF42,FF43,FF44,FF45,FF46,FF47,FF48,FF49,FF4A,FF4B,FF4C,FF4D,FF4E,FF4F,FF50,FF51,FF52,FF53,FF54,FF55,FF56,FF57,FF58,FF59,FF5A,FF5B,FF5C,FF5D,FF5E,FFE0,FFE1,FFE3,FFE5';
//    },
//
//    AnsicodeChr: function () {
//        return 'A1E8,A1EC,A1A7,A1E3,A1C0,A1A4,A1C1,A8A4,A8A2,A8A8,A8A6,A8BA,A8AC,A8AA,A8B0,A8AE,A1C2,A8B4,A8B2,A8B9,A8A1,A8A5,A8A7,A8A9,A8AD,A8B1,A8A3,A8AB,A8AF,A8B3,A8B5,A8B6,A8B7,A8B8,A1A6,A1A5,A6A1,A6A2,A6A3,A6A4,A6A5,A6A6,A6A7,A6A8,A6A9,A6AA,A6AB,A6AC,A6AD,A6AE,A6AF,A6B0,A6B1,A6B2,A6B3,A6B4,A6B5,A6B6,A6B7,A6B8,A6C1,A6C2,A6C3,A6C4,A6C5,A6C6,A6C7,A6C8,A6C9,A6CA,A6CB,A6CC,A6CD,A6CE,A6CF,A6D0,A6D1,A6D2,A6D3,A6D4,A6D5,A6D6,A6D7,A6D8,A7A7,A7A1,A7A2,A7A3,A7A4,A7A5,A7A6,A7A8,A7A9,A7AA,A7AB,A7AC,A7AD,A7AE,A7AF,A7B0,A7B1,A7B2,A7B3,A7B4,A7B5,A7B6,A7B7,A7B8,A7B9,A7BA,A7BB,A7BC,A7BD,A7BE,A7BF,A7C0,A7C1,A7D1,A7D2,A7D3,A7D4,A7D5,A7D6,A7D8,A7D9,A7DA,A7DB,A7DC,A7DD,A7DE,A7DF,A7E0,A7E1,A7E2,A7E3,A7E4,A7E5,A7E6,A7E7,A7E8,A7E9,A7EA,A7EB,A7EC,A7ED,A7EE,A7EF,A7F0,A7F1,A7D7,A1AA,A1AC,A1AE,A1AF,A1B0,A1B1,A1AD,A1EB,A1E4,A1E5,A1F9,A1E6,A1ED,A2F1,A2F2,A2F3,A2F4,A2F5,A2F6,A2F7,A2F8,A2F9,A2FA,A2FB,A2FC,A1FB,A1FC,A1FA,A1FD,A1CA,A1C7,A1C6,A1CC,A1D8,A1DE,A1CF,A1CE,A1C4,A1C5,A1C9,A1C8,A1D2,A1D3,A1E0,A1DF,A1C3,A1CB,A1D7,A1D6,A1D5,A1D9,A1D4,A1DC,A1DD,A1DA,A1DB,A1D1,A1CD,A1D0,A2D9,A2DA,A2DB,A2DC,A2DD,A2DE,A2DF,A2E0,A2E1,A2E2,A2C5,A2C6,A2C7,A2C8,A2C9,A2CA,A2CB,A2CC,A2CD,A2CE,A2CF,A2D0,A2D1,A2D2,A2D3,A2D4,A2D5,A2D6,A2D7,A2D8,A2B1,A2B2,A2B3,A2B4,A2B5,A2B6,A2B7,A2B8,A2B9,A2BA,A2BB,A2BC,A2BD,A2BE,A2BF,A2C0,A2C1,A2C2,A2C3,A2C4,A9A4,A9A5,A9A6,A9A7,A9A8,A9A9,A9AA,A9AB,A9AC,A9AD,A9AE,A9AF,A9B0,A9B1,A9B2,A9B3,A9B4,A9B5,A9B6,A9B7,A9B8,A9B9,A9BA,A9BB,A9BC,A9BD,A9BE,A9BF,A9C0,A9C1,A9C2,A9C3,A9C4,A9C5,A9C6,A9C7,A9C8,A9C9,A9CA,A9CB,A9CC,A9CD,A9CE,A9CF,A9D0,A9D1,A9D2,A9D3,A9D4,A9D5,A9D6,A9D7,A9D8,A9D9,A9DA,A9DB,A9DC,A9DD,A9DE,A9DF,A9E0,A9E1,A9E2,A9E3,A9E4,A9E5,A9E6,A9E7,A9E8,A9E9,A9EA,A9EB,A9EC,A9ED,A9EE,A9EF,A1F6,A1F5,A1F8,A1F7,A1F4,A1F3,A1F0,A1F2,A1F1,A1EF,A1EE,A1E2,A1E1,A1A1,A1A2,A1A3,A1A8,A1A9,A1B4,A1B5,A1B6,A1B7,A1B8,A1B9,A1BA,A1BB,A1BE,A1BF,A1FE,A1B2,A1B3,A1BC,A1BD,A4A1,A4A2,A4A3,A4A4,A4A5,A4A6,A4A7,A4A8,A4A9,A4AA,A4AB,A4AC,A4AD,A4AE,A4AF,A4B0,A4B1,A4B2,A4B3,A4B4,A4B5,A4B6,A4B7,A4B8,A4B9,A4BA,A4BB,A4BC,A4BD,A4BE,A4BF,A4C0,A4C1,A4C2,A4C3,A4C4,A4C5,A4C6,A4C7,A4C8,A4C9,A4CA,A4CB,A4CC,A4CD,A4CE,A4CF,A4D0,A4D1,A4D2,A4D3,A4D4,A4D5,A4D6,A4D7,A4D8,A4D9,A4DA,A4DB,A4DC,A4DD,A4DE,A4DF,A4E0,A4E1,A4E2,A4E3,A4E4,A4E5,A4E6,A4E7,A4E8,A4E9,A4EA,A4EB,A4EC,A4ED,A4EE,A4EF,A4F0,A4F1,A4F2,A4F3,A5A1,A5A2,A5A3,A5A4,A5A5,A5A6,A5A7,A5A8,A5A9,A5AA,A5AB,A5AC,A5AD,A5AE,A5AF,A5B0,A5B1,A5B2,A5B3,A5B4,A5B5,A5B6,A5B7,A5B8,A5B9,A5BA,A5BB,A5BC,A5BD,A5BE,A5BF,A5C0,A5C1,A5C2,A5C3,A5C4,A5C5,A5C6,A5C7,A5C8,A5C9,A5CA,A5CB,A5CC,A5CD,A5CE,A5CF,A5D0,A5D1,A5D2,A5D3,A5D4,A5D5,A5D6,A5D7,A5D8,A5D9,A5DA,A5DB,A5DC,A5DD,A5DE,A5DF,A5E0,A5E1,A5E2,A5E3,A5E4,A5E5,A5E6,A5E7,A5E8,A5E9,A5EA,A5EB,A5EC,A5ED,A5EE,A5EF,A5F0,A5F1,A5F2,A5F3,A5F4,A5F5,A5F6,A8C5,A8C6,A8C7,A8C8,A8C9,A8CA,A8CB,A8CC,A8CD,A8CE,A8CF,A8D0,A8D1,A8D2,A8D3,A8D4,A8D5,A8D6,A8D7,A8D8,A8D9,A8DA,A8DB,A8DC,A8DD,A8DE,A8DF,A8E0,A8E1,A8E2,A8E3,A8E4,A8E5,A8E6,A8E7,A8E8,A8E9,A2E5,A2E6,A2E7,A2E8,A2E9,A2EA,A2EB,A2EC,A2ED,A2EE,D2BB,B6A1,C6DF,CDF2,D5C9,C8FD,C9CF,CFC2,D8A2,B2BB,D3EB,D8A4,B3F3,D7A8,C7D2,D8A7,CAC0,C7F0,B1FB,D2B5,B4D4,B6AB,CBBF,D8A9,B6AA,C1BD,D1CF,C9A5,D8AD,B8F6,D1BE,E3DC,D6D0,B7E1,B4AE,C1D9,D8BC,CDE8,B5A4,CEAA,D6F7,C0F6,BED9,D8AF,C4CB,BEC3,D8B1,C3B4,D2E5,D6AE,CEDA,D5A7,BAF5,B7A6,C0D6,C6B9,C5D2,C7C7,B9D4,B3CB,D2D2,D8BF,BEC5,C6F2,D2B2,CFB0,CFE7,CAE9,D8C0,C2F2,C2D2,C8E9,C7AC,C1CB,D3E8,D5F9,CAC2,B6FE,D8A1,D3DA,BFF7,D4C6,BBA5,D8C1,CEE5,BEAE,D8A8,D1C7,D0A9,D8BD,D9EF,CDF6,BFBA,BDBB,BAA5,D2E0,B2FA,BAE0,C4B6,CFED,BEA9,CDA4,C1C1,C7D7,D9F1,D9F4,C8CB,D8E9,D2DA,CAB2,C8CA,D8EC,D8EA,D8C6,BDF6,C6CD,B3F0,D8EB,BDF1,BDE9,C8D4,B4D3,C2D8,B2D6,D7D0,CACB,CBFB,D5CC,B8B6,CFC9,D9DA,D8F0,C7AA,D8EE,B4FA,C1EE,D2D4,D8ED,D2C7,D8EF,C3C7,D1F6,D6D9,D8F2,D8F5,BCFE,BCDB,C8CE,B7DD,B7C2,C6F3,D8F8,D2C1,CEE9,BCBF,B7FC,B7A5,D0DD,D6DA,D3C5,BBEF,BBE1,D8F1,C9A1,CEB0,B4AB,D8F3,C9CB,D8F6,C2D7,D8F7,CEB1,D8F9,B2AE,B9C0,D9A3,B0E9,C1E6,C9EC,CBC5,CBC6,D9A4,B5E8,B5AB,CEBB,B5CD,D7A1,D7F4,D3D3,CCE5,BACE,D9A2,D9DC,D3E0,D8FD,B7F0,D7F7,D8FE,D8FA,D9A1,C4E3,D3B6,D8F4,D9DD,D8FB,C5E5,C0D0,D1F0,B0DB,BCD1,D9A6,D9A5,D9AC,D9AE,D9AB,CAB9,D9A9,D6B6,B3DE,D9A8,C0FD,CACC,D9AA,D9A7,D9B0,B6B1,B9A9,D2C0,CFC0,C2C2,BDC4,D5EC,B2E0,C7C8,BFEB,D9AD,D9AF,CEEA,BAEE,C7D6,B1E3,B4D9,B6ED,D9B4,BFA1,D9DE,C7CE,C0FE,D9B8,CBD7,B7FD,D9B5,D9B7,B1A3,D3E1,D9B9,D0C5,D9B6,D9B1,D9B2,C1A9,D9B3,BCF3,D0DE,B8A9,BEE3,D9BD,D9BA,B0B3,D9C2,D9C4,B1B6,D9BF,B5B9,BEF3,CCC8,BAF2,D2D0,D9C3,BDE8,B3AB,D9C5,BEEB,D9C6,D9BB,C4DF,D9BE,D9C1,D9C0,D5AE,D6B5,C7E3,D9C8,BCD9,D9CA,D9BC,D9CB,C6AB,D9C9,D7F6,CDA3,BDA1,D9CC,C5BC,CDB5,D9CD,D9C7,B3A5,BFFE,B8B5,C0FC,B0F8,B4F6,D9CE,D9CF,B4A2,D9D0,B4DF,B0C1,D9D1,C9B5,CFF1,D9D2,C1C5,D9D6,C9AE,D9D5,D9D4,D9D7,CBDB,BDA9,C6A7,D9D3,D9D8,D9D9,C8E5,C0DC,B6F9,D8A3,D4CA,D4AA,D0D6,B3E4,D5D7,CFC8,B9E2,BFCB,C3E2,B6D2,CDC3,D9EE,D9F0,B5B3,B6B5,BEA4,C8EB,C8AB,B0CB,B9AB,C1F9,D9E2,C0BC,B9B2,B9D8,D0CB,B1F8,C6E4,BEDF,B5E4,D7C8,D1F8,BCE6,CADE,BCBD,D9E6,D8E7,C4DA,B8D4,C8BD,B2E1,D4D9,C3B0,C3E1,DAA2,C8DF,D0B4,BEFC,C5A9,B9DA,DAA3,D4A9,DAA4,D9FB,B6AC,B7EB,B1F9,D9FC,B3E5,BEF6,BFF6,D2B1,C0E4,B6B3,D9FE,D9FD,BEBB,C6E0,D7BC,DAA1,C1B9,B5F2,C1E8,BCF5,B4D5,C1DD,C4FD,BCB8,B7B2,B7EF,D9EC,C6BE,BFAD,BBCB,B5CA,DBC9,D0D7,CDB9,B0BC,B3F6,BBF7,DBCA,BAAF,D4E4,B5B6,B5F3,D8D6,C8D0,B7D6,C7D0,D8D7,BFAF,DBBB,D8D8,D0CC,BBAE,EBBE,C1D0,C1F5,D4F2,B8D5,B4B4,B3F5,C9BE,C5D0,C5D9,C0FB,B1F0,D8D9,B9CE,B5BD,D8DA,D6C6,CBA2,C8AF,C9B2,B4CC,BFCC,B9F4,D8DB,D8DC,B6E7,BCC1,CCEA,CFF7,D8DD,C7B0,B9D0,BDA3,CCDE,C6CA,D8E0,D8DE,D8DF,B0FE,BEE7,CAA3,BCF4,B8B1,B8EE,D8E2,BDCB,D8E4,D8E3,C5FC,D8E5,D8E6,C1A6,C8B0,B0EC,B9A6,BCD3,CEF1,DBBD,C1D3,B6AF,D6FA,C5AC,BDD9,DBBE,DBBF,C0F8,BEA2,C0CD,DBC0,CAC6,B2AA,D3C2,C3E3,D1AB,DBC2,C0D5,DBC3,BFB1,C4BC,C7DA,DBC4,D9E8,C9D7,B9B4,CEF0,D4C8,B0FC,B4D2,D0D9,D9E9,DECB,D9EB,D8B0,BBAF,B1B1,B3D7,D8CE,D4D1,BDB3,BFEF,CFBB,D8D0,B7CB,D8D1,C6A5,C7F8,D2BD,D8D2,C4E4,CAAE,C7A7,D8A6,C9FD,CEE7,BBDC,B0EB,BBAA,D0AD,B1B0,D7E4,D7BF,B5A5,C2F4,C4CF,B2A9,B2B7,B1E5,DFB2,D5BC,BFA8,C2AC,D8D5,C2B1,D8D4,CED4,DAE0,CEC0,D8B4,C3AE,D3A1,CEA3,BCB4,C8B4,C2D1,BEED,D0B6,DAE1,C7E4,B3A7,B6F2,CCFC,C0FA,C0F7,D1B9,D1E1,D8C7,B2DE,C0E5,BAF1,D8C8,D4AD,CFE1,D8C9,D8CA,CFC3,B3F8,BEC7,D8CB,DBCC,C8A5,CFD8,C8FE,B2CE,D3D6,B2E6,BCB0,D3D1,CBAB,B7B4,B7A2,CAE5,C8A1,CADC,B1E4,D0F0,C5D1,DBC5,B5FE,BFDA,B9C5,BEE4,C1ED,DFB6,DFB5,D6BB,BDD0,D5D9,B0C8,B6A3,BFC9,CCA8,DFB3,CAB7,D3D2,D8CF,D2B6,BAC5,CBBE,CCBE,DFB7,B5F0,DFB4,D3F5,B3D4,B8F7,DFBA,BACF,BCAA,B5F5,CDAC,C3FB,BAF3,C0F4,CDC2,CFF2,DFB8,CFC5,C2C0,DFB9,C2F0,BEFD,C1DF,CDCC,D2F7,B7CD,DFC1,DFC4,B7F1,B0C9,B6D6,B7D4,BAAC,CCFD,BFD4,CBB1,C6F4,D6A8,DFC5,CEE2,B3B3,CEFC,B4B5,CEC7,BAF0,CEE1,D1BD,DFC0,B4F4,B3CA,B8E6,DFBB,C4C5,DFBC,DFBD,DFBE,C5BB,DFBF,DFC2,D4B1,DFC3,C7BA,CED8,C4D8,DFCA,DFCF,D6DC,DFC9,DFDA,CEB6,BAC7,DFCE,DFC8,C5DE,C9EB,BAF4,C3FC,BED7,DFC6,DFCD,C5D8,D5A6,BACD,BECC,D3BD,B8C0,D6E4,DFC7,B9BE,BFA7,C1FC,DFCB,DFCC,DFD0,DFDB,DFE5,DFD7,DFD6,D7C9,DFE3,DFE4,E5EB,D2A7,DFD2,BFA9,D4DB,BFC8,DFD4,CFCC,DFDD,D1CA,DFDE,B0A7,C6B7,DFD3,BAE5,B6DF,CDDB,B9FE,D4D5,DFDF,CFEC,B0A5,DFE7,DFD1,D1C6,DFD5,DFD8,DFD9,DFDC,BBA9,DFE0,DFE1,DFE2,DFE6,DFE8,D3B4,B8E7,C5B6,DFEA,C9DA,C1A8,C4C4,BFDE,CFF8,D5DC,DFEE,B2B8,BADF,DFEC,DBC1,D1E4,CBF4,B4BD,B0A6,DFF1,CCC6,DFF2,DFED,DFE9,DFEB,DFEF,DFF0,BBBD,DFF3,DFF4,BBA3,CADB,CEA8,E0A7,B3AA,E0A6,E0A1,DFFE,CDD9,DFFC,DFFA,BFD0,D7C4,C9CC,DFF8,B0A1,DFFD,DFFB,E0A2,E0A8,B7C8,C6A1,C9B6,C0B2,DFF5,C5BE,D8C4,DFF9,C4F6,E0A3,E0A4,E0A5,D0A5,E0B4,CCE4,E0B1,BFA6,E0AF,CEB9,E0AB,C9C6,C0AE,E0AE,BAED,BAB0,E0A9,DFF6,E0B3,E0B8,B4AD,E0B9,CFB2,BAC8,E0B0,D0FA,E0AC,D4FB,DFF7,C5E7,E0AD,D3F7,E0B6,E0B7,E0C4,D0E1,E0BC,E0C9,E0CA,E0BE,E0AA,C9A4,E0C1,E0B2,CAC8,E0C3,E0B5,CECB,CBC3,E0CD,E0C6,E0C2,E0CB,E0BA,E0BF,E0C0,E0C5,E0C7,E0C8,E0CC,E0BB,CBD4,E0D5,E0D6,E0D2,E0D0,BCCE,E0D1,B8C2,D8C5,D0EA,C2EF,E0CF,E0BD,E0D4,E0D3,E0D7,E0DC,E0D8,D6F6,B3B0,D7EC,CBBB,E0DA,CEFB,BAD9,E0E1,E0DD,D2AD,E0E2,E0DB,E0D9,E0DF,E0E0,E0DE,E0E4,C6F7,D8AC,D4EB,E0E6,CAC9,E0E5,B8C1,E0E7,E0E8,E0E9,E0E3,BABF,CCE7,E0EA,CFF9,E0EB,C8C2,BDC0,C4D2,E0EC,E0ED,C7F4,CBC4,E0EE,BBD8,D8B6,D2F2,E0EF,CDC5,B6DA,E0F1,D4B0,C0A7,B4D1,CEA7,E0F0,E0F2,B9CC,B9FA,CDBC,E0F3,C6D4,E0F4,D4B2,C8A6,E0F6,E0F5,E0F7,CDC1,CAA5,D4DA,DBD7,DBD9,DBD8,B9E7,DBDC,DBDD,B5D8,DBDA,DBDB,B3A1,DBDF,BBF8,D6B7,DBE0,BEF9,B7BB,DBD0,CCAE,BFB2,BBB5,D7F8,BFD3,BFE9,BCE1,CCB3,DBDE,B0D3,CEEB,B7D8,D7B9,C6C2,C0A4,CCB9,DBE7,DBE1,C6BA,DBE3,DBE8,C5F7,DBEA,DBE9,BFC0,DBE6,DBE5,B4B9,C0AC,C2A2,DBE2,DBE4,D0CD,DBED,C0DD,DBF2,B6E2,DBF3,DBD2,B9B8,D4AB,DBEC,BFD1,DBF0,DBD1,B5E6,DBEB,BFE5,DBEE,DBF1,DBF9,B9A1,B0A3,C2F1,B3C7,DBEF,DBF8,C6D2,DBF4,DBF5,DBF7,DBF6,DBFE,D3F2,B2BA,DBFD,DCA4,DBFB,DBFA,DBFC,C5E0,BBF9,DCA3,DCA5,CCC3,B6D1,DDC0,DCA1,DCA2,C7B5,B6E9,DCA7,DCA6,DCA9,B1A4,B5CC,BFB0,D1DF,B6C2,DCA8,CBFA,EBF3,CBDC,CBFE,CCC1,C8FB,DCAA,CCEE,DCAB,DBD3,DCAF,DCAC,BEB3,CAFB,DCAD,C9CA,C4B9,C7BD,DCAE,D4F6,D0E6,C4AB,B6D5,DBD4,B1DA,DBD5,DBD6,BABE,C8C0,CABF,C8C9,D7B3,C9F9,BFC7,BAF8,D2BC,E2BA,B4A6,B1B8,B8B4,CFC4,D9E7,CFA6,CDE2,D9ED,B6E0,D2B9,B9BB,E2B9,E2B7,B4F3,CCEC,CCAB,B7F2,D8B2,D1EB,BABB,CAA7,CDB7,D2C4,BFE4,BCD0,B6E1,DEC5,DEC6,DBBC,D1D9,C6E6,C4CE,B7EE,B7DC,BFFC,D7E0,C6F5,B1BC,DEC8,BDB1,CCD7,DECA,DEC9,B5EC,C9DD,B0C2,C5AE,C5AB,C4CC,BCE9,CBFD,BAC3,E5F9,C8E7,E5FA,CDFD,D7B1,B8BE,C2E8,C8D1,E5FB,B6CA,BCCB,D1FD,E6A1,C3EE,E6A4,E5FE,E6A5,CDD7,B7C1,E5FC,E5FD,E6A3,C4DD,E6A8,E6A7,C3C3,C6DE,E6AA,C4B7,E6A2,CABC,BDE3,B9C3,E6A6,D0D5,CEAF,E6A9,E6B0,D2A6,BDAA,E6AD,E6AF,C0D1,D2CC,BCA7,E6B1,D2F6,D7CB,CDFE,CDDE,C2A6,E6AB,E6AC,BDBF,E6AE,E6B3,E6B2,E6B6,E6B8,C4EF,C4C8,BEEA,C9EF,E6B7,B6F0,C3E4,D3E9,E6B4,E6B5,C8A2,E6BD,E6B9,C6C5,CDF1,E6BB,E6BC,BBE9,E6BE,E6BA,C0B7,D3A4,E6BF,C9F4,E6C3,E6C4,D0F6,C3BD,C3C4,E6C2,E6C1,E6C7,CFB1,EBF4,E6CA,E6C5,BCDE,C9A9,BCB5,CFD3,E6C8,E6C9,E6CE,E6D0,E6D1,E6CB,B5D5,E6CC,E6CF,C4DB,E6C6,E6CD,E6D2,E6D4,E6D3,E6D5,D9F8,E6D6,E6D7,D7D3,E6DD,E6DE,BFD7,D4D0,D7D6,B4E6,CBEF,E6DA,D8C3,D7CE,D0A2,C3CF,E6DF,BCBE,B9C2,E6DB,D1A7,BAA2,C2CF,D8AB,CAEB,E5EE,E6DC,B7F5,C8E6,C4F5,E5B2,C4FE,CBFC,E5B3,D5AC,D3EE,CAD8,B0B2,CBCE,CDEA,BAEA,E5B5,E5B4,D7DA,B9D9,D6E6,B6A8,CDF0,D2CB,B1A6,CAB5,B3E8,C9F3,BFCD,D0FB,CAD2,E5B6,BBC2,CFDC,B9AC,D4D7,BAA6,D1E7,CFFC,BCD2,E5B7,C8DD,BFED,B1F6,CBDE,BCC5,BCC4,D2FA,C3DC,BFDC,B8BB,C3C2,BAAE,D4A2,C7DE,C4AF,B2EC,B9D1,E5BB,C1C8,D5AF,E5BC,E5BE,B4E7,B6D4,CBC2,D1B0,B5BC,CAD9,B7E2,C9E4,BDAB,CEBE,D7F0,D0A1,C9D9,B6FB,E6D8,BCE2,B3BE,C9D0,E6D9,B3A2,DECC,D3C8,DECD,D2A2,DECE,BECD,DECF,CAAC,D2FC,B3DF,E5EA,C4E1,BEA1,CEB2,C4F2,BED6,C6A8,B2E3,BED3,C7FC,CCEB,BDEC,CEDD,CABA,C6C1,E5EC,D0BC,D5B9,E5ED,CAF4,CDC0,C2C5,E5EF,C2C4,E5F0,E5F8,CDCD,C9BD,D2D9,E1A8,D3EC,CBEA,C6F1,E1AC,E1A7,E1A9,E1AA,E1AF,B2ED,E1AB,B8DA,E1AD,E1AE,E1B0,B5BA,E1B1,E1B3,E1B8,D1D2,E1B6,E1B5,C1EB,E1B7,D4C0,E1B2,E1BA,B0B6,E1B4,BFF9,E1B9,E1BB,E1BE,E1BC,D6C5,CFBF,E1BD,E1BF,C2CD,B6EB,D3F8,C7CD,B7E5,BEFE,E1C0,E1C1,E1C7,B3E7,C6E9,B4DE,D1C2,E1C8,E1C6,E1C5,E1C3,E1C2,B1C0,D5B8,E1C4,E1CB,E1CC,E1CA,EFFA,E1D3,E1D2,C7B6,E1C9,E1CE,E1D0,E1D4,E1D1,E1CD,E1CF,E1D5,E1D6,E1D7,E1D8,E1DA,E1DB,CEA1,E7DD,B4A8,D6DD,D1B2,B3B2,B9A4,D7F3,C7C9,BEDE,B9AE,CED7,B2EE,DBCF,BCBA,D2D1,CBC8,B0CD,CFEF,D9E3,BDED,B1D2,CAD0,B2BC,CBA7,B7AB,CAA6,CFA3,E0F8,D5CA,E0FB,E0FA,C5C1,CCFB,C1B1,E0F9,D6E3,B2AF,D6C4,B5DB,B4F8,D6A1,CFAF,B0EF,E0FC,E1A1,B3A3,E0FD,E0FE,C3B1,C3DD,E1A2,B7F9,BBCF,E1A3,C4BB,E1A4,E1A5,E1A6,B4B1,B8C9,C6BD,C4EA,B2A2,D0D2,E7DB,BBC3,D3D7,D3C4,B9E3,E2CF,D7AF,C7EC,B1D3,B4B2,E2D1,D0F2,C2AE,E2D0,BFE2,D3A6,B5D7,E2D2,B5EA,C3ED,B8FD,B8AE,C5D3,B7CF,E2D4,E2D3,B6C8,D7F9,CDA5,E2D8,E2D6,CAFC,BFB5,D3B9,E2D5,E2D7,C1AE,C0C8,E2DB,E2DA,C0AA,C1CE,E2DC,E2DD,E2DE,DBC8,D1D3,CDA2,BDA8,DEC3,D8A5,BFAA,DBCD,D2EC,C6FA,C5AA,DEC4,B1D7,DFAE,CABD,DFB1,B9AD,D2FD,B8A5,BAEB,B3DA,B5DC,D5C5,C3D6,CFD2,BBA1,E5F3,E5F2,E5F4,CDE4,C8F5,B5AF,C7BF,E5F6,ECB0,E5E6,B9E9,B5B1,C2BC,E5E8,E5E7,E5E9,D2CD,E1EA,D0CE,CDAE,D1E5,B2CA,B1EB,B1F2,C5ED,D5C3,D3B0,E1DC,E1DD,D2DB,B3B9,B1CB,CDF9,D5F7,E1DE,BEB6,B4FD,E1DF,BADC,E1E0,BBB2,C2C9,E1E1,D0EC,CDBD,E1E2,B5C3,C5C7,E1E3,E1E4,D3F9,E1E5,D1AD,E1E6,CEA2,E1E7,B5C2,E1E8,BBD5,D0C4,E2E0,B1D8,D2E4,E2E1,BCC9,C8CC,E2E3,ECFE,ECFD,DFAF,E2E2,D6BE,CDFC,C3A6,E3C3,D6D2,E2E7,E2E8,D3C7,E2EC,BFEC,E2ED,E2E5,B3C0,C4EE,E2EE,D0C3,BAF6,E2E9,B7DE,BBB3,CCAC,CBCB,E2E4,E2E6,E2EA,E2EB,E2F7,E2F4,D4F5,E2F3,C5AD,D5FA,C5C2,B2C0,E2EF,E2F2,C1AF,CBBC,B5A1,E2F9,BCB1,E2F1,D0D4,D4B9,E2F5,B9D6,E2F6,C7D3,E2F0,D7DC,EDA1,E2F8,EDA5,E2FE,CAD1,C1B5,BBD0,BFD6,BAE3,CBA1,EDA6,EDA3,EDA2,BBD6,EDA7,D0F4,EDA4,BADE,B6F7,E3A1,B6B2,CCF1,B9A7,CFA2,C7A1,BFD2,B6F1,E2FA,E2FB,E2FD,E2FC,C4D5,E3A2,D3C1,E3A7,C7C4,CFA4,E3A9,BAB7,E3A8,BBDA,E3A3,E3A4,E3AA,E3A6,CEF2,D3C6,BBBC,D4C3,C4FA,EDA8,D0FC,E3A5,C3F5,E3AD,B1AF,E3B2,BCC2,E3AC,B5BF,C7E9,E3B0,BEAA,CDEF,BBF3,CCE8,E3AF,E3B1,CFA7,E3AE,CEA9,BBDD,B5EB,BEE5,B2D2,B3CD,B1B9,E3AB,B2D1,B5AC,B9DF,B6E8,CFEB,E3B7,BBCC,C8C7,D0CA,E3B8,B3EE,EDA9,D3FA,D3E4,EDAA,E3B9,D2E2,E3B5,D3DE,B8D0,E3B3,E3B6,B7DF,E3B4,C0A2,E3BA,D4B8,B4C8,E3BB,BBC5,C9F7,C9E5,C4BD,EDAB,C2FD,BBDB,BFAE,CEBF,E3BC,BFB6,B1EF,D4F7,E3BE,EDAD,E3BF,BAA9,EDAC,E3BD,E3C0,BAB6,B6AE,D0B8,B0C3,EDAE,EDAF,C0C1,E3C1,C5B3,E3C2,DCB2,EDB0,B8EA,CEEC,EAA7,D0E7,CAF9,C8D6,CFB7,B3C9,CED2,BDE4,E3DE,BBF2,EAA8,D5BD,C6DD,EAA9,EAAA,EAAC,EAAB,EAAE,EAAD,BDD8,EAAF,C2BE,B4C1,B4F7,BBA7,ECE6,ECE5,B7BF,CBF9,B1E2,ECE7,C9C8,ECE8,ECE9,CAD6,DED0,B2C5,D4FA,C6CB,B0C7,B4F2,C8D3,CDD0,BFB8,BFDB,C7A4,D6B4,C0A9,DED1,C9A8,D1EF,C5A4,B0E7,B3B6,C8C5,B0E2,B7F6,C5FA,B6F3,D5D2,B3D0,BCBC,B3AD,BEF1,B0D1,D2D6,CAE3,D7A5,CDB6,B6B6,BFB9,D5DB,B8A7,C5D7,DED2,BFD9,C2D5,C7C0,BBA4,B1A8,C5EA,C5FB,CCA7,B1A7,B5D6,C4A8,DED3,D1BA,B3E9,C3F2,B7F7,D6F4,B5A3,B2F0,C4B4,C4E9,C0AD,DED4,B0E8,C5C4,C1E0,B9D5,BEDC,CDD8,B0CE,CDCF,DED6,BED0,D7BE,DED5,D5D0,B0DD,C4E2,C2A3,BCF0,D3B5,C0B9,C5A1,B2A6,D4F1,C0A8,CAC3,DED7,D5FC,B9B0,C8AD,CBA9,DED9,BFBD,C6B4,D7A7,CAB0,C4C3,B3D6,B9D2,D6B8,EAFC,B0B4,BFE6,CCF4,CDDA,D6BF,C2CE,CECE,CCA2,D0AE,C4D3,B5B2,DED8,D5F5,BCB7,BBD3,B0A4,C5B2,B4EC,D5F1,EAFD,DEDA,CDA6,CDEC,CEE6,DEDC,CDB1,C0A6,D7BD,DEDB,B0C6,BAB4,C9D3,C4F3,BEE8,B2B6,C0CC,CBF0,BCF1,BBBB,B5B7,C5F5,DEE6,DEE3,BEDD,DEDF,B4B7,BDDD,DEE0,C4ED,CFC6,B5E0,B6DE,CADA,B5F4,DEE5,D5C6,DEE1,CCCD,C6FE,C5C5,D2B4,BEF2,C2D3,CCBD,B3B8,BDD3,BFD8,CDC6,D1DA,B4EB,DEE4,DEDD,DEE7,EAFE,C2B0,DEE2,D6C0,B5A7,B2F4,DEE8,DEF2,DEED,DEF1,C8E0,D7E1,DEEF,C3E8,CCE1,B2E5,D2BE,DEEE,DEEB,CED5,B4A7,BFAB,BEBE,BDD2,DEE9,D4AE,DEDE,DEEA,C0BF,DEEC,B2F3,B8E9,C2A7,BDC1,DEF5,DEF8,B2AB,B4A4,B4EA,C9A6,DEF6,CBD1,B8E3,DEF7,DEFA,DEF9,CCC2,B0E1,B4EE,E5BA,D0AF,B2EB,EBA1,DEF4,C9E3,DEF3,B0DA,D2A1,B1F7,CCAF,DEF0,CBA4,D5AA,DEFB,B4DD,C4A6,DEFD,C3FE,C4A1,DFA1,C1CC,DEFC,BEEF,C6B2,B3C5,C8F6,CBBA,DEFE,DFA4,D7B2,B3B7,C1C3,C7CB,B2A5,B4E9,D7AB,C4EC,DFA2,DFA3,DFA5,BAB3,DFA6,C0DE,C9C3,B2D9,C7E6,DFA7,C7DC,DFA8,EBA2,CBD3,DFAA,DFA9,B2C1,C5CA,DFAB,D4DC,C8C1,DFAC,BEF0,DFAD,D6A7,EAB7,EBB6,CAD5,D8FC,B8C4,B9A5,B7C5,D5FE,B9CA,D0A7,F4CD,B5D0,C3F4,BEC8,EBB7,B0BD,BDCC,C1B2,B1D6,B3A8,B8D2,C9A2,B6D8,EBB8,BEB4,CAFD,C7C3,D5FB,B7F3,CEC4,D5AB,B1F3,ECB3,B0DF,ECB5,B6B7,C1CF,F5FA,D0B1,D5E5,CED3,BDEF,B3E2,B8AB,D5B6,EDBD,B6CF,CBB9,D0C2,B7BD,ECB6,CAA9,C5D4,ECB9,ECB8,C2C3,ECB7,D0FD,ECBA,ECBB,D7E5,ECBC,ECBD,C6EC,CEDE,BCC8,C8D5,B5A9,BEC9,D6BC,D4E7,D1AE,D0F1,EAB8,EAB9,EABA,BAB5,CAB1,BFF5,CDFA,EAC0,B0BA,EABE,C0A5,EABB,B2FD,C3F7,BBE8,D2D7,CEF4,EABF,EABC,EAC3,D0C7,D3B3,B4BA,C3C1,D7F2,D5D1,CAC7,EAC5,EAC4,EAC7,EAC6,D6E7,CFD4,EACB,BBCE,BDFA,C9CE,EACC,C9B9,CFFE,EACA,D4CE,EACD,EACF,CDED,EAC9,EACE,CEEE,BBDE,B3BF,C6D5,BEB0,CEFA,C7E7,BEA7,EAD0,D6C7,C1C0,D4DD,EAD1,CFBE,EAD2,CAEE,C5AF,B0B5,EAD4,EAD3,F4DF,C4BA,B1A9,E5DF,EAD5,CAEF,EAD6,EAD7,C6D8,EAD8,EAD9,D4BB,C7FA,D2B7,B8FC,EAC2,B2DC,C2FC,D4F8,CCE6,D7EE,D4C2,D3D0,EBC3,C5F3,B7FE,EBD4,CBB7,EBDE,C0CA,CDFB,B3AF,C6DA,EBFC,C4BE,CEB4,C4A9,B1BE,D4FD,CAF5,D6EC,C6D3,B6E4,BBFA,D0E0,C9B1,D4D3,C8A8,B8CB,E8BE,C9BC,E8BB,C0EE,D0D3,B2C4,B4E5,E8BC,D5C8,B6C5,E8BD,CAF8,B8DC,CCF5,C0B4,D1EE,E8BF,E8C2,BABC,B1AD,BDDC,EABD,E8C3,E8C6,E8CB,E8CC,CBC9,B0E5,BCAB,B9B9,E8C1,CDF7,E8CA,CEF6,D5ED,C1D6,E8C4,C3B6,B9FB,D6A6,E8C8,CAE0,D4E6,E8C0,E8C5,E8C7,C7B9,B7E3,E8C9,BFDD,E8D2,E8D7,E8D5,BCDC,BCCF,E8DB,E8DE,E8DA,B1FA,B0D8,C4B3,B8CC,C6E2,C8BE,C8E1,E8CF,E8D4,E8D6,B9F1,E8D8,D7F5,C4FB,E8DC,B2E9,E8D1,BCED,BFC2,E8CD,D6F9,C1F8,B2F1,E8DF,CAC1,E8D9,D5A4,B1EA,D5BB,E8CE,E8D0,B6B0,E8D3,E8DD,C0B8,CAF7,CBA8,C6DC,C0F5,E8E9,D0A3,E8F2,D6EA,E8E0,E8E1,D1F9,BACB,B8F9,B8F1,D4D4,E8EF,E8EE,E8EC,B9F0,CCD2,E8E6,CEA6,BFF2,B0B8,E8F1,E8F0,D7C0,E8E4,CDA9,C9A3,BBB8,BDDB,E8EA,E8E2,E8E3,E8E5,B5B5,E8E7,C7C5,E8EB,E8ED,BDB0,D7AE,E8F8,E8F5,CDB0,E8F6,C1BA,E8E8,C3B7,B0F0,E8F4,E8F7,B9A3,C9D2,C3CE,CEE0,C0E6,CBF3,CCDD,D0B5,CAE1,E8F3,BCEC,E8F9,C3DE,C6E5,B9F7,B0F4,D7D8,BCAC,C5EF,CCC4,E9A6,C9AD,E9A2,C0E2,BFC3,E8FE,B9D7,E8FB,E9A4,D2CE,E9A3,D6B2,D7B5,E9A7,BDB7,E8FC,E8FD,E9A1,CDD6,D2AC,E9B2,E9A9,B4AA,B4BB,E9AB,D0A8,E9A5,B3FE,E9AC,C0E3,E9AA,E9B9,E9B8,E9AE,E8FA,E9A8,BFAC,E9B1,E9BA,C2A5,E9AF,B8C5,E9AD,D3DC,E9B4,E9B5,E9B7,E9C7,C0C6,E9C5,E9B0,E9BB,B0F1,E9BC,D5A5,E9BE,E9BF,E9C1,C1F1,C8B6,E9BD,E9C2,E9C3,E9B3,E9B6,BBB1,E9C0,BCF7,E9C4,E9C6,E9CA,E9CE,B2DB,E9C8,B7AE,E9CB,E9CC,D5C1,C4A3,E9D8,BAE1,E9C9,D3A3,E9D4,E9D7,E9D0,E9CF,C7C1,E9D2,E9D9,B3C8,E9D3,CFF0,E9CD,B3F7,E9D6,E9DA,CCB4,CFAD,E9D5,E9DC,E9DB,E9DE,E9D1,E9DD,E9DF,C3CA,C7B7,B4CE,BBB6,D0C0,ECA3,C5B7,D3FB,ECA4,ECA5,C6DB,BFEE,ECA6,ECA7,D0AA,C7B8,B8E8,ECA8,D6B9,D5FD,B4CB,B2BD,CEE4,C6E7,CDE1,B4F5,CBC0,BCDF,E9E2,E9E3,D1EA,E9E5,B4F9,E9E4,D1B3,CAE2,B2D0,E9E8,E9E6,E9E7,D6B3,E9E9,E9EA,E9EB,E9EC,ECAF,C5B9,B6CE,D2F3,B5EE,BBD9,ECB1,D2E3,CEE3,C4B8,C3BF,B6BE,D8B9,B1C8,B1CF,B1D1,C5FE,B1D0,C3AB,D5B1,EBA4,BAC1,CCBA,EBA5,EBA7,EBA8,EBA6,EBA9,EBAB,EBAA,EBAC,CACF,D8B5,C3F1,C3A5,C6F8,EBAD,C4CA,EBAE,EBAF,EBB0,B7D5,B7FA,EBB1,C7E2,EBB3,BAA4,D1F5,B0B1,EBB2,EBB4,B5AA,C2C8,C7E8,EBB5,CBAE,E3DF,D3C0,D9DB,CDA1,D6AD,C7F3,D9E0,BBE3,BABA,E3E2,CFAB,E3E0,C9C7,BAB9,D1B4,E3E1,C8EA,B9AF,BDAD,B3D8,CEDB,CCC0,E3E8,E3E9,CDF4,CCAD,BCB3,E3EA,E3EB,D0DA,C6FB,B7DA,C7DF,D2CA,CED6,E3E4,E3EC,C9F2,B3C1,E3E7,C6E3,E3E5,EDB3,E3E6,C9B3,C5E6,B9B5,C3BB,E3E3,C5BD,C1A4,C2D9,B2D7,E3ED,BBA6,C4AD,E3F0,BEDA,E3FB,E3F5,BAD3,B7D0,D3CD,D6CE,D5D3,B9C1,D5B4,D1D8,D0B9,C7F6,C8AA,B2B4,C3DA,E3EE,E3FC,E3EF,B7A8,E3F7,E3F4,B7BA,C5A2,E3F6,C5DD,B2A8,C6FC,C4E0,D7A2,C0E1,E3F9,E3FA,E3FD,CCA9,E3F3,D3BE,B1C3,EDB4,E3F1,E3F2,E3F8,D0BA,C6C3,D4F3,E3FE,BDE0,E4A7,E4A6,D1F3,E4A3,E4A9,C8F7,CFB4,E4A8,E4AE,C2E5,B6B4,BDF2,E4A2,BAE9,E4AA,E4AC,B6FD,D6DE,E4B2,E4AD,E4A1,BBEE,CDDD,C7A2,C5C9,C1F7,E4A4,C7B3,BDAC,BDBD,E4A5,D7C7,B2E2,E4AB,BCC3,E4AF,BBEB,E4B0,C5A8,E4B1,D5E3,BFA3,E4BA,E4B7,E4BB,E4BD,C6D6,BAC6,C0CB,B8A1,E4B4,D4A1,BAA3,BDFE,E4BC,CDBF,C4F9,CFFB,C9E6,D3BF,CFD1,E4B3,E4B8,E4B9,CCE9,CCCE,C0D4,E4B5,C1B0,E4B6,CED0,BBC1,B5D3,C8F3,BDA7,D5C7,C9AC,B8A2,E4CA,E4CC,D1C4,D2BA,BAAD,BAD4,E4C3,B5ED,D7CD,E4C0,CFFD,E4BF,C1DC,CCCA,CAE7,C4D7,CCD4,E4C8,E4C7,E4C1,E4C4,B5AD,D3D9,E4C6,D2F9,B4E3,BBB4,C9EE,B4BE,BBEC,D1CD,CCED,EDB5,C7E5,D4A8,E4CB,D7D5,E4C2,BDA5,E4C5,D3E6,E4C9,C9F8,E4BE,D3E5,C7FE,B6C9,D4FC,B2B3,E4D7,CEC2,E4CD,CEBC,B8DB,E4D6,BFCA,D3CE,C3EC,C5C8,E4D8,CDC4,E4CF,E4D4,E4D5,BAFE,CFE6,D5BF,E4D2,E4D0,E4CE,CDE5,CAAA,C0A3,BDA6,E4D3,B8C8,E4E7,D4B4,E4DB,C1EF,E4E9,D2E7,E4DF,E4E0,CFAA,CBDD,E4DA,E4D1,E4E5,C8DC,E4E3,C4E7,E4E2,E4E1,B3FC,E4E8,B5E1,D7CC,E4E6,BBAC,D7D2,CCCF,EBF8,E4E4,B9F6,D6CD,E4D9,E4DC,C2FA,E4DE,C2CB,C0C4,C2D0,B1F5,CCB2,B5CE,E4EF,C6AF,C6E1,E4F5,C2A9,C0EC,D1DD,E4EE,C4AE,E4ED,E4F6,E4F4,C2FE,E4DD,E4F0,CAFE,D5C4,E4F1,D1FA,E4EB,E4EC,E4F2,CEAB,C5CB,C7B1,C2BA,E4EA,C1CA,CCB6,B3B1,E4FB,E4F3,E4FA,E4FD,E4FC,B3CE,B3BA,E4F7,E4F9,E4F8,C5EC,C0BD,D4E8,E5A2,B0C4,E5A4,E5A3,BCA4,E5A5,E5A1,E4FE,B1F4,E5A8,E5A9,E5A6,E5A7,E5AA,C6D9,E5AB,E5AD,E5AC,E5AF,E5AE,B9E0,E5B0,E5B1,BBF0,ECE1,C3F0,B5C6,BBD2,C1E9,D4EE,BEC4,D7C6,D4D6,B2D3,ECBE,EAC1,C2AF,B4B6,D1D7,B3B4,C8B2,BFBB,ECC0,D6CB,ECBF,ECC1,ECC5,BEE6,CCBF,C5DA,BEBC,ECC6,B1FE,ECC4,D5A8,B5E3,ECC2,C1B6,B3E3,ECC3,CBB8,C0C3,CCFE,C1D2,ECC8,BAE6,C0D3,D6F2,D1CC,BFBE,B7B3,C9D5,ECC7,BBE2,CCCC,BDFD,C8C8,CFA9,CDE9,C5EB,B7E9,D1C9,BAB8,ECC9,ECCA,BBC0,ECCB,ECE2,B1BA,B7D9,BDB9,ECCC,D1E6,ECCD,C8BB,ECD1,ECD3,BBCD,BCE5,ECCF,C9B7,C3BA,ECE3,D5D5,ECD0,D6F3,ECD2,ECCE,ECD4,ECD5,C9BF,CFA8,D0DC,D1AC,C8DB,ECD6,CEF5,CAEC,ECDA,ECD9,B0BE,ECD7,ECD8,ECE4,C8BC,C1C7,ECDC,D1E0,ECDB,D4EF,ECDD,DBC6,ECDE,B1AC,ECDF,ECE0,D7A6,C5C0,EBBC,B0AE,BEF4,B8B8,D2AF,B0D6,B5F9,D8B3,CBAC,E3DD,C6AC,B0E6,C5C6,EBB9,EBBA,EBBB,D1C0,C5A3,EAF2,C4B2,C4B5,C0CE,EAF3,C4C1,CEEF,EAF0,EAF4,C9FC,C7A3,CCD8,CEFE,EAF5,EAF6,CFAC,C0E7,EAF7,B6BF,EAF8,EAF9,EAFA,EAFB,EAF1,C8AE,E1EB,B7B8,E1EC,E1ED,D7B4,E1EE,E1EF,D3CC,E1F1,BFF1,E1F0,B5D2,B1B7,E1F3,E1F2,BAFC,E1F4,B9B7,BED1,C4FC,BADD,BDC6,E1F5,E1F7,B6C0,CFC1,CAA8,E1F6,D5F8,D3FC,E1F8,E1FC,E1F9,E1FA,C0EA,E1FE,E2A1,C0C7,E1FB,E1FD,E2A5,C1D4,E2A3,E2A8,B2FE,E2A2,C3CD,B2C2,E2A7,E2A6,E2A4,E2A9,E2AB,D0C9,D6ED,C3A8,E2AC,CFD7,E2AE,BAEF,E9E0,E2AD,E2AA,BBAB,D4B3,E2B0,E2AF,E9E1,E2B1,E2B2,E2B3,CCA1,E2B4,E2B5,D0FE,C2CA,D3F1,CDF5,E7E0,E7E1,BEC1,C2EA,E7E4,E7E3,CDE6,C3B5,E7E2,BBB7,CFD6,C1E1,E7E9,E7E8,E7F4,B2A3,E7EA,E7E6,E7EC,E7EB,C9BA,D5E4,E7E5,B7A9,E7E7,E7EE,E7F3,D6E9,E7ED,E7F2,E7F1,B0E0,E7F5,C7F2,C0C5,C0ED,C1F0,E7F0,E7F6,CBF6,E8A2,E8A1,D7C1,E7FA,E7F9,E7FB,E7F7,E7FE,E7FD,E7FC,C1D5,C7D9,C5FD,C5C3,C7ED,E8A3,E8A6,E8A5,E8A7,BAF7,E7F8,E8A4,C8F0,C9AA,E8A9,B9E5,D1FE,E8A8,E8AA,E8AD,E8AE,C1A7,E8AF,E8B0,E8AC,E8B4,E8AB,E8B1,E8B5,E8B2,E8B3,E8B7,E8B6,B9CF,F0AC,F0AD,C6B0,B0EA,C8BF,CDDF,CECD,EAB1,EAB2,C6BF,B4C9,EAB3,D5E7,DDF9,EAB4,EAB5,EAB6,B8CA,DFB0,C9F5,CCF0,C9FA,C9FB,D3C3,CBA6,B8A6,F0AE,B1C2,E5B8,CCEF,D3C9,BCD7,C9EA,B5E7,C4D0,B5E9,EEAE,BBAD,E7DE,EEAF,B3A9,EEB2,EEB1,BDE7,EEB0,CEB7,C5CF,C1F4,DBCE,EEB3,D0F3,C2D4,C6E8,B7AC,EEB4,B3EB,BBFB,EEB5,E7DC,EEB6,BDAE,F1E2,CAE8,D2C9,F0DA,F0DB,F0DC,C1C6,B8ED,BECE,F0DE,C5B1,F0DD,D1F1,F0E0,B0CC,BDEA,D2DF,F0DF,B4AF,B7E8,F0E6,F0E5,C6A3,F0E1,F0E2,B4C3,F0E3,D5EE,CCDB,BED2,BCB2,F0E8,F0E7,F0E4,B2A1,D6A2,D3B8,BEB7,C8AC,F0EA,D1F7,D6CC,BADB,F0E9,B6BB,CDB4,C6A6,C1A1,F0EB,F0EE,F0ED,F0F0,F0EC,BBBE,F0EF,CCB5,F0F2,B3D5,B1D4,F0F3,F0F4,F0F6,B4E1,F0F1,F0F7,F0FA,F0F8,F0F5,F0FD,F0F9,F0FC,F0FE,F1A1,CEC1,F1A4,F1A3,C1F6,F0FB,CADD,B4F1,B1F1,CCB1,F1A6,F1A7,F1AC,D5CE,F1A9,C8B3,F1A2,F1AB,F1A8,F1A5,F1AA,B0A9,F1AD,F1AF,F1B1,F1B0,F1AE,D1A2,F1B2,F1B3,B9EF,B5C7,B0D7,B0D9,D4ED,B5C4,BDD4,BBCA,F0A7,B8DE,F0A8,B0A8,F0A9,CDEE,F0AA,F0AB,C6A4,D6E5,F1E4,F1E5,C3F3,D3DB,D6D1,C5E8,D3AF,D2E6,EEC1,B0BB,D5B5,D1CE,BCE0,BAD0,BFF8,B8C7,B5C1,C5CC,CAA2,C3CB,EEC2,C4BF,B6A2,EDEC,C3A4,D6B1,CFE0,EDEF,C5CE,B6DC,CAA1,EDED,EDF0,EDF1,C3BC,BFB4,EDEE,EDF4,EDF2,D5E6,C3DF,EDF3,EDF6,D5A3,D1A3,EDF5,C3D0,EDF7,BFF4,BEEC,EDF8,CCF7,D1DB,D7C5,D5F6,EDFC,EDFB,EDF9,EDFA,EDFD,BEA6,CBAF,EEA1,B6BD,EEA2,C4C0,EDFE,BDDE,B2C7,B6C3,EEA5,D8BA,EEA3,EEA6,C3E9,B3F2,EEA7,EEA4,CFB9,EEA8,C2F7,EEA9,EEAA,DEAB,C6B3,C7C6,D6F5,B5C9,CBB2,EEAB,CDAB,EEAC,D5B0,EEAD,F6C4,DBC7,B4A3,C3AC,F1E6,CAB8,D2D3,D6AA,EFF2,BED8,BDC3,EFF3,B6CC,B0AB,CAAF,EDB6,EDB7,CEF9,B7AF,BFF3,EDB8,C2EB,C9B0,EDB9,C6F6,BFB3,EDBC,C5F8,D1D0,D7A9,EDBA,EDBB,D1E2,EDBF,EDC0,EDC4,EDC8,EDC6,EDCE,D5E8,EDC9,EDC7,EDBE,C5E9,C6C6,C9E9,D4D2,EDC1,EDC2,EDC3,EDC5,C0F9,B4A1,B9E8,EDD0,EDD1,EDCA,EDCF,CEF8,CBB6,EDCC,EDCD,CFF5,EDD2,C1F2,D3B2,EDCB,C8B7,BCEF,C5F0,EDD6,B5EF,C2B5,B0AD,CBE9,B1AE,EDD4,CDEB,B5E2,EDD5,EDD3,EDD7,B5FA,EDD8,EDD9,EDDC,B1CC,C5F6,BCEE,EDDA,CCBC,B2EA,EDDB,C4EB,B4C5,B0F5,EDDF,C0DA,B4E8,C5CD,EDDD,BFC4,EDDE,C4A5,EDE0,EDE1,EDE3,C1D7,BBC7,BDB8,EDE2,EDE4,EDE6,EDE5,EDE7,CABE,ECEA,C0F1,C9E7,ECEB,C6EE,ECEC,C6ED,ECED,ECF0,D7E6,ECF3,ECF1,ECEE,ECEF,D7A3,C9F1,CBEE,ECF4,ECF2,CFE9,ECF6,C6B1,BCC0,ECF5,B5BB,BBF6,ECF7,D9F7,BDFB,C2BB,ECF8,ECF9,B8A3,ECFA,ECFB,ECFC,D3ED,D8AE,C0EB,C7DD,BACC,D0E3,CBBD,CDBA,B8D1,B1FC,C7EF,D6D6,BFC6,C3EB,EFF5,C3D8,D7E2,EFF7,B3D3,C7D8,D1ED,D6C8,EFF8,EFF6,BBFD,B3C6,BDD5,D2C6,BBE0,CFA1,EFFC,EFFB,EFF9,B3CC,C9D4,CBB0,EFFE,B0DE,D6C9,EFFD,B3ED,F6D5,CEC8,F0A2,F0A1,B5BE,BCDA,BBFC,B8E5,C4C2,F0A3,CBEB,F0A6,D1A8,BEBF,C7EE,F1B6,F1B7,BFD5,B4A9,F1B8,CDBB,C7D4,D5AD,F1B9,F1BA,C7CF,D2A4,D6CF,F1BB,BDD1,B4B0,BEBD,B4DC,CED1,BFDF,F1BD,BFFA,F1BC,F1BF,F1BE,F1C0,F1C1,C1FE,C1A2,CAFA,D5BE,BEBA,BEB9,D5C2,BFA2,CDAF,F1B5,BDDF,B6CB,D6F1,F3C3,F3C4,B8CD,F3C6,F3C7,B0CA,F3C5,F3C9,CBF1,F3CB,D0A6,B1CA,F3C8,F3CF,B5D1,F3D7,F3D2,F3D4,F3D3,B7FB,B1BF,F3CE,F3CA,B5DA,F3D0,F3D1,F3D5,F3CD,BCE3,C1FD,F3D6,F3DA,F3CC,B5C8,BDEE,F3DC,B7A4,BFF0,D6FE,CDB2,B4F0,B2DF,F3D8,F3D9,C9B8,F3DD,F3DE,F3E1,F3DF,F3E3,F3E2,F3DB,BFEA,B3EF,F3E0,C7A9,BCF2,F3EB,B9BF,F3E4,B2AD,BBFE,CBE3,F3ED,F3E9,B9DC,F3EE,F3E5,F3E6,F3EA,C2E1,F3EC,F3EF,F3E8,BCFD,CFE4,F3F0,F3E7,F3F2,D7AD,C6AA,F3F3,F3F1,C2A8,B8DD,F3F5,F3F4,B4DB,F3F6,F3F7,F3F8,C0BA,C0E9,C5F1,F3FB,F3FA,B4D8,F3FE,F3F9,F3FC,F3FD,F4A1,F4A3,BBC9,F4A2,F4A4,B2BE,F4A6,F4A5,BCAE,C3D7,D9E1,C0E0,F4CC,D7D1,B7DB,F4CE,C1A3,C6C9,B4D6,D5B3,F4D0,F4CF,F4D1,CBDA,F4D2,D4C1,D6E0,B7E0,C1B8,C1BB,F4D3,BEAC,B4E2,F4D4,F4D5,BEAB,F4D6,F4DB,F4D7,F4DA,BAFD,F4D8,F4D9,B8E2,CCC7,F4DC,B2DA,C3D3,D4E3,BFB7,F4DD,C5B4,F4E9,CFB5,CEC9,CBD8,CBF7,BDF4,D7CF,C0DB,D0F5,F4EA,F4EB,F4EC,F7E3,B7B1,F4ED,D7EB,F4EE,E6F9,BEC0,E6FA,BAEC,E6FB,CFCB,E6FC,D4BC,BCB6,E6FD,E6FE,BCCD,C8D2,CEB3,E7A1,B4BF,E7A2,C9B4,B8D9,C4C9,D7DD,C2DA,B7D7,D6BD,CEC6,B7C4,C5A6,E7A3,CFDF,E7A4,E7A5,E7A6,C1B7,D7E9,C9F0,CFB8,D6AF,D6D5,E7A7,B0ED,E7A8,E7A9,C9DC,D2EF,BEAD,E7AA,B0F3,C8DE,BDE1,E7AB,C8C6,E7AC,BBE6,B8F8,D1A4,E7AD,C2E7,BEF8,BDCA,CDB3,E7AE,E7AF,BEEE,D0E5,CBE7,CCD0,BCCC,E7B0,BCA8,D0F7,E7B1,D0F8,E7B2,E7B3,B4C2,E7B4,E7B5,C9FE,CEAC,C3E0,E7B7,B1C1,B3F1,E7B8,E7B9,D7DB,D5C0,E7BA,C2CC,D7BA,E7BB,E7BC,E7BD,BCEA,C3E5,C0C2,E7BE,E7BF,BCA9,E7C0,E7C1,E7B6,B6D0,E7C2,E7C3,E7C4,BBBA,B5DE,C2C6,B1E0,E7C5,D4B5,E7C6,B8BF,E7C8,E7C7,B7EC,E7C9,B2F8,E7CA,E7CB,E7CC,E7CD,E7CE,E7CF,E7D0,D3A7,CBF5,E7D1,E7D2,E7D3,E7D4,C9C9,E7D5,E7D6,E7D7,E7D8,E7D9,BDC9,E7DA,F3BE,B8D7,C8B1,F3BF,F3C0,F3C1,B9DE,CDF8,D8E8,BAB1,C2DE,EEB7,B7A3,EEB9,EEB8,B0D5,EEBB,D5D6,D7EF,D6C3,EEBD,CAF0,EEBC,EEBE,EEC0,EEBF,D1F2,C7BC,C3C0,B8E1,C1E7,F4C6,D0DF,F4C7,CFDB,C8BA,F4C8,F4C9,F4CA,F4CB,D9FA,B8FE,E5F1,D3F0,F4E0,CECC,B3E1,F1B4,D2EE,F4E1,CFE8,F4E2,C7CC,B5D4,B4E4,F4E4,F4E3,F4E5,F4E6,F4E7,BAB2,B0BF,F4E8,B7AD,D2ED,D2AB,C0CF,BFBC,EBA3,D5DF,EAC8,F1F3,B6F8,CBA3,C4CD,F1E7,F1E8,B8FB,F1E9,BAC4,D4C5,B0D2,F1EA,F1EB,F1EC,F1ED,F1EE,F1EF,F1F1,F1F0,C5D5,F1F2,B6FA,F1F4,D2AE,DEC7,CBCA,B3DC,B5A2,B9A2,C4F4,F1F5,F1F6,C1C4,C1FB,D6B0,F1F7,F1F8,C1AA,C6B8,BEDB,F1F9,B4CF,F1FA,EDB2,EDB1,CBE0,D2DE,CBC1,D5D8,C8E2,C0DF,BCA1,EBC1,D0A4,D6E2,B6C7,B8D8,EBC0,B8CE,EBBF,B3A6,B9C9,D6AB,B7F4,B7CA,BCE7,B7BE,EBC6,EBC7,B0B9,BFCF,EBC5,D3FD,EBC8,EBC9,B7CE,EBC2,EBC4,C9F6,D6D7,D5CD,D0B2,EBCF,CEB8,EBD0,B5A8,B1B3,EBD2,CCA5,C5D6,EBD3,EBD1,C5DF,EBCE,CAA4,EBD5,B0FB,BAFA,D8B7,F1E3,EBCA,EBCB,EBCC,EBCD,EBD6,E6C0,EBD9,BFE8,D2C8,EBD7,EBDC,B8EC,EBD8,BDBA,D0D8,B0B7,EBDD,C4DC,D6AC,B4E0,C2F6,BCB9,EBDA,EBDB,D4E0,C6EA,C4D4,EBDF,C5A7,D9F5,B2B1,EBE4,BDC5,EBE2,EBE3,B8AC,CDD1,EBE5,EBE1,C1B3,C6A2,CCF3,EBE6,C0B0,D2B8,EBE7,B8AF,B8AD,EBE8,C7BB,CDF3,EBEA,EBEB,EBED,D0C8,EBF2,EBEE,EBF1,C8F9,D1FC,EBEC,EBE9,B8B9,CFD9,C4E5,EBEF,EBF0,CCDA,CDC8,B0F2,EBF6,EBF5,B2B2,B8E0,EBF7,B1EC,CCC5,C4A4,CFA5,EBF9,ECA2,C5F2,EBFA,C9C5,E2DF,EBFE,CDCE,ECA1,B1DB,D3B7,D2DC,EBFD,EBFB,B3BC,EAB0,D7D4,F4AB,B3F4,D6C1,D6C2,D5E9,BECA,F4A7,D2A8,F4A8,F4A9,F4AA,BECB,D3DF,C9E0,C9E1,F3C2,CAE6,CCF2,E2B6,CBB4,CEE8,D6DB,F4AD,F4AE,F4AF,F4B2,BABD,F4B3,B0E3,F4B0,F4B1,BDA2,B2D5,F4B6,F4B7,B6E6,B2B0,CFCF,F4B4,B4AC,F4B5,F4B8,F4B9,CDA7,F4BA,F4BB,F4BC,CBD2,F4BD,F4BE,F4BF,F4DE,C1BC,BCE8,C9AB,D1DE,E5F5,DCB3,D2D5,DCB4,B0AC,DCB5,BDDA,DCB9,D8C2,DCB7,D3F3,C9D6,DCBA,DCB6,DCBB,C3A2,DCBC,DCC5,DCBD,CEDF,D6A5,DCCF,DCCD,DCD2,BDE6,C2AB,DCB8,DCCB,DCCE,DCBE,B7D2,B0C5,DCC7,D0BE,DCC1,BBA8,B7BC,DCCC,DCC6,DCBF,C7DB,D1BF,DCC0,DCCA,DCD0,CEAD,DCC2,DCC3,DCC8,DCC9,B2D4,DCD1,CBD5,D4B7,DCDB,DCDF,CCA6,DCE6,C3E7,DCDC,BFC1,DCD9,B0FA,B9B6,DCE5,DCD3,DCC4,DCD6,C8F4,BFE0,C9BB,B1BD,D3A2,DCDA,DCD5,C6BB,DCDE,D7C2,C3AF,B7B6,C7D1,C3A9,DCE2,DCD8,DCEB,DCD4,DCDD,BEA5,DCD7,DCE0,DCE3,DCE4,DCF8,DCE1,DDA2,DCE7,BCEB,B4C4,C3A3,B2E7,DCFA,DCF2,DCEF,DCFC,DCEE,D2F0,B2E8,C8D7,C8E3,DCFB,DCED,DCF7,DCF5,BEA3,DCF4,B2DD,DCF3,BCF6,DCE8,BBC4,C0F3,BCD4,DCE9,DCEA,DCF1,DCF6,DCF9,B5B4,C8D9,BBE7,DCFE,DCFD,D3AB,DDA1,DDA3,DDA5,D2F1,DDA4,DDA6,DDA7,D2A9,BAC9,DDA9,DDB6,DDB1,DDB4,DDB0,C6CE,C0F2,C9AF,DCEC,DDAE,DDB7,DCF0,DDAF,DDB8,DDAC,DDB9,DDB3,DDAD,C4AA,DDA8,C0B3,C1AB,DDAA,DDAB,DDB2,BBF1,DDB5,D3A8,DDBA,DDBB,C3A7,DDD2,DDBC,DDD1,B9BD,BED5,BEFA,BACA,DDCA,DDC5,DDBF,B2CB,DDC3,DDCB,B2A4,DDD5,DDBE,C6D0,DDD0,DDD4,C1E2,B7C6,DDCE,DDCF,DDC4,DDBD,DDCD,CCD1,DDC9,DDC2,C3C8,C6BC,CEAE,DDCC,DDC8,DDC1,DDC6,C2DC,D3A9,D3AA,DDD3,CFF4,C8F8,DDE6,DDC7,DDE0,C2E4,DDE1,DDD7,D6F8,DDD9,DDD8,B8F0,DDD6,C6CF,B6AD,DDE2,BAF9,D4E1,DDE7,B4D0,DDDA,BFFB,DDE3,DDDF,DDDD,B5D9,DDDB,DDDC,DDDE,BDAF,DDE4,DDE5,DDF5,C3C9,CBE2,DDF2,D8E1,C6D1,DDF4,D5F4,DDF3,DDF0,DDEC,DDEF,DDE8,D0EE,C8D8,DDEE,DDE9,DDEA,CBF2,DDED,B1CD,C0B6,BCBB,DDF1,DDF7,DDF6,DDEB,C5EE,DDFB,DEA4,DEA3,DDF8,C3EF,C2FB,D5E1,CEB5,DDFD,B2CC,C4E8,CADF,C7BE,DDFA,DDFC,DDFE,DEA2,B0AA,B1CE,DEAC,DEA6,BDB6,C8EF,DEA1,DEA5,DEA9,DEA8,DEA7,DEAD,D4CC,DEB3,DEAA,DEAE,C0D9,B1A1,DEB6,DEB1,DEB2,D1A6,DEB5,DEAF,DEB0,D0BD,DEB4,CAED,DEB9,DEB8,DEB7,DEBB,BDE5,B2D8,C3EA,DEBA,C5BA,DEBC,CCD9,B7AA,D4E5,DEBD,DEBF,C4A2,DEC1,DEBE,DEC0,D5BA,DEC2,F2AE,BBA2,C2B2,C5B0,C2C7,F2AF,D0E9,D3DD,EBBD,B3E6,F2B0,F2B1,CAAD,BAE7,F2B3,F2B5,F2B4,CBE4,CFBA,F2B2,CAB4,D2CF,C2EC,CEC3,F2B8,B0F6,F2B7,F2BE,B2CF,D1C1,F2BA,F2BC,D4E9,F2BB,F2B6,F2BF,F2BD,F2B9,F2C7,F2C4,F2C6,F2CA,F2C2,F2C0,F2C5,D6FB,F2C1,C7F9,C9DF,F2C8,B9C6,B5B0,F2C3,F2C9,F2D0,F2D6,BBD7,F2D5,CDDC,D6EB,F2D2,F2D4,B8F2,F2CB,F2CE,C2F9,D5DD,F2CC,F2CD,F2CF,F2D3,F2D9,D3BC,B6EA,CAF1,B7E4,F2D7,F2D8,F2DA,F2DD,F2DB,F2DC,D1D1,F2D1,CDC9,CECF,D6A9,F2E3,C3DB,F2E0,C0AF,F2EC,F2DE,F2E1,F2E8,F2E2,F2E7,F2E6,F2E9,F2DF,F2E4,F2EA,D3AC,F2E5,B2F5,F2F2,D0AB,F2F5,BBC8,F2F9,F2F0,F2F6,F2F8,F2FA,F2F3,F2F1,BAFB,B5FB,F2EF,F2F7,F2ED,F2EE,F2EB,F3A6,F3A3,F3A2,F2F4,C8DA,F2FB,F3A5,C3F8,F2FD,F3A7,F3A9,F3A4,F2FC,F3AB,F3AA,C2DD,F3AE,F3B0,F3A1,F3B1,F3AC,F3AF,F2FE,F3AD,F3B2,F3B4,F3A8,F3B3,F3B5,D0B7,F3B8,D9F9,F3B9,F3B7,C8E4,F3B6,F3BA,F3BB,B4C0,EEC3,F3BC,F3BD,D1AA,F4AC,D0C6,D0D0,D1DC,CFCE,BDD6,D1C3,BAE2,E1E9,D2C2,F1C2,B2B9,B1ED,F1C3,C9C0,B3C4,D9F2,CBA5,F1C4,D6D4,F1C5,F4C0,F1C6,D4AC,F1C7,B0C0,F4C1,F4C2,B4FC,C5DB,CCBB,D0E4,CDE0,F1C8,D9F3,B1BB,CFAE,B8A4,F1CA,F1CB,B2C3,C1D1,D7B0,F1C9,F1CC,F1CE,D9F6,D2E1,D4A3,F4C3,C8B9,F4C4,F1CD,F1CF,BFE3,F1D0,F1D4,F1D6,F1D1,C9D1,C5E1,C2E3,B9FC,F1D3,F1D5,B9D3,F1DB,BAD6,B0FD,F1D9,F1D8,F1D2,F1DA,F1D7,C8EC,CDCA,F1DD,E5BD,F1DC,F1DE,F1DF,CFE5,F4C5,BDF3,F1E0,F1E1,CEF7,D2AA,F1FB,B8B2,BCFB,B9DB,B9E6,C3D9,CAD3,EAE8,C0C0,BEF5,EAE9,EAEA,EAEB,EAEC,EAED,EAEE,EAEF,BDC7,F5FB,F5FD,F5FE,F5FC,BDE2,F6A1,B4A5,F6A2,F6A3,ECB2,D1D4,D9EA,F6A4,EEBA,D5B2,D3FE,CCDC,CAC4,E5C0,F6A5,BEAF,C6A9,DAA5,BCC6,B6A9,B8BC,C8CF,BCA5,DAA6,DAA7,CCD6,C8C3,DAA8,C6FD,D1B5,D2E9,D1B6,BCC7,BDB2,BBE4,DAA9,DAAA,D1C8,DAAB,D0ED,B6EF,C2DB,CBCF,B7ED,C9E8,B7C3,BEF7,D6A4,DAAC,DAAD,C6C0,D7E7,CAB6,D5A9,CBDF,D5EF,DAAE,D6DF,B4CA,DAB0,DAAF,D2EB,DAB1,DAB2,DAB3,CAD4,DAB4,CAAB,DAB5,DAB6,B3CF,D6EF,DAB7,BBB0,B5AE,DAB8,DAB9,B9EE,D1AF,D2E8,DABA,B8C3,CFEA,B2EF,DABB,DABC,BDEB,CEDC,D3EF,DABD,CEF3,DABE,D3D5,BBE5,DABF,CBB5,CBD0,DAC0,C7EB,D6EE,DAC1,C5B5,B6C1,DAC2,B7CC,BFCE,DAC3,DAC4,CBAD,DAC5,B5F7,DAC6,C1C2,D7BB,DAC7,CCB8,D2EA,C4B1,DAC8,B5FD,BBD1,DAC9,D0B3,DACA,DACB,CEBD,DACC,DACD,DACE,B2F7,DAD1,DACF,D1E8,DAD0,C3D5,DAD2,DAD3,DAD4,DAD5,D0BB,D2A5,B0F9,DAD6,C7AB,DAD7,BDF7,C3A1,DAD8,DAD9,C3FD,CCB7,DADA,DADB,C0BE,C6D7,DADC,DADD,C7B4,DADE,DADF,B9C8,BBED,B6B9,F4F8,F4F9,CDE3,F5B9,EBE0,CFF3,BBBF,BAC0,D4A5,E1D9,F5F4,B1AA,B2F2,F5F5,F5F7,BAD1,F5F6,C3B2,F5F9,F5F8,B1B4,D5EA,B8BA,B9B1,B2C6,D4F0,CFCD,B0DC,D5CB,BBF5,D6CA,B7B7,CCB0,C6B6,B1E1,B9BA,D6FC,B9E1,B7A1,BCFA,EADA,EADB,CCF9,B9F3,EADC,B4FB,C3B3,B7D1,BAD8,EADD,D4F4,EADE,BCD6,BBDF,EADF,C1DE,C2B8,D4DF,D7CA,EAE0,EAE1,EAE4,EAE2,EAE3,C9DE,B8B3,B6C4,EAE5,CAEA,C9CD,B4CD,E2D9,C5E2,EAE6,C0B5,D7B8,EAE7,D7AC,C8FC,D8D3,D8CD,D4DE,D4F9,C9C4,D3AE,B8D3,B3E0,C9E2,F4F6,BAD5,F4F7,D7DF,F4F1,B8B0,D5D4,B8CF,C6F0,B3C3,F4F2,B3AC,D4BD,C7F7,F4F4,F4F3,CCCB,C8A4,F4F5,D7E3,C5BF,F5C0,F5BB,F5C3,F5C2,D6BA,F5C1,D4BE,F5C4,F5CC,B0CF,B5F8,F5C9,F5CA,C5DC,F5C5,F5C6,F5C7,F5CB,BEE0,F5C8,B8FA,F5D0,F5D3,BFE7,B9F2,F5BC,F5CD,C2B7,CCF8,BCF9,F5CE,F5CF,F5D1,B6E5,F5D2,F5D5,F5BD,F5D4,D3BB,B3EC,CCA4,F5D6,F5D7,BEE1,F5D8,CCDF,F5DB,B2C8,D7D9,F5D9,F5DA,F5DC,F5E2,F5E0,F5DF,F5DD,F5E1,F5DE,F5E4,F5E5,CCE3,E5BF,B5B8,F5E3,F5E8,CCA3,F5E6,F5E7,F5BE,B1C4,F5BF,B5C5,B2E4,F5EC,F5E9,B6D7,F5ED,F5EA,F5EB,B4DA,D4EA,F5EE,B3F9,F5EF,F5F1,F5F0,F5F2,F5F3,C9ED,B9AA,C7FB,B6E3,CCC9,EAA6,B3B5,D4FE,B9EC,D0F9,E9ED,D7AA,E9EE,C2D6,C8ED,BAE4,E9EF,E9F0,E9F1,D6E1,E9F2,E9F3,E9F5,E9F4,E9F6,E9F7,C7E1,E9F8,D4D8,E9F9,BDCE,E9FA,E9FB,BDCF,E9FC,B8A8,C1BE,E9FD,B1B2,BBD4,B9F5,E9FE,EAA1,EAA2,EAA3,B7F8,BCAD,CAE4,E0CE,D4AF,CFBD,D5B7,EAA4,D5DE,EAA5,D0C1,B9BC,B4C7,B1D9,C0B1,B1E6,B1E7,B1E8,B3BD,C8E8,E5C1,B1DF,C1C9,B4EF,C7A8,D3D8,C6F9,D1B8,B9FD,C2F5,D3AD,D4CB,BDFC,E5C2,B7B5,E5C3,BBB9,D5E2,BDF8,D4B6,CEA5,C1AC,B3D9,CCF6,E5C6,E5C4,E5C8,E5CA,E5C7,B5CF,C6C8,B5FC,E5C5,CAF6,E5C9,C3D4,B1C5,BCA3,D7B7,CDCB,CBCD,CACA,CCD3,E5CC,E5CB,C4E6,D1A1,D1B7,E5CD,E5D0,CDB8,D6F0,E5CF,B5DD,CDBE,E5D1,B6BA,CDA8,B9E4,CAC5,B3D1,CBD9,D4EC,E5D2,B7EA,E5CE,E5D5,B4FE,E5D6,E5D3,E5D4,D2DD,C2DF,B1C6,D3E2,B6DD,CBEC,E5D7,D3F6,B1E9,B6F4,E5DA,E5D8,E5D9,B5C0,D2C5,E5DC,E5DE,E5DD,C7B2,D2A3,E5DB,D4E2,D5DA,E5E0,D7F1,E5E1,B1DC,D1FB,E5E2,E5E4,E5E3,E5E5,D2D8,B5CB,E7DF,DAF5,DAF8,DAF6,DAF7,DAFA,D0CF,C4C7,B0EE,D0B0,DAF9,D3CA,BAAA,DBA2,C7F1,DAFC,DAFB,C9DB,DAFD,DBA1,D7DE,DAFE,C1DA,DBA5,D3F4,DBA7,DBA4,DBA8,BDBC,C0C9,DBA3,DBA6,D6A3,DBA9,DBAD,DBAE,DBAC,BAC2,BFA4,DBAB,DBAA,D4C7,B2BF,DBAF,B9F9,DBB0,B3BB,B5A6,B6BC,DBB1,B6F5,DBB2,B1C9,DBB4,DBB3,DBB5,DBB7,DBB6,DBB8,DBB9,DBBA,D3CF,F4FA,C7F5,D7C3,C5E4,F4FC,F4FD,F4FB,BEC6,D0EF,B7D3,D4CD,CCAA,F5A2,F5A1,BAA8,F4FE,CBD6,F5A4,C0D2,B3EA,CDAA,F5A5,F5A3,BDB4,F5A8,F5A9,BDCD,C3B8,BFE1,CBE1,F5AA,F5A6,F5A7,C4F0,F5AC,B4BC,D7ED,B4D7,F5AB,F5AE,F5AD,F5AF,D0D1,C3D1,C8A9,F5B0,F5B1,F5B2,F5B3,F5B4,F5B5,F5B7,F5B6,F5B8,B2C9,D3D4,CACD,C0EF,D6D8,D2B0,C1BF,BDF0,B8AA,BCF8,F6C6,F6C7,F6C8,F6C9,F6CA,F6CC,F6CB,F7E9,F6CD,F6CE,EEC4,EEC5,EEC6,D5EB,B6A4,EEC8,EEC7,EEC9,EECA,C7A5,EECB,EECC,B7B0,B5F6,EECD,EECF,EECE,B8C6,EED0,EED1,EED2,B6DB,B3AE,D6D3,C4C6,B1B5,B8D6,EED3,EED4,D4BF,C7D5,BEFB,CED9,B9B3,EED6,EED5,EED8,EED7,C5A5,EED9,EEDA,C7AE,EEDB,C7AF,EEDC,B2A7,EEDD,EEDE,EEDF,EEE0,EEE1,D7EA,EEE2,EEE3,BCD8,EEE4,D3CB,CCFA,B2AC,C1E5,EEE5,C7A6,C3AD,EEE6,EEE7,EEE8,EEE9,EEEA,EEEB,EEEC,EEED,EEEE,EEEF,EEF0,EEF1,EEF2,EEF4,EEF3,EEF5,CDAD,C2C1,EEF6,EEF7,EEF8,D5A1,EEF9,CFB3,EEFA,EEFB,EEFC,EEFD,EFA1,EEFE,EFA2,B8F5,C3FA,EFA3,EFA4,BDC2,D2BF,B2F9,EFA5,EFA6,EFA7,D2F8,EFA8,D6FD,EFA9,C6CC,EFAA,EFAB,C1B4,EFAC,CFFA,CBF8,EFAE,EFAD,B3FA,B9F8,EFAF,EFB0,D0E2,EFB1,EFB2,B7E6,D0BF,EFB3,EFB4,EFB5,C8F1,CCE0,EFB6,EFB7,EFB8,EFB9,EFBA,D5E0,EFBB,B4ED,C3AA,EFBC,EFBD,EFBE,EFBF,CEFD,EFC0,C2E0,B4B8,D7B6,BDF5,CFC7,EFC3,EFC1,EFC2,EFC4,B6A7,BCFC,BEE2,C3CC,EFC5,EFC6,EFC7,EFCF,EFC8,EFC9,EFCA,C7C2,EFF1,B6CD,EFCB,EFCC,EFCD,B6C6,C3BE,EFCE,EFD0,EFD1,EFD2,D5F2,EFD3,C4F7,EFD4,C4F8,EFD5,EFD6,B8E4,B0F7,EFD7,EFD8,EFD9,EFDA,EFDB,EFDC,EFDD,EFDE,BEB5,EFE1,EFDF,EFE0,EFE2,EFE3,C1CD,EFE4,EFE5,EFE6,EFE7,EFE8,EFE9,EFEA,EFEB,EFEC,C0D8,EFED,C1AD,EFEE,EFEF,EFF0,CFE2,B3A4,C3C5,E3C5,C9C1,E3C6,B1D5,CECA,B4B3,C8F2,E3C7,CFD0,E3C8,BCE4,E3C9,E3CA,C3C6,D5A2,C4D6,B9EB,CEC5,E3CB,C3F6,E3CC,B7A7,B8F3,BAD2,E3CD,E3CE,D4C4,E3CF,E3D0,D1CB,E3D1,E3D2,E3D3,E3D4,D1D6,E3D5,B2FB,C0BB,E3D6,C0AB,E3D7,E3D8,E3D9,E3DA,E3DB,B8B7,DAE2,B6D3,DAE4,DAE3,DAE6,C8EE,DAE5,B7C0,D1F4,D2F5,D5F3,BDD7,D7E8,DAE8,DAE7,B0A2,CDD3,DAE9,B8BD,BCCA,C2BD,C2A4,B3C2,DAEA,C2AA,C4B0,BDB5,CFDE,DAEB,C9C2,B1DD,DAEC,B6B8,D4BA,B3FD,DAED,D4C9,CFD5,C5E3,DAEE,DAEF,DAF0,C1EA,CCD5,CFDD,D3E7,C2A1,DAF1,CBE5,DAF2,CBE6,D2FE,B8F4,DAF3,B0AF,CFB6,D5CF,CBED,DAF4,E3C4,C1A5,F6BF,F6C0,F6C1,C4D1,C8B8,D1E3,D0DB,D1C5,BCAF,B9CD,EFF4,B4C6,D3BA,F6C2,B3FB,F6C3,B5F1,F6C5,D3EA,F6A7,D1A9,F6A9,F6A8,C1E3,C0D7,B1A2,CEED,D0E8,F6AB,CFF6,F6AA,D5F0,F6AC,C3B9,BBF4,F6AE,F6AD,C4DE,C1D8,CBAA,CFBC,F6AF,F6B0,F6B1,C2B6,B0D4,C5F9,F6B2,C7E0,F6A6,BEB8,BEB2,B5E5,B7C7,BFBF,C3D2,C3E6,D8CC,B8EF,BDF9,D1A5,B0D0,F7B0,F7B1,D0AC,B0B0,F7B2,F7B3,F7B4,C7CA,BECF,F7B7,F7B6,B1DE,F7B5,F7B8,F7B9,CEA4,C8CD,BAAB,E8B8,E8B9,E8BA,BEC2,D2F4,D4CF,C9D8,D2B3,B6A5,C7EA,F1FC,CFEE,CBB3,D0EB,E7EF,CDE7,B9CB,B6D9,F1FD,B0E4,CBCC,F1FE,D4A4,C2AD,C1EC,C6C4,BEB1,F2A1,BCD5,F2A2,F2A3,F2A4,D2C3,C6B5,CDC7,F2A5,D3B1,BFC5,CCE2,F2A6,F2A7,D1D5,B6EE,F2A8,F2A9,B5DF,F2AA,F2AB,B2FC,F2AC,F2AD,C8A7,B7E7,ECA9,ECAA,ECAB,ECAC,C6AE,ECAD,ECAE,B7C9,CAB3,E2B8,F7CF,F7D0,B2CD,F7D1,F7D3,F7D2,E2BB,BCA2,E2BC,E2BD,E2BE,E2BF,E2C0,E2C1,B7B9,D2FB,BDA4,CACE,B1A5,CBC7,E2C2,B6FC,C8C4,E2C3,BDC8,B1FD,E2C4,B6F6,E2C5,C4D9,E2C6,CFDA,B9DD,E2C7,C0A1,E2C8,B2F6,E2C9,C1F3,E2CA,E2CB,C2F8,E2CC,E2CD,E2CE,CAD7,D8B8,D9E5,CFE3,F0A5,DCB0,C2ED,D4A6,CDD4,D1B1,B3DB,C7FD,B2B5,C2BF,E6E0,CABB,E6E1,E6E2,BED4,E6E3,D7A4,CDD5,E6E5,BCDD,E6E4,E6E6,E6E7,C2EE,BDBE,E6E8,C2E6,BAA7,E6E9,E6EA,B3D2,D1E9,BFA5,E6EB,C6EF,E6EC,E6ED,E6EE,C6AD,E6EF,C9A7,E6F0,E6F1,E6F2,E5B9,E6F3,E6F4,C2E2,E6F5,E6F6,D6E8,E6F7,E6F8,B9C7,F7BB,F7BA,F7BE,F7BC,BAA1,F7BF,F7C0,F7C2,F7C1,F7C4,F7C3,F7C5,F7C6,F7C7,CBE8,B8DF,F7D4,F7D5,F7D6,F7D8,F7DA,F7D7,F7DB,F7D9,D7D7,F7DC,F7DD,F7DE,F7DF,F7E0,DBCB,D8AA,E5F7,B9ED,BFFD,BBEA,F7C9,C6C7,F7C8,F7CA,F7CC,F7CB,F7CD,CEBA,F7CE,C4A7,D3E3,F6CF,C2B3,F6D0,F6D1,F6D2,F6D3,F6D4,F6D6,B1AB,F6D7,F6D8,F6D9,F6DA,F6DB,F6DC,F6DD,F6DE,CFCA,F6DF,F6E0,F6E1,F6E2,F6E3,F6E4,C0F0,F6E5,F6E6,F6E7,F6E8,F6E9,F6EA,F6EB,F6EC,F6ED,F6EE,F6EF,F6F0,F6F1,F6F2,F6F3,F6F4,BEA8,F6F5,F6F6,F6F7,F6F8,C8FA,F6F9,F6FA,F6FB,F6FC,F6FD,F6FE,F7A1,F7A2,F7A3,F7A4,F7A5,F7A6,F7A7,F7A8,B1EE,F7A9,F7AA,F7AB,F7AC,F7AD,C1DB,F7AE,F7AF,C4F1,F0AF,BCA6,F0B0,C3F9,C5B8,D1BB,F0B1,F0B2,F0B3,F0B4,F0B5,D1BC,D1EC,F0B7,F0B6,D4A7,CDD2,F0B8,F0BA,F0B9,F0BB,F0BC,B8EB,F0BD,BAE8,F0BE,F0BF,BEE9,F0C0,B6EC,F0C1,F0C2,F0C3,F0C4,C8B5,F0C5,F0C6,F0C7,C5F4,F0C8,F0C9,F0CA,F7BD,F0CB,F0CC,F0CD,F0CE,F0CF,BAD7,F0D0,F0D1,F0D2,F0D3,F0D4,F0D5,F0D6,F0D8,D3A5,F0D7,F0D9,F5BA,C2B9,F7E4,F7E5,F7E6,F7E7,F7E8,C2B4,F7EA,F7EB,C2F3,F4F0,F4EF,C2E9,F7E1,F7E2,BBC6,D9E4,CAF2,C0E8,F0A4,BADA,C7AD,C4AC,F7EC,F7ED,F7EE,F7F0,F7EF,F7F1,F7F4,F7F3,F7F2,F7F5,F7F6,EDE9,EDEA,EDEB,F6BC,F6BD,F6BE,B6A6,D8BE,B9C4,D8BB,DCB1,CAF3,F7F7,F7F8,F7F9,F7FB,F7FA,B1C7,F7FC,F7FD,F7FE,C6EB,ECB4,B3DD,F6B3,F6B4,C1E4,F6B5,F6B6,F6B7,F6B8,F6B9,F6BA,C8A3,F6BB,C1FA,B9A8,EDE8,B9EA,D9DF,A3A1,A3A2,A3A3,A1E7,A3A5,A3A6,A3A7,A3A8,A3A9,A3AA,A3AB,A3AC,A3AD,A3AE,A3AF,A3B0,A3B1,A3B2,A3B3,A3B4,A3B5,A3B6,A3B7,A3B8,A3B9,A3BA,A3BB,A3BC,A3BD,A3BE,A3BF,A3C0,A3C1,A3C2,A3C3,A3C4,A3C5,A3C6,A3C7,A3C8,A3C9,A3CA,A3CB,A3CC,A3CD,A3CE,A3CF,A3D0,A3D1,A3D2,A3D3,A3D4,A3D5,A3D6,A3D7,A3D8,A3D9,A3DA,A3DB,A3DC,A3DD,A3DE,A3DF,A3E0,A3E1,A3E2,A3E3,A3E4,A3E5,A3E6,A3E7,A3E8,A3E9,A3EA,A3EB,A3EC,A3ED,A3EE,A3EF,A3F0,A3F1,A3F2,A3F3,A3F4,A3F5,A3F6,A3F7,A3F8,A3F9,A3FA,A3FB,A3FC,A3FD,A1AB,A1E9,A1EA,A3FE,A3A4';
//    },
//
//    AnsiToUnicode: function (chrCode) {
//        var chrHex = chrCode.toString(16);
//        chrHex = "000" + chrHex.toUpperCase();
//        chrHex = chrHex.substr(chrHex.length - 4);
//        var i = this.AnsicodeChr().indexOf(chrHex);
//        if (i != -1) {
//            chrHex = this.UnicodeChr().substr(i, 4);
//        }
//        return parseInt(chrHex, 16);
//    },
//
//    UnicodeToAnsi: function (chrCode) {
//        var chrHex = chrCode.toString(16);
//        chrHex = "000" + chrHex.toUpperCase();
//        chrHex = chrHex.substr(chrHex.length - 4);
//        var i = this.UnicodeChr().indexOf(chrHex);
//        if (i != -1) {
//            chrHex = this.AnsicodeChr().substr(i, 4);
//        }
//        return parseInt(chrHex, 16);
//    },
//
//    getPY: function (ch) {
//        if (ch != '') {
//            var code = this.UnicodeToAnsi(ch.charCodeAt(0));
//            var py = '';
//            if (code >= 45217 && code <= 45252) {
//                py = "A";
//            } else if (code >= 45253 && code <= 45760) {
//                py = "B";
//            } else if (code >= 45761 && code <= 46317) {
//                py = "C";
//            } else if (code >= 46318 && code <= 46825) {
//                py = "D";
//            } else if (code >= 46826 && code <= 47009) {
//                py = "E";
//            } else if (code >= 47010 && code <= 47296) {
//                py = "F";
//            } else if ((code >= 47297 && code <= 47613) || (code == 63193)) {
//                py = "G";
//            } else if (code >= 47614 && code <= 48118) {
//                py = "H";
//            } else if (code >= 48119 && code <= 49061) {
//                py = "J";
//            } else if (code >= 49062 && code <= 49323) {
//                py = "K";
//            } else if (code >= 49324 && code <= 49895) {
//                py = "L";
//            } else if (code >= 49896 && code <= 50370) {
//                py = "M";
//            } else if (code >= 50371 && code <= 50613) {
//                py = "N";
//            } else if (code >= 50614 && code <= 50621) {
//                py = "O";
//            } else if (code >= 50622 && code <= 50905) {
//                py = "P";
//            } else if (code >= 50906 && code <= 51386) {
//                py = "Q";
//            } else if (code >= 51387 && code <= 51445) {
//                py = "R";
//            } else if (code >= 51446 && code <= 52217) {
//                py = "S";
//            } else if (code >= 52218 && code <= 52697) {
//                py = "T";
//            } else if (code >= 52698 && code <= 52979) {
//                py = "W";
//            } else if (code >= 52980 && code <= 53688) {
//                py = "X";
//            } else if (code >= 53689 && code <= 54480) {
//                py = "Y";
//            } else if (code >= 54481 && code <= 62289) {
//                py = "Z";
//            } else {
//                py = ch;
//            }
//            return py;
//        } else {
//            return '';
//        }
//    },
//    getAreaPY: function (hanzi) {
//        if (hanzi == '重庆')
//            return 'C';
//        else if (hanzi == '泸州')
//            return 'L';
//        else if (hanzi == '衢州')
//            return 'Q';
//        else if (hanzi == '溧阳天目湖（常州）')
//            return 'L';
//        else if (hanzi == '泸沽湖')
//            return 'L';
//        else if (hanzi == '阆中（南充）')
//            return 'L';
//        else if (hanzi == '婺源')
//            return 'W';
//        else if (hanzi == '漯河')
//            return 'L';
//        else {
//            return this.getPY(hanzi.substr(0, 1));
//        }
//    },
//
//    buildHotDataHtml: function (dataDiv, index) {
//        if (this.ie6FilterIFrame != null) {
//            Globals.closeIE6Fliter(this.ie6FilterIFrame);
//        }
//        if (this.hotData.length > 0) {
//            var hotDataSb = new StringBuilder();
//            if (this.isHotelStyle && index != 0) {
//                var lastChar = '';
//                var rowCol = -1;
//                for (var i = 0; i < this.hotData[index].CityList.length; i++) {
//                    var m_CityData = decodeURIComponent(this.hotData[index].CityList[i].CityNameCn);
//                    var firstPY = this.getAreaPY(m_CityData);
//                    if (rowCol == 0 && firstPY == lastChar) {
//                        hotDataSb.append("<li class=\"letter\"></li>");
//                    }
//                    if (firstPY != lastChar) {
//                        if (lastChar != '') {
//                            hotDataSb.append("<li class=\"let_line\"/>");
//                        }
//                        lastChar = firstPY;
//                        hotDataSb.append("<li class=\"letter\">" + firstPY + "</li>");
//                        rowCol = 0;
//                    }
//                    hotDataSb.append("<li title=\"" + m_CityData + "\" method=\"liHotData\" data=\"" + index + "|" + i + "\">" + m_CityData + "</li>");
//                    rowCol = (rowCol + 1) % this.colLen;
//                }
//            }
//            else {
//                for (var i = 0; i < this.hotData[index].CityList.length; i++) {
//                    var liclass = (i % 2 == 0) ? "ac_even" : "ac_odd";
//                    var m_CityData = this.lang.toLowerCase() == "cn" ? decodeURIComponent(this.hotData[index].CityList[i].CityNameCn) : this.hotData[index].CityList[i].CityNameEn;
//                    var firstPY = this.getAreaPY(m_CityData);
//                    hotDataSb.append("<li method=\"liHotData\" data=\"" + index + "|" + i + "\"  title=\"" + m_CityData + "\" class=\"" + liclass + " " + (i == 0 ? "ac_over" : "") + "\">" + m_CityData + "</li>");
//                }
//            }
//
//            dataDiv.html(hotDataSb.toString());
//            FunctionExt.defer(this.onOutClick.bindAsEventListener(this), 100);
//        }
//    },
//    buildHtml: function (keyword) {
//        var searchList = this.SearchStation(keyword, 10);
//        this.buildSearchHtml(searchList, keyword);
//    },
//    SearchStation: function (keyword, datalength) {
//        //获取Cache
//        var searStatList = new Array();
//        var num = 0;
//        for (var i = 0; this.StationList != null && i < this.StationList.length; i++) {
//            if (this.IsMatchStation(this.StationList[i], keyword)) {
//                var s = {
//                    "Type": "train",
//                    "ProvinceId": null,
//                    "CityId": "",
//                    "CityCode": "",
//                    "CityNameCn": this.StationList[i].CityNameCn,
//                    "CityNameEn": this.StationList[i].CityNameEn,
//                    "CityNameEnSearch": this.StationList[i].CityNameEnSearch.toLowerCase(),
//                    "CityThreeSign": null,
//                    "CityType": "train",
//                    "OldEnglishName": null
//                };
//                searStatList.push(s);
//                num++;
//            }
//            if (num >= datalength) break;
//        }
//        return searStatList;
//    },
//    IsMatchStation: function (station, keyword) {
//        var isRight = false;
//        keyword = keyword.toLowerCase();
//        //判断是否为汉字
//        var regex = RegExp("[^A-z]", "i");
//        var isChinese = regex.test(keyword);
//        if (isChinese) {
//            isRight = this.isMatchTrain(station.CityNameCn.toLowerCase(), keyword);
//        }
//        else {
//            //判断拼音首字母是否满足
//            var isPys = this.isMatchTrain(station.CityNamePys.toLowerCase(), keyword);
//            //判断拼音字母是否满足
//            var isPy = this.isMatchTrain(station.CityNameEnSearch.toLowerCase(), keyword);
//            if (isPys || isPy) {
//                isRight = true;
//            }
//        }
//        return isRight;
//    },
//    IndexOfNew: function (val, vString, start) {
//        for (var i = start; i < vString.length; i++) {
//            if (vString.substring(i, i + 1) == val) return i;
//        }
//        return -1;
//    },
//    isMatchTrain: function (statInfo, keyword) {
//        var isMatch = true;
//        var pos = -1;
//        for (var h = 0; h < keyword.length; h++) {
//            var tempPos = this.IndexOfNew(keyword.substring(h, h + 1), statInfo, h); //statInfo.indexOf(keyword[h], h);
//            if (tempPos > pos && tempPos <= h) {
//                //statInfo = statInfo.Substring(0, tempPos) + "-" + statInfo.Substring(tempPos + 1, statInfo.Length - 1);
//                pos = tempPos;
//            }
//            else {
//                isMatch = false;
//                break;
//            }
//        }
//        return isMatch;
//    },
//    buildSearchHtml: function (data, keyword) {
//        this.eventElement.attr("CityId", "");
//        this.eventElement.attr("CityThreeSign", "");
//
//        var m_Title = this.lang.toLowerCase() == "cn" ? String.format(this.m_ResultTitleCn, keyword) : String.format(this.m_ResultTitleEn, keyword);
//        this.contentEndRegion = $("#m_contentend");
//        this.contentEndRegion.html("");
//        this.windowElement = $("<div  style=\"display:none; position: absolute; z-index: 2000;\"></div>").appendTo(this.contentEndRegion);
//        this.cityData = data || [];
//        this.selectCity = this.cityData[0];
//        this.eventElement[0]["City"] = this.cityData[0];
//        this.windowElement.html(this.m_Result.eval({
//            ResultTitleHtml: m_Title,
//            ResultDataHtml: ""
//        }));
//
//        if (this.ie6FilterIFrame != null) {
//            Globals.closeIE6Fliter(this.ie6FilterIFrame);
//        }
//        var ulCity = this.windowElement.find("ul[method='cityData']");
//        for (var i = 0; i < this.cityData.length; i++) {
//            var m_CityData = this.lang.toLowerCase() == "cn" ? decodeURIComponent(this.cityData[i].CityNameCn) : this.cityData[i].CityNameEn;
//            var liclass = (i % 2 == 0) ? "ac_even" : "ac_odd";
//            var tempHtml = "";
//            if (String.isNullOrEmpty(this.searchField) && this.searchType != this.cityData[i].CityType) {
//                tempHtml = "<li method=\"liData\" data=\"" + i + "\" title=\"" + m_CityData + "\" ><span method=\"spanData\">" + this.cityData[i].CityNameEnSearch + "</span>" + (this.lang.toLowerCase() == "cn" ? m_CityData : "") + "</li>";
//            }
//            else {
//                if (this.searchType == this.cityData[i].CityType) {
//                    tempHtml = "<li method=\"liData\" data=\"" + i + "\" title=\"" + m_CityData + "\" ><span method=\"spanData\">" + this.cityData[i][this.searchField].replace(/_/g, ',') + "</span>" + (this.lang.toLowerCase() == "cn" ? m_CityData : "") + "</li>";
//                }
//                else {
//                    tempHtml = "<li method=\"liData\" data=\"" + i + "\" title=\"" + m_CityData + "\" ><span method=\"spanData\">" + this.cityData[i].CityNameEnSearch + "</span>" + (this.lang.toLowerCase() == "cn" ? m_CityData : "") + "</li>";
//                }
//            }
//            $(tempHtml).appendTo(ulCity);
//        }
//        if (this.cityData.length > 0) {
//            this.windowElement.find("ul[method='cityData'] li:first").addClass("ac_over");
//        }
//        else {
//            var m_ErrorTitle = this.lang.toLowerCase() == "cn" ? String.format(this.m_ErrorCn, keyword) : String.format(this.m_ErrorEn, keyword);
//            this.windowElement.html(this.m_Error.eval({
//                Error: m_ErrorTitle
//            }));
//        }
//        this.windowElement.attr("winstyle", "data");
//        this.initializeEvent();
//        this.render();
//    },
//
//    buildHotHtml: function () {
//        this.reloadData();
//        //与语言相关的参数的处理
//        var m_Title = this.lang.toLowerCase() == "cn" ? this.m_TitleCn : this.m_TitleEn;
//        if (this.windowElement) {
//            this.windowElement.remove();
//        }
//        this.contentEndRegion = $("#m_contentend");
//        this.windowElement = $("<div style=\"display:none; position: absolute; z-index: 2000;\"></div>").appendTo(this.contentEndRegion);
//        var hotTabSb = new StringBuilder();
//        var hotDataSb = new StringBuilder();
//        var defaultTab = 0, defaultIndex = 0;
//        if (!String.isNullOrEmpty(this.eventElement.attr("datacheck"))) {
//            var pos = this.eventElement.attr("datacheck").split("|");
//            if (pos.length == 2) {
//                defaultTab = pos[0];
//                defaultIndex = pos[1];
//            }
//            else {
//                for (var i = 0; i < this.hotData.length; i++) {
//                    for (var j = 0; j < this.hotData[i].CityList.length; j++) {
//                        if (this.hotData[i].CityList[j].CityId == this.cityData[pos[0]].CityId) {
//                            defaultTab = i;
//                            defaultIndex = j;
//                            break;
//                        }
//                    }
//                }
//            }
//        }
//        if (this.hotData != null) {
//            for (var i = 0; i < this.hotData.length; i++) {
//                var m_hotTab = this.lang.toLowerCase() == "cn" ? decodeURIComponent(this.hotData[i].Name) : this.hotData[i].NameEn;
//                hotTabSb.append("<li method=\"liHotTab\" index=\"" + i + "\" " + (i == defaultTab ? "class=\"action\"" : "") + ">" + m_hotTab + "</li>");
//            }
//
//            if (this.isHotelStyle && defaultTab != 0) {
//                var lastChar = '';
//                var rowCol = -1;
//                for (var j = 0; j < this.hotData[defaultTab].CityList.length; j++) {
//                    var m_CityData = decodeURIComponent(this.hotData[defaultTab].CityList[j].CityNameCn);
//                    var firstPY = this.getAreaPY(m_CityData);
//                    if (rowCol == 0 && firstPY == lastChar) {
//                        hotDataSb.append("<li class=\"letter\"></li>");
//                    }
//                    if (firstPY != lastChar) {
//                        if (lastChar != '') {
//                            hotDataSb.append("<li class=\"let_line\"/>");
//                        }
//                        lastChar = firstPY;
//                        hotDataSb.append("<li class=\"letter\">" + firstPY + "</li>");
//                        rowCol = 0;
//                    }
//                    hotDataSb.append("<li title=\"" + m_CityData + "\" method=\"liHotData\" data=\"" + defaultTab + "|" + j + "\">" + m_CityData + "</li>");
//                    rowCol = (rowCol + 1) % this.colLen;
//                }
//            }
//            else {
//                for (var j = 0; j < this.hotData[defaultTab].CityList.length; j++) {
//                    var m_CityData = this.lang.toLowerCase() == "cn" ? decodeURIComponent(this.hotData[defaultTab].CityList[j].CityNameCn) : this.hotData[defaultTab].CityList[j].CityNameEn;
//                    var liclass = (j % 2 == 0) ? "ac_even" : "ac_odd";
//                    hotDataSb.append("<li method=\"liHotData\" data=\"" + defaultTab + "|" + j + "\" title=\"" + m_CityData + "\" class=\"" + liclass + (j == defaultIndex ? " ac_over" : "") + "\">" + m_CityData + "</li>");
//                }
//            }
//            var hotContent = this.m_Container.eval({
//                Language: (this.lang.toLowerCase() == "cn") ? "" : "_en",
//                HotTitle: m_Title,
//                HotTab: hotTabSb.toString(),
//                HotData: hotDataSb.toString(),
//                HotWidth: this.hotWidth,
//                // Cms: cms,
//                ContainerClass: this.containerClass,
//                AbcSearch: this.abcSearch,
//                Popcitylist: this.popcitylist,
//                PopcitylistStyle: this.popcitylistStyle
//            });
//            this.windowElement[0].innerHTML = hotContent;
//        }
//        this.windowElement.attr("winstyle", "hot");
//    },
//
//    reloadData: function () {
//        if (this.windowElement) {
//            this.windowElement.remove();
//            if (this.ie6FilterIFrame != null) {
//                Globals.closeIE6Fliter(this.ie6FilterIFrame);
//            }
//        }
//
//        if (!String.isNullOrEmpty(this.cityType)) {
//            var _checkHotData = false, _checkDataId = false;
//            _checkHotData = !((typeof TrainCityHot) == "undefined")
//            if (_checkHotData) {
//
//                var citytype = String.isNullOrEmpty(this.hotType) ? this.cityType : this.hotType;
//                for (var i = 0; i < TrainCityHot.length; i++) {
//                    if (TrainCityHot[i].CityType == citytype) {
//                        this.hotData = TrainCityHot[i].TabList;
//                    }
//                }
//            }
//        }
//    },
//    onInputClick: function (evt) {
//        if (this.onBeforClick) {
//            this.onBeforClick(this.eventElement);
//        }
//        if (!Object.isNull(this.hotData) && this.windowElement == null) {
//            this.buildHotHtml();
//            this.initializeEvent();
//            this.render();
//            this.eventElement.select();
//        }
//    },
//    onInputKeyUp: function (evt) {
//        if (!this.enableSearch)
//            return;
//        var element = Event.element(evt);
//        if (this.windowElement && this.windowElement.attr("winstyle") == "data") {
//            var ulData = this.windowElement.find("ul[method='cityData']");
//            var select = this.windowElement.find("ul[method='cityData'] li[class*='ac_over']");
//            switch (evt.keyCode) {
//                case this.KeyCode.Up:
//                    {
//                        select.removeClass("ac_over");
//                        if (select.prev("li").length > 0)
//                            select.prev("li").addClass("ac_over");
//                        else
//                            this.windowElement.find("ul[method='cityData'] li:last").addClass("ac_over");
//                        ulData.scrollTop((select.offset().top - ulData.offset().top) < ulData.height() - 30 && (select.offset().top - ulData.offset().top) > 0 ? (select.offset().top - ulData.offset().top) : select.offset().top);
//                    }
//                    break;
//                case this.KeyCode.Down:
//                    {
//                        select.removeClass("ac_over");
//                        if (select.next("li").length > 0)
//                            select.next("li").addClass("ac_over");
//                        else
//                            this.windowElement.find("ul[method='cityData'] li:first").addClass("ac_over");
//                        ulData.scrollTop((select.offset().top - ulData.offset().top) > ulData.height() - 30 ? 0 : (select.offset().top - ulData.offset().top));
//                    }
//                    break;
//                case this.KeyCode.Return:
//                    {
//                        var select = this.windowElement.find("ul[method='cityData'] li[class*='ac_over']");
//                        this.selectData(select);
//                    }
//                    return;
//                default:
//                    clearTimeout(this.timeout);
//                    this.timeout = setTimeout(function () { this.reBuildData(element); } .bind(this), this.delay);
//            }
//        }
//        else {
//            switch (evt.keyCode) {
//                case this.KeyCode.Up:
//                case this.KeyCode.Down:
//                case this.KeyCode.Left:
//                case this.KeyCode.Right:
//                case this.KeyCode.Return: { }
//                    break;
//                default:
//                    {
//                        clearTimeout(this.timeout);
//                        this.timeout = setTimeout(function () { this.reBuildData(element); } .bind(this), this.delay);
//                    }
//            }
//        }
//        evt.stopPropagation();
//    },
//
//    reBuildData: function (evt) {
//        var element = evt;
//        if (!String.isNullOrEmpty(this.cityType)) {
//            if (String.isNullOrEmpty(element.val())) {
//                this.buildHotHtml();
//                this.initializeEvent();
//                this.render();
//            }
//            else {
//                this.buildHtml(element.val());
//            }
//        }
//    },
//    onInputKeyDown: function (evt) {
//        if (this.windowElement && this.windowElement.attr("winstyle") == "hot") {
//            var select = this.windowElement.find("ul[method='hotData'] li[class*='ac_over']");
//            var step = this.colLen - 1;
//            switch (evt.keyCode) {
//                case this.KeyCode.Right:
//                    {
//                        select.removeClass("ac_over");
//                        if (select.next("li").length > 0)
//                            select.next("li").addClass("ac_over");
//                        else
//                            this.windowElement.find("ul[method='hotData'] li:first").addClass("ac_over");
//                    }
//                    break;
//                case this.KeyCode.Left:
//                    {
//                        select.removeClass("ac_over");
//                        if (select.prev("li").length > 0)
//                            select.prev("li").addClass("ac_over");
//                        else
//                            this.windowElement.find("ul[method='hotData'] li:last").addClass("ac_over");
//                    }
//                    break;
//                case this.KeyCode.Down:
//                    {
//                        var nextSelect = select.nextAll(":eq(" + step + ")");
//                        if (nextSelect.length == 0) {
//                            var last = select.prevAll("li").length % this.colLen;
//                            nextSelect = this.windowElement.find("ul[method='hotData'] li:eq(" + last + ")");
//                        }
//                        nextSelect.addClass("ac_over");
//                        select.removeClass("ac_over");
//                    }
//                    break;
//                case this.KeyCode.Up:
//                    {
//                        var prevSelect = select.prevAll(":eq(" + step + ")");
//                        if (prevSelect.length == 0) {
//                            var last = select.prevAll("li").length + Math.floor(this.windowElement.find("ul[method='hotData'] li").length / this.colLen) * this.colLen;
//                            prevSelect = this.windowElement.find("ul[method='hotData'] li:eq(" + last + ")");
//                        }
//                        prevSelect.addClass("ac_over");
//                        select.removeClass("ac_over");
//                    }
//                    break;
//                case this.KeyCode.Return:
//                    {
//                        var select = this.windowElement.find("ul[method='hotData'] li[class*='ac_over']");
//                        this.selectData(select);
//                    }
//                    return;
//                default:
//                    break;
//            }
//            this.eventElement.focus();
//        }
//        evt.stopPropagation();
//    },
//
//    onOutClick: function () {
//        $(document).one("click", function (evt) {
//            var element = Event.element(evt);
//            if (this.windowElement != null && this.windowElement.find("*").index(element) == -1 && this.eventElement[0] != element[0] &&
//                (element.attr("method") != "liHotTab")) {
//                this.dispose();
//            }
//        } .bindAsEventListener(this));
//    },
//
//    selectData: function (elem) {
//        if (!String.isNullOrEmpty(elem.attr("data"))) {
//            var selectCityData;
//            if (this.windowElement.attr("winstyle") == "hot") {
//                var pos = elem.attr("data").split("|");
//                var m_CityData = this.lang.toLowerCase() == "cn" ? decodeURIComponent(this.hotData[pos[0]].CityList[pos[1]].CityNameCn) : this.hotData[pos[0]].CityList[pos[1]].CityNameEn;
//                this.eventElement.val(m_CityData);
//                this.eventElement.removeClass("gray");
//                this.eventElement.attr("datacheck", elem.attr("data"));
//                selectCityData = this.hotData[pos[0]].CityList[pos[1]];
//            }
//            else {
//                var pos = elem.attr("data");
//                var m_CityData = this.lang.toLowerCase() == "cn" ? decodeURIComponent(this.cityData[pos].CityNameCn) : this.cityData[pos].CityNameEn;
//                this.eventElement.val(m_CityData);
//                this.eventElement.removeClass("gray");
//                this.eventElement.attr("datacheck", pos);
//                selectCityData = this.cityData[pos];
//            }
//
//            this.selectCity = selectCityData;
//            this.eventElement[0]["City"] = selectCityData;
//            this.eventElement.attr("CityId", selectCityData.CityId);
//            this.eventElement.attr("CityThreeSign", selectCityData.CityThreeSign);
//            this.eventElement.attr("CityNameEn", selectCityData.CityNameEn);
//            if (this.onSelect) {
//                this.onSelect(this.eventElement, selectCityData);
//            }
//            if (!String.isNullOrEmpty(this.resultNextId)) {
//                $("#" + this.resultNextId).focus();
//                $("#" + this.resultNextId).click();
//            }
//            this.dispose();
//        }
//    },
//
//
//    HotCityLoad: function (dataDiv, index) {
//        if (this.hotData.length > 0) {
//            var isAjax = false;
//            if (this.hotData[index].CityList.length == 0) {
//                isAjax = true;
//
//            } else {
//                this.buildHotDataHtml(dataDiv, index);
//                this.render();
//            }
//            if (isAjax) {
//                var tabId = this.hotData[index].TabId;
//                var typeStr = !String.isNullOrEmpty(this.hotType) ? this.hotType : this.cityType;
//                var url = "http://hotel.elong.com/hotcity/";
//                if (this.isJsonp == 0) {
//                    var appPath = "";
//                    var host = window.location.host;
//                    if (host.toLowerCase().indexOf("travel.elong") > -1 || host.toLowerCase().indexOf("elong") < 0) {
//                        var path = window.location.pathname;
//                        var pathtemp = path.split("/");
//                        if (pathtemp.length > 1)
//                            appPath = "/" + pathtemp[1];
//                    }
//                    url = appPath + "/hotcity/" + typeStr + "/" + tabId + ".html";
//                }
//                else if (this.isJsonp == 99) {
//                    url = "http://f.elong.com/hotcity/" + typeStr + "/" + tabId + ".html";
//                }
//                else {
//                    url += typeStr + "/" + tabId + ".html";
//                }
//
//                //divData.append("<li><p class=\"p20\">获取数据中，请稍后...... </p></li>");
//                elongAjax.callBack(url, {}, function (data) {
//                    this.hotData[index] = data;
//                    this.buildHotDataHtml(dataDiv, index);
//                    this.render();
//                } .bind(this), true, "GET", false, "jsonp");
//
//            }
//
//        }
//
//    },
//
//
//
//    onClickRegion: function (evt) {
//        var elem = Event.element(evt);
//        var method = elem.attr("method");
//        switch (method) {
//            case "liHotTab":
//                this.windowElement.find("ul[method='hotTab'] li").removeClass("action");
//                elem.addClass("action");
//                //this.buildHotDataHtml(this.windowElement.find("ul[method='hotData']"), elem.attr("index"));
//                //this.render();
//
//                this.HotCityLoad(this.windowElement.find("ul[method='hotData']"), elem.attr("index"));
//                this.eventElement.focus();
//                return;
//            case "liHotData":
//                this.selectData(elem);
//                return;
//            case "liData":
//            case "spanData":
//                this.selectData((method == "liData") ? elem : elem.parent());
//                return;
//            case "close":
//                this.dispose();
//                return;
//            default:
//                this.dispose();
//                return;
//        }
//    },
//
//    onMouseOverRegion: function (evt) {
//        var element = Event.element(evt);
//        if (this.outTimer != null) {
//            clearTimeout(this.outTimer);
//            this.outTimer = null;
//        }
//        if (element.is("li") || element.parent().is("li")) {
//            var focus = element.is("li") ? element : element.parent();
//            focus.addClass("ac_over");
//            //focus.siblings("li[class*=ac_over]").removeClass("ac_over");
//        }
//    },
//
//    onMouseOutRegion: function (evt) {
//        var element = Event.element(evt);
//        var method = element.attr("method");
//        if (element.is("li") || element.parent().is("li")) {
//            var focus = element.is("li") ? element : element.parent();
//            focus.removeClass("ac_over");
//        }
//    },
//
//    render: function () {
//        // 设置大小位置
//        if (this.windowElement) {
//            var top = this.eventElement.offset().top + this.eventElement.height() + 6;
//            var left = this.eventElement.offset().left;
//
//            var scroll = Globals.getScrollPosition();
//            var browserRegion = Globals.browserDimensions();
//            if (browserRegion.width - (this.eventElement.offset().left - scroll.x) > this.windowElement.width()) {
//                this.windowElement[0].style.top = top + "px";
//                this.windowElement[0].style.left = left + "px";
//            }
//            else {
//                this.windowElement[0].style.top = top + "px";
//                left = left - this.windowElement.width() + this.eventElement.width();
//                this.windowElement[0].style.left = left + "px";
//            }
//            this.ie6FilterIFrame = Globals.addIE6Filter(this.windowElement.width(), this.windowElement.height(), left, top, 1999);
//            this.windowElement.show();
//        }
//    },
//    dispose: function () {
//        if (this.windowElement) {
//            //this.windowElement.fadeOut("normal");
//            this.windowElement.hide();
//            FunctionExt.defer(function () {
//                if (this.windowElement) {
//                    Globals.closeIE6Fliter(this.ie6FilterIFrame);
//
//                    if (this.windowElement.attr("winstyle") == "data") {
//                        if (this.onClose != null) {
//                            this.onClose(this.eventElement, this.windowElement);
//                        }
//                    }
//                    this.windowElement.remove();
//                    this.destroyEvent();
//                    this.destroyDOM();
//
//                }
//            } .bind(this), 500);
//        }
//    },
//    initData: function () {
//        if (typeof station_names != "undefined") {
//            this.StationList = new Array();
//            var stations = station_names.split("@");
//            for (var f = 0; f < stations.length; f++) {
//                var s = stations[f];
//                if (s.length > 0) {
//                    s = s.split("|");
//                    var s = {
//                        "CityNamePys": s[3],
//                        "CityNameCn": decodeURIComponent(s[1]),
//                        "CityNameEn": s[4],
//                        "CityNameEnSearch": s[2]
//                    };
//                    this.StationList.push(s);
//                }
//            }
//        }
//    }
//});
//
//var CityWindowNew = Elong.Control.CityWindowNew;
//CityWindowNew = Class.create();
//Object.extend(CityWindowNew.prototype, {
//    name: "CityWindowNew",
//    city: null,
//    options: {
//        eventElement: null,
//        lang: "cn",
//        resultNextId: "",
//        cityType: "",
//        hotType: "",
//        onSelect: null,
//        onClose: null,
//        onBeforClick: null,
//        hotWidth: 340,
//        hotHeight: 138,
//        delay: 50,
//        maxLen: 10,          //搜索最大显示个数
//        enableSearch: true,
//        isJsonp: 0,
//        searchField: "",
//        searchType: "",
//        searchUrl: "http://home.elong.com/city/"
//
//    },
//    //初始化
//    initialize: function (options) {
//        Object.extend(Object.extend(this, this.options), options);
//        this.city = new CityPadNew(options);
//    },
//    getSelect: function () {
//        return this.city.getSelect();
//    }
//});
//
////
////===================================================================
//// 文件名:	SearchBox.js
//// 版权:		Copyright (C) 2014 Elong
//// 创建人:	王树东
//// 创建日期:	2014.02.08
//// 描述:		SearchBox.js 用于搜索
//// 备注:      2014-07-02 modified by 张鸿
////===================================================================
//
////创建日期的扩展方法 add by 张鸿
//Date.prototype.format = function (format) {
//    var o = {
//        "M+": this.getMonth() + 1, //month
//        "d+": this.getDate(), //day
//        "h+": this.getHours(), //hour
//        "m+": this.getMinutes(), //minute
//        "s+": this.getSeconds(), //second
//        "q+": Math.floor((this.getMonth() + 3) / 3),
//        //quarter
//        "S": this.getMilliseconds() //millisecond
//    };
//    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//    for (var k in o)
//        if (new RegExp("(" + k + ")").test(format))
//            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
//    return format;
//};
//
//
//
////取得指定日期的年月日时分秒
////参数：dateValue 是格式形如：2014/07/02    add by 张鸿
//function TimeSpan(dateValue) {
//    var newCom = parseISO8601(dateValue);
//    this.year = newCom.getYear();
//    this.month = newCom.getMonth() + 1;
//    this.day = newCom.getDate();
//    this.hour = newCom.getHours();
//    this.minute = newCom.getMinutes();
//    this.second = newCom.getSeconds();
//    this.msecond = newCom.getMilliseconds();
//    this.week = newCom.getDay();
//};
//
//
////取得两个日期之间的时间差  add by 张鸿
////参数：interval : y或year-表示取得相差的年份 n或month-表示相差的月份 d或day表示相差的天数 h或hour-表示相差的小时 m或minute-表示相差的分钟
////                 s或second-表示相差的秒数 ms或msecond-表示相差的毫秒数 w或week-表示相差的周数
////      date1:起始日期
////      date2:结束日期
//function DateDiff(interval, date1, date2) {
//    var TimeSpan1 = new TimeSpan(date1);
//    var TimeSpan2 = new TimeSpan(date2);
//    var result;
//    switch (String(interval).toLowerCase()) {
//        case "y":
//        case "year":
//            result = TimeSpan1.year - TimeSpan2.year;
//            break;
//        case "n":
//        case "month":
//            result = (TimeSpan1.year - TimeSpan2.year) * 12 + (TimeSpan1.month - TimeSpan2.month);
//            break;
//        case "d":
//        case "day":
//            result = Math.round((Date.UTC(TimeSpan1.year, TimeSpan1.month - 1, TimeSpan1.day) - Date.UTC(TimeSpan2.year, TimeSpan2.month - 1, TimeSpan2.day)) / (1000 * 60 * 60 * 24));
//            break;
//        case "h":
//        case "hour":
//            result = Math.round((Date.UTC(TimeSpan1.year, TimeSpan1.month - 1, TimeSpan1.day, TimeSpan1.hour) - Date.UTC(TimeSpan2.year, TimeSpan2.month - 1, TimeSpan2.day, TimeSpan2.hour)) / (1000 * 60 * 60));
//            break;
//        case "m":
//        case "minute":
//            result = Math.round((Date.UTC(TimeSpan1.year, TimeSpan1.month - 1, TimeSpan1.day, TimeSpan1.hour, TimeSpan1.minute) - Date.UTC(TimeSpan2.year, TimeSpan2.month - 1, TimeSpan2.day, TimeSpan2.hour, TimeSpan2.minute)) / (1000 * 60));
//            break;
//        case "s":
//        case "second":
//            result = Math.round((Date.UTC(TimeSpan1.year, TimeSpan1.month - 1, TimeSpan1.day, TimeSpan1.hour, TimeSpan1.minute, TimeSpan1.second) - Date.UTC(TimeSpan2.year, TimeSpan2.month - 1, TimeSpan2.day, TimeSpan2.hour, TimeSpan2.minute, TimeSpan2.second)) / 1000);
//            break;
//        case "ms":
//        case "msecond":
//            result = Date.UTC(TimeSpan1.year, TimeSpan1.month - 1, TimeSpan1.day, TimeSpan1.hour, TimeSpan1.minute, TimeSpan1.second, TimeSpan1.msecond) - Date.UTC(TimeSpan2.year, TimeSpan2.month - 1, TimeSpan2.day, TimeSpan2.hour, TimeSpan2.minute, TimeSpan2.second, TimeSpan1.msecond);
//            break;
//        case "w":
//        case "week":
//            result = Math.round((Date.UTC(TimeSpan1.year, TimeSpan1.month - 1, TimeSpan1.day) - Date.UTC(TimeSpan2.year, TimeSpan2.month - 1, TimeSpan2.day)) / (1000 * 60 * 60 * 24)) % 7;
//            break;
//        default:
//            result = "invalid";
//    }
//    return (result);
//}
//
//function parseISO8601(dateStringInRange) {
//    var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
//        date = new Date(NaN), month,
//        parts = isoExp.exec(dateStringInRange);
//
//    if (parts) {
//        month = +parts[2];
//        date.setFullYear(parts[1], month - 1, parts[3]);
//        if (month != date.getMonth() + 1) {
//            date.setTime(NaN);
//        }
//    }
//    return date;
//}
//
//
//var SearchBoxClient = Elong.Page.SearchBoxClient;
//SearchBoxClient = Class.create();
//Object.extend(SearchBoxClient.prototype, {
//    name: "SearchBoxClient",
//    defaultCityVal: "中文/拼音/首字母",
//    initializeServerData: function () {
//    },
//    //初始化
//    initialize: function (options) {
//        Object.extend(Object.extend(this, options), this.options);
//        this.initializeDOM();
//        this.initializeEvent();
//        this.initializeServerData();
//        this.render();
//    },
//    options: {
//        txtStartStation: null,
//        txtEndStation: null,
//        btnChangeStation: null,
//        txtStartDate: null,
//        chkIsMoveHighCar: null,
//        chkIsHaveTicket: null,
//        btnSearchTicket: null,
//        Language: "CN",
//        serverTime: "",
//        txtDateMouse: null
//    },
//    //初始化DOM元素
//    initializeDOM: function () {
//    },
//
//    destroyDOM: function () {
//        this.options = null;
//    },
//
//    //初始化DOM事件
//    initializeEvent: function () {
//        //事件绑定代码示例
//        // this.dvSearchRegion.bind("click", this.OnClickdvSearchRegion.bindAsEventListener(this));
//        this.startStation = new CityWindowNew({
//            eventElement: this.txtStartStation,
//            cityType: "train",
//            lang: "cn",
//            resultNextId: this.txtEndStation[0].id,
//            isJsonp: 1,
//            searchUrl: "http://" + location.hostname + "/city/",
//            onSelect: function (evt, data) {
//                this.eventElement.removeClass("c999");
//            }
//        });
//
//
//
//        this.endStation = new CityWindowNew({
//            eventElement: this.txtEndStation,
//            cityType: "train",
//            lang: "cn",
//            //resultNextId: this.txtStartDate[0].id,
//            isJsonp: 1,
//            searchUrl: "http://" + location.hostname + "/city/",
//            onSelect: function (evt, data) {
//                this.eventElement.removeClass("c999");
//            }
//        });
//
//        this.txtStartDate.bind("click", this.onTxtStartDateClick.bindAsEventListener(this));
//        this.btnSearchTicket.bind("click", this.onBtnSearchTicketClick.bindAsEventListener(this));
//        this.btnChangeStation.bind("click", this.onChangeStationClick.bindAsEventListener(this));
//        this.txtDateMouse.bind("click", this.onDateMouseClick.bindAsEventListener(this));
//        this.txtStartDate.bind("keyup", this.checkSearch.bindAsEventListener(this));
//
//        this.chkIsMoveHighCar.parent().bind("click", this.onClickChkMoveHighCar.bindAsEventListener(this));
//        this.chkIsHaveTicket.parent().bind("click", this.onClickChkHaveTicket.bindAsEventListener(this));
//
//        $(window).unload(this.dispose.bind(this));
//    },
//
//    onClickChkMoveHighCar: function (evt) {
//
//        if (this.chkIsMoveHighCar.find("i").hasClass("check")) {
//            this.chkIsMoveHighCar.find("i").removeClass("check");
//        } else {
//            this.chkIsMoveHighCar.find("i").addClass("check");
//        }
//        if (this.chkIsMoveHighCar.hasClass("checkon")) {
//            this.chkIsMoveHighCar.removeClass("checkon");
//        } else {
//            this.chkIsMoveHighCar.addClass("checkon");
//        }
//
//    },
//    onClickChkHaveTicket: function () {
//        if (this.chkIsHaveTicket.find("i").hasClass("check")) {
//            this.chkIsHaveTicket.find("i").removeClass("check");
//        } else {
//            this.chkIsHaveTicket.find("i").addClass("check");
//        }
//        if (this.chkIsHaveTicket.hasClass("checkon")) {
//            this.chkIsHaveTicket.removeClass("checkon");
//        } else {
//            this.chkIsHaveTicket.addClass("checkon");
//        }
//    },
//
//    //设置页面回车点击搜索按钮
//    checkSearch: function (evt) {
//        var ele = Event.element(evt);
//        if (evt.keyCode == 13) {
//            this.btnSearchTicket.trigger("click");
//        }
//    },
//    onDateMouseClick: function () {
//        this.txtStartDate.click();
//        this.txtStartDate.focus();
//    },
//    onTxtStartDateClick: function (evt) {
//        var that = this;
//        var ele = Event.element(evt);
//        //如果是凌晨，日历框昨天日期可修改
//        var serverDate = validator.convertDate(this.serverTime);
//        var enabledFromDate = validator.reFormatDateString(this.serverTime);
//        serverDate.setDate(serverDate.getDate() + 19);
//        //var toDate = validator.convertDate(serverDate.getDate() + 19);
//        //var enabledToDate = validator.reFormatDateString(serverDate.getFullYear() + "-" + (serverDate.getMonth() + 1) + "-" + serverDate.getDate());
//        new CalendarWindow({
//            eventElement: ele,
//            enabledFrom: enabledFromDate,
//            //enabledTo: enabledToDate,
//            selectedDate: String.isNullOrEmpty(ele.val()) ? this.serverTime : ele.val(),
//            language: this.Language,
//            onSelected: function (date) {
//                ele.val(date);
//                that.formatWeekDay(ele, date);
//            } .bind(this)
//        });
//    },
//    formatWeekDay: function (ele, date) {
//        var ts = new TimeSpan(date);
//        switch (ts.week) {
//            case 1:
//                ele.next().html("周一");
//                break;
//            case 2:
//                ele.next().html("周二");
//                break;
//            case 3:
//                ele.next().html("周三");
//                break;
//            case 4:
//                ele.next().html("周四");
//                break;
//            case 5:
//                ele.next().html("周五");
//                break;
//            case 6:
//                ele.next().html("周六");
//                break;
//            case 0:
//                ele.next().html("周日");
//                break;
//        }
//    },
//    onChangeStationClick: function (evt) {
//        var startStation = this.txtStartStation.val();
//        this.txtStartStation.val(this.txtEndStation.val());
//        this.txtEndStation.val(startStation);
//
//        var sc = false;
//        if (this.txtStartStation[0] && this.txtStartStation[0].City) {
//            sc = this.txtStartStation[0].City;
//        }
//        var ec = false;
//        if (this.txtEndStation[0] && this.txtEndStation[0].City) {
//            ec = this.txtEndStation[0].City;
//        }
//
//        if (sc) {
//            var startCityCn = sc.CityNameCn;
//            var startCityEn = sc.CityNameEn;
//            this.setCity(this.txtEndStation, startCityCn, startCityEn);
//        }
//        else {
//            this.txtEndStation.get(0).City = undefined;
//        }
//
//
//        if (ec) {
//            this.setCity(this.txtStartStation, ec.CityNameCn, ec.CityNameEn);
//        }
//        else {
//            this.txtStartStation.get(0).City = undefined;
//        }
//
//
//
//
//
//    },
//    setCity: function (station, citynamecn, citynameen) {
//        var city = {
//            "CityId": station.attr("CityId"),
//            "CityThreeSign": station.attr("CityThreeSign"),
//            "CityNameCn": citynamecn,
//            "CityNameEn": citynameen
//        };
//        station.get(0).City = city;
//    },
//    //搜索火车票信息
//    onBtnSearchTicketClick: function () {
//        //出发站不可以为空
//        if (!validator.valid(this.txtStartStation.val(), "notEmpty & nonSpecialSign")) {
//            //$error(this.txtStartStation, "请输入出发站名称，且不可包含*&+等符号及阿拉伯数字。。");
//            this.txtStartStation.click();
//            this.txtStartStation.focus();
//            return false;
//        }
//
//        if (Object.isNull(this.txtStartStation[0].City) || this.txtStartStation[0].City == undefined || this.txtStartStation[0].City.CityNameEn == "" || this.txtStartStation.val() == this.defaultCityVal) {
//            $error(this.txtStartStation, "出发站不存在，请选择正确的出发站");
//            //this.txtStartStation.click();
//            //this.txtStartStation.focus();
//            return false;
//        }
//
//
//        //到达站不可以为空
//        if (!validator.valid(this.txtEndStation.val(), "notEmpty & nonSpecialSign")) {
//            //$error(this.txtEndStation, "请输入到达站名称，且不可包含*&+等符号及阿拉伯数字。。");
//            this.txtEndStation.click();
//            this.txtEndStation.focus();
//            return false;
//        }
//        if (Object.isNull(this.txtEndStation[0].City) || this.txtEndStation[0].City == undefined || this.txtEndStation[0].City.CityNameEn == "" || this.txtEndStation.val() == this.defaultCityVal) {
//            $error(this.txtEndStation, "到达站不存在，请选择正确的到达站");
//            return false;
//        }
//        //日期不能为空
//        if (!validator.valid(this.txtStartDate.val(), "notEmpty")) {
//            //$error(this.txtStartDate, "日期不能为空");
//            this.txtStartDate.click();
//            this.txtStartDate.focus();
//            return false;
//        }
//        //日期不能为空 或者格式不正确
//        if (!validator.valid(this.txtStartDate.val(), "notEmpty & dateEn")) {
//            $error(this.txtStartDate, "日期格式不正确");
//            return false;
//        }
//
//        var date = validator.convertDate(this.txtStartDate.val());
//        var serverDate = validator.convertDate(this.serverTime);
//        if (date < serverDate) {
//            $error(this.txtStartDate, "日期须晚于或者等于当天日期。");
//            return false;
//        }
//
//        serverDate.setDate(serverDate.getDate() + 19);
//
//
//
//
//
//        if (this.txtStartStation[0].City.CityNameEn == this.txtEndStation[0].City.CityNameEn) {
//            $error(this.txtEndStation, "出发站与到达站不能相同");
//            return false;
//        }
//
//        Globals.cookie("ShTrain", "",
//            {
//                StartDate: this.txtStartDate.val(),
//                StartStationCn: this.txtStartStation[0].City.CityNameCn,
//                EndStationCn: this.txtEndStation[0].City.CityNameCn,
//                StartStationEn: this.txtStartStation[0].City.CityNameEn,
//                EndStationEn: this.txtEndStation[0].City.CityNameEn
//            },
//            {
//                expires: 11,
//                path: "/",
//                secure: false
//            });
//        var url = String.format("http://" + "train.elong.com" + "/{0}-{1}", this.txtStartStation[0].City.CityNameEn, this.txtEndStation[0].City.CityNameEn);
//        var t1 = this.txtStartDate.val();
//        var t2 = new Date().format("yyyy-MM-dd");
//        //计算出当前日期与所选择日期的时间天数差异
//        //        var diffDay = DateDiff("day", t1.replace(/-/g, '/'), t2.replace(/-/g, '/'));
//        var diffDay = DateDiff("day", t1, t2);
//
//        if (!Object.isNull(this.chkIsMoveHighCar) && this.chkIsMoveHighCar.find("i").hasClass("check")) {
//            url += "-gaotie"; // +this.chkIsMoveHighCar[0].checked;
//        }
//        if (!Object.isNull(this.chkIsHaveTicket) && this.chkIsHaveTicket.find("i").hasClass("check")) {
//            url += "-youpiao"; // +this.chkIsHaveTicket[0].checked;
//        }
//        url += "/day" + diffDay + ".html";
//
//        window.location.href = url;
//
//    },
//    destroyEvent: function () {
//        this.txtStartDate.unbind("click");
//        this.btnSearchTicket.unbind("click");
//        this.btnChangeStation.unbind("click");
//        this.txtDateMouse.unbind("click");
//        this.txtStartDate.unbind("keyup");
//    },
//    render: function () {
//        var ece = Globals.cookie("ShTrain", "EndStationEn");
//        var sce = Globals.cookie("ShTrain", "StartStationEn");
//        var ecc = Globals.cookie("ShTrain", "EndStationCn");
//        var scc = Globals.cookie("ShTrain", "StartStationCn");
//
//        this.options.txtStartStation.val(scc ? scc : this.defaultCityVal);
//        this.options.txtEndStation.val(ecc ? ecc : this.defaultCityVal);
//
//        this.options.txtStartStation.attr("CityName", scc ? scc : this.defaultCityVal);
//        this.options.txtStartStation.attr("CityNameEn", sce ? sce : this.defaultCityVal);
//
//        this.options.txtEndStation.attr("CityName", ecc ? ecc : this.defaultCityVal);
//        this.options.txtEndStation.attr("CityNameEn", ece ? ece : this.defaultCityVal);
//
//        this.setCity(this.txtStartStation,
//            this.txtStartStation.attr("CityName"),
//            this.txtStartStation.attr("CityNameEn"));
//        this.setCity(this.txtEndStation,
//            this.txtEndStation.attr("CityName"),
//            this.txtEndStation.attr("CityNameEn"));
//
//        //默认显示星期几
//        this.formatWeekDay(this.txtStartDate, this.txtStartDate.val());
//        //默认文本样式加灰
//        if (this.options.txtStartStation.val() == this.defaultCityVal) {
//            this.options.txtStartStation.addClass("c999");
//        }
//        if (this.options.txtEndStation.val() == this.defaultCityVal) {
//            this.options.txtEndStation.addClass("c999");
//        }
//
//    },
//
//    dispose: function () {
//        this.destroyEvent();
//        this.destroyDOM();
//    }
//
//});
////===================================================================
//// 文件名:	ElongNewIndex.js
//// 版权:		Copyright (C) 2013 Elong
//// 创建人:	Elong JavaScript Template Autocreate
//// 创建日期:	2013/1/22 13:47:15
//// 描述:		ElongNewIndex.js
//// 备注:
////===================================================================
//
//
//
//var ElongNewIndexClient = Elong.Page.ElongNewIndexClient;
//ElongNewIndexClient = Class.create();
//Object.extend(ElongNewIndexClient.prototype, {
//    name: "ElongNewIndexClient",
//    FlightPromotion: [],
//    PoiData: null,
//    PoiConfig: null,
//    PromotionTempldate: new Template("<li><span class=\"price\">¥#{Price}</span><span>#{Date}</span><span class=\"w120\">#{StartCity}-#{EndCity}</span><span>#{Discount}折</span><span><a href=\"#{Url}\" target=\"_blank\">查看>></a></span></li>"),
//    initializeServerData: function () {
//        this.afterDays = ElongNewIndexController.IndexConfig.AfterDays;
//        this.inDays = ElongNewIndexController.IndexConfig.InDays;
//        this.ihotelAfterDays = ElongNewIndexController.IndexConfig.iHotelAfterDays;
//        this.ihotelInDays = ElongNewIndexController.IndexConfig.iHotelInDays;
//        this.SiteTel = ElongNewIndexController.IndexConfig.SiteTel;
//        this.serverDateStr = ElongNewIndexController.IndexConfig.serverDateStr;
//        this.GlobalHotel_ListCity = new Template(ElongNewIndexController.UrlConfig.GlobalHotel_ListCity.replace(/{/g, "#{"));
//        //机票相关链接 star
//        this.HotelMapUrl = new Template("http://hotel.elong.com/search/listmap_cn_#{CityCode}.html");
//        //this.HotelPlaceUrl = new Template("http://hotel.elong.com/#{CityNameEn}/place#{PlaceCode}/");
//        this.HotelPlaceUrl = new Template("http://hotel.elong.com/search/list_cn_#{CityId}.html");
//        this.HotelBrandUrl = new Template("http://hotel.elong.com/#{CityNameEn}/chain#{BrandCode}.html");
//
//        //增加超级/高端经济舱 By Xiaoyu.wang
//        this.FlightOneWayUrl = new Template("http://flight.elong.com/#{departcity}-#{arrivecity}/day#{departdate}.html");
//        this.FlightRoundUrl = new Template("http://flight.elong.com/#{departcity}-#{arrivecity}/round/day#{departdate}_day#{backdate}.html");
//
//        //增加国际机票
//        this.iFlightOneWayUrl = new Template("http://iflight.elong.com/#{departcity}-#{arrivecity}/cn_day#{departdate}.html");
//        this.iFlightRoundUrl = new Template("http://iflight.elong.com/#{departcity}-#{arrivecity}/round/cn_day#{departdate}_day#{backdate}.html");
//
//
//        this.iFlightList = new Template(ElongNewIndexController.UrlConfig.IFlightList.replace(/{/g, "#{"));
//        this.PoiConfig = ElongNewIndexController.IndexConfig.PoiConfig.ConfigList;
//
//        //////////2015///////////
//
//        this.FlightJsonUrl = "http://flight.elong.com/lowestdiscount.jsonp";
//        this.MyRecordFavJsonpUrl = "http://travel.elong.com/hotel/isajax/FavHotel/GetFavHotelInfosByPage";
//        this.MyRecordCommentJsonpUrl = "http://travel.elong.com/hotel/isajax/HotelReview/GetOrderToReview";
//        this.MyRecordHistroyJsonpUrl = "http://travel.elong.com/hotel/isajax/ElongHotelInfo/GetHoteBasicInfo";
//    },
//    //初始化
//    initialize: function () {
//        this.initializeDOM();
//        this.initializeEvent();
//        this.initializeServerData();
//        this.initializeData();
//        this.render();
//    },
//
//    //初始化DOM元素
//    initializeDOM: function () {
//        this.dvLeft = $(".cate_channel");
//        this.dvPoi = $("div[method='dvPoi']");
//        this.dvFlight = $("div[method='flightpromotion']");
//
//        //搜索框的相关行为
//        //        this.tabFlight = this.dvLeft.find("li[method='tabFlight']");
//        //        this.tabHotel = this.dvLeft.find("li[method='tabHotel']");
//        //        //火车票tab
//        //        this.tabTrain = this.dvLeft.find("li[method='tabTrain']");
//
//        this.navHotel = this.dvLeft.find("ul[method='navHotel']");
//        this.navFlight = this.dvLeft.find("ul[method='navFlight']");
//        this.panelHotel = this.dvLeft.find("[region='Hotel'] ");
//        this.panelFlight = this.dvLeft.find("[region='Flight']");
//        this.panelTrain = this.dvLeft.find("[region='train']");
//
//        this.tagHotel = this.dvLeft.find("li[method='tagHotel']");
//        this.tagiHotel = this.dvLeft.find("li[method='tagiHotel']");
//        this.tagFlight = this.dvLeft.find("li[method='tagFlight']");
//        this.tagiFlight = this.dvLeft.find("li[method='tagiFlight']");
//
//        this.dlHotel = this.dvLeft.find("dl[method='dlHotel']");
//        this.dliHotel = this.dvLeft.find("dl[method='dliHotel']");
//        this.dlFlight = this.dvLeft.find("dl[method='dlFlight']");
//        this.dliFlight = this.dvLeft.find("dl[method='dliFlight']");
//
//        //Hotel相关
//        this.hotelCheckInDate = $("#hotelCheckInDate");
//        this.hotelCheckoutDate = $("#hotelCheckoutDate");
//
//        this.hotelName = $("input[method='hotelName']");
//
//
//
//        //Flight相关
//        this.FlightTypeLabel = $(".return_way>dd");
//        this.FlightOneWay = $("input[method='oneway']");
//        this.FlightRound = $("input[method='round']");
//        this.iFlightOneWay = $("input[method='ioneway']");
//        this.iFlightRound = $("input[method='iround']");
//        this.FlightSrcCityName = $("input[method='flightsrcCity']");
//        this.FlightDestCityName = $("input[method='flightdestCity']");
//        this.iFlightSrcCityName = $("input[method='iflightsrcCity']");
//        this.iFlightDestCityName = $("input[method='iflightdestCity']");
//        this.iFlightType = $("[method='iflighttype']");
//        this.iFlightBackDate = $("[method='ibackDate']");
//        this.FlightStartDate = $("input[method='txtFlightStartDate']");
//        this.FlightEndDate = $("input[method='txtFlightEndDate']");
//        this.iFlightStartDate = $("input[method='txtiFlightStartDate']");
//        this.iFlightEndDate = $("input[method='txtiFlightEndDate']");
//        this.smsSuccessHtml = "<span class='cg'><span class='cgicon'></span>发送成功</span>";
//
//        //国际酒店新tab add by qiuliang
//        this.ihotelCityNameNew = $("#ihotelCityNew");
//        this.ihotelPOIName = $("#ihotelPoiName");
//        this.ihotelCheckInDate = $("#ihotelCheckInDate");
//        this.ihotelCheckoutDate = $("#ihotelCheckoutDate");
//
//        //火车票
//        this.trainSd = $("#txtTrainSd");
//        this.trainSc = $("#txtTrainSc");
//        this.trainEc = $("#txtTrainEc");
//        this.trainSwap = $("#spTrainSwap");
//        this.trainIsHighCar = $("#chkIsMoveHighCar");
//        this.trainHaveTicket = $("#chkIsMoveTicket");
//        this.trainSearchBtn = $("#btnSearchTrain");
//
//
//        //////////////  2015 New  //////////////////////
//        this.myRecordTab = $("#my_record_tabs span");
//        this.disPlaneTricketTabs = $("#discount_plane_tricket>h3>span");
//        this.disTrainTricketTabs = $("#discount_train_tricket>h3>span");
//
//        this.hideMyRecords = $(".open_wrap>i:first");
//        this.searchTabs = $("#searchTabs>li");
//        this.searchPanels = $(".cate_channel_option");
//
//        this.hotelSubTabs = $("#hotel_sub_tabs>span");
//        this.flightSubTabs = $("#flight_sub_tabs>span");
//
//        this.hotelCityName = $("#hotelCity");
//        this.hotelPlace = $("input[method='place']");
//        this.textWord = $("input[method='place']");
//
//        this.searchAction = $("[action='search']");
//
//        this.go2HotelList = $("[method='go2HotelList']");
//    },
//
//    initializeData: function () {
//
//        this.NowDate = ElongNewIndexController.ServerTime.substring(0, 10);
//        //是否展示昨天日期 Author:yuebing dong Date:2013.07.15
//        this.CalendarShowYesterday = ElongNewIndexController.CalendarShowYesterday,
//        this.ReadFlightCookie();
//        this.ReadiFlightCookie();
//        this.InitialCity();
//
//        //初始化信息
//        this.GlobalData = { Type: '', Name: '', PropertiesId: 0, Lat: 0, Lng: 0, Accept: false };
//        this.GlobalHotelNameData = { Type: '', Name: '', PropertiesId: 0, Lat: 0, Lng: 0, Accept: false };
//        this.HotelAioSearchUrl = "http://travel.elong.com/hotel/keywordssuggest.html?isNewB=true";
//        this.HotelAioHotUrl = "http://openapi.elong.com/suggest/hotsuggest.html";
//
//        var cityInfo = this.ReadHotelCookie();
//
//        this.CreateAllInOneBox(cityInfo.CityId);
//
//        setTimeout(function () {
//            this.hotelCityName.val(cityInfo.CityName);
//        } .bind(this), 100);
//        this.hotelCityName[0].City = {
//            "CityId": cityInfo.CityId,
//            "CityNameCn": cityInfo.CityName,
//            "CityNameEn": cityInfo.CityNameEn,
//            "DataCheck": cityInfo.DataCheck
//        };
//
//
//        this.HotelPlaceDefaultName = "请输入地标/商圈/景点";
//        this.HotelDefaultName = "请输入目的地";
//
//        this.iHotelDefaultName = "请输入地标/商圈/景点";
//        this.iHotelCityDefaultName = "请输入目的地";
//
//        setTimeout(function () {
//            this.ihotelCityNameNew.val(this.iHotelDefaultName);
//        } .bind(this), 1000);
//        setTimeout(function () {
//            this.ihotelCityNameNew.val(this.iHotelCityDefaultName);
//        } .bind(this), 1000);
//        var now = validator.convertDate(ElongNewIndexController.ServerTime.substring(0, 10));
//        this.NextDate = validator.reFormatDateString((now.getFullYear() + 1) + "-" + (now.getMonth() + 1) + "-" + now.getDate());
//
//    },
//
//    //初始化DOM事件
//    initializeEvent: function () {
//
//
//        //事件绑定代码示例
//        this.dvLeft.bind("click", this.OndvLeftClick.bindAsEventListener(this));
//        this.dvLeft.bind("keydown", this.OnEnterKeyDowndvLeft.bindAsEventListener(this));
//
//        this.hotelPlace.bind("blur", this.OnHotelPlaceBlur.bindAsEventListener(this));
//        this.hotelPlace.bind("keydown", this.KeydownFunction.bindAsEventListener(this));
//        this.hotelPlace.bind("focus", this.OnHotelPlaceFocus.bindAsEventListener(this));
//
//        this.hotelName.bind("blur", this.OnHotelNameBlur.bindAsEventListener(this));
//        this.hotelName.bind("keydown", this.KeydownFunction.bindAsEventListener(this));
//        this.hotelName.bind("focus", this.OnHotelNameFocus.bindAsEventListener(this));
//
//        this.ihotelPOIName.bind("blur", this.OniHotelNameBlur.bindAsEventListener(this));
//        this.ihotelPOIName.bind("keydown", this.KeydownFunction.bindAsEventListener(this));
//        this.ihotelPOIName.bind("focus", this.OniHotelNameFocus.bindAsEventListener(this));
//
//        this.ihotelCityNameNew.bind("blur", this.OniHotelCityNameBlur.bindAsEventListener(this));
//        this.ihotelCityNameNew.bind("keydown", this.KeydownFunction.bindAsEventListener(this));
//        this.ihotelCityNameNew.bind("focus", this.OniHotelCityNameFocus.bindAsEventListener(this));
//
//        this.hotelCheckInDate.bind("blur", this.OnDateBlur.bindAsEventListener(this));
//        this.hotelCheckoutDate.bind("blur", this.OnDateBlur.bindAsEventListener(this));
//        this.ihotelCheckInDate.bind("blur", this.OnDateBlur.bindAsEventListener(this));
//        this.ihotelCheckoutDate.bind("blur", this.OnDateBlur.bindAsEventListener(this));
//        this.trainSd.bind("blur", this.OnDateBlurTrain.bindAsEventListener(this));
//        this.FlightStartDate.bind("blur", this.OnDateBlur.bindAsEventListener(this));
//        this.FlightEndDate.bind("blur", this.OnDateBlur.bindAsEventListener(this));
//        this.iFlightStartDate.bind("blur", this.OnDateBlur.bindAsEventListener(this));
//        this.iFlightEndDate.bind("blur", this.OnDateBlur.bindAsEventListener(this));
//
//        this.dvFlight.bind("click", this.OndvFlightClick.bindAsEventListener(this));
//        this.FlightTypeLabel.bind("mouseover", this.OnFlightTypeLabelMouseOver.bindAsEventListener(this));
//
//        //////////////////////////////// 2015  My Record Tabs
//        this.myRecordTab.bind("click", this.OnMyRecordTabClick.bindAsEventListener(this));
//        this.disPlaneTricketTabs.bind("click", this.OndisPlaneTricketTabs.bindAsEventListener(this));
//        this.disTrainTricketTabs.bind("click", this.OndisTrainTricketTabs.bindAsEventListener(this));
//        this.hideMyRecords.bind("click", this.OnHideMyRecords.bindAsEventListener(this));
//        this.searchTabs.bind("click", this.OnSearchTabsClick.bindAsEventListener(this));
//        this.hotelSubTabs.bind("click", this.OnHotelSubTabClick.bindAsEventListener(this));
//        this.flightSubTabs.bind("click", this.OnFlightSubTabsClick.bindAsEventListener(this));
//
//        this.searchAction.bind("click", this.onSearchActionbtnClick.bindAsEventListener(this));
//        this.FlightOneWay.bind("click", this.onFlightOneWayClick.bindAsEventListener(this));
//        this.FlightRound.bind("click", this.onFlightRoundClick.bindAsEventListener(this));
//        this.iFlightRound.bind("click", this.oniFlightRoundClick.bindAsEventListener(this));
//        this.iFlightOneWay.bind("click", this.oniFlightOneWayClick.bindAsEventListener(this));
//
//        this.go2HotelList.bind("click", this.ongo2HotelListClick.bindAsEventListener(this));
//
//        var firstValue = this.getUrlPara(location.href, "first");
//        if (firstValue == "app") {
//            this.tabTrain.click();
//        }
//
//        $(window).unload(this.dispose.bind(this));
//    },
//
//    ///////////////////////////////设置初始化信息////////////////////////////////////////////////
//
//
//
//    InitialCity: function () {
//        //初始化城市输入框
//        this.hotelCity = new CityWindow({
//            eventElement: this.hotelCityName,
//            cityType: "hotel",
//            hotType: "hotel",
//            lang: "cn",
//            isJsonp: "1",
//            isAutoSelect: true,
//            resultNextId: "hotelCheckInDate",
//            onSelect: function (evt, data) {
//                if (data.CityId != "") {
//                    //add by Liang.Qiu
//                    //从suggestion选择
//                    if (data.Type) {
//                        if (data.Type != "city") {
//                            this.CreateAllInOneBox(); //取消AIOBOX弹窗
//
//                            this.GlobalData.Name = data.CityNameCn;
//                            if (data.CityNameCn && data.CityNameCn.indexOf('（') > -1) {
//                                this.GlobalData.Name = data.CityNameCn.substring(0, data.CityNameCn.indexOf('（'));
//                            }
//                            this.GlobalData.Type = "999";
//                        }
//                        else {
//                            this.CreateAllInOneBox(data.CityId);
//                        }
//                    }
//                    else {
//                        this.CreateAllInOneBox(data.CityId);
//                    }
//
//                    //$("#hotelCheckInDate").click();
//                }
//            } .bind(this)
//        });
//
//        this.flightsrcCity = new CityWindow({
//            eventElement: this.FlightSrcCityName,
//            cityType: "flightsrc",
//            isJsonp: "1",
//            lang: "cn",
//            resultNextId: "",
//            onSelect: function (evt, data) {
//                this.FlightDestCityName.focus();
//                this.FlightDestCityName.click();
//            } .bind(this)
//        });
//
//
//        this.flightdestCity = new CityWindow({
//            eventElement: this.FlightDestCityName,
//            cityType: "flightdest",
//            isJsonp: "1",
//            lang: "cn",
//            onSelect: function (evt, data) {
//                this.FlightStartDate.focus();
//                this.FlightStartDate.click();
//            } .bind(this)
//        });
//
//        //初始化国际酒店城市输入框
//        //        var that = this;
//        //        var aa = new DataWindow(
//        //                    {
//        //                        eventElement: this.ihotelCityNameNew,
//        //                        dataType: "Region",
//        //                        searchUrl: "http://ihotel.elong.com/SearchDataWindow_Region.html?datalength=10",  //写全路径
//        //                        hotUrl: "http://ihotel.elong.com/HotDataWindow_Region.html",
//        //                        hotTitle: "可搜索55000个城市",      //默认值：直接输入可搜索55000个城市
//        //                        onSelect: function (evt, item) {
//        //                            if (item.Data != null) {//非热门展示
//        //                                this.ihotelCityNameNew.val(item.Data.RegionName);
//        //                                this.ihotelCityNameNew.attr("RegionNameAlpha", item.Data.RegionNameAlpha);
//        //                            }
//        //                            if (this.ihotelCityNameNew.attr("CityId") != item.Value) {
//        //                                that.CreatePOISuggestDataWindow();
//        //                            }
//        //                            this.ihotelCityNameNew.attr("cityId", item.Value);
//        //                            this.ihotelPOIName.attr("cityid", item.Value);
//        //                            this.ihotelCityNameNew.removeClass("c999");
//        //                            this.ihotelPOIName.val("");
//        //                            this.ihotelCheckInDate.click();
//        //                        } .bind(this)
//        //                    }
//        //                );
//
//        this.iflightsrcCity = new CityWindow({
//            eventElement: this.iFlightSrcCityName,
//            hotType: "iflightsrc",
//            cityType: "iflightall",
//            isJsonp: "1",
//            lang: "cn",
//            resultNextId: "",
//            onSelect: function (evt, data) {
//                this.iFlightDestCityName.focus();
//                this.iFlightDestCityName.click();
//            } .bind(this)
//        });
//
//
//        this.iflightdestCity = new CityWindow({
//            eventElement: this.iFlightDestCityName,
//            hotType: "iflightdest",
//            cityType: "iflightall",
//            isJsonp: "1",
//            lang: "cn",
//            onSelect: function (evt, data) {
//                this.iFlightStartDate.focus();
//                this.iFlightStartDate.click();
//            } .bind(this)
//        });
//        //初始化火车票城市输入框
//        new SearchBoxClient({
//            options: {
//                serverTime: ElongNewIndexController.ServerTime2,
//                txtStartDate: this.trainSd,
//                Language: "CN",
//                txtStartStation: this.trainSc,
//                txtEndStation: this.trainEc,
//                btnChangeStation: this.trainSwap,
//                btnSearchTicket: this.trainSearchBtn,
//                chkIsMoveHighCar: this.trainIsHighCar,
//                chkIsHaveTicket: this.trainHaveTicket,
//                txtDateMouse: this.trainSd.next()
//            }
//        });
//
//    },
//
//    // 获取url中参数名为paraName的参数值：不区分大小写；没有此参数返回空；多个相同名称的参数，以第一个为准。
//    getUrlPara: function (url, paraName) {
//        var empty = "";
//        url = url.toLowerCase();
//        paraName = paraName.toLowerCase();
//        if (url.indexOf(paraName) == -1) {
//            return empty;
//        }
//        var urlArray = url.split("?");
//        if (urlArray.length <= 1) {
//            return empty;
//        }
//        var paraArray = urlArray[1].split("&");
//        for (var p in paraArray) {
//            var pArray = paraArray[p].split("=");
//            if (pArray.length <= 1) continue;
//            if (pArray[0] == paraName) {
//                return pArray[1];
//            }
//        }
//        return empty;
//    },
//
//    CreatePOISuggestDataWindow: function () {
//        var ihcn = this.ihotelCityNameNew;
//        if (this.ihotelCityNameNew.attr("cityId") != "") {
//            //开始初始化POI信息
//            this.ihotelPOIName.HotelSuggest("http://ihotel.elong.com/poisuggest.html", { matchSubset: false, formatItem: function (row) {
//                return row;
//            }, scroll: true, scrollHeight: 300, max: 10, mouseDownOnSelect: true, dataType: "jsonp", delay: 50, isSubmit: true,
//                extraParams: {
//                    "EnCode": "",
//                    "regionid": function () {
//                        return ihcn.attr("cityid");
//                    }
//                }
//            });
//        }
//    },
//
//    ///////////////////////////////设置初始化信息////////////////////////////////////////////////
//
//
//    ///////////////////////////////搜索框相关事件////////////////////////////////////////////////
//
//    OndvLeftClick: function (evt) {
//
//        var element = Event.element(evt);
//        var method = element.attr("method");
//        this.InitialCalender(element, method);
//        //        this.SearchRegionAction(element, method);
//        this.FlightSearchAction(element, method);
//        //        this.Search(element, method);
//
//    },
//    onSearchActionbtnClick: function (evt) {
//        var element = Event.element(evt);
//        var method = element.attr("method");
//        this.Search(element, method);
//    },
//    onFlightOneWayClick: function () {
//        //this.FlightEndDate.parent().prev("dt").css('color', '#CCC');
//        this.FlightEndDate.css('color', '#CCC');
//        this.FlightEndDate.val("yyyy-mm-dd");
//        this.FlightEndDate.parent().find("span").text(" ");
//    },
//    onFlightRoundClick: function () {
//        //this.FlightEndDate.parent().prev("dt").css("color", "#BA8A49");
//        this.FlightEndDate.css("color", "black");
//        if (!validator.valid(this.FlightEndDate.val(), "notEmpty & date")) {
//            var a = this.dateToString(this.dateAdd(this.stringToDate(ElongNewIndexController.ServerTime.substring(0, 10)), 6));
//            if (this.FlightEndDate.val() == "yyyy-mm-dd" && validator.valid(this.FlightStartDate.val(), "notEmpty & date")) {
//                var a = this.dateToString(this.dateAdd(this.stringToDate(this.FlightStartDate.val()), 3));
//            }
//            this.FlightEndDate.val(a);
//            this.FlightEndDate.removeClass("c999");
//            this.FlightEndDate.parent().find("span").text(this.GetWeekDay(a));
//        }
//    },
//    oniFlightRoundClick: function () {
//        //this.iFlightEndDate.parent().prev("dt").css("color", "#BA8A49");
//        this.iFlightEndDate.css("color", "black");
//        if (!validator.valid(this.iFlightEndDate.val(), "notEmpty & date")) {
//            var a = this.dateToString(this.dateAdd(this.stringToDate(ElongNewIndexController.ServerTime.substring(0, 10)), 6));
//            if (this.iFlightEndDate.val() == "yyyy-mm-dd" && validator.valid(this.iFlightStartDate.val(), "notEmpty & date")) {
//                var a = this.dateToString(this.dateAdd(this.stringToDate(this.iFlightStartDate.val()), 3));
//            }
//            this.iFlightEndDate.val(a);
//            this.iFlightEndDate.parent().find("span").text(this.GetWeekDay(a));
//        }
//    },
//    oniFlightOneWayClick: function () {
//        //this.iFlightEndDate.parent().prev("dt").css("color", "#CCC");
//        this.iFlightEndDate.css("color", "#CCC");
//        this.iFlightEndDate.val("yyyy-mm-dd");
//        this.iFlightEndDate.parent().find("span").text(" ");
//    },
//
//    //    //搜索框的相关UI操作
//    //    SearchRegionAction: function (element, method) {
//    //        if (element.attr("class") == "type" || element.attr("class") == "ml10 type") {
//    //            element = element.children("input");
//    //            method = element.attr("method");
//    //            element[0].checked = true;
//    //        }
//    //        switch (method) {
//    //            //选项卡（Hotel）                                                                                 
//    //            case "tabHotel":
//    //                if (this.tabFlight.attr("class") == "flights_action") {
//    //                    this.panelFlight.hide();
//    //                    this.tabFlight.removeClass("flights_action").addClass("flights");
//    //                }
//    //                if (this.tabTrain.attr("class") == "phone_action") {
//    //                    this.panelTrain.hide();
//    //                    this.tabTrain.removeClass("phone_action").addClass("phone");
//    //                }
//    //                element.addClass("hotels_action").removeClass("hotels");
//    //                this.navHotel.show();
//    //                this.navHotel.find("li[class='action']").click();
//    //                break;
//    //            //选项卡（Flight）                                                                                 
//    //            case "tabFlight":
//    //                if (this.tabHotel.attr("class") == "hotels_action") {
//    //                    this.panelHotel.hide();
//    //                    this.tabHotel.removeClass("hotels_action").addClass("hotels");
//    //                }
//    //                if (this.tabTrain.attr("class") == "phone_action") {
//    //                    this.panelTrain.hide();
//    //                    this.tabTrain.removeClass("phone_action").addClass("phone");
//    //                }
//    //                element.addClass("flights_action").removeClass("flights");
//    //                this.navFlight.show();
//    //                this.navFlight.find("li[class='action']").click();
//    //                break;
//    //            // 选显卡（App）=> 火车票                                                                                 
//    //            case "tabTrain":
//    //                if (this.tabHotel.attr("class") == "hotels_action") {
//    //                    this.panelHotel.hide();
//    //                    this.tabHotel.removeClass("hotels_action").addClass("hotels");
//    //                }
//    //                if (this.tabFlight.attr("class") == "flights_action") {
//    //                    this.panelFlight.hide();
//    //                    this.tabFlight.removeClass("flights_action").addClass("flights");
//    //                }
//    //                element.addClass("phone_action").removeClass("phone");
//    //                this.panelTrain.show();
//    //                break;
//    //            case "tagHotel":
//    //                element.addClass("action");
//    //                this.tagiHotel.removeClass("action");
//    //                this.dlHotel.show();
//    //                this.dliHotel.hide();
//
//    //                break;
//    //            case "tagiHotel":
//    //                element.addClass("action");
//    //                this.tagHotel.removeClass("action");
//    //                this.dlHotel.hide();
//    //                this.dliHotel.show();
//    //                break;
//    //            case "tagFlight":
//    //                element.addClass("action");
//    //                this.tagiFlight.removeClass("action");
//    //                this.dlFlight.show();
//    //                this.dliFlight.hide();
//    //                break;
//    //            case "tagiFlight":
//    //                element.addClass("action");
//    //                this.tagFlight.removeClass("action");
//    //                this.dlFlight.hide();
//    //                this.dliFlight.show();
//    //                //this.iFlightRound.attr("checked", "true");
//    //                this.iFlightRound.click();
//    //                break;
//    //            //            case "appSubmit":                                                                       
//    //            //                if (!this.checkAppMobile()) {                                                                       
//    //            //                    return false;                                                                       
//    //            //                }                                                                       
//    //            //                this.appSubmit.val("正在发送中...");                                                                       
//    //            //                this.appSubmit.addClass("zzfs");                                                                       
//    //            //                var mobile = this.appMobile.val().trim();                                                                       
//    //            //                ElongNewIndexController.SendAppSMS(mobile, function (res) {                                                                       
//    //            //                    if (res.success) {                                                                       
//    //            //                        this.liSubmit.html(this.smsSuccessHtml);                                                                       
//    //            //                    }                                                                       
//    //            //                    else {                                                                       
//    //            //                        alert(res.value);                                                                       
//    //            //                        this.appSubmit.val("发送下载地址");                                                                       
//    //            //                        this.appSubmit.removeClass("zzfs");                                                                       
//    //            //                    }                                                                       
//    //            //                } .bind(this));                                                                       
//    //            //                break;                                                                       
//
//    //            case "oneway":
//    //                this.FlightEndDate.parent().prev("dt").css('color', '#CCC');
//    //                this.FlightEndDate.css('color', '#CCC');
//    //                this.FlightEndDate.val("yyyy-mm-dd");
//    //                this.FlightEndDate.next("span").text(" ");
//    //                break;
//    //            case "round":
//    //                this.FlightEndDate.parent().prev("dt").css('color', '#BA8A49');
//    //                this.FlightEndDate.css('color', 'black');
//    //                if (!validator.valid(this.FlightEndDate.val(), "notEmpty & date")) {
//    //                    var date = this.dateToString(this.dateAdd(this.stringToDate(ElongNewIndexController.ServerTime.substring(0, 10)), 6));
//    //                    if (this.FlightEndDate.val() == "yyyy-mm-dd" && validator.valid(this.FlightStartDate.val(), "notEmpty & date")) {
//    //                        var date = this.dateToString(this.dateAdd(this.stringToDate(this.FlightStartDate.val()), 3));
//    //                    }
//    //                    this.FlightEndDate.val(date);
//    //                    this.FlightEndDate.next("span").text(this.GetWeekDay(date));
//    //                }
//    //                break;
//    //            case "ioneway":
//    //                this.iFlightEndDate.parent().prev("dt").css('color', '#CCC');
//    //                this.iFlightEndDate.css('color', '#CCC');
//    //                this.iFlightEndDate.val("yyyy-mm-dd");
//    //                this.iFlightEndDate.next("span").text(" ");
//    //                break;
//    //            case "iround":
//    //                this.iFlightEndDate.parent().prev("dt").css('color', '#BA8A49');
//    //                this.iFlightEndDate.css('color', 'black');
//    //                if (!validator.valid(this.iFlightEndDate.val(), "notEmpty & date")) {
//    //                    var date = this.dateToString(this.dateAdd(this.stringToDate(ElongNewIndexController.ServerTime.substring(0, 10)), 6));
//    //                    if (this.iFlightEndDate.val() == "yyyy-mm-dd" && validator.valid(this.iFlightStartDate.val(), "notEmpty & date")) {
//    //                        var date = this.dateToString(this.dateAdd(this.stringToDate(this.iFlightStartDate.val()), 3));
//    //                    }
//    //                    this.iFlightEndDate.val(date);
//    //                    this.iFlightEndDate.next("span").text(this.GetWeekDay(date));
//    //                }
//    //                break;
//    //            default:
//    //                break;
//    //        }
//    //    },
//
//    InitialCalender: function (element, method) {
//        if (element.is("span") && (element.prev("input").attr("class") == "txtDate" || element.prev("input").attr("class") == "txtDate l_black")) {
//            element = element.prev("input");
//            method = element.attr("method");
//        }
//        switch (method) {
//            //国内酒店入住日期                                                                                                                                            
//            case "txtHotelCheckInDate":
//                //如果是凌晨，日历框昨天日期可修改
//                var enabledFromDate = validator.reFormatDateString(this.NowDate);
//                if (this.CalendarShowYesterday == true) {
//                    var serverDate = validator.convertDate(this.NowDate);
//                    serverDate.setDate(serverDate.getDate() - 1);
//                    enabledFromDate = validator.reFormatDateString(serverDate.getFullYear() + "-" + (serverDate.getMonth() + 1) + "-" + serverDate.getDate());
//                }
//                new CalendarWindow({
//                    eventElement: element,
//                    enabledFrom: enabledFromDate,
//                    selectedDate: String.isNullOrEmpty(element.val()) ? this.NowDate : element.val(),
//                    language: "cn",
//                    onSelected: function (date) {
//                        element.val(date);
//                        var dateStart = validator.reFormatDateString(date);
//                        var dateEnd = validator.reFormatDateString($("#hotelCheckoutDate").val());
//                        if (dateStart >= dateEnd) {
//                            var edate = this.nextDay(date);
//                            $("#hotelCheckoutDate").val(edate);
//                            $("#hotelCheckoutDate").parent().find("span").text(this.GetWeekDayVer2(edate));
//                        }
//                        element.parent().find("span").text(this.GetWeekDayVer2(date));
//                    } .bind(this)
//                });
//                break;
//            case "txtHotelCheckoutDate":
//                new CalendarWindow({
//                    eventElement: element,
//                    selectedDate: String.isNullOrEmpty(element.val()) ? this.NowDate : element.val(),
//                    enabledFrom: this.nextDay(this.hotelCheckInDate.val()),
//                    language: "cn",
//                    onSelected: function (date) {
//                        element.val(date);
//                        element.focus();
//                        element.parent().find("span").text(this.GetWeekDay(date));
//                    } .bind(this)
//                });
//                break;
//
//            //国际酒店入住日期                                                                                                                                            
//            case "txtiHotelCheckInDate":
//                new CalendarWindow({
//                    eventElement: element,
//                    enabledFrom: this.NowDate,
//                    selectedDate: String.isNullOrEmpty(element.val()) ? this.NowDate : element.val(),
//                    language: "cn",
//                    onSelected: function (date) {
//                        element.val(date);
//                        var dateStart = validator.reFormatDateString(date);
//                        var dateEnd = validator.reFormatDateString($("#ihotelCheckoutDate").val());
//                        if (dateStart >= dateEnd) {
//                            var edate = validator.convertDate(date);
//                            edate = new Date(edate.setHours(24));
//                            edate = validator.reFormatDateString(edate.getFullYear() + "-" + (edate.getMonth() + 1) + "-" + edate.getDate());
//                            $("#ihotelCheckoutDate").val(edate);
//                            $("#ihotelCheckoutDate").parent().find("span").text(this.GetWeekDay(edate));
//                        }
//                        element.parent().find("span").text(this.GetWeekDay(date));
//                    } .bind(this)
//                });
//                break;
//            case "txtiHotelCheckoutDate":
//                new CalendarWindow({
//                    eventElement: element,
//                    selectedDate: String.isNullOrEmpty(element.val()) ? this.NowDate : element.val(),
//                    enabledFrom: this.nextDay(this.ihotelCheckInDate.val()),
//                    language: "cn",
//                    onSelected: function (date) {
//                        element.val(date);
//                        element.focus();
//                        element.parent().find("span").text(this.GetWeekDay(date));
//                    } .bind(this)
//                });
//                break;
//            case "txtFlightStartDate":
//
//                new CalendarWindow({
//                    eventElement: element,
//                    selectedDate: String.isNullOrEmpty(element.val()) ? this.NowDate : element.val(),
//                    enabledFrom: this.NowDate,
//                    language: "cn",
//                    onSelected: function (date) {
//                        element.val(date);
//                        var dateStart = validator.reFormatDateString(date);
//                        var dateEnd = validator.reFormatDateString(this.FlightEndDate.val());
//                        if (dateStart > dateEnd) {
//                            var edate = validator.convertDate(date);
//                            edate = new Date(edate.setHours(72));
//                            edate = validator.reFormatDateString(edate.getFullYear() + "-" + (edate.getMonth() + 1) + "-" + edate.getDate());
//                            this.FlightEndDate.val(edate);
//                            this.FlightEndDate.parent().find("span").text(this.GetWeekDay(edate));
//                        }
//                        element.parent().find("span").text(this.GetWeekDay(date));
//                        if (this.FlightRound[0].checked) {
//                            this.FlightEndDate.focus();
//                            this.FlightEndDate.click();
//                        }
//
//                    } .bind(this)
//                });
//
//                break;
//
//
//            case "txtFlightEndDate":
//                if (element.val() == "yyyy-mm-dd") {
//                    element.val("");
//                }
//
//                new CalendarWindow({
//                    eventElement: element,
//                    selectedDate: String.isNullOrEmpty(element.val()) ? this.NowDate : element.val(),
//                    enabledFrom: this.NowDate,
//                    language: "cn",
//                    onSelected: function (date) {
//                        element.val(date);
//                        element.focus();
//                        element.parent().find("span").text(this.GetWeekDay(date));
//                        if (this.FlightOneWay[0].checked) {
//                            this.FlightRound.click();
//                        }
//                        if (element.hasClass("c999")) {
//                            element.removeClass("c999");
//                        }
//                    } .bind(this)
//                });
//
//                break;
//            case "txtiFlightStartDate":
//
//                new CalendarWindow({
//                    eventElement: element,
//                    selectedDate: String.isNullOrEmpty(element.val()) ? this.NowDate : element.val(),
//                    enabledFrom: this.NowDate,
//                    language: "cn",
//                    onSelected: function (date) {
//                        element.val(date);
//                        var dateStart = validator.reFormatDateString(date);
//                        var dateEnd = validator.reFormatDateString(this.iFlightEndDate.val());
//                        if (dateStart > dateEnd) {
//                            var edate = validator.convertDate(date);
//                            edate = new Date(edate.setHours(72));
//                            edate = validator.reFormatDateString(edate.getFullYear() + "-" + (edate.getMonth() + 1) + "-" + edate.getDate());
//                            this.iFlightEndDate.val(edate);
//                            this.iFlightEndDate.parent().find("span").text(this.GetWeekDay(edate));
//                        }
//                        element.parent().find("span").text(this.GetWeekDay(date));
//                        if (this.iFlightRound[0].checked) {
//                            this.iFlightEndDate.focus();
//                            this.iFlightEndDate.click();
//                        }
//                    } .bind(this)
//                });
//
//                break;
//
//
//            case "txtiFlightEndDate":
//                if (element.val() == "yyyy-mm-dd") {
//                    element.val("");
//                }
//                new CalendarWindow({
//                    eventElement: element,
//                    selectedDate: String.isNullOrEmpty(element.val()) ? this.NowDate : element.val(),
//                    enabledFrom: this.NowDate,
//                    language: "cn",
//                    onSelected: function (date) {
//                        element.val(date);
//                        element.focus();
//                        element.parent().find("span").text(this.GetWeekDay(date));
//                        if (this.iFlightOneWay[0].checked) {
//                            this.iFlightRound.click();
//                        }
//                    } .bind(this)
//                });
//
//                break;
//            default:
//                break;
//        }
//
//    },
//
//    FlightSearchAction: function (element, method) {
//        switch (method) {
//            case "changeCity":
//                var destCity = this.FlightDestCityName[0].City;
//                var destCityName = this.FlightDestCityName.val();
//                this.FlightDestCityName[0].City = this.FlightSrcCityName[0].City;
//                this.FlightDestCityName.val(this.FlightSrcCityName.val());
//                this.FlightSrcCityName[0].City = destCity;
//                this.FlightSrcCityName.val(destCityName);
//                break;
//            case "ichangeCity":
//                var destCity = this.iFlightDestCityName[0].City;
//                var destCityName = this.iFlightDestCityName.val();
//                this.iFlightDestCityName[0].City = this.iFlightSrcCityName[0].City;
//                this.iFlightDestCityName.val(this.iFlightSrcCityName.val());
//                this.iFlightSrcCityName[0].City = destCity;
//                this.iFlightSrcCityName.val(destCityName);
//                break;
//            default:
//                break;
//        }
//    },
//
//    OnEnterKeyDowndvLeft: function (evt) {
//        if (evt.keyCode == 13) {
//            var dls = $(".cate_channel_option>.wrap_ts:visible");
//
//            if (dls.find(".keywords_wrap").length > 0) {
//                dls = dls.find(".keywords_wrap:visible");
//            }
//            if (!dls || dls.length < 1) return false;
//            $("ul[method='cityData']").find(".ac_over").click();
//            dls.find("[method^='search']").click();
//            return false;
//        }
//    },
//    Search: function (element, method) {
//        switch (method) {
//            case "searchHotel":
//                this.SearchHotel(element, this.serverDateStr, this.dateToString(this.dateAdd(this.stringToDate(this.serverDateStr), -1)));
//                break;
//            case "searchiHotel":
//                this.SearchiHotel(element);
//                break;
//            case "searchFlight":
//                this.SearchFlight(element);
//                break;
//            case "searchiFlight":
//                this.SearchiFlight(element);
//                break;
//            case "mapsearch":
//
//                var CityId = "0101";
//
//                var select = this.hotelCityName[0].City;
//                if (select != null) {
//                    CityId = select.CityId;
//                }
//                this.WriteHotelCookie();
//                window.location.href = this.HotelMapUrl.eval({ CityCode: CityId });
//
//                break;
//            default:
//                break;
//        }
//    },
//
//    OnHotelPlaceBlur: function (evt) {
//        var element = Event.element(evt);
//        if (String.isNullOrEmpty(element.val())) {
//            element.val(this.HotelPlaceDefaultName);
//            element.addClass("c999");
//        }
//    },
//
//    KeydownFunction: function (evt) {
//        var element = Event.element(evt);
//        var elementClass = element.attr("class").trim();
//        if (elementClass == "txT c9" || elementClass == "txT c9 com_input") {
//            element.removeClass("c999");
//            //return false;
//        }
//
//    },
//
//    OnHotelPlaceFocus: function (evt) {
//        var element = Event.element(evt);
//        if (element.val() == this.HotelPlaceDefaultName)
//            element.val("");
//    },
//
//    OnHotelNameBlur: function (evt) {
//        var element = Event.element(evt);
//        if (String.isNullOrEmpty(element.val())) {
//            element.val(this.HotelDefaultName);
//            element.addClass("c999");
//        }
//    },
//
//    OnHotelNameFocus: function (evt) {
//        var element = Event.element(evt);
//        if (element.val() == this.HotelDefaultName)
//            element.val("");
//    },
//
//    OniHotelNameBlur: function (evt) {
//        var element = Event.element(evt);
//        if (String.isNullOrEmpty(element.val())) {
//            element.val(this.iHotelDefaultName);
//            element.addClass("c999");
//        }
//        if (element.val() != this.iHotelDefaultName) {
//            element.removeClass("c999");
//            element.removeClass("com_input");
//
//        }
//    },
//
//    OniHotelNameFocus: function (evt) {
//        var element = Event.element(evt);
//        if (element.val() == this.iHotelDefaultName) {
//            element.val("");
//        }
//        else {
//            element.select();
//        }
//    },
//
//    OniHotelCityNameBlur: function (evt) {
//        var element = Event.element(evt);
//        if (String.isNullOrEmpty(element.val())) {
//            element.val(this.iHotelCityDefaultName);
//            element.addClass("c999");
//        }
//        if (element.val() != this.iHotelCityDefaultName) {
//            element.removeClass("c999");
//        }
//
//    },
//
//    OniHotelCityNameFocus: function (evt) {
//        var element = Event.element(evt);
//        if (element.val() == this.iHotelCityDefaultName)
//            element.val("");
//    },
//
//    OnDateBlur: function (evt) {
//        var element = Event.element(evt);
//        var date = element.val();
//        var method = element.attr("method");
//        if (!validator.valid(date, "notEmpty & date")) {
//            if (this.FlightOneWay[0].checked && method == "txtFlightEndDate" || this.iFlightOneWay[0].checked && method == "txtiFlightEndDate") {
//                element.val("yyyy-mm-dd");
//            }
//            else {
//                $error(element.parents("dd"), ElongNewIndexController.Resources.Validate_DateFormat);
//                return false;
//            }
//        }
//        else {
//            var weekDay = this.GetWeekDay(date);
//            //element.next().html(weekDay);
//            if (method == "txtFlightEndDate" && this.FlightOneWay[0].checked) {
//                this.FlightRound.click();
//            }
//            if (method == "txtiFlightEndDate" && this.iFlightOneWay[0].checked) {
//                this.iFlightRound.click()
//            }
//
//        }
//    },
//
//    OnFlightTypeLabelMouseOver: function (evt) {
//        var element = Event.element(evt);
//        element.css("cursor", "pointer");
//    },
//
//    OnDateBlurTrain: function (evt) {
//        var element = Event.element(evt);
//        var date = element.val();
//
//        if (!validator.valid(date, "notEmpty & date")) {
//            $error(element.parent("dd"), ElongNewIndexController.Resources.Validate_DateFormat);
//            return false;
//        }
//
//    },
//    ///////////////////////////////搜索框相关事件////////////////////////////////////////////////
//
//    //////////////////////My Record Tabs
//
//    OnMyRecordTabClick: function (evt) {
//
//        var element = Event.element(evt);
//        $(".tab_option span").removeClass("on");
//        $(element).addClass("on");
//
//        var index = parseInt($(element).attr("index"));
//        $(".smain_list").css("display", "none");
//        switch (index) {
//            case 2:
//                {
//                    $("#my_record_fav").css("display", "block");
//                    elongAjax.callBack(this.MyRecordFavJsonpUrl, {}, this.rendingMyRecordFav, true, "GET", false, "jsonp");
//                } break;
//            case 1:
//                {
//                    $("#my_record_comment").css("display", "block");
//                    elongAjax.callBack(this.MyRecordCommentJsonpUrl, {}, this.rendingMyWaitReview, true, "GET", false, "jsonp");
//                } break;
//            case 0:
//                {
//                    $("#my_record_history").css("display", "block");
//
//                    var hotelIds = this.GetBrowsingHistoryHotels();
//
//                    elongAjax.callBack(this.MyRecordHistroyJsonpUrl, { hotelids: hotelIds.toString() }, this.rendingMyBrowsingHistory, true, "GET", false, "jsonp");
//
//
//                } break;
//            default:
//                {
//                } break;
//        }
//    },
//    GetBrowsingHistoryHotels: function () {
//
//        var idString = Globals.cookie("SHBrowseHotel", "cn");
//        var hotelIds = new Array();
//        if (!idString || idString.split(";").length <= 0) {
//            return hotelIds;
//        }
//        $.each(idString.split(";"), function (i, item) {
//
//            if (i > 3) {
//                return;
//            }
//            var arr = item.split(",");
//            if (arr && arr.length > 1 && arr != "") {
//                hotelIds.push(arr[0]);
//            }
//        });
//        return hotelIds;
//    }
//    ,
//    OndisPlaneTricketTabs: function (evt) {
//        $("#discount_plane_trickets").html("");
//        var element = Event.element(evt);
//        element.parent().find("span").removeClass("on")
//        var a = element.attr("csn");
//        element.addClass("on");
//        $("#discount_plane_tricket").find(".loading_faile").hide();
//        $("#flight_loading").show();
//        $("#discount_plane_trickets").hide();
//
//        if (this.FlightPromotion && this.FlightPromotion.length > 0) {
//
//            for (var i = 0; i < this.FlightPromotion.length; i++) {
//
//                if (this.FlightPromotion[i].City == a) {
//
//                    this.RendingPlaneTricket(this.FlightPromotion[i].Data, a);
//                    return;
//                }
//            }
//        }
//
//        elongAjax.callBack(this.FlightJsonUrl, { city: a, recordcount: 6 }, function (f) {
//            this.RendingPlaneTricket(f, a);
//        } .bind(this), true, "GET", false, "jsonp");
//    },
//    OndisTrainTricketTabs: function (evt) {
//        var element = Event.element(evt);
//        var index = element.attr("index");
//        this.disTrainTricketTabs.removeClass("on");
//        element.addClass("on");
//        $("#discount_train_trickets>ul").hide();
//        $("#discount_train_trickets>ul:nth-child(" + index + ")").show();
//    },
//
//    RendingPlaneTricket: function (data, csn) {
//
//        $("#flight_loading").hide();
//        $("#discount_plane_trickets").show();
//
//        if (data != undefined && data.length > 0) {
//
//            var sb = new StringBuilder();
//            var temp = new Template($("#hide_plane_tick_temp").html());
//
//            for (i = 0; i < data.length; i++) {
//
//                sb.append(temp.eval({
//                    Price: data[i].Price
//              , FlyDate: this.FormatJsonDate(data[i].FlyDate)
//              , FromCityName: data[i].FromCityName
//              , ToCityName: data[i].ToCityName
//              , Discount: (data[i].Discount.toString().indexOf(".") > 0
//                           && data[i].Discount.toString().length > 3)
//                           ? data[i].Round(data[i].Discount, 1)
//                           : data[i].Discount
//              , URL: data[i].URL
//                }));
//            }
//
//            $("#discount_plane_trickets").append(sb.toString());
//            var d = { City: csn, Data: data };
//            if (this.FlightPromotion && this.FlightPromotion.length > 0) {
//
//                for (var i = 0; i < this.FlightPromotion.length; i++) {
//
//                    if (this.FlightPromotion[i].City == csn) {
//                        return;
//                    }
//                }
//            }
//            this.FlightPromotion.push(d);
//        }
//        else {
//            //没有取到
//            $("#discount_plane_trickets").hide();
//            $("#discount_plane_trickets").parent().append($("#hide_loading_failed").html());
//        }
//    },
//
//    OnHideMyRecords: function (evt) {
//        var element = Event.element(evt);
//        var myRecord = $(".my_record");
//        var isShow = $(element).hasClass("icon04a");
//        if (isShow) {
//            $(element).removeClass("icon04a");
//            myRecord.slideUp();
//        }
//        else {
//            $(element).addClass("icon04a");
//            myRecord.slideDown();
//        }
//    },
//
//    OnSearchTabsClick: function (evt) {
//        var element = Event.element(evt);
//        var e = element.parents("li")
//        var index = e.attr("index");
//        if (index == undefined) { return; }
//        if (element.parent().hasClass("last")) {
//            element.parent().next().addClass("emty2");
//        }
//        else {
//            element.parent().parent().find(".emty").removeClass("emty2");
//        }
//        this.searchTabs.removeClass("on");
//        this.LoadingPanel(index);
//        e.addClass("on");
//    },
//
//    ongo2HotelListClick: function (evt) {
//        this.GoSearchList(this.getSearchUrl(), null);
//    },
//
//    LoadingPanel: function (index) {
//        var panels = $(".cate_channel_option").children();
//        if (index > panels.length || index < 0 || index == undefined) {
//            return;
//        }
//        panels.hide();
//        var showPanel = panels[index]
//        $(showPanel).show();
//    },
//    LoadingHotelSubPanel: function (index) {
//
//        var panels = $("[panel='hotelSubPanel']");
//        panels.hide();
//        if (index > panels.length || index < 0) {
//            return;
//        }
//        $(panels[index]).show();
//    },
//    LoadingFlightSubPanel: function (index) {
//
//        var panels = $("[panel='flightSubPanel']");
//        panels.hide();
//        if (index > panels.length || index < 0) {
//            return;
//        }
//        if (index == 1) {
//            $("[name='iflighttype'][method='iround']").attr("checked", "checked");
//            this.iFlightEndDate.css("color", "black");
//            if (!validator.valid(this.iFlightEndDate.val(), "notEmpty & date")) {
//                var a = this.dateToString(this.dateAdd(this.stringToDate(ElongNewIndexController.ServerTime.substring(0, 10)), 6));
//                if (this.iFlightEndDate.val() == "yyyy-mm-dd" && validator.valid(this.iFlightStartDate.val(), "notEmpty & date")) {
//                    var a = this.dateToString(this.dateAdd(this.stringToDate(this.iFlightStartDate.val()), 3));
//                }
//                this.iFlightEndDate.val(a);
//                this.iFlightEndDate.parent().find("span").text(this.GetWeekDay(a));
//            }
//        }
//        $(panels[index]).show();
//
//    },
//    OnHotelSubTabClick: function (evt) {
//
//        this.hotelSubTabs.removeClass("on");
//        var element = Event.element(evt);
//        var span = element.parent();
//        span.addClass("on");
//        var index = span.attr("sub_index");
//        if (index < 0 || index > this.hotelSubTabs.length) {
//            return;
//        }
//        this.LoadingHotelSubPanel(index);
//    },
//    OnFlightSubTabsClick: function (evt) {
//        this.flightSubTabs.removeClass("on");
//        var element = Event.element(evt);
//        var span = element.parent();
//        span.addClass("on");
//        var index = span.attr("sub_index");
//        if (index < 0 || index > this.flightSubTabs.length) {
//            return;
//        }
//        this.LoadingFlightSubPanel(index);
//
//    },
//
//    ///////////////////////////////国内酒店搜索操作////////////////////////////////////////////////
//
//    SearchHotel: function (element, preday, nowday) {
//
//        if (!this.HotelSearchValid()) {
//            return;
//        }
//
//        this.WriteHotelCookie();
//
//        var textWord = jQuery.trim(this.hotelPlace.val());
//
//        textWord = this.replaceCharCode(textWord);
//        // var hotelNWord = jQuery.trim(this.hotelName.val());
//        // hotelNWord = this.replaceCharCode(hotelNWord);
//        if (this.GlobalData.Name == "") {
//            this.GlobalData = { Name: "", Type: 99, PropertiesId: 0, Lat: 0, Lng: 0, Accept: false };
//        }
//
//        if (!Object.isNull(this.hotelPlace[0].Data) && this.hotelPlace[0].Data.Accept == true) {
//
//            this.GlobalData = this.hotelPlace[0].Data;
//        }
//        else {
//
//            if (this.textWord.val().trim() == this.HotelPlaceDefaultName) {
//                if (this.GlobalData.Name == "") {
//                    this.GlobalData.Type = -1;
//                }
//            } else {
//                //添加判断没有接受推荐时的逻辑
//                if (this.textWord.val().trim() != "") {
//                    if (this.hotelPlace.attr("firstSType")) {
//                        this.GlobalData.Type = !String.isNullOrEmpty(this.hotelPlace.attr("firstSType")) ? parseInt(this.hotelPlace.attr("firstSType")) : 99;
//                        this.GlobalData.Lat = String.isNullOrEmpty(this.hotelPlace.attr("firstSLat")) ? "" : this.hotelPlace.attr("firstSLat");
//                        this.GlobalData.Lng = String.isNullOrEmpty(this.hotelPlace.attr("firstSLng")) ? "" : this.hotelPlace.attr("firstSLng");
//                        this.GlobalData.PropertiesId = this.hotelPlace.attr("firstSPId");
//                    } else {
//                        this.GlobalData.Type = 999;
//                    }
//                    this.GlobalData.Name += this.textWord.val().trim();
//                }
//            }
//        }
//
//        var url = this.getSearchUrl();
//
//        this.GoSearchList(url, element);
//    },
//
//
//    //获取Search所需url
//    getSearchUrl: function () {
//        var CityId = "0101";
//        var cityNameEn = "beijing";
//        var select = this.hotelCityName[0].City;
//        if (select != null) {
//            CityId = select.CityId;
//            cityNameEn = select.CityNameEn;
//        }
//        var url = "http://hotel.elong.com/search/list_cn_" + CityId + ".html";
//        if (ElongNewIndexController.WebCategory == "Online") {
//            url += (url.indexOf("?") != -1 ? "&" : "?") + "hotelsort=2"; //联盟默认按价格排序
//        }
//        url = this.GetUrlPattern(this.GlobalData, url, cityNameEn);
//        var urlParams = this.SetSearchReqstInfo(this.GlobalData, this.GlobalHotelNameData);
//        if (urlParams != "") {
//            url += (url.indexOf("?") != -1 ? "&" : "?") + urlParams;
//        }
//
//        var m = cityNameEn.indexOf("（");
//        var n = cityNameEn.indexOf("）");
//        if (m > -1 && n > -1) {
//            firstName = cityNameEn.substr(0, m);
//            secondName = cityNameEn.substr(m + 1, n - m - 1);
//            cityNameEn = firstName + "_" + secondName;
//        }
//        var data = this.GlobalData;
//
//        var sindex = -1;
//        var aioVal = this.textWord.val().trim() == this.HotelPlaceDefaultName ? "" : this.textWord.val();
//
//        if (this.GlobalData.Accept == "1" && !String.isNullOrEmpty(this.textWord.attr("selectIndex").toString())) {
//            sindex = parseInt(this.textWord.attr("selectIndex"));
//        }
//        url += (url.indexOf("?") != -1 ? "&" : "?") + 'aioIndex=' + sindex + "&aioVal=" + encodeURIComponent(aioVal);
//        return url;
//    },
//
//    GetUrlPattern: function (data, url, engname) {
//        var searchUrl = url;
//        engname = engname.toLowerCase();
//        switch (data.Type) {
//            //交通枢纽，地铁，热门景点，Poi数据                                                                                                                                            
//            case 1:
//            case 2:
//            case 4:
//            case 99:
//
//                //按地标查询，增加排序方式为 6
//
//                //                if (!Object.isNull(data.PropertiesId) && data.PropertiesId != "0") {
//                //                    searchUrl = this.HotelPlaceUrl.eval({ CityNameEn: engname, PlaceCode: data.PropertiesId });
//                //                }
//                if (this.hotelCity && this.hotelCity.city && this.hotelCity.city.eventElement[0] && this.hotelCity.city.eventElement[0].City)
//                    searchUrl = this.HotelPlaceUrl.eval({
//                        CityId: this.hotelCity.city.eventElement[0].City.CityId
//                    });
//
//
//
//
//                /**
//                if (!String.isNullOrEmpty(this.hotelPlace.val())) {
//                searchUrl += (searchUrl == "" ? "" : "&") + 'PoiName=' + encodeURIComponent(this.hotelPlace.val());
//                }
//                if (data.Lat != "" && data.Lng != "") {
//
//                searchUrl += (searchUrl == "" ? "" : "&") + 'StartLat=' + data.Lat + '&StartLng=' + data.Lng;
//                }
//                searchUrl += (searchUrl == "" ? "" : "&") + 'hotelsort=6'; //地标默认排序为距离
//
//                **/
//                break;
//
//            case 5:
//                searchUrl = this.HotelBrandUrl.eval({ CityNameEn: engname, BrandCode: data.PropertiesId });
//                //searchUrl += (searchUrl == "" ? "" : "&") + 'BrandId=' + data.PropertiesId + '&BrandName=' + encodeURIComponent(data.Name);
//                break;
//
//            default:
//
//                break;
//
//        }
//        return searchUrl;
//    },
//    //拆分AllInOne  添加酒店名称搜索框的数据
//    SetSearchReqstInfo: function (data, ndata) {
//        var searchUrl = "";
//        var textWord = this.hotelPlace.val();
//        if (data.Name != "") {
//            //searchUrl += (searchUrl == "" ? "" : "&") + 'IsNotAcceptRecommend=' + data.Accept;
//        }
//        //拆分AllInOne 分别根据两个框的数据的类型设置请求参数，如果类型不匹配参数为空
//        searchUrl += (searchUrl == "" ? "" : "&") + this.setRequestInfoByTypeOne(data);
//        //searchUrl += (searchUrl == "" ? "" : "&") + this.setRequestInfoByTypeTwo(ndata);
//        return searchUrl;
//    },
//
//
//    //拆分AllInOne 提取公共方法根据不同输入框内容的类型重设数据
//    setRequestInfoByTypeOne: function (data) {
//        var searchUrl = ""
//        switch (data.Type) {
//            //交通枢纽，地铁，热门景点，Poi数据                                                                                                                                            
//            //            case 1:                                                                                                                                            
//            //            case 2:                                                                                                                                            
//            //            case 4:                                                                                                                                            
//            case 99:
//
//                //按地标查询，增加排序方式为 6
//
//                if (!Object.isNull(data.PropertiesId) && data.PropertiesId != "0") {
//                    searchUrl += (searchUrl == "" ? "" : "&") + 'PoiId=' + data.PropertiesId;
//                }
//                if (!String.isNullOrEmpty(this.hotelPlace.val())) {
//                    searchUrl += (searchUrl == "" ? "" : "&") + 'PoiName=' + encodeURIComponent(this.hotelPlace.val());
//                }
//                if (data.Lat != "" && data.Lng != "") {
//
//                    searchUrl += (searchUrl == "" ? "" : "&") + 'StartLat=' + data.Lat + '&StartLng=' + data.Lng;
//                }
//                searchUrl += (searchUrl == "" ? "" : "&") + 'hotelsort=6'; //地标默认排序为距离
//
//
//                break;
//            //商圈                                                                                                                                            
//            case 3:
//
//                if (!String.isNullOrEmpty(data.Name)) {
//                    searchUrl += (searchUrl == "" ? "" : "&") + 'Keywords=' + encodeURIComponent(data.Name) + '&KeywordsType=999';
//                }
//                break;
//            //行政区                                                                                                                                            
//            case 6:
//
//                searchUrl += (searchUrl == "" ? "" : "&") + 'AreaId=' + data.PropertiesId + '&AreaType=2';
//                if (!String.isNullOrEmpty(data.Name)) {
//                    searchUrl += (searchUrl == "" ? "" : "&") + 'AreaName=' + encodeURIComponent(data.Name);
//                }
//                break;
//            //酒店品牌                                                                                                                                            
//            case 5:
//
//                //searchUrl += (searchUrl == "" ? "" : "&") + 'BrandId=' + data.PropertiesId + '&BrandName=' + encodeURIComponent(data.Name);
//                break;
//            //酒店名称                                                                                                                                            
//            case 9:
//
//                searchUrl += (searchUrl == "" ? "" : "&") + 'HotelName=' + encodeURIComponent(data.Name);
//                break;
//            case -1:
//                //用户什么都没有输入
//                break;
//            default:
//                if (!String.isNullOrEmpty(data.Name)) {
//
//                    searchUrl += (searchUrl == "" ? "" : "&") + 'Keywords=' + encodeURIComponent(data.Name) + '&KeywordsType=999' //+ data.Type;
//                }
//                break;
//
//        }
//        return searchUrl;
//    },
//
//    setRequestInfoByTypeTwo: function (data) {
//        var searchUrl = ""
//        switch (data.Type) {
//            //酒店品牌                                                                                                                                            
//            case 5:
//
//                searchUrl += (searchUrl == "" ? "" : "&") + 'BrandId=' + data.PropertiesId + '&BrandName=' + encodeURIComponent(data.Name);
//                break;
//            //酒店名称                                                                                                                                            
//            case 9:
//                searchUrl += (searchUrl == "" ? "" : "&") + 'HotelName=' + encodeURIComponent(data.Name);
//                break;
//            case -1:
//                //用户什么都没有输入
//                break;
//            default:
//                if (!String.isNullOrEmpty(data.Name)) {
//                    searchUrl += (searchUrl == "" ? "" : "&") + 'HotelName=' + encodeURIComponent(data.Name);
//                }
//                break;
//        }
//        return searchUrl;
//    },
//
//    //Hotel搜索校验输入
//    HotelSearchValid: function () {
//        //城市不能为空
//        if (!validator.valid(this.hotelCityName.val(), "notEmpty & nonSpecialSign")) {
//            $error(this.hotelCityName.parent("dd"), "请输入城市名称，且不可包含*&+等符号及阿拉伯数字。");
//            return false;
//        }
//        //城市不存在
//
//        if (Object.isNull(this.hotelCityName[0].City)) {
//            $error(this.hotelCityName.parent("dd"), "该城市名称不存在，请重新输入！");
//            return false;
//        }
//
//
//        //入住日期不能为空 或者格式不正确
//        if (!validator.valid(this.hotelCheckInDate.val(), "notEmpty & date")) {
//            $error(this.hotelCheckInDate.parents("dd"), "请输入有效的入住日期。");
//            return false;
//        }
//        //退房日期不能为空 或者格式不正确
//        if (!validator.valid(this.hotelCheckoutDate.val(), "notEmpty & date")) {
//            $error(this.hotelCheckoutDate.parents("dd"), "请输入有效的离店日期。");
//            return false;
//        }
//        //时间合法性验证
//
//
//        var StartDate = this.hotelCheckInDate.val();
//        var EndDate = this.hotelCheckoutDate.val();
//        var dateStart = validator.reFormatDateString(StartDate);
//        var dateEnd = validator.reFormatDateString(EndDate);
//
//        if (dateStart < this.NowDate && this.CalenderShowYesterday == false) {
//            $error(this.hotelCheckInDate.parents("dd"), "入住日期须晚于或者等于当天日期。");
//            return false;
//        }
//        if (dateEnd < this.NowDate) {
//            $error(this.hotelCheckoutDate.parents("dd"), "离店日期须晚于或者等于当天日期。");
//            return false;
//        }
//        var date = validator.convertDate(dateStart);
//        date = new Date(date.setHours(24));
//        if (!validator.valid(this.hotelCheckoutDate.val(), "notEmpty & dateRange", validator.getDateString(date), null)) {
//            $error(this.hotelCheckoutDate.parents("dd"), "离店日期须至少晚于入住日期1天。");
//            return false;
//        }
//        var checkAfteDays = this.daysBetween(dateStart, this.NowDate);
//        if (checkAfteDays > this.afterDays) {
//            $error(this.hotelCheckInDate.parents("dd"), "如果您需要预订" + dateStart + "的酒店，请致电：" + this.SiteTel + "，我们会竭诚为您服务。");
//            return false;
//        }
//        var checkInDays = this.daysBetween(dateStart, dateEnd);
//        if (checkInDays > this.inDays) {
//            $error(this.hotelCheckoutDate.parents("dd"), "如果您需要在酒店入住" + this.inDays + "天以上，请致电：" + this.SiteTel + "，我们会竭诚为您服务。");
//            return false;
//        }
//        return true;
//    },
//
//    ///////////////////////////////国内酒店搜索操作////////////////////////////////////////////////
//
//    ///////////////////////////////国际酒店搜索操作////////////////////////////////////////////////
//    SearchiHotel: function (evt) {
//
//        if (!this.iHotelSearchValidNew()) return; //页面合法性验证
//
//        var citycode = "68678448-0BC9-4DF9-BEED-C7AC46D82CEE";
//
//        var checkInDate = this.ihotelCheckInDate.val();
//        var checkOutDate = this.ihotelCheckoutDate.val();
//
//
//        citycode = this.ihotelCityNameNew.attr("cityid");
//        if (!citycode) return;
//
//        if (citycode == "178263") {
//            if (ElongNewIndexController.WebCategory == "Elong") {
//                window.location.href = "http://hotel.elong.com/hongkong/?indate=" + checkInDate + "&outdate=" + checkOutDate + "";
//                return;
//            }
//            else {
//                window.location.href = "http://travel.elong.com/hotel/hongkong/?campaign_id=" + ElongNewIndexController.CampaignId + "&indate=" + checkInDate + "&outdate=" + checkOutDate + "";
//                return;
//            }
//
//        }
//        if (citycode == "8724") {
//            if (ElongNewIndexController.WebCategory == "Elong") {
//                window.location.href = "http://hotel.elong.com/macau/?indate=" + checkInDate + "&outdate=" + checkOutDate + "";
//                return;
//            }
//            else {
//                window.location.href = "http://travel.elong.com/hotel/macau/?campaign_id=" + ElongNewIndexController.CampaignId + "&indate=" + checkInDate + "&outdate=" + checkOutDate + "";
//                return;
//            }
//        }
//        //入离店时间放到cookie中
//        var RoomPerson = 1;
//        var GlobalUrl = "";
//        Globals.cookie("GlobalHotel", "", { InDate: checkInDate, OutDate: checkOutDate });
//
//
//        //        var url = this.GlobalHotel_ListCity.eval({
//        //            citycode: citycode.replace(/\s/g, "")
//        //        });
//        //
//        //        if (hotelName == this.iHotelDefaultName) {
//        //            GlobalUrl = url;
//        //        }
//        //        else {
//        //            GlobalUrl = url + "?hotelname=" + encodeURIComponent(hotelName);
//        //        }
//
//        var cityName = this.ihotelCityNameNew.attr("regionnamealpha");
//        var url = String.format("http://ihotel.elong.com/list-{0}_{1}.html?CheckInDate={2}&CheckOutDate={3}&areaname={4}", encodeURIComponent(cityName), citycode, checkInDate, checkOutDate, encodeURIComponent(this.ihotelPOIName.val()));
//
//        this.GoSearchList(url, evt);
//    },
//
//
//    iHotelSearchValid: function () {
//
//        //城市不能为空
//        //if (!validator.valid(this.ihotelCityName.val(), "notEmpty & nonSpecialSign")) {
//        // $error(this.ihotelCityName, "请输入城市名称，且不可包含*&+等符号及阿拉伯数字。");
//        // return false;
//        //}
//
//        //城市不存在
//        if (Object.isNull(this.ihotelCityName[0].City) || this.ihotelCityName.val() == this.iHotelCityDefaultName) {
//            $error(this.ihotelCityName.parent("dd"), "该城市名称不存在，请重新输入！", "right", false);
//            return false;
//        }
//
//        //入住日期不能为空 或者格式不正确
//        if (!validator.valid(this.ihotelCheckInDate.val(), "notEmpty & date")) {
//            $error(this.ihotelCheckInDate.parents("dd"), "请输入有效的入住日期。");
//            return false;
//        }
//        //退房日期不能为空 或者格式不正确
//        if (!validator.valid(this.ihotelCheckoutDate.val(), "notEmpty & date")) {
//            $error(this.ihotelCheckoutDate.parents("dd"), "请输入有效的离店日期。");
//            return false;
//        }
//
//
//        if (this.ihotelName.val().indexOf("<") > 0 || this.ihotelName.val().indexOf(">") > 0) {
//            $error(this.ihotelName.parent("dd"), "酒店名称不可包含<>符号。");
//            return false;
//        }
//
//        //时间合法性验证
//
//
//
//        var StartDate = this.ihotelCheckInDate.val();
//        var EndDate = this.ihotelCheckoutDate.val();
//        var dateStart = validator.reFormatDateString(StartDate);
//        var dateEnd = validator.reFormatDateString(EndDate);
//
//        if (dateStart < this.NowDate) {
//            $error(this.ihotelCheckInDate.parents("dd"), "入住日期须晚于或者等于当天日期。");
//            return false;
//        }
//        if (dateEnd < this.NowDate) {
//            $error(this.ihotelCheckoutDate.parents("dd"), "离店日期须晚于或者等于当天日期。");
//            return false;
//        }
//        var date = validator.convertDate(dateStart);
//        date = new Date(date.setHours(24));
//        if (!validator.valid(this.ihotelCheckoutDate.val(), "notEmpty & dateRange", validator.getDateString(date), null)) {
//            $error(this.ihotelCheckoutDate.parents("dd"), "离店日期须至少晚于入住日期1天。");
//            return false;
//        }
//        var checkAfteDays = this.daysBetween(dateStart, this.NowDate);
//        if (checkAfteDays > this.ihotelAfterDays) {
//            $error(this.ihotelCheckInDate.parents("dd"), "如果您需要预订" + dateStart + "的酒店，请致电：" + this.SiteTel + "，我们会竭诚为您服务。");
//            return false;
//        }
//        var checkInDays = this.daysBetween(dateStart, dateEnd);
//        if (checkInDays > this.ihotelInDays) {
//            $error(this.ihotelCheckoutDate.parents("dd"), "如果您需要在酒店入住" + this.ihotelInDays + "天以上，请致电：" + this.SiteTel + "，我们会竭诚为您服务。");
//            return false;
//        }
//        return true;
//
//    },
//
//    //新增国际酒店搜索校验逻辑
//    iHotelSearchValidNew: function () {
//        var errormsgEmpty = "请输入目的地。";
//        if (!validator.valid(this.ihotelCityNameNew.val().replace(/\s/g, '').replace("目的地", ""), "notEmpty & nonSpecialSign")) {
//            $error(this.ihotelCityNameNew.parent("dd"), errormsgEmpty);
//            return false;
//        }
//
//        if (!validator.valid(this.ihotelCityNameNew.attr("cityId"), "notEmpty & nonSpecialSign")) {
//            $error(this.ihotelCityNameNew.parent("dd"), "抱歉，不支持该目的地。");
//            return false;
//        }
//
//        var dateFormat = "notEmpty & date";
//        if (!validator.valid(this.ihotelCheckInDate.val(), dateFormat)) {
//            $error(this.ihotelCheckInDate.parents("dd"), "请输入有效的入住日期。");
//            return false;
//        }
//
//        //退房日期不能为空 或者格式不正确
//        if (!validator.valid(this.ihotelCheckoutDate.val(), dateFormat)) {
//            $error(this.ihotelCheckoutDate.parents("dd"), "请输入有效的离店日期。");
//            return false;
//        }
//        if (!validator.valid(this.ihotelCheckInDate.val(), "notEmpty & dateRange", ElongNewIndexController.ServerTime2, "2099-1-1")) {
//            $error(this.ihotelCheckInDate.parents("dd"), "入住日期须晚于或者等于当天日期。");
//            return false;
//        }
//        if (!validator.valid(this.ihotelCheckoutDate.val(), "notEmpty & dateRange", ElongNewIndexController.ServerTime2, "2099-1-1")) {
//            $error(this.ihotelCheckoutDate.parents("dd"), "离店日期须至少晚于入住日期1天。");
//            return false;
//        }
//
//        var nowDate = ElongNewIndexController.ServerTime2;
//        var dateStart = validator.reFormatDateString(this.ihotelCheckInDate.val());
//        var dateEnd = validator.reFormatDateString(this.ihotelCheckoutDate.val());
//
//        if (dateStart < nowDate) {
//            $error(this.ihotelCheckInDate.parents("dd"), "入住日期须晚于或者等于当天日期。");
//            return false;
//        }
//
//        if (dateEnd < nowDate) {
//            $error(this.ihotelCheckoutDate.parents("dd"), "离店日期须至少晚于入住日期1天。");
//            return false;
//        }
//
//        var date = validator.convertDate(dateStart);
//        date = new Date(date.setHours(24));
//        if (!validator.valid(this.ihotelCheckoutDate.val(), "notEmpty & dateRange", validator.getDateString(date), null)) {
//            $error(this.ihotelCheckoutDate.parents("dd"), "离店日期须至少晚于入住日期1天。");
//            return false;
//        }
//
//        var error1 = "如果您要预订" + dateStart + "日期以后入住的酒店，请致电我们的客服：4009-333-333。";
//        var checkAfteDays = this.daysBetween(dateStart, validator.reFormatDateString(ElongNewIndexController.ServerTime2));
//        if (checkAfteDays > 360) {
//            $error(this.ihotelCheckoutDate.parents("dd"), error1);
//            return false;
//        }
//
//        var error2 = "如果您需要在酒店入住30天以上，请致电我们的客服：4009-333-333。";
//        var checkInDays = this.daysBetween(dateStart, dateEnd);
//        if (checkInDays > 30) {
//            $error(this.ihotelCheckoutDate.parents("dd"), error2);
//            return false;
//        }
//        return true;
//    },
//
//
//    ///////////////////////////////国际酒店搜索操作////////////////////////////////////////////////
//
//    ///////////////////////////////国内机票搜索操作////////////////////////////////////////////////
//    SearchFlight: function (evt) {
//        var flighType = 0;
//        if (this.FlightRound[0].checked) {
//            flighType = 1;
//        }
//        var ConditionValue;
//        var url = "";
//
//        var now = validator.convertDate(ElongNewIndexController.ServerTime.substring(0, 10));
//        var departDate = this.daysBetween(this.FlightStartDate.val(), this.dateToString(now));
//
//        if (flighType == 0) {
//            if (!this.ValidateOneWay()) return;
//
//
//            url = this.FlightOneWayUrl.eval({
//                departcity: this.filterCityNameEn(this.FlightSrcCityName[0].City.CityThreeSign.toLowerCase()),
//                arrivecity: this.filterCityNameEn(this.FlightDestCityName[0].City.CityThreeSign.toLowerCase()),
//                departdate: departDate
//            });
//
//            ConditionValue = {
//                "DateType": "Domestic",
//                "FType": flighType,
//                "DepCode": this.FlightSrcCityName[0].City.CityThreeSign,
//                "ArrCode": this.FlightDestCityName[0].City.CityThreeSign,
//                "DepDate": this.FlightStartDate.val(),
//                "DepName": encodeURIComponent(this.FlightSrcCityName[0].City.CityNameCn) + "|" + this.FlightSrcCityName[0].City.CityNameEn,
//                "ArrName": encodeURIComponent(this.FlightDestCityName[0].City.CityNameCn) + "|" + this.FlightDestCityName[0].City.CityNameEn
//            };
//        }
//        else {
//            if (!this.ValidateRound()) return;
//
//            var backDate = this.daysBetween(this.FlightEndDate.val(), this.dateToString(now));
//
//
//            url = this.FlightRoundUrl.eval({
//                departcity: this.filterCityNameEn(this.FlightSrcCityName[0].City.CityThreeSign.toLowerCase()),
//                arrivecity: this.filterCityNameEn(this.FlightDestCityName[0].City.CityThreeSign.toLowerCase()),
//                departdate: departDate,
//                backdate: backDate
//            });
//
//            ConditionValue = {
//                "DateType": "Domestic",
//                "FType": flighType,
//                "DepCode": this.FlightSrcCityName[0].City.CityThreeSign,
//                "ArrCode": this.FlightDestCityName[0].City.CityThreeSign,
//                "DepDate": this.FlightStartDate.val(),
//                "BackDate": this.FlightEndDate.val(),
//                "DepName": encodeURIComponent(this.FlightSrcCityName[0].City.CityNameCn) + "|" + this.FlightSrcCityName[0].City.CityNameEn,
//                "ArrName": encodeURIComponent(this.FlightDestCityName[0].City.CityNameCn) + "|" + this.FlightDestCityName[0].City.CityNameEn
//            };
//        }
//
//        //存储Cookie 跳转页面
//        Globals.cookie("FlightCondition", "", ConditionValue, { expires: 30, path: "/", secure: false });
//        this.GoSearchList(url, evt);
//        return true;
//    },
//
//    //验证单程输入数据
//    ValidateOneWay: function () {
//
//
//        if (!validator.valid(this.FlightSrcCityName.val(), "notEmpty")) {
//            $error(this.FlightSrcCityName.parent("dd"), ElongNewIndexController.Resources.Validate_DepartCityNull);
//            return false;
//        }
//        if (!validator.valid(this.FlightDestCityName.val(), "notEmpty")) {
//            $error(this.FlightDestCityName.parent("dd"), ElongNewIndexController.Resources.Validate_ArriveCityNull);
//            return false;
//        }
//
//        //城市不存在
//        if (Object.isNull(this.FlightSrcCityName[0].City)) {
//            $error(this.FlightSrcCityName.parent("dd"), ElongNewIndexController.Resources.Validate_NoDepartCity);
//            return false;
//        }
//
//        if (this.FlightSrcCityName[0].City.CityThreeSign == "") {
//            $error(this.FlightSrcCityName.parent("dd"), ElongNewIndexController.Resources.Validate_NoDepartCity);
//            return false;
//        }
//
//        if (Object.isNull(this.FlightDestCityName[0].City)) {
//            $error(this.FlightDestCityName.parent("dd"), ElongNewIndexController.Resources.Validate_NoArriveCity);
//            return false;
//        }
//
//        if (this.FlightDestCityName[0].City.CityThreeSign == "") {
//            $error(this.FlightDestCityName.parent("dd"), ElongNewIndexController.Resources.Validate_NoArriveCity);
//            return false;
//        }
//        //日期控件校验
//        if (!validator.valid(this.FlightStartDate.val(), "notEmpty & date")) {
//            $error(this.FlightStartDate.parents("dd"), ElongNewIndexController.Resources.Validate_DateFormat);
//            return false;
//        }
//
//        //判断相同城市
//        if (this.FlightSrcCityName.val().trim() == this.FlightDestCityName.val().trim()) {
//            $error(this.FlightSrcCityName.parent("dd"), ElongNewIndexController.Resources.Validate_SameCity);
//            return false;
//        }
//
//        //验证时间是否超过今天
//        var StartDate = this.FlightStartDate.val();
//        var dateStart = validator.reFormatDateString(StartDate);
//        if (dateStart < this.NowDate) {
//            $error(this.FlightStartDate.parents("dd"), ElongNewIndexController.Resources.Validate_BeforeToday);
//            return false;
//        }
//        //判断是否验证超过一年
//        if (dateStart > this.NextDate) {
//            $error(this.FlightStartDate.parents("dd"), "出发日期超出限制，请重新选择！");
//            return false;
//        }
//        return true;
//    },
//
//    //验证往返输入数据
//    ValidateRound: function () {
//        var validateOneWay = this.ValidateOneWay();
//        var validateRound = true;
//
//        if (!validator.valid(this.FlightEndDate.val(), "notEmpty & date")) {
//            $error(this.FlightEndDate.parents("dd"), ElongNewIndexController.Resources.Validate_DateFormat);
//            return false;
//        }
//        var StartDate = this.FlightStartDate.val();
//        var dateStart = validator.reFormatDateString(StartDate);
//        var EndDate = this.FlightEndDate.val();
//        var dateEnd = validator.reFormatDateString(EndDate);
//        if (dateEnd < this.NowDate) {
//            $error(this.FlightEndDate.parents("dd"), "返程日期不可早于今日，请重新选择！");
//            return false;
//        }
//        //判断是否验证超过一年
//        if (dateEnd > this.NextDate) {
//            $error(this.FlightEndDate.parents("dd"), ElongNewIndexController.Resources.Validate_LimitDate);
//            return false;
//        }
//        if (dateStart > dateEnd) {
//            $error(this.FlightEndDate.parents("dd"), ElongNewIndexController.Resources.Validate_DateCheck);
//            return false;
//        }
//        return validateOneWay && validateRound;
//    },
//
//    ///////////////////////////////国内机票搜索操作////////////////////////////////////////////////
//
//
//    ///////////////////////////////国际机票搜索操作////////////////////////////////////////////////
//    SearchiFlight: function (evt) {
//        var flighType = 0;
//        var nowDate = ElongNewIndexController.ServerTime.substring(0, 10);
//        if (this.iFlightRound[0].checked) {
//            flighType = 1;
//        }
//
//        var ConditionValue;
//
//        //单程与往返
//        if ((flighType == 0) || (flighType == 1)) {
//
//            if (!validator.valid(this.iFlightSrcCityName.val(), "notEmpty")) {
//                $error(this.iFlightSrcCityName.parent("dd"), ElongNewIndexController.Resources.Validate_DepartCityNull);
//                return;
//            }
//
//            //城市不存在
//            if (Object.isNull(this.iFlightSrcCityName[0].City)) {
//                $error(this.iFlightSrcCityName.parent("dd"), ElongNewIndexController.Resources.Validate_NoDepartCity);
//                return false;
//            }
//            if (!validator.valid(this.iFlightDestCityName.val(), "notEmpty")) {
//                $error(this.iFlightDestCityName.parent("dd"), ElongNewIndexController.Resources.Validate_ArriveCityNull);
//                return;
//            }
//
//            if (Object.isNull(this.iFlightDestCityName[0].City)) {
//                $error(this.iFlightDestCityName.parent("dd"), ElongNewIndexController.Resources.Validate_NoArriveCity);
//                return false;
//            }
//
//            if (!validator.valid(this.iFlightStartDate.val(), "notEmpty & date")) {
//                $error(this.iFlightStartDate.parents("dd"), ElongNewIndexController.Resources.Validate_DateFormat);
//                return;
//            }
//            if (this.iFlightSrcCityName.val().trim() == this.iFlightDestCityName.val().trim()) {
//                $error(this.iFlightSrcCityName.parent("dd"), ElongNewIndexController.Resources.Validate_SameCity);
//                return;
//            }
//
//
//            if (this.iFlightSrcCityName[0].City.ProvinceId == "Domestic" && this.iFlightDestCityName[0].City.ProvinceId == "Domestic") {
//                $error(this.iFlightSrcCityName.parent("dd"), ElongNewIndexController.Resources.DomesticCity);
//                return;
//            }
//
//
//            //验证时间是否超过今天
//            var StartDate = this.iFlightStartDate.val();
//            var dateStart = validator.reFormatDateString(StartDate);
//
//            if (dateStart < nowDate) {
//                $error(this.iFlightStartDate.parents("dd"), ElongNewIndexController.Resources.Validate_BeforeToday);
//                return;
//            }
//
//            var url = "";
//
//            var now = validator.convertDate(ElongNewIndexController.ServerTime.substring(0, 10));
//            var departDate = this.daysBetween(this.iFlightStartDate.val(), this.dateToString(now));
//
//            if (flighType == 0) {
//
//                    url = this.iFlightOneWayUrl.eval({
//                    departcity: this.iFlightSrcCityName[0].City.CityThreeSign.toLowerCase(),
//                    arrivecity: this.iFlightDestCityName[0].City.CityThreeSign.toLowerCase(),
//                    departdate: departDate
//                });
//
//                /*
//                ConditionValue = {
//                    "DateType": "Domestic",
//                    "FType": flighType,
//                    "DepCode": this.iFlightSrcCityName[0].City.CityThreeSign,
//                    "ArrCode": this.iFlightDestCityName[0].City.CityThreeSign,
//                    "DepDate": this.iFlightStartDate.val(),
//                    "BackDate": this.iFlightEndDate.val(),
//                    "DepName": encodeURIComponent(this.iFlightSrcCityName[0].City.CityNameCn) + "|" + this.iFlightSrcCityName[0].City.CityNameEn,
//                    "ArrName": encodeURIComponent(this.iFlightDestCityName[0].City.CityNameCn) + "|" + this.iFlightDestCityName[0].City.CityNameEn
//                };*/
//
//                var ConditionValue = {
//                    "DateType": "Domestic",
//                    "FT": flighType,
//                    "SC": this.iFlightSrcCityName[0].City.CityThreeSign,
//                    //"StartCityType": this.iFlightSrcCityName[0].City.CityType,
//                    "EC": this.iFlightDestCityName[0].City.CityThreeSign,
//                    //"EndCityType": this.iFlightDestCityName[0].City.CityType,
//                    "SD": this.iFlightStartDate.val(),
//                    "ED": this.iFlightEndDate.val(),
//                    //            "AirCorp": "ALL",
//                    //            "SeatLevel": this.iFlightClass[0].Data.Value,
//                    //            "PCount": "1",
//                    //            "CCount": "0",
//                    //            "AdultType": "0",
//                    "SCN": encodeURIComponent(this.iFlightSrcCityName[0].City.CityNameCn) + "|" + this.iFlightSrcCityName[0].City.CityNameEn,
//                    "ECN": encodeURIComponent(this.iFlightDestCityName[0].City.CityNameCn) + "|" + this.iFlightDestCityName[0].City.CityNameEn
//                };
//
//
//               /* url = this.iFlightList.eval({
//                    language: ElongNewIndexController.Language.toLowerCase(),
//                    pagename: "list",
//                    startcity: this.iFlightSrcCityName[0].City.CityThreeSign,
//                    endcity: this.iFlightDestCityName[0].City.CityThreeSign,
//                    startdate: validator.reFormatDateString(this.iFlightStartDate.val()),
//                    enddate: validator.reFormatDateString(this.iFlightStartDate.val()),
//                    adulttype: "0",
//                    aircorp: "ALL",
//                    passengercount: "1",
//                    childcount: "0",
//                    seatlevel: "Y"//this.iFlightClass[0].Data.Value
//                });*/
//
//            }
//            else {
//               
//                if (!validator.valid(this.iFlightEndDate.val(), "notEmpty & date")) {
//                    $error(this.iFlightEndDate.parents("dd"), ElongNewIndexController.Resources.Validate_DateFormat);
//                    return;
//                }
//                var EndDate = this.iFlightEndDate.val();
//                var dateEnd = validator.reFormatDateString(EndDate);
//
//                if (dateEnd < nowDate) {
//                    $error(this.iFlightEndDate.parents("dd"), "返程日期不可早于今日，请重新选择！");
//                    return;
//                }
//                if (dateStart > dateEnd) {
//                    $error(this.iFlightEndDate.parents("dd"), ElongNewIndexController.Resources.Validate_DateCheck);
//                    return;
//                }
//
//               
//
//                var backDate = this.daysBetween(this.iFlightEndDate.val(), this.dateToString(now));
//
//                url = this.iFlightRoundUrl.eval({
//                    departcity: this.iFlightSrcCityName[0].City.CityThreeSign.toString().toLowerCase(),
//                    arrivecity: this.iFlightDestCityName[0].City.CityThreeSign.toString().toLowerCase(),
//                    departdate: departDate,
//                    backdate: backDate
//                });
//
//                /*
//                ConditionValue = {
//                    "DateType": "Domestic",
//                    "FType": flighType,
//                    "DepCode": this.iFlightSrcCityName[0].City.CityThreeSign.toString(),
//                    "ArrCode": this.iFlightDestCityName[0].City.CityThreeSign.toString(),
//                    "DepDate": this.iFlightStartDate.val(),
//                    "BackDate": this.iFlightEndDate.val(),
//                    "DepName": encodeURIComponent(this.iFlightSrcCityName[0].City.CityNameCn) + "|" + this.iFlightSrcCityName[0].City.CityNameEn,
//                    "ArrName": encodeURIComponent(this.iFlightDestCityName[0].City.CityNameCn) + "|" + this.iFlightDestCityName[0].City.CityNameEn
//                };*/
//
//                var ConditionValue = {
//                    "DateType": "Domestic",
//                    "FT": flighType,
//                    "SC": this.iFlightSrcCityName[0].City.CityThreeSign,
//                    //"StartCityType": this.iFlightSrcCityName[0].City.CityType,
//                    "EC": this.iFlightDestCityName[0].City.CityThreeSign,
//                    //"EndCityType": this.iFlightDestCityName[0].City.CityType,
//                    "SD": this.iFlightStartDate.val(),
//                    "ED": this.iFlightEndDate.val(),
//                    //            "AirCorp": "ALL",
//                    //            "SeatLevel": this.iFlightClass[0].Data.Value,
//                    //            "PCount": "1",
//                    //            "CCount": "0",
//                    //            "AdultType": "0",
//                    "SCN": encodeURIComponent(this.iFlightSrcCityName[0].City.CityNameCn) + "|" + this.iFlightSrcCityName[0].City.CityNameEn,
//                    "ECN": encodeURIComponent(this.iFlightDestCityName[0].City.CityNameCn) + "|" + this.iFlightDestCityName[0].City.CityNameEn
//                };
//
//
//                /*
//                url = this.iFlightList.eval({
//                    language: ElongNewIndexController.Language.toLowerCase(),
//                    pagename: "golist",
//                    startcity: this.iFlightSrcCityName[0].City.CityThreeSign,
//                    endcity: this.iFlightDestCityName[0].City.CityThreeSign,
//                    startdate: validator.reFormatDateString(StartDate),
//                    enddate: validator.reFormatDateString(EndDate),
//                    adulttype: "0",
//                    aircorp: "ALL",
//                    passengercount: "1",
//                    childcount: "0",
//                    seatlevel: "Y"//this.iFlightClass[0].Data.Value
//                });*/
//
//            }
//        }
//
//        
//
//        Globals.cookie("Condition", "", ConditionValue, { expires: 30, path: "/", secure: false });
//
//
//        this.GoSearchList(url, evt);
//        return true;
//
//    },
//    ///////////////////////////////国际机票搜索操作////////////////////////////////////////////////
//
//    ///////////////////////////////机票特惠部分的操作////////////////////////////////////////////////
//
//    OndvFlightClick: function (evt) {
//        var element = Event.element(evt);
//        var method = element.attr("method");
//        if ((element.is("a") || element.is("span")) && (element.parents("li[method='city']").length > 0)) {
//            var city = element.parents("li[method='city']");
//            this.dvFlight.find("li[method='city']").removeClass("action");
//            city.addClass("action");
//
//            this.GetFlightPromotion(city.attr("csn"));
//
//        }
//    },
//
//    GetFlightPromotion: function (csn) {
//
//        if (this.FlightPromotion.length > 0 && this.LocalCache(csn) != null) {
//            var data = this.LocalCache(csn);
//            this.RenderPromotion(data.Data);
//        }
//        else {
//
//
//            // FunctionExt.defer(function () {
//            //            this.dvFlight.find("div[method='flightNone']").hide();
//            //            this.dvFlight.find("ul[method='flight']").html("");
//            //            this.dvFlight.find("div[method='flightloading']").show();
//
//            //} .bind(this), 50);
//
//
//            var url = "http://flight.elong.com/lowestdiscount.jsonp";
//            elongAjax.callBack(url, { city: csn, recordcount: 3 }, function (ret) {
//                this.dvFlight.find("div[method='flightloading']").hide();
//                var data = { City: csn, Data: [] };
//                if (ret != undefined) {
//                    for (var i = 0; i < ret.length; i++) {
//                        data.Data.push({
//                            Price: ret[i].Price,
//                            Date: this.FormatJsonDate(ret[i].FlyDate),
//                            StartCity: ret[i].FromCityName,
//                            EndCity: ret[i].ToCityName,
//                            Discount: ret[i].Discount,
//                            Url: ret[i].URL
//
//                        });
//                    }
//                }
//                this.FlightPromotion.push(data);
//                this.RenderPromotion(data.Data);
//            } .bind(this), true, "GET", false, "jsonp");
//        }
//
//    },
//    LocalCache: function (csn) {
//        if (this.FlightPromotion.length == 0)
//            return null;
//        for (var i = 0; i < this.FlightPromotion.length; i++) {
//            if (this.FlightPromotion[i].City == csn) {
//                return this.FlightPromotion[i];
//            }
//        }
//        return null;
//    },
//
//    //    RenderPromotion: function (data) {
//    //        if (data.length > 0) {
//    //            this.dvFlight.find("div[method='flightNone']").hide();
//    //        }
//    //        else {
//    //            this.dvFlight.find("div[method='flightNone']").show();
//    //        }
//    //        var sb = new StringBuilder();
//    //        for (var i = 0; i < data.length; i++) {
//    //            sb.append(
//    //                this.PromotionTempldate.eval(
//    //                    {
//    //                        Price: data[i].Price,
//    //                        Date: data[i].Date,
//    //                        StartCity: data[i].StartCity,
//    //                        EndCity: data[i].EndCity,
//    //                        Discount: (data[i].Discount.toString().indexOf(".") > 0 && data[i].Discount.toString().length > 3) ? this.Round(data[i].Discount, 1) : data[i].Discount,
//    //                        Url: data[i].Url
//    //                    }
//    //                )
//
//    //            );
//
//    //        }
//    //        this.dvFlight.find("ul[method='flight']").html(sb.toString());
//
//    //    },
//
//
//
//    ///////////////////////////////机票特惠部分的操作////////////////////////////////////////////////
//
//    ///////////////////////////////首页Poi信息的操作////////////////////////////////////////////////
//
//    //    OndvPoiTypeClick: function (evt) {
//    //        var element = Event.element(evt);
//    //        if (element.is("a"))
//    //            element = element.parents("li");
//    //        var method = element.attr("method");
//
//    //        switch (method) {
//    //            case "poitype":
//    //                var typeid = element.attr("typeid");
//    //                var index = element.attr("index");
//    //                var indexNum = index.substr(index.length - 1, 1);
//    //                var actionClass = this.dvPoi.find("div[method='detail'] i").attr("class");
//    //                var isHidden = this.dvPoi.find("div[method='detail']").is(":hidden");
//    //                if (index != "0-1" && (isHidden || actionClass != "action" + index)) {
//    //                    for (var i = 1; i < 9; i++) {
//    //                        this.dvPoi.find("div[method='dvPoiType'] li").removeClass("cate-" + i + "on");
//    //                    }
//    //                    element.addClass("cate-" + indexNum + "on");
//    //                    this.dvPoi.find("div[method='detail'] i").attr("class", "action" + index);
//    //                    var detailTemplate = new Template("<li><a href=\"#{Url}\" title=\"#{Name}\">#{Name}</a></li>");
//    //                    if (this.PoiData.PoiTypeList[typeid].PoiDetailList.length > 0) {
//    //                        this.dvPoi.find("ul[method='tag']").hide();
//    //                        var sbDetail = new StringBuilder();
//    //                        for (var detail in this.PoiData.PoiTypeList[typeid].PoiDetailList) {
//
//    //                            sbDetail.append(detailTemplate.eval({
//    //                                Url: this.PoiData.PoiTypeList[typeid].PoiDetailList[detail].Url,
//    //                                Name: this.PoiData.PoiTypeList[typeid].PoiDetailList[detail].PoiName
//    //                            }));
//    //                        }
//    //                        this.dvPoi.find("ul[method='poiDetail']").html(sbDetail.toString());
//    //                    }
//    //                    else {
//    //                        this.dvPoi.find("ul[method='tag']").show();
//    //                        var tagTemplate = new Template("<li #{Currnet}><a href=\"#?\" typeid=\"#{TypeId}\" tagid=\"#{TagId}\" method=\"poiTag\">#{TagName}</a></li>");
//    //                        var sbTag = new StringBuilder();
//    //                        var sbDetail = new StringBuilder();
//    //                        var currentCss = "class=\"cur\"";
//    //                        var i = 0;
//    //                        for (var p in this.PoiData.PoiTypeList[typeid].PoiTagList) {
//
//    //                            sbTag.append(tagTemplate.eval({
//    //                                TypeId: typeid,
//    //                                Currnet: i == 0 ? currentCss : "",
//    //                                TagId: p,
//    //                                TagName: this.PoiData.PoiTypeList[typeid].PoiTagList[p].PoiTagName
//    //                            }));
//
//    //                            if (i == 0) {
//
//    //                                for (var detail in this.PoiData.PoiTypeList[typeid].PoiTagList[p].PoiDetailList) {
//
//    //                                    sbDetail.append(detailTemplate.eval({
//    //                                        Url: this.PoiData.PoiTypeList[typeid].PoiTagList[p].PoiDetailList[detail].Url,
//    //                                        Name: this.PoiData.PoiTypeList[typeid].PoiTagList[p].PoiDetailList[detail].PoiName
//    //                                    }));
//    //                                }
//
//    //                            }
//
//    //                            i++;
//    //                        }
//    //                        this.dvPoi.find("ul[method='tag']").html(sbTag.toString());
//    //                        this.dvPoi.find("ul[method='poiDetail']").html(sbDetail.toString());
//
//    //                    }
//    //                    this.dvPoi.find("div[method='detail']").show();
//    //                    //
//    //                    $("html,body").animate({ scrollTop: $("div .adNo2").offset().top - 5 }, 800);
//    //                }
//    //                else {
//    //                    element.removeClass("cate-" + indexNum + "on");
//    //                    this.dvPoi.find("div[method='detail']").hide();
//    //                }
//    //                break;
//    //            default:
//    //                break;
//
//
//    //        }
//
//    //    },
//
//    //    OndvPoiDetailClick: function (evt) {
//
//    //        var element = Event.element(evt);
//    //        var method = element.attr("method");
//    //        switch (method) {
//    //            case "poiTag":
//
//    //                this.dvPoi.find("ul[method='tag'] li").removeClass("cur");
//    //                element.parents("li").addClass("cur");
//    //                var detailTemplate = new Template("<li><a href=\"#{Url}\">#{Name}</a></li>");
//    //                var sbDetail = new StringBuilder();
//    //                for (var detail in this.PoiData.PoiTypeList[element.attr("typeid")].PoiTagList[element.attr("tagid")].PoiDetailList) {
//
//    //                    sbDetail.append(detailTemplate.eval({
//    //                        Url: this.PoiData.PoiTypeList[element.attr("typeid")].PoiTagList[element.attr("tagid")].PoiDetailList[detail].Url,
//    //                        Name: this.PoiData.PoiTypeList[element.attr("typeid")].PoiTagList[element.attr("tagid")].PoiDetailList[detail].PoiName
//    //                    }));
//    //                }
//
//    //                this.dvPoi.find("ul[method='poiDetail']").html(sbDetail.toString());
//
//    //                break;
//    //            default:
//    //                break;
//
//
//    //        }
//    //    },
//    JsonNull: function (data) {
//        var isnull = true;
//        for (var p in data) {
//            isnull = false;
//            break;
//        }
//        return isnull;
//    },
//
//    //    RenderPoiType: function () {
//    //        var sb = new StringBuilder();
//    //        if (this.PoiData != null) {
//    //            var template = new Template("<li class=\"cate-#{CssId}\" typeid=\"#{TypeId}\" index=\"0#{Index}\" method=\"poitype\"><a href=\"#?\">#{TypeName}</a></li>");
//
//    //            for (var i = 0; i < this.PoiConfig.length; i++) {
//    //                if (this.PoiData.PoiTypeList[this.PoiConfig[i].PoiTypeId].PoiDetailList.length > 0 || !this.JsonNull(this.PoiData.PoiTypeList[this.PoiConfig[i].PoiTypeId].PoiTagList)) {
//    //                    sb.append(template.eval({
//    //                        CssId: i + 1,
//    //                        TypeId: this.PoiConfig[i].PoiTypeId,
//    //                        TypeName: this.PoiConfig[i].PoiTypeName,
//    //                        Index: i + 1
//
//    //                    }));
//
//    //                } else {
//
//    //                    sb.append(template.eval({
//    //                        CssId: (i + 1) + "a",
//    //                        TypeId: this.PoiConfig[i].PoiTypeId,
//    //                        TypeName: this.PoiConfig[i].PoiTypeName,
//    //                        Index: -1
//
//    //                    }));
//    //                }
//    //            }
//    //            this.dvPoi.find("ul[method='poiType']").html(sb.toString());
//
//    //        }
//    //    },
//
//    ///////////////////////////////首页Poi信息的操作////////////////////////////////////////////////
//
//
//    ///////////////////////////////公共操作////////////////////////////////////////////////////
//
//    CreateHotelNameBox: function (cityid) {
//        if (!Object.isNull(this.aioNameWind)) {
//            this.aioNameWind = null;
//        }
//        this.aioNameWind = new AiOWindow({
//            cityId: cityid,
//            resultNextId: "",
//            lang: "cn",
//            searchUrl: this.HotelAioSearchUrl,
//            hotUrl: this.HotelAioHotUrl,
//            eventElement: this.dvLeft.find("input[method='hotelName']"),
//            onSelect: function (evt, data) {
//                //处理选中后的事件
//                if (!Object.isNull(data.Type) && !Object.isNull(data.Name)) {
//                    this.isNameSelect = true;
//                    this.GlobalHotelNameData = data;
//                    if (evt.attr("class") == "txT c9") {
//                        evt.removeClass("c999");
//                    }
//                }
//            } .bind(this),
//
//            directSearch: function (tempData) {
//                //this.allInOne[0]["Data"] = tempData;
//                //this.m_search.trigger("click");
//            } .bind(this)
//
//            , isJsonp: "1", searchWidth: 340, aioType: 0
//        });
//    },
//
//    CreateAllInOneBox: function (cityid) {
//        if (!Object.isNull(this.aioWind)) {
//            this.aioWind = null;
//        }
//        //*#* cityId 取 this.tempCityId  //cityid
//        this.aioWind = new AiOWindow(
//            { cityId: cityid,
//                resultNextId: "",
//                lang: "cn",
//                searchUrl: this.HotelAioSearchUrl,
//                hotUrl: this.HotelAioHotUrl,
//                eventElement: $("input[method='place']"),
//                onSelect: function (evt, data) {
//                    //处理选中后的事件
//                    if (!Object.isNull(data.Type) && !Object.isNull(data.Name)) {
//                        this.isSelect = true;
//                        this.GlobalData = data;
//                        //this.hotelName.removeClass("c9");
//                        //alert("CreateAllInOneBox => selected");
//                    }
//                } .bind(this),
//
//                directSearch: function (tempData) {
//                    this.textWord[0]["Data"] = tempData;
//                    $("span[method='searchHotel']").trigger("click");
//
//                    // $("#m_contentend").html("");
//                } .bind(this),
//
//
//                isJsonp: "1", searchWidth: 340, aioType: 0
//            });
//    },
//
//    //Cookie操作
//    ReadHotelCookie: function () {
//        var ipAddress = ElongNewIndexController.IPAddress;
//        var cityInfo = { CityId: "0101", CityName: "北京", CityNameEn: "beijing", DataCheck: "0|0" };
//        var Searchcookie = Globals.cookie("ShHotel");
//        if (Searchcookie != null && Searchcookie != "" && String.isNullOrEmpty(ipAddress)) {
//            if (Globals.cookie("ShHotel", "CityName") != "" && Searchcookie.indexOf("CityName") > -1) {
//                cityInfo.CityName = Globals.cookie("ShHotel", "CityName");
//                if (Globals.cookie("ShHotel", "CityID") != "") {
//                    cityInfo.CityId = Globals.cookie("ShHotel", "CityID");
//                }
//                if (Globals.cookie("ShHotel", "CityNameEN") != "") {
//                    cityInfo.CityNameEn = Globals.cookie("ShHotel", "CityNameEN");
//                }
//            }
//            //            this.initPoiCity(cityInfo);
//        }
//        else {
//            ElongNewIndexController.GetLocalCity(ipAddress, function (ret) {
//                if (ret.success) {
//                    this.dvLeft.find("#hotelCity").val(ret.value.CityName);
//                    cityInfo.CityName = ret.value.CityName;
//                    cityInfo.CityId = ret.value.CityId;
//                    cityInfo.CityNameEn = ret.value.CityNameEn;
//                    //                    this.initPoiCity(cityInfo);
//                    this.CreateAllInOneBox(cityInfo.CityId);
//                    //this.CreateHotelNameBox(cityInfo.CityId);
//                    this.hotelCityName[0].City = { "CityId": cityInfo.CityId,
//                        "CityNameCn": cityInfo.CityName,
//                        "CityNameEn": cityInfo.CityNameEn
//                    };
//                }
//            } .bind(this))
//        }
//        return cityInfo
//    },
//
//    //        initPoiCity: function (cityInfo) {
//    //            FunctionExt.defer(function () {
//    //                ElongNewIndexController.GetPoiCity(cityInfo.CityId, cityInfo.CityNameEn, function (ret) {
//    //                    this.PoiData = ret.value;
//    //                    this.RenderPoiType();
//    //                } .bind(this));
//    //            } .bind(this), 500);
//    //        },
//
//    WriteHotelCookie: function () {
//        try {
//            Globals.cookie("ShHotel", "", { InDate: this.hotelCheckInDate.val(), OutDate: this.hotelCheckoutDate.val(), CityName: this.hotelCityName.val().replace(/"/g, /\"/g), CityID: this.hotelCityName[0].City.CityId });
//            if (this.hotelCityName[0].City && !Object.isNull(this.hotelCityName[0].City.CityNameCn)) {
//                Globals.cookie("ShHotel", "", { CityNameCN: this.hotelCityName[0].City.CityNameCn });
//            }
//            if (this.hotelCityName[0].City && !Object.isNull(this.hotelCityName[0].City.CityNameEn)) {
//                Globals.cookie("ShHotel", "", { CityNameEN: this.hotelCityName[0].City.CityNameEn });
//            }
//            //新增写入搜索历史cookie
//
//            var cityHisArr = [];
//            var citySearchList = Globals.cookie("CitySearchHistory");
//            if (citySearchList && citySearchList != "") {
//                cityHisArr = citySearchList.split("@");
//            }
//            if (this.hotelCityName[0] && this.hotelCityName[0].City) {
//                var strCity = String.format("{0}#{1}#{2}#{3}",
//                    this.hotelCityName[0].City.CityId
//                    , this.hotelCityName[0].City.CityNameCn
//                    , this.hotelCityName[0].City.CityNameEn
//                    , this.hotelCityName[0].City.CityNameEn.toLowerCase() == "beijing" ? "0|0" : this.hotelCity.eventElement.attr("datacheck")
//                );
//
//                var iscontain = function (cityid) {
//                    for (var i = 0; i < cityHisArr.length; i++) {
//                        var s = cityHisArr[i].split("#")[0];
//                        if (s == cityid) {
//                            return true;
//                        }
//                    }
//                    return false;
//                };
//                if (cityHisArr.length < 4) {
//                    if (!iscontain(this.hotelCityName[0].City.CityId)) {
//                        cityHisArr.push(strCity);
//                    }
//                }
//                else {
//                    if (!iscontain(this.hotelCityName[0].City.CityId)) {
//                        var tmparr = cityHisArr.slice(1, 4);
//                        tmparr.push(strCity);
//                        cityHisArr = tmparr;
//                    }
//                }
//            }
//            var ckstr = "";
//            for (var i = 0; i < cityHisArr.length; i++) {
//                if (i != cityHisArr.length - 1) {
//                    ckstr += cityHisArr[i] + "@";
//                }
//                else {
//                    ckstr += cityHisArr[i];
//                }
//            }
//            Globals.cookie("CitySearchHistory", "", ckstr,
//                {
//                    expires: 30,
//                    path: "/",
//                    secure: false
//                }
//            );
//        }
//        catch (e) {
//            console.log(e.message);
//        }
//    },
//
//    //iFlight相关的Cookie操作：
//    ReadiFlightCookie: function () {
//
//        var iflightCookie = Globals.cookie("Condition");
//        if (iflightCookie != null && iflightCookie != "") {
//            if (Globals.cookie("Condition", "FT") == "1") {
//
//                this.iFlightRound.click();
//            }
//            else {
//
//                this.iFlightOneWay.click();
//            }
//            var startCityName = String.isNullOrEmpty(Globals.cookie("Condition", "SCN")) ? "" : Globals.cookie("Condition", "SCN");
//            var endCityName = String.isNullOrEmpty(Globals.cookie("Condition", "ECN")) ? "" : Globals.cookie("Condition", "ECN");
//
//
//            if (!String.isNullOrEmpty(Globals.cookie("Condition", "SCN")) && Globals.cookie("Condition", "SCN").indexOf('=') == -1) {
//                var strDepart = Globals.cookie("Condition", "SCN");
//                var srcArray = strDepart.split("|");
//                if (!String.isNullOrEmpty(srcArray[0]) && !String.isNullOrEmpty(srcArray[1]) && srcArray[1] != "undefined") {
//                    this.iFlightSrcCityName.val(decodeURIComponent(srcArray[0]));
//                    this.iFlightSrcCityName.attr("CityName", decodeURIComponent(srcArray[1]));
//                    this.iFlightSrcCityName.attr("CityThreeSign", decodeURIComponent(Globals.cookie("Condition", "SC")));
//
//                }
//            }
//            if (!String.isNullOrEmpty(Globals.cookie("Condition", "ECN")) && Globals.cookie("Condition", "ECN").indexOf('=') == -1) {
//                var strArrive = Globals.cookie("Condition", "ECN");
//                var srcArray = strArrive.split("|");
//                if (!String.isNullOrEmpty(srcArray[0]) && !String.isNullOrEmpty(srcArray[1]) && srcArray[1] != "undefined") {
//                    this.iFlightDestCityName.val(decodeURIComponent(srcArray[0]));
//                    this.iFlightDestCityName.attr("CityName", decodeURIComponent(srcArray[1]));
//                    this.iFlightDestCityName.attr("CityThreeSign", decodeURIComponent(Globals.cookie("Condition", "EC")));
//
//                }
//            }
//
//
//
//            if (Globals.cookie("Condition", "SC") != "" && iflightCookie.indexOf("SC") >= 0) {
//
//                var nowDate = ElongNewIndexController.ServerTime.substring(0, 10);
//                var departdate = Globals.cookie("Condition", "SD").split("+");
//                if (departdate.length > 0) {
//                    if (this.getDateOffset(departdate[0], nowDate) > 0) {
//                        departdate[0] = this.dateToString(this.dateAdd(this.stringToDate(nowDate), 3));
//                    }
//                    this.iFlightStartDate.val(departdate[0]);
//                    this.iFlightStartDate.parent().find("span").text(this.GetWeekDay(departdate[0]));
//                }
//                //如果为往返的
//                if (this.iFlightRound[0].checked) {
//                    var backdate = Globals.cookie("Condition", "ED").split("+");
//                    if (backdate.length > 0) {
//                        var iFlightBackdate = this.GetBackDate(departdate[0], backdate[0]);
//                        if (this.getDateOffset(iFlightBackdate, nowDate) > 0) {
//                            iFlightBackdate = this.dateToString(this.dateAdd(this.stringToDate(nowDate), 6));
//                        }
//                        this.iFlightEndDate.val(iFlightBackdate);
//                        this.iFlightEndDate.parent().find("span").text(this.GetWeekDay(iFlightBackdate));
//                    }
//                }
//            }
//            // this.iflightClass.SetName(this.iFlightClass.val());
//            /// var seat = Globals.cookie("Condition", "SeatLevel");
//            //$("select[name='ClassType'][method='" + seat + "']").attr("selected", "selected");
//        }
//        else {
//            this.iFlightOneWay.click();
//        }
//    },
//
//    ReadFlightCookie: function () {
//        //Cookie 取值
//        var checkcookie = Globals.cookie("FlightCondition");
//
//        if (checkcookie != null && checkcookie != "") {
//            if (Globals.cookie("FlightCondition", "FType") == "1") {
//                this.FlightRound.click();
//            }
//            else {
//                this.FlightOneWay.click();
//            }
//            if (!String.isNullOrEmpty(Globals.cookie("FlightCondition", "DepName")) && Globals.cookie("FlightCondition", "DepName").indexOf('=') == -1) {
//                var strDepart = Globals.cookie("FlightCondition", "DepName");
//                var srcArray = strDepart.split("|");
//                if (!String.isNullOrEmpty(srcArray[0]) && !String.isNullOrEmpty(srcArray[1]) && srcArray[1] != "undefined") {
//                    this.FlightSrcCityName.val(decodeURIComponent(srcArray[0]));
//                    this.FlightSrcCityName.attr("CityName", decodeURIComponent(srcArray[1]));
//                    this.FlightSrcCityName.attr("CityThreeSign", decodeURIComponent(Globals.cookie("FlightCondition", "DepCode")));
//
//                }
//            }
//            if (!String.isNullOrEmpty(Globals.cookie("FlightCondition", "ArrName")) && Globals.cookie("FlightCondition", "ArrName").indexOf('=') == -1) {
//                var strArrive = Globals.cookie("FlightCondition", "ArrName");
//                var srcArray = strArrive.split("|");
//                if (!String.isNullOrEmpty(srcArray[0]) && !String.isNullOrEmpty(srcArray[1]) && srcArray[1] != "undefined") {
//                    this.FlightDestCityName.val(decodeURIComponent(srcArray[0]));
//                    this.FlightDestCityName.attr("CityName", decodeURIComponent(srcArray[1]));
//                    this.FlightDestCityName.attr("CityThreeSign", decodeURIComponent(Globals.cookie("FlightCondition", "ArrCode")));
//
//                }
//            }
//            //出发日期
//            var startDate = this.CookieDate("DepDate");
//            var nowDate = ElongNewIndexController.ServerTime.substring(0, 10);
//            if (this.getDateOffset(startDate, nowDate) > 0) {
//                startDate = this.dateToString(this.dateAdd(this.stringToDate(nowDate), 1));
//            }
//            this.FlightStartDate.val(startDate);
//            this.FlightStartDate.parent().find("span").text(this.GetWeekDay(startDate));
//
//            //到达日期
//            //如果为往返的
//            if (this.FlightRound[0].checked) {
//                var backdate = this.GetBackDate(this.CookieDate("DepDate"), this.CookieDate("BackDate"));
//                if (this.getDateOffset(backdate, nowDate) > 0) {
//                    backdate = this.dateToString(this.dateAdd(this.stringToDate(nowDate), 3));
//                }
//                this.FlightEndDate.val(backdate);
//                this.FlightEndDate.parent().find("span").text(this.GetWeekDay(backdate));
//            }
//
//            //this.flightClass.SetName(this.FlightClass.val());
//
//        }
//        else {
//            this.FlightOneWay.click();
//        }
//    },
//
//    GetBackDate: function (departDate, backDate) {
//        if (!departDate) {
//            return "";
//        }
//        var dtBack;
//        var dtDepart = validator.convertDate(departDate);
//        if (!backDate) {
//            dtBack = new Date(dtDepart.setHours(24 * 3));
//        }
//        else {
//            dtBack = validator.convertDate(backDate);
//        }
//        if (dtBack < dtDepart) {
//            dtBack = new Date(dtDepart.setHours(24 * 3));
//        }
//        return validator.reFormatDateString(validator.getDateString(dtBack));
//    },
//
//    //格式化Cookie中获取的日期，中文和英文的日期格式不同。
//    CookieDate: function (cookieKey, isIFlight) {
//        var sKey = "FlightCondition";
//        if (null != isIFlight && isIFlight) {
//            sKey = "Condition";
//        }
//        var showStartDate = Globals.cookie(sKey, cookieKey);
//
//
//        if (showStartDate.indexOf("/") > -1) {
//            var dayCount = this.getDateOffset(this.NowDate, validator.reFormatDateString(showStartDate));
//            if (dayCount < 0) {
//                showStartDate = validator.reFormatDateString(this.NowDate);
//            } else {
//                showStartDate = validator.reFormatDateString(showStartDate);
//            }
//        }
//
//        return showStartDate;
//    },
//    GoSearchList: function (url, event) {
//        // 繁体网站
//        if (window.location.host == "big5.elong.com") {
//            url = url.replace("http://", "http://big5.elong.com/gate/big5/");
//            url += url.indexOf("?") > 0 ? "&isbig5=true" : "?isbig5=true";
//        }
//        if (event) {
//            FunctionExt.defer(function () {
//                event.hide();
//                event.parent().find(".search_btn_on").show();
//
//            } .bind(this), 100);
//
//            FunctionExt.defer(function () {
//                event.show();
//                event.parent().find(".search_btn_on").hide();
//
//            } .bind(this), 1000);
//        }
//        window.location.href = url;
//    },
//
//    //日期操作相关函数 star
//    dateAdd: function (inputDate, number) {
//        inputDate.setDate(inputDate.getDate() + number);
//        return inputDate;
//    },
//    nextDay: function (date) {
//        var edate = validator.convertDate(date);
//        edate = new Date(edate.setHours(24));
//        edate = validator.reFormatDateString(edate.getFullYear() + "-" + (edate.getMonth() + 1) + "-" + edate.getDate());
//        return edate;
//    },
//    //获取天数据差
//    getDateOffset: function (date1, date2) {
//        var d1 = validator.convertDateTime(date1);
//        var d2 = validator.convertDateTime(date2);
//        return (d2.getTime() - d1.getTime()) / 86400000;
//    },
//    stringToDate: function (sDate) {
//        var bValidDate, year, month, day;
//        var iaDate = new Array(3);
//        iaDate = sDate.toString().split("-");
//        year = parseFloat(iaDate[0]);
//        month = parseFloat(iaDate[1]) - 1;
//        day = parseFloat(iaDate[2]);
//        return (new Date(year, month, day));
//    },
//    dateToString: function (targetDate) {
//        var tmpMonth, tmpDate;
//        if ((targetDate.getMonth() + 1) < 10) {
//            tmpMonth = "0" + (targetDate.getMonth() + 1);
//        }
//        else {
//            tmpMonth = targetDate.getMonth() + 1;
//        }
//        if (targetDate.getDate() < 10) {
//            tmpDate = "0" + (targetDate.getDate());
//        }
//        else {
//            tmpDate = targetDate.getDate();
//        }
//        return targetDate.getFullYear() + '-' + tmpMonth + '-' + tmpDate;
//    },
//
//    GetWeekDay: function (date) {
//        var arrWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
//
//        var dayString = this.NowDate;
//        var AbsDate = this.daysBetween(dayString, date);
//        if (AbsDate == 0) {
//            return "今天";
//        }
//        else if (AbsDate == 1) {
//            return "明天";
//        }
//        else if (AbsDate == 2) {
//            return "后天";
//        }
//        else {
//            var year = date.split('-')[0];
//            var month = date.split('-')[1];
//            var day = date.split('-')[2];
//            var weekDay = new Date(year, month - 1, day).getDay();
//            return arrWeek[weekDay];
//        }
//    },
//
//
//    //+---------------------------------------------------
//    //| 求两个时间的天数差 日期格式为 YYYY-MM-dd
//    //+---------------------------------------------------
//    daysBetween: function (DateOne, DateTwo) {
//        var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
//        var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
//        var OneYear = DateOne.substring(0, DateOne.indexOf('-'));
//        var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
//        var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
//        var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));
//        var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
//        return Math.abs(cha);
//    },
//
//
//    //日期操作相关函数 end
//
//    //+---------------------------------------------------
//    //| 求两个时间的天数差 日期格式为 YYYY-MM-dd
//    //| 新版直接返回 正负 间隔天数
//    //| Author:yuebing dong
//    //| Date:2013.07.24
//    //+---------------------------------------------------
//    daysBetweenVer2: function (DateOne, DateTwo) {
//        var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
//        var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
//        var OneYear = DateOne.substring(0, DateOne.indexOf('-'));
//        var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
//        var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
//        var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));
//        var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
//        return cha;
//    },
//    //国内酒店专用；修复选择昨天展示明天问题
//    //Author:yuebing dong
//    //Date:2013.07.24
//    GetWeekDayVer2: function (date) {
//        var arrWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
//
//        var dayString = this.NowDate;
//        var AbsDate = this.daysBetweenVer2(dayString, date);
//        if (AbsDate == 0) {
//            return "今天";
//        }
//        else if (AbsDate == -1) {
//            return "明天";
//        }
//        else if (AbsDate == -2) {
//            return "后天";
//        }
//        else {
//            var year = date.split('-')[0];
//            var month = date.split('-')[1];
//            var day = date.split('-')[2];
//            var weekDay = new Date(year, month - 1, day).getDay();
//            return arrWeek[weekDay];
//        }
//    },
//
//    //屏蔽特殊符号
//    replaceCharCode: function (str) {
//        return str.replace(/(!)/g, "").replace(/(~)/g, "").replace(/(@)/g, "").replace(/(#)/g, "").replace(/($)/g, "").replace(/(%)/g, "").replace(/(^)/g, "").replace(/(&)/g, "").replace(/(\*)/g, "").replace(/(！)/g, "").replace(/(~)/g, "").replace(/(@)/g, "").replace(/(#)/g, "").replace(/(￥)/g, "").replace(/(%)/g, "").replace(/(……)/g, "").replace(/(&)/g, "").replace(/(\*)/g, "");
//    },
//
//    FormatJsonDate: function (date) {
//        var tempdate = "";
//        var indexadd = date.indexOf("+");
//        tempdate = date.substring(6, indexadd);
//        var newDate = new Date();
//        newDate.setTime(tempdate);
//        var month = newDate.getMonth() + 1;
//        var day = newDate.getDate();
//        month = (month < 10) ? "0" + month : month;
//        day = (day < 10) ? "0" + day : day;
//        return month + "月" + day + "日";
//    },
//
//    Round: function (n, bit) {
//        //加上小数点后要扩充1位
//        var b = bit + 1;
//        //数字转为字符串
//        n = n.toString();
//        //获取小数点位置
//        var point = n.indexOf('.');
//        //n的长度大于保留位数长度
//        if (n.length > point + b) {
//            //保留小数后一位是否大于4，大于4进位
//            if (parseInt(n.substring(point + b, point + b + 1)) > 4) {
//                return n.substring(0, point) + "." + (parseInt(n.substring(point + 1, point + b)) + 1);
//            }
//            else {
//                return n.substring(0, point) + n.substring(point, point + b);
//            }
//        }
//        return n;
//    },
//    //过滤英文名称
//    filterCityNameEn: function (cityNameEn) {
//        var cityNameEnNew = cityNameEn.replace(/[^\d\w]/g, "_").toLowerCase();
//        while (cityNameEnNew.indexOf("__") != -1) {
//            cityNameEnNew = cityNameEnNew.replace("__", "_");
//        }
//        return cityNameEnNew;
//    },
//
//    rendingMyRecordFav: function (res) {
//        if (res.success) {
//            $(".no_record").hide();
//            var sb = new StringBuilder();
//            var counter = 0;
//            var temp = new Template($("#hide_fav_temp").html());
//
//            if (res.value && res.value.length <= 0) {
//                $("#my_record_favs").hide();
//                $("#my_record_no_fav").slideDown(1000);
//            }
//            $.each(res.value, function () {
//                
//                sb.append(
//                        temp.eval({ Address: this.SowntownName, Name: this.HotelName, Url: this.HotelUrl.replace("travel.elong.com/hotel", "hotel.elong.com"), Image_Url: this.HotelImg, Price: this.LowPrice })
//                    );
//            });
//            $("#my_record_favs").html("");
//            $("#my_record_favs").append(sb.toString());
//            $(".my_record").slideDown(1000);
//            $(".open_wrap >i").show();
//        }
//        else {
//            $(".my_record").hide();
//            $(".open_wrap >i").hide();
//            //展示登陆
//            $(".no_record").slideDown(1000);
//        }
//    },
//
//    rendingMyWaitReview: function (res) {
//        if (res.success) {
//
//            if (res.value.length <= 0) {
//                $("#my_record_comments").hide();
//                $("#my_record_no_comment").show();
//                return;
//            }
//            var sb = new StringBuilder();
//            var counter = 0;
//            var temp = new Template($("#hide_comment_temp").html());
//
//            for (var i = 0; i < res.value.length; i++) {
//                if (counter > 4) {
//                    break;
//                }
//                sb.append(temp.eval({ Name: res.value[i].HotelName, Url: res.value[i].CommentUrl.replace("travel.elong.com", "hotel.elong.com"), Image_Url: res.value[i].ImageUrl, Hotel_Url: res.value[i].HotelUrl.replace("travel.elong.com/hotel", "hotel.elong.com") })
//                        );
//                counter++;
//            }
//            if (counter > 0) {
//                $("#my_record_comments").html("");
//                $("#my_record_comments").append(sb.toString());
//                $("#my_record_comment").show();
//
//            }
//            else {
//                $("#my_record_comments").hide();
//                $("#my_record_no_comment").show();
//            }
//        }
//        else {
//            $(".my_record").hide();
//            $(".open_wrap >i").hide();
//            $(".no_record").show();
//        }
//    },
//
//    rendingMyBrowsingHistory: function (res) {
//        if (res.success) {
//            $("#no_record").hide();
//            //展示收藏 
//            if (res.value && res.value.length > 0) {
//                var sb = new StringBuilder();
//                $("#my_record_historys").html("");
//                $.each(res.value, function () {
//                    var temp = new Template($("#hide_fav_temp").html());
//                    var html = temp.eval({ Address: this.SowntownName, Name: this.HotelName, Url: this.HotelUrl.replace("travel.elong.com/hotel", "hotel.elong.com"), Image_Url: this.ImageUrl, Price: this.LowPrice });
//                    sb.append(html);
//                });
//                $("#my_record_historys").append(sb.toString());
//
//            }
//            else {
//                //没有收藏
//                $("#my_record_historys").hide();
//                $("#my_record_no_history").show();
//
//            }
//            $(".my_record").slideDown(1000);
//            $(".open_wrap >i").show();
//        }
//        else {
//
//            $(".my_record").hide();
//            $(".open_wrap >i").hide();
//            //展示登陆
//            $(".no_record").slideDown(1000);
//        }
//    },
//    ///////////////////////////////公共操作////////////////////////////////////////////////////
//
//    destroyEvent: function () {
//
//    },
//    render: function () {
//
//    },
//    destroyDOM: function () {
//
//    },
//    dispose: function () {
//        this.destroyEvent();
//        this.destroyDOM();
//    }
//
//});
//
//var client = null;
// 
//$ready(function () {
//    //请求服务器判断是否已经登陆，如果已经登陆返回登陆Jason
//    client = new ElongNewIndexClient();
//    $('.banner_wrap').unslider({ dots: true, fluid: true });
//
//    if ($('.my_record').length <= 0) {
//        return;
//    }
//    var hotelIds = client.GetBrowsingHistoryHotels();
//
//    elongAjax.callBack(client.MyRecordHistroyJsonpUrl, { hotelids: hotelIds.toString() }, client.rendingMyBrowsingHistory, true, "GET", false, "jsonp");
//    
//});
$('.banner_wrap').unslider({ dots: true, fluid: true });
