import React from 'react'
import './index.css'

import {withRouter} from 'react-router-dom'

class Nav extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            navBar:['单曲','专辑','歌单','视频'],       //导航栏
            currentId:this.props.id                    //获取父组件传递的导航栏下标
        }
    }

    getStyle(id){
        //记录id
        this.setState({
            currentId:id
        })

        //定义type
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

        //更改路径，传递当前keywords关键词和type类型
       this.props.history.push(`/all?keywords=${this.props.keywords}&type=${type}`)

    }
    render(){
        //定义导航栏下标样式
        const itemStyle={
            borderBottom:"4px solid #ed5a3d",
            transition:"0.2s linear",
            color:"#ed5a3d"
        }
        return(
            <div className="nav">
                <div className="navBar">
                    {this.state.navBar.map((item,index) => {
                    //监听导航栏下标点击，并实现动态样式
                    return <div key={index} onClick={() => this.getStyle(index)} style={this.state.currentId === index ? itemStyle : null}>{item}</div>
                    })}
                </div>
            </div>
        )
    }
}

export default withRouter(Nav)