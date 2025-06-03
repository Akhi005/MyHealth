# **MyHealth** <img src="https://github.com/user-attachments/assets/a4cd779c-48b7-4255-bc45-131e3928ec75" alt="MyHealth Icon" width="40" height="40">

MyHealth is a React-based application designed to help users track their health metrics, access personalized health advice, and manage medical records seamlessly.

Doctors (administrators) can:

- Write articles on various topics.
- View the full list of users.
- Send reports online.

Patients can:

- Set online meetings with doctors at specific times in case of emergencies.
- Access ambulance and home services.
- Make appointment
- Find consultant

---

## **Table of Contents**

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [License](#license)

---

## **Features**

- **Articles** 📖: Definitions, symptoms, prevention, and medication details for various diseases.
- **Find Consultant** 🔍: Search for specialized doctors by name and schedule online meetings.
- **Make Appointment** 📅: Patients can book appointments online and upload prior reports for doctor evaluation.
- **Online Reports** 🖥️: Patients receive their reports online, reducing inconvenience.
- **Home Service & Ambulance** 🏠🚑: Users can book home healthcare services and ambulance services.

---

## **Tech Stack**

### **Frontend:**

- **React.js**: Framework for building dynamic user interfaces.
- **CSS Frameworks**:
  - **Bootstrap** and **Tailwind CSS**: For modern, responsive styling.
  - **daisyUI**: Pre-built styled components for enhanced UI.
- **JavaScript (ES6)**: Used for dynamic behavior and efficient app functionality.
- **React Router**: Manages app navigation and routing.
- **Firebase Hosting**: For deploying the frontend.

### **Backend:**

- **Node.js**: Handles server-side functionality.
- **Express.js**: Backend framework for routing and middleware integration.
- **Firebase Authentication**: Secure user authentication and management.

### **Database:**

- **PostgreSQL**: To store and manage user and application data.

### **Hosting:**

- **Vercel**: For fast and efficient deployment of the React application.

### **Tools & Libraries:**

- **Axios**: For handling API requests seamlessly.

### **Development Tools:**

- **VS Code**: Primary code editor.
- **Postman**: API testing and development.
- **Git**: Version control system for managing code.

---

## **Installation**

### **Prerequisites:**

- **Node.js** installed on your machine.
- **npm** (Node Package Manager).

### **Steps:**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/MyHealth.git
   ```
2. Navigate to the project directory:
   ```bash
   cd MyHealth
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open the app in your browser at `https://myhealth-server-side.vercel.app`.

---

## **Usage**

1. **Signup/Login**: Users can create an account or log in using secure Firebase authentication.When a doctor is going to sign up his/her email should be in xxxx.doctor@gmail.com to identify an admin.
2. **Explore Features**:
   - Browse articles written by doctors.
   - Search for a doctor and schedule online consultations.
   - Book appointments and upload health reports.
   - Request home services or ambulance assistance in emergencies.
3. **Admin Features**:
   - Doctors can manage user lists, write informative articles, and send reports online.

---

## **Future Enhancements**

- Add more dynamic features for better user experience.
- Implement AI-based recommendations for personalized health improvement.
