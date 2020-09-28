import React from 'react'

import { Modal } from 'antd';

export default class LoginModals extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    //判断传过来的visible 改变模态框状态是否隐藏
    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.state.visible) {
            this.setState({
                visible: nextProps.visible
            })
        }
    }
    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    render() {
        return (
            <div>
                <Modal
                    title={this.props.title} //标题
                    visible={this.state.visible} //visible 判断是否显示模态框 (true | false)
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null} //隐藏对话框下面的按钮
                    width={'400px'}
                >
                {this.props.children}
                </Modal>
            </div>
        );
    }
}