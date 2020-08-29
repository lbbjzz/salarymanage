import { request } from '@/network/request'

export function AllPrintItem(deptId, pageNo, pageSize, time) {
  return request({
    url: '/salary/listSalaryVO',
    method: 'get',
    params: {
      deptId,
      pageNo,
      pageSize,
      time
    }
  })
}
