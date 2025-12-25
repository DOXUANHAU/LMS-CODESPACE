import React, { useState, useContext, useMemo } from "react";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const { user } = useContext(AuthContext);

  const roomsCondition = useMemo(() => ({
    fieldName: "members",
    operator: "array-contains",
    compareValue: user?.uid,
  }), [user?.uid]);

  const rooms = useFirestore("rooms", roomsCondition);

  const selectedRoom = useMemo(() => rooms.find((room) => room.id === selectedRoomId) || {}, [rooms, selectedRoomId]);

  const usersCondition = useMemo(() => ({
    fieldName: "uid",
    operator: "in",
    compareValue: selectedRoom.members || [],
  }), [selectedRoom.members]);

  const members = useFirestore("users", usersCondition);

  const clearState = () => {
    setSelectedRoomId("");
    setIsAddRoomVisible(false);
    setIsInviteMemberVisible(false);
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        selectedRoom,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        clearState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
