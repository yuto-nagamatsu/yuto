import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { Card, CardContent, Typography, Grid, Button, CardActions, CardHeader, IconButton, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../providers/AuthProvider";
import dig from "object-dig";
import { styled } from "@mui/material/styles";

const DataCard = styled(Card)(({ theme }) => ({
    transition: "box-shadow 0.3s",
    "&:hover": {
    boxShadow: theme.shadows[6],
    },
}));

const DataList = () => {
    const [dataList, setDataList] = useState([]);
    const currentUser = useContext(AuthContext);

    useEffect(() => {
        if (dig(currentUser, "currentUser", "uid")) {
        fetchDataList();
        }
    }, [currentUser]);

    const fetchDataList = async () => {
        const querySnapshot = await firebase.firestore().collection("dataList").get();
        const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));
        setDataList(data);
    };

    const addItem = async () => {
        await firebase.firestore().collection("dataList").add({
        Activesummary: {
            kind: "walk",
            time: 60,
        },
        Sleepsummary: {
            score: 90,
            time: 300,
        },
        location: {
            latitude: 36.186497,
            longitude: 137.94223,
            time: "2024年3月28日 0:00:00 UTC+9",
        },
        });
        fetchDataList();
    };

    const deleteItem = async (itemId) => {
        await firebase.firestore().collection("dataList").doc(itemId).delete();
        fetchDataList();
    };

    if (!dig(currentUser, "currentUser", "uid")) {
        return null;
    }

    return (
        <Container disableGutters>
        <Button variant="contained" color="primary" onClick={addItem} sx={{ marginBottom: 2 }}>
            Add Item
        </Button>
        <Grid container spacing={2}>
            {dataList.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
                <DataCard>
                <CardHeader
                    action={
                    <IconButton aria-label="delete" onClick={() => deleteItem(item.id)}>
                        <DeleteIcon />
                    </IconButton>
                    }
                    title={<Typography variant="h6">Summary</Typography>}
                />
                <CardContent>
                    <Typography variant="h6">Active Summary</Typography>
                    <Typography>Kind: {item.Activesummary.kind}</Typography>
                    <Typography>Time: {item.Activesummary.time}</Typography>
                    <Typography variant="h6">Sleep Summary</Typography>
                    <Typography>Score: {item.Sleepsummary.score}</Typography>
                    <Typography>Time: {item.Sleepsummary.time}</Typography>
                    <Typography variant="h6">Location</Typography>
                    <Typography>Latitude: {item.location.latitude}</Typography>
                    <Typography>Longitude: {item.location.longitude}</Typography>
                    {/* <Typography>Time: {item.location.time.toDate().toLocaleString()}</Typography> */}
                    <Typography>Time: {item.createdAt}</Typography>                
                    {/* <Typography>Time: {item.location.time}</Typography> */}                
                    {/* <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteItem(item.id)}
                    >
                    Delete
                    </Button> */}
                    </CardContent>
                </DataCard>
            </Grid>
            ))}
        </Grid>
        </Container>
    );
};
export default DataList;

