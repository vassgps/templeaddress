import React, { useState } from 'react'

// Optional, user-initiated Google translation. Never send booking forms to a translation API.
export default function LanguageControl() {
  const [enabled,setEnabled] = useState(false), [error,setError] = useState('')
  const enable = () => {
    setEnabled(true); setError('')
    const init = () => { if (window.google?.translate) new window.google.translate.TranslateElement({pageLanguage:'en',includedLanguages:'en,ml,hi,ta,te,kn',autoDisplay:false}, 'ta-google-translate') }
    if (window.google?.translate) {setTimeout(init,0);return}
    window.taTranslateReady = init
    if (!document.getElementById('ta-translate-script')) {
      const script = document.createElement('script'); script.id = 'ta-translate-script'; script.src = 'https://translate.google.com/translate_a/element.js?cb=taTranslateReady'; script.onerror = () => {setError('Translation could not load. Please use your browser’s Translate option.');script.remove()};document.head.appendChild(script)
    }
  }
  return <details className="relative text-sm"><summary className="cursor-pointer rounded-lg bg-white/10 px-2 py-2">🌐 Language</summary><div className="absolute right-0 z-50 mt-2 w-64 rounded-xl bg-white p-4 text-brown-900 shadow-xl"><p className="mb-2">English · മലയാളം · हिन्दी · தமிழ் · తెలుగు · ಕನ್ನಡ</p><p className="mb-3 text-xs">Optional Google machine translation loads a third-party service. Verify important details in English.</p><div id="ta-google-translate"/>{(!enabled || error) && <button className="btn-p" onClick={enable}>Enable translation</button>}{enabled && !error && <p className="mt-2 text-xs">Choose a language above once Google loads.</p>}{error && <p role="alert" className="text-xs text-red-700">{error}</p>}</div></details>
}
