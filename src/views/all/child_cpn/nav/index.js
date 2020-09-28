import React from 'react'
import api from '@/api'
import './index.css'

import {withRouter} from 'react-router-dom'

class Nav extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            navBar:['单曲','专辑','歌单','视频'],
            currentId:this.props.id
        }
    }
    getStyle(id){
        this.setState({
            currentId:id
        })
        let type
        switch(id){
            case 0:
                type = 1
                break
            case 1:
                type = 10
                break
            case 2:
                type = 1000
                break
            case 3:
                type = 1014
                break
            default:
                break
        }
        

        //解决相同路由路径跳转参数不同，不重新渲染页面的问题
       this.props.history.push(`/all?keywords=${this.props.keywords}&type=${type}`)

    }
    render(){
        const itemStyle={
            borderBottom:"4px solid #ed5a3d",
            transition:"0.2s linear",
            color:"#ed5a3d"
        }
        return(
            <div className="nav">
                <div className="navBar">
                    {this.state.navBar.map((item,index) => {
                    return <div key={index} onClick={() => this.getStyle(index)} style={this.state.currentId === index ? itemStyle : null}>{item}</div>
                    })}
                </div>
            </div>
        )
    }
}

export default withRouter(Nav)