const uriPrefix = 'https://hacker-news.firebaseio.com/v0/';

function Item(id) {
  return getCall(uriPrefix + 'item/' + id + '.json');
}

function TopStories() {
  return getCall(uriPrefix + 'newstories.json');
}

async function getCall(url) {
  const res = await fetch(url);
  const data = await res.json()
  return data
}

export { Item, TopStories };
