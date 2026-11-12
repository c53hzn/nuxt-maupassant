export async function getContentByPage(queryCollection, currentPage, perPage) {
  const query = queryCollection('blog')
  const allPosts = await query.order('stem', 'DESC').select("meta","description","title","slug","tags","categories").all()

  //获取总条目数（带相同过滤条件）
  const totalCount = allPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));

  //修正页码（防止超出范围）
  const validPage = Math.min(Math.max(currentPage, 1), totalPages);

  //计算跳过条数并获取当前页数据
  const skip = (validPage - 1) * perPage;

  const paginatedArticles = allPosts.slice(skip,skip+perPage)

  return {
    totalPages,
    paginatedArticles,
  }
}