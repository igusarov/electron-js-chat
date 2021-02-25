import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChat, setCurrentDelta } from "./store/features/chat";
import selectors from "./store/selectors";
import { Container, Content, Footer, Header } from "./components/layout/Layout";
import Messages from "./components/messages/Messages";

function App() {
  const dispatch = useDispatch();
  const { isLoaded, currentDelta } = useSelector(selectors.chat.getRootState);
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

  return (
    <Container>
      <Header />
      <Content>
        <Messages />
      </Content>
      <Footer />
    </Container>
  );
}

export default App;
