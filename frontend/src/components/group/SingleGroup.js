/**
 * Created by NinoB on 27.2.2019 г.
 */

import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {Row, Col, Avatar, message, Spin, List} from 'antd';
import AllGroupStories from './AllGroupStories';

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
        this._isMounted = true;
        this.props.setSubHeaderKey('singleGroup')
        this.props.setHeaderCoverVisibility(true)
        this.props.setSubHeaderLocation(this.props.match)

        this.fetchCurrentGroup(this.props.location.state.groupName)
        this.fetchAllGroups()
    }

    fetchAllGroups(){
        this.props.Crud.getAllGroups().then((res) => {
            for (const group of res) {
                if (group.status === "OPEN"){
                    this.setState(prevState => ({
                        groups: [...prevState.groups,  group]
                    }))
                }
            }
        })
    }

    fetchCurrentGroup(groupName){
        this.setState({
            stories: [],
        });
        this.props.Crud.getGroupByName(groupName).then((res) => {

            this.setState({
                headerCoverSource: res.cover
            })
            if (this._isMounted) {
                for (let str of res.storiesById) {
                    this.props.Crud.getStoryById(str).then((story) => {
                        this.props.Crud.getUserInfo(story.username).then((user) => {
                            story.avatar = user.avatar;

                            this.setState(prevState => ({
                                stories: [...prevState.stories, story]
                            }));
                        });
                    })
                }
            }
        }).catch((err) => {
            message.error("Error");
        });
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
            data = data.concat(res);
            this.setState({
                data,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.setHeaderCoverVisibility(false)
        this._isMounted = false;
    }

    render() {
        let storiesSortedByDateCreate = this.state.stories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return (
            <div>
                <Row gutter={16}>
                    <div>
                        <img className='header-image-cover' src={this.state.headerCoverSource} alt=""/>
                    </div>
                    <div className='main-data-container'>
                        <Col span={4}>
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
                                                avatar={<Avatar
                                                    style={{marginLeft: 10}}
                                                    onClick={() => this.fetchCurrentGroup(item.name)}
                                                    src={item.cover} />}
                                                title={<span
                                                          onClick={() => this.fetchCurrentGroup(item.name)}>
                                                    {item.name}
                                                    </span>}
                                            />
                                        </List.Item>

                                    )}
                                >
                                    {this.state.loading && this.state.hasMore && (
                                        <div className="demo-loading-container">
                                            <Spin />
                                        </div>
                                    )}
                                </List>
                            </InfiniteScroll>
                        </Col>
                        <Col span={20}>
                            <ListAllGroupStories
                                {...this.props}
                                {...this.state}
                                data={storiesSortedByDateCreate}/>
                        </Col>
                    </div>
                </Row>
            </div>
        );
    }
}

export default SingleGroup;