import type { AxiosResponse, InternalAxiosRequestConfig } from "axios"

type IRequestInterceptors = (
  value: InternalAxiosRequestConfig
) => InternalAxiosRequestConfig
type IResponseInterceptors = (
  res: AxiosResponse
) => AxiosResponse | Promise<Error>

class HttpClint {
  private instance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
  })

  constructor() {
    this.interceptors()
  }

  /**
   * 请求拦截列表
   * 如：设置token
   */
  private requestInterceptorsList: IRequestInterceptors[] = [
    (config) => {
      const token = '88888'
      if (token)
        config.headers.token = token
      return config
    }
  ]

  /**
   * 响应拦截列表
   * 如：统一错误处理
   */
  private responseInterceptorsList: IResponseInterceptors[] = [
    (res) => {
      console.groupCollapsed(`%c 请求信息 ${res.config.url}`, 'color: #409EFF')
      console.log('请求地址：', res.config.url)
      console.log('请求方法：', res.config.method)
      if (res.config.method === 'get')
        console.log('请求参数：', res.config.params)
      else
        console.log('请求参数：', res.config.data)

      console.log('接口响应数据：', res.data)
      console.groupEnd()
      return res
    }
  ]
  /**
   * 请求/响应拦截器
   */
  private interceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        this.requestInterceptorsList.forEach((item) => {
          console.log('1222223232323232323232323212222232323232323232323232122222323232323232323232321222223232323232323232323212222232323232323232323232')
        })
        return config
      },
      (err) => {
        return Promise.reject(err)
      })

    this.instance.interceptors.response.use((res) => {
      this.responseInterceptorsList.forEach((item) => {
        res = item(res)
      })
      return res
    }, (err) => {
      return Promise.reject(err)
    })
  }
}

export default new HttpClint()