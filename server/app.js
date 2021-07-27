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
    res.header("Access-Control-Allow-Origin", "http://estee-lauder-assignment.surge.sh");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/search/passive', function(req, res, next) {
    const search = req.body.search;
    const token = req.body.token;
    const geo = req.body.geo;
    const passiveResults = data.filter((item)=>{
        let itemLC = item.name.toLowerCase();
        return itemLC.includes(search);
    });
    var passiveResultsTag = [];
    
    data.forEach((item) => {
        item.tags.forEach((tag) => {
            if(tag.includes(search)){
              passiveResultsTag.push(item);
            }
        })
    })
    console.log(search);

    console.log('passiveResults[tags]: '+JSON.stringify(passiveResultsTag));
    
    const ret = [...passiveResults, ...passiveResultsTag];

    uniqueRet = [...new Set(ret)];

    console.log("TOTAL OUTPUT TEST:")
    console.log(passiveResults.length+" + "+passiveResultsTag.length+" = "+ret.length);
    console.log(uniqueRet.length);

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
