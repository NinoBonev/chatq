/**
 * Created by NinoB on 5.3.2019 г.
 */

import React from 'react';
import {List, Row, Col, Skeleton, Avatar, Progress} from 'antd';
import {Link} from 'react-router-dom'
import moment from 'moment';

const AllCurrentChallengesTab = (props) => {
        return (
            <div className='main-data-container'>
                <Row gutter={16} >
                    <Col span={20} offset={2} >
                    {props.activeChallenges.length > 0 ? <List
                            style={{backgroundColor: 'white'}}
                        itemLayout="horizontal"
                        size="large"
                        pagination={{
                            align: 'bottom',
                            hideOnSinglePage: true,
                            pageSize: 3,
                        }}
                        dataSource={props.activeChallenges}
                        renderItem={item => (
                            <List.Item
                                key={item.name}
                                style={{margin: 10}}
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
                    /> :
                        <div align="center">
                            <h1>We don't have any active challenges to show just now. Come again later.</h1>
                        </div>
                    }
                    </Col>
                </Row>
            </div>
        );
}

export default AllCurrentChallengesTab