/**
 * Created by NinoB on 2.3.2019 г.
 */


import React from 'react';
import {Row, Col, Card, Icon, Popconfirm, message} from 'antd';
import BasicModal from '../story/BasicModal'

const {Meta} = Card;

export default class DashboardMyStories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stories: [],
        };
    }

    componentDidMount() {
        this.fetchAllStories()
    }

    fetchAllStories() {
        for (let story of this.props.myStories) {
            this.props.Crud.getStoryById(story.id).then((story) => {
                this.setState(prevState => (
                    {
                        stories: [...prevState.stories, story]
                    }));
            }).catch((err) => {
                message.error("Error");
            });
        }
    }

    async handleDelete(id){
        await this.props.handleStoryDelete(id).then(async () => {
                this.setState({
                    stories: []
                })
                await this.fetchAllStories()
        })
    }


    render() {
        let myStoriesSortedByDateCreate = this.state.stories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return (
            <Row gutter={16}>
                <div>{myStoriesSortedByDateCreate.length > 0 ? <div>{myStoriesSortedByDateCreate.map((str) =>
                        <Col span={8}>
                            <Card
                                style={{marginBottom: 20}}
                                hoverable
                                cover={<img onClick={() => this.props.showModal(str.id)}
                                            src={str.cover} alt="" style={{width: '100%'}}/>}
                                actions={[<Popconfirm title="Are you sure delete this story?"
                                                      onConfirm={async () => await this.handleDelete(str.id)} okText="Yes"
                                                      cancelText="No">
                                    <Icon type="delete"/><span style={{marginLeft: 10}}>delete</span>
                                </Popconfirm>,
                                    <Popconfirm title="Are you sure edit this story?"
                                                onConfirm={() => this.props.history.push({pathname: `/groups/edit_story/${str.id}`})}
                                                okText="Yes" cancelText="No">
                                        <Icon type="edit"/><span style={{marginLeft: 10}}>edit</span>
                                    </Popconfirm>]}
                            > <Meta
                                title={<a style={{color: 'black'}} onClick={() => this.props.showModal(str.id)}>
                                    {str.name}
                                </a>}
                            />
                                <div style={{marginTop: 20, minHeight: 120}}>{str.info.substring(0, 300) !== str.info ?
                                    str.info.substring(0, 300) + '...'

                                    :
                                    str.info}</div>
                            </Card>
                        </Col>
                    )}
                    </div>

                    :

                    <h1 style={{top: 20}} align="center">Please add stories</h1>}
                </div>
                <BasicModal {...this.props}/>
            </Row>
        );
    }
}
