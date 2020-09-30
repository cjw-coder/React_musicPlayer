import React from 'react'
import api from '@/api'
import './index.css'
import { withRouter } from 'react-router'

class Hot extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            hots:[]
        }
    }
    UNSAFE_componentWillMount(){
        api.getHot().then(res => res.json())
        .then(data => {
            if(data.code === 200){
                this.setState({
                    hots:data.result.hots
                })
            }
        })
    }
    componentWillUnmount(){
        this.setState = (state,callback) => {
            return
        }
    }
    handleClick = (params) => {
        this.props.history.push(`/all?keywords=${params}&type=1`)
    }
    render(){
        return(
            <div className="hot">
                <h2>热搜榜单</h2>
                <div className="hots">
                    {this.state.hots.map((item,index) => {
                        return <div key={index} className="hotItem" onClick={() => this.handleClick(item.first)}>{item.first}</div>
                    })}
                </div>
            </div>
        )
    }
}

export default withRouter(Hot)