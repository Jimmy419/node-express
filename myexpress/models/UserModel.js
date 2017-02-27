var connPool = require("./ConnPool");
module.exports = {
	zhuce:function(req,res){
		pool = connPool();
		pool.getConnection(function(err,conn){
			if(err){
				res.send("获取链接错误，错误原因："+err.message);
				return;
			};
            var userAddSql = 'insert into user (email,pwd,nicheng,createtime) values(?,?,?,current_timestamp)'; 
            var param = [req.body['email'],req.body['pwd'],req.body['nicheng']]; 
            conn.query(userAddSql,param,function(err,rs){ 
                if(err){ 
                    //console.log('insert err:',err.message); 
                    res.send("注册错误，错误原因:"+err.message); 
                    return; 
                } 
                res.send('注册成功'); 
            })             
			conn.release();
		})
	}
}