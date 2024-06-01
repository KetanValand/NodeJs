# NodeJs
Node js training purpose created project
<hr>

1. <b>Registering a New User:</b>

    <b>Request Method</b> : - POST : http://127.0.0.1:3000/api/auth/register <br>

        - Request Payload Json
            {
                "name" : "ketan valand",
                "email" : "ketan.valand@radixweb.com",
                "password" : "123"
            }
        - Response Payload Json
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

1. <b>Logging User:</b>

    <b>Request Method</b> : - POST : http://127.0.0.1:3000/api/auth/login <br>

        - Request Payload Json
            {
                "email" : "ketan.valand@radixweb.com",
                "password" : "123"
            }
        - Response Payload Json
            {
                "status": true,
                "message": "User Login successfully",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6MiwiaWF0IjoxNzE3MjQ2MTQ3LCJleHAiOjE3MTczMzI1NDd9.NjY9r40GTSC01PUfOHPuHZwxAdNbYju9MWXyC1PD6v8",
                "data": {
                    "id": 2,
                    "name": "ketan valand",
                    "email": "ketan.valand@radixweb.com",
                    "createdAt": "2024-06-01T12:39:52.000Z"
                }
            }


1. <b>Retrieving a List of Blog Posts:</b>

    <b>Request Method</b> : - GET : http://127.0.0.1:3000/api/blogs <br>
        - <b>bearer token required </b>: true

        - Response Payload Json
        {
            "status": true,
            "message": "Blog details fetched successfully",
            "totalRecords": 11,
            "data": [
                {
                    "id": 1,
                    "title": "business carddwaddwadaw",
                    "content": "business12wadawddwdvvdawdawvadawd",
                    "user_id": 1,
                    "tags": "anouncementCard,bussinessCard",
                    "image": "20240601T120651.jpeg",
                    "created_at": "2024-06-01T12:06:28.000Z"
                }
        ]}


1. <b>Retrieving a Specific Blog Post:</b>

    <b>Request Method</b> : - GET : http://127.0.0.1:3000/api/blogs/5 <br>
        - <b>bearer token required </b>: true

        - Response Payload Json
        {
            "status": true,
            "message": "Blog details fetched successfully",
            "totalRecords": 11,
            "data": [
                {
                    "id": 5,
                    "title": "business carddwaddwadaw",
                    "content": "business12wadawddwdvvdawdawvadawd",
                    "user_id": 1,
                    "tags": "anouncementCard,bussinessCard",
                    "image": "20240601T120651.jpeg",
                    "created_at": "2024-06-01T12:06:28.000Z"
                }
        ]}

1. <b>Creating a New Blog Post:</b>

    <b>Request Method</b> : - POST : http://127.0.0.1:3000/api/blogs <br>
        - <b>bearer token required </b>: true

        - Request Payload Json
           
            {
                "title":"business carddwaddwadaw",
                "content" : "business12wadawddwdvvdawdawvadawd",
                "tags" : ["anouncementCard","bussinessCard"],
                "image":"required base64 encode image string"
            }
           
        - Response Payload Json
        
            {
                "status": true,
                "message": "Blog created successfully",
                "data": {
                    "created_at": "2024-06-01T13:00:42.883Z",
                    "id": 13,
                    "title": "business carddwaddwadaw",
                    "content": "business12wadawddwdvvdawdawvadawd",
                    "user_id": 1,
                    "image": "20240601T130042.jpeg",
                    "tags": "anouncementCard,bussinessCard"
                }
            }
        


1. <b>Updating an Existing Blog Post:</b>

    <b>Request Method</b> : - PUT : http://127.0.0.1:3000/api/blogs/1 <br>
        - <b>bearer token required </b>: true

        - Request Payload Json
           
            {
                "title":"business carddwaddwadaw",
                "content" : "business12"
            }
           
        - Response Payload Json 
        
            {
                "status": true,
                "message": "blog updated successfully",
                "data": {
                    "id": 1,
                    "title": "business carddwaddwadaw",
                    "content": "business12",
                    "user_id": 1,
                    "tags": "anouncementCard,bussinessCard",
                    "image": "20240601T120651.jpeg",
                    "created_at": "2024-06-01T12:06:28.000Z"
                }
           }
        


1. <b>Deleting a Blog Post::</b>

    <b>Request Method</b> : - DELETE : http://127.0.0.1:3000/api/blogs/12 <br>
        - <b>bearer token required </b>: true

        - Response Payload Json 
        
            {
                "status": true,
                "message": "Blog deleted successfully"
            }
        


1. <b>Adding a Comment to a Blog Post:</b>

    <b>Request Method</b> : - POST : http://127.0.0.1:3000/api/blogs/3/comments <br>
        - <b>bearer token required </b>: true

        - Request Payload Json
           
            {
                "content" :"helllo this is first comment on this blog"
            }
           
        - Response Payload Json
        
            {
                "status": true,
                "message": "Comment created successfully",
                "data": {
                    "created_at": "2024-06-01T13:11:47.040Z",
                    "id": 9,
                    "blog_id": "3",
                    "content": "helllo this is first comment on this blog",
                    "user_id": 1
                }
            }
        


1. <b>Retrieving Comments for a Blog Post::</b>

    <b>Request Method</b> : - GET : http://127.0.0.1:3000/api/blogs/3/comments <br>
        - <b>bearer token required </b>: true

        - Response Payload Json
        
            {
                "status": true,
                "message": "Comment details fetched successfully",
                "totalRecords": 6,
                "data": [
                    {
                        "id": 3,
                        "content": "helllo this is first comment on this blog",
                        "blog_id": 3,
                        "user_id": 1,
                        "created_at": "2024-06-01T12:09:55.000Z"
                    }
                ]
            }
        


1. <b>Deleting a Comment:</b>

    <b>Request Method</b> : - DELETE : http://127.0.0.1:3000/api/blogs/3/comments/5 <br>
        - <b>bearer token required </b>: true

        - Response Payload Json
        
            {
                "status": true,
                "message": "Comment deleted successfully"
            }
        