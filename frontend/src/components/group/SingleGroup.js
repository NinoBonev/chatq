/**
 * Created by NinoB on 27.2.2019 г.
 */

import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Row, Col, Avatar, message, Spin, List} from 'antd';
import AllGroupStories from './AllGroupStories';
import Cover from '../../resources/history.jpg'

import withModal from '../hoc/withModal'

const ListAllGroupStories = withModal(AllGroupStories)


class SingleGroup extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            stories: [],
            groups: [],
            loading: false,
            hasMore: true,
        };
    }

    componentDidMount() {
        this.fetchCurrentGroup(this.props.match.params.name)
        this.fetchAllGroups()
    }

    fetchAllGroups() {
        this.props.Crud.getAllGroups().then((res) => {
            if (res.success) {
                for (const group of res.body) {
                    if (group.status === "OPEN") {
                        this.setState(prevState => ({
                            groups: [...prevState.groups, group]
                        }))
                    }
                }
            } else {
                message.error(res.body)
            }
        })
    }

    fetchCurrentGroup(groupName) {
        this.setState({
            stories: [],
        })
        this.props.setSubHeaderLocation('')
        this.props.setSubHeaderKey('loading')
        this.props.Crud.getGroupByName(groupName).then((res) => {
            console.log(res);
            if (res.success) {
                window.scrollTo(0,0);
                this._isMounted = true;
                this.props.setSubHeaderLocation(groupName)
                this.props.setSubHeaderKey('singleGroup')
                this.props.setHeaderCoverVisibility(true)
                this.props.setHeaderCoverSource(Cover)
                this.props.setHeaderCoverAvatar(res.body.cover)
                this.props.setHeaderCoverGroupInfo(
                    res.body.name,
                    res.body.followersByUsername.length,
                    res.body.storiesById.length)
                if (this._isMounted) {
                    for (let str of res.body.storiesById) {
                        this.props.Crud.getStoryById(str).then((res) => {

                            if (res.success) {
                                this.props.Crud.getUserInfo(res.body.username).then((user) => {

                                    if (user.success){
                                        res.body.avatar = user.body.avatar;

                                        this.setState(prevState => ({
                                            stories: [...prevState.stories, res.body]
                                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                        }));
                                    } else {
                                        message.error(user.body)
                                    }

                                });
                            } else {
                                message.error(res.body)
                            }
                        })
                    }
                }
            } else {
                message.error(res.body);
            }
        })
    }

    handleInfiniteOnLoad = () => {
        let data = this.state.groups;
        this.setState({
            loading: true,
        });
        if (data.length > data.length) {
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.props.Crud.getAllGroups().then((res) => {
            if (res.success) {
                data = data.concat(res.body);
                this.setState({
                    data,
                    loading: false,
                });
            } else {
                message.error(res.body)
            }
        })
    }

    componentWillUnmount() {
        this.props.setHeaderCoverVisibility(false);
        this.props.setHeaderCoverAvatar('');
        this.props.setSubHeaderKey('')
        this.props.setSubHeaderLocation('')
        this.props.clearHeaderCoverGroupInfo()
        this._isMounted = false;
    }

    render() {
        return (
            <div className='main-data-container'>
                <Row gutter={16}>
                    <div>
                        <Col span={4} offset={1}>
                            <div align="center" style={{
                                fontFamily: 'Helvetica',
                                fontStyle: 22,
                            }}><strong>All groups</strong></div>
                            <div style={{marginTop: 10}}>
                                <InfiniteScroll
                                    initialLoad={false}
                                    pageStart={0}
                                    loadMore={this.handleInfiniteOnLoad}
                                    hasMore={!this.state.loading && this.state.hasMore}
                                    useWindow={false}
                                >
                                    <List
                                        dataSource={this.state.groups}
                                        renderItem={item => (
                                            <List.Item className='all-groups-list-item' key={item.id}>
                                                <List.Item.Meta
                                                    onClick={() => this.fetchCurrentGroup(item.name)}
                                                    avatar={<Avatar
                                                        style={{marginLeft: 10}}
                                                        src={item.cover}/>}
                                                    title={<span>{item.name}</span>}
                                                />
                                            </List.Item>

                                        )}
                                    >
                                        {this.state.loading && this.state.hasMore && (
                                            <div className="demo-loading-container">
                                                <Spin/>
                                            </div>
                                        )}
                                    </List>
                                </InfiniteScroll>
                            </div>
                        </Col>
                        <Col span={19}>
                            <ListAllGroupStories
                                {...this.props}
                                {...this.state}/>
                        </Col>
                    </div>
                </Row>
            </div>
        );
    }
}

export default SingleGroup;