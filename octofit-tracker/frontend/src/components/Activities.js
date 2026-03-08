import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    console.log('Activities component: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Activities component: fetched data', data);
        const records = Array.isArray(data) ? data : data.results || [];
        setActivities(records);
        setLoading(false);
      })
      .catch(err => {
        console.error('Activities component: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="container mt-4 mb-5">
      <div className="card data-card">
        <div className="card-header bg-warning text-dark d-flex align-items-center">
          <span className="me-2 fs-5">🏃</span>
          <h2 className="h5 mb-0">Activities</h2>
          {!loading && !error && (
            <span className="badge bg-dark ms-auto">{activities.length} record{activities.length !== 1 ? 's' : ''}</span>
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
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">Activity Type</th>
                    <th scope="col">Duration (min)</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">No activities found.</td>
                    </tr>
                  ) : (
                    activities.map((activity, idx) => (
                      <tr key={activity._id || idx}>
                        <td className="text-muted">{idx + 1}</td>
                        <td>{activity.user}</td>
                        <td><span className="badge bg-secondary">{activity.activity_type}</span></td>
                        <td><strong>{activity.duration}</strong> min</td>
                        <td>{activity.date}</td>
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

export default Activities;
