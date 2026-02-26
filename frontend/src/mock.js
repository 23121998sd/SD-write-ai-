// Mock data for AI Writing Assistant Landing Page

export const pricingPlans = [
  {
    id: 1,
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for individuals and small projects",
    features: [
      "10,000 words per month",
      "5 AI writing tools",
      "Basic templates",
      "Email support",
      "Export to PDF/Word",
      "Grammar checking"
    ],
    highlighted: false,
    cta: "Start Free Trial"
  },
  {
    id: 2,
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "Best for professionals and growing teams",
    features: [
      "100,000 words per month",
      "All 20+ AI writing tools",
      "Premium templates",
      "Priority support",
      "Team collaboration (5 users)",
      "Advanced AI models",
      "Plagiarism checker",
      "SEO optimization",
      "API access"
    ],
    highlighted: true,
    cta: "Start Free Trial"
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large teams and organizations",
    features: [
      "Unlimited words",
      "All AI writing tools",
      "Custom templates",
      "Dedicated support manager",
      "Unlimited team members",
      "Custom AI training",
      "Advanced security & compliance",
      "SSO & SAML",
      "Custom integrations",
      "SLA guarantee"
    ],
    highlighted: false,
    cta: "Contact Sales"
  }
];

export const competitorComparison = {
  features: [
    "AI Quality",
    "Words per month (Pro plan)",
    "Number of AI Tools",
    "Team Collaboration",
    "Plagiarism Checker",
    "SEO Optimization",
    "API Access",
    "Custom AI Training",
    "Price (Pro plan)"
  ],
  competitors: [
    {
      name: "WriteAI Pro",
      values: ["⭐⭐⭐⭐⭐", "100,000", "20+", "✓", "✓", "✓", "✓", "✓", "$79"]
    },
    {
      name: "Jasper",
      values: ["⭐⭐⭐⭐", "Unlimited*", "50+", "✓", "✓", "✓", "✗", "✗", "$99"]
    },
    {
      name: "Copy.ai",
      values: ["⭐⭐⭐", "Unlimited*", "90+", "✓", "✗", "✓", "✓", "✗", "$49"]
    },
    {
      name: "Writesonic",
      values: ["⭐⭐⭐⭐", "100,000", "30+", "✓", "✓", "✓", "✗", "✗", "$99"]
    },
    {
      name: "Grammarly",
      values: ["⭐⭐⭐", "N/A", "5", "✓", "✓", "✗", "✗", "✗", "$30"]
    }
  ]
};

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Content Marketing Manager",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    rating: 5,
    text: "WriteAI Pro has transformed our content creation process. We've increased our output by 300% while maintaining quality. The AI suggestions are incredibly accurate."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Freelance Writer",
    company: "Independent",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    rating: 5,
    text: "As a freelancer, this tool has been a game-changer. I can handle 3x more clients while delivering better quality work. The ROI is incredible."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Startup Founder",
    company: "GrowthLabs",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    rating: 5,
    text: "The team collaboration features are amazing. Our entire marketing team uses it daily. It's like having an expert copywriter available 24/7."
  },
  {
    id: 4,
    name: "David Park",
    role: "Blog Editor",
    company: "Digital Trends",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    rating: 5,
    text: "I was skeptical about AI writing tools, but WriteAI Pro proved me wrong. It doesn't replace writers—it makes us better and faster."
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "E-commerce Manager",
    company: "ShopStyle",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    rating: 5,
    text: "Perfect for creating product descriptions at scale. We've written descriptions for 10,000+ products in just 3 months."
  },
  {
    id: 6,
    name: "James Wilson",
    role: "SEO Specialist",
    company: "RankBoost",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    rating: 5,
    text: "The SEO optimization feature is brilliant. Our blog posts now rank 40% better on average. Worth every penny."
  }
];

