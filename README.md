# PPD-Solar-Pvt# PPD Solar Engineers Pvt. Ltd. - Company Website

This repository contains the source code for the official company website for PPD Solar Engineers Pvt. Ltd., located in Pune, Maharashtra.

---

## Technology Stack
* **Frontend:** HTML, CSS, JavaScript (with GSAP & Swiper.js)
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL

---

## Running the Project Locally
1.  **Prerequisites:** Node.js and PostgreSQL must be installed.
2.  Clone the repository: `git clone <repository-url>`
3.  Install dependencies: `npm install`
4.  Create a `.env` file in the root directory. Copy the contents of `.env.example` and fill in your local database credentials.
5.  Start the server: `node server.js`
6.  The website will be available at `http://localhost:3000`.

---

## Deployment Information
* **Hosting Provider:** Render.com
* **Frontend:** Deployed as a Static Site.
* **Backend:** Deployed as a Web Service.
* **Database:** Hosted on Render's Managed PostgreSQL service.
* **Domain:** `www.your-domain.com`

---

## Database
The database stores submissions from the "Request a Callback" form in a table named `callback_requests`.