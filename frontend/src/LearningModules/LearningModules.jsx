import { useState, useRef, useEffect } from "react";
import Image1 from "../assets/image1.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import Image4 from "../assets/image4.png";
import Image5 from "../assets/image5.png";
import Image6 from "../assets/image6.png";
import Image7 from "../assets/image7.png";
import Image8 from "../assets/image8.png";
import Image9 from "../assets/image9.png";
import Image10 from "../assets/image10.png";
import Image11 from "../assets/image11.png";
import Image12 from "../assets/image12.png";
import Image13 from "../assets/image13.png";
import Image14 from "../assets/image14.png";
import Image15 from "../assets/image15.png";
import Image16 from "../assets/image16.png";
import Image17 from "../assets/image17.png";
import Image18 from "../assets/image18.png";
import Image19 from "../assets/image19.png";
import Image20 from "../assets/image20.png";
import Image21 from "../assets/image21.png";
import Image22 from "../assets/image22.png";
import Image23 from "../assets/image23.png";
import Image24 from "../assets/image24.png";
import Image25 from "../assets/image25.png";
import Image26 from "../assets/image26.png";
import Image27 from "../assets/image27.png";
import Image28 from "../assets/image28.png";
import Image29 from "../assets/image29.png";
import Image30 from "../assets/image30.png";
import Image31 from "../assets/image31.png";
import { useNavigate } from "react-router-dom";

const getCompletedModules = () => {
  return JSON.parse(localStorage.getItem("completedModules")) || {};
};

const setCompletedModules = (completed) => {
  localStorage.setItem("completedModules", JSON.stringify(completed));
};

