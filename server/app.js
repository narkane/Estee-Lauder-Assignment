/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data = require('./data');
const express = require('express');
const hostname  = 'localhost';
const port = 3035;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3030"); // update to match the domain you will make the request from
    // res.header("Access-Control-Allow-Origin", "http://estee-lauder-assignment.surge.sh");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.post('/search/name', function(req, res, next) {
    var search = req.body.search;//.filter(e => e);
    const token = req.body.token;
    const geo = req.body.geo;
    search = search.split(' ');
    search = search.filter(e => e);

    console.log("SEARCH[name]: "+search);
    var passiveResults = [];

    data.forEach((item)=>{
        let itemLC = item.name.toLowerCase();
        // console.log(itemLC);
        let hasAllElems = true;

        for (let i = 0; i < search.length; i++){
            if (itemLC.indexOf(search[i]) === -1) {
                hasAllElems = false;
                break;
            }
        }

        if(hasAllElems){
          passiveResults.push(item);
          // points[parseInt(item._id)-1]++;
        }
    });
    uniqueRet = [...new Set(passiveResults)];
    console.log('DATA: '+JSON.stringify(uniqueRet));

    res.send({
      'search': search,
      'token': token,
      'geo': geo,
      'data': uniqueRet
    });
})

app.post('/search/tags', function(req, res, next) {
    // var points = [20];
    var search = req.body.search;//.filter(e => e);
    const token = req.body.token;
    const geo = req.body.geo;
    search = search.split(' ');
    search = search.filter(e => e);

    console.log("SEARCH[tags]: "+search);
    var passiveResults = [];
    
    // search.forEach(word => {
    data.forEach((item) => {
        let aTerms = item.tags;
        // console.log(aTerms);
        let hasAllElems = true;

        for (let i = 0; i < search.length; i++){
            if (aTerms.indexOf(search[i]) === -1) {
                hasAllElems = false;
                break;
            }
        }

        if(hasAllElems){
          passiveResults.push(item);
          // points[parseInt(item._id)-1]++;
        }
    })
    uniqueRet = [...new Set(passiveResults)];
    // });
    // console.log(search);

    // console.log('passiveResults[tags]: '+JSON.stringify(passiveResults));
    
    // const ret = [...passiveResultsTag, ...passiveResults];


    // console.log("TOTAL OUTPUT TEST:")
    // console.log(passiveResults.length+" + "+passiveResultsTag.length+" = "+ret.length);
    // console.log(uniqueRet.length);
    console.log('DATA: '+JSON.stringify(uniqueRet));

    res.send({
      'search': search,
      'token': token,
      'geo': geo,
      'data': uniqueRet
    });
  });
  
  app.listen(port);
  console.log('Server started at http://localhost:' + port);
/** 
 * Start the Node Server Here...
 * 
 * The http.createServer() method creates a new server that listens at the specified port.  
 * The requestListener function (function (req, res)) is executed each time the server gets a request. 
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
// http.createServer(function (req, res) {
    // .. Here you can create your data response in a JSON format
    
    // res.statusCode = 200;
    // res.setHeader("Access-Control-Allow-Origin", "*");
    //Origin, X-Requested-With, Accept, , "Content-Type"
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Headers", "*");
    // res.setHeader('Content-Type', 'text/plain');
    
    // console.log(req);
    // console.log(JSON.stringify(req));
    // res.write(req);
    // res.write("Response goes in here..."); // Write out the default response
    // res.end("Server received search request: "); //end the response
// }).listen( port );


console.log(`[Server running on ${hostname}:${port}]`);
