import { unstable_cache } from 'next/cache'
import { db, posts } from '@/lib/db'
 
const getPosts = unstable_cache(
  async () => {
    return await db.select().from(posts)
  },
  ['posts'],
  { revalidate: 3600, tags: ['posts'] }
)
 
export default async function Page() {
  const allPosts = await getPosts()
 
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
