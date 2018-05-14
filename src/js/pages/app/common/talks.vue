<template>
  <div class="tj-body">
    <wxc-searchbar ref="wxc-searchbar" @wxcSearchbarCancelClicked="wxcSearchbarCancelClicked" @wxcSearchbarInputReturned="wxcSearchbarInputReturned" @wxcSearchbarInputOnInput="wxcSearchbarInputOnInput" @wxcSearchbarCloseClicked="wxcSearchbarCloseClicked" @wxcSearchbarInputOnFocus="wxcSearchbarInputOnFocus" @wxcSearchbarInputOnBlur="wxcSearchbarInputOnBlur"></wxc-searchbar>
    <sortMenu ref="head" :list="headList" @na-click="naClick" props="shortLabel"></sortMenu>
    <scroller class="chat-lsit" :show-scrollbar="false">
      <tj-cell :icon-type="item.nodeType==0?'':'more'" v-for="item in contList" :key="item.id" @on-click="openAlert(item)">
        <image class="icon" v-if="item.nodeType==0" src="item.avatarUrl"></image>
        <text>{{item.label}}</text>
      </tj-cell>
    </scroller>
    <div class="search-lsit" v-if="search">
      <scroller :show-scrollbar="false">
        <tj-cell :icon-type="item.nodeType==0?'':'more'" v-for="item in seaList" :key="item.id" @on-click="openAlert(item)">
          <image class="icon" v-if="item.nodeType==0" src="item.avatarUrl"></image>
          <text>{{item.label}}</text>
        </tj-cell>
      </scroller>
    </div>
  </div>
</template>
<script>
import { WxcSearchbar } from "weex-ui";
import { sortMenu, tjCell } from "Components";
const rongyun = weex.requireModule("rongyun");
const dom = weex.requireModule("dom");

export default {
  components: { WxcSearchbar, sortMenu, tjCell },
  data() {
    return {
      headList: [
        {
          id: "0",
          shortLabel: "组织"
        }
      ],
      contList: [],
      userUuid: "",
      clickItem: null,
      search: false,
      seaList: [
        {
          id: "-1",
          nodeType: 0,
          label: "空"
        }
      ]
    };
  },
  eros: {
    beforeAppear(params, options) {
      let { userUuid } = this.$getDataJsonSync("userInfo");
      this.userUuid = userUuid;
    },
    appeared(params, options) {
      this.init();
    }
  },
  watch: {
    clickItem(val) {
      this.slqQuery(val.id).then(v => {
        if (!v) return;
        this.contList = v;
        this.headClick(val);
      });
    }
  },
  methods: {
    wxcSearchbarCancelClicked() {
      this.search = false;
      this.seaList = [
        {
          id: "-1",
          nodeType: 0,
          label: "空"
        }
      ];
    },
    wxcSearchbarInputReturned() {
      console.log("wxcSearchbarInputReturned");
    },
    wxcSearchbarInputOnFocus() {
      //聚交
      this.search = true;
    },
    wxcSearchbarInputOnInput(e) {
      let { value } = e;
      if (value == "") {
        this.seaList = [
          {
            id: "-1",
            nodeType: 0,
            label: "空"
          }
        ];
        return;
      }
      this.search = true;
      let sql = `select id,ryId,label,shortLabel,pid,nodeType,avatarUrl from USER_INFO where nodeType = 0 and shortLabel like '%${value}%' group by label`;
      rongyun.selectAll(this.userUuid, sql, res => {
        if (res.length == 0) {
          this.seaList = [
            {
              id: "-1",
              nodeType: 0,
              label: "空"
            }
          ];
          return;
        }
        this.seaList = res
      });
    },
    wxcSearchbarCloseClicked() {
      console.log("关闭所有");
    },
    wxcSearchbarInputOnBlur() {
      console.log("wxcSearchbarInputOnBlur");
    },
    naClick(val) {
      this.clickItem = val;
    },
    init() {
      this.slqQuery("0").then(res => {
        if (!res) return;
        // this.headList = res;
        this.clickItem = res[0];
      });
    },
    slqQuery(id, type) {
      type = !type ? "pid" : type;
      return new Promise((resovle, reject) => {
        let sql =
          "select id,ryId,label,shortLabel,pid,nodeType,avatarUrl from USER_INFO where " +
          type +
          " = '" +
          id +
          "'";
        rongyun.selectAll(this.userUuid, sql, res => {
          if (res.length == 0) return resovle(false);
          resovle(res);
        });
      });
    },
    headClick(value) {
      let nowitem = this.headList.findIndex(v => {
        return v.id == value.id ? v : false;
      });
      if (nowitem == -1) {
        this.headList.push({
          id: value.id,
          shortLabel: value.shortLabel
        });
        return;
      }
      this.headList = this.headList.filter((item, x) => {
        if (x <= nowitem) return item;
      });
    },
    openAlert(node) {
      if (node.nodeType == 0) {
        //点击人员操作
        node.deptName = this.clickItem.shortLabel;
        this.$router.open({
          name: "talks.more",
          params: { userInfo: node }
        });
        return;
      }
      this.clickItem = node;
    }
  }
};
</script>
<style scoped>
.tj-body {
  border-top-style: solid;
  border-top-width: 1;
  border-top-color: #e6e6e6;
  position: relative;
}
.chat-lsit {
  background-color: #ffffff;
}
.icon {
  width: 90;
  height: 90;
  border-bottom-left-radius: 45;
  border-bottom-right-radius: 45;
  border-top-left-radius: 45;
  border-top-right-radius: 45;
  margin-right: 19;
}
.search-lsit {
  position: absolute;
  top: 85;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
}
</style>
