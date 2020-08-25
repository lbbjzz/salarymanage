import { request } from '@/network/request'

export function login (username, password) {
  return request({
    url: '/admin/adminLogin',
    method: 'post',
    params: {
      username,
      password
    }
  })
}
