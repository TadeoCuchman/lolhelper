import { useState, useEffect } from 'react'
import ChampList from './Components/ChampList'
import ChampPicker from './Components/ChampPicker'
import champsApi from './assets/champs.json'
import Logo from './Components/Logo'
import Loader from './Components/Loader'
import './App.css'

const App = () => {
  const [prompt, setPrompt] = useState('')
  const [send, setSend] = useState('')
  const [champs, setChamps] = useState({...champsApi.data})
  const [allChampsNames, setAllChampsNames] = useState('')
  const [filteredChamps, setFilteredChamps] = useState({...champsApi.data})
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [response, setResponse] = useState([])
  const [loader, setLoader] = useState(false)
 

  useEffect(() => {
    let namesArray = [];
    for(let champ in champsApi.data) {
      // console.log(champ)
      namesArray.push(champ)

    }
    setAllChampsNames(namesArray)
  }, [])


  const getAllChamps = async () => {
    const API_KEY = 'RGAPI-9ab7b3bd-2b85-4afc-b83c-5f34b372e9df'
    const url = `http://ddragon.leagueoflegends.com/cdn/13.8.1/data/en_US/champion.json`;
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/xml',
        "X-Riot-Token": API_KEY
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  
  const sendPrompt = async () => {
    //setSend(prompt)
    try {
      const options = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `${line1} against ${line2}`
        })
      }
      const response = await fetch('http://localhost:8000/completion', options)
      // console.log(response)
      const data = await response.json()
      console.log(data)
      const array = data.result.split('*')
      console.log(array)
      setLoader(false)
      setResponse(array)

    }catch (err) {
      console.error(err)
    }

  }

  return (
    <div className='app'>
      <Logo/>
      <p>Champs:</p>
      {/* <input type='text' value={prompt} onChange={(e) => setPrompt(e.target.value) }/> */}
      <p>{send}</p>
      {/* <ChampList champsObjofObjs={champs}/> */}

      <div style={{display:'flex', flexDirection:'row', marginBottom:'4rem'}}>
        <div>
          <span>My Champ</span>
          <ChampPicker champsObjofObjs={champs} allChampsNames={allChampsNames} setLine={setLine1}/>
        </div>
        <span>
          vs
        </span>
        <div>
          <span>Enemy Champ</span>
          <ChampPicker champsObjofObjs={champs} allChampsNames={allChampsNames} setLine={setLine2}/>
        </div>
      </div>
      <button onClick={() => { 
        setLoader(true)
        sendPrompt()}}>Send</button>
      {loader ? <Loader/> : 
      <ul style={{listStyleType: 'none'}}>
        {response.map((e) => <li key={e}> {e} </li>)}
      </ul>
      }
    </div>
  )
}







export default App;


