export async function getBlogByYear(queryCollection) {
  const query = queryCollection('blog')
  const blogs = await query.order('stem', 'DESC').select('title','description','meta','slug','tags','categories').all();

  var tempObj = {};
  var blog_by_year = [];
  for (let m = 0; m < blogs.length; m++) {
    let year = blogs[m].meta.date.substring(0,4);
    if (!tempObj[year]) {
      tempObj[year] = [];
    }
    tempObj[year].push(blogs[m]);
  }
  var key_arr = Object.keys(tempObj);
  for (let n = 0; n < key_arr.length; n++) {
    blog_by_year.push(tempObj[key_arr[key_arr.length - 1 - n]]);
  }

  return {
    blog_by_year
  }
}