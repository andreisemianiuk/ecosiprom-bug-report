import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 50px 60px;
`;
export const CrossWrapper = styled.div`
  position: absolute;
  top: 18.5px;
  right: 18.5px;
`;
export const CrossIconWrapper1 = styled.span`
  position: absolute;
  top: 0;
  right: 0;
`;
export const CrossIconWrapper2 = styled.span`
  position: absolute;
  top: 0;
  right: 0;
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
export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
`;
export const Input = styled.input`
  width: 270px;
  height: 56px;
  font-size: 14px;
  line-height: 24px;
  /*color: #bdbdbd;*/
  border: none;
  border-radius: 2px;
  padding-left: 40px;
`;
export const IconWrapper = styled.div`
  position: absolute;
  top: 18px;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;
