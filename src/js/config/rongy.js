const rongyun = weex.requireModule("rongyun");
const modal = weex.requireModule('bmModal')
const event = weex.requireModule('bmEvents')
import Storage from "./storage";
const storag = new Storage();
import {queryOrgDeptUserLastUpdateTime, queryAllDeptAndUserTree} from "../api/Initialize";

class rongy {
  constructor() {
    this.init();
    return this;
  }

  init() {
    let self = this;
    let {tokenRc, userUuid} = storag.getDataJsonSync("userInfo");
    if (tokenRc) {
      rongyun.ryConnect(tokenRc, res => {
        this
          .ryInit(userUuid)
          .then(v => {
            event.emit('ryReady')
          })
          .catch(err => {
            console.log("RongLog1========>" + err);
          });
      });
    }
  }

  ryInit(userUuid) {
    let self = this;
    return new Promise((resolve, resject) => {
      let lastUpdateTime = storag.getDataSync("lastUpdateTime");
      queryOrgDeptUserLastUpdateTime().then(v => {
        if (v.data && v.data.lastUpdateTime && lastUpdateTime !== v.data.lastUpdateTime.toString()) {
          self
            .queryAllDeptAndUserTree(userUuid)
            .then(res => {
              if (res) {
                storag.setDataSync("lastUpdateTime", v.data.lastUpdateTime.toString());
                resolve(res);
                return;
              }
              resolve(false);
            });
          return;
        }
        resolve(false);
      }).catch(err => {
        console.log("RongLog========>融云链接失败" + err.toString);
        resolve(false);
      });
    });
  }

  static timer = 0;
  static deptId = null;
  static userUuid = null;

  queryAllDeptAndUserTree(userUuid) {
    let self = this;
    return new Promise((resolve, reject) => {
      queryAllDeptAndUserTree(1).then(res => {
        if (res.data && res.data.treeData) {
          self
            .cycle(res.data.treeData, userUuid)
            .then(res => {
              if (res > 0) 
                return resolve(true);
              resolve(false);
            });
          return;
        }
        resolve(false);
      }).catch(err => {
        modal.toast({
          message: err.toString()
        });
        resolve(false);
      });
    });
  }

  cycle(node, userUuid) {
    return new Promise((resolve, reject) => {
      rongy.timer = 0;
      this.userUuid = userUuid;
      rongyun.clearDb([], userUuid, v => {
        this.treeJson(node, (res) => {
          resolve(res);
        })
      })
    });
  }

  treeJson(node, fn) {
    let self = this;
    node.map((v, index) => {
      rongyun.addUser([
        v.id,
        v.userUuid,
        v.label,
        v.shortLabel,
        v.pid,
        v.nodeType,
        v.avatarUrl
      ], self.userUuid, res => {
        ++rongy.timer;
        if (v.children && v.children.length > 0) {
          self.treeJson(v.children, fn);
          self.deptId = v.id;
          return
        }
        if (index < (node.length - 1)) 
          return;
        if (self.deptId !== v.pid) 
          return;
        return fn(rongy.timer);
      })
    })
  }
}

export default rongy