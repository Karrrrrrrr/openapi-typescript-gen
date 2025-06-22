import axios, { AxiosRequestConfig } from 'axios'

const ins = axios.create({})
type Pagination = {
    totalPage: number,
    currentPage: number,
    perPage: number,
    totalCount: number
}
type HttpResponse<T> = {
    data: T,
    message?: string,
    code: number,
    pagination?: Pagination
}


export async function request<T = any>(config: AxiosRequestConfig) {
    config.headers ||= {}
    config.headers.Authorization ||= 'Bearer ...'
    const response = await ins(config)
    const data = response.data as HttpResponse<T>
    if (data.message) {
        // create notify ...
    }
    return data
}
