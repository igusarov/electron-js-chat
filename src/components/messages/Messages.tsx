import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  gridStep,
  messageBackground,
  statusBackground,
} from "../../css-variables";
import selectors from "../../store/selectors";

const List = styled.div`
  height: 100%;
  flex-direction: row;
  overflow: auto;
  background-color: #ebecec;
  padding: ${gridStep}px;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: "flex-start";
`;

const MessageBlock = styled.div`
  flex-basis: 300px;
`;

const MessageInfo = styled.div`
  color: #b74747;
  margin-left: ${gridStep * 2}px;
  margin-bottom: ${gridStep}px;
  font-style: italic;
  font-size: 12px;
  font-weight: bold;
}
`;

const MessageWrap = styled.div<{ isMessage: boolean }>`
  background-color: ${({ isMessage }) =>
    isMessage ? messageBackground : statusBackground};
  font-style: ${({ isMessage }) => (isMessage ? "inherit" : "italic")};
  font-size: ${({ isMessage }) => (isMessage ? "inherit" : "12px")};
  color: #646464;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export default React.memo(() => {
  const listRef = useRef<HTMLDivElement>(null);
  const items = useSelector(selectors.chat.getMessages);

  useEffect(() => {
    listRef?.current?.scrollTo(0, listRef.current.scrollHeight);
  }, [items]);

  return (
    <List ref={listRef}>
      {items.map(({ id, isMessage, userName, text }) => (
        <MessageContainer key={id}>
          <MessageBlock>
            <MessageInfo>{userName}</MessageInfo>
            <MessageWrap isMessage={isMessage}>{text}</MessageWrap>
          </MessageBlock>
        </MessageContainer>
      ))}
    </List>
  );
});
