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
    componentWillMount(){
        api.getHigh().then(res => res.json())
        .then(data =>{
            console.log(data)
            this.setState({
                playlists:data.playlists
            },()=>{
                console.log(this.state.playlists)
            })
        })
    }
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