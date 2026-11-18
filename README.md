# User Management System

A web-based User Management System developed using Java, Spring Boot, MySQL, HTML, CSS, and JavaScript. This application allows users to perform basic CRUD (Create, Read, Update, Delete) operations to manage user information.

## Project Overview

The User Management System provides a simple interface to manage user records. Users can add new users, view all existing users, update their details, and delete records.

The application follows a layered architecture using Spring Boot and Spring Data JPA for backend development and MySQL for database management.

## Features

- Add new users with Name, Email, and Phone Number.
- Display all users in a table.
- Edit and update existing user details.
- Delete user records with confirmation.
- Basic form validation.
- RESTful APIs for CRUD operations.
- MySQL database integration.
- Responsive frontend interface.

## Technology Stack

**Backend**
- Java 17
- Spring Boot 3.5.7
- Spring Web
- Spring Data JPA
- Hibernate
- Maven

**Database**
- MySQL 8.0

**Frontend**
- HTML5
- CSS3
- JavaScript
- Fetch API

## Project Architecture

The application follows a layered architecture:

1. **Controller Layer:** Handles incoming HTTP requests and REST API endpoints.
2. **Service Layer:** Contains business logic for user operations.
3. **Repository Layer:** Handles database operations using Spring Data JPA.
4. **Entity Layer:** Represents the User database entity.

**Application Flow:**

Frontend → REST Controller → Service → Repository → MySQL Database

## REST API Endpoints

Base URL: `/api/users`

| HTTP Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users` | Create a new user |
| GET | `/api/users` | Retrieve all users |
| GET | `/api/users/{id}` | Retrieve a user by ID |
| PUT | `/api/users/{id}` | Update an existing user |
| DELETE | `/api/users/{id}` | Delete a user by ID |

## Database Configuration

Create a MySQL database:

```sql
CREATE DATABASE user_management_db;
```

Configure your database credentials using environment variables:

```text
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

The application uses the following database configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/user_management_db
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

## How to Run the Project

**Prerequisites**
- Java 17 or later
- MySQL Server 8.0
- Maven (or the included Maven Wrapper)

**Steps**

1. Clone the repository:

```bash
git clone https://github.com/shrutishinde7/user-management-system.git
```

2. Navigate to the project directory:

```bash
cd user-management-system
```

3. Create the MySQL database:

```sql
CREATE DATABASE user_management_db;
```

4. Configure the database environment variables (`DB_USERNAME` and `DB_PASSWORD`).

5. Run the application using Maven:

```bash
mvn spring-boot:run
```

Alternatively, on Windows, use:

```bash
mvnw.cmd spring-boot:run
```

6. Open the application in your browser:

http://localhost:8080

## Project Structure

```text
usermanagement/
│
├── src/
│   ├── main/
│   │   ├── java/com/example/usermanagement/
│   │   │   ├── controller/
│   │   │   │   └── UserController.java
│   │   │   ├── entity/
│   │   │   │   └── User.java
│   │   │   ├── repository/
│   │   │   │   └── UserRepository.java
│   │   │   ├── service/
│   │   │   │   └── UserService.java
│   │   │   └── UsermanagementApplication.java
│   │   │
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── index.html
│   │       │   ├── style.css
│   │       │   └── script.js
│   │       └── application.properties
│   │
│   ├── test/
│   └── pom.xml
```

## Author

**Shruti V. Shinde**

GitHub: https://github.com/shrutishinde7

---

Developed as part of the User Management System assignment for IRAA Softech.