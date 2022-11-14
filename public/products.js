const socket = io.connect();

const render = (data) => {
  const html = data
    .map((product) => {
      return `
                <div id= "${product.id}"class="products-container products-card ">
                    <img src= ${product.thumbnail} class="products-container product-img">
                    <div>
                        <h5> ${product.name} </h5>
                        <p> ${product.price} </p>
                    </div>
                </div> 
                `;
    })
    .join("");
  document.getElementById("productsContainer").innerHTML = html;
};

socket.on("products", (data) => {
  render(data);
});

const addProduct = () => {
  const product = {
    name: document.getElementById("formName").value,
    price: document.getElementById("formPrice").value,
    thumbnail: document.getElementById("formTumbnail").value,
  };
  console.log(1);
  socket.emit("new-product", product);
};

const element = document.getElementById("formDescription");

element.addEventListener("submit", (e) => {
  e.preventDefault();
  addProduct();
});