const LearningModules = () => {
  const navigate = useNavigate();
  const [activeGuide, setActiveGuide] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedModules, setCompletedModulesState] = useState(
    getCompletedModules()
  );
  const [showCongratsPopup, setShowCongratsPopup] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setAnimateCards(true);
    }, 100);
  }, []);

  const infographicGuides = [
    {
      id: "pads",
      title: "Understanding Financial Literacy",
      description: "A step-by-step guide to understand Financial Fundamentals",
      image: Image1,
      color: "from-blue-500 to-blue-900", // Darker shade

      steps: [
        {
          id: 1,
          title: "Define Financial Literacy",
          description:
            "Understand and recognize the importance of financial literacy.",
          image: Image2,
          tips: [
            "Understand budgeting, saving, investing, etc",
            "Comprehend financial concepts for informed decision making",
            "Utilize books, online courses, and workshops",
          ],
        },
        {
          id: 2,
          title: "Understand Key Components of Financial Literacy",
          description: "Find areas which you excel and areas for improvement.",
          image: Image3,
          tips: [
            "Focus on the basics",
            "Learn about various financial products",
            "Stay updated",
          ],
        },
        {
          id: 3,
          title: "Assess your Current Financial Situation",
          description:
            "Examine your present financial state to proceed further.",
          image: Image4,
          tips: [
            "Create a Comprehensive Overview",
            "Identify Financial Strengths and Weaknesses",
            "Use financial ratios, such as savings rate or debt-to-income ratio",
          ],
        },
        {
          id: 4,
          title: "Set Personal Financial Goals",
          description: "Use SMART to set goals.",
          image: Image5,
          tips: [
            "Differentiate Between Short, Medium, and Long-Term Goals",
            "Ensure your goals are Specific, Measurable, Achievable, Relevant, and Time-bound",
            "Write Down Your Goals",
          ],
        },
        {
          id: 5,
          title: "Create a Budget",
          description: "Find the right budgeting method and review your spend.",
          image: Image6,
          tips: [
            "Choose a Suitable Budgeting Method",
            "Track Your Spending",
            "Regularly Review and Adjust Your Budget",
          ],
        },
        {
          id: 6,
          title: "Explore Savings Options",
          description: "Look out for diverse saving methods",
          image: Image7,
          tips: [
            "Open Different Types of Savings Accounts",
            "Establish an Emergency Fund",
            "Automate your Savings",
          ],
        },
        {
          id: 7,
          title: "Introduction to Investing",
          description: "Learn different types of investing and risk tolerance.",
          image: Image8,
          tips: [
            "Understand Investment Types",
            "Know your Risk Tolerance",
            "Set Long Term Investment Goals",
          ],
        },
        {
          id: 8,
          title: "Understanding Credit and Debt",
          description:
            "Explore credit and debt for responsible credit management practices.",
          image: Image9,
          tips: [
            "Learn About Credit Reports and Scores",
            "Understand Your Rights",
            "Establish Responsible Credit Management Practices",
          ],
        },
      ],
    },
    {
      id: "tampons",
      title: "Budgeting Fundamentals",
      description: "Learn the proper way to Budget",
      image: Image10,
      color: "from-blue-900 to-blue-400", // Darker shade

      steps: [
        {
          id: 1,
          title: "Importance of Budgeting",
          description: "Learn the Importance of Budgeting.",
          image: Image11,
          tips: [
            "Enhances Financial Awareness",
            "Facilitates Goal Achievement",
            "Reduces Financial Stress",
          ],
        },
        {
          id: 2,
          title: "Types of Budgets",
          description: "Understand the Different types of Budgets.",
          image: Image12,
          tips: [
            "Explore Various Budgeting Methods",
            "Choose a Method That Fits Your Lifestyle",
            "Adjust as Needed",
          ],
        },
        {
          id: 3,
          title: "Income Tracking",
          description: "Maintain Accuracy in your Financial Planning.",
          image: Image13,
          tips: [
            "List Every Source of Income",
            "Record Net Income Only",
            "Review Periodically",
          ],
        },
        {
          id: 4,
          title: "Expense Categorization",
          description: "Classify your expenses into categories.",
          image: Image14,
          tips: [
            "Break down expenses into categories such as fixed, variable, and discretionary for better tracking",
            "Analyze Spending Patterns",
            "Adjust Categories as Necessary",
          ],
        },
        {
          id: 5,
          title: "Allocate Funds",
          description: "Allocate funds for critical areas in order.",
          image: Image15,
          tips: [
            "Prioritize Essential Expenses",
            "Set Limits for Discretionary Spending",
            "Leave Room for Savings",
          ],
        },
        {
          id: 6,
          title: "Monitor and Adjust your Budget",
          description: "Create a routine for checking your budget.",
          image: Image16,
          tips: [
            "Regularly Review Your Budget",
            "Flexibility is Key",
            "Set a Schedule for Re-evaluation",
          ],
        },
        {
          id: 7,
          title: "Overcoming Budgeting Challenges",
          description: "Set Achievable Budgeting Goals.",
          image: Image17,
          tips: [
            "Build an emergency fund to handle unforeseen expenses",
            "Set Realistic Goals",
            "Consider sharing your budgeting goals with a friend or family member for support",
          ],
        },
      ],
    },
    {
      id: "cups",
      title: "Effective Credit Management",
      description: "Navigating Credit Wisely for Financial Success",
      image: Image18,
      color: "from-blue-900 to-blue-500", // Darker shade

      steps: [
        {
          id: 1,
          title: "Understand Credit Management Basics",
          description: "Learn the Fundamentals of Credit Management.",
          image: Image19,
          tips: [
            "Know the Definition",
            "Recognize Its Importance",
            "Get Familiar with the 5 Cs of Credit",
          ],
        },
        {
          id: 2,
          title: "Establish a Credit Policy",
          description: "Learn how to set up credit policies.",
          image: Image20,
          tips: [
            "Define Clear Guidelines",
            "Incorporate Payment Terms",
            "Regularly Review and Adjust",
          ],
        },
        {
          id: 3,
          title: "Conduct Credit Applications",
          description: "Tips to be able to conduct credit applications.",
          image: Image21,
          tips: [
            "Collect key data from potential customers, including financial statements",
            "Create uniform credit application forms",
            "Establish Standards for Approval",
          ],
        },
        {
          id: 4,
          title: "Perform Credit Analysis",
          description: "Understand how to perform basic credit analysis.",
          image: Image22,
          tips: [
            "Analyze Financial Health",
            "Use Scoring Models",
            "Keep abreast of industry trends and economic trends",
          ],
        },
        {
          id: 5,
          title: "Set Appropriate Credit Limits",
          description: "Learn how to mark credit limits.",
          image: Image23,
          tips: [
            "Assess Customer Capability",
            "Consider Industry Norms",
            "Implement Dynamic Limit Adjustments",
          ],
        },
        {
          id: 6,
          title: "Monitor Customer Accounts",
          description:
            "Learn how Customer Accounts are monitored on a regular basis.",
          image: Image24,
          tips: [
            "Conduct Regular Reviews",
            "Leverage software tools that allow for real-time tracking",
            "Establish Clear Communication Channels",
          ],
        },
        {
          id: 7,
          title: "Manage Collections Effectively",
          description: "Learn strategies to manage collections effectively.",
          image: Image25,
          tips: [
            "Create a Collection Strategy",
            "Train Staff on Best Practices",
            "Offer Payment Options",
          ],
        },
      ],
    },
    {
      id: "period-underwear",
      title: "Investment Strategies",
      description:
        "Navigating Investment Options for Long-Term Wealth Building",
      image: Image26,
      color: "from-blue-600 to-blue-900",

      steps: [
        {
          id: 1,
          title: "Understand the Importance of Investing",
          description:
            "Learn how Investing plays an important role in your life.",
          image: Image27,
          tips: [
            "Recognize the Power of Compounding",
            "Establish Financial Goals",
            "Be Informed About Market Dynamics",
          ],
        },
        {
          id: 2,
          title: "Diversify Your Investment Portfolio",
          description:
            "Methods to expand and diversify your investment portfolio.",
          image: Image28,
          tips: [
            "Reflect on Personal Comfort with Risk",
            "Monitor market Correlations",
            "Review and Rebalance Regularly",
          ],
        },
        {
          id: 3,
          title: "Explore Different Investment Vehicles",
          description: "Look at different options to invest your money in.",
          image: Image29,
          tips: [
            "Understand Various Investment Accounts",
            "Stay Updated on Investment Products",
            "Consider Professional Guidance",
          ],
        },
        {
          id: 4,
          title: "Develop an Investment Strategy",
          description:
            "Learn how to come up with an investment strategy which suits you.",
          image: Image30,
          tips: [
            "Set Clear Investment Objectives",
            "Choose an Investment Style",
            "Implement Dollar-Cost Averaging",
          ],
        },
        {
          id: 5,
          title: "Keep Learning and Adapting",
          description: "The mantra is to always keep learning.",
          image: Image31,
          tips: [
            "Stay Educated About Investing Trends",
            "Network with Other Investors",
            "Evaluate Your Investment Performance",
          ],
        },
      ],
    },
  ];

  const markModuleComplete = (guideId) => {
    const updatedCompleted = {
      ...completedModules,
      [guideId]: true,
    };
    setCompletedModulesState(updatedCompleted);
    setCompletedModules(updatedCompleted);
    if (guideId === "period-underwear") {
      setShowCongratsPopup(true);
    }
  };

  const openGuide = (guideId) => {
    setActiveGuide(guideId);
    setCurrentStep(1);
    document.body.style.overflow = "hidden";
  };

  const closeGuide = () => {
    setActiveGuide(null);
    document.body.style.overflow = "auto";
  };

  const getCurrentGuide = () => {
    return infographicGuides.find((guide) => guide.id === activeGuide) || null;
  };

  const nextStep = () => {
    const guide = getCurrentGuide();
    if (guide && currentStep < guide.steps.length) {
      setCurrentStep(currentStep + 1);
      scrollRef.current?.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollRef.current?.scrollTo(0, 0);
    }
  };

  const getCurrentStep = () => {
    const guide = getCurrentGuide();
    return guide?.steps.find((step) => step.id === currentStep) || null;
  };

  const handleViewSimulator = () => {
    setShowCongratsPopup(false);
    console.log("Navigate to simulator page");
    // Replace with your routing logic, e.g., history.push('/simulator');
  };

  const closePopup = () => {
    setShowCongratsPopup(false);
    closeGuide();
  };

  const getCompletionPercentage = (guideId) => {
    return completedModules[guideId] ? 100 : 0;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-blue-200">
      {" "}
      {/* Adjusted background */}
      {/* Left decoration */}
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-700 mb-2">
            Financial Literacy Education
          </h1>
          <p className="text-blue-800 mb-8 text-lg">
            Learn everything you need to know about managing your finances
            effectively and building wealth.
          </p>

          <div className="mx-auto transition-all duration-500 ease-in-out">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {infographicGuides.map((guide, index) => (
                <div
                  key={guide.id}
                  className={`relative h-72 rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group ${
                    animateCards
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => guide.steps.length > 0 && openGuide(guide.id)}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-tr bg-opacity-95 backdrop-filter backdrop-blur-sm"
                    style={{
                      background: `linear-gradient(to top right, var(--tw-gradient-stops)), 
                                     url(${guide.image}) center/cover no-repeat`,
                    }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-tr ${guide.color} opacity-90`}
                    ></div>
                  </div>

                  {/* Completion Indicator */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.3)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <path
                        d="M18 2.0845
                           a 15.9155 15.9155 0 0 1 0 31.831
                           a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${getCompletionPercentage(
                          guide.id
                        )}, 100`}
                      />
                    </svg>
                    {completedModules[guide.id] && (
                      <svg
                        className="w-6 h-6 text-green-400 absolute"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>

                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-foreground">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          {guide.title}
                        </h3>
                        <p className="text-foreground text-opacity-90 max-w-xs">
                          {guide.description}
                        </p>
                      </div>
                      <div className="bg-white bg-opacity-20 p-3 rounded-xl shadow-lg">
                        {guide.icon}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-2">
                        <span className="bg-white text-blue-900 rounded-full px-4 py-1.5 text-sm font-medium shadow-md backdrop-blur-sm transform transition-all duration-300 group-hover:scale-105">
                          {guide.steps.length > 0
                            ? "Start Guide"
                            : "Coming Soon"}
                        </span>
                        {completedModules[guide.id] && (
                          <span className="bg-blue-800 text-foreground rounded-full px-3 py-1.5 text-sm font-medium flex items-center shadow-md">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Completed
                          </span>
                        )}
                      </div>
                      <span className="bg-white bg-opacity-20 rounded-full flex items-center justify-center w-10 h-10 group-hover:bg-white group-hover:text-blue-900 transition-all duration-300 shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Modal for guide viewing */}
      {activeGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-85 backdrop-filter backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl max-h-screen overflow-hidden flex flex-col shadow-2xl">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-foreground flex justify-between items-center">
              {" "}
              {/* Darker shade */}
              <div className="flex items-center">
                <div className="bg-white rounded-lg p-2 mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">
                  {getCurrentGuide()?.title}
                </h2>
              </div>
              <button
                className="bg-white bg-opacity-25 hover:bg-opacity-40 text-foreground p-2 rounded-lg focus:outline-none transition-all duration-200"
                onClick={closeGuide}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto" ref={scrollRef}>
              {getCurrentStep() && (
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 h-96 md:h-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-300 opacity-70"></div>{" "}
                    {/* Adjusted */}
                    <img
                      src={getCurrentStep().image}
                      alt={getCurrentStep().title}
                      className="w-full h-full object-contain relative z-10 p-4"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900 to-transparent p-4 md:hidden">
                      <h3 className="text-foreground text-xl font-bold">
                        {getCurrentStep().title}
                      </h3>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-6 bg-gradient-to-br from-gray-50 to-blue-100">
                    {" "}
                    {/* Adjusted */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <div className="flex items-center mb-4">
                        <span className="inline-block bg-blue-200 text-blue-900 rounded-full px-3 py-1 text-sm font-semibold mr-2">
                          Step {currentStep} of {getCurrentGuide().steps.length}
                        </span>
                        <div className="flex-1 h-1 bg-blue-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-800 rounded-full transition-all duration-300"
                            style={{
                              width: `${
                                (currentStep /
                                  getCurrentGuide()?.steps.length) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-blue-900 mb-4 hidden md:block">
                        {getCurrentStep().title}
                      </h3>
                      <p className="text-blue-800 mb-6 text-lg">
                        {getCurrentStep().description}
                      </p>
                      <div className="bg-gradient-to-r from-blue-100 to-blue-100 rounded-lg p-5 mb-6 border border-blue-200 shadow-inner">
                        {" "}
                        {/* Adjusted */}
                        <h4 className="font-medium text-blue-900 mb-3 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Helpful Tips
                        </h4>
                        <ul className="space-y-3">
                          {getCurrentStep().tips.map((tip, index) => (
                            <li key={index} className="flex items-start">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-blue-800 mr-2 mt-0.5 flex-shrink-0"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-blue-800">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between">
                        <button
                          className={`px-4 py-2 rounded-lg flex items-center ${
                            currentStep === 1
                              ? "text-blue-400 cursor-not-allowed"
                              : "text-blue-900 hover:bg-blue-100"
                          }`}
                          onClick={prevStep}
                          disabled={currentStep === 1}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Previous
                        </button>
                        {currentStep < getCurrentGuide().steps.length ? (
                          <button
                            className="bg-gradient-to-r from-blue-800 to-blue-900 text-foreground px-5 py-2 rounded-lg flex items-center hover:from-blue-900 hover:to-blue-950 shadow-md transform transition-transform hover:scale-105"
                            onClick={nextStep}
                          >
                            Next
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 ml-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        ) : (
                          <button
                            className="bg-gradient-to-r from-blue-800 to-blue-900 text-foreground px-5 py-2 rounded-lg flex items-center hover:from-blue-900 hover:to-blue-950 shadow-md transform transition-transform hover:scale-105"
                            onClick={() => {
                              markModuleComplete(activeGuide);
                              if (activeGuide !== "period-underwear") {
                                closeGuide();
                              }
                            }}
                          >
                            Complete
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 ml-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-100 border-t border-blue-200">
              {" "}
              {/* Adjusted */}
              <div className="flex mt-2 overflow-x-auto pb-2 justify-center">
                {getCurrentGuide()?.steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-3 transition-all duration-300 shadow-md ${
                      currentStep === step.id
                        ? "bg-gradient-to-r from-blue-800 to-blue-900 text-foreground transform scale-110"
                        : step.id < currentStep
                        ? "bg-blue-200 text-blue-900 border-2 border-blue-300"
                        : "bg-white text-blue-500 border border-blue-300"
                    }`}
                  >
                    {step.id}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Congratulations popup */}
      {showCongratsPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-filter backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-500 animate-bounce-once">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-900 mb-4">
                Congratulations!
              </h2>
              <p className="text-blue-800 mb-8">
                You are now ready to invest in simulator stocks and mutual
                funds!
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    handleViewSimulator();
                    navigate("/stocks");
                  }}
                  className="bg-gradient-to-r from-blue-800 to-blue-900 text-foreground px-6 py-3 rounded-lg hover:from-blue-900 hover:to-blue-950 shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  View Simulator
                </button>
                <button
                  onClick={closePopup}
                  className="bg-blue-50 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-100 transition-colors duration-300 border border-blue-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Additional decorative elements */}
      <div className="fixed bottom-0 right-0 w-64 h-64 bg-blue-800 rounded-full filter blur-3xl opacity-10 -mr-32 -mb-32 pointer-events-none"></div>{" "}
      {/* Darker shade */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-blue-900 rounded-full filter blur-3xl opacity-10 -mr-48 -mt-48 pointer-events-none"></div>{" "}
      {/* Darker shade */}
    </div>
  );
};

export default LearningModules;
