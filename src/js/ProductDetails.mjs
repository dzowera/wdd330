import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch product details using the data source
    this.product = await this.dataSource.findProductById(this.productId);

    // Render the product details to the page
    this.renderProductDetails();

    // Add event listener to the Add to Cart button
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    setLocalStorage('so-cart', this.product);
  }

  renderProductDetails() {
    // Populate HTML elements with product data
    document.getElementById('product-name').textContent = this.product.Name;
    document.getElementById('product-brand').textContent = this.product.Brand?.Name || '';
    document.getElementById('product-image').src = this.product.Image;
    document.getElementById('product-image').alt = this.product.Name;
    document.getElementById('product-price').textContent = `$${this.product.FinalPrice.toFixed(2)}`;
    document.getElementById('product-color').textContent = this.product.Colors?.[0]?.ColorName || '';
    document.getElementById('product-description').innerHTML = this.product.DescriptionHtmlSimple;
  }
}