> ## About this repo
> 
> Each branch represents the steps to reproduce an issue with strapi as commits.
> 
> Please check all commits on the branch you inspect - they list atomically all steps taken, from > creating a new project -> to the actual issue that is observable in this last commit in the branch.

## The issue:

Basically, the issue is deleting a document of ContentType that has one-way (and 1:1, which is the only option in strapi right now) relation to another ContentType.

The issue might be reproducible by an even simpler setup, but this is how I first saw it.

## Setup

 * OS X     10.12.6;
 * NodeJS:  9.11.2;
 * NPM:     5.6.0;
 * Strapi:  3.0.0-alpha.12.6;

## Procedure to reproduce the problem:

Once you have started strapi (the db it creates is named the same as this branch) and created your admin user, please follow these instructions to reproduce the problem.

1. Give all permissions on all custom content types to the Public user-role.

2. Create new user on the terminal with curl:

```shell
curl -X POST http://localhost:1337/owner | xargs -0 node -e "console.log (JSON.stringify (JSON.parse (process.argv [1]), null, 4))"
```

You should see an output similar to this:

```json
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   331  100   331    0     0  17118      0 --:--:-- --:--:-- --:--:-- 17421
{
    "_id": "5b3c9c36e0f2a4f988230f97",
    "ownedarray": {
        "_id": "5b3c9c36e0f2a4f988230f98",
        "createdAt": "2018-07-04T10:06:46.884Z",
        "updatedAt": "2018-07-04T10:06:46.884Z",
        "__v": 0,
        "items": null,
        "id": "5b3c9c36e0f2a4f988230f98"
    },
    "createdAt": "2018-07-04T10:06:46.885Z",
    "updatedAt": "2018-07-04T10:06:46.888Z",
    "__v": 0,
    "id": "5b3c9c36e0f2a4f988230f97"
}
```

3. Get the id from the root item (in this case `5b3c9c36e0f2a4f988230f97`) and delete the item with curl:

```shell
curl -X DELETE http://localhost:1337/owner/5b3c9c36e0f2a4f988230f97 | xargs -0 node -e "console.log (JSON.stringify (JSON.parse (process.argv [1]), null, 4))"
```

You should get an output similar to this:

```json
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    96  100    96    0     0   3239      0 --:--:-- --:--:-- --:--:--  3310
{
    "message": "An internal server error occurred",
    "statusCode": 500,
    "error": "Internal Server Error"
}
```

And in the logs of Strapi there should be an error like this one:

```
[2018-07-04T10:09:47.424Z] debug DELETE /owner (1 ms)
[2018-07-04T10:10:14.378Z] info Deleted Owner with _id:5b3c9c36e0f2a4f988230f97.
[2018-07-04T10:10:14.379Z] info -->Deleting ownedarray with _id:5b3c9c36e0f2a4f988230f98
{ MongoError: '$pull' is empty. You must specify a field like so: {$pull: {<field>: ...}}
    at Function.MongoError.create (/path/to/strapi-issues/node_modules/mongodb-core/lib/error.js:49:10)
    at toError (/path/to/strapi-issues/node_modules/mongodb/lib/utils.js:149:22)
    at coll.s.topology.update (/path/to/strapi-issues/node_modules/mongodb/lib/operations/collection_ops.js:1350:39)
    at /path/to/strapi-issues/node_modules/mongodb-core/lib/connection/pool.js:531:18
    at process._tickCallback (internal/process/next_tick.js:176:11)
  name: 'MongoError',
  message: '\'$pull\' is empty. You must specify a field like so: {$pull: {<field>: ...}}',
  driver: true,
  index: 0,
  code: 9,
  errmsg: '\'$pull\' is empty. You must specify a field like so: {$pull: {<field>: ...}}',
  [Symbol(mongoErrorContextSymbol)]: {} }
```

Testing deletion of a document of the Owned ContentType, doesn't result in this error.
