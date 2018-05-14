import quick from 'Pages/app/homePage/quick.vue'
import Storage from "Config/storage";
const s = new Storage();
const compants = s.getDataJsonSync('defalutApp')

const moduleIds = [
  {
    id: 13,
    moduleName: "远程巡店",
    moduleType: 'sysCruiseShop',
    path:"sysCruiseShop/index"
  }, {
    id: 20,
    moduleName: "展示保护",
    moduleType: 'sysExhib',
    path:"sysExhib/index"
  }, {
    id: 21,
    moduleName: "运营分析",
    moduleType: 'sysOpera',
    path:"sysData/sysOpera"
  }, {
    id: 22,
    moduleName: "员工分析",
    moduleType: 'sysStaff',
    path:"sysData/sysStaff"
  }, {
    id: 23,
    moduleName: "顾客分析",
    moduleType: 'sysCustom',
    path:"sysData/sysCustom"
  }, {
    id: 24,
    moduleName: "货品分析",
    moduleType: 'sysGoods',
    path:"sysData/sysGoods"
  }, {
    id: 25,
    moduleName: "温湿监控",
    moduleType: 'sysTemMon',
    path:"sysTemMon/index"
  }, {
    id: 26,
    moduleName: "客流统计",
    moduleType: 'sysPasFlow',
    path:"sysPasFlow/index"
  }, {
    id: 27,
    moduleName: "门店备忘",
    moduleType: 'sysStoreParam',
    path:"sysStoreParam/index"
  }, {
    id: 28,
    moduleName: "收银监控",
    moduleType: 'sysCashMonit',
    path:"sysCashMonit/index"
  }, {
    id: 31,
    moduleName: "热点分析",
    moduleType: 'sysHotAnaly',
    path:"sysHotAnaly/index"
  }, {
    id: 32,
    moduleName: "EAS防损",
    moduleType: 'sysEas',
    path:"sysEas/index"
  }, {
    id: 16,
    moduleName: "设备中心",
    moduleType: 'sysDeviceControl',
    path:"sysDeviceControl/index"
  }, {
    id: 33,
    moduleName: "资产管理",
    moduleType: 'sysEam',
    path:"sysEam/index"
  }, {
    id: 34,
    moduleName: "RFID库存",
    moduleType: 'sysRFID',
    path:"sysRFID/index"
  }
];


const switchName = function switchName(obj) {
  let {id} = obj;
  let moduleType = "";
  let path = "";
  moduleIds.map(val => {
    if (val.id == id) {
      moduleType = val.moduleType;
      path = val.path;
      return
    }
  })
  if (!moduleType) {
    return false
  }
  obj.moduleType = moduleType;
  obj.path = path;
  return obj;
}

export default function Tem() {
  let {moduleType,path} = compants;
  if(!moduleType || moduleType == "quick") return quick
  return require(`Pages/app/${path}`);
}

export {
  moduleIds,
  switchName
}