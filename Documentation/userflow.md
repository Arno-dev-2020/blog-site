# User Flow Documentation

## Onboarding Flow

1. **Landing Page**: Users land on the home page, which displays all posts in a gallery view.
2. **Create Post**: Users click a "Create Post" button to open the post creation form.

## Core User Journey

1. **Create Post**:

   - User fills out the form (title, content, image URL).
   - Image loads dynamically from the provided URL.
   - User submits the form, and the post appears in the gallery.

2. **View Posts**:

   - Posts are displayed in a grid layout, with the newest posts first.
   - Each post shows the image, title, and a preview of the content.

3. **Edit/Delete Posts**:
   - Users can click an "Edit" button to modify a post’s title, content, or image URL.
   - Users can click a "Delete" button to remove a post.

## Error Handling

- **Invalid Image URL**: Display a placeholder image or error message.
- **Empty Fields**: Prevent form submission and display validation errors.

## Edge Cases

- **No Posts**: Display a message encouraging the user to create their first post.
- **Offline Mode**: Not applicable since posts are stored in memory.
