/**
 * Created by NinoB on 24.2.2019 г.
 */

import React from 'react'
import {Row, Col, Card, Popconfirm, Icon, message} from 'antd'
import {Link} from 'react-router-dom'
import Header from '../common/Header'


const {Meta} = Card;

//TODO: Link is all over the Caregory Card -----> should be just over the image
export default class AllGroups extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            groups: []
        };
    }

    componentDidMount() {
        console.log(this.props);
        this._isMounted = true;
        this.fetchAllStories()
    }

    fetchAllStories(){
        if (this._isMounted) {
            this.props.Crud.getAllGroups().then((res) => {
                for (const group of res) {
                    if (group.status === "OPEN"){
                        this.setState(prevState => ({
                            groups: [...prevState.groups,  group]
                        }))
                    }
                }

            }).catch((err) => {
                message.error("Error");
            });
        }
    }

    handleArchive(id){
        this.props.Crud.archiveGroupById(id).then((res) => {
            if(res.success){
                message.success(res.body)
                this.setState({
                    groups: []
                })
                this.fetchAllStories();
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div>
                <Header {...this.props}/>
                <Row gutter={16}>
                    {this.state.groups.map((group) =>
                        <div className='main-data-container'>
                            <Col span={8}>
                                <div className={group.id}>
                                    <Card
                                        style={{marginBottom: 20}}
                                        cover={<div className='imageFadeOut'>
                                            <img onClick={() => this.props.history.push({
                                                pathname: `/groups/${group.name.toLowerCase()}`,
                                                state: {groupName: group.name}
                                            })} src={group.cover} alt="" style={{width: '100%'}}  />
                                        </div>}
                                        actions={this.props.isAdmin ? [<Popconfirm title="Are you sure delete this group?" onConfirm={() => this.handleArchive(group.id)} okText="Yes" cancelText="No">
                                            <Icon type="delete"/><span style={{marginLeft: 10}}>archive</span>
                                        </Popconfirm>,
                                            <Popconfirm title="Are you sure edit this group?" onConfirm={() => this.props.history.push({pathname: `/groups/edit/${group.id}`})} okText="Yes" cancelText="No">
                                                <Icon type="edit"/><span style={{marginLeft: 10}}>edit</span>
                                            </Popconfirm>]  : null}
                                    > <Meta style={{minHeight: 120}}
                                            title={<a style={{color: 'black'}} onClick={() => this.props.history.push({
                                                pathname: `/groups/${group.name.toLowerCase()}`,
                                                state: {groupName: group.name}
                                            })}>{group.name}</a>}
                                            description={<div style={{
                                                marginTop: 20,
                                                minHeight: 150
                                            }}>{group.info.substring(0, 300) !== group.info ?
                                                group.info.substring(0, 300) + '...'

                                                :
                                                group.info}</div>} />
                                        <p style={{fontStyle: 'italic', color: '#91d5ff'}} align="center">
                                            <span><Icon style={{marginRight: 10}} type="paper-clip" />Stories in group: <strong>{group.storiesById.length}</strong></span>
                                            <span style={{marginLeft: 20}}><Icon style={{marginRight: 10}}  type="team" />Followers: <strong>{group.followersByUsername.length}</strong></span>
                                        </p>
                                    </Card>
                                </div>
                            </Col>
                        </div>
                        )}
                </Row>
            </div>
        )
    }
}