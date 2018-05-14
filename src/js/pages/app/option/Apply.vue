<template>
  <div class="cont cont-body">
    <div v-if="step==0">
      <wxc-cell class="cell">
        <text slot="label" class="iconfont">&#xe647;</text>
        <input class="input" slot="title" type="text" v-model="userName" :placeholder="$t('请输入您的姓名')" />
      </wxc-cell>
      <wxc-cell class="cell">
        <text slot="label" class="iconfont">&#xe6a1;</text>
        <input class="input" slot="title" type="text" v-model="telphone" :placeholder="$t('请输入您的手机号码')" />
      </wxc-cell>
      <wxc-cell class="cell">
        <text slot="label" class="iconfont">&#xe62c;</text>
        <input class="input" slot="title" type="text" v-model="validation" :max-lengt="4" :placeholder="$t('请输入验证码')" />
        <div slot="value" class="code" @click="sendCode">
          <text v-if="getVer" class="send-code">{{ $t('发送验证码') }}</text>
          <div v-else class="send-code">
            <text :style="{color:'#DE4F45'}">{{count}}</text>
            <text>{{ $t('秒后再获取') }}</text>
          </div>
        </div>
      </wxc-cell>
    </div>
    <div v-else-if="step==1">
      <wxc-cell class="cell">
        <text slot="label" class="iconfont">&#xe600;</text>
        <input class="input" slot="title" type="text" v-model="email" :placeholder="$t('请输入公司邮箱')" />
      </wxc-cell>
      <wxc-cell class="cell">
        <text slot="label" class="iconfont">&#xe65b;</text>
        <input class="input" slot="title" type="text" v-model="company" :placeholder="$t('请输入公司名')" />
      </wxc-cell>
      <wxc-cell class="cell">
        <text slot="label" class="iconfont">&#xe633;</text>
        <input class="input" slot="title" type="text" v-model="addr" :placeholder="$t('请输入公司地址')" />
      </wxc-cell>
    </div>
    <div v-else-if="step==2">
      <wxc-cell class="cell">
        <text slot="label" class="iconfont">&#xe647;</text>
        <input class="input" slot="title" type="text" v-model="job" :placeholder="$t('请输入公司职位')" />
      </wxc-cell>
      <wxc-cell class="cell" @wxcCellClicked="choseSource">
        <text slot="label" class="iconfont">&#xe69a;</text>
        <text slot="title" class="label-text">{{$t(source)}}</text>
      </wxc-cell>
      <textarea class="cell textarea" v-model="remarks" :placeholder="$t('填写备注')"></textarea>
    </div>
    <tj-button class="button" :text="$t('下一步')" @wxcButtonClicked="next" :disabled="disabled"></tj-button>
    <!-- <bmmask ref="level" class="mask" duration="300" @hide="dialogHide">
        <bmpop class="pop-view" :style="{ height: 445 }">
          <div class="mask-header">
            <text class="mask-done" @hide="dialogHide">取消</text>
            <text class="mask-select">选择报警级别</text>            
            <text class="mask-cancle">确认</text>
          </div>
          <list class="mask-cont">
            <cell v-for='(item, index) in sourceData' :key="index" @click="selecLevel(item)">
              <div class="cell">
                <text class="area-name">{{ item}}</text>
              </div>
            </cell>
          </list>
        </bmpop>
      </bmmask> -->
  </div>
</template>

<script>
import { WxcCell } from "weex-ui";
import { tjButton } from "Components";
const picker = weex.requireModule("picker");
import {
  getHandphoneVCode,
  validatorHandphomeVCode,
  addApply
} from "api/sysApply";

