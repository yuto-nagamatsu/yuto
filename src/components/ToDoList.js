import React from "react";
import * as Api from "../service/api";
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

const ToDoListBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
    backgroundColor: "#ffffff",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    overflow: "hidden",
}));

const ToDoListItem = styled(ListItem)(({ theme }) => ({
    transition: "background-color 0.3s",
    "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
}));

const ToDoList = (props) => {
const deleteHandle = (id) => {
    Api.todoDelete(id);
    props.fetch();
};

const checkHandle = async (id) => {
    await Api.toggleComple(id);
    props.fetch();
};

const todoList = props.todos.map((todo) => {
    return (
        <ToDoListItem key={todo.id}>
        <Checkbox checked={todo.completed} onChange={() => checkHandle(todo.id)} color="primary" />
        <ListItemText primary={todo.content} />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => deleteHandle(todo.id)}>
            <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
        </ToDoListItem>
    );
    });

    return (
        <ToDoListBox>
        <Typography variant="h6" align="center" gutterBottom>
            タスク一覧
        </Typography>
        <List>{todoList}</List>
        </ToDoListBox>
        );
};

export default ToDoList;