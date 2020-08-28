import axios from 'axios'

export const baseUrl = 'http://106.53.82.206:9000'

export function request (config) {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {}
  })

  // 拦截器
  instance.interceptors.response.use(res => {
    // setTimeout(() => {
    //
    // }, 2000)
    return res.data
  }, error => {
    // 登录失效
    return error
  })
  return instance(config)
}
