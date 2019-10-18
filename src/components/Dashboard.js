import React,{Component} from 'react'
import axios from'axios'
import Post from './Post'
import '../styles/dash.css'

class DashBoard extends Component{
    constructor(){
        super()
        this.state ={
            content :"",
            allPost :[]
        }
    }
    componentDidMount(){
      this.fetchPost()
    }

    handleChange =(e)=>{
        this.setState({content : e.target.value})
    }
    
    handlePost =()=>{
        axios.post('/api/post',{
            content:this.state.content
        }).then(()=>{
            this.fetchPost()
        })
    }
    update =(allPost)=>{
      this.setState({allPost:allPost})  
    }
    fetchPost =()=>{
        axios.get('/api/post').then(response=>{
            this.setState({allPost:response.data})
        }) 
    }
    render(){
        return(
            <div className ='DashBoard'>
                <div>
                {this.state.allPost.map((individualPost,index) =>{
                    console.log(individualPost)
                            return(
                                <>
                                    <Post
                                    content ={individualPost.content}
                                    username ={individualPost.username}
                                    postid ={individualPost.id}
                                    update ={this.update}
                                    />
                                </>
                            )
                        })}
                </div>
                <div>
                    <input onChange = {this.handleChange}></input>
                    <button onClick = {this.handlePost}>create post</button>
                </div>
            </div>
        )
    }
}
export default DashBoard