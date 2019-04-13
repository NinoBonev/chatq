/**
 * Created by NinoB on 6.3.2019 г.
 */

//TODO Create a list of all user stories after click over his avatar

import React from 'react';
import {Col, Row, Card} from 'antd';
import {message} from 'antd/lib/index';
import moment from 'moment';
import Cover from '../../resources/9459329810_4ae305db6e_k.jpg'
import AllUserStories from "./AllUserStories";
import AllUserChallenges from "./AllUserChallenges";
import withModal from "../hoc/withModal";

const AllChallenges = withModal(AllUserChallenges)
const AllStories = withModal(AllUserStories)

export default class UserInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.Helper.allUserStoriesInitialState();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (!this.props.isAuth) {
            this.props.history.push({
                pathname: '/login',
                state: 'Please log in or register to use the full functionality'
            });
        } else {
            console.log(this.props);
            this.props.Crud.getUserInfo(this.props.match.params.name).then((res) => {
                console.log(res);
                if (res.success) {
                    window.scrollTo(0, 0);
                    this.props.setSubHeaderLocation(res.body.username)
                    this.props.setSubHeaderKey('user')
                    this.props.setHeaderCoverSource(Cover)
                    this.props.setHeaderCoverAvatar(res.body.avatar)
                    this.props.setHeaderCoverUserInfo(
                        res.body.name,
                        res.body.username,
                        res.body.followersByUsername.length,
                        res.body.followingUsersByUsername.length,
                        res.body.followingGroupsByName.length,
                        res.body.storiesById.length)
                    this.props.setHeaderCoverVisibility(true)
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

                    this.fetchAllUserStories(res.body);
                    this.fetchAllUserChallenges(res.body);
                }
            })
        }
    }

    fetchAllUserStories(res) {
        for (let storyId of res.storiesById) {
            this.props.Crud.getStoryById(storyId).then((story) => {
                if (story.success) {
                    this.setState(prevState => ({
                        stories: [...prevState.stories, story.body]
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
                    }));
                    this.props.setContentKey('userStories')
                } else {
                    message.error(story.body)
                }
            });
        }
    }

    fetchAllUserChallenges(res){
        for (let challengeId of res.challengesById) {
            this.props.Crud.getStoryById(challengeId).then((story) => {

                if (story.success) {
                    this.props.Crud.getChallengeById(story.body.challengeId).then((challenge) => {
                        if (challenge.success) {
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

    componentWillUnmount() {
        this.props.setHeaderCoverVisibility(false)
        this.props.setHeaderCoverAvatar('')
        this.props.setContentKey('')
        this.props.clearHeaderCoverUserInfo()
    }

    render() {
        let content = {
            userStories: <AllStories
                {...this.state}
                {...this.props}
            />,
            userChallenges: <AllChallenges
                {...this.state}
                {...this.props} />

        };

        return (
            <div>
                <Row gutter={32}>
                    <Col offset={2} span={20}>
                        <div className='dashboard-data-container'>
                            {content[this.props.contentKey]}
                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}