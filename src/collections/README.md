## How to add new collections, and when to do so

Collections are the main way to organize your data in a structured way. They are a way to group similar data together, and to make it easier to find and work with that data.

Please follow these steps to add a new collection [also see the documention on fields by Payload](https://payloadcms.com/docs/fields/overview)

### Example

Let's say we want to add a new collection for `Events`. We would create a new file in the `collections` directory called `events.js` and add the following code:

```ts
// src/collections/events.ts
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  /**
   * Each array element is a different field for the
   */
  fields: [
    {
      name: 'age',
      type: 'number',
    },
    // Email added by default
    // Add more fields as needed
  ],
}
```


