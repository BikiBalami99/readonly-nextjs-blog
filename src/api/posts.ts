type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type Comment = {
  id: number;
  email: string;
  body: string;
};

export async function getPosts() {
  return fetch(`${process.env.API_URL}/posts`)
    .then((res) => res.json())
    .then((data) => data as Post[]);
}

export async function getUserPosts(userId: string | number) {
  return fetch(`${process.env.API_URL}/posts?userId=${userId}`)
    .then((res) => res.json())
    .then((data) => data as Post[]);
}

export async function getSpecificPost(postId: string | number) {
  return fetch(`${process.env.API_URL}/posts/${postId}`)
    .then((res) => res.json())
    .then((data) => data as Post);
}

export async function getComments(postId: string | number) {
  return fetch(`${process.env.API_URL}/posts/${postId}/comments`)
    .then((res) => res.json())
    .then((data) => data as Comment[]);
}

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
