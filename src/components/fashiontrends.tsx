import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  FormControlLabel,
  OutlinedInput,
  Autocomplete,
  TextField,
  Checkbox,
  FormGroup,
} from "@mui/material";

import { useSaveFavoriteTrendMutation } from "../../api/trends";
import { fashionData } from "../assets/fashionData";

export interface FashionItem {
  gender: string | string[];
  clothingPiece: string | string[];
  style?: string | string[];
  brandName: string | string[];
  color: string | string[];
  material: string | string[];
  image: string;
}

export default function FashionTrends() {
  const { control, watch, reset, handleSubmit } = useForm({
    defaultValues: {
      search: "",
      color: [] as string[],
      clothingPiece: [] as string[],
      gender: "",
      brandName: [] as string[],
    },
  });

  const [filteredProducts, setFilteredProducts] = useState<FashionItem[]>(
    fashionData as FashionItem[]
  );
  const [saveTrend] = useSaveFavoriteTrendMutation();
  const [selected, setSelected] = React.useState<string>();

  const handleSelectImage = (id: string) => {
    setSelected(id);
  };

  const search = watch("search");
  const color = watch("color");
  const clothingPiece = watch("clothingPiece");
  const gender = watch("gender");
  const brandName = watch("brandName");

  const handleSave = (data: FashionItem) => {
    console.log(data);
    saveTrend(data);
  };

  useEffect(() => {
    const filterProducts = () => {
      const lowerCaseSearch = search.toLowerCase();
      const filtered = fashionData.filter(
        (item) =>
          (!search ||
            Object.values(item).some((value) => {
              if (Array.isArray(value)) {
                return value.some((v) =>
                  v.toString().toLowerCase().includes(lowerCaseSearch)
                );
              }
              return value.toString().toLowerCase().includes(lowerCaseSearch);
            })) &&
          (!color.length || color.some((c) => item.color.includes(c))) &&
          (!clothingPiece.length ||
            clothingPiece.some((cp) => item.clothingPiece.includes(cp))) &&
          (!gender.length ||
            gender.some((g) =>
              Array.isArray(item.gender)
                ? item.gender.includes(g)
                : item.gender === g
            )) &&
          (!brandName.length ||
            brandName.some((bn) => item.brandName.includes(bn)))
      );
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [search, color, clothingPiece, gender, brandName]);

  const clearFilters = () => {
    reset({
      search: "",
      color: [],
      clothingPiece: [],
      gender: "",
      brandName: [],
    });
    setFilteredProducts(fashionData);
  };

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={handleSubmit(handleSave)}>
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <OutlinedInput {...field} placeholder="Search" fullWidth />
          )}
        />
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              multiple
              options={[...new Set(fashionData.flatMap((item) => item.color))]}
              getOptionLabel={(option) => option}
              onChange={(_, value) => field.onChange(value)}
              value={field.value || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Color"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          )}
        />
        <Controller
          name="clothingPiece"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              multiple
              options={[
                ...new Set(fashionData.flatMap((item) => item.clothingPiece)),
              ]}
              getOptionLabel={(option) => option}
              onChange={(_, value) => field.onChange(value)}
              value={field.value || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Clothing Piece"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <FormGroup row>
              {["male", "female"].map((genderOption) => (
                <FormControlLabel
                  key={genderOption}
                  control={
                    <Checkbox
                      checked={field.value.includes(genderOption)}
                      onChange={() => {
                        const newGender = field.value.includes(genderOption)
                          ? field.value.filter(
                              (gender: string | string[]) =>
                                gender !== genderOption
                            )
                          : [...field.value, genderOption];
                        field.onChange(newGender);
                      }}
                    />
                  }
                  label={
                    genderOption.charAt(0).toUpperCase() + genderOption.slice(1)
                  }
                />
              ))}
            </FormGroup>
          )}
        />
        {/* <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <RadioGroup
              value={field.value || ""}
              onChange={(e) =>
                field.onChange(
                  field.value === e.target.value ? "" : e.target.value
                )
              }
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          )}
        /> */}
        <Controller
          name="brandName"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              multiple
              options={[
                ...new Set(fashionData.flatMap((item) => item.brandName)),
              ]}
              getOptionLabel={(option) => option}
              onChange={(_, value) => field.onChange(value)}
              value={field.value || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Brand"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          )}
        />
        <Button
          onClick={clearFilters}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Clear Filters
        </Button>
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} mt={4}>
          {filteredProducts.map((product, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <img
                src={product.image}
                alt={product.style ? product.style.toString() : "Fashion Item"}
                width="200"
              />
              <Button
                type="submit"
                onClick={() => handleSelectImage(product.id)}
              >
                Save
              </Button>
            </Box>
          ))}
        </Box>
      </form>
    </Box>
  );
}
