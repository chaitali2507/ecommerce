var product= require('../adminmodel/product_model');

exports.insert = async (req,res) =>{
     var data= await product.create(req.body);
     res.status(200).json({
        status:"data insert",
        data
     })
}
exports.get_data=async (req,res)=>{
   try {

    //pagination
    var limit=2;

    var page_no=req.query.page_no;
    if (page_no==undefined)
    {
        page_no=1;
    }
    var start=(page_no-1)*limit;

    var data=await product.find().limit(limit).skip(start);
    var total_record =await product.find().count();

    var total_page=Math.ceil(total_record/limit);
    res.status(200).json({
        data,
        total_record,
        total_page
    })
   } catch (error) {
    res.status(200).json({
        error
    })
   }
}
exports.delete_data = async (req,res) =>{
   var id=req.params.id;
   var data= await product.findByIdAndDelete(id);
   res.status(200).json({
      status:"data deleted",
   })
}
exports.update_data = async (req,res) =>{
   var id=req.params.id;
   var data= await product.findByIdAndUpdate(id,req.body);
   res.status(200).json({
      status:"data update",
   })
}
exports.single_data = async (req,res) =>{
   var id=req.params.id
   var data= await product.findById(id,req.body);
   res.status(200).json({
      status:"single product",
      data
   })
}
exports.search_product = async (req,res) =>{
   var title=req.params.title

   var data= await product.find({"title":title});
   res.status(200).json({
      status:"product search",
      data
   })
}
exports.product_category = async (req,res) =>{
   var category=req.params.category

   var data= await product.find({"category":category});
   res.status(200).json({
      status:"product category",
      data
   })
}
