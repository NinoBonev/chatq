/**
 * Created by NinoB on 9.3.2019 г.
 */

import React from 'react'
import {Col, List, Avatar, Skeleton, Tooltip} from 'antd';
import {Link} from 'react-router-dom';

import BasicModal from "../story/BasicModal";

const DashboardFollowedPeople = (props) => {
    let storiesFromPeopleSortedByDateCreate = props.storiesFromPeople.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div>
            <Col span={18} offset={3}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        align: 'bottom',
                        hideOnSinglePage: true,
                        pageSize: 3,
                    }}
                    dataSource={storiesFromPeopleSortedByDateCreate}
                    footer={<div><b>ant design</b> footer part</div>}
                    renderItem={item => (
                        <List.Item
                            extra={<div>
                                <div align="center">
                                    <div style={{fontSize: 16}}>Created By</div>
                                    <div><Tooltip placement="top"
                                                  title={'Click to see all ' + item.username + ' stories'}><Link
                                        to={{pathname: `/users/${item.createdBy}`}}>
                                        <Avatar size={55} src={item.avatar}/>
                                    </Link></Tooltip></div>
                                </div>
                            </div>
                            }
                            key={item.name}
                        >
                            <Skeleton loading={false} active>
                                <List.Item.Meta
                                    avatar={<img onClick={() => props.showModal(item.id)}
                                                 src={item.cover} alt="" style={{height: 140}}/>}
                                    title={<a style={{color: 'black'}} onClick={() => props.showModal(item.id)}>
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
            </Col>
            <BasicModal {...props}/>
        </div>
    )
}

export default DashboardFollowedPeople