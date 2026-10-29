// All the words on the page live here. Edit this file for copy changes.
// Anything in [brackets] is a placeholder that still needs a real answer.

export const site = {
  title: 'Foils For The Future | SOHO Hair Academy',
  tagline: 'Humans Over Hair. Do Something Beautiful.',
  requestHref: '#request',
};

export const hero = {
  headline: ['Foils For', 'The Future'],
  subhead: 'Your foils. A local recycler. A SOHO scholarship.',
  body: 'Collect your used foils in a lined foil box. We will pick them up free, recycle them, and convert the proceeds into scholarships for SOHO Hair Academy students.',
  primaryCta: 'Get a box for your salon',
  secondaryCta: 'Box full? Request a pickup',
  imageAlt:
    'The Foils For The Future collection box, shown at an angle with the illustrated SOHO Hair Academy wrap on top and a plum panel reading Foils For The Future',
};

export const how = {
  title: 'You use the foil. We handle the rest.',
  intro:
    "Getting started is simple. Drop your used hair foils in the box we provide.\nLet us know when it's full and we'll handle the rest.\n\nAluminum doesn't grow on trees, and it can be recycled again and again. We'd rather keep your used hair foils out of the landfill and put them back to work.",
  steps: [
    { title: 'We drop off a box', body: 'It arrives lined with a bag and ready to use. Keep it where your team already works.' },
    { title: 'Fill the box', body: 'After color services, simply drop used hair foils into the container. No sorting or special prep required.' },
    { title: 'Bag full? Tell us', body: "Compact it as you go so the bag holds more. Send a pickup request. We'll schedule a time to pick up your bags." },
    { title: 'Fund scholarship', body: 'We collect the foils, take them to a local metal recycler, and turn the proceeds into scholarships for SOHO Hair Academy students.' },
  ],
};

export const box = {
  title: 'What goes in the Foil Box',
  yesLabel: 'Yes',
  yes: ['Used aluminum foil', 'Color-stained is fine', 'No rinsing. No sorting.'],
  noLabel: 'Keep out',
  no: ['Plastic', 'Paper', 'Gloves', 'Trash', 'Food', 'Aluminum Cans', 'Other Metals'],
  note: 'Keeping the box as pure aluminum foil helps the recycler process it cleanly and maximizes the value that goes toward SOHO Hair Academy scholarships.',
};

export const money = {
  title: 'Where the money goes',
  paragraphs: [
    "Every dollar earned from the aluminum we collect through Foils For The Future goes directly toward scholarships for students at SOHO Hair Academy. As the program grows and we better understand the volume of foil and cans our local salons and suites can gather, we'll use those funds to help students with tuition, tools, supplies, or other education-related costs. Recycling aluminum keeps a valuable metal out of the landfill and turns everyday salon waste into real support for the next generation of stylists.",
  ],
  cards: [
    { title: 'Flexible support', body: 'Scholarships that help cover tuition, kit supplies, or other costs that help students complete their education.' },
    { title: 'Growing impact', body: 'As more salons join and we collect more material, the scholarship fund grows, turning more foil and cans into more opportunities for students.' },
    { title: 'Simple and honest', body: "We're currently measuring participation so we can determine the size and number of scholarships we'll be able to award. Every pound collected moves us closer." },
  ],
  // Not shown on the page yet. Keep until the real details are ready.
  detailsTitle: 'Scholarship details',
  details: [
    ['Name', '[scholarship name]'],
    ['Who can apply', '[eligibility]'],
    ["How it's awarded", '[process and timing]'],
    ['Campuses', '[confirm which campuses]'],
    ['Foil recycled so far', '[pounds, updated quarterly]'],
  ],
};

export const upgrade = {
  title: 'Together We Can: Upgrade Your Impact',
  subtitle: 'Request an aluminum can box to multiply the difference you make for students.',
  paragraphs: [
    "We are thrilled you're already collecting used hair foils with us. Now you can do even more.",
    'While foils earn 15 cents per pound for scholarships, aluminum cans bring in 55 cents per pound.',
    'With our new custom container, you can easily collect both. Simply add your empty cans alongside the foils, and every extra pound goes straight toward more scholarships for SOHO Hair Academy students while keeping even more aluminum out of the landfill.',
  ],
  compare: [
    { label: 'Hair foils', value: '15¢', unit: 'per pound', pct: 27 },
    { label: 'Aluminum cans', value: '55¢', unit: 'per pound', pct: 100 },
  ],
  pricingNote: 'Current pricing. We will update as pricing changes.',
  imageAlt: 'The Together We Can collection box, shown at an angle with the illustrated SOHO Hair Academy wrap on top and a lavender panel reading Together We Can',
  ctaLead: 'Ready to upgrade your participation?',
  ctaNote: "We'll deliver the new box and keep the free pickup just as simple as before.",
  cta: 'Request the new box',
};

export const suite = {
  title: 'Work out of your own suite?',
  body: "You can recycle your foils too. Keep a box in your suite, drop your used foils in as you work, and tell us when it's full.",
  cta: 'Get a box for your suite',
};

// Public Turnstile Site Key (safe to commit). The build stops if this is still the placeholder.
export const TURNSTILE_PROD_KEY = '0x4AAAAAAFrmjuwfaaIP-0NF';
// Cloudflare's test key: always passes. Used by `npm run dev` only.
export const TURNSTILE_DEV_KEY = '1x00000000000000000000AA';

export const request = {
  title: 'Request a box or a pickup',
  intro: "Tell us where you are and what you need. We'll follow up to set it up.",
  needs: ['A box for my salon', 'A box for my suite', 'Pickup Bags'],
  upgradeLabel: 'Upgrade Your Impact',
  upgradeOptions: ['Not right now', 'Add aluminum can box'],
  submit: 'Send request',
  sending: 'Sending...',
  success: "Thank you. We got your request and will follow up soon.",
  errorInvalid: 'Please add your name and a valid email, then try again.',
  errorTurnstile: 'We could not confirm you are not a robot. Please wait a moment and try again.',
  errorGeneric: 'Something went wrong and your request was not sent. Please try again in a minute.',
};

export const recruit = {
  title: 'Know Someone Who Belongs Behind the Chair? Send Them Our Way.',
  body: "You're already turning used foils into scholarships. Now you can help start a career. If a client or friend has ever said they've always wanted to do hair, send them to SOHO Hair Academy, a cosmetology school with campuses in Council Bluffs and Omaha. We go beyond the basics, teaching real-world skills, business know-how, and how to build a career that lasts. Your referral could be the reason they begin.\n\nOne conversation. One future stylist. One more way your salon supports the next generation.",
  campuses: [
    { name: 'Council Bluffs, Iowa', lines: ['2600 S 9th St', 'Council Bluffs, IA 51501'], href: 'https://sohohairacademy.com/iowa', cta: 'See the Council Bluffs campus' },
    { name: 'Omaha, Nebraska', lines: ['15514 Spaulding Plaza', 'Omaha, NE 68116'], href: 'https://sohohairacademy.com/nebraska', cta: 'See the Omaha campus' },
  ],
};

export const footer = {
  note: "Foils For The Future and Together We Can are SOHO Hair Academy recycling programs. Aluminum is a scrap material, not a charitable gift. We don't issue donation receipts.",
};
