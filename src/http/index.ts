import type { AxiosResponse, InternalAxiosRequestConfig } from "axios"

type IRequestInterceptors = (
  value: InternalAxiosRequestConfig
) => InternalAxiosRequestConfig

type IResponseInterceptors = (
  res: AxiosResponse
) => AxiosResponse | Promise<Error>

class HttpClint {
  cancelTokenList: AbortController[] = []

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
    // token设置
    (config) => {
      const token = '88888'
      if (token)
        config.headers.token = token
      return config
    },
    // 设置AbortController
    (config) => {
      const controller = new AbortController()
      config.signal = controller.signal
      this.cancelTokenList.push(controller)
      return config
    }
    // 全局header
  ]

  /**
   * 响应拦截列表
   * 如：统一错误处理
   */
  private responseInterceptorsList: IResponseInterceptors[] = [
    // 打印响应信息
    (response) => {
      console.groupCollapsed(`%c 请求信息 ${response.config.url}`, 'color: #409EFF')
      console.log('请求地址：', response.config.url)
      console.log('请求方法：', response.config.method)
      if (response.config.method === 'get')
        console.log('请求参数：', response.config.params)
      else
        console.log('请求参数：', response.config.data)

      console.log('接口响应数据：', response.data)
      console.groupEnd()
      return response
    },
    // 移除 AbortController
    (response) => {
      this.cancelTokenList = this.cancelTokenList.filter(item => item !== response.config.signal as unknown)
      return response
    }
    // 处理后端false
    // 处理后端true，只返回data
  ]

  /**
   * 请求/响应拦截器
   */
  private interceptors() {
    /**
     * 请求拦截
     * 如需添加处理，在this.requestInterceptorsList 中添加
     */
    this.instance.interceptors.request.use(
      (config) => {
        // 处理每项事件
        for (const interceptor of this.requestInterceptorsList)
          config = interceptor(config)

        return config
      },
      (error) => {
        // 请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1)
          console.error('请求超时!')
        return Promise.reject(error)
      })

    /**
     * 响应拦截
     * 如需添加，在this.responseInterceptorsList 中添加
     */
    this.instance.interceptors.response.use(
      async (response) => {
        for (const interceptor of this.responseInterceptorsList) {
          const interceptorResult = await interceptor(response)
          if (interceptorResult instanceof Error)
            return Promise.reject(interceptorResult)
        }
        return response
      },
      (error) => {
        const errorMessage = {
          ...error
        }
        if (error.response) {
          const status = error.response.status
          switch (status) {
            case 404:
              errorMessage.message = '接口不存在'
              break
            case 405:
              errorMessage.message = '请求方法错误'
              break
            case 500:
              errorMessage.message = '服务器内部错误'
              break
            default:
              break
          }
        }
        return Promise.reject(errorMessage)
      })
  }

  /**
   * 关闭所有请求
   */
  cancelAllRequest() {
    this.cancelTokenList.forEach(item => item.abort())
    this.cancelTokenList = []
  }

  get<T>(url: string, params?: unknown): Promise<T> {
    return this.instance.get(url, { params })
  }

  post<T>(url: string, data?: unknown): Promise<T> {
    return this.instance.post(url, data)
  }
}

export default new HttpClint()