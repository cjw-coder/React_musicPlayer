import React from 'react'
import api from '@/api'
import './index.css'
import {Input} from 'antd'
const {Search} = Input

export default class SearchInput extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            songs:[]
        }
    }

    //处理onChange事件
    handleChange = (event) => {
        const value = `keywords=${event.target.value}`          //获取输入框值并拼串
        
        //如果输入框值存在则调用api.getSearch接口
        if(event.target.value){
            api.getSearch(value).then(res => res.json())
            .then(data => {
                if(data.code === 200){
                    this.setState({
                        songs:data.result.songs
                    })
                }
            })
            console.log(this.state.songs)
        }

        //当输入框值为空时清空state保存的状态songs
        if(event.target.value === ''){
            this.clearSongs()
        }
    }
    clearSongs = () => {
        this.setState({
                songs:[]
            })
    }
    
    render(){
        const showStatus = this.state.songs ? 
        <div className="searchSongs">
        {
            this.state.songs.map((item,index) => {
                return <a href={`https://music.163.com/#/song?id=${item.id}`} key={index}> 
                            <span className="songName">{item.album.name}</span>
                            {item.artists.map((childItem,index)=>{
                                return <span className="singer" key={index}>{childItem.name}</span>
                            })}
                        </a>
            })
        }
       </div>:<div></div>
        return(
            <div className="search">
                <Search
                 placeholder="搜索"
                 onChange={this.handleChange}
                 onBlur={this.clearSongs}
                 >
                 </Search>
                 {showStatus}
            </div>
        )
    }
}