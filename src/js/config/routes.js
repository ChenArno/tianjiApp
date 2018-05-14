// 这里的后缀都是 .js 因为打包出来的都是js文件，而不是.vue文件，我们要告诉客户端跳转那个js

//  这里的路径和dev.json路径的区别
//  pages里面配置的是路由跳转的地址，也就是dev生成的 dist文件夹下的js bundle路径 从dist/js开始
//  dev.json 的 exports 需要打包的js地址，填入src的需要被打包成js bundle的地址   从src开始
//

//主模块一律不加title
import {_i18n} from './basic'

export default {
    'login': {
        url: '/pages/app/index.js'
    },
    'set': {
        title: _i18n.i18nT('设置'),
        url: '/pages/app/option/set.js'
    },
    'Apply': {
        title: _i18n.i18nT('申请试用'),
        url: '/pages/app/option/Apply.js'
    },
    'forget': {
        title: _i18n.i18nT('忘记密码'),
        url: '/pages/app/option/forget.js'
    },
    'goVar': {
        title: _i18n.i18nT('找回密码'),
        url: '/pages/app/option/goVar.js'
    },
    'phoneVar': {
        title: _i18n.i18nT('手机认证'),
        url: '/pages/app/option/phoneVar.js'
    },
    'setIp': {
        title: _i18n.i18nT('服务器设置'),
        url: '/pages/app/option/setIp.js'
    },
    'language': {
        title: _i18n.i18nT('语言设置'),
        url: '/pages/app/option/language.js'
    },
    'homePage': {
        url: '/pages/app/homePage/index.js'
    },
    'homePage.apply': {
        url: '/pages/app/homePage/apply.js'
    },
    'homePage.quick': {
        url: '/pages/app/homePage/quick.js'
    },
    'homePage.my': {
        url: '/pages/app/homePage/my.js'
    },
    'homePage.chat': {
        url: '/pages/app/homePage/chat.js'
    },
    'talks': {
        title: _i18n.i18nT('选择联系人'),
        url: '/pages/app/common/talks.js'
    },
    'talks.more': {
        title: _i18n.i18nT('联系人'),
        url: '/pages/app/common/talksMore.js'
    },
    'area': {
        title: _i18n.i18nT('区域选择'),
        url: '/pages/app/common/area.js'
    },
    'info.personal': {
        title: _i18n.i18nT('个人信息'),
        url: '/pages/app/info/personal.js'
    },
    'info.help': {
        title: _i18n.i18nT('帮助中心'),
        url: '/pages/app/info/help.js'
    },
    'info.about': {
        title: _i18n.i18nT('关于我们'),
        url: '/pages/app/info/about.js'
    },
    'info.email': {
        title: _i18n.i18nT('反馈意见'),
        url: '/pages/app/info/email.js'
    },
    'info.reset': {
        title: _i18n.i18nT('重置密码'),
        url: '/pages/app/info/reset.js'
    },
    'info.setting': {
        title: _i18n.i18nT('设置'),
        url: '/pages/app/info/setting.js'
    },
    'info.theme': {
        title: _i18n.i18nT('主题'),
        url: '/pages/app/info/theme.js'
    },
    'sysTemMon': {
        url: '/pages/app/sysTemMon/index.js'
    },
    'sysTemMon.alarmList': {
        title: _i18n.i18nT('报警列表'),
        url: '/pages/app/sysTemMon/alarmList.js'
    },
    'sysTemMon.review': {
        title: _i18n.i18nT('温湿度报警复核'),
        url: '/pages/app/sysTemMon/review.js'
    },
    'sysPasFlow': {
        url: '/pages/app/sysPasFlow/index.js'
    },
    'sysCustom': {
        url: '/pages/app/sysData/sysCustom.js'
    },
    'sysGoods': {
        url: '/pages/app/sysData/sysGoods.js'
    },
    'sysOpera': {
        url: '/pages/app/sysData/sysOpera.js'
    },
    'sysStaff': {
        url: '/pages/app/sysData/sysStaff.js'
    },

    'sysCruiseShop': {
        url: '/pages/app/sysCruiseShop/index.js'
    },
    'sysCruiseShop.shopTally': {
        title: _i18n.i18nT('门店点检'),
        url: '/pages/app/sysCruiseShop/shopTally.js'
    },
    'sysCruiseShop.shopVideo': {
        url: '/pages/app/sysCruiseShop/shopVideo.js'
    },
    'sysCruiseShop.planList': {
        title: _i18n.i18nT('点检计划'),
        url: '/pages/app/sysCruiseShop/planList.js'
    },
    'sysCruiseShop.planTask': {
        title: _i18n.i18nT('待检任务'),
        url: '/pages/app/sysCruiseShop/planTask.js'
    }
}
