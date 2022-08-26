import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 50px 60px;
`;

export const Title = styled.h2`
  font-size: 24px;
  line-height: 1;
  margin: 0;
  margin-bottom: 8px;
`;
export const Info = styled.div`
  color: #4a5763;
  max-width: 220px;
  text-align: right;
  margin-bottom: 16px;
`;
export const Input = styled.input`
  width: 270px;
  height: 56px;
  font-size: 14px;
  line-height: 24px;
  color: #bdbdbd;
  border: none;
  border-radius: 2px;
  margin-bottom: 10px;
`;
