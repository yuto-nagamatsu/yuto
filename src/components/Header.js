import React, { useContext, useState } from "react";
import dig from "object-dig";
import { signInWithGoogle, logOut } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from 'react-router-dom';
import { styled } from "@mui/system";

const HeaderButton = styled(Button)(({ theme }) => ({
    color: "#ffffff",
    borderColor: "#ffffff",
    "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "#ffffff",
    },
}));

const Header = () => {
    const currentUser = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    
    const handleMenuItemClick = (page) => {
        handleMenuClose();
        navigate(page);
    };
    
    const buttonRender = () => {
        let buttonDom;
        if (dig(currentUser, "currentUser", "uid")) {
        buttonDom = (
            <HeaderButton variant="outlined" onClick={logOut}>
            ログアウト
            </HeaderButton>
        );
        } else {
        buttonDom = (
            <HeaderButton variant="outlined" onClick={signInWithGoogle}>
            ログイン
            </HeaderButton>
        );
        }
        return buttonDom;
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#1a237e" }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuOpen}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem component={Link} to="/" onClick={() => handleMenuItemClick("/")}>
                        Data List
                    </MenuItem>
                    <MenuItem component={Link} to="/dashboard" onClick={() => handleMenuItemClick("/dashboard")}>
                        Dashboard
                    </MenuItem>
                    <MenuItem component={Link} to="/profile" onClick={() => handleMenuItemClick("/profile")}>
                        User Profile
                    </MenuItem>
                    <MenuItem component={Link} to="/public" onClick={() => handleMenuItemClick("/public")}>
                        Public Data
                    </MenuItem>
                </Menu>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Fitbit Data Viewer
                </Typography>
                {buttonRender()}
            </Toolbar>
        </AppBar>
    );
};

export default Header;