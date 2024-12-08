import React, { createContext, useContext } from 'react'
import axios, { AxiosInstance } from 'axios'

const AxiosContext = createContext<AxiosInstance | null>(null)

export const axiosInstance = axios.create({
  baseURL: '/api/v1',
})

export const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
  // Attach request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      // Handle request errors (e.g., network issues, invalid configs)
      console.error('Request error:', error)
      return Promise.reject(error)
    }
  )

  // Attach response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      /*
       * From server we get response as
       * {
       *  message: string;
       *  data: {};
       *  error: [];
       *  statusCode: number
       * }
       *
       * with axios our response data is nested inside data
       * so we need to do response.data to get our response
       * i.e {message, data, error, statusCode}
       *
       * For some reason axios is firing twice and instead of returning
       * response.data only (it returns this on first call)
       * it returns response.data again which will be response.data.(our repsonse object)data
       *
       * hence this check
       */
      // first time response.data.data will be defined (it's our response.data object)
      // after this there won't be response.data.data defined
      // so we can just return response as it's our response object
      // *finger cross 🤞*
      if (response && response.data.data) {
        return response.data
      }
      return response
    },
    (error) => {
      // Handle errors from server responses
      if (error.response) {
        return Promise.reject(error.response.data)
      }
      return Promise.reject(error) // Always reject to propagate the error
    }
  )

  return <AxiosContext.Provider value={axiosInstance}>{children}</AxiosContext.Provider>
}

// Custom hook to access the Axios instance
export const useAxios = () => {
  const context = useContext(AxiosContext)
  if (!context) {
    throw new Error('useAxios must be used within an AxiosProvider')
  }
  return context
}
