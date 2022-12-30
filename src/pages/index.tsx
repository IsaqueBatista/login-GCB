import { useRouter } from 'next/router'

import { Button } from 'components/Button'

import * as S from './styles'

export interface HomeProps {
  name: string
  email: string
}

export default function Home(props: HomeProps) {
  const keysToRemove = ['email', 'token']

  const router = useRouter()

  const handleLogout = (): void => {
    keysToRemove.forEach((k) => localStorage.removeItem(k))
    router.push('/login')
  }

  return (
    <>
      <S.Container>
        <S.ContainerItens>
          <S.H1>Seja Bem Vindo ao Grupo GCB!</S.H1>
          <S.P>
            <span>Name: </span>
            {props.name}
          </S.P>
          <S.P>
            <span>Email: </span>
            {props.email}
          </S.P>
          <Button type="submit" handleLogout={handleLogout}>
            Logout
          </Button>
        </S.ContainerItens>
      </S.Container>
    </>
  )
}
