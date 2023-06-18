export interface IUserForAuthenticationResponse {
    isAuthSuccessful: boolean;
    token?: string;
    errorMessage?: string;
    refreshToken?: string;
}