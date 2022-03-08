import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AllHeroesPage from './Pages/AllHeroes/allHeroesPage'
import DCPage from './Pages/DC/dcPage'
import MarvelPage from './Pages/Marvel/marvelPage'
import { HeroPage } from './Pages/Hero/heroPage'
import { AddCharacterPage } from './Pages/AddCharacter/addCharacterPage'
import { SearchPage } from './Pages/Search/searchPage'
import { UpdateCharacterPage } from './Pages/UpdateCharacter/updateCharacterPage'

import './App.css';


function App() {
  return (
    <div className="App App-header">
      <Router>
        <Routes>
          <Route exact path='/' element={<AllHeroesPage/>} />
          <Route exact path='/dc' element={<DCPage/>} />
          <Route exact path='/marvel' element={<MarvelPage/>} />
          <Route path='/hero/:name' element={<HeroPage />} />
          <Route path='/add/character' element={<AddCharacterPage />} />
          <Route path='/search/:busqueda' element={<SearchPage />} />
          <Route path='/update/character/:name' element={<UpdateCharacterPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
