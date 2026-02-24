import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <div className="card p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-lime bg-white">
            <span className="h-8 w-8 rounded-full bg-ink" />
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-ink">{user?.name}</p>
            <p className="text-xs text-ink/60">{user?.email}</p>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {['Payment methods', 'Order history', 'Saved addresses', 'Support'].map((item) => (
            <div key={item} className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white px-4 py-3 shadow-soft">
              <span className="text-sm font-semibold text-ink">{item}</span>
              <span className="text-ink/30">›</span>
            </div>
          ))}
        </div>
        <button className="mt-6 w-full rounded-2xl bg-coral py-3 text-sm font-semibold text-white" onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
}
