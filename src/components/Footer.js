    import React from "react";
    import { Box, Typography } from "@mui/material";
    import { styled } from "@mui/system";

    const FooterBox = styled(Box)(({ theme }) => ({
        width: "100%",
        height: 56,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#ffffff",
        backgroundColor: "rgba(26, 35, 126, 0.8)", 
        position: "fixed",
        bottom: 0,
        backdropFilter: "blur(8px)",
    }));
    
    const Footer = () => {
    return (
        <FooterBox>
        <Typography variant="body2">© 2023 Your Company. All rights reserved.</Typography>
        </FooterBox>
    );
    };

    export default Footer;