/**
 * Created by NinoB on 15.3.2019 г.
 */

import React from 'react'
import {message} from "antd/lib/index";

function withFollowing(WrappedComponent) {
    class Following extends React.Component {
        constructor(props) {
            super(props);
        }

        componentDidMount(){
            this.props.Crud.getGroupById(this.props.match.params.id).then((res) => {
                if (this.props.isAuth) {
                    let user = this.props.Auth.getProfile();
                    let following = false;

                    if (res.body.followers !== undefined && res.body.followers.indexOf(user.id) > -1) {
                        following = true;
                    }
                    this.setState({
                        group_name: res.body.name,
                        userId: user.id,
                        following
                    });
                }
            }).catch((err) => {
                message.error("Error");
            });
        }

        startFollowing = (groupId, userId) => {
            this.props.Crud.startFollowGroup(groupId, userId).then((res) => {
                if (res.success) {
                    message.success(`You are now following group ${this.state.group_name}`,)
                    this.setState({
                        following: true
                    });
                }
            });

        };

        stopFollowing = (groupId, userId) => {
            this.props.Crud.stopFollowGroup(groupId, userId).then((res) => {
                if (res.success) {
                    message.success(`You are no longer following group ${this.state.group_name}`,)
                    this.setState({
                        following: false
                    });
                }
            });
        };

        render() {
            const { ...otherProps } = this.props;
            return (<WrappedComponent
                stopFollowing={this.stopFollowing.bind(this)}
                startFollowing={this.startFollowing.bind(this)}
                {...otherProps}
                {...this.state}
            />);
        }
    }

    return Following;
}

export default withFollowing;