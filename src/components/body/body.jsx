import { useState, useEffect } from 'react'
import { Item, NewStories } from '../../client/api.js'
import Table from '../table/Table'
import ColumnData from '../table/Columns.jsx'

function Body(props) {
    const [articleList, setArticleList] = useState([])
    const [curArticle, setCurArticle] = useState({})
    const [articles, setArticles] = useState([])

    useEffect(() => {
        NewStories().then((data) => {
            setArticleList(data.slice(props.from, props.to).map((element, i) => ({ id: element, l_id: i + 1 })))
            setArticles(Array.apply(null, Array(articleList.length)).map(function () { }))
        })

    }, [])

    useEffect(() => {
        articleList.forEach((element, i) => {
            setTimeout(() => {
                Item(element.id).then((data) => {
                    if(!("url" in data)) {
                        data['url'] = "https://news.ycombinator.com/item?id=" + element['id']
                    }
                    setCurArticle({ ...element, ...data })
                })
            }, i * 50)
        })

    }, [articleList])

    useEffect(() => {
        let temp = articles.slice()
        temp[curArticle.l_id - 1] = curArticle
        setArticles(temp)
    }, [curArticle])

    const columns = ColumnData()

    if (articles.length === 0) {
        return (
            <div data-testid="loading" className="Body">
                Loading
            </div>
        )
    }

    return (
        <div className="Body">
            <Table columns={columns} data={articles} />
        </div>
    )
}

export default Body
