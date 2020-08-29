import axios from 'axios'
import store from '../store'
import router from '../router'
export const baseUrl = 'http://localhost:9000'

export function request (config) {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
      'Authentication-Token': store.state.token,
      'Authentication-adminId': store.state.adminId
    }
  })

  // 拦截器
  instance.interceptors.response.use(res => {
    // setTimeout(() => {
    //
    // }, 2000)
    return res.data
  }, error => {
    // 登录失效
    if (error.response.status === 520) {
      // 删除数据
      store.commit('setToken', '')
      store.commit('setAdminId', null)
      // 跳回首页
      router.push({ path: '/Login' })
    }
    return error
  })
  return instance(config)
}
