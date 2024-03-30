import React, { useState, useEffect, useContext } from "react";
import * as Api from "../service/api";
import dig from "object-dig";
import { AuthContext } from "../providers/AuthProvider";
import ToDoList from "./ToDoList";
import { TextField, Button, Container, Box, Typography} from "@mui/material";
import { styled } from "@mui/system";

const FormBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: "#f5f5f5",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

const Dashboard = () => {
  const currentUser = useContext(AuthContext);
  const [inputName, setInputName] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch();
  }, [currentUser]);

  const fetch = async () => {
    if (dig(currentUser, "currentUser", "uid")) {
      try {
        const data = await Api.initGet(currentUser.currentUser.uid);
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
  };

  const formRender = () => {
    let dom;
    if (dig(currentUser, "currentUser", "uid")) {
      dom = (
        <FormBox>
          <Typography variant="h6" gutterBottom>
            新しいタスクを追加
          </Typography>
          <TextField
            label="タスク名"
            value={inputName}
            onChange={(event) => setInputName(event.currentTarget.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={post}>
            追加
          </Button>
        </FormBox>
      );
    }
    return dom;
  };

  const post = () => {
    Api.addTodo(inputName, currentUser.currentUser.uid)
      .then(() => {
        setInputName("");
        fetch();
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  return (
    <Container disableGutters>
      {formRender()}
      <ToDoList todos={todos} fetch={fetch} />
    </Container>
  );
};

export default Dashboard;