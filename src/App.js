import React, { useState } from 'react'
import './App.css'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

function App() {
  const [data, setData] = useState({})
  const [firstAirport, setFirstAirport] = useState("")
  const [secondAirport, setSecondAirport] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  async function fetchData() {
    setLoading(true)
    await fetch(`https://localhost:44382/api/MeasureDistance/${firstAirport}/${secondAirport}`)
      .then(results => results.json())
      .then(data => {
        setData(data)
        setError(false)
      })
      .catch(error => {
        console.log(error)
        setError(true)
      })
    setLoading(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <form className="App-form">
          <TextField
            value={firstAirport}
            label="First IATA code"
            placeholder="AMS"
            margin="normal"
            variant="outlined"
            className="App-TextField"
            onChange={event => setFirstAirport(event.target.value)}
          />
          <br />
          <TextField
            value={secondAirport}
            label="Second IATA code"
            placeholder="SKP"
            margin="normal"
            variant="outlined"
            className="App-TextField"
            onChange={event => setSecondAirport(event.target.value)}
          />
          <br />
          <Button variant="contained" onClick={fetchData}>Measure</Button>
        </form>
        <br />
        {
          loading && <div>Measuring distance between "<strong>{firstAirport} and {secondAirport}</strong>"</div>
        }
        {
          (
            error === true ||
            typeof data.distance === 'undefined' ||
            data.firstAirportName === "" ||
            data.secondAirportName === ""
          )
            ?
            <div><span>Please enter existing IATA codes in the format of 3 letters</span></div>
            :
            <div>
              <label>First Airport: </label><span>{data.firstAirportName}</span><br />
              <label>Second Airport: </label><span>{data.secondAirportName}</span><br />
              <label>Distance: </label><span>{Math.round(data.distance)} miles</span><br />
            </div>
        }
      </header>
    </div>
  )
}

export default App;
