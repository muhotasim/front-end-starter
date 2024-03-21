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
export interface AuthStateInterface {
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
export interface NotificationStateInterface {
    perPage: number;
    page: number;
    notifications: NotificationInterface<number>[];
    total: number;
    
    isLoading: boolean;
    error: any;
    grid: any[];
    gridFilters: {[key:string]: any}
}
export interface UsersStateInterface {
    perPage: number;
    page: number;
    users: any[];
    total: number;
    
    isLoading: boolean;
    error: any;
    grid: any[];
    gridFilters: {[key:string]: any}
}
export interface RolesStateInterface {
    perPage: number;
    page: number;
    roles: any[];
    rolesAll: {id:number, name:string}[];
    total: number;
    
    isLoading: boolean;
    error: any;
    grid: any[];
    gridFilters: {[key:string]: any}
}
export interface PermissionStateInterface {
    perPage: number;
    page: number;
    permissions: any[];
    permissionAll: {id:number, name:string}[];
    total: number;
    
    isLoading: boolean;
    error: any;
    grid: any[];
    gridFilters: {[key:string]: any}
}
export interface UiStateInterface {
    theme: string
    themeList: string[]
}

export interface QueryParams {
    [key:string]: any
}