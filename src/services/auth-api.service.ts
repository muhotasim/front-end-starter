import { ApiService } from "./api.service";

export class AuthApiService extends ApiService{
    constructor(apiUrl: string, token: string | null = null) {
        super(apiUrl, token);
    }

    requestToken(email:string, password: string){
        return this.post({path: 'auth/token', body: { email, password }})
    }

    notifications(page:number, perPage: number){
        console.log(this.accessToken)
        return this.get({path: 'notifications', query: {page , perPage}, allowAborate: true})
    }

    refreshToken(refreshToken: string){
        return this.post({path: 'auth/refresh-token', body: { refresh_token: refreshToken }})
    }
    
    logout(){
        return this.post({path: 'auth/logout', body: { access_token: this.accessToken }})
    }

    forgotPassword(email:string){
        return this.post({path: 'auth/forgot-password', body: { email: email }})
    }

    resetPassword(newPassword: string){
        return this.patch({path: 'auth/reset-password', body: { token: this.accessToken, new_password: newPassword }})
    }

    user(){
        return this.get({path: 'auth/user'})
    }

    changePassword(currentPassword:string, newPassword:string){
        return this.patch({path: 'auth/update-password', body: { current_password: currentPassword, new_password: newPassword }});
    }
}