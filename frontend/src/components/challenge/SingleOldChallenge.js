/**
 * Created by NinoB on 5.3.2019 г.
 */

import React, {Component} from 'react';
import {Row, Col, Card, Icon, Avatar, Tooltip, Modal, message} from 'antd';
import {Link} from 'react-router-dom'

import withModal from '../hoc/withModal'

import StoryPage from '../story/StoryPage'
import BasicModal from "../story/BasicModal";

const {Meta} = Card;

class BasicSingleOldChallenge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stories: [],
        };
    }

    componentDidMount() {
        this.props.setSubHeaderKey('singleChallenge');

        this.props.Crud.getChallengeById(this.props.match.params.id).then((res) => {
            this.props.setHeaderCoverAvatar(res.body.cover)
            this.props.setHeaderCoverGroupInfo(
                res.body.name,
                '',
                '')
            if (res.success) {
                for (let storyById of res.body.storiesById) {
                    this.props.Crud.getStoryById(storyById).then((story) => {
                        console.log(story);
                        if (story.success){
                            this.props.Crud.getUserInfo(story.body.username).then((user) => {
                                if (user.success){
                                    story.body.avatar = user.body.avatar;

                                    this.setState(prevState => ({
                                        stories: [...prevState.stories, story.body]
                                            .sort((a, b) => a.createdAt.id - b.createdAt.id)
                                    }));
                                } else {
                                    message.error(user.body)
                                }
                            });
                        } else {
                            message.error(story.body)
                        }
                    })
                }
            } else {
                message.error(res.body)
            }
        })
    }

    componentWillUnmount() {
        this.props.setContentKey('')
        this.props.setHeaderCoverVisibility(false);
        this.props.setHeaderCoverAvatar('');
        this.props.setSubHeaderKey('')
        this.props.setSubHeaderLocation('')
        this.props.clearHeaderCoverGroupInfo()
    }

    render() {
        return (

            <div className='default-panel'>
                <Row gutter={16}>
                    {this.state.stories.map((str) =>
                        <Col span={6} style={{margin: 20}}>
                            <div>
                                <Card
                                    cover={<div className='imageFadeOut'><img
                                        onClick={() => this.props.showModal(str.id, str.name)}
                                        src={str.cover} alt="" style={{width: '100%'}}/></div>}
                                    actions={this.props.isAdmin ? [<Icon
                                        type="delete" onClick={this.delete}/>,
                                        <Icon type="edit" onClick={this.edit}/>] : null}
                                > <Meta
                                    avatar={<Tooltip placement="top"
                                                     title={'Click to see all ' + str.username + ' stories'}><Link
                                        to={{pathname: `/users/${str.username}`}}>
                                        <Avatar size={55} src={str.avatar}/>
                                    </Link></Tooltip>}
                                    title={<a style={{color: 'black'}}
                                              onClick={() => this.props.showModal(str.id, str.name)}>
                                        {str.name}
                                    </a>}
                                />
                                    <div style={{
                                        marginTop: 20,
                                        minHeight: 120
                                    }}>{str.info.substring(0, 300) !== str.info ?
                                        str.info.substring(0, 300) + '...'

                                        :
                                        str.info}</div>
                                </Card>
                            </div>
                        </Col>)}

                </Row>
                <BasicModal {...this.props}/>
            </div>
        );
    }
}

const SingleOldChallenge = withModal(BasicSingleOldChallenge)

export default SingleOldChallenge;