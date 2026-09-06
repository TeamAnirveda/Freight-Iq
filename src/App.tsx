import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Forecast } from './pages/Forecast'
import { NewRequirement } from './pages/NewRequirement'
import { Overview } from './pages/Overview'
import { Ports } from './pages/Ports'
import { Recommendation } from './pages/Recommendation'
import { Settings } from './pages/Settings'
import { Vessels } from './pages/Vessels'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <div className="mx-auto flex max-w-[1800px] flex-col lg:flex-row">
          <div className="w-full lg:sticky lg:top-0 lg:h-screen lg:w-72">
            <Sidebar />
          </div>

          <main className="flex-1 p-4 md:p-6 xl:p-8">
            <div className="mx-auto max-w-7xl">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/requirement" element={<NewRequirement />} />
                <Route path="/forecast" element={<Forecast />} />
                <Route path="/vessels" element={<Vessels />} />
                <Route path="/ports" element={<Ports />} />
                <Route path="/recommendation" element={<Recommendation />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
