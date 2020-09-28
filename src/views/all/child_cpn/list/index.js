import React from 'react'
import api from '@/api'
import './index.css'
import '@/static/fontIcon/iconfont.css'
import {withRouter} from 'react-router-dom'

class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            type:this.props.type,
            keywords:this.props.keywords,
            id:this.props.id,
            result:{}
        }
    }
    UNSAFE_componentWillMount(){
        api.getSearch(`keywords=${this.state.keywords}&type=${this.state.type}`).then(res => res.json())
        .then(data => {
            this.setState({
                result:data.result
            })
        })
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.type !== this.state.type){
            this.setState({
                type:nextProps.type,
                keywords:nextProps.keywords,
                id:nextProps.id
            })
            api.getSearch(`keywords=${nextProps.keywords}&type=${nextProps.type}`).then(res => res.json())
            .then(data => {
                this.setState({
                    result:data.result
                })
            })
        }
    }
    handleSongs = (params) => {
        this.props.getSongs(params)
    }
    handlePlaylists = (params) => {
        this.props.history.push(`/detail?id=${params}`)
    }
    render(){
        const songs = this.state.type === '1' && this.state.result.songs ? <div className="songs">
            {this.state.result.songs.map((item,index) => {
                return <div key={index} className="songsItem" onClick={() => this.handleSongs(item)}>
                    <span className="iconfont icon-bofang"></span>
                    <span className="song">{item.name}</span>
                    <div className="info">
                        <span className="artist">{item.album.name}</span>
                        <span className="alias">
                        {item.artists.map((childItem,index) => {
                            return <span key={index}>{childItem.name} </span>
                        })}
                        </span>
                    </div>
                </div>
            })}
        </div>:null

        const albums = this.state.type === '10' && this.state.result.albums ? <div className="albums">
            {this.state.result.albums.map((item,index) => {
                return <div key={index} className="albumsItem">
                    <img src={item.blurPicUrl} alt={item.name}/>
                    <div>
                        <p className="title">{item.name}</p>
                        <p>{item.artist.name}</p>
                    </div>
                </div>
            })}
        </div>:null

        const playlist = this.state.type === '1000' && this.state.result.playlists ? <div className="playlists">
            {console.log(this.state.result)}
            {this.state.result.playlists.map((item,index) => {
                return <div key={index} className="playlistsItem" onClick={() => this.handlePlaylists(item.id)}>
                        <img src={item.coverImgUrl} alt={item.name}/>
                        <span className="name">{item.name}</span>
                        <div className="info">
                            <span className="nick">{`by ${item.creator.nickname}`}</span>
                            <span className="playCount">{`播放量：${item.playCount}`}</span>
                        </div>
                </div>
            })}
        </div>:null

        const videos = this.state.type === '1014' && this.state.result.videos ?  <div className="videos">
            {console.log(this.state.result)}
            {this.state.result.videos.map((item,index) => {
                return <a className="videosItem" key={index} href={`https://music.163.com/#/video?id=${item.vid}`}>
                    <img src={item.coverUrl} alt={item.title}></img>
                    <div className="info">
                        <div className="title">{item.title}</div>
                        {item.creator.map((childItem,index) => {
                            return <span key={index}>{childItem.userName}</span>
                        })}
                    </div>
                </a>
            })}
        </div>:null
        return(
            <div>
                {songs}
                {albums}
                {playlist}
                {videos}
            </div>
        )
    }
}

export default withRouter(List)