define({ "api": [
  {
    "type": "put",
    "url": "/admin/answers/reported",
    "title": "get answers reported",
    "name": "GetAdminAnswersReported",
    "group": "Admin",
    "permission": [
      {
        "name": "admin",
        "title": "Admin access rights needed.",
        "description": "<p>A admin connected and with the right</p>"
      }
    ],
    "description": "<p>get all answers reported</p>",
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "NoContent",
            "description": "<p>No proposition reported found</p>"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>id of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dateAnswer",
            "description": "<p>date of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contentAnswer",
            "description": "<p>content of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAnonymous",
            "description": "<p>indicates if the answer is published anonymously or not</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ownerAnswer",
            "description": "<p>id of the user who wrote the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idLikesAnswer",
            "description": "<p>Array of id of users who liked the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "tagsAnswer",
            "description": "<p>Array of id of tags attached to the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "idProp",
            "description": "<p>id of the proposition linked to the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idReport",
            "description": "<p>Array of id of user who report the proposition</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenAccesClean",
            "description": "<p>Admin right needed</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "put",
    "url": "/admin/propositions/reported",
    "title": "get propositions reported",
    "name": "GetAdminPropositionsReported",
    "group": "Admin",
    "permission": [
      {
        "name": "admin",
        "title": "Admin access rights needed.",
        "description": "<p>A admin connected and with the right</p>"
      }
    ],
    "description": "<p>get all propositions reported</p>",
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "NoContent",
            "description": "<p>No proposition reported found</p>"
          }
        ],
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>id of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "titleProp",
            "description": "<p>title of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dateProp",
            "description": "<p>date of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contentProp",
            "description": "<p>content of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAnonymous",
            "description": "<p>indicates if the proposition is published anonymously or not</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ownerProp",
            "description": "<p>id of the user who wrote the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idLikesProp",
            "description": "<p>Array of id of users who liked the propositions</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "tagsProp",
            "description": "<p>Array of id of tags attached to the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idAnswers",
            "description": "<p>Array of id of answers of to the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idReport",
            "description": "<p>Array of id of user who report the proposition</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenAccesClean",
            "description": "<p>Admin right needed</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "put",
    "url": "/admin/ban",
    "title": "banned an user",
    "name": "PostUserAdminBan",
    "group": "Admin",
    "permission": [
      {
        "name": "admin",
        "title": "Admin access rights needed.",
        "description": "<p>A admin connected and with the right</p>"
      }
    ],
    "description": "<p>Ban an user by is id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Users-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "204",
            "description": "<p>No content</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenAcces",
            "description": "<p>Admin right required</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "FiedMissing",
            "description": "<p>The Users-ID is required</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "put",
    "url": "/admin/cancel-ban",
    "title": "cancel ban of user",
    "name": "PostUserAdminCancelBan",
    "group": "Admin",
    "permission": [
      {
        "name": "admin",
        "title": "Admin access rights needed.",
        "description": "<p>A admin connected and with the right</p>"
      }
    ],
    "description": "<p>cancel the ban of a user by is id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The Users-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "204",
            "description": "<p>No content</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenAcces",
            "description": "<p>Admin right required</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "FiedMissing",
            "description": "<p>The Users-ID is required</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "put",
    "url": "/admin/answers/clean-report",
    "title": "clean report of a answer",
    "name": "PutAdminAnswerCleanReport",
    "group": "Admin",
    "permission": [
      {
        "name": "admin",
        "title": "Admin access rights needed.",
        "description": "<p>A admin connected and with the right</p>"
      }
    ],
    "description": "<p>clean/empty reports of an answer by is id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the answer to clean array of reports</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the answer who the reports are cleaned</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenAccesClean",
            "description": "<p>Admin right needed</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "put",
    "url": "/admin/propositions/clean-report",
    "title": "clean report of a proposition",
    "name": "PutAdminPropositionCleanReport",
    "group": "Admin",
    "permission": [
      {
        "name": "admin",
        "title": "Admin access rights needed.",
        "description": "<p>A admin connected and with the right</p>"
      }
    ],
    "description": "<p>clean/empty reports of a proposition by is id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the propostion to clean array of reports</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the propostion who the reports are cleaned</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenAccesClean",
            "description": "<p>Admin right needed</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "delete",
    "url": "/answers/",
    "title": "delete an answer",
    "name": "DeleteAnswer",
    "group": "Answer",
    "permission": [
      {
        "name": "connected",
        "title": "user need to be connected to have permision",
        "description": "<p>Need to be connected</p>"
      }
    ],
    "description": "<p>delete an answer by is id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the answer to delet</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "204",
            "description": "<p>No content</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/answers.js",
    "groupTitle": "Answer",
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/answers/",
    "title": "get all answer",
    "name": "GetAnswerAll",
    "group": "Answer",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>get data of all answer</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>id of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dateAnswer",
            "description": "<p>date of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contentAnswer",
            "description": "<p>content of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAnonymous",
            "description": "<p>indicates if the answer is published anonymously or not</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ownerAnswer",
            "description": "<p>id of the user who wrote the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idLikesAnswer",
            "description": "<p>Array of id of users who liked the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "tagsAnswer",
            "description": "<p>Array of id of tags attached to the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "idProp",
            "description": "<p>id of the proposition linked to the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idReport",
            "description": "<p>Array of id of user who report the proposition</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/answers.js",
    "groupTitle": "Answer"
  },
  {
    "type": "get",
    "url": "/answers/:id",
    "title": "get answer by id",
    "name": "GetAnswerById",
    "group": "Answer",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>get data of answer by is id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the answer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>id of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dateAnswer",
            "description": "<p>date of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contentAnswer",
            "description": "<p>content of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAnonymous",
            "description": "<p>indicates if the answer is published anonymously or not</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ownerAnswer",
            "description": "<p>id of the user who wrote the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idLikesAnswer",
            "description": "<p>Array of id of users who liked the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "tagsAnswer",
            "description": "<p>Array of id of tags attached to the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idReport",
            "description": "<p>Array of id of user who report the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "idProp",
            "description": "<p>id of the proposition linked to the answer</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/answers.js",
    "groupTitle": "Answer"
  },
  {
    "type": "post",
    "url": "/answers/",
    "title": "create an answer",
    "name": "PostAnswer",
    "group": "Answer",
    "permission": [
      {
        "name": "connected",
        "title": "user need to be connected to have permision",
        "description": "<p>Need to be connected</p>"
      }
    ],
    "description": "<p>create an answer with tag if it has and return the answer created. Return the answer created</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contentAnswer",
            "description": "<p>content of the answer</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isAnonymous",
            "description": "<p>indicates if the answer is published anonymously or not</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "idProp",
            "description": "<p>id of the proposition where</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tagsAnswer",
            "description": "<p>tags of the answer. Each tag is separed by a space</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of answer added.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "FieldMissing",
            "description": "<p>content field missing</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/answers.js",
    "groupTitle": "Answer"
  },
  {
    "type": "put",
    "url": "/answers/cancel-report",
    "title": "cancel report answer",
    "name": "PutAnswerCancelReport",
    "group": "Answer",
    "permission": [
      {
        "name": "connected",
        "title": "user need to be connected to have permision",
        "description": "<p>Need to be connected</p>"
      }
    ],
    "description": "<p>cancel report of an answer by is id. delete id of user who report the answer in array of idReport</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the answer to cancel the report</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the answer who the report is canceled</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenAccesDislike",
            "description": "<p>answer is not reported or number number of report equal to 0</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/answers.js",
    "groupTitle": "Answer"
  },
  {
    "type": "put",
    "url": "/answers/like",
    "title": "like an answers",
    "name": "PutAnswerLike",
    "group": "Answer",
    "permission": [
      {
        "name": "connected",
        "title": "user need to be connected to have permision",
        "description": "<p>Need to be connected</p>"
      }
    ],
    "description": "<p>like an answer by is id. insert id of user who like the answer in array of idLikesProp and return thr answer liked</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the answer to like</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the answer liked</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenAccesLike",
            "description": "<p>Answer already like</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/answers.js",
    "groupTitle": "Answer"
  },
  {
    "type": "put",
    "url": "/answers/report",
    "title": "report an answer",
    "name": "PutAnswerReport",
    "group": "Answer",
    "permission": [
      {
        "name": "connected",
        "title": "user need to be connected to have permision",
        "description": "<p>Need to be connected</p>"
      }
    ],
    "description": "<p>report an answer by is id. insert id of user who report the answer in array of idReport and return the id of the proposition.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the answer to report</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the answer reported</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenAccesReport",
            "description": "<p>answer already reported</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/answers.js",
    "groupTitle": "Answer"
  },
  {
    "type": "put",
    "url": "/answers/",
    "title": "update anonymity",
    "name": "PutAnswerUpdate",
    "group": "Answer",
    "permission": [
      {
        "name": "connected",
        "title": "user need to be connected to have permision",
        "description": "<p>Need to be connected</p>"
      }
    ],
    "description": "<p>update anonymity of a answer by is id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the answer to update</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "isAnonymous",
            "description": "<p>indicates if the answer is published anonymously or not</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ownerAnswer",
            "description": "<p>id of the user who write the answer</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the answer updated</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenAcces",
            "description": "<p>unauthorized to update this answer</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/answers.js",
    "groupTitle": "Answer"
  },
  {
    "type": "put",
    "url": "/answers/dislike",
    "title": "dislike an answer",
    "name": "PutAnswerdislike",
    "group": "Answer",
    "permission": [
      {
        "name": "connected",
        "title": "user need to be connected to have permision",
        "description": "<p>Need to be connected</p>"
      }
    ],
    "description": "<p>dislike an answer by is id. insert id of user who dislike the answer in array of idLikesProp and return the answer disliked</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the answer to dislike</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the answer disliked</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenAccesLike",
            "description": "<p>Answer already dislike</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/answers.js",
    "groupTitle": "Answer"
  },
  {
    "type": "delete",
    "url": "/propositions/",
    "title": "delete a proposition",
    "name": "DeleteProposition",
    "group": "Proposition",
    "permission": [
      {
        "name": "connected",
        "title": "user need to be connected to have permision",
        "description": "<p>Need to be connected</p>"
      }
    ],
    "description": "<p>delete a proposition by is id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the propostion to delete</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "204",
            "description": "<p>No content</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenAcces",
            "description": "<p>unauthorized to delete this proposition</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/propositions.js",
    "groupTitle": "Proposition"
  },
  {
    "type": "get",
    "url": "/:id/answers/best",
    "title": "get best answer of a proposition",
    "name": "GetBestAnswerById",
    "group": "Proposition",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>get the best answer of a proposition by is id. Exemple of url : localhost:3001/propositions/5e7b5c847cbb262ef84ab042/answers/best</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the propostion</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>id of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "titleProp",
            "description": "<p>title of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dateAnswer",
            "description": "<p>date of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contentAnswer",
            "description": "<p>content of the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAnonymous",
            "description": "<p>indicates if the answer is published anonymously or not</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ownerAnswer",
            "description": "<p>id of the user who wrote the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idLikesAnswer",
            "description": "<p>Array of id of users who liked the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "tagsAnswer",
            "description": "<p>Array of id of tags attached to the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idReport",
            "description": "<p>Array of id of user who report the answer</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "idProp",
            "description": "<p>id of the proposition linked to the answer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "PropositonNotFound",
            "description": "<p>Proposition not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/propositions.js",
    "groupTitle": "Proposition"
  },
  {
    "type": "get",
    "url": "/propositions/:id",
    "title": "get proposition by id",
    "name": "GetPropositionById",
    "group": "Proposition",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>get data of proposition by is id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the propostion</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>id of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dateProp",
            "description": "<p>date of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contentProp",
            "description": "<p>content of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAnonymous",
            "description": "<p>indicates if the proposition is published anonymously or not</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ownerProp",
            "description": "<p>id of the user who wrote the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idLikesProp",
            "description": "<p>Array of id of users who liked the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "tagsProp",
            "description": "<p>Array of id of tags attached to the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idAnswers",
            "description": "<p>Array of id of answers of to the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idReport",
            "description": "<p>Array of id of user who report the proposition</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "PropositonNotFound",
            "description": "<p>Proposition not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/propositions.js",
    "groupTitle": "Proposition"
  },
  {
    "type": "get",
    "url": "/propositions/sort/:sort",
    "title": "sort propostion by date",
    "name": "GetPropositionSortDate",
    "group": "Proposition",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>sort all propositions by ascending or descending date and tags if it contains.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"asc\"",
              "\"desc\""
            ],
            "optional": false,
            "field": "sort",
            "description": "<p>sort propostion by ascending &quot;asc&quot; or descending &quot;desc&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tag",
            "description": "<p>all tag in insered the parameters of the url. Example : tag=internet. Exemple of url : localhost:3001/propositions/sort/like?tag=internet&amp;tag1=soiree</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>id of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dateProp",
            "description": "<p>date of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contentProp",
            "description": "<p>content of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAnonymous",
            "description": "<p>indicates if the proposition is published anonymously or not</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ownerProp",
            "description": "<p>id of the user who wrote the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idLikesProp",
            "description": "<p>Array of id of users who liked the propositions</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "tagsProp",
            "description": "<p>Array of id of tags attached to the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idAnswers",
            "description": "<p>Array of id of answers of to the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idReport",
            "description": "<p>Array of id of user who report the proposition</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/propositions.js",
    "groupTitle": "Proposition"
  },
  {
    "type": "get",
    "url": "/propositions/sort/like",
    "title": "sort proposition by like",
    "name": "GetPropositionSortLike",
    "group": "Proposition",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>get and sort all propositions by like and tags if it contains.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tag",
            "description": "<p>all tag in insered the parameters of the url. Example : tag=internet. Exemple of url : localhost:3001/propositions/sort/like?tag=internet&amp;tag1=soiree</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>id of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "titleProp",
            "description": "<p>title of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dateProp",
            "description": "<p>date of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contentProp",
            "description": "<p>content of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAnonymous",
            "description": "<p>indicates if the proposition is published anonymously or not</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ownerProp",
            "description": "<p>id of the user who wrote the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idLikesProp",
            "description": "<p>Array of id of users who liked the propositions</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "tagsProp",
            "description": "<p>Array of id of tags attached to the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idAnswers",
            "description": "<p>Array of id of answers of to the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idReport",
            "description": "<p>Array of id of user who report the proposition</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/propositions.js",
    "groupTitle": "Proposition"
  },
  {
    "type": "get",
    "url": "/propositions/",
    "title": "get all proposition",
    "group": "Proposition",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>get data of all proposition</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>id of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "titleProp",
            "description": "<p>title of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dateProp",
            "description": "<p>date of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contentProp",
            "description": "<p>content of the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAnonymous",
            "description": "<p>indicates if the proposition is published anonymously or not</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ownerProp",
            "description": "<p>id of the user who wrote the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idLikesProp",
            "description": "<p>Array of id of users who liked the propositions</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "tagsProp",
            "description": "<p>Array of id of tags attached to the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idAnswers",
            "description": "<p>Array of id of answers of to the proposition</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idReport",
            "description": "<p>Array of id of user who report the proposition</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/propositions.js",
    "groupTitle": "Proposition",
    "name": "GetPropositions"
  },
  {
    "type": "post",
    "url": "/propositions/",
    "title": "create a proposition",
    "name": "PostProposition",
    "group": "Proposition",
    "permission": [
      {
        "name": "connected",
        "title": "user need to be connected to have permision",
        "description": "<p>Need to be connected</p>"
      }
    ],
    "description": "<p>create a proposition with tag if it has.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "titleProp",
            "description": "<p>title of the proposition</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contentProp",
            "description": "<p>content of the propostion</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "isAnonymous",
            "description": "<p>indicates if the proposition is published anonymously or not</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tagsProp",
            "description": "<p>tags of the proposition. Each tag is separed by a space</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of proposition added.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "FieldMissing",
            "description": "<p>title or content is missing</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/propositions.js",
    "groupTitle": "Proposition"
  },
  {
    "type": "put",
    "url": "/propositions/cancel-report",
    "title": "cancel report proposition",
    "name": "PutPropositionCancelReport",
    "group": "Proposition",
    "permission": [
      {
        "name": "connected",
        "title": "user need to be connected to have permision",
        "description": "<p>Need to be connected</p>"
      }
    ],
    "description": "<p>cancel report of a proposition by is id. delete id of user who report the proposition in array of idReport</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the propostion to cancel the report</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenAccesDislike",
            "description": "<p>Proposition is not reported or number number of report equal to 0</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the propostion who the report is canceled</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/propositions.js",
    "groupTitle": "Proposition"
  },
  {
    "type": "put",
    "url": "/propositions/dislike",
    "title": "dislike a proposition",
    "name": "PutPropositionDislike",
    "group": "Proposition",
    "permission": [
      {
        "name": "connected",
        "title": "user need to be connected to have permision",
        "description": "<p>Need to be connected</p>"
      }
    ],
    "description": "<p>dislike a proposition by is id. delete id of user who like the proposition in array of idLikesProp</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the propostion to dislike</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the propostion disliked</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenAccesDislike",
            "description": "<p>Proposition is not liked or number like equal to 0</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/propositions.js",
    "groupTitle": "Proposition"
  },
  {
    "type": "put",
    "url": "/propositions/like",
    "title": "like a proposition",
    "name": "PutPropositionLike",
    "group": "Proposition",
    "permission": [
      {
        "name": "connected",
        "title": "user need to be connected to have permision",
        "description": "<p>Need to be connected</p>"
      }
    ],
    "description": "<p>like a proposition by is id. insert id of user who like the proposition in array of idLikesProp and return the proposition liked</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the propostion to like</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the propostion liked</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenAccesLike",
            "description": "<p>Proposition already like</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/propositions.js",
    "groupTitle": "Proposition"
  },
  {
    "type": "put",
    "url": "/propositions/report",
    "title": "report a proposition",
    "name": "PutPropositionReport",
    "group": "Proposition",
    "permission": [
      {
        "name": "connected",
        "title": "user need to be connected to have permision",
        "description": "<p>Need to be connected</p>"
      }
    ],
    "description": "<p>report a proposition by is id. insert id of user who report the proposition in array of idReport and return the id of the proposition.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the propostion to report</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the propostion reported</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenAccesReport",
            "description": "<p>Proposition already reported</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/propositions.js",
    "groupTitle": "Proposition"
  },
  {
    "type": "put",
    "url": "/propositions/",
    "title": "update anonymity",
    "name": "PutPropositionUpdate",
    "group": "Proposition",
    "permission": [
      {
        "name": "connected",
        "title": "user need to be connected to have permision",
        "description": "<p>Need to be connected</p>"
      }
    ],
    "description": "<p>update anonimity of a proposition by is id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the propostion</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "isAnonymous",
            "description": "<p>indicates if the proposition is published anonymously or not</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ownerProp",
            "description": "<p>id of the user who write the proposition</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the proposition updated</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenAcces",
            "description": "<p>unauthorized to update this proposition</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/propositions.js",
    "groupTitle": "Proposition"
  },
  {
    "type": "delete",
    "url": "/tags/",
    "title": "delete a tag",
    "name": "DeleteTag",
    "group": "Tag",
    "permission": [
      {
        "name": "connected",
        "title": "user need to be connected to have permision",
        "description": "<p>Need to be connected</p>"
      }
    ],
    "description": "<p>delete a tag by is id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the tag to delete</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "toDelete",
            "description": "<p>id of the proposition or answer that contains th tag to delete</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "204",
            "description": "<p>No content</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/tags.js",
    "groupTitle": "Tag",
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/tags/",
    "title": "get all tag",
    "name": "GetTagAll",
    "group": "Tag",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>get data of all tag</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>label of the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "nbOccurence",
            "description": "<p>number of occurence of the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idProps",
            "description": "<p>Array of id of propositions that contains the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idAnswers",
            "description": "<p>Array of id of that contains the tag</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/tags.js",
    "groupTitle": "Tag"
  },
  {
    "type": "get",
    "url": "/tags/:id",
    "title": "get tag by id",
    "name": "GetTagById",
    "group": "Tag",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>get tag by id</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>label of the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "nbOccurence",
            "description": "<p>number of occurence of the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idProps",
            "description": "<p>Array of id of propositions that contains the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idAnswers",
            "description": "<p>Array of id of that contains the tag</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "TagNotFound",
            "description": "<p>Tag not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/tags.js",
    "groupTitle": "Tag"
  },
  {
    "type": "get",
    "url": "/tags/best",
    "title": "9 frequent tags",
    "name": "GetTagsBest",
    "group": "Tag",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>get 9 most frequent tags. Frequency is define by the number of occurence of the tag</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>label of the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "nbOccurence",
            "description": "<p>number of occurence of the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idProps",
            "description": "<p>Array of id of propositions that contains the tag</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idAnswers",
            "description": "<p>Array of id of that contains the tag</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/tags.js",
    "groupTitle": "Tag"
  },
  {
    "type": "get",
    "url": "/users/",
    "title": "get all",
    "name": "GetUser",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>get all user</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pseudo",
            "description": "<p>pseudo of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>mail of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>empty password of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>city of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>indicates if user is admin or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isConnected",
            "description": "<p>indicates if user is connected or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isBanned",
            "description": "<p>indicates if user is banned or not</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idPropositions",
            "description": "<p>Array of id of the user s propositions</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idAnswers",
            "description": "<p>Array of id of the user s answer</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "get by id",
    "name": "GetUserbyId",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>get data of user by is id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pseudo",
            "description": "<p>pseudo of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>mail of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>empty password of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>city of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isAdmin",
            "description": "<p>indicates if user is admin or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isConnected",
            "description": "<p>pseudo indicates if user is connected or not</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "isBanned",
            "description": "<p>indicates if user is banned or not</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "idPropositions",
            "description": "<p>Array of id of the user s propositions</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "Array",
            "description": "<p>of id of the user s answer</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/",
    "title": "register",
    "name": "PostUser",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>register a user and save it in database</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pseudo",
            "description": "<p>pseudo of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>mail of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "optional": false,
            "field": "NoContent",
            "description": "<p>NoContent</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidPorM",
            "description": "<p>Pseudo or mail already exist</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "FiedMissing",
            "description": "<p>field pseudo,password or mail is not filled</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/authenticate",
    "title": "authenticate",
    "name": "PostUserAuthenticate",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>authenticates a user and change set isConnected to true</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pseudo",
            "description": "<p>pseudo of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token for authentication with user information in it</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidPassword",
            "description": "<p>Invalid password</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InvalidPseudo",
            "description": "<p>Invalid pseudo</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "ForbiddenBanned",
            "description": "<p>User is banned</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "FiedMissing",
            "description": "<p>field pseudo or password is not filled</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/password/change",
    "title": "change password",
    "name": "PutUserChangePassword",
    "group": "User",
    "permission": [
      {
        "name": "connected",
        "title": "user need to be connected to have permision",
        "description": "<p>Need to be connected</p>"
      }
    ],
    "description": "<p>change password of the connected user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>the old password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>the new password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>the confirmed password. Need to be exactly the same than the new password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "204",
            "description": "<p>No content</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "InvalidPassword",
            "description": "<p>Invalid password</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "PasswordNotMatch",
            "description": "<p>new and confirm password don't match</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "422": [
          {
            "group": "422",
            "optional": false,
            "field": "FiedMissing",
            "description": "<p>field oldPassword, newPassword or confirmPassword is not filled</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/logout",
    "title": "logout",
    "name": "PutUserLogout",
    "group": "User",
    "permission": [
      {
        "name": "connected",
        "title": "user need to be connected to have permision",
        "description": "<p>Need to be connected</p>"
      }
    ],
    "description": "<p>logout a user</p>",
    "success": {
      "fields": {
        "204": [
          {
            "group": "204",
            "optional": false,
            "field": "204",
            "description": "<p>No content</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\": \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "router/users.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "TokenMissing",
            "description": "<p>Token not found in header</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "AuthenticateTokenFail",
            "description": "<p>Failed to authenticate token</p>"
          },
          {
            "group": "500",
            "optional": false,
            "field": "TokenExpired",
            "description": "<p>Token provided is expired</p>"
          }
        ]
      }
    }
  }
] });
