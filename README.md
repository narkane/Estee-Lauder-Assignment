# Assessment Notes

## Notes, Ideas, Rules, and Requirements
IN ORDER TO BUILD FOR PRODUCTION! BROKEN! [FIXED LOCALLY]
IN GULPFILE.JS LINE245 change production task argument from image to images!
make sure to change LINE31 to: const uglify = require('gulp-uglify');
and then npm i gulp-uglify

gulpfile.js LINE113 change style from 'compact' to 'compressed' to fix breaking sass compile!

- The task is designed to be simple and shouldn’t take longer than __1-2 hours__.
- Research is fine but collaboration with other engineers is not allowed (since the test is intended to give an honest view into what you can accomplish on your own).
- Please send it back to us via a filesharing site like __WeTransfer__ or __YouSendIt__.
- Please __*remove*__ the [*node_modules*](./ "DONT upload THIS file!!!") folder when uploading dummy!
- Please *do not put your name in the code* or filename, because we evaluate the results anonymously.
- This test uses __React__ and __NodeJS__. 
    *The NodeJS required is very basic.*
    Because of the role you are applying for, __your *React code SPECIFICALLY* will be evaluated.__

- Please complete the task using __React__. Our evaluators will be looking for __React best practices and specialized React knowledge__ in addition to __Javascript & CSS__.



## The Task

You are required to create a *realtime search input responsive* element similar to [this one](https://www.maccosmetics.com/).

### Directions:

- FYI: Three letters is MacCosmetic's chosen *Search String* character length value that begins site requesting backend for search input responses
- [__MacCosmetic's Mobile Site__](https://m.maccosmetics.com "THIS mobile version of the sight") redirect is triggered (by a detected mobile device or device emulation) - and this ends up entirely replacing the __Search Bar__ in question with a search page [Magnifying Glass]("") now on this new "search" page you *can* get responsive searches from the white space below the nav, but they instead seem to fill the page with otherwise the same responsive results minus the Product images.
- Now the collected __String__ in the search bar (assuming a *char length* now >= 3) is checked against the Node backend server via an API call.
(__IMPORTANT!__ this same call to back, and subsequent render to front __IS ALSO DONE EVERYTIME__ when the *Search's Input String* onChange, and the character length is still > 2).
This call will find and return 2 things to the front-end:
        [[[MAKE PRETTY HOUSE!!]]]
    1. An Object containing the 4 most similarly titled items found in the *Database's "Product TABLE"?* (I might just use an ORM for DB operations, I havent yet decided) (generally I prefer one, but I have yet to read any of the project code to be honest)
    2. An integer for total number of *Products* within "matching constraints" including the first four. This is then rendered in *dropdown responsive search nav bar element* as:
            Displaying 4 of 52 Results [See All Results](https://www.maccosmetics.com/esearch?search=lip "Example Search using the word 'lip")
    3. With either of these two events the response is then loaded into the proper part of the page. You can style this however you wish and can implement it however you wish but you MUST use Javascript/React and Node to accomplish this. This has already been setup for you in the source code provided.

### Some general tips on starting:

* The point of entry for the app can be found in the 'app/scripts/main.js' file -- work from this file for your app code
* The server with the response can be found in the 'server/app.js' file -- work from this file to complete the Node server setup
* The data can be found in the 'server/data.js' file, which is then loaded into the Node 'server/app.js' file 
* The SCSS files, which contain the SASS styling, can be found in the 'app/sass' folder
* You can alter the setup of the runtime by editing the 'gulpfile.js' file


# Getting Started

## STOP EVERYTHING!!!
    
    sudo apt install gulp

If you dont already HAVE __gulp__ installed your Node/npm will be mysterious af, and the errors that
*"npm run _____"* will make no sense and only lead you astray.

A good reminder to myself, after wasting so much time! Not to be TOO confident with new toys, to not rush new features, but __instead__ to enjoy the *opportunity* to learn a new tech, and to do that, one almost always (these days) should start at the documentation, then consume all of it, then look into use cases. Doing it in reverse order is __ALWAYS SLOWER__!

## [So just start with the goshdamn __🥤Gulp🥤__ page *right now*, okay!?!](https://gulpjs.com/docs/en/getting-started/quick-start ">'💦Gulp💦gulp💦gulp!'💦<")

P.S. after much research I realized I needed to remove the 'carats' (^) prefixing all of gulps version numbers in package.json because the new releases of gulp were so alien that it would likely require an entire rewrite or the gulpfile.js. So I npm remove'd all gulps and reinstalled npm with new fixed gulp versions as well as adding a fixed node version around 10 because 14 was throwing its own type of errors as well.
In final I had to add:
- babel
- sass
- babel/plugin-proposal-class-properties
...node packages and add a tweak to the gulp-sass import in gulpfile.js.
its possible there were a few more but i rm -rf'd node_modules and removed most of the new globals that had been sudo'd in - so in closing I think its safe to say If thats not a total universal setup build fix its 99%. Theres still some warnings and bugs when i run "npm run servers" but they are incredibly minor and ive already wasted too much time continuing to fiddle with the node packages after the site was already working sufficiently to perform the assignment.

If youre experiencing problems with cross-env while issuing the "npm install" command, first try running the package.json npm script:
        
        *npm run globals*

### Prerequisites

* NPM (v6.9.0)

* NodeJS (v10.15.3)
    * If you are on a different NodeJS version, add the following entry to the package.json's dependancies object: "node": "10.15.3"
    * This will allow you to keep your current latest version of node on your PC without uninstalling and downgrading it to a lower version release, merely to complete this one project.
    * It will run your "*npm install*" command in the context of the needed Node.js version!

### Step 1 - Node Modules

The first thing you need to do to get this app working is to install the Node modules with the following command:

    npm install

### Step 2 - Running the App

After installing the Node modules, you must start two locally hosted servers. The first server is the Node back end server, which runs the NodeJS files found in the './server' folder, and the second is the front end server, which runs the app files found in the './app' folder. Both servers can be started by running the following command (make sure you’re using the correct versions of Node and NPM per the prerequisites above):

    npm run servers

This command will create a front end server at http://localhost:3030 (which should automatically open in your browser), and it will start the Node back end server at http://localhost:3035, with Nodemon, so that updates happen automatically on save. 

*Special Note for Windows Users*

On Windows systems, you may get an error like the following:

  'NODE_ENV' is not recognized as an internal or external command, operable program or batch file.
  
If so, you will need to replace any occurrences of NODE_ENV with 'SET NODE_ENV' in the package.json, and separate this command from the one that follows it with a '&', like this:
  "node-server": "SET NODE_ENV=development & nodemon server/app.js"
  
## Front End App Folder

All of the front end source code can be found in the './app' folder. A description of each subfolder is as follows:

### images

Here you can (optionally)  place images that can be processed with the npm command:

    npm run image-min

This will minify the images and put them into the '.local_server/img/' folder.

### sass

Here you will find the SCSS files, we use Sass on the project to compile down to CSS. These files will be automatically compiled upon save when you are running the standard 'npm run dev-server' command. However you can compile this yourself by running this command:

    npm run sass

### scripts

All of the Javascript can be found in here. The Webpack setup can be found in the 'config/webpack.config.js' file. These files are ran with the '[@babel/preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)' and '[@babel/preset-react](https://www.npmjs.com/package/@babel/preset-react)' loaders, which will enable you to write ES2017 and/or React Code.

The code is all initialized from the 'app/scripts/main.js' file, so that should be your initial point of call for the App.

### third_party

Third party can be used to contain any third party libraries that you may want to use with your app. You can call a command to move all the third party items with:

    npm run third-party

### views

The views folder contains the HTML templates folder. The templates are created with the [Mustache](https://mustache.github.io/) templating language.


## Node Back End Server Folder

### app.js

The source code for the back end server can be found in the './server' folder, specifically in the app.js file.  The app.js file includes starter code for you to create your own HTTP server, which will listen on port 3035 and create a data response, loading the product data from the data.js file, in JSON format. In addition to the comments in the app.js file, review the [NodeJS http.serverResponse documentation](https://nodejs.org/api/http.html#http_class_http_serverresponse).

To start the server on its own you can run this command:

    npm run node-server

### data.js

The data in the data.js file uses the following JSON Schema:

    {
        "_id": "001", // A Number for the product
        "isActive": "false", // Is the product actively in stock
        "price": "23.00", // The price of the product in the set currency
        "picture": "/img/products/N16501_430.png", // The location of the image for the product
        "name": "Damage Reverse Thickening Conditioner", // The products name
        "about": "Description for the product...", // Description of the product
        "tags": [ "ojon", "conditioner" ] // The tags for the product
    }

## Additional Submission Guidelines

* Please DELETE the node_modules folder prior to sending your code for review
* Don't forget to include CSS/SCSS styling
* If any additional commands  are necessary to run your code, please make sure this is documented
