# JsonQL

Taking design patterns from GraphQL and simplifying them. For fun and education...

## Design Patterns

Things I like about GraphQL:

- One request, multiple queries, even all the data that is needed
- Schema definition for API / abstraction for the model of data

These are the design patterns that JsonQL implements.

## Query Language

Just plain old JSON with pre-defined fields for querying (and defining schema).

### Example Query

```json
{
  "messages": {
    "inputs": {
      "channel": "main"
    },
    "fields": [
      "value",
      {
        "name": "user",
        "fields": ["name"]
      }
    ]
  },
  "users": {
    "fields": ["name"]
  }
}
```

There is no query, mutations or subscriptions. All queries are defined in the same block.

- `messages` and `users` are defined query endpoints / resolvers
- `inputs` are arguments for the handler function
- `fields` are fields that should be returned. They can take two different forms:
  1. string => atomic field
  2. object of type: { name: string, fields: string | <type of this object> } => recursive definition, referencing another value type

Corresponding graphql query would be:

```graphql
query {
  messages(channel: "main") {
    value
    user {
      name
    }
  }
  users {
    name
  }
}
```

### Example Schema

```json
{
  "types": {
    "message": {
      "fields": [
        "value",
        {
          "name": "user",
          "type": "user"
        }
      ]
    },
    "user": {
      "fields": ["name"]
    }
  },
  "model": {
    "messages": {
      "inputTypes": [
        {
          "name": "channel",
          "type": "string",
          "optional": true
        }
      ],
      "output": {
        "type": "message",
        "isList": true
      }
    },
    "users": {
      "inputTypes": [],
      "output": {
        "type": "user",
        "isList": true
      }
    }
  }
}
```

- `types` defines possible output types. Here `message` and `user`. Those have one field: "fields" that has either string or object of type: { name: string, type: string }, which reference another type.
- `model` defines the possible query endpoints. Here `messages` and `users`. Those define input parameters and output type.

Corresponding GraphQL schema would be:

```graphql
type User {
  name: String
}

type Message {
  value: String
  user: User
}

type Query {
  messages(channel: String): [Message]
  users: [User]
}
```

There is no code for generating schema from that JSON, so it's there more for illustration purposes. This is just how the schema has been defined / used in [ts-jsonql](./packages/ts-jsonql).

But having build to output that JSON would lend itself to writing backend with different language than the frontend. In [messageboard -example](./examples/messageboard) it, obviously, makes sense to just use same TypeScript definitions in frontend and backend, when both of them are implemented using TypeScript.

## Structure of Repository

- [ts-jsonql](./packages/ts-jsonql) contains example implementation with TypeScript.
- [messageboard](./examples/messageboard) contains example use case for it.

[ts-jsonql](./packages/ts-jsonql) contains only pure functions, which shows that the abstraction / design patters that are in the core of this, do not require any network related code.

## Running Examples with Docker

Build images in the root of this repository:

```bash
docker build -t messageboard-frontend -f examples/messageboard/frontend/Dockerfile .
docker build -t messageboard-backend -f examples/messageboard/backend/Dockerfile .
```

Run with docker-compose in root of this repository:

```bash
docker-compose -f examples/messageboard/docker-compose.yaml up
```

Site is available at [localhost:8080](http://localhost:8080).
