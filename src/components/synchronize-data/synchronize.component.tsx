import { Box, Card, CardContent, Dialog, Typography } from "@mui/material";
import { useSynchronization } from "./use-synchronization.hook";
import { useEffect } from "react";

type SynchronizeDataProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SynchronizeData = ({ isOpen, onClose }: SynchronizeDataProps) => {
  const { allPokemonData, isLoading, isLoadingData } = useSynchronization();

  useEffect(() => {
    if (!isLoading) onClose();
  }, [isLoading, onClose]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Card>
        <CardContent>
          <Box textAlign={"center"}>
            <Typography>Catching them all, please wait a moment...</Typography>
            {isLoadingData && (
              <Typography variant="caption">{isLoadingData}...</Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  );
};
