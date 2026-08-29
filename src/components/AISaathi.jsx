import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, MessageCircle, Send, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { getCopy } from '../data/copy'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './ui/dialog'

// --- Lightweight intent-matching engine -------------------------------
// No external API needed: we treat every FAQ / quick-action / (optional)
// guide entry from copy.js as a tiny "document" and score it against the
// user's question using keyword overlap, with a boost for entries that
// belong to the screen the user is currently on. This is what gives the
// illusion of a real, context-aware LLM without a network call.

const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'am', 'was', 'were', 'be', 'been', 'being',
  'i', 'me', 'my', 'we', 'our', 'you', 'your', 'it', 'its', 'this', 'that',
  'to', 'of', 'in', 'on', 'for', 'and', 'or', 'but', 'do', 'does', 'did',
  'how', 'what', 'when', 'where', 'why', 'which', 'can', 'kya', 'hai',
  'ka', 'ke', 'ki', 'ko', 'se', 'mein', 'kaise', 'please', 'help', 'with'
])

const tokenize = (text = '') =>
  text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOPWORDS.has(word))

const overlapScore = (queryTokens, itemTokens) => {
  if (!queryTokens.length || !itemTokens.length) return 0
  const itemSet = new Set(itemTokens)
  let hits = 0
  queryTokens.forEach((token) => {
    if (itemSet.has(token)) hits += 1
    else if ([...itemSet].some((word) => word.includes(token) || token.includes(word))) hits += 0.5
  })
  return hits / Math.sqrt(itemTokens.length)
}

// Normalizes every source of "knowledge" in copy.js into one shape:
// { id, label, answer, keywords, screen, source }
// - quickQuestions / nextActions already exist in copy.js today.
// - learnHubGuides is an OPTIONAL extra array you can add to copy.js
//   (title, keywords[], answer, screen, anchor) to plug real Learn Hub
//   node content straight into the assistant. It's used automatically
//   the moment it exists — nothing else needs to change.
const buildKnowledgeBase = (t) => {
  const fromQuick = (t.quickQuestions || []).map((item, i) => ({
    id: `quick-${i}`,
    label: item.question,
    answer: item.answer,
    keywords: tokenize(item.question),
    screen: item.screen || null,
    source: 'faq',
  }))

  const fromNext = (t.nextActions || []).map((item, i) => ({
    id: `next-${i}`,
    label: item.label,
    answer: item.answer,
    keywords: tokenize(item.label),
    screen: item.screen || null,
    source: 'action',
  }))

  const fromGuides = (t.learnHubGuides || []).map((item, i) => ({
    id: `guide-${i}`,
    label: item.title,
    answer: item.answer,
    keywords: [...tokenize(item.title), ...(item.keywords || []).map((k) => k.toLowerCase())],
    screen: item.screen || null,
    anchor: item.anchor || null,
    source: 'guide',
  }))

  return [...fromGuides, ...fromQuick, ...fromNext]
}

const SCREEN_MATCH_BOOST = 0.6

const matchIntent = (rawQuestion, knowledgeBase, currentScreen) => {
  const queryTokens = tokenize(rawQuestion)
  const scored = knowledgeBase
    .map((item) => {
      let score = overlapScore(queryTokens, item.keywords)
      if (item.screen && currentScreen && item.screen === currentScreen) score += SCREEN_MATCH_BOOST
      return { ...item, score }
    })
    .sort((a, b) => b.score - a.score)

  const best = scored[0]
  const CONFIDENT = 0.35
  const suggestions = scored.filter((item) => item.id !== best?.id && item.score > 0).slice(0, 3)

  return {
    match: best && best.score >= CONFIDENT ? best : null,
    suggestions,
  }
}

