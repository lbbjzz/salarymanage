import { request } from '@/network/request'

// 员工列表
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

// 删除
export function DeleteEmployeeById(id) {
  return request({
    url: '/employee/deleteById',
    method: 'post',
    params: {
      id
    }
  })
}

// 查找
export function FindEmployeeByName(deptId, employeeName, jobId, pageNo, pageSize) {
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

// 修改
export function UpdateEmployee(id, deptId, name, jobId, sex, education, birth, idCard) {
  return request({
    url: '/employee/updateEmployee',
    method: 'post',
    data: {
      id,
      deptId,
      name,
      jobId,
      sex,
      education,
      birth,
      idCard
    }
  })
}

// 添加
export function AddEmployee(deptId, name, jobId, sex, education, birth, idCard) {
  return request({
    url: '/employee/insertEmployee',
    method: 'post',
    data: {
      deptId,
      name,
      jobId,
      sex,
      education,
      birth,
      idCard
    }
  })
}

// 获取所有部门
export function AllDepart(pageNo, pageSize) {
  return request({
    url: '/dept/listDept',
    method: 'get',
    params: {
      pageNo,
      pageSize
    }
  })
}

// 获取所有职位
export function AllJob() {
  return request({
    url: '/job/listJob/-1/-1',
    method: 'get'
  })
}
