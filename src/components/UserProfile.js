import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { AuthContext } from "../providers/AuthProvider";
import { Avatar, Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const UserProfilePaper = styled(Paper)(({ theme }) => ({
display: "flex",
flexDirection: "column",
alignItems: "center",
padding: theme.spacing(4),
borderRadius: theme.shape.borderRadius,
backgroundColor: "#f5f5f5",
boxShadow: theme.shadows[3],
marginTop: theme.spacing(4),
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
width: theme.spacing(12),
height: theme.spacing(12),
marginBottom: theme.spacing(2),
backgroundColor: "#1976d2",
}));

const UserProfile = () => {
const { currentUser } = useContext(AuthContext);
const [userData, setUserData] = useState(null);

useEffect(() => {
    if (currentUser) {
    fetchUserData();
    }
}, [currentUser]);

const fetchUserData = async () => {
    try {
    const userRef = firebase.firestore().collection("users").doc(currentUser.uid);
    const doc = await userRef.get();
    if (doc.exists) {
        setUserData(doc.data());
    }
    } catch (error) {
    console.error("Error fetching user data:", error);
    }
};

return (
    <Box display="flex" justifyContent="center">
    <UserProfilePaper>
        {userData ? (
        <>
            <UserAvatar alt={userData.name} />
            <Typography variant="h5" gutterBottom style={{ color: "#333" }}>
            {userData.name}
            </Typography>
            <Typography variant="body1" gutterBottom style={{ color: "#666" }}>
            メールアドレス: {userData.email}
            </Typography>
            <Typography variant="body1" gutterBottom style={{ color: "#666" }}>
            年齢: {userData.age}
            </Typography>
            <Typography variant="body1" gutterBottom style={{ color: "#666" }}>
            身長: {userData.height} cm
            </Typography>
        </>
        ) : (
        <Typography variant="body1" style={{ color: "#666" }}>
            ユーザーデータの読み込み中...
        </Typography>
        )}
    </UserProfilePaper>
    </Box>
);
};

export default UserProfile;