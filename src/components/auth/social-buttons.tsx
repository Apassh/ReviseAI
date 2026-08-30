import { Button } from '@/components/ui/button'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.11A11.99 11.99 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.61H1.26A11.99 11.99 0 0 0 0 12c0 1.94.46 3.77 1.26 5.39l4.01-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.26 6.61l4.01 3.11C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
      <path d="M16.36 1.5c.1 1.1-.32 2.17-.98 2.96-.68.8-1.79 1.42-2.87 1.34-.13-1.08.4-2.2 1.03-2.92.71-.83 1.94-1.45 2.82-1.38ZM20.3 17.02c-.35.82-.77 1.6-1.28 2.32-.7.99-1.27 1.68-1.72 2.06-.7.65-1.44.98-2.24 1-.57.01-1.26-.16-2.06-.5-.8-.34-1.53-.5-2.2-.5-.7 0-1.45.16-2.26.5-.81.35-1.46.53-1.97.55-.76.03-1.52-.31-2.28-1.02-.48-.44-1.08-1.16-1.8-2.17-.77-1.08-1.4-2.34-1.9-3.77-.53-1.54-.8-3.03-.8-4.47 0-1.65.36-3.07 1.07-4.26.56-.95 1.31-1.7 2.24-2.25a5.9 5.9 0 0 1 3.03-.9c.63 0 1.46.2 2.5.6 1.02.4 1.68.6 1.96.6.21 0 .93-.23 2.15-.7 1.16-.44 2.13-.62 2.92-.55 2.16.17 3.78 1.03 4.87 2.57-1.93 1.17-2.89 2.81-2.87 4.91.02 1.65.6 3.02 1.75 4.11.52.5 1.1.88 1.75 1.15-.14.4-.29.79-.46 1.17Z" />
    </svg>
  )
}

interface SocialButtonsProps {
  onGoogle?: () => void
  onApple?: () => void
}

export function SocialButtons({ onGoogle, onApple }: SocialButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button type="button" variant="outline" onClick={onGoogle}>
        <GoogleIcon /> Google
      </Button>
      <Button type="button" variant="outline" onClick={onApple}>
        <AppleIcon /> Apple
      </Button>
    </div>
  )
}
