import { useState, useCallback } from 'react';

export const useHttp = (initializeStatus = false) => {
  const [status, setStatus] = useState(initializeStatus);

  const request = useCallback(
    async (
      url,
      method = 'GET',
      body = null,
      headers = { 'Content-type': 'application/json' }
    ) => {
      setStatus('loading');

      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();
        setStatus('loaded');
        return data;
      } catch (e) {
        setStatus('error');
        throw e;
      }
    },
    []
  );
  return { status, request };
};
