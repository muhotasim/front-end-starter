import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStateInterface } from '../utils/common.interfaces';
import { AuthApiService } from '../services/auth-api.service';
import appConst from '../constants/app.const';
import { getCookie, getCookieWithExpiry, setCookie } from '../utils/common.functions';

const initialState: UserStateInterface = {
    user: {
        token: null,
        refetshToken: null,
        name: '',
        email: '',
        permissions: [],
    },
    loggedIn: false,
    isLoading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        startAction: (state) => {
            return { ...state, isLoading: true };
        },
        actionDone: (state, action: PayloadAction<{ error: any }>) => {
            return { ...state, isLoading: false, error: action.payload.error };
        },
        updateState: (state, action: PayloadAction<{ [key: string]: any }>) => {
            return { ...state, ...action.payload };
        }
    }
});
export const userActions = {
    ...userSlice.actions,
    login: (email: string, password: string) => async (dispatch: any) => {
        try {
            dispatch(userSlice.actions.startAction())
            const authService = new AuthApiService(appConst.API_URL)
            const tokenResponse = await authService.requestToken(email, password);

            if (tokenResponse.ok) {
                const tokenInfo = await tokenResponse.json();
                authService.updateAccessToken(tokenInfo.access_token);
                const userResponse = await authService.user();
                if (userResponse.ok) {
                    const user = await userResponse.json();
                    const loginData = {
                        user: {
                            token: tokenInfo.access_token,
                            refetshToken: tokenInfo.refresh_token,
                            name: user.name,
                            email: user.email,
                            permissions: user.permissions,
                        },
                        loggedIn: true
                    }
                    setCookie('access_token', tokenInfo.access_token, Number(tokenInfo.ac_token_expires_at))
                    setCookie('access_token_expiry_at', tokenInfo.ac_token_expires_at, Number(tokenInfo.ac_token_expires_at))
                    setCookie('refresh_token', tokenInfo.refresh_token, Number(tokenInfo.rf_token_expires_at))
                    setCookie('refresh_token_expiry_at', tokenInfo.rf_token_expires_at, Number(tokenInfo.rf_token_expires_at))
                    dispatch(userSlice.actions.updateState(loginData))
                }
            }
            dispatch(userSlice.actions.actionDone({ error: null }))
        } catch (error) {
            dispatch(userSlice.actions.actionDone({ error: error }))
        }
    },
    revalidateTokens: (logedIn:boolean)=>async (dispatch: any) => {
        try {
        const accessToken = getCookie('access_token');
        const refreshToken = getCookie('refresh_token');
        const accessTokenExpiry = getCookie('access_token_expiry_at');
        const authService = new AuthApiService(appConst.API_URL, accessToken?accessToken:null);
        let nearExpiring = (accessTokenExpiry&&((Number(accessTokenExpiry)-new Date().getTime())/1000<180))
        if(refreshToken && (!accessToken || nearExpiring)){
            const refreshTokenResponse = await authService.refreshToken(refreshToken);
            if(refreshTokenResponse.ok){
                
                const refreshTokenData = await refreshTokenResponse.json();
                authService.updateAccessToken(refreshTokenData.access_token);
                const userResponse = await authService.user();
                if (userResponse.ok) {
                    const user = await userResponse.json();
                    const loginData = {
                        user: {
                            token: refreshTokenData.access_token,
                            refetshToken: refreshTokenData.refresh_token,
                            name: user.name,
                            email: user.email,
                            permissions: user.permissions,
                        },
                        loggedIn: true
                    }
                    setCookie('access_token', refreshTokenData.access_token, Number(refreshTokenData.ac_token_expires_at))
                    setCookie('access_token_expiry_at', refreshTokenData.ac_token_expires_at, Number(refreshTokenData.ac_token_expires_at))
                    setCookie('refresh_token', refreshTokenData.refresh_token, Number(refreshTokenData.rf_token_expires_at))
                    setCookie('refresh_token_expiry_at', refreshTokenData.rf_token_expires_at, Number(refreshTokenData.rf_token_expires_at))
                    dispatch(userSlice.actions.updateState(loginData))
                }
            }
            dispatch(userSlice.actions.actionDone({ error: null }))
        }else if(refreshToken && accessToken){
            
            authService.updateAccessToken(accessToken);
            const userResponse = await authService.user();
            if (userResponse.ok) {
                const user = await userResponse.json();
                const loginData = {
                    user: {
                        token: accessToken,
                        refetshToken: refreshToken,
                        name: user.name,
                        email: user.email,
                        permissions: user.permissions,
                    },
                    loggedIn: true
                }
                dispatch(userSlice.actions.updateState(loginData))
            }
            dispatch(userSlice.actions.actionDone({ error: null }))
        }
    } catch (error) {
            dispatch(userSlice.actions.actionDone({ error: error }))
        }
    }
};

export default userSlice.reducer;
