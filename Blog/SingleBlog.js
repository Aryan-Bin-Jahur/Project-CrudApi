const dbConnection = require("./../database/dbConnection");


exports.singleBlog = async(req,res)=>{
    const usr = req.user;
    const id = req.params.id;
    let que1 = "select * from blog_tbl where blog_tbl.ID = ?"


    dbConnection.query(que1,[id],(err,results)=>{
    if(results && results[0].userID === usr.userId ){
    let que2 = "SELECT title,description FROM  blog_tbl where ID = ? ";


    dbConnection.query(que2,[id],(err,results)=>{
        if(!err){
          return res.status(200).json(results)
        }
        else{
          return res.status(500).json(err)
        }
      })
    }
    else{
        return res.status(403).json({message:"Unauthorized"})
    }
})
}