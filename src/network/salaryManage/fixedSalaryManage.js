// eslint-disable-next-line import/no-duplicates
import { request } from '@/network/request'

// 获取员工固定工资
export function listEmployeeFixedSalaryVo (pageNo, pageSize, deptId, sortName, sortOrder) {
  return request({
    url: '/employee/listEmployeeFixedSalaryVo',
    method: 'get',
    params: {
      pageNo,
      pageSize,
      deptId,
      sortName,
      sortOrder
    }
  })
}

// 获取全部部门信息
export function allDept () {
  return request({
    url: '/dept/allDept',
    method: 'get'
  })
}

// 操作员工固定工资
export function operationEmployeeFixedSalary (operation, employeeId, heatingSubsidy) {
  return request({
    url: '/employee/operationEmployeeFixedSalary',
    method: 'post',
    data: {
      operation,
      employeeId,
      heatingSubsidy
    }
  })
}
