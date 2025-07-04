export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Welcome to FunnelFlow</h1>
        <p style={{ fontSize: '1.25rem', color: '#555' }}>
          Your application is live.
        </p>
        <p style={{ marginTop: '1rem', color: '#777' }}>
          We have successfully resolved the build issues. We can now proceed with building your app's features.
        </p>
      </header>
    </main>
  );
}