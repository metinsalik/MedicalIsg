import { z } from "zod";

// ==========================================
// 1. ROLES & PERMISSIONS (RBAC & ABAC)
// ==========================================
export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",       // Platform Sahibi
  GROUP_ADMIN = "GROUP_ADMIN",       // Holding / Grup Yöneticisi (Örn: A Grup A.Ş.)
  FACILITY_ADMIN = "FACILITY_ADMIN", // Tesis Müdürü / Yöneticisi
  SAFETY_SPECIALIST = "SAFETY_SPECIALIST", // İSG Uzmanı (A/B/C Sınıfı)
  OCCUPATIONAL_PHYSICIAN = "OCCUPATIONAL_PHYSICIAN", // İşyeri Hekimi
  MAINTENANCE_SUPERVISOR = "MAINTENANCE_SUPERVISOR", // Bakım / Varlık Sorumlusu
  CONTRACTOR_REPRESENTATIVE = "CONTRACTOR_REPRESENTATIVE", // Taşeron Firma Yetkilisi
  FIELD_WORKER = "FIELD_WORKER",     // Saha Çalışanı / Operatör
  AUDITOR = "AUDITOR",               // İç / Dış Denetçi
}

export const UserRoleSchema = z.nativeEnum(UserRole);

// ==========================================
// 2. ACTIVE MODULES (LICENSING)
// ==========================================
export enum PlatformModule {
  OPERATIONS = "OPERATIONS",   // Operasyon Yönetimi (Arıza, Vardiya, Görevler)
  SAFETY = "SAFETY",           // İş Güvenliği (Kaza, Ramak Kala, Risk Analizi)
  HEALTH = "HEALTH",           // İş Sağlığı (Periyodik Muayene, İşe Giriş)
  ASSETS = "ASSETS",           // Varlık & Ekipman Envanteri, Periyodik Kontrol
  CONTRACTOR = "CONTRACTOR",   // Taşeron Firma & Taşeron Personel Yönetimi
  WASTE = "WASTE",             // Atık Yönetimi & Çevre Mevzuatı
}

export const PlatformModuleSchema = z.nativeEnum(PlatformModule);

// ==========================================
// 3. TENANT & FACILITY SCHEMAS
// ==========================================
export const CreateTenantGroupSchema = z.object({
  name: z.string().min(2, "Grup adı en az 2 karakter olmalıdır"),
  taxNumber: z.string().optional(),
  contactEmail: z.string().email("Geçerli bir e-posta giriniz"),
  contactPhone: z.string().optional(),
});
export type CreateTenantGroupDto = z.infer<typeof CreateTenantGroupSchema>;

export const CreateFacilitySchema = z.object({
  groupId: z.string().uuid(),
  name: z.string().min(2, "Tesis adı en az 2 karakter olmalıdır"),
  city: z.string().min(2),
  address: z.string().optional(),
  dangerClass: z.enum(["LESS_DANGEROUS", "DANGEROUS", "VERY_DANGEROUS"]),
  enabledModules: z.array(PlatformModuleSchema).min(1, "En az bir modül seçilmelidir"),
});
export type CreateFacilityDto = z.infer<typeof CreateFacilitySchema>;

// ==========================================
// 4. AUTH & 2FA SCHEMAS
// ==========================================
export const LoginRequestSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
});
export type LoginRequestDto = z.infer<typeof LoginRequestSchema>;

export const VerifyTotpSchema = z.object({
  tempToken: z.string(),
  totpCode: z.string().length(6, "6 haneli doğrulama kodunu giriniz"),
});
export type VerifyTotpDto = z.infer<typeof VerifyTotpSchema>;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserSessionPayload {
  userId: string;
  email: string;
  role: UserRole;
  groupId?: string;
  facilityId?: string;
  is2FAVerified: boolean;
}

// ==========================================
// 5. STANDARD API RESPONSE WRAPPER
// ==========================================
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errorCode?: string;
  requestId?: string;
  timestamp: string;
}
