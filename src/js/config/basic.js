import locals from 'Locals'
import Storage from './storage'

const storag = new Storage();

if (!storag.getDataSync('statusBarHeight')) {
  let height = weex.config.eros.statusBarHeight
    ? weex.config.eros.statusBarHeight
    : 40;
  storag.setDataSync('statusBarHeight', height + "px");
}

if (!storag.getDataJsonSync('defalutArea').id) {
  let defalutArea = {
    id: -1,
    label: '暂未选择区域'
  };
  storag.setDataSync('defalutArea', defalutArea);
}
if (!storag.getDataJsonSync('defalutShop').id) {
  let defalutShop = {
    id: -1,
    label: '暂未选择门店'
  };
  storag.setDataSync('defalutShop', defalutShop);
}
Vue.use(storag);
const nowLocale = storag.getLan();
let locale = /zh/.test(nowLocale)
  ? "zh-CN"
  : "en";
const i18n = new locals({locale})

Vue.use(i18n);

export const _i18n = i18n
