import React,{Component} from 'react'
import {connect} from 'react-redux'
import reducer, {updateUser} from '../redux/reducer'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class Nav extends Component{
    constructor(){
        super()
        this.state ={
            redirect : false
        }
    }
    logout=()=>{
        axios
        .get('/auth/logout')
        .then(()=>{
            this.props.updateUser({})
            this.setState({redirect:true})
        })
        .catch(err=>console.log(err))
    }

    render(){
        // const {username, avatar} = this.props.user
        if (this.state.redirect === true ){
            return <Redirect to ="/"/>
        }
        return(
            <div>
                <h1>nav</h1>
                <button onClick = {this.logout}>Logout</button>
            </div>
        )
    }
}
function mapStateToProps (state){
    return {
        user : state.user
    }
}

export default  connect (mapStateToProps,{
    updateUser
})(Nav)