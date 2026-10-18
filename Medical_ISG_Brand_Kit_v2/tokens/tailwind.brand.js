/** Medical ISG — Tailwind CSS 3 marka preset'i (v2.0.0)
 * Kullanım (tailwind.config.js):
 *   module.exports = { presets: [require('./tokens/tailwind.brand.js')], content: ['./index.html','./src/**' + '/*.{ts,tsx}'] }
 * Semantik renkler (bg-surface, text-muted, border-default ...) brand-tokens.css'teki CSS değişkenlerine bağlıdır;
 * koyu tema için <html data-theme="dark"> veya class="dark" kullanın.
 */
const scales = {
  "primary": {
    "50": "#EEFBF9",
    "100": "#D3F4EF",
    "200": "#A9E8E0",
    "300": "#72D5CB",
    "400": "#3DBAB0",
    "500": "#179E95",
    "600": "#0D7F79",
    "700": "#0E6662",
    "800": "#10514F",
    "900": "#0F4342",
    "950": "#042827"
  },
  "secondary": {
    "50": "#F0F5FB",
    "100": "#DDE7F4",
    "200": "#C1D3EB",
    "300": "#97B6DD",
    "400": "#6691CB",
    "500": "#4472B8",
    "600": "#34599B",
    "700": "#2C477E",
    "800": "#263C68",
    "900": "#172A4A",
    "950": "#0D1A30"
  },
  "accent": {
    "50": "#FFF5ED",
    "100": "#FFE8D4",
    "200": "#FFCDA8",
    "300": "#FFA970",
    "400": "#FF7B37",
    "500": "#FF5A10",
    "600": "#F03F06",
    "700": "#C72D07",
    "800": "#9E250E",
    "900": "#7F220F",
    "950": "#450D05"
  },
  "success": {
    "50": "#F0FDF4",
    "100": "#DCFCE7",
    "200": "#BBF7D0",
    "300": "#86EFAC",
    "400": "#4ADE80",
    "500": "#22C55E",
    "600": "#16A34A",
    "700": "#15803D",
    "800": "#166534",
    "900": "#14532D",
    "950": "#052E16"
  },
  "warning": {
    "50": "#FFFBEB",
    "100": "#FEF3C7",
    "200": "#FDE68A",
    "300": "#FCD34D",
    "400": "#FBBF24",
    "500": "#F59E0B",
    "600": "#D97706",
    "700": "#B45309",
    "800": "#92400E",
    "900": "#78350F",
    "950": "#451A03"
  },
  "danger": {
    "50": "#FEF2F2",
    "100": "#FEE2E2",
    "200": "#FECACA",
    "300": "#FCA5A5",
    "400": "#F87171",
    "500": "#EF4444",
    "600": "#DC2626",
    "700": "#B91C1C",
    "800": "#991B1B",
    "900": "#7F1D1D",
    "950": "#450A0A"
  },
  "info": {
    "50": "#EFF8FF",
    "100": "#DBEEFE",
    "200": "#BFE2FE",
    "300": "#93D0FD",
    "400": "#60B5FA",
    "500": "#3B96F6",
    "600": "#2577EB",
    "700": "#1D61D8",
    "800": "#1E4FAF",
    "900": "#1E448A",
    "950": "#172B54"
  },
  "neutral": {
    "50": "#F7F9FB",
    "100": "#EEF2F6",
    "200": "#E2E8EF",
    "300": "#CBD4DF",
    "400": "#97A4B5",
    "500": "#677689",
    "600": "#4B596B",
    "700": "#374456",
    "800": "#222D3B",
    "900": "#131B26",
    "950": "#0A0F17"
  }
};

const v = (name) => `var(--mi-${name})`;

module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ...scales,
        brand: { DEFAULT: v('brand'), hover: v('brand-hover'), fg: v('brand-fg'), soft: v('brand-soft') },
        surface: { DEFAULT: v('surface'), raised: v('surface-raised'), sunken: v('surface-sunken'), inverse: v('surface-inverse') },
        background: { DEFAULT: v('background'), subtle: v('background-subtle') },
        content: { DEFAULT: v('text'), muted: v('text-muted'), subtle: v('text-subtle'), inverse: v('text-inverse'), brand: v('text-brand'), link: v('text-link') },
        line: { DEFAULT: v('border'), strong: v('border-strong'), focus: v('border-focus') },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
  "display-2xl": [
    "60px",
    {
      "lineHeight": "68px",
      "letterSpacing": "-0.025em",
      "fontWeight": "800"
    }
  ],
  "display-xl": [
    "48px",
    {
      "lineHeight": "56px",
      "letterSpacing": "-0.025em",
      "fontWeight": "800"
    }
  ],
  "display-lg": [
    "36px",
    {
      "lineHeight": "44px",
      "letterSpacing": "-0.02em",
      "fontWeight": "700"
    }
  ],
  "h1": [
    "30px",
    {
      "lineHeight": "38px",
      "letterSpacing": "-0.02em",
      "fontWeight": "700"
    }
  ],
  "h2": [
    "24px",
    {
      "lineHeight": "32px",
      "letterSpacing": "-0.015em",
      "fontWeight": "700"
    }
  ],
  "h3": [
    "20px",
    {
      "lineHeight": "28px",
      "letterSpacing": "-0.01em",
      "fontWeight": "600"
    }
  ],
  "h4": [
    "18px",
    {
      "lineHeight": "26px",
      "letterSpacing": "-0.005em",
      "fontWeight": "600"
    }
  ],
  "body-lg": [
    "18px",
    {
      "lineHeight": "28px",
      "letterSpacing": "0",
      "fontWeight": "400"
    }
  ],
  "body": [
    "16px",
    {
      "lineHeight": "24px",
      "letterSpacing": "0",
      "fontWeight": "400"
    }
  ],
  "body-sm": [
    "14px",
    {
      "lineHeight": "20px",
      "letterSpacing": "0",
      "fontWeight": "400"
    }
  ],
  "caption": [
    "12px",
    {
      "lineHeight": "16px",
      "letterSpacing": "0.01em",
      "fontWeight": "500"
    }
  ],
  "overline": [
    "12px",
    {
      "lineHeight": "16px",
      "letterSpacing": "0.12em",
      "fontWeight": "600"
    }
  ]
},
      borderRadius: { sm: '6px', DEFAULT: '8px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px' },
      boxShadow: {
  "xs": "0 1px 2px rgba(10,15,23,.06)",
  "sm": "0 1px 3px rgba(10,15,23,.08), 0 1px 2px rgba(10,15,23,.04)",
  "md": "0 4px 12px -2px rgba(10,15,23,.10), 0 2px 4px -2px rgba(10,15,23,.06)",
  "lg": "0 12px 32px -8px rgba(10,15,23,.16)",
  "focus": "0 0 0 3px rgba(23,158,149,.35)"
},
      ringColor: { DEFAULT: '#179E95' },
    },
  },
};
