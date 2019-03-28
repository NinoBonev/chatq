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
        this.props.Crud.getChallengeById(this.props.match.params.id).then((res) => {
                for (let storyById of res.storiesById) {
                    this.props.Crud.getStoryById(storyById).then((story) => {
                        console.log(story);
                        this.props.Crud.getUserInfo(story.username).then((user) => {
                            story.avatar = user.avatar;

                            this.setState(prevState => (
                                { stories: [...prevState.stories , story]
                                }));
                        });
                    })

                }
        }).catch((err) => {
            message.error("Error");
        });
    }


    render() {
        let sorted = this.state.stories.sort((a, b) => a.createdAt.id - b.createdAt.id)

        return (

            <div className='default-panel'>
                <Row gutter={16}>
                        {sorted.map((str) =>
                            <Col span={6} style={{margin: 20}}>
                                <div>
                                    <Card
                                        hoverable
                                        cover={ <img onClick={() => this.props.showModal(str.id)}
                                                     src={str.cover} alt="" style={{width: '100%'}}/>}
                                        actions={this.props.isAdmin ? [<Icon
                                            type="delete" onClick={this.delete}/>,
                                            <Icon type="edit" onClick={this.edit}/>] : null}
                                    > <Meta
                                        avatar={<Tooltip placement="top"
                                                         title={'Click to see all ' + str.username + ' stories'}><Link
                                            to={{pathname: `/users/${str.username}`}}>
                                            <Avatar size={55} src={str.avatar}/>
                                        </Link></Tooltip>}
                                        title={<a style={{color: 'black'}} onClick={() => this.props.showModal(str.id)}>
                                                  {str.name}
                                            </a>}
                                    />
                                        <div style={{marginTop: 20, minHeight: 120}}>{str.info.substring(0, 300) !== str.info ?
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