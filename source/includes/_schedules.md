# Schedules
## Get Schedule Data

> **Response**:

> - Body:

```json
  {
    "id": 346,
    "semesterId": 137,
    "weekday": "Tuesday",
    "startTime": "18:00:00",
    "endTime": "20:00:00",
    "locationName": "Kings College",
    "locationAddress": "123 University Road, Auckland",
    "memberCapacity": 40,
    "casualCapacity": 5
  }
```

This endpoint allows users to get all the relevant information of any scheduled game session in a semester with the corresponding scheduleId.

### HTTP Request

`GET https://wdcc-uabc-staging.fly.dev/api/schedules/<scheduleId>`

### Query Parameters

Query | Description
--------- | -----------
scheduleId | Integer representation of scheduleId

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
200 | Ok | null
404 | Not Found | No GameSessionSchedule found for id: `${scheduleId}`
500 | Internal Server Error | Internal server error

## Edit Schedule Data

> **Request**:

> - Header:

```plaintext
  session: next-auth.session-token (needs admin role)
```

> - Body:

```json
  {
    "id": 346,
    "semesterId": 137,
    "weekday": "Tuesday",
    "startTime": "19:00:00",
    "endTime": "20:00:00",
    "locationName": "Kings College",
    "locationAddress": "123 University Road, Auckland",
    "memberCapacity": 40,
    "casualCapacity": 5
  }
```

> **Response**:

> - Body:

```json
  [
    {
      "id": 346,
      "semesterId": 137,
      "weekday": "Tuesday",
      "startTime": "19:00:00",
      "endTime": "20:00:00",
      "locationName": "Kings College",
      "locationAddress": "123 University Road, Auckland",
      "memberCapacity": 40,
      "casualCapacity": 5
    }
  ]
```

This endpoint allows admins to edit relevant information of any scheduled game session in a semester with the corresponding scheduleId.

### HTTP Request

`PUT https://wdcc-uabc-staging.fly.dev/api/schedules/<scheduleId>`

### Query Parameters

Query | Description
--------- | -----------
scheduleId | Integer representation of scheduleId

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
200 | Ok | null
400 | Bad Request | multiple possible messages e.g. "Start time must be before end time", "No GameSessionSchedule found for id: `scheduleId`"
401 | Unauthorized | ERROR: Unauthorized request
403 | Forbidden | ERROR: No valid permissions
500 | Internal Server Error | Internal server error

## Delete Schedule Data

> **Request**:

> - Header:

```plaintext
  session: next-auth.session-token (needs admin role)
```

```json
  {
    "id": 346,
    "semesterId": 137,
    "weekday": "Tuesday",
    "startTime": "19:00:00",
    "endTime": "20:00:00",
    "locationName": "Kings College",
    "locationAddress": "123 University Road, Auckland",
    "memberCapacity": 40,
    "casualCapacity": 5
  }
```

> **Response**:

> - Body:

```json
  [
    {
      "id": 346,
      "semesterId": 137,
      "weekday": "Tuesday",
      "startTime": "19:00:00",
      "endTime": "20:00:00",
      "locationName": "Kings College",
      "locationAddress": "123 University Road, Auckland",
      "memberCapacity": 40,
      "casualCapacity": 5
    }
  ]
```

This endpoint allows admins to delete any scheduled game session in a semester with the corresponding scheduleId.

### HTTP Request

`DELETE https://wdcc-uabc-staging.fly.dev/api/schedules/<scheduleId>`

### Query Parameters

Query | Description
--------- | -----------
scheduleId | Integer representation of scheduleId

### Errors

Status Code | Error Code | Message
--------- | ------- | -----------
204 | No Content | null
400 | Bad Request | No GameSessionSchedule found for id: `${scheduleId}`
401 | Unauthorized | ERROR: Unauthorized request
403 | Forbidden | ERROR: No valid permissions
500 | Internal Server Error | Internal server error
