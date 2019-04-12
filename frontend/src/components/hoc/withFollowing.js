/**
 * Created by NinoB on 15.3.2019 г.
 */

import React from 'react'
import {message} from "antd/lib/index";

function withFollowing(WrappedComponent) {
    class Following extends React.Component {
        _isMounted = false;

        constructor(props) {
            super(props);
        }

        componentDidMount() {
            this._isMounted = true;

            this.props.Crud.getGroupByName(this.props.subHeaderLocation.params.name).then((res) => {
                if (res.success){
                    if (this._isMounted) {
                        if (this.props.isAuth) {
                            let following = false;
                            let user = this.props.Auth.getProfile()

                            if (res.body.followersByUsername !== undefined &&
                                res.body.followersByUsername.indexOf(user.username) > -1) {
                                following = true;
                            }

                            this.setState({
                                group_name: res.body.name,
                                username: user.username,
                                following
                            });
                        }
                    }
                } else {
                    message.error(res.body)
                }
            })
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        startFollowing = (group_name, username) => {
            this.props.Crud.startFollowGroup(group_name, username).then((res) => {
                if (res.success) {
                    message.success(res.body)
                    this.setState({
                        following: true
                    });
                } else {
                    message.error(res.body)
                }
            });

        };

        stopFollowing = (group_name, username) => {
            this.props.Crud.stopFollowGroup(group_name, username).then((res) => {
                if (res.success) {
                    message.success(res.body)
                    this.setState({
                        following: false
                    });
                } else {
                    message.error(res.body)
                }
            });
        };

        render() {
            const {...otherProps} = this.props;
            return (<WrappedComponent
                stopFollowing={this.stopFollowing}
                startFollowing={this.startFollowing}
                {...otherProps}
                {...this.state}
            />);
        }
    }

    return Following;
}

export default withFollowing;