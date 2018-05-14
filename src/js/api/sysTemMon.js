/**
 * Created by century on 2017/8/16.
 */
import fetch from 'Config/fetch'
import {dateFormat} from 'Utils'
import {moduleIds} from 'Utils/modules'

const code = moduleIds[6].id;
/*
 * 指定设备温湿度图形数据查询
 * */
function lastHour(data, time) {
  let start = new Date(new Date().getTime() - 60 * 60 * 1000);
  let end = new Date();
  if (time) {
    start = new Date(time - 30 * 60 * 1000)
    end = new Date(time + 30 * 60 * 1000)
  }
  data.startTime = dateFormat(start, 'YYYY-MM-DD HH:mm:ss');
  data.endTime = dateFormat(end, 'YYYY-MM-DD HH:mm:ss');
  return data;
}
export function queryTagHumitureRealChat(data, time) {
  data = lastHour(data, time);
  return fetch({
    url: `/thm/appData/queryTagHumitureRealChat`,
    method: 'GET',
    data,
    msgCode:code+'001'
  })
}
/*
 * 门店温湿度报警列表查询
 * */
export function queryAlarmRecordList(data) {
  return fetch({
    url: `/thm/appAlarm/queryAlarmRecordList`,
    method: 'GET',
    data,
    msgCode:code+'002'
  })
}
/*
 * 门店温湿度报警详情查询
 * */
export function queryAlarmRecord(id) {
  return fetch({
    url: `/thm/appAlarm/queryAlarmRecord?id=${id}`,
    method: 'GET',
    msgCode:code+'003'
  })
}
/*
 *解除温湿度报警更新
 * */
export function updateRelieveAlarmRecord(data) {
  return fetch({
    url: `/thm/appAlarm/updateRelieveAlarmRecord`,
    method: 'POST',
    data,
    msgCode:code+'004'
  })
}
/*
 *当前温湿度实时列表查询
 * */
export function queryHumitureRealList(data) {
  return fetch({
    url: `/thm/appData/queryHumitureRealList`,
    method: 'GET',
    data,
    msgCode:code+'005'
  })
}
