import { useReadTest } from "@/data/common/useReadTest";
import React, { useEffect } from "react";

const Testpage = () => {
  const { readTest } = useReadTest();
  useEffect(() => {
    readTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>Testpage</div>;
};

export default Testpage;