export const writingTools = [
  {
    id: "blog-post",
    name: "Blog Post Generator",
    description: "Create engaging, SEO-optimized blog posts",
    icon: "FileText",
    placeholder: "Enter your blog topic...",
    exampleOutput: "10 Proven Strategies to Boost Your Productivity in 2024\n\nIn today's fast-paced world, productivity isn't just about working harder—it's about working smarter. Whether you're an entrepreneur, a remote worker, or managing a team, these science-backed strategies will help you achieve more in less time...\n\n1. Time Blocking: The Secret Weapon\nTime blocking isn't just a fancy term—it's a proven method used by top performers like Elon Musk and Bill Gates..."
  },
  {
    id: "marketing-copy",
    name: "Marketing Copy",
    description: "Create compelling ads and marketing content",
    icon: "Megaphone",
    placeholder: "Describe your product/service...",
    exampleOutput: "🚀 Transform Your Writing in Minutes, Not Hours\n\nTired of staring at a blank page? WriteAI Pro uses advanced AI to help you create stunning content 10x faster.\n\n✨ What You Get:\n• Professional-quality content in seconds\n• SEO-optimized for maximum reach\n• 20+ specialized writing tools\n• Team collaboration features\n\n💎 Join 50,000+ writers who've already made the switch.\n\n👉 Start your free 14-day trial—no credit card required!"
  },
  {
    id: "email-writer",
    name: "Email Writer",
    description: "Write professional emails that convert",
    icon: "Mail",
    placeholder: "What's your email about?",
    exampleOutput: "Subject: Quick Question About Our Meeting Tomorrow\n\nHi Jennifer,\n\nI hope this email finds you well. I wanted to quickly touch base before our meeting tomorrow at 2 PM.\n\nI've prepared the quarterly report we discussed, but I'd love to get your input on a few key points:\n\n1. Budget allocation for Q4\n2. Team expansion timeline\n3. New product launch strategy\n\nWould it be possible for you to review the attached document before our call? It would help us make the most of our time together.\n\nLooking forward to our discussion!\n\nBest regards,\nAlex"
  },
  {
    id: "content-improver",
    name: "Content Improver",
    description: "Enhance and polish your existing content",
    icon: "Sparkles",
    placeholder: "Paste your content to improve...",
    exampleOutput: "BEFORE:\nOur product is good and helps people write better. It has many features.\n\nAFTER:\nOur revolutionary AI-powered platform transforms the way professionals create content. With over 20 specialized writing tools, advanced SEO optimization, and real-time collaboration features, we empower writers to produce exceptional content 10x faster—without compromising quality.\n\nKey benefits:\n✓ Save 15+ hours per week\n✓ Boost content quality by 300%\n✓ Scale your content production effortlessly"
  },
  {
    id: "social-media",
    name: "Social Media Posts",
    description: "Create engaging social media content",
    icon: "Share2",
    placeholder: "What do you want to post about?",
    exampleOutput: "🎯 Monday Motivation for Content Creators!\n\nStruggling with writer's block? You're not alone. 73% of creators face this challenge weekly.\n\nHere's the truth: You don't need more inspiration—you need better tools. 🚀\n\nWith AI-powered writing assistants, you can:\n✅ Generate ideas in seconds\n✅ Create first drafts 10x faster\n✅ Focus on strategy, not syntax\n\n💡 Pro tip: The best content comes from combining human creativity with AI efficiency.\n\nWhat's your biggest content creation challenge? Drop a comment below! 👇\n\n#ContentCreation #AIWriting #Productivity #DigitalMarketing"
  },
  {
    id: "product-description",
    name: "Product Descriptions",
    description: "Write compelling product descriptions that sell",
    icon: "ShoppingCart",
    placeholder: "Describe your product...",
    exampleOutput: "Wireless Noise-Cancelling Headphones - Premium Audio Experience\n\n🎧 Immerse Yourself in Pure Sound\n\nExperience audio like never before with our flagship wireless headphones featuring industry-leading noise cancellation technology.\n\nKey Features:\n• Advanced Active Noise Cancellation (ANC) - Block out 99% of ambient noise\n• 30-Hour Battery Life - All-day listening on a single charge\n• Premium Sound Quality - Studio-grade audio with deep bass\n• Ultra-Comfortable - Memory foam ear cushions for hours of comfort\n• Quick Charge - 10 minutes = 5 hours of playback\n\nPerfect for:\n✓ Commuters seeking peace\n✓ Remote workers needing focus\n✓ Music enthusiasts demanding quality\n✓ Travelers wanting comfort\n\n🎁 Limited Time Offer: Free premium carrying case included!\n\nOrder now and elevate your audio experience."
  }
];

