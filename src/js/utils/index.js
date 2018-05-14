import Storage from 'Config/storage'
import {_i18n} from 'Config/basic'
const storag = new Storage();

const dateType = [
    'YYYY',
    'MM',
    'DD',
    'HH',
    'mm',
    'ss'
];
const dateMap = {
    YYYY: 'getYear',
    MM: 'getMonth',
    DD: 'getDate',
    HH: 'getHours',
    mm: 'getMinutes',
    ss: 'getSeconds'
};

const dateFn = {
    getYear: (time) => {
        return time.getFullYear()
    },
    getMonth: (time) => {
        const month = time.getMonth() + 1
        return addZero(month)
    },
    getDate: (time) => {
        const day = time.getDate()
        return addZero(day)
    },
    getHours: (time) => {
        const hour = time.getHours()
        return addZero(hour)
    },
    getMinutes: (time) => {
        const minute = time.getMinutes()
        return addZero(minute)
    },
    getSeconds: (time) => {
        const second = time.getSeconds()
        return addZero(second)
    }
};

function addZero(num) {
    if (num < 10) 
        num = '0' + num
    return num
}

const format = (date, type) => {
    const time = date
        ? new Date(date)
        : new Date()
    let placeholder = type
    dateType.forEach((val) => {
        if (type.indexOf(val) > -1) {
            const trueValue = dateFn[dateMap[val]](time)
            placeholder = placeholder.replace(val, trueValue)
        }
    })
    return placeholder
};

const setDays = (date, type, num) => {
    const time = date
        ? new Date(date)
        : new Date();
    type === 'add'
        ? time.setDate(time.getDate() + num)
        : time.setDate(time.getDate() - num);
    return time;
};
const dateFormat = (date, fmt = 'YYYY-MM-DD HH:mm:ss') => {
    if (!date) {
        return ''
    }
    if (typeof date === 'string') {
        date = new Date(date.replace(/-/g, '/'))
    }
    if (typeof date === 'number') {
        date = new Date(date)
    }
    var o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours() % 12 === 0
            ? 12
            : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
    }
    var week = {
        '0': '\u65e5',
        '1': '\u4e00',
        '2': '\u4e8c',
        '3': '\u4e09',
        '4': '\u56db',
        '5': '\u4e94',
        '6': '\u516d'
    }
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1)
            ? (RegExp.$1.length > 2
                ? '\u661f\u671f'
                : '\u5468')
            : '') + week[date.getDay() + ''])
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
                ? (o[k])
                : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
};
const showLongTime = (LongTime) => {
    let time = (typeof LongTime === 'number')
        ? dateFormat(new Date(LongTime), 'YYYY-MM-DD HH:mm:ss')
        : LongTime
    let currentTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    if (time.substr(0, 7) === currentTime.substr(0, 7)) {
        if (time.substr(0, 10) === currentTime.substr(0, 10)) 
            return "今天" + time.substr(11, 5);
        return "今天" + time.substr(11, 5);
        if (new Date(time).getDate() + 1 === new Date(currentTime).getDate()) 
            return "昨天" + time.substr(11, 5);
        return time.substr(5, 5);
    }
    if (time.substr(0, 4) === currentTime.substr(0, 4)) 
        return time.substr(5, 5); //今年
    return time.substr(0, 10); //早些年月
};

const transNum = function (num) {
    let index = 0,
        decimal,
        result = [],
        counter = 0;
    const nowLocale = storag.getLan();
    let unit = 1000; //换算单位
    if (/zh/.test(nowLocale)) {
        unit = 10000;
    }
    if (num >= unit) {
        num = Math.round((num / unit) * 100) / 100
        num = num.toString();
        index = num.indexOf('.') + 1;
        decimal = num.slice(index);
        num = parseInt(num)
        num = (num || 0)
            .toString()
            .split('');
        for (var i = num.length - 1; i >= 0; i--) {
            counter++;
            result.unshift(num[i]);
            if (!(counter % 3) && i != 0) {
                result.unshift(',');
            }
        }
        result = result.join('') + '.' + decimal + _i18n.i18nT('万')
        return result;
    }
    return num;
};

const shorten = function (str, num) {
    num = num || 2;
    if (!str) 
        return str;
    let newstr = "";
    const strNum = str.length;
    const provideNumber = num;
    const rowNumber = Math.ceil(strNum / provideNumber);
    if (strNum > provideNumber) {
        for (let p = 0; p < rowNumber; p++) {
            let tempStr = "";
            const start = p * provideNumber;
            const end = start + provideNumber;
            if (p === rowNumber - 1) {
                tempStr = str.substring(start, strNum);
            } else {
                tempStr = str.substring(start, end) + "\n";
            }
            newstr += tempStr;
        }
    } else {
        newstr = str;
    }
    return newstr
}

export {
    format,
    setDays,
    dateFormat,
    showLongTime,
    transNum,
    shorten
}
