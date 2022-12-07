import React, { useState } from 'react'
import styled from 'styled-components'
import { useInfiniteScroll } from 'infinite-scroll-hook'
import articles from './articles.json';

const List = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`

const Item = styled.div`
  background-color: gold;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
`
const Loading = styled.p`
  text-align: center;
`

const sleep = (timeout) => new Promise((res) => setTimeout(res, timeout))

async function fetchList(lastN = 0, length = 2, timeout = 1500) {
  await sleep(timeout)
  return [...articles][lastN]
}

let counter = 0;

export default function App() {
  const [list, setList] = useState([articles[0]])
  const isLastArticle = counter === articles.length-1;
  const { containerRef, isLoading } = useInfiniteScroll({
    shouldStop: isLastArticle,
    offset: '200px',
    async onLoadMore() {
      counter++;
      const res = await fetchList(counter)
      setList(list.concat(res))
    },
  })

  return (
    <div className="App">
      <List ref={containerRef}>
        {list.map((n) => (
          <Item key={n}>
            <h1>{n.title}</h1>
            <p>{n.body}</p>
          </Item>
        ))}
        {isLoading && <Loading>Loading Next Article ...</Loading>}
        <p>
        </p>
      </List>
    </div>
  )
}
