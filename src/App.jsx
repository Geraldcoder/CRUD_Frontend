import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [listItems, setListItems] = useState([])
  const [name, setName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)

  const url = 'http://localhost:3000'

  const fetchData = async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      setListItems(data.tasks)
    } catch (error) {
      console.log('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isEditing) {
      const response = await fetch(`${url}/${editID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name }),
      })
      const data = await response.json()
      console.log(data)

      let updatedItems = listItems.map((item) =>
        item._id === editID ? { ...item, name } : item,
      )
      setListItems(updatedItems)
      setIsEditing(false)
      setEditID(null)
      setName('')
      return
    }

    // const id = new Date().getTime().toString()
    setListItems([...listItems, { name: name }])
    setName('')

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    })
    const data = await response.json()
    console.log(data)
  }

  const editItem = (id) => {
    const updatedItems = listItems.find((item) => item._id === id)
    setIsEditing(true)
    setName(updatedItems.name)
    setEditID(id)
  }

  const deleteItem = async (id) => {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
    const data = await response.json()
    console.log(data)

    let upddatedList = listItems.filter((item) => item._id !== id)
    setListItems(upddatedList)
  }

  return (
    <div className='center-items'>
      <form action='' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Input name...'
          className='input-field'
          onChange={handleChange}
          value={name}
        />
        <button type='submit' className='btn'>
          {isEditing ? 'Update' : 'Submit'}
        </button>
      </form>
      {listItems.map((item) => {
        const { _id, name } = item
        return (
          <div key={_id} className='saved-items'>
            <p>{name}</p>
            <div>
              <button className='edit-btn' onClick={() => editItem(_id)}>
                <i className='fa-solid fa-pen-to-square'></i>
              </button>
              <button className='delete-btn' onClick={() => deleteItem(_id)}>
                <i className='fa-solid fa-trash'></i>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default App
