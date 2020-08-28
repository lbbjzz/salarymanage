import { request } from '@/network/request'

// 查询所有部门的月度最高、最低、平均工资
export function getMonthlySalaryStat(month) {
  return request({
    url: '/salary/getMonthlySalaryStat',
    method: 'get',
    params: {
      month
    }
  })
}

// 根据id查询部门的月度最高、最低、平均工资
export function getMonthlySalaryStatByDeptId(deptId, month) {
  return request({
    url: '/salary/getMonthlySalaryStatByDeptId',
    method: 'get',
    params: {
      deptId,
      month
    }
  })
}
