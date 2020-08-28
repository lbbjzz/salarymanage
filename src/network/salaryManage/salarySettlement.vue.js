import { request } from '@/network/request'

export function listSalaryVO (pageNo, pageSize, deptId, time) {
  return request({
    url: '/salary/listSalaryVO',
    method: 'get',
    params: {
      pageNo,
      pageSize,
      deptId,
      time
    }
  })
}

// 判断该部门这个月是否发放了工资
export function judgeSendSalary (deptId, time) {
  return request({
    url: '/salary/judgeSendSalary/' + deptId + '/' + time,
    method: 'get'
  })
}

// 编辑暂存项目
export function updateSalaryStorage (salaryId, importId, employeeId,
  sickLeaveDay, personalLeaveDay, lateDay, overtimeDay, backPay) {
  return request({
    url: '/salary/updateSalaryStorage',
    method: 'post',
    data: {
      salaryId,
      importId,
      employeeId,
      sickLeaveDay,
      personalLeaveDay,
      lateDay,
      overtimeDay,
      backPay
    }
  })
}

// 生成工资
export function generateSalary (deptId, time) {
  return request({
    url: '/salary/generateSalary',
    method: 'post',
    params: {
      deptId,
      time
    }
  })
}

// 发放工资，将暂存的工资状态改为发放
export function sendSalary (deptId, time) {
  return request({
    url: '/salary/sendSalary',
    method: 'post',
    params: {
      deptId,
      time
    }
  })
}
