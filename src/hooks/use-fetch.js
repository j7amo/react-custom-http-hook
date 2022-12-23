import { useCallback, useState } from 'react';

// this is a custom hook... why?
// 1) it starts with 'use'
// 2) it's using native React hooks (e.g. useState, useCallback)

// Why do we need it? Because we want to extract the duplicating logic and reuse it via the hook
// inside different components (as we usually do with regular JS functions).

// Why can't we then just extract all this stuff inside a regular JS function?
// Because we can't use React hooks inside regular JS functions!
// This is one of the rules that we must follow if we want to be happy =)
const useFetch = () => {
  // Moreover, this extracted logic is STATEFUL! When we use our new and shiny 'useFetch' hook
  // inside a React component these state slices attach to that component!
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let data;

  const sendRequest = useCallback(
    async (requestConfig, applyData) => {
      const {
        url, method = 'GET', headers = {}, body = null,
      } = requestConfig;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
        });

        if (!response.ok) {
          throw new Error('Request failed!');
        }

        data = await response.json();
        applyData(data);
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },
    // Despite this hook using a lot of stuff we don't really need to put anything inside
    // dependencies array because this array only wants custom variables defined outside the hook.
    // In this case we see that:
    // - 'requestConfig', 'applyData' are the function parameters,
    // and they are defined right here on the fly!
    // - 'setIsLoading', 'setError' are React state setters which React guarantees
    // to be the same between component renders;
    // - all other variables are defined inside the hook;
    [],
  );

  // we can return basically anything from a custom hook
  // in this case we return all the stuff that component wants to use:
  return [isLoading, error, sendRequest];
};

export default useFetch;
