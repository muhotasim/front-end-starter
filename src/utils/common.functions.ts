interface CookieInfo {
    value: string;
    expires?: Date;
  }
export const setCookie = (name: string, value: string, milliseconds: number) => {
    const expirationDate = new Date(milliseconds);
    const expires = `expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}
export const getCookie = (name: string) => {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName)) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return '';
}
export const clearCookie = (name: string)=> {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}