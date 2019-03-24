/**
 * Created by NinoB on 7.3.2019 г.
 */

import React from 'react';
import { Avatar, Icon, Card, Tooltip, Col, Modal, Popconfirm, message} from 'antd';
import {Link} from 'react-router-dom';
import StoryPage from '../story/StoryPage'
import BasicModal from "../home/BasicModal";

const {Meta} = Card;

//TODO Sort stories by dateCreated
class AllGroupStories extends React.Component {
    handleDelete(id){
        if (this.props.match.path === '/challenges/current/:id') {
            this.props.Crud.deleteStoryFromChallengeById(id).then((res) => {

                if(res.success){
                    message.success("Story deleted successfully")
                    this.props.history.push({
                        pathname: '/'
                    })
                }
            })
        }

        if (this.props.match.path === '/groups/:id'){
            this.props.Crud.deleteStoryFromGroupById(id).then((res) => {

                if(res.success){
                    message.success("Story deleted successfully")
                    this.props.history.push({
                        pathname: '/'
                    })
                }
            })
        }
    }

    render() {
        let storiesSortedByDateCreate = this.props.stories.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

        return (
            <div>
                {storiesSortedByDateCreate.map((story) => <div>
                    <Col span={6}>
                        <Card
                            style={{marginBottom: 20, marginTop: 20}}
                            cover={<img onClick={() => this.props.showModal(story._id)}
                                        src={story.cover} alt="" style={{width: '100%'}}/>}
                            hoverable
                            actions={this.props.isAdmin ? [<Popconfirm title="Are you sure delete this story?" onConfirm={() => this.handleDelete(story._id)} okText="Yes" cancelText="No">
                                <Icon type="delete"/><span style={{marginLeft: 10}}>delete</span>
                            </Popconfirm>] : null}
                        >
                            <Meta
                                avatar={<Tooltip placement="top"
                                                 title={'Click to see all ' + story.username + ' stories'}><Link
                                    to={{pathname: `/users/${story.createdBy}`}}>
                                    <Avatar style={{marginRight: 20}} size={50} src={story.avatar}/>
                                </Link></Tooltip>}
                                title={<a style={{color: 'black'}} onClick={() => this.props.showModal(story._id)}>
                                    {story.name}
                                </a>}

                            />
                            <div style={{marginTop: 20, minHeight: 120}}>{story.info.substring(0, 200) !== story.info ?
                                story.info.substring(0, 200) + '...'

                                :
                                story.info}</div>
                        </Card>
                    </Col>
                </div>)}
                <BasicModal {...this.props}/>
            </div>

        );
    }
};

export default AllGroupStories;