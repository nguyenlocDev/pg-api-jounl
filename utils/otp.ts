export const getOtpValidation = () => {
  const otp = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return otp;
};
const otpStore = new Map<string, { otp: string; expiresAt: number }>();
export function saveOtp(email: string, otp: string, ttlSeconds: number = 300) {
  const expiresAt = Date.now() + ttlSeconds * 1000;
  otpStore.set(email, { otp, expiresAt });
}

export function verifyOtp(email: string, otp: string) {
  const record = otpStore.get(email);
  if (!record) return false; // không tồn tại
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email); // hết hạn => xóa
    return false;
  }
  if (record.otp !== otp) return false; // sai OTP
  return true;
}

export const deleteOtp = (email: string) => {
  otpStore.delete(email);
};
