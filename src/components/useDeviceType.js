const { useState, useEffect } = require("react");

const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobile = /mobile/i.test(userAgent);
    setIsMobile(mobile);
  }, []);

  return isMobile;
};

export default useDeviceType;
