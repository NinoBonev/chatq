/**
 * Created by NinoB on 6.3.2019 г.
 */

//TODO Create a list of all user stories after click over his avatar

import React from 'react';
import {Col, Row, Card, Avatar, Button, Modal, Popconfirm, Icon} from 'antd';
import StoryPage from '../story/StoryPage';
import {message} from 'antd/lib/index';
import moment from 'moment';
import Cover from '../../resources/9459329810_4ae305db6e_k.jpg'
import AllUserStories from "./AllUserStories";
import AllUserChallenges from "./AllUserChallenges";

const {Meta} = Card;

export default class UserInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.Helper.allUserStoriesInitialState();
    }

    componentDidMount() {
        if (!this.props.isAuth) {
            this.props.history.push({
                pathname: '/login',
                state: 'Please log in or register to use the full functionality'
            });
        } else {
            this.fetchAllUserStories();
        }
    }

    fetchAllUserStories() {
        this.props.Crud.getUserInfo(this.props.match.params.name).then((res) => {
            if (res.success){
                window.scrollTo(0,0);
                this.props.setSubHeaderLocation(res.body.username)
                this.props.setSubHeaderKey('user')
                this.props.setContentKey('userStories')
                this.props.setHeaderCoverVisibility(true)
                this.props.setHeaderCoverSource(Cover)
                this.props.setHeaderCoverAvatar(res.body.avatar)
                this.props.setHeaderCoverUserInfo(
                    res.body.name,
                    res.body.username,
                    res.body.followersByUsername.length,
                    res.body.followingUsersByUsername.length,
                    res.body.followingGroupsByName.length,
                    res.body.storiesById.length)
                let user = this.props.Auth.getProfile();

                let followCurrentUser = false;
                let notMyProfile = true;

                if (res.body.username === user.username) {
                    notMyProfile = false;
                }

                if (res.body.followersByUsername !== undefined && res.body.followersByUsername.indexOf(user.username) > -1) {
                    followCurrentUser = true;
                }

                this.setState({
                    avatar: res.body.avatar,
                    user: res.body.username,
                    userId: res.body.id,
                    notMyProfile,
                    myUsername: user.username,
                    followCurrentUser
                });


                for (let storyId of res.body.storiesById) {
                    this.props.Crud.getStoryById(storyId).then((story) => {
                        if (story.success){
                            this.setState(prevState => ({
                                stories: [...prevState.stories, story.body]
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
                            }));
                        } else {
                            message.error(story.body)
                        }
                    });
                }

                for (let challengeId of res.body.challengesById) {
                    this.props.Crud.getStoryById(challengeId).then((story) => {

                        if (story.success){
                            this.props.Crud.getChallengeById(story.body.challengeId).then((challenge) => {
                                if (challenge.success){
                                    if (this.props.isAdmin) {
                                        this.setState(prevState => ({
                                            challenges: [...prevState.challenges, story.body]
                                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                        }));
                                    } else {
                                        if (moment(challenge.body.deadlineDate).isBefore(moment.now())) {
                                            this.setState(prevState => ({
                                                challenges: [...prevState.challenges, story.body]
                                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
                                            }));
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
            }
        })
    }

    componentWillUnmount(){
        this.props.setHeaderCoverVisibility(false)
        this.props.setHeaderCoverAvatar('')
        this.props.setContentKey('')
        this.props.clearHeaderCoverUserInfo()
    }

    render() {
        let content = {
            userStories: <AllUserStories
                {...this.state}
                {...this.props}
            />,
            userChallenges: <AllUserChallenges
                {...this.state}
                {...this.props} />

        };

        return (
            <div >
                <Row gutter={32}>
                    <div className='dashboard-data-container'>
                        {content[this.props.contentKey]}
                    </div>
                </Row>
            </div>

        );
    }
}