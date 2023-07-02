import { IUserForAuthenticationDto } from "src/app/features/auth/_interfaces/iUserForAuthentication.dto";

export interface IHttpResponse {
    isSuccess: boolean;
    data: IUserForAuthenticationDto | null;
    errors?: string[] | null;
    message?: string | null;

}


