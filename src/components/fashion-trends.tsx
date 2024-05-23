import { useGetProductsQuery } from "../../api/api-slice";
import { OutlinedInput } from "@mui/material";
import { useForm } from "react-hook-form";

export default function FashionTrends() {
  const { register, handleSubmit } = useForm();
  const { data } = useGetProductsQuery({
    store: "US",
    offset: "0",
    categoryId: "4209",
    limit: "48",
    // country: "US",
    // sort: "freshness",
    // currency: "USD",
    // sizeSchema: "US",
    // lang: "en-US",
  });

  console.log(data);
  console.log("hot reloading");
  //   if (isLoading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <form onSubmit={handleSubmit(() => console.log(""))}>
        <OutlinedInput
          {...register("search")}
          placeholder={"Search..."}
        ></OutlinedInput>
      </form>
      <h1>Fashion Trends</h1>
      <div>
        {data?.products.map((product: any) => {
          return (
            <img
              src={`https://${product.imageUrl}`}
              width="100px"
              height="100px"
            />
          );
        })}
      </div>
    </div>
  );
}
