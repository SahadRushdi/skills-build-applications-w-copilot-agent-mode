import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log('Users component: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Users component: fetched data', data);
        const records = Array.isArray(data) ? data : data.results || [];
        setUsers(records);
        setLoading(false);
      })
      .catch(err => {
        console.error('Users component: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="container mt-4 mb-5">
      <div className="card data-card">
        <div className="card-header bg-primary text-white d-flex align-items-center">
          <span className="me-2 fs-5">👤</span>
          <h2 className="h5 mb-0">Users</h2>
          {!loading && !error && (
            <span className="badge bg-light text-dark ms-auto">{users.length} record{users.length !== 1 ? 's' : ''}</span>
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
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Team</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">No users found.</td>
                    </tr>
                  ) : (
                    users.map((user, idx) => (
                      <tr key={user._id || idx}>
                        <td className="text-muted">{idx + 1}</td>
                        <td><strong>{user.username}</strong></td>
                        <td>{user.email}</td>
                        <td>{user.team ? <span className="badge bg-secondary">{user.team}</span> : <span className="text-muted">-</span>}</td>
                        <td>
                          {user.is_active
                            ? <span className="badge bg-success">Active</span>
                            : <span className="badge bg-danger">Inactive</span>}
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

export default Users;
