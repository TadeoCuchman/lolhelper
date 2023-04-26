import { useState, useEffect } from 'react'
import champsApi from './assets/champs.json'
import './App.css'

const App = () => {
  const [prompt, setPrompt] = useState('')
  const [send, setSend] = useState('')
  const [champs, setChamps] = useState({...champsApi.data})

  useEffect(() => {
    console.log(champsApi.data)
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
          message: "do something"
        })
      }
      const response = await fetch('http://localhost:8000/completion', options)
      console.log(response)
      const data = await response.json()
      console.log(data)

    }catch (err) {
      console.error(err)
    }

  }

  return (
    <div className='app'>
      <p>Prompt:</p>
      <input type='text' value={prompt} onChange={(e) => setPrompt(e.target.value) }/>
      <button onClick={() => getAllChamps()}>Send</button>
      <p>{send}</p>
      <ChampList champsObjofObjs={champs}/>
    </div>
  )
}

const Champ = ({champ}) => {
  return (
    <div>
      <span>{champ.name}</span>
      <p>{champ.blurb}</p>
      {champ.tags.forEach(element => <span>{element}</span>)}
    </div>
  )
}

const ChampList = ({champsObjofObjs}) => {
    const elements = [];
    for (const champ in champsObjofObjs) {
      if (Object.prototype.hasOwnProperty.call(champsObjofObjs, champ)) {
        const actualChamp = champsObjofObjs[champ];
        elements.push(<Champ champ={actualChamp} key={actualChamp.id}/>);
      }
    }
    return <div>{elements}</div>;
}



export default App;
