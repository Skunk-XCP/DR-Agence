<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Donatien Rouzeirol — Développeur Web Freelance</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&family=Space+Grotesk:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    <style>
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      :root {
        --espresso: #1a1008;
        --espresso-md: #2e2010;
        --latte: #c4862a;
        --latte-lt: #d9a355;
        --latte-glow: rgba(196, 134, 42, 0.18);
        --cream: #fbf5ea;
        --parchment: #f2e8d4;
        --ink-mid: #6b5540;
        --ink-lt: #a89070;
        --border-dark: rgba(196, 134, 42, 0.2);
        --border-lt: rgba(26, 16, 8, 0.1);
      }

      html {
        scroll-behavior: smooth;
      }
      body {
        background: var(--cream);
        color: var(--espresso);
        font-family: "DM Sans", sans-serif;
        overflow-x: hidden;
      }

      /* ── BARRE DE PROGRESSION ───────────────────── */
      #progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        height: 2px;
        width: 0%;
        background: linear-gradient(90deg, var(--latte), var(--latte-lt));
        transition: width 0.1s linear;
        box-shadow: 0 0 8px rgba(196, 134, 42, 0.5);
      }

      /* ── ANIMATIONS SCROLL ──────────────────────── */
      .reveal {
        opacity: 0;
        transform: translateY(24px);
        transition:
          opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
          transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .reveal.in {
        opacity: 1;
        transform: none;
      }

      .from-left {
        opacity: 0;
        transform: translateX(-32px);
        transition:
          opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
          transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .from-right {
        opacity: 0;
        transform: translateX(32px);
        transition:
          opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
          transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .from-left.in,
      .from-right.in {
        opacity: 1;
        transform: none;
      }

      .d1 {
        transition-delay: 0.08s;
      }
      .d2 {
        transition-delay: 0.16s;
      }
      .d3 {
        transition-delay: 0.24s;
      }
      .d4 {
        transition-delay: 0.32s;
      }

      /* Stagger enfants */
      .stagger > * {
        opacity: 0;
        transform: translateY(20px);
        transition:
          opacity 0.6s ease,
          transform 0.6s ease;
      }
      .stagger.in > *:nth-child(1) {
        opacity: 1;
        transform: none;
        transition-delay: 0.05s;
      }
      .stagger.in > *:nth-child(2) {
        opacity: 1;
        transform: none;
        transition-delay: 0.15s;
      }
      .stagger.in > *:nth-child(3) {
        opacity: 1;
        transform: none;
        transition-delay: 0.25s;
      }
      .stagger.in > *:nth-child(4) {
        opacity: 1;
        transform: none;
        transition-delay: 0.35s;
      }
      .stagger.in > *:nth-child(5) {
        opacity: 1;
        transform: none;
        transition-delay: 0.45s;
      }
      .stagger.in > *:nth-child(6) {
        opacity: 1;
        transform: none;
        transition-delay: 0.55s;
      }

      /* Mouse glow sur les cartes */
      .offre,
      .p-cell {
        --mx: 50%;
        --my: 50%;
        overflow: hidden;
      }
      .offre::after,
      .p-cell::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: radial-gradient(
          160px circle at var(--mx) var(--my),
          rgba(196, 134, 42, 0.1),
          transparent 70%
        );
        opacity: 0;
        transition: opacity 0.3s;
      }
      .offre:hover::after,
      .p-cell:hover::after {
        opacity: 1;
      }

      /* ── NAV ────────────────────────────────────── */
      nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 4rem;
        background: rgba(26, 16, 8, 0);
        transition:
          background 0.4s,
          backdrop-filter 0.4s,
          box-shadow 0.4s;
      }
      nav.scrolled {
        background: rgba(251, 245, 234, 0.92);
        backdrop-filter: blur(18px);
        box-shadow: 0 1px 0 var(--border-lt);
      }
      .logo {
        font-family: "Lora", serif;
        font-weight: 600;
        font-size: 1rem;
        color: white;
        transition: color 0.4s;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      nav.scrolled .logo {
        color: var(--espresso);
      }
      .logo-pip {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--latte);
      }
      nav ul {
        list-style: none;
        display: flex;
        gap: 2.5rem;
      }
      nav a {
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.78rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.75);
        text-decoration: none;
        transition: color 0.4s;
        position: relative;
      }
      nav.scrolled a {
        color: var(--ink-mid);
      }
      nav a::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--latte);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.25s;
      }
      nav a:hover::after {
        transform: scaleX(1);
      }
      .nav-btn {
        padding: 0.55rem 1.3rem;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.35);
        background: transparent;
        color: white;
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.78rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      }
      nav.scrolled .nav-btn {
        border-color: var(--latte);
        color: var(--latte);
      }
      .nav-btn:hover {
        background: var(--latte);
        color: white;
        border-color: var(--latte);
      }

      /* ── HERO ───────────────────────────────────── */
      .hero {
        height: 100vh;
        min-height: 600px;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: flex-end;
      }
      .hero-bg {
        position: absolute;
        inset: 0;
        background-image: url("cafe_hero.jpg");
        background-size: cover;
        background-position: center 30%;
        will-change: transform;
        animation: heroZoom 18s ease-out both;
      }
      @keyframes heroZoom {
        from {
          transform: scale(1.07);
        }
        to {
          transform: scale(1);
        }
      }
      .hero-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(10, 6, 2, 0.92) 0%,
          rgba(10, 6, 2, 0.65) 35%,
          rgba(10, 6, 2, 0.25) 70%,
          rgba(10, 6, 2, 0.1) 100%
        );
      }
      .hero-glow {
        position: absolute;
        bottom: -80px;
        right: 5%;
        width: 480px;
        height: 480px;
        border-radius: 50%;
        background: radial-gradient(
          circle,
          rgba(196, 134, 42, 0.22) 0%,
          transparent 65%
        );
        filter: blur(40px);
        pointer-events: none;
        will-change: transform;
      }
      .hero-content {
        position: relative;
        z-index: 2;
        padding: 0 4rem 5rem;
        max-width: 820px;
        will-change: transform, opacity;
      }
      .hero-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 0.7rem;
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.7rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--latte);
        margin-bottom: 1.8rem;
        animation: fadeUp 0.8s 0.1s both;
      }
      .hero-eyebrow::before {
        content: "";
        width: 24px;
        height: 1px;
        background: var(--latte);
      }
      @keyframes fadeUp {
        from {
          opacity: 0;
          transform: translateY(16px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
      .hero h1 {
        font-family: "Lora", serif;
        font-size: clamp(3rem, 5.5vw, 5.8rem);
        font-weight: 700;
        line-height: 1.08;
        color: var(--cream);
        letter-spacing: -0.01em;
        margin-bottom: 1.4rem;
        animation: fadeUp 0.9s 0.2s both;
      }
      .hero h1 em {
        font-style: italic;
        font-weight: 400;
        color: var(--latte);
      }
      .hero-sub {
        font-size: 1rem;
        color: rgba(251, 245, 234, 0.65);
        max-width: 44ch;
        line-height: 1.8;
        margin-bottom: 2.5rem;
        animation: fadeUp 0.9s 0.3s both;
      }
      .hero-actions {
        display: flex;
        align-items: center;
        gap: 1.2rem;
        animation: fadeUp 0.9s 0.4s both;
      }
      .btn-latte {
        padding: 0.85rem 2rem;
        border-radius: 8px;
        background: var(--latte);
        color: white;
        border: none;
        font-family: "Space Grotesk", sans-serif;
        font-weight: 600;
        font-size: 0.88rem;
        cursor: pointer;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition:
          background 0.2s,
          transform 0.2s,
          box-shadow 0.2s;
      }
      .btn-latte:hover {
        background: var(--latte-lt);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(196, 134, 42, 0.4);
      }
      .btn-latte .arr {
        transition: transform 0.2s;
      }
      .btn-latte:hover .arr {
        transform: translateX(4px);
      }
      .btn-ghost-white {
        padding: 0.85rem 2rem;
        border-radius: 8px;
        border: 1px solid rgba(251, 245, 234, 0.3);
        background: transparent;
        color: rgba(251, 245, 234, 0.8);
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.88rem;
        cursor: pointer;
        text-decoration: none;
        transition:
          border-color 0.2s,
          color 0.2s;
      }
      .btn-ghost-white:hover {
        border-color: rgba(251, 245, 234, 0.7);
        color: white;
      }

      /* Proof stats */
      .hero-proof {
        margin-top: 4rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(196, 134, 42, 0.2);
        display: flex;
        gap: 3rem;
        animation: fadeUp 0.9s 0.5s both;
      }
      .proof-num {
        font-family: "Lora", serif;
        font-size: 1.9rem;
        font-weight: 700;
        color: var(--cream);
        display: block;
        line-height: 1;
      }
      .proof-label {
        font-size: 0.8rem;
        color: rgba(251, 245, 234, 0.5);
        font-family: "Space Grotesk", sans-serif;
        letter-spacing: 0.04em;
        margin-top: 0.25rem;
      }

      /* Hero badges */
      .hero-badges {
        position: absolute;
        bottom: 5rem;
        right: 4rem;
        z-index: 2;
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
        animation: fadeUp 0.9s 0.6s both;
        will-change: transform, opacity;
      }
      .hero-badge {
        background: rgba(26, 16, 8, 0.55);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(196, 134, 42, 0.25);
        border-radius: 100px;
        padding: 0.5rem 1.1rem;
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.76rem;
        color: rgba(251, 245, 234, 0.85);
        font-weight: 500;
      }

      /* ── SECTIONS ───────────────────────────────── */
      .s-light {
        background: var(--cream);
      }
      .s-warm {
        background: var(--parchment);
      }
      .s-dark {
        background: var(--espresso);
        color: var(--cream);
      }
      .s-dark2 {
        background: var(--espresso-md);
        color: var(--cream);
      }
      section {
        padding: 7rem 4rem;
      }

      .eyebrow {
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.7rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--latte);
        margin-bottom: 0.8rem;
        display: flex;
        align-items: center;
        gap: 0.6rem;
      }
      .eyebrow::before {
        content: "";
        width: 20px;
        height: 1px;
        background: var(--latte);
      }
      .s-dark .eyebrow,
      .s-dark2 .eyebrow {
        color: var(--latte-lt);
      }
      .s-dark .eyebrow::before,
      .s-dark2 .eyebrow::before {
        background: var(--latte-lt);
      }

      .section-title {
        font-family: "Lora", serif;
        font-size: clamp(2rem, 3.5vw, 3rem);
        font-weight: 700;
        line-height: 1.12;
        max-width: 20ch;
      }
      .section-sub {
        font-size: 0.97rem;
        color: var(--ink-mid);
        max-width: 46ch;
        line-height: 1.8;
        margin-top: 0.8rem;
      }
      .s-dark .section-sub,
      .s-dark2 .section-sub {
        color: rgba(251, 245, 234, 0.5);
      }

      /* ── SERVICES ───────────────────────────────── */
      .services-layout {
        display: grid;
        grid-template-columns: 1fr 1.6fr;
        gap: 5rem;
        margin-top: 4rem;
      }
      .sticky-block {
        position: sticky;
        top: 110px;
      }
      .sticky-note {
        margin-top: 1.5rem;
        font-size: 0.92rem;
        color: var(--ink-mid);
        line-height: 1.8;
      }
      .svc-list {
        display: flex;
        flex-direction: column;
      }
      .svc-item {
        display: grid;
        grid-template-columns: 32px 1fr;
        gap: 1.5rem;
        padding: 1.8rem 0;
        border-bottom: 1px solid var(--border-lt);
        transition: padding-left 0.3s ease;
        cursor: default;
      }
      .svc-item:hover {
        padding-left: 0.6rem;
      }
      .svc-item:hover .svc-num,
      .svc-item:hover .svc-name {
        color: var(--latte);
      }
      .svc-num {
        font-family: "Lora", serif;
        font-style: italic;
        font-size: 0.85rem;
        color: var(--ink-lt);
        padding-top: 0.2rem;
        transition: color 0.2s;
      }
      .svc-name {
        font-family: "Lora", serif;
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 0.35rem;
        transition: color 0.2s;
      }
      .svc-desc {
        font-size: 0.88rem;
        color: var(--ink-mid);
        line-height: 1.7;
      }

      /* ── PROCESS ────────────────────────────────── */
      .process-wrap {
        position: relative;
        overflow: hidden;
      }
      .process-photo-bg {
        position: absolute;
        inset: 0;
        background-image: url("image-2.jpg");
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        opacity: 0.07;
      }
      .process-inner {
        position: relative;
        z-index: 1;
      }
      .process-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1px;
        margin-top: 4rem;
        border: 1px solid rgba(196, 134, 42, 0.12);
        border-radius: 14px;
        overflow: hidden;
      }
      .p-cell {
        padding: 2.5rem 1.8rem;
        background: rgba(255, 255, 255, 0.03);
        border-right: 1px solid rgba(196, 134, 42, 0.1);
        position: relative;
        transition: background 0.3s;
      }
      .p-cell:last-child {
        border-right: none;
      }
      .p-cell::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--latte);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.4s ease;
      }
      .p-cell:hover {
        background: rgba(196, 134, 42, 0.06);
      }
      .p-cell:hover::before {
        transform: scaleX(1);
      }
      .p-big {
        font-family: "Lora", serif;
        font-size: 3.8rem;
        font-weight: 700;
        color: rgba(196, 134, 42, 0.12);
        line-height: 1;
        margin-bottom: 1.5rem;
        transition: color 0.3s;
      }
      .p-cell:hover .p-big {
        color: rgba(196, 134, 42, 0.3);
      }
      .p-title {
        font-family: "Lora", serif;
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--cream);
        margin-bottom: 0.4rem;
      }
      .p-desc {
        font-size: 0.85rem;
        color: rgba(251, 245, 234, 0.45);
        line-height: 1.7;
      }

      /* ── OFFRES ─────────────────────────────────── */
      .offres-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-top: 4rem;
      }
      .offre {
        background: var(--cream);
        border-radius: 12px;
        border: 1px solid rgba(26, 16, 8, 0.08);
        padding: 1.8rem;
        position: relative;
        transition:
          transform 0.3s,
          box-shadow 0.3s,
          border-color 0.3s;
      }
      .offre:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(26, 16, 8, 0.1);
        border-color: rgba(196, 134, 42, 0.2);
      }
      .offre.star {
        background: var(--espresso);
        color: var(--cream);
        border: none;
      }
      .offre.star:hover {
        box-shadow: 0 16px 40px rgba(10, 6, 2, 0.35);
      }
      .star-badge {
        display: inline-block;
        background: var(--latte);
        color: white;
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.66rem;
        letter-spacing: 0.08em;
        font-weight: 600;
        padding: 0.25rem 0.8rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        text-transform: uppercase;
      }
      .offre-cat {
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.68rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--ink-lt);
        margin-bottom: 0.8rem;
        display: block;
      }
      .offre.star .offre-cat {
        color: rgba(251, 245, 234, 0.4);
      }
      .offre-name {
        font-family: "Lora", serif;
        font-size: 1.15rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      .offre-desc {
        font-size: 0.87rem;
        color: var(--ink-mid);
        line-height: 1.65;
      }
      .offre.star .offre-desc {
        color: rgba(251, 245, 234, 0.55);
      }

      /* ── ESTIMATION ─────────────────────────────── */
      .estim-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5rem;
        align-items: center;
      }
      .estim-form {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--border-dark);
        border-radius: 16px;
        padding: 2.5rem;
      }
      .f-label {
        display: block;
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.7rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: rgba(251, 245, 234, 0.45);
        margin-bottom: 0.4rem;
      }
      .f-select {
        width: 100%;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(196, 134, 42, 0.2);
        font-family: "DM Sans", sans-serif;
        font-size: 0.9rem;
        color: var(--cream);
        cursor: pointer;
        appearance: none;
        margin-bottom: 1.2rem;
        transition: border-color 0.2s;
      }
      .f-select:focus {
        outline: none;
        border-color: var(--latte);
      }
      .f-select option {
        background: var(--espresso);
        color: var(--cream);
      }
      .f-result {
        padding: 1rem 1.2rem;
        border-radius: 8px;
        background: rgba(196, 134, 42, 0.1);
        border-left: 2px solid var(--latte);
        font-size: 0.87rem;
        color: rgba(251, 245, 234, 0.75);
        line-height: 1.6;
      }
      .estim-cta {
        display: block;
        text-align: center;
        margin-top: 1.5rem;
        padding: 0.85rem;
        border-radius: 8px;
        background: var(--latte);
        color: white;
        font-family: "Space Grotesk", sans-serif;
        font-weight: 600;
        font-size: 0.88rem;
        text-decoration: none;
        transition:
          background 0.2s,
          transform 0.2s;
      }
      .estim-cta:hover {
        background: var(--latte-lt);
        transform: translateY(-1px);
      }

      /* ── CONTACT ────────────────────────────────── */
      .contact-wrap {
        position: relative;
        overflow: hidden;
      }
      .contact-photo-bg {
        position: absolute;
        inset: 0;
        background-image: url("cafe_hero.jpg");
        background-size: cover;
        background-position: center 40%;
        background-attachment: fixed;
        opacity: 0.06;
      }
      .contact-inner {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5rem;
        align-items: center;
      }
      .contact-cta-group {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        margin-top: 2rem;
      }
      .cta-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--cream);
        border: 1px solid var(--border-lt);
        border-radius: 10px;
        padding: 1.2rem 1.5rem;
        text-decoration: none;
        color: var(--espresso);
        transition:
          border-color 0.2s,
          transform 0.2s,
          box-shadow 0.2s;
      }
      .cta-link:hover {
        border-color: var(--latte);
        transform: translateX(4px);
        box-shadow: 0 4px 16px var(--latte-glow);
      }
      .cta-link-lbl {
        font-size: 0.7rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--ink-lt);
        margin-bottom: 0.2rem;
        font-family: "Space Grotesk", sans-serif;
      }
      .cta-link-val {
        font-size: 0.95rem;
      }
      .cta-arrow {
        color: var(--latte);
      }
      .cozy-note {
        margin-top: 3rem;
        padding: 1.5rem 2rem;
        background: var(--parchment);
        border-radius: 12px;
        border-left: 3px solid var(--latte);
        font-size: 0.9rem;
        color: var(--ink-mid);
        line-height: 1.7;
        font-style: italic;
      }
      .btn-parchment {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.85rem 1.8rem;
        border-radius: 8px;
        background: var(--parchment);
        color: var(--espresso-md);
        font-family: "Space Grotesk", sans-serif;
        font-weight: 500;
        font-size: 0.88rem;
        text-decoration: none;
        margin-top: 2rem;
        transition:
          background 0.2s,
          transform 0.2s;
      }
      .btn-parchment:hover {
        background: #e8d8bc;
        transform: translateY(-1px);
      }

      /* ── FOOTER ─────────────────────────────────── */
      footer {
        background: #0d0804;
        padding: 1.8rem 4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: "Space Grotesk", sans-serif;
        font-size: 0.77rem;
        color: rgba(251, 245, 234, 0.28);
      }
      footer a {
        color: rgba(251, 245, 234, 0.28);
        text-decoration: none;
        transition: color 0.2s;
      }
      footer a:hover {
        color: var(--latte-lt);
      }
    </style>
  </head>
  <body>
    <div id="progress-bar"></div>

    <!-- NAV -->
    <nav id="nav">
      <div class="logo">
        <div class="logo-pip"></div>
        Donatien Rouzeirol
      </div>
      <ul>
        <li><a href="#services">Services</a></li>
        <li><a href="#process">Process</a></li>
        <li><a href="#offres">Offres</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button class="nav-btn">Démarrer un projet</button>
    </nav>

    <!-- ═══ HERO ═══════════════════════════════════════ -->
    <section class="hero">
      <div class="hero-bg" id="heroBg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-glow" id="heroGlow"></div>

      <div class="hero-content" id="heroContent">
        <div class="hero-eyebrow">Développeur web freelance · Bordeaux</div>
        <h1>
          Votre site web,<br />
          <em>enfin</em> à votre image.
        </h1>
        <p class="hero-sub">
          Je conçois des expériences web claires, rapides et bien référencées.
          Pour les restaurants, artisans, commerces médicaux et toutes les TPE
          qui veulent se développer en ligne.
        </p>
        <div class="hero-actions">
          <a href="#offres" class="btn-latte"
            >Voir les offres <span class="arr">→</span></a
          >
          <a href="#contact" class="btn-ghost-white">Discutons</a>
        </div>
        <div class="hero-proof">
          <div>
            <span class="proof-num" data-target="100" data-suffix="%">0%</span>
            <div class="proof-label">Projets livrés dans les délais</div>
          </div>
          <div>
            <span class="proof-num" data-target="90" data-prefix="+">0</span>
            <div class="proof-label">Score de performance moyen</div>
          </div>
          <div>
            <span class="proof-num">24h</span>
            <div class="proof-label">Délai de réponse garanti</div>
          </div>
        </div>
      </div>

      <div class="hero-badges" id="heroBadges">
        <span class="hero-badge">✓ SEO Technique</span>
        <span class="hero-badge">✓ Performance</span>
        <span class="hero-badge">✓ Architecture propre</span>
      </div>
    </section>

    <!-- ═══ SERVICES ════════════════════════════════════ -->
    <section class="s-light" id="services">
      <div class="reveal">
        <div class="eyebrow">Pourquoi moi</div>
        <h2 class="section-title">
          Une approche humaine, des résultats concrets
        </h2>
        <p class="section-sub">
          Je m'adapte à votre métier — restaurateur, artisan, praticien, gérant
          de TPE. Votre site doit vous ressembler et convertir.
        </p>
      </div>
      <div class="services-layout">
        <!-- Colonne gauche : entre par la gauche -->
        <div class="sticky-block from-left reveal">
          <p class="sticky-note">
            Chaque projet est unique. J'écoute d'abord, je comprends votre
            activité, puis je construis — sans jargon, sans surprise.
          </p>
          <a
            href="#contact"
            class="btn-latte"
            style="margin-top: 2rem; display: inline-flex"
            >Me contacter <span class="arr">→</span></a
          >
        </div>

        <!-- Colonne droite : items alternent gauche / droite -->
        <div class="svc-list">
          <div class="svc-item from-left reveal">
            <span class="svc-num">i.</span>
            <div>
              <div class="svc-name">Architecture solide</div>
              <p class="svc-desc">
                Code propre, composants réutilisables, structure évolutive.
                Votre site tient dans le temps sans dette technique.
              </p>
            </div>
          </div>
          <div class="svc-item from-right reveal d1">
            <span class="svc-num">ii.</span>
            <div>
              <div class="svc-name">Design premium & accessible</div>
              <p class="svc-desc">
                Identité visuelle soignée, lisible sur tous les écrans, qui
                inspire confiance dès les premières secondes.
              </p>
            </div>
          </div>
          <div class="svc-item from-left reveal d2">
            <span class="svc-num">iii.</span>
            <div>
              <div class="svc-name">SEO technique & performance</div>
              <p class="svc-desc">
                Structure sémantique, Core Web Vitals maîtrisés, temps de
                chargement irréprochable. Vous existez sur Google.
              </p>
            </div>
          </div>
          <div class="svc-item from-right reveal d3">
            <span class="svc-num">iv.</span>
            <div>
              <div class="svc-name">Transparence totale</div>
              <p class="svc-desc">
                Devis clair, étapes validées ensemble, réponse sous 24h. Jamais
                de flou entre nous.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ PROCESS ══════════════════════════════════════ -->
    <section class="s-dark process-wrap" id="process">
      <div class="process-photo-bg"></div>
      <div class="process-inner">
        <div class="reveal">
          <div class="eyebrow">Process</div>
          <h2 class="section-title">Simple, cadré, livrable.</h2>
          <p class="section-sub">
            Quatre étapes précises du premier appel à la mise en ligne. Pas de
            surprise, pas de flou.
          </p>
        </div>
        <!-- stagger : les 4 cellules apparaissent en cascade -->
        <div class="process-grid stagger reveal">
          <div class="p-cell">
            <div class="p-big">01</div>
            <div class="p-title">Discovery</div>
            <p class="p-desc">
              Objectifs, message clé, priorités et périmètre clairement définis
              ensemble.
            </p>
          </div>
          <div class="p-cell">
            <div class="p-big">02</div>
            <div class="p-title">Design</div>
            <p class="p-desc">
              Wireframes et maquettes pour valider l'expérience visuelle avant
              de toucher au code.
            </p>
          </div>
          <div class="p-cell">
            <div class="p-big">03</div>
            <div class="p-title">Développement</div>
            <p class="p-desc">
              Intégration propre, tests de performance et d'accessibilité à
              chaque livrable.
            </p>
          </div>
          <div class="p-cell">
            <div class="p-big">04</div>
            <div class="p-title">Lancement</div>
            <p class="p-desc">
              Mise en ligne, vérifications finales et suivi post-lancement
              inclus.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ OFFRES ═══════════════════════════════════════ -->
    <section class="s-warm" id="offres">
      <div class="reveal">
        <div class="eyebrow">Prestations</div>
        <h2 class="section-title">Des offres claires pour chaque besoin</h2>
        <p class="section-sub">
          Restaurateur, artisan, professionnel libéral ou gérant de commerce —
          il y a une offre taillée pour vous.
        </p>
      </div>
      <!-- stagger : les 6 cartes apparaissent en cascade -->
      <div class="offres-grid stagger reveal">
        <div class="offre star">
          <span class="star-badge">★ Le plus demandé</span>
          <span class="offre-cat">Vitrine</span>
          <div class="offre-name">Vitrine Premium</div>
          <p class="offre-desc">
            Design éditorial, animations soignées, SEO et performance. Pour
            crédibiliser votre commerce et convertir.
          </p>
        </div>
        <div class="offre">
          <span class="offre-cat">Sprint</span>
          <div class="offre-name">Landing Page</div>
          <p class="offre-desc">
            Une page calibrée conversion, livrée rapidement pour vos lancements
            et campagnes.
          </p>
        </div>
        <div class="offre">
          <span class="offre-cat">Fonctionnalités</span>
          <div class="offre-name">Vitrine + back-office</div>
          <p class="offre-desc">
            Formulaires avancés, demandes stockées, mini back-office et
            intégrations pour automatiser.
          </p>
        </div>
        <div class="offre">
          <span class="offre-cat">Sur mesure</span>
          <div class="offre-name">Sur mesure</div>
          <p class="offre-desc">
            Fonctionnalités spécifiques, logique métier, intégrations API. Conçu
            pour évoluer.
          </p>
        </div>
        <div class="offre">
          <span class="offre-cat">Qualité</span>
          <div class="offre-name">Performance & accessibilité</div>
          <p class="offre-desc">
            Core Web Vitals, WCAG, bonnes pratiques. Un site rapide et durable.
          </p>
        </div>
        <div class="offre">
          <span class="offre-cat">Long terme</span>
          <div class="offre-name">Maintenance évolutive</div>
          <p class="offre-desc">
            Suivi, évolutions et corrections après mise en ligne. Vous n'êtes
            jamais seul.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══ ESTIMATION ═══════════════════════════════════ -->
    <section class="s-dark2">
      <div class="estim-layout">
        <div class="from-left reveal">
          <div class="eyebrow">Estimation</div>
          <h2 class="section-title">Combien ça coûte ?</h2>
          <p class="section-sub">
            Sélectionnez votre type d'activité et de projet pour une fourchette
            indicative — sans engagement, sans jargon.
          </p>
          <p
            style="
              margin-top: 1.2rem;
              font-size: 0.85rem;
              color: rgba(251, 245, 234, 0.35);
              font-style: italic;
            "
          >
            Le devis final est confirmé après un premier échange.
          </p>
        </div>
        <div class="from-right reveal d1">
          <div class="estim-form">
            <label class="f-label">Type de commerce</label>
            <select class="f-select">
              <option value="">Sélectionner...</option>
              <option>Restaurant / Bar / Café</option>
              <option>Artisan / Prestataire</option>
              <option>Commerce médical ou paramédical</option>
              <option>Commerce de détail</option>
              <option>Professionnel libéral</option>
              <option>Autre TPE / PME</option>
            </select>
            <label class="f-label">Type de site</label>
            <select class="f-select">
              <option value="">Sélectionner...</option>
              <option>Vitrine simple (3-5 pages)</option>
              <option>Landing page (1 page)</option>
              <option>Vitrine + formulaires / back-office</option>
              <option>Site e-commerce</option>
              <option>Application web sur mesure</option>
            </select>
            <div class="f-result">
              ☕ Sélectionnez vos options pour voir une fourchette de prix et un
              délai indicatif.
            </div>
            <a href="#contact" class="estim-cta">Demander un devis précis →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CONTACT ══════════════════════════════════════ -->
    <section class="s-light contact-wrap" id="contact">
      <div class="contact-photo-bg"></div>
      <div class="contact-inner">
        <!-- Texte : entre par la gauche -->
        <div class="from-left reveal">
          <div class="eyebrow">Contact</div>
          <h2 class="section-title">Discutons de votre projet</h2>
          <p class="section-sub">
            Envoyez-moi un message clair. Je reviens vers vous avec un plan
            d'action et une estimation sous 24h.
          </p>
          <div class="cozy-note">
            "J'aime comprendre votre métier avant de coder quoi que ce soit. Un
            café virtuel, et on part sur de bonnes bases."
          </div>
          <a href="#offres" class="btn-parchment">Revoir les offres →</a>
        </div>

        <!-- Liens : entrent par la droite -->
        <div class="from-right reveal d1">
          <div class="contact-cta-group">
            <a href="mailto:contact@donatien-rouzeirol.fr" class="cta-link">
              <div>
                <div class="cta-link-lbl">Email</div>
                <div class="cta-link-val">contact@donatien-rouzeirol.fr</div>
              </div>
              <span class="cta-arrow">↗</span>
            </a>
            <a href="https://linkedin.com" class="cta-link" target="_blank">
              <div>
                <div class="cta-link-lbl">LinkedIn</div>
                <div class="cta-link-val">Donatien Rouzeirol</div>
              </div>
              <span class="cta-arrow">↗</span>
            </a>
            <div class="cta-link" style="cursor: default; opacity: 0.65">
              <div>
                <div class="cta-link-lbl">Localisation</div>
                <div class="cta-link-val">
                  Bordeaux · Remote OK partout en France
                </div>
              </div>
              <span>📍</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer>
      <span>© 2026 Donatien Rouzeirol</span>
      <span>Développeur web freelance · Bordeaux</span>
      <a href="mailto:contact@donatien-rouzeirol.fr"
        >contact@donatien-rouzeirol.fr</a
      >
    </footer>

    <script>
      /* ── NAV + HERO PARALLAX ────────────────────── */
      const nav = document.getElementById("nav");
      const heroBg = document.getElementById("heroBg");
      const heroContent = document.getElementById("heroContent");
      const heroBadges = document.getElementById("heroBadges");
      const heroGlow = document.getElementById("heroGlow");

      window.addEventListener(
        "scroll",
        () => {
          const y = window.scrollY;
          const vh = window.innerHeight;

          // Nav
          nav.classList.toggle("scrolled", y > 60);

          // Parallax fond : glisse à 40% de la vitesse
          if (heroBg) heroBg.style.transform = `translateY(${y * 0.4}px)`;
          // Contenu remonte doucement et s'efface
          if (heroContent) {
            heroContent.style.transform = `translateY(${y * 0.18}px)`;
            heroContent.style.opacity = Math.max(0, 1 - (y / vh) * 1.6);
          }
          // Badges disparaissent plus vite
          if (heroBadges) {
            heroBadges.style.transform = `translateY(${y * 0.25}px)`;
            heroBadges.style.opacity = Math.max(0, 1 - (y / vh) * 2);
          }
          // Lueur descend
          if (heroGlow) heroGlow.style.transform = `translateY(${y * 0.3}px)`;

          // Barre de progression
          const max = document.body.scrollHeight - vh;
          progressBar.style.width = (y / max) * 100 + "%";
        },
        { passive: true },
      );

      const progressBar = document.getElementById("progress-bar");

      /* ── COMPTEURS ANIMÉS ───────────────────────── */
      function runCounter(el) {
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || "";
        const prefix = el.dataset.prefix || "";
        const duration = 1600;
        const start = performance.now();
        function step(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          el.textContent = prefix + Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }

      /* ── REVEAL AU SCROLL ───────────────────────── */
      const revealObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("in");
            // Lance les compteurs si présents
            entry.target.querySelectorAll("[data-target]").forEach(runCounter);
            revealObs.unobserve(entry.target);
          });
        },
        { threshold: 0.12 },
      );

      document
        .querySelectorAll(".reveal, .from-left, .from-right, .stagger")
        .forEach((el) => {
          revealObs.observe(el);
        });

      /* ── MOUSE GLOW SUR LES CARTES ──────────────── */
      document.querySelectorAll(".offre, .p-cell").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty(
            "--mx",
            ((e.clientX - r.left) / r.width) * 100 + "%",
          );
          card.style.setProperty(
            "--my",
            ((e.clientY - r.top) / r.height) * 100 + "%",
          );
        });
      });
    </script>
  </body>
</html>
