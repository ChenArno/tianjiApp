// appBoard，mediator 不建议进行修改 如果修改了 也请对应修改
module.exports = {
    'eslint': false,
    'webpackWarnings': false,
    'exports': [
        // appBoard
        'js/config/index.js',
        // mediator
        'js/mediator/index.vue',
        //app
        'js/pages/app/index.vue',
        //---option
        'js/pages/app/option/set.vue',
        'js/pages/app/option/Apply.vue',
        'js/pages/app/option/forget.vue',
        'js/pages/app/option/goVar.vue',
        'js/pages/app/option/phoneVar.vue',
        'js/pages/app/option/setIp.vue',
        'js/pages/app/option/language.vue',
        //homePage
        'js/pages/app/homePage/index.vue',
        'js/pages/app/homePage/apply.vue',
        'js/pages/app/homePage/chat.vue',
        'js/pages/app/homePage/my.vue',
        'js/pages/app/homePage/quick.vue',
        //common
        'js/pages/app/common/talks.vue',
        'js/pages/app/common/talksMore.vue',
        'js/pages/app/common/area.vue',
        //info
        'js/pages/app/info/personal.vue',
        'js/pages/app/info/help.vue',
        'js/pages/app/info/about.vue',
        'js/pages/app/info/email.vue',
        'js/pages/app/info/reset.vue',
        'js/pages/app/info/setting.vue',
        'js/pages/app/info/theme.vue',

        'js/pages/app/sysTemMon/index.vue',
        'js/pages/app/sysTemMon/review.vue',
        'js/pages/app/sysTemMon/alarmList.vue',
        'js/pages/app/sysPasFlow/index.vue',
        'js/pages/app/sysData/sysCustom.vue',
        'js/pages/app/sysData/sysGoods.vue',
        'js/pages/app/sysData/sysOpera.vue',
        'js/pages/app/sysData/sysStaff.vue',
        'js/pages/app/sysCruiseShop/index.vue',
        'js/pages/app/sysCruiseShop/planList.vue',
        'js/pages/app/sysCruiseShop/planTask.vue',
        'js/pages/app/sysCruiseShop/shopTally.vue',
        'js/pages/app/sysCruiseShop/shopVideo.vue'
    ],
    'alias': {
        'Components': 'js/components',
        'Common': 'js/common',
        'Config': 'js/config',
        'Widget': 'js/widget',
        'Pages': 'js/pages',
        'Utils': 'js/utils',
        'Locals': 'js/locals',
        'api':'js/api'
    },
    'diff': {
        'pwd': '/Users/yangmingzhe/Work/opensource/eros-diff-folder',
        'proxy': 'https://app.weex-eros.com/source'
    },
    'server': {
        'path': './',
        'port': 8889
    },
    'mockServer': {
        'port': 52077,
        'mockDir': './dist/mock'
    },
    'socketServer': {
        'port': 8890,
        'switch': true
    }
}
