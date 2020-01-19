import { useState, useEffect } from 'react';
import { proxy, wrap } from 'comlink';

export const useComlink = (worker_js, callback) => {
  const [used, setUsed] = useState(false);
  const [worker] = useState(() => wrap(worker_js));
  const [service, setService] = useState(void 0);
  useEffect(() => {
    if (worker && callback && !used) {
      let proxyService = worker(proxy(callback));
      setService(proxyService);
      setUsed(true);
    }
  }, [worker, used, callback]);

  return { service, worker };
};
