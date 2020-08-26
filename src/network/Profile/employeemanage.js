import { request } from '@/network/request'

export function EmployeeList(deptId, employeeName, jobId, pageNo, pageSize) {
  return request({
    url: '/employee/listEmployeeVO',
    method: 'get',
    params: {
      deptId,
      employeeName,
      jobId,
      pageNo,
      pageSize
    }
  })
}

export function DeleteEmployeeById(id) {
  return request({
    url: '/employee/deleteEmployee',
    method: 'delete',
    params: {
      id
    }
  })
}
export function FindEmployeeById(id) {
  return request({
    url: '/employee/findById',
    method: 'get',
    params: {
      id
    }
  })
}
