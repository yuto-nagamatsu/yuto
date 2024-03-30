import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { Card, CardContent, Typography, Grid, Container } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";
import dig from "object-dig";
import { styled } from "@mui/material/styles";

const DataCard = styled(Card)(({ theme, isCurrentUser }) => ({
transition: "box-shadow 0.3s",
backgroundColor: isCurrentUser ? theme.palette.primary.light : theme.palette.background.paper,
"&:hover": {
    boxShadow: theme.shadows[6],
},
}));

const PublicDataList = () => {
const [dataList, setDataList] = useState([]);
const currentUser = useContext(AuthContext);

useEffect(() => {
    fetchDataList();
}, []);

const fetchDataList = async () => {
    const querySnapshot = await firebase.firestore().collection("demodata").get();
    const data = querySnapshot.docs.map((doc) => {
    const docData = doc.data();
    const timestamp = Object.keys(docData)[0];
    return {
        id: doc.id,
        ...docData[timestamp],
    };
    });
    setDataList(data);
};

return (
    <Container disableGutters>
    <Grid container spacing={2}>
        {dataList.map((item, index) => {
        const isCurrentUser = item.id === dig(currentUser, "currentUser", "uid");
        return (
            <Grid item xs={12} sm={6} md={4} key={index}>
            <DataCard isCurrentUser={isCurrentUser}>
                <CardContent>
                <Typography variant="h6">name : {item.name}</Typography>
                <Typography>Battery: {item.battery}%</Typography>
                <Typography>Sleep Time: {item.sleepTime} hours</Typography>
                <Typography>Heart Rate: {item.heartRate} bpm</Typography>
                <Typography>Activity: {item.activity.kind}</Typography>
                <Typography>Time: {item.time}</Typography>
                </CardContent>
            </DataCard>
            </Grid>
        );
        })}
    </Grid>
    </Container>
);
};

export default PublicDataList;