import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

const Details = () => {
  const componentRef = useRef();

  return (
    <div>
      <div ref={componentRef}>
        <h1>Print Me!</h1>
        <p>This is some data that you can print.</p>
      </div>
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
    </div>
  );
};

export default Details;
