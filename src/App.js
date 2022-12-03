import './App.css';
import React,{useState,useEffect} from 'react'

/**
 * Given a table of objects, create an array of string that can be used as a table header. 
 * For example, for the dog table example, it will return ["id", "name", "age"]
 * 
 * @param {The table of objects} table 
 * @returns An array of string that contains the header for the given table.
 */
 function getTableHeader(table) {
  if (!table || table.length === 0) return undefined;
  let row = table[0]
  let headers = []
  for(let h in row) {
    headers.push(h)
  }
  return headers
}

/********************************************************************/
/* Complete Question1 - Question5 functions below                   */
/********************************************************************/

function Question1() {
  const [dogs, setDogs]  = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/dogs")
      const json = await result.json()
      setDogs(json)
    }
    fetchData();
  }, [])
  
  let dogTable = dogs.map(d => 
    <tr key={d._id}>
      <td>{d.name}</td>
      <td>{d.age}</td>
      <td>{d.breed}</td>
      <td>{d.naughty}</td>
      <td>{d.nice}</td>
    </tr>)

return (<div>
  <h2>Dogs from MongoDB</h2>
  <table>
    <thead><tr><th>Name</th><th>Age</th><th>Breed</th><th>Naughty</th><th>Nice</th></tr></thead>
    <tbody>
    {dogTable}
    </tbody>
  </table>
  </div>)
}

function Question2() {
  const [dogs, setDogs]  = useState([])

  const deleteDog = async (dogID) => {
    const dog = { id: dogID}
    const result = await fetch("/deletedog", {
      method: 'post',
      body: JSON.stringify(dog),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    if (result.status == 200) {
      setDogs(dogs.filter(d => d._id !== dogID))
    } else {
      console.error("Can't delete " + dogID)
    }

  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/dogs")
      const json = await result.json()
      setDogs(json)
    }
    fetchData();
  }, [])
  
  let dogTable = dogs.map(d => 
    <tr key={d._id}>
      <td>{d.name}</td>
      <td>{d.age}</td>
      <td>{d.breed}</td>
      <td>{d.naughty}</td>
      <td>{d.nice}</td>
      <td><button onClick={()=>deleteDog(d._id)}>X</button></td>
    </tr>)

return (<div>
  <h2>Dogs with Delete Buttons</h2>
  <table>
    <thead><tr><th>Name</th><th>Age</th><th>Breed</th><th>Naughty</th><th>Nice</th><th>Delete</th></tr></thead>
    <tbody>
    {dogTable}
    </tbody>
  </table>
  </div>)
}


function Question3() {
  const [dogs, setDogs]  = useState([])
  const [dogName, setDogName] = useState()
  const [dogBreed, setDogBreed] = useState()
  const [dogAge, setDogAge] = useState()

  const addDog = async (dogName, dogBreed, dogAge) => {
    const dog = { name: dogName, breed: dogBreed, age: dogAge, nice:0, naughty: 0}
    const result = await fetch("/adddog", {
      method: 'post',
      body: JSON.stringify(dog),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    if (result.status == 200) {
      // need to reload the table
      const result = await fetch("/dogs")
      const json = await result.json()
      setDogs(json)
    } else {
      console.error("Can't add " + dog.name)
      console.error(dog)
    }

  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("/dogs")
      const json = await result.json()
      setDogs(json)
    }
    fetchData();
  }, [])
  
  let dogTable = dogs.map(d => 
    <tr key={d._id}>
      <td>{d.name}</td>
      <td>{d.age}</td>
      <td>{d.breed}</td>
      <td>{d.naughty}</td>
      <td>{d.nice}</td>
    </tr>)

return (<div>
  <h2>Dogs with Delete Buttons</h2>
  <table>
    <thead><tr><th>Name</th><th>Age</th><th>Breed</th><th>Naughty</th><th>Nice</th></tr></thead>
    <tbody>
    {dogTable}
    </tbody>
  </table>
  <div>
  <h3>Add dog</h3>
      <div className='formRow'><label>Name: </label><input onChange={e=> setDogName(e.target.value)}></input></div>
      <div className='formRow'><label>Breed: </label><input onChange={e=> setDogBreed(e.target.value)}></input></div>
      <div className='formRow'><label>Age: </label><input onChange={e=> setDogAge(parseInt(e.target.value))}></input></div>
      <div className='formRow'><button onClick={e => addDog(dogName,  dogBreed, dogAge)}>Add</button></div>
  </div>
  </div>)
}

// TODO: Before proceeding with question 5, 
// TODO: do the work for question4 in backend/index.js file!

const Question5 = () => {
  return (<div>
    Dog Table, naughty and nice
  </div>)
}

/********************************************************************/
/* The code below is needed so that you can view the result, but it */
/* does not contribute to your assignment grade.                    */
/********************************************************************/

/**
 * Enclose the given component inside a div element with 
 * className="Question".
 * 
 * @param {component} The component to put in a question box
 * @returns The div element that encloses the component.
 */
function QuestionBox({component}) {
  return (
    <div className="question">
      {component}
    </div>
  )
}

/**
 * Create boxed components that contains the result of Question1-5.
 * 
 * @returns The App component
 */
function App() {
  return (
    <div className="App">
      <QuestionBox component={<Question1/>}/>

      <QuestionBox component={<Question2/>}/>

      <QuestionBox component={<Question3/>}/>
     
      <QuestionBox component={<Question5/>}/>
    </div>
  );
}

export default App;
