import { request } from '@/network/request'

export function listCalculateVo (pageNo, pageSize, deptId, employeeName) {
  return request({
    url: '/calculate/listCalculateVo/' + pageNo + '/' + pageSize + '/' + deptId + '/' + employeeName,
    method: 'get'
  })
}
// 更新员工计算项目
export function updateCalculate (id, ids, dailySickLeaveDeduction, dailyPersonalLeaveDeduction,
  dailyLateDeduction, dailyOvertimePay, personalEndowmentInsuranceRate, companyEndowmentInsuranceRate,
  personalUnemploymentInsuranceRate, personalAccumulationFundRate, companyAccumulationFundRate,
  personalMedicalInsuranceRate, companyMedicalInsuranceRate, personalIncomeTaxRate) {
  return request({
    url: '/calculate/updateCalculate',
    method: 'post',
    data: {
      id,
      ids,
      dailySickLeaveDeduction,
      dailyPersonalLeaveDeduction,
      dailyLateDeduction,
      dailyOvertimePay,
      personalEndowmentInsuranceRate,
      companyEndowmentInsuranceRate,
      personalUnemploymentInsuranceRate,
      personalAccumulationFundRate,
      companyAccumulationFundRate,
      personalMedicalInsuranceRate,
      companyMedicalInsuranceRate,
      personalIncomeTaxRate
    }
  })
}

// 获取员工固定工资
export function listFixedSalaryVo (pageNo, pageSize, deptId, employeeName) {
  return request({
    url: '/employee/listFixedSalaryVo/' + pageNo + '/' + pageSize + '/' + deptId + '/' + employeeName,
    method: 'get'
  })
}

// 获取员工导入项目
export function listImport (pageNo, pageSize, deptId, employeeName) {
  return request({
    url: '/import/listImport/' + pageNo + '/' + pageSize + '/' + deptId + '/' + employeeName,
    method: 'get'
  })
}

// 获取员工实发工资
export function listNetPayVo (pageNo, pageSize, deptId, employeeName) {
  return request({
    url: '/salary/listNetPayVo/' + pageNo + '/' + pageSize + '/' + deptId + '/' + employeeName,
    method: 'get'
  })
}
