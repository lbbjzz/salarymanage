import { request } from '@/network/request'

// 部门列表
export function DepartList(pageNo, pageSize) {
  return request({
    url: '/dept/listDept',
    method: 'get',
    params: {
      pageNo,
      pageSize
    }
  })
}

// 删除
export function DeleteDepartById(id) {
  return request({
    url: '/dept/deleteDept',
    method: 'post',
    params: {
      id
    }
  })
}

// 查找
export function FindDepartById(id) {
  return request({
    url: '/dept/findById',
    method: 'get',
    params: {
      id
    }
  })
}

// 修改
export function UpdateDepart(id, name) {
  return request({
    url: '/dept/updateDept',
    method: 'post',
    data: {
      id,
      name
    }
  })
}

// 添加
export function AddDepart(name) {
  return request({
    url: '/dept/insertDept',
    method: 'post',
    data: {
      name
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

// 判断是否添加了重复的部门
export function IsSame(name) {
  return request({
    url: '/dept/deptNameExisting',
    method: 'get',
    params: {
      name
    }
  })
}
