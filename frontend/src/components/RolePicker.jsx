import { roles } from '../context/AuthContext';

export default function RolePicker({ loading, onPick }) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-white/90 p-6 shadow-soft">
      <h2 className="text-lg font-semibold">Quick start</h2>
      <p className="mt-2 text-sm text-ink/60">Auto-create demo accounts for each role.</p>
      <div className="mt-5 grid gap-3">
        {roles.map((r) => (
          <button
            key={r.value}
            className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white px-4 py-3 text-left text-sm shadow-soft"
            onClick={() => onPick(r.value)}
            disabled={loading}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/40">Role</p>
              <p className="mt-1 font-semibold">{r.label}</p>
            </div>
            <span className="rounded-full bg-lime px-3 py-1 text-xs font-semibold text-ink">
              Enter
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
