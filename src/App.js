import { useEffect, useState } from 'react';
import './App.css';
import video from './coverr-fruit.mp4';
import { LoaderPage } from "./LoaderPage";
import Nutrition from './Nutrition';
import Swal from "sweetalert2";



function App() {

  const MY_ID = '19cbb905';
  const MY_KEY = 'e25de03bf1898af5475dc7c4c985ac2b';
  const MY_URL = 'https://api.edamam.com/api/nutrition-details';

const [mySearch, setMySearch] = useState("");
const [myNutrition, setMyNutrition] = useState();
const [wordSubmitted, setWordSubmitted] = useState("");
const [stateLoader, setStateLoader] = useState(false);


const getAnalysis = async (ingr) => {
  setStateLoader(true);
  const response = await fetch(`${MY_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingr: ingr })
  })

  if(response.ok) {
    setStateLoader(false);
    const data = await response.json();
    setMyNutrition(data);
  } else {
    setStateLoader(false);
    Swal.fire("Ingredients entered incorrectly!");
  }
}

const myAnalysisSearch = (e) => {
  setMySearch(e.target.value);
}

const finalSearch = (e) => {
  e.preventDefault();
  setWordSubmitted(mySearch)
}

useEffect(() => {
  if (wordSubmitted !== '') {
    let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
    getAnalysis(ingr);
  }
}, [wordSubmitted])


  return (
    <div className="App">
      <video autoPlay muted loop>
        <source src={video} type="video/mp4" />
      </video>

      {stateLoader && <LoaderPage />}

      <h1>Nutrition Analysis</h1>
      <div className="container">
      <form onSubmit={finalSearch}>
      <input
      className='search'
      placeholder="1... item(s)..."
      onChange={myAnalysisSearch}
      value={mySearch}
      />
      </form>
      </div>
      <div className="container">
      <button type="submit">Search</button>
      </div>
      
      <div>

      {myNutrition && <p className="cal">{myNutrition.calories} kcal</p>}

      {myNutrition && Object.values(myNutrition.totalNutrients)
      .map(({label, quantity, unit}, index) => 
      <Nutrition key={index}
      label={label}
      quantity={quantity}
      unit={unit}
      />
    )}
    </div>
</div>
  );
}

export default App;
