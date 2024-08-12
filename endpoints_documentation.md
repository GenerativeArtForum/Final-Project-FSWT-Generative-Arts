# GET User Endpoint:

**Method:** GET  
**URL:** /user/:id

### Query Parameters:

- **fields:** (string) - Comma-separated list of fields to include in the response. Available fields are:
    - **username** (string)
    - **about** (string)
    - **tags** (array of objects)
    - **threads** (array of objects)
    - **saved_threads** (array of objects)
    - **image** (string)

### Example Request:

GET /user/:id?fields=username,about,tags,threads,saved_threads,image

### Expected Response:

```json
{
    "id": 1,
    "username": "username",
    "about": "This is an example user",
    "tags": [
        { "id": 1, "name": "tag 1" },
        { "id": 2, "name": "tag 2" }
    ],
    "threads": [
        {
            "id": 1,
            "title": "First Thread",
            "content": "Content of the first thread"
        },
        {
            "id": 2,
            "title": "Second Thread",
            "content": "Content of the second thread"
        }
    ],
    "saved_threads": [
        {
            "id": 3,
            "title": "Third Thread",
            "content": "Content of the third thread"
        },
        {
            "id": 4,
            "title": "Fourth Thread",
            "content": "Content of the fourth thread"
        }
    ],
    "image": "/profile.jpg"
}
```

**Method:** POST  
**URL:** /user

### Description:

This endpoint is used to create a new user. The request should include the following parameters:

- **username** (string): The username of the user.
- **about** (string): A brief description of the user.
- **tags** (array of objects): Optional tags associated with the user.
    - **id** (number): The ID of the tag.
- **threads** (array of objects): Optional threads created by the user.
    - **id** (number): The ID of the thread.
- **saved_threads** (array of objects): Optional threads saved by the user.
    - **id** (number): The ID of the thread.
- **image** (string): The URL of the user's profile image.

### Request:

```
POST /user
Content-Type: application/json

{
        "username": "newuser",
        "about": "This is a new user",
        "tags": [
                { "id": 1 },
                { "id": 2 }
        ],
        "threads": [
                { "id": 1 },
                { "id": 2 }
        ],
        "saved_threads": [
                { "id": 3 },
                { "id": 4 }
        ],
        "image": "/newuser.jpg"
}
```

### Response:

The response will vary depending on the success of the request.

# GET Thread Endpoint:

**Method:** GET  
**URL:** /thread/:id

### Query Parameters:

- **fields:** (string) - Comma-separated list of fields to include in the response. Available fields are:
  - **question** (string)
  - **body** (string)
  - **user** (object)
  - **tags** (array of objects)
  - **images** (array of objects)
  - **responses** (number)
  - **views** (number)
- **sort_by:** (string) - Field to sort the responses by. Available options are:
  - **upvotes** (number)
- **sort_direction:** (string) - Direction to sort the responses. Available options are:
  - **ASC** (ascending)
  - **DESC** (descending)

### Example Request:

GET /thread/:id?fields=question,body,user,tags,images,responses,views&sort_by=upvotes&sort_direction=DESC

### Expected Response:

```json
{
  "id": 1,
  "question": "First Thread",
  "body": "Content of the first thread",
  "user": {
    "id": 1,
    "username": "username"
  },
  "tags": [
    { "id": 1, "name": "tag 1" },
    { "id": 2, "name": "tag 2" }
  ],
  "images": [
    { "id": 1, "url": "/image1.jpg" },
    { "id": 2, "url": "/image2.jpg" }
  ],
  "responses": [
    {
      "username": "user1",
      "date": "2024-08-09T12:00:00Z",
      "text": "This is a response.",
      "upvotes": 10
    },
    {
      "username": "user2",
      "date": "2024-08-09T12:05:00Z",
      "text": "Another response here.",
      "upvotes": 5
    }
  ],
  "views": 32
}
```

# POST Thread Endpoint:

**Method:** POST  
**URL:** /thread

### Description:

This endpoint is used to create a new thread. The request should include the following parameters:

- **question** (string): The question for the thread.
- **body** (string): The content of the thread.
- **user** (object): The user associated with the thread.
  - **id** (number): The ID of the user.
- **tags** (array of objects): Optional tags associated with the thread.
  - **id** (number): The ID of the tag.
- **images** (array of objects): Optional images associated with the thread.
  - **id** (number): The ID of the image.

The thread will be created with a draft state by default.

### Request:

```
POST /thread
Content-Type: application/json

{
    "question": "First Thread",
    "body": "Content of the first thread",
    "user": {
        "id": 1,
    },
    "tags": [
        { "id": 1 },
        { "id": 2 }
    ],
    "images": [
        { "id": 1 },
        { "id": 2 }
    ]
}
```

### Response:

The response will vary depending on the success of the request.

# POST Tag Endpoint:

**Method:** POST  
**URL:** /tag

### Description:

This endpoint is used to create a new tag. The request should include the following parameter:

- **name** (string): The name of the tag.

### Request:

```
POST /tag
Content-Type: application/json

{
    "name": "New Tag"
}
```

### Response:

The response will vary depending on the success of the request.