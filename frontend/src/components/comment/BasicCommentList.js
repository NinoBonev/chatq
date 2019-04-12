/**
 * Created by NinoB on 16.3.2019 г.
 */

import React from 'react';
import {
    Comment, Form, Button, List, Input, message
} from 'antd';

const TextArea = Input.TextArea;

const BasicCommentList = ({comments}) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props =>
            <Comment
                author={props.author}
                content={props.value}
                avatar={props.avatar}
                datetime={props.createdAt.substring(0, 10)}
            />}
    />
);

const Editor = ({
                    onChange, onSubmit, submitting, value,
                }) => (
    <div>
        <Form.Item>
            <TextArea rows={2} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button
                htmlType="submit"
                loading={submitting}
                onClick={onSubmit}
                type="primary"
            >
                Add Comment
            </Button>
        </Form.Item>
    </div>
);

class BasicComments extends React.Component {
    state = {
        comments: [],
        value: '',
        submitting: false,
    }

    async componentDidMount() {
        let user = this.props.Auth.getProfile()
        this.setState({
            userId: user.id,
            avatar: user.avatar
        })


        this.fetchAllComments()
    }

    fetchAllComments() {
        this.props.Crud.getStoryById(this.props.storyId).then((res) => {

            if (res.success) {
                let {comments} = res.body
                if (comments) {
                    for (let comment of comments) {
                        this.props.Crud.getCommentById(comment.id).then((info) => {
                            if (info.success) {
                                info.body.author = comment.createdBy

                                this.setState(prevState => ({
                                    comments: [...prevState.comments, info.body]
                                        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                                }))
                            }

                        })
                    }
                }
            }

        })
    }

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }
        let submit = {
            value: this.state.value,
            avatar: this.state.avatar,
            userId: this.state.userId,
            storyId: this.props.storyId
        };

        this.setState({
            submitting: true,
        });

        this.props.Crud.addCommentToStory(submit).then((res) => {
            if (res.success) {
                message.success(res.body)
                setTimeout(() => {
                    this.setState({
                        submitting: false,
                        comments: [],
                        value: ''
                    })
                    this.fetchAllComments()
                }, 1000);
            } else {
                message.error(res.body)
            }
        })

    };

    changeValue = (e) => {
        this.setState({
            value: e.target.value
        })
    };

    render() {
        const {submitting} = this.state;

        return (
            <div style={{marginLeft: 20}}>
                {this.state.comments[0] && <BasicCommentList comments={this.state.comments}/>}
                {this.props.isAuth && <Comment
                    content={(
                        <Editor
                            onChange={this.changeValue}
                            onSubmit={this.handleSubmit}
                            submitting={submitting}
                            value={this.state.value}
                        />
                    )}
                />}
            </div>
        );
    }
};

export default BasicComments;