import axios from 'axios';
const baseURL: any = import.meta.env.VITE_BASE_URL
const Message = window as any['$message']

const service = axios.create({
  baseURL,
  timeout: 3 * 1000, // 响应时间
})
service.interceptors.request.use((config: any) => {
  if (config.formatType === 'json') {
    config.headers['Content-Type'] = 'application/json'
  } else if (config.formatType === "file") {
    config.headers['Content-Type'] = 'multipart/form-data'
  }
  // if (config.isLogin) {
  //     return config
  // }
  // // token鉴权
  // let token = getToken()
  // if (token) {
  //     const result = decodeToken(token)
  //         // const { app, role } = result
  //         // const roles = role[app] // 'common,admin'
  //     config.headers['authorization'] = 'Bearer ' + token
  //     config.headers['uid'] = result.uid
  //     config.headers['app'] = loginAppKey
  //     config.headers['token'] = token
  // } else {
  //     confirm()
  // }
  return config;
},
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { status, config, data } = response
    response.data = JSON.parse(data)
    if (status !== 200) { // 200

      return Promise.reject(new Error(data.status || 'Error'))
    } else {
      return response.data
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '未授权或帐号密码错误，请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器端出错'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      error.message = '连接到服务器失败'
    }

    // console.log(error.message);

    console.warn(error.message)

    return Promise.reject(error)
  }
)
export default service