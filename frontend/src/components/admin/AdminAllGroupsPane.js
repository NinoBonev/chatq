import React from 'react'
import {Table, Col, Popconfirm} from 'antd';
import {message} from 'antd/lib/index';

export default class AdminAllGroupsPane extends React.Component{
    state = {
        data: []
    }

    handleArchiveGroup(key){
        let groupId = this.state.data[key].id;

        this.props.Crud.archiveGroupById(groupId).then((res) => {

            if(res.success){
                message.success(res.body)
                this.setState({
                    data: []
                });
                this.fetchAllGroups()
            }
        })
    }

    handleOpenGroup(key){
        let groupId = this.state.data[key].id;

        this.props.Crud.openGroupById(groupId).then((res) => {

            if(res.success){
                message.success(res.body)
                this.setState({
                    data: []
                });
                this.fetchAllGroups()
            }
        })
    }

    handleCloseGroup(key){
        let groupId = this.state.data[key].id;

        this.props.Crud.closeGroupById(groupId).then((res) => {

            if(res.success){
                message.success(res.body)
                this.setState({
                    data: []
                });
                this.fetchAllGroups()
            }
        })
    }

    componentDidMount() {
        this.fetchAllGroups()
    }

    fetchAllGroups(){
        this.props.Crud.getAllGroups().then((res) => {
            console.log(res);
            let count = 0

            for (let group of res) {
                let userData = {
                    key: count++,
                    id: group.id,
                    name: group.name,
                    followers: group.followersByUsername.length,
                    stories: group.storiesById.length,
                    status: group.status
                }

                this.setState(prevStete => ({
                    data: [...prevStete.data, userData]
                }))
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
            title: 'Stories',
            dataIndex: 'stories',
            key: 'stories',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: 'Followers',
            dataIndex: 'followers',
            key: 'followers',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: text => <a href="javascript:;">{text}</a>,
        }, {title: 'OpenGroup',
            key: 'open',
            render: (text, record) => <Popconfirm title="Sure to open this group?" onConfirm={() => this.handleOpenGroup(record.key)}>
                <a href="javascript:;">Open</a>
            </Popconfirm>
        }, {title: 'CloseGroup',
            key: 'close',
            render: (text, record) => <Popconfirm title="Sure to close this group?" onConfirm={() => this.handleCloseGroup(record.key)}>
                <a href="javascript:;">Close</a>
            </Popconfirm>
        }, {title: 'ArchiveGroup',
            key: 'archive',
            render: (text, record) => <Popconfirm title="Sure to archive this group?" onConfirm={() => this.handleArchiveGroup(record.key)}>
                <a href="javascript:;">Archive</a>
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