import {environment} from "../../../../environments/environment.development";

const baseUrl = environment.baseUrl;
export const AuthPaths = {
  Login: `${baseUrl}/auth/login`,
  Register: `${baseUrl}/auth/register`
}
