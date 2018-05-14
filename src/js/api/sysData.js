/**
 * Created by century on 2017/9/1.
 */
import fetch from 'Config/fetch'
import {moduleIds} from 'Utils/modules'

const code1 = moduleIds[4].id;
const code2 = moduleIds[5].id;
const code3 = moduleIds[6].id;
const code4 = moduleIds[7].id;
/*
 * 顾客分析-概览-顾客饼图（占比）   
 * */
export function queryOverviewLifestyleNum(data) {
  return fetch({
    url: `/report/app/customer/overview/queryOverviewLifestyleNum`,
    method: 'GET',
    data,
    msgCode:code3+'001'
  })
}
/*
 * 顾客分析-概览-顾客饼图（销售额）
 * */
export function queryOverviewLifestyleAmount(data) {
  return fetch({
    url: `/report/app/customer/overview/queryOverviewLifestyleAmount`,
    method: 'GET',
    data,
    msgCode:code3+'002'
  })
}

/*
 * 顾客分析-概览-顾客门店排行（留存）
 * */
export function queryOverviewDeptRankKeep(data) {
  return fetch({
    url: `/report/app/customer/overview/queryOverviewDeptRankKeep`,
    method: 'GET',
    data,
    msgCode:code3+'003'
  })
}
/*
 * 顾客分析-概览-顾客门店排行（拉新）
 * */
export function queryOverviewDeptRankNew(data) {
  return fetch({
    url: `/report/app/customer/overview/queryOverviewDeptRankNew`,
    method: 'GET',
    data,
    msgCode:code3+'004'
  })
}


// 运营分析- 组织关键指标
export function queryOperation(data) {
  return fetch({
    url: `/report/app/operation/overview/queryOperation`,
    method: 'GET',
    data,
    msgCode:code1+'001'
  })
}

// 运营分析- 组织关键指标 - 销售额
export function queryOverViewSalesAmount(data) {
  return fetch({
    url: `/report/app/operation/overview/queryOverviewSalesAmount`,
    method: 'GET',
    data,
    msgCode:code1+'001'
  })
}
// 运营分析- 组织关键指标 - 客流量
export function queryOverviewFlowCount(data) {
  return fetch({
    url: `/report/app/operation/overview/queryOverviewFlowCount`,
    method: 'GET',
    data,
    msgCode:code1+'0001'
  })
}
// 运营分析- 组织关键指标 - 进店率
export function queryOverviewInFlowRate(data) {
  return fetch({
    url: `/report/app/operation/overview/queryOverviewInFlowRate`,
    method: 'GET',
    data,
    msgCode:code1+'0002'
  })
}
// 运营分析- 组织关键指标 - 连带率
export function queryOverviewJointRate(data) {
  return fetch({
    url: `/report/app/operation/overview/queryOverviewJointRate`,
    method: 'GET',
    data,
    msgCode:code1+'0003'
  })
}
// 运营分析- 成交率-进店率
export function queryCloseAndInFlowRateList(data) {
  return fetch({
    url: `/report/app/operation/overview/queryCloseAndInFlowRateList`,
    method: 'GET',
    data,
    msgCode:code1+'0004'
  })
}

//运营分析- 连带率-销售额
export function querySalesAmountAndJointRateList(data) {
  return fetch({
    url: `/report/app/operation/overview/querySalesAmountAndJointRateList`,
    methde: 'GET',
    data,
    msgCode:code1+'003'
  })
}
export function queryStoreOrder(data,i){
  let url = "querySalesAmountDeptRank" //门店排行 - 销售额
  if(i == 1){
    url = "queryFlowCountDeptRank";//门店排行 - 客流量
  }else if(i == 2){
    url = "queryInFlowRateDeptRank";//门店排行 - 进店率
  }else if(i == 3){
    url = "queryCloseRateDeptRank";//门店排行 - 成交率
  }else if(i == 4){
    url = "queryJointRateDeptRank";//门店排行 - 连带率
  }
  return fetch({
    url:`/report/app/operation/overview/${url}`,
    methde: 'GET',
    data,
    msgCode:code1+'005'
  })
}

