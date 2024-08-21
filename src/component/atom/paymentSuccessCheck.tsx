import { useState, useEffect } from "react";
import Confetti from "react-confetti";

import useWindowSize from "react-use/lib/useWindowSize";
function PaymentSuccessCheck() {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    // Simulate payment process
    setTimeout(() => {
      setShowConfetti(true);
    }, 30);
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000); // Stop confetti after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [showConfetti]);
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-12 h=12 text-green-500"
        >
          <path
            fill-rule="evenodd"
            d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

export default PaymentSuccessCheck;
