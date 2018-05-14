const event = weex.requireModule('bmEvents')
import Storage from "Config/storage";
const storag = new Storage();

class ClearInfo {
  constructor() {
    this.cache();
  }

  cache() {
    event.emit("sotre.userInfo", "");
    storag.setDataSync("lastUpdateTime", "");
    storag.setDataSync("Theme", "back0");
  }

  cleanLast() {
    storag.setDataSync("defalutApp", "");
    storag.setDataSync('defalutArea', {
      id: -1,
      label: '暂未选择区域'
    });
    storag.setDataSync('defalutShop', {
      id: -1,
      label: '暂未选择门店'
    });
  }
}

export default ClearInfo