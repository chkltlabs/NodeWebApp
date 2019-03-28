let Profile = require("./profile.js");

let renderer = require("./renderer.js");
let queryString = require('querystring');
let commonHeaders = {'Content-Type': 'text/html'};

//Handle the HTTP route GET / and POST / i.e. home routes
function home(request, response) {
    //if url == '/' && GET
    if(request.url === "/") {
        if(request.method.toLowerCase() === "get") {
            //show search
            response.writeHead(200, commonHeaders);
            renderer.view("header", {}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        } else {
            //do something to the post body data
            //if url == '/' POST
            //get POST data from body
            request.on('data', function (postBody) {
                let query = queryString.parse(postBody.toString())
                response.writeHead(303, {"Location": "/" + query.username});
                response.end();
            });
            //extract username

            //redirect to /:username
        }
    }

}
//Handle the HTTP route for GET /:username i.e. erikgratz
function user(request, response){
    //if url == '/...'
    let username = request.url.replace('/','');
    if(username.length > 0){
        response.writeHead(200, commonHeaders);
        renderer.view("header", {}, response);
        //get json from treehouse
        let studentProfile = new Profile(username);
        //on 'end'
        studentProfile.on("end", function (profileJSON) {
            //show profile

            //store the values which we need
            let values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            };
            //simple response
            renderer.view("profile", values, response);
            renderer.view("footer", {}, response);
            response.end();
        });
        //on 'error'
        studentProfile.on("error", function (error) {
            //show error
            renderer.view("error", {errorMessage: error.message}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();

        });

    }

}


module.exports.home = home;
module.exports.user = user;