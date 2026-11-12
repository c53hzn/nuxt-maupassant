export async function getTags(queryCollection) {
  const query = queryCollection('blog')
  const arr = await query.order('stem', 'DESC').select('slug','tags').all(); 

  //get list of all available tags and number of blogs inside each tag
  var tagObj = {};

  for (let i = 0; i < arr.length; i++) {
    if (i == 0) {
      tagExpand(arr[i].tags);
    } else {   
      if (arr[i].slug != arr[i-1].slug) {
        if (!arr[i].tags) {
          console.log(arr[i])
        }
        tagExpand(arr[i].tags);
      }
    }
  }

  function tagExpand(tags) {
    for (let j = 0; j < tags.length; j++) {
      if (tagObj[tags[j]]) {
        tagObj[tags[j]]++;
      } else {
        tagObj[tags[j]] = 1;
      }
    }
  }

  var tagNames = Object.keys(tagObj);
  var tags = [];
  for (let i = 0; i < tagNames.length; i++) {
    tags[i] = {
      name: tagNames[i],
      len: tagObj[tagNames[i]]
    };
  }

  return {
    tags
  }
}