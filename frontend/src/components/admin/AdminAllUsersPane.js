/**
 * Created by NinoB on 15.3.2019 г.
 */

import React from 'react';
import {Table, Col, Popconfirm} from 'antd';
import {message} from 'antd/lib/index';

class AdminAllUsersPane extends React.Component {
    state = {
        data: []
    }

    handleDelete(key){
        let userId = this.state.data[key].id;

        this.props.Crud.deleteUserById(userId).then((res) => {

            if(res.success){
                message.success(res.body)
                this.setState({
                    data: []
                });
                this.fetchAllStories()
            } else {
                message.error(res.body)
            }
        })
    }

    componentDidMount() {
        this.fetchAllStories()
    }

    fetchAllStories(){
        this.props.Crud.getAllUsers().then((res) => {
            let count = 0

            if (res.success){
                for (let user of res.body) {
                    let userData = {
                        key: count++,
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                        email: user.email,
                        username: user.username,
                        groups_follow: user.followingGroupsByName.length,
                        people_follow: user.followingUsersByUsername.length,
                        followers: user.followersByUsername.length,
                        stories_groups: user.storiesById.length,
                        stories_challenges: user.challengesById.length
                    }

                    this.setState(prevStete => ({
                        data: [...prevStete.data, userData]
                    }))
                }
            }

        });
    }

    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        },{
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: 'FollowGroups',
            dataIndex: 'groups_follow',
            key: 'groups_follow',
            render: text => <a href="javascript:;">{text}</a>,
        }, {title: 'FollowPeople',
            key: 'people_follow',
            dataIndex: 'people_follow',
            render: text => <a href="javascript:;">{text}</a>,
        }, {title: 'Followers',
            key: 'followers',
            dataIndex: 'followers',
            render: text => <a href="javascript:;">{text}</a>,
        }, {title: 'StoriesInGroups',
            key: 'stories_groups',
            dataIndex: 'stories_groups',
            render: text => <a href="javascript:;">{text}</a>,
        }, {title: 'StoriesInChallenges',
            key: 'stories_challenges',
            dataIndex: 'stories_challenges',
            render: text => <a href="javascript:;">{text}</a>,
        }, {title: 'Action',
            key: 'action',
            render: (text, record) => <Popconfirm title="Sure to delete this user?" onConfirm={() => this.handleDelete(record.key)}>
                <a href="javascript:;">Delete</a>
            </Popconfirm>
        }];


        return (
            <div style={{margin: 30, backgroundColor: 'white'}}>
                <Col offset={2} span={20}>
                    <Table columns={columns} dataSource={this.state.data}/>
                </Col>
            </div>
        );
    }
}

export default AdminAllUsersPane;
