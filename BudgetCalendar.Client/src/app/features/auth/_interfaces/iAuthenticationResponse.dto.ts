export interface IUserForAuthenticationResponse {
    isSuccessful: boolean;
    token?: string;
    errorMessage?: string;
    refreshToken?: string;
}