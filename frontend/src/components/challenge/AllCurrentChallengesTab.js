/**
 * Created by NinoB on 5.3.2019 г.
 */

import React from 'react';
import {List, Row, Skeleton, Avatar, Progress} from 'antd';
import {Link} from 'react-router-dom'
import moment from 'moment';



const AllCurrentChallengesTab = (props) => {
        return (
            <div>
                <Row gutter={16} style={{minHeight: 550, marginTop: 50, marginLeft: 100, marginRight: 150}}>
                    <List
                        itemLayout="horizontal"
                        size="large"
                        pagination={{
                            align: 'bottom',
                            hideOnSinglePage: true,
                            pageSize: 3,
                        }}
                        dataSource={props.challenges}
                        footer={<div><b>ant design</b> footer part</div>}
                        renderItem={item => (
                            <List.Item
                                key={item.name}

                            >
                                <Skeleton loading={false} active>
                                    <List.Item.Meta
                                        avatar={<Link style={{fontSize: 24}} to={{pathname: `/challenges/current/${item.id}`}} >
                                            <div className='imageFadeOut'><Avatar size={200} shape='square' alt="logo" src={item.cover}/></div>
                                        </Link>}
                                        title={<Link style={{fontSize: 24}} to={{pathname: `/challenges/current/${item.id}`}} >{item.name}</Link>}
                                        description={item.info}
                                    />
                                    <div>
                                        <Progress type="circle" percent={moment(item.deadlineDate).diff(moment(item.createdAt), "days")} format={percent => `${percent} Days`} />
                                        <div style={{fontSize: 20}}>Deadline date:</div>
                                        <p align="center">{moment(item.deadlineDate).utc().format('DD MMMM YYYY')}</p>
                                    </div>
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </Row>
            </div>
        );
}

export default AllCurrentChallengesTab