import { useRouter } from 'next/router'
import * as React from 'react'
// import { useState } from 'react'
import { useForm } from 'react-hook-form'
// import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as S from './styles'

interface IFormInputs {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const schema = yup
  .object({
    name: yup.string().required('O nome é obrigatório'),

    email: yup
      .string()
      .email('Digite um email válido')
      .required('O email é obrigatório'),

    password: yup
      .string()
      .required('A senha é obrigatória')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Necessário ter no mínimo 8 caracteres, ' +
          'letra maiúscula e minúscula, ' +
          'número e caracter especial'
      ),

    confirmPassword: yup
      .string()
      .required('Confirmar a senha é obrigatório')
      .oneOf([yup.ref('password'), null], 'As senhas precisam ser iguais.')
  })
  .required()

export default function Register() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  })

  function onSubmit(data: IFormInputs) {
    const usersList = JSON.parse(localStorage.getItem('usersList') || '[]')

    const user = {
      name: data.name,
      email: data.email,
      password: btoa(data.password),
      confirmPassword: btoa(data.password)
    }

    localStorage.setItem('usersList', JSON.stringify([...usersList, user]))
    router.push('/login')
    return true
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

        <S.H1>Register</S.H1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.Label>
            Name
            <S.Input
              type="text"
              placeholder="Name"
              autoComplete="off"
              {...register('name', { required: true })}
            />
            {<span>{errors.name?.message}</span>}
          </S.Label>

          <S.Label>
            Email
            <S.Input
              type="text"
              placeholder="Email"
              {...register('email', { required: true })}
            />
            {<span>{errors.email?.message}</span>}
          </S.Label>

          <S.Label>
            Password
            <S.Input
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
            />
            {<span>{errors.password?.message}</span>}
          </S.Label>

          <S.Label>
            Confirm Password
            <S.Input
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword', { required: true })}
            />
            {<span>{errors.confirmPassword?.message}</span>}
          </S.Label>

          <S.Button type="submit">Register</S.Button>
        </form>

        <S.SignInLink>
          Already have an account? <a href="/login">Login</a>
        </S.SignInLink>
      </S.ContainerItens>
    </S.Container>
  )
}
