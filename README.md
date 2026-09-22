# 🎫 TicketManager

A full-stack ticket management and issue-tracking web application with role-based access for Managers and Engineers, built with Django REST Framework and React.

## 📖 About the Project

TicketManager lets teams create, track, and resolve support/issue tickets in one place. After logging in, users register as either a **Manager** or an **Engineer**, and the app tailors what they can do based on that role — Engineers work on tickets, while Managers oversee and delegate them.

## ✨ Features

- User registration and login with **JWT authentication** (via Simple JWT)
- Two user roles — **Manager** and **Engineer** — each with different permissions
- Create tickets with a **priority** (High / Medium / Low) and a **status** (Open, In Progress, Resolved, Closed)
- Engineers can **self-assign** tickets
- Managers can **assign tickets to one or more Engineers**
- Full **ticket history** on the ticket detail page — every status, priority, and assignment change is logged
- Landing page for unauthenticated visitors

## 🛠️ Tech Stack

- **Backend:** Python, Django, Django REST Framework, Simple JWT
- **Frontend:** React.js
- **Database:** SQLite (default) — swap in PostgreSQL/MySQL if you prefer

## 🚀 Getting Started

These instructions will help you run TicketManager on your own machine.

### Prerequisites

- Python 3.9+
- Node.js 16+ and npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Heisenberg-m/ticket-management-system.git
cd ticket-management-system
```

### 2. Backend setup

```bash
cd backend            # skip this if your Django project lives in the root folder
python -m venv venv
source venv/bin/activate     # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file (or update `settings.py` directly) with:

```
SECRET_KEY=your-django-secret-key
DEBUG=True
```

Then apply the database migrations and start the server:

```bash
python manage.py migrate
python manage.py createsuperuser   # optional, for admin access
python manage.py runserver
```

The backend will be running at `http://127.0.0.1:8000/`.

### 3. Frontend setup

Open a new terminal window:

```bash
cd frontend           # adjust to your actual frontend folder name
npm install
npm start              # or `npm run dev` if you're using Vite
```

The app will open at `http://localhost:3000/` (or `http://localhost:5173/` for Vite).

## 🧑‍💻 Usage

1. Open the app and register a new account, choosing your role — **Manager** or **Engineer**.
2. Log in — you'll be issued a JWT that keeps you signed in.
3. Create a new ticket and set its priority and status.
4. As an **Engineer**, assign tickets to yourself. As a **Manager**, assign tickets to any Engineer.
5. Open a ticket's detail page to see its full history of changes.

## 🔮 Future Improvements

- Email notifications on ticket assignment/status change
- File attachments on tickets
- Search and filtering on the ticket list
- Docker support for easier setup

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋 Author

**Mridul Anand**
📧 mridul.katyayan@gmail.com
🔗 [github.com/Heisenberg-m](https://github.com/Heisenberg-m)
