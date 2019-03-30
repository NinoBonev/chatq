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

            this.props.Crud.getGroupByName(this.props.match.params.name).then((res) => {
                if (this._isMounted) {
                    if (this.props.isAuth) {
                        let following = false;
                        let user = this.props.Auth.getProfile()

                        if (res.followersByUsername !== undefined && res.followersByUsername.indexOf(user.username) > -1) {
                            following = true;
                        }

                        this.setState({
                            group_name: res.name,
                            username: user.username,
                            following
                        });
                    }
                }
            }).catch((err) => {
                message.error("Error");
            });
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