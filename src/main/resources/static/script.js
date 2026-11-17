
const API_URL = "/api/users";

const userForm = document.getElementById("userForm");
const userTableBody = document.getElementById("userTableBody");

const userId = document.getElementById("userId");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("formTitle");
const refreshBtn = document.getElementById("refreshBtn");


// READ: Get all users
async function loadUsers() {

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to fetch users");
        }

        const users = await response.json();

        userTableBody.innerHTML = "";

        if (users.length === 0) {
            const row = document.createElement("tr");
            const cell = document.createElement("td");

            cell.colSpan = 5;
            cell.className = "empty-message";
            cell.textContent = "No users found. Add your first user!";

            row.appendChild(cell);
            userTableBody.appendChild(row);
            return;
        }

        users.forEach(user => {

            const row = document.createElement("tr");

            [user.id, user.name, user.email, user.phone]
                .forEach(value => {
                    const cell = document.createElement("td");
                    cell.textContent = value ?? "";
                    row.appendChild(cell);
                });

            const actionCell = document.createElement("td");

            // EDIT button
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "edit-btn";

            editButton.addEventListener("click", () => {
                editUser(user);
            });

            // DELETE button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-btn";

            deleteButton.addEventListener("click", () => {
                deleteUser(user.id);
            });

            actionCell.append(editButton, deleteButton);
            row.appendChild(actionCell);

            userTableBody.appendChild(row);
        });

    } catch (error) {
        console.error(error);

        userTableBody.innerHTML =
            '<tr><td colspan="5" class="empty-message">Unable to load users. Please try again.</td></tr>';

        alert("Could not load users. Check whether the backend is running.");
    }
}


// CREATE / UPDATE: Save user
userForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    if (!userForm.reportValidity()) {
        return;
    }

    const user = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim()
    };

    const id = userId.value;

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Unable to save user");
        }

        alert(id ? "User updated successfully!" :
                     "User added successfully!");

        resetForm();
        await loadUsers();

    } catch (error) {
        console.error(error);
        alert("Error saving user: " + error.message);
    }

});


// EDIT: Load user details into form
function editUser(user) {

    userId.value = user.id;
    nameInput.value = user.name;
    emailInput.value = user.email;
    phoneInput.value = user.phone;

    formTitle.textContent = "Update User";
    submitBtn.textContent = "Update User";
    cancelBtn.hidden = false;

    userForm.scrollIntoView({
        behavior: "smooth"
    });
}


// DELETE: Remove user
async function deleteUser(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Unable to delete user");
        }

        alert("User deleted successfully!");

        await loadUsers();

    } catch (error) {
        console.error(error);
        alert("Error deleting user: " + error.message);
    }
}


// Reset form
function resetForm() {

    userForm.reset();
    userId.value = "";

    formTitle.textContent = "Add New User";
    submitBtn.textContent = "Add User";
    cancelBtn.hidden = true;
}


// Cancel editing
cancelBtn.addEventListener("click", resetForm);



// Load users when page opens
document.addEventListener("DOMContentLoaded", loadUsers);


// REFRESH: Reload users from database
refreshBtn.addEventListener("click", async function () {

    console.log("Refresh button clicked!");

    refreshBtn.disabled = true;
    refreshBtn.textContent = "Refreshing...";

    try {
        const response = await fetch(API_URL);

        console.log("API response status:", response.status);

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        console.log("Users received:", users);

        // Update the table using the existing function
        await loadUsers();

    } catch (error) {
        console.error("Refresh error:", error);
        alert("Unable to refresh users: " + error.message);

    } finally {
        refreshBtn.disabled = false;
        refreshBtn.textContent = "Refresh";
    }

});
