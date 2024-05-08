import {useState, useEffect} from 'react'
import './App.css';

const App = () => {
  const [user, setUser] = useState()
  const [initialFetchComplete, setInitialFetchComplete] = useState(false)

  const getUserFromDb = async () => {
    try {
      const data = await fetch(process.env.REACT_APP_BACKEND_URL)
      const foundUser = await data.json()
      setUser(foundUser)
      setInitialFetchComplete(true)
    } catch (err) {
      console.log(err)
      setInitialFetchComplete(true)
    }
  }

  useEffect(() => {
    getUserFromDb()
  }, [])

  return (
    <div className="App">
      <h1>Basic Deployment Example Frontend</h1>
      {
        user && (
          <>
            <h3>Username: {user.username}</h3>
            <h3>Email: {user.email}</h3>
          </>
        )
      }
      {
        initialFetchComplete && !user && (
          <h2>No User Found</h2>
        )
      }
    </div>
  );
}

export default App;
