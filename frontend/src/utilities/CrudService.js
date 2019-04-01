/**
 * Created by NinoB on 23.2.2019 г.
 */

import RequestService from './RequestService';

let Request = new RequestService("https://chatq.social");

class CrudService {
    constructor() {
        this.getAllChallenges = this.getAllChallenges.bind(this);
        this.getChallengeById = this.getChallengeById.bind(this);
        this.addChallenge = this.addChallenge.bind(this);
        this.archiveOldChallengeById = this.archiveOldChallengeById.bind(this);

        this.getAllGroups = this.getAllGroups.bind(this);
        this.getGroupById = this.getGroupById.bind(this);
        this.getGroupByName = this.getGroupByName.bind(this);
        this.addGroup = this.addGroup.bind(this);
        this.archiveGroupById = this.archiveGroupById.bind(this);

        this.getStoryById = this.getStoryById.bind(this);
        this.createStory = this.createStory.bind(this);
        this.editStoryInfo = this.editStoryInfo.bind(this);
        this.deleteStoryById = this.deleteStoryById.bind(this);

        this.startFollowGroup = this.startFollowGroup.bind(this);
        this.stopFollowGroup = this.stopFollowGroup.bind(this);
        this.startFollowUser = this.startFollowUser.bind(this);
        this.stopFollowUser = this.stopFollowUser.bind(this);

        this.addCommentToStory = this.addCommentToStory.bind(this);
        this.getCommentById = this.getCommentById.bind(this);

        this.getUserInfo = this.getUserInfo.bind(this)
        this.getAllUsers = this.getAllUsers.bind(this);
    }

    startFollowGroup(group_name, username, payload){
        const token = this._getToken();
        return Request.post(`/${group_name}/${username}/start_follow_group`,  payload, token).then((res) => {
            return Promise.resolve(res);
        })
    }

    stopFollowGroup(group_name, username, payload){
        const token = this._getToken();
        return Request.post(`/${group_name}/${username}/stop_follow_group`,  payload, token).then((res) => {
            return Promise.resolve(res);
        })
    }

    startFollowUser(myUsername, followed_username, payload){
        const token = this._getToken();
        return Request.post(`/${myUsername}/${followed_username}/start_follow_user`,  payload, token).then((res) => {
            return Promise.resolve(res);
        })
    }

    stopFollowUser(myUsername, followed_username, payload){
        const token = this._getToken();
        return Request.post(`/${myUsername}/${followed_username}/stop_follow_user`,  payload, token).then((res) => {
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

    archiveOldChallengeById(id){
        const token = this._getToken();
        return Request.post(`/admin/challenges/archive/${id}`, {}, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    addGroup(payload){
        const token = this._getToken();
        return Request.post('/admin/groups/create_group', payload, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    archiveGroupById(id) {
        const token = this._getToken();
        return Request.post(`/admin/groups/archive/${id}`, {}, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    openGroupById(id){
        const token = this._getToken();
        return Request.post(`/admin/groups/open/${id}`, {}, token).then((res) => {
            return Promise.resolve(res);
        });
    }

    closeGroupById(id){
        const token = this._getToken();
        return Request.post(`/admin/groups/close/${id}`, {}, token).then((res) => {
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