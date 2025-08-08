# AI Forex Mentor 🤖📈

**An intelligent trading assistant that not only analyzes the market but also teaches you to understand it.**

---

## About The Project

**AI Forex Mentor** is an innovative educational and analytical platform designed to demystify the complexity of the Forex market. Our goal is not to provide "ready-made signals," but to equip traders with the knowledge and tools to make their own informed decisions.

Using advanced AI models, the application analyzes market data in real-time and translates complex phenomena—such as sudden trend changes, reactions to news, or market sentiment—into simple, understandable language. It's like having a personal mentor by your side, available 24/7.

---

## Key Features

* **🧠 Real-Time AI Analysis:** Get AI-generated explanations of price movements that clarify *why* the market is behaving in a certain way.
* **📊 Interactive Charts:** Modern and smooth charts powered by live data, with the ability to overlay indicators and perform analysis.
* **📰 Sentiment Analysis:** Track market sentiment based on news and social media.
* **📚 Educational Mode:** Learn from historical data and simulations by answering AI-generated questions.
* **🔔 Personalized Alerts:** Set up notifications for key price levels, technical patterns, or shifts in sentiment.
* **💳 Subscription Model:** Access advanced features through flexible subscription plans managed by Stripe.

---

## Tech Stack

**Frontend:**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

**Backend:**
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)
![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

**Infrastructure & AI:**
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

---

## Getting Started (Local Setup)

The project is fully containerized with Docker, making it easy to run on any machine.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/FX-Mentor-Trainer.git](https://github.com/YOUR_USERNAME/FX-Mentor-Trainer.git)
    cd FX-Mentor-Trainer
    ```

2.  **Set up environment variables:**
    * Create a `.env` file from the `.env.example` template.
    * Fill it with your API keys (OpenAI, Stripe, OANDA).

3.  **Run the Docker containers:**
    ```bash
    docker-compose up --build
    ```

4.  **The application will be available at:**
    * Frontend: `http://localhost:3000` (or the port defined in `docker-compose.yml`)
    * Backend API: `http://localhost:8000`

---

## Roadmap

A detailed project development plan, divided into phases and key tasks, is available in our [**project Wiki**](https://github.com/mtmak9/FX-Mentor-Trainer/wiki).

---

## License

This project is distributed under the MIT License. See the `LICENSE` file for more information.