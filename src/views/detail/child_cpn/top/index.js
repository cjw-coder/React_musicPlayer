import React from 'react'
import './index.css'
export default class Top extends React.Component{
    render(){

        //判断是否存在tags数组，不存在则不渲染该元素
        const tagDiv = this.props.tags.length !== 0?
        <div>标签:{this.props.tags.map((item,index) => {return <span key={index} className="tag">{item}</span>})}</div>:<div></div>
        
        return(
            <div className="top">
                <img src={this.props.playlist.coverImgUrl} alt={this.props.playlist.name}></img>
                <div className="content">
                    <h2>{this.props.playlist.name}</h2>
                    <div className="description">
                        {tagDiv}
                        <span>介绍:</span>{this.props.playlist.description}
                    </div>
                </div>
            </div>
        )
    }
}