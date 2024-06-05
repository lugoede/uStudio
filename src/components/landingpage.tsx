// import { useGetProductsQuery } from "../../api/api-slice";
// import {
//   Autocomplete,
//   Button,
//   OutlinedInput,
//   TextField,
//   colors,
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import { Controller, useForm } from "react-hook-form";

// export default function FashionTrends() {
//   const { register, handleSubmit, reset, control, watch, setValue } = useForm();
//   // const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const { data } = useGetProductsQuery({
//     store: "US",
//     offset: "0",
//     categoryId: "4209",
//     limit: "48",
//     // country: "US",
//     // sort: "freshness",
//     // currency: "USD",
//     // sizeSchema: "US",
//     // lang: "en-US",
//   });

//   //   if (isLoading) return <div>Loading...</div>;
//   //   if (error) return <div>Error: {error.message}</div>;

//   // useEffect(() => {
//   //   if (data) {
//   //     setFilteredProducts(data.products);
//   //   }
//   // }, [data]);

//   // const handleSearch = () => {
//   //   if (data) {
//   //     const filtered = data.products.filter(
//   //       (product: any) =>
//   //         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   //         product.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   //         product.colour.toLowerCase().includes(searchTerm.toLowerCase())
//   //     );
//   //     setFilteredProducts(filtered);
//   //   }
//   // };

//   const searchTerm = watch("search");
//   const selectedColor = watch("color");

//   useEffect(() => {
//     if (data) {
//       filterProducts(searchTerm, selectedColor);
//     }
//   }, [data, searchTerm, selectedColor]);

//   const filterProducts = (searchTerm, color) => {
//     if (!data) return;
//     const filtered = data.products.filter(
//       (product) =>
//         (searchTerm
//           ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             product.brandName
//               .toLowerCase()
//               .includes(searchTerm.toLowerCase()) ||
//             product.colour.toLowerCase().includes(searchTerm.toLowerCase())
//           : true) &&
//         (color ? product.colour.toLowerCase() === color.toLowerCase() : true)
//     );
//     setFilteredProducts(filtered);
//   };

//   const getUniqueValues = (array) => {
//     return array.filter((value, index, self) => self.indexOf(value) === index);
//   };

//   const colors = data
//     ? getUniqueValues(data.products.map((product) => product.colour))
//     : [];

//   const onSubmit = (data) => {
//     filterProducts(data.search, data.color);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <OutlinedInput
//           {...register("search")}
//           fullWidth
//           value={searchTerm}
//           onChange={(e) => {
//             setValue("search", e.target.value);
//             filterProducts(e.target.value, selectedColor);
//           }}
//           placeholder={"Search by name..."}
//         ></OutlinedInput>
//         <Controller
//           name="color"
//           control={control}
//           render={({ field }) => (
//             <Autocomplete
//               {...field}
//               options={colors}
//               getOptionLabel={(option) => option}
//               value={selectedColor}
//               onChange={(newValue) => {
//                 field.onChange(newValue);
//                 filterProducts(searchTerm, newValue);
//               }}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Filter by color"
//                   variant="outlined"
//                   margin="normal"
//                   fullWidth
//                 />
//               )}
//             />
//           )}
//         />
//         {/* <Autocomplete
//         options={brands}
//         getOptionLabel={(option) => option}
//         value={brand}
//         onChange={(event, newValue) => setBrand(newValue)}
//         renderInput={(params) => <TextField {...params} label="Filter by brand" variant="outlined" margin="normal" fullWidth />}
//       /> */}
//       </form>
//       <h1>Fashion Trends</h1>
//       <div>
//         {filteredProducts?.map((product: any) => {
//           return (
//             <img
//               key={product.id}
//               src={`https://${product.imageUrl}`}
//               width="100px"
//               height="100px"
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Header from "./header/header";

export default function Landingpage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Typography color="#0000FF" variant="h1" component={"h1"}>
        Fashion Trends
      </Typography>

      <Box>
        {/* <Button onClick={() => navigate("/trends/woman")}>Woman</Button>
        <Button onClick={() => navigate("/trends/man")}>Man</Button> */}
      </Box>
      {/* {isLoading && <CircularProgress />}
      {error && <p>Error</p>}
      <Box>
        {filteredProducts.map((product) => (
          <Box key={product.id} mb={2}>
            <img src={`https://${product.imageUrl}`} width="100" />
          </Box>
        ))}
      </Box> */}
    </>
  );
}
