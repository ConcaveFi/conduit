import { useEffect, useState } from 'react'

export const DEFAULT_SCRIPT_TYPE = 'text/javascript'
export interface ScriptLoader {
  src?: string
  type?: string
  onLoad?(): void
  enabled?: boolean
}

export function useScriptLoader(props: ScriptLoader) {
  const { onLoad = () => {}, src, type = DEFAULT_SCRIPT_TYPE, enabled = false } = props
  const [loaded, setLoaded] = useState(false)
  const onload = () => (setLoaded(true), onLoad?.())

  function loadScript() {
    if (!enabled || !src || !type) return
    if (hasScript(src)) {
      setLoaded(true)
      return
    }
    console.log('passou aqui também')
    createScript({ src, type, onload })
  }

  useEffect(loadScript, [enabled])
  return { loaded }
}

function hasScript(src: string) {
  const scripts = document.getElementsByTagName('script')
  for (let script of scripts) if (script.src === src) return true
  return false
}

function createScript(props: Object) {
  const script = document.createElement('script')
  Object.assign(script, props)
  document.head.appendChild(script)
}
