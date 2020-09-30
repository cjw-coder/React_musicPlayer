import React from 'react'
import api from '@/api'
import './index.css'

import Player from '@/components/player'
import Nav from  './child_cpn/nav'
import List from './child_cpn/list'

export default class All extends React.Component{
    constructor(props){
        super(props)
        const params = new URLSearchParams(props.location.search)
        this.state = {
            keywords:params.get('keywords'),
            type:params.get('type'),
            id:0,
            result:{}
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        //实例化URLSearchPrams对象，获取url传递的值
        const params = new URLSearchParams(nextProps.location.search)

        this.setState({
            keywords:params.get('keywords'),        //关键字
            type:params.get('type'),                //类型
            id:0,                                   //当前导航栏所处下标，默认为0
            song:0
        })
        this.getId()
    }

    //组件即将挂载时调用,发起请求
    UNSAFE_componentWillMount(){
        api.getSearch(`keywords=${this.state.keywords}&type=${this.state.type}`).then(res => res.json())
        .then(data => {
            this.setState({
                result:data.result
            })
        })
        //调用getId，为state内的id赋值
        this.getId()
    }
    getId(){
        switch(this.state.type){
            case '1':               //单曲
                this.setState({
                    id:0
                })
                break
            case '10':              //专辑
                this.setState({
                    id:1
                })
                break
            case '1000':            //歌单
                this.setState({
                    id:2
                })
                break
            case '1014':            //视频
                this.setState({
                    id:3
                })
                break
            default:                
                break
        }
    }
    //组件销毁前清除网络状态
    componentWillUnmount(){
        this.setState = (state,callback) => {      
            return
        }
    }

    //子传父，获取List组件传递的歌曲id
    handleSongs = (params) => {
        this.setState({
            song:params
        })
    }
    render(){
        return(
            <div className="all">
                {/*父传子，把List传递的歌曲id再传递给Player子组件 */}
                <Player song={this.state.song}></Player>
                <div className="all_content">
                    {/*父传子，传递keywords关键词，和导航栏下标id */}
                    <Nav keywords={this.state.keywords} id={this.state.id}></Nav>
                    
                    
                    {/*传递导航栏对应的type值，导航栏下标id，关键词keywords */}
                    <List 
                    type={this.state.type} 
                    keywords={this.state.keywords} 
                    id={this.state.id}
                    getSongs={this.handleSongs}></List>
                </div>
            </div>
        )
    }
}
