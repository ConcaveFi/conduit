import { useEffect, useState } from 'react'

export function useScriptLoader(src: string, type: string, onLoad = () => {}) {
  const [loaded, setLoaded] = useState(false)
  const onload = () => (setLoaded(true), onLoad && onLoad())
  useEffect(() => {
    if (hasScript(src) || !src || !type) return
    const script = document.createElement('script')
    Object.assign(script, { src, type, onload })
    document.head.appendChild(script)
  }, [])
  return { loaded }
}

function hasScript(src: string) {
  const scripts = document.getElementsByTagName('script')
  for (let script of scripts) {
    if (script.src === src) return true
  }
  return false
}
