import React from 'react'
import api from '@/api'
import './index.css'

export default class Right extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            mv:[],
            poster:'',
            mvUrl:''
        }
    }

    //调用api.getMv接口
    UNSAFE_componentWillMount(){
        api.getMv('limit=10').then(res => res.json())
        .then(data => {
            if(data.code === 200){
                this.setState({
                    mv:data.data,
                    poster:data.data[9].cover
                })
            }
        })
    }
    componentWillUnmount(){
        this.setState = (state,callback) => {
            return
        }
    }
    //处理点击事件，获取id参数来调用api.getMvUrl，进而获取音频地址
    getMvUrl(id){
        api.getMvUrl(`id=${id}`).then(res => res.json())
        .then(data => {
            if(data.code === 200){
                this.setState({
                    mvUrl:data.data.url
                })
            }
        })
    }
    render(){
        return(
            <div className="mvList">
                <video 
                controls 
                poster={this.state.poster}
                src={this.state.mvUrl}
                autoPlay
                ></video>
                {
                    this.state.mv.map((item,index) => {
                        return<div key={index} onClick={()=>{this.getMvUrl(item.id)}}>
                            <h3>{index+1}.{item.name}</h3>
                            <span className="artists">
                                By
                                {item.artists.map((childItem)=>{
                                    return childItem.name
                                })}
                            </span>
                            <span className="playCount">
                                {(item.playCount/10000).toFixed(2)}万播放          
                            </span>
                        </div>
                    })
                }
            </div>
        )
    }

}