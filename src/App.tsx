import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchChat, setCurrentDelta } from "./store/features/chat";
import selectors from "./store/selectors";

function App() {
  const dispatch = useDispatch();
  const { isLoaded, currentDelta } = useSelector(selectors.chat.getRootState);
  const items = useSelector(selectors.chat.getItems);
  const nextDelta = useSelector(selectors.chat.getNextDelta);

  useEffect(() => {
    dispatch(fetchChat());
  }, [dispatch]);

  useEffect(() => {
    if (nextDelta === null || !isLoaded) {
      return;
    }
    const time = nextDelta - currentDelta;
    setTimeout(() => {
      dispatch(setCurrentDelta(nextDelta));
    }, time);
  }, [isLoaded, currentDelta, nextDelta, dispatch]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return <div>chat simulator</div>;
}

export default App;
