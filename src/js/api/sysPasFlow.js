/**
 * Created by century on 2017/8/16.
 */
import fetch from 'Config/fetch'
import {moduleIds} from 'Utils/modules'

const code = moduleIds[6].id;
//客流指标
export function queryShopPFlowIndicator(data) {
  return fetch({
    url: `/spf/appData/queryShopPFlowIndicator`,
    method: 'GET',
    data,
    msgCode:code+'001'
  })
}

//客流趋势
export function queryShopPFlowChartByDayHour(data) {
  return fetch({
    url: `/spf/appData/queryShopPFlowChartByDayHour`,
    method: 'GET',
    data,
    msgCode:code+'002'
  })
}
// 客流-门店位置(小时)客流指标列表查询
export function queryShopPositionHourPFlowList(data) {
  return fetch({
    url: `/spf/appData/queryShopPositionHourPFlowList`,
    method: 'POST',
    data,
    msgCode:code+'003'
  })
}
// 客流-门店位置进出店客流统计查询
export function queryShopPositionPFlowCount(data) {
  return fetch({
    url: `/spf/appData/queryShopPositionPFlowCount`,
    method: 'POST',
    data,
    msgCode:code+'004'
  })
}
