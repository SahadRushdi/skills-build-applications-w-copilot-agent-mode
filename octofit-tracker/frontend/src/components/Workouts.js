import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    console.log('Workouts component: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Workouts component: fetched data', data);
        const records = Array.isArray(data) ? data : data.results || [];
        setWorkouts(records);
        setLoading(false);
      })
      .catch(err => {
        console.error('Workouts component: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="container mt-4 mb-5">
      <div className="card data-card">
        <div className="card-header bg-info text-dark d-flex align-items-center">
          <span className="me-2 fs-5">💪</span>
          <h2 className="h5 mb-0">Workouts</h2>
          {!loading && !error && (
            <span className="badge bg-dark ms-auto">{workouts.length} record{workouts.length !== 1 ? 's' : ''}</span>
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
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Workout Name</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">No workouts found.</td>
                    </tr>
                  ) : (
                    workouts.map((workout, idx) => (
                      <tr key={workout._id || idx}>
                        <td className="text-muted">{idx + 1}</td>
                        <td><strong>{workout.name}</strong></td>
                        <td>{workout.description || <span className="text-muted">-</span>}</td>
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

export default Workouts;
