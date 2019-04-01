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
                const decoded = decode(res.body.accessToken);

                console.log(decoded);
            }

            return Promise.resolve(res);
        });
    }

    logout() {
        localStorage.removeItem('token');
    }

    getProfile() {
        try {
            const decoded = decode(this._getToken());

            return decoded.profile

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
        try {
            const decoded = decode(this._getToken());
            
            return decoded.profile.roles.indexOf("ROLE_ADMIN") > -1;

        } catch (err) {
            return undefined;
        }
    }

    _setToken(token) {
        localStorage.setItem('token', token);
    }

    _getToken() {
        return localStorage.getItem('token');
    }
}

export default AuthService;