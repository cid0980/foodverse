export default function Header({ user, onLogout }) {
  return (
    <header className="relative overflow-hidden border-b border-ink/10 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-ink/50">FoodVerse</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">Order Command</h1>
          <p className="mt-1 text-sm text-ink/60">Bold workflows for users, vendors, and riders.</p>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-right text-xs">
                <p className="font-semibold">{user.name}</p>
                <p className="text-ink/60">{user.role}</p>
              </div>
              <button
                className="rounded-full border border-ink/20 px-4 py-2 text-xs font-semibold"
                onClick={onLogout}
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="rounded-full border border-ink/10 bg-white px-4 py-2 text-xs text-ink/60">
              Select a role to start
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
