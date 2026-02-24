import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, roles } from '../context/AuthContext';
import Banner from '../components/Banner';

export default function SignupPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/restaurants');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <div className="card p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Sign up</p>
        <h1 className="mt-2 text-2xl font-semibold text-ink">Create account</h1>
        <p className="mt-2 text-sm text-ink/60">Choose the role you need.</p>
        <form className="mt-6 grid gap-3" onSubmit={handleSubmit}>
          <input
            className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
        <input
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
        />
        <input
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
        />
        <select
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
          value={form.role}
          onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
        >
          {roles.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
          <button className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-sand" disabled={loading}>
            Sign up
          </button>
        </form>
        {error ? <div className="mt-4"><Banner tone="warn">{error}</Banner></div> : null}
        <p className="mt-6 text-xs text-ink/60">
          Already have an account? <Link to="/login" className="font-semibold text-ink">Login</Link>
        </p>
      </div>
    </div>
  );
}
