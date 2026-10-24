
const loginForm = document.getElementById("loginForm");
const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");
const loginMessage = document.getElementById("loginMessage");

const dashboardTitle = document.getElementById("dashboardTitle");
const welcomeMessage = document.getElementById("welcomeMessage");
const logoutButton = document.getElementById("logoutButton");

// Mock users for login testing
const users = [
    {
        email: "student@example.com",
        password: "demo123",
        role: "Student"
    },
    {
        email: "mentor@example.com",
        password: "demo123",
        role: "Mentor"
    }
];

// Mock task data
const tasks = [
    {
        id: 1,
        title: "HTML Assignment",
        description: "Create a student registration page.",
        dueDate: "2026-11-01",
        status: "Pending"
    },
    {
        id: 2,
        title: "CSS Design",
        description: "Design a responsive dashboard.",
        dueDate: "2026-11-03",
        status: "In Progress"
    },
    {
        id: 3,
        title: "JavaScript Practice",
        description: "Complete the JavaScript exercises.",
        dueDate: "2026-11-05",
        status: "Completed"
    }
];

// Current logged-in role
let currentRole = "";

// LOGIN VALIDATION
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check empty fields
    if (email === "" || password.trim() === "") {
        loginMessage.textContent = "Please fill in all fields.";
        return;
    }

    // Check email format
    if (!emailPattern.test(email)) {
        loginMessage.textContent = "Please enter a valid email address.";
        return;
    }

    // Check mock login credentials
    const user = users.find(function (item) {
        return item.email === email.toLowerCase()
            && item.password === password;
    });

    if (!user) {
        loginMessage.textContent = "Invalid email or password.";
        return;
    }

    // Login successful
    currentRole = user.role;

    loginPage.classList.add("hidden");
    dashboardPage.classList.remove("hidden");

    dashboardTitle.textContent = user.role + " Dashboard";
    welcomeMessage.textContent = "Welcome, " + user.role + "!";

    renderTasks();
    updateSummary();
});

// LOGOUT
logoutButton.addEventListener("click", function () {
    currentRole = "";

    dashboardPage.classList.add("hidden");
    loginPage.classList.remove("hidden");

    loginForm.reset();
    loginMessage.textContent = "";
});

// DISPLAY TASK CARDS
function renderTasks() {
    const taskList = document.getElementById("taskList");

    taskList.replaceChildren();

    tasks.forEach(function (task) {
        const card = document.createElement("article");
        const title = document.createElement("h3");
        const description = document.createElement("p");
        const dueDate = document.createElement("p");
        const statusRow = document.createElement("div");
        const badge = document.createElement("span");
        const select = document.createElement("select");

        // Task card content
        card.className = "task-card";

        title.textContent = task.title;
        description.textContent = task.description;
        dueDate.textContent = "Due Date: " + task.dueDate;

        // Status badge
        badge.className = "status-badge";
        badge.textContent = task.status;

        // Status dropdown options
        const statusOptions = [
            "Pending",
            "In Progress",
            "Completed"
        ];

        statusOptions.forEach(function (status) {
            const option = document.createElement("option");

            option.value = status;
            option.textContent = status;

            select.appendChild(option);
        });

        select.value = task.status;

        // Change task status
        select.addEventListener("change", function () {
            task.status = select.value;

            renderTasks();
            updateSummary();
        });

        // Add badge and dropdown
        statusRow.className = "status-row";
        statusRow.append(badge, select);

        card.append(
            title,
            description,
            dueDate,
            statusRow
        );

        // Change card color based on status
        const className = task.status
            .toLowerCase()
            .replace(" ", "-");

        card.classList.add(className);

        taskList.appendChild(card);
    });
}

// UPDATE DASHBOARD SUMMARY COUNTERS
function updateSummary() {
    const total = tasks.length;

    const completed = tasks.filter(function (task) {
        return task.status === "Completed";
    }).length;

    const pending = tasks.filter(function (task) {
        return task.status === "Pending";
    }).length;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;
}
