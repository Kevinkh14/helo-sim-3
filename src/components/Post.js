import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Post extends Component{
    constructor(){
        super()
        this.state ={
            allPost:""
        }
    }
    //     componentDidMount(){
    //     axios.get(`/api/post/${this.props.match.params.postid}`).then(response=>{
    //         console.log(response.data)
    //         this.setState({allPost:response.data})
    //     })           
    // }
  
    render(){
        return(
            <div>
                <h1>{this.props.match.params.postid}</h1>
            </div>
        )
    }
}
export default Post