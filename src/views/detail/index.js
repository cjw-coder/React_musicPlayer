import React from 'react'
import api from '@/api'
import Top from './child_cpn/top'
import List from './child_cpn/list'
import Player from '@/components/player'

import './index.css'
export default class Detail extends React.Component{
    constructor(props){
        super(props)
        const params = new URLSearchParams(props.location.search)
        this.state = {
            id:params.get('id'),
            playlist:{},
            creator:{},
            tags:[],
            list:[],
            song:''
        }
    }

    //调用api.getDetail接口
    UNSAFE_componentWillMount(){
        api.getDetail(`id=${this.state.id}`).then(res => res.json())
        .then(data => {
            if(data.code === 200){
                //保存获取数据到state状态中
                this.setState({
                    playlist:data.playlist,
                    creator:data.playlist.creator,
                    tags:data.playlist.tags,
                    list:data.playlist.tracks
                })
            }
        })
    }

    //保存子组件List传递的数据
    handleSong = (params) => {
        this.setState({
            song:params
        })
    }
   render(){
       return(
           <div className="detail">
                {/*传递父组件的数据给子组件player*/}
                <Player song={this.state.song}></Player>
                <div className="detail_content">
                    <Top 
                    playlist={this.state.playlist}
                    creator={this.state.creator}
                    tags={this.state.tags}
                    ></Top>

                    {/*获取子组件List传递的数据*/}
                    <List list={this.state.list} getSong={this.handleSong}></List>
                </div>
           </div>
       )
   }
}