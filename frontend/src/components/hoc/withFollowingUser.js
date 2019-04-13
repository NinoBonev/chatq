/**
 * Created by NinoB on 15.3.2019 г.
 */

import React from 'react'
import {message} from "antd/lib/index";

function withFollowingUser(WrappedComponent) {
    class Following extends React.Component {
        _isMounted = false;

        constructor(props) {
            super(props);
        }

        componentDidMount() {
            this._isMounted = true;
            this.props.Crud.getUserInfo(this.props.subHeaderLocation).then((res) => {

                if (res.success){
                    if (this._isMounted) {
                        if (this.props.isAuth) {
                            let user = this.props.Auth.getProfile();

                            let followCurrentUser = false;
                            let notMyProfile = true;

                            if (res.body.username === user.username) {
                                notMyProfile = false;
                            }

                            if (res.body.followersByUsername !== undefined && res.body.followersByUsername.indexOf(user.username) > -1) {
                                followCurrentUser = true;
                            }

                            this.setState({
                                user: res.body.username,
                                notMyProfile,
                                myUsername: user.username,
                                followCurrentUser
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

        startFollowing = (myUsername, user) => {
            this.props.Crud.startFollowUser(myUsername, user).then((res) => {
                if (res.success) {
                    message.success(res.body);
                    this.setState({
                        followCurrentUser: true
                    });
                } else {
                    message.error(res.body)
                }
            });

        };

        stopFollowing = (myUsername, user) => {
            this.props.Crud.stopFollowUser(myUsername, user).then((res) => {
                if (res.success) {
                    message.success(res.body);
                    this.setState({
                        followCurrentUser: false
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

export default withFollowingUser;