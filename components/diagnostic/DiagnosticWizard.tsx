'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, CheckCircle, Mail, Loader2, Award } from 'lucide-react'

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Question {
  id: number
  subject: 'Math' | 'Science' | 'Reading' | 'English'
  question: string
  options: string[]
  correctAnswer: number
}

interface UserAnswer {
  questionId: number
  selectedAnswer: number
}

// ============================================================================
// STATIC QUESTIONS DATA
// ============================================================================

const QUESTIONS: Question[] = [
  {
    id: 1,
    subject: 'Math',
    question: 'A patient needs 250 mg of medication. The medication comes in 100 mg tablets. How many tablets should be administered?',
    options: ['1.5 tablets', '2 tablets', '2.5 tablets', '3 tablets'],
    correctAnswer: 2
  },
  {
    id: 2,
    subject: 'Science',
    question: 'Which organelle is responsible for protein synthesis?',
    options: ['Mitochondria', 'Ribosome', 'Golgi apparatus', 'Nucleus'],
    correctAnswer: 1
  },
  {
    id: 3,
    subject: 'Reading',
    question: 'What is the main purpose of a topic sentence in a paragraph?',
    options: [
      'To conclude the paragraph',
      'To provide supporting details',
      'To introduce the main idea',
      'To create a transition'
    ],
    correctAnswer: 2
  },
  {
    id: 4,
    subject: 'English',
    question: 'Which sentence is grammatically correct?',
    options: [
      'The nurse and doctor was reviewing the charts.',
      'The nurse and doctor were reviewing the charts.',
      'The nurse and doctor is reviewing the charts.',
      'The nurse and doctor be reviewing the charts.'
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    subject: 'Math',
    question: 'If a solution is 15% saline, how many mL of saline are in 200 mL of solution?',
    options: ['15 mL', '20 mL', '30 mL', '45 mL'],
    correctAnswer: 2
  },
  {
    id: 6,
    subject: 'Science',
    question: 'What is the primary function of the alveoli in the lungs?',
    options: [
      'Filter air',
      'Produce mucus',
      'Gas exchange',
      'Warm incoming air'
    ],
    correctAnswer: 2
  },
  {
    id: 7,
    subject: 'Reading',
    question: 'An author writes: "The policy has both supporters and detractors." What does "detractors" mean?',
    options: ['Critics', 'Followers', 'Leaders', 'Observers'],
    correctAnswer: 0
  },
  {
    id: 8,
    subject: 'English',
    question: 'Which word is spelled correctly?',
    options: ['Occurance', 'Occurrence', 'Occurence', 'Occurrance'],
    correctAnswer: 1
  },
  {
    id: 9,
    subject: 'Math',
    question: 'A recipe calls for a 3:2 ratio of flour to sugar. If you use 6 cups of flour, how much sugar do you need?',
    options: ['2 cups', '3 cups', '4 cups', '9 cups'],
    correctAnswer: 2
  },
  {
    id: 10,
    subject: 'Science',
    question: 'Which of the following is NOT a function of the skeletal system?',
    options: [
      'Support and protection',
      'Blood cell production',
      'Mineral storage',
      'Digestion'
    ],
    correctAnswer: 3
  }
]

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function DiagnosticWizard() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'analyzing' | 'email' | 'results'>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<UserAnswer[]>([])
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  const handleAnswer = (selectedAnswer: number) => {
    const newAnswers = [...answers, { questionId: QUESTIONS[currentQuestion].id, selectedAnswer }]
    setAnswers(newAnswers)

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz complete, show analyzing screen
      setCurrentStep('analyzing')
      setTimeout(() => {
        setCurrentStep('email')
      }, 2000)
    }
  }

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }
    
    // TODO: Send email to backend/MailerLite
    console.log('Email submitted:', email)
    
    setCurrentStep('results')
  }

  const calculateScore = () => {
    const correct = answers.filter(
      (answer) => QUESTIONS[answer.questionId - 1].correctAnswer === answer.selectedAnswer
    ).length
    return Math.round((correct / QUESTIONS.length) * 100)
  }

  const getScoreMessage = (score: number) => {
    if (score >= 80) return { message: 'Excellent! You\'re on track!', color: 'text-green-600' }
    if (score >= 60) return { message: 'Good start! Let\'s fill those gaps.', color: 'text-[#20B2AA]' }
    return { message: 'No worries! We\'ll get you ready.', color: 'text-[#F59E0B]' }
  }

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  const renderIntro = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto text-center"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="w-20 h-20 bg-gradient-to-br from-[#20B2AA] to-[#1E3A8A] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Award className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-4">
          Free TEAS 7 Diagnostic
        </h1>
        
        <p className="text-xl text-slate-600 mb-8">
          Discover your strengths and weaknesses in just 5 minutes
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {['Math', 'Science', 'Reading', 'English'].map((subject) => (
            <div key={subject} className="bg-slate-50 rounded-xl p-4">
              <div className="text-2xl mb-2">
                {subject === 'Math' && '🔢'}
                {subject === 'Science' && '🧬'}
                {subject === 'Reading' && '📚'}
                {subject === 'English' && '✍️'}
              </div>
              <div className="text-sm font-bold text-slate-700">{subject}</div>
            </div>
          ))}
        </div>

        <ul className="text-left space-y-3 mb-8 max-w-md mx-auto">
          {[
            '10 carefully selected questions',
            'Instant score analysis',
            'Personalized study recommendations',
            'No credit card required'
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#20B2AA] flex-shrink-0 mt-0.5" />
              <span className="text-slate-700">{item}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setCurrentStep('quiz')}
          className="w-full bg-gradient-to-r from-[#20B2AA] to-[#1E3A8A] text-white px-8 py-5 rounded-2xl text-lg font-bold hover:from-[#1a9d96] hover:to-[#16325f] transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
        >
          Start Free Diagnostic
          <ChevronRight className="w-6 h-6" />
        </button>

        <p className="text-sm text-slate-500 mt-4">
          Takes about 5 minutes • No signup required to start
        </p>
      </div>
    </motion.div>
  )

  const renderQuiz = () => {
    const question = QUESTIONS[currentQuestion]
    const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100

    return (
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="max-w-3xl mx-auto"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-slate-600">
              Question {currentQuestion + 1} of {QUESTIONS.length}
            </span>
            <span className="text-sm font-bold text-[#20B2AA]">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#20B2AA] to-[#1E3A8A]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="inline-block bg-[#20B2AA]/10 text-[#20B2AA] px-4 py-2 rounded-lg text-sm font-bold mb-6">
            {question.subject}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8 leading-tight">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full text-left p-5 rounded-2xl border-2 border-slate-200 hover:border-[#20B2AA] hover:bg-[#20B2AA]/5 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border-2 border-slate-300 group-hover:border-[#20B2AA] group-hover:bg-[#20B2AA] group-hover:text-white flex items-center justify-center font-bold transition-all">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-lg text-slate-700 group-hover:text-[#1A1A1A] font-medium">
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  const renderAnalyzing = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto text-center"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-12">
        <Loader2 className="w-16 h-16 text-[#20B2AA] animate-spin mx-auto mb-6" />
        <h2 className="text-3xl font-black text-[#1A1A1A] mb-4">
          Analyzing Your Results...
        </h2>
        <p className="text-lg text-slate-600">
          Our AI is calculating your score and identifying knowledge gaps
        </p>
      </div>
    </motion.div>
  )

  const renderEmailCapture = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="w-20 h-20 bg-gradient-to-br from-[#20B2AA] to-[#1E3A8A] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Mail className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-4 text-center">
          You're Almost There!
        </h2>
        
        <p className="text-xl text-slate-600 mb-8 text-center">
          Enter your email to unlock your personalized score report
        </p>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setEmailError('')
              }}
              placeholder="your.email@example.com"
              className={`w-full px-6 py-5 rounded-2xl border-2 ${
                emailError ? 'border-red-500' : 'border-slate-200'
              } focus:border-[#20B2AA] focus:outline-none text-lg`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-2">{emailError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#20B2AA] to-[#1E3A8A] text-white px-8 py-5 rounded-2xl text-lg font-bold hover:from-[#1a9d96] hover:to-[#16325f] transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
          >
            Get My Results
            <ChevronRight className="w-6 h-6" />
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-4 text-center">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </motion.div>
  )

  const renderResults = () => {
    const score = calculateScore()
    const { message, color } = getScoreMessage(score)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-4">
              Your TEAS 7 Diagnostic Results
            </h2>
            <p className="text-lg text-slate-600">Based on your answers across all subjects</p>
          </div>

          {/* Score Circle */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - score / 100) }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#20B2AA" />
                    <stop offset="100%" stopColor="#1E3A8A" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-6xl font-black bg-gradient-to-r from-[#20B2AA] to-[#1E3A8A] bg-clip-text text-transparent"
                >
                  {score}%
                </motion.div>
                <div className={`text-sm font-bold ${color} mt-2`}>{message}</div>
              </div>
            </div>
          </div>

          {/* Subject Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {['Math', 'Science', 'Reading', 'English'].map((subject) => {
              const subjectQuestions = QUESTIONS.filter(q => q.subject === subject)
              const subjectAnswers = answers.filter(a => {
                const q = QUESTIONS.find(qu => qu.id === a.questionId)
                return q?.subject === subject
              })
              const subjectScore = Math.round(
                (subjectAnswers.filter(a => {
                  const q = QUESTIONS.find(qu => qu.id === a.questionId)
                  return q?.correctAnswer === a.selectedAnswer
                }).length / subjectQuestions.length) * 100
              )

              return (
                <div key={subject} className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">
                    {subject === 'Math' && '🔢'}
                    {subject === 'Science' && '🧬'}
                    {subject === 'Reading' && '📚'}
                    {subject === 'English' && '✍️'}
                  </div>
                  <div className="text-sm font-bold text-slate-700 mb-1">{subject}</div>
                  <div className="text-2xl font-black text-[#20B2AA]">{subjectScore}%</div>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-slate-50 to-[#20B2AA]/5 rounded-2xl p-8 text-center border-2 border-[#20B2AA]/20">
            <h3 className="text-2xl font-black text-[#1A1A1A] mb-3">
              Ready to Ace the TEAS 7?
            </h3>
            <p className="text-slate-700 mb-6">
              Get access to 4,000+ practice questions, 350+ video lessons, and our AI tutor for personalized help.
            </p>
            
            <button
              onClick={() => window.location.href = 'https://learn.studybuddy.live/subscription/59-3-months?site_template_id=67e1717114d4688062090ad2'}
              className="bg-gradient-to-r from-[#20B2AA] to-[#1E3A8A] text-white px-8 py-4 rounded-2xl text-lg font-bold hover:from-[#1a9d96] hover:to-[#16325f] transition-all transform hover:scale-105 shadow-xl inline-flex items-center gap-2"
            >
              Get Full Access
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <p className="text-sm text-slate-500 mt-4">
              Or{' '}
              <a 
                href="https://learn.studybuddy.live/subscription/2499?site_template_id=67e1717114d4688062090ad2"
                className="text-[#20B2AA] hover:text-[#18968F] underline font-medium"
              >
                start with Basic at $24.99/mo
              </a>
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentStep('intro')
              setCurrentQuestion(0)
              setAnswers([])
              setEmail('')
            }}
            className="text-slate-600 hover:text-slate-900 underline mt-6 block mx-auto"
          >
            Take the quiz again
          </button>
        </div>
      </motion.div>
    )
  }

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-[#20B2AA]/5 py-12 px-4">
      <div className="container mx-auto">
        <AnimatePresence mode="wait">
          {currentStep === 'intro' && renderIntro()}
          {currentStep === 'quiz' && renderQuiz()}
          {currentStep === 'analyzing' && renderAnalyzing()}
          {currentStep === 'email' && renderEmailCapture()}
          {currentStep === 'results' && renderResults()}
        </AnimatePresence>
      </div>
    </div>
  )
}