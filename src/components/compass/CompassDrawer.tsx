import { useState, useRef, useEffect } from 'react'
import { X, Send, Sparkles, ChevronDown } from 'lucide-react'
import { checkNriScope } from '@/lib/nri/scopeGuardrails'

interface Message {
  id: string
  role: 'user' | 'nri'
  content: string
  timestamp: Date
}

interface CompassDrawerProps {
  open: boolean
  onClose: () => void
  coopName: string
  memberName: string
  role: string
}

const QUICK_PROMPTS = [
  'What\'s my current equity balance?',
  'When is the next general meeting?',
  'How is patronage calculated here?',
  'Who\'s on the hiring committee?',
  'What did we vote on last month?',
  'How do I complete my buy-in?',
]

const DEMO_RESPONSES: Record<string, string> = {
  'equity': 'Your current equity balance is $5,340. This includes $1,500 in buy-in contributions and $3,840 in accumulated patronage allocations over 3 years. You have $500 remaining on your buy-in schedule.',
  'meeting': 'The next general membership meeting is scheduled for February 15, 2025. Quorum requires 3 of 5 active members. The agenda includes Roberto\'s membership vote and Q1 budget review.',
  'patronage': 'At Evergreen, patronage is calculated based on hours worked — it\'s in your bylaws (Section 4.2). Each member\'s share equals their hours divided by total hours across all members. 80% is distributed as qualified patronage (taxed to you, deducted by the co-op) and 20% as non-qualified (held in your ICA until paid out).',
  'committee': 'The Hiring Committee currently has James Okonkwo (chair) and Ana Lucía Vega. Their term runs through December 2025. The committee meets biweekly — next meeting is January 28.',
  'vote': 'Last month, the cooperative passed the Grievance Policy update (5-0, supermajority) and approved the floor equipment purchase (4-1, majority). The Q4 patronage distribution is currently in voting — 3 for, 1 abstain, waiting on David\'s vote.',
  'buy-in': 'Your total buy-in is $2,000. You\'ve paid $1,500 so far through monthly installments of $125. At your current rate, you\'ll complete your buy-in in April 2025. You can also make a lump-sum payment to finish early.',
}

function getDemoResponse(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes('equity') || lower.includes('balance')) return DEMO_RESPONSES.equity
  if (lower.includes('meeting') || lower.includes('next')) return DEMO_RESPONSES.meeting
  if (lower.includes('patronage') || lower.includes('calculated') || lower.includes('surplus')) return DEMO_RESPONSES.patronage
  if (lower.includes('committee') || lower.includes('hiring')) return DEMO_RESPONSES.committee
  if (lower.includes('vote') || lower.includes('last month') || lower.includes('decided')) return DEMO_RESPONSES.vote
  if (lower.includes('buy-in') || lower.includes('buy in') || lower.includes('complete')) return DEMO_RESPONSES['buy-in']
  return 'I can help you understand your cooperative\'s equity, governance, patronage, committees, bylaws, and financial health. What would you like to know?'
}

export default function CompassDrawer({ open, onClose, coopName, memberName, role }: CompassDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'nri',
      content: `Good morning, ${memberName.split(' ')[0]}. I'm here to help you understand ${coopName}. Ask me anything about your equity, governance, patronage, or cooperative health.`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    // Scope check
    const scopeResult = checkNriScope(text)

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate NRI response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: 'nri',
        content: scopeResult.allowed ? getDemoResponse(text) : scopeResult.gentleResponse!,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, response])
      setIsTyping(false)
    }, 800)
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-warmth-50 border-l border-terra-100 z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-terra-100 bg-white/80 backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-grove-600 flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-display font-semibold text-gray-900">NRI Compass</p>
              <p className="text-[10px] text-gray-400">
                Viewing as {role} · {coopName}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-grove-600 text-white'
                  : 'bg-white border border-terra-100 text-gray-700'
              }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <p className={`text-[9px] mt-1 ${msg.role === 'user' ? 'text-grove-200' : 'text-gray-300'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-terra-100 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompts */}
        {messages.length <= 2 && (
          <div className="px-4 pb-2">
            <p className="text-[10px] text-gray-400 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map(prompt => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-[10px] px-2.5 py-1.5 rounded-full bg-white border border-terra-100 text-gray-600 hover:bg-grove-50 hover:border-grove-200 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-terra-100 bg-white/80 backdrop-blur">
          <form
            onSubmit={e => { e.preventDefault(); sendMessage(input) }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about your cooperative..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-terra-200 bg-warmth-50 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-grove-300"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl bg-grove-600 text-white flex items-center justify-center hover:bg-grove-700 disabled:opacity-50 transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
          <p className="text-[9px] text-gray-300 mt-2 text-center">
            NRI serves your attention — it doesn't decide for you. Demo mode.
          </p>
        </div>
      </div>
    </>
  )
}
