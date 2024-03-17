import { QueryParams } from "../utils/common.interfaces";
export enum HTTPMethods { GET = 'GET', PUT = 'PUT', POST = 'POST', PATCH = 'PATCH', DELETE = 'DELETE' };
export class ApiService {
    constructor(protected readonly apiUrl: string, protected accessToken: string | null = null) { }

    private apiCaller({ method = HTTPMethods.POST, path, query = {}, body = {} }: { method: HTTPMethods, path: string, query?: QueryParams, body?: { [key: string]: any } | FormData }) {
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
               if(Object.keys(body).length) fetchOptions.body = JSON.stringify(body);
            }
        }
        let urlSearchParam = new URLSearchParams();
        for (let key of Object.keys(query)) {
            urlSearchParam.append(key, query[key])
        }
        let searchParamStr = urlSearchParam.toString()

        let url = `${this.apiUrl}/${path}${searchParamStr?'?'+searchParamStr:''}`;
        return fetch(url, fetchOptions);
    }

    updateAccessToken(accessToken:string){
        this.accessToken = accessToken;
    }
    get({ path, query = {} }: { path: string, query?: QueryParams }) {
        return this.apiCaller({ method: HTTPMethods.GET, path: path, query: query })
    }
    post({ path, query = {}, body = {} }: { path: string, query?: QueryParams, body?: { [key: string]: any } | FormData }) {
        return this.apiCaller({ method: HTTPMethods.POST, path, query, body });
    }
    put({ path, query = {}, body = {} }: { path: string, query?: QueryParams, body?: { [key: string]: any } | FormData }) {
        return this.apiCaller({ method: HTTPMethods.PUT, path, query, body });
    }
    patch({ path, query = {}, body = {} }: { path: string, query?: QueryParams, body?: { [key: string]: any } | FormData }) {
        return this.apiCaller({ method: HTTPMethods.PATCH, path, query, body });
    }
    delete({ path, query = {}, body = {} }: { path: string, query?: QueryParams, body?: { [key: string]: any } | FormData }) {
        return this.apiCaller({ method: HTTPMethods.DELETE, path, query, body });
    }
}