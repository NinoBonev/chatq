/**
 * Created by NinoB on 7.3.2019 г.
 */

import React from 'react';
import {Avatar, Icon, Card, Tooltip, Col, Modal, Popconfirm, message} from 'antd';
import {Link} from 'react-router-dom';
import StoryPage from '../story/StoryPage'
import BasicModal from "../story/BasicModal";

const {Meta} = Card;

//TODO Sort stories by dateCreated
class AllGroupStories extends React.Component {
    handleDelete(id) {
        this.props.Crud.deleteStoryById(id).then((res) => {

            if (res.success) {
                message.success(res.body)
                this.props.history.push({
                    pathname: '/'
                })
            }
        })
    }

    render() {
        return (
            <div>
                {this.props.stories.map((story) => <div>
                    <Col span={8}>
                        <Card
                            style={{marginBottom: 20}}
                            cover={<div className='imageFadeOut'><img
                                onClick={() => this.props.showModal(story.id, story.name)}
                                src={story.cover} alt="" style={{width: '100%'}}/></div>}
                            actions={this.props.isAdmin ? [<Popconfirm title="Are you sure delete this story?"
                                                                       onConfirm={() => this.handleDelete(story.id)}
                                                                       okText="Yes" cancelText="No">
                                <Icon type="delete"/><span style={{marginLeft: 10}}>delete</span>
                            </Popconfirm>] : null}
                        >
                            <Meta
                                avatar={<Tooltip placement="top"
                                                 title={'Click to see all ' + story.username + ' stories'}><Link
                                    to={{pathname: `/users/${story.username}`}}>
                                    <Avatar style={{marginRight: 20}} size={50} src={story.avatar}/>
                                </Link></Tooltip>}
                                title={<a style={{color: 'black'}}
                                          onClick={() => this.props.showModal(story.id, story.name)}>
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