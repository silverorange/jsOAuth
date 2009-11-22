    
    /**
     * Wrapper for XMLHttpRequest
     * 
     * @param {String} url
     * @param {String} method
     * @param {Object} parameters
     */
    HttpRequest = function (url, method, parameters) {
        var xhr, httprequest = this, 
        user_agent = 'jsOAuth-HttpRequest/0.1 (+http://www.lemonstudio.co.uk/jsOAuth)',
        async = true, user = UNDEFINED, password = UNDEFINED;
        xhr = new XMLHttpRequest();
        
        if (!(url instanceof Uri)) {
            url = new Uri(url);
        }
        method = (method != UNDEFINED) ? method : HttpRequest.METHOD_GET; 
        
        if (!(parameters instanceof QueryString)) {
            parameters = new QueryString(parameters);
        }
        httprequest.parameters = parameters;
        
        /**
         * set a custom user agent string
         * 
         * @param {String} string
         */
        httprequest.setUserAgent = function (string) {
            user_agent = string;
        };
        
        /**
         * get the current user agent string
         */
        httprequest.getUserAgent = function () {
            return user_agent;
        };
        
        /**
         * Wrapper for XMLHttpRequest::setRequestHeader
         * 
         * @param {String} header
         * @param {String} value
         */
        httprequest.setRequestHeader = function (header, value) {
            xhr.setRequestHeader(header, value);
        };
        
        httprequest.setBasicAuthCredentials = function (user, password) {
            user = user;
            password = password;
        };
        
        /**
         * Open a connection and send the data
         */
        httprequest.send = function () {
            var data = null, query = this.parameters.asString();
            
            // we only open now so we have greater control over the connection
            if (method == HttpRequest.METHOD_POST) {
                data = query;
            } else {
                // append the data to the url
                url += '?' + query;
            }
            xhr.open(method, url, async, user, password)
            httprequest.setRequestHeader('User-Agent', user_agent);
            
            // send the data
            xhr.send(data);
        };
        
        /**
         * just a wrapper for XMLHttpRequest::abort()
         */
        httprequest.abort = function (){
            xhr.abort()
        };
    };

    HttpRequest.METHOD_GET = 'GET';
    HttpRequest.METHOD_POST = 'POST';
    HttpRequest.METHOD_HEAD = 'HEAD';
    HttpRequest.METHOD_PUT = 'PUT';
    HttpRequest.METHOD_DELETE = 'DELETE';
    HttpRequest.METHOD_OPTIONS = 'OPTIONS';
    
    
    /** closure compiler "export" method, use quoted syntax */
    if (window['HttpRequest'] === UNDEFINED) {
        // Only give to the world if they want it
        window['HttpRequest'] = HttpRequest;
    }