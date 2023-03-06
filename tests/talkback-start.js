import talkback from "talkback/es6"

let talkbackInstance
const host = "https://hacker-news.firebaseio.com"

const nameFunc = function(id, tape) {
  let url = tape.req.url.slice(4,-5)
  return(url + '-' + id)
}

module.exports = function talkbackStart() {
  if (!talkbackInstance) {
    talkbackInstance = talkback({
      host: host,
      name: "API playback",
      port: 9090,
      path: __dirname + "/tapes",
      tapeNameGenerator: nameFunc,
      ignoreHeaders: ["user-agent", "referer", "accept", "accept-encoding", "connection"]
    })

    talkbackInstance.start()
  }

  return talkbackInstance
}