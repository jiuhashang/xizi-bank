import request from '@/utils/request'

// 登录
export function login (data, callback) {
  return request({
    url: '/bank/login',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data
  })
}

// 银行列表
export function getBankProjectList(params) {
  return request({
    url: '/bank/project/getBankProjectList',
    method: 'get',
    params
  })
}

// 银行列表详情
export function getProjectDetail(params) {
  return request({
    url: '/bank/project/getProjectDetail',
    method: 'get',
    params
  })
}

// 收益试算
export function getProjectCount(params) {
  return request({
    url: '/bank/project/getProjectCount',
    method: 'get',
    params
  })
}