import { useSelector, shallowEqual } from "react-redux";

export const useMemoizedSelector = (selector, equalityFn = shallowEqual) => {
  return useSelector(selector, equalityFn);
};
