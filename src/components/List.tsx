import { useState } from "react"

type  ListProps = {
    InitialItems: string[]
}

function List({ InitialItems }: ListProps) {
  const [list, setList] = useState(InitialItems)
  const [newItem, setNewItem] = useState('')

  function addTolist() {
    setList([...list, 'd'])
  }

  function addTolist2() {
    setTimeout(() => {
      setList([...list, newItem])
    }, 500)
  }

  function remove(item: string) {
    setTimeout(() => {
      setList(list.filter((i) => i !== item))
    }, 500)
  }

  return (
    <>
      <h1 className="test">Hello World</h1>
      
      <button onClick={addTolist}>Add</button>


      < input type="text" value={newItem} onChange={(e: any)=> setNewItem(e.target.value)} placeholder="novo item" />
      <button onClick={addTolist2}>Add pelo input</button>


      <ul>
          {list.map((item, index) => (
            <li key={index}>
              {item}
              <button onClick={() => remove(item)}>Remover</button>
            </li>
          ))}
      </ul>
    </>
  )
}

export default List
