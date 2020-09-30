import React from 'react'
import api from '@/api'
import './index.css'

export default class Right extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            newSong:[]
        }
    }

    //调用api.getNewsong()接口
    UNSAFE_componentWillMount(){
        api.getNewsong().then(res => res.json())
        .then(data => {
            this.setState({
                newSong:data.result
            })
        })
    }
    //组件销毁前清除网络状态
    componentWillUnmount(){
        this.setState = (state,callback) => {
            return
        }
    }
    //处理onClick事件传递参数给父组件
    handleClick = (params) => {
        this.props.getSong(params)
    }

    render(){
        return(
            <div className="newsong">
                <h2 className="title">
                    <div></div>
                    新歌推荐
                    <span>NEW</span>
                </h2>
                <div className="content">
                    {
                        this.state.newSong.map((item,index) => {
                            return <div className="contentItem" key={index} onClick={() => this.handleClick(item.song)}>
                                <img src={item.picUrl} alt={item.name}/>
                                <div className="contentTxt">
                                    <h4>{item.song.name}</h4>
                                    <p>{item.song.artists.map((childItem,index)=>{
                                        return <span key={index}>{childItem.name}</span>
                                    })}</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }

}