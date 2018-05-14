var bmstorage = weex.requireModule('bmStorage')

class Storage {
  constructor() {
    return this
  }
  install(Vue) {
    Vue.prototype.$getLan = this.getLan;
    Vue.prototype.$getData = this.getData;
    Vue.prototype.$getDataSync = this.getDataSync;
    Vue.prototype.$getDataJsonSync = this.getDataJsonSync;
    Vue.prototype.$setData = this.setData;
    Vue.prototype.$setDataSync = this.setDataSync;
    Vue.prototype.$deleteDataSync = this.deleteDataSync;
  }

  getLan() {
    return bmstorage
      .getDataSync('_lan')
      .data
      ? bmstorage
        .getDataSync('_lan')
        .data
      : 'zh_CN'
  }
  setLan(key) {
    bmstorage.setDataSync('_lan', key);
  }

  getData(key) {
    return new Promise((reslove, reject) => {
      if (bmstorage.getDataSync(`_${key}`).data) {
        bmstorage
          .getData(`_${key}`, function (resData) {
            reslove(resData)
          })
        return
      }
      return undefined
    })
  }
  getDataSync(key) {
    let str = bmstorage
      .getDataSync(`_${key}`)
      .data;
    if (!str) {
      return null
    }
    return str
  }
  getDataJsonSync(key) {
    let str = bmstorage
      .getDataSync(`_${key}`)
      .data;
    if (!str) {
      return {}
    }
    return JSON.parse(str)
  }
  setData(key, data) {
    return new Promise((reslove, reject) => {
      bmstorage
        .setData(`_${key}`, data, function (resData) {
          reslove(resData);
        });
    })
  }
  setDataSync(key, data) {
    bmstorage.setDataSync(`_${key}`, data);
  }
  deleteDataSync(key) {
    bmstorage.deleteDataSync(`_${key}`)
  }
}
export default Storage