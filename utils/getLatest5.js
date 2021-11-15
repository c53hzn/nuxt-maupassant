export default async ($content) => {
  const latestBlog = await $content('blog')
  .sortBy("date","desc")
  .limit(5)
  .only(['title','slug'])
  .fetch();

  return {
    latestBlog
  }
}