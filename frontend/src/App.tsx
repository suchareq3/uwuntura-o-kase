import { useEffect, useState } from 'react'
import './App.css'

import { ClientResponseError } from 'pocketbase';
import { useDisclosure } from '@mantine/hooks';
import pb from './lib/pb';
import { LoadingOverlay, Button, Box } from '@mantine/core';
import { useNavigate } from 'react-router';


function App() {
  const [visible, { open, close }] = useDisclosure(false);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      open();

      await pb.collection("_superusers").authWithPassword(import.meta.env.VITE_BACKEND_ADMIN_EMAIL, import.meta.env.VITE_BACKEND_ADMIN_PASSWORD)
      .catch((err: ClientResponseError ) => {
        // autocancelled ("aborted") errors are intended here - https://github.com/pocketbase/pocketbase/discussions/3491
        if (!err.isAbort) {
          setError(err.originalError);
        }
      })
      .finally(() => {
        close();
      })
    }
    authenticate();
  }, []);

  return (
    <Box pos="relative">
      <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }}/>
      {error ? 
      (
        <h1>{(error as Error).message + " " + (error as Error).name}</h1>
      ) : 
      ( 
        <>
          <h1>Connected to the Awantura database</h1>
          <Button onClick={() => navigate("/admin-panel")}>Admin Panel</Button>
        </>
      )}
    </Box>
  )
}
export default App;
