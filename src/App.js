import './App.css';
import React,{useState,useEffect} from 'react'

/********************************************************************/
/* Complete Question1 - Question5 functions below                   */
/********************************************************************/

function Question1() {
  return (<div>
    Dog Table
  </div>)
}

function Question2() {
  return (<div>
    Dog Table, delete row
  </div>)
}


function Question3() {
  return (<div>
    Dog Table, add row
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
