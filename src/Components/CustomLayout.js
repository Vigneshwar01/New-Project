import React from "react";
import { Button, message } from "antd";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/authslice";
const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background: #1890ff;
  color: white;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const NavLink = styled(Link)`
  margin-right: 20px;
  color: white;
  font-size: 18px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #ff4d4f;
  color: white;
  border: none;
  &:hover {
    background-color: #ff7875;
  }
`;

const UserName = styled.span`
  margin-right: 20px;
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const CustomLayout = ({ children, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    message.success("Logged out successfully");
    navigate("/");
  };
  return (
    <div>
      <HeaderWrapper>
        <Title>Notes</Title>

        <Nav>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/notes">Notes</NavLink>

          {user && (
            <div>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </div>
          )}
        </Nav>
      </HeaderWrapper>

      <main style={{ padding: "20px" }}>{children}</main>
    </div>
  );
};

export default CustomLayout;
