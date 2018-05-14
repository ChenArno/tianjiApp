import fetch from 'Config/fetch'

//申请验证码
export function getHandphoneVCode(data) {
  return fetch({url: `/sys/applyTrial/getHandphoneVCode`, method: 'GET', data})
}
//验证码校验
export function validatorHandphomeVCode(data) {
  return fetch({url: `/sys/applyTrial/validatorHandphomeVCode`, method: 'POST', data})
}
//提交申请
export function addApply(data) {
  return fetch({url: `/sys/applyTrial/addApply`, method: 'POST', data})
}