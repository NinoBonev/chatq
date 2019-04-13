/**
 * Created by NinoB on 9.3.2019 г.
 */

import React from 'react'
import {Row, Col, List, Avatar, Skeleton, Tooltip, Button} from 'antd';
import {Link} from 'react-router-dom';

import BasicModal from "../story/BasicModal";

export default class DashboardFollowedPeople extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    render(){
        return (
            <Row gutter={16}>
                <div className='main-data-container'>
                    <Col offset={1} span={2}>
                        <div align="right" className='dashboard-side-menu-header'>
                            Menu
                        </div>
                        <div align="right" className='dashboard-side-menu-item' onClick={() => {
                            this.props.setContentKey('followedGroups')
                        }}>
                            <span >Groups</span>
                        </div>
                        <div align="right" className='dashboard-side-menu-item' onClick={() => {
                            this.props.setContentKey('followedPeople')
                        }}>
                            <span>People</span>
                        </div>
                    </Col>
                    <Col span={20}>
                        {this.props.storiesFromPeople.length > 0 ?
                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={{
                                    align: 'bottom',
                                    hideOnSinglePage: true,
                                    pageSize: 3,
                                }}
                                dataSource={this.props.storiesFromPeople}
                                renderItem={item => (
                                    <List.Item
                                        extra={<div>
                                            <div align="center">
                                                <div style={{fontSize: 16}}>Created By</div>
                                                <div><Tooltip placement="top"
                                                              title={'Click to see all ' + item.username + ' stories'}><Link
                                                    to={{pathname: `/users/${item.username}`}}>
                                                    <Avatar size={55} src={item.avatar}/>
                                                </Link></Tooltip></div>
                                            </div>
                                        </div>
                                        }
                                        key={item.name}
                                    >
                                        <Skeleton loading={false} active>
                                            <List.Item.Meta
                                                avatar={<div className='imageFadeOut'><img
                                                    onClick={() => this.props.showModal(item.id, item.name)}
                                                    src={item.cover} alt="" style={{height: 210}}/></div>}
                                                title={<a style={{color: 'black'}}
                                                          onClick={() => this.props.showModal(item.id, item.name)}>
                                                    {item.name}
                                                </a>}
                                                description={item.info.substring(0, 200) !== item.info ?
                                                    item.info.substring(0, 300) + '...'

                                                    :
                                                    item.info}
                                            />
                                        </Skeleton>
                                    </List.Item>
                                )}
                            />
                            :
                            <div>
                            <h1 style={{top: 20}} align="center">Seems that you are not following any people yet</h1>
                            <div align="center" style={{marginTop: 20, fontSize: 16}}>Browse our groups so you can find people you want to follow</div>
                            <div align="center" style={{marginTop: 10}}><Button onClick={() =>
                                this.props.history.push("/groups")
                            }>Groups</Button></div>
                        </div>}
                    </Col>
                    <BasicModal {...this.props}/>
                </div>
            </Row>
        )
    }

}