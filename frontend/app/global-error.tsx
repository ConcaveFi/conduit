'use client'

// TODO: make cool error page
export default function Error() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <span className="fonts-mono text-white">Something went wrong</span>
      <span className="fonts-mono text-white">try reloading the page</span>
    </div>
  )
}
