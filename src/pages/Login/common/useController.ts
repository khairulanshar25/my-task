import React, { useState } from 'react'
import { useContext } from '../../../hooks/provider'
import useService from './useService'

const useController = () => {
  const [store] = useContext()
  const { LoginService } = useService()
  const [email, setEmail] = useState('two@email.com')
  const [password, setPassword] = useState('spassword123')
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = React.useCallback(
    () => setShowPassword((show) => !show),
    [],
  )

  //handler form email change use useCallback
  const handleEmailChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
    },
    [],
  )
  const handlePasswordChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value)
    },
    [],
  )

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      LoginService(email, password)
    },
    [email, password],
  )

  return {
    store,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange,
    email,
    password,
    showPassword,
    handleClickShowPassword,
  }
}

export default useController
