import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { generateToken } from '../../utils/tokenGenerator'

import { ForwardRef } from '../../components/ForwardRef'
import * as S from './styles'

interface User {
  name: string
  email: string
  password: string
}
interface ValidationProps {
  value?: string
  errorKeyName: string
}
interface FormData {
  email: string
  password: string
}

export default function Login() {
  const schema = Yup.object({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),

    password: Yup.string()
      .required('A senha é obrigatória')
      .min(
        8,
        'A senha deve ter mínimo de 8 dígitos, ' +
          'letra maiúscula e minúscula, ' +
          'número e caracter especial.'
      )
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'A senha deve ter mínimo de 8 dígitos, ' +
          'letra maiúscula e minúscula, ' +
          'número e caracter especial.'
      )
  }).required()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const router = useRouter()

  const [email] = useState('')
  const [password] = useState('')
  const onSubmit = (data: FormData) => {
    const usersList = JSON.parse(localStorage.getItem('usersList') || '[]')

    const userExists = usersList.find(
      (user: User) =>
        user.email === email && window.atob(user.password) === password
    )

    function hasFieldFilled({ value, errorKeyName }: ValidationProps) {
      if (!value) {
        toast.error(`Preencha com um ${errorKeyName} existente`)
        return false
      }
      return true
    }
    const formDataValidators: Record<
      keyof FormData,
      (value: string) => boolean
    > = {
      email: (value) => hasFieldFilled({ value, errorKeyName: 'email' }),
      password: (value) => {
        if (!userExists) {
          toast.error('Email ou senha inválidos')
          return false
        }
        localStorage.setItem('token', generateToken(12))
        localStorage.setItem('email', email)
        router.push('/')
        return true
      }
    }

    const isFormValid = (data: FormData): boolean => {
      return Object.entries(data).reduce((acc, [k, v]) => {
        return acc && formDataValidators[k as keyof FormData](v)
      }, true)
    }

    isFormValid({ email, password })
  }
  return (
    <S.Container>
      <S.LoginImage />
      <S.ContainerItens>
        <img
          src="assets/logo-desktop.svg"
          alt="logo desktop"
          width={250}
          height={100}
        />

        <S.H1>Login</S.H1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <S.Label>
            Email
            <S.Input
              // name="email"
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
            />
            {<span>{errors.email?.message}</span>}
          </S.Label>

          <S.Label>
            Password
            <S.Input
              type="password"
              // name="password"
              placeholder="Password"
              {...register('password', { required: true })}
            />
            {<span>{errors.password?.message}</span>}
          </S.Label>

          <S.Button type="submit">Login</S.Button>
        </form>

        <ForwardRef
          text="Donʼt have an account yet? Register&nbsp;"
          hyperLink="Here"
          link="/register"
        />
      </S.ContainerItens>
    </S.Container>
  )
}
