import React, { useState, useEffect, useRef } from "react";

import ErrorModal from "components/UI/ErrorModal/ErrorModal";

const WithErrorHandler = (WrappedComponent, axios) => {
  return function Wrap(props) {
    const mounted = useRef(false);
    const [error, setError] = useState(false);

    let reqInterceptor, resInterceptor;

    if (!mounted.current) {
      reqInterceptor = axios.interceptors.request.use((req) => {
        setError(null);
        return req;
      });

      resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          setError(error);
        }
      );
    }

    useEffect(() => {
      mounted.current = true;
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
      // eslint-disable-next-line
    }, []);

    return (
      <>
        <ErrorModal show={error} closeModal={() => setError(false)}>
          <p>Oops... {(error && error.message) || "Something went wrong"}!</p>
        </ErrorModal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default WithErrorHandler;
