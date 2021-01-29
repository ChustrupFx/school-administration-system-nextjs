import {
  Background,
  Container,
  Label,
  Input,
  Title,
  SubmitButton
} from './style';

export default function Home() {
  return (
    <Background>
      <Container>
        <Title>Login</Title>
        <Label>Login</Label>
        <Input placeholder="Login" type="text"/>

        <Label>Senha</Label>
        <Input placeholder="Senha" type="password"/>

        <SubmitButton>Entrar</SubmitButton>
      </Container>
    </Background>

  );
}
