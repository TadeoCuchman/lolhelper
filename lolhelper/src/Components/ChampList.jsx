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

const Champ = ({champ}) => {
  return (
    <div>
      <span>{champ.name}</span>
      <p>{champ.blurb}</p>
      {champ.tags.forEach(element => <span>{element}</span>)}
    </div>
  )
}

export default ChampList;