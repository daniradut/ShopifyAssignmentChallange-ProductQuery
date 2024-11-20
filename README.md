# Shopify Product Query Scripts

This repository contains two scripts, `app.js` and `appWithPagination.js`, to query products and their variants from a Shopify store using the GraphQL API.

## Prerequisites

1. **Node.js Installed**: Ensure you have [Node.js](https://nodejs.org) installed on your system.
2. **Shopify Admin API Access Token**: Obtain the Admin API access token for your Shopify store.
3. **Store URL**: Use the Shopify store URL (e.g., `https://your-store.myshopify.com`).

## Setup

1. Clone the repository or download the scripts.

2. Navigate to the directory:

    ```bash
    cd your-project-directory
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the project root and add the following variables:

    ```env
    SHOPIFY_STORE_URL=https://your-store.myshopify.com
    SHOPIFY_ADMIN_ACCESS_TOKEN=your-access-token
    ```

## Scripts Overview

### 1. `app.js`

-   **Description**: Fetches the first 10 products that match the given name and their first 10 variants.
-   **Use Case**: For a quick query of a limited set of products and variants.
-   **How to Run**:

    ```bash
    node app.js -name "Product Name"
    ```

    Example output:

    ```
    Searching for products with name: Product Name
    Product A - Variant 1 - price $10
    Product B - Variant 1 - price $15
    ```

---

### 2. `appWithPagination.js`

-   **Description**: Fetches all products matching the given name using pagination. Retrieves the first 100 variants for each product. (Shopify currently supports up to 100 variants per product. This will increase to 2000 in Winter '24.)
-   **Use Case**: For querying all matching products and their variants.
-   **How to Run**:

    ```bash
    node appWithPagination.js -name "Product Name"
    ```

    Example output:

    ```
    Searching for products with name: Product Name
    Product A - Variant 1 - price $10
    Product B - Variant 1 - price $15
    Product C - Variant 2 - price $20
    ... (continues for all matching products and variants)
    ```

---

## Key Features

1. **Environment Variables**:

    - `SHOPIFY_STORE_URL` and `SHOPIFY_ADMIN_ACCESS_TOKEN` are stored in the `.env` file for security and flexibility.

2. **Pagination**:

    - `app.js`: Fetches only the first 10 products and variants.
    - `appWithPagination.js`: Uses Shopify's GraphQL pagination to fetch all products.

3. **Variants Limit**:
    - The scripts currently handle up to 100 variants per product. Shopify plans to increase this limit to 2000 in their Winter '24 release.

---

## Future Improvements

-   **Variants Pagination**: Add pagination to handle more than 100 variants when Shopify increases the limit to 2000.
