/**
 * Created by century on 2017/8/7.
 */
import fetch from 'Config/fetch'
import {moduleIds} from 'Utils/modules'

const code = moduleIds[0].id;
//组织公共-IPC控制-创建Onvif-Ipc对象
export function create(id) {
  return fetch({
    url: `/tjonvif/ipc/create`,
    method: 'POST',
    data: {id}
  })
}
//组织公共-IPC控制-镜头向下
export function moveDown(tjOnvifDeviceCode) {
  return fetch({
    url: `/tjonvif/ipc/moveDown`,
    method: 'POST',
    data: {
      tjOnvifDeviceCode
    },
    msgCode:code+'002'
  })
}

//组织公共-IPC控制-镜头向左
export function moveLeft(tjOnvifDeviceCode) {
  return fetch({
    url: `/tjonvif/ipc/moveLeft`,
    method: 'POST',
    data: {
      tjOnvifDeviceCode
    },
    msgCode:code+'003'
  })
}

//组织公共-IPC控制-镜头向右
export function moveRight(tjOnvifDeviceCode) {
  return fetch({
    url: `/tjonvif/ipc/moveRight`,
    method: 'POST',
    data: {
      tjOnvifDeviceCode
    },
    msgCode:code+'004'
  })
}

//组织公共-IPC控制-镜头向上
export function moveUp(tjOnvifDeviceCode) {
  return fetch({
    url: `/tjonvif/ipc/moveUp`,
    method: 'POST',
    data: {
      tjOnvifDeviceCode
    },
    msgCode:code+'005'
  })
}
//组织公共-IPC控制-镜头停止移动
export function stopMove(tjOnvifDeviceCode) {
  return fetch({
    url: `/tjonvif/ipc/stopMove`,
    method: 'POST',
    data: {
      tjOnvifDeviceCode
    },
    msgCode:code+'006'
  })
}
//组织公共-IPC控制-移除设备
export function remove(tjOnvifDeviceCode) {
  return fetch({
    url: `/tjonvif/ipc/remove`,
    method: 'POST',
    data: {
      tjOnvifDeviceCode
    },
    msgCode:code+'007'
  })
}
//组织公共-IPC控制-获取IPC截图
export function getSnapshot(data) {
  return fetch({
    url: `/tjonvif/ipc/getSnapshot`,
    method: 'POST',
    data,
    msgCode:code+'008'
  })
}
//组织公共-IPC控制-镜头拉近焦
export function moveZoomUp(tjOnvifDeviceCode) {
  return fetch({
    url: `/tjonvif/ipc/moveZoomUp`,
    method: 'POST',
    data: {
      tjOnvifDeviceCode
    },
    msgCode:code+'009'
  })
}
//组织公共-IPC控制-镜头拉远焦
export function moveZoomDown(tjOnvifDeviceCode) {
  return fetch({
    url: `/tjonvif/ipc/moveZoomDown`,
    method: 'POST',
    data: {
      tjOnvifDeviceCode
    },
    msgCode:code+'010'
  })
}
// 点检管理-点检记录查询
export function queryScoreList(data) {
  return fetch({
    url: `/app/spsScore/queryScoreList`,
    method: 'POST',
    data,
    msgCode:code+'011'
  })
}
// 巡店管理-巡店管理查询（首页）
export function queryManageList(data) {
  return fetch({
    url: `/app/spsManage/queryManageList`,
    method: 'POST',
    data,
    msgCode:code+'012'
  })
}
//点检任务管理-待检任务查询
export function queryPlanTaskList(data) {
  return fetch({
    url: `/app/spsPlan/task/queryPlanTaskList`,
    method: 'POST',
    data,
    msgCode:code+'013'
  })
}
//点检任务管理-待检任务查询
export function querySuiteByOrgId() {
  return fetch({
    url: `/app/spsSuite/querySuiteByOrgId`,
    method: 'GET',
    msgCode:code+'014'
  })
}
//点检管理-点检记录详情
export function queryScoreDetailById(id) {
  return fetch({
    url: `/app/spsScore/queryScoreDetailById`,
    method: 'POST',
    data: {
      id
    },
    msgCode:code+'015'
  })
}
//点检计划管理-点检计划查询
export function queryPlanList(data) {
  return fetch({
    url: `/app/spsPlan/queryPlanList`,
    method: 'POST',
    data,
    msgCode:code+'016'
  })
}
//点检计划管理-点检计划添加
export function savePlan(data) {
  return fetch({
    url: `/app/spsPlan/savePlan`,
    method: 'POST',
    data,
    msgCode:code+'017'
  })
}
//点检计划管理-点检计划修改
export function updatePlan(data) {
  return fetch({
    url: `/app/spsPlan/updatePlan`,
    method: 'POST',
    data,
    msgCode:code+'018'
  })
}
//点检管理-评分添加
export function saveScore(data) {
  return fetch({
    url: `/app/spsScore/saveScore`,
    method: 'POST',
    data,
    msgCode:code+'019'
  })
}
//组织公共-IPC控制-获取IPC截图的文件流
export function getSnapshotStream(id) {
  return `/tjonvif/ipc/getSnapshotStream?id=${id}`;
}
//点检管理-点检图片上传 需要调用camera中的上传
export const addScoreImg = `/app/spsScore/addScoreImg`;
