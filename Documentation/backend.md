# Backend Documentation

## Overview

Since this version of the application does not use a backend or database, all data is stored in the browser’s memory using React’s state management.

## State Management

- **Library**: React’s built-in state management (`useState` and `useContext`).
- **Reason**: Simple and sufficient for managing posts in memory.

## Data Structure

- **Posts**: An array of post objects, where each post has the following structure:
  ```javascript
  {
    id: string, // Unique ID for the post
    title: string, // Post title
    content: string, // Post content
    imageUrl: string // URL of the post image
  }
  ```
