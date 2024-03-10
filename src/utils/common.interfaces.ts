export interface PermissionInterface {
    key: string;
}

export interface UserStateInterface {
    token: string | null;
    refetshToken: string | null;
    name: string;
    email: string;
    permissions: PermissionInterface[];
    loggedIn: boolean;
}

export interface UiStateInterface {
    theme: string
    themeList: string[]
}