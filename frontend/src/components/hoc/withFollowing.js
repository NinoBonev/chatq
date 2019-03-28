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

        async componentDidMount(){
            this.props.Crud.getGroupByName(this.props.match.params.name).then((res) => {
                if (this.props.isAuth) {
                    let following = false;

                    this.props.Auth.getProfile().then((user) => {
                        if (res.followersByUsername !== undefined && res.followersByUsername.indexOf(user.username) > -1) {
                            following = true;
                        }

                        this.setState({
                            group_name: res.name,
                            username: user.username,
                            following
                        });
                    });
                }
            }).catch((err) => {
                message.error("Error");
            });
        }

        startFollowing = (group_name, username) => {
            this.props.Crud.startFollowGroup(group_name, username).then((res) => {
                if (res.success) {
                    message.success(`You are now following group ${this.state.group_name}`,)
                    this.setState({
                        following: true
                    });
                }
            });

        };

        stopFollowing = (group_name, username) => {
            this.props.Crud.stopFollowGroup(group_name, username).then((res) => {
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