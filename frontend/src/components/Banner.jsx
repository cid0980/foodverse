export default function Banner({ tone = 'info', children }) {
  const styles = {
    info: 'border-ink/10 bg-white/90 text-ink',
    warn: 'border-coral/40 bg-coral/15 text-coral'
  };
  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm shadow-soft ${styles[tone]}`}>
      {children}
    </div>
  );
}
