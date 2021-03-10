class ApplicationController < ActionController::API
    
    def hmac_secret
        'my$ecretK3y'
    end
    
    def encode(payload)
        #returns token
        JWT.encode(payload, hmac_secret, 'HS256')
    end
    
    def decode(token)
        #returns payload
        JWT.decode(token, hmac_secret, true, { algorithm: 'HS256' })[0]
    end 
end
