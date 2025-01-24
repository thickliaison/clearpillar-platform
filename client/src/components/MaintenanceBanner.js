import React from 'react';
import styles from 'styles/Maintenance.module.css'

function MaintenanceBanner() {
    return (
      <div className={`alert alert-danger ${styles.alert}`} role="alert">
        <i className="fa-lg fa-solid fa-triangle-exclamation" style={{ padding: '10px' }}></i>
        This website is still under construction <i className="fa-solid fa-person-digging"></i>. 
        Please check back in the future!
      </div>
    );
}

export default MaintenanceBanner;
