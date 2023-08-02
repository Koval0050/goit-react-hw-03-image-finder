import React from 'react';
import { Rings } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Rings
      height="380"
      width="380"
      color="#4fa94d"
      radius="6"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="rings-loading"
    />
  );
};

export default Loader;
