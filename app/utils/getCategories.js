export async function getCategories(queryCollection) {
  const query = queryCollection('blog')
  const arr = await query.order('stem', 'DESC').select('meta','slug','categories').all(); 

  //get list of all available categories and number of blogs inside each category
  var categoryObj = {};

  for (let i = 0; i < arr.length; i++) {
    if (i == 0) {
      expand(arr[i].categories);
    } else {   
      if (arr[i].slug != arr[i-1].slug) {
        if (!arr[i].categories) {
          console.log(arr[i])
        }
        expand(arr[i].categories);
      }
    }
  }

  function expand(categories) {
    for (let j = 0; j < categories.length; j++) {
      if (categoryObj[categories[j]]) {
        categoryObj[categories[j]]++;
      } else {
        categoryObj[categories[j]] = 1;
      }
    }
  }

  var categoryNames = Object.keys(categoryObj);
  var categories = [];
  for (let i = 0; i < categoryNames.length; i++) {
    categories[i] = {
      name: categoryNames[i],
      len: categoryObj[categoryNames[i]]
    };
  }

  return {
    categories
  }
}