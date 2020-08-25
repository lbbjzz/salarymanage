import { request } from '@/network/request'

// 获取导入的数据
export function listImportVo (pageNo, pageSize) {
  return request({
    url: '/import/listImportVo',
    method: 'get',
    params: {
      pageNo,
      pageSize
    }
  })
}
