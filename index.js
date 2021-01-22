const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded( {extended : true} ));
app.use(express.static(__dirname + "/dosyalar"));
const mongoose=require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://ahmet:1234@cluster1.v1mua.mongodb.net/Cluster1?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true});

var listeler = new Schema(

  {

    isim:String,
    soyisim:String,
    yas:Number


  }

);


var Liste = mongoose.model("Liste",listeler );


app.get("/",function(req,res){

  var isim = req.query.isim;
  var soyisim = req.query.soyisim;
  var yas = req.query.yas;
  Liste.find({}, function(err, gelenVeriler){

    console.log(gelenVeriler);

    res.render("anasayfa",{kisiler:gelenVeriler,
                            isim:isim});
  });






});

app.post("/ekle",function(req,res){

  var isim = req.body.isim;
  var soyisim = req.body.soyisim;
  var yas = req.body.yas;

  var kisi1 = new Liste(

    {

      isim:isim,
      soyisim:soyisim,
      yas:yas

    }
  );

  kisi1.save(function(err){
    res.redirect("/");
  });
});


app.post("/sil",function(req,res){

  var gelenid=req.body.formid;

  console.log(gelenid);

  Liste.deleteOne({ _id : gelenid }, function(err){
      res.redirect("/");
  })



});













let port = process.env.PORT;
if(port == "" || port == null){
  port = 5000;
}
app.listen(port, function(){
  console.log("port numarasi : " + port);
});
