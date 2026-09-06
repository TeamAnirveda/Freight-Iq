import { Anchor, BriefcaseBusiness, Gauge, LayoutGrid, Lightbulb, PlusCircle, Settings2, ShipWheel, TrendingUp, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { sidebarDecision, sidebarMain } from '../data/mockData'

const icons = {
  'layout-grid': LayoutGrid,
  'plus-circle': PlusCircle,
  'trending-up': TrendingUp,
  'ship-wheel': ShipWheel,
  anchor: Anchor,
  'lightbulb': Lightbulb,
} as const

type SidebarProps = {
  mobile?: boolean
  onNavigate?: () => void
}

export function Sidebar({ mobile = false, onNavigate }: SidebarProps) {
  const navClassName = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-cyan-500/15 text-cyan-100 shadow-[inset_0_0_0_1px_rgba(103,232,249,0.2)] ring-1 ring-cyan-400/30'
        : 'text-slate-300 hover:bg-white/5 hover:text-white'
    }`

  return (
    <aside className={`relative flex w-full flex-col overflow-hidden ${mobile ? 'h-screen w-full overflow-y-auto bg-slate-950/95 px-2 py-2' : 'h-screen border-r border-slate-800/80 bg-[linear-gradient(180deg,#071a2d_0%,#0c2139_100%)] px-4 py-5 lg:w-72'} ${mobile ? '' : ''}`}>
      {!mobile ? (
        <div className="relative z-10 mb-8 flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/20 text-sm font-semibold text-cyan-100 ring-1 ring-cyan-300/30">
            FQ
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight text-white">FreightIQ</div>
          </div>
        </div>
      ) : null}

      <div className="relative z-10 space-y-6">
        <div>
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Main</p>
          <nav className="space-y-1">
            {sidebarMain.map((item) => {
              const Icon = icons[item.icon as keyof typeof icons] ?? Gauge

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onNavigate}
                  className={navClassName}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>

        <div>
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Decision</p>
          <nav className="space-y-1">
            {sidebarDecision.map((item) => {
              const Icon = icons[item.icon as keyof typeof icons] ?? BriefcaseBusiness

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onNavigate}
                  className={navClassName}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="pointer-events-none relative z-0 mt-auto h-24 w-full">
        <svg
          viewBox="0 0 400 120"
          className="maritime-wave absolute inset-x-[-5%] bottom-[-10px] h-[150%] w-[110%]"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{
            background: 'transparent',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.44) 72%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.44) 72%, transparent 100%)',
          }}
        >
          <path d="M0,76 C40,48 90,110 160,74 S270,52 400,82 L400,120 L0,120 Z" fill="rgba(91,212,255,0.18)" />
          <path d="M0,88 C96,62 148,103 220,80 S320,54 400,90" fill="none" stroke="rgba(125,211,252,0.52)" strokeWidth="2.2" />
          <path d="M0,96 C86,76 164,116 238,90 S334,70 400,100" fill="none" stroke="rgba(34,211,238,0.38)" strokeWidth="1.8" />
          <path d="M0,106 C100,88 190,122 274,101 S344,92 400,108" fill="none" stroke="rgba(125,211,252,0.2)" strokeWidth="1.4" />
        </svg>
        <svg
          viewBox="0 0 400 120"
          className="maritime-wave-slow absolute inset-x-[-4%] bottom-[-2px] h-[126%] w-[108%] opacity-90"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{
            background: 'transparent',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 44%, rgba(0,0,0,0.3) 74%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 44%, rgba(0,0,0,0.3) 74%, transparent 100%)',
          }}
        >
          <path d="M0,64 C82,96 154,38 230,70 S348,96 400,58 L400,120 L0,120 Z" fill="rgba(56,189,248,0.09)" />
          <path d="M0,74 C90,102 178,52 243,74 S348,94 400,72" fill="none" stroke="rgba(34,211,238,0.26)" strokeWidth="1.6" />
        </svg>
      </div>

      <div className="relative z-10 mt-2 space-y-2 border-t border-slate-700/30 pt-4">
        <NavLink
          to="/settings"
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-cyan-500/15 text-cyan-100 ring-1 ring-cyan-400/30'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`
          }
        >
          <Settings2 size={16} />
          <span>Settings</span>
        </NavLink>
        <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5 shadow-sm ring-1 ring-slate-700/80">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-xs font-semibold text-cyan-100 ring-1 ring-cyan-300/35">
            <UserRound size={14} />
          </div>
          <div>
            <div className="text-sm font-medium text-white">Procurement Lead</div>
            <div className="text-[11px] text-slate-300">Operations</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
