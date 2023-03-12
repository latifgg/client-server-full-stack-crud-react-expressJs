const baseUrl = "http://localhost:3050"

export const getPosts = async () => {
  try {
    const response = await fetch(`${baseUrl}/posts`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts")
  }
};

export const createPost = async (pNewPost) => {
  try {
    const response = await fetch(`${baseUrl}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pNewPost),
    });
    if (!response.ok) {
      throw new Error("Failed to create post");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await fetch(`${baseUrl}/posts/${postId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updatePost = async (postId, updatedPost) => {
  try {
    const response = await fetch(`${baseUrl}/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });
    if (!response.ok) {
      throw new Error("Failed to update post");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const generateFakePost = async () => {
  try {
    const response = await fetch(`${baseUrl}/posts/fake`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    if (!response.ok) {
      throw new Error("Failed to create post");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}