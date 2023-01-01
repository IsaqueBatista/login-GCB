import React from 'react'

import * as S from './styles'

export default function Login() {
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

        <S.Label>Email</S.Label>
        <S.Input type="email" placeholder="Email" />
        <S.Label>Password</S.Label>
        <S.Input type="password" placeholder="Password" />

        <S.Button>Login</S.Button>
        <S.SignInLink>
          Donʼt have an account yet? Register <a href="/register">Here</a>
        </S.SignInLink>
      </S.ContainerItens>
    </S.Container>
  )
}
