# SplitPay
SplitPay is a web-based application designed to facilitate effortless expense management and payment processes among individuals and groups
This user-friendly platform enables users to track, split, and settle expenses with ease, eliminating the need for manual calculations and reminders.

Key features include:

- Expense tracking and categorization
- Bill splitting and sharing
- Payment processing through various gateways
- Automated reminders and notifications
- Secure and intuitive interface

SplitPay aims to provide a comprehensive solution for managing shared expenses, reducing financial stress, and promoting a cashless economy. Its robust functionality and user-centric design make it an ideal choice for individuals, friends, and families seeking to streamline expense management.

SplitPay's intuitive dashboard provides a clear overview of expenses, pending payments, and settled transactions. Users can create groups, add members, and assign expenses to specific categories, making it easy to track and manage shared costs. The application also offers features like receipt uploading, expense categorization, and payment confirmation, ensuring a seamless and transparent experience. With SplitPay, users can effortlessly manage expenses, reduce financial disputes, and enjoy a hassle-free payment process, making it an indispensable tool for modern personal finance management.

## PROBLEM STATEMENT

Managing shared expenses among individuals and groups is a tedious and time-consuming process, often leading to financial disputes and stress. Existing solutions, such as manual calculations, spreadsheets, and paper receipts, are prone to errors, lack transparency, and require significant effort to track and settle expenses. Additionally, the lack of a centralized platform for expense management and payment processing results in delayed payments, missed payments, and strained relationships.