export default {
  data() {
    return {
      step: 0,
      userName: "",
      telphone: "",
      validation: "",
      email: "",
      company: "",
      addr: "",
      job: "",
      remarks: "",
      getVer: true,
      count: 59,
      Interval: null,
      commitCode: "",
      disabled: true,
      source: "信息来源",
      alertContent: ""
    };
  },
  computed: {
    sourceData() {
      return [
        this.$t("展会"),
        this.$t("网站"),
        this.$t("推荐"),
        this.$t("其他")
      ];
    }
  },
  watch: {
    validation(val) {
      this.disabled = val.length < 4 ? true : false;
    }
  },
  components: { tjButton, WxcCell },
  methods: {
    sendCode() {
      if (!this.getVer) return;
      if (this.userName.length < 2) {
        this.$notice.toast({
          message: this.$t("名字长度不得小于2")
        });
        return;
      }
      if (this.telphone.length != 11 || !this.telphone) {
        this.$notice.toast({
          message: this.$t("请输入正确的手机号码")
        });
        return;
      }
      let data = {
        handphone: this.telphone
      };
      getHandphoneVCode(data)
        .then(res => {
          if (res.resultStatus) {
            this.getVer = false;
            this.Interval = setInterval(this.update, 1000);
          }
          this.$notice.toast({
            message: res.msg
          });
        })
        .catch(err => {
          this.$notice.toast({
            message: this.$t("网络异常，请先检查网络")
          });
        });
    },
    next() {
      if (this.step == 0) {
        if (this.disabled) return;
        let data = {
          handphone: this.telphone,
          validateCode: this.validation
        };
        validatorHandphomeVCode(data)
          .then(res => {
            if (res.resultStatus) {
              this.commitCode = res.data.commitCode;
              this.step++;
            } else {
              this.$notice.toast({
                message: res.msg
              });
            }
          })
          .catch(err => {
            this.$notice.toast({
              message: err
            });
          });
      } else if (this.step == 1) {
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        let isemail = reg.test(this.email);
        if (!isemail) {
          this.alertContent = this.$t("邮箱格式不正确");
        }
        if (!this.company) {
          this.alertContent = this.$t("公司名不能为空");
        }
        if (!this.addr) {
          this.alertContent = this.$t("公司地址不能为空");
        }
        if (this.alertContent) {
          this.$notice.toast({
            message: this.alertContent
          });
          return;
        }
        this.step++;
      } else {
        if (!this.source && this.source != this.$t("信息来源")) {
          this.$notice.toast({
            message: this.$t("来源不能为空")
          });
          return;
        }
        let data = {
          contactName: this.userName,
          handphone: this.telphone,
          email: this.email,
          companyName: this.company,
          companyAddress: this.addr,
          companyPosition: this.job,
          comeFrom: this.source,
          description: this.remarks,
          commitCode: this.commitCode
        };
        addApply(data).then(res => {
          if (res.resultStatus) {
            this.$notice.alert({
              title: this.$t("感谢您的注册，请等待我们的商务跟您联系"),
              callback() {
                this.$router.back();
              }
            });
            return;
          }
          this.$notice.toast({
            message: res.msg
          });
        });
      }
    },
    update() {
      if (this.count <= 0) {
        clearInterval(this.Interval);
        this.count = 59;
        this.getVer = true;
      } else {
        this.count--;
      }
    },
    choseSource() {
      let i = 0;
      this.sourceData.map((res, x) => {
        if (res == this.$t(this.source)) {
          i = x;
        }
      });
      picker.pick(
        {
          index: i,
          items: this.sourceData
        },
        event => {
          if (event.result === "success") {
            this.source = this.sourceData[event.data];
          }
        }
      );
    }
  }
};
</script>
<style lang="sass"  scoped>
@import "src/js/css/common.scss";
.cont {
  padding-left: 45px;
  padding-right: 45px;
}
.input{
  height:78px;
}
.cell {
  flex-direction: row;
  margin-top: 30px;
  border-style: solid;
  border-width: 1;
  border-color: #cccccc;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.label-text{
  color:#999999;
}
.button{
  margin-top:60;
}
.code{
  border-left-color:#d9d9d9;
  border-left-width: 1;
  border-style: solid;
  padding-left:32;
}
.send-code{
  width:199;
  flex-direction:row;
}
.iconfont{
  margin-right:19px;
}
  .textarea {
    background-color: #fff;
    padding-top:24;
    padding-left:10;
  padding-bottom:24;
    padding-right:10;
  }
</style>
