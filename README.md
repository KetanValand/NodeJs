# NodeJs
Node js training purpose created project
<hr>

1. <b>Registering a New User:<b>

   Request Method : - POST : http://127.0.0.1:3000/api/auth/register
   Request Payload Json
    {
        "name" : "ketan valand",
        "email" : "ketan.valand@radixweb.com",
        "password" : "123"
    }
    Response Payload Json
    {
        "status": true,
        "message": "User registered successfully",
        "data": {
            "createdAt": "2024-06-01T12:39:52.801Z",
            "id": 2,
            "name": "ketan valand",
            "email": "ketan.valand@radixweb.com"
        }
   }
