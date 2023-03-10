import request from '@/utils/request'

// 收益测算
export function getProfitMessage(params) {
  return request({
    url: '/admin/seProjectProfitConfig/getProfitMessage',
    method: 'get',
    params
  })
}

// 收益试算
export function putProfitMessage(params) {
  return request.post('/admin/seProjectProfitConfig/putProfitMessage', 
  params
  )
}

// 项目初审
export function projectFirstExamine(params) {
  return request({
    url: '/admin/seProjectInfo/projectFirstExamine',
    method: 'get',
    params
  })
}

// 图纸复核
export function projectSecondExamine(params) {
  return request({
    url: '/admin/seProjectInfo/projectSecondExamine',
    method: 'get',
    params
  })
}

// 项目总览列表
export function selectListAll(params) {
  return request({
    url: '/admin/seProjectInfo/selectListAll',
    method: 'get',
    params
  })
}

// 项目终审
export function projectThirdExamine(params) {
  return request({
    url: '/admin/seProjectInfo/projectThirdExamine',
    method: 'get',
    params
  })
}

// 生产PDF
export function getProjectPdf(params) {
  return request({
    url: '/admin/seProjectInfo/getProjectPdf',
    method: 'get',
    params
  })
}