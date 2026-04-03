import React, { useState } from "react";
import {
  HandCoins,
  Landmark,
  CreditCard,
  ChartNoAxesCombined,
  Coins,
  LockKeyhole,
  Medal,
  ChevronRight,
  Sparkles,
  Trophy,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FinancialLiteracyGame = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [showModuleDetails, setShowModuleDetails] = useState(false);
  const [userPoints, setUserPoints] = useState(120);
  const [userLevel, setUserLevel] = useState(2);
  const [completedLessons, setCompletedLessons] = useState([
    "Budgeting Basics",
    "Creating a Budget",
  ]);
  const [userBadges, setUserBadges] = useState([
    "Budget Master",
    "Saving Starter",
  ]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [showLessonContent, setShowLessonContent] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [kidsMode, setKidsMode] = useState(false);

  const modules = [
    {
      id: "budgeting",
      title: kidsMode ? "Piggy Bank Magic" : "Budgeting",
      icon: kidsMode ? "🐷" : <HandCoins size={32} />,
      color: kidsMode ? "#4CAF50" : "#0D47A1", // Green to Deep Blue
      lessons: [
        {
          title: kidsMode ? "Pocket Money Plan" : "Budgeting Basics",
          completed: true,
          points: 20,
          locked: false,
          content: {
            intro: kidsMode
              ? "Just like planning how to share your candies, budgeting helps you decide how to use your money wisely!"
              : "Budgeting is the foundation of financial wellness. This lesson covers the core principles of creating and maintaining a budget.",
            sections: kidsMode
              ? [
                  {
                    title: "What is a Budget?",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
                    points: [
                      "A plan for your money like a treasure map",
                      "Helps you save for toys and games",
                      "Makes sure you have enough for important things",
                      "Like sharing your candies with friends",
                    ],
                  },
                  {
                    title: "Why Make a Plan?",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132693.png",
                    points: [
                      "So you can buy that cool toy you want",
                      "Helps you not run out of money too fast",
                      "You'll feel proud when you save up",
                      "Parents will be super impressed!",
                    ],
                  },
                  {
                    title: "The 3 Jar Rule",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/4341/4341139.png",
                    points: [
                      "1 jar for spending (candies, small toys)",
                      "1 jar for saving (bigger toys, special things)",
                      "1 jar for sharing (helping others, gifts)",
                      "You decide how much goes in each!",
                    ],
                  },
                ]
              : [
                  {
                    title: "What is a Budget?",
                    points: [
                      "A plan that helps you track your income and expenses",
                      "Gives you control over your money",
                      "Helps you make informed financial decisions",
                      "Essential for achieving financial goals",
                    ],
                  },
                  {
                    title: "Why Budget?",
                    points: [
                      "Helps you live within your means",
                      "Enables you to save for future goals",
                      "Reduces financial stress",
                      "Prepares you for emergencies",
                      "Makes you aware of spending habits",
                    ],
                  },
                  {
                    title: "The 50/30/20 Rule",
                    points: [
                      "50% of income for needs (housing, food, utilities)",
                      "30% of income for wants (entertainment, dining out)",
                      "20% of income for savings and debt repayment",
                      "Flexible guideline that can be adjusted to your situation",
                    ],
                  },
                ],
            quiz: kidsMode
              ? [
                  {
                    question: "What's a budget like?",
                    options: [
                      "A strict teacher",
                      "A treasure map for your money",
                      "A boring book",
                      "A video game",
                    ],
                    correct: 1,
                  },
                  {
                    question: "How many jars are in the 3 Jar Rule?",
                    options: ["1", "2", "3", "10"],
                    correct: 2,
                  },
                  {
                    question: "Which jar would you use to save for a big toy?",
                    options: [
                      "Spending jar",
                      "Saving jar",
                      "Sharing jar",
                      "Under your bed",
                    ],
                    correct: 1,
                  },
                ]
              : [
                  {
                    question: "What is the main purpose of a budget?",
                    options: [
                      "To restrict spending on things you enjoy",
                      "To track and plan your income and expenses",
                      "To impress financial advisors",
                      "To calculate your net worth",
                    ],
                    correct: 1,
                  },
                  {
                    question:
                      "In the 50/30/20 rule, what percentage is recommended for savings?",
                    options: ["10%", "20%", "30%", "50%"],
                    correct: 1,
                  },
                  {
                    question:
                      "Which of these is NOT typically considered in a budget?",
                    options: [
                      "Rent/mortgage payments",
                      "Grocery expenses",
                      "Your neighbor's income",
                      "Entertainment costs",
                    ],
                    correct: 2,
                  },
                ],
          },
        },
        {
          title: kidsMode ? "Making My Money Plan" : "Creating a Budget",
          completed: true,
          points: 30,
          locked: false,
          content: {
            intro: kidsMode
              ? "Let's make your very own money plan! It's like deciding how to spend your allowance or birthday money."
              : "Learn how to create a practical budget that works for your lifestyle and financial goals.",
            sections: kidsMode
              ? [
                  {
                    title: "Step 1: Count Your Coins",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/2694/2694383.png",
                    points: [
                      "How much money do you get each week?",
                      "Add up allowance, gifts, and money from chores",
                      "Write it down or draw pictures of your money",
                      "This is your treasure to plan with!",
                    ],
                  },
                  {
                    title: "Step 2: Think About Spending",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132693.png",
                    points: [
                      "What do you like to buy? (candies, stickers, toys)",
                      "What do you need to buy? (school supplies, gifts)",
                      "Some things cost more than others",
                      "Draw or list what you spend money on",
                    ],
                  },
                  {
                    title: "Step 3: Dream Big!",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132699.png",
                    points: [
                      "What special thing do you want to save for?",
                      "Maybe a new game or a fun day out",
                      "Put a picture of it near your savings jar",
                      "Every coin saved gets you closer!",
                    ],
                  },
                  {
                    title: "Step 4: Try Your Plan",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132698.png",
                    points: [
                      "Start with your jars or envelopes",
                      "Check each week how it's going",
                      "It's okay to change your plan if needed",
                      "High five yourself for trying!",
                    ],
                  },
                ]
              : [
                  {
                    title: "Step 1: Track Your Income",
                    points: [
                      "List all sources of regular income (salary, wages)",
                      "Include irregular income (freelance work, bonuses)",
                      "Calculate your total monthly income",
                      "Use net income (after taxes) for accuracy",
                    ],
                  },
                  {
                    title: "Step 2: List Your Expenses",
                    points: [
                      "Fixed expenses (rent, loan payments, subscriptions)",
                      "Variable expenses (groceries, entertainment)",
                      "Periodic expenses (insurance, car maintenance)",
                      "Track spending for at least one month",
                    ],
                  },
                  {
                    title: "Step 3: Set Financial Goals",
                    points: [
                      "Short-term goals (emergency fund, vacation)",
                      "Long-term goals (retirement, home purchase)",
                      "Prioritize goals based on importance",
                      "Assign dollar amounts and timelines",
                    ],
                  },
                  {
                    title: "Step 4: Implement and Adjust",
                    points: [
                      "Choose a budgeting method (app, spreadsheet, envelope)",
                      "Review your budget weekly or monthly",
                      "Adjust categories as needed",
                      "Celebrate small wins to stay motivated",
                    ],
                  },
                ],
            quiz: kidsMode
              ? [
                  {
                    question: "What's the first step in making a money plan?",
                    options: [
                      "Spend all your money",
                      "Count how much money you have",
                      "Hide your money under the bed",
                      "Ask for more allowance",
                    ],
                    correct: 1,
                  },
                  {
                    question: "Where should you put money for a big toy?",
                    options: [
                      "In your pocket",
                      "In the spending jar",
                      "In the saving jar",
                      "In the sharing jar",
                    ],
                    correct: 2,
                  },
                  {
                    question: "What should you do if your plan isn't working?",
                    options: [
                      "Give up completely",
                      "Cry about it",
                      "Try adjusting your plan",
                      "Blame your little brother",
                    ],
                    correct: 2,
                  },
                ]
              : [
                  {
                    question: "Which of the following is a fixed expense?",
                    options: [
                      "Dining out",
                      "Mortgage payment",
                      "Entertainment",
                      "Vacation costs",
                    ],
                    correct: 1,
                  },
                  {
                    question: "How often should you review your budget?",
                    options: [
                      "Only when your income changes",
                      "Once a year",
                      "Regularly (monthly or quarterly)",
                      "Only when you overspend",
                    ],
                    correct: 2,
                  },
                  {
                    question:
                      "What's a good first step when creating a budget?",
                    options: [
                      "Set unrealistic spending restrictions",
                      "Track your income and expenses",
                      "Open multiple credit cards",
                      "Ignore small expenses",
                    ],
                    correct: 1,
                  },
                ],
          },
        },
        {
          title: kidsMode ? "Tracking My Spending" : "Tracking Expenses",
          completed: false,
          points: 40,
          locked: false,
          content: {
            intro: kidsMode
              ? "Let's learn how to keep track of where your money goes, just like tracking your favorite toys!"
              : "Master the art of tracking expenses to maintain a successful budget and achieve your financial goals.",
            sections: kidsMode
              ? [
                  {
                    title: "How to Track Your Money",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132694.png",
                    points: [
                      "Use a notebook with fun stickers",
                      "Ask parents for help with a phone app",
                      "Make a colorful chart on your wall",
                      "Take pictures of what you buy",
                    ],
                  },
                  {
                    title: "What to Write Down",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132695.png",
                    points: [
                      "Everything you spend money on",
                      "How much it cost",
                      "The date you bought it",
                      "Whether it was a need or a want",
                    ],
                  },
                  {
                    title: "Look at Your Spending",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132696.png",
                    points: [
                      "What do you spend the most on?",
                      "Are you saving enough for big things?",
                      "Do you spend too much on small things?",
                      "What makes you happiest to buy?",
                    ],
                  },
                  {
                    title: "Make It Better",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132697.png",
                    points: [
                      "Find ways to spend less on things you don't need",
                      "Set new saving goals",
                      "Ask parents for tips",
                      "Reward yourself for tracking!",
                    ],
                  },
                ]
              : [
                  {
                    title: "Methods for Tracking",
                    points: [
                      "Mobile apps (Mint, YNAB, EveryDollar)",
                      "Spreadsheets (Excel, Google Sheets)",
                      "Envelope system (cash-based budgeting)",
                      "Pen and paper (simple but effective)",
                    ],
                  },
                  {
                    title: "Categorizing Expenses",
                    points: [
                      "Create meaningful categories that match your spending",
                      "Use subcategories for detailed tracking",
                      "Be consistent with your categorization",
                      "Review and adjust categories periodically",
                    ],
                  },
                  {
                    title: "Regular Review",
                    points: [
                      "Set aside time weekly to review transactions",
                      "Compare actual spending to budgeted amounts",
                      "Identify patterns and problem areas",
                      "Make adjustments before small issues become big problems",
                    ],
                  },
                  {
                    title: "Adjusting Your Budget",
                    points: [
                      "Increase categories where you consistently overspend",
                      "Reduce categories where you consistently underspend",
                      "Account for seasonal variations",
                      "Update your budget when life circumstances change",
                    ],
                  },
                ],
            quiz: kidsMode
              ? [
                  {
                    question: "Why is tracking spending important?",
                    options: [
                      "So you can brag to friends",
                      "To see where your money goes",
                      "Because parents say so",
                      "It's not important",
                    ],
                    correct: 1,
                  },
                  {
                    question: "What should you record when you spend money?",
                    options: [
                      "Just the amount",
                      "Amount, date, and what you bought",
                      "Nothing",
                      "Only big purchases",
                    ],
                    correct: 1,
                  },
                  {
                    question: "How often should you check your spending?",
                    options: [
                      "Once a year",
                      "Every few months",
                      "Every week or two",
                      "Never",
                    ],
                    correct: 2,
                  },
                ]
              : [
                  {
                    question: "What is the envelope budgeting method?",
                    options: [
                      "Putting all your receipts in envelopes",
                      "Allocating cash to different spending categories using physical envelopes",
                      "A digital budgeting app",
                      "Mailing your budget to a financial advisor",
                    ],
                    correct: 1,
                  },
                  {
                    question:
                      "How can expense tracking help improve your finances?",
                    options: [
                      "It automatically increases your income",
                      "It helps identify spending patterns and areas to save",
                      "It eliminates all expenses",
                      "It makes budgeting unnecessary",
                    ],
                    correct: 1,
                  },
                  {
                    question: "Which is NOT a common expense tracking method?",
                    options: [
                      "Mobile apps",
                      "Spreadsheets",
                      "Telepathy",
                      "Written ledger",
                    ],
                    correct: 2,
                  },
                ],
          },
        },
        {
          title: kidsMode ? "Money Adventure Challenge" : "Budget Challenge",
          completed: false,
          points: 50,
          locked: true,
          content: {
            intro: kidsMode
              ? "Complete other lessons to unlock this exciting money adventure!"
              : "Put your budgeting skills to the test with real-world scenarios and challenges.",
            sections: kidsMode
              ? [
                  {
                    title: "Coming Soon!",
                    points: [
                      "Complete other lessons to unlock",
                      "Fun challenges await!",
                      "Earn special badges",
                      "Become a money master",
                    ],
                  },
                ]
              : [
                  {
                    title: "Challenge Introduction",
                    points: [
                      "This advanced module tests your ability to create and maintain a budget in challenging financial situations",
                      "Complete previous lessons to unlock this content",
                    ],
                  },
                ],
            quiz: kidsMode
              ? [
                  {
                    question:
                      "This content is locked until you complete previous adventures.",
                    options: [],
                    correct: 0,
                  },
                ]
              : [
                  {
                    question:
                      "This content is locked until you complete previous lessons.",
                    options: [],
                    correct: 0,
                  },
                ],
          },
        },
      ],
    },
    {
      id: "saving",
      title: kidsMode ? "Treasure Chest" : "Saving",
      icon: kidsMode ? "🏆" : <Landmark />,
      color: kidsMode ? "#2196F3" : "#2044a4", // Blue to Dark Indigo,
      lessons: [
        {
          title: kidsMode ? "Saving Superpowers" : "Saving Fundamentals",
          completed: true,
          points: 20,
          locked: false,
          content: {
            intro: kidsMode
              ? "Discover how saving money gives you superpowers to get the things you really want!"
              : "Learn the basics of saving money and why it's crucial for financial security.",
            sections: kidsMode
              ? [
                  {
                    title: "Why Save Money?",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132690.png",
                    points: [
                      "For emergencies (like a broken toy)",
                      "To buy special things you really want",
                      "To feel proud of yourself",
                      "To help others when they need it",
                    ],
                  },
                  {
                    title: "Types of Savings",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132691.png",
                    points: [
                      "Short-term (toys, games, treats)",
                      "Medium-term (bigger toys, special outings)",
                      "Long-term (college, car when older)",
                      "Helping others (gifts, donations)",
                    ],
                  },
                  {
                    title: "The Magic of Saving",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132692.png",
                    points: [
                      "Money grows when you save it in a bank",
                      "The more you save, the more it grows",
                      "Starting early makes a big difference",
                      "Example: Save $10/week = $520 in a year!",
                    ],
                  },
                ]
              : [
                  {
                    title: "Why Save Money?",
                    points: [
                      "Emergency fund for unexpected expenses",
                      "Achieve financial goals (house, car, education)",
                      "Financial independence and retirement",
                      "Peace of mind and reduced stress",
                    ],
                  },
                  {
                    title: "Types of Savings",
                    points: [
                      "Emergency fund (3-6 months of expenses)",
                      "Short-term savings (vacations, purchases)",
                      "Long-term savings (retirement, education)",
                      "Goal-specific savings (house down payment)",
                    ],
                  },
                  {
                    title: "The Power of Compound Interest",
                    points: [
                      "Earn interest on your interest over time",
                      "Small regular contributions grow significantly",
                      "The earlier you start, the more you benefit",
                      "Example: $100/month at 7% = $100,000 in 30 years",
                    ],
                  },
                ],
            quiz: kidsMode
              ? [
                  {
                    question: "What happens when you save money in a bank?",
                    options: [
                      "It disappears",
                      "It grows over time",
                      "It gets smaller",
                      "Nothing happens",
                    ],
                    correct: 1,
                  },
                  {
                    question: "Why is an emergency fund important?",
                    options: [
                      "For unexpected problems",
                      "To show off to friends",
                      "Because parents say so",
                      "It's not important",
                    ],
                    correct: 0,
                  },
                  {
                    question: "What's a good first saving goal?",
                    options: [
                      "$1,000,000",
                      "A small amount you can reach quickly",
                      "Nothing - don't save",
                      "Only save coins, not bills",
                    ],
                    correct: 1,
                  },
                ]
              : [
                  {
                    question: "What is compound interest?",
                    options: [
                      "Interest earned only on your principal amount",
                      "Interest earned on both principal and accumulated interest",
                      "A fee banks charge for saving accounts",
                      "A type of loan",
                    ],
                    correct: 1,
                  },
                  {
                    question: "Why is an emergency fund important?",
                    options: [
                      "It's required by law",
                      "To cover unexpected expenses without going into debt",
                      "To impress your friends",
                      "To avoid paying taxes",
                    ],
                    correct: 1,
                  },
                  {
                    question:
                      "What is a good guideline for an emergency fund size?",
                    options: [
                      "$100",
                      "One week's expenses",
                      "3-6 months of expenses",
                      "10 years of salary",
                    ],
                    correct: 2,
                  },
                ],
          },
        },
        {
          title: kidsMode ? "Rainy Day Fund" : "Emergency Funds",
          completed: false,
          points: 25,
          locked: false,
          content: {
            intro: kidsMode
              ? "Learn how to build a safety net for when unexpected things happen, like when your ice cream falls on the ground!"
              : "Learn how to build and maintain an emergency fund to protect yourself from financial surprises.",
            sections: kidsMode
              ? [
                  {
                    title: "What's a Rainy Day Fund?",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
                    points: [
                      "Money set aside for surprises",
                      "Like when something breaks or you get sick",
                      "Helps you avoid big problems",
                      "Makes you feel safe and prepared",
                    ],
                  },
                  {
                    title: "Building Your Fund",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132693.png",
                    points: [
                      "Start small - even a little helps",
                      "Put some birthday money aside",
                      "Save part of your allowance",
                      "Do extra chores for more savings",
                    ],
                  },
                  {
                    title: "Where to Keep It",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/4341/4341139.png",
                    points: [
                      "In a special jar or box at home",
                      "In a bank savings account",
                      "Somewhere safe but not too easy to spend",
                      "Ask parents for help choosing",
                    ],
                  },
                  {
                    title: "When to Use It",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132694.png",
                    points: [
                      "Real emergencies only",
                      "Not for regular treats or toys",
                      "When something important breaks",
                      "When you really need help",
                    ],
                  },
                ]
              : [
                  {
                    title: "Defining Your Emergency Fund",
                    points: [
                      "Calculate your basic monthly living expenses",
                      "Multiply by 3-6 months depending on your situation",
                      "Consider job stability and dependents when deciding amount",
                      "Start with a small goal ($1,000) then build up",
                    ],
                  },
                  {
                    title: "Building Your Fund",
                    points: [
                      "Set up automatic transfers from checking to savings",
                      "Allocate windfalls (tax refunds, bonuses)",
                      "Cut discretionary spending temporarily",
                      "Sell unused items to jumpstart your fund",
                    ],
                  },
                  {
                    title: "Where to Keep Your Emergency Fund",
                    points: [
                      "High-yield savings account for accessibility",
                      "Money market account for slightly higher interest",
                      "Separate from regular checking to avoid temptation",
                      "Liquid accounts (not investments that can lose value)",
                    ],
                  },
                  {
                    title: "When to Use Your Emergency Fund",
                    points: [
                      "Job loss or reduced income",
                      "Major unexpected car or home repairs",
                      "Medical emergencies",
                      "Essential expenses during crisis situations",
                    ],
                  },
                ],
            quiz: kidsMode
              ? [
                  {
                    question: "What's NOT an emergency?",
                    options: [
                      "Broken favorite toy",
                      "New video game release",
                      "Lost school supplies",
                      "Medical emergency",
                    ],
                    correct: 1,
                  },
                  {
                    question: "Where should you keep your emergency fund?",
                    options: [
                      "In your pocket",
                      "In a safe place you can access",
                      "Buried in the backyard",
                      "Spent immediately",
                    ],
                    correct: 1,
                  },
                  {
                    question: "How can you build your emergency fund?",
                    options: [
                      "Spend all your money",
                      "Save a little regularly",
                      "Never save anything",
                      "Only save pennies",
                    ],
                    correct: 1,
                  },
                ]
              : [
                  {
                    question: "Which is NOT typically considered an emergency?",
                    options: [
                      "Unexpected medical bills",
                      "Car repairs after an accident",
                      "Annual property taxes",
                      "Job loss",
                    ],
                    correct: 2,
                  },
                  {
                    question: "Where should you keep your emergency fund?",
                    options: [
                      "In a high-risk investment account",
                      "In a readily accessible savings account",
                      "In cryptocurrency",
                      "Under your mattress",
                    ],
                    correct: 1,
                  },
                  {
                    question:
                      "How can you build an emergency fund on a tight budget?",
                    options: [
                      "Take out loans",
                      "Use credit cards and pay the minimum",
                      "Start small with consistent contributions",
                      "Skip all non-essential spending for a year",
                    ],
                    correct: 2,
                  },
                ],
          },
        },
        {
          title: kidsMode ? "Super Saving Tricks" : "Saving Strategies",
          completed: false,
          points: 35,
          locked: true,
          content: {
            intro: kidsMode
              ? "Complete other lessons to unlock these super saving tricks!"
              : "This section is locked until you complete previous lessons.",
            sections: kidsMode
              ? [
                  {
                    title: "Coming Soon!",
                    points: [
                      "Complete other lessons to unlock",
                      "Learn cool saving tricks",
                      "Earn special badges",
                      "Become a saving superhero",
                    ],
                  },
                ]
              : [
                  {
                    title: "Locked Content",
                    points: [
                      "Complete previous lessons to unlock this content",
                      "You'll learn advanced saving techniques and strategies",
                    ],
                  },
                ],
            quiz: [],
          },
        },
        {
          title: kidsMode
            ? "Saving Superhero Challenge"
            : "Saving Goals Challenge",
          completed: false,
          points: 50,
          locked: true,
          content: {
            intro: kidsMode
              ? "Complete other lessons to become a Saving Superhero!"
              : "This section is locked until you complete previous lessons.",
            sections: kidsMode
              ? [
                  {
                    title: "Coming Soon!",
                    points: [
                      "Complete other lessons to unlock",
                      "Exciting challenges await!",
                      "Test your saving skills",
                      "Earn the Saving Superhero badge",
                    ],
                  },
                ]
              : [
                  {
                    title: "Locked Content",
                    points: [
                      "Complete previous lessons to unlock this content",
                      "This challenge will test your saving knowledge",
                    ],
                  },
                ],
            quiz: [],
          },
        },
      ],
    },
    {
      id: "credit",
      title: kidsMode ? "Borrowing Basics" : "Credit",
      icon: kidsMode ? "🎫" : <CreditCard />,
      color: kidsMode ? "#9C27B0" : "#03389c",
      lessons: [
        {
          title: kidsMode ? "What is Credit?" : "Understanding Credit Scores",
          completed: false,
          points: 25,
          locked: false,
          content: {
            intro: kidsMode
              ? "Learn about borrowing money and why it's important to be responsible with it!"
              : "Learn about credit scores, how they're calculated, and why they matter for your financial health.",
            sections: kidsMode
              ? [
                  {
                    title: "What is Credit?",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132695.png",
                    points: [
                      "Borrowing money to buy things now",
                      "Paying it back later, often with extra",
                      "Like when parents use a credit card",
                      "Needs to be paid back on time",
                    ],
                  },
                  {
                    title: "Why Credit Matters",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132696.png",
                    points: [
                      "Helps buy big things like houses",
                      "Shows if you're responsible with money",
                      "Good credit gets you better deals",
                      "Bad credit makes things harder",
                    ],
                  },
                  {
                    title: "Building Good Credit",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132697.png",
                    points: [
                      "Pay bills on time, every time",
                      "Don't borrow too much",
                      "Start small when you're older",
                      "Ask parents to explain more",
                    ],
                  },
                ]
              : [
                  {
                    title: "What is a Credit Score?",
                    points: [
                      "Numerical representation of creditworthiness (300-850 range)",
                      "Used by lenders to assess loan risk",
                      "Higher scores mean better loan terms and rates",
                      "Multiple scoring models exist (FICO, VantageScore)",
                    ],
                  },
                  {
                    title: "Factors Affecting Your Credit Score",
                    points: [
                      "Payment history (35% of score)",
                      "Credit utilization (30% of score)",
                      "Length of credit history (15% of score)",
                      "Credit mix (10% of score)",
                      "New credit inquiries (10% of score)",
                    ],
                  },
                  {
                    title: "Checking Your Credit Score",
                    points: [
                      "Free annual reports from AnnualCreditReport.com",
                      "Many credit cards now provide free scores",
                      "Monitor for errors and signs of identity theft",
                      "Check at least once per year",
                    ],
                  },
                  {
                    title: "Improving Your Credit Score",
                    points: [
                      "Pay all bills on time, every time",
                      "Keep credit card balances below 30% of limits",
                      "Avoid opening multiple new accounts quickly",
                      "Maintain older accounts to lengthen credit history",
                    ],
                  },
                ],
            quiz: kidsMode
              ? [
                  {
                    question: "What is credit?",
                    options: [
                      "Free money",
                      "Borrowing money to pay back later",
                      "A type of candy",
                      "A video game",
                    ],
                    correct: 1,
                  },
                  {
                    question: "Why is good credit important?",
                    options: [
                      "It's not important",
                      "It helps when you need to borrow money",
                      "It makes you popular",
                      "It gives you free toys",
                    ],
                    correct: 1,
                  },
                  {
                    question: "How do you build good credit?",
                    options: [
                      "Pay bills late",
                      "Pay bills on time",
                      "Ignore bills",
                      "Only use cash",
                    ],
                    correct: 1,
                  },
                ]
              : [
                  {
                    question:
                      "What is typically the most important factor in calculating your credit score?",
                    options: [
                      "Your income",
                      "Your payment history",
                      "Your education level",
                      "Your age",
                    ],
                    correct: 1,
                  },
                  {
                    question: "What is credit utilization?",
                    options: [
                      "How often you use your credit cards",
                      "The ratio of your credit card balances to your credit limits",
                      "How many credit cards you have",
                      "How long you've had credit",
                    ],
                    correct: 1,
                  },
                  {
                    question:
                      "How often are you entitled to a free credit report from each major bureau?",
                    options: ["Weekly", "Monthly", "Annually", "Never"],
                    correct: 2,
                  },
                ],
          },
        },
        {
          title: kidsMode ? "Credit Cards for Kids" : "Credit Cards 101",
          completed: false,
          points: 30,
          locked: true,
          content: {
            intro: kidsMode
              ? "Complete other lessons to learn about credit cards!"
              : "This section is locked until you complete previous lessons.",
            sections: kidsMode
              ? [
                  {
                    title: "Coming Soon!",
                    points: [
                      "Complete other lessons to unlock",
                      "Learn about credit cards",
                      "Understand how they work",
                      "Learn safe ways to use them",
                    ],
                  },
                ]
              : [
                  {
                    title: "Locked Content",
                    points: [
                      "Complete previous lessons to unlock this content",
                      "You'll learn how to use credit cards responsibly",
                    ],
                  },
                ],
            quiz: [],
          },
        },
        {
          title: kidsMode ? "Handling Debt" : "Managing Debt",
          completed: false,
          points: 40,
          locked: true,
          content: {
            intro: kidsMode
              ? "Complete other lessons to learn about handling debt!"
              : "This section is locked until you complete previous lessons.",
            sections: kidsMode
              ? [
                  {
                    title: "Coming Soon!",
                    points: [
                      "Complete other lessons to unlock",
                      "Learn about debt",
                      "Understand how to manage it",
                      "Learn smart borrowing",
                    ],
                  },
                ]
              : [
                  {
                    title: "Locked Content",
                    points: [
                      "Complete previous lessons to unlock this content",
                      "You'll learn strategies for paying down debt effectively",
                    ],
                  },
                ],
            quiz: [],
          },
        },
        {
          title: kidsMode
            ? "Credit Champion Challenge"
            : "Credit Mastery Challenge",
          completed: false,
          points: 60,
          locked: true,
          content: {
            intro: kidsMode
              ? "Complete other lessons to become a Credit Champion!"
              : "This section is locked until you complete previous lessons.",
            sections: kidsMode
              ? [
                  {
                    title: "Coming Soon!",
                    points: [
                      "Complete other lessons to unlock",
                      "Test your credit knowledge",
                      "Earn special badges",
                      "Become a Credit Champion",
                    ],
                  },
                ]
              : [
                  {
                    title: "Locked Content",
                    points: [
                      "Complete previous lessons to unlock this content",
                      "This challenge will test your credit knowledge",
                    ],
                  },
                ],
            quiz: [],
          },
        },
      ],
    },
    {
      id: "investing",
      title: kidsMode ? "Growing Money" : "Investing",
      icon: kidsMode ? "🌱" : <ChartNoAxesCombined />,
      color: kidsMode ? "#FF9800" : "#003087", // Orange to Strong Blue
      progress: 0,
      lessons: [
        {
          title: kidsMode ? "Money Can Grow?" : "Investment Basics",
          completed: false,
          points: 30,
          locked: false,
          content: {
            intro: kidsMode
              ? "Discover how money can grow over time, just like a planted seed becomes a big tree!"
              : "An introduction to the fundamentals of investing and growing your wealth over time.",
            sections: kidsMode
              ? [
                  {
                    title: "What is Investing?",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132698.png",
                    points: [
                      "Using money to make more money",
                      "Like planting seeds to grow trees",
                      "Takes time to grow big",
                      "Different ways to invest",
                    ],
                  },
                  {
                    title: "Why Invest?",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132699.png",
                    points: [
                      "Beat piggy bank savings",
                      "Grow money for big future goals",
                      "Help money keep up with prices",
                      "Make your future self happy",
                    ],
                  },
                  {
                    title: "Risk and Reward",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
                    points: [
                      "More growth potential = more risk",
                      "Less risk = slower growth",
                      "Diversify (don't put all eggs in one basket)",
                      "Time helps reduce risk",
                    ],
                  },
                  {
                    title: "Getting Started",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132690.png",
                    points: [
                      "Start with saving first",
                      "Learn more as you grow up",
                      "Parents can help set up accounts",
                      "Even small amounts add up over time",
                    ],
                  },
                ]
              : [
                  {
                    title: "What is Investing?",
                    points: [
                      "Putting money into assets with expectation of profit",
                      "Different from saving (higher risk, higher potential reward)",
                      "Includes stocks, bonds, real estate, and more",
                      "Key to building long-term wealth",
                    ],
                  },
                  {
                    title: "Why Invest?",
                    points: [
                      "Beat inflation over time",
                      "Achieve financial goals faster",
                      "Create passive income streams",
                      "Build wealth for retirement",
                    ],
                  },
                  {
                    title: "Risk and Return",
                    points: [
                      "Generally, higher potential returns come with higher risk",
                      "Understand your personal risk tolerance",
                      "Diversification reduces risk",
                      "Time horizon affects risk tolerance",
                    ],
                  },
                  {
                    title: "Getting Started",
                    points: [
                      "Set clear financial goals",
                      "Start with retirement accounts (401k, IRA)",
                      "Consider low-cost index funds for beginners",
                      "Automate investments for consistency",
                    ],
                  },
                ],
            quiz: kidsMode
              ? [
                  {
                    question: "What is investing like?",
                    options: [
                      "Planting money seeds",
                      "Hiding money under a mattress",
                      "Spending all your money",
                      "Giving money away",
                    ],
                    correct: 0,
                  },
                  {
                    question: "Why is investing good?",
                    options: [
                      "Makes money grow faster",
                      "Guarantees you'll be rich",
                      "Is always safe",
                      "Doesn't help at all",
                    ],
                    correct: 0,
                  },
                  {
                    question: "What's a key rule of investing?",
                    options: [
                      "Put all money in one thing",
                      "Diversify (spread money around)",
                      "Only invest in candy",
                      "Never tell anyone",
                    ],
                    correct: 1,
                  },
                ]
              : [
                  {
                    question:
                      "What is the main difference between saving and investing?",
                    options: [
                      "Saving is only for rich people",
                      "Investing is only for short-term goals",
                      "Saving is lower risk but typically has lower returns",
                      "There is no difference",
                    ],
                    correct: 2,
                  },
                  {
                    question:
                      "Which of these is generally considered the riskiest investment?",
                    options: [
                      "Government bonds",
                      "Certificates of deposit",
                      "Individual stocks",
                      "High-yield savings accounts",
                    ],
                    correct: 2,
                  },
                  {
                    question: "What is risk tolerance?",
                    options: [
                      "The amount of money you can afford to lose",
                      "Your emotional and financial capacity to endure investment losses",
                      "The minimum return you need from investments",
                      "How much debt you can handle",
                    ],
                    correct: 1,
                  },
                ],
          },
        },
        {
          title: kidsMode ? "Ways to Grow Money" : "Types of Investments",
          completed: false,
          points: 35,
          locked: true,
          content: {
            intro: kidsMode
              ? "Complete other lessons to learn different ways to grow money!"
              : "This section is locked until you complete previous lessons.",
            sections: kidsMode
              ? [
                  {
                    title: "Coming Soon!",
                    points: [
                      "Complete other lessons to unlock",
                      "Learn about different investments",
                      "Understand how they work",
                      "Learn about stocks, bonds, and more",
                    ],
                  },
                ]
              : [
                  {
                    title: "Locked Content",
                    points: [
                      "Complete previous lessons to unlock this content",
                      "You'll learn about different investment vehicles",
                    ],
                  },
                ],
            quiz: [],
          },
        },
        {
          title: kidsMode ? "Risk and Safety" : "Risk and Return",
          completed: false,
          points: 40,
          locked: true,
          content: {
            intro: kidsMode
              ? "Complete other lessons to learn about balancing risk and safety!"
              : "This section is locked until you complete previous lessons.",
            sections: kidsMode
              ? [
                  {
                    title: "Coming Soon!",
                    points: [
                      "Complete other lessons to unlock",
                      "Learn about investment risks",
                      "Understand how to balance risk",
                      "Learn smart investing strategies",
                    ],
                  },
                ]
              : [
                  {
                    title: "Locked Content",
                    points: [
                      "Complete previous lessons to unlock this content",
                      "You'll learn how to balance risk and return",
                    ],
                  },
                ],
            quiz: [],
          },
        },
        {
          title: kidsMode ? "Investing Adventure" : "Portfolio Challenge",
          completed: false,
          points: 65,
          locked: true,
          content: {
            intro: kidsMode
              ? "Complete other lessons to unlock this investing adventure!"
              : "This section is locked until you complete previous lessons.",
            sections: kidsMode
              ? [
                  {
                    title: "Coming Soon!",
                    points: [
                      "Complete other lessons to unlock",
                      "Test your investing knowledge",
                      "Build a pretend portfolio",
                      "Earn special badges",
                    ],
                  },
                ]
              : [
                  {
                    title: "Locked Content",
                    points: [
                      "Complete previous lessons to unlock this content",
                      "This challenge will test your investment knowledge",
                    ],
                  },
                ],
            quiz: [],
          },
        },
      ],
    },
    {
      id: "taxes",
      title: kidsMode ? "Taxes for Kids" : "Taxes",
      icon: kidsMode ? "🏛️" : <Coins />,
      color: kidsMode ? "#F44336" : "#1565C0", // Red to Very Dark Blue
      progress: 0,
      lessons: [
        {
          title: kidsMode ? "What Are Taxes?" : "Tax Fundamentals",
          completed: false,
          points: 25,
          locked: false,
          content: {
            intro: kidsMode
              ? "Learn about taxes and why we pay them to help our community!"
              : "Learn the basics of taxation and how taxes impact your personal finances.",
            sections: kidsMode
              ? [
                  {
                    title: "What Are Taxes?",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132691.png",
                    points: [
                      "Money we pay to the government",
                      "Helps pay for schools, roads, and parks",
                      "Comes from things we buy and money we earn",
                      "Everyone contributes to help our community",
                    ],
                  },
                  {
                    title: "Types of Taxes",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132692.png",
                    points: [
                      "Sales tax (when you buy things)",
                      "Income tax (when you earn money)",
                      "Property tax (for houses and land)",
                      "Different taxes help different things",
                    ],
                  },
                  {
                    title: "Why Taxes Matter",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132693.png",
                    points: [
                      "Pay for things we all use",
                      "Help people who need assistance",
                      "Keep our community running",
                      "Are an important responsibility",
                    ],
                  },
                ]
              : [
                  {
                    title: "Understanding Income Taxes",
                    points: [
                      "Progressive tax system (higher income = higher rate)",
                      "Federal, state, and sometimes local taxes",
                      "Tax brackets determine rates for income ranges",
                      "Effective vs marginal tax rates",
                    ],
                  },
                  {
                    title: "Tax Deductions vs. Credits",
                    points: [
                      "Deductions reduce taxable income (standard or itemized)",
                      "Credits directly reduce tax owed (often more valuable)",
                      "Common deductions: mortgage interest, student loan interest",
                      "Common credits: child tax credit, earned income credit",
                    ],
                  },
                  {
                    title: "Filing Status",
                    points: [
                      "Single, married filing jointly, married filing separately",
                      "Head of household (special rules)",
                      "Affects tax brackets and standard deduction",
                      "Choose the most beneficial status you qualify for",
                    ],
                  },
                  {
                    title: "Tax Planning Basics",
                    points: [
                      "Contribute to retirement accounts to reduce taxable income",
                      "Harvest tax losses in investments",
                      "Time income and deductions strategically",
                      "Keep good records throughout the year",
                    ],
                  },
                ],
            quiz: kidsMode
              ? [
                  {
                    question: "What do taxes pay for?",
                    options: [
                      "Only politicians' salaries",
                      "Things we all use like schools and roads",
                      "Nothing important",
                      "Only military expenses",
                    ],
                    correct: 1,
                  },
                  {
                    question: "When do you pay sales tax?",
                    options: [
                      "When you earn money",
                      "When you buy things at a store",
                      "Only on your birthday",
                      "Never",
                    ],
                    correct: 1,
                  },
                  {
                    question: "Why are taxes important?",
                    options: [
                      "They help our community function",
                      "They're not important",
                      "They only help rich people",
                      "They're just a way to take money",
                    ],
                    correct: 0,
                  },
                ]
              : [
                  {
                    question: "What is a marginal tax rate?",
                    options: [
                      "The highest tax bracket that applies to your income",
                      "The tax rate applied to your last dollar of income",
                      "The average tax rate on all your income",
                      "The lowest possible tax rate",
                    ],
                    correct: 1,
                  },
                  {
                    question:
                      "Which is generally more valuable: a $1,000 tax deduction or a $1,000 tax credit?",
                    options: [
                      "A tax deduction",
                      "A tax credit",
                      "They are exactly the same",
                      "It depends on your income",
                    ],
                    correct: 1,
                  },
                  {
                    question:
                      "When are annual tax returns typically due in the United States?",
                    options: ["January 1", "April 15", "July 4", "December 31"],
                    correct: 1,
                  },
                ],
          },
        },
        {
          title: kidsMode ? "Filing Taxes" : "Filing Taxes",
          completed: false,
          points: 35,
          locked: true,
          content: {
            intro: kidsMode
              ? "Complete other lessons to learn about filing taxes!"
              : "This section is locked until you complete previous lessons.",
            sections: kidsMode
              ? [
                  {
                    title: "Coming Soon!",
                    points: [
                      "Complete other lessons to unlock",
                      "Learn how taxes are filed",
                      "Understand the process",
                      "Learn why it's important",
                    ],
                  },
                ]
              : [
                  {
                    title: "Locked Content",
                    points: [
                      "Complete previous lessons to unlock this content",
                      "You'll learn how to file taxes correctly",
                    ],
                  },
                ],
            quiz: [],
          },
        },
        {
          title: kidsMode ? "Tax Helpers" : "Tax Deductions",
          completed: false,
          points: 40,
          locked: true,
          content: {
            intro: kidsMode
              ? "Complete other lessons to learn about tax helpers!"
              : "This section is locked until you complete previous lessons.",
            sections: kidsMode
              ? [
                  {
                    title: "Coming Soon!",
                    points: [
                      "Complete other lessons to unlock",
                      "Learn about deductions and credits",
                      "Understand how they help",
                      "Learn smart tax strategies",
                    ],
                  },
                ]
              : [
                  {
                    title: "Locked Content",
                    points: [
                      "Complete previous lessons to unlock this content",
                      "You'll learn about maximizing tax deductions",
                    ],
                  },
                ],
            quiz: [],
          },
        },
        {
          title: kidsMode
            ? "Tax Superstar Challenge"
            : "Tax Strategy Challenge",
          completed: false,
          points: 55,
          locked: true,
          content: {
            intro: kidsMode
              ? "Complete other lessons to become a Tax Superstar!"
              : "This section is locked until you complete previous lessons.",
            sections: kidsMode
              ? [
                  {
                    title: "Coming Soon!",
                    points: [
                      "Complete other lessons to unlock",
                      "Test your tax knowledge",
                      "Earn special badges",
                      "Become a Tax Superstar",
                    ],
                  },
                ]
              : [
                  {
                    title: "Locked Content",
                    points: [
                      "Complete previous lessons to unlock this content",
                      "This challenge will test your tax knowledge",
                    ],
                  },
                ],
            quiz: [],
          },
        },
      ],
    },
    {
      id: "security",
      title: kidsMode ? "Money Safety" : "Financial Security",
      icon: kidsMode ? "🛡️" : <LockKeyhole />,
      color: kidsMode ? "#607D8B" : "#00227B", // Grey-Blue to Deep Navy
      progress: 0,
      lessons: [
        {
          title: kidsMode ? "Staying Safe" : "Insurance Basics",
          completed: false,
          points: 25,
          locked: false,
          content: {
            intro: kidsMode
              ? "Learn how to keep your money and yourself safe from unexpected problems!"
              : "Learn about different types of insurance and how they protect your financial well-being.",
            sections: kidsMode
              ? [
                  {
                    title: "What is Insurance?",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132694.png",
                    points: [
                      "Protection against big problems",
                      "Like a safety net for accidents",
                      "You pay a little regularly to be safe",
                      "Helps when bad things happen",
                    ],
                  },
                  {
                    title: "Types of Protection",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132695.png",
                    points: [
                      "Health (when you're sick or hurt)",
                      "Car (for accidents)",
                      "Home (for house problems)",
                      "Life (helps family if something happens)",
                    ],
                  },
                  {
                    title: "Why It's Important",
                    image:
                      "https://cdn-icons-png.flaticon.com/512/3132/3132696.png",
                    points: [
                      "Prevents big money problems",
                      "Gives peace of mind",
                      "Often required by law",
                      "Smart way to be responsible",
                    ],
                  },
                ]
              : [
                  {
                    title: "Why Insurance Matters",
                    points: [
                      "Protects against catastrophic financial losses",
                      "Provides peace of mind and security",
                      "Often required (auto, home, health)",
                      "Essential part of financial planning",
                    ],
                  },
                  {
                    title: "Types of Insurance",
                    points: [
                      "Health insurance (medical expenses)",
                      "Auto insurance (required by law)",
                      "Homeowners/renters insurance (property protection)",
                      "Life insurance (protects dependents)",
                      "Disability insurance (income protection)",
                    ],
                  },
                  {
                    title: "Insurance Terms",
                    points: [
                      "Premium: amount you pay for coverage",
                      "Deductible: amount you pay before coverage starts",
                      "Copay: fixed amount for specific services",
                      "Coverage limit: maximum insurer will pay",
                    ],
                  },
                  {
                    title: "Choosing the Right Coverage",
                    points: [
                      "Assess your specific risks and needs",
                      "Compare policies and prices",
                      "Understand policy exclusions and limitations",
                      "Review coverage annually or after major life events",
                    ],
                  },
                ],
            quiz: kidsMode
              ? [
                  {
                    question: "What is insurance?",
                    options: [
                      "A type of candy",
                      "Protection against big problems",
                      "A way to get rich quick",
                      "Something only adults need",
                    ],
                    correct: 1,
                  },
                  {
                    question: "Which is NOT a type of insurance?",
                    options: [
                      "Health insurance",
                      "Car insurance",
                      "Toy insurance",
                      "Home insurance",
                    ],
                    correct: 2,
                  },
                  {
                    question: "Why is insurance important?",
                    options: [
                      "It prevents all problems",
                      "It helps with big unexpected costs",
                      "It's not important",
                      "It makes you popular",
                    ],
                    correct: 1,
                  },
                ]
              : [
                  {
                    question: "What is an insurance premium?",
                    options: [
                      "The maximum amount an insurance company will pay",
                      "The amount you pay for insurance coverage",
                      "The amount you pay before insurance kicks in",
                      "A reward for not filing claims",
                    ],
                    correct: 1,
                  },
                  {
                    question:
                      "Which type of insurance protects against damage to others' property?",
                    options: [
                      "Health insurance",
                      "Life insurance",
                      "Liability insurance",
                      "Disability insurance",
                    ],
                    correct: 2,
                  },
                  {
                    question: "What is a deductible?",
                    options: [
                      "A tax write-off for insurance costs",
                      "The amount you must pay before insurance coverage begins",
                      "The maximum coverage amount",
                      "A discount for good customers",
                    ],
                    correct: 1,
                  },
                ],
          },
        },
        {
          title: kidsMode ? "Future Planning" : "Retirement Planning",
          completed: false,
          points: 40,
          locked: true,
          content: {
            intro: kidsMode
              ? "Complete other lessons to learn about planning for your future!"
              : "This section is locked until you complete previous lessons.",
            sections: kidsMode
              ? [
                  {
                    title: "Coming Soon!",
                    points: [
                      "Complete other lessons to unlock",
                      "Learn about saving for the future",
                      "Understand retirement planning",
                      "Start good habits early",
                    ],
                  },
                ]
              : [
                  {
                    title: "Locked Content",
                    points: [
                      "Complete previous lessons to unlock this content",
                      "You'll learn how to plan for retirement",
                    ],
                  },
                ],
            quiz: [],
          },
        },
        {
          title: kidsMode ? "Protecting Your Stuff" : "Estate Planning",
          completed: false,
          points: 45,
          locked: true,
          content: {
            intro: kidsMode
              ? "Complete other lessons to learn about protecting your important stuff!"
              : "This section is locked until you complete previous lessons.",
            sections: kidsMode
              ? [
                  {
                    title: "Coming Soon!",
                    points: [
                      "Complete other lessons to unlock",
                      "Learn about protecting your things",
                      "Understand wills and trusts",
                      "Learn smart planning",
                    ],
                  },
                ]
              : [
                  {
                    title: "Locked Content",
                    points: [
                      "Complete previous lessons to unlock this content",
                      "You'll learn about wills, trusts, and estate planning",
                    ],
                  },
                ],
            quiz: [],
          },
        },
        {
          title: kidsMode ? "Safety Superhero Challenge" : "Security Challenge",
          completed: false,
          points: 60,
          locked: true,
          content: {
            intro: kidsMode
              ? "Complete other lessons to become a Safety Superhero!"
              : "This section is locked until you complete previous lessons.",
            sections: kidsMode
              ? [
                  {
                    title: "Coming Soon!",
                    points: [
                      "Complete other lessons to unlock",
                      "Test your safety knowledge",
                      "Earn special badges",
                      "Become a Safety Superhero",
                    ],
                  },
                ]
              : [
                  {
                    title: "Locked Content",
                    points: [
                      "Complete previous lessons to unlock this content",
                      "This challenge will test your financial security knowledge",
                    ],
                  },
                ],
            quiz: [],
          },
        },
      ],
    },
  ];

  const handleModuleClick = (moduleId) => {
    if (activeModule === moduleId) {
      setShowModuleDetails(!showModuleDetails);
    } else {
      setActiveModule(moduleId);
      setShowModuleDetails(true);
    }
    setShowLessonContent(false);
    setActiveLesson(null);
    setQuizActive(false);
    setLessonCompleted(false);
  };

  const handleLessonClick = (lesson) => {
    if (!lesson.locked) {
      setActiveLesson(lesson);
      setShowLessonContent(true);
      setShowModuleDetails(false);
      setQuizActive(false);
      setCurrentQuizQuestion(0);
      setQuizAnswers([]);
      setLessonCompleted(false);
    } else {
      alert(
        kidsMode
          ? "Complete other adventures to unlock this one!"
          : "Complete previous lessons to unlock this content!"
      );
    }
  };

  const startQuiz = () => {
    setQuizActive(true);
    setCurrentQuizQuestion(0);
    setQuizAnswers([]);
  };

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);

    if (questionIndex === activeLesson.content.quiz.length - 1) {
      setLessonCompleted(true);
    } else {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    }
  };

  const calculateQuizScore = () => {
    let correct = 0;
    quizAnswers.forEach((answer, index) => {
      if (answer === activeLesson.content.quiz[index].correct) {
        correct++;
      }
    });
    return Math.round((correct / activeLesson.content.quiz.length) * 100);
  };

  const completeLessonAndReturn = () => {
    const score = calculateQuizScore();

    if (!activeLesson.completed) {
      setUserPoints(userPoints + activeLesson.points);

      if (score >= 70) {
        const newCompletedLessons = [...completedLessons];
        if (!newCompletedLessons.includes(activeLesson.title)) {
          newCompletedLessons.push(activeLesson.title);
          setCompletedLessons(newCompletedLessons);
        }
      }
    }

    setShowLessonContent(false);
    setShowModuleDetails(true);
    setActiveLesson(null);
    setQuizActive(false);
    setLessonCompleted(false);
  };
  // --- Gamification Levels Helper ---
  const getNextLevelXP = () => userLevel * (kidsMode ? 100 : 200);
  const progressPercent = Math.min(100, Math.round((userPoints / getNextLevelXP()) * 100));

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="min-h-screen bg-transparent pb-16 px-4 md:px-8 max-w-6xl mx-auto">
      
      {/* Top Console */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 mt-6 gap-4">
        
        {/* User Stats Card */}
        <div 
          className="flex-1 w-full rounded-[24px] p-5 shadow-sm border flex items-center gap-5 transition-all"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="relative">
            <div 
              className="w-16 h-16 rounded-[18px] flex items-center justify-center text-3xl shadow-sm z-10 relative"
              style={{ background: kidsMode ? "linear-gradient(135deg, #f59e0b, #fbbf24)" : "var(--primary)", color: kidsMode ? "#fff" : "var(--primary-foreground)" }}
            >
              {kidsMode ? "🦁" : "lvl"}
              {!kidsMode && <span className="absolute text-sm font-bold mt-1">{userLevel}</span>}
            </div>
            <div className="absolute inset-0 blur-md scale-110 opacity-40 -z-10" style={{ background: kidsMode ? "#f59e0b" : "var(--primary)" }} />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold tracking-tight mb-1" style={{ color: "var(--foreground)"}}>
              {kidsMode ? "Junior Explorer" : "Financial Architect"}
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: kidsMode ? "#f59e0b" : "var(--primary)" }}
                />
              </div>
              <span className="text-xs font-bold whitespace-nowrap" style={{ color: "var(--muted-foreground)"}}>
                {userPoints} / {getNextLevelXP()} XP
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 px-4 py-2 rounded-xl border ml-2" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
            <div className="flex flex-col items-center">
              <Coins size={18} style={{ color: kidsMode ? "#f59e0b" : "var(--primary)" }} className="mb-0.5"/>
              <span className="text-xs font-bold" style={{ color: "var(--foreground)" }}>{userPoints}</span>
            </div>
            <div className="w-px h-6 bg-[var(--border)]" />
            <div className="flex flex-col items-center">
              <Trophy size={18} style={{ color: kidsMode ? "#f43f5e" : "#8b5cf6" }} className="mb-0.5"/>
              <span className="text-xs font-bold" style={{ color: "var(--foreground)" }}>{userBadges.length}</span>
            </div>
          </div>
        </div>

        {/* Mode Toggle Dropdown/Pill */}
        <div 
          className="flex p-1 rounded-2xl shadow-sm border items-center font-medium text-sm"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <button
            onClick={() => setKidsMode(false)}
            className="px-5 py-2.5 rounded-xl transition-all"
            style={{ 
              background: !kidsMode ? "var(--primary)" : "transparent",
              color: !kidsMode ? "var(--primary-foreground)" : "var(--muted-foreground)",
            }}
          >
            Standard
          </button>
          <button
            onClick={() => setKidsMode(true)}
            className="px-5 py-2.5 rounded-xl transition-all flex items-center gap-1"
            style={{ 
              background: kidsMode ? "#f59e0b" : "transparent",
              color: kidsMode ? "#fff" : "var(--muted-foreground)",
            }}
          >
            Kids <Sparkles size={14}/>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        
        {/* 1. Journey Map (Modules Overview) */}
        {!showLessonContent && !showModuleDetails && (
          <motion.div key="map" {...pageTransition}>
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: "var(--foreground)"}}>
                {kidsMode ? "Your Money Adventure" : "Learning Pathways"}
              </h1>
              <p style={{ color: "var(--muted-foreground)" }}>
                {kidsMode ? "Pick a path and earn shiny coins!" : "Master financial concepts to accelerate your growth."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {modules.map((m) => {
                const completed = m.lessons.filter(l => l.completed).length;
                const total = m.lessons.length;
                const progress = Math.round((completed / total) * 100);

                return (
                  <motion.button 
                    key={m.id}
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleModuleClick(m.id)}
                    className="relative text-left rounded-[28px] p-6 shadow-sm border transition-all overflow-hidden group"
                    style={{ background: "var(--card)", borderColor: "var(--border)" }}
                  >
                    <div 
                      className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity top-0 left-0"
                      style={{ background: m.color }}
                    />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm border"
                          style={{ background: "var(--background)", borderColor: "var(--border)" }}
                        >
                          {m.icon}
                        </div>
                        {progress === 100 && (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500/10 text-green-500">
                            <Medal size={16}/>
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold tracking-tight mb-2" style={{ color: "var(--foreground)"}}>
                        {m.title}
                      </h3>
                      
                      <div className="mt-auto pt-6">
                        <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: "var(--muted-foreground)"}}>
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: "var(--muted)"}}>
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1 }}
                            className="h-full rounded-full"
                            style={{ background: kidsMode && progress < 100 ? "#f59e0b" : "var(--primary)" }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Badges / Achievements Row */}
            <div className="rounded-[28px] p-6 border shadow-sm" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-6 tracking-tight" style={{ color: "var(--foreground)" }}>
                {kidsMode ? "Treasure Chest" : "Trophy Room"}
              </h2>
              <div className="flex flex-wrap gap-4">
                {userBadges.map((badge, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-4 rounded-2xl border" style={{ background: "var(--background)", borderColor: "var(--border)", minWidth: "120px" }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-sm mb-3">
                       {kidsMode ? (i === 0 ? "🏅" : "🌟") : (i === 0 ? "💰" : "🏦")}
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-center" style={{ color: "var(--muted-foreground)"}}>{badge}</p>
                  </div>
                ))}
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl border border-dashed opacity-50" style={{ borderColor: "var(--border)", minWidth: "120px" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl mb-3" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                    <LockKeyhole size={16}/>
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-center" style={{ color: "var(--muted-foreground)"}}>Locked</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. Module Details (Lesson Selection) */}
        {!showLessonContent && showModuleDetails && activeModule && (
          <motion.div key="details" {...pageTransition}>
            <button 
              onClick={() => setShowModuleDetails(false)}
              className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-[var(--accent)]"
              style={{ color: "var(--muted-foreground)" }}
            >
              <ArrowLeft size={16}/> Back
            </button>
            
            <div className="mb-6">
              <h2 className="text-3xl font-bold tracking-tight mb-2" style={{ color: "var(--foreground)"}}>
                {modules.find((m) => m.id === activeModule).title} {kidsMode ? "Adventures" : "Syllabus"}
              </h2>
            </div>
            
            <div className="space-y-4">
              {modules.find((m) => m.id === activeModule).lessons.map((lesson, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ x: lesson.locked ? 0 : 6 }}
                  onClick={() => handleLessonClick(lesson)}
                  className={`flex items-center p-5 rounded-[20px] transition-all border ${lesson.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
                  style={{ background: lesson.locked ? "transparent" : "var(--card)", borderColor: "var(--border)" }}
                >
                  <div className="w-12 h-12 rounded-xl flex flex-shrink-0 items-center justify-center mr-5 font-bold" style={{ background: lesson.completed ? "var(--primary)" : "var(--muted)", color: lesson.completed ? "var(--primary-foreground)" : "var(--foreground)"}}>
                    {lesson.completed ? "✓" : lesson.locked ? <LockKeyhole size={18}/> : idx + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-lg font-bold mb-1 truncate" style={{ color: "var(--foreground)"}}>{lesson.title}</h3>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)"}}>
                      <Sparkles size={12}/> {lesson.points} XP
                    </div>
                  </div>
                  
                  {!lesson.locked && (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--accent)", color: "var(--foreground)" }}>
                      <ChevronRight size={18}/>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 3. Lesson or Quiz Content */}
        {showLessonContent && activeLesson && (
          <motion.div key="lesson" {...pageTransition}>
            <button 
              onClick={() => { setShowLessonContent(false); setShowModuleDetails(true); }}
              className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-[var(--accent)]"
              style={{ color: "var(--muted-foreground)" }}
            >
              <ArrowLeft size={16}/> Back
            </button>

            <div className="rounded-[28px] border shadow-sm overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              {quizActive ? (
                // --- QUIZ UI ---
                <div className="p-6 md:p-6">
                   {!lessonCompleted ? (
                     <AnimatePresence mode="wait">
                       <motion.div
                         key={currentQuizQuestion}
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: -20 }}
                       >
                         <div className="flex items-center gap-2 mb-6">
                           {activeLesson.content.quiz.map((_, i) => (
                             <div 
                               key={i} 
                               className="h-1.5 flex-1 rounded-full transition-all"
                               style={{ background: i <= currentQuizQuestion ? "var(--primary)" : "var(--muted)" }}
                             />
                           ))}
                         </div>
                         
                         <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 leading-tight" style={{ color: "var(--foreground)"}}>
                           {activeLesson.content.quiz[currentQuizQuestion].question}
                         </h3>
                         
                         <div className="space-y-4">
                           {activeLesson.content.quiz[currentQuizQuestion].options.map((opt, i) => (
                             <motion.button
                               key={i}
                               whileHover={{ scale: 1.01 }}
                               whileTap={{ scale: 0.99 }}
                               onClick={() => handleQuizAnswer(currentQuizQuestion, i)}
                               className="w-full text-left p-5 rounded-[18px] border font-bold text-[15px] transition-all hover:border-[var(--primary)]"
                               style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}
                             >
                               {opt}
                             </motion.button>
                           ))}
                         </div>
                       </motion.div>
                     </AnimatePresence>
                   ) : (
                     <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center py-10">
                       <div className="text-7xl mb-6">{calculateQuizScore() >= 70 ? (kidsMode ? "🎊" : "🏆") : "👀"}</div>
                       <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--foreground)" }}>{calculateQuizScore() >= 70 ? "Excellent Work!" : "Almost There"}</h2>
                       <p className="text-lg font-medium mb-6" style={{ color: "var(--muted-foreground)" }}>Score: {calculateQuizScore()}% — {calculateQuizScore() >= 70 ? `You earned ${activeLesson.points} XP!` : "Review the material and try again."}</p>
                       <button
                         onClick={completeLessonAndReturn}
                         className="px-8 py-4 rounded-[16px] font-bold shadow-md transition-all hover:scale-105"
                         style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                       >
                         {kidsMode ? "Keep Exploring" : "Continue"}
                       </button>
                     </motion.div>
                   )}
                </div>
              ) : (
                // --- LESSON READING UI ---
                <div>
                  <div className="p-6 md:p-6 border-b" style={{ borderColor: "var(--border)" }}>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: "var(--foreground)" }}>{activeLesson.title}</h1>
                    <p className="text-lg leading-relaxed font-medium" style={{ color: "var(--muted-foreground)" }}>{activeLesson.content.intro}</p>
                  </div>
                  
                  <div className="p-6 md:p-6 space-y-6">
                    {activeLesson.content.sections.map((sec, i) => (
                      <div key={i} className="flex flex-col md:flex-row gap-4 items-start">
                        {kidsMode && sec.image && (
                          <div className="w-24 h-24 flex-shrink-0 bg-white rounded-2xl p-2 shadow-sm border border-[var(--border)] hidden md:block">
                            <img src={sec.image} alt="visual" className="w-full h-full object-contain mix-blend-multiply" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-4" style={{ color: "var(--foreground)" }}>{sec.title}</h3>
                          <ul className="space-y-3">
                            {sec.points.map((pt, j) => (
                              <li key={j} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: "var(--foreground)" }}>
                                <div className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--primary)" }} />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-6 border-t flex justify-end" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={startQuiz}
                      className="px-8 py-4 rounded-[16px] font-bold flex items-center gap-2 shadow-sm"
                      style={{ background: kidsMode ? "#f59e0b" : "var(--primary)", color: kidsMode ? "#fff" : "var(--primary-foreground)" }}
                    >
                      {kidsMode ? "Start Challenge!" : "Test Your Knowledge"} <ChevronRight size={18}/>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinancialLiteracyGame;
