export function generateOtp() {
  return Math.floor(10000 + Math.random() * 90000); // 5 chữ số, từ 10000 → 99999
}