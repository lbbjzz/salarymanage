// eslint-disable-next-line import/no-duplicates
import { request } from '@/network/request'
// eslint-disable-next-line import/no-duplicates
import { baseUrl } from '../request'

// 获取导入的数据
export function listImportVo (pageNo, pageSize, time) {
  return request({
    url: '/import/listImportVo/' + pageNo + '/' + pageSize + '/' + time,
    method: 'get'
  })
}
// 导入表格数据的url接口(会进行验证用户存在)
export const uploadDataUrl = baseUrl + '/import/uploadData'

// 导入表格数据的url接口(不会进行验证用户存在)
export const uploadDataNotCheck = baseUrl + '/import/uploadDataNotCheck'

// 更新员工考勤信息
export function updateImport (id, sickLeaveDay, personalLeaveDay, lateDay, overtimeDay, backPay) {
  return request({
    url: '/import/updateImport',
    method: 'post',
    data: {
      id,
      sickLeaveDay,
      personalLeaveDay,
      lateDay,
      overtimeDay,
      backPay
    }
  })
}

// 删除员工考勤信息
export function deleteImport (importId) {
  return request({
    url: '/import/deleteImport',
    method: 'post',
    params: {
      importId
    }
  })
}
