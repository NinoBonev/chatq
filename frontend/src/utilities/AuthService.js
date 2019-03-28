/**
 * Created by NinoB on 23.2.2019 г.
 */

import decode from 'jwt-decode';

import RequestService from './RequestService';

let Request = new RequestService();

class AuthService {
    constructor() {
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
    }

    register(payload) {
        return Request.post('/auth/register', payload).then((res) => {
            if (res.success) {
                this._setToken(res.body.token);
            }

            return Promise.resolve(res);
        });
    }

    login(payload) {
        return Request.post('/auth/login', payload).then((res) => {
            if (res.success) {
                this._setToken(res.body.accessToken);
                this.getProfile().then((profile) => {
                    if (profile.admin){
                        console.log(profile);
                        this._setAdminValue(true)
                    } else {
                        this._setAdminValue(false);
                    }
                })
            }

            return Promise.resolve(res);
        });
    }

    logout() {
        localStorage.removeItem('admin');
        localStorage.removeItem('token');
    }

    getUsername(){
        try {
            const decoded = decode(this._getToken());

            return decoded.sub

        } catch (err) {
            return undefined;
        }
    }

    getProfile() {
        try {
            const decoded = decode(this._getToken());

            return Request.get(`/users/${decoded.sub}`).then((res) => {
                 return Promise.resolve(res)
            });

        } catch (err) {
            return undefined;
        }
    }

    isLoggedIn() {
        try {
            const decoded = decode(this._getToken());

            if (decoded.exp > Date.now() / 1000) {
                return true;
            }

            return false;
        } catch (err) {
            return false;
        }
    }

    isAdmin(){
        return true;
    }

    _setAdminValue(boolean) {
        localStorage.setItem('admin', boolean);
        this.adminValue = boolean;
    }

   _getAdminValue() {
        return this._adminValue
    }

    _setToken(token) {
        localStorage.setItem('token', token);
    }

    _getToken() {
        return localStorage.getItem('token');
    }
}

export default AuthService;