import { request } from '@/network/request'

// 查询员工工资
export function getEmployeeSalaryStat() {
  return request({
    url: '/salary/getEmployeeSalaryStat',
    method: 'get'
  })
}
