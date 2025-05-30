import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useAuth } from './store/auth';

export function AdminUpdate() {
  const [data, setData] = useState(null); // Set initial state to null to detect when data is fetched
  const [loading, setLoading] = useState(true); // New state to handle loading
  const params = useParams();
  const { AuthorizationToken } = useAuth();

  const getSingleUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/users/${params.id}`, {
        method: 'GET',
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const result = await response.json();
      console.log('User single data:', result);

      if (response.ok) {
        setData({
          username: result.data.username,  // Ensure a fallback to an empty string
          email: result.data.email,
          phone: result.data.phone,
        });
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    } finally {
      setLoading(false); // Stop loading after fetch is complete
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/admin/users/update/${params.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Updated successfully!");
      } else {
        alert("Failed to update.");
      }

    } catch (error) {
      console.log('Error updating user data:', error);
    }
  };

  // Conditionally render the form only when data is available
  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }

  if (!data) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <div className="update">
        <div className="upleft"></div>
        <div className="upright">
          <div className="upform">
            <h1>Update User</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label className='labels' htmlFor="username">Username</label>
                <input
                  type="text"
                  name='username'
                  id='username'
                  required
                  autoComplete='off'
                  value={data.username}
                  onChange={handleInput}
                />
              </div>
              <div>
                <label className='labels' htmlFor="email">Email</label>
                <input
                  type="email"
                  name='email'
                  required
                  autoComplete='off'
                  value={data.email}
                  onChange={handleInput}
                />
              </div>
              <div> 
                <label className='labels' htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  name='phone'
                  id='phone'
                  required
                  autoComplete='off'
                  value={data.phone}
                  onChange={handleInput}
                />
              </div>
              <button type='submit' className='submit'>Modify</button>
            </form>
          </div>       
        </div>
        <Outlet />
      </div>
    </>
  );
}