export const chatbotResponses = {
  greeting: "Hello! 👋 I'm your AI writing assistant. How can I help you today? I can answer questions about our features, pricing, or help you get started!",
  pricing: "We offer three pricing tiers:\n\n💫 Starter ($29/mo) - Perfect for individuals\n🚀 Pro ($79/mo) - Best for professionals (Most Popular!)\n🏢 Enterprise (Custom) - For large teams\n\nAll plans include a 14-day free trial. Would you like to know more about a specific plan?",
  features: "WriteAI Pro offers 20+ AI-powered writing tools including:\n\n📝 Blog Post Generator\n📧 Email Writer\n📱 Social Media Posts\n✨ Content Improver\n🛍️ Product Descriptions\n📊 SEO Optimization\n🔍 Plagiarism Checker\n👥 Team Collaboration\n\nWhat would you like to know more about?",
  trial: "Great choice! 🎉 Our 14-day free trial includes:\n\n✓ Access to all Pro features\n✓ 10,000 words to test\n✓ No credit card required\n✓ Cancel anytime\n✓ Full customer support\n\nReady to start? Click the 'Start Free Trial' button on any pricing card!",
  comparison: "WriteAI Pro stands out because:\n\n✅ Better AI quality than competitors\n✅ More affordable ($79 vs $99+ for similar features)\n✅ Custom AI training (Enterprise only)\n✅ Superior customer support\n✅ No hidden fees or usage caps\n\nWant to see a detailed comparison table?",
  default: "That's a great question! Our AI writing assistant can help you with:\n\n• Creating any type of content\n• Improving existing writing\n• SEO optimization\n• Team collaboration\n\nCould you be more specific about what you'd like to know? Or type 'pricing', 'features', or 'trial' for quick info!"
};

export const features = [
  {
    icon: "Sparkles",
    title: "Advanced AI Technology",
    description: "Powered by the latest GPT-4 and custom models, delivering human-quality content every time."
  },
  {
    icon: "Zap",
    title: "Lightning Fast",
    description: "Generate complete articles, emails, and marketing copy in seconds, not hours."
  },
  {
    icon: "Users",
    title: "Team Collaboration",
    description: "Work seamlessly with your team. Share, edit, and manage content together in real-time."
  },
  {
    icon: "Shield",
    title: "Plagiarism-Free",
    description: "Built-in plagiarism checker ensures 100% original content every time."
  },
  {
    icon: "TrendingUp",
    title: "SEO Optimized",
    description: "Automatically optimize your content for search engines with AI-powered keyword suggestions."
  },
  {
    icon: "Globe",
    title: "50+ Languages",
    description: "Create content in any major language with native-level fluency and accuracy."
  }
];

export const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "10M+", label: "Words Generated" },
  { value: "4.9/5", label: "User Rating" },
  { value: "99.9%", label: "Uptime" }
];

export const faqs = [
  {
    question: "How does the free trial work?",
    answer: "Our 14-day free trial gives you full access to all Pro features with 10,000 words to test. No credit card required, and you can cancel anytime."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes! You can cancel your subscription at any time from your account settings. No questions asked, no cancellation fees."
  },
  {
    question: "Is the AI-generated content plagiarism-free?",
    answer: "Absolutely! Our AI generates 100% original content. Plus, Pro and Enterprise plans include a built-in plagiarism checker for extra peace of mind."
  },
  {
    question: "What languages do you support?",
    answer: "We support 50+ languages including English, Spanish, French, German, Chinese, Japanese, and many more. The AI maintains native-level quality across all languages."
  },
  {
    question: "How is this different from ChatGPT?",
    answer: "While we use similar AI technology, WriteAI Pro is specifically optimized for content creation with specialized tools, templates, SEO optimization, team collaboration, and professional formatting—all in one platform."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes! If you're not satisfied within the first 30 days, we offer a full money-back guarantee. Just contact our support team."
  }
];
