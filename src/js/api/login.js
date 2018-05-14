import fetch from 'Config/fetch'

export function login(data) {
  return fetch({
    method: 'POST',
    url: '/sys/login/sysLogin',
    data
  })
}

//基础-系统登出
export function sysLogout() {
  return fetch({
    url: '/sys/login/sysLogout',
    method: 'POST'
  })
}
//获取帐号手机验证码并发送短信
export function getHandphoneVCode(handphone) {
  return fetch({
    url: `/org/register/getHandphoneVCode?handphone=${handphone}`,
    method: 'GET'
  })
}
//帐号手机号验证
export function updateHandphoneValidator(data) {
  return fetch({
    url: '/org/register/updateHandphoneValidator',
    method: 'POST',
    data
  })
}
//基础-登录用户头像上传更新
export const uploadUserAuatar = `/sys/load/uploadUserAuatar`;

//基础-用户密码重置
export function updateUserPwdReset(data) {
  return fetch({
    url: '/sys/load/updateUserPwdReset',
    method: 'PUT',
    data
  })
}
//获取重置密码手机验证码
export function getResetPwdHandphoneVCode(userAccount) {
  return fetch({
    url: `/org/register/getResetPwdHandphoneVCode?userAccount=${userAccount}`,
    method: 'GET'
  })
}
//帐号密码重置验证码验证
export function validatorResetPwdVCode(data) {
  return fetch({
    url: `/org/register/validatorResetPwdVCode`,
    method: 'POST',
    data
  })
}
//基础-用户密码修改
//针对登录用户自身密码的修改，要求输入新、旧密码： 1、新密码不能为空值 2、旧密码校验必须一致
export function updateUserPwd(data) {
  return fetch({
    url: `/sys/load/updateUserPwd`,
    method: 'PUT',
    data
  })
}
