import hotkeys from "hotkeys-js";
import { useCallback, useEffect } from "react";

export function useHotkeys(keys, callback, deps = []) {
  const memoisedCallback = useCallback(callback, deps);

  useEffect(() => {
    hotkeys.filter = () => true;
    hotkeys(keys, memoisedCallback);

    return () => hotkeys.unbind(keys);
  }, [keys, memoisedCallback]);
}
