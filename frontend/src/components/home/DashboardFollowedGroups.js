/**
 * Created by NinoB on 2.3.2019 г.
 */

import React from 'react';
import {Col, Row, List, Avatar, Skeleton, Tooltip, Button} from 'antd';
import {Link} from 'react-router-dom';
import BasicModal from "../story/BasicModal";

export default class DashboardFollowedGroups extends React.Component{
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
                        <div align="right" style={{color: 'green'}}>
                            Menu
                        </div>
                            <div align="right">
                                <span className='dashboard-side-menu-item'
                                      onClick={() => {
                                          this.props.setContentKey('followedGroups')
                                      }}
                                >Groups</span>
                            </div>
                            <div align="right">
                                <span className='dashboard-side-menu-item'
                                      onClick={() => {
                                          this.props.setContentKey('followedPeople')
                                      }}
                                >People</span>
                            </div>
                    </Col>
                    <Col span={20}>
                        <div>
                            {this.props.storiesFromGroups.length > 0 ? <List
                                itemLayout="vertical"
                                size="large"
                                pagination={{
                                    hideOnSinglePage: true,
                                    pageSize: 3,
                                }}
                                dataSource={this.props.storiesFromGroups}
                                renderItem={item => (
                                    <List.Item
                                        extra={<div>
                                            <div align="center">
                                                <div style={{fontSize: 16}}>Created By</div>
                                                <div><Tooltip placement="top"
                                                              title={'Click to see all ' + item.username + ' stories'}>
                                                    <Link to={{pathname: `/users/${item.username}`}}>
                                                        <Avatar size={55} src={item.avatar}/>
                                                    </Link>
                                                </Tooltip></div>
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
                                                          onClick={() => this.props.showModal(item.id, item.name)}
                                                >
                                                    {item.name}
                                                </a>}
                                                description={item.info.substring(0, 200) !== item.info ?
                                                    item.info.substring(0, 300) + '...'

                                                    :
                                                    item.info}
                                            />
                                        </Skeleton>
                                        <div>
                                            <div style={{fontSize: 16}}>Group: <span><Link to={{
                                                pathname: `/groups/${item.groupName}`,
                                                state: {groupName: item.groupName}
                                            }}>
                                            {item.groupName}
                                        </Link></span></div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                                :

                                <div>
                                    <h1 style={{top: 20}} align="center">Seems that you are not following any groups yet</h1>
                                    <div align="center" style={{marginTop: 20, fontSize: 16}}>Browse our groups so you can join some of them</div>
                                    <div align="center" style={{marginTop: 10}}><Button onClick={() =>
                                        this.props.history.push("/groups")
                                    }>Groups</Button></div>
                                </div>}
                        </div>
                    </Col>
                    <BasicModal {...this.props}/>
                </div>
            </Row>
        );
    }
}
