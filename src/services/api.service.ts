import { getCookie, setCookie } from "../utils/common.functions";
import { QueryParams } from "../utils/common.interfaces";
export enum HTTPMethods { GET = 'GET', PUT = 'PUT', POST = 'POST', PATCH = 'PATCH', DELETE = 'DELETE' };
export class ApiService {
    constructor(protected readonly apiUrl: string, protected accessToken: string | null = null) { 
        const token = getCookie('access_token');
        if(token){
            this.accessToken = token;
        }
    }

    private apiCaller({ method = HTTPMethods.POST, path, query = {}, body = {}, allowAborate = false }: { allowAborate?: boolean, method: HTTPMethods, path: string, query?: QueryParams, body?: { [key: string]: any } | FormData }):Promise<any> {
        const fetchOptions: { [key: string]: any } = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        if (this.accessToken) {
            fetchOptions.headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        if (body) {
            if (body instanceof FormData) {
                fetchOptions.body = body;
            } else {
                if (Object.keys(body).length) fetchOptions.body = JSON.stringify(body);
            }
        }
        let urlSearchParam = new URLSearchParams();
        for (let key of Object.keys(query)) {
            urlSearchParam.append(key, query[key])
        }
        let searchParamStr = urlSearchParam.toString()

        let url = `${this.apiUrl}/${path}${searchParamStr ? '?' + searchParamStr : ''}`;
        return fetch(url, fetchOptions);
    }

    updateAccessToken(accessToken: string, tokenExpiry: number) {
        this.accessToken = accessToken;
        setCookie('access_token', accessToken, tokenExpiry);
    }
    get({ path, query = {}, allowAborate = false }: { allowAborate?: boolean, path: string, query?: QueryParams }) {
        return this.apiCaller({ method: HTTPMethods.GET, path: path, query: query, allowAborate })
    }
    post({ path, query = {}, body = {}, allowAborate = false }: { allowAborate?: boolean, path: string, query?: QueryParams, body?: { [key: string]: any } | FormData }) {
        return this.apiCaller({ method: HTTPMethods.POST, path, query, body, allowAborate });
    }
    put({ path, query = {}, body = {}, allowAborate = false }: { allowAborate?: boolean, path: string, query?: QueryParams, body?: { [key: string]: any } | FormData }) {
        return this.apiCaller({ method: HTTPMethods.PUT, path, query, body, allowAborate });
    }
    patch({ path, query = {}, body = {}, allowAborate = false }: { allowAborate?: boolean, path: string, query?: QueryParams, body?: { [key: string]: any } | FormData }) {
        return this.apiCaller({ method: HTTPMethods.PATCH, path, query, body, allowAborate });
    }
    delete({ path, query = {}, body = {}, allowAborate = false }: { allowAborate?: boolean, path: string, query?: QueryParams, body?: { [key: string]: any } | FormData }) {
        return this.apiCaller({ method: HTTPMethods.DELETE, path, query, body, allowAborate });
    }
}