module.exports = {
    'appName': 'tianjiapp',
    'appBoard': '/config/index.js',
    // android 监听全局事件homeBack 如果为true 安卓端需要自行调用router.finish方法来关闭应用
    'androidIsListenHomeBack': 'true',
    'version': {
        'android': '1.0.0',
        'iOS': '1.0.0'
    },
    'page': {
        'homePage': '/pages/app/index.js',
        'mediatorPage': '/mediator/index.js',
        'navBarColor': '#ffffff', //原生导航条的默认颜色
        'navItemColor': '#040000' // 原生导航栏字体颜色
    },
    'url': {
        // 'jsServer': 'http://192.168.7.51:8889',
        'image': 'http://192.168.7.51:8889/sys/load/uploadUserAuatar',
        'bundleUpdate': 'http://localhosts:3001/app/check'
    },
    'zipFolder': {
        'iOS': '/ios/WeexEros/WeexEros',
        'android': '/android/WeexFrameworkWrapper/app/src/main/assets'
    },
    'getui': {
        'enabled': 'true',
        'appId': 'AGyG9olDRU8XxL5uDlHEY4',
        'appKey': 'W31jxL0oHD9z2Ki9Pn5uP5',
        'appSecret': 'uo3idYpoKr8O5A1rnHlRC6'
    },
    'umeng': {
        'enabled': 'false',
        'iOSAppKey': '',
        'androidAppKey': ''
    },
    'wechat': {
        'enabled': 'true',
        'appId': 'wxa853840258ae3a4c',
        'appSecret': 'aa07dc3a3364bb87a43b0bced70da117'
    },
    'amap': {
        'enabled': 'true',
        'iOSAppKey': '8fa4865a7ade74f0802e0e1ae0893194',
        'androidAppKey': '98f336037d77365810ec3c62324cb8e7'
    }
}
