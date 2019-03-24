/**
 * Created by NinoB on 23.2.2019 г.
 */

import RequestService from './RequestService';

let Request = new RequestService();

class CrudService {
    constructor() {
        this.addChallenge = this.addChallenge.bind(this);
        this.addStoryToOpenGroup = this.addStoryToOpenGroup.bind(this)
        this.addStoryToOpenChallenge = this.addStoryToOpenChallenge.bind(this)

        this.getAllChallenges = this.getAllChallenges.bind(this);
        this.getAllGroups = this.getAllGroups.bind(this);
        this.getGroupById = this.getGroupById.bind(this);
        this.getStoryById = this.getStoryById.bind(this);

        this.getUserInfo = this.getUserInfo.bind(this)
    }

    startFollowGroup(groupId, userId, payload){
        const token = this._getToken();
        return Request.post(`/${groupId}/${userId}/start_follow_group`,  payload, token).then((res) => {
            return Promise.resolve(res);
        })
    }

    stopFollowGroup(groupId, userId, payload){
        const token = this._getToken();
        return Request.post(`/${groupId}/${userId}/stop_follow_group`,  payload, token).then((res) => {
            return Promise.resolve(res);
        })
    }

    startFollowUser(myId, userId, payload){
        const token = this._getToken();
        return Request.post(`/${myId}/${userId}/start_follow_user`,  payload, token).then((res) => {
            return Promise.resolve(res);
        })
    }

    stopFollowUser(myId, userId, payload){
        const token = this._getToken();
        return Request.post(`/${myId}/${userId}/stop_follow_user`,  payload, token).then((res) => {
            return Promise.resolve(res);
        })
    }

    getUserInfo(id){
        return Request.get(`/users/${id}`).then((res) => {
            return Promise.resolve(res);
        });
    }

    getAllUsers(){
        return Request.get(`/admin/users/all`).then((res) => {
            return Promise.resolve(res);
        });
    }

    deleteUserById(id){
        console.log(id);
        const token = this._getToken();
        return Request.delete(`/admin/users/delete/${id}`, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    addChallenge(payload){
        const token = this._getToken();
        return Request.post('/admin/challenges/create', payload, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    getAllChallenges() {
        return Request.get('/challenges').then((res) => {
            return Promise.resolve(res);
        });
    }

    getChallengeById(id){
        return Request.get(`/challenges/${id}`).then((res) => {
            return Promise.resolve(res);
        });
    }

    addStoryToOpenChallenge(payload){
        const token = this._getToken();
        return Request.post('/challenges/add_story', payload, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    getAllGroups() {
        return Request.get('/groups').then((res) => {
            return Promise.resolve(res);
        });
    }

    getGroupById(id) {
        return Request.get(`/groups/${id}`).then((res) => {
            return Promise.resolve(res);
        });
    }

    getStoryById(id){
        return Request.get(`/story/${id}`).then((res) => {
            return Promise.resolve(res);
        });
    }

    addStoryToOpenGroup(payload){
        const token = this._getToken();
        return Request.post('/story/create', payload, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    editStoryInfo(id, payload) {
        const token = this._getToken();
        return Request.update(`/story/editInfo/${id}`, payload, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    deleteStoryFromGroupById(id){
        const token = this._getToken();
        return Request.delete(`/story/delete_from_group/${id}`, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    deleteStoryFromChallengeById(id){
        const token = this._getToken();
        return Request.delete(`/story/delete_from_challenge/${id}`, token).then((res) => {
            return Promise.resolve(res);
        });
    }


    _getToken() {
        return localStorage.getItem('token');
    }
}

export default CrudService;