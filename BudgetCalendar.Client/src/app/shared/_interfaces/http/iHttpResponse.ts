import { IUserForAuthenticationDto } from "src/app/features/auth/_models/iUserForAuthenticationDto";

export interface IHttpResponse {
    isSuccess: boolean;
    data: IUserForAuthenticationDto | null;
    errors?: string[] | null;
    message?: string | null;

}


