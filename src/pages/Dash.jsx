import React, { useState, useMemo } from "react";
import { Container, Box, Grid } from "@mui/material";
import { useUser } from "../contexts/userContext"; // Adjust the path as needed
import SearchComponent from "../components/searchComponent"; // Adjust the path as needed
import ItemCard from "../components/ItemCard"; // Adjust the path as needed


const Dash = () => {
    const { users } = useUser();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("name");
  
    const filteredUsers = useMemo(() => {
      if (!searchTerm) return users;
      return users.filter((user) => {
        const value = user[filterType]?.toLowerCase() || "";
        return value.includes(searchTerm.toLowerCase());
      });
    }, [users, searchTerm, filterType]);
    
    return (
      <Container>
        {/* Search Component */}
        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          <SearchComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
          />
        </Box>
  
        {/* User Cards Grid */}
        <Box mt={4}>
          <Grid container spacing={3} justifyContent="center">
            {filteredUsers.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <ItemCard
                  name={user.name}
                  from={user.from}
                  branch={user.branch}
                  contactNo={user.contactNo}
                  profilePic={user.profilePic}
                  
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    );
  };
  
  export default Dash;