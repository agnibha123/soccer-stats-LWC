public class RestCallFiFA {
    @AuraEnabled(cacheable=true)
    public static String makeGetCallout(String le) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        String url='http://api.football-data.org/v2/competitions/'+le+'/standings';
        request.setEndpoint(url);
 //request.setEndpoint('http://api.football-data.org/v2/competitions/PL/standings');
       
        request.setHeader('X-Auth-Token', ' ');

        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            // Deserializes the JSON string into collections of primitive data types.
           // Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            system.debug(response.getBody());
            }
        return response.getBody();
        }
        @AuraEnabled(cacheable=true)
        public static String getScorer(String le) {
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            String url='http://api.football-data.org/v2/competitions/'+le+'/scorers';
            request.setEndpoint(url);
     //request.setEndpoint('http://api.football-data.org/v2/competitions/PL/standings');
           
            request.setHeader('X-Auth-Token', ' ');
    
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            // If the request is successful, parse the JSON response.
            if (response.getStatusCode() == 200) {
                // Deserializes the JSON string into collections of primitive data types.
               // Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                system.debug(response.getBody());
                }
            return response.getBody();
            }    
             @AuraEnabled(cacheable=true)
        public static String getFix(String le) {
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            String url='http://api.football-data.org/v2/competitions/'+le+'/matches/?status=SCHEDULED';
            request.setEndpoint(url);
     //request.setEndpoint('http://api.football-data.org/v2/competitions/PL/standings');
           
            request.setHeader('X-Auth-Token', ' ');
    
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            // If the request is successful, parse the JSON response.
            if (response.getStatusCode() == 200) {
                // Deserializes the JSON string into collections of primitive data types.
               // Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                system.debug(response.getBody());
                }
            return response.getBody();
            }  
            @AuraEnabled(cacheable=true)
            public static String teams(String le) {
                Http http = new Http();
                HttpRequest request = new HttpRequest();
                String url='http://api.football-data.org/v2/competitions/'+le+'/teams';
                request.setEndpoint(url);
         //request.setEndpoint('http://api.football-data.org/v2/competitions/PL/standings');
               
                request.setHeader('X-Auth-Token', ' ');
        
                request.setMethod('GET');
                HttpResponse response = http.send(request);
                // If the request is successful, parse the JSON response.
                if (response.getStatusCode() == 200) {
                    // Deserializes the JSON string into collections of primitive data types.
                   // Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                    system.debug(response.getBody());
                    }
                return response.getBody();
                }
                @AuraEnabled(cacheable=true)
        public static String getLiveGame(String le) {
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            String url='http://api.football-data.org/v2/competitions/'+le+'/matches/?status=LIVE';
            request.setEndpoint(url);
     //request.setEndpoint('http://api.football-data.org/v2/competitions/PL/standings');
           
            request.setHeader('X-Auth-Token', ' ');
    
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            // If the request is successful, parse the JSON response.
            if (response.getStatusCode() == 200) {
                // Deserializes the JSON string into collections of primitive data types.
               // Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                system.debug(response.getBody());
                }
            return response.getBody();
            }
       
    }