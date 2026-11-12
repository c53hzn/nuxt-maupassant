export async function getLatest5(queryCollection) {
  const query = queryCollection('blog')
  const latestBlog = await query.order('stem', 'DESC').limit(5).select('title','slug').all()
  
  return {
    latestBlog
  }
}