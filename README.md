# 🚀 SDWrite AI - AI-Powered Writing Assistant

> A professional SaaS landing page for an AI writing assistant platform with integrated payment solutions for Indian and International customers.

![SDWrite AI](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-19.0-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen)

## 📋 Overview

SDWrite AI is a modern, conversion-optimized landing page for an AI writing assistant SaaS platform. Built with React and FastAPI, it features:

- 🎨 Beautiful dark/light theme toggle
- ⚡ Interactive live demo with 6 AI writing tools
- 💰 Dual payment system (Indian & International)
- 💬 Smart AI chatbot
- 📊 Professional competitor comparison
- ⭐ Customer testimonials
- 📱 Fully responsive design

## ✨ Features

### Frontend
- **Modern UI/UX**: Built with React 19, TailwindCSS, and Shadcn/UI components
- **Theme Toggle**: Seamless dark/light mode with localStorage persistence
- **Live Demo**: 6 interactive writing tools with typing animation effects
  - Blog Post Generator
  - Marketing Copy
  - Email Writer
  - Content Improver
  - Social Media Posts
  - Product Descriptions
- **Pricing Section**: 3-tier pricing (Starter, Pro, Enterprise)
- **Payment Integration**:
  - **Indian Customers**: Direct Bank Transfer & UPI (Zero fees!)
  - **International Customers**: Stripe & PayPal (Coming soon)
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags and semantic HTML

### Backend
- **FastAPI**: High-performance REST API
- **MongoDB**: Scalable NoSQL database
- **Payment APIs**: 
  - Manual payment verification system
  - Stripe integration (ready)
  - PayPal integration (in progress)
- **Secure**: Environment-based configuration
- **CORS Enabled**: Secure cross-origin requests

## 🛠️ Tech Stack

### Frontend
- React 19.0
- React Router DOM 7.5
- TailwindCSS 3.4
- Shadcn/UI Components
- Lucide React Icons
- Axios for API calls
- Sonner for toast notifications

### Backend
- Python 3.11
- FastAPI 0.110
- Motor (Async MongoDB driver)
- Pydantic for data validation
- Razorpay SDK
- Stripe SDK (emergentintegrations)
- Python-dotenv for configuration

### Database
- MongoDB (Local/Atlas)

## 📦 Installation

### Prerequisites
- Node.js 18+ and Yarn
- Python 3.11+
- MongoDB (Local or Atlas)

### Clone Repository
```bash
git clone https://github.com/yourusername/SD-write-ai.git
cd SD-write-ai
```

### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your configuration
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
yarn install

# Configure environment
cp .env.example .env
# Edit .env with backend URL
```

## ⚙️ Configuration

### Backend `.env`
```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="sdwrite"
CORS_ORIGINS="*"
STRIPE_API_KEY=sk_test_emergent
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

### Frontend `.env`
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

### Update Bank Details
Edit `/backend/routes/manual_payments.py` (Lines 23-36) with your actual bank account and UPI details.

## 🚀 Running the Application

### Development Mode

**Backend:**
```bash
cd backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

**Frontend:**
```bash
cd frontend
yarn start
```

### Production Mode

**Backend:**
```bash
cd backend
uvicorn server:app --host 0.0.0.0 --port 8001
```

**Frontend:**
```bash
cd frontend
yarn build
# Serve the build folder with nginx or any static server
```

## 💳 Payment Integration

### Indian Customers (Zero Fees!)
- **Bank Transfer**: Direct NEFT/IMPS/RTGS
- **UPI Payment**: Any UPI app (GPay, PhonePe, Paytm)
- Manual verification within 2-24 hours

### International Customers
- **Stripe**: Card payments worldwide
- **PayPal**: Coming soon

### Payment Flow
```
User selects plan → Payment page → 
Completes payment → Submits proof → 
Admin verifies → Subscription activated
```

## 📁 Project Structure

```
SD-write-ai/
├── backend/
│   ├── models/
│   │   ├── payment.py
│   │   └── manual_payment.py
│   ├── routes/
│   │   ├── payments.py
│   │   └── manual_payments.py
│   ├── server.py
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # Shadcn components
│   │   │   ├── ThemeProvider.jsx
│   │   │   ├── LiveDemo.jsx
│   │   │   └── Chatbot.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── IndianPaymentPage.jsx
│   │   │   └── PaymentPendingPage.jsx
│   │   ├── mock.js
│   │   ├── App.js
│   │   └── index.css
│   ├── package.json
│   └── .env
└── README.md
```

## 🔌 API Endpoints

### Payment APIs
- `POST /api/payments/stripe/create-checkout` - Create Stripe checkout
- `GET /api/payments/stripe/status/{session_id}` - Check payment status
- `POST /api/payments/stripe/webhook` - Stripe webhook handler

### Manual Payment APIs
- `GET /api/manual-payments/bank-details` - Get bank account details
- `GET /api/manual-payments/upi-details` - Get UPI details
- `POST /api/manual-payments/submit-payment` - Submit payment proof
- `GET /api/manual-payments/payment-status/{order_id}` - Check verification status
- `GET /api/manual-payments/pending-payments` - Admin: View pending payments
- `POST /api/manual-payments/verify-payment/{order_id}` - Admin: Verify payment

### General APIs
- `GET /api/` - Health check
- `GET /api/payments/packages` - Get pricing packages

## 🎨 Design Guidelines

- **Color Scheme**: Cyan-to-blue gradients
- **Typography**: System fonts with proper hierarchy
- **Components**: Shadcn/UI for consistency
- **Responsive**: Mobile-first breakpoints
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: WCAG compliant

## 🔒 Security

- Environment variables for sensitive data
- CORS configuration
- Payment signature verification
- Input validation with Pydantic
- Secure MongoDB connection
- HTTPS required for production

## 🚢 Deployment

### Backend (Railway/Render/DigitalOcean)
```bash
# Set environment variables
# Deploy with gunicorn
gunicorn server:app -k uvicorn.workers.UvicornWorker
```

### Frontend (Vercel/Netlify)
```bash
yarn build
# Deploy build folder
```

### Database
- MongoDB Atlas (recommended for production)
- Local MongoDB for development

## 📊 Features Roadmap

### Current (v1.0)
- ✅ Landing page with dark/light theme
- ✅ Live demo with 6 writing tools
- ✅ Indian payment system (Bank/UPI)
- ✅ Stripe integration
- ✅ Manual payment verification

### Upcoming (v1.1)
- ⏳ PayPal integration
- ⏳ Admin dashboard for payment verification
- ⏳ Email notifications
- ⏳ User authentication
- ⏳ Real AI integration (OpenAI/Claude)

### Future (v2.0)
- 📋 User dashboard
- 📋 Content history
- 📋 Team collaboration
- 📋 API access
- 📋 Advanced analytics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Rubi Sharma**
- GitHub: [@23121998d](https://github.com/23121998d)
- Email: contact@sdwrite.ai

## 🙏 Acknowledgments

- Shadcn/UI for beautiful components
- Emergent Agent for development assistance
- Unsplash for images

## 📞 Support

For support, email support@sdwrite.ai or join our Slack channel.

---

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by SDWrite AI Team
