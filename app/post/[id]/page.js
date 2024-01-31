import Post from '@/app/components/Post';

export async function generateMetadata({ params, searchParams }) {
  const post = await fetchPost(params.id);
  return {
    title: `${post.title} - Статья на сайте`,
    description: post.body,
  };
}

async function fetchPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const result = await res.json();
  return result;
}

export async function generateStaticParams() {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(
    (res) => res.json()
  );

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

const PostPage = async ({ params: { id } }) => {
  const post = await fetchPost(id);

  return <Post post={post} />;
};

export default PostPage;
