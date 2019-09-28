/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = '';
let routerMode = 'hash';
let baseImgPath;
let testUrl = '';

let fuckUrl = '';
if (process.env.NODE_ENV == 'development') {
	baseUrl = '';
    baseImgPath = '/img/';
     // testUrl = "http://139.9.198.72:8082";
    // testUrl = "http://192.168.56.97:8082";
     testUrl = 'http://172.26.209.58:8082';
    //testUrl = 'http://172.26.64.152:8083';

}else{
	baseUrl = '//elm.cangdu.org';
    baseImgPath = '//elm.cangdu.org/img/';
    // testUrl = "http://172.26.224.114:8082";
    // testUrl = "http://139.9.198.72:8082";
    testUrl = "http://localhost:8082";
}

export {
	baseUrl,
	routerMode,
	baseImgPath,
    testUrl
}
