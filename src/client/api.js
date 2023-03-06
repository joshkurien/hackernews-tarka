const uriPrefix =  import.meta.env.VITE_API_HOST +'/v0/';

function Item(id) {
  return getCall(uriPrefix + 'item/' + id + '.json');
}

function NewStories() {
  return getCall(uriPrefix + 'newstories.json');
}

async function getCall(url) {
  const res = await fetch(url);
  const data = await res.json()
  return data
}

export { Item, NewStories };
