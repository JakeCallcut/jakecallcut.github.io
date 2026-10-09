import { useEffect, useState } from 'react';

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/London',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short',
});

// Live clock for Edinburgh, so visitors know whether it's a sensible hour to reach out.
export default function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <time className={className} dateTime={now.toISOString()}>
      {formatter.format(now)}
    </time>
  );
}
