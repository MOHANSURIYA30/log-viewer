const LogModel = require("../../models/logs/log");

exports.getLog = (req,res,next) =>{
     let obj = req.query;
     let limit_val =0;
     let skip = obj.skip;
       console.log(obj);
      //  if(Boolean(obj.limit) == true)
      //  {
         limit_val = obj.limit;
      //  }
      
       let search_string = obj.search?obj.search:'';
       let type = obj.type;
      console.log("type is "+ type);
       delete obj.limit;
       delete obj.search
      //  console.log(obj );
       if(type != 'all' && type != undefined)
       {
        LogModel.find({type:type,time: {$gt: obj.fromTime  ,$lte: obj.toTime}, message: { "$regex": search_string, "$options": "i" } }).skip(skip).limit(limit_val).exec((err,log_res)=>{
          if(err)
          {
            console.log("Error cannot get data");
            res.status(503).send(err);
          }
          else
          {
            console.log("data get successfully");
            res.send(log_res);
          }
        })
       }
       else
       {
        LogModel.find({time: {$gt: obj.fromTime  ,$lte: obj.toTime}, message: { "$regex": search_string, "$options": "i" } }).skip(skip).limit(limit_val).exec((err,log_res)=>{
          if(err)
          {
            console.log("Error cannot get data");
            res.status(503).send(err);
          }
          else
          {
            console.log("data get successfully");
            res.send(log_res);
          }
        })
       }
    

}
