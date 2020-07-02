const express = require ("express");
const https = require("https");
const bodyParser = require ("body-parser");
const ejs = require ("ejs");
const request = require('request');
var _ = require('lodash');

const app = express();
app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use( express.static( "public" ) );


app.get("/",function(req,res){
  res.render("index");

//   request("https://superheroapi.com/api/2581651205434252/search/thanos", { json: true }, (err, res, body) => {
//     if (err) { return console.log(err); }
//     console.log(body.results[0].name);
// console.log(body.results.biography);
//   });
})

app.post("/",function(req,res){
  var nama = req.body.d;
  console.log(nama);

    request("https://superheroapi.com/api/2581651205434252/search/"+nama, { json: true }, (err, response, body) => {
       if (err) { return console.log(err);}
console.log(body.response);

  if(body.response === "error"){
    console.log(body.error);
    res.render("failure",{error: body.error});
  }

  if(body.response === "success"){
    if (err) { return console.log(err)}
      else{
        var name = body.results[0].name;
        var intelligence = body.results[0].powerstats.intelligence;
        var strength = body.results[0].powerstats.strength;
        var speed = body.results[0].powerstats.speed;
        var durability = body.results[0].powerstats.durability;
        var power = body.results[0].powerstats.power;
        var combat = body.results[0].powerstats.combat;
        var occupation = body.results[0].work.occupation;
        var publisher = body.results[0].biography.publisher;
        var alignment = body.results[0].biography.alignment;
        var fName = body.results[0].biography.fullName;
        var gender = body.results[0].appearance.gender;
        var race = body.results[0].appearance.race;
        var height = body.results[0].appearance.height[1];
        var weight = body.results[0].appearance.weight[1];
        var base = body.results[0].work.base;
        var relatives = body.results[0].connections.relatives;


        var img = body.results[0].image.url;
        res.render("hero",{
          name:name,
          occupation:occupation,
          img:img,
          intelligence:intelligence,
          strength:strength,
          speed: speed,
          durability: durability,
          power: power,
          combat: combat,
          publisher: publisher,
          alignment: alignment,
          gender: gender,
          race: race,
          height: height,
          weight: weight,
          base: base,
          relatives: relatives,
          fName: fName
        });
      }

  }

//  var place = body.results[0].biography.place-of-birth;
});
})


app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
});

// [0].name
// [0].biography.full-name
// [0].biography.place-of-birth
// [0].biography.publisher
// [0].appearance.race
// [0].work.occupation
// [0].work.base
// [0].image.url
//access token      2581651205434252




//
// "results": [
//     {
//       "id": "69",
//       "name": "Batman",
//       "powerstats": {
//         "intelligence": "81",
//         "strength": "40",
//         "speed": "29",
//         "durability": "55",
//         "power": "63",
//         "combat": "90"
//       },

//
