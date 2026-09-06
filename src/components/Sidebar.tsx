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

export function Sidebar() {
  return (
    <aside className="flex h-screen w-full flex-col border-r border-slate-200 bg-slate-50/90 px-4 py-5 lg:w-72">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
          FQ
        </div>
        <div>
          <div className="text-lg font-semibold tracking-tight text-slate-900">FreightIQ</div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Main</p>
          <nav className="space-y-1">
            {sidebarMain.map((item) => {
              const Icon = icons[item.icon as keyof typeof icons] ?? Gauge

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                    }`
                  }
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
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="mt-auto space-y-2 border-t border-slate-200 pt-4">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
            }`
          }
        >
          <Settings2 size={16} />
          <span>Settings</span>
        </NavLink>
        <div className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 shadow-sm ring-1 ring-slate-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
            <UserRound size={14} />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-700">Procurement Lead</div>
            <div className="text-[11px] text-slate-500">Operations</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
