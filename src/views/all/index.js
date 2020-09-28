import React from 'react'
import api from '@/api'
import './index.css'

import Player from '@/components/player'
import Nav from  './child_cpn/nav'
import List from './child_cpn/list'

export default class All extends React.Component{
    constructor(props){
        super(props)
        const params = new URLSearchParams(props.location.search)
        this.state = {
            keywords:params.get('keywords'),
            type:params.get('type'),
            id:0,
            result:{}
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const params = new URLSearchParams(nextProps.location.search)
        this.setState({
            keywords:params.get('keywords'),
            type:params.get('type'),
            id:0,
            song:0
        })
        this.getId()
    }

    UNSAFE_componentWillMount(){
        api.getSearch(`keywords=${this.state.keywords}&type=${this.state.type}`).then(res => res.json())
        .then(data => {
            this.setState({
                result:data.result
            })
        })
        this.getId()
    }
    getId(){
        switch(this.state.type){
            case '1':
                this.setState({
                    id:0
                })
                break
            case '10':
                this.setState({
                    id:1
                })
                break
            case '1000':
                this.setState({
                    id:2
                })
                break
            case '1014':
                this.setState({
                    id:3
                })
                break
            default:
                break
        }
    }
    componentWillUnmount(){
        this.setState = (state,callback) => {
            return
        }
    }
    handleSongs = (params) => {
        this.setState({
            song:params
        })
    }
    render(){
        return(
            <div className="all">
                <Player song={this.state.song}></Player>
                <div className="all_content">
                    <Nav keywords={this.state.keywords} id={this.state.id}></Nav>
                    <List 
                    type={this.state.type} 
                    keywords={this.state.keywords} 
                    id={this.state.id}
                    getSongs={this.handleSongs}></List>
                </div>
            </div>
        )
    }
}
