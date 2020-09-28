import React from 'react'
import './index.css'
import api from '@/api'
import Search from '@/components/search'

import {withRouter} from 'react-router-dom'

class Player extends React.Component{
    constructor(props){
        super(props)

        this.state = {
           songUrl:'',
           imgUrl:'http://p1.music.126.net/IOoA4l7brkuF4xx1DeRBMA==/109951165248867684.jpg',
           isCircle:false,
           isPlay:false,
           songArr:[],
           imgArr:[],
           endDuration:'00:00',
           startDuration:'00:00',
           accessRate:0,
           currentWidth:0,
           muted:false
        }
        //创建audio标签的Ref对象
        this.audioRef = React.createRef()
        this.accessRef = React.createRef()
    }

    //当前组件props变化后，获取最新的props数据
    UNSAFE_componentWillReceiveProps(nextprops){
        if(nextprops.song){
            const value = `id=${nextprops.song.id}`
            const valueB = `ids=${nextprops.song.id}`
            if(nextprops.song.ftype === 0) {
                api.getSongUrl(value).then(res => res.json())
                .then(
                    data=>{
                        if(data.code === 200 && data.data.length !== 0){
                            this.setState({
                                songUrl:data.data[0].url,
                                songName:nextprops.song.album ?nextprops.song.album.name: nextprops.song.name,
                                isCircle:true
                            },()=>{
                                //重置进度条宽度和进度条记录
                                this.resetWidth()
                            })
                        }
                    }
                )
                api.getSongDetail(valueB).then(res => res.json())
                .then(
                    data => {
                        if(data.code === 200){
                            this.setState({
                                imgUrl:data.songs[0].al.picUrl
                            })
                        }
                    }
                )
            }
            else{
                return false
            }
        }
    }
    resetWidth(){
        this.setState({
            currentWidth:0,
            accessRate:0
        })
        this.accessRef.current.style.width=0
    }
    //处理onPause()事件
    handlePause = () =>{
        this.setState({
                isCircle:false,
                isPlay:false,
                currentWidth:this.state.accessRate
        })
        this.accessRef.current.style.width=this.state.accessRate
    }

    //处理onPlay()
    handlePlay= () =>{
        //判断当前是否存在进度条宽度
        if(this.state.currentWidth === 0){
            this.setState({
                isCircle:true,
                isPlay:true,
                songArr:[...this.state.songArr,this.audioRef.current.currentSrc],
                imgArr:[...this.state.imgArr,this.state.imgUrl],
                endDuration:this.transTime(this.audioRef.current.duration),
                accessRate:(250/this.audioRef.current.duration*10000)/10000
            })
        }else{
            this.setState({
                isCircle:true,
                isPlay:true,
                songArr:[...this.state.songArr,this.audioRef.current.currentSrc],
                imgArr:[...this.state.imgArr,this.state.imgUrl],
                endDuration:this.transTime(this.audioRef.current.duration)
            })
        }
    }
    
    // 转换audio元素的duration属性为00:00格式
    transTime(time) {
        var duration = parseInt(time);
        var minute = parseInt(duration/60);
        var sec = duration%60+'';
        var isM0 = ':';
        if(minute === 0){
            minute = '00';
        }else if(minute < 10 ){
            minute = '0'+minute;
        }
        if(sec.length === 1){
            sec = '0'+sec;
        }
        return minute+isM0+sec
    }
    //处理onTimeUpdate事件，获取当前播放时长
    handleDuration = () =>{
        if(this.state.currentWidth === 0){
            let firstRate = (250/this.audioRef.current.duration*10000)/10000
            let rate = (this.state.accessRate*10000 + firstRate*10000)/10000
            this.setState({
                startDuration:this.transTime(this.audioRef.current.currentTime),
                accessRate:rate
            },()=>{
                this.accessRef.current.style.width = `${this.state.accessRate}px`
            })
        }else{
            this.accessRef.current.style.width = this.state.currentWidth
            let firstRate = (250/this.audioRef.current.duration*10000)/10000
            let rate = (this.state.accessRate*10000 + firstRate*10000)/10000
            this.setState({
                startDuration:this.transTime(this.audioRef.current.currentTime),
                accessRate:rate
            },()=>{
                this.accessRef.current.style.width = `${this.state.accessRate}px`
            })
        }
    }

 

    playBtn=()=>{
        if(this.audioRef.current.currentSrc === ''){
            return false
        }
        if(this.state.isPlay === false && this.audioRef.currentSrc !== ''){
            this.setState({
                isPlay:true
            })
            this.audioRef.current.play()
        }else if(this.state.isPlay === true && this.audioRef.cuurentSrc !== ''){
            this.setState({
                isPlay:false
            })
            this.audioRef.current.pause()
        }
    }
    handleBack=()=>{
        if(this.state.songArr.length < 2 || this.state.imgArr.length < 2){
            return false
        }
        this.state.songArr.forEach((item,index) => {
            if(item === this.state.songUrl){        //遍历songArr获取当前播放歌曲下标
                this.setState({
                    songUrl:this.state.songArr[index--],
                    imgUrl:this.state.imgArr[index--]
                })
            }
        })
    }
    handleNext=()=>{
        if(this.state.songArr.length < 2 || this.state.imgArr.length < 2){
            return false
        }
        this.state.songArr.forEach((item,index)=>{
            if(item === this.state.songUrl){
                
                this.setState({
                    songUrl:this.state.songArr[index++],
                    imgUrl:this.state.imgArr[index++]
                })
            }
        })
    }
   
    handleSound=()=>{
        console.log(this.audioRef)
        this.setState({
            muted:!this.state.muted
        },()=>{
            this.audioRef.current.muted = this.state.muted
        })
    }

    goIndex=()=>{
        this.props.history.push('/')
    }
    render(){
        //设置动画样式
        const circleStyle = {
            animationName:'circle',
            animationDuration:'14s',
            animationIterationCount:'infinite'
        }
        return(
            <div className="player"> 
                <h1 onClick={this.goIndex}>LM音乐</h1>
                <Search className="search"></Search>
                <img 
                src={this.state.imgUrl} 
                alt={this.state.songName} 
                className="circle"
                style={this.state.isCircle?circleStyle:null}
                onClick={()=>{this.audioRef.current.pause()}}
                ></img>
                
                <audio 
                ref={this.audioRef}
                autoPlay 
                src={this.state.songUrl} 
                onPause={this.handlePause} 
                onPlay={this.handlePlay}
                onTimeUpdate={this.handleDuration}></audio>
                <div className="audioPlayer">
                    <img src={[require("@/static/back.png")]} alt="上一首" onClick={this.handleBack}/>
                    <img className="playBtn" src={this.state.isPlay ? [require("@/static/pause.png")]:[require("@/static/play.png")]} alt="播放" onClick={this.playBtn}/>
                    <img src={[require("@/static/next.png")]} alt="下一首" onClick={this.handleNext}/>
                    <div className="accessBar">
                        <div className="access" ref={this.accessRef}></div>
                    </div>
                    <div className="duration">
                        <span>{this.state.startDuration}/{this.state.endDuration}</span>
                    </div>
                    <img className="sound" src={this.state.muted?[require("@/static/muted.png")]:[require("@/static/sound.png")]} alt="音量" onClick={this.handleSound}/>
                </div>
            </div>
        )
    }
}

export default withRouter(Player)