import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Send, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { getCopy } from '../data/copy'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './ui/dialog'

export function AISaathi({ language, currentScreen }) {
  const t = getCopy(language)
  const [answer, setAnswer] = useState(t.guidedAnswer)
  const [question, setQuestion] = useState('')
  const [lastQuestion, setLastQuestion] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const dialogRef = useRef(null)

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 32)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])
  useEffect(() => {
    setAnswer(t.guidedAnswer)
    setLastQuestion('')
    setIsTyping(false)
  }, [language, currentScreen, t.guidedAnswer])

  useEffect(() => {
    if (!isOpen || !dialogRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(dialogRef.current, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.28, ease: 'power2.out', clearProps: 'transform,opacity,visibility' })
  }, [isOpen])
  const faq = t.quickQuestions

  const respond = (userQuestion, response) => {
    setLastQuestion(userQuestion)
    setIsTyping(true)
    window.setTimeout(() => {
      setAnswer(response)
      setIsTyping(false)
    }, 620)
  }

  const askTypedQuestion = (event) => {
    event.preventDefault()
    if (!question.trim()) return
    respond(question.trim(), `${t.questionReceived} “${question.trim()}” ${t.guidedAnswer}`)
    setQuestion('')
  }

  return (
    <Dialog onOpenChange={(open) => { setIsOpen(open); if (open) setAnswer(t.namaste) }}>
      <DialogTrigger asChild>
        <button className={`saathi-trigger ${isScrolled ? 'saathi-trigger-scrolled' : ''}`} type="button" aria-label={`${t.aiName}: ${t.aiPrompt}`}>
          <span className="saathi-icon"><MessageCircle size={21} /></span>
          <span><strong>{t.aiName}</strong><small>{t.aiPrompt}</small></span>
          <MessageCircle size={18} aria-hidden="true" />
        </button>
      </DialogTrigger>
      <DialogContent ref={dialogRef} className="saathi-dialog">
        <div className="saathi-dialog-head">
          <span className="saathi-icon"><Sparkles size={21} /></span>
          <div>
            <DialogTitle>{t.aiName}</DialogTitle>
            <DialogDescription>{currentScreen} · {t.aiPrompt}</DialogDescription>
          </div>
        </div>
        <div className="saathi-chat-body">
          <div className="saathi-context"><span>Screen-aware help</span><strong>{currentScreen}</strong></div>
          <div className="saathi-conversation" aria-live="polite">
            {lastQuestion && <div className="saathi-user-message">{lastQuestion}</div>}
            <div className="saathi-answer" role="status">
              {isTyping ? <span className="saathi-typing"><span className="saathi-typing-dots"><i /><i /><i /></span><b>{t.typing}</b></span> : answer}
            </div>
          </div>
          <div className="saathi-faq">
            <p>{t.chooseHelp}</p>
            {faq.map((item) => (
              <button type="button" key={item.question} onClick={() => respond(item.question, item.answer)}>{item.question}</button>
            ))}
          </div>
          {!isTyping && <div className="saathi-next-actions"><p>{t.nextHelp}</p>{t.nextActions.map((item) => <button type="button" key={item.label} onClick={() => respond(item.label, item.answer)}>{item.label}</button>)}</div>}
        </div>
        <form className="saathi-form" onSubmit={askTypedQuestion}>
          <Input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={t.askAnything} />
          <Button size="icon" type="submit" aria-label={t.send}><Send size={18} /></Button>
        </form>
        <p className="saathi-safety">Demo guidance only. It does not access government records or make decisions.</p>
      </DialogContent>
    </Dialog>
  )
}