## LITRATURE SURVEY
1. Integration Model of Multiple Payment Gateways for Online Split Payment Scenario, DOI : [10.1109/ICIMTech55957.2022.9915168](https://ieeexplore.ieee.org/document/9915168)
    - Published in: 2022 International Conference on Information Management and Technology (ICIMTech)
    - Date of Conference: 11-12 August 2022
    - Date Added to IEEE Xplore: 21 October 2022
    - Publisher: IEEE
    - Authors
        - Muchsin Hisyam (Computer Science Department, Faculty of Computing and Media, Bina Nusantara University, Jakarta, Indonesia)
        - Ida Bagus Kerthyayana Manuaba (Computer Science Department, Faculty of Computing and Media, Bina Nusantara University, Jakarta, Indonesia)
          
2. Secure Splitting of Bills and Managing Expenditure Using Blockchain, DOI : [10.1109/TEMSMET56707.2023.10149962](https://ieeexplore.ieee.org/document/10149962)
    - Published in: 2023 IEEE 3rd International Conference on Technology, Engineering, Management for Societal impact using Marketing, Entrepreneurship and Talent (TEMSMET)
    - Date of Conference: 10-11 February 2023
    - Date Added to IEEE Xplore: 16 June 2023
    - Publisher: IEEE
    - Authors
        - Swaraj Mahindre (Computer Science and Engineering G H Raisoni College of Engineering, Nagpur, India)
        - Stuti Gupta (Computer Science and Engineering G H Raisoni College of Engineering, Nagpur, India)
        - Vaishnavi Rambhad (Computer Science and Engineering G H Raisoni College of Engineering, Nagpur, India)
        - Shreyasi Koppisetti (Computer Science and Engineering G H Raisoni College of Engineering, Nagpur, India)
        - Shruti Thakur (G H Raisoni College of Engineering, Nagpur, India)

## OBJECTIVES OF THE MINI PROJECT
### Primary Objectives:
1. Seamless Payment Processing: Enable users to make payments securely and efficiently within the React web application using integrated payment gateways, ensuring a smooth checkout experience.
2. Real-time Expense Tracking: Automatically update expense records and financial data in real-time following successful payments, providing users with accurate and up-to-date information on their spending.
3. Data Accuracy and Integrity: Ensure the accuracy and integrity of financial data by integrating payment gateways with backend systems and implementing robust data validation and reconciliation mechanisms.
   
### Secondary Objectives:
1. Compliance and Security: Adhere to industry standards and regulatory requirements for payment processing and data security, safeguarding sensitive financial information and mitigating risks associated with fraudulent activities.
2. Scalability and Flexibility: Design the payment integration and expense tracking features to be scalable and adaptable to accommodate future growth and changes in user needs, allowing for seamless expansion and customization of functionality.
3. Developer Efficiency: Streamline the development process by providing clear documentation, well-defined APIs, and reusable components for integrating payment gateways and expense tracking features within the React web application.
4. Business Insights and Analytics: Leverage payment transaction data and expense tracking metrics to generate valuable insights and analytics, empowering businesses to make informed decisions and optimize their financial operations.
5. Enhanced User Experience: Improve the overall user experience by simplifying the payment process, reducing friction during checkout, and offering intuitive expense tracking features within the React web application.

## PROPOSED METHODOLOGY
### 1. Design Phase : 
- Design the user interface for payment processing using HTML, CSS, and ReactJS components, ensuring a seamless and intuitive checkout experience.
- Define the data schema and structure for storing payment information and expense records in Firebase Firestore or Realtime Database.

### 2. Payment Gateway Integration:
- Choose and integrate a suitable payment gateway provider (e.g., Stripe, PayPal, RazorPay) into the React web application using JavaScript SDKs or APIs.
- Ensure secure transmission of payment data using HTTPS protocols and encryption mechanisms provided by the payment gateway provider.

### 3. Expense Tracking Implementation:
- Set up Firebase Firestore or Realtime Database to store expense records and financial data associated with user accounts.
- Integrate Firebase Authentication for user authentication and authorization, allowing users to securely log in and access payment and expense tracking features.

### 4. Deployment and Monitoring:
- Deploy the React web application to Firebase Hosting or another suitable hosting platform, ensuring high availability and performance.

## EXPECTED OUTCOME OF THE MINI PROJECT
- Users can make payments directly within the React web application, leading to a streamlined checkout experience with reduced friction and fewer drop-offs.
- Expense records are updated automatically in real-time following successful payments, providing users with accurate and up-to-date information on their spending activities.
- The React web application offers intuitive interfaces for payment processing and expense tracking, enhancing user satisfaction and engagement with the platform.
- Financial data, including payment transactions and expense records, are stored securely in Firebase Firestore or Realtime Database, ensuring data accuracy and integrity.
- The payment gateway integration adheres to industry standards and regulatory requirements for data security and compliance, safeguarding sensitive financial information and mitigating risks associated with fraudulent activities.
- The architecture of the React web application and Firebase backend is designed to be scalable and adaptable, accommodating future growth and changes in user needs without compromising performance or reliability.
- Development time and effort are reduced through the use of reusable React components, Firebase services, and well-documented integration procedures, enabling developers to focus on delivering value-added features and functionality.

## ADVANTAGES
1. Unlike Splitwise, which primarily focuses on expense tracking and group bill splitting, our project offers integrated payment processing capabilities within the same platform. Users can make payments directly within the application, eliminating the need to switch between multiple apps or platforms for managing expenses and settling debts.
2. Our project provides real-time expense tracking functionality, automatically updating expense records immediately after payments are made. This offers users instant visibility into their spending activities and ensures that expense data is always accurate and up-to-date.
3. With a user interface built using HTML, CSS, JavaScript, ReactJS, and Firebase, our project offers a seamless and intuitive user experience for both expense tracking and payment processing. Users can easily navigate the application, make payments, and track expenses without encountering complex workflows or usability issues.

## DISADVANTAGES
1. Unlike Splitwise, which specializes in expense tracking and simplifying group bill splitting, our project may prioritize payment processing over other expense management features. Users who primarily seek comprehensive expense tracking functionality without integrated payments may find our project less suitable for their needs.
2. Our project relies on external payment gateway providers (e.g., Stripe, PayPal) for processing payments, which introduces a dependency on third-party services. Any disruptions or changes to these payment gateways could impact the availability and functionality of payment processing within our application.
3. Handling payment transactions and sensitive financial information introduces security and compliance risks, including data breaches, fraudulent activities, and regulatory violations. Ensuring compliance with industry standards (e.g., PCI DSS) and implementing robust security measures is essential but requires ongoing vigilance and resources.

## REFERENCES
1. Splitwise App:
    - Website: Splitwise
    - Splitwise is a popular expense tracking app that simplifies group bill splitting and expense management for users.

2. Google:
  - Website: Google
  -Description: Google's search engine and suite of productivity tools provide valuable resources and information for research and development projects.

3. YouTube:
  - Website: YouTube
  - Description: YouTube hosts a vast array of tutorial videos and educational content on topics related to web development, including ReactJS, Firebase, and payment gateway integration.

4. IEEE Papers:
  - Website: IEEE Xplore Digital Library
  - Description: The IEEE Xplore Digital Library offers a comprehensive collection of scholarly articles, conference papers, and research publications on topics relevant to technology, including e-commerce, payment systems, and web development.

5. OpenAI GPT-3 Documentation:
  - Website: OpenAI GPT-3 Documentation
  - Description: OpenAI's GPT-3 documentation provides information and resources on using the GPT-3 language model for natural language processing tasks, including generating content for research papers and literature reviews.

6. ReactJS Documentation:
  - Website: ReactJS Documentation
  - Description: ReactJS documentation offers comprehensive guidance and tutorials for building user interfaces with React, a JavaScript library commonly used for developing web applications.

7. Firebase Documentation:
  - Website: Firebase Documentation
  - Description: Firebase documentation provides detailed instructions and examples for using Firebase services, including Firestore, Realtime Database, Authentication, and Hosting, for building web and mobile applications.

8. Payment Gateway Documentation (e.g., Stripe, PayPal):
  - Stripe Documentation: Stripe Documentation
  - PayPal Documentation: PayPal Developer Documentation
