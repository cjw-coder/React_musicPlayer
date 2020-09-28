import React from 'react'
import './index.css'
import LoginModals from '@/components/modal/loginModals'
import api from '@/api'
import { Input , message } from 'antd';
export default class Tables extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,                           //弹出框是否可见
            email:'a2282131520@163.com',              //邮箱
            password:'a13542824422',                  //密码
            storage:'',                               //id存储
            isLogin:false                             //是否登录
        }
    }
    
    addTable = () => {
        this.setState({
            formData: [],
            visible: true,
            title: '用户登录',
            text: '确定',
        })
    }

    //创建localStorage
    componentWillMount(){
        this.setState({
            storage:window.localStorage
        })
    }
    //获取手机号
    getPhone = (event)=>{
        if(event && event.target && event.target.value){
            let value = `email=${event.target.value}`
            this.setState({
                email:value
            })
        }
    }

    //获取密码
    getPwd = (event)=>{
        if(event && event.target && event.target.value){
            let value = `password=${event.target.value}`
            this.setState({
                password:value
            })
        }
    }
    //处理登录
    handleRegister = async ()=>{ 

        let value = `${this.state.email}&${this.state.password}`
        const data = await api.getRegister(value).then(res => res.json())
        this.state.storage.setItem("id",data.account.id)    //存储id 
        console.log(data)
        this.state.storage.setItem("cookie",data.cookie)  
        if(this.state.storage.getItem('id')){
            this.setState({
                visible:false,                              //隐藏弹出框
                isLogin:true                                //修改登录状态
            })
            message.info('登录成功');                       //提示信息
        }
        //const data2 = await api.getUserDetail(`cookie=${this.state.storage.getItem('cookie')}`).then(res => res.json())
    }
    render() { 
        let showStatus = this.state.isLogin ? 
        <div className='login'>
            用户{this.state.storage.getItem('id')}
        </div>
         : 
        <div className='login' onClick={this.addTable} visible={this.isLogin}>登录</div>
        return (
            <div>
                
                <div>{showStatus}</div>
                <LoginModals
                    visible={this.state.visible}
                    title={this.state.title}
                >
                    <div className="loginForm">
                        <div>
                            <span>邮箱</span> 
                            <Input type="text" placeholder="请输入邮箱" onBlur={this.getPhone}/>
                        </div>
                        <div>
                            <span>密码</span>
                            <Input type="password" placeholder="请输入密码" onBlur={this.getPwd}/>
                        </div>
                    </div>
                    <div className="loginBtns">
                        <button onClick={this.handleRegister}>登录</button>
                        <button onClick={this.handleLogin}>注册</button>
                    </div>
                </LoginModals>
            </div>
        )
    }
}
