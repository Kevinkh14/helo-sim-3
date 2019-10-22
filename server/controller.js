const bcrypt = require ('bcryptjs')


module.exports ={
    register : function(req, res){
        const {username, password, avatar} = req.body
        const db = req.app.get('db');
        bcrypt.hash(password, 12).then(hash =>{
            db.register(username, hash, avatar).then(()=>{
                req.session.user ={
                    username,
                    avatar
                }
                res.status(200).json(req.session.user)
            })
        })
    },

    login: function(req,res){
        const {username, password} = req.body;
        const db = req.app.get("db");
        db.login(username).then(user =>{
            let hash = user[0].password
            bcrypt.compare(password, hash).then(areSame =>{
                if(areSame){
                    req.session.user ={
                        id:user[0].id,
                        username,
                        avatar:user[0].avatar
                    }
                    console.log(req.session.user)
                    res.status(200).json(req.session.user)
                }else{
                    res.status(401).json({
                        error:"Username or password Incorect"
                    })
                }
            })
        })
    },
    logout: function (req,res){
        req.session.destroy();
        return res.sendStatus(200)
    },
    addPost: function(req,res){
        const {content}=req.body
        const db = req.app.get("db")
        const userID = req.session.user.id
                    db.Createpost(content, userID)
                        .then(()=>{
                            res.sendStatus(200)
                    })
    },
     getPost: function(req,res){
        const db = req.app.get('db')
        db.getPost().then(posts =>{
            res.status(200).json(posts)
        })
    },
    //  getOnePost:function(req,res){
    //     const db = req.app.get('db')
    //     const postid = +req.params.postid
    //     db.getPost(postid).then(posts =>{
    //         res.status(200).json(posts)
    //         console.log(posts)
    //     })
    // },
    getPostByTitle : async function(req, res){
        const db = req.app.get('db')
        const{content} = req.query
        const posts = await db.getPostByTitle(`${content}%`)
        res.status(200).json(posts)
        console.log(posts)
    }
}
