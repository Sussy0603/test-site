# MOS — public website

This folder is the MOS Main Page, on its own.

It is not part of the MOS platform any more. It shares no code, no files
and no links with the app. You can host it, break it, or rebuild it
without touching the platform at all.

---

## What's in here

    index.html            The whole page. All the CSS is inside it.
    site.js               The page's behaviour, plus the text and prices.
    i18n.js               The French. Nothing else.
    icons/icon-192.png    The tab icon (the three MOS bars).
    README.md             This file.

Five files. No build step, no npm, no framework, nothing to install.

Double-click `index.html` and it opens and works.

---

## Before you publish — three things to change

**1. The email addresses.** This is the important one.

Open `site.js`, find `MAIL_TO` (search for `MAIL_TO`). It reads:

    const MAIL_TO = { enquiry:'hello@example.com', support:'support@example.com' };

Right now every enquiry and every ticket goes to `example.com`, which is
nowhere. Put your real addresses in.

**2. The prices and the response times.**

The plan prices, the "From $2,400" figures and the reply-time targets are
placeholder numbers. Change them to what MOS actually charges and actually
promises, before a client reads them.

Prices live in `index.html` (search `data-plan`).
Response times live in `site.js` (search `TICKET_PRIORITIES`).

Both have French counterparts in `i18n.js` keyed by the English, so change
the English and the French together — see "English and French" below. The
plan prices themselves are the exception: the billing toggle rewrites
those, so they are formatted in code (`money()` in `site.js`) and only need
changing once.

**3. The Work section.**

The seven case studies are samples. They each carry a visible "Sample"
badge so the page never claims they are real clients.

Replace them as real jobs ship — they're in `site.js`, search `const WORK`.
Once they're real, remove the badge: in `workCardHtml`, delete the
`<span class="sample">Sample</span>` line.

---

## English and French

The page is in English and French. The **FR / EN** button sits in the top
bar next to the theme toggle, and its label is the language it takes you
*to* — it reads "FR" on the English page.

A first-time visitor gets French if their browser asks for French, English
otherwise. After that, whichever they pressed is remembered.

You can also link straight to one:

    https://your-domain.com/?lang=fr
    https://your-domain.com/?lang=en

That beats both the browser and the remembered choice, which is what you
want on a French flyer or a QR code.

### How the translation works

There is no second copy of the page, no `/fr/` folder and no duplicated
markup. The English in `index.html` is the original; `i18n.js` is a plain
table from English to French, and the page swaps the text as you press the
button.

The key is the English sentence itself:

    'Uptime monitoring':'Surveillance de la disponibilité',

Two things follow from that, and they are the only two you need to hold on
to.

**Anything not in the table stays in English.** A missing translation is a
missing sentence, not a broken page. Plan names, "MOS", "TLS" and the
client names in the Work section are deliberately absent for that reason.

**Editing the English unhooks its French.** Change a sentence in
`index.html` and the old key stops matching it, so that line quietly goes
back to English. Change the English, then change the key here to match.

### Checking it after a copy edit

Open the page with `?i18n=check` in the address bar and look at the browser
console (F12). It prints every English string on the page with no French,
and every key in `i18n.js` that no longer matches anything.

The second list is long and mostly normal — everything under "FROM
site.js" in that file is text the page only writes while you use it, so it
can't be found by looking at the page. What you're scanning for is a key
you recognise as belonging to a sentence in `index.html`. That one has
drifted.

You can also call `mosI18nCheck()` from the console at any time.

### Adding French to something new

Write the English as normal. Then add one line to `i18n.js` with the
English as the key. That is the whole procedure — there is nothing to
register and no id to invent.

The one exception is a word that means two different things on the same
page. "Launch" is both a process step and a plan name, and only the step
translates, so that one element carries `data-i18n="process.launch"` and
the table has a matching entry. Use that only when you actually have a
collision.

---

## How to put it online

Any static host works. Upload the folder, done.

- **GitHub Pages** — new repo, upload the five files, Settings → Pages.
- **Netlify / Cloudflare Pages** — drag the folder onto the dashboard.
- **Normal web hosting** — FTP the folder into the web root.

No server, no database, no configuration.

---

## The one rule: give it its own domain

This is the part that actually makes the separation real.

Putting the site in a different *folder* on the same domain as the app is
not separation. Browsers group things by domain, not by folder. So:

    mos.example.com/          ← the site
    mos.example.com/app/      ← the platform

...those two still share one browser origin. That means they share
localStorage, they share cookies, and a service worker registered by one
can intercept requests for the other. The app's saved data sits in the
same box as anything the public page does.

Two different domains, or two subdomains, do not share any of that:

    mos.example.com           ← the site
    app.mos.example.com       ← the platform

Use the second shape. Separate repo, separate host or subdomain,
separate deploy. That's what makes "unlinked" true rather than tidy.

---

## What was taken out

These pointed into the platform and are gone:

- "Client sign in" in the nav menu
- "Client sign in", "Staff sign in" and "Arcade" in the footer
- The "Already have a client login?" card in the Support section
- "Open your client page" and "Play the Arcade" in the Ctrl+K search
- The `APP_URL` setting and the code that filled those links in

Nothing visible changed on the page — all of those were hidden anyway,
because `APP_URL` was empty. What changed is that the wiring is gone, so
nobody can switch them back on by accident.

The Arcade *write-up* in the Work section stays. It's a description of
work MOS has done, not a link into the app.

---

## If you ever want a portal link back

Don't use a relative path like `/?client`. That only works when the site
and the app are on the same domain, which is what we just undid.

Write the full address instead:

    https://app.your-real-domain.com/?client

One link, one line, absolute. And keep the site on its own domain.

---

## Changing things later

| What | Where |
|---|---|
| Colours | `index.html`, the `:root` block near the top |
| Headline and hero text | `index.html`, search `class="hero"` |
| Service cards | `index.html`, search `id="serviceCards"` |
| Plans and prices | `index.html`, search `data-plan` |
| FAQ questions | `index.html`, search `details class="qa"` |
| Case studies | `site.js`, search `const WORK` |
| Process steps | `site.js`, search `const PROCESS` |
| Email addresses | `site.js`, search `MAIL_TO` |
| Response targets | `site.js`, search `TICKET_PRIORITIES` |
| French copy | `i18n.js` — see "English and French" above |

The comments in both files explain *why* things are the way they are, not
just what they do. Worth reading before changing the tricky bits (the 3D
block, the nav measurements).

---

## A note on the forms

Neither form sends anything by itself. There's no server behind this page.

Submitting opens the visitor's email app with everything filled in, and
says so under the button. That's honest — better than a fake "thanks, we
got it!" for a message that went nowhere.

When you want real submissions, there's one function to change:
`handoffToMail` in `site.js`. Swap the `mailto:` for a `fetch()` to your
endpoint. Both forms go through it, so it's one edit, not two.
