# APiToDb

A web app which fetches api whenever user clicks on **Generate Report** button. After fetching data from api it goes to backend hono route . Hono route breaks down the api data according to database table schema such as **Users**, **Products**, **Orders**. <br > <br>
Api data was in bellow format :

```{
"created_at": "2022-08-02T06:35:16.704Z",
"name": "Robert Kovacek",
"order_no": 31383,
"user_phone": "288-595-1866 x687",
"product_code": "f472e9e7-a197-4c6b-bafe-bed21ff5d707",
"product_name": "Chair",
"product_price": "860.00",
"purchase_quantity": 2
},
```

### 1. **Storing User Data in the `users` Table**

From the api data, extracting the following fields to store user-related information:

- **`name`**: The name of the user.
- **`user_phone`**: The user's phone number.
- **`created_at`**: The timestamp when the user was added.

### 2. **Storing Product Data in the `products` Table**

From the api data, extracting the following fields to store product-related information:

- **`product_code`**: The code of the product.
- **`product_name`**:  Name of the product.
- **`product_price`**: Price of the product
- **`created_at`**: The timestamp when the user was added.

### 3. **Storing Order Data in the `orders` Table**

From the api data, extracting the following fields to store order-related information:

- **`order_no`**: unique order no.
- **`product_code`**:  Code of the product.
- **`product_price`**:  Price of the certain product.
- **`purchase_quantity`**: Quantity of the product.
- **`total`**: Total price of the ordered product. Calculating by performing opearation on **product_price** & **product_quantity**.
- **`userId`**: Getting user id of the user whoever ordered the product .
- **`created_at`**: The timestamp when the user was added.

After successfully storing the data in the respective `users` , `products` and `orders` tables, a report table is generated to provide a list of the top 3 purchaser's by the total amount spent . And it happens whenver user clicks on **Generate Report** button , at first it fetches data from api and stores them inside database, whenever this operations completes then it fetches data from orders table and generates the report .

## Technologies used
[![ReactJS](https://img.shields.io/badge/reactjs-D8D8D8?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Hono](https://img.shields.io/badge/hono-D8D8D8?style=for-the-badge&logo=hono)](https://hono.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-D8D8D8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Shadcn](https://img.shields.io/badge/shadcn-D8D8D8?style=for-the-badge&logo=shadcn)](https://ui.shadcn.com/)
[![TypeScript](https://img.shields.io/badge/typescript-D8D8D8?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Drizzle](https://img.shields.io/badge/drizzle-D8D8D8?style=for-the-badge&logo=drizzle)](https://orm.drizzle.team/)
[![Tanstack Query](https://img.shields.io/badge/tanstack%20query-D8D8D8?style=for-the-badge)](https://tanstack.com/query/latest)
[![Supabase](https://img.shields.io/badge/supabase-D8D8D8?style=for-the-badge&logo=supabase)](https://supabase.com/)

