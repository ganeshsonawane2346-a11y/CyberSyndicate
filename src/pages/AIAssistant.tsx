import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import { PageHeader } from '../components/ui/PageHeader'
import { AI_ASSISTANT_RESPONSES } from '../data/sampleData'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED_QUESTIONS = [
  'Show students likely to fail DBMS.',
  'Predict placement rate for 2028.',
  'Which department has highest risk?',
  'What skills are missing for top recruiters?',
  'How can placement readiness be improved?',
]

function formatResponse(text: string) {
  return text.split('\n').map((line, i) => {
    const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
    if (line.startsWith('•') || line.startsWith('-')) {
      return <p key={i} className="text-sm text-slate-300 ml-2" dangerouslySetInnerHTML={{ __html: formatted }} />
    }
    if (/^\d+\./.test(line)) {
      return <p key={i} className="text-sm text-slate-300" dangerouslySetInnerHTML={{ __html: formatted }} />
    }
    return <p key={i} className="text-sm text-slate-300" dangerouslySetInnerHTML={{ __html: formatted }} />
  })
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m EduTwin AI, your college ecosystem assistant. Ask me about student risks, placement predictions, skill gaps, or department performance.' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const key = text.toLowerCase().replace(/[?.!]/g, '').trim()
      const response = AI_ASSISTANT_RESPONSES[key] ||
        `I've analyzed your query about "${text}". Based on current digital twin data:\n\n• **1,000 students** tracked across 8 departments\n• **120 at-risk students** requiring attention\n• **Placement forecast: 84%** for next year\n• **Top skill gaps:** Cloud Computing, System Design, Advanced DSA\n\nWould you like me to drill down into a specific department or student cohort?`

      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
      setTyping(false)
    }, 1200)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <PageHeader title="AI Assistant" subtitle="Conversational intelligence for your college ecosystem" />

      <div className="flex-1 glass rounded-xl flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-gradient-to-br from-cyan-500 to-purple-600' : 'bg-white/10'}`}>
                {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-slate-400" />}
              </div>
              <div className={`max-w-[75%] rounded-xl px-4 py-3 ${msg.role === 'assistant' ? 'bg-white/5 border border-white/10' : 'bg-cyan-500/15 border border-cyan-500/20'}`}>
                {msg.role === 'assistant' ? formatResponse(msg.content) : <p className="text-sm text-white">{msg.content}</p>}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2 mb-3">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button key={q} onClick={() => sendMessage(q)}
                className="px-3 py-1.5 rounded-full text-xs text-slate-400 bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors border border-white/5 hover:border-cyan-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {q}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask anything about your college ecosystem..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
            <button onClick={() => sendMessage(input)}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90 transition-opacity">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
