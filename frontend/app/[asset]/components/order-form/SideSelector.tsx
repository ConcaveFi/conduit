'use client'

import { cx } from '@tradex/interface'
import { useTranslation } from '@tradex/languages'

import { atom, useAtom } from 'jotai'

export const sideAtom = atom<'long' | 'short'>('long')

export function SideSelector() {
  const { t } = useTranslation()
  const [side, setSide] = useAtom(sideAtom)
  return (
    <div className="flex gap-4 font-mono">
      <button
        aria-pressed={side === 'long'}
        onClick={() => setSide('long')}
        className={cx(
          `btn centered flex-1 rounded-lg py-2 text-white  `,
          'aria-pressed:bg-dark-green-gradient ocean:aria-pressed:bg-blue-green-gradient aria-pressed:border-transparent',
          'text-teal-400 ring-1 ring-inset ring-teal-400',
        )}
      >
        {t('long')}
      </button>
      <button
        aria-pressed={side === 'short'}
        onClick={() => setSide('short')}
        className={cx(
          `btn centered flex-1 rounded-lg py-2 text-white `,
          'aria-pressed:bg-dark-red-gradient ocean:aria-pressed:bg-blue-red-gradient aria-pressed:border-transparent',
          'text-red-400 ring-1 ring-inset ring-red-400',
        )}
      >
        {t('short')}
      </button>
    </div>
  )
}
