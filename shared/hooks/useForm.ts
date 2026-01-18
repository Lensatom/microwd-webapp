import { useState } from "react"

export const useForm = <T>(initialValues:T) => {

  const initialErrors = {
    ...initialValues,
    general: ""
  }

  const [data, setData] = useState<T>(initialValues)
  const [error, setError] = useState<T & {general: string}>(initialErrors)
  const [isLoading, setIsLoading] = useState(false)

  const clearFieldError = (key:string) => {
    setError(prev => ({
      ...prev,
      [key]: ""
    }))
  }

  const changeData = (key:string, value:any) => {
    clearFieldError(key)
    
    setData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const changeError = (key:string, value:any) => {
    setError(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearForm = () => {
    setData(initialValues)
  }

  return {
    data,
    setData,
    error,
    changeError,
    changeData,
    clearForm,
    isLoading,
    setIsLoading
  }
}