import zxcvbn from "zxcvbn";

/**
 * ตรวจสอบว่ารหัสผ่านผ่านเกณฑ์ความซับซ้อนขั้นต่ำหรือไม่
 *
 * เกณฑ์ที่ต้องผ่านทั้งหมด:
 * - ความยาวอย่างน้อย 12 ตัวอักษร
 * - มีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว (A–Z)
 * - มีตัวพิมพ์เล็กอย่างน้อย 1 ตัว (a–z)
 * - มีตัวเลขอย่างน้อย 1 ตัว (0–9)
 * - มีอักขระพิเศษอย่างน้อย 1 ตัว เช่น !@#$%
 * - คะแนนความแข็งแรงจาก zxcvbn ≥ 3 (safely unguessable)
 *
 * @param password - รหัสผ่านที่ต้องการตรวจสอบ
 * @returns `true` หากผ่านทุกเกณฑ์, `false` หากไม่ผ่านเกณฑ์ใดเกณฑ์หนึ่ง
 *
 * @example
 * isPasswordComplexityValid("Abcdef123!@#")  // true
 * isPasswordComplexityValid("password123")   // false — ไม่มีตัวพิมพ์ใหญ่และอักขระพิเศษ
 */
const MIN_PASSWORD_STRENGTH_SCORE = 3;

const isPasswordComplexityValid = (password: string): boolean => {
    const meetsBasicRules =
        password.length >= 12 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password);

    if (!meetsBasicRules) {
        return false;
    }

    return isPasswordNotCommon(password);
};

/**
 * ตรวจสอบว่ารหัสผ่านไม่ใช่รหัสที่พบบ่อย (common password)
 *
 * ใช้คะแนนความแข็งแรงจาก zxcvbn ≥ 3 (safely unguessable)
 * เพื่อกรองรหัสที่อยู่ใน dictionary / pattern ที่เดาได้ง่าย
 *
 * @param password - รหัสผ่านที่ต้องการตรวจสอบ
 * @returns `true` หากไม่ใช่รหัสที่พบบ่อย
 */
const isPasswordNotCommon = (password: string): boolean => {
    if (!password) return false;
    return zxcvbn(password).score >= MIN_PASSWORD_STRENGTH_SCORE;
};

export { isPasswordComplexityValid, isPasswordNotCommon, MIN_PASSWORD_STRENGTH_SCORE };
