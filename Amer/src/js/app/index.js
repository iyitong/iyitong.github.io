var Index = function(){

	//引入模板，执行模板函数，返回拼接后的html
	var under = __inline('../../template/index.tmpl');

	//执行函数，返回对应html
	var html = under({
	    "title":'欢迎使用baiduTemplate',
	    "list":[
	        'test1:默认支持HTML转义，如输出<script>，也可以关掉，语法<:=value> 详见API',
	        'test2:',
	        'test3:',
	        'test4:list[5]未定义，模板系统会输出空'
	    ]
	});

	//如果是测试环境，__DEBUG为true，否则为false
    if(__DEBUG){
        console.log(1);
    }
    //获取cdn-path或者cdn-path-release的值，具体要看是测试或者发布环境
    var img = __CDNPATH + "images/1.jpg";

	//js中引用路径问题
	var img_url = __uri('../../data/demo.png');
    
    
    //统一引用分享信息
    var shareUrl = $("#share_url").html();
    var sharePic = $("#share_pic").attr("data-src");
    var shareTxt = $("#share_desc").html();
    var shareTitle = $("#share_title").html();
    nie.use(["nie.util.shareV3"],function(){
            var share = nie.util.share({
                fat:"#share",
                type:1,
                title: shareTxt,
                img: sharePic 
            }); 
        });

}();