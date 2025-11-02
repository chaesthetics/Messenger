import Echo from "laravel-echo";
import Pusher from "pusher-js";

let echo: Echo<any> | null = null;

export const initEcho = () => {
  if (echo) return echo;

  // Pusher must be set globally for Reverb to work
  // @ts-ignore
  window.Pusher = Pusher;

  echo = new Echo({
    broadcaster: "reverb",
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
    wsPort: Number(process.env.NEXT_PUBLIC_REVERB_WS_PORT),
    wssPort: Number(process.env.NEXT_PUBLIC_REVERB_WSS_PORT),
    forceTLS: false,
    enabledTransports: ["ws", "wss"],
  });

  return echo;
};

export const getEcho = () => echo;
