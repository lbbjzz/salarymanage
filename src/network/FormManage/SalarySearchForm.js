import { request } from '@/network/request'

// 查询
export function getEmployeeSalaryStat(pageNo, pageSize, beginDate, endDate, deptName) {
  return request({
    url: '/salary/listSalaryVoDetail',
    method: 'get',
    params: {
      pageNo,
      pageSize,
      beginDate,
      endDate,
      deptName
    }
  })
}
