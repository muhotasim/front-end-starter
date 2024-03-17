import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStateInterface } from '../utils/common.interfaces';
import { AuthApiService } from '../services/auth-api.service';
import appConst from '../constants/app.const';
import { clearCookie, getCookie, setCookie } from '../utils/common.functions';
import { ResponseType } from '../utils/contome.datatype';

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
    passwordResetSuccess: false,
    changePasswordSuccess: false,
    forgotPasswordMailSend: false,
    appLoading: true,
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
        },

    }
});
export const userActions = {
    ...userSlice.actions,
    login: (email: string, password: string) => async (dispatch: any) => {
        let error = null;
        try {
            dispatch(userSlice.actions.startAction())
            const authService = new AuthApiService(appConst.API_URL)
            const tokenResponse = await authService.requestToken(email, password);
            const tokenResult = await tokenResponse.json();
            if (tokenResult.type == ResponseType.success) {
                const tokenInfo = tokenResult.data;
                authService.updateAccessToken(tokenInfo.access_token);
                const userResponse = await authService.user();
                const userResult = await userResponse.json();
                if (userResult.type == ResponseType.success) {
                    const user = userResult.data;
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

                } else {
                    error = userResult.message;
                }
            } else {
                error = tokenResult.message;
            }

        } catch (e: any) {
            error = e.message
        }

        dispatch(userSlice.actions.actionDone({ error: error }))
    },
    revalidateTokens: () => async (dispatch: any) => {
        let error = null;
        try {
            const accessToken = getCookie('access_token');
            const refreshToken = getCookie('refresh_token');
            const accessTokenExpiry = getCookie('access_token_expiry_at');
            const authService = new AuthApiService(appConst.API_URL, accessToken ? accessToken : null);
            let nearExpiring = (accessTokenExpiry && ((Number(accessTokenExpiry) - new Date().getTime()) / 1000 < 180))
            if (refreshToken && (!accessToken || nearExpiring)) {
                const refreshTokenResponse = await authService.refreshToken(refreshToken);
                console.log('new token granted : ' + new Date().toLocaleString())

                const refreshResult = await refreshTokenResponse.json();
                if (refreshResult.type = ResponseType.success) {
                    const refreshTokenData = refreshResult.data;
                    authService.updateAccessToken(refreshTokenData.access_token);
                    const userResponse = await authService.user();
                    const userResult = await userResponse.json();
                    if (userResult.type == ResponseType.success) {
                        const user = userResult.data;
                        const loginData = {
                            user: {
                                token: refreshTokenData.access_token,
                                refetshToken: refreshTokenData.refresh_token,
                                name: user.name,
                                email: user.email,
                                permissions: user.permissions,
                            },
                            loggedIn: true,
                            appLoading: false
                        }
                        setCookie('access_token', refreshTokenData.access_token, Number(refreshTokenData.ac_token_expires_at))
                        setCookie('access_token_expiry_at', refreshTokenData.ac_token_expires_at, Number(refreshTokenData.ac_token_expires_at))
                        setCookie('refresh_token', refreshTokenData.refresh_token, Number(refreshTokenData.rf_token_expires_at))
                        setCookie('refresh_token_expiry_at', refreshTokenData.rf_token_expires_at, Number(refreshTokenData.rf_token_expires_at))
                        dispatch(userSlice.actions.updateState(loginData))
                    } else {
                        error = userResult.message;
                    }
                } else {
                    error = refreshResult.message;
                }
            } else if (refreshToken && accessToken) {

                authService.updateAccessToken(accessToken);
                const userResponse = await authService.user();
                const userResult = await userResponse.json();

                if (userResult.type == ResponseType.success) {
                    const user = userResult.data;
                    const loginData = {
                        user: {
                            token: accessToken,
                            refetshToken: refreshToken,
                            name: user.name,
                            email: user.email,
                            permissions: user.permissions,
                        },
                        loggedIn: true,
                        appLoading: false
                    }
                    dispatch(userSlice.actions.updateState(loginData))
                } else {
                    error = userResult.message;
                }
            }
        } catch (e: any) {
            error = e.message
        }
        dispatch(userSlice.actions.actionDone({ error: error }));
        
        dispatch(userSlice.actions.updateState({appLoading: false}))
    },
    logout: (accessToken: string) => async (dispatch: any) => {
        let error = null;
        try {
            dispatch(userSlice.actions.startAction())
            const authService = new AuthApiService(appConst.API_URL, accessToken)
            const logoutResponse = await authService.logout();
            const logoutResult = await logoutResponse.json()
            if (logoutResult.type == ResponseType.success) {
                clearCookie('access_token')
                clearCookie('access_token_expiry_at')
                clearCookie('refresh_token')
                clearCookie('refresh_token_expiry_at')
                dispatch(userSlice.actions.updateState({...initialState, appLoading: false}));
            } else {
                error = logoutResult.message;
            }
        } catch (e: any) {
            error = e.message
        }

        dispatch(userSlice.actions.actionDone({ error: error}))
    },
    forgotPassword: (email: string) => async (dispatch: any) => {
        let error = null;
        try {
            dispatch(userSlice.actions.startAction())
            const authService = new AuthApiService(appConst.API_URL)
            const forgorpasswordResponse = await authService.forgotPassword(email);
            const forgotPasswordResult = await forgorpasswordResponse.json()
            if (forgotPasswordResult.type == ResponseType.success) {
                dispatch(userSlice.actions.updateState({ forgotPasswordMailSend: true }));
            } else {
                error = forgotPasswordResult.message;
            }
        } catch (e:any) {
            error = e.message
        }
        dispatch(userSlice.actions.actionDone({ error: error }))
    },
    resetPassword: (token: string, newPassword: string) => async (dispatch: any) => {
        let error = null
        try {
            dispatch(userSlice.actions.startAction())
            const authService = new AuthApiService(appConst.API_URL)
            const resetpasswordResponse = await authService.resetPassword(token, newPassword);
            const resetpasswordResult = await resetpasswordResponse.json()
            if (resetpasswordResult.type == ResponseType.success) {
                dispatch(userSlice.actions.updateState({ passwordResetSuccess: true }));
            } else {
                error = resetpasswordResult.message;
            }

        } catch (e:any) {
            error = e.message;
        }
        dispatch(userSlice.actions.actionDone({ error: error }))
    },
    changePassword: (accessToken: string,password: string, newPassword: string) => async (dispatch: any) => {
        let error = null
        try {
            dispatch(userSlice.actions.startAction())
            const authService = new AuthApiService(appConst.API_URL, accessToken)
            const changepasswordResponse = await authService.changePassword(password, newPassword);
            const changePasswordResult = await changepasswordResponse.json()
            if (changePasswordResult.type == ResponseType.success) {
                dispatch(userSlice.actions.updateState({ changePasswordSuccess: true }));
            } else {
                error = changePasswordResult.message;
            }

        } catch (e:any) {
            error = e.message;
        }
        dispatch(userSlice.actions.actionDone({ error: error }))
    },
};

export default userSlice.reducer;