// Splits an answer into words so we can "stream" it in, token by token,
// the way a real LLM completion would arrive.
const useStreamedText = () => {
  const [displayed, setDisplayed] = useState('')
  const [streaming, setStreaming] = useState(false)
  const intervalRef = useRef(null)

  const stream = (fullText) => {
    clearInterval(intervalRef.current)
    const words = fullText.split(' ')
    let i = 0
    setDisplayed('')
    setStreaming(true)
    intervalRef.current = setInterval(() => {
      i += 1
      setDisplayed(words.slice(0, i).join(' '))
      if (i >= words.length) {
        clearInterval(intervalRef.current)
        setStreaming(false)
      }
    }, 28)
  }

  const reset = (text = '') => {
    clearInterval(intervalRef.current)
    setDisplayed(text)
    setStreaming(false)
  }

  useEffect(() => () => clearInterval(intervalRef.current), [])

  return { displayed, streaming, stream, reset }
}

export function AISaathi({ language, currentScreen }) {
  const t = getCopy(language)
  const knowledgeBase = useMemo(() => buildKnowledgeBase(t), [t])

  const [question, setQuestion] = useState('')
  const [lastQuestion, setLastQuestion] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const dialogRef = useRef(null)
  const { displayed, streaming, stream, reset } = useStreamedText()

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 32)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    reset(t.guidedAnswer)
    setLastQuestion('')
    setSuggestions([])
    setIsThinking(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, currentScreen, t.guidedAnswer])

  useEffect(() => {
    if (!isOpen || !dialogRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(dialogRef.current, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.28, ease: 'power2.out', clearProps: 'transform,opacity,visibility' })
  }, [isOpen])

  const faq = t.quickQuestions

  // Core "brain": takes a user question, finds the best-matching piece of
  // Learn Hub / copy knowledge, and streams the answer back in — with a
  // short "thinking" delay first so it reads like a real completion.
  const respond = (userQuestion, matchedAnswer, nextSuggestions = []) => {
    setLastQuestion(userQuestion)
    setIsThinking(true)
    setSuggestions([])
    window.setTimeout(() => {
      setIsThinking(false)
      stream(matchedAnswer)
      setSuggestions(nextSuggestions)
    }, 620)
  }

  const askTypedQuestion = (event) => {
    event.preventDefault()
    const trimmed = question.trim()
    if (!trimmed) return

    const { match, suggestions: related } = matchIntent(trimmed, knowledgeBase, currentScreen)
    const answer = match
      ? match.answer
      : `${t.questionReceived} "${trimmed}" ${t.guidedAnswer}`

    respond(trimmed, answer, related)
    setQuestion('')
  }

  const askSuggested = (item) => {
    const { suggestions: related } = matchIntent(item.label, knowledgeBase, currentScreen)
    respond(item.label, item.answer, related.filter((s) => s.id !== item.id))
  }

  return (
    <Dialog onOpenChange={(open) => { setIsOpen(open); if (open) reset(t.namaste) }}>
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
              {isThinking ? (
                <span className="saathi-typing"><span className="saathi-typing-dots"><i /><i /><i /></span><b>{t.typing}</b></span>
              ) : (
                <>
                  {displayed}
                  {streaming && <span className="saathi-cursor" aria-hidden="true">▍</span>}
                </>
              )}
            </div>
            {!isThinking && !streaming && suggestions.length > 0 && (
              <div className="saathi-suggestions">
                <p>{t.relatedHelp || 'You might also want'}</p>
                {suggestions.map((item) => (
                  <button type="button" key={item.id} className="saathi-suggestion-link" onClick={() => askSuggested(item)}>
                    <span>{item.label}</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="saathi-faq">
            <p>{t.chooseHelp}</p>
            {faq.map((item, i) => (
              <button type="button" key={item.question} onClick={() => askSuggested({ id: `quick-${i}`, label: item.question, answer: item.answer })}>{item.question}</button>
            ))}
          </div>
          {!isThinking && !streaming && (
            <div className="saathi-next-actions">
              <p>{t.nextHelp}</p>
              {t.nextActions.map((item, i) => (
                <button type="button" key={item.label} onClick={() => askSuggested({ id: `next-${i}`, label: item.label, answer: item.answer })}>{item.label}</button>
              ))}
            </div>
          )}
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