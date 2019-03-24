/**
 * Created by NinoB on 5.3.2019 г.
 */

import React, {Component} from 'react';
import {Row, Col, Card, Icon, Avatar, Tooltip, Modal, message} from 'antd';
import {Link} from 'react-router-dom'

import withModal from '../hoc/withModal'

import StoryPage from '../story/StoryPage'
import BasicModal from "../home/BasicModal";

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
            if (res.success) {
                for (let story of res.body.stories) {
                    this.props.Crud.getStoryById(story).then((currentStory) => {

                        this.props.Crud.getUserInfo(currentStory.body.createdBy).then((user) => {

                            currentStory.body.avatar = user.body.avatar;
                            currentStory.body.username = user.body.username;
                            currentStory.body.createdBy = user.body._id;

                            this.setState(prevState => (
                                { stories: [...prevState.stories , currentStory.body]
                                }));
                        });
                    })

                }
            } else {
                message.error(res.message);
            }
        }).catch((err) => {
            message.error("Error");
        });
    }


    render() {
        let sorted = this.state.stories.sort((a, b) => a.currentStory._id - b.currentStory._id)

        return (

            <div className='default-panel'>
                <Row gutter={16}>
                        {sorted.map((str) =>
                            <Col span={6} style={{margin: 20}}>
                                <div>
                                    <Card
                                        hoverable
                                        cover={ <img onClick={() => this.props.showModal(str._id)}
                                                     src={str.cover} alt="" style={{width: '100%'}}/>}
                                        actions={this.props.isAdmin ? [<Icon
                                            type="delete" onClick={this.delete}/>,
                                            <Icon type="edit" onClick={this.edit}/>] : null}
                                    > <Meta
                                        avatar={<Tooltip placement="top"
                                                         title={'Click to see all ' + str.username + ' stories'}><Link
                                            to={{pathname: `/users/${str.createdBy}`}}>
                                            <Avatar size={55} src={str.avatar}/>
                                        </Link></Tooltip>}
                                        title={<a style={{color: 'black'}} onClick={() => this.props.showModal(str._id)}>
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