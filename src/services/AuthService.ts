import { httpClient } from './httpClient';

interface ISignUpDto {
  name: string;
  email: string;
  password: string;
}

export class AuthService {
  static async signUp({ name, email, password }: ISignUpDto) {
    const { data } = await httpClient.post('/signup', {
      name, email, password,
    });

    return data;
  }
}
