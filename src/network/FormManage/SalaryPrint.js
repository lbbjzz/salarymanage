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

export function allSalaryVO(deptId, time) {
  return request({
    url: '/salary/allSalaryVO',
    method: 'get',
    params: {
      deptId,
      time
    }
  })
}
