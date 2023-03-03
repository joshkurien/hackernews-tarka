import { useState, useEffect, useMemo } from 'react'
import { Item, TopStories } from './client/api.js'
import Table from './components/table/Table'
import ColumnData from './components/table/Columns.jsx'
import './App.css'

function App() {
  const [articleList, setArticleList] = useState([])
  const [curArticle, setCurArticle] = useState({})
  const [articles, setArticles] = useState([])

  useEffect(() => {

    TopStories().then((data) => {
      setArticleList(data.slice(100, 104).map((element, i) => ({ id: element, l_id: i + 1 })))
      setArticles(Array.apply(null, Array(articleList.length)).map(function () { }))
    })

  }, [])

  useEffect(() => {
    articleList.forEach((element, i) => {
      setTimeout(() => {
        console.log("starting for ", i + 1)
        Item(element.id).then((data) => {
          setCurArticle({ ...element, ...data })
        })
      }, i * 50)
    })

  }, [articleList])

  useEffect(() => {
    let temp = articles.slice()
    temp[curArticle.l_id - 1] = curArticle
    console.log("setting for: ", curArticle.l_id)
    setArticles(temp)
  }, [curArticle])

  const columns = ColumnData()
  
  if (articles.length === 0) {
    return (
      <div className="App">
        Loading
      </div>
    )
  }

  return (
    <div className="App">
      <div>
        <Table columns={columns} data={articles} />
      </div>

    </div>
  )
}

export default App
