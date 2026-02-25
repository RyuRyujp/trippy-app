export const appConfig = {
  name: "Trippy",
  logoText: "Trippy",
  logoSrc: "", // 例: "/logo.svg"
  // アプリアイコン（ヘッダー左の小さいアイコン）
  appIconSrc: "/logo-header.png", // public/app-icon.png を置く
  nav: {
    home: { href: "/", label: "HOME" },
    trips: { href: "/trips", label: "TRIPS" },
    calendar: { href: "/calendar", label: "CALENDAR" },
    setting: { href: "/setting", label: "SETTING" },
  },
  defaultLocale: "ja",
  auth: {
    otpLength: 6,
    resendCooldownSec: 60,
  },
} as const;