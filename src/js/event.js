document.addEventListener("DOMContentLoaded", function(event) {
    
    var params = document.location.search;
    if (params.length > 0){
        
        var curParams = localStorage.getItem('params');
        if (curParams){
            
            var parsedParams = JSON.parse(curParams);

        }
        else{
        
            var parsedParams = {};
            
        }
        
        params = params.substring(1);
        var paramsArray = params.split("&");
        var paramsJson = parsedParams;
        paramsArray.forEach(function(paramString) {
            let param = paramString.split("=");
            paramsJson[param[0]] = param[1];
        });
        var json = JSON.stringify(paramsJson);
        localStorage.setItem('params', json);
        
    }
            
    console.log(localStorage.getItem('params'));
    return true;
    
});