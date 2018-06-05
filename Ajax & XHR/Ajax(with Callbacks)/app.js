function easyHTTP() {
    this.http = new XMLHttpRequest();
}

// Make an HTTP GET Request
easyHTTP.prototype.get = function(url){
    this.http.open('GET', url, true);

    this.http.onload = function (){
        if(){
            
        }
    }


    this.http.send();
}

// Make an HTTP POST Request

// Make and HTTP PUT Request

// Make an HTTP DELETE Request