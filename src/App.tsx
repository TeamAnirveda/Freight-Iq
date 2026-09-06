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
      <div className="relative min-h-screen bg-transparent text-slate-900">
        <div className="mx-auto flex max-w-[1800px] flex-col lg:flex-row">
          <div className="hidden lg:block lg:sticky lg:top-0 lg:h-screen lg:w-72">
            <Sidebar />
          </div>

          <div className="border-b border-slate-200/80 bg-white/70 backdrop-blur-sm lg:hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white shadow-sm shadow-slate-900/20">
                  FQ
                </div>
                <div className="text-base font-semibold tracking-tight text-slate-900">FreightIQ</div>
              </div>

              <button
                type="button"
                aria-label="Toggle navigation"
                onClick={() => setMobileNavOpen((current) => !current)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-cyan-200 hover:text-cyan-700"
              >
                {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          <div
            className={`fixed inset-0 z-30 bg-slate-950/55 backdrop-blur-[1px] transition-opacity duration-300 lg:hidden ${mobileNavOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            onClick={() => setMobileNavOpen(false)}
            aria-hidden={!mobileNavOpen}
          />

          <div
            className={`fixed inset-y-0 left-0 z-40 w-[82vw] max-w-[320px] min-w-[260px] transform transition-transform duration-300 ease-out lg:hidden ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <Sidebar mobile onNavigate={() => setMobileNavOpen(false)} />
          </div>

          <main className="page-shell flex-1 min-w-0 p-4 md:p-6 xl:p-8">
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
