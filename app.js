require("dotenv").config();
const axios = require("axios");

// Get the product name from the command line arguments
const args = process.argv.slice(2);
let productName = "";

if (args[0] === "-name" && args[1]) {
    productName = args[1];
    console.log(`Searching for products with name: ${productName}`);
} else {
    console.error(
        'Please add a product name that you want to search for. Example: node app.js -name "Product Name"'
    );
    process.exit(1);
}

const query = `
    query ($query: String!) {
        products(first: 10, query: $query) {
            edges {
                node {
                    title
                    variants(first: 100) {
                        edges {
                            node {
                                title
                                price
                            }
                        }
                    }
                }
            }
        }
    }
`;

// Function to fetch products
async function fetchProducts(productName) {
    try {
        const response = await axios.post(
            `${process.env.SHOPIFY_STORE_URL}/admin/api/2024-01/graphql.json`,
            {
                query,
                variables: {
                    query: `title:*${productName}*`,
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token":
                        process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
                },
            }
        );

        const products = response.data.data.products.edges;

        // Check if no products were found
        if (products.length === 0) {
            console.log(`No products found with the name: "${productName}"`);
            return;
        }

        // Creating a new array of objects with product title, variant title and price
        const results = [];
        products.forEach(({ node }) => {
            const { title, variants } = node;
            variants.edges.forEach(({ node: variant }) => {
                results.push({
                    productTitle: title,
                    variantTitle: variant.title,
                    price: parseFloat(variant.price),
                });
            });
        });

        // Sorting by variant price in ascending order
        results.sort((a, b) => a.price - b.price);

        // Print all the products with associated variants productTitle - variantTitle - price
        results.forEach(({ productTitle, variantTitle, price }) => {
            console.log(`${productTitle} - ${variantTitle} - price $${price}`);
        });
    } catch (error) {
        console.error(
            "Error fetching products:",
            error.response?.data || error.message
        );
    }
}

// Call the function to fetch products with the given product name
fetchProducts(productName);
