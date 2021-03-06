
module.exports = {
  "swagger": "2.0",
  "info": {
    "description": "This is a sample server test server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api key `special-key` to test the authorization     filters.",
    "version": "1.0.0",
    "title": "test",
    "termsOfService": "http://swagger.io/terms/",
    "contact": {
      "email": "heath.supergene@gmail.com"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  "host": "petstore.swagger.io",
  "basePath": "/api/v1",
  "tags": [
    {
      "name": "posts",
      "description": "About User posts",
      "externalDocs": {
        "description": "Find out more",
        "url": "http://swagger.io"
      }
    }
  ],
  "schemes": [
    "http"
  ],
  "paths": {
    "/posts/{id}": {
      "get": {
        "tags": [
          "posts"
        ],
        "summary": "Find post by ID",
        "description": "Returns a single post",
        "operationId": "getPostById",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of post to return",
            "required": true,
            "type": "integer",
            "format": "int64"
          }
        ],
        "responses": {
          "200": {
            "description": "successful operation",
            "schema": {
              "$ref": "#/definitions/Post"
            }
          },
          "400": {
            "description": "Invalid ID supplied"
          },
          "404": {
            "description": "Post not found"
          }
        },
        "security": [
          {
            "api_key": []
          }
        ]
      }
    }
  },
  "securityDefinitions": {
    "api_key": {
      "type": "apiKey",
      "name": "Authorization",
      "in": "header"
    }
  },
  "definitions": {
    "Post": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "address": {
          "type": "string"
        }
      }
    },
    "ApiResponse - Success": {
      "type": "object",
      "properties": {
        "data": {
          "type": "object"
        }
      }
    },
    "ApiResponse - Failed": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        }
      }
    }
  }
}