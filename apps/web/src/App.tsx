import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Server, 
  Database, 
  Lock, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  Moon,
  Sun,
  HardHat,
  Cpu,
  LogIn,
  LogOut,
  MapPin,
  Mail,
  KeyRound,
  Plus,
  AlertCircle,
  ChevronRight,
  Shield
} from 'lucide-react';
import { PlatformModule, UserRole } from '@isg/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// ==========================================
// TİP TANIMLARI
// ==========================================
interface Facility {
  id: string;
  name: string;
  city: string;
  dangerClass: 'Az Tehlikeli' | 'Tehlikeli' | 'Çok Tehlikeli';
  activeModules: PlatformModule[];
  adminEmail: string;
}

interface TenantGroup {
  id: string;
  name: string;
  taxNumber: string;
  contactEmail: string;
  groupAdminEmail: string;
  facilities: Facility[];
  createdAt: string;
}

interface MockUser {
  email: string;
  name: string;
  role: UserRole;
  groupId?: string;
  facilityId?: string;
}

const INITIAL_GROUPS: TenantGroup[] = [
  {
    id: 'grp-1',
    name: 'A Grup A.Ş.',
    taxNumber: '1234567890',
    contactEmail: 'iletisim@agrup.com.tr',
    groupAdminEmail: 'holding.admin@agrup.com.tr',
    createdAt: '18 Ekim 2026',
    facilities: [
      {
        id: 'fac-101',
        name: 'A Tesisi - Merkez Sağlık Kampüsü',
        city: 'İstanbul',
        dangerClass: 'Çok Tehlikeli',
        activeModules: [PlatformModule.OPERATIONS, PlatformModule.SAFETY],
        adminEmail: 'tesis.yonetici@agrup.com.tr'
      },
      {
        id: 'fac-102',
        name: 'A Tesisi - Lojistik & Antrepo',
        city: 'Kocaeli',
        dangerClass: 'Tehlikeli',
        activeModules: [PlatformModule.OPERATIONS],
        adminEmail: 'lojistik.amir@agrup.com.tr'
      }
    ]
  }
];

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [groups, setGroups] = useState<TenantGroup[]>(INITIAL_GROUPS);
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null);
  
  // Login Formu
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Modallar
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);
  const [isNewFacilityModalOpen, setIsNewFacilityModalOpen] = useState(false);
  const [targetGroupIdForFacility, setTargetGroupIdForFacility] = useState<string>('');

  // Yeni Grup
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupAdminEmail, setNewGroupAdminEmail] = useState('');
  const [newGroupTaxNumber, setNewGroupTaxNumber] = useState('');

  // Yeni Tesis
  const [newFacilityName, setNewFacilityName] = useState('');
  const [newFacilityCity, setNewFacilityCity] = useState('İstanbul');
  const [newFacilityDangerClass, setNewFacilityDangerClass] = useState<'Az Tehlikeli' | 'Tehlikeli' | 'Çok Tehlikeli'>('Tehlikeli');
  const [newFacilityAdminEmail, setNewFacilityAdminEmail] = useState('');

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const emailClean = loginEmail.trim().toLowerCase();

    if (emailClean === 'superadmin@medicalisg.com' || emailClean === 'admin@medicalisg.com') {
      setCurrentUser({
        email: emailClean,
        name: 'Platform Sahibi (Super Admin)',
        role: UserRole.SUPER_ADMIN,
      });
      return;
    }

    const matchedGroup = groups.find(g => g.groupAdminEmail.toLowerCase() === emailClean);
    if (matchedGroup) {
      setCurrentUser({
        email: emailClean,
        name: `${matchedGroup.name} Yöneticisi`,
        role: UserRole.GROUP_ADMIN,
        groupId: matchedGroup.id,
      });
      return;
    }

    for (const grp of groups) {
      const matchedFacility = grp.facilities.find(f => f.adminEmail.toLowerCase() === emailClean);
      if (matchedFacility) {
        setCurrentUser({
          email: emailClean,
          name: `${matchedFacility.name} Müdürü`,
          role: UserRole.FACILITY_ADMIN,
          groupId: grp.id,
          facilityId: matchedFacility.id,
        });
        return;
      }
    }

    setLoginError('Kullanıcı hesabı bulunamadı. Lütfen aşağıdaki hazır test hesaplarından birini deneyin.');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
  };

  const fillCredentials = (email: string) => {
    setLoginEmail(email);
    setLoginPassword('Secret123!');
    setLoginError('');
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName || !newGroupAdminEmail) return;

    const newGroup: TenantGroup = {
      id: `grp-${Date.now()}`,
      name: newGroupName,
      taxNumber: newGroupTaxNumber || '1000000000',
      contactEmail: newGroupAdminEmail,
      groupAdminEmail: newGroupAdminEmail,
      createdAt: 'Şimdi',
      facilities: [],
    };

    setGroups([...groups, newGroup]);
    setNewGroupName('');
    setNewGroupAdminEmail('');
    setNewGroupTaxNumber('');
    setIsNewGroupModalOpen(false);
  };

  const handleCreateFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFacilityName || !targetGroupIdForFacility) return;

    const newFac: Facility = {
      id: `fac-${Date.now()}`,
      name: newFacilityName,
      city: newFacilityCity,
      dangerClass: newFacilityDangerClass,
      activeModules: [PlatformModule.OPERATIONS, PlatformModule.SAFETY],
      adminEmail: newFacilityAdminEmail || `yonetici@${newFacilityName.toLowerCase().replace(/\s+/g, '')}.com`,
    };

    setGroups(groups.map(grp => {
      if (grp.id === targetGroupIdForFacility) {
        return { ...grp, facilities: [...grp.facilities, newFac] };
      }
      return grp;
    }));

    setNewFacilityName('');
    setNewFacilityAdminEmail('');
    setIsNewFacilityModalOpen(false);
  };

  const userGroup = currentUser?.groupId ? groups.find(g => g.id === currentUser.groupId) : null;
  const userFacility = userGroup && currentUser?.facilityId ? userGroup.facilities.find(f => f.id === currentUser.facilityId) : null;

  return (
    <div className="min-h-screen bg-background text-foreground dot-grid-pattern relative flex flex-col justify-between transition-colors duration-200">
      {/* Background Subtle Radial Gradient Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(15,118,110,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(20,184,166,0.10),transparent_70%)]" />

      {/* ========================================================
          1. HEADER (Design-System.md §4.1)
          ======================================================== */}
      <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={theme === 'dark' ? '/logos/svg/medical-isg-horizontal-dark.svg' : '/logos/svg/medical-isg-horizontal-light.svg'} 
              alt="Medical ISG" 
              className="h-8 w-auto object-contain"
            />
            <div className="hidden sm:block h-4 w-px bg-border" />
            <span className="hidden sm:inline-block text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              İŞ SAĞLIĞI VE GÜVENLİĞİ
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-teal-200/60 bg-teal-50/70 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>0. Katman Platform Çekirdeği</span>
            </div>

            <span className="hidden md:inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-muted text-muted-foreground border border-border">
              v4.2-enterprise
            </span>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 text-foreground border-border hover:bg-muted rounded-lg"
              title="Açık/Koyu Tema"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
            </Button>

            {currentUser && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleLogout}
                className="gap-1.5 text-xs font-semibold rounded-lg"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Çıkış</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================
          2. ANA GÖVDE
          ======================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full relative z-10">
        {!currentUser ? (
          /* ========================================================
             GİRİŞ EKRANI (Design-System.md §4.1 Split Hero Layout)
             ======================================================== */
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Sol Kolon (Brand & System Trust) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                  Tesislerinizi ve Güvenliğinizi Tek Merkezden Yönetin.
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                  Medical İSG; çok kiracılı (tenant-per-DB), yüksek güvenlikli (2FA, RBAC) ve modüler mimariye sahip kurumsal İSG ve tesis yönetim platformudur.
                </p>
              </div>

              {/* Alt Mimari Özellikleri: 3 Sütunlu Kompakt Teknik Kartlar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="flex items-start gap-3 p-4 rounded-xl border border-border/70 bg-card/70 backdrop-blur-xs shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)] hover:border-teal-600/40 transition-colors">
                  <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-[#0f766e] dark:text-teal-400 shrink-0">
                    <Database className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-foreground">Tenant-per-DB</h3>
                    <p className="text-[11px] text-muted-foreground leading-snug">Kiracı başına tam izole veritabanı</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl border border-border/70 bg-card/70 backdrop-blur-xs shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)] hover:border-amber-600/40 transition-colors">
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-foreground">2FA & RBAC</h3>
                    <p className="text-[11px] text-muted-foreground leading-snug">TOTP ve sıkı rol bazlı yetkilendirme</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl border border-border/70 bg-card/70 backdrop-blur-xs shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)] hover:border-blue-600/40 transition-colors">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shrink-0">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-foreground">Docker Stack</h3>
                    <p className="text-[11px] text-muted-foreground leading-snug">Nginx, Redis, MinIO ve DB tek komutta</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Kolon (Authentication Card) */}
            <div className="lg:col-span-5">
              <div className="bg-card border border-border/80 rounded-xl shadow-[0_4px_25px_-4px_rgba(0,0,0,0.07)] backdrop-blur-sm overflow-hidden">
                <div className="p-6 sm:p-7 space-y-5">
                  <div className="flex items-center justify-between pb-1 border-b border-border/40">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold tracking-tight text-foreground">
                        Kurumsal Giriş
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        E-posta ve şifrenizle giriş yapın; sistem rolünüzü ve bağlı olduğunuz tesisi otomatik tanır.
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950 text-[#0f766e] dark:text-teal-400 shrink-0">
                      <Shield className="h-5 w-5" />
                    </div>
                  </div>

                  {loginError && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2.5 text-xs text-destructive font-medium">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5" /> E-Posta Adresi
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        placeholder="superadmin@medicalisg.com"
                        className="h-10 px-3.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]/20 focus-visible:border-[#0f766e]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <KeyRound className="h-3.5 w-3.5" /> Şifre
                        </Label>
                        <a href="#forgot" className="text-[11px] text-[#0f766e] hover:underline font-medium">
                          Şifremi Unuttum?
                        </a>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        placeholder="••••••••••••"
                        className="h-10 px-3.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e]/20 focus-visible:border-[#0f766e]"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-[#0f766e] hover:bg-[#115e59] text-white font-medium shadow-sm transition-all h-10 px-4 rounded-lg flex items-center justify-center gap-2 text-sm"
                    >
                      <LogIn className="h-4 w-4" />
                      Sisteme Giriş Yap
                    </Button>
                  </form>
                </div>

                <div className="p-5 bg-slate-50/70 dark:bg-slate-900/40 border-t border-border space-y-2.5">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    HIZLI TEST HESAPLARI (TEK TIKLA DOLDUR):
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <div
                      onClick={() => fillCredentials('superadmin@medicalisg.com')}
                      className="flex items-center justify-between p-3.5 border border-border/80 rounded-lg hover:border-teal-600/40 hover:bg-teal-50/30 transition-colors cursor-pointer group bg-background"
                    >
                      <span className="text-xs text-foreground">
                        👑 <b>Super Admin:</b> <span className="text-muted-foreground font-mono text-[11px]">superadmin@medicalisg.com</span>
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-[#0f766e]" />
                    </div>
                    <div
                      onClick={() => fillCredentials('holding.admin@agrup.com.tr')}
                      className="flex items-center justify-between p-3.5 border border-border/80 rounded-lg hover:border-teal-600/40 hover:bg-teal-50/30 transition-colors cursor-pointer group bg-background"
                    >
                      <span className="text-xs text-foreground">
                        🏢 <b>Holding Yöneticisi:</b> <span className="text-muted-foreground font-mono text-[11px]">holding.admin@agrup.com.tr</span>
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-[#0f766e]" />
                    </div>
                    <div
                      onClick={() => fillCredentials('tesis.yonetici@agrup.com.tr')}
                      className="flex items-center justify-between p-3.5 border border-border/80 rounded-lg hover:border-teal-600/40 hover:bg-teal-50/30 transition-colors cursor-pointer group bg-background"
                    >
                      <span className="text-xs text-foreground">
                        🏥 <b>Tesis Yöneticisi:</b> <span className="text-muted-foreground font-mono text-[11px]">tesis.yonetici@agrup.com.tr</span>
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-[#0f766e]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : currentUser.role === UserRole.SUPER_ADMIN ? (
          /* ========================================================
             SUPER ADMIN KONSOLU
             ======================================================== */
          <div className="space-y-8">
            <div className="bg-card border border-border/80 rounded-xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-teal-200/60 bg-teal-50/70 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#0f766e]" />
                  Platform Sahibi (Super Admin)
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  Kiracı & Tesis Onboarding Konsolu
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Sistemde henüz tesis bulunmadığında veya yeni bir holding katıldığında, grupları ve tesisleri buradan tanımlayabilirsiniz.
                </p>
              </div>

              <Button 
                onClick={() => setIsNewGroupModalOpen(true)}
                className="bg-[#0f766e] hover:bg-[#115e59] text-white font-medium shadow-sm h-10 px-4 rounded-lg flex items-center gap-2 text-xs shrink-0"
              >
                <Plus className="h-4 w-4" />
                Yeni Grup (Holding) Ekle
              </Button>
            </div>

            {/* Kayıtlı Gruplar */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-foreground">
                  Kayıtlı Kiracı Grupları ({groups.length})
                </h3>
                <p className="text-xs text-muted-foreground">
                  Her grup altında bağımsız tesisler ve izole veritabanları yer alır.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {groups.map((group) => (
                  <div key={group.id} className="bg-card border border-border/80 rounded-xl shadow-sm p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
                      <div className="flex items-center gap-3.5">
                        <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950 text-[#0f766e] dark:text-teal-400">
                          <Building2 className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-foreground">{group.name}</h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                              {group.id}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Grup Yöneticisi: <span className="font-semibold text-foreground">{group.groupAdminEmail}</span> • Vergi No: {group.taxNumber}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setTargetGroupIdForFacility(group.id);
                          setIsNewFacilityModalOpen(true);
                        }}
                        className="gap-1.5 text-xs font-semibold text-[#0f766e] border-teal-200 hover:bg-teal-50 dark:border-teal-800 dark:hover:bg-teal-950"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Bu Gruba Tesis Ekle
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                        Bağlı Tesisler ({group.facilities.length}):
                      </span>

                      {group.facilities.length === 0 ? (
                        <p className="text-xs text-muted-foreground italic py-2">
                          Bu gruba ait henüz bir tesis eklenmedi. "Bu Gruba Tesis Ekle" butonuyla yeni tesis açabilirsiniz.
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {group.facilities.map((fac) => (
                            <div 
                              key={fac.id} 
                              className="p-4 rounded-xl border border-border/80 bg-background/60 shadow-2xs hover:border-[#0f766e]/40 transition-colors space-y-3"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <h5 className="text-xs font-bold text-foreground line-clamp-1">{fac.name}</h5>
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                  fac.dangerClass === 'Çok Tehlikeli' 
                                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800' 
                                    : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                                }`}>
                                  {fac.dangerClass}
                                </span>
                              </div>

                              <div className="space-y-1.5 text-[11px] text-muted-foreground">
                                <div className="flex items-center gap-1.5 text-foreground font-medium">
                                  <MapPin className="h-3 w-3 text-muted-foreground" /> {fac.city}
                                </div>
                                <div className="flex items-center gap-1.5 font-mono text-[10px]">
                                  <Database className="h-3 w-3 text-[#0f766e]" /> isg_tenant_{fac.id}
                                </div>
                                <div className="flex items-center gap-1.5 truncate">
                                  <Mail className="h-3 w-3" /> {fac.adminEmail}
                                </div>
                              </div>

                              <div className="pt-2.5 border-t border-border flex items-center justify-between text-[11px]">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                                  2 Modül Aktif
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setCurrentUser({
                                      email: fac.adminEmail,
                                      name: `${fac.name} Yöneticisi`,
                                      role: UserRole.FACILITY_ADMIN,
                                      groupId: group.id,
                                      facilityId: fac.id,
                                    });
                                  }}
                                  className="h-7 text-xs font-bold text-[#0f766e] gap-1 px-2 hover:bg-teal-50 dark:hover:bg-teal-950"
                                >
                                  Tesise Geç <ArrowRight className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================
             TESİS VEYA HOLDİNG KULLANICI PANELİ
             ======================================================== */
          <div className="space-y-8">
            <div className="bg-card border border-border/80 rounded-xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-emerald-200 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Tesis Veritabanı Aktif (:5432)
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-muted text-muted-foreground border border-border">
                  Rol: {currentUser.role}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  {userFacility ? userFacility.name : userGroup?.name}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 flex flex-wrap items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Bağlı Grup: <span className="font-semibold text-foreground">{userGroup?.name}</span>
                  {userFacility && (
                    <>
                      <span>•</span>
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium text-foreground">{userFacility.city} ({userFacility.dangerClass})</span>
                    </>
                  )}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2.5">
                <span className="px-3 py-1.5 rounded-lg text-xs font-mono bg-muted text-foreground border border-border flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5 text-[#0f766e]" />
                  DB: isg_tenant_{userFacility ? userFacility.id : 'holding'}
                </span>
                <span className="px-3 py-1.5 rounded-lg text-xs font-mono bg-muted text-foreground border border-border flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-amber-600" />
                  Kullanıcı: {currentUser.email}
                </span>
                <span className="px-3 py-1.5 rounded-lg text-xs font-mono bg-muted text-foreground border border-border flex items-center gap-1.5">
                  <Server className="h-3.5 w-3.5 text-blue-600" />
                  Docker Nginx Port :80
                </span>
              </div>
            </div>

            {/* Modüller */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-foreground">
                  Tesis Yönetim Modülleri
                </h3>
                <p className="text-xs text-muted-foreground">
                  İzole veri tabanı üzerinde çalışan bağımsız iş modülleri
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { name: 'Operasyon Yönetimi', key: PlatformModule.OPERATIONS, icon: Activity, desc: 'Arıza, bakım, vardiya ve saha görevleri', active: true },
                  { name: 'İş Güvenliği (İSG)', key: PlatformModule.SAFETY, icon: HardHat, desc: 'Kaza/ramak kala, risk analizi, KKD takibi', active: true },
                  { name: 'İş Sağlığı', key: PlatformModule.HEALTH, icon: ShieldCheck, desc: 'Periyodik muayene, aşı ve sağlık arşivleri', active: false },
                  { name: 'Varlık Envanteri', key: PlatformModule.ASSETS, icon: Layers, desc: 'Ekipmanlar, kalibrasyon, periyodik kontroller', active: false },
                  { name: 'Taşeron Yönetimi', key: PlatformModule.CONTRACTOR, icon: Building2, desc: 'Taşeron evrakları ve saha giriş izinleri', active: false },
                  { name: 'Atık Yönetimi', key: PlatformModule.WASTE, icon: Server, desc: 'Tehlikeli/tehlikesiz atık beyanları', active: false },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <div 
                      key={m.key} 
                      className={`p-5 rounded-xl border bg-card shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)] transition-all ${
                        m.active 
                          ? 'border-border hover:border-[#0f766e]/40' 
                          : 'border-border/60 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className={`p-2.5 rounded-lg ${m.active ? 'bg-teal-50 dark:bg-teal-950 text-[#0f766e] dark:text-teal-400' : 'bg-muted text-muted-foreground'}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          m.active 
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {m.active ? 'Lisanslı' : 'Hazırlıkta'}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-foreground mt-3">{m.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{m.desc}</p>
                      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-muted-foreground">
                        <span className="text-[11px] font-mono">@isg/{m.key.toLowerCase()}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-[#0f766e]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Modallar */}
        <Dialog open={isNewGroupModalOpen} onOpenChange={setIsNewGroupModalOpen}>
          <DialogContent className="sm:max-w-md bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                <Building2 className="h-5 w-5 text-[#0f766e]" /> Yeni Grup (Holding) Ekle
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Holding veya ana grup şirketini ve yetkili e-posta adresini girin.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateGroup} className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="grpName" className="text-xs font-semibold text-foreground">Grup / Şirket Adı</Label>
                <Input
                  id="grpName"
                  required
                  placeholder="Örn: C Grup Holding A.Ş."
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="h-10 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="grpEmail" className="text-xs font-semibold text-foreground">Grup Yöneticisi E-Posta</Label>
                <Input
                  id="grpEmail"
                  type="email"
                  required
                  placeholder="yonetici@cgrup.com.tr"
                  value={newGroupAdminEmail}
                  onChange={(e) => setNewGroupAdminEmail(e.target.value)}
                  className="h-10 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="grpTax" className="text-xs font-semibold text-foreground">Vergi Numarası</Label>
                <Input
                  id="grpTax"
                  placeholder="1234567890"
                  value={newGroupTaxNumber}
                  onChange={(e) => setNewGroupTaxNumber(e.target.value)}
                  className="h-10 text-xs"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsNewGroupModalOpen(false)}>
                  İptal
                </Button>
                <Button type="submit" size="sm" className="bg-[#0f766e] hover:bg-[#115e59] text-white font-bold">
                  Grubu Kaydet
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isNewFacilityModalOpen} onOpenChange={setIsNewFacilityModalOpen}>
          <DialogContent className="sm:max-w-md bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                <MapPin className="h-5 w-5 text-[#0f766e]" /> Yeni Tesis Tanımla
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Tesis adı, şehir ve tehlike sınıfını seçin; izole veritabanı otomatik oluşturulacaktır.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateFacility} className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="facName" className="text-xs font-semibold text-foreground">Tesis Adı</Label>
                <Input
                  id="facName"
                  required
                  placeholder="Örn: C Tesisi - Fabrika Kampüsü"
                  value={newFacilityName}
                  onChange={(e) => setNewFacilityName(e.target.value)}
                  className="h-10 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="facCity" className="text-xs font-semibold text-foreground">Şehir</Label>
                  <Input
                    id="facCity"
                    required
                    value={newFacilityCity}
                    onChange={(e) => setNewFacilityCity(e.target.value)}
                    className="h-10 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="facDanger" className="text-xs font-semibold text-foreground">Tehlike Sınıfı</Label>
                  <select
                    id="facDanger"
                    value={newFacilityDangerClass}
                    onChange={(e) => setNewFacilityDangerClass(e.target.value as any)}
                    className="w-full text-xs h-10 rounded-lg border border-input bg-background px-3 text-foreground"
                  >
                    <option value="Az Tehlikeli">Az Tehlikeli</option>
                    <option value="Tehlikeli">Tehlikeli</option>
                    <option value="Çok Tehlikeli">Çok Tehlikeli</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="facEmail" className="text-xs font-semibold text-foreground">Tesis Yöneticisi E-Posta</Label>
                <Input
                  id="facEmail"
                  type="email"
                  required
                  placeholder="tesis.mudur@sirket.com"
                  value={newFacilityAdminEmail}
                  onChange={(e) => setNewFacilityAdminEmail(e.target.value)}
                  className="h-10 text-xs"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsNewFacilityModalOpen(false)}>
                  İptal
                </Button>
                <Button type="submit" size="sm" className="bg-[#0f766e] hover:bg-[#115e59] text-white font-bold">
                  Tesisi Oluştur ve DB Bağla
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>

      {/* ========================================================
          3. FOOTER (Design-System.md §4.1)
          ======================================================== */}
      <footer className="border-t border-border/80 bg-background/90 backdrop-blur-md py-6 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 Medical İSG Yazılım Çözümleri A.Ş. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4">
            <a href="#kvkk" className="hover:text-foreground transition-colors">KVKK ve Gizlilik</a>
            <span>•</span>
            <a href="#sla" className="hover:text-foreground transition-colors">Hizmet Düzeyi (SLA)</a>
            <span>•</span>
            <a href="#support" className="hover:text-foreground transition-colors">Kurumsal Destek</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
