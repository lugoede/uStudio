import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import products from "../assets/fashionData.json";

interface Product {
  gender: string | string[];
  clothingPiece: string | string[];
  style: string | string[];
  brandName: string | string[];
  color: string | string[];
  material: string | string[];
  image: string;
}

interface FilterCriteria {
  text: string;
  color: string[];
  clothingPiece: string[];
  gender: string;
  brandName: string[];
}

const unique = (value, index, self) => self.indexOf(value) === index;

const FashionTrends: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    text: "",
    color: [],
    clothingPiece: [],
    gender: "",
    brandName: [],
  });

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (products) {
      const filtered = products.filter((product) => {
        const matchesText = filterCriteria.text
          ? product.clothingPiece.includes(filterCriteria.text) ||
            product.style.includes(filterCriteria.text) ||
            product.brandName.includes(filterCriteria.text) ||
            product.color.includes(filterCriteria.text) ||
            product.material.includes(filterCriteria.text)
          : true;

        const matchesColor =
          filterCriteria.color.length > 0
            ? filterCriteria.color.some((color) =>
                product.color.includes(color)
              )
            : true;

        const matchesClothingPiece =
          filterCriteria.clothingPiece.length > 0
            ? filterCriteria.clothingPiece.some((piece) =>
                product.clothingPiece.includes(piece)
              )
            : true;

        const matchesGender = filterCriteria.gender
          ? product.gender.includes(filterCriteria.gender)
          : true;

        const matchesBrand =
          filterCriteria.brandName.length > 0
            ? filterCriteria.brandName.some((brand) =>
                product.brandName.includes(brand)
              )
            : true;

        return (
          matchesText &&
          matchesColor &&
          matchesClothingPiece &&
          matchesGender &&
          matchesBrand
        );
      });
      setFilteredProducts(filtered);
    }
  }, [filterCriteria, products]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCriteria({
      ...filterCriteria,
      [event.target.name]: event.target.value,
    });
  };

  const handleAutocompleteChange = (
    event: any,
    value: string[],
    field: FilterCriteria
  ) => {
    setFilterCriteria({
      ...filterCriteria,
      [field]: value,
    });
  };

  return (
    <Box p={2}>
      <TextField
        label="Search"
        fullWidth
        margin="normal"
        value={filterCriteria.text}
        onChange={(e) =>
          setFilterCriteria({ ...filterCriteria, text: e.target.value })
        }
      />

      <Autocomplete
        multiple
        options={products.flatMap((p) => p.color).filter(unique)}
        getOptionLabel={(option) => option}
        value={filterCriteria.color}
        onChange={(event, value) =>
          handleAutocompleteChange(event, value, "color")
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Color"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        )}
      />

      <Autocomplete
        multiple
        options={products.flatMap((p) => p.clothingPiece).filter(unique)}
        getOptionLabel={(option) => option}
        value={filterCriteria.clothingPiece}
        onChange={(event, value) =>
          handleAutocompleteChange(event, value, "clothingPiece")
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Clothing Piece"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        )}
      />

      <RadioGroup
        row
        name="gender"
        value={filterCriteria.gender}
        onChange={handleFilterChange}
      >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
      </RadioGroup>

      <Autocomplete
        multiple
        options={products.flatMap((p) => p.brandName).filter(unique)}
        getOptionLabel={(option) => option}
        value={filterCriteria.brandName}
        onChange={(event, value) =>
          handleAutocompleteChange(event, value, "brandName")
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Brand"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        )}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          setFilterCriteria({
            text: "",
            color: [],
            clothingPiece: [],
            gender: "",
            brandName: [],
          })
        }
      >
        Clear Filters
      </Button>

      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} mt={4}>
        {filteredProducts.map((product, index) => (
          <Box
            key={index}
            p={1}
            textAlign="center"
            border="1px solid #ccc"
            borderRadius="4px"
          >
            <img
              src={product.image}
              alt={`Fashion ${index}`}
              style={{ width: "100%", height: "auto" }}
            />
            {/* <Box>
              <p>{product.clothingPiece.join(", ")}</p>
              <p>{product.brandName.join(", ")}</p>
              <p>{product.color.join(", ")}</p>
            </Box> */}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FashionTrends;
