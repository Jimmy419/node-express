var connPool = require("./ConnPool");

module.exports = {
	zhuce:function(req,res){
		console.log("connPool");
		console.log(connPool);
		pool = connPool();
		console.log("pool");
		console.log(pool);
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
	},
	login:function(req,res){
		pool = connPool();
		pool.getConnection(function(err,conn){
            if(err)
            { 
               //console.log('insert err:',err.message); 
               res.send("获取链接错误，错误原因:"+err.message); 
               return; 
            } 
            var userSql = 'select uid,nicheng from user where email=? and pwd=?';   
            var param = [req.body['email'],req.body['pwd']];   
            conn.query(userSql,param,function(err,rs){   
                if(err){   
                    //console.log('insert err:',err.message);   
                    res.send("注册错误，错误原因:"+err.message);   
                    return;   
                }   
                console.log(rs);   
                //console.log(rs.length);   
                if(rs.length>0){   
                    res.send('注册成功');   
                }else{   
                    res.send("email/登陆失败");   
                }   
            })   
            conn.release();
		})
	}
}