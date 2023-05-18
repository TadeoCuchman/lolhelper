import { useState } from 'react'
import ErrorMessage  from './ErrorMessage'

const ChampPicker = ({champsObjofObjs, allChampsNames, setLine}) => {
    const [valid, setValid] = useState(false)
    const [champ, setChamp] = useState('')
  
    function validateChamp (input) {
      setChamp(input)
      const firstWord = input.replace(/ .*/,'');
      console.log(firstWord)
      var idx = allChampsNames.findIndex( e => e == firstWord );
      console.log(idx)
      if(idx != -1) {
        setValid(true)
        setLine(input)
      } else {
        setValid(false)

      }
    }
  
  
    return (
  
      <div style={{position:'relative'}}>
        <input list='champs'type="text" style={{textTransform: "capitalize"}} value={champ} onChange={(e) =>{ validateChamp(e.target.value)}}/>
        <datalist id='champs' >
          <Options champsObjofObjs={champsObjofObjs}/>
        </datalist>
        {valid  || champ == '' ?  '' : <ErrorMessage message='Invalid Champ'/> }
      </div>
  
    )
  }
  
  const Options = ({champsObjofObjs}) => {
    const elements = [];
    for (const champ in champsObjofObjs) {
      if (Object.prototype.hasOwnProperty.call(champsObjofObjs, champ)) {
        const actualChamp = champsObjofObjs[champ];
        elements.push(<option key={actualChamp.id}>{actualChamp.name}</option>);
      }
    }
    return elements;
  }

  export default ChampPicker;