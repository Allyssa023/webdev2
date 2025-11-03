const apiBase = "http://localhost:8700/api/products";

document.addEventListener("DOMContentLoaded", fetchProducts);
const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", saveProduct);

function fetchProducts() {
    fetch(apiBase)
        .then(res => res.json())
        .then(products => {
            const body = document.getElementById("productTableBody");
            body.innerHTML = "";
            let counter = 0;
            products.forEach(product => {
                body.innerHTML += `
                <tr class="text-center">
                    <td class="border p-2">${++counter}</td>
                    <td class="border p-2">${product.name}</td>
                    <td class="border p-2">${product.description}</td>
                    <td class="border p-2">${product.stock}</td>
                    <td class="border p-2">${product.unit}</td>
                    <td class="border p-2">${product.price.toFixed(2)}</td>
                    <td class="border p-2">
                        <button onclick="openEditModal(${product.id}, '${product.name}', '${product.description}', ${product.stock}, '${product.unit}', ${product.price})" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                        <button onclick="deleteProduct(${product.id})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                    </td>
                </tr>`;
            });
        })
        .catch(err => console.error(err));
}

function openCreateModal() {
    productForm.reset();
    clearValidation();
    document.getElementById("productId").value = "";
    document.getElementById("modalTitle").innerText = "Add Product";
    document.getElementById("productModal").classList.remove("hidden");
}

function openEditModal(id, name, description, stock, unit, price) {
    clearValidation();
    document.getElementById("productId").value = id;
    document.getElementById("productName").value = name;
    document.getElementById("productDescription").value = description;
    document.getElementById("productStock").value = stock;
    document.getElementById("productUnit").value = unit;
    document.getElementById("productPrice").value = price;
    document.getElementById("modalTitle").innerText = "Edit Product";
    document.getElementById("productModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("productModal").classList.add("hidden");
}

function clearValidation() {
    ["productName","productDescription","productStock","productUnit","productPrice"].forEach(id => {
        const input = document.getElementById(id);
        input.classList.remove("border-red-500");
        input.classList.add("border-gray-300");
    });
    ["errorName","errorDescription","errorStock","errorUnit","errorPrice"].forEach(id => {
        document.getElementById(id).style.display = "none";
    });
}

function validateForm(name, description, stock, unit, price) {
    let isValid = true;

    if (!name.trim()) {
        document.getElementById("errorName").style.display = "block";
        document.getElementById("productName").classList.add("border-red-500");
        isValid = false;
    }
    if (!description.trim()) {
        document.getElementById("errorDescription").style.display = "block";
        document.getElementById("productDescription").classList.add("border-red-500");
        isValid = false;
    }
    if (isNaN(stock) || stock < 1) {
        document.getElementById("errorStock").style.display = "block";
        document.getElementById("productStock").classList.add("border-red-500");
        isValid = false;
    }
    if (!unit.trim()) {
        document.getElementById("errorUnit").style.display = "block";
        document.getElementById("productUnit").classList.add("border-red-500");
        isValid = false;
    }
    if (isNaN(price) || price < 1) {
        document.getElementById("errorPrice").style.display = "block";
        document.getElementById("productPrice").classList.add("border-red-500");
        isValid = false;
    }

    return isValid;
}

function saveProduct(e) {
    e.preventDefault();
    clearValidation();

    const id = document.getElementById("productId").value;
    const name = document.getElementById("productName").value;
    const description = document.getElementById("productDescription").value;
    const stock = parseInt(document.getElementById("productStock").value);
    const unit = document.getElementById("productUnit").value;
    const price = parseFloat(document.getElementById("productPrice").value);

    if (!validateForm(name, description, stock, unit, price)) return;

    const product = { name, description, stock, unit, price };
    const method = id ? "PUT" : "POST";
    const url = id ? `${apiBase}/${id}` : apiBase;

    fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })
    .then(res => {
        if (!res.ok) throw new Error("Failed to save product");
        return res.json();
    })
    .then(() => {
        closeModal();
        fetchProducts();
    })
    .catch(err => console.error(err));
}

function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;
    fetch(`${apiBase}/${id}`, { method: "DELETE" })
        .then(res => {
            if (!res.ok) throw new Error("Failed to delete product");
            fetchProducts();
        })
        .catch(err => console.error(err));
}
