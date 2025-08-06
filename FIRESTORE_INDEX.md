# Firestore Index Setup

## Required Index for Test Cases

When using the application, you may encounter an error message like this:

```
The query requires an index. You can create it here: https://console.firebase.google.com/v1/r/project/dsa-project-c2f68/firestore/indexes?create_composite=...
```

## How to Fix

1. Click on the link provided in the error message. This will take you to the Firebase Console.

2. If prompted, sign in with the Google account that has access to your Firebase project.

3. The Firebase Console will open with a pre-configured index creation form. It should look something like this:

   - **Collection ID**: `test_cases`
   - **Fields indexed**:
     - `problem_id` (Ascending)
     - `order_index` (Ascending)

4. Click the "Create index" button to create the required index.

5. The index creation process may take a few minutes. Once complete, the application will be able to query test cases with both filtering and ordering.

## Why This Is Needed

Firestore requires composite indexes when you perform queries that:

1. Filter on one or more fields, AND
2. Order the results by a different field

In our application, we're filtering test cases by `problem_id` and ordering them by `order_index`, which requires this composite index.

## Fallback Behavior

The application includes a fallback mechanism that will still work even without the index, but creating the index is recommended for optimal performance.

## Additional Resources

- [Firestore Indexes Documentation](https://firebase.google.com/docs/firestore/query-data/indexing)
- [Single-Field Index Limitations](https://firebase.google.com/docs/firestore/query-data/index-overview#single-field_index_limitations)