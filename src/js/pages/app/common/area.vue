<template>
  <div class="cont cont-top">
    <div class="cont-cell">
      <wxc-loading :show="tjLoad" type="trip"></wxc-loading>
      <sortMenu ref="head" :list="headList" @na-click="naClick" props="label"></sortMenu>
      <scroller>
        <tj-cell v-for="item in treeList" :key="item.id" @on-click="nextList(item)">
          <text>{{item.label}}</text>
          <text class="iconfont icon-red" slot="right" v-if="areaSelect && (areaSelect.id == item.id)">&#xe613;</text>
        </tj-cell>
        <tj-cell v-for="item in shopList" :key="item.id" @on-click="radio=item.id">
          <text>{{item.deptName}}</text>
          <text class="iconfont" :class="[radio==item.id?'icon-red':'icon-gray']" slot="right">{{radio == item.id?'&#xe660;':'&#xe662;'}}</text>
        </tj-cell>
      </scroller>
    </div>
  </div>
</template>

<script>
import { WxcLoading } from "weex-ui";
import { tjCell, sortMenu } from "Components";
import { getNextNod, getShortName } from "Utils/tree";
import {
  queryPrmUserShopRegionTree,
  queryPrmUserShop,
  queryPrmUserShopByName
} from "api/Initialize";
export default {
  data() {
    return {
      dataList: [],
      headList: [{ id: 0, label: "组织" }],
      treeList: [],
      shopList: [],
      page: null,
      areaType: null,
      tjLoad: false,
      areaSelect: null,
      radio: -1,
      nowNode: null,
      nextOrBack: true
    };
  },
  components: { tjCell, sortMenu, WxcLoading },
  eros: {
    beforeAppear(params, options) {
      let { page, areaType } = params;
      this.page = page;
      this.areaType = areaType;
      this.$navigator.setRightItem(
        {
          text: this.$t("确定"),
          textColor: "#040000",
          fontSize: "28"
        },
        () => {
          this.submit();
        }
      );
      this.$navigator.setCenterItem({
        textColor: "#040000",
        text: areaType == "area" ? this.$t("区域选择") : this.$t("门店选择")
      });
    },
    appeared() {
      this.queryPrmUserShopRegionTree();
    }
  },
  watch: {
    nowNode(val) {
      this.queryPrmUserShop(val.id).then(res => {
        if (val.id == 0) {
          this.shopList = [];
          this.firstNode();
          this.changeNode(val);
          return;
        }
        if (this.areaType == "shop" && res) {
          this.shopList = res;
          this.treeList = getNextNod(this.dataList, val);
          this.changeNode(val);
          return;
        }
        let list = getNextNod(this.dataList, val);
        if (list.length == 0) {
          this.areaSelect = val;
          return;
        }
        this.treeList = list;
        this.changeNode(val);
      });
    },
    shopList(val) {
      if (val.length == 0) return;
      let [{ id }] = val;
      this.radio = id;
    }
  },
  methods: {
    nextList(node) {
      this.nowNode = node;
      this.nextOrBack = true;
    },
    naClick(node) {
      this.nowNode = node;
      this.nextOrBack = false;
    },
    queryPrmUserShopRegionTree() {
      return new Promise((resolve, reject) => {
        this.tjLoad = true;
        if (this.areaType == "area") {
          this.areaSelect = this.$getDataJsonSync("defalutArea");
        } else {
          let { id } = this.$getDataJsonSync("defalutShop");
          this.radio = id;
        }
        queryPrmUserShopRegionTree()
          .then(res => {
            this.tjLoad = false;
            if (res.data && res.data.treeData) {
              this.dataList = res.data.treeData;
              this.firstNode();
            }
            resolve();
          })
          .catch(err => {
            this.tjLoad = false;
            reject(err);
          });
      });
    },
    firstNode() {
      this.treeList = this.dataList.map(val => {
        return {
          id: val.id,
          label: val.label,
          pid: val.pid
        };
      });
    },
    changeNode(node) {
      if (this.nextOrBack) {
        this.headList.push(node);
      } else {
        let begin = true;
        let newList = [];
        this.headList.map(v => {
          if (!begin) return;
          newList.push(v);
          if (v.id == node.id) {
            begin = false;
          }
        });
        this.headList = newList;
      }
    },
    queryPrmUserShop(id) {
      return new Promise((resolve, reject) => {
        queryPrmUserShop(id)
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            resolve(false);
          });
      });
    },
    submit() {
      if (this.areaType == "shop") {
        if (this.radio == -1) return;
        this.shopList.map(v => {
          if (this.radio == v.id) {
            this.$event.emit("area.choose", v);
            this.$router.setBackParams(v);
            this.$router.back({
              length: 1,
              type: "PUSH"
            });
          }
        });
      } else {
        if (!this.areaSelect) {
          this.$notice.toast({
            message: this.$t("请先选择区域")
          });
          return;
        }
        this.$event.emit("area.choose", this.areaSelect);
        this.$router.setBackParams(this.areaSelect);
        this.$router.back({
          length: 1,
          type: "PUSH"
        });
      }
    }
  }
};
</script>
<style lang="sass" scoped>
@import "src/js/css/common.scss";
  .icon-red {
    color: #EC4F46;
  }
  .icon-gray{
    color: #c0c2c2;
  }
</style>
