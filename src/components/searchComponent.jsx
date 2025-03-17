import React from "react";
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box } from "@mui/material";

const SearchComponent = ({ searchTerm, setSearchTerm, filterType, setFilterType }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ p: 2, width: "100%" }}>
      {/* Search Input */}
      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" sx={{ width: "100%", maxWidth: 400 }}>
        <FormLabel sx={{ color: "white" }}>Search</FormLabel>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "gray" },
              "&:hover fieldset": { borderColor: "blue" },
              "&.Mui-focused fieldset": { borderColor: "red" },
            },
          }}
        />
      </Box>

      {/* Filter Options */}
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel sx={{ color: "white", textAlign: "center" }}>Filter By</FormLabel>
        <RadioGroup
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          sx={{
            flexDirection: { xs: "column", sm: "row" }, // Column on mobile, row on larger screens
            justifyContent: "center",
            gap: 2,
          }}
        >
          <FormControlLabel value="name" control={<Radio sx={{ color: "red" }} />} label="Name" className="text-red-500" />
          <FormControlLabel value="branch" control={<Radio sx={{ color: "red" }} />} label="Branch" className="text-red-500" />
          <FormControlLabel value="from" control={<Radio sx={{ color: "red" }} />} label="From" className="text-red-500" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default SearchComponent;




// import { useState } from "react";

// const SearchComponent = ({ searchTerm, setSearchTerm, filterType, setFilterType }) => {
//   return (
//     <div className="flex flex-col items-center">
//       <div className="flex flex-row m-3">
//       <p className="text-white text-center m-5 p-1">Search</p>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="p-2 h-13 text-red-500 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
//       />
//       </div>
//       <div className="mt-2 flex flex-wrap gap-4">
//         <label className="text-red-500">
//           <input
//             type="radio"
//             value="name"
//             checked={filterType === "name"}
//             onChange={() => setFilterType("name")}
//             className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//           />
//           Name
//         </label>
//         <label className="text-red-500">
//           <input
//             type="radio"
//             value="branch"
//             checked={filterType === "branch"}
//             onChange={() => setFilterType("branch")}
//             className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//           />
//           Branch
//         </label >
//         <label className="text-red-500">
//           <input
//             type="radio"
//             value="from"
//             checked={filterType === "from"}
//             onChange={() => setFilterType("from")}
//             className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//           />
//           From
//         </label>
//       </div>
//     </div>
//   );
// };

// export default SearchComponent;
