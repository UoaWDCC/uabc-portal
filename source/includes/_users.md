# Users

## Get all Users

> **Request**:

> - Header:

```plaintext
  session: next-auth.session-token (needs admin role)
```

> **Response**:

> - Body:

```json
  [
    {
      "id": "9b0324c4-862c-48e5-8ce6-b470d4629860",
      "firstName": "Eric",
      "lastName": "Zheng",
      "email": "airwreck@gmail.com"
    },
    {
      "id": "a203e353-fd23-444d-91ba-27c4a036e8d0",
      "firstName": "Darrell",
      "lastName": "Herzog",
      "email": "Ike.Mills22@yahoo.com"
    }
  ]
```

This endpoint allows admins to get a JSON containing the first name, last name, email address and unique ID of every member that has created an account.

### HTTP Request

`GET https://wdcc-uabc-staging.fly.dev/api/users`

### Query Parameters

Query | Description
--------- | -----------
semesterId | Integer representation of semesterId

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
200 | Ok | null
403 | Forbidden | ERROR: No valid permissions
500 | Internal Server Error | Internal server error

## Get Specific User

> **Request**:

> - Header:

```plaintext
  session: next-auth.session-token (needs admin role)
```

> **Response**:

> - Body:

```json
  {
    "id": "9b0324c4-862c-48e5-8ce6-b470d4629860",
    "firstName": "Eric",
    "lastName": "Zheng",
    "email": "airwreck@gmail.com",
    "member": false,
    "verified": false,
    "prepaidSessions": 0
  }
```

This endpoint allows admins to get all the relevant information related to a user using their unique userId.

### HTTP Request

`GET https://wdcc-uabc-staging.fly.dev/api/users/<userId>`

### Query Parameters

Query | Description
--------- | -----------
userId | String representation of userId

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
200 | Ok | null
401 | Unauthorized | ERROR: Unauthorized request
403 | Forbidden | ERROR: No valid permissions
404 | Not Found | No User found for id: `${userId}`
500 | Internal Server Error | Internal server error

## Delete Specific User

> **Request**:

> - Header:

```plaintext
  session: next-auth.session-token (needs admin role)
```

This endpoint allows admins to delete a user using their unique userId.

### HTTP Request

`DELETE https://wdcc-uabc-staging.fly.dev/api/users/<userId>`

### Query Parameters

Query | Description
--------- | -----------
userId | String representation of userId

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
204 | No Content | null
401 | Unauthorized | ERROR: Unauthorized request
403 | Forbidden | ERROR: No valid permissions
404 | Not Found | No User found for id: `${userId}`
500 | Internal Server Error | Internal server error

## Onboarding User

> **Request**:

> - Header:

```plaintext
  session: next-auth.session-token (needs to be the session token the user `${userId}` has)
```

> - Body:

```json
  {
    "firstName": "Eric",
    "lastName": "Zheng",
    "member": true
  }
```

This endpoint allows users to onboard themself without having to go through the long and tedious onboarding process.

### HTTP Request

`PATCH https://wdcc-uabc-staging.fly.dev/api/users/<userId>/onboard`

### Query Parameters

Query | Description
--------- | -----------
userId | String representation of userId

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
204 | No Content | null
400 | Bad Request | multiple possible messages  
401 | Unauthorized | ERROR: Unauthorized request
403 | Forbidden | ERROR: No valid permissions
404 | Not Found | No User found for id: `${userId}`
500 | Internal Server Error | Internal server error

## Approve User Membership:

> **Request**:

> - Header:

```plaintext
  session: next-auth.session-token (needs admin role)
```

> - Body:

```json
  {
    "prepaidSessions": 74
  }
```

This endpoint allows admins to approve a user's membership and allocates them the pre-paid sessions that they have paid for. If the endpoint call is successful, the "verified" column of the user will be toggled to `TRUE`.

### HTTP Request

`PATCH https://wdcc-uabc-staging.fly.dev/api/users/<userId>/membership/approve`

### Query Parameters

Query | Description
--------- | -----------
userId | String representation of userId

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
204 | No Content | null
401 | Unauthorized | ERROR: Unauthorized request
403 | Forbidden | ERROR: No valid permissions
404 | Not Found | No User found for id: `${userId}`
500 | Internal Server Error | Internal server error

## Reject User Membership:

> **Request**:

> - Header:

```plaintext
  session: next-auth.session-token (needs admin role)
```

> - Body:

```json
  {
    "prepaidSessions": 74
  }
```

This endpoint allows admins to reject a user's membership. If the endpoint call is successful, the "member" column of the user will be toggled to `FALSE`.

### HTTP Request

`PATCH https://wdcc-uabc-staging.fly.dev/api/users/<userId>/membership/approve`

### Query Parameters

Query | Description
--------- | -----------
userId | String representation of userId