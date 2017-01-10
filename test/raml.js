const RAML_TEST = {
  "traits": {
    "Paginated": {
      "queryParameters": [
        {
          "name": "limit",
          "displayName": "limit",
          "type": "number",
          "default": 25,
          "required": true,
          "description": "Limit in the response list",
          "minimum": 1,
          "maximum": 300,
          "examples": [
            "100"
          ],
          "key": "limit"
        },
        {
          "name": "start",
          "displayName": "start",
          "type": "number",
          "default": 0,
          "required": true,
          "description": "The start entry of the list",
          "minimum": 0,
          "examples": [
            "25"
          ],
          "key": "start"
        },
        {
          "name": "nextPageToken",
          "displayName": "nextPageToken",
          "type": "string",
          "required": true,
          "description": "The `nextPageToken` is a web safe encoded cursor to the next entry in the database.\nIt can be obtained by requesting paginated resource and used in next request to get\nnext results page.\n",
          "pattern": "[a-zA-Z0-9]+",
          "examples": [
            "CiAKGjBpNDd2Nmp2Zml2cXRwYjBpOXA"
          ],
          "key": "nextPageToken"
        }
      ],
      "responses": [
        {
          "code": "200",
          "body": [
            {
              "name": "application/json",
              "displayName": "application/json",
              "type": "object",
              "required": true,
              "properties": [
                {
                  "name": "items",
                  "displayName": "items",
                  "type": "array",
                  "required": true,
                  "description": "Contains a list of objects for this method.",
                  "items": {
                    "name": "items",
                    "displayName": "items",
                    "type": "string",
                    "required": true
                  },
                  "key": "items"
                },
                {
                  "name": "nextPageToken",
                  "displayName": "nextPageToken",
                  "type": "string",
                  "required": true,
                  "description": "The next page token is a web safe encoded cursor to the next entry in the database.\nUse it in the next request to obtain next page of the results.\n",
                  "examples": [
                    "CiAKGjBpNDd2Nmp2Zml2cXRwYjBpOXA"
                  ],
                  "key": "nextPageToken"
                }
              ],
              "key": "application/json"
            }
          ],
          "description": "Paginated response containing a single page of the result.\nBy default one page of the results contains 25 items. You can extend it by setting a\n`limit` query parameter in your request.\nWhen changing parameters while using the `nextPageToken` the `nextPageToken` will be ignored\nand new query will be performed. Queries with `nextPageToken` should contain the same set\nof parameters as the first request.\n",
          "key": "200"
        },
        {
          "code": "400",
          "body": [
            {
              "name": "application/json",
              "displayName": "Invalid",
              "type": "object",
              "required": true,
              "properties": [
                {
                  "name": "error",
                  "displayName": "error",
                  "type": "boolean",
                  "required": true,
                  "description": "Indicate that the response is errored.",
                  "examples": [
                    "true"
                  ],
                  "key": "error"
                },
                {
                  "name": "message",
                  "displayName": "message",
                  "type": "string",
                  "required": true,
                  "description": "The error message associated with the error.",
                  "examples": [
                    "The `limit` parameter is invalid. Please, provide a number between 1 and 300."
                  ],
                  "key": "message"
                }
              ],
              "key": "application/json"
            }
          ],
          "description": "The error response when one of the parameters is invalid and can't be parsed.\nNothing can be done at this time except correcting the request to send valid data.\n",
          "key": "400"
        }
      ],
      "securedBy": [
        "oauth_2_0",
        "oauth_1_0"
      ],
      "description": "The collection of <<resourcePathName>>.",
      "name": "Paginated",
      "usage": "This trait is to be used when the resource is paginated that is the edpoint producses\na list of resources in the response.\nEvery paginated response contains a `nextPageToken` property that should be used in pagination\nto request for next page of the results and `items` which is a list of resources.\n\nThe `items` property is always defined, even if the response is empty. Therefore the `404`\nresponse in this case is not possible. Clients need to handle empty responses by their own.\n\nIt is crutial that the subsequent requests contain the same set of parameters (like `limit`\nor `start`) because if this values will change then the `nextPageToken` will be revalidated\nand pagination will start from the first page.\n"
    },
    "Adminable": {
      "responses": [
        {
          "code": "200",
          "headers": [
            {
              "name": "X-Amin-Resource",
              "displayName": "Admin resource mark header",
              "type": "boolean",
              "default": false,
              "required": true,
              "description": "This header is not set if the resource can be changed by non-admin users."
            }
          ],
          "key": "200"
        },
        {
          "code": "401",
          "description": "The 401 response will be returned when trying to update the resource with \nnon-admin clerance level. Resources that requires admin privileges are marked with \n`X-Admin-Resource` header when getting the resource.\n",
          "key": "401"
        }
      ],
      "securedBy": [
        "oauth_2_0",
        "oauth_1_0"
      ],
      "description": "Use this to mark a resource that can be changed only by users with admin level.",
      "name": "Adminable",
      "usage": "Some resources can be changed only by users with Admin clerance level. This resources will be \nmarked with the header `X-Admin-Resource` when requesting it. It means that every attemp to \nupdate the resource by non-admin user will result with 401 response.\n"
    }
  },
  "resourceTypes": {
    "ErrorredResource": {
      "securedBy": [
        "oauth_2_0",
        "oauth_1_0"
      ],
      "name": "ErrorredResource",
      "get": {
        "securedBy": [
          "oauth_2_0",
          "oauth_1_0"
        ],
        "method": "get"
      }
    },
    "ResourceNotFound": {
      "type": "ErrorredResource",
      "securedBy": [
        "oauth_2_0",
        "oauth_1_0"
      ],
      "name": "ResourceNotFound",
      "get": {
        "responses": [
          {
            "code": "404",
            "body": [
              {
                "name": "ErrorResource",
                "displayName": "ErrorResource",
                "type": "object",
                "required": true,
                "additionalProperties": true,
                "description": "A response that is errored",
                "properties": [
                  {
                    "type": "boolean",
                    "description": "Indicate that the response is errored.",
                    "displayName": "error",
                    "default": true,
                    "name": "error",
                    "required": true,
                    "examples": [
                      "true"
                    ],
                    "key": "error"
                  },
                  {
                    "type": "string",
                    "description": "The error message associated with the error.",
                    "displayName": "message",
                    "name": "message",
                    "required": true,
                    "examples": [
                      "<<example>>"
                    ],
                    "key": "message"
                  }
                ],
                "key": "application/json"
              },
              {
                "name": "application/xml",
                "displayName": "Not found response",
                "type": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xs:schema xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" elementFormDefault=\"qualified\" attributeFormDefault=\"unqualified\">\n  <xs:element name=\"resource\">\n    <xs:complexType>\n      <xs:sequence>\n        <xs:element name=\"message\" type=\"xs:string\"></xs:element>\n      </xs:sequence>\n      <xs:attribute name=\"error\" type=\"xs:boolean\" use=\"required\"/>\n    </xs:complexType>\n  </xs:element>\n</xs:schema>\n",
                "required": true,
                "examples": [
                  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<resource error=\"true\">\n  <message>Not found</message>\n</resource>\n"
                ],
                "key": "application/xml"
              }
            ],
            "key": "404"
          }
        ],
        "securedBy": [
          "oauth_2_0",
          "oauth_1_0"
        ],
        "method": "get"
      }
    },
    "UnauthorizedResponse": {
      "type": "ErrorredResource",
      "securedBy": [
        "oauth_2_0",
        "oauth_1_0"
      ],
      "name": "UnauthorizedResponse",
      "get": {
        "responses": [
          {
            "code": "404",
            "body": [
              {
                "name": "ErrorResource",
                "displayName": "ErrorResource",
                "type": "object",
                "required": true,
                "additionalProperties": true,
                "description": "A response that is errored",
                "properties": [
                  {
                    "type": "boolean",
                    "description": "Indicate that the response is errored.",
                    "displayName": "error",
                    "default": true,
                    "name": "error",
                    "required": true,
                    "examples": [
                      "true"
                    ],
                    "key": "error"
                  },
                  {
                    "type": "string",
                    "description": "The error message associated with the error.",
                    "displayName": "message",
                    "name": "message",
                    "required": true,
                    "examples": [
                      "<<example>>"
                    ],
                    "key": "message"
                  }
                ],
                "key": "application/json"
              },
              {
                "name": "application/xml",
                "displayName": "Unauthorized response",
                "type": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xs:schema xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" elementFormDefault=\"qualified\" attributeFormDefault=\"unqualified\">\n  <xs:element name=\"resource\">\n    <xs:complexType>\n      <xs:sequence>\n        <xs:element name=\"message\" type=\"xs:string\"></xs:element>\n      </xs:sequence>\n      <xs:attribute name=\"error\" type=\"xs:boolean\" use=\"required\"/>\n    </xs:complexType>\n  </xs:element>\n</xs:schema>\n",
                "required": true,
                "examples": [
                  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<resource error=\"true\">\n  <message>Unauthorized</message>\n</resource>\n"
                ],
                "key": "application/xml"
              }
            ],
            "key": "404"
          }
        ],
        "securedBy": [
          "oauth_2_0",
          "oauth_1_0"
        ],
        "method": "get"
      }
    },
    "RequestErrorResponse": {
      "type": "ErrorredResource",
      "securedBy": [
        "oauth_2_0",
        "oauth_1_0"
      ],
      "name": "RequestErrorResponse",
      "get": {
        "responses": [
          {
            "code": "400",
            "body": [
              {
                "name": "ErrorResource",
                "displayName": "ErrorResource",
                "type": "object",
                "required": true,
                "additionalProperties": true,
                "description": "A response that is errored",
                "properties": [
                  {
                    "type": "boolean",
                    "description": "Indicate that the response is errored.",
                    "displayName": "error",
                    "default": true,
                    "name": "error",
                    "required": true,
                    "examples": [
                      "true"
                    ],
                    "key": "error"
                  },
                  {
                    "type": "string",
                    "description": "The error message associated with the error.",
                    "displayName": "message",
                    "name": "message",
                    "required": true,
                    "examples": [
                      "<<example>>"
                    ],
                    "key": "message"
                  }
                ],
                "key": "application/json"
              },
              {
                "name": "application/xml",
                "displayName": "Invalid request",
                "type": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xs:schema xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" elementFormDefault=\"qualified\" attributeFormDefault=\"unqualified\">\n  <xs:element name=\"resource\">\n    <xs:complexType>\n      <xs:sequence>\n        <xs:element name=\"message\" type=\"xs:string\"></xs:element>\n      </xs:sequence>\n      <xs:attribute name=\"error\" type=\"xs:boolean\" use=\"required\"/>\n    </xs:complexType>\n  </xs:element>\n</xs:schema>\n",
                "required": true,
                "examples": [
                  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<resource error=\"true\">\n  <message>Invalid request</message>\n</resource>\n"
                ],
                "key": "application/xml"
              }
            ],
            "description": "The error response when one of the parameters is invalid and can't be parsed. Nothing can be done at the time except correcting the request to send valid data.",
            "key": "400"
          }
        ],
        "securedBy": [
          "oauth_2_0",
          "oauth_1_0"
        ],
        "method": "get"
      }
    }
  },
  "securitySchemes": {
    "oauth_2_0": {
      "name": "oauth_2_0",
      "type": "OAuth 2.0",
      "description": "This API supports OAuth 2.0 for authenticating all API requests.",
      "describedBy": {
        "queryParameters": [
          {
            "name": "access_token",
            "displayName": "access_token",
            "type": "string",
            "required": false,
            "description": "Used to send a valid OAuth 2 access token. Do not use with the \"Authorization\" header.",
            "key": "access_token"
          }
        ],
        "headers": [
          {
            "name": "authorization",
            "displayName": "authorization",
            "type": "string",
            "required": false,
            "description": "Used to send a valid OAuth 2 access token. Do not use with the \"access_token\" query string parameter.",
            "examples": [
              "ya.2453vfDb3cJHisdf.*&H"
            ],
            "key": "authorization"
          }
        ],
        "responses": [
          {
            "code": "401",
            "body": [
              {
                "name": "application/json",
                "displayName": "application/json",
                "type": "object",
                "required": true,
                "key": "application/json"
              }
            ],
            "description": "Bad or expired token. This can happen if the user or Dropbox revoked or expired an access token. To fix, re-authenticate the user."
          },
          {
            "code": "403",
            "body": [
              {
                "name": "application/json",
                "displayName": "application/json",
                "type": "object",
                "required": true,
                "key": "application/json"
              }
            ],
            "description": "Bad OAuth request (wrong consumer key, bad nonce, expired timestamp...). Unfortunately, re-authenticating the user won't help here."
          }
        ]
      },
      "settings": {
        "accessTokenUri": "http://api.domain.com/oauth2/token",
        "authorizationUri": "http://api.domain.com/oauth2/auth",
        "authorizationGrants": [
          "authorization_code"
        ],
        "scopes": [
          "profile",
          "email"
        ]
      }
    },
    "oauth_1_0": {
      "name": "oauth_1_0",
      "type": "OAuth 1.0",
      "description": "OAuth 1.0 continues to be supported for all API requests, but OAuth 2.0 is now preferred.",
      "settings": {
        "requestTokenUri": "http://api.domain.com/oauth1/request_token",
        "authorizationUri": "http://api.domain.com/oauth1/authorize",
        "tokenCredentialsUri": "http://api.domain.com/oauth1/access_token"
      }
    }
  },
  "title": "New API",
  "version": "v1",
  "baseUri": "http://{environment}.api.domain.com/{version}/",
  "baseUriParameters": [
    {
      "name": "environment",
      "displayName": "environment",
      "type": "string",
      "required": true,
      "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
      "pattern": "(development|stage|production)",
      "examples": [
        "production"
      ],
      "key": "environment"
    },
    {
      "name": "version",
      "displayName": "version",
      "type": "string",
      "required": true,
      "enum": [
        "v1"
      ],
      "key": "version"
    }
  ],
  "protocols": [
    "HTTP"
  ],
  "mediaType": [
    "application/json",
    "application/xml"
  ],
  "securedBy": [
    "oauth_2_0",
    "oauth_1_0"
  ],
  "resources": [
    {
      "methods": [
        {
          "queryParameters": [
            {
              "name": "limit",
              "displayName": "limit",
              "type": "number",
              "default": 25,
              "required": true,
              "description": "Limit in the response list",
              "minimum": 1,
              "maximum": 300,
              "examples": [
                "100"
              ],
              "key": "limit"
            },
            {
              "name": "start",
              "displayName": "start",
              "type": "number",
              "default": 0,
              "required": true,
              "description": "The start entry of the list",
              "minimum": 0,
              "examples": [
                "25"
              ],
              "key": "start"
            },
            {
              "name": "nextPageToken",
              "displayName": "nextPageToken",
              "type": "string",
              "required": true,
              "description": "The `nextPageToken` is a web safe encoded cursor to the next entry in the database.\nIt can be obtained by requesting paginated resource and used in next request to get\nnext results page.\n",
              "pattern": "[a-zA-Z0-9]+",
              "examples": [
                "CiAKGjBpNDd2Nmp2Zml2cXRwYjBpOXA"
              ],
              "key": "nextPageToken"
            }
          ],
          "responses": [
            {
              "code": "200",
              "body": [
                {
                  "name": "application/json",
                  "displayName": "application/json",
                  "type": "object",
                  "required": true,
                  "properties": [
                    {
                      "name": "items",
                      "displayName": "items",
                      "type": "array",
                      "required": true,
                      "description": "Contains a list of objects for this method.",
                      "items": {
                        "name": "items",
                        "displayName": "items",
                        "type": "string",
                        "required": true
                      },
                      "key": "items"
                    },
                    {
                      "name": "nextPageToken",
                      "displayName": "nextPageToken",
                      "type": "string",
                      "required": true,
                      "description": "The next page token is a web safe encoded cursor to the next entry in the database.\nUse it in the next request to obtain next page of the results.\n",
                      "examples": [
                        "CiAKGjBpNDd2Nmp2Zml2cXRwYjBpOXA"
                      ],
                      "key": "nextPageToken"
                    }
                  ],
                  "key": "application/json"
                }
              ],
              "description": "Paginated response containing a single page of the result.\nBy default one page of the results contains 25 items. You can extend it by setting a\n`limit` query parameter in your request.\nWhen changing parameters while using the `nextPageToken` the `nextPageToken` will be ignored\nand new query will be performed. Queries with `nextPageToken` should contain the same set\nof parameters as the first request.\n",
              "key": "200"
            },
            {
              "code": "400",
              "body": [
                {
                  "name": "application/json",
                  "displayName": "Invalid",
                  "type": "object",
                  "required": true,
                  "properties": [
                    {
                      "name": "error",
                      "displayName": "error",
                      "type": "boolean",
                      "required": true,
                      "description": "Indicate that the response is errored.",
                      "examples": [
                        "true"
                      ],
                      "key": "error"
                    },
                    {
                      "name": "message",
                      "displayName": "message",
                      "type": "string",
                      "required": true,
                      "description": "The error message associated with the error.",
                      "examples": [
                        "The `limit` parameter is invalid. Please, provide a number between 1 and 300."
                      ],
                      "key": "message"
                    }
                  ],
                  "key": "application/json"
                }
              ],
              "description": "The error response when one of the parameters is invalid and can't be parsed.\nNothing can be done at this time except correcting the request to send valid data.\n",
              "key": "400"
            }
          ],
          "protocols": [
            "HTTP"
          ],
          "is": [
            {
              "Paginated": {
                "resourceType": "AppPerson"
              }
            }
          ],
          "securedBy": [
            "oauth_2_0",
            "oauth_1_0"
          ],
          "description": "Use this method to list all the people.",
          "displayName": "List people",
          "method": "get",
          "allUriParameters": [
            {
              "name": "environment",
              "displayName": "environment",
              "type": "string",
              "required": true,
              "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
              "pattern": "(development|stage|production)",
              "examples": [
                "production"
              ],
              "key": "environment"
            },
            {
              "name": "version",
              "displayName": "version",
              "type": "string",
              "required": true,
              "enum": [
                "v1"
              ],
              "key": "version"
            }
          ],
          "absoluteUri": "http://{environment}.api.domain.com/{version}/people"
        },
        {
          "body": [
            {
              "name": "AppPerson",
              "displayName": "A person resource",
              "type": "object",
              "required": true,
              "additionalProperties": true,
              "description": "An object representing a person in the API.\nThis object will be used in all methods returning a Person or list of people.\n",
              "properties": [
                {
                  "type": "string",
                  "description": "The brief description (tagline) of this person.",
                  "displayName": "tagline",
                  "name": "tagline",
                  "required": true,
                  "key": "tagline"
                },
                {
                  "type": "string",
                  "description": "Person full name. The input will be rejected if this property is not set while creating new object.",
                  "displayName": "name",
                  "name": "name",
                  "required": true,
                  "pattern": "[0-9a-zA-Z ]+",
                  "examples": [
                    "John Smith"
                  ],
                  "key": "name"
                },
                {
                  "type": "string",
                  "description": "The person's date of birth, represented as YYYY-MM-DD.",
                  "displayName": "birthday",
                  "name": "birthday",
                  "required": true,
                  "key": "birthday"
                },
                {
                  "type": "string",
                  "description": "ETag of this resource for caching purposes.\n__This property will be ignored when creating an object.__\n",
                  "displayName": "etag",
                  "name": "etag",
                  "required": true,
                  "key": "etag"
                },
                {
                  "type": "string",
                  "description": "The user's preferred language for rendering.",
                  "displayName": "language",
                  "name": "language",
                  "required": true,
                  "key": "language"
                },
                {
                  "type": "string",
                  "description": "A unique identifier for a person. It is a 32 bit string containing alphanumeric characters.",
                  "displayName": "id",
                  "name": "id",
                  "required": true,
                  "key": "id"
                },
                {
                  "type": "string",
                  "description": "The URL of this person's profile.",
                  "displayName": "url",
                  "name": "url",
                  "required": true,
                  "key": "url"
                },
                {
                  "additionalProperties": true,
                  "type": "object",
                  "description": "An image object representing an image object strored in the file store.\nThe image can be only included in the response. It has no effect if the Image appear in the\nrequest. Endpoint handles image creation on it's own and clients can't process images\nexcept of sending image data.\n",
                  "displayName": "image",
                  "name": "image",
                  "required": true,
                  "properties": [
                    {
                      "type": "string",
                      "description": "The URL of the image.\nTo resize the image and crop it to a square, append the query string **?sz=x**, where x is the dimension in pixels of each side.\n",
                      "displayName": "url",
                      "name": "url",
                      "required": true,
                      "key": "url"
                    },
                    {
                      "type": "string",
                      "description": "An URL to the thumbnail of the image. Thumbnails are 60x60px cropped images of the original image.\n",
                      "displayName": "Thumbnail",
                      "name": "thumb",
                      "required": true,
                      "key": "thumb"
                    }
                  ],
                  "key": "image"
                },
                {
                  "type": "string",
                  "description": "The person's gender. Possible values includes, but are not limited to, the following values:\n* \"male\" - Male gender.\n* \"female\" - Female gender.\n* \"other\" - Other.\n",
                  "displayName": "gender",
                  "name": "gender",
                  "required": false,
                  "key": "gender"
                }
              ],
              "key": "application/json"
            },
            {
              "name": "application/xml",
              "displayName": "application/xml",
              "type": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xs:schema xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" elementFormDefault=\"qualified\" attributeFormDefault=\"unqualified\">\n  <xs:element name=\"resource\">\n    <xs:complexType>\n      <xs:sequence>\n        <xs:element name=\"id\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"name\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"birthday\" type=\"xs:date\"></xs:element>\n        <xs:element name=\"gender\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"url\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"image\">\n          <xs:complexType>\n            <xs:sequence>\n              <xs:element name=\"url\" type=\"xs:string\"></xs:element>\n              <xs:element name=\"thumb\" type=\"xs:string\"></xs:element>\n            </xs:sequence>\n          </xs:complexType>\n        </xs:element>\n        <xs:element name=\"tagline\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"language\" type=\"xs:string\"></xs:element>\n      </xs:sequence>\n      <xs:attribute name=\"error\" type=\"xs:boolean\" use=\"required\"></xs:attribute>\n      <xs:attribute name=\"type\" type=\"xs:string\" use=\"required\"></xs:attribute>\n    </xs:complexType>\n  </xs:element>\n</xs:schema>\n",
              "required": true,
              "examples": [
                "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<resource error=\"false\" type=\"AppPerson\">\n  <id>Qawer63J73HJ6khjswuqyq62382jG21s</id>\n  <name>John Smith</name>\n  <birthday>1990-10-12</birthday>\n  <gender>male</gender>\n  <url>https://www.domain.com/people/Qawer63J73HJ6khjswuqyq62382jG21s</url>\n  <image>\n    <url>https://www.domain.com/people/Qawer63J73HJ6khjswuqyq62382jG21s/image</url>\n    <thumb>https://www.domain.com/people/Qawer63J73HJ6khjswuqyq62382jG21s/image/thumb</thumb>\n  </image>\n  <tagline>Hi, I'm John!</tagline>\n  <language>en_US</language>\n</resource>\n"
              ],
              "key": "application/xml"
            }
          ],
          "protocols": [
            "HTTP"
          ],
          "securedBy": [
            "oauth_2_0",
            "oauth_1_0"
          ],
          "description": "Use this method to add new person",
          "displayName": "Create a person",
          "method": "post",
          "allUriParameters": [
            {
              "name": "environment",
              "displayName": "environment",
              "type": "string",
              "required": true,
              "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
              "pattern": "(development|stage|production)",
              "examples": [
                "production"
              ],
              "key": "environment"
            },
            {
              "name": "version",
              "displayName": "version",
              "type": "string",
              "required": true,
              "enum": [
                "v1"
              ],
              "key": "version"
            }
          ],
          "absoluteUrl": "http://{environment}.api.domain.com/{version}/people"
        }
      ],
      "description": "The people API used to access data about the people.",
      "securedBy": [
        {
          "name": "oauth_2_0",
          "type": "OAuth 2.0",
          "description": "This API supports OAuth 2.0 for authenticating all API requests.",
          "describedBy": {
            "queryParameters": [
              {
                "name": "access_token",
                "displayName": "access_token",
                "type": "string",
                "required": false,
                "description": "Used to send a valid OAuth 2 access token. Do not use with the \"Authorization\" header.",
                "key": "access_token"
              }
            ],
            "headers": [
              {
                "name": "authorization",
                "displayName": "authorization",
                "type": "string",
                "required": false,
                "description": "Used to send a valid OAuth 2 access token. Do not use with the \"access_token\" query string parameter.",
                "examples": [
                  "ya.2453vfDb3cJHisdf.*&H"
                ],
                "key": "authorization"
              }
            ],
            "responses": [
              {
                "code": "401",
                "body": [
                  {
                    "name": "application/json",
                    "displayName": "application/json",
                    "type": "object",
                    "required": true,
                    "key": "application/json"
                  }
                ],
                "description": "Bad or expired token. This can happen if the user or Dropbox revoked or expired an access token. To fix, re-authenticate the user."
              },
              {
                "code": "403",
                "body": [
                  {
                    "name": "application/json",
                    "displayName": "application/json",
                    "type": "object",
                    "required": true,
                    "key": "application/json"
                  }
                ],
                "description": "Bad OAuth request (wrong consumer key, bad nonce, expired timestamp...). Unfortunately, re-authenticating the user won't help here."
              }
            ]
          },
          "settings": {
            "accessTokenUri": "http://api.domain.com/oauth2/token",
            "authorizationUri": "http://api.domain.com/oauth2/auth",
            "authorizationGrants": [
              "authorization_code"
            ],
            "scopes": [
              "profile",
              "email"
            ]
          }
        },
        {
          "name": "oauth_1_0",
          "type": "OAuth 1.0",
          "description": "OAuth 1.0 continues to be supported for all API requests, but OAuth 2.0 is now preferred.",
          "settings": {
            "requestTokenUri": "http://api.domain.com/oauth1/request_token",
            "authorizationUri": "http://api.domain.com/oauth1/authorize",
            "tokenCredentialsUri": "http://api.domain.com/oauth1/access_token"
          }
        }
      ],
      "relativeUri": "/people",
      "displayName": "People",
      "resources": [
        {
          "methods": [
            {
              "headers": [
                {
                  "name": "x-client-id",
                  "displayName": "x-client-id",
                  "type": "string",
                  "required": true,
                  "description": "The application id used to make a request. It can be obtained in the developer console.",
                  "examples": [
                    "123456-acme.client.com"
                  ],
                  "key": "x-client-id"
                }
              ],
              "responses": [
                {
                  "code": "200",
                  "body": [
                    {
                      "name": "AppPerson",
                      "displayName": "A person resource",
                      "type": "object",
                      "required": true,
                      "additionalProperties": true,
                      "description": "An object representing a person in the API.\nThis object will be used in all methods returning a Person or list of people.\n",
                      "properties": [
                        {
                          "type": "string",
                          "description": "The brief description (tagline) of this person.",
                          "displayName": "tagline",
                          "name": "tagline",
                          "required": true,
                          "key": "tagline"
                        },
                        {
                          "type": "string",
                          "description": "Person full name. The input will be rejected if this property is not set while creating new object.",
                          "displayName": "name",
                          "name": "name",
                          "required": true,
                          "pattern": "[0-9a-zA-Z ]+",
                          "examples": [
                            "John Smith"
                          ],
                          "key": "name"
                        },
                        {
                          "type": "string",
                          "description": "The person's date of birth, represented as YYYY-MM-DD.",
                          "displayName": "birthday",
                          "name": "birthday",
                          "required": true,
                          "key": "birthday"
                        },
                        {
                          "type": "string",
                          "description": "ETag of this resource for caching purposes.\n__This property will be ignored when creating an object.__\n",
                          "displayName": "etag",
                          "name": "etag",
                          "required": true,
                          "key": "etag"
                        },
                        {
                          "type": "string",
                          "description": "The user's preferred language for rendering.",
                          "displayName": "language",
                          "name": "language",
                          "required": true,
                          "key": "language"
                        },
                        {
                          "type": "string",
                          "description": "A unique identifier for a person. It is a 32 bit string containing alphanumeric characters.",
                          "displayName": "id",
                          "name": "id",
                          "required": true,
                          "key": "id"
                        },
                        {
                          "type": "string",
                          "description": "The URL of this person's profile.",
                          "displayName": "url",
                          "name": "url",
                          "required": true,
                          "key": "url"
                        },
                        {
                          "additionalProperties": true,
                          "type": "object",
                          "description": "An image object representing an image object strored in the file store.\nThe image can be only included in the response. It has no effect if the Image appear in the\nrequest. Endpoint handles image creation on it's own and clients can't process images\nexcept of sending image data.\n",
                          "displayName": "image",
                          "name": "image",
                          "required": true,
                          "properties": [
                            {
                              "type": "string",
                              "description": "The URL of the image.\nTo resize the image and crop it to a square, append the query string **?sz=x**, where x is the dimension in pixels of each side.\n",
                              "displayName": "url",
                              "name": "url",
                              "required": true,
                              "key": "url"
                            },
                            {
                              "type": "string",
                              "description": "An URL to the thumbnail of the image. Thumbnails are 60x60px cropped images of the original image.\n",
                              "displayName": "Thumbnail",
                              "name": "thumb",
                              "required": true,
                              "key": "thumb"
                            }
                          ],
                          "key": "image"
                        },
                        {
                          "type": "string",
                          "description": "The person's gender. Possible values includes, but are not limited to, the following values:\n* \"male\" - Male gender.\n* \"female\" - Female gender.\n* \"other\" - Other.\n",
                          "displayName": "gender",
                          "name": "gender",
                          "required": false,
                          "key": "gender"
                        }
                      ],
                      "key": "application/json"
                    },
                    {
                      "name": "application/xml",
                      "displayName": "application/xml",
                      "type": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xs:schema xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" elementFormDefault=\"qualified\" attributeFormDefault=\"unqualified\">\n  <xs:element name=\"resource\">\n    <xs:complexType>\n      <xs:sequence>\n        <xs:element name=\"id\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"name\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"birthday\" type=\"xs:date\"></xs:element>\n        <xs:element name=\"gender\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"url\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"image\">\n          <xs:complexType>\n            <xs:sequence>\n              <xs:element name=\"url\" type=\"xs:string\"></xs:element>\n              <xs:element name=\"thumb\" type=\"xs:string\"></xs:element>\n            </xs:sequence>\n          </xs:complexType>\n        </xs:element>\n        <xs:element name=\"tagline\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"language\" type=\"xs:string\"></xs:element>\n      </xs:sequence>\n      <xs:attribute name=\"error\" type=\"xs:boolean\" use=\"required\"></xs:attribute>\n      <xs:attribute name=\"type\" type=\"xs:string\" use=\"required\"></xs:attribute>\n    </xs:complexType>\n  </xs:element>\n</xs:schema>\n",
                      "required": true,
                      "examples": [
                        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<resource error=\"false\" type=\"AppPerson\">\n  <id>Qawer63J73HJ6khjswuqyq62382jG21s</id>\n  <name>John Smith</name>\n  <birthday>1990-10-12</birthday>\n  <gender>male</gender>\n  <url>https://www.domain.com/people/Qawer63J73HJ6khjswuqyq62382jG21s</url>\n  <image>\n    <url>https://www.domain.com/people/Qawer63J73HJ6khjswuqyq62382jG21s/image</url>\n    <thumb>https://www.domain.com/people/Qawer63J73HJ6khjswuqyq62382jG21s/image/thumb</thumb>\n  </image>\n  <tagline>Hi, I'm John!</tagline>\n  <language>en_US</language>\n</resource>\n"
                      ],
                      "key": "application/xml"
                    }
                  ],
                  "key": "200"
                },
                {
                  "code": "404",
                  "body": [
                    {
                      "name": "ErrorResource",
                      "displayName": "ErrorResource",
                      "type": "object",
                      "required": true,
                      "additionalProperties": true,
                      "description": "A response that is errored",
                      "properties": [
                        {
                          "type": "boolean",
                          "description": "Indicate that the response is errored.",
                          "displayName": "error",
                          "default": true,
                          "name": "error",
                          "required": true,
                          "examples": [
                            "true"
                          ],
                          "key": "error"
                        },
                        {
                          "type": "string",
                          "description": "The error message associated with the error.",
                          "displayName": "message",
                          "name": "message",
                          "required": true,
                          "examples": [
                            "<<example>>"
                          ],
                          "key": "message"
                        }
                      ],
                      "key": "application/json"
                    },
                    {
                      "name": "application/xml",
                      "displayName": "Not found response",
                      "type": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xs:schema xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" elementFormDefault=\"qualified\" attributeFormDefault=\"unqualified\">\n  <xs:element name=\"resource\">\n    <xs:complexType>\n      <xs:sequence>\n        <xs:element name=\"message\" type=\"xs:string\"></xs:element>\n      </xs:sequence>\n      <xs:attribute name=\"error\" type=\"xs:boolean\" use=\"required\"/>\n    </xs:complexType>\n  </xs:element>\n</xs:schema>\n",
                      "required": true,
                      "examples": [
                        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<resource error=\"true\">\n  <message>Not found</message>\n</resource>\n"
                      ],
                      "key": "application/xml"
                    }
                  ],
                  "key": "404"
                }
              ],
              "protocols": [
                "HTTP"
              ],
              "securedBy": [
                "oauth_2_0",
                "oauth_1_0"
              ],
              "description": "Returns a person",
              "displayName": "Get a person",
              "method": "get",
              "allUriParameters": [
                {
                  "name": "environment",
                  "displayName": "environment",
                  "type": "string",
                  "required": true,
                  "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
                  "pattern": "(development|stage|production)",
                  "examples": [
                    "production"
                  ],
                  "key": "environment"
                },
                {
                  "name": "version",
                  "displayName": "version",
                  "type": "string",
                  "required": true,
                  "enum": [
                    "v1"
                  ],
                  "key": "version"
                },
                {
                  "name": "personId",
                  "displayName": "personId",
                  "type": "integer",
                  "required": true,
                  "description": "The ID of the person in the system. It is generated by the database numeric value for the person.",
                  "examples": [
                    "1234"
                  ],
                  "key": "personId"
                }
              ],
              "absoluteUrl": "http://{environment}.api.domain.com/{version}/{personId}"
            },
            {
              "responses": [
                {
                  "code": "204",
                  "key": "204"
                }
              ],
              "protocols": [
                "HTTP"
              ],
              "securedBy": [
                "oauth_2_0",
                "oauth_1_0"
              ],
              "description": "Removes the person from the datastore. This method do not returns any data in 200 response.",
              "displayName": "Remove a person",
              "method": "delete",
              "allUriParameters": [
                {
                  "name": "environment",
                  "displayName": "environment",
                  "type": "string",
                  "required": true,
                  "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
                  "pattern": "(development|stage|production)",
                  "examples": [
                    "production"
                  ],
                  "key": "environment"
                },
                {
                  "name": "version",
                  "displayName": "version",
                  "type": "string",
                  "required": true,
                  "enum": [
                    "v1"
                  ],
                  "key": "version"
                },
                {
                  "name": "personId",
                  "displayName": "personId",
                  "type": "integer",
                  "required": true,
                  "description": "The ID of the person in the system. It is generated by the database numeric value for the person.",
                  "examples": [
                    "1234"
                  ],
                  "key": "personId"
                }
              ],
              "absoluteUrl": "http://{environment}.api.domain.com/{version}/{personId}"
            },
            {
              "responses": [
                {
                  "code": "200",
                  "key": "200"
                }
              ],
              "body": [
                {
                  "name": "AppPerson",
                  "displayName": "A person resource",
                  "type": "object",
                  "required": true,
                  "additionalProperties": true,
                  "description": "An object representing a person in the API.\nThis object will be used in all methods returning a Person or list of people.\n",
                  "properties": [
                    {
                      "type": "string",
                      "description": "The brief description (tagline) of this person.",
                      "displayName": "tagline",
                      "name": "tagline",
                      "required": true,
                      "key": "tagline"
                    },
                    {
                      "type": "string",
                      "description": "Person full name. The input will be rejected if this property is not set while creating new object.",
                      "displayName": "name",
                      "name": "name",
                      "required": true,
                      "pattern": "[0-9a-zA-Z ]+",
                      "examples": [
                        "John Smith"
                      ],
                      "key": "name"
                    },
                    {
                      "type": "string",
                      "description": "The person's date of birth, represented as YYYY-MM-DD.",
                      "displayName": "birthday",
                      "name": "birthday",
                      "required": true,
                      "key": "birthday"
                    },
                    {
                      "type": "string",
                      "description": "ETag of this resource for caching purposes.\n__This property will be ignored when creating an object.__\n",
                      "displayName": "etag",
                      "name": "etag",
                      "required": true,
                      "key": "etag"
                    },
                    {
                      "type": "string",
                      "description": "The user's preferred language for rendering.",
                      "displayName": "language",
                      "name": "language",
                      "required": true,
                      "key": "language"
                    },
                    {
                      "type": "string",
                      "description": "A unique identifier for a person. It is a 32 bit string containing alphanumeric characters.",
                      "displayName": "id",
                      "name": "id",
                      "required": true,
                      "key": "id"
                    },
                    {
                      "type": "string",
                      "description": "The URL of this person's profile.",
                      "displayName": "url",
                      "name": "url",
                      "required": true,
                      "key": "url"
                    },
                    {
                      "additionalProperties": true,
                      "type": "object",
                      "description": "An image object representing an image object strored in the file store.\nThe image can be only included in the response. It has no effect if the Image appear in the\nrequest. Endpoint handles image creation on it's own and clients can't process images\nexcept of sending image data.\n",
                      "displayName": "image",
                      "name": "image",
                      "required": true,
                      "properties": [
                        {
                          "type": "string",
                          "description": "The URL of the image.\nTo resize the image and crop it to a square, append the query string **?sz=x**, where x is the dimension in pixels of each side.\n",
                          "displayName": "url",
                          "name": "url",
                          "required": true,
                          "key": "url"
                        },
                        {
                          "type": "string",
                          "description": "An URL to the thumbnail of the image. Thumbnails are 60x60px cropped images of the original image.\n",
                          "displayName": "Thumbnail",
                          "name": "thumb",
                          "required": true,
                          "key": "thumb"
                        }
                      ],
                      "key": "image"
                    },
                    {
                      "type": "string",
                      "description": "The person's gender. Possible values includes, but are not limited to, the following values:\n* \"male\" - Male gender.\n* \"female\" - Female gender.\n* \"other\" - Other.\n",
                      "displayName": "gender",
                      "name": "gender",
                      "required": false,
                      "key": "gender"
                    }
                  ],
                  "key": "application/json"
                },
                {
                  "name": "application/xml",
                  "displayName": "application/xml",
                  "type": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xs:schema xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" elementFormDefault=\"qualified\" attributeFormDefault=\"unqualified\">\n  <xs:element name=\"resource\">\n    <xs:complexType>\n      <xs:sequence>\n        <xs:element name=\"id\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"name\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"birthday\" type=\"xs:date\"></xs:element>\n        <xs:element name=\"gender\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"url\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"image\">\n          <xs:complexType>\n            <xs:sequence>\n              <xs:element name=\"url\" type=\"xs:string\"></xs:element>\n              <xs:element name=\"thumb\" type=\"xs:string\"></xs:element>\n            </xs:sequence>\n          </xs:complexType>\n        </xs:element>\n        <xs:element name=\"tagline\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"language\" type=\"xs:string\"></xs:element>\n      </xs:sequence>\n      <xs:attribute name=\"error\" type=\"xs:boolean\" use=\"required\"></xs:attribute>\n      <xs:attribute name=\"type\" type=\"xs:string\" use=\"required\"></xs:attribute>\n    </xs:complexType>\n  </xs:element>\n</xs:schema>\n",
                  "required": true,
                  "examples": [
                    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<resource error=\"false\" type=\"AppPerson\">\n  <id>Qawer63J73HJ6khjswuqyq62382jG21s</id>\n  <name>John Smith</name>\n  <birthday>1990-10-12</birthday>\n  <gender>male</gender>\n  <url>https://www.domain.com/people/Qawer63J73HJ6khjswuqyq62382jG21s</url>\n  <image>\n    <url>https://www.domain.com/people/Qawer63J73HJ6khjswuqyq62382jG21s/image</url>\n    <thumb>https://www.domain.com/people/Qawer63J73HJ6khjswuqyq62382jG21s/image/thumb</thumb>\n  </image>\n  <tagline>Hi, I'm John!</tagline>\n  <language>en_US</language>\n</resource>\n"
                  ],
                  "key": "application/xml"
                }
              ],
              "protocols": [
                "HTTP"
              ],
              "securedBy": [
                "oauth_2_0",
                "oauth_1_0"
              ],
              "description": "Updates the person in the datastore.",
              "displayName": "Update a person",
              "method": "put",
              "allUriParameters": [
                {
                  "name": "environment",
                  "displayName": "environment",
                  "type": "string",
                  "required": true,
                  "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
                  "pattern": "(development|stage|production)",
                  "examples": [
                    "production"
                  ],
                  "key": "environment"
                },
                {
                  "name": "version",
                  "displayName": "version",
                  "type": "string",
                  "required": true,
                  "enum": [
                    "v1"
                  ],
                  "key": "version"
                },
                {
                  "name": "personId",
                  "displayName": "personId",
                  "type": "integer",
                  "required": true,
                  "description": "The ID of the person in the system. It is generated by the database numeric value for the person.",
                  "examples": [
                    "1234"
                  ],
                  "key": "personId"
                }
              ],
              "absoluteUrl": "http://{environment}.api.domain.com/{version}/{personId}"
            }
          ],
          "type": "ResourceNotFound",
          "description": "The endpoint to access information about the person",
          "securedBy": [
            "oauth_2_0",
            "oauth_1_0"
          ],
          "uriParameters": [
            {
              "name": "personId",
              "displayName": "personId",
              "type": "integer",
              "required": true,
              "description": "The ID of the person in the system. It is generated by the database numeric value for the person.",
              "examples": [
                "1234"
              ],
              "key": "personId"
            }
          ],
          "relativeUri": "/{personId}",
          "displayName": "A person",
          "relativeUriPathSegments": [
            "{personId}"
          ],
          "absoluteUri": "http://{environment}.api.domain.com/{version}/people/{personId}",
          "parentUrl": "/people",
          "uniqueId": "people__personid_",
          "absoluteUrl": "http://{environment}.api.domain.com/{version}/{personId}",
          "allUriParameters": [
            {
              "name": "environment",
              "displayName": "environment",
              "type": "string",
              "required": true,
              "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
              "pattern": "(development|stage|production)",
              "examples": [
                "production"
              ],
              "key": "environment"
            },
            {
              "name": "version",
              "displayName": "version",
              "type": "string",
              "required": true,
              "enum": [
                "v1"
              ],
              "key": "version"
            },
            {
              "name": "personId",
              "displayName": "personId",
              "type": "integer",
              "required": true,
              "description": "The ID of the person in the system. It is generated by the database numeric value for the person.",
              "examples": [
                "1234"
              ],
              "key": "personId"
            }
          ]
        }
      ],
      "relativeUriPathSegments": [
        "people"
      ],
      "absoluteUri": "http://{environment}.api.domain.com/{version}/people",
      "parentUrl": "",
      "uniqueId": "people",
      "absoluteUrl": "http://{environment}.api.domain.com/{version}/people",
      "allUriParameters": [
        {
          "name": "environment",
          "displayName": "environment",
          "type": "string",
          "required": true,
          "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
          "pattern": "(development|stage|production)",
          "examples": [
            "production"
          ],
          "key": "environment"
        },
        {
          "name": "version",
          "displayName": "version",
          "type": "string",
          "required": true,
          "enum": [
            "v1"
          ],
          "key": "version"
        }
      ],
      "queryParameters": [
        {
          "name": "access_token",
          "displayName": "access_token",
          "type": "string",
          "required": false,
          "description": "Used to send a valid OAuth 2 access token. Do not use with the \"Authorization\" header.",
          "key": "access_token"
        }
      ],
      "headers": [
        {
          "name": "authorization",
          "displayName": "authorization",
          "type": "string",
          "required": false,
          "description": "Used to send a valid OAuth 2 access token. Do not use with the \"access_token\" query string parameter.",
          "examples": [
            "ya.2453vfDb3cJHisdf.*&H"
          ],
          "key": "authorization"
        }
      ],
      "responses": [
        {
          "code": "401",
          "body": [
            {
              "name": "application/json",
              "displayName": "application/json",
              "type": "object",
              "required": true,
              "key": "application/json"
            }
          ],
          "description": "Bad or expired token. This can happen if the user or Dropbox revoked or expired an access token. To fix, re-authenticate the user."
        },
        {
          "code": "403",
          "body": [
            {
              "name": "application/json",
              "displayName": "application/json",
              "type": "object",
              "required": true,
              "key": "application/json"
            }
          ],
          "description": "Bad OAuth request (wrong consumer key, bad nonce, expired timestamp...). Unfortunately, re-authenticating the user won't help here."
        }
      ]
    },
    {
      "methods": [
        {
          "queryParameters": [
            {
              "name": "limit",
              "displayName": "limit",
              "type": "number",
              "default": 25,
              "required": true,
              "description": "Limit in the response list",
              "minimum": 1,
              "maximum": 300,
              "examples": [
                "100"
              ],
              "key": "limit"
            },
            {
              "name": "start",
              "displayName": "start",
              "type": "number",
              "default": 0,
              "required": true,
              "description": "The start entry of the list",
              "minimum": 0,
              "examples": [
                "25"
              ],
              "key": "start"
            },
            {
              "name": "nextPageToken",
              "displayName": "nextPageToken",
              "type": "string",
              "required": true,
              "description": "The `nextPageToken` is a web safe encoded cursor to the next entry in the database.\nIt can be obtained by requesting paginated resource and used in next request to get\nnext results page.\n",
              "pattern": "[a-zA-Z0-9]+",
              "examples": [
                "CiAKGjBpNDd2Nmp2Zml2cXRwYjBpOXA"
              ],
              "key": "nextPageToken"
            }
          ],
          "responses": [
            {
              "code": "200",
              "body": [
                {
                  "name": "application/json",
                  "displayName": "application/json",
                  "type": "object",
                  "required": true,
                  "properties": [
                    {
                      "name": "items",
                      "displayName": "items",
                      "type": "array",
                      "required": true,
                      "description": "Contains a list of objects for this method.",
                      "items": {
                        "name": "items",
                        "displayName": "items",
                        "type": "string",
                        "required": true
                      },
                      "key": "items"
                    },
                    {
                      "name": "nextPageToken",
                      "displayName": "nextPageToken",
                      "type": "string",
                      "required": true,
                      "description": "The next page token is a web safe encoded cursor to the next entry in the database.\nUse it in the next request to obtain next page of the results.\n",
                      "examples": [
                        "CiAKGjBpNDd2Nmp2Zml2cXRwYjBpOXA"
                      ],
                      "key": "nextPageToken"
                    }
                  ],
                  "key": "application/json"
                }
              ],
              "description": "Paginated response containing a single page of the result.\nBy default one page of the results contains 25 items. You can extend it by setting a\n`limit` query parameter in your request.\nWhen changing parameters while using the `nextPageToken` the `nextPageToken` will be ignored\nand new query will be performed. Queries with `nextPageToken` should contain the same set\nof parameters as the first request.\n",
              "key": "200"
            },
            {
              "code": "400",
              "body": [
                {
                  "name": "application/json",
                  "displayName": "Invalid",
                  "type": "object",
                  "required": true,
                  "properties": [
                    {
                      "name": "error",
                      "displayName": "error",
                      "type": "boolean",
                      "required": true,
                      "description": "Indicate that the response is errored.",
                      "examples": [
                        "true"
                      ],
                      "key": "error"
                    },
                    {
                      "name": "message",
                      "displayName": "message",
                      "type": "string",
                      "required": true,
                      "description": "The error message associated with the error.",
                      "examples": [
                        "The `limit` parameter is invalid. Please, provide a number between 1 and 300."
                      ],
                      "key": "message"
                    }
                  ],
                  "key": "application/json"
                }
              ],
              "description": "The error response when one of the parameters is invalid and can't be parsed.\nNothing can be done at this time except correcting the request to send valid data.\n",
              "key": "400"
            }
          ],
          "protocols": [
            "HTTP"
          ],
          "is": [
            {
              "Paginated": {
                "resourceType": "Product"
              }
            }
          ],
          "securedBy": [
            "oauth_2_0",
            "oauth_1_0"
          ],
          "description": "Returns a list of products.",
          "displayName": "List products",
          "method": "get",
          "allUriParameters": [
            {
              "name": "environment",
              "displayName": "environment",
              "type": "string",
              "required": true,
              "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
              "pattern": "(development|stage|production)",
              "examples": [
                "production"
              ],
              "key": "environment"
            },
            {
              "name": "version",
              "displayName": "version",
              "type": "string",
              "required": true,
              "enum": [
                "v1"
              ],
              "key": "version"
            }
          ],
          "absoluteUrl": "http://{environment}.api.domain.com/{version}/products"
        },
        {
          "responses": [
            {
              "code": "200",
              "body": [
                {
                  "name": "Product",
                  "displayName": "A product resource",
                  "type": "object",
                  "examples": [
                    "{\n  \"id\": \"d697f5cea85011e680f576304dec7eb7\",\n  \"name\": \"Super product\",\n  \"quantity\": 125,\n  \"unit\": \"ml\",\n  \"upc\": \"123456789101\",\n  \"available\": true,\n  \"etag\": \"W/\\\"686897696a7c876b7e\\\"\"\n}",
                    "{\n  \"id\": \"123e4567e89b12d3a456426655440000\",\n  \"name\": \"Acme Product\",\n  \"quantity\": 1,\n  \"unit\": \"kg\",\n  \"upc\": \"223456789101\",\n  \"available\": true,\n  \"etag\": \"W/\\\"123456789\\\"\"\n}"
                  ],
                  "required": true,
                  "additionalProperties": true,
                  "description": "A single product representing an item in the store.",
                  "properties": [
                    {
                      "type": "string",
                      "description": "ETag of this resource for caching purposes.\n__This property will be ignored when creating an object.__\n",
                      "displayName": "etag",
                      "name": "etag",
                      "required": true,
                      "key": "etag"
                    },
                    {
                      "type": "string",
                      "description": "Product id. It is a UUID of the database record.\n__This property will be ignored when creating an object.__\nIt will be available when the product is stored in the datastore.\n",
                      "displayName": "id",
                      "name": "id",
                      "required": true,
                      "pattern": "[0-9a-zA-Z]+",
                      "key": "id"
                    },
                    {
                      "type": "string",
                      "description": "Product name",
                      "displayName": "name",
                      "name": "name",
                      "required": true,
                      "examples": [
                        "Acme product - mentol flavor, 500 ml."
                      ],
                      "key": "name"
                    },
                    {
                      "type": "number",
                      "description": "The quantity of the product in the one unit of measurement.\nSee `unit` property for more information.\n",
                      "displayName": "quantity",
                      "name": "quantity",
                      "required": true,
                      "examples": [
                        "500"
                      ],
                      "key": "quantity"
                    },
                    {
                      "type": "string",
                      "description": "The unit of measuremet for the quantity property.",
                      "displayName": "unit",
                      "name": "unit",
                      "required": true,
                      "examples": [
                        "ml"
                      ],
                      "key": "unit"
                    },
                    {
                      "type": "string",
                      "description": "The Universal Produc Code. It consists of 12 numerical digits. However, because of the\ninteger precision limitation in JavaScript it is represented as a string.\n",
                      "displayName": "upc",
                      "name": "upc",
                      "required": true,
                      "pattern": "[0-9]{12,12}",
                      "examples": [
                        "042100005264"
                      ],
                      "key": "upc"
                    },
                    {
                      "type": "boolean",
                      "description": "Product current availability in the store.\nProduct may be not available but the users still can order it with later delivery date.\n",
                      "displayName": "available",
                      "name": "available",
                      "required": true,
                      "examples": [
                        "true"
                      ],
                      "key": "available"
                    }
                  ],
                  "key": "application/json"
                },
                {
                  "name": "application/xml",
                  "displayName": "application/xml",
                  "type": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xs:schema xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" elementFormDefault=\"qualified\" attributeFormDefault=\"unqualified\">\n  <xs:element name=\"resource\">\n    <xs:complexType>\n      <xs:sequence>\n        <xs:element name=\"id\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"name\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"quantity\" type=\"xs:double\"></xs:element>\n        <xs:element name=\"unit\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"upc\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"available\" type=\"xs:string\"></xs:element>\n      </xs:sequence>\n      <xs:attribute name=\"error\" type=\"xs:string\"></xs:attribute>\n      <xs:attribute name=\"type\" type=\"xs:string\"></xs:attribute>\n    </xs:complexType>\n  </xs:element>\n</xs:schema>\n",
                  "required": true,
                  "examples": [
                    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<resource error=\"false\" type=\"Product\">\n  <id>f2f7933a-a9ce-11e6-80f5-76304dec7eb7</id>\n  <name>Acme product - mentol flavor, 500 ml.</name>\n  <quantity>500</quantity>\n  <unit>ml</unit>\n  <upc>042100005264</upc>\n  <available>true</available>\n</resource>\n"
                  ],
                  "key": "application/xml"
                }
              ],
              "key": "200"
            },
            {
              "code": "400",
              "description": "The request has been rejected. Probably the product already exists in the datastore.",
              "key": "400"
            }
          ],
          "body": [
            {
              "name": "Product",
              "displayName": "A product resource",
              "type": "object",
              "required": true,
              "additionalProperties": true,
              "description": "A single product representing an item in the store.",
              "properties": [
                {
                  "type": "string",
                  "description": "ETag of this resource for caching purposes.\n__This property will be ignored when creating an object.__\n",
                  "displayName": "etag",
                  "name": "etag",
                  "required": true,
                  "key": "etag"
                },
                {
                  "type": "string",
                  "description": "Product id. It is a UUID of the database record.\n__This property will be ignored when creating an object.__\nIt will be available when the product is stored in the datastore.\n",
                  "displayName": "id",
                  "name": "id",
                  "required": true,
                  "pattern": "[0-9a-zA-Z]+",
                  "key": "id"
                },
                {
                  "type": "string",
                  "description": "Product name",
                  "displayName": "name",
                  "name": "name",
                  "required": true,
                  "examples": [
                    "Acme product - mentol flavor, 500 ml."
                  ],
                  "key": "name"
                },
                {
                  "type": "number",
                  "description": "The quantity of the product in the one unit of measurement.\nSee `unit` property for more information.\n",
                  "displayName": "quantity",
                  "name": "quantity",
                  "required": true,
                  "examples": [
                    "500"
                  ],
                  "key": "quantity"
                },
                {
                  "type": "string",
                  "description": "The unit of measuremet for the quantity property.",
                  "displayName": "unit",
                  "name": "unit",
                  "required": true,
                  "examples": [
                    "ml"
                  ],
                  "key": "unit"
                },
                {
                  "type": "string",
                  "description": "The Universal Produc Code. It consists of 12 numerical digits. However, because of the\ninteger precision limitation in JavaScript it is represented as a string.\n",
                  "displayName": "upc",
                  "name": "upc",
                  "required": true,
                  "pattern": "[0-9]{12,12}",
                  "examples": [
                    "042100005264"
                  ],
                  "key": "upc"
                },
                {
                  "type": "boolean",
                  "description": "Product current availability in the store.\nProduct may be not available but the users still can order it with later delivery date.\n",
                  "displayName": "available",
                  "name": "available",
                  "required": true,
                  "examples": [
                    "true"
                  ],
                  "key": "available"
                }
              ],
              "key": "application/json"
            }
          ],
          "protocols": [
            "HTTP"
          ],
          "securedBy": [
            "oauth_2_0",
            "oauth_1_0"
          ],
          "description": "Creates a product in the store.\nWhile creating a product the `id` and `etag` properties will be ignored.\n\nThe endpoint will reject the request if exactly the same product is already defined in the\ndatastore (all properties of both objects equals). Newly created product is available\nfor listing but **it won't be available for ordering API** until it's availability is not set.\n",
          "displayName": "Create product",
          "method": "post",
          "allUriParameters": [
            {
              "name": "environment",
              "displayName": "environment",
              "type": "string",
              "required": true,
              "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
              "pattern": "(development|stage|production)",
              "examples": [
                "production"
              ],
              "key": "environment"
            },
            {
              "name": "version",
              "displayName": "version",
              "type": "string",
              "required": true,
              "enum": [
                "v1"
              ],
              "key": "version"
            }
          ],
          "absoluteUrl": "http://{environment}.api.domain.com/{version}/products"
        }
      ],
      "description": "The API is to be used to access data about the products.",
      "securedBy": [
        "oauth_2_0",
        "oauth_1_0"
      ],
      "relativeUri": "/products",
      "displayName": "Products",
      "resources": [
        {
          "methods": [
            {
              "responses": [
                {
                  "code": "200",
                  "body": [
                    {
                      "name": "Product",
                      "displayName": "A product resource",
                      "type": "object",
                      "required": true,
                      "additionalProperties": true,
                      "description": "A single product representing an item in the store.",
                      "properties": [
                        {
                          "type": "string",
                          "description": "ETag of this resource for caching purposes.\n__This property will be ignored when creating an object.__\n",
                          "displayName": "etag",
                          "name": "etag",
                          "required": true,
                          "key": "etag"
                        },
                        {
                          "type": "string",
                          "description": "Product id. It is a UUID of the database record.\n__This property will be ignored when creating an object.__\nIt will be available when the product is stored in the datastore.\n",
                          "displayName": "id",
                          "name": "id",
                          "required": true,
                          "pattern": "[0-9a-zA-Z]+",
                          "key": "id"
                        },
                        {
                          "type": "string",
                          "description": "Product name",
                          "displayName": "name",
                          "name": "name",
                          "required": true,
                          "examples": [
                            "Acme product - mentol flavor, 500 ml."
                          ],
                          "key": "name"
                        },
                        {
                          "type": "number",
                          "description": "The quantity of the product in the one unit of measurement.\nSee `unit` property for more information.\n",
                          "displayName": "quantity",
                          "name": "quantity",
                          "required": true,
                          "examples": [
                            "500"
                          ],
                          "key": "quantity"
                        },
                        {
                          "type": "string",
                          "description": "The unit of measuremet for the quantity property.",
                          "displayName": "unit",
                          "name": "unit",
                          "required": true,
                          "examples": [
                            "ml"
                          ],
                          "key": "unit"
                        },
                        {
                          "type": "string",
                          "description": "The Universal Produc Code. It consists of 12 numerical digits. However, because of the\ninteger precision limitation in JavaScript it is represented as a string.\n",
                          "displayName": "upc",
                          "name": "upc",
                          "required": true,
                          "pattern": "[0-9]{12,12}",
                          "examples": [
                            "042100005264"
                          ],
                          "key": "upc"
                        },
                        {
                          "type": "boolean",
                          "description": "Product current availability in the store.\nProduct may be not available but the users still can order it with later delivery date.\n",
                          "displayName": "available",
                          "name": "available",
                          "required": true,
                          "examples": [
                            "true"
                          ],
                          "key": "available"
                        }
                      ],
                      "examples": [
                        "{\n  \"id\": \"d697f5cea85011e680f576304dec7eb7\",\n  \"name\": \"Super product\",\n  \"quantity\": 125,\n  \"unit\": \"ml\",\n  \"upc\": \"123456789101\",\n  \"available\": true,\n  \"etag\": \"W/\\\"686897696a7c876b7e\\\"\"\n}"
                      ],
                      "key": "application/json"
                    },
                    {
                      "name": "application/xml",
                      "displayName": "application/xml",
                      "type": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xs:schema xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" elementFormDefault=\"qualified\" attributeFormDefault=\"unqualified\">\n  <xs:element name=\"resource\">\n    <xs:complexType>\n      <xs:sequence>\n        <xs:element name=\"id\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"name\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"quantity\" type=\"xs:double\"></xs:element>\n        <xs:element name=\"unit\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"upc\" type=\"xs:string\"></xs:element>\n        <xs:element name=\"available\" type=\"xs:string\"></xs:element>\n      </xs:sequence>\n      <xs:attribute name=\"error\" type=\"xs:string\"></xs:attribute>\n      <xs:attribute name=\"type\" type=\"xs:string\"></xs:attribute>\n    </xs:complexType>\n  </xs:element>\n</xs:schema>\n",
                      "required": true,
                      "examples": [
                        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<resource error=\"false\" type=\"Product\">\n  <id>f2f7933a-a9ce-11e6-80f5-76304dec7eb7</id>\n  <name>Acme product - mentol flavor, 500 ml.</name>\n  <quantity>500</quantity>\n  <unit>ml</unit>\n  <upc>042100005264</upc>\n  <available>true</available>\n</resource>\n"
                      ],
                      "key": "application/xml"
                    }
                  ],
                  "key": "200"
                },
                {
                  "code": "404",
                  "body": [
                    {
                      "name": "ErrorResource",
                      "displayName": "ErrorResource",
                      "type": "object",
                      "required": true,
                      "additionalProperties": true,
                      "description": "A response that is errored",
                      "properties": [
                        {
                          "type": "boolean",
                          "description": "Indicate that the response is errored.",
                          "displayName": "error",
                          "default": true,
                          "name": "error",
                          "required": true,
                          "examples": [
                            "true"
                          ],
                          "key": "error"
                        },
                        {
                          "type": "string",
                          "description": "The error message associated with the error.",
                          "displayName": "message",
                          "name": "message",
                          "required": true,
                          "examples": [
                            "<<example>>"
                          ],
                          "key": "message"
                        }
                      ],
                      "key": "application/json"
                    },
                    {
                      "name": "application/xml",
                      "displayName": "Not found response",
                      "type": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<xs:schema xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" elementFormDefault=\"qualified\" attributeFormDefault=\"unqualified\">\n  <xs:element name=\"resource\">\n    <xs:complexType>\n      <xs:sequence>\n        <xs:element name=\"message\" type=\"xs:string\"></xs:element>\n      </xs:sequence>\n      <xs:attribute name=\"error\" type=\"xs:boolean\" use=\"required\"/>\n    </xs:complexType>\n  </xs:element>\n</xs:schema>\n",
                      "required": true,
                      "examples": [
                        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<resource error=\"true\">\n  <message>Not found</message>\n</resource>\n"
                      ],
                      "key": "application/xml"
                    }
                  ],
                  "key": "404"
                }
              ],
              "protocols": [
                "HTTP"
              ],
              "securedBy": [
                "oauth_2_0",
                "oauth_1_0"
              ],
              "method": "get",
              "allUriParameters": [
                {
                  "name": "environment",
                  "displayName": "environment",
                  "type": "string",
                  "required": true,
                  "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
                  "pattern": "(development|stage|production)",
                  "examples": [
                    "production"
                  ],
                  "key": "environment"
                },
                {
                  "name": "version",
                  "displayName": "version",
                  "type": "string",
                  "required": true,
                  "enum": [
                    "v1"
                  ],
                  "key": "version"
                },
                {
                  "name": "productId",
                  "displayName": "productId",
                  "type": "string",
                  "required": true,
                  "key": "productId"
                }
              ],
              "absoluteUrl": "http://{environment}.api.domain.com/{version}/{productId}"
            }
          ],
          "type": "ResourceNotFound",
          "securedBy": [
            "oauth_2_0",
            "oauth_1_0"
          ],
          "uriParameters": [
            {
              "name": "productId",
              "displayName": "productId",
              "type": "string",
              "required": true,
              "key": "productId"
            }
          ],
          "relativeUri": "/{productId}",
          "displayName": "/{productId}",
          "relativeUriPathSegments": [
            "{productId}"
          ],
          "absoluteUri": "http://{environment}.api.domain.com/{version}/products/{productId}",
          "parentUrl": "/products",
          "uniqueId": "products__productid_",
          "absoluteUrl": "http://{environment}.api.domain.com/{version}/{productId}",
          "allUriParameters": [
            {
              "name": "environment",
              "displayName": "environment",
              "type": "string",
              "required": true,
              "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
              "pattern": "(development|stage|production)",
              "examples": [
                "production"
              ],
              "key": "environment"
            },
            {
              "name": "version",
              "displayName": "version",
              "type": "string",
              "required": true,
              "enum": [
                "v1"
              ],
              "key": "version"
            },
            {
              "name": "productId",
              "displayName": "productId",
              "type": "string",
              "required": true,
              "key": "productId"
            }
          ]
        }
      ],
      "relativeUriPathSegments": [
        "products"
      ],
      "absoluteUri": "http://{environment}.api.domain.com/{version}/products",
      "parentUrl": "",
      "uniqueId": "products",
      "absoluteUrl": "http://{environment}.api.domain.com/{version}/products",
      "allUriParameters": [
        {
          "name": "environment",
          "displayName": "environment",
          "type": "string",
          "required": true,
          "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
          "pattern": "(development|stage|production)",
          "examples": [
            "production"
          ],
          "key": "environment"
        },
        {
          "name": "version",
          "displayName": "version",
          "type": "string",
          "required": true,
          "enum": [
            "v1"
          ],
          "key": "version"
        }
      ]
    },
    {
      "securedBy": [
        "oauth_2_0"
      ],
      "relativeUri": "/orgs",
      "displayName": "/orgs",
      "resources": [
        {
          "methods": [
            {
              "responses": [
                {
                  "code": "200",
                  "body": [
                    {
                      "name": "Org",
                      "displayName": "Org",
                      "type": "union",
                      "required": true,
                      "properties": [
                        {
                          "name": "id",
                          "displayName": "id",
                          "type": "string",
                          "required": true,
                          "description": "UUID generated ID",
                          "key": "id"
                        }
                      ],
                      "additionalProperties": true,
                      "description": "Represents an organization unit.",
                      "anyOf": [
                        {
                          "additionalProperties": true,
                          "type": "object",
                          "description": "Represents an organization unit.",
                          "displayName": "Org",
                          "name": "Org",
                          "required": true,
                          "properties": [
                            {
                              "additionalProperties": true,
                              "type": "object",
                              "displayName": "Manager",
                              "name": "Manager",
                              "required": true,
                              "discriminator": "kind",
                              "properties": [
                                {
                                  "type": "string",
                                  "displayName": "firstname",
                                  "name": "firstname",
                                  "required": true,
                                  "key": "firstname"
                                },
                                {
                                  "type": "string",
                                  "displayName": "lastname",
                                  "name": "lastname",
                                  "required": true,
                                  "key": "lastname"
                                },
                                {
                                  "type": "string",
                                  "displayName": "title",
                                  "name": "title",
                                  "required": false,
                                  "key": "title"
                                },
                                {
                                  "type": "string",
                                  "displayName": "kind",
                                  "name": "kind",
                                  "required": true,
                                  "key": "kind"
                                },
                                {
                                  "type": "array",
                                  "displayName": "reports",
                                  "name": "reports",
                                  "required": true,
                                  "items": {
                                    "type": "object",
                                    "properties": [
                                      {
                                        "type": "string",
                                        "displayName": "firstname",
                                        "name": "firstname",
                                        "required": true,
                                        "key": "firstname"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "lastname",
                                        "name": "lastname",
                                        "required": true,
                                        "key": "lastname"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "title",
                                        "name": "title",
                                        "required": false,
                                        "key": "title"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "kind",
                                        "name": "kind",
                                        "required": true,
                                        "key": "kind"
                                      }
                                    ],
                                    "additionalProperties": true,
                                    "displayName": "Person",
                                    "name": "Person",
                                    "required": true,
                                    "discriminator": "kind"
                                  },
                                  "key": "reports"
                                },
                                {
                                  "type": "string",
                                  "displayName": "phone",
                                  "name": "phone",
                                  "required": true,
                                  "pattern": "^[0-9|-]+$",
                                  "key": "phone"
                                }
                              ],
                              "key": "onCall"
                            },
                            {
                              "additionalProperties": true,
                              "type": "object",
                              "displayName": "Head",
                              "name": "Head",
                              "required": true,
                              "discriminator": "kind",
                              "properties": [
                                {
                                  "type": "string",
                                  "displayName": "firstname",
                                  "name": "firstname",
                                  "required": true,
                                  "key": "firstname"
                                },
                                {
                                  "type": "string",
                                  "displayName": "lastname",
                                  "name": "lastname",
                                  "required": true,
                                  "key": "lastname"
                                },
                                {
                                  "type": "string",
                                  "displayName": "title",
                                  "name": "title",
                                  "required": false,
                                  "key": "title"
                                },
                                {
                                  "type": "string",
                                  "displayName": "kind",
                                  "name": "kind",
                                  "required": true,
                                  "key": "kind"
                                },
                                {
                                  "type": "array",
                                  "displayName": "reports",
                                  "name": "reports",
                                  "required": true,
                                  "items": {
                                    "type": "object",
                                    "properties": [
                                      {
                                        "type": "string",
                                        "displayName": "firstname",
                                        "name": "firstname",
                                        "required": true,
                                        "key": "firstname"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "lastname",
                                        "name": "lastname",
                                        "required": true,
                                        "key": "lastname"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "title",
                                        "name": "title",
                                        "required": false,
                                        "key": "title"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "kind",
                                        "name": "kind",
                                        "required": true,
                                        "key": "kind"
                                      }
                                    ],
                                    "additionalProperties": true,
                                    "displayName": "Person",
                                    "name": "Person",
                                    "required": true,
                                    "discriminator": "kind"
                                  },
                                  "key": "reports"
                                },
                                {
                                  "type": "string",
                                  "displayName": "phone",
                                  "name": "phone",
                                  "required": true,
                                  "pattern": "^[0-9|-]+$",
                                  "key": "phone"
                                }
                              ],
                              "key": "Head"
                            }
                          ]
                        },
                        {
                          "additionalProperties": true,
                          "type": "object",
                          "description": "Represents an organization unit.",
                          "displayName": "Org",
                          "name": "Org",
                          "required": true,
                          "properties": [
                            {
                              "additionalProperties": true,
                              "type": "object",
                              "displayName": "AlertableAdmin",
                              "name": "AlertableAdmin",
                              "required": true,
                              "discriminator": "kind",
                              "properties": [
                                {
                                  "type": "string",
                                  "displayName": "firstname",
                                  "name": "firstname",
                                  "required": true,
                                  "key": "firstname"
                                },
                                {
                                  "type": "string",
                                  "displayName": "lastname",
                                  "name": "lastname",
                                  "required": true,
                                  "key": "lastname"
                                },
                                {
                                  "type": "string",
                                  "displayName": "title",
                                  "name": "title",
                                  "required": false,
                                  "key": "title"
                                },
                                {
                                  "type": "string",
                                  "displayName": "kind",
                                  "name": "kind",
                                  "required": true,
                                  "key": "kind"
                                },
                                {
                                  "type": "string",
                                  "enum": [
                                    "low",
                                    "high"
                                  ],
                                  "displayName": "clearanceLevel",
                                  "name": "clearanceLevel",
                                  "required": true,
                                  "key": "clearanceLevel"
                                },
                                {
                                  "type": "string",
                                  "displayName": "phone",
                                  "name": "phone",
                                  "required": true,
                                  "pattern": "^[0-9|-]+$",
                                  "key": "phone"
                                }
                              ],
                              "key": "onCall"
                            },
                            {
                              "additionalProperties": true,
                              "type": "object",
                              "displayName": "Head",
                              "name": "Head",
                              "required": true,
                              "discriminator": "kind",
                              "properties": [
                                {
                                  "type": "string",
                                  "displayName": "firstname",
                                  "name": "firstname",
                                  "required": true,
                                  "key": "firstname"
                                },
                                {
                                  "type": "string",
                                  "displayName": "lastname",
                                  "name": "lastname",
                                  "required": true,
                                  "key": "lastname"
                                },
                                {
                                  "type": "string",
                                  "displayName": "title",
                                  "name": "title",
                                  "required": false,
                                  "key": "title"
                                },
                                {
                                  "type": "string",
                                  "displayName": "kind",
                                  "name": "kind",
                                  "required": true,
                                  "key": "kind"
                                },
                                {
                                  "type": "array",
                                  "displayName": "reports",
                                  "name": "reports",
                                  "required": true,
                                  "items": {
                                    "type": "object",
                                    "properties": [
                                      {
                                        "type": "string",
                                        "displayName": "firstname",
                                        "name": "firstname",
                                        "required": true,
                                        "key": "firstname"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "lastname",
                                        "name": "lastname",
                                        "required": true,
                                        "key": "lastname"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "title",
                                        "name": "title",
                                        "required": false,
                                        "key": "title"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "kind",
                                        "name": "kind",
                                        "required": true,
                                        "key": "kind"
                                      }
                                    ],
                                    "additionalProperties": true,
                                    "displayName": "Person",
                                    "name": "Person",
                                    "required": true,
                                    "discriminator": "kind"
                                  },
                                  "key": "reports"
                                },
                                {
                                  "type": "string",
                                  "displayName": "phone",
                                  "name": "phone",
                                  "required": true,
                                  "pattern": "^[0-9|-]+$",
                                  "key": "phone"
                                }
                              ],
                              "key": "Head"
                            }
                          ]
                        }
                      ],
                      "examples": [
                        "{\n  \"id\": \"12345\",\n  \"onCall\": {\n    \"firstname\": \"nico\",\n    \"lastname\": \"ark\",\n    \"kind\": \"admin\",\n    \"clearanceLevel\": \"low\",\n    \"phone\": \"12321\"\n  },\n  \"Head\": {\n    \"firstname\": \"nico\",\n    \"lastname\": \"ark\",\n    \"kind\": \"manager\",\n    \"reports\": [\n      {\n        \"firstname\": \"nico\",\n        \"lastname\": \"ark\",\n        \"kind\": \"admin\"\n      }\n    ],\n    \"phone\": \"123-23\"\n  }\n}"
                      ],
                      "key": "application/json"
                    }
                  ],
                  "key": "200"
                }
              ],
              "protocols": [
                "HTTP"
              ],
              "securedBy": [
                "oauth_2_0",
                "oauth_1_0"
              ],
              "description": "Returns an organization info.",
              "displayName": "Get organization",
              "method": "get",
              "allUriParameters": [
                {
                  "name": "environment",
                  "displayName": "environment",
                  "type": "string",
                  "required": true,
                  "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
                  "pattern": "(development|stage|production)",
                  "examples": [
                    "production"
                  ],
                  "key": "environment"
                },
                {
                  "name": "version",
                  "displayName": "version",
                  "type": "string",
                  "required": true,
                  "enum": [
                    "v1"
                  ],
                  "key": "version"
                },
                {
                  "name": "orgId",
                  "displayName": "orgId",
                  "type": "string",
                  "required": true,
                  "key": "orgId"
                }
              ],
              "absoluteUrl": "http://{environment}.api.domain.com/{version}/{orgId}"
            },
            {
              "responses": [
                {
                  "code": "200",
                  "body": [
                    {
                      "name": "Org",
                      "displayName": "Org",
                      "type": "union",
                      "required": true,
                      "additionalProperties": true,
                      "description": "Represents an organization unit.",
                      "anyOf": [
                        {
                          "additionalProperties": true,
                          "type": "object",
                          "description": "Represents an organization unit.",
                          "displayName": "Org",
                          "name": "Org",
                          "required": true,
                          "properties": [
                            {
                              "additionalProperties": true,
                              "type": "object",
                              "displayName": "Manager",
                              "name": "Manager",
                              "required": true,
                              "discriminator": "kind",
                              "properties": [
                                {
                                  "type": "string",
                                  "displayName": "firstname",
                                  "name": "firstname",
                                  "required": true,
                                  "key": "firstname"
                                },
                                {
                                  "type": "string",
                                  "displayName": "lastname",
                                  "name": "lastname",
                                  "required": true,
                                  "key": "lastname"
                                },
                                {
                                  "type": "string",
                                  "displayName": "title",
                                  "name": "title",
                                  "required": false,
                                  "key": "title"
                                },
                                {
                                  "type": "string",
                                  "displayName": "kind",
                                  "name": "kind",
                                  "required": true,
                                  "key": "kind"
                                },
                                {
                                  "type": "array",
                                  "displayName": "reports",
                                  "name": "reports",
                                  "required": true,
                                  "items": {
                                    "type": "object",
                                    "properties": [
                                      {
                                        "type": "string",
                                        "displayName": "firstname",
                                        "name": "firstname",
                                        "required": true,
                                        "key": "firstname"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "lastname",
                                        "name": "lastname",
                                        "required": true,
                                        "key": "lastname"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "title",
                                        "name": "title",
                                        "required": false,
                                        "key": "title"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "kind",
                                        "name": "kind",
                                        "required": true,
                                        "key": "kind"
                                      }
                                    ],
                                    "additionalProperties": true,
                                    "displayName": "Person",
                                    "name": "Person",
                                    "required": true,
                                    "discriminator": "kind"
                                  },
                                  "key": "reports"
                                },
                                {
                                  "type": "string",
                                  "displayName": "phone",
                                  "name": "phone",
                                  "required": true,
                                  "pattern": "^[0-9|-]+$",
                                  "key": "phone"
                                }
                              ],
                              "key": "onCall"
                            },
                            {
                              "additionalProperties": true,
                              "type": "object",
                              "displayName": "Head",
                              "name": "Head",
                              "required": true,
                              "discriminator": "kind",
                              "properties": [
                                {
                                  "type": "string",
                                  "displayName": "firstname",
                                  "name": "firstname",
                                  "required": true,
                                  "key": "firstname"
                                },
                                {
                                  "type": "string",
                                  "displayName": "lastname",
                                  "name": "lastname",
                                  "required": true,
                                  "key": "lastname"
                                },
                                {
                                  "type": "string",
                                  "displayName": "title",
                                  "name": "title",
                                  "required": false,
                                  "key": "title"
                                },
                                {
                                  "type": "string",
                                  "displayName": "kind",
                                  "name": "kind",
                                  "required": true,
                                  "key": "kind"
                                },
                                {
                                  "type": "array",
                                  "displayName": "reports",
                                  "name": "reports",
                                  "required": true,
                                  "items": {
                                    "type": "object",
                                    "properties": [
                                      {
                                        "type": "string",
                                        "displayName": "firstname",
                                        "name": "firstname",
                                        "required": true,
                                        "key": "firstname"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "lastname",
                                        "name": "lastname",
                                        "required": true,
                                        "key": "lastname"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "title",
                                        "name": "title",
                                        "required": false,
                                        "key": "title"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "kind",
                                        "name": "kind",
                                        "required": true,
                                        "key": "kind"
                                      }
                                    ],
                                    "additionalProperties": true,
                                    "displayName": "Person",
                                    "name": "Person",
                                    "required": true,
                                    "discriminator": "kind"
                                  },
                                  "key": "reports"
                                },
                                {
                                  "type": "string",
                                  "displayName": "phone",
                                  "name": "phone",
                                  "required": true,
                                  "pattern": "^[0-9|-]+$",
                                  "key": "phone"
                                }
                              ],
                              "key": "Head"
                            }
                          ]
                        },
                        {
                          "additionalProperties": true,
                          "type": "object",
                          "description": "Represents an organization unit.",
                          "displayName": "Org",
                          "name": "Org",
                          "required": true,
                          "properties": [
                            {
                              "additionalProperties": true,
                              "type": "object",
                              "displayName": "AlertableAdmin",
                              "name": "AlertableAdmin",
                              "required": true,
                              "discriminator": "kind",
                              "properties": [
                                {
                                  "type": "string",
                                  "displayName": "firstname",
                                  "name": "firstname",
                                  "required": true,
                                  "key": "firstname"
                                },
                                {
                                  "type": "string",
                                  "displayName": "lastname",
                                  "name": "lastname",
                                  "required": true,
                                  "key": "lastname"
                                },
                                {
                                  "type": "string",
                                  "displayName": "title",
                                  "name": "title",
                                  "required": false,
                                  "key": "title"
                                },
                                {
                                  "type": "string",
                                  "displayName": "kind",
                                  "name": "kind",
                                  "required": true,
                                  "key": "kind"
                                },
                                {
                                  "type": "string",
                                  "enum": [
                                    "low",
                                    "high"
                                  ],
                                  "displayName": "clearanceLevel",
                                  "name": "clearanceLevel",
                                  "required": true,
                                  "key": "clearanceLevel"
                                },
                                {
                                  "type": "string",
                                  "displayName": "phone",
                                  "name": "phone",
                                  "required": true,
                                  "pattern": "^[0-9|-]+$",
                                  "key": "phone"
                                }
                              ],
                              "key": "onCall"
                            },
                            {
                              "additionalProperties": true,
                              "type": "object",
                              "displayName": "Head",
                              "name": "Head",
                              "required": true,
                              "discriminator": "kind",
                              "properties": [
                                {
                                  "type": "string",
                                  "displayName": "firstname",
                                  "name": "firstname",
                                  "required": true,
                                  "key": "firstname"
                                },
                                {
                                  "type": "string",
                                  "displayName": "lastname",
                                  "name": "lastname",
                                  "required": true,
                                  "key": "lastname"
                                },
                                {
                                  "type": "string",
                                  "displayName": "title",
                                  "name": "title",
                                  "required": false,
                                  "key": "title"
                                },
                                {
                                  "type": "string",
                                  "displayName": "kind",
                                  "name": "kind",
                                  "required": true,
                                  "key": "kind"
                                },
                                {
                                  "type": "array",
                                  "displayName": "reports",
                                  "name": "reports",
                                  "required": true,
                                  "items": {
                                    "type": "object",
                                    "properties": [
                                      {
                                        "type": "string",
                                        "displayName": "firstname",
                                        "name": "firstname",
                                        "required": true,
                                        "key": "firstname"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "lastname",
                                        "name": "lastname",
                                        "required": true,
                                        "key": "lastname"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "title",
                                        "name": "title",
                                        "required": false,
                                        "key": "title"
                                      },
                                      {
                                        "type": "string",
                                        "displayName": "kind",
                                        "name": "kind",
                                        "required": true,
                                        "key": "kind"
                                      }
                                    ],
                                    "additionalProperties": true,
                                    "displayName": "Person",
                                    "name": "Person",
                                    "required": true,
                                    "discriminator": "kind"
                                  },
                                  "key": "reports"
                                },
                                {
                                  "type": "string",
                                  "displayName": "phone",
                                  "name": "phone",
                                  "required": true,
                                  "pattern": "^[0-9|-]+$",
                                  "key": "phone"
                                }
                              ],
                              "key": "Head"
                            }
                          ]
                        }
                      ],
                      "key": "application/json"
                    }
                  ],
                  "key": "200"
                }
              ],
              "body": [
                {
                  "name": "Org",
                  "displayName": "Org",
                  "type": "union",
                  "required": true,
                  "properties": [
                    {
                      "name": "id",
                      "displayName": "id",
                      "type": "string",
                      "required": true,
                      "description": "UUID generated ID",
                      "key": "id"
                    }
                  ],
                  "additionalProperties": true,
                  "description": "Represents an organization unit.",
                  "anyOf": [
                    {
                      "additionalProperties": true,
                      "type": "object",
                      "description": "Represents an organization unit.",
                      "displayName": "Org",
                      "name": "Org",
                      "required": true,
                      "properties": [
                        {
                          "additionalProperties": true,
                          "type": "object",
                          "displayName": "Manager",
                          "name": "Manager",
                          "required": true,
                          "discriminator": "kind",
                          "properties": [
                            {
                              "type": "string",
                              "displayName": "firstname",
                              "name": "firstname",
                              "required": true,
                              "key": "firstname"
                            },
                            {
                              "type": "string",
                              "displayName": "lastname",
                              "name": "lastname",
                              "required": true,
                              "key": "lastname"
                            },
                            {
                              "type": "string",
                              "displayName": "title",
                              "name": "title",
                              "required": false,
                              "key": "title"
                            },
                            {
                              "type": "string",
                              "displayName": "kind",
                              "name": "kind",
                              "required": true,
                              "key": "kind"
                            },
                            {
                              "type": "array",
                              "displayName": "reports",
                              "name": "reports",
                              "required": true,
                              "items": {
                                "type": "object",
                                "properties": [
                                  {
                                    "type": "string",
                                    "displayName": "firstname",
                                    "name": "firstname",
                                    "required": true,
                                    "key": "firstname"
                                  },
                                  {
                                    "type": "string",
                                    "displayName": "lastname",
                                    "name": "lastname",
                                    "required": true,
                                    "key": "lastname"
                                  },
                                  {
                                    "type": "string",
                                    "displayName": "title",
                                    "name": "title",
                                    "required": false,
                                    "key": "title"
                                  },
                                  {
                                    "type": "string",
                                    "displayName": "kind",
                                    "name": "kind",
                                    "required": true,
                                    "key": "kind"
                                  }
                                ],
                                "additionalProperties": true,
                                "displayName": "Person",
                                "name": "Person",
                                "required": true,
                                "discriminator": "kind"
                              },
                              "key": "reports"
                            },
                            {
                              "type": "string",
                              "displayName": "phone",
                              "name": "phone",
                              "required": true,
                              "pattern": "^[0-9|-]+$",
                              "key": "phone"
                            }
                          ],
                          "key": "onCall"
                        },
                        {
                          "additionalProperties": true,
                          "type": "object",
                          "displayName": "Head",
                          "name": "Head",
                          "required": true,
                          "discriminator": "kind",
                          "properties": [
                            {
                              "type": "string",
                              "displayName": "firstname",
                              "name": "firstname",
                              "required": true,
                              "key": "firstname"
                            },
                            {
                              "type": "string",
                              "displayName": "lastname",
                              "name": "lastname",
                              "required": true,
                              "key": "lastname"
                            },
                            {
                              "type": "string",
                              "displayName": "title",
                              "name": "title",
                              "required": false,
                              "key": "title"
                            },
                            {
                              "type": "string",
                              "displayName": "kind",
                              "name": "kind",
                              "required": true,
                              "key": "kind"
                            },
                            {
                              "type": "array",
                              "displayName": "reports",
                              "name": "reports",
                              "required": true,
                              "items": {
                                "type": "object",
                                "properties": [
                                  {
                                    "type": "string",
                                    "displayName": "firstname",
                                    "name": "firstname",
                                    "required": true,
                                    "key": "firstname"
                                  },
                                  {
                                    "type": "string",
                                    "displayName": "lastname",
                                    "name": "lastname",
                                    "required": true,
                                    "key": "lastname"
                                  },
                                  {
                                    "type": "string",
                                    "displayName": "title",
                                    "name": "title",
                                    "required": false,
                                    "key": "title"
                                  },
                                  {
                                    "type": "string",
                                    "displayName": "kind",
                                    "name": "kind",
                                    "required": true,
                                    "key": "kind"
                                  }
                                ],
                                "additionalProperties": true,
                                "displayName": "Person",
                                "name": "Person",
                                "required": true,
                                "discriminator": "kind"
                              },
                              "key": "reports"
                            },
                            {
                              "type": "string",
                              "displayName": "phone",
                              "name": "phone",
                              "required": true,
                              "pattern": "^[0-9|-]+$",
                              "key": "phone"
                            }
                          ],
                          "key": "Head"
                        }
                      ]
                    },
                    {
                      "additionalProperties": true,
                      "type": "object",
                      "description": "Represents an organization unit.",
                      "displayName": "Org",
                      "name": "Org",
                      "required": true,
                      "properties": [
                        {
                          "additionalProperties": true,
                          "type": "object",
                          "displayName": "AlertableAdmin",
                          "name": "AlertableAdmin",
                          "required": true,
                          "discriminator": "kind",
                          "properties": [
                            {
                              "type": "string",
                              "displayName": "firstname",
                              "name": "firstname",
                              "required": true,
                              "key": "firstname"
                            },
                            {
                              "type": "string",
                              "displayName": "lastname",
                              "name": "lastname",
                              "required": true,
                              "key": "lastname"
                            },
                            {
                              "type": "string",
                              "displayName": "title",
                              "name": "title",
                              "required": false,
                              "key": "title"
                            },
                            {
                              "type": "string",
                              "displayName": "kind",
                              "name": "kind",
                              "required": true,
                              "key": "kind"
                            },
                            {
                              "type": "string",
                              "enum": [
                                "low",
                                "high"
                              ],
                              "displayName": "clearanceLevel",
                              "name": "clearanceLevel",
                              "required": true,
                              "key": "clearanceLevel"
                            },
                            {
                              "type": "string",
                              "displayName": "phone",
                              "name": "phone",
                              "required": true,
                              "pattern": "^[0-9|-]+$",
                              "key": "phone"
                            }
                          ],
                          "key": "onCall"
                        },
                        {
                          "additionalProperties": true,
                          "type": "object",
                          "displayName": "Head",
                          "name": "Head",
                          "required": true,
                          "discriminator": "kind",
                          "properties": [
                            {
                              "type": "string",
                              "displayName": "firstname",
                              "name": "firstname",
                              "required": true,
                              "key": "firstname"
                            },
                            {
                              "type": "string",
                              "displayName": "lastname",
                              "name": "lastname",
                              "required": true,
                              "key": "lastname"
                            },
                            {
                              "type": "string",
                              "displayName": "title",
                              "name": "title",
                              "required": false,
                              "key": "title"
                            },
                            {
                              "type": "string",
                              "displayName": "kind",
                              "name": "kind",
                              "required": true,
                              "key": "kind"
                            },
                            {
                              "type": "array",
                              "displayName": "reports",
                              "name": "reports",
                              "required": true,
                              "items": {
                                "type": "object",
                                "properties": [
                                  {
                                    "type": "string",
                                    "displayName": "firstname",
                                    "name": "firstname",
                                    "required": true,
                                    "key": "firstname"
                                  },
                                  {
                                    "type": "string",
                                    "displayName": "lastname",
                                    "name": "lastname",
                                    "required": true,
                                    "key": "lastname"
                                  },
                                  {
                                    "type": "string",
                                    "displayName": "title",
                                    "name": "title",
                                    "required": false,
                                    "key": "title"
                                  },
                                  {
                                    "type": "string",
                                    "displayName": "kind",
                                    "name": "kind",
                                    "required": true,
                                    "key": "kind"
                                  }
                                ],
                                "additionalProperties": true,
                                "displayName": "Person",
                                "name": "Person",
                                "required": true,
                                "discriminator": "kind"
                              },
                              "key": "reports"
                            },
                            {
                              "type": "string",
                              "displayName": "phone",
                              "name": "phone",
                              "required": true,
                              "pattern": "^[0-9|-]+$",
                              "key": "phone"
                            }
                          ],
                          "key": "Head"
                        }
                      ]
                    }
                  ],
                  "key": "application/json"
                }
              ],
              "protocols": [
                "HTTP"
              ],
              "securedBy": [
                "oauth_2_0",
                "oauth_1_0"
              ],
              "method": "put",
              "allUriParameters": [
                {
                  "name": "environment",
                  "displayName": "environment",
                  "type": "string",
                  "required": true,
                  "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
                  "pattern": "(development|stage|production)",
                  "examples": [
                    "production"
                  ],
                  "key": "environment"
                },
                {
                  "name": "version",
                  "displayName": "version",
                  "type": "string",
                  "required": true,
                  "enum": [
                    "v1"
                  ],
                  "key": "version"
                },
                {
                  "name": "orgId",
                  "displayName": "orgId",
                  "type": "string",
                  "required": true,
                  "key": "orgId"
                }
              ],
              "absoluteUrl": "http://{environment}.api.domain.com/{version}/{orgId}"
            }
          ],
          "securedBy": [
            "oauth_2_0",
            "oauth_1_0"
          ],
          "uriParameters": [
            {
              "name": "orgId",
              "displayName": "orgId",
              "type": "string",
              "required": true,
              "key": "orgId"
            }
          ],
          "relativeUri": "/{orgId}",
          "displayName": "/{orgId}",
          "resources": [
            {
              "methods": [
                {
                  "responses": [
                    {
                      "code": "200",
                      "body": [
                        {
                          "name": "application/json",
                          "displayName": "application/json",
                          "type": "array",
                          "required": true,
                          "items": {
                            "additionalProperties": true,
                            "displayName": "Manager",
                            "type": "object",
                            "required": true,
                            "discriminator": "kind",
                            "name": "Manager",
                            "properties": [
                              {
                                "displayName": "firstname",
                                "type": "string",
                                "required": true,
                                "key": "firstname"
                              },
                              {
                                "displayName": "lastname",
                                "type": "string",
                                "required": true,
                                "key": "lastname"
                              },
                              {
                                "displayName": "title",
                                "type": "string",
                                "required": false,
                                "key": "title"
                              },
                              {
                                "displayName": "kind",
                                "type": "string",
                                "required": true,
                                "key": "kind"
                              },
                              {
                                "type": "array",
                                "displayName": "reports",
                                "name": "reports",
                                "required": true,
                                "items": {
                                  "type": "object",
                                  "properties": [
                                    {
                                      "displayName": "firstname",
                                      "type": "string",
                                      "required": true,
                                      "key": "firstname"
                                    },
                                    {
                                      "displayName": "lastname",
                                      "type": "string",
                                      "required": true,
                                      "key": "lastname"
                                    },
                                    {
                                      "displayName": "title",
                                      "type": "string",
                                      "required": false,
                                      "key": "title"
                                    },
                                    {
                                      "displayName": "kind",
                                      "type": "string",
                                      "required": true,
                                      "key": "kind"
                                    }
                                  ],
                                  "additionalProperties": true,
                                  "displayName": "Person",
                                  "required": true,
                                  "discriminator": "kind"
                                },
                                "key": "reports"
                              },
                              {
                                "displayName": "phone",
                                "type": "string",
                                "required": true,
                                "pattern": "^[0-9|-]+$",
                                "name": "phone",
                                "key": "phone"
                              }
                            ]
                          },
                          "key": "application/json"
                        }
                      ],
                      "key": "200"
                    }
                  ],
                  "protocols": [
                    "HTTP"
                  ],
                  "securedBy": [
                    "oauth_2_0",
                    "oauth_1_0"
                  ],
                  "method": "get",
                  "allUriParameters": [
                    {
                      "name": "environment",
                      "displayName": "environment",
                      "type": "string",
                      "required": true,
                      "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
                      "pattern": "(development|stage|production)",
                      "examples": [
                        "production"
                      ],
                      "key": "environment"
                    },
                    {
                      "name": "version",
                      "displayName": "version",
                      "type": "string",
                      "required": true,
                      "enum": [
                        "v1"
                      ],
                      "key": "version"
                    },
                    {
                      "name": "orgId",
                      "displayName": "orgId",
                      "type": "string",
                      "required": true,
                      "key": "orgId"
                    }
                  ],
                  "absoluteUrl": "http://{environment}.api.domain.com/{version}/managers"
                }
              ],
              "securedBy": [
                "oauth_2_0",
                "oauth_1_0"
              ],
              "relativeUri": "/managers",
              "displayName": "/managers",
              "relativeUriPathSegments": [
                "managers"
              ],
              "absoluteUri": "http://{environment}.api.domain.com/{version}/orgs/{orgId}/managers",
              "parentUrl": "/orgs/{orgId}",
              "uniqueId": "orgs__orgid__managers",
              "absoluteUrl": "http://{environment}.api.domain.com/{version}/managers",
              "allUriParameters": [
                {
                  "name": "environment",
                  "displayName": "environment",
                  "type": "string",
                  "required": true,
                  "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
                  "pattern": "(development|stage|production)",
                  "examples": [
                    "production"
                  ],
                  "key": "environment"
                },
                {
                  "name": "version",
                  "displayName": "version",
                  "type": "string",
                  "required": true,
                  "enum": [
                    "v1"
                  ],
                  "key": "version"
                },
                {
                  "name": "orgId",
                  "displayName": "orgId",
                  "type": "string",
                  "required": true,
                  "key": "orgId"
                }
              ]
            }
          ],
          "relativeUriPathSegments": [
            "{orgId}"
          ],
          "absoluteUri": "http://{environment}.api.domain.com/{version}/orgs/{orgId}",
          "parentUrl": "/orgs",
          "uniqueId": "orgs__orgid_",
          "absoluteUrl": "http://{environment}.api.domain.com/{version}/{orgId}",
          "allUriParameters": [
            {
              "name": "environment",
              "displayName": "environment",
              "type": "string",
              "required": true,
              "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
              "pattern": "(development|stage|production)",
              "examples": [
                "production"
              ],
              "key": "environment"
            },
            {
              "name": "version",
              "displayName": "version",
              "type": "string",
              "required": true,
              "enum": [
                "v1"
              ],
              "key": "version"
            },
            {
              "name": "orgId",
              "displayName": "orgId",
              "type": "string",
              "required": true,
              "key": "orgId"
            }
          ]
        }
      ],
      "relativeUriPathSegments": [
        "orgs"
      ],
      "absoluteUri": "http://{environment}.api.domain.com/{version}/orgs",
      "parentUrl": "",
      "uniqueId": "orgs",
      "absoluteUrl": "http://{environment}.api.domain.com/{version}/orgs",
      "allUriParameters": [
        {
          "name": "environment",
          "displayName": "environment",
          "type": "string",
          "required": true,
          "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
          "pattern": "(development|stage|production)",
          "examples": [
            "production"
          ],
          "key": "environment"
        },
        {
          "name": "version",
          "displayName": "version",
          "type": "string",
          "required": true,
          "enum": [
            "v1"
          ],
          "key": "version"
        }
      ]
    },
    {
      "methods": [
        {
          "responses": [
            {
              "code": "200",
              "headers": [
                {
                  "name": "X-Amin-Resource",
                  "displayName": "Admin resource mark header",
                  "type": "boolean",
                  "default": false,
                  "required": true,
                  "description": "This header is not set if the resource can be changed by non-admin users."
                }
              ],
              "key": "200"
            },
            {
              "code": "401",
              "description": "The 401 response will be returned when trying to update the resource with \nnon-admin clerance level. Resources that requires admin privileges are marked with \n`X-Admin-Resource` header when getting the resource.\n",
              "key": "401"
            }
          ],
          "body": [
            {
              "name": "application/json",
              "displayName": "application/json",
              "type": "object",
              "required": true,
              "properties": [
                {
                  "name": "receiver",
                  "displayName": "receiver",
                  "type": "string",
                  "required": true,
                  "description": "receiver of the message",
                  "key": "receiver"
                },
                {
                  "name": "body",
                  "displayName": "body",
                  "type": "string",
                  "required": true,
                  "description": "A message body",
                  "key": "body"
                },
                {
                  "name": "important",
                  "displayName": "important",
                  "type": "boolean",
                  "default": false,
                  "required": true,
                  "description": "If true then the message will be marked as important",
                  "key": "important"
                }
              ],
              "key": "application/json"
            }
          ],
          "protocols": [
            "HTTP"
          ],
          "is": [
            "Adminable"
          ],
          "securedBy": [
            "oauth_2_0"
          ],
          "description": "Post a new message",
          "method": "post",
          "allUriParameters": [
            {
              "name": "environment",
              "displayName": "environment",
              "type": "string",
              "required": true,
              "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
              "pattern": "(development|stage|production)",
              "examples": [
                "production"
              ],
              "key": "environment"
            },
            {
              "name": "version",
              "displayName": "version",
              "type": "string",
              "required": true,
              "enum": [
                "v1"
              ],
              "key": "version"
            }
          ],
          "absoluteUrl": "http://{environment}.api.domain.com/{version}/messages"
        }
      ],
      "securedBy": [
        "oauth_2_0"
      ],
      "relativeUri": "/messages",
      "displayName": "/messages",
      "relativeUriPathSegments": [
        "messages"
      ],
      "absoluteUri": "http://{environment}.api.domain.com/{version}/messages",
      "parentUrl": "",
      "uniqueId": "messages",
      "absoluteUrl": "http://{environment}.api.domain.com/{version}/messages",
      "allUriParameters": [
        {
          "name": "environment",
          "displayName": "environment",
          "type": "string",
          "required": true,
          "description": "API environment. The value can be one of \"development\", \"stage\" or \"production\"\nDevelopment environment is avaibale for dev keys (client id).\nStage is available internally only and keys are whitelisted for this environment. Keys that are not whitelisted will always return 404 for any call.\nProduction is available for redular keys (klient ids).\n",
          "pattern": "(development|stage|production)",
          "examples": [
            "production"
          ],
          "key": "environment"
        },
        {
          "name": "version",
          "displayName": "version",
          "type": "string",
          "required": true,
          "enum": [
            "v1"
          ],
          "key": "version"
        }
      ]
    }
  ],
  "documentation": [
    {
      "title": "About",
      "content": "# About the example API\n\nThe `Example API` provides all definitions of the RAML 1.0 like types, security schemes, resource types and so on.\nMagic variables are special strings that are passed to any string property in the request and it will be replaced with other string that is defined for\nthis variable.\n\n## Example\nLet's say you want to generate a random number in the request. So the property\nvalue like:\n```\nhttp://www.domain.com/?time=${now}\n```\ncan produce:\n```\nhttp://www.domain.com/?time=12312312312\n```\n\n## Build-in magic variables.\n| Variable | Description | Example |\n| --- | --- | --- |\n| `${random}` | Will generate random number in range from 0 to Number.MAX_SAFE_INTEGER | 9007199254740991 |\n| `${random:NUMBER}` | A variation of `${random}` where the result will be remembered and can be used in other property. If the same `NUMBER` occurs again then previously generated value will be used. | 7199254740 |\n| `${now}` | Inserts current epoch time | 12312312312 |\n\n## Magic variables scopes\nThere are two types of magic variables:\n* **global** - Applied to every request,\n* **scoped** - Applied to a request enclosed in a project.\n\n### Global variables\nVariables of this type will be applied to every outgoing request.\n\n### Scoped variables.\nScoped variables are associated with a project and are applied to those request\nthat are added to corresponding project.\n\n## User magic variables\nThis element supports user defined variables. Variables defined by the user are kept\nin IndexedDB locally and retreived\nby the element on run time. Users can decide either the variable is global or scoped.\n\n## Database structure\n| Property | Type | Is key | Description |\n| --- | --- | --- | --- |\n| id | Number | Yes, key path | An autoincremental key for the rule |\n| variable | String | Yes | A variable name. It must be consisted with [0-9A-Za-z${}_-] |\n| value | String | No | Replacement value. Replacement value may include other magic variables |\n| type | String | Yes | Either `global` or `scoped` (for now) |\n| project | Number | Yes | Relevant if the `type` is set to `scoped`. The rule will be applied to the requests that are associated with this project. If not set if will be omnited. |\n\n## Usage\nThe element's `value` property contains a value that will be parsed during the work.\nIt may be either String or Object.\n\nWhile String is obvious, the Object will be treated differently. It will parse only\nstring values of each first level key.\nThis means that no deep objects will be taken into consideration.\nBefore start applying new magic variables the program should call `clear()`\nfunction to clear the groups defined by previous use.\nThe element will keep groups generated data so it can be uses many times on\ndifferent strings resulting with the same group values.\n\nJavaScript code:\n```javascript\n...\nthis.$.mv.clear();\nthis.set('headersList', headers);\nthis.$.mv.parse();\n...\n_onParsed = (e) => {\n  var headers = e.detail.result;\n};\n...\n```\nThe parse method returns a Promise which will be fulfilled when it finish parsing data:\n```javascript\n...\nthis.set('headersList', headers);\nthis.$.mv.parse()\n.then((result) => {\n  // parsed data\n});\n...\n```\n",
      "uniqueId": "about"
    },
    {
      "title": "Test docs",
      "content": "# A test documentation.\nThis text was created by ARC's RAML editor.\nYou probably see this because you are testing ARC's web components and this component\nis responsible for displaying a documentation from the RAML definition.\n\nPlay around with the element and use it in your project.\nPlease, note the licensing information available in every ARC component.\nIf you have any question email me: arc@mulesoft.com\nOr slack me (internally only): Pawel Psztyc (P3)\n",
      "uniqueId": "test_docs"
    }
  ],
  "types": {
    "Image": {
      "additionalProperties": true,
      "type": "object",
      "description": "An image object representing an image object strored in the file store.\nThe image can be only included in the response. It has no effect if the Image appear in the\nrequest. Endpoint handles image creation on it's own and clients can't process images\nexcept of sending image data.\n",
      "displayName": "Image",
      "name": "Image",
      "required": true,
      "properties": {
        "url": {
          "type": "string",
          "description": "The URL of the image.\nTo resize the image and crop it to a square, append the query string **?sz=x**, where x is the dimension in pixels of each side.\n",
          "displayName": "url",
          "name": "url",
          "required": true
        },
        "thumb": {
          "type": "string",
          "description": "An URL to the thumbnail of the image. Thumbnails are 60x60px cropped images of the original image.\n",
          "displayName": "Thumbnail",
          "name": "thumb",
          "required": true
        }
      }
    },
    "Resource": {
      "additionalProperties": true,
      "type": "object",
      "description": "Common properties for all resources returned by the API.\n",
      "displayName": "Resource",
      "name": "Resource",
      "required": true,
      "properties": {
        "etag": {
          "type": "string",
          "description": "ETag of this resource for caching purposes.\n__This property will be ignored when creating an object.__\n",
          "displayName": "etag",
          "name": "etag",
          "required": true
        }
      }
    },
    "AppPerson": {
      "additionalProperties": true,
      "type": "object",
      "description": "An object representing a person in the API.\nThis object will be used in all methods returning a Person or list of people.\n",
      "displayName": "A person resource",
      "name": "AppPerson",
      "required": true,
      "properties": {
        "tagline": {
          "type": "string",
          "description": "The brief description (tagline) of this person.",
          "displayName": "tagline",
          "name": "tagline",
          "required": true,
          "key": "tagline"
        },
        "name": {
          "type": "string",
          "description": "Person full name. The input will be rejected if this property is not set while creating new object.",
          "displayName": "name",
          "name": "name",
          "required": true,
          "pattern": "[0-9a-zA-Z ]+",
          "examples": [
            "John Smith"
          ],
          "key": "name"
        },
        "birthday": {
          "type": "string",
          "description": "The person's date of birth, represented as YYYY-MM-DD.",
          "displayName": "birthday",
          "name": "birthday",
          "required": true,
          "key": "birthday"
        },
        "etag": {
          "type": "string",
          "description": "ETag of this resource for caching purposes.\n__This property will be ignored when creating an object.__\n",
          "displayName": "etag",
          "name": "etag",
          "required": true,
          "key": "etag"
        },
        "language": {
          "type": "string",
          "description": "The user's preferred language for rendering.",
          "displayName": "language",
          "name": "language",
          "required": true,
          "key": "language"
        },
        "id": {
          "type": "string",
          "description": "A unique identifier for a person. It is a 32 bit string containing alphanumeric characters.",
          "displayName": "id",
          "name": "id",
          "required": true,
          "key": "id"
        },
        "url": {
          "type": "string",
          "description": "The URL of this person's profile.",
          "displayName": "url",
          "name": "url",
          "required": true,
          "key": "url"
        },
        "image": {
          "additionalProperties": true,
          "type": "object",
          "description": "An image object representing an image object strored in the file store.\nThe image can be only included in the response. It has no effect if the Image appear in the\nrequest. Endpoint handles image creation on it's own and clients can't process images\nexcept of sending image data.\n",
          "displayName": "image",
          "name": "image",
          "required": true,
          "properties": [
            {
              "type": "string",
              "description": "The URL of the image.\nTo resize the image and crop it to a square, append the query string **?sz=x**, where x is the dimension in pixels of each side.\n",
              "displayName": "url",
              "name": "url",
              "required": true,
              "key": "url"
            },
            {
              "type": "string",
              "description": "An URL to the thumbnail of the image. Thumbnails are 60x60px cropped images of the original image.\n",
              "displayName": "Thumbnail",
              "name": "thumb",
              "required": true,
              "key": "thumb"
            }
          ],
          "key": "image"
        },
        "gender": {
          "type": "string",
          "description": "The person's gender. Possible values includes, but are not limited to, the following values:\n* \"male\" - Male gender.\n* \"female\" - Female gender.\n* \"other\" - Other.\n",
          "displayName": "gender",
          "name": "gender",
          "required": false,
          "key": "gender"
        }
      }
    },
    "Product": {
      "additionalProperties": true,
      "type": "object",
      "description": "A single product representing an item in the store.",
      "displayName": "A product resource",
      "name": "Product",
      "required": true,
      "properties": {
        "etag": {
          "type": "string",
          "description": "ETag of this resource for caching purposes.\n__This property will be ignored when creating an object.__\n",
          "displayName": "etag",
          "name": "etag",
          "required": true,
          "key": "etag"
        },
        "id": {
          "type": "string",
          "description": "Product id. It is a UUID of the database record.\n__This property will be ignored when creating an object.__\nIt will be available when the product is stored in the datastore.\n",
          "displayName": "id",
          "name": "id",
          "required": true,
          "pattern": "[0-9a-zA-Z]+",
          "key": "id"
        },
        "name": {
          "type": "string",
          "description": "Product name",
          "displayName": "name",
          "name": "name",
          "required": true,
          "examples": [
            "Acme product - mentol flavor, 500 ml."
          ],
          "key": "name"
        },
        "quantity": {
          "type": "number",
          "description": "The quantity of the product in the one unit of measurement.\nSee `unit` property for more information.\n",
          "displayName": "quantity",
          "name": "quantity",
          "required": true,
          "examples": [
            "500"
          ],
          "key": "quantity"
        },
        "unit": {
          "type": "string",
          "description": "The unit of measuremet for the quantity property.",
          "displayName": "unit",
          "name": "unit",
          "required": true,
          "examples": [
            "ml"
          ],
          "key": "unit"
        },
        "upc": {
          "type": "string",
          "description": "The Universal Produc Code. It consists of 12 numerical digits. However, because of the\ninteger precision limitation in JavaScript it is represented as a string.\n",
          "displayName": "upc",
          "name": "upc",
          "required": true,
          "pattern": "[0-9]{12,12}",
          "examples": [
            "042100005264"
          ],
          "key": "upc"
        },
        "available": {
          "type": "boolean",
          "description": "Product current availability in the store.\nProduct may be not available but the users still can order it with later delivery date.\n",
          "displayName": "available",
          "name": "available",
          "required": true,
          "examples": [
            "true"
          ],
          "key": "available"
        }
      }
    },
    "ErrorResource": {
      "additionalProperties": true,
      "type": "object",
      "description": "A response that is errored",
      "displayName": "ErrorResource",
      "name": "ErrorResource",
      "required": true,
      "properties": {
        "error": {
          "type": "boolean",
          "description": "Indicate that the response is errored.",
          "displayName": "error",
          "default": true,
          "name": "error",
          "required": true,
          "examples": [
            "true"
          ],
          "key": "error"
        },
        "message": {
          "type": "string",
          "description": "The error message associated with the error.",
          "displayName": "message",
          "name": "message",
          "required": true,
          "examples": [
            "<<example>>"
          ],
          "key": "message"
        }
      }
    },
    "ExampleType.Org": {
      "additionalProperties": true,
      "type": "union",
      "description": "Represents an organization unit.",
      "displayName": "Org",
      "name": "Org",
      "required": true,
      "anyOf": [
        {
          "additionalProperties": true,
          "type": "object",
          "description": "Represents an organization unit.",
          "displayName": "Org",
          "name": "Org",
          "required": true,
          "properties": [
            {
              "additionalProperties": true,
              "type": "object",
              "displayName": "Manager",
              "name": "Manager",
              "required": true,
              "discriminator": "kind",
              "properties": [
                {
                  "type": "string",
                  "displayName": "firstname",
                  "name": "firstname",
                  "required": true,
                  "key": "firstname"
                },
                {
                  "type": "string",
                  "displayName": "lastname",
                  "name": "lastname",
                  "required": true,
                  "key": "lastname"
                },
                {
                  "type": "string",
                  "displayName": "title",
                  "name": "title",
                  "required": false,
                  "key": "title"
                },
                {
                  "type": "string",
                  "displayName": "kind",
                  "name": "kind",
                  "required": true,
                  "key": "kind"
                },
                {
                  "type": "array",
                  "displayName": "reports",
                  "name": "reports",
                  "required": true,
                  "items": {
                    "type": "object",
                    "properties": [
                      {
                        "type": "string",
                        "displayName": "firstname",
                        "name": "firstname",
                        "required": true,
                        "key": "firstname"
                      },
                      {
                        "type": "string",
                        "displayName": "lastname",
                        "name": "lastname",
                        "required": true,
                        "key": "lastname"
                      },
                      {
                        "type": "string",
                        "displayName": "title",
                        "name": "title",
                        "required": false,
                        "key": "title"
                      },
                      {
                        "type": "string",
                        "displayName": "kind",
                        "name": "kind",
                        "required": true,
                        "key": "kind"
                      }
                    ],
                    "additionalProperties": true,
                    "displayName": "Person",
                    "name": "Person",
                    "required": true,
                    "discriminator": "kind"
                  },
                  "key": "reports"
                },
                {
                  "type": "string",
                  "displayName": "phone",
                  "name": "phone",
                  "required": true,
                  "pattern": "^[0-9|-]+$",
                  "key": "phone"
                }
              ],
              "key": "onCall"
            },
            {
              "additionalProperties": true,
              "type": "object",
              "displayName": "Head",
              "name": "Head",
              "required": true,
              "discriminator": "kind",
              "properties": [
                {
                  "type": "string",
                  "displayName": "firstname",
                  "name": "firstname",
                  "required": true,
                  "key": "firstname"
                },
                {
                  "type": "string",
                  "displayName": "lastname",
                  "name": "lastname",
                  "required": true,
                  "key": "lastname"
                },
                {
                  "type": "string",
                  "displayName": "title",
                  "name": "title",
                  "required": false,
                  "key": "title"
                },
                {
                  "type": "string",
                  "displayName": "kind",
                  "name": "kind",
                  "required": true,
                  "key": "kind"
                },
                {
                  "type": "array",
                  "displayName": "reports",
                  "name": "reports",
                  "required": true,
                  "items": {
                    "type": "object",
                    "properties": [
                      {
                        "type": "string",
                        "displayName": "firstname",
                        "name": "firstname",
                        "required": true,
                        "key": "firstname"
                      },
                      {
                        "type": "string",
                        "displayName": "lastname",
                        "name": "lastname",
                        "required": true,
                        "key": "lastname"
                      },
                      {
                        "type": "string",
                        "displayName": "title",
                        "name": "title",
                        "required": false,
                        "key": "title"
                      },
                      {
                        "type": "string",
                        "displayName": "kind",
                        "name": "kind",
                        "required": true,
                        "key": "kind"
                      }
                    ],
                    "additionalProperties": true,
                    "displayName": "Person",
                    "name": "Person",
                    "required": true,
                    "discriminator": "kind"
                  },
                  "key": "reports"
                },
                {
                  "type": "string",
                  "displayName": "phone",
                  "name": "phone",
                  "required": true,
                  "pattern": "^[0-9|-]+$",
                  "key": "phone"
                }
              ],
              "key": "Head"
            }
          ]
        },
        {
          "additionalProperties": true,
          "type": "object",
          "description": "Represents an organization unit.",
          "displayName": "Org",
          "name": "Org",
          "required": true,
          "properties": [
            {
              "additionalProperties": true,
              "type": "object",
              "displayName": "AlertableAdmin",
              "name": "AlertableAdmin",
              "required": true,
              "discriminator": "kind",
              "properties": [
                {
                  "type": "string",
                  "displayName": "firstname",
                  "name": "firstname",
                  "required": true,
                  "key": "firstname"
                },
                {
                  "type": "string",
                  "displayName": "lastname",
                  "name": "lastname",
                  "required": true,
                  "key": "lastname"
                },
                {
                  "type": "string",
                  "displayName": "title",
                  "name": "title",
                  "required": false,
                  "key": "title"
                },
                {
                  "type": "string",
                  "displayName": "kind",
                  "name": "kind",
                  "required": true,
                  "key": "kind"
                },
                {
                  "type": "string",
                  "enum": [
                    "low",
                    "high"
                  ],
                  "displayName": "clearanceLevel",
                  "name": "clearanceLevel",
                  "required": true,
                  "key": "clearanceLevel"
                },
                {
                  "type": "string",
                  "displayName": "phone",
                  "name": "phone",
                  "required": true,
                  "pattern": "^[0-9|-]+$",
                  "key": "phone"
                }
              ],
              "key": "onCall"
            },
            {
              "additionalProperties": true,
              "type": "object",
              "displayName": "Head",
              "name": "Head",
              "required": true,
              "discriminator": "kind",
              "properties": [
                {
                  "type": "string",
                  "displayName": "firstname",
                  "name": "firstname",
                  "required": true,
                  "key": "firstname"
                },
                {
                  "type": "string",
                  "displayName": "lastname",
                  "name": "lastname",
                  "required": true,
                  "key": "lastname"
                },
                {
                  "type": "string",
                  "displayName": "title",
                  "name": "title",
                  "required": false,
                  "key": "title"
                },
                {
                  "type": "string",
                  "displayName": "kind",
                  "name": "kind",
                  "required": true,
                  "key": "kind"
                },
                {
                  "type": "array",
                  "displayName": "reports",
                  "name": "reports",
                  "required": true,
                  "items": {
                    "type": "object",
                    "properties": [
                      {
                        "type": "string",
                        "displayName": "firstname",
                        "name": "firstname",
                        "required": true,
                        "key": "firstname"
                      },
                      {
                        "type": "string",
                        "displayName": "lastname",
                        "name": "lastname",
                        "required": true,
                        "key": "lastname"
                      },
                      {
                        "type": "string",
                        "displayName": "title",
                        "name": "title",
                        "required": false,
                        "key": "title"
                      },
                      {
                        "type": "string",
                        "displayName": "kind",
                        "name": "kind",
                        "required": true,
                        "key": "kind"
                      }
                    ],
                    "additionalProperties": true,
                    "displayName": "Person",
                    "name": "Person",
                    "required": true,
                    "discriminator": "kind"
                  },
                  "key": "reports"
                },
                {
                  "type": "string",
                  "displayName": "phone",
                  "name": "phone",
                  "required": true,
                  "pattern": "^[0-9|-]+$",
                  "key": "phone"
                }
              ],
              "key": "Head"
            }
          ]
        }
      ]
    },
    "ExampleType.Person": {
      "additionalProperties": true,
      "type": "object",
      "displayName": "Person",
      "name": "Person",
      "required": true,
      "discriminator": "kind",
      "properties": {
        "firstname": {
          "type": "string",
          "displayName": "firstname",
          "name": "firstname",
          "required": true
        },
        "lastname": {
          "type": "string",
          "displayName": "lastname",
          "name": "lastname",
          "required": true
        },
        "title": {
          "type": "string",
          "displayName": "title",
          "name": "title",
          "required": false
        },
        "kind": {
          "type": "string",
          "displayName": "kind",
          "name": "kind",
          "required": true
        }
      }
    },
    "ExampleType.Phone": {
      "type": "string",
      "displayName": "Phone",
      "name": "Phone",
      "required": true,
      "pattern": "^[0-9|-]+$"
    },
    "ExampleType.Manager": {
      "additionalProperties": true,
      "displayName": "Manager",
      "type": "object",
      "required": true,
      "discriminator": "kind",
      "name": "Manager",
      "properties": [
        {
          "displayName": "firstname",
          "type": "string",
          "required": true,
          "key": "firstname"
        },
        {
          "displayName": "lastname",
          "type": "string",
          "required": true,
          "key": "lastname"
        },
        {
          "displayName": "title",
          "type": "string",
          "required": false,
          "key": "title"
        },
        {
          "displayName": "kind",
          "type": "string",
          "required": true,
          "key": "kind"
        },
        {
          "type": "array",
          "displayName": "reports",
          "name": "reports",
          "required": true,
          "items": {
            "type": "object",
            "properties": [
              {
                "displayName": "firstname",
                "type": "string",
                "required": true,
                "key": "firstname"
              },
              {
                "displayName": "lastname",
                "type": "string",
                "required": true,
                "key": "lastname"
              },
              {
                "displayName": "title",
                "type": "string",
                "required": false,
                "key": "title"
              },
              {
                "displayName": "kind",
                "type": "string",
                "required": true,
                "key": "kind"
              }
            ],
            "additionalProperties": true,
            "displayName": "Person",
            "required": true,
            "discriminator": "kind"
          },
          "key": "reports"
        },
        {
          "displayName": "phone",
          "type": "string",
          "required": true,
          "pattern": "^[0-9|-]+$",
          "name": "phone",
          "key": "phone"
        }
      ]
    },
    "ExampleType.Admin": {
      "additionalProperties": true,
      "displayName": "Admin",
      "type": "object",
      "required": true,
      "discriminator": "kind",
      "name": "Admin",
      "properties": {
        "firstname": {
          "displayName": "firstname",
          "type": "string",
          "required": true
        },
        "lastname": {
          "displayName": "lastname",
          "type": "string",
          "required": true
        },
        "title": {
          "displayName": "title",
          "type": "string",
          "required": false
        },
        "kind": {
          "displayName": "kind",
          "type": "string",
          "required": true
        },
        "clearanceLevel": {
          "type": "string",
          "enum": [
            "low",
            "high"
          ],
          "displayName": "clearanceLevel",
          "name": "clearanceLevel",
          "required": true
        }
      }
    },
    "ExampleType.AlertableAdmin": {
      "additionalProperties": true,
      "displayName": "AlertableAdmin",
      "type": "object",
      "required": true,
      "discriminator": "kind",
      "name": "AlertableAdmin",
      "properties": {
        "firstname": {
          "displayName": "firstname",
          "type": "string",
          "required": true
        },
        "lastname": {
          "displayName": "lastname",
          "type": "string",
          "required": true
        },
        "title": {
          "displayName": "title",
          "type": "string",
          "required": false
        },
        "kind": {
          "displayName": "kind",
          "type": "string",
          "required": true
        },
        "clearanceLevel": {
          "enum": [
            "low",
            "high"
          ],
          "displayName": "clearanceLevel",
          "type": "string",
          "required": true
        },
        "phone": {
          "displayName": "phone",
          "type": "string",
          "required": true,
          "pattern": "^[0-9|-]+$",
          "name": "phone"
        }
      }
    },
    "ExampleType.Alertable": {
      "type": "union",
      "displayName": "Alertable",
      "name": "Alertable",
      "required": true,
      "anyOf": [
        {
          "properties": {
            "firstname": {
              "displayName": "firstname",
              "type": "string",
              "required": true
            },
            "lastname": {
              "displayName": "lastname",
              "type": "string",
              "required": true
            },
            "title": {
              "displayName": "title",
              "type": "string",
              "required": false
            },
            "kind": {
              "displayName": "kind",
              "type": "string",
              "required": true
            },
            "reports": {
              "displayName": "reports",
              "type": "array",
              "items": {
                "properties": {
                  "firstname": {
                    "displayName": "firstname",
                    "type": "string",
                    "required": true
                  },
                  "lastname": {
                    "displayName": "lastname",
                    "type": "string",
                    "required": true
                  },
                  "title": {
                    "displayName": "title",
                    "type": "string",
                    "required": false
                  },
                  "kind": {
                    "displayName": "kind",
                    "type": "string",
                    "required": true
                  }
                },
                "additionalProperties": true,
                "displayName": "Person",
                "type": "object",
                "required": true,
                "discriminator": "kind"
              },
              "required": true
            },
            "phone": {
              "displayName": "phone",
              "type": "string",
              "required": true,
              "pattern": "^[0-9|-]+$"
            }
          },
          "additionalProperties": true,
          "displayName": "Manager",
          "type": "object",
          "required": true,
          "discriminator": "kind"
        },
        {
          "properties": {
            "firstname": {
              "displayName": "firstname",
              "type": "string",
              "required": true
            },
            "lastname": {
              "displayName": "lastname",
              "type": "string",
              "required": true
            },
            "title": {
              "displayName": "title",
              "type": "string",
              "required": false
            },
            "kind": {
              "displayName": "kind",
              "type": "string",
              "required": true
            },
            "clearanceLevel": {
              "enum": [
                "low",
                "high"
              ],
              "displayName": "clearanceLevel",
              "type": "string",
              "required": true
            },
            "phone": {
              "displayName": "phone",
              "type": "string",
              "required": true,
              "pattern": "^[0-9|-]+$"
            }
          },
          "additionalProperties": true,
          "displayName": "AlertableAdmin",
          "type": "object",
          "required": true,
          "discriminator": "kind"
        }
      ]
    }
  }
}
