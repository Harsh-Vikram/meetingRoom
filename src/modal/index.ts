export class AuthState {
  user: {
    isUserLoggedIn: boolean;
    email: string;
    password: string;
    displayName: string;
    uid: string;
  } = {
    isUserLoggedIn: false,
    email: '',
    password: '',
    displayName: '',
    uid: '',
  };
}
