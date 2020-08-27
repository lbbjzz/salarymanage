import { request } from '@/network/request'

// 岗位列表
export function AllJob(pageNo, pageSize) {
  return request({
    url: '/job/listJob/' + pageNo + '/' + pageSize,
    method: 'get'
  })
}

// 删除
export function DeleteJobById(id) {
  return request({
    url: '/job/deleteById',
    method: 'post',
    params: {
      id
    }
  })
}

// 修改
export function UpdateJob(id, name, salary, approvedNum) {
  return request({
    url: '/job/updateJob',
    method: 'post',
    data: {
      id,
      name,
      salary,
      approvedNum
    }
  })
}

// 添加
export function AddJob(name, salary, approvedNum) {
  return request({
    url: '/job/insertJob',
    method: 'post',
    data: {
      name,
      salary,
      approvedNum
    }
  })
}

// 判断是否添加了重复的部门
export function IsExits(name) {
  return request({
    url: '/job/jobNameExist',
    method: 'post',
    params: {
      name
    }
  })
}
