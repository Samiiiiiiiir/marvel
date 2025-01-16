import { useState, useCallback } from 'react';

export const useHttp = (initializeStatus) => {
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

        setStatus('loaded');
        const data = await response.json();
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
