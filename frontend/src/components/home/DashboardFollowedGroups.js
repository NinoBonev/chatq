/**
 * Created by NinoB on 2.3.2019 г.
 */

import React from 'react';
import {Col, Row, List, Avatar, Skeleton, Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import BasicModal from "../story/BasicModal";

const DashboardFollowedGroups = (props) => {
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
                                          props.setContentKey('followedGroups')
                                      }}
                                >Groups</span>
                </div>
                <div align="right">
                                <span className='dashboard-side-menu-item'
                                      onClick={() => {
                                          props.setContentKey('followedPeople')
                                      }}
                                >People</span>
                </div>
            </Col>
            <Col span={20}>
                <div>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            hideOnSinglePage: true,
                            pageSize: 3,
                        }}
                        dataSource={props.storiesFromGroups}
                        footer={<div><b>ant design</b> footer part</div>}
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
                                            onClick={() => props.showModal(item.id, item.name)}
                                            src={item.cover} alt="" style={{height: 210}}/></div>}
                                        title={<a style={{color: 'black'}}
                                                  onClick={() => props.showModal(item.id, item.name)}
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
                </div>
            </Col>
            <BasicModal {...props}/>
        </div>
        </Row>
    );

}

export default DashboardFollowedGroups;

