import { request } from '@/network/request'

export function listCalculateVo (pageNo, pageSize) {
  return request({
    url: '/calculate/listCalculateVo/' + pageNo + '/' + pageSize,
    method: 'get'
  })
}
