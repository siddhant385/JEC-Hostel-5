import { Grid, Card, CardContent, Typography } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import SecurityIcon from "@mui/icons-material/Security";

const amenities = [
  { icon: <WifiIcon fontSize="large" color="primary" />, title: "Free WiFi" },
  { icon: <LocalLaundryServiceIcon fontSize="large" color="secondary" />, title: "Laundry Service" },
  { icon: <SecurityIcon fontSize="large" color="success" />, title: "24/7 Security" },
];

const Amenities = () => (
  <Grid container spacing={3} sx={{ mt: 5 }}>
    {amenities.map((item, index) => (
      <Grid item xs={12} md={4} key={index}>
        <Card sx={{ p: 3, textAlign: "center", borderRadius: 3, boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" }}>
          {item.icon}
          <Typography variant="h6" sx={{ mt: 2 }}>
            {item.title}
          </Typography>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default Amenities;