//员工分析 - 员工关键指标
//员工分析 - 员工关键指标 - 销售额
export function queryOverviewSalesAmount(data){
  return fetch({
    url: `/report/app/employee/overview/queryOverviewSalesAmount`,
    method: 'GET',
    data,
    msgCode:code1+'0001'
  })
}
//员工分析 - 员工关键指标 - 接客数
export function queryOverviewCustNum(data){
  return fetch({
    url: `/report/app/employee/overview/queryOverviewCustNum`,
    methde: 'GET',
    data,
    msgCode:code2+'0002'
  })
}
//员工分析 - 员工关键指标 - 接待成交率
export function queryOverviewCloseRate(data){
  return fetch({
    url: `/report/app/employee/overview/queryOverviewCloseRate`,
    methde: 'GET',
    data,
    msgCode:code2+'0003'
  })
}
//员工分析 - 员工关键指标 - 平均业绩完成率
export function queryOverviewPerformanceRate(data){
  return fetch({
    url: `/report/app/employee/overview/queryOverviewPerformanceRate`,
    methde: 'GET',
    data,
    msgCode:code2+'0004'
  })
}

//员工分析 - 接客人数最多
export function queryOverviewVisitRank(data) {
  return fetch({
    url:`/report/app/employee/overview/queryOverviewVisitRank`,
    methde: 'GET',
    data,
    msgCode:code2+'002'
  })
}
//员工分析 - 看货数
export function queryOverviewFocusRank(data) {
  return fetch({
    url:`/report/app/employee/overview/queryOverviewFocusRank`,
    methde: 'GET',
    data,
    msgCode:code2+'003'
  })
}
//员工分析 - 接待成交率
export function queryOverviewCloseRank(data) {
  return fetch({
    url:`/report/app/employee/overview/queryOverviewCloseRank`,
    methde: 'GET',
    data,
    msgCode:code2+'004'
  })
}
//员工分析 - 业绩达成率
export function queryOverviewPerformanceRank(data) {
  return fetch({
    url:`/report/app/employee/overview/queryOverviewPerformanceRank`,
    methde: 'GET',
    data,
    msgCode:code2+'005'
  })
}

//货品分析 - 货品指标
//货品分析 - 货品指标 - 齐码率
export function queryOverviewHomRate(data){
  return fetch({
    url:`/report/app/item/overview/queryOverviewHomRate`,
    methde: 'GET',
    data,
    msgCode:code4+'0001'
  })
}
//货品分析 - 货品指标 - 铺货平均深度
export function queryOverviewDistRate(data){
  return fetch({
    url:`/report/app/item/overview/queryOverviewDistRate`,
    methde: 'GET',
    data,
    msgCode:code4+'0002'
  })
}
//货品分析 - 货品指标 - 动销比
export function queryOverviewSalesItemRate(data){
  return fetch({
    url:`/report/app/item/overview/queryOverviewSalesItemRate`,
    methde: 'GET',
    data,
    msgCode:code4+'0003'
  })
}
//货品分析 - 货品指标 - 存销比
export function queryOverviewSalesStockRate(data){
  return fetch({
    url:`/report/app/item/overview/queryOverviewSalesStockRate`,
    methde: 'GET',
    data,
    msgCode:code4+'0004'
  })
}
//货品分析 - 商品关注度
export function queryItemFocusRank(data) {
  return fetch({
    url:`/report/app/item/overview/queryItemFocusRank`,
    methde: 'GET',
    data,
    msgCode:code4+'002'
  })
}
//货品分析 - 看货成交率
export function queryItemFocusCloseRank(data) {
  return fetch({
    url:`/report/app/item/overview/queryItemFocusCloseRank`,
    methde: 'GET',
    data,
    msgCode:code4+'003'
  })
}
//货品分析 - 顾客看货率
export function queryCustomerFocusRank(data) {
  return fetch({
    url:`/report/app/item/overview/queryCustomerFocusRank`,
    methde: 'GET',
    data,
    msgCode:code4+'004'
  })
}
//货品分析 - 顾客试用率
export function queryCustomerFocusTryRank(data) {
  return fetch({
    url:`/report/app/item/overview/queryCustomerFocusTryRank`,
    methde: 'GET',
    data,
    msgCode:code4+'005'
  })
}

