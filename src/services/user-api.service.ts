import { ApiService } from "./api.service";

export class UserApiService extends ApiService{
    constructor(apiUrl: string, token: string | null = null) {
        super(apiUrl, token);
    }

    list(page:number, perPage: number, filters: {[key:string]: any} = {}){
        return this.get({path: 'users', query: {page , perPage, ...filters}, allowAborate: true})
    }
    
    create(body: {[key:string]: any}|FormData){
        return this.post({path: 'users',body:body, allowAborate: true})
    }

    
    update(id:number,body: {[key:string]: any}|FormData){
        return this.post({path: 'users/'+id,body:body, allowAborate: true})
    }


    getById(id:number){
        return this.get({path: 'users/'+id, allowAborate: true})
    }

    destroy(id:number){
        return this.delete({path: 'users/'+id, allowAborate: true})
    }
}