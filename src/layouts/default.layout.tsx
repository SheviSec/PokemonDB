import { SynchronizeData } from "@/components/synchronize-data/synchronize.component";
import { Menu } from "@mui/icons-material";
import { AppBar, Box, Button, Container, IconButton } from "@mui/material";
import { ReactNode, useState } from "react";

type DefaultLayoutProps = {
  children: ReactNode;
};

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Container sx={{ paddingTop: "70px" }}>
        <AppBar
          sx={{
            height: "50px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            pl: 1,
            pr: 1,
          }}
        >
          <Box>
            <IconButton>
              <Menu />
            </IconButton>
          </Box>
          <Box>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              color="success"
              variant="contained"
            >
              Synchronize Pokédex
            </Button>
          </Box>
        </AppBar>
        {children}
      </Container>
      {isOpen && <SynchronizeData onClose={onClose} isOpen={isOpen} />}
    </>
  );
};
