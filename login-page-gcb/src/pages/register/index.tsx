// import Image from 'next/image'
import React from 'react'

import {
  Container,
  LoginImage,
  ContainerItens,
  H1,
  Label,
  Input,
  Button,
  SignInLink
} from './styles'

export default function Login() {
  return (
    <Container>
      <LoginImage />
      <ContainerItens>
        <img
          src="assets/logo-desktop.svg"
          alt="logo desktop"
          width={250}
          height={100}
        />

        <H1>Register</H1>

        <Label>Name</Label>
        <Input name="name" type="text" placeholder="Name" autoComplete="off" />
        <Label>Email</Label>
        <Input placeholder="Email" />
        <Label>Phone Number</Label>
        <Input type="number" placeholder="Phone Number" />
        <Label>Password</Label>
        <Input type="password" placeholder="Password" />
        <Label>Confirm Password</Label>
        <Input type="password" placeholder="Confirm Password" />

        <Button type="submit">Register</Button>
        <SignInLink>
          Already have an account? <a href="/login">Login</a>
        </SignInLink>
      </ContainerItens>
    </Container>
  )
}
