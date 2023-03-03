import React, { useEffect, useState } from 'react'
import { Item } from '../../client/api.js'

function Article(props) {
  const [topic, SetTopic] = useState({})

  useEffect(() => {
    Item(props.id).then((data) => { SetTopic(data) })
  }, [props])



  if (topic != {}) {
    return (
      <tr>
        <td>
          {props.local_id}
        </td>
        <td>
          <span>
            <a href={topic.url}>
              {topic.title}
            </a>
          </span>
        </td>
        <td>
          Score: {topic.score}
        </td>
      </tr>
    )
  }
}

export default Article