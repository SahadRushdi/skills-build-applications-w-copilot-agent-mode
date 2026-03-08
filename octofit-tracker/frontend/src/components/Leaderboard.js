import React, { useState, useEffect } from 'react';

const MEDALS = ['🥇', '🥈', '🥉'];

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Leaderboard component: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Leaderboard component: fetched data', data);
        const records = Array.isArray(data) ? data : data.results || [];
        const sorted = [...records].sort((a, b) => b.points - a.points);
        setEntries(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error('Leaderboard component: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="container mt-4 mb-5">
      <div className="card data-card">
        <div className="card-header bg-danger text-white d-flex align-items-center">
          <span className="me-2 fs-5">📊</span>
          <h2 className="h5 mb-0">Leaderboard</h2>
          {!loading && !error && (
            <span className="badge bg-light text-dark ms-auto">{entries.length} team{entries.length !== 1 ? 's' : ''}</span>
          )}
        </div>
        <div className="card-body p-0">
          {error && (
            <div className="alert alert-danger m-3">
              <strong>Error:</strong> {error}
            </div>
          )}
          {loading ? (
            <div className="spinner-center">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Team</th>
                    <th scope="col">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">No leaderboard entries found.</td>
                    </tr>
                  ) : (
                    entries.map((entry, idx) => (
                      <tr key={entry._id || idx} className={idx === 0 ? 'table-warning' : ''}>
                        <td className="rank-medal">
                          {idx < 3 ? MEDALS[idx] : <span className="text-muted fw-bold">{idx + 1}</span>}
                        </td>
                        <td><strong>{entry.team}</strong></td>
                        <td>
                          <span className={`badge ${
                            idx === 0 ? 'bg-warning text-dark' :
                            idx === 1 ? 'bg-secondary' :
                            idx === 2 ? 'bg-danger' : 'bg-primary'
                          } fs-6`}>{entry.points} pts</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
