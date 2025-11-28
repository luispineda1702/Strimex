import React from "react";
import ProfileScreen from "./ProfileScreen";
import { useAuth } from "../hooks/useAuth";

const ProfileWrapper = () => {
  const { logout } = useAuth();
  return <ProfileScreen onLogout={logout} />;
};

export default ProfileWrapper;
