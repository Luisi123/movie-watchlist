if (!token) {
    return { valid: false };
  }
  
  try {
    const response = await fetch(`${AUTH_BASE_URL}/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      // Token is invalid or expired, clear local storage
      logout();
      throw new Error(data.message || 'Token verification failed');
    }

    return { valid: true, user: data.user };
  } catch (error) {
    console.error('Token verification error:', error);
    return { valid: false };
  };