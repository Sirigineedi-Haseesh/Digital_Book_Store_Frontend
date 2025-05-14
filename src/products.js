fetch('./books.json') // Ensure the relative path is correct
  .then((response) => {
    if (!response.ok) {
      throw new Error('Product not found');
    }
    return response.json();
  })
  .then((data) => {
    console.log('Books:', data); // Replace with your logic to display products
    // ...existing code to handle the fetched data...
  })
  .catch((error) => {
    console.error('Error fetching products:', error.message);
    alert('Error: Product not found');
  });
