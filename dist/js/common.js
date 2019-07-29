"use strict";

var url = "http://192.168.0.117/api/";
// var longitude = "";
// var latitude = "";
// var city = "";


$(".newurl").on("click", function () {

  var url = $(this).attr("url");
  var parm = $(this).attr("data");
  if (!url) {
    return;
  }

  if (parm) {
    parm = parseQueryString(parm);
  }

  api.openWin({
    name: url,
    url: url,
    pageParam: parm
  });
});

$(".newurllogin").on("click", function () {
  if (!login()) {
    return;
  }
  var url = $(this).attr("url");
  var parm = $(this).attr("data");
  if (!url) {
    return;
  }
  if (parm) {
    parm = parseQueryString(parm);
  }
  api.openWin({
    name: url,
    url: url,
    pageParam: parm
  });
});

$('.mui-action-back,.icon-jiantou-left').on('click', function () {
  api.closeWin();
});

function login() {
  var userId = $api.getStorage("userId");
  if (!userId) {
    api.openWin({
      name: 'login',
      url: '../my/login.html',
      pageParam: {
        name: 'test'
      }
    });
    return false;
  }
  return true;
}

function chenjinshi() {
  if (api.statusBarAppearance) {
    var header = document.querySelector('header');
    var safeArea = api.safeArea.top;
    var hh = safeArea / 100 + 0.4 + "rem";
    $('header').css('padding-top', safeArea);
    $('.main').css('padding-top', safeArea);
  }
}
var apiready = function apiready() {

  var systemType = api.systemType; // 获取手机类型，比如： ios
  //api_init()
};
var parseQueryString = function parseQueryString(url) {
  //获取参数链接转为json    传的参数格式例如  ajax  id=1&msg=2
  reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g, ret = {};
  var str_para = url,
      result;
  while ((result = reg_para.exec(str_para)) != null) {
    ret[result[1]] = result[2];
  }
  return ret;
};
function reload() {
  window.location.reload();
}

function loading() {
  $('body').append('<div id="loading"></div>');
  $("#loading").on('touchmove', function (e) {
    e.preventDefault(); //阻止默认行为
  });
}

function removeloading() {
  $("#loading").fadeOut(1000).remove();
}

function loadingone() {
  var UILoading = api.require('UILoading');
  UILoading.flower({
    center: {
      x: api.winWidth / 2.0,
      y: api.winHeight / 2.0
    },
    size: 30,
    fixed: true
  }, function (ret) {
    id = ret.id;
  });
}
function removeloadingone() {
  var uiloading = api.require('UILoading');
  uiloading.closeFlower({
    id: id
  });
}

/*错误回调*/
function error() {
  api.toast({
    msg: '网络错误'
  });
}

/*关闭loading*/
function close() {
  setTimeout(function () {
    api.hideProgress();
  }, 100);
}

function bi() {
  api.addEventListener({
    name: 'swiperight'
  }, function (ret, err) {
    api.closeWin();
  });
}

/*暂无数据*/
function nodata() {
  api.toast({
    msg: '暂无数据'
  });
}

/*rem适配*/
(function (designWidth, maxWidth) {
  var doc = document,
      win = window,
      docEl = doc.documentElement,
      remStyle = document.createElement("style"),
      tid;

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    maxWidth = maxWidth || 540;
    width > maxWidth && (width = maxWidth);
    var rem = width * 100 / designWidth;
    remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
  }

  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(remStyle);
  } else {
    var wrap = doc.createElement("div");
    wrap.appendChild(remStyle);
    doc.write(wrap.innerHTML);
    wrap = null;
  }
  refreshRem();

  win.addEventListener("resize", function () {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }, false);

  win.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);

  if (doc.readyState === "complete") {
    doc.body.style.fontSize = "16px";
  } else {
    doc.addEventListener("DOMContentLoaded", function (e) {
      doc.body.style.fontSize = "16px";
    }, false);
  }
})(375, 1024);

/*打开loading*/
function open(title, text, modal) {
  setTimeout(function () {
    title = title || '正在加载...';
    text = text || '请稍等...';
    modal = modal || true;
    api.showProgress({
      title: title,
      text: text,
      modal: modal
    });
  }, 100);
}

/*关闭loading*/
function close() {
  setTimeout(function () {
    api.hideProgress();
  }, 100);
}

function dropDown() {
  api.setRefreshHeaderInfo({
    bgColor: '#fff',
    textDown: '下拉刷新...',
    textUp: '松开刷新...'
  }, function (ret, err) {
    setTimeout(function () {
      window.location.reload();
      api.refreshHeaderLoadDone();
    }, 1000);
  });
}

