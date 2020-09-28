import React from 'react'
import api from '@/api'
import './index.css'
import '@/static/fontIcon/iconfont.css'

export default class playList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            korean:[],
            koreanName:"",
            electron:[],
            electronName:"",
            europe:[],
            europeName:'',
            acg:[],
            acgName:""
        }
    }

    UNSAFE_componentWillMount(){
        api.getDetail('id=745956260').then(res => res.json())
        .then(data => {
            if(data.code === 200){
                console.log(data)
                this.setState({
                    korean:data.playlist.tracks,
                    koreanName:data.playlist.name
                })
            }
        })
        api.getDetail('id=10520166').then(res => res.json())
        .then(data => {
            if(data.code === 200){
                console.log(data)
                this.setState({
                    electron:data.playlist.tracks,
                    electronName:data.playlist.name
                })
            }
        })
        api.getDetail('id=2809577409').then(res => res.json())
        .then(data => {
            if(data.code === 200){
                console.log(data)
                this.setState({
                    europe:data.playlist.tracks,
                    europeName:data.playlist.name
                })
            }
        })
        
        api.getDetail('id=71385702').then(res => res.json())
        .then(data => {
            if(data.code === 200){
                console.log(data)
                this.setState({
                    acg:data.playlist.tracks,
                    acgName:data.playlist.name
                })
            }
        })
    }

    handleClick = (params) => {
        this.props.getSong(params)
    }
    render(){
        return(
            <div className="playList">
                <h2 className="title">
                <div></div>
                特色榜单
                <span>NEW</span>
                </h2>
                <div className="playlistBars">
                     <div className="playlistBar">
                    <div className="title">
                        <h1>#1</h1>
                        <span>{this.state.koreanName}</span>
                    </div>
                    {this.state.korean.map((item,index) => {
                        return <div key={index} className="item" onClick={() => this.handleClick(item)}>
                            <span className="iconfont icon-bofangbeifen13"></span>
                            <div>
                                <p className="name">{item.name}</p>
                                <p className="artist">{item.ar.map((childItem,index)=>{
                                    return <span key={index}>{childItem.name}</span>
                                })}</p>
                            </div>
                        </div>
                    })}
                </div>
                <div className="playlistBar">
                    <div className="title">
                        <h1>#2</h1>
                        <span>{this.state.electronName}</span>
                    </div>
                    {this.state.electron.map((item,index) => {
                        return <div key={index} className="item" onClick={() => this.handleClick(item)}>
                            <span className="iconfont icon-bofangbeifen13"></span>
                            <div>
                                <p className="name">{item.name}</p>
                                <p className="artist">{item.ar.map((childItem,index)=>{
                                    return <span key={index}>{childItem.name}</span>
                                })}</p>
                            </div>
                        </div>
                    })}
                    </div>
                    <div className="playlistBar">
                    <div className="title">
                        <h1>#3</h1>
                        <span>{this.state.europeName}</span>
                    </div>
                    {this.state.europe.map((item,index) => {
                        return <div key={index} className="item" onClick={() => this.handleClick(item)}>
                            <span className="iconfont icon-bofangbeifen13"></span>
                            <div>
                                <p className="name">{item.name}</p>
                                <p className="artist">{item.ar.map((childItem,index)=>{
                                    return <span key={index}>{childItem.name}</span>
                                })}</p>
                            </div>
                        </div>
                    })}
                    </div>
                    <div className="playlistBar">
                    <div className="title">
                        <h1>#4</h1>
                        <span>{this.state.acgName}</span>
                    </div>
                    {this.state.acg.map((item,index) => {
                        return <div key={index} className="item" onClick={() => this.handleClick(item)}>
                            <span className="iconfont icon-bofangbeifen13"></span>
                            <div className="info">
                                <p className="name">{item.name}</p>
                                <p className="artist">{item.ar.map((childItem,index)=>{
                                    return <span key={index}>{childItem.name} </span>
                                })}</p>
                            </div>
                        </div>
                    })}
                    </div>
                </div>
            </div>
        )
    }
}