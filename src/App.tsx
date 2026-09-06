import { useState } from 'react'
import { Menu, X } from 'lucide-react'
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <div className="mx-auto flex max-w-[1800px] flex-col lg:flex-row">
          <div className="hidden lg:block lg:sticky lg:top-0 lg:h-screen lg:w-72">
            <Sidebar />
          </div>

          <div className="border-b border-slate-200 bg-slate-50/90 lg:hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
                  FQ
                </div>
                <div className="text-base font-semibold tracking-tight text-slate-900">FreightIQ</div>
              </div>

              <button
                type="button"
                aria-label="Toggle navigation"
                onClick={() => setMobileNavOpen((current) => !current)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm"
              >
                {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

            {mobileNavOpen ? (
              <div className="border-t border-slate-200 bg-slate-50/95 px-3 py-3">
                <Sidebar mobile onNavigate={() => setMobileNavOpen(false)} />
              </div>
            ) : null}
          </div>

          <main className="flex-1 min-w-0 p-4 md:p-6 xl:p-8">
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
