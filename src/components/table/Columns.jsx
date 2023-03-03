import { useMemo } from "react";
import { FaBolt } from 'react-icons/fa'
import './styles.css'

function ColumnData() {
    const columns = useMemo(
        () => [
            {
                Header: "Latest Articles",
                hideHeader: true,
                columns: [
                    {
                        Header: "id",
                        accessor: "l_id",
                    },
                    {
                        Header: "Title",
                        accessor: "title",
                        Cell: props => <a href={props.row.original['url']}>{props.value}</a>,
                    },
                    {
                        Header: "Info",
                        accessor: "by",
                        Cell: (props) => {
                            const type = props.row.original['type']
                            let typeJsx = null
                            if (type === "story") {
                                typeJsx = <span class="tag story">{type}</span>
                            } else {
                                typeJsx = <span class="tag other">{type}</span>
                            }
                            return (<span class="info">
                                {typeJsx} by
                                <br />
                                {props.value}

                            </span>)
                        }
                    },
                    {
                        Header: "Points",
                        accessor: "score",
                        Cell: props => <span class="info">{props.value} < FaBolt /></span>
                    },
                ],
            },
        ],
        []
    )
    return columns
}

export default ColumnData
