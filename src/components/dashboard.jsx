// import { jwtDecode } from 'jwt-decode'
// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

// const Dashboard = () => {
//   const [listItems, setListItems] = useState([])
//   const [name, setName] = useState('')
//   const [isEditing, setIsEditing] = useState(false)
//   const [editID, setEditID] = useState(null)
//   const [user, setUser] = useState(null)

//   const navigate = useNavigate()
//   const token = localStorage.getItem('token')

//   useEffect(() => {
//     if (token) {
//       const decoded = jwtDecode(token)
//       setUser(decoded)
//     }
//   }, [token])

//   const url = 'http://localhost:3000/tasks'

//   const fetchData = async () => {
//     try {
//       const response = await fetch(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       const data = await response.json()
//       setListItems(data.tasks)
//     } catch (error) {
//       console.log('Error fetching data:', error)
//     }
//   }

//   // redirect if no token
//   useEffect(() => {
//     if (!token) {
//       navigate('/login')
//       return
//     }

//     fetchData()
//   }, [token, navigate])

//   const handleChange = (e) => {
//     setName(e.target.value)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (isEditing) {
//       const response = await fetch(`${url}/${editID}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ name }),
//       })
//       const data = await response.json()
//       console.log(data)

//       const updatedItems = listItems.map((item) =>
//         item._id === editID ? { ...item, name } : item,
//       )
//       setListItems(updatedItems)
//       setIsEditing(false)
//       setEditID(null)
//       setName('')
//       return
//     }

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ name }),
//     })
//     const data = await response.json()
//     console.log(data)

//     setListItems([...listItems, data.tasks]) // if your API returns created task
//     setName('')
//   }

//   const editItem = (id) => {
//     const updatedItem = listItems.find((item) => item._id === id)
//     setIsEditing(true)
//     setName(updatedItem.name)
//     setEditID(id)
//   }

//   const deleteItem = async (id) => {
//     await fetch(`${url}/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     })

//     const updatedList = listItems.filter((item) => item._id !== id)
//     setListItems(updatedList)
//   }

//   return (
//     <div>
//       <div className='flex justify-between p-6 bg-gray-100'>
//         <h3>Hello {user?.name}</h3>
//         <p
//           className='px-3 rounded-sm bg-black text-white cursor-pointer'
//           onClick={() => {
//             localStorage.removeItem('token')
//             navigate('/login')
//           }}
//         >
//           Logout
//         </p>
//       </div>

//       <div className='center-items'>
//         <form onSubmit={handleSubmit}>
//           <input
//             type='text'
//             placeholder='Input name...'
//             className='input-field'
//             onChange={handleChange}
//             value={name}
//           />
//           <button type='submit' className='btn'>
//             {isEditing ? 'Update' : 'Submit'}
//           </button>
//         </form>

//         {listItems.map((item) => (
//           <div key={item._id} className='saved-items'>
//             <p>{item.name}</p>
//             <div>
//               <button className='edit-btn' onClick={() => editItem(item._id)}>
//                 <i className='fa-solid fa-pen-to-square'></i>
//               </button>
//               <button
//                 className='delete-btn'
//                 onClick={() => deleteItem(item._id)}
//               >
//                 <i className='fa-solid fa-trash'></i>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Dashboard

import jwtDecode from 'jwt-decode'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [listItems, setListItems] = useState([])
  const [name, setName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    const decodeToken = () => {
      const decoded = jwtDecode(token)
      setUser(decoded)
    }

    decodeToken()
    fetchData()
  }, [token, navigate])

  const url = 'http://localhost:3000/tasks'

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      setListItems(data.tasks)
    } catch (error) {
      console.log('Error fetching data:', error)
    }
  }

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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      })
      const data = await response.json()

      const updatedItems = listItems.map((item) =>
        item._id === editID ? { ...item, name } : item,
      )
      setListItems(updatedItems)
      setIsEditing(false)
      setEditID(null)
      setName('')
      return
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    })
    const data = await response.json()

    setListItems([...listItems, data.tasks])
    setName('')
  }

  const editItem = (id) => {
    const updatedItem = listItems.find((item) => item._id === id)
    setIsEditing(true)
    setName(updatedItem.name)
    setEditID(id)
  }

  const deleteItem = async (id) => {
    await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const updatedList = listItems.filter((item) => item._id !== id)
    setListItems(updatedList)
  }

  return (
    <div>
      <div className='flex justify-between p-6 bg-gray-100'>
        <h3>Hello {user?.name}</h3>
        <p
          className='px-3 rounded-sm bg-black text-white cursor-pointer'
          onClick={() => {
            localStorage.removeItem('token')
            navigate('/login')
          }}
        >
          Logout
        </p>
      </div>

      <div className='center-items'>
        <form onSubmit={handleSubmit}>
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

        {listItems.map((item) => (
          <div key={item._id} className='saved-items'>
            <p>{item.name}</p>
            <div>
              <button className='edit-btn' onClick={() => editItem(item._id)}>
                <i className='fa-solid fa-pen-to-square'></i>
              </button>
              <button
                className='delete-btn'
                onClick={() => deleteItem(item._id)}
              >
                <i className='fa-solid fa-trash'></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
