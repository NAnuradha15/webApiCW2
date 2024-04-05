import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useState } from "react";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function App() {
  const [data, setData] = useState([]);
  const [district, setdistrict] = useState("");
  const [humidity, sethumidity] = useState("");
  const [airPressure, setAirPressure] = useState("");
  const [temperature, setTemperature] = useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/getdata");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every five minutes
    const interval = setInterval(fetchData, 300000);

    // Clean up function to clear the interval
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run only on mount
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBoVslhdnBJ2UmvVy0vXqLbAMQm6mWPaZk",
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (item) => {
    setdistrict(item.district);
    setAirPressure(item.airpressure);
    setTemperature(item.temperature);
    sethumidity(item.humidity);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      {isLoaded ? (
        <GoogleMap
          center={{
            lat: 7.8548845,
            lng: 78.0635329,
          }}
          zoom={8}
          mapContainerStyle={{
            width: "100%",
            height: "100vh",
          }}
        >
          {data.length &&
            data.map((item, index) => (
              <MarkerF
                key={index}
                position={{ lat: item.lat, lng: item.lng }}
                onClick={() => handleClickOpen(item)}
                title={item.district}
              ></MarkerF>
            ))}
        </GoogleMap>
      ) : null}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Typography variant="h3" gutterBottom>
            {district}
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography variant="h4" gutterBottom>
            Temperature: {temperature}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Humidity: {humidity}
          </Typography>
          <Typography variant="h4" gutterBottom>
            Air Pressure: {airPressure}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} size="large">
            OK
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default App;
