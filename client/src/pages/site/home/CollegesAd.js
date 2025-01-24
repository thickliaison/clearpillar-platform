import { useEffect, useState, useRef } from 'react';
import schools from 'constants/schools';
import styles from 'styles/CollegesAd.module.css'

function CollegesAd() {
  const galleryRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // auto scroll effect
  useEffect(() => {
    const gallery = galleryRef.current;
    let scrollAmount = 0;
    let scrollInterval;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (gallery) {
          scrollAmount += 2; // scroll speed
          if (scrollAmount >= gallery.scrollWidth - gallery.clientWidth) {
            scrollAmount = 0; // restart if reached end, but jumps/stutters to the beginning. also pauses when tab not in focus
          }
          gallery.scrollLeft = scrollAmount;
        }
      }, 30); //interval for smoothness
    };

    // stops when user interacts with the scroll bar
    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
      setIsAutoScrolling(false);
    };

    // Start auto-scroll on component mount
    if (isAutoScrolling) startAutoScroll();

    // Stop auto-scroll on user interaction
    const handleUserInteraction = () => stopAutoScroll();
    gallery.addEventListener('mousedown', handleUserInteraction);

    // Clean up intervals and listeners
    return () => {
      clearInterval(scrollInterval);
      gallery.removeEventListener('mousedown', handleUserInteraction);
    };
  }, [isAutoScrolling]);

  return (
    <div className={styles.section}>
      <div ref={galleryRef} className={styles.gallery}>
        {schools.map((school) => (
          <div key={school.name} className={styles["image-item"]}>
            <a href={school.link} target="_blank" rel="noopener noreferrer">
              <img src={school.logo} alt={school.name} title={school.name} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CollegesAd;