//加载中
function loadUILoading() {
  var UILoading = api.require('UILoading');
  UILoading.keyFrame({
    rect: {
      w: 80,
      h: 100
    },
    styles: {
      bg: 'rgba(0,0,0,0.5)',
      corner: 5,
      interval: 100,
      frame: {
        w: 50,
        h: 50
      }
    },
    content: [{
      "frame": "widget://image/dropdown_anim_00.png"
    }, {
      "frame": "widget://image/dropdown_anim_01.png"
    }, {
      "frame": "widget://image/dropdown_anim_02.png"
    }, {
      "frame": "widget://image/dropdown_anim_03.png"
    }, {
      "frame": "widget://image/dropdown_anim_04.png"
    }, {
      "frame": "widget://image/dropdown_anim_05.png"
    }, {
      "frame": "widget://image/dropdown_anim_06.png"
    }, {
      "frame": "widget://image/dropdown_anim_07.png"
    }, {
      "frame": "widget://image/dropdown_anim_08.png"
    }, {
      "frame": "widget://image/dropdown_anim_09.png"
    }, {
      "frame": "widget://image/dropdown_loading_00.png"
    }, {
      "frame": "widget://image/dropdown_loading_01.png"
    }, {
      "frame": "widget://image/dropdown_loading_02.png"
    }]
  });
}

//关闭加载
function closeUILoading() {
  var uiloading = api.require('UILoading');
  uiloading.closeKeyFrame();
}

// /*获取定位信息*/
// function getCityLonLat() {
//   var bMap = api.require('bMap');
//   if (api.systemType === 'ios') {
//     bMap.initMapSDK(); //ios初始化地图
//   }
//   bMap.getLocation({
//     accuracy: '100m',
//     autoStop: true,
//     filter: 1
//   }, function(ret, err) {
//     if (ret.status) {
//       longitude = ret.lon;
//       latitude = ret.lat;
//       bMap.getNameFromCoords({
//         lat: ret.lat,
//         lon: ret.lon,
//       }, function(rett, errt) {
//         if (rett.status) {
//           city = rett.city;
//         }
//       });
//     }
//   });
// }

/*回到顶部*/
function backtop(juli1, juli2, sudu) {
  /*创建元素*/
  var body = document.querySelector('body');
  var div = document.createElement('div');
  div.className = 'top';
  div.innerHTML = '<img src="../../image/top.png">';
  body.appendChild(div);

  /*滚动监听*/
  window.onscroll = function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var top = juli1 || document.documentElement.clientHeight;
    if (scrollTop >= top) {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  };

  /*点击事件*/
  div.onclick = function () {
    var top = juli2 || 0;
    var count = sudu || 20;
    var timer = setInterval(function () {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (document.documentElement.scrollTop) {
        document.documentElement.scrollTop = scrollTop - count;
      } else {
        document.body.scrollTop = scrollTop - count;
      }
      if (scrollTop <= top) {
        clearInterval(timer);
      }
    });
  };
}

//封装请求
var ajaxData = function ajaxData(purl, data, callback, methods) {
  api.ajax({
    url: url + purl,
    method: methods || 'get',
    data: {
      values: data
    }
  }, function (ret, err) {
    callback(ret, err);
  });
};

function getnodata(text1, src1) {
  function NodataLayer(text, src) {
    var imgSrc = src ? src : "../../image/hint/goods_hint.png";
    var tips = text ? text : '暂无数据';
    this.init = function () {
      this.render();
    };
    this.render = function () {
      var str = '<div class="no_data"><img src="' + imgSrc + '"/>' + '<div class="no_data_text">' + tips + '</div></div>';
      var ele = document.createElement('div');
      ele.innerHTML = str;
      $(ele).appendTo(".main");
      //document.body.appendChild(ele)         
    };
    this.init();
    this.hide = function () {
      $('.no_data').hide();
    };
    this.show = function () {
      $('.no_data').show();
    };
  }
  var nodatalayer = new NodataLayer(text1, src1);
  return nodatalayer;
}

function rem(designWidth, maxWidth) {
  var doc = document,
      win = window,
      docEl = doc.documentElement,
      remStyle = document.createElement("style"),
      tid;

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    maxWidth = maxWidth || 540;
    width > maxWidth && (width = maxWidth);
    var rem = width * 100 / designWidth;
    remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
  }

  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(remStyle);
  } else {
    var wrap = doc.createElement("div");
    wrap.appendChild(remStyle);
    doc.write(wrap.innerHTML);
    wrap = null;
  }
  refreshRem();

  win.addEventListener("resize", function () {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }, false);

  win.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);

  if (doc.readyState === "complete") {
    doc.body.style.fontSize = "16px";
  } else {
    doc.addEventListener("DOMContentLoaded", function (e) {
      doc.body.style.fontSize = "16px";
    }, false);
  }
}
rem(375, 1024);

/*沉浸式*/
function immersion() {
  if (api.statusBarAppearance) {
    var $header = $('.header');
    var height = $header.innerHeight();
    var safeArea = api.safeArea.top;
    height += safeArea;
    $header.css('height', height);
    $('.content').css('margin-top', height);
    $api.fixStatusBar($header[0]);
  }
}