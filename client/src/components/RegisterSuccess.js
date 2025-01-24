import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RegisterSuccess() {
  return (
    <div> Registration was succesful! 
        Please <Link to='/login'> log in </Link> now using your information.
    </div>
  );
}

export default RegisterSuccess;
