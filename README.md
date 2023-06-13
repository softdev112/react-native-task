# React Native Interview Task

Implement a react native app with three pages: list posts, view post with comments and add post. 
Reuse as many components as possible between pages.
The app should look good and be comfortable to use and understand (UX will be evaluated).

Use the following API:      `https://jsonplaceholder.typicode.com/`

List posts endpoint: (GET) `https://jsonplaceholder.typicode.com/posts`

Add post endpoint: (POST) `https://jsonplaceholder.typicode.com/posts`

Get comments for post: (GET) `https://jsonplaceholder.typicode.com/posts/1/comments`

## List view page:
Show a scrollable list of posts
Show only the title and body values
Users should be able to scroll through the list and tap any post to open the post details page
## Post details page:
Show post content with the comments
There should be a button to return to the post listing page
## Create post page:
Create post page should contain the following fields:
- Title (title)
- Message: (body)
- userId: 1 (not visible, fixed value)
Input values should be validated
Once the form is submitted navigate to the list page

## Extra credits:
- Use typescript
- Searching on the listing page (in title or content)
- Update post page
- Implement navigation with https://reactnavigation.org/
