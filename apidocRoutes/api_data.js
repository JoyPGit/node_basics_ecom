define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/items/create",
    "title": "Create Item",
    "version": "0.0.1",
    "group": "create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>, send a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>, send a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "colour",
            "description": "<p>, send a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>, send a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>, send a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\nerror: \"false\",\nmessage:\"item created successfully\"\nstatus:\"200\"\ndata:{\n  itemId: itemId, //this. wasn't used\n        name: \"string\",\n        description:\"string\",\n        color:\"string\",\n        category: \"string\",\n        added:\"date\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/route.js",
    "groupTitle": "create",
    "name": "PostApiV1ItemsCreate"
  }
] });
