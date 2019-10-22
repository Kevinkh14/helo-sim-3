import React,{Component} from 'react'
import axios from'axios'
import Post from './Post'
import '../styles/dash.css'
import {Link} from 'react-router-dom'

class DashBoard extends Component{
    constructor(){
        super()
        this.state ={
            content :"",
            allPost :[],
            search :""
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
    handleSearchChange =(e)=>{
        this.setState({search:e.target.value})
    }
    searchForPost =()=>{
        const {search} = this.state
        axios.get(`/api/post/content?content=${search}`).then(response=>{
            this.setState({search:response.data})
            console.log(search)
        })
    }
    
    render(){
        return(
            <div className ='DashBoard'>
                <div>
                    <input onChange = {this.handleSearchChange}></input>
                    <button onClick ={this.searchForPost}>search</button>
                </div>
                <div>
                {this.state.allPost.map((individualPost,index) =>{
                    // console.log(individualPost)
                            return(
                                <>
                                   <Link to = {`/post/${individualPost.id}`}>
                                     <h1>{individualPost.content}</h1>
                                    {/* <Post
                                    content ={individualPost.content}
                                    username ={individualPost.username}
                                    postid ={individualPost.id}
                                    update ={this.update}
                                    /> */}
                                    
                                    </Link>
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