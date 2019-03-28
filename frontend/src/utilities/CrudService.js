/**
 * Created by NinoB on 23.2.2019 г.
 */

import RequestService from './RequestService';

let Request = new RequestService();

class CrudService {
    constructor() {
        this.addChallenge = this.addChallenge.bind(this);
        this.createStory = this.createStory.bind(this)

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

    getUserInfo(username){
        const token = this._getToken();
        return Request.get(`/users/${username}`, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    getAllUsers(){
        const token = this._getToken();
        return Request.get(`/admin/users/all`, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    deleteUserById(id){
        const token = this._getToken();
        return Request.delete(`/admin/users/delete/${id}`, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    addChallenge(payload){
        const token = this._getToken();
        return Request.post('/admin/challenges/create_challenge', payload, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    addGroup(payload){
        const token = this._getToken();
        return Request.post('/admin/groups/create_group', payload, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    getAllChallenges() {
        const token = this._getToken();
        return Request.get('/challenges', token).then((res) => {
            return Promise.resolve(res);
        });
    }

    getChallengeById(id){
        const token = this._getToken();
        return Request.get(`/challenges/${id}`, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    getAllGroups() {
        const token = this._getToken();
        return Request.get('/groups', token).then((res) => {
            return Promise.resolve(res);
        });
    }

    getGroupById(id) {
        const token = this._getToken();
        return Request.get(`/groups/${id}`, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    getGroupByName(name) {
        const token = this._getToken();
        return Request.get(`/groups/${name}`, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    deleteGroupById(id) {
        const token = this._getToken();
        return Request.delete(`/groups/delete/${id}`, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    getStoryById(id){
        const token = this._getToken();
        return Request.get(`/story/${id}`, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    createStory(payload){
        const token = this._getToken();
        return Request.post('/story/create', payload, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    editStoryInfo(id, payload) {
        const token = this._getToken();
        return Request.post(`/story/editInfo/${id}`, payload, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    deleteStoryById(id){
        const token = this._getToken();
        return Request.post(`/story/delete/${id}`, {}, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    addCommentToStory(payload){
        const token = this._getToken();
        return Request.post('/story/add_comment', payload, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    getCommentById(id){
        const token = this._getToken();
        return Request.get(`/comments/${id}`, token).then((res) => {
            return Promise.resolve(res);
        });
    }


    _getToken() {
        return localStorage.getItem('token');
    }
}

export default CrudService;