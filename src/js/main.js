require("src/index.html");
require("src/css/package.scss");

require("swiper/dist/css/swiper.css");
require("swiper/dist/js/swiper.js");

var Preloader = require("preloader.js");

/**
 * init
 */
function init() {
  scaleW = window.innerWidth / 320;
  scaleH = window.innerHeight / 480;
  var resizes = document.querySelectorAll(".resize");
  for (var j = 0; j < resizes.length; j++) {
    resizes[j].style.width = parseInt(resizes[j].style.width) * scaleW + "px";
    resizes[j].style.height = parseInt(resizes[j].style.height) * scaleH + "px";
    resizes[j].style.top = parseInt(resizes[j].style.top) * scaleH + "px";
    resizes[j].style.left = parseInt(resizes[j].style.left) * scaleW + "px";
  }
  var scales = document.querySelectorAll(".txt");
  for (var i = 0; i < scales.length; i++) {
    ss = scales[i].style;
    ss.webkitTransform = ss.MsTransform = ss.msTransform = ss.MozTransform = ss.OTransform = ss.transform =
      "translateX(" +
      (scales[i].offsetWidth * (scaleW - 1)) / 2 +
      "px) translateY(" +
      (scales[i].offsetHeight * (scaleH - 1)) / 2 +
      "px)scaleX(" +
      scaleW +
      ") scaleY(" +
      scaleH +
      ") ";
  }

  var mySwiper = new Swiper("#o2_swiper", {
    direction: "vertical",
    mousewheelControl: true,
    onInit: function(swiper) {
      // swiperAnimateCache(swiper);
      // swiperAnimate(swiper);
    },
    onSlideChangeEnd: function(swiper) {
      // swiperAnimate(swiper);
    }
  });

  $(".bottom").click(function() {
    $("#upload").click();
  });

  $("#upload").on("change", function() {
    console.log(this.files[0]);
    var imgSize = this.files[0].size; //b
    if (imgSize > 1024 * 1024 * 1) {
      //1M
      return alert("上传图片不能超过1M");
    }
    if (
      this.files[0].type != "image/png" &&
      this.files[0].type != "image/jpeg" &&
      this.files[0].type != "image/gif"
    ) {
      return alert("图片上传格式不正确");
    }

    var formFile = new FormData();
    // formFile.append("type", type);
    // formFile.append("content", content);
    // formFile.append("mobile", mobile);

    formFile.append("file", this.files[0], this.files[0].name);

    $.ajax({
      url: "http://zsh.petope.com/sba/up.php",
      type: "POST",
      data: formFile,
      async: true,
      cache: false,
      contentType: false,
      processData: false,
      // traditional:true,
      dataType: "json",
      success: function(res) {
        console.log(res);
      }
    });
  });
}

/**
 * preloader && start
 */
var preloader = new Preloader({
  resources: [],
  perMinTime: 1000 // 加载每个资源所需的最小时间，一般用来测试 loading
});
preloader.addProgressListener(function(loaded, length) {
  console.log("loaded", loaded, length, loaded / length);
});
preloader.addCompletionListener(function() {
  $("#o2_loading").remove();
  $("#o2_main").removeClass("hide");

  init();
});
preloader.start();
