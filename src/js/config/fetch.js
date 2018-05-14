import Storage from 'Config/storage'
import Server from 'Config/server'
const bmAxios = weex.requireModule('bmAxios')
const bmRouter = weex.requireModule('bmRouter')
const bmModal = weex.requireModule('bmModal')

const s = new Storage();
let serverIp = s.getDataSync("ip");
let serverPort = s.getDataSync("port");
let baseUrl = s.getDataSync("baseUrl");

if (!baseUrl) {
  s.setDataSync("ip", Server.BASE_API);
  s.setDataSync("port", Server.BASE_PORT);
  baseUrl = Server.BASE_API + ":" + Server.BASE_PORT + Server.MODULE_URL;
  s.setDataSync("baseUrl", baseUrl);
}

function _isLogin(url) {
  if (url.indexOf('sysLogin') > -1) {
    return {}
  }
  let {accountToken} = s.getDataJsonSync('userInfo');
  return {"AccountToken": accountToken}
}
const responseHandler = function (resData, resolve, reject) {
  const {status, errorMsg, data} = resData;
  if (status !== 200) {
    console.log(`invoke error status: ${status}`)
    console.log(`invoke error message: ${errorMsg}`)
    bmModal.toast({
      message: '登录超时，请先检查网络' // 展示内容
    })
    reject(resData);
  } else {
    let {status: code} = data;
    switch (code) {
      case 4000:
      case 4001:
        bmModal.alert({
          message: `${data.msg}，请重新登陆`,
          okTitle: '确定',
          title: '提示'
        }, () => {
          s.setDataSync('userInfo', {});
          bmRouter.setHomePage("/pages/app/index.js");
        })
        break;
      case 4003:
      case 4005:
        bmModal.alert({message: 'msg:权限不足,请与企业管理人员联系', okTitle: '确定', title: '提示'})
        break;
      default:
        break;
    }
    resolve(data);
  }
}
const Service = function (options) {
  return new Promise((resolve, reject) => {
    const {method, url, data} = options
    bmAxios.fetch({
      method: method || 'GET',
      url: s.getDataSync("baseUrl") + url,
      header: _isLogin(url),
      data: data || {},
      timeout: 1000 * 60
    }, (resData) => {
      responseHandler(resData, resolve, reject);
    })
  })
};

const upload = function (options) {
  let {url, maxCount, allowCrop, params} = options;
  return {
    url: s.getDataSync("baseUrl") + url,
    maxCount: maxCount || 1,
    allowCrop: allowCrop || true,
    params: {}, // 传递的参数
    header: _isLogin(url)
  }
}
export default Service

export {
  upload
}