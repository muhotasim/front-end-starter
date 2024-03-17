export interface PermissionInterface {
    key: string;
}

export interface UserStateInterface {
    user: {
        token: string | null;
        refetshToken: string | null;
        name: string;
        email: string;
        permissions: PermissionInterface[];
    },
    loggedIn: boolean;
    isLoading: boolean;
    error: any;
    passwordResetSuccess: boolean;
    forgotPasswordMailSend: boolean;
}

export interface UiStateInterface {
    theme: string
    themeList: string[]
}

export interface QueryParams {
    [key:string]: any
}