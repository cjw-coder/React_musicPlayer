import React from 'react'
import api from '@/api'
import './index.css'

import {withRouter} from 'react-router-dom'

class High extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            playlists:[]
        }
    }

    //组件即将挂载时，调用geiHigh接受请求返回数据
    UNSAFE_componentWillMount(){
        api.getHigh().then(res => res.json())
        .then(data =>{
            this.setState({
                playlists:data.playlists
            })
        })
    }

    //处理点击事件，跳转到detail组件并传递id作为参数
    handleClick(id){
        this.props.history.push(`/detail?id=${id}`)
    }

    render(){
        return(
            <div className="high">
                <div className="highs">
                    <h2>精选歌单</h2>
                    {
                        this.state.playlists.map((item,index) => {
                            return <div key={index} className="highItem" onClick={() => this.handleClick(item.id)}>
                                <img src={item.coverImgUrl} alt={item.name}/>
                                <div className="right">
                                    <span>{item.name}</span>
                                    <div className="info">
                                        <span>By {item.tag}</span>
                                        <span>{item.playCount}播放</span>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(High)