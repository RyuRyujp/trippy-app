export const appConfig = {
  name: "Trippy",
  defaultLocale: "ja",
  auth: {
    otpLength: 6,
    resendCooldownSec: 60,
  },
} as const;