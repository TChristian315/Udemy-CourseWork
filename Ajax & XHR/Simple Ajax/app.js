document.getElementById('button').addEventListener('click', loadData);

function loadData (){
    // Create an XHR obj
    const xhr = new XMLHttpRequest();

    // OPEN
    xhr.open('GET', 'data.txt', true);

    // Optional - used for spinners/loaders
    xhr.onprogress = function(){
        console.log('READYSTATE', xhr.readyState);
    }

    xhr.onload = function(){
        if(this.status === 200){
            //console.log(this.responseText);
            document.getElementById('output').innerHTML = `<h1>${this.responseText}</h1>`;
        }
    }

    xhr.send();

    xhr.onerror = function(){
        console.log('Request Error');
    }

    // readyState Values
    // 0: request not initialized
    // 1: server connection established
    // 2: request recieved
    // 3: processing request
    // 4: request finished and response is ready


    // HTTP Common Statuses
    // 200 : "OK"
    // 403 : "Forbidden"
    // 404 : "Not Found"
}