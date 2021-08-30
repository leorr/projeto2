import React from 'react';

export default function Dashboard() {
  const handleSubmit = e => {
    window.onunload = function () {
    sessionStorage.removeItem('token');
}
  }
  return(
    <div className="dashboard-wrapper">
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
