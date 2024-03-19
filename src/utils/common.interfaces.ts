export interface PermissionInterface {
    key: string;
}
export enum NotificationStatus {
    read = 'read',
    unread = 'unread',
    dismissed = 'dismissed'
}

export enum NotificationType {
    email = 'email',
    sms = 'sms',
    app = 'app'
}

export interface NotificationInterface<User>{ type: NotificationType, status: NotificationStatus, message: string, link: string, user:User  }
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
    changePasswordSuccess: boolean;
    appLoading: boolean;
    notifications: NotificationInterface<any>[]
}

export interface UiStateInterface {
    theme: string
    themeList: string[]
}

export interface QueryParams {
    [key:string]: any
}