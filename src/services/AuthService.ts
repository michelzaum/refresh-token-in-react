import { httpClient } from './httpClient';

interface ISignUpDto {
  name: string;
  email: string;
  password: string;
}

interface ISignInDto {
  email: string;
  password: string;
}

interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  static async signUp({ name, email, password }: ISignUpDto) {
    const { data } = await httpClient.post('/signup', {
      name, email, password,
    });

    return data;
  }

  static async signIn({ email, password }: ISignInDto) {
    const { data } = await httpClient.post<ISignInResponse>('/signin', {
      email, password,
    });

    return data;
  }

  static async refreshToken(refreshToken: string) {
    const { data } = await httpClient.post<ISignInResponse>('/refresh-token', {
      refreshToken,
    });

    return data;
  }
}
