
# NIBMaestro Project Documentation

## Overview
The field of education is undergoing significant changes, with institutions like the **National Institute of Business Management (NIBM)** leading the way. As part of their commitment to improving the learning experience, NIBM has developed a project to renew learning platforms for both lecturers and students. 

The project aims to provide a **modern web application** that facilitates better engagement in academic projects. The primary goal is to address challenges faced by lecturers and students, creating a better environment for the teaching-learning process.

### NIBMaestro: Transforming Project Management
The solution, **NIBMaestro**, is an innovative, user-friendly platform designed to resolve issues faced by the NIBM community. By leveraging **technological advancements** and providing a **simple, intuitive interface**, the platform aims to revolutionize project management and implementation within the institution.

The platform is designed to enhance the educational experience for all involved parties, ensuring that both lecturers and students can manage and track their projects efficiently.

---

## Project Development and Key Features

### **Inception and Development**
NIBMaestro was developed with the intention of providing a robust solution for the hurdles encountered by the academic community at NIBM. During the development process, key features were implemented that aim to improve project management, collaboration, and communication between lecturers and students.

### **Key Features**
- **Modern Web Interface**: An intuitive and responsive web application designed to be accessible to both students and lecturers.
- **Project Management**: Allows users to create, manage, and track projects with ease.
- **User-Friendly Navigation**: Ensures that both lecturers and students can easily navigate the platform without technical expertise.
- **Innovation and Collaboration**: Facilitates greater collaboration between lecturers and students, fostering a productive learning environment.

---

## Expected Outcomes and Benefits
The NIBMaestro platform is designed to:
- Enhance the teaching-learning process at NIBM.
- Provide a user-friendly solution to project management.
- Help lecturers and students to manage and track progress more effectively.
- Improve the overall educational experience at NIBM.

---

## Future Avenues for Innovation
The development of NIBMaestro is only the beginning. There are plans for ongoing enhancement and future updates to continue improving the platform's capabilities and features, ensuring it stays relevant and effective in the face of evolving educational needs.

---

## **How to Configure Database Details**

To set up the database for the NIBMaestro platform, you will need to update the database connection details in the `DataBase.php` file.

### **Steps to Change Database Details**
1. **Locate the `DataBase.php` file** in your project directory.
2. **Open the file** in a text editor or IDE.
3. Find the following lines of code where the database connection is set up:
   ```php
   $hostname = "localhost";
   $username = "root";
   $password = ""; // Change this if your root user has a password
   $database = "mysql"; // Change this to your actual database name
   $port = 3308; // Default MySQL port (change if needed)
