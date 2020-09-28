import React from 'react'
import api from '@/api'
import { Carousel } from 'antd';
import './index.css'

export default class Banner extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            banners:[]
        }
    }

    //调用api.getBanners接口
    componentDidMount(){
        api.getBanners('type=0').then(res => res.json())
        .then(data => {
            this.setState({
                banners:data.banners
            })
            console.log(this.state.banners)
        })
    }
    componentWillUnmount(){
        this.setState = (state,callback) => {
            return
        }
    }
    //判断banner具体参数来动态设置href链接参数
    getBannerType = (targetType,targetId,targetUrl) =>{
        if(targetUrl){
            return targetUrl
        }
        let type = ''
        switch(targetType){
            case 1:
                type = 'song'
                break
            case 10:
                type = 'album'
                break
            case 1004:
                type = 'mv'
                break
            default:
                break
        }
        return `https://music.163.com/#/${type}?id=${targetId}`
    }

    render(){
        //定义样式
        const contentStyle = {
            height: '400px',
            color: '#fff',
            lineHeight: '400px'
          };
        const imgStyle = {
            width:'900px'
        }
        return(
            <div className="banner">
                <Carousel autoplay effect='fade'>
                    {
                        this.state.banners.map((item) => {
                            return<a style={contentStyle} key={item.targetId} href={this.getBannerType(item.targetType,item.targetId,item.url)}>
                                    <img src={item.imageUrl} style={imgStyle} alt={item.typeTitle}></img>
                                </a>
                            
                        })
                    }
                </Carousel>
            </div> 
        )
    }
}


