import './App.css'
import Minesweeper from './components/Minesweeper'

function App() {
  return (
    <div className="app">
      <h1>Minesweeper</h1>
      <Minesweeper rows={10} cols={10} mines={15} />
    </div>
  )
}

export default App
