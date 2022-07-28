const dbConnection = require("./../database/dbConnection");

exports.deleteBlog = async(req,res)=>{
    const id = req.params.id;
    
    const user = req.user;

    
    let que1 = "select * from blog_tbl where blog_tbl.ID = ?"
    dbConnection.query(que1,[id],(err,results)=>{
      
      if(results && results[0].userID === user.userId ){
        let que2 = "delete from blog_tbl WHERE ID=?";
      dbConnection.query(que2,[id],(err,results)=>{
          if(!err){
              if(results.affectedRows === 0){
                  return res.status(404).json({message:"Invalid Blog"})
              }
            return res.status(200).json({message:"Blog deletion successfull"})
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