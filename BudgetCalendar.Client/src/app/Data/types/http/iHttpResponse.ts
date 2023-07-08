import {ICategory} from "../../../features/calendar/models/iCategory";
import {IUserForAuthenticationDto} from "../auth/iUserForAuthentication.dto";

export interface IHttpResponse {
    isSuccess: boolean;
    data: IUserForAuthenticationDto | ICategory | null;
    errors?: string[] | null;
    message?: string | null;

}


