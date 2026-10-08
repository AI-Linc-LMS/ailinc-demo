/**
 * Course 208 curriculum.
 *
 * Authored topic by topic. Until a topic appears here the lesson falls back to
 * the generated scaffold in article-content.ts, which is why this file exists
 * from the moment the course id is registered in index.ts: a missing module is
 * not a degraded lesson, it is a module-not-found that takes the whole app down
 * on the login screen.
 */

import type { CourseCurriculum } from "./types";

const curriculum: CourseCurriculum = {
  /* ===================================================================== */
  5094: {
    topicId: 5094,
    title: "The six sounds that decide whether you are understood",
    summary:
      "German pronunciation is regular, which means six rules cover almost everything. Get these and strangers stop asking you to repeat yourself.",
    concepts: ["Umlaut", "Ich-Laut", "Final devoicing", "Letter z", "Letter w"],
    glossary: {
      Umlaut: "The two dots over a, o or u, which change the vowel into a different sound rather than decorating it.",
      "Ich-Laut": "The soft hissing ch after i, e, ö, ü and consonants, made at the front of the mouth.",
      "Ach-Laut": "The harder ch after a, o and u, made at the back of the throat.",
      "Final devoicing": "German b, d and g at the end of a word are pronounced p, t and k.",
      "Letter z": "Always pronounced ts in German, never like an English z.",
      "Letter w": "Pronounced like an English v. The English w sound does not exist in German.",
    },
    body: {
      Beginner: `<p>German has a handful of sounds English does not. Get these six roughly right and you will be understood; get them wrong and people will ask you to repeat yourself.</p>
<figure>
<svg viewBox="0 0 1000 540" role="img" aria-label="Six German sounds that change meaning, each with the English habit that gets it wrong">
<rect x="24" y="40" width="300" height="140" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="50" y="92" font-size="34" font-weight="800" fill="#7c3aed">ue</text>
<text x="50" y="136" font-size="27" font-weight="800" fill="currentColor">Muetter, ueber</text>
<text x="50" y="168" font-size="26" fill="currentColor" opacity="0.75">round lips, say ee</text>
<rect x="350" y="40" width="300" height="140" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="376" y="92" font-size="34" font-weight="800" fill="#0369a1">oe</text>
<text x="376" y="136" font-size="27" font-weight="800" fill="currentColor">schoen, moechte</text>
<text x="376" y="168" font-size="26" fill="currentColor" opacity="0.75">round lips, say ay</text>
<rect x="676" y="40" width="300" height="140" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="702" y="92" font-size="34" font-weight="800" fill="#0f766e">ae</text>
<text x="702" y="136" font-size="27" font-weight="800" fill="currentColor">Vaeter, spaet</text>
<text x="702" y="168" font-size="26" fill="currentColor" opacity="0.75">like e in bed</text>
<rect x="24" y="200" width="300" height="140" rx="14" fill="#b45309" opacity="0.14"/>
<text x="50" y="252" font-size="34" font-weight="800" fill="#b45309">ch soft</text>
<text x="50" y="296" font-size="27" font-weight="800" fill="currentColor">ich, nicht</text>
<text x="50" y="328" font-size="26" fill="currentColor" opacity="0.75">not ik, ever</text>
<rect x="350" y="200" width="300" height="140" rx="14" fill="#be123c" opacity="0.14"/>
<text x="376" y="252" font-size="34" font-weight="800" fill="#be123c">ch hard</text>
<text x="376" y="296" font-size="27" font-weight="800" fill="currentColor">Buch, acht</text>
<text x="376" y="328" font-size="26" fill="currentColor" opacity="0.75">after a, o, u</text>
<rect x="676" y="200" width="300" height="140" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="702" y="252" font-size="34" font-weight="800" fill="#7c3aed">final r</text>
<text x="702" y="296" font-size="27" font-weight="800" fill="currentColor">Vater, aber</text>
<text x="702" y="328" font-size="26" fill="currentColor" opacity="0.75">becomes a vowel</text>
<rect x="24" y="372" width="952" height="146" rx="16" fill="#0f766e" opacity="0.13"/>
<text x="500" y="422" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">Four of the six do not exist in English.</text>
<text x="500" y="468" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">So your mouth will substitute the nearest English sound</text>
<text x="500" y="502" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">automatically, and you will not hear yourself do it.</text>
</svg>
<figcaption><strong>These six carry almost the whole of a foreign accent in German.</strong> They are worth more practice than any amount of vocabulary, because a listener forgives a missing word and struggles with a word they cannot identify.</figcaption>
</figure>
<h3>How to make the hard three</h3>
<table>
<tr><th>Sound</th><th>Do this</th></tr>
<tr><td>ue</td><td>Round your lips for oo, then say ee without moving them</td></tr>
<tr><td>oe</td><td>Round your lips for oh, then say ay without moving them</td></tr>
<tr><td>ae</td><td>Just the e in bed, held a little longer</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Listen before you speak</span><p>You cannot correct a difference you cannot hear. Play a pair like Mutter and Muetter several times until the two sound obviously different to you, then try producing them.</p></div>
<div class="warning"><span class="callout-label">The ich sound is the big one</span><p>Saying ik instead of ich marks every sentence you speak, because the word appears in nearly all of them. Start to say the y in yes, then blow air instead of making a sound.</p></div>`,
      Intermediate: `<p>These sounds are not decoration. Four of them change the meaning of words, so a listener who mishears one has to reconstruct your sentence from context.</p>
<figure>
<svg viewBox="0 0 1000 540" role="img" aria-label="Six German sounds that change meaning, each with the English habit that gets it wrong">
<rect x="24" y="40" width="300" height="140" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="50" y="92" font-size="34" font-weight="800" fill="#7c3aed">ue</text>
<text x="50" y="136" font-size="27" font-weight="800" fill="currentColor">Muetter, ueber</text>
<text x="50" y="168" font-size="26" fill="currentColor" opacity="0.75">round lips, say ee</text>
<rect x="350" y="40" width="300" height="140" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="376" y="92" font-size="34" font-weight="800" fill="#0369a1">oe</text>
<text x="376" y="136" font-size="27" font-weight="800" fill="currentColor">schoen, moechte</text>
<text x="376" y="168" font-size="26" fill="currentColor" opacity="0.75">round lips, say ay</text>
<rect x="676" y="40" width="300" height="140" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="702" y="92" font-size="34" font-weight="800" fill="#0f766e">ae</text>
<text x="702" y="136" font-size="27" font-weight="800" fill="currentColor">Vaeter, spaet</text>
<text x="702" y="168" font-size="26" fill="currentColor" opacity="0.75">like e in bed</text>
<rect x="24" y="200" width="300" height="140" rx="14" fill="#b45309" opacity="0.14"/>
<text x="50" y="252" font-size="34" font-weight="800" fill="#b45309">ch soft</text>
<text x="50" y="296" font-size="27" font-weight="800" fill="currentColor">ich, nicht</text>
<text x="50" y="328" font-size="26" fill="currentColor" opacity="0.75">not ik, ever</text>
<rect x="350" y="200" width="300" height="140" rx="14" fill="#be123c" opacity="0.14"/>
<text x="376" y="252" font-size="34" font-weight="800" fill="#be123c">ch hard</text>
<text x="376" y="296" font-size="27" font-weight="800" fill="currentColor">Buch, acht</text>
<text x="376" y="328" font-size="26" fill="currentColor" opacity="0.75">after a, o, u</text>
<rect x="676" y="200" width="300" height="140" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="702" y="252" font-size="34" font-weight="800" fill="#7c3aed">final r</text>
<text x="702" y="296" font-size="27" font-weight="800" fill="currentColor">Vater, aber</text>
<text x="702" y="328" font-size="26" fill="currentColor" opacity="0.75">becomes a vowel</text>
<rect x="24" y="372" width="952" height="146" rx="16" fill="#0f766e" opacity="0.13"/>
<text x="500" y="422" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">Four of the six do not exist in English.</text>
<text x="500" y="468" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">So your mouth will substitute the nearest English sound</text>
<text x="500" y="502" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">automatically, and you will not hear yourself do it.</text>
</svg>
<figcaption><strong>These six carry almost the whole of a foreign accent in German.</strong> They are worth more practice than any amount of vocabulary, because a listener forgives a missing word and struggles with a word they cannot identify.</figcaption>
</figure>
<h3>Pairs that differ only in the sound</h3>
<table>
<tr><th>Pair</th><th>Means</th></tr>
<tr><td>Mutter / Muetter</td><td>mother / mothers</td></tr>
<tr><td>schon / schoen</td><td>already / beautiful</td></tr>
<tr><td>mochte / moechte</td><td>liked / would like</td></tr>
<tr><td>Kirche / Kirsche</td><td>church / cherry</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Which ch you use is decided by the vowel before it</span><p>After a, o and u it is the hard sound from the back of the throat. Everywhere else it is the soft one. It is a rule rather than a judgement, so it can simply be learned.</p></div>
<div class="warning"><span class="callout-label">The vanishing r is the one nobody teaches</span><p>An r at the end of a syllable is not pronounced as a consonant at all. Vater ends in something close to a short a. Producing an English r there is one of the strongest accent markers in the language, and it is easy to fix once you notice it.</p></div>`,
      Advanced: `<p>The reason these are hard is mechanical rather than mysterious: adult learners perceive unfamiliar sounds through the categories of their first language, so a new sound gets filed as the nearest familiar one and produced that way.</p>
<figure>
<svg viewBox="0 0 1000 540" role="img" aria-label="Six German sounds that change meaning, each with the English habit that gets it wrong">
<rect x="24" y="40" width="300" height="140" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="50" y="92" font-size="34" font-weight="800" fill="#7c3aed">ue</text>
<text x="50" y="136" font-size="27" font-weight="800" fill="currentColor">Muetter, ueber</text>
<text x="50" y="168" font-size="26" fill="currentColor" opacity="0.75">round lips, say ee</text>
<rect x="350" y="40" width="300" height="140" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="376" y="92" font-size="34" font-weight="800" fill="#0369a1">oe</text>
<text x="376" y="136" font-size="27" font-weight="800" fill="currentColor">schoen, moechte</text>
<text x="376" y="168" font-size="26" fill="currentColor" opacity="0.75">round lips, say ay</text>
<rect x="676" y="40" width="300" height="140" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="702" y="92" font-size="34" font-weight="800" fill="#0f766e">ae</text>
<text x="702" y="136" font-size="27" font-weight="800" fill="currentColor">Vaeter, spaet</text>
<text x="702" y="168" font-size="26" fill="currentColor" opacity="0.75">like e in bed</text>
<rect x="24" y="200" width="300" height="140" rx="14" fill="#b45309" opacity="0.14"/>
<text x="50" y="252" font-size="34" font-weight="800" fill="#b45309">ch soft</text>
<text x="50" y="296" font-size="27" font-weight="800" fill="currentColor">ich, nicht</text>
<text x="50" y="328" font-size="26" fill="currentColor" opacity="0.75">not ik, ever</text>
<rect x="350" y="200" width="300" height="140" rx="14" fill="#be123c" opacity="0.14"/>
<text x="376" y="252" font-size="34" font-weight="800" fill="#be123c">ch hard</text>
<text x="376" y="296" font-size="27" font-weight="800" fill="currentColor">Buch, acht</text>
<text x="376" y="328" font-size="26" fill="currentColor" opacity="0.75">after a, o, u</text>
<rect x="676" y="200" width="300" height="140" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="702" y="252" font-size="34" font-weight="800" fill="#7c3aed">final r</text>
<text x="702" y="296" font-size="27" font-weight="800" fill="currentColor">Vater, aber</text>
<text x="702" y="328" font-size="26" fill="currentColor" opacity="0.75">becomes a vowel</text>
<rect x="24" y="372" width="952" height="146" rx="16" fill="#0f766e" opacity="0.13"/>
<text x="500" y="422" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">Four of the six do not exist in English.</text>
<text x="500" y="468" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">So your mouth will substitute the nearest English sound</text>
<text x="500" y="502" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">automatically, and you will not hear yourself do it.</text>
</svg>
<figcaption><strong>These six carry almost the whole of a foreign accent in German.</strong> They are worth more practice than any amount of vocabulary, because a listener forgives a missing word and struggles with a word they cannot identify.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">Which is why perception training comes first</span><p>Minimal pair listening, where the only task is to say which of two words you heard, builds the category. Production practice before the category exists is practising the substitution, and repetition makes the wrong version more automatic rather than less.</p></div>
<h3>Rounding is the feature doing the work</h3>
<p>The front rounded vowels combine a tongue position English uses with a lip position English never combines it with. That is the whole difficulty, and it is why the instruction to hold the lip shape and change only the tongue works better than any amount of imitation.</p>
<h3>Final devoicing is systematic</h3>
<p>Final b, d and g are said as p, t and k. Tag ends in a k sound, Hund in a t. The spelling keeps the voiced letter because the plural restores it: Tage and Hunde have a real g and d. One rule, hundreds of words.</p>`,
      Expert: `<p>Worth being honest about the ceiling: adult learners rarely reach native pronunciation, and intelligibility rather than nativeness is the sensible target. The distinction matters because it tells you where to spend effort.</p>
<figure>
<svg viewBox="0 0 1000 540" role="img" aria-label="Six German sounds that change meaning, each with the English habit that gets it wrong">
<rect x="24" y="40" width="300" height="140" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="50" y="92" font-size="34" font-weight="800" fill="#7c3aed">ue</text>
<text x="50" y="136" font-size="27" font-weight="800" fill="currentColor">Muetter, ueber</text>
<text x="50" y="168" font-size="26" fill="currentColor" opacity="0.75">round lips, say ee</text>
<rect x="350" y="40" width="300" height="140" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="376" y="92" font-size="34" font-weight="800" fill="#0369a1">oe</text>
<text x="376" y="136" font-size="27" font-weight="800" fill="currentColor">schoen, moechte</text>
<text x="376" y="168" font-size="26" fill="currentColor" opacity="0.75">round lips, say ay</text>
<rect x="676" y="40" width="300" height="140" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="702" y="92" font-size="34" font-weight="800" fill="#0f766e">ae</text>
<text x="702" y="136" font-size="27" font-weight="800" fill="currentColor">Vaeter, spaet</text>
<text x="702" y="168" font-size="26" fill="currentColor" opacity="0.75">like e in bed</text>
<rect x="24" y="200" width="300" height="140" rx="14" fill="#b45309" opacity="0.14"/>
<text x="50" y="252" font-size="34" font-weight="800" fill="#b45309">ch soft</text>
<text x="50" y="296" font-size="27" font-weight="800" fill="currentColor">ich, nicht</text>
<text x="50" y="328" font-size="26" fill="currentColor" opacity="0.75">not ik, ever</text>
<rect x="350" y="200" width="300" height="140" rx="14" fill="#be123c" opacity="0.14"/>
<text x="376" y="252" font-size="34" font-weight="800" fill="#be123c">ch hard</text>
<text x="376" y="296" font-size="27" font-weight="800" fill="currentColor">Buch, acht</text>
<text x="376" y="328" font-size="26" fill="currentColor" opacity="0.75">after a, o, u</text>
<rect x="676" y="200" width="300" height="140" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="702" y="252" font-size="34" font-weight="800" fill="#7c3aed">final r</text>
<text x="702" y="296" font-size="27" font-weight="800" fill="currentColor">Vater, aber</text>
<text x="702" y="328" font-size="26" fill="currentColor" opacity="0.75">becomes a vowel</text>
<rect x="24" y="372" width="952" height="146" rx="16" fill="#0f766e" opacity="0.13"/>
<text x="500" y="422" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">Four of the six do not exist in English.</text>
<text x="500" y="468" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">So your mouth will substitute the nearest English sound</text>
<text x="500" y="502" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">automatically, and you will not hear yourself do it.</text>
</svg>
<figcaption><strong>These six carry almost the whole of a foreign accent in German.</strong> They are worth more practice than any amount of vocabulary, because a listener forgives a missing word and struggles with a word they cannot identify.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">Spend it on contrasts that carry meaning</span><p>Fixing ue and oe buys intelligibility, because they distinguish words. Polishing the exact quality of an unstressed vowel buys very little. A learner who prioritises by functional load improves faster in the way listeners actually notice.</p></div>
<h3>Prosody is underrated relative to segments</h3>
<p>Stress placement and sentence rhythm affect comprehension at least as much as individual sounds, and they are less often practised. German compound words carry stress on the first element, and getting that wrong can make a familiar word unrecognisable even when every sound in it is correct.</p>
<h3>Regional variation is real and permissive</h3>
<p>The soft ch, the final r and the uvular or rolled r all vary substantially across the German-speaking area, and all of those variants are native. This is liberating for a learner: there is no single correct target for several of the hardest features, and approximating any established variant is fine.</p>
<div class="field"><span class="callout-label">Record yourself, because you cannot hear yourself live</span><p>Speaking and monitoring at the same time is genuinely difficult, and most learners are unaware of substitutions they make consistently. A recording played back a day later is the cheapest diagnostic available, and it is the one almost nobody does.</p></div>`,
    },
    speaking: [
      {
        n: 1,
        kind: "read-aloud",
        title: "Six sounds in one sentence",
        level: "CEFR A1",
        lang: "de-DE",
        prompt: `<p>This one sentence contains five of the six rules from this lesson. Hear it, then read it aloud.</p>
<p>You will be scored word by word, so you can see which sounds to work on rather than being handed one number for the whole thing. A strong accent is fine. Sounds that change the word are not.</p>
<p>Say it three or four times before you record. The muscles have to learn this, and reading it silently does not train them.</p>`,
        target: "Ich möchte bitte zwei Brötchen und eine Tüte Milch.",
        focusSounds: [
          {
            grapheme: "ö",
            note: "Round your lips as if for o, then say e without moving them. Saying a plain o turns möchte, meaning would like, into mochte, meaning wanted to.",
          },
          {
            grapheme: "ü",
            note: "Lips rounded as for u, tongue forward as for i. A plain u makes Tüte sound like Tute, which is not a word.",
          },
          {
            grapheme: "ch",
            note: "After i and ö this is a soft hiss at the front of the mouth, like the start of the English huge. Saying Milch with a k is the single most recognisable foreign accent in German.",
          },
          {
            grapheme: "z",
            note: "Always ts, never an English z. Zwei is tsvai.",
          },
          {
            grapheme: "w",
            note: "Pronounced like an English v. There is no English w sound in German, so zwei ends vai rather than way.",
          },
          {
            grapheme: "ei",
            note: "Pronounced like English eye. The partner rule is that ie is pronounced ee, which is the reverse of what English spelling suggests.",
          },
        ],
        seconds: 15,
        rubric: [
          {
            key: "vowels",
            label: "Front rounded vowels",
            bands: [
              "ö and ü are produced as plain o and u, changing the words",
              "One of the two is attempted, the other is replaced",
              "Both are recognisably rounded and front, though not native",
              "Both clearly distinct from their unrounded partners, so möchte and mochte would not be confused",
            ],
            weight: 3,
          },
          {
            key: "ch",
            label: "The ch sound",
            bands: [
              "Produced as k throughout",
              "Attempted but inconsistent between words",
              "Produced as a fricative in every position",
              "Front Ich-Laut after i and ö, consistently, with no k substitution anywhere",
            ],
            weight: 3,
          },
          {
            key: "consonants",
            label: "z and w",
            bands: [
              "z as English z and w as English w",
              "One of the two correct",
              "Both correct: z as ts, w as v",
              "Both correct and fluent, with the zw cluster produced without inserting a vowel between them",
            ],
            weight: 2,
          },
          {
            key: "flow",
            label: "Delivery",
            bands: [
              "Word by word, with long pauses",
              "Hesitant but continuous",
              "Spoken as one sentence at a workable pace",
              "Natural phrasing with stress on the first syllable of the content words, which is where German puts it",
            ],
            weight: 2,
          },
        ],
        skills: ["Umlaut", "Ich-Laut", "Letter z", "Letter w"],
      },
    ],
    decks: [
      {
        n: 1,
        title: "Minimal pairs: the sounds that change the word",
        blurb:
          "Each card is two German words differing in one sound. Hear the difference before you try to produce it, because you cannot monitor a contrast you cannot perceive.",
        mode: "flip",
        lang: "de-DE",
        cards: [
          { id: 1, front: "Mutter / Mütter", back: "mother / mothers", extra: { "Sound": "u against ü: same length, lips rounded and tongue forward for the second", "In use": "Meine Mutter is one person. Die Mütter is the whole group of them.", "Get it wrong": "You have said the wrong number of people, and nothing else in the sentence corrects you" }, hint: "Round your lips for u, then say ee without moving them", tags: ["Umlaut"] },
          { id: 2, front: "schon / schön", back: "already / beautiful", extra: { "Sound": "o against ö", "In use": "Ich bin schon da means I am already here. Das ist schön means that is lovely.", "Get it wrong": "Two completely unrelated words, and both fit the same sentence slot" }, hint: "Say the o, then say ay with the lips still rounded", tags: ["Umlaut"] },
          { id: 3, front: "Vater / Väter", back: "father / fathers", extra: { "Sound": "a against ä, where ä is close to the e in bed", "In use": "Mein Vater, but die Väter in the plural", "Get it wrong": "Plural again. German marks a great many plurals with nothing but this vowel." }, hint: "The umlaut fronts the vowel; it does not lengthen it", tags: ["Umlaut"] },
          { id: 4, front: "mochte / möchte", back: "wanted to / would like", extra: { "Sound": "o against ö", "In use": "Ich möchte einen Kaffee is how you order. Ich mochte Kaffee means you used to like it.", "Get it wrong": "You have switched a polite request into a remark about the past, at a counter" }, hint: "This is the pair you will use most often in a shop", tags: ["Umlaut"] },
          { id: 5, front: "Mann / man", back: "man / one (impersonal)", extra: { "Sound": "Identical. There is no audible difference at all.", "In use": "Der Mann sagt is the man says. Man sagt is people say, or it is said.", "Get it wrong": "Only the article and the verb tell them apart, so this one is grammar, not ears" }, hint: "If there is no article in front of it, it is the impersonal one", tags: ["Listening"] },
          { id: 6, front: "Bier / Bär", back: "beer / bear", extra: { "Sound": "ie is a long ee; ä here is a long e as in bear", "In use": "Ein Bier, bitte. Not something you want to get wrong in a bar.", "Get it wrong": "Memorable, and the single most told joke about learners of German" }, hint: "ie always gives you the second letter: ee", tags: ["Vowels"] },
          { id: 7, front: "mein / Mien", back: "my / (not a word, but read it anyway)", extra: { "Rule": "ei is pronounced eye; ie is pronounced ee. Each digraph is said as its second letter.", "In use": "mein Name is myn, die Miene is meena", "Get it wrong": "This is the reverse of English intuition and it affects hundreds of common words" }, hint: "Say the second vowel of the pair, every time", tags: ["Vowels"] },
          { id: 8, front: "Kirche / Kirsche", back: "church / cherry", extra: { "Sound": "ch is the soft front sound; sch is the English sh", "In use": "Die Kirche ist alt, but Ich mag Kirschen", "Get it wrong": "A whole extra consonant, and a word that is not remotely related" }, hint: "If you can hear an s before it, it is the fruit", tags: ["Consonants"] },
          { id: 9, front: "Tag", back: "day, ending in a k sound", extra: { "Rule": "Final devoicing: b, d and g are said as p, t and k at the end of a word or syllable", "Contrast": "Tage has a real g, because the ending moves it into the next syllable", "Get it wrong": "Guten Tag said with a hard English g is the first thing a listener notices" }, hint: "It is spelled with a g and said with a k", tags: ["Devoicing"] },
          { id: 10, front: "Hund", back: "dog, ending in a t sound", extra: { "Rule": "Final devoicing again", "Contrast": "Hunde has the d back, for the same reason Tage does", "Get it wrong": "Consistent across the language, so getting the rule fixes many words at once" }, hint: "Same rule as Tag, one letter further along the alphabet", tags: ["Devoicing"] },
          { id: 11, front: "Zeit", back: "time, pronounced tsait", extra: { "Rule": "z is always ts, never the English z", "In use": "Zehn, Zug, Zimmer, zusammen: all of them start with ts", "Get it wrong": "An English z marks you out instantly and appears in very common words" }, hint: "Think of the ts at the end of cats", tags: ["Consonants"] },
          { id: 12, front: "Wasser", back: "water, pronounced vasser", extra: { "Rule": "w is v", "In use": "Wein is vine, Wagen is vaagen, wo is vo", "Get it wrong": "Pairs with the next card: the two letters have effectively swapped jobs" }, hint: "w and v are not where English puts them", tags: ["Consonants"] },
          { id: 13, front: "Vogel", back: "bird, pronounced fogel", extra: { "Rule": "v is usually f in native German words", "Contrast": "In borrowed words such as Vase it stays a v, which is the only real exception", "Get it wrong": "Vater, viel, von and vier are all extremely common and all take f" }, hint: "Native word, f sound. Borrowed word, v sound.", tags: ["Consonants"] },
          { id: 14, front: "ich", back: "I, with the soft front ch", extra: { "Sound": "Tongue high and forward, air hissing over it. Closer to the h in huge than to a k.", "Warning": "Not ik. This is the most recognisable accent marker in the language.", "Get it wrong": "You will say this word in nearly every sentence you ever speak" }, hint: "Start to say yes, then blow instead of voicing it", tags: ["Ich-Laut"] },
          { id: 15, front: "Buch", back: "book, with the hard back ch", extra: { "Rule": "After a, o and u the ch moves to the back of the throat", "Contrast": "Compare Buch with ich: same two letters, two genuinely different sounds", "Get it wrong": "Using the front sound here is less damaging than the reverse, but still audible" }, hint: "The vowel before it decides which ch you get", tags: ["Ach-Laut"] },
          { id: 16, front: "Vater", back: "father, ending in a vowel sound and not an r", extra: { "Rule": "An r at the end of a syllable vocalises, becoming something close to a short a", "In use": "Vater, Mutter, Wasser, aber: none of them ends in a consonant you can hear", "Get it wrong": "An English r here is one of the two or three strongest foreign accent markers" }, hint: "Let the r collapse into a vowel rather than curling your tongue", tags: ["The r"] },
        ],
        skills: ["Umlaut", "Ich-Laut", "Final devoicing"],
      },
    ],
  },

  /* ===================================================================== */
  5095: {
    topicId: 5095,
    title: "Introducing yourself and asking back",
    summary:
      "The first forty seconds of every conversation you will have in German. Learn it as a block, not as grammar.",
    concepts: ["Sich vorstellen", "Verb conjugation", "W-question", "Woher", "Wohnen"],
    glossary: {
      "Sich vorstellen": "To introduce oneself. The reflexive verb that names this whole routine.",
      "Verb conjugation": "Changing the verb ending to match the subject: ich heiße, du heißt, er heißt.",
      "W-question": "A question starting with a w word such as wie, woher, wo, was. The verb comes second.",
      Woher: "From where. Answered with aus plus a country or city.",
      Wohnen: "To live, in the sense of residing somewhere. Answered with in plus a place.",
      "Und Sie?": "And you? The two words that turn a statement into a conversation.",
    },
    body: {
      Beginner: `<p>A first conversation is a small number of fixed phrases. Learn them as whole units rather than assembling them word by word.</p>
<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="A first exchange, with the move that keeps it going">
<rect x="24" y="40" width="620" height="92" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="52" y="84" font-size="30" font-weight="800" fill="currentColor">Guten Tag, ich heisse Anna.</text>
<text x="52" y="118" font-size="26" fill="currentColor" opacity="0.75">Hello, my name is Anna.</text>
<rect x="356" y="152" width="620" height="92" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="384" y="196" font-size="30" font-weight="800" fill="currentColor">Freut mich. Ich bin Jonas.</text>
<text x="384" y="230" font-size="26" fill="currentColor" opacity="0.75">Pleased to meet you. I am Jonas.</text>
<rect x="24" y="264" width="620" height="92" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="52" y="308" font-size="30" font-weight="800" fill="currentColor">Woher kommen Sie?</text>
<text x="52" y="342" font-size="26" fill="currentColor" opacity="0.75">Where are you from?</text>
<rect x="24" y="386" width="952" height="114" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="500" y="432" font-size="30" font-weight="800" fill="#0f766e" text-anchor="middle">The third line is the whole skill.</text>
<text x="500" y="474" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">Answering is easy. Asking back is what makes a conversation.</text>
</svg>
<figcaption><strong>Most learners prepare their own answers and nothing else.</strong> Then the exchange stops dead after two lines, because the other person has answered and is waiting. Having two questions ready to hand back is worth more than a longer self-introduction.</figcaption>
</figure>
<h3>The lines you need</h3>
<table>
<tr><th>German</th><th>English</th></tr>
<tr><td>Guten Tag</td><td>Hello, during the day</td></tr>
<tr><td>Ich heisse ...</td><td>My name is ...</td></tr>
<tr><td>Freut mich</td><td>Pleased to meet you</td></tr>
<tr><td>Woher kommen Sie?</td><td>Where are you from?</td></tr>
<tr><td>Ich komme aus Indien</td><td>I am from India</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Ask back</span><p>Und Sie? means and you? It is two words and it doubles the length of every conversation you have.</p></div>
<div class="warning"><span class="callout-label">Use Sie with anyone you have just met</span><p>Unless they are a child. Getting this wrong is the one social mistake that is actually noticed.</p></div>`,
      Intermediate: `<p>Introductions are formulaic in every language, and the value of the formula is that it frees your attention for listening.</p>
<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="A first exchange, with the move that keeps it going">
<rect x="24" y="40" width="620" height="92" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="52" y="84" font-size="30" font-weight="800" fill="currentColor">Guten Tag, ich heisse Anna.</text>
<text x="52" y="118" font-size="26" fill="currentColor" opacity="0.75">Hello, my name is Anna.</text>
<rect x="356" y="152" width="620" height="92" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="384" y="196" font-size="30" font-weight="800" fill="currentColor">Freut mich. Ich bin Jonas.</text>
<text x="384" y="230" font-size="26" fill="currentColor" opacity="0.75">Pleased to meet you. I am Jonas.</text>
<rect x="24" y="264" width="620" height="92" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="52" y="308" font-size="30" font-weight="800" fill="currentColor">Woher kommen Sie?</text>
<text x="52" y="342" font-size="26" fill="currentColor" opacity="0.75">Where are you from?</text>
<rect x="24" y="386" width="952" height="114" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="500" y="432" font-size="30" font-weight="800" fill="#0f766e" text-anchor="middle">The third line is the whole skill.</text>
<text x="500" y="474" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">Answering is easy. Asking back is what makes a conversation.</text>
</svg>
<figcaption><strong>Most learners prepare their own answers and nothing else.</strong> Then the exchange stops dead after two lines, because the other person has answered and is waiting. Having two questions ready to hand back is worth more than a longer self-introduction.</figcaption>
</figure>
<h3>Two ways to give your name</h3>
<table>
<tr><th>Form</th><th>Register</th></tr>
<tr><td>Ich heisse Anna</td><td>Neutral, very common</td></tr>
<tr><td>Mein Name ist Anna Schmidt</td><td>More formal, official settings</td></tr>
<tr><td>Ich bin Anna</td><td>Casual</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Occupation needs no article</span><p>Ich bin Ingenieur, not ein Ingenieur. German drops the article for professions, which is one of the few places it uses fewer words than English.</p></div>
<div class="warning"><span class="callout-label">Watch the verb position</span><p>Woher kommen Sie? puts the verb second, after the question word. Ich komme aus Indien puts it second as well. The rule is the same in both, and it is the rule the whole course keeps returning to.</p></div>`,
      Advanced: `<p>What distinguishes a fluent-sounding introduction is not vocabulary but turn management: knowing how to hand the conversation back and how to signal that you did not catch something.</p>
<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="A first exchange, with the move that keeps it going">
<rect x="24" y="40" width="620" height="92" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="52" y="84" font-size="30" font-weight="800" fill="currentColor">Guten Tag, ich heisse Anna.</text>
<text x="52" y="118" font-size="26" fill="currentColor" opacity="0.75">Hello, my name is Anna.</text>
<rect x="356" y="152" width="620" height="92" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="384" y="196" font-size="30" font-weight="800" fill="currentColor">Freut mich. Ich bin Jonas.</text>
<text x="384" y="230" font-size="26" fill="currentColor" opacity="0.75">Pleased to meet you. I am Jonas.</text>
<rect x="24" y="264" width="620" height="92" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="52" y="308" font-size="30" font-weight="800" fill="currentColor">Woher kommen Sie?</text>
<text x="52" y="342" font-size="26" fill="currentColor" opacity="0.75">Where are you from?</text>
<rect x="24" y="386" width="952" height="114" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="500" y="432" font-size="30" font-weight="800" fill="#0f766e" text-anchor="middle">The third line is the whole skill.</text>
<text x="500" y="474" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">Answering is easy. Asking back is what makes a conversation.</text>
</svg>
<figcaption><strong>Most learners prepare their own answers and nothing else.</strong> Then the exchange stops dead after two lines, because the other person has answered and is waiting. Having two questions ready to hand back is worth more than a longer self-introduction.</figcaption>
</figure>
<table>
<tr><th>Move</th><th>Phrase</th></tr>
<tr><td>Hand it back</td><td>Und Sie?</td></tr>
<tr><td>Ask for a repeat</td><td>Wie bitte?</td></tr>
<tr><td>Ask for slower</td><td>Koennen Sie bitte langsamer sprechen?</td></tr>
<tr><td>Buy thinking time</td><td>Also ... Moment ...</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Filler words are a skill, not a flaw</span><p>Also, naja and Moment mal give you a second to compose and they sound native. Silence while you assemble a sentence reads as not having understood, and the other person will switch to English to help you.</p></div>
<h3>Small talk has narrower bounds than in English</h3>
<p>Weather, travel and work are safe. Direct questions about income, politics or religion on first meeting are not, and personal questions generally arrive later than an English speaker expects. This is a register difference rather than coldness.</p>`,
      Expert: `<p>The interesting problem at this level is the switch to English. Germans in cities often speak excellent English and will switch the moment they detect effort, which removes exactly the practice you came for.</p>
<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="A first exchange, with the move that keeps it going">
<rect x="24" y="40" width="620" height="92" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="52" y="84" font-size="30" font-weight="800" fill="currentColor">Guten Tag, ich heisse Anna.</text>
<text x="52" y="118" font-size="26" fill="currentColor" opacity="0.75">Hello, my name is Anna.</text>
<rect x="356" y="152" width="620" height="92" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="384" y="196" font-size="30" font-weight="800" fill="currentColor">Freut mich. Ich bin Jonas.</text>
<text x="384" y="230" font-size="26" fill="currentColor" opacity="0.75">Pleased to meet you. I am Jonas.</text>
<rect x="24" y="264" width="620" height="92" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="52" y="308" font-size="30" font-weight="800" fill="currentColor">Woher kommen Sie?</text>
<text x="52" y="342" font-size="26" fill="currentColor" opacity="0.75">Where are you from?</text>
<rect x="24" y="386" width="952" height="114" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="500" y="432" font-size="30" font-weight="800" fill="#0f766e" text-anchor="middle">The third line is the whole skill.</text>
<text x="500" y="474" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">Answering is easy. Asking back is what makes a conversation.</text>
</svg>
<figcaption><strong>Most learners prepare their own answers and nothing else.</strong> Then the exchange stops dead after two lines, because the other person has answered and is waiting. Having two questions ready to hand back is worth more than a longer self-introduction.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">What actually prevents the switch</span><p>Fluency signals rather than accuracy. A short, confidently delivered sentence with filler words keeps the conversation in German; a grammatically perfect sentence delivered after a four second pause does not. Saying up front that you are learning and would like to practise works, and most people are happy to oblige once asked.</p></div>
<h3>Formulaic language is how fluency is built</h3>
<p>A great deal of natural speech in any language is prefabricated chunks retrieved whole rather than constructed. Learning Freut mich as one item costs nothing extra and frees working memory for the part of the sentence that is genuinely new. Learners who insist on building everything from rules sound slower and more effortful than their actual knowledge warrants.</p>
<h3>Names deserve preparation</h3>
<p>If yours is unfamiliar in German, decide in advance how you will say and spell it, and have the letter names ready. Being unable to spell your own name aloud is a surprisingly common stumble, and it happens at exactly the moment you want to be making a good impression.</p>`,
    },
    questions: [
      {
        n: 1,
        question: "Which is the normal way to give your name in conversation?",
        options: ["Ich heiße Priya", "Mein Name ist Priya", "Ich bin genannt Priya", "Ich habe Name Priya"],
        answer: 0,
        explanation:
          "Ich heiße is the ordinary spoken form. Mein Name ist is correct but belongs to formal introductions and telephone calls, and the other two are not German.",
        difficulty: "Easy",
        skill: "Sich vorstellen",
      },
      {
        n: 2,
        question: "Complete: Woher ___ Sie?",
        options: ["kommen", "kommst", "komme", "kommt"],
        answer: 0,
        explanation:
          "Sie takes the infinitive form of the verb, kommen. Kommst goes with du, komme with ich, and kommt with er, sie, es or ihr.",
        difficulty: "Easy",
        skill: "Verb conjugation",
      },
      {
        n: 3,
        question: "Which is correct for stating your occupation?",
        options: [
          "Ich bin Ingenieurin",
          "Ich bin eine Ingenieurin",
          "Ich bin ein Ingenieurin",
          "Ich habe Ingenieurin",
        ],
        answer: 0,
        explanation:
          "Occupations drop the article in German. The article comes back as soon as you modify the noun, so ich bin eine gute Ingenieurin is correct, which is the clue that the bare form names a category rather than an individual.",
        difficulty: "Medium",
        skill: "Sich vorstellen",
      },
      {
        n: 4,
        question: "In Woher kommen Sie, why does the verb come before Sie?",
        options: [
          "Because the verb must be the second element, and woher occupies the first",
          "Because all German questions invert",
          "Because woher is a preposition",
          "Because Sie is formal",
        ],
        answer: 0,
        explanation:
          "German puts the finite verb in second position whenever anything other than the subject comes first, not only in questions. A learner who memorises this as a question rule will get declaratives wrong the moment they start a sentence with an adverb.",
        difficulty: "Hard",
        skill: "W-question",
      },
      {
        n: 5,
        question: "Ich wohne in Berlin and ich lebe in Berlin differ because:",
        options: [
          "Wohnen is about your address, leben is about living in a broader sense",
          "Wohnen is formal and leben is informal",
          "They are completely interchangeable",
          "Leben is only used about animals",
        ],
        answer: 0,
        explanation:
          "Both are correct German and they are not equivalent. Wohnen states where you reside; leben says something about your life there. Learners tend to flatten the distinction and native speakers maintain it.",
        difficulty: "Hard",
        skill: "Wohnen",
      },
      {
        n: 6,
        question: "After answering three questions about yourself, the most important two words are:",
        options: ["Und Sie?", "Danke schön", "Auf Wiedersehen", "Wie bitte?"],
        answer: 0,
        explanation:
          "Handing the turn back is structurally expected, and a learner who answers and stops creates an awkwardness that reads as rudeness rather than as limited vocabulary. It is worth drilling to automaticity before any of the grammar is understood.",
        difficulty: "Medium",
        skill: "Sich vorstellen",
      },
      {
        n: 7,
        question: "Which question asks where somebody lives?",
        options: ["Wo wohnen Sie?", "Woher kommen Sie?", "Wie heißen Sie?", "Was machen Sie?"],
        answer: 0,
        explanation:
          "Wo asks where something is; woher asks where somebody is from. Confusing the two is common and produces an answer to a question nobody asked, because woher expects aus plus a country and wo expects in plus a place.",
        difficulty: "Medium",
        skill: "Woher",
      },
    ],
    speaking: [
      {
        n: 1,
        kind: "roleplay",
        title: "Meeting a colleague on your first morning",
        level: "CEFR A1",
        lang: "de-DE",
        prompt: `<p>It is your first day. A colleague introduces herself at the coffee machine. Hold your side of the conversation.</p>
<p>Listen to each of her turns, then record your whole side in one go. You will be marked on whether the exchange worked, not on whether you sounded German.</p>
<p>The one thing that will cost you marks even if everything else is right: answering her questions and never asking one back.</p>`,
        turns: [
          {
            speaker: "Frau Weber",
            line: "Guten Morgen! Ich heiße Sabine Weber. Und Sie?",
            translation: "Good morning. My name is Sabine Weber. And you?",
            expect: "Greet her back and give your name. Guten Morgen, ich heiße ...",
          },
          {
            speaker: "Frau Weber",
            line: "Freut mich. Woher kommen Sie?",
            translation: "Pleased to meet you. Where are you from?",
            expect: "Say where you are from with aus. Ich komme aus ...",
          },
          {
            speaker: "Frau Weber",
            line: "Interessant. Und wo wohnen Sie jetzt?",
            translation: "Interesting. And where do you live now?",
            expect: "Say where you live with in. Ich wohne in ...",
          },
          {
            speaker: "Frau Weber",
            line: "Schön. Was machen Sie hier bei uns?",
            translation: "Nice. What do you do here with us?",
            expect: "Give your job with no article. Ich bin ... And then ask her something back.",
          },
        ],
        mustMention: [
          "Your name, using ich heiße",
          "Where you are from, using komme aus",
          "Where you live, using wohne in",
          "Your occupation, with no article before it",
          "At least one question back to her, even just und Sie",
        ],
        seconds: 60,
        rubric: [
          {
            key: "task",
            label: "The conversation worked",
            bands: [
              "Several of her questions went unanswered or were answered with the wrong information",
              "Most questions answered, but no question asked back",
              "All four answered and at least one question returned",
              "All four answered, a question returned, and the register stayed with Sie throughout as the situation requires",
            ],
            weight: 3,
          },
          {
            key: "forms",
            label: "The right structures",
            bands: [
              "Verb forms and prepositions largely absent or wrong",
              "Some correct forms, with aus and in confused or the article kept before the occupation",
              "Correct verb forms with aus for origin and in for residence",
              "All of that plus the bare occupation, so ich bin Ingenieurin rather than eine Ingenieurin",
            ],
            weight: 3,
          },
          {
            key: "pronunciation",
            label: "Intelligibility",
            bands: [
              "Frequent sounds that change the word, so meaning is lost",
              "Understandable with effort",
              "Clearly understandable throughout",
              "Clear, with the ch and the umlauts distinct enough that no word is ambiguous",
            ],
            weight: 2,
          },
          {
            key: "fluency",
            label: "Delivery",
            bands: [
              "Long pauses, reading word by word",
              "Hesitant but gets through",
              "Reasonably continuous at a workable pace",
              "Continuous, with the whole exchange sounding like a conversation rather than four recited sentences",
            ],
            weight: 2,
          },
        ],
        skills: ["Sich vorstellen", "Verb conjugation", "Woher", "Wohnen"],
      },
    ],
  },
  /* ===================================================================== */
  5096: {
    topicId: 5096,
    title: "Numbers, spelling aloud and giving a phone number",
    summary:
      "The one skill you will need on your first phone call and in every shop. German says its two digit numbers backwards, and that catches everybody.",
    concepts: ["Zahlen", "Buchstabieren", "Telefonnummer", "Reversed tens", "Uhrzeit"],
    glossary: {
      Zahlen: "Numbers. The counting words themselves.",
      Buchstabieren: "To spell aloud, letter by letter. Asked for constantly with foreign names.",
      Telefonnummer: "A phone number, normally read in pairs of digits in German.",
      "Reversed tens": "German says the units before the tens: einundzwanzig is one-and-twenty.",
      Uhrzeit: "Clock time. Halb drei means half before three, which is 2:30 rather than 3:30.",
      Nummer: "A number as a label, such as a house or phone number, distinct from Zahl as a quantity.",
    },
    body: {
      Beginner: `<p>German numbers are said with the units before the tens. This is the single most common source of error when taking a phone number down.</p>
<figure>
<svg viewBox="0 0 1000 480" role="img" aria-label="German two digit numbers are said with the units before the tens">
<rect x="24" y="40" width="440" height="180" rx="16" fill="#be123c" opacity="0.14"/>
<text x="244" y="100" font-size="32" font-weight="800" fill="#be123c" text-anchor="middle">ENGLISH</text>
<text x="244" y="160" font-size="42" font-weight="800" fill="currentColor" text-anchor="middle">twenty-one</text>
<text x="244" y="200" font-size="27" fill="currentColor" opacity="0.8" text-anchor="middle">tens, then units</text>
<rect x="536" y="40" width="440" height="180" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="756" y="100" font-size="32" font-weight="800" fill="#0f766e" text-anchor="middle">GERMAN</text>
<text x="756" y="160" font-size="42" font-weight="800" fill="currentColor" text-anchor="middle">einundzwanzig</text>
<text x="756" y="200" font-size="27" fill="currentColor" opacity="0.8" text-anchor="middle">one and twenty</text>
<path d="M300 258 H700" stroke="currentColor" opacity="0.4" stroke-width="4"/>
<rect x="24" y="286" width="952" height="170" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="336" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">So you hear the last digit first.</text>
<text x="500" y="382" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">Writing 2 as soon as you hear zwei in zweiundvierzig</text>
<text x="500" y="416" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">gives you 24 when the answer was 42.</text>
<text x="500" y="448" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Wait for the whole word.</text>
</svg>
<figcaption><strong>This single reversal causes more wrong phone numbers than any other feature of the language.</strong> The habit to build is deliberately not writing anything until the number word has finished, which feels slow and is the only thing that works.</figcaption>
</figure>
<h3>The pattern</h3>
<table>
<tr><th>Number</th><th>German</th><th>Literally</th></tr>
<tr><td class="num">21</td><td>einundzwanzig</td><td>one and twenty</td></tr>
<tr><td class="num">42</td><td>zweiundvierzig</td><td>two and forty</td></tr>
<tr><td class="num">67</td><td>siebenundsechzig</td><td>seven and sixty</td></tr>
</table>
<div class="warning"><span class="callout-label">Do not start writing early</span><p>If you write the first digit you hear, you will reverse every two digit number. Wait for the whole word before your pen moves.</p></div>
<div class="key-idea"><span class="callout-label">Phone numbers are often said in pairs</span><p>So a number may arrive as a string of two digit groups, each one reversed. Asking for it digit by digit is completely normal: Koennen Sie das einzeln sagen?</p></div>`,
      Intermediate: `<p>Numbers, letters and times are the three things you will be asked to write down, and all three have traps that have nothing to do with vocabulary.</p>
<figure>
<svg viewBox="0 0 1000 480" role="img" aria-label="German two digit numbers are said with the units before the tens">
<rect x="24" y="40" width="440" height="180" rx="16" fill="#be123c" opacity="0.14"/>
<text x="244" y="100" font-size="32" font-weight="800" fill="#be123c" text-anchor="middle">ENGLISH</text>
<text x="244" y="160" font-size="42" font-weight="800" fill="currentColor" text-anchor="middle">twenty-one</text>
<text x="244" y="200" font-size="27" fill="currentColor" opacity="0.8" text-anchor="middle">tens, then units</text>
<rect x="536" y="40" width="440" height="180" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="756" y="100" font-size="32" font-weight="800" fill="#0f766e" text-anchor="middle">GERMAN</text>
<text x="756" y="160" font-size="42" font-weight="800" fill="currentColor" text-anchor="middle">einundzwanzig</text>
<text x="756" y="200" font-size="27" fill="currentColor" opacity="0.8" text-anchor="middle">one and twenty</text>
<path d="M300 258 H700" stroke="currentColor" opacity="0.4" stroke-width="4"/>
<rect x="24" y="286" width="952" height="170" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="336" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">So you hear the last digit first.</text>
<text x="500" y="382" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">Writing 2 as soon as you hear zwei in zweiundvierzig</text>
<text x="500" y="416" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">gives you 24 when the answer was 42.</text>
<text x="500" y="448" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Wait for the whole word.</text>
</svg>
<figcaption><strong>This single reversal causes more wrong phone numbers than any other feature of the language.</strong> The habit to build is deliberately not writing anything until the number word has finished, which feels slow and is the only thing that works.</figcaption>
</figure>
<h3>Spelling aloud</h3>
<p>German letter names differ from English in ways that matter: e sounds like English a, i sounds like English e, and j is yot. Confusing e and i when taking down an email address is the commonest error, and it is silent until the message bounces.</p>
<table>
<tr><th>Letter</th><th>Sounds like</th></tr>
<tr><td>a</td><td>ah</td></tr>
<tr><td>e</td><td>ay</td></tr>
<tr><td>i</td><td>ee</td></tr>
<tr><td>j</td><td>yot</td></tr>
<tr><td>v</td><td>fow</td></tr>
<tr><td>w</td><td>vay</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Read it back, every time</span><p>Repeating what you wrote is not a sign of weak German. It is what a native speaker does on the phone, and it catches the error while it is still free to fix.</p></div>`,
      Advanced: `<p>The difficulty is a working memory problem rather than a knowledge one. You are holding a partial number, parsing an inverted one, and writing at the same time.</p>
<figure>
<svg viewBox="0 0 1000 480" role="img" aria-label="German two digit numbers are said with the units before the tens">
<rect x="24" y="40" width="440" height="180" rx="16" fill="#be123c" opacity="0.14"/>
<text x="244" y="100" font-size="32" font-weight="800" fill="#be123c" text-anchor="middle">ENGLISH</text>
<text x="244" y="160" font-size="42" font-weight="800" fill="currentColor" text-anchor="middle">twenty-one</text>
<text x="244" y="200" font-size="27" fill="currentColor" opacity="0.8" text-anchor="middle">tens, then units</text>
<rect x="536" y="40" width="440" height="180" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="756" y="100" font-size="32" font-weight="800" fill="#0f766e" text-anchor="middle">GERMAN</text>
<text x="756" y="160" font-size="42" font-weight="800" fill="currentColor" text-anchor="middle">einundzwanzig</text>
<text x="756" y="200" font-size="27" fill="currentColor" opacity="0.8" text-anchor="middle">one and twenty</text>
<path d="M300 258 H700" stroke="currentColor" opacity="0.4" stroke-width="4"/>
<rect x="24" y="286" width="952" height="170" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="336" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">So you hear the last digit first.</text>
<text x="500" y="382" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">Writing 2 as soon as you hear zwei in zweiundvierzig</text>
<text x="500" y="416" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">gives you 24 when the answer was 42.</text>
<text x="500" y="448" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Wait for the whole word.</text>
</svg>
<figcaption><strong>This single reversal causes more wrong phone numbers than any other feature of the language.</strong> The habit to build is deliberately not writing anything until the number word has finished, which feels slow and is the only thing that works.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">Reduce the load rather than trying harder</span><p>Ask for digits individually, write in pairs, and read back. Each of those removes one thing you were holding in your head. Learners who try to simply concentrate harder fail in exactly the same place every time, because the constraint is capacity rather than effort.</p></div>
<h3>Times have two systems</h3>
<table>
<tr><th>Spoken</th><th>Means</th></tr>
<tr><td>halb drei</td><td>half past two, not half past three</td></tr>
<tr><td>viertel nach drei</td><td>quarter past three</td></tr>
<tr><td>viertel vor drei</td><td>quarter to three</td></tr>
<tr><td>vierzehn Uhr dreissig</td><td>14:30, official and unambiguous</td></tr>
</table>
<div class="warning"><span class="callout-label">halb drei is the one that costs you an hour</span><p>It means halfway to three, which is two thirty. English speakers reliably hear three thirty. For appointments, confirm in the twenty four hour form, where no ambiguity exists.</p></div>`,
      Expert: `<p>Inverted number naming is not a German eccentricity. It existed in English until relatively recently, which is why four and twenty blackbirds is a familiar line, and it survives in Dutch, Danish and Arabic among others.</p>
<figure>
<svg viewBox="0 0 1000 480" role="img" aria-label="German two digit numbers are said with the units before the tens">
<rect x="24" y="40" width="440" height="180" rx="16" fill="#be123c" opacity="0.14"/>
<text x="244" y="100" font-size="32" font-weight="800" fill="#be123c" text-anchor="middle">ENGLISH</text>
<text x="244" y="160" font-size="42" font-weight="800" fill="currentColor" text-anchor="middle">twenty-one</text>
<text x="244" y="200" font-size="27" fill="currentColor" opacity="0.8" text-anchor="middle">tens, then units</text>
<rect x="536" y="40" width="440" height="180" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="756" y="100" font-size="32" font-weight="800" fill="#0f766e" text-anchor="middle">GERMAN</text>
<text x="756" y="160" font-size="42" font-weight="800" fill="currentColor" text-anchor="middle">einundzwanzig</text>
<text x="756" y="200" font-size="27" fill="currentColor" opacity="0.8" text-anchor="middle">one and twenty</text>
<path d="M300 258 H700" stroke="currentColor" opacity="0.4" stroke-width="4"/>
<rect x="24" y="286" width="952" height="170" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="336" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">So you hear the last digit first.</text>
<text x="500" y="382" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">Writing 2 as soon as you hear zwei in zweiundvierzig</text>
<text x="500" y="416" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">gives you 24 when the answer was 42.</text>
<text x="500" y="448" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Wait for the whole word.</text>
</svg>
<figcaption><strong>This single reversal causes more wrong phone numbers than any other feature of the language.</strong> The habit to build is deliberately not writing anything until the number word has finished, which feels slow and is the only thing that works.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">It has measurable costs, and they are acknowledged</span><p>Transcription error rates are higher for inverted systems, and the effect is strongest under time pressure and in noise. There have been serious proposals in German-speaking countries to change the convention in safety-critical contexts for exactly this reason.</p></div>
<h3>Where professionals have already solved it</h3>
<p>Aviation, medicine and banking use digit-by-digit reading, mandatory read-back, and the twenty four hour clock. None of that is about language ability; it is error control for a known failure mode, and borrowing it is entirely appropriate in any situation where the number matters.</p>
<h3>Regional variation to expect</h3>
<p>Austrian and Swiss usage differs in places, including the pronunciation of some number words and the common forms for times. A learner who has only heard standard German recordings will be briefly thrown by a Swiss speaker, and the correct response is to ask for the digits rather than to assume you have misunderstood the system.</p>`,
    },
    speaking: [
      {
        n: 1,
        kind: "listen",
        title: "Take down a name, a number and a time",
        level: "CEFR A1",
        lang: "de-DE",
        prompt: `<p>Somebody is leaving you a short voicemail. Play it as many times as you need, then answer the questions.</p>
<p>Write as you listen rather than listening and then writing. For a two digit number, note the first digit you hear, leave a gap, and fill in the tens when it arrives. It feels clumsy and it is far more reliable than assembling the number in your head while the speaker keeps going.</p>
<p>The transcript is released after you answer, not before. The gap between what you can read and what you can hear is the thing this task measures.</p>`,
        script:
          "Guten Tag, hier ist Frau Schneider von der Firma Baumann. Meine Telefonnummer ist null eins sieben sechs, dreiundzwanzig, fünfundvierzig, siebenundsechzig. Mein Name schreibt sich S, C, H, N, E, I, D, E, R. Der Termin ist am Dienstag um halb drei. Bitte rufen Sie mich zurück. Vielen Dank, auf Wiederhören.",
        questions: [
          {
            n: 1,
            question: "What is the caller's phone number?",
            options: ["0176 23 45 67", "0176 32 54 76", "0167 23 45 67", "0176 23 54 67"],
            answer: 0,
            explanation:
              "Dreiundzwanzig is three-and-twenty, which is 23, not 32. Fünfundvierzig is 45 and siebenundsechzig is 67. Every wrong option here is what you get if you write the digits in the order you hear them, which is exactly the trap.",
            difficulty: "Hard",
            skill: "Telefonnummer",
          },
          {
            n: 2,
            question: "What time is the appointment?",
            options: ["14:30", "15:30", "13:30", "14:00"],
            answer: 0,
            explanation:
              "Halb drei is half an hour BEFORE three, so 2:30 in the afternoon. German counts toward the coming hour rather than back from the past one, and reading it as half past three moves the appointment by an hour.",
            difficulty: "Hard",
            skill: "Uhrzeit",
          },
          {
            n: 3,
            question: "Which day is the appointment?",
            options: ["Tuesday", "Thursday", "Wednesday", "Monday"],
            answer: 0,
            explanation:
              "Dienstag is Tuesday. It is routinely confused with Donnerstag, which is Thursday, because both begin with D and both are two syllables before the -tag.",
            difficulty: "Medium",
            skill: "Zahlen",
          },
          {
            n: 4,
            question: "How does the caller spell her name?",
            options: ["Schneider", "Schnaider", "Schneidar", "Schnieder"],
            answer: 0,
            explanation:
              "The German letter names matter here: E is pronounced ay and I is pronounced ee, which is the reverse of English. Hearing them the English way produces Schnieder, which is the fourth option and a different surname.",
            difficulty: "Medium",
            skill: "Buchstabieren",
          },
        ],
        seconds: 30,
        rubric: [
          {
            key: "numbers",
            label: "Two digit numbers heard correctly",
            bands: [
              "Digits written in the order heard, so every two digit number is reversed",
              "Some numbers assembled correctly, others reversed",
              "All two digit numbers assembled correctly",
              "All correct, and at native-paced delivery rather than needing repeated slow playback",
            ],
            weight: 3,
          },
          {
            key: "letters",
            label: "Spelled letters heard correctly",
            bands: [
              "E and I confused, producing a different name",
              "Most letters right with one or two English readings",
              "Every letter correct",
              "Every letter correct and the learner could reproduce the spelling aloud themselves",
            ],
            weight: 2,
          },
          {
            key: "time",
            label: "Time and day",
            bands: [
              "Halb drei read as half past three",
              "Time correct but day confused",
              "Both correct",
              "Both correct, with the learner able to say why halb drei is not half past three",
            ],
            weight: 3,
          },
        ],
        skills: ["Zahlen", "Telefonnummer", "Buchstabieren", "Uhrzeit"],
      },
    ],
    decks: [
      {
        n: 1,
        title: "Numbers, letters and the time",
        blurb:
          "Typed recall under mild pressure, because the failure mode with numbers is not knowing them, it is retrieving them fast enough.",
        mode: "type",
        lang: "de-DE",
        cards: [
          { id: 1, front: "21", back: "einundzwanzig", accepts: ["ein und zwanzig"], tags: ["Numbers"], hint: "one and twenty" },
          { id: 2, front: "47", back: "siebenundvierzig", accepts: ["sieben und vierzig"], tags: ["Numbers"] },
          { id: 3, front: "68", back: "achtundsechzig", accepts: ["acht und sechzig"], tags: ["Numbers"] },
          { id: 4, front: "92", back: "zweiundneunzig", accepts: ["zwei und neunzig"], tags: ["Numbers"] },
          { id: 5, front: "13", back: "dreizehn", tags: ["Numbers"] },
          { id: 6, front: "30", back: "dreißig", accepts: ["dreissig"], tags: ["Numbers"], hint: "Note the ß, and that it is not dreizig" },
          { id: 7, front: "100", back: "hundert", accepts: ["einhundert"], tags: ["Numbers"] },
          { id: 8, front: "1000", back: "tausend", accepts: ["eintausend"], tags: ["Numbers"] },
          { id: 9, front: "2:30 (say it in German)", back: "halb drei", tags: ["Time"], hint: "Half an hour before three, not after" },
          { id: 10, front: "2:45", back: "viertel vor drei", accepts: ["dreiviertel drei"], tags: ["Time"] },
          { id: 11, front: "2:15", back: "viertel nach zwei", accepts: ["viertel drei"], tags: ["Time"] },
          { id: 12, front: "The letter J, said aloud", back: "jot", accepts: ["yot"], tags: ["Letters"] },
          { id: 13, front: "The letter W, said aloud", back: "weh", accepts: ["vay", "ve"], tags: ["Letters"] },
          { id: 14, front: "The letter V, said aloud", back: "fau", accepts: ["vau"], tags: ["Letters"] },
          { id: 15, front: "The letter Y, said aloud", back: "ypsilon", accepts: ["üpsilon", "upsilon"], tags: ["Letters"] },
          { id: 16, front: "The letter Z, said aloud", back: "zett", accepts: ["tsett"], tags: ["Letters"] },
          { id: 17, front: "Tuesday", back: "Dienstag", tags: ["Days"], hint: "Not Donnerstag, which is Thursday" },
          { id: 18, front: "Thursday", back: "Donnerstag", tags: ["Days"] },
          { id: 19, front: "Could you say that separately, please?", back: "Können Sie das bitte einzeln sagen?", accepts: ["konnen sie das bitte einzeln sagen"], tags: ["Survival"] },
          { id: 20, front: "Could you repeat that more slowly?", back: "Können Sie das bitte langsamer wiederholen?", accepts: ["konnen sie das bitte langsamer wiederholen"], tags: ["Survival"] },
        ],
        skills: ["Zahlen", "Buchstabieren", "Uhrzeit"],
      },
    ],
  },

  /* ===================================================================== */
  5097: {
    topicId: 5097,
    title: "Du or Sie, and the cost of getting it wrong",
    summary:
      "Two words for you, and choosing between them is a social judgement that German makes explicit and English hides.",
    concepts: ["Siezen", "Duzen", "Register", "Das Du anbieten", "Anrede"],
    glossary: {
      Siezen: "To address somebody with Sie, the formal you.",
      Duzen: "To address somebody with du, the informal you.",
      Register: "The level of formality a situation calls for.",
      "Das Du anbieten": "To offer the du, which in traditional etiquette is the senior person's privilege.",
      Anrede: "The form of address, including Herr, Frau and the use of titles.",
      "Hamburger Sie": "The mixed form of first name plus Sie, common in modern workplaces.",
    },
    body: {
      Beginner: `<p>German has two words for you. Choosing the wrong one is the social mistake people actually notice.</p>
<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="When to use du and when to use Sie">
<rect x="24" y="40" width="464" height="300" rx="18" fill="#0369a1" opacity="0.13"/>
<rect x="24" y="40" width="464" height="300" rx="18" fill="none" stroke="#0369a1" stroke-width="3"/>
<text x="256" y="104" font-size="40" font-weight="800" fill="#0369a1" text-anchor="middle">Sie</text>
<text x="56" y="164" font-size="28" font-weight="800" fill="currentColor">Any adult stranger</text>
<text x="56" y="212" font-size="28" font-weight="800" fill="currentColor">Shops, offices, doctors</text>
<text x="56" y="260" font-size="28" font-weight="800" fill="currentColor">Colleagues, until told</text>
<text x="256" y="316" font-size="27" font-weight="800" fill="#0369a1" text-anchor="middle">the safe default</text>
<rect x="512" y="40" width="464" height="300" rx="18" fill="#0f766e" opacity="0.13"/>
<rect x="512" y="40" width="464" height="300" rx="18" fill="none" stroke="#0f766e" stroke-width="3"/>
<text x="744" y="104" font-size="40" font-weight="800" fill="#0f766e" text-anchor="middle">du</text>
<text x="544" y="164" font-size="28" font-weight="800" fill="currentColor">Friends and family</text>
<text x="544" y="212" font-size="28" font-weight="800" fill="currentColor">Children</text>
<text x="544" y="260" font-size="28" font-weight="800" fill="currentColor">When you are offered it</text>
<text x="744" y="316" font-size="27" font-weight="800" fill="#0f766e" text-anchor="middle">wait to be invited</text>
<rect x="24" y="372" width="952" height="130" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="422" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">The offer is a sentence, and it comes from the older</text>
<text x="500" y="462" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">or more senior person.</text>
<text x="500" y="496" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Wir koennen uns duzen.</text>
</svg>
<figcaption><strong>Using Sie where du was expected is mildly stiff. Using du where Sie was expected is rude.</strong> The costs are not symmetric, so when you are unsure the answer is always Sie, and you wait for the other person to offer the change.</figcaption>
</figure>
<h3>The rule</h3>
<table>
<tr><th>Use</th><th>With</th></tr>
<tr><td>Sie</td><td>Adults you do not know, shops, offices, colleagues at first</td></tr>
<tr><td>du</td><td>Friends, family, children, anyone who has offered it</td></tr>
</table>
<div class="key-idea"><span class="callout-label">When unsure, use Sie</span><p>Being slightly too formal is unremarkable. Being too familiar is not. The two errors do not cost the same, so the safe choice is obvious.</p></div>
<div class="warning"><span class="callout-label">Sie takes a different verb form</span><p>Wie heissen Sie? with Sie, Wie heisst du? with du. Mixing the pronoun with the wrong verb ending is more noticeable than choosing the wrong pronoun.</p></div>`,
      Intermediate: `<p>The choice encodes a relationship, which is why switching is a small event with its own phrase rather than a drift.</p>
<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="When to use du and when to use Sie">
<rect x="24" y="40" width="464" height="300" rx="18" fill="#0369a1" opacity="0.13"/>
<rect x="24" y="40" width="464" height="300" rx="18" fill="none" stroke="#0369a1" stroke-width="3"/>
<text x="256" y="104" font-size="40" font-weight="800" fill="#0369a1" text-anchor="middle">Sie</text>
<text x="56" y="164" font-size="28" font-weight="800" fill="currentColor">Any adult stranger</text>
<text x="56" y="212" font-size="28" font-weight="800" fill="currentColor">Shops, offices, doctors</text>
<text x="56" y="260" font-size="28" font-weight="800" fill="currentColor">Colleagues, until told</text>
<text x="256" y="316" font-size="27" font-weight="800" fill="#0369a1" text-anchor="middle">the safe default</text>
<rect x="512" y="40" width="464" height="300" rx="18" fill="#0f766e" opacity="0.13"/>
<rect x="512" y="40" width="464" height="300" rx="18" fill="none" stroke="#0f766e" stroke-width="3"/>
<text x="744" y="104" font-size="40" font-weight="800" fill="#0f766e" text-anchor="middle">du</text>
<text x="544" y="164" font-size="28" font-weight="800" fill="currentColor">Friends and family</text>
<text x="544" y="212" font-size="28" font-weight="800" fill="currentColor">Children</text>
<text x="544" y="260" font-size="28" font-weight="800" fill="currentColor">When you are offered it</text>
<text x="744" y="316" font-size="27" font-weight="800" fill="#0f766e" text-anchor="middle">wait to be invited</text>
<rect x="24" y="372" width="952" height="130" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="422" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">The offer is a sentence, and it comes from the older</text>
<text x="500" y="462" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">or more senior person.</text>
<text x="500" y="496" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Wir koennen uns duzen.</text>
</svg>
<figcaption><strong>Using Sie where du was expected is mildly stiff. Using du where Sie was expected is rude.</strong> The costs are not symmetric, so when you are unsure the answer is always Sie, and you wait for the other person to offer the change.</figcaption>
</figure>
<h3>Who offers, and how</h3>
<p>The offer comes from the older or more senior person, or from a woman to a man where ages are similar. The phrase is Wir koennen uns duzen, or simply Du kannst du sagen. Accepting is normal; so is a polite decline in a professional setting.</p>
<table>
<tr><th>Setting</th><th>Usual form</th></tr>
<tr><td>Shop, bank, doctor</td><td>Sie</td></tr>
<tr><td>Traditional office</td><td>Sie, often for years</td></tr>
<tr><td>Startup, agency</td><td>du from the first day</td></tr>
<tr><td>University students</td><td>du among themselves</td></tr>
<tr><td>Sports club</td><td>du</td></tr>
</table>
<div class="warning"><span class="callout-label">Watch what is used about you, not only to you</span><p>If colleagues refer to each other with du in your hearing but address you with Sie, that is information. The team is waiting to offer rather than excluding you.</p></div>`,
      Advanced: `<p>The distinction is a politeness system, and systems like it exist in many languages. What varies is where the boundary sits and how fast it moves, and German sits on the conservative side of Europe.</p>
<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="When to use du and when to use Sie">
<rect x="24" y="40" width="464" height="300" rx="18" fill="#0369a1" opacity="0.13"/>
<rect x="24" y="40" width="464" height="300" rx="18" fill="none" stroke="#0369a1" stroke-width="3"/>
<text x="256" y="104" font-size="40" font-weight="800" fill="#0369a1" text-anchor="middle">Sie</text>
<text x="56" y="164" font-size="28" font-weight="800" fill="currentColor">Any adult stranger</text>
<text x="56" y="212" font-size="28" font-weight="800" fill="currentColor">Shops, offices, doctors</text>
<text x="56" y="260" font-size="28" font-weight="800" fill="currentColor">Colleagues, until told</text>
<text x="256" y="316" font-size="27" font-weight="800" fill="#0369a1" text-anchor="middle">the safe default</text>
<rect x="512" y="40" width="464" height="300" rx="18" fill="#0f766e" opacity="0.13"/>
<rect x="512" y="40" width="464" height="300" rx="18" fill="none" stroke="#0f766e" stroke-width="3"/>
<text x="744" y="104" font-size="40" font-weight="800" fill="#0f766e" text-anchor="middle">du</text>
<text x="544" y="164" font-size="28" font-weight="800" fill="currentColor">Friends and family</text>
<text x="544" y="212" font-size="28" font-weight="800" fill="currentColor">Children</text>
<text x="544" y="260" font-size="28" font-weight="800" fill="currentColor">When you are offered it</text>
<text x="744" y="316" font-size="27" font-weight="800" fill="#0f766e" text-anchor="middle">wait to be invited</text>
<rect x="24" y="372" width="952" height="130" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="422" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">The offer is a sentence, and it comes from the older</text>
<text x="500" y="462" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">or more senior person.</text>
<text x="500" y="496" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Wir koennen uns duzen.</text>
</svg>
<figcaption><strong>Using Sie where du was expected is mildly stiff. Using du where Sie was expected is rude.</strong> The costs are not symmetric, so when you are unsure the answer is always Sie, and you wait for the other person to offer the change.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">The asymmetry is the practical point</span><p>Over-formality reads as reserved. Over-familiarity reads as presumptuous, and it is the kind of error that is remembered rather than corrected. Because the costs differ, the optimal strategy under uncertainty is not to guess the likely answer but to take the cheaper mistake.</p></div>
<h3>It is drifting, unevenly</h3>
<p>Younger speakers, creative industries and international companies use du far more widely than was true a generation ago, while public administration, medicine and law have barely moved. Someone who has learned German inside a startup and then walks into a Finanzamt will be using the wrong form without any sense of having changed register.</p>
<h3>The pronoun is not the only marker</h3>
<p>Formality also lives in the title and surname, in modal verbs, and in whether a request is phrased as a question. Koennten Sie mir bitte helfen is softer than Helfen Sie mir, and the gap between them is larger in German than the equivalent gap in English.</p>`,
      Expert: `<p>Sociolinguistically this is a T and V system, and German is useful to study because the boundary is contested in a way that makes the underlying negotiation visible.</p>
<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="When to use du and when to use Sie">
<rect x="24" y="40" width="464" height="300" rx="18" fill="#0369a1" opacity="0.13"/>
<rect x="24" y="40" width="464" height="300" rx="18" fill="none" stroke="#0369a1" stroke-width="3"/>
<text x="256" y="104" font-size="40" font-weight="800" fill="#0369a1" text-anchor="middle">Sie</text>
<text x="56" y="164" font-size="28" font-weight="800" fill="currentColor">Any adult stranger</text>
<text x="56" y="212" font-size="28" font-weight="800" fill="currentColor">Shops, offices, doctors</text>
<text x="56" y="260" font-size="28" font-weight="800" fill="currentColor">Colleagues, until told</text>
<text x="256" y="316" font-size="27" font-weight="800" fill="#0369a1" text-anchor="middle">the safe default</text>
<rect x="512" y="40" width="464" height="300" rx="18" fill="#0f766e" opacity="0.13"/>
<rect x="512" y="40" width="464" height="300" rx="18" fill="none" stroke="#0f766e" stroke-width="3"/>
<text x="744" y="104" font-size="40" font-weight="800" fill="#0f766e" text-anchor="middle">du</text>
<text x="544" y="164" font-size="28" font-weight="800" fill="currentColor">Friends and family</text>
<text x="544" y="212" font-size="28" font-weight="800" fill="currentColor">Children</text>
<text x="544" y="260" font-size="28" font-weight="800" fill="currentColor">When you are offered it</text>
<text x="744" y="316" font-size="27" font-weight="800" fill="#0f766e" text-anchor="middle">wait to be invited</text>
<rect x="24" y="372" width="952" height="130" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="422" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">The offer is a sentence, and it comes from the older</text>
<text x="500" y="462" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">or more senior person.</text>
<text x="500" y="496" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Wir koennen uns duzen.</text>
</svg>
<figcaption><strong>Using Sie where du was expected is mildly stiff. Using du where Sie was expected is rude.</strong> The costs are not symmetric, so when you are unsure the answer is always Sie, and you wait for the other person to offer the change.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">What is actually being negotiated</span><p>Two dimensions, power and solidarity. Historically the asymmetric use, where a superior said du and received Sie, marked power. Modern usage is largely reciprocal, so the choice now marks solidarity instead: whether we are the sort of people who are close. That shift is why the offer matters so much; it is an offer of relationship, not of convenience.</p></div>
<h3>Consequences for a non-native speaker</h3>
<p>You are granted some latitude, and you should not rely on it. The latitude covers getting it wrong; it does not cover appearing not to have noticed there is a choice. Demonstrating awareness, by using Sie correctly and accepting du when offered, signals cultural competence far more strongly than fluency in any particular construction.</p>
<h3>Written German is more conservative than spoken</h3>
<p>An email to someone you say du to in person may still open formally if it is going to a shared inbox or will be forwarded. Business correspondence defaults to Sie well beyond the point where spoken interaction has moved on, and matching the register of the message you received is the reliable heuristic.</p>
<div class="field"><span class="callout-label">The one thing worth memorising</span><p>Wir koennen uns duzen, said with a smile, is how you offer. Knowing how to make the offer, rather than only how to receive one, is what lets you set the register when you are the host or the senior person in the room.</p></div>`,
    },
    questions: [
      {
        n: 1,
        question: "You walk into a bakery. The correct address for the person behind the counter is:",
        options: ["Sie", "du", "ihr", "Either is equally appropriate"],
        answer: 0,
        explanation:
          "Anybody in a service role is addressed with Sie unless they are plainly a teenager or have offered otherwise. The risk is asymmetric: excessive formality reads as reserve, unwarranted familiarity reads as disrespect.",
        difficulty: "Easy",
        skill: "Siezen",
      },
      {
        n: 2,
        question: "A colleague says Wir können uns duzen. The right response is:",
        options: [
          "Accept it and switch to du",
          "Decline politely and continue with Sie",
          "Keep using Sie until they say it again",
          "Switch to du only in writing",
        ],
        answer: 0,
        explanation:
          "This is an offer of friendliness and declining it is a refusal of that. Continuing with Sie afterwards is a deliberate act of distancing and will be read as one.",
        difficulty: "Medium",
        skill: "Das Du anbieten",
      },
      {
        n: 3,
        question: "Which verb form goes with Sie?",
        options: ["Sie kommen", "Sie kommst", "Sie kommt", "Sie komme"],
        answer: 0,
        explanation:
          "Sie takes the third person plural form, which is identical to the infinitive. Kommst is the du form, and mixing the two inside one conversation is more noticeable to a German ear than a mispronounced vowel.",
        difficulty: "Easy",
        skill: "Siezen",
      },
      {
        n: 4,
        question: "You accidentally used du with an official at the Bürgeramt. The best recovery is:",
        options: [
          "A brief Entschuldigung, ich meinte Sie, and carry on",
          "Say nothing and hope it was not noticed",
          "Apologise at length and explain that you are still learning",
          "Switch to English for the rest of the conversation",
        ],
        answer: 0,
        explanation:
          "A short correction repairs it and moves on. Over-apologising makes the slip into an event and obliges the other person to manage your embarrassment, which is a larger imposition than the original error.",
        difficulty: "Medium",
        skill: "Register",
      },
      {
        n: 5,
        question: "A colleague addresses you as Thomas but uses Sie. This is:",
        options: [
          "The Hamburger Sie, a recognised middle register",
          "An error you should politely correct",
          "A sign that they dislike you",
          "Only used in writing",
        ],
        answer: 0,
        explanation:
          "First name with Sie is now common in workplaces that want informality without the commitment of du, and it occupies a genuine middle position. A learner who corrects it will be the only person in the room who thought it was wrong.",
        difficulty: "Hard",
        skill: "Anrede",
      },
      {
        n: 6,
        question: "In which setting is du most likely to be the default from day one?",
        options: [
          "A Berlin software startup",
          "A Sparkasse branch",
          "A Bürgeramt",
          "A law firm",
        ],
        answer: 0,
        explanation:
          "Much of the tech sector is du from the first interview, and usage is strongly predicted by age and sector. Banks, public offices and the traditional professions remain firmly Sie, so a flat rule from an older textbook will miscalibrate you in both directions.",
        difficulty: "Medium",
        skill: "Duzen",
      },
    ],
    scenarios: [
      {
        n: 1,
        title: "First week in a Berlin office",
        blurb:
          "Four people, four different right answers, and no rule that covers all of them. This is the judgement German makes you state out loud.",
        role: "You are a new engineer, first week, at a 60-person company in Berlin.",
        start: "d1",
        minutes: 11,
        idealPath: ["d1", "d2", "d3"],
        nodes: [
          {
            id: "d1",
            situation: `<p>Monday, 9am. Your team lead meets you at reception. She is about forty, holds out her hand and says: "Hallo, ich bin Katrin. Willkommen!"</p>`,
            prompt: "How do you reply?",
            choices: [
              {
                id: "a",
                label: '"Hallo Katrin, ich bin Priya. Freut mich!" and continue with du',
                outcome:
                  "She gave you her first name without a surname and without Frau, which in a Berlin office is an offer of du in everything but words. Matching it is exactly right, and she relaxes visibly.",
                next: "d2",
                delta: 3,
              },
              {
                id: "b",
                label: '"Guten Tag, Frau... Entschuldigung, wie ist Ihr Nachname?" and continue with Sie',
                outcome:
                  "Polite and slightly stiff. She will probably say Katrin reicht and offer du explicitly within a minute, so nothing is damaged, but you have made her do the work of correcting you.",
                next: "d2",
                delta: 1,
              },
              {
                id: "c",
                label: "Use Sie but call her Katrin",
                outcome:
                  "This is the Hamburger Sie and it is a real register, so it is not wrong. In a context where she has already signalled informality it reads as holding something back, but nobody will remark on it.",
                next: "d2",
                delta: 1,
              },
              {
                id: "d",
                label: "Answer in English to avoid having to choose",
                outcome:
                  "Understandable and it costs you something. You have signalled on your first morning that German conversation is not available with you, and colleagues will default to English from then on, which is the single most common reason people live in Germany for years without learning the language.",
                next: "d2",
                delta: -2,
              },
            ],
          },
          {
            id: "d2",
            situation: `<p>Wednesday. You need a document stamped at the Bürgeramt for your residence registration. You are called to a window and an official in his fifties looks up.</p>`,
            prompt: "How do you open?",
            choices: [
              {
                id: "a",
                label: '"Guten Tag. Ich möchte mich anmelden, bitte." with Sie throughout',
                outcome:
                  "Correct without question. Public offices are firmly Sie regardless of how informal the rest of the city has become, and the interaction goes smoothly.",
                next: "d3",
                delta: 3,
              },
              {
                id: "b",
                label: '"Hallo, kannst du mir helfen?"',
                outcome:
                  "You have duzt a public official in his fifties. He will almost certainly still process your registration, and the temperature of the conversation drops, and in a setting where discretion exists you would rather it had not.",
                next: "d3",
                delta: -3,
                violation: "An official in a public office was addressed with du.",
              },
              {
                id: "c",
                label: 'Open with "Sprechen Sie Englisch?"',
                outcome:
                  "A reasonable fallback and worth keeping in reserve. Leading with it in a Bürgeramt often gets a terse no, because he is not obliged to, and you have spent your opening on something other than your actual request.",
                next: "d3",
                delta: 0,
              },
            ],
          },
          {
            id: "d3",
            situation: `<p>Friday. At lunch, a colleague about your age who has been using du all week introduces you to the company's founder, who is in his sixties. The founder says "Guten Tag" and offers his hand.</p>
<p>You read the room: Sie. Two minutes into the conversation he says "Ach, wir duzen uns hier alle. Ich bin Wolfgang."</p>`,
            prompt: "",
            ending: {
              verdict: "ideal",
              title: "You let each situation tell you, rather than applying one rule",
              debrief: `<p>There was no single right answer across the week, which is the whole point. Katrin gave a first name with no surname, which in a Berlin office is an offer of du in everything but words. The official in his fifties behind a counter in a Bürgeramt is Sie regardless of what the rest of the city does. The founder opened with Guten Tag, so you started with Sie, and he offered du himself, which is exactly how the transition is conventionally made: by the older or more senior person.</p>
<p>Notice the asymmetry of the risk. Using Sie where du was fine makes you sound slightly reserved and somebody will correct it within a minute. Using du where Sie was expected can genuinely offend, and in an office where an official has discretion over your paperwork that is a cost you cannot measure. When you cannot read the room, Sie is the cheap error.</p>
<p>The option worth thinking about longest is answering Katrin in English. It is not rude and it is the most expensive choice on this page, because it establishes on day one that German is not available with you. Colleagues are helpful people and will switch permanently, and that single decision is the most common reason people live in Germany for years and never get past A2.</p>
<p>Once du is offered, take it and do not drift back. Returning to Sie after an offer is a deliberate act of distancing, and a German ear hears it as one even when a learner means nothing by it.</p>`,
            },
          },
        ],
        skills: ["Siezen", "Duzen", "Register", "Das Du anbieten"],
      },
    ],
  },
  /* ===================================================================== */
  5098: {
    topicId: 5098,
    title: "Gender, articles and the patterns that predict it",
    summary:
      "Three genders and no logic, except that there is quite a lot of logic. The endings predict gender far more often than anyone tells beginners.",
    concepts: ["Grammatical gender", "Definite article", "Plural formation", "Suffix rules", "Compound nouns"],
    glossary: {
      "Grammatical gender": "The class a German noun belongs to: masculine, feminine or neuter, marked by its article.",
      "Definite article": "der, die or das, which is how gender is visible at all.",
      "Suffix rules": "Word endings that reliably predict gender, such as -ung always being feminine.",
      "Compound nouns": "Nouns built from two or more nouns, which take the gender of the last element.",
      "Plural formation": "The five plural patterns, which are learned with the noun rather than derived from it.",
      "Natural gender": "Where grammatical gender follows biological sex, which it mostly does for people and not otherwise.",
    },
    body: {
      Beginner: `<p>Every German noun is der, die or das. It looks like something you simply have to memorise, and mostly it is not.</p>
<figure>
<svg viewBox="0 0 1000 540" role="img" aria-label="Word endings that reliably predict grammatical gender in German">
<rect x="24" y="40" width="300" height="320" rx="16" fill="#0369a1" opacity="0.14"/>
<text x="174" y="98" font-size="40" font-weight="800" fill="#0369a1" text-anchor="middle">der</text>
<text x="56" y="156" font-size="28" font-weight="800" fill="currentColor">-er, -en, -ling</text>
<text x="56" y="200" font-size="28" font-weight="800" fill="currentColor">-ismus, -or</text>
<text x="56" y="262" font-size="26" fill="currentColor" opacity="0.8">Lehrer, Garten</text>
<text x="56" y="298" font-size="26" fill="currentColor" opacity="0.8">Motor, Fruehling</text>
<text x="174" y="344" font-size="26" font-weight="800" fill="#0369a1" text-anchor="middle">days, months, weather</text>
<rect x="350" y="40" width="300" height="320" rx="16" fill="#be123c" opacity="0.14"/>
<text x="500" y="98" font-size="40" font-weight="800" fill="#be123c" text-anchor="middle">die</text>
<text x="382" y="156" font-size="28" font-weight="800" fill="currentColor">-ung, -heit, -keit</text>
<text x="382" y="200" font-size="28" font-weight="800" fill="currentColor">-schaft, -ion, -taet</text>
<text x="382" y="262" font-size="26" fill="currentColor" opacity="0.8">Zeitung, Freiheit</text>
<text x="382" y="298" font-size="26" fill="currentColor" opacity="0.8">Nation, Universitaet</text>
<text x="500" y="344" font-size="26" font-weight="800" fill="#be123c" text-anchor="middle">nearly always reliable</text>
<rect x="676" y="40" width="300" height="320" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="826" y="98" font-size="40" font-weight="800" fill="#0f766e" text-anchor="middle">das</text>
<text x="708" y="156" font-size="28" font-weight="800" fill="currentColor">-chen, -lein</text>
<text x="708" y="200" font-size="28" font-weight="800" fill="currentColor">-ment, -um</text>
<text x="708" y="262" font-size="26" fill="currentColor" opacity="0.8">Maedchen, Brot</text>
<text x="708" y="298" font-size="26" fill="currentColor" opacity="0.8">Dokument, Museum</text>
<text x="826" y="344" font-size="26" font-weight="800" fill="#0f766e" text-anchor="middle">all diminutives</text>
<rect x="24" y="392" width="952" height="126" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="440" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">das Maedchen is neuter because -chen is,</text>
<text x="500" y="482" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">not because German has an opinion about girls.</text>
<text x="500" y="512" font-size="26" font-weight="800" fill="currentColor" text-anchor="middle">The ending wins over the meaning, always.</text>
</svg>
<figcaption><strong>Gender is far more predictable than most courses admit.</strong> A few dozen endings cover a large share of the nouns you will meet, and learning them turns a memorisation problem into a recognition one. Learn the article with every new noun anyway, because the exceptions are real.</figcaption>
</figure>
<h3>Endings that give it away</h3>
<table>
<tr><th>Ending</th><th>Gender</th><th>Example</th></tr>
<tr><td>-ung</td><td>die</td><td>die Zeitung</td></tr>
<tr><td>-heit, -keit</td><td>die</td><td>die Freiheit</td></tr>
<tr><td>-chen</td><td>das</td><td>das Maedchen</td></tr>
<tr><td>-er (person)</td><td>der</td><td>der Lehrer</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Learn the article with the word</span><p>Not Tisch but der Tisch. Learning the noun alone and adding the gender later means learning it twice, and the second time is harder.</p></div>
<div class="warning"><span class="callout-label">Gender is grammar, not meaning</span><p>das Maedchen is neuter because every word ending in -chen is. The ending decides, and it overrides what the word refers to.</p></div>`,
      Intermediate: `<p>Three kinds of clue predict gender: the ending, the category the word belongs to, and the form of the word itself.</p>
<figure>
<svg viewBox="0 0 1000 540" role="img" aria-label="Word endings that reliably predict grammatical gender in German">
<rect x="24" y="40" width="300" height="320" rx="16" fill="#0369a1" opacity="0.14"/>
<text x="174" y="98" font-size="40" font-weight="800" fill="#0369a1" text-anchor="middle">der</text>
<text x="56" y="156" font-size="28" font-weight="800" fill="currentColor">-er, -en, -ling</text>
<text x="56" y="200" font-size="28" font-weight="800" fill="currentColor">-ismus, -or</text>
<text x="56" y="262" font-size="26" fill="currentColor" opacity="0.8">Lehrer, Garten</text>
<text x="56" y="298" font-size="26" fill="currentColor" opacity="0.8">Motor, Fruehling</text>
<text x="174" y="344" font-size="26" font-weight="800" fill="#0369a1" text-anchor="middle">days, months, weather</text>
<rect x="350" y="40" width="300" height="320" rx="16" fill="#be123c" opacity="0.14"/>
<text x="500" y="98" font-size="40" font-weight="800" fill="#be123c" text-anchor="middle">die</text>
<text x="382" y="156" font-size="28" font-weight="800" fill="currentColor">-ung, -heit, -keit</text>
<text x="382" y="200" font-size="28" font-weight="800" fill="currentColor">-schaft, -ion, -taet</text>
<text x="382" y="262" font-size="26" fill="currentColor" opacity="0.8">Zeitung, Freiheit</text>
<text x="382" y="298" font-size="26" fill="currentColor" opacity="0.8">Nation, Universitaet</text>
<text x="500" y="344" font-size="26" font-weight="800" fill="#be123c" text-anchor="middle">nearly always reliable</text>
<rect x="676" y="40" width="300" height="320" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="826" y="98" font-size="40" font-weight="800" fill="#0f766e" text-anchor="middle">das</text>
<text x="708" y="156" font-size="28" font-weight="800" fill="currentColor">-chen, -lein</text>
<text x="708" y="200" font-size="28" font-weight="800" fill="currentColor">-ment, -um</text>
<text x="708" y="262" font-size="26" fill="currentColor" opacity="0.8">Maedchen, Brot</text>
<text x="708" y="298" font-size="26" fill="currentColor" opacity="0.8">Dokument, Museum</text>
<text x="826" y="344" font-size="26" font-weight="800" fill="#0f766e" text-anchor="middle">all diminutives</text>
<rect x="24" y="392" width="952" height="126" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="440" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">das Maedchen is neuter because -chen is,</text>
<text x="500" y="482" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">not because German has an opinion about girls.</text>
<text x="500" y="512" font-size="26" font-weight="800" fill="currentColor" text-anchor="middle">The ending wins over the meaning, always.</text>
</svg>
<figcaption><strong>Gender is far more predictable than most courses admit.</strong> A few dozen endings cover a large share of the nouns you will meet, and learning them turns a memorisation problem into a recognition one. Learn the article with every new noun anyway, because the exceptions are real.</figcaption>
</figure>
<h3>Categories that are consistent</h3>
<table>
<tr><th>Category</th><th>Gender</th></tr>
<tr><td>Days, months, seasons, weather</td><td>der</td></tr>
<tr><td>Numbers used as nouns</td><td>die</td></tr>
<tr><td>Verbs used as nouns</td><td>das</td></tr>
<tr><td>Young beings</td><td>das</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Compounds take the gender of the last part</span><p>die Hand plus der Schuh gives der Handschuh. This is a complete rule with no exceptions, and it means a long intimidating compound only ever requires you to know the gender of its final noun.</p></div>
<div class="warning"><span class="callout-label">The exceptions are the frequent words</span><p>das Wasser, der Kaese and a handful of others break the patterns, and they are common enough that you will meet them early. Learn those individually and let the rules carry the rest.</p></div>`,
      Advanced: `<p>Estimates vary, but the broad finding is consistent: a modest set of formal cues predicts gender for a large majority of German nouns. Treating gender as arbitrary is a pedagogical choice rather than a fact about the language.</p>
<figure>
<svg viewBox="0 0 1000 540" role="img" aria-label="Word endings that reliably predict grammatical gender in German">
<rect x="24" y="40" width="300" height="320" rx="16" fill="#0369a1" opacity="0.14"/>
<text x="174" y="98" font-size="40" font-weight="800" fill="#0369a1" text-anchor="middle">der</text>
<text x="56" y="156" font-size="28" font-weight="800" fill="currentColor">-er, -en, -ling</text>
<text x="56" y="200" font-size="28" font-weight="800" fill="currentColor">-ismus, -or</text>
<text x="56" y="262" font-size="26" fill="currentColor" opacity="0.8">Lehrer, Garten</text>
<text x="56" y="298" font-size="26" fill="currentColor" opacity="0.8">Motor, Fruehling</text>
<text x="174" y="344" font-size="26" font-weight="800" fill="#0369a1" text-anchor="middle">days, months, weather</text>
<rect x="350" y="40" width="300" height="320" rx="16" fill="#be123c" opacity="0.14"/>
<text x="500" y="98" font-size="40" font-weight="800" fill="#be123c" text-anchor="middle">die</text>
<text x="382" y="156" font-size="28" font-weight="800" fill="currentColor">-ung, -heit, -keit</text>
<text x="382" y="200" font-size="28" font-weight="800" fill="currentColor">-schaft, -ion, -taet</text>
<text x="382" y="262" font-size="26" fill="currentColor" opacity="0.8">Zeitung, Freiheit</text>
<text x="382" y="298" font-size="26" fill="currentColor" opacity="0.8">Nation, Universitaet</text>
<text x="500" y="344" font-size="26" font-weight="800" fill="#be123c" text-anchor="middle">nearly always reliable</text>
<rect x="676" y="40" width="300" height="320" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="826" y="98" font-size="40" font-weight="800" fill="#0f766e" text-anchor="middle">das</text>
<text x="708" y="156" font-size="28" font-weight="800" fill="currentColor">-chen, -lein</text>
<text x="708" y="200" font-size="28" font-weight="800" fill="currentColor">-ment, -um</text>
<text x="708" y="262" font-size="26" fill="currentColor" opacity="0.8">Maedchen, Brot</text>
<text x="708" y="298" font-size="26" fill="currentColor" opacity="0.8">Dokument, Museum</text>
<text x="826" y="344" font-size="26" font-weight="800" fill="#0f766e" text-anchor="middle">all diminutives</text>
<rect x="24" y="392" width="952" height="126" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="440" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">das Maedchen is neuter because -chen is,</text>
<text x="500" y="482" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">not because German has an opinion about girls.</text>
<text x="500" y="512" font-size="26" font-weight="800" fill="currentColor" text-anchor="middle">The ending wins over the meaning, always.</text>
</svg>
<figcaption><strong>Gender is far more predictable than most courses admit.</strong> A few dozen endings cover a large share of the nouns you will meet, and learning them turns a memorisation problem into a recognition one. Learn the article with every new noun anyway, because the exceptions are real.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">Why it is nevertheless hard</span><p>The cues are reliable but numerous, and they only pay off once enough of them are internalised to apply without deliberation. Early on, a learner is doing lookup in a list of rules, which is slower than recall. The investment is front-loaded and the return arrives later, which is exactly the shape of learning that people abandon.</p></div>
<h3>Where gender actually bites</h3>
<p>Not in the article itself but in everything that agrees with it: adjective endings, relative pronouns, and the case forms. A wrong gender propagates through the sentence, which is why the error is more visible than its size suggests.</p>
<h3>Plural forms are a separate problem</h3>
<p>German has several plural patterns and the gender does not fully determine which one a noun takes. Feminine nouns overwhelmingly take -n or -en, which helps; elsewhere the plural has to be learned with the word, so the honest advice is to learn three things per noun rather than two.</p>`,
      Expert: `<p>Grammatical gender is a noun classification system, and German's is unusual mainly in having three classes with substantial formal marking and weak semantic correlation.</p>
<figure>
<svg viewBox="0 0 1000 540" role="img" aria-label="Word endings that reliably predict grammatical gender in German">
<rect x="24" y="40" width="300" height="320" rx="16" fill="#0369a1" opacity="0.14"/>
<text x="174" y="98" font-size="40" font-weight="800" fill="#0369a1" text-anchor="middle">der</text>
<text x="56" y="156" font-size="28" font-weight="800" fill="currentColor">-er, -en, -ling</text>
<text x="56" y="200" font-size="28" font-weight="800" fill="currentColor">-ismus, -or</text>
<text x="56" y="262" font-size="26" fill="currentColor" opacity="0.8">Lehrer, Garten</text>
<text x="56" y="298" font-size="26" fill="currentColor" opacity="0.8">Motor, Fruehling</text>
<text x="174" y="344" font-size="26" font-weight="800" fill="#0369a1" text-anchor="middle">days, months, weather</text>
<rect x="350" y="40" width="300" height="320" rx="16" fill="#be123c" opacity="0.14"/>
<text x="500" y="98" font-size="40" font-weight="800" fill="#be123c" text-anchor="middle">die</text>
<text x="382" y="156" font-size="28" font-weight="800" fill="currentColor">-ung, -heit, -keit</text>
<text x="382" y="200" font-size="28" font-weight="800" fill="currentColor">-schaft, -ion, -taet</text>
<text x="382" y="262" font-size="26" fill="currentColor" opacity="0.8">Zeitung, Freiheit</text>
<text x="382" y="298" font-size="26" fill="currentColor" opacity="0.8">Nation, Universitaet</text>
<text x="500" y="344" font-size="26" font-weight="800" fill="#be123c" text-anchor="middle">nearly always reliable</text>
<rect x="676" y="40" width="300" height="320" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="826" y="98" font-size="40" font-weight="800" fill="#0f766e" text-anchor="middle">das</text>
<text x="708" y="156" font-size="28" font-weight="800" fill="currentColor">-chen, -lein</text>
<text x="708" y="200" font-size="28" font-weight="800" fill="currentColor">-ment, -um</text>
<text x="708" y="262" font-size="26" fill="currentColor" opacity="0.8">Maedchen, Brot</text>
<text x="708" y="298" font-size="26" fill="currentColor" opacity="0.8">Dokument, Museum</text>
<text x="826" y="344" font-size="26" font-weight="800" fill="#0f766e" text-anchor="middle">all diminutives</text>
<rect x="24" y="392" width="952" height="126" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="440" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">das Maedchen is neuter because -chen is,</text>
<text x="500" y="482" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">not because German has an opinion about girls.</text>
<text x="500" y="512" font-size="26" font-weight="800" fill="currentColor" text-anchor="middle">The ending wins over the meaning, always.</text>
</svg>
<figcaption><strong>Gender is far more predictable than most courses admit.</strong> A few dozen endings cover a large share of the nouns you will meet, and learning them turns a memorisation problem into a recognition one. Learn the article with every new noun anyway, because the exceptions are real.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">The semantic core is small but real</span><p>Male and female humans and animals mostly align, and the exceptions cluster where a formal rule overrides, as with the diminutives. So the system is neither arbitrary nor meaningful; it is formally driven with a semantic residue, which is the worst case for intuition and the best case for explicit rules.</p></div>
<h3>What the research suggests about teaching it</h3>
<p>Presenting nouns with their article and in a consistent colour or group appears to help, and learning nouns in a phrase rather than in isolation helps more. Testing recall of the article separately from the noun does not. The practical reading is that gender should be bound to the word from first encounter rather than attached afterwards.</p>
<h3>And a note on what fluent non-natives actually do</h3>
<p>Advanced speakers make gender errors on low-frequency nouns indefinitely, and it rarely impedes communication. It is a reasonable thing to be imperfect at. What is not reasonable is avoiding constructions that require it, because adjective endings and relative clauses are most of what makes speech sound adult.</p>`,
    },
    questions: [
      {
        n: 1,
        question: "Why is das Mädchen neuter when it means girl?",
        options: [
          "The suffix -chen determines the gender and outranks the meaning",
          "Because German considers girls to be objects",
          "It is an arbitrary exception with no explanation",
          "Because the word is borrowed from another language",
        ],
        answer: 0,
        explanation:
          "Gender assignment is a hierarchy of cues with morphological ones ranked above semantic ones. The diminutive -chen is always neuter, so it wins over the meaning. The same happens with das Fräulein.",
        difficulty: "Medium",
        skill: "Grammatical gender",
      },
      {
        n: 2,
        question: "Which article goes with Wohnung?",
        options: ["die", "der", "das", "Either der or die"],
        answer: 0,
        explanation:
          "Nouns ending in -ung are always feminine, with no exceptions worth worrying about. The same holds for -heit, -keit, -schaft, -ion and -tät, and that set alone covers a large number of the nouns a beginner meets.",
        difficulty: "Easy",
        skill: "Suffix rules",
      },
      {
        n: 3,
        question: "Die Hand plus der Schuh gives which gender for Handschuh?",
        options: ["Masculine, from Schuh", "Feminine, from Hand", "Neuter, because it is a compound", "It can be either"],
        answer: 0,
        explanation:
          "A compound always takes the gender of its last element. This is the single highest-value rule in the system, because German builds nouns freely and a few hundred base genders give you tens of thousands of compounds for nothing.",
        difficulty: "Easy",
        skill: "Compound nouns",
      },
      {
        n: 4,
        question: "Why should you learn the plural at the same time as the noun?",
        options: [
          "The five plural patterns are not reliably predictable from the singular",
          "Because plurals change the gender",
          "Because German has no singular forms in everyday speech",
          "Because the plural determines the case",
        ],
        answer: 0,
        explanation:
          "No ending, -e, -er, -en and -s are the five patterns, and they correlate with gender and syllable structure as tendencies rather than rules. Learning article plus noun plus plural as a three-part unit from the first encounter is far cheaper than relearning it later.",
        difficulty: "Medium",
        skill: "Plural formation",
      },
      {
        n: 5,
        question: "An advanced learner knows that Wohnung is feminine but says der Wohnung in conversation. This is because:",
        options: [
          "Gender retrieval under time pressure is a separate skill from gender knowledge",
          "They have forgotten the rule",
          "Der is acceptable in spoken German",
          "The word changes gender in some dialects",
        ],
        answer: 0,
        explanation:
          "Gender is stored as a feature retrieved alongside the noun, and late learners show slower retrieval even at high proficiency, with errors clustering under load. It has to be automatised through production, not merely learned through recognition.",
        difficulty: "Hard",
        skill: "Grammatical gender",
      },
      {
        n: 6,
        question: "Which group is reliably masculine?",
        options: [
          "Days, months and seasons",
          "Words ending in -ung",
          "Diminutives in -chen",
          "Abstract nouns ending in -heit",
        ],
        answer: 0,
        explanation:
          "Der Montag, der Juli, der Sommer. Masculine is the weakest of the three sets and tends to be defined by semantic fields rather than by word form, which is why it is learned as a list of domains rather than as endings.",
        difficulty: "Easy",
        skill: "Definite article",
      },
      {
        n: 7,
        question: "Gender accuracy improves listening comprehension because:",
        options: [
          "The article predicts the upcoming noun, and native listeners exploit that",
          "Articles are the loudest part of the sentence",
          "Incorrect gender makes speech ungrammatical and therefore unparseable",
          "It does not; gender only matters in writing",
        ],
        answer: 0,
        explanation:
          "Eye-tracking work shows listeners use the gender on the article to anticipate what noun is coming. A learner who has not automatised gender loses that predictive advantage and processes German more slowly, so the benefit is in comprehension and not only in production.",
        difficulty: "Hard",
        skill: "Definite article",
      },
    ],
    decks: [
      {
        n: 1,
        title: "Gender by ending, and the words that break it",
        blurb:
          "Type the article. Recognition is not the skill: you need der, die or das to arrive with the noun, under pressure, which is only built by producing it.",
        mode: "type",
        lang: "de-DE",
        cards: [
          { id: 1, front: "___ Wohnung (flat)", back: "die", extra: { Rule: "-ung is always feminine" }, tags: ["Feminine endings"] },
          { id: 2, front: "___ Freiheit (freedom)", back: "die", extra: { Rule: "-heit is always feminine" }, tags: ["Feminine endings"] },
          { id: 3, front: "___ Möglichkeit (possibility)", back: "die", extra: { Rule: "-keit is always feminine" }, tags: ["Feminine endings"] },
          { id: 4, front: "___ Universität (university)", back: "die", extra: { Rule: "-tät is always feminine" }, tags: ["Feminine endings"] },
          { id: 5, front: "___ Wissenschaft (science)", back: "die", extra: { Rule: "-schaft is always feminine" }, tags: ["Feminine endings"] },
          { id: 6, front: "___ Mädchen (girl)", back: "das", extra: { Rule: "-chen is always neuter, and the ending outranks the meaning" }, tags: ["Neuter endings"] },
          { id: 7, front: "___ Dokument (document)", back: "das", extra: { Rule: "-ment is neuter" }, tags: ["Neuter endings"] },
          { id: 8, front: "___ Museum (museum)", back: "das", extra: { Rule: "-um is neuter", Plural: "die Museen" }, tags: ["Neuter endings"] },
          { id: 9, front: "___ Montag (Monday)", back: "der", extra: { Rule: "Days, months and seasons are masculine" }, tags: ["Masculine groups"] },
          { id: 10, front: "___ Sommer (summer)", back: "der", extra: { Rule: "Seasons are masculine" }, tags: ["Masculine groups"] },
          { id: 11, front: "___ Regen (rain)", back: "der", extra: { Rule: "Weather phenomena are usually masculine" }, tags: ["Masculine groups"] },
          { id: 12, front: "___ Lehrer (teacher, male)", back: "der", extra: { Rule: "Agent nouns in -er are masculine", Feminine: "die Lehrerin" }, tags: ["Masculine groups"] },
          { id: 13, front: "___ Handschuh (glove)", back: "der", extra: { Rule: "Compound takes the gender of the LAST element: der Schuh" }, tags: ["Compounds"] },
          { id: 14, front: "___ Tischlampe (table lamp)", back: "die", extra: { Rule: "Last element is die Lampe" }, tags: ["Compounds"] },
          { id: 15, front: "___ Hausaufgabe (homework)", back: "die", extra: { Rule: "Last element is die Aufgabe, not das Haus" }, tags: ["Compounds"] },
          { id: 16, front: "___ Bahnhof (station)", back: "der", extra: { Rule: "Last element is der Hof" }, tags: ["Compounds"] },
          { id: 17, front: "___ Verhältnis (relationship)", back: "das", extra: { Trap: "Looks like it could be -nis feminine, but -nis is neuter here" }, tags: ["Exceptions"] },
          { id: 18, front: "___ Reichtum (wealth)", back: "der", extra: { Trap: "-tum is usually neuter, but Reichtum and Irrtum are masculine" }, tags: ["Exceptions"] },
          { id: 19, front: "Plural of die Wohnung", back: "die Wohnungen", extra: { Rule: "Feminine nouns overwhelmingly take -n or -en" }, tags: ["Plurals"] },
          { id: 20, front: "Plural of das Auto", back: "die Autos", extra: { Rule: "The -s plural is largely restricted to loanwords, which is why it feels foreign" }, tags: ["Plurals"] },
        ],
        skills: ["Grammatical gender", "Suffix rules", "Compound nouns", "Plural formation"],
      },
    ],
  },

  /* ===================================================================== */
  5099: {
    topicId: 5099,
    title: "Nominative and accusative: who is doing it to whom",
    summary:
      "German marks the roles on the articles instead of on the word order. Once you see that, the case table stops being a list to memorise.",
    concepts: [
      "Nominative",
      "Accusative",
      "Direct object",
      "Case marking",
      "Masculine der to den",
      "Accusative prepositions",
    ],
    glossary: {
      Nominative: "The case of the subject, the one doing the action.",
      Accusative: "The case of the direct object, the one having the action done to it.",
      "Direct object": "The thing directly affected by the verb: I see the dog.",
      "Case marking": "Showing a word's role in the sentence through its form rather than its position.",
      "Masculine der to den": "The only article that visibly changes between nominative and accusative in the singular.",
      "Accusative prepositions": "durch, für, gegen, ohne, um, which always take the accusative whatever the meaning.",
    },
    body: {
      Beginner: `<p>German marks who is doing something and who it is being done to by changing the word in front of the noun, not by word order.</p>
<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="The same sentence with the roles swapped, shown by the article changing">
<rect x="24" y="40" width="952" height="130" rx="16" fill="#0369a1" opacity="0.13"/>
<text x="56" y="96" font-size="36" font-weight="800" fill="#0369a1">Der Hund</text>
<text x="300" y="96" font-size="36" font-weight="800" fill="currentColor">beisst</text>
<text x="470" y="96" font-size="36" font-weight="800" fill="#be123c">den Mann.</text>
<text x="56" y="146" font-size="27" fill="currentColor" opacity="0.8">doer</text>
<text x="470" y="146" font-size="27" fill="currentColor" opacity="0.8">done to</text>
<rect x="24" y="196" width="952" height="130" rx="16" fill="#be123c" opacity="0.13"/>
<text x="56" y="252" font-size="36" font-weight="800" fill="#be123c">Den Hund</text>
<text x="300" y="252" font-size="36" font-weight="800" fill="currentColor">beisst</text>
<text x="470" y="252" font-size="36" font-weight="800" fill="#0369a1">der Mann.</text>
<text x="56" y="302" font-size="27" fill="currentColor" opacity="0.8">done to</text>
<text x="470" y="302" font-size="27" fill="currentColor" opacity="0.8">doer</text>
<rect x="24" y="352" width="952" height="146" rx="16" fill="#0f766e" opacity="0.13"/>
<text x="500" y="402" font-size="30" font-weight="800" fill="#0f766e" text-anchor="middle">Same word order. Opposite meaning.</text>
<text x="500" y="448" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">English marks the roles by position. German marks them</text>
<text x="500" y="482" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">on the article, which is why word order can move.</text>
</svg>
<figcaption><strong>Only the masculine article visibly changes, which is both the clearest example and the reason this is hard.</strong> For feminine and neuter nouns nominative and accusative look identical, so the contrast is invisible and learners conclude the case does not matter until they meet a der that became den.</figcaption>
</figure>
<h3>The two cases</h3>
<table>
<tr><th>Case</th><th>Role</th><th>Masculine article</th></tr>
<tr><td>Nominative</td><td>The doer</td><td>der</td></tr>
<tr><td>Accusative</td><td>The one done to</td><td>den</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Only masculine visibly changes</span><p>die, das and the plural die look the same in both. So if you learn the masculine pair properly you have learned most of what is visible.</p></div>
<div class="warning"><span class="callout-label">Find the verb, then ask who</span><p>Who is doing it? That is nominative. Who or what is it being done to? That is accusative. The order they appear in the sentence does not decide it.</p></div>`,
      Intermediate: `<p>Because the article carries the role, word order is free to do a different job: marking what the sentence is about.</p>
<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="The same sentence with the roles swapped, shown by the article changing">
<rect x="24" y="40" width="952" height="130" rx="16" fill="#0369a1" opacity="0.13"/>
<text x="56" y="96" font-size="36" font-weight="800" fill="#0369a1">Der Hund</text>
<text x="300" y="96" font-size="36" font-weight="800" fill="currentColor">beisst</text>
<text x="470" y="96" font-size="36" font-weight="800" fill="#be123c">den Mann.</text>
<text x="56" y="146" font-size="27" fill="currentColor" opacity="0.8">doer</text>
<text x="470" y="146" font-size="27" fill="currentColor" opacity="0.8">done to</text>
<rect x="24" y="196" width="952" height="130" rx="16" fill="#be123c" opacity="0.13"/>
<text x="56" y="252" font-size="36" font-weight="800" fill="#be123c">Den Hund</text>
<text x="300" y="252" font-size="36" font-weight="800" fill="currentColor">beisst</text>
<text x="470" y="252" font-size="36" font-weight="800" fill="#0369a1">der Mann.</text>
<text x="56" y="302" font-size="27" fill="currentColor" opacity="0.8">done to</text>
<text x="470" y="302" font-size="27" fill="currentColor" opacity="0.8">doer</text>
<rect x="24" y="352" width="952" height="146" rx="16" fill="#0f766e" opacity="0.13"/>
<text x="500" y="402" font-size="30" font-weight="800" fill="#0f766e" text-anchor="middle">Same word order. Opposite meaning.</text>
<text x="500" y="448" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">English marks the roles by position. German marks them</text>
<text x="500" y="482" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">on the article, which is why word order can move.</text>
</svg>
<figcaption><strong>Only the masculine article visibly changes, which is both the clearest example and the reason this is hard.</strong> For feminine and neuter nouns nominative and accusative look identical, so the contrast is invisible and learners conclude the case does not matter until they meet a der that became den.</figcaption>
</figure>
<h3>The full pattern</h3>
<table>
<tr><th></th><th>Masculine</th><th>Feminine</th><th>Neuter</th><th>Plural</th></tr>
<tr><td>Nominative</td><td>der</td><td>die</td><td>das</td><td>die</td></tr>
<tr><td>Accusative</td><td>den</td><td>die</td><td>das</td><td>die</td></tr>
</table>
<div class="key-idea"><span class="callout-label">One cell differs, and it carries the whole system</span><p>That is why learners conclude case does not matter: for three of the four columns they are right, and then a masculine noun arrives and the sentence inverts.</p></div>
<h3>Prepositions that always take accusative</h3>
<p>durch, fuer, gegen, ohne, um. They take accusative regardless of whether there is any movement or any object being acted on, so this group is memorised rather than reasoned about.</p>
<div class="warning"><span class="callout-label">es gibt always takes accusative</span><p>Es gibt einen Grund, not ein Grund. It is extremely common and it catches people for a long time.</p></div>`,
      Advanced: `<p>The trade is explicit: morphological marking buys word order freedom. German spends endings to gain the front position as a topic slot, and English spends word order rigidity to avoid endings.</p>
<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="The same sentence with the roles swapped, shown by the article changing">
<rect x="24" y="40" width="952" height="130" rx="16" fill="#0369a1" opacity="0.13"/>
<text x="56" y="96" font-size="36" font-weight="800" fill="#0369a1">Der Hund</text>
<text x="300" y="96" font-size="36" font-weight="800" fill="currentColor">beisst</text>
<text x="470" y="96" font-size="36" font-weight="800" fill="#be123c">den Mann.</text>
<text x="56" y="146" font-size="27" fill="currentColor" opacity="0.8">doer</text>
<text x="470" y="146" font-size="27" fill="currentColor" opacity="0.8">done to</text>
<rect x="24" y="196" width="952" height="130" rx="16" fill="#be123c" opacity="0.13"/>
<text x="56" y="252" font-size="36" font-weight="800" fill="#be123c">Den Hund</text>
<text x="300" y="252" font-size="36" font-weight="800" fill="currentColor">beisst</text>
<text x="470" y="252" font-size="36" font-weight="800" fill="#0369a1">der Mann.</text>
<text x="56" y="302" font-size="27" fill="currentColor" opacity="0.8">done to</text>
<text x="470" y="302" font-size="27" fill="currentColor" opacity="0.8">doer</text>
<rect x="24" y="352" width="952" height="146" rx="16" fill="#0f766e" opacity="0.13"/>
<text x="500" y="402" font-size="30" font-weight="800" fill="#0f766e" text-anchor="middle">Same word order. Opposite meaning.</text>
<text x="500" y="448" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">English marks the roles by position. German marks them</text>
<text x="500" y="482" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">on the article, which is why word order can move.</text>
</svg>
<figcaption><strong>Only the masculine article visibly changes, which is both the clearest example and the reason this is hard.</strong> For feminine and neuter nouns nominative and accusative look identical, so the contrast is invisible and learners conclude the case does not matter until they meet a der that became den.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">Which is why Den Hund beisst der Mann is grammatical</span><p>It is unusual, and it is used when the dog is what the conversation is already about. English cannot do this without a passive or a cleft, so a learner translating word for word loses the emphasis entirely and produces a sentence that is correct and flat.</p></div>
<h3>Where it stops being optional</h3>
<p>Adjective endings depend on case, gender and whether an article is present. Relative pronouns take the case of their role in the relative clause, not in the main one. Both of those are unavoidable in adult speech, and both require the case to be identified correctly first.</p>
<h3>Pronouns show the system more clearly than articles</h3>
<table>
<tr><th>Nominative</th><th>Accusative</th></tr>
<tr><td>ich</td><td>mich</td></tr>
<tr><td>du</td><td>dich</td></tr>
<tr><td>er</td><td>ihn</td></tr>
<tr><td>wir</td><td>uns</td></tr>
</table>
<p>English keeps a remnant of exactly this in I and me, he and him, which is a useful anchor: nobody says me saw he.</p>`,
      Expert: `<p>Case is the surviving fragment of a much richer system. Old English had four cases and lost them as word order rigidified, which is why the modern English pronoun paradigm is the only place the pattern remains.</p>
<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="The same sentence with the roles swapped, shown by the article changing">
<rect x="24" y="40" width="952" height="130" rx="16" fill="#0369a1" opacity="0.13"/>
<text x="56" y="96" font-size="36" font-weight="800" fill="#0369a1">Der Hund</text>
<text x="300" y="96" font-size="36" font-weight="800" fill="currentColor">beisst</text>
<text x="470" y="96" font-size="36" font-weight="800" fill="#be123c">den Mann.</text>
<text x="56" y="146" font-size="27" fill="currentColor" opacity="0.8">doer</text>
<text x="470" y="146" font-size="27" fill="currentColor" opacity="0.8">done to</text>
<rect x="24" y="196" width="952" height="130" rx="16" fill="#be123c" opacity="0.13"/>
<text x="56" y="252" font-size="36" font-weight="800" fill="#be123c">Den Hund</text>
<text x="300" y="252" font-size="36" font-weight="800" fill="currentColor">beisst</text>
<text x="470" y="252" font-size="36" font-weight="800" fill="#0369a1">der Mann.</text>
<text x="56" y="302" font-size="27" fill="currentColor" opacity="0.8">done to</text>
<text x="470" y="302" font-size="27" fill="currentColor" opacity="0.8">doer</text>
<rect x="24" y="352" width="952" height="146" rx="16" fill="#0f766e" opacity="0.13"/>
<text x="500" y="402" font-size="30" font-weight="800" fill="#0f766e" text-anchor="middle">Same word order. Opposite meaning.</text>
<text x="500" y="448" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">English marks the roles by position. German marks them</text>
<text x="500" y="482" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">on the article, which is why word order can move.</text>
</svg>
<figcaption><strong>Only the masculine article visibly changes, which is both the clearest example and the reason this is hard.</strong> For feminine and neuter nouns nominative and accusative look identical, so the contrast is invisible and learners conclude the case does not matter until they meet a der that became den.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">The functional pressure is identifiability</span><p>A language needs to distinguish who did what to whom. It can do that positionally or morphologically, and either suffices, so a language that has one tends to lose the other. German has retained enough marking that order can carry information structure instead, which is a different job rather than a redundant one.</p></div>
<h3>Syncretism is the learner's real obstacle</h3>
<p>German case marking is heavily syncretic: die covers feminine nominative, feminine accusative, plural nominative and plural accusative. So the paradigm has sixteen cells and far fewer distinct forms, and the learner cannot rely on hearing the distinction. This is why comprehension outruns production for a long time, and why reading reinforces the system faster than listening does.</p>
<h3>What to do about it practically</h3>
<p>Drill the masculine singular until it is automatic, because it is the only fully distinct column and it is where errors are audible. Then drill the pronouns, which are distinct across the board. Those two carry most of the functional load; the rest of the paradigm is largely invisible and can be acquired by exposure.</p>`,
    },
    worksheets: [
      {
        n: 1,
        title: "Fill the case table, then use it",
        difficulty: "Medium",
        brief: `<p><strong>Part A.</strong> Complete the article table for the nominative and the accusative. Give the definite article (der, die, das) and the indefinite one (ein, eine, einen). For the plural indefinite, write <em>keine</em>, since there is no plural of ein.</p>
<p>Before you start, notice how little actually changes. Only one cell in the whole accusative row differs from the nominative above it, and finding that cell is the point of this exercise.</p>
<p><strong>Part B.</strong> Choose the right article for each sentence from the dropdown.</p>
<ol>
<li>Ich sehe ___ Mann. (der Mann)</li>
<li>Er kauft ___ Zeitung. (die Zeitung)</li>
<li>Wir haben ___ Hund. (der Hund, indefinite)</li>
<li>Das Geschenk ist für ___ Lehrer. (der Lehrer)</li>
</ol>`,
        stubLabel: "Form",
        columns: [
          { key: "def", label: "Definite", type: "text", flex: 1 },
          { key: "indef", label: "Indefinite", type: "text", flex: 1 },
          {
            key: "pick",
            label: "Sentence answer",
            type: "select",
            options: ["der", "die", "das", "den", "ein", "eine", "einen"],
            flex: 1.3,
          },
        ],
        rows: [
          { key: "mn", label: "A · Masculine nominative" },
          { key: "fn", label: "A · Feminine nominative" },
          { key: "nn", label: "A · Neuter nominative" },
          { key: "pn", label: "A · Plural nominative" },
          { key: "ma", label: "A · Masculine accusative" },
          { key: "fa", label: "A · Feminine accusative" },
          { key: "na", label: "A · Neuter accusative" },
          { key: "pa", label: "A · Plural accusative" },
          { key: "s1", label: "B1 · Ich sehe ___ Mann" },
          { key: "s2", label: "B2 · Er kauft ___ Zeitung" },
          { key: "s3", label: "B3 · Wir haben ___ Hund" },
          { key: "s4", label: "B4 · Das Geschenk ist für ___ Lehrer" },
        ],
        cells: [
          { row: "mn", col: "def", expected: "der", marks: 1 },
          { row: "mn", col: "indef", expected: "ein", marks: 1 },
          { row: "fn", col: "def", expected: "die", marks: 1 },
          { row: "fn", col: "indef", expected: "eine", marks: 1 },
          { row: "nn", col: "def", expected: "das", marks: 1 },
          { row: "nn", col: "indef", expected: "ein", marks: 1 },
          { row: "pn", col: "def", expected: "die", marks: 1 },
          { row: "pn", col: "indef", expected: "keine", marks: 1, feedback: "There is no plural of ein, so the indefinite plural is carried by keine." },
          {
            row: "ma",
            col: "def",
            expected: "den",
            marks: 3,
            feedback:
              "This is the only cell in the entire singular table that changes between nominative and accusative. Everything else is identical to the row above it.",
          },
          { row: "ma", col: "indef", expected: "einen", marks: 2, feedback: "ein becomes einen, following der to den. The same happens to kein and mein." },
          { row: "fa", col: "def", expected: "die", marks: 1 },
          { row: "fa", col: "indef", expected: "eine", marks: 1 },
          { row: "na", col: "def", expected: "das", marks: 1 },
          { row: "na", col: "indef", expected: "ein", marks: 1 },
          { row: "pa", col: "def", expected: "die", marks: 1 },
          { row: "pa", col: "indef", expected: "keine", marks: 1 },
          {
            row: "s1",
            col: "pick",
            expected: "den",
            marks: 2,
            feedback: "Mann is masculine and it is the thing being seen, so it is the direct object and takes den.",
          },
          {
            row: "s2",
            col: "pick",
            expected: "die",
            marks: 2,
            feedback: "Zeitung is feminine, and the feminine accusative is identical to the nominative. Nothing changes.",
          },
          {
            row: "s3",
            col: "pick",
            expected: "einen",
            marks: 2,
            feedback: "Hund is masculine and indefinite, and it is what we have, so ein becomes einen.",
          },
          {
            row: "s4",
            col: "pick",
            expected: "den",
            marks: 3,
            feedback:
              "für is one of the five prepositions that always take the accusative, whatever the meaning. Lehrer is masculine, so den. The others are durch, gegen, ohne and um.",
          },
        ],
        invariants: [],
        hints: [
          "Write the nominative row first, then copy it down into the accusative row, and only then change whatever actually differs. You will find there is far less to change than you expect.",
          "In the singular, only the masculine changes. Feminine, neuter and plural are identical in both cases.",
          "For B4, do not reason about meaning. für belongs to a closed set of five prepositions that take the accusative regardless: durch, für, gegen, ohne, um.",
        ],
        workedAnswer: `<table>
<tr><th></th><th>Nominative</th><th>Accusative</th></tr>
<tr><td>Masculine</td><td>der / ein</td><td><strong>den / einen</strong></td></tr>
<tr><td>Feminine</td><td>die / eine</td><td>die / eine</td></tr>
<tr><td>Neuter</td><td>das / ein</td><td>das / ein</td></tr>
<tr><td>Plural</td><td>die / keine</td><td>die / keine</td></tr>
</table>
<p><strong>One cell changes.</strong> That is the whole accusative in the singular. The table is usually presented as eight boxes to memorise, which makes it look like a burden; seen as "copy the row down and change the masculine" it is one fact. Learn der to den properly and you have three quarters of the case.</p>
<p><strong>Part B.</strong> Ich sehe <strong>den</strong> Mann. Er kauft <strong>die</strong> Zeitung. Wir haben <strong>einen</strong> Hund. Das Geschenk ist für <strong>den</strong> Lehrer.</p>
<p><strong>Why this matters more than it looks.</strong> English works out who did what from position: the dog bites the man and the man bites the dog use identical words to opposite effect. German marks it on the article instead, which is why German can say den Mann sehe ich without anyone losing track. The case ending is doing the job English gives to word order, and that is the point of the whole system rather than a decorative ending.</p>
<p><strong>Where the system runs out.</strong> Because only the masculine is marked, a sentence like die Mutter sieht die Tochter is genuinely ambiguous, and native speakers resolve it by assuming subject first. That is not a flaw: it shows that case and word order are two mechanisms for one job, and German falls back on position exactly where its morphology has nothing to say.</p>
<p><strong>The five to memorise as a block.</strong> durch, für, gegen, ohne, um. They take the accusative whatever the meaning, so there is nothing to reason about and reasoning about it is how learners get it wrong.</p>`,
        minutes: 20,
        skills: ["Nominative", "Accusative", "Case marking", "Masculine der to den"],
      },
    ],
    questions: [
      {
        n: 1,
        question: "Which article is correct: Ich sehe ___ Mann?",
        options: ["den", "der", "dem", "das"],
        answer: 0,
        explanation:
          "Mann is masculine and is the thing being seen, so it is the direct object and takes the accusative den. This is the only article that visibly changes between nominative and accusative in the singular.",
        difficulty: "Easy",
        skill: "Accusative",
      },
      {
        n: 2,
        question: "How many of the four singular and plural definite articles change between nominative and accusative?",
        options: ["One", "Two", "Three", "All four"],
        answer: 0,
        explanation:
          "Only masculine der becomes den. Feminine, neuter and plural are identical in both cases, which is why the accusative is far less work than the table makes it look.",
        difficulty: "Medium",
        skill: "Case marking",
      },
      {
        n: 3,
        question: "Das Geschenk ist für ___ Lehrer. The correct article is den because:",
        options: [
          "für always takes the accusative, regardless of meaning",
          "Lehrer is the subject of the sentence",
          "Geschenk is neuter",
          "The sentence is in the past tense",
        ],
        answer: 0,
        explanation:
          "durch, für, gegen, ohne and um are a closed set that take the accusative whatever is going on semantically. There is nothing to reason about, and reasoning about it is how learners get it wrong.",
        difficulty: "Medium",
        skill: "Accusative prepositions",
      },
      {
        n: 4,
        question: "Why is die Mutter sieht die Tochter ambiguous?",
        options: [
          "Feminine articles are identical in nominative and accusative, so nothing marks the roles",
          "Mutter and Tochter are both plural",
          "The verb sehen can mean two different things",
          "It is not ambiguous; it can only mean one thing",
        ],
        answer: 0,
        explanation:
          "With no visible case distinction the morphology cannot say who is seeing whom, so word order takes over and speakers default to subject first. It shows that case and position are two mechanisms for the same job, used where each is available.",
        difficulty: "Hard",
        skill: "Case marking",
      },
      {
        n: 5,
        question: "Den Mann sehe ich is:",
        options: [
          "Grammatical, meaning the same as ich sehe den Mann with added emphasis",
          "Ungrammatical, because the object cannot come first",
          "A question rather than a statement",
          "Grammatical but means the man sees me",
        ],
        answer: 0,
        explanation:
          "The case marking on den keeps the roles clear no matter where the words sit, so fronting the object is a matter of emphasis rather than meaning. English cannot do this because it has nothing but position to carry the information.",
        difficulty: "Hard",
        skill: "Nominative",
      },
      {
        n: 6,
        question: "Wir haben ___ Hund. The correct form is:",
        options: ["einen", "ein", "eine", "einem"],
        answer: 0,
        explanation:
          "Hund is masculine and indefinite and is the direct object, so ein takes the accusative ending and becomes einen. The same change applies to kein and to the possessives: keinen, meinen.",
        difficulty: "Easy",
        skill: "Direct object",
      },
    ],
  },
  /* ===================================================================== */
  5100: {
    topicId: 5100,
    title: "The dative, and the verbs that demand it",
    summary:
      "The case for the person something is done for or given to, plus a short list of verbs that take it for no reason you can derive.",
    concepts: ["Dative", "Indirect object", "Dative prepositions", "Dative verbs", "Plural n"],
    glossary: {
      Dative: "The case of the indirect object, the recipient or beneficiary of an action.",
      "Indirect object": "The person something is given, sent, shown or bought for.",
      "Dative prepositions": "aus, bei, mit, nach, seit, von, zu, which always take the dative.",
      "Dative verbs": "Verbs such as helfen, danken, gehören and gefallen whose object is dative rather than accusative.",
      "Plural n": "In the dative plural every noun adds an -n unless it already ends in one.",
      "Two-way prepositions": "in, an, auf and others which take accusative for movement into a place and dative for position within it.",
    },
    body: {
      Beginner: `<p>The dative marks the person something is given, said or done to. It is a third set of articles.</p>
<figure>
<svg viewBox="0 0 1000 500" role="img" aria-label="A sentence with a giver, a thing given and a receiver in the dative">
<rect x="24" y="40" width="952" height="140" rx="16" fill="currentColor" opacity="0.06"/>
<text x="56" y="100" font-size="34" font-weight="800" fill="#0369a1">Ich</text>
<text x="170" y="100" font-size="34" font-weight="800" fill="currentColor">gebe</text>
<text x="310" y="100" font-size="34" font-weight="800" fill="#b45309">dem Mann</text>
<text x="590" y="100" font-size="34" font-weight="800" fill="#be123c">das Buch.</text>
<text x="56" y="150" font-size="26" fill="currentColor" opacity="0.8">who</text>
<text x="310" y="150" font-size="26" font-weight="800" fill="#b45309">to whom</text>
<text x="590" y="150" font-size="26" font-weight="800" fill="#be123c">what</text>
<rect x="24" y="208" width="464" height="118" rx="14" fill="#b45309" opacity="0.14"/>
<text x="256" y="252" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">DATIVE</text>
<text x="256" y="296" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">dem, der, dem, den</text>
<rect x="512" y="208" width="464" height="118" rx="14" fill="#be123c" opacity="0.14"/>
<text x="744" y="252" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">ACCUSATIVE</text>
<text x="744" y="296" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">den, die, das, die</text>
<rect x="24" y="352" width="952" height="126" rx="16" fill="#0f766e" opacity="0.13"/>
<text x="500" y="402" font-size="30" font-weight="800" fill="#0f766e" text-anchor="middle">Some verbs take dative with no accusative at all.</text>
<text x="500" y="448" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">helfen, danken, folgen, gehoeren, passen</text>
</svg>
<figcaption><strong>Ich helfe dir, never Ich helfe dich.</strong> These verbs take a dative object where English uses a plain one, so there is nothing in the meaning to remind you. They are a short list and they are worth learning as a list.</figcaption>
</figure>
<h3>The articles</h3>
<table>
<tr><th></th><th>Masculine</th><th>Feminine</th><th>Neuter</th><th>Plural</th></tr>
<tr><td>Dative</td><td>dem</td><td>der</td><td>dem</td><td>den</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Ich gebe dem Mann das Buch</span><p>The man receives, so he is dative. The book is what is given, so it is accusative. Receiver first, thing second.</p></div>
<div class="warning"><span class="callout-label">Plural dative adds an n to the noun too</span><p>den Kindern, not den Kinder. It is the one place the noun itself changes, and it is easy to forget.</p></div>`,
      Intermediate: `<p>Two things trigger the dative: a verb that demands it, and a preposition that takes it. Both are lists.</p>
<figure>
<svg viewBox="0 0 1000 500" role="img" aria-label="A sentence with a giver, a thing given and a receiver in the dative">
<rect x="24" y="40" width="952" height="140" rx="16" fill="currentColor" opacity="0.06"/>
<text x="56" y="100" font-size="34" font-weight="800" fill="#0369a1">Ich</text>
<text x="170" y="100" font-size="34" font-weight="800" fill="currentColor">gebe</text>
<text x="310" y="100" font-size="34" font-weight="800" fill="#b45309">dem Mann</text>
<text x="590" y="100" font-size="34" font-weight="800" fill="#be123c">das Buch.</text>
<text x="56" y="150" font-size="26" fill="currentColor" opacity="0.8">who</text>
<text x="310" y="150" font-size="26" font-weight="800" fill="#b45309">to whom</text>
<text x="590" y="150" font-size="26" font-weight="800" fill="#be123c">what</text>
<rect x="24" y="208" width="464" height="118" rx="14" fill="#b45309" opacity="0.14"/>
<text x="256" y="252" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">DATIVE</text>
<text x="256" y="296" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">dem, der, dem, den</text>
<rect x="512" y="208" width="464" height="118" rx="14" fill="#be123c" opacity="0.14"/>
<text x="744" y="252" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">ACCUSATIVE</text>
<text x="744" y="296" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">den, die, das, die</text>
<rect x="24" y="352" width="952" height="126" rx="16" fill="#0f766e" opacity="0.13"/>
<text x="500" y="402" font-size="30" font-weight="800" fill="#0f766e" text-anchor="middle">Some verbs take dative with no accusative at all.</text>
<text x="500" y="448" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">helfen, danken, folgen, gehoeren, passen</text>
</svg>
<figcaption><strong>Ich helfe dir, never Ich helfe dich.</strong> These verbs take a dative object where English uses a plain one, so there is nothing in the meaning to remind you. They are a short list and they are worth learning as a list.</figcaption>
</figure>
<h3>Verbs that take dative</h3>
<table>
<tr><th>Verb</th><th>Means</th><th>Example</th></tr>
<tr><td>helfen</td><td>to help</td><td>Ich helfe dir</td></tr>
<tr><td>danken</td><td>to thank</td><td>Ich danke Ihnen</td></tr>
<tr><td>gehoeren</td><td>to belong to</td><td>Das gehoert mir</td></tr>
<tr><td>folgen</td><td>to follow</td><td>Folgen Sie mir</td></tr>
<tr><td>passen</td><td>to suit, to fit</td><td>Das passt mir</td></tr>
</table>
<div class="warning"><span class="callout-label">Nothing in the meaning predicts these</span><p>Helping somebody feels like doing something to them, which is why Ich helfe dich is such a natural mistake. The list is short, so learn it as a list rather than looking for a reason.</p></div>
<h3>Prepositions that always take dative</h3>
<p>aus, bei, mit, nach, seit, von, zu. They are extremely common, which means the dative arrives constantly and is worth getting right early.</p>`,
      Advanced: `<p>The two-way prepositions are where the dative becomes interesting, because the case choice carries meaning rather than being fixed.</p>
<figure>
<svg viewBox="0 0 1000 500" role="img" aria-label="A sentence with a giver, a thing given and a receiver in the dative">
<rect x="24" y="40" width="952" height="140" rx="16" fill="currentColor" opacity="0.06"/>
<text x="56" y="100" font-size="34" font-weight="800" fill="#0369a1">Ich</text>
<text x="170" y="100" font-size="34" font-weight="800" fill="currentColor">gebe</text>
<text x="310" y="100" font-size="34" font-weight="800" fill="#b45309">dem Mann</text>
<text x="590" y="100" font-size="34" font-weight="800" fill="#be123c">das Buch.</text>
<text x="56" y="150" font-size="26" fill="currentColor" opacity="0.8">who</text>
<text x="310" y="150" font-size="26" font-weight="800" fill="#b45309">to whom</text>
<text x="590" y="150" font-size="26" font-weight="800" fill="#be123c">what</text>
<rect x="24" y="208" width="464" height="118" rx="14" fill="#b45309" opacity="0.14"/>
<text x="256" y="252" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">DATIVE</text>
<text x="256" y="296" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">dem, der, dem, den</text>
<rect x="512" y="208" width="464" height="118" rx="14" fill="#be123c" opacity="0.14"/>
<text x="744" y="252" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">ACCUSATIVE</text>
<text x="744" y="296" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">den, die, das, die</text>
<rect x="24" y="352" width="952" height="126" rx="16" fill="#0f766e" opacity="0.13"/>
<text x="500" y="402" font-size="30" font-weight="800" fill="#0f766e" text-anchor="middle">Some verbs take dative with no accusative at all.</text>
<text x="500" y="448" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">helfen, danken, folgen, gehoeren, passen</text>
</svg>
<figcaption><strong>Ich helfe dir, never Ich helfe dich.</strong> These verbs take a dative object where English uses a plain one, so there is nothing in the meaning to remind you. They are a short list and they are worth learning as a list.</figcaption>
</figure>
<table>
<tr><th>Question</th><th>Case</th><th>Example</th></tr>
<tr><td>wo, where something is</td><td>Dative</td><td>Ich bin in der Stadt</td></tr>
<tr><td>wohin, where it goes</td><td>Accusative</td><td>Ich gehe in die Stadt</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Location against direction</span><p>in, an, auf, unter, ueber, vor, hinter, neben and zwischen all work this way. The same preposition with the same noun means two different things depending on the case, which is the clearest demonstration in the language that case is carrying meaning rather than decorating it.</p></div>
<h3>Word order among objects</h3>
<p>Two full nouns go dative then accusative: Ich gebe dem Mann das Buch. But pronouns come first and run accusative before dative: Ich gebe es ihm. The order inverts depending on what kind of word it is, which is not intuitive and is worth drilling as two separate patterns.</p>`,
      Expert: `<p>Historically the dative is the indirect object case and it has absorbed functions the genitive and the instrumental once carried, which is why its modern distribution looks untidy.</p>
<figure>
<svg viewBox="0 0 1000 500" role="img" aria-label="A sentence with a giver, a thing given and a receiver in the dative">
<rect x="24" y="40" width="952" height="140" rx="16" fill="currentColor" opacity="0.06"/>
<text x="56" y="100" font-size="34" font-weight="800" fill="#0369a1">Ich</text>
<text x="170" y="100" font-size="34" font-weight="800" fill="currentColor">gebe</text>
<text x="310" y="100" font-size="34" font-weight="800" fill="#b45309">dem Mann</text>
<text x="590" y="100" font-size="34" font-weight="800" fill="#be123c">das Buch.</text>
<text x="56" y="150" font-size="26" fill="currentColor" opacity="0.8">who</text>
<text x="310" y="150" font-size="26" font-weight="800" fill="#b45309">to whom</text>
<text x="590" y="150" font-size="26" font-weight="800" fill="#be123c">what</text>
<rect x="24" y="208" width="464" height="118" rx="14" fill="#b45309" opacity="0.14"/>
<text x="256" y="252" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">DATIVE</text>
<text x="256" y="296" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">dem, der, dem, den</text>
<rect x="512" y="208" width="464" height="118" rx="14" fill="#be123c" opacity="0.14"/>
<text x="744" y="252" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">ACCUSATIVE</text>
<text x="744" y="296" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">den, die, das, die</text>
<rect x="24" y="352" width="952" height="126" rx="16" fill="#0f766e" opacity="0.13"/>
<text x="500" y="402" font-size="30" font-weight="800" fill="#0f766e" text-anchor="middle">Some verbs take dative with no accusative at all.</text>
<text x="500" y="448" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">helfen, danken, folgen, gehoeren, passen</text>
</svg>
<figcaption><strong>Ich helfe dir, never Ich helfe dich.</strong> These verbs take a dative object where English uses a plain one, so there is nothing in the meaning to remind you. They are a short list and they are worth learning as a list.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">Dative verbs are a historical residue, not a semantic class</span><p>Attempts to find a unifying meaning, such as the object being affected rather than acted upon, work for some of the list and not for others. The honest position is that this is lexical information attached to each verb, and treating it as vocabulary rather than as grammar is both accurate and faster.</p></div>
<h3>The genitive is retreating into the dative</h3>
<p>Spoken German increasingly uses von plus dative where the genitive was once required: das Auto von meinem Bruder rather than das Auto meines Bruders. Written and formal registers retain the genitive. A learner should be able to recognise both and will be understood using either, but should match the register of the context.</p>
<h3>Why dative errors are more tolerated than case errors generally</h3>
<p>Word order and context usually recover the intended meaning, so Ich helfe dich is understood immediately. It is nevertheless one of the most recognisable non-native markers, precisely because the verbs involved are so common that a native speaker has never heard them any other way.</p>`,
    },
    worksheets: [
      {
        n: 1,
        title: "Dative articles, prepositions and the verbs that demand it",
        difficulty: "Hard",
        brief: `<p><strong>Part A.</strong> Complete the dative row of the article table. Unlike the accusative, every single form changes, and one of them collides with a form you already know.</p>
<p><strong>Part B.</strong> Choose the right article for each sentence.</p>
<ol>
<li>Ich gebe ___ Mann das Buch. (der Mann)</li>
<li>Sie hilft ___ Frau. (die Frau, and helfen takes the dative)</li>
<li>Wir fahren mit ___ Bus. (der Bus)</li>
<li>Das Buch gehört ___ Kindern. (die Kinder, plural)</li>
</ol>
<p><strong>Part C.</strong> In the plural dative the noun itself changes. Write the correct plural noun form after den for each of the three given.</p>`,
        stubLabel: "Form",
        columns: [
          { key: "def", label: "Definite", type: "text", flex: 1 },
          { key: "indef", label: "Indefinite", type: "text", flex: 1 },
          {
            key: "pick",
            label: "Sentence answer",
            type: "select",
            options: ["der", "die", "das", "den", "dem", "einem", "einer"],
            flex: 1.3,
          },
          { key: "noun", label: "Plural noun after den", type: "text", flex: 1.2 },
        ],
        rows: [
          { key: "md", label: "A · Masculine dative" },
          { key: "fd", label: "A · Feminine dative" },
          { key: "nd", label: "A · Neuter dative" },
          { key: "pd", label: "A · Plural dative" },
          { key: "s1", label: "B1 · Ich gebe ___ Mann das Buch" },
          { key: "s2", label: "B2 · Sie hilft ___ Frau" },
          { key: "s3", label: "B3 · Wir fahren mit ___ Bus" },
          { key: "s4", label: "B4 · Das Buch gehört ___ Kindern" },
          { key: "c1", label: "C1 · die Kinder, after den", given: { def: "", indef: "", pick: "" } },
          { key: "c2", label: "C2 · die Häuser, after den", given: { def: "", indef: "", pick: "" } },
          { key: "c3", label: "C3 · die Autos, after den", given: { def: "", indef: "", pick: "" } },
        ],
        cells: [
          { row: "md", col: "def", expected: "dem", marks: 2 },
          { row: "md", col: "indef", expected: "einem", marks: 1 },
          {
            row: "fd",
            col: "def",
            expected: "der",
            marks: 3,
            feedback:
              "The feminine dative is der, which is identical to the masculine nominative. Only the verb and the context tell them apart, and this collision confuses learners for a long time.",
          },
          { row: "fd", col: "indef", expected: "einer", marks: 2 },
          { row: "nd", col: "def", expected: "dem", marks: 2, feedback: "Neuter takes the same dem as masculine." },
          { row: "nd", col: "indef", expected: "einem", marks: 1 },
          {
            row: "pd",
            col: "def",
            expected: "den",
            marks: 2,
            feedback: "Plural dative is den, which collides with the masculine accusative. Context again does the work.",
          },
          { row: "pd", col: "indef", expected: "keinen", marks: 1 },
          { row: "s1", col: "pick", expected: "dem", marks: 2, feedback: "The man is the recipient, so he is the indirect object and takes the dative." },
          {
            row: "s2",
            col: "pick",
            expected: "der",
            marks: 3,
            feedback:
              "helfen takes a dative object, not an accusative one. There is no rule behind this, it is a lexical list: helfen, danken, folgen, gratulieren, antworten, gehören, gefallen.",
          },
          {
            row: "s3",
            col: "pick",
            expected: "dem",
            marks: 2,
            feedback: "mit is one of the seven prepositions that always take the dative: aus, bei, mit, nach, seit, von, zu.",
          },
          { row: "s4", col: "pick", expected: "den", marks: 2, feedback: "gehören takes the dative, and the plural dative article is den." },
          {
            row: "c1",
            col: "noun",
            expected: "Kindern",
            marks: 2,
            accepts: ["kindern"],
            feedback: "The dative plural adds -n to the noun itself. This is the only place in modern German where a case ending lands on the noun rather than on its determiner.",
          },
          { row: "c2", col: "noun", expected: "Häusern", marks: 2, accepts: ["hausern", "haeusern"] },
          {
            row: "c3",
            col: "noun",
            expected: "Autos",
            marks: 3,
            accepts: ["autos"],
            feedback:
              "No extra -n here. The -s plural class is the one systematic exception, and it follows from these being loanwords rather than from anything structural.",
          },
        ],
        invariants: [],
        hints: [
          "Every form changes in the dative, unlike the accusative where only the masculine moved. Two of the four forms you write will look like forms you already know from other cases.",
          "For part B, ask what each verb demands rather than what the meaning suggests. Two of these four sentences are governed by a verb or a preposition that simply takes the dative.",
          "For part C, add -n to the plural unless it already ends in one or it is an -s plural. Kinder becomes Kindern, Häuser becomes Häusern, and Autos stays Autos.",
        ],
        workedAnswer: `<table>
<tr><th></th><th>Nominative</th><th>Accusative</th><th>Dative</th></tr>
<tr><td>Masculine</td><td>der / ein</td><td>den / einen</td><td><strong>dem / einem</strong></td></tr>
<tr><td>Feminine</td><td>die / eine</td><td>die / eine</td><td><strong>der / einer</strong></td></tr>
<tr><td>Neuter</td><td>das / ein</td><td>das / ein</td><td><strong>dem / einem</strong></td></tr>
<tr><td>Plural</td><td>die / keine</td><td>die / keine</td><td><strong>den / keinen, plus -n on the noun</strong></td></tr>
</table>
<p><strong>Part B.</strong> Ich gebe <strong>dem</strong> Mann das Buch. Sie hilft <strong>der</strong> Frau. Wir fahren mit <strong>dem</strong> Bus. Das Buch gehört <strong>den</strong> Kindern.</p>
<p><strong>Part C.</strong> den Kinder<strong>n</strong>, den Häuser<strong>n</strong>, den Autos.</p>
<p><strong>The collision that costs learners months.</strong> Feminine dative is der, which is spelled and pronounced exactly like masculine nominative der. Der Frau can be read correctly only from the verb and the context, and until that becomes automatic, learners parse a lot of sentences backwards. The plural dative den collides with the masculine accusative in the same way.</p>
<p><strong>Why sentence 2 is the one worth remembering.</strong> Nothing about helfen suggests a dative. The person being helped is being directly acted upon, which is exactly what the accusative is for, and German uses the dative anyway. It is a lexical class: helfen, danken, folgen, gratulieren, antworten, gehören, gefallen, passen, schmecken. The weak generalisation is that they involve a person affected rather than acted upon, which is enough to make the list memorable without making it derivable.</p>
<p><strong>And the one that reverses on you.</strong> Gefallen puts the thing in the subject position and the person in the dative: das Buch gefällt mir means I like the book. Learners produce ich gefalle das Buch, which means roughly the book finds me pleasing. Schmecken and gehören work the same way, and seeing them as one class rather than three oddities is what makes them stick.</p>
<p><strong>The -n on the noun.</strong> It is the last surviving place where German marks case on the noun itself rather than only on the article, and leaving it off is one of the most audible learner errors there is. Only the -s plurals escape it.</p>`,
        minutes: 24,
        skills: ["Dative", "Indirect object", "Dative verbs", "Plural n"],
      },
    ],
    speaking: [
      {
        n: 1,
        kind: "respond",
        title: "Say what you are giving to whom",
        level: "CEFR A1",
        lang: "de-DE",
        prompt: `<p>Answer out loud, in German. You are describing what you bought for your family on a trip.</p>
<p><strong>Say four things</strong>, each one naming a person and a present, using geben, kaufen or schenken. For example: Ich schenke meiner Mutter ein Buch.</p>
<p>The dative is the assessment. Every person you mention is a recipient and therefore dative, and at least one of them should be plural so the -n on the noun has to appear.</p>
<p>Speak for about forty seconds. Accent does not matter here. Getting dem, der and den onto the right people does.</p>`,
        mustMention: [
          "A masculine recipient, so dem or meinem",
          "A feminine recipient, so der or meiner",
          "A plural recipient, with the -n added to the noun",
          "At least one of geben, kaufen or schenken",
        ],
        seconds: 40,
        rubric: [
          {
            key: "dative",
            label: "Dative marking on recipients",
            bands: [
              "Recipients left in the nominative throughout",
              "One or two recipients marked, the rest not",
              "Every recipient correctly in the dative",
              "Every recipient correct including the plural, with the -n on the noun actually produced",
            ],
            weight: 3,
          },
          {
            key: "structure",
            label: "Two-object sentences hold together",
            bands: [
              "Only one object per sentence, so the structure is not being practised",
              "Both objects present but in an order that obscures which is which",
              "Dative person and accusative thing both present and correctly ordered",
              "All of that, varied across at least two different verbs rather than repeating one frame",
            ],
            weight: 3,
          },
          {
            key: "coverage",
            label: "Four distinct recipients covering the genders",
            bands: [
              "Fewer than three recipients given",
              "Three or four, but all the same gender",
              "Four recipients covering masculine, feminine and plural",
              "Four covering all three, produced without long pauses to work out the article",
            ],
            weight: 2,
          },
          {
            key: "delivery",
            label: "Spoken rather than recited",
            bands: [
              "Long gaps while each article is worked out",
              "Hesitant but continuous",
              "Reasonably fluent at a workable pace",
              "Fluent enough that the case marking is clearly automatic rather than computed",
            ],
            weight: 2,
          },
        ],
        skills: ["Dative", "Indirect object", "Plural n"],
      },
    ],
  },

  /* ===================================================================== */
  5101: {
    topicId: 5101,
    title: "Word order: the verb-second rule and the bracket",
    summary:
      "Two rules govern almost every German sentence. The finite verb is second in a main clause, and anything else verbal goes to the end.",
    concepts: ["Verb second", "Sentence bracket", "Subordinate clause", "Inversion", "Time manner place"],
    glossary: {
      "Verb second": "The finite verb occupies the second position in a main clause, whatever comes first.",
      "Sentence bracket": "The frame made by the finite verb near the front and the rest of the verb cluster at the end.",
      "Subordinate clause": "A clause introduced by weil, dass, wenn and similar, where the finite verb goes last.",
      Inversion: "Subject and verb swapping when something other than the subject opens the sentence.",
      "Time manner place": "The default ordering of adverbials in the middle field: when, how, where.",
      Mittelfeld: "The middle field between the two halves of the sentence bracket, where the flexible material sits.",
    },
    body: {
      Beginner: `<p>German word order is not free, and it is not English order either. One rule explains most of it: in a normal statement, the conjugated verb is the second thing in the sentence.</p>
<figure>
<svg viewBox="0 0 1000 600" role="img" aria-label="Three German sentences showing the conjugated verb always landing in second position">
<rect x="24" y="36" width="300" height="72" rx="12" fill="currentColor" opacity="0.07"/>
<text x="174" y="84" font-size="28" font-weight="800" fill="currentColor" opacity="0.6" text-anchor="middle">POSITION 1</text>
<rect x="336" y="36" width="220" height="72" rx="12" fill="#be123c" opacity="0.2"/>
<text x="446" y="84" font-size="28" font-weight="800" fill="#be123c" text-anchor="middle">THE VERB</text>
<rect x="568" y="36" width="408" height="72" rx="12" fill="currentColor" opacity="0.07"/>
<text x="772" y="84" font-size="28" font-weight="800" fill="currentColor" opacity="0.6" text-anchor="middle">EVERYTHING ELSE</text>
<text x="40" y="186" font-size="34" font-weight="800" fill="currentColor">Ich</text>
<rect x="336" y="146" width="220" height="60" rx="10" fill="#be123c" opacity="0.2"/>
<text x="446" y="188" font-size="34" font-weight="800" fill="#be123c" text-anchor="middle">gehe</text>
<text x="584" y="186" font-size="34" font-weight="800" fill="currentColor">heute ins Kino.</text>
<text x="40" y="288" font-size="34" font-weight="800" fill="currentColor">Heute</text>
<rect x="336" y="248" width="220" height="60" rx="10" fill="#be123c" opacity="0.2"/>
<text x="446" y="290" font-size="34" font-weight="800" fill="#be123c" text-anchor="middle">gehe</text>
<text x="584" y="288" font-size="34" font-weight="800" fill="currentColor">ich ins Kino.</text>
<text x="40" y="390" font-size="34" font-weight="800" fill="currentColor">Ins Kino</text>
<rect x="336" y="350" width="220" height="60" rx="10" fill="#be123c" opacity="0.2"/>
<text x="446" y="392" font-size="34" font-weight="800" fill="#be123c" text-anchor="middle">gehe</text>
<text x="584" y="390" font-size="34" font-weight="800" fill="currentColor">ich heute.</text>
<rect x="24" y="446" width="952" height="130" rx="16" fill="#0f766e" opacity="0.13"/>
<text x="500" y="500" font-size="32" font-weight="800" fill="currentColor" text-anchor="middle">Whatever you put first, the verb does not move.</text>
<text x="500" y="546" font-size="28" fill="currentColor" opacity="0.8" text-anchor="middle">The subject gets pushed behind it instead.</text>
</svg>
<figcaption><strong>German does not fix the subject at the front; it fixes the verb at the second slot.</strong> Position one is a single unit of your choosing, and whatever you put there, the conjugated verb takes slot two and everything else rearranges around it. English speakers get this wrong by keeping the subject first and the verb third.</figcaption>
</figure>
<h3>Second thing, not second word</h3>
<p>Position one is a single unit, and that unit can be several words long. <strong>Mein kleiner Bruder</strong> is one unit. <strong>Am naechsten Montag</strong> is one unit. The verb comes straight after whichever unit you chose.</p>
<table>
<tr><th>Position 1</th><th>Verb</th><th>The rest</th></tr>
<tr><td>Ich</td><td>trinke</td><td>jeden Morgen Kaffee.</td></tr>
<tr><td>Jeden Morgen</td><td>trinke</td><td>ich Kaffee.</td></tr>
<tr><td>Kaffee</td><td>trinke</td><td>ich jeden Morgen.</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Notice what happened to ich</span><p>When something else takes the front, the subject moves behind the verb. It does not disappear and it does not stay put. English does not do this, so it has to become a habit rather than a calculation.</p></div>
<div class="warning"><span class="callout-label">Questions and commands break the rule on purpose</span><p>A yes or no question puts the verb first: <strong>Trinkst du Kaffee?</strong> So does a command. The verb-second rule describes statements.</p></div>`,
      Intermediate: `<p>As soon as a sentence has more than one verb part, German splits them and puts them at opposite ends. The frame they make is called the sentence bracket, and it governs everything in between.</p>
<figure>
<svg viewBox="0 0 1000 560" role="img" aria-label="The German sentence bracket with the conjugated verb second and the other verb part at the end">
<text x="500" y="56" font-size="30" font-weight="800" fill="currentColor" opacity="0.6" text-anchor="middle">DIE SATZKLAMMER</text>
<text x="40" y="150" font-size="34" font-weight="800" fill="currentColor">Ich</text>
<rect x="150" y="108" width="196" height="60" rx="10" fill="#be123c" opacity="0.22"/>
<text x="248" y="150" font-size="34" font-weight="800" fill="#be123c" text-anchor="middle">habe</text>
<text x="380" y="150" font-size="32" fill="currentColor" opacity="0.8">gestern einen Film</text>
<rect x="740" y="108" width="236" height="60" rx="10" fill="#be123c" opacity="0.22"/>
<text x="858" y="150" font-size="34" font-weight="800" fill="#be123c" text-anchor="middle">gesehen.</text>
<path d="M248 180 V222 H858 V180" fill="none" stroke="#be123c" stroke-width="5"/>
<text x="553" y="262" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">the bracket</text>
<text x="553" y="302" font-size="28" fill="currentColor" opacity="0.8" text-anchor="middle">everything else lives inside it</text>
<rect x="24" y="334" width="304" height="100" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="176" y="376" font-size="28" font-weight="800" fill="#7c3aed" text-anchor="middle">VORFELD</text>
<text x="176" y="414" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">one unit, your choice</text>
<rect x="348" y="334" width="304" height="100" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="500" y="376" font-size="28" font-weight="800" fill="#0369a1" text-anchor="middle">MITTELFELD</text>
<text x="500" y="414" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">time, manner, place</text>
<rect x="672" y="334" width="304" height="100" rx="14" fill="#b45309" opacity="0.14"/>
<text x="824" y="376" font-size="28" font-weight="800" fill="#b45309" text-anchor="middle">RIGHT BRACKET</text>
<text x="824" y="414" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">the rest of the verb</text>
<rect x="24" y="460" width="952" height="82" rx="14" fill="#be123c" opacity="0.1"/>
<text x="500" y="512" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">You must hold the second half of the verb until the end.</text>
</svg>
<figcaption><strong>This is why German feels like it withholds the point.</strong> With a perfect tense, a modal or a separable verb, half the meaning is pinned to the far end of the sentence. Listeners cannot stop early, and speakers have to plan the ending before they start the middle.</figcaption>
</figure>
<h3>Three very common structures, all the same shape</h3>
<table>
<tr><th>Structure</th><th>Slot two</th><th>Far end</th></tr>
<tr><td>Perfect tense</td><td>habe or bin</td><td>the past participle</td></tr>
<tr><td>Modal verb</td><td>kann, muss, will</td><td>the infinitive</td></tr>
<tr><td>Separable verb</td><td>the stem</td><td>the prefix</td></tr>
</table>
<p>So <strong>Ich rufe dich morgen an</strong> is the same shape as <strong>Ich habe dich gestern angerufen</strong>. One of them splits a prefix off and the other splits off a participle, but the frame is identical.</p>
<div class="key-idea"><span class="callout-label">The practical consequence for listening</span><p>You cannot know whether somebody is coming or not coming until the end of their sentence. <strong>Ich komme heute Abend nicht mit</strong> reverses at the last word. Interrupting a German sentence early is how you answer a question that was not asked.</p></div>
<div class="warning"><span class="callout-label">And for speaking</span><p>You have to commit to the end of the verb before you build the middle. Learners who start a perfect tense sentence without having chosen the participle run out of sentence. Decide the whole verb first, then fill the middle.</p></div>`,
      Advanced: `<p>The bracket defines three fields, and the interesting one is the middle. Its internal order is not free either, and getting it right is most of what separates fluent-sounding German from understandable German.</p>
<figure>
<svg viewBox="0 0 1000 580" role="img" aria-label="The order of elements inside the middle field, time then manner then place">
<rect x="24" y="40" width="952" height="108" rx="16" fill="#0369a1" opacity="0.12"/>
<text x="500" y="92" font-size="30" font-weight="800" fill="#0369a1" text-anchor="middle">INSIDE THE MITTELFELD</text>
<text x="500" y="132" font-size="28" fill="currentColor" opacity="0.8" text-anchor="middle">Ich fahre morgen mit dem Zug nach Koeln.</text>
<rect x="24" y="178" width="302" height="150" rx="16" fill="#7c3aed" opacity="0.14"/>
<text x="175" y="232" font-size="34" font-weight="800" fill="#7c3aed" text-anchor="middle">TIME</text>
<text x="175" y="276" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">morgen</text>
<text x="175" y="312" font-size="26" fill="currentColor" opacity="0.7" text-anchor="middle">wann</text>
<rect x="348" y="178" width="302" height="150" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="499" y="232" font-size="34" font-weight="800" fill="#0f766e" text-anchor="middle">MANNER</text>
<text x="499" y="276" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">mit dem Zug</text>
<text x="499" y="312" font-size="26" fill="currentColor" opacity="0.7" text-anchor="middle">wie</text>
<rect x="672" y="178" width="304" height="150" rx="16" fill="#b45309" opacity="0.14"/>
<text x="824" y="232" font-size="34" font-weight="800" fill="#b45309" text-anchor="middle">PLACE</text>
<text x="824" y="276" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">nach Koeln</text>
<text x="824" y="312" font-size="26" fill="currentColor" opacity="0.7" text-anchor="middle">wo</text>
<path d="M326 253 H348" stroke="currentColor" opacity="0.5" stroke-width="5"/>
<path d="M360 253 l-20 -10 v20 z" fill="currentColor" opacity="0.5"/>
<path d="M650 253 H672" stroke="currentColor" opacity="0.5" stroke-width="5"/>
<path d="M684 253 l-20 -10 v20 z" fill="currentColor" opacity="0.5"/>
<rect x="24" y="364" width="952" height="92" rx="14" fill="#be123c" opacity="0.12"/>
<text x="500" y="404" font-size="28" font-weight="800" fill="#be123c" text-anchor="middle">English does the opposite.</text>
<text x="500" y="440" font-size="28" fill="currentColor" opacity="0.85" text-anchor="middle">I am going to Cologne by train tomorrow.</text>
<rect x="24" y="478" width="952" height="80" rx="14" fill="#0f766e" opacity="0.12"/>
<text x="500" y="528" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">Pronouns jump ahead of all three.</text>
</svg>
<figcaption><strong>Place last is the single change that makes a sentence sound German rather than translated.</strong> English puts place first and time last, so a learner reproducing English order gets understood and still sounds foreign in every sentence. Pronouns are the exception: they move to the front of the middle field, ahead of time.</figcaption>
</figure>
<h3>Time, manner, place</h3>
<p>The default order inside the middle field is when, then how, then where. English speakers reliably produce the reverse, because English prefers place early and time at the end, and the result is grammatical but audibly translated.</p>
<table>
<tr><th>Element</th><th>Question</th><th>Example</th></tr>
<tr><td>Time</td><td>wann</td><td>morgen, um acht, naechste Woche</td></tr>
<tr><td>Manner</td><td>wie</td><td>mit dem Zug, schnell, gern</td></tr>
<tr><td>Place</td><td>wo or wohin</td><td>nach Koeln, in der Stadt</td></tr>
</table>
<h3>What overrides the default</h3>
<p>Pronouns move to the front of the middle field, ahead of time, and among themselves run accusative before dative: <strong>Ich habe es ihm gestern gegeben.</strong> Note that this is the opposite of the order two full nouns take, where dative comes first.</p>
<div class="key-idea"><span class="callout-label">Why the front slot is the real tool</span><p>Position one is not decoration. Putting a time or an object there is how German marks what the sentence is about, the way English uses stress or a cleft construction. <strong>Diesen Film habe ich schon gesehen</strong> answers a different question from <strong>Ich habe diesen Film schon gesehen</strong>, and both are neutral in isolation.</p></div>
<div class="warning"><span class="callout-label">Nicht has its own position</span><p>It goes before what it negates, but after the middle field when it negates the whole sentence. <strong>Ich komme heute nicht</strong> denies coming. <strong>Ich komme nicht heute</strong> denies today and implies another day.</p></div>`,
      Expert: `<p>The cleanest analysis treats the bracket as structural rather than as a list of rules: German is a verb-final language whose main clauses move the finite verb leftward into a slot that must be preceded by exactly one constituent.</p>
<figure>
<svg viewBox="0 0 1000 600" role="img" aria-label="A main clause compared with a subordinate clause where the verb moves to the end">
<text x="40" y="62" font-size="28" font-weight="800" fill="#0f766e">MAIN CLAUSE</text>
<text x="40" y="128" font-size="32" font-weight="800" fill="currentColor">Ich</text>
<rect x="150" y="90" width="176" height="56" rx="10" fill="#be123c" opacity="0.22"/>
<text x="238" y="130" font-size="32" font-weight="800" fill="#be123c" text-anchor="middle">komme</text>
<text x="350" y="128" font-size="30" fill="currentColor" opacity="0.85">heute nicht.</text>
<text x="40" y="192" font-size="26" fill="currentColor" opacity="0.7">verb in slot two</text>
<path d="M24 232 H976" stroke="currentColor" opacity="0.3" stroke-width="3"/>
<text x="40" y="294" font-size="28" font-weight="800" fill="#b45309">SUBORDINATE CLAUSE</text>
<rect x="150" y="322" width="190" height="56" rx="10" fill="#b45309" opacity="0.22"/>
<text x="245" y="362" font-size="32" font-weight="800" fill="#b45309" text-anchor="middle">weil</text>
<text x="364" y="360" font-size="32" font-weight="800" fill="currentColor">ich krank</text>
<rect x="636" y="322" width="176" height="56" rx="10" fill="#be123c" opacity="0.22"/>
<text x="724" y="362" font-size="32" font-weight="800" fill="#be123c" text-anchor="middle">bin.</text>
<path d="M340 390 V424 H724 V390" fill="none" stroke="#b45309" stroke-width="5"/>
<text x="532" y="464" font-size="28" font-weight="800" fill="#b45309" text-anchor="middle">the conjunction takes the bracket</text>
<rect x="24" y="492" width="952" height="92" rx="14" fill="#0f766e" opacity="0.13"/>
<text x="500" y="532" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">weil, dass, wenn, ob, obwohl, damit</text>
<text x="500" y="568" font-size="27" fill="currentColor" opacity="0.8" text-anchor="middle">each one sends the verb to the end.</text>
</svg>
<figcaption><strong>A subordinating conjunction does not add a rule, it takes over the bracket.</strong> The conjunction occupies the left position the verb held, so the conjugated verb is displaced to the right end. That is why <strong>weil</strong> sends the verb to the end and <strong>denn</strong>, which is coordinating, does not touch it at all.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">Which explains the subordinate clause without a second rule</span><p>A subordinating conjunction occupies the position the finite verb was raised into. That slot can hold one thing, so the verb stays where it started, at the end. Subordinate order is not an exception to verb-second; it is what the sentence looks like when the movement does not happen.</p></div>
<h3>The prediction that confirms the analysis</h3>
<p>Coordinating conjunctions sit outside the clause rather than in that slot, so they should leave the verb alone, and they do. <strong>denn</strong> and <strong>weil</strong> both mean because and behave completely differently: <strong>Ich komme nicht, denn ich bin krank</strong> keeps verb-second, while <strong>weil</strong> sends it to the end. Learners taught these as vocabulary memorise two unrelated facts; learners taught the structure get both from one.</p>
<table>
<tr><th>Type</th><th>Examples</th><th>Effect on the verb</th></tr>
<tr><td>Coordinating</td><td>und, aber, oder, denn, sondern</td><td>None; the clause is untouched</td></tr>
<tr><td>Subordinating</td><td>weil, dass, wenn, ob, obwohl, damit</td><td>Finite verb to the end</td></tr>
<tr><td>Adverbial</td><td>deshalb, trotzdem, dann</td><td>They fill position one, so the subject inverts</td></tr>
</table>
<div class="warning"><span class="callout-label">The third row is the one that catches advanced learners</span><p><strong>deshalb</strong> is not a conjunction; it is an adverb standing in position one. So it is <strong>Deshalb komme ich nicht</strong>, with inversion, and never <strong>Deshalb ich komme nicht</strong>. Every word in that row behaves this way, and the error survives into otherwise fluent speech because the meaning is never in doubt.</p></div>
<h3>What spoken German actually does</h3>
<p>Two divergences are worth knowing. <strong>weil</strong> with main-clause order is extremely common in speech and is stable rather than sloppy, though it is still marked in writing. And the Nachfeld, the position after the right bracket, routinely takes heavy or afterthought material: <strong>Ich habe ihn gesehen, gestern in der Stadt.</strong> Both are normal in conversation and wrong in an exam, which is a distinction worth being explicit about rather than discovering.</p>`,
    },
    worksheets: [
      {
        n: 1,
        title: "Put the verb where German puts it",
        difficulty: "Hard",
        brief: `<p>Each row gives you the elements of a sentence out of order. Write the sentence correctly, then say in the last column which position the finite verb ended up in.</p>
<p>Two rules decide everything here. In a main clause the finite verb is the second <em>element</em>, counting constituents rather than words. After weil, dass or wenn, it goes to the very end. And anything else verbal, a participle, an infinitive or a separable prefix, goes to the end of its own clause.</p>
<table>
<tr><th>#</th><th>Elements</th></tr>
<tr><td>1</td><td>ich / gehe / ins Kino / heute</td></tr>
<tr><td>2</td><td>heute / ich / gehe / ins Kino</td></tr>
<tr><td>3</td><td>ich / habe / gesehen / einen Film / gestern</td></tr>
<tr><td>4</td><td>ich bleibe zu Hause, weil / ich / bin / müde</td></tr>
<tr><td>5</td><td>nächsten Montag / fahre / ich / nach Berlin</td></tr>
</table>`,
        stubLabel: "Sentence",
        columns: [
          { key: "answer", label: "Your sentence", type: "text", flex: 3 },
          {
            key: "pos",
            label: "Finite verb position",
            type: "select",
            options: ["First", "Second element", "Last"],
            flex: 1.4,
          },
        ],
        rows: [
          { key: "q1", label: "1 · ich / gehe / ins Kino / heute" },
          { key: "q2", label: "2 · heute / ich / gehe / ins Kino" },
          { key: "q3", label: "3 · ich / habe / gesehen / einen Film / gestern" },
          { key: "q4", label: "4 · ..., weil / ich / bin / müde" },
          { key: "q5", label: "5 · nächsten Montag / fahre / ich / nach Berlin" },
        ],
        cells: [
          {
            row: "q1",
            col: "answer",
            expected: "Ich gehe heute ins Kino",
            marks: 2,
            accepts: ["ich gehe heute ins kino", "Ich gehe heute ins Kino."],
            feedback: "Subject first, verb second, then the time and the place. Time before place is the default ordering.",
          },
          { row: "q1", col: "pos", expected: "Second element", marks: 1 },
          {
            row: "q2",
            col: "answer",
            expected: "Heute gehe ich ins Kino",
            marks: 3,
            accepts: ["heute gehe ich ins kino", "Heute gehe ich ins Kino."],
            feedback:
              "Fronting heute pushes the subject behind the verb. The verb has not moved: it was second before and it is second now. Writing heute ich gehe is the commonest word order error there is.",
          },
          { row: "q2", col: "pos", expected: "Second element", marks: 1 },
          {
            row: "q3",
            col: "answer",
            expected: "Ich habe gestern einen Film gesehen",
            marks: 3,
            accepts: ["ich habe gestern einen film gesehen", "Ich habe gestern einen Film gesehen."],
            feedback:
              "habe is the finite verb and takes second position; gesehen is the participle and goes to the very end. Everything else sits in the gap between them, which is the sentence bracket.",
          },
          { row: "q3", col: "pos", expected: "Second element", marks: 1 },
          {
            row: "q4",
            col: "answer",
            expected: "weil ich müde bin",
            marks: 3,
            accepts: ["weil ich mude bin", "weil ich muede bin", "Ich bleibe zu Hause, weil ich müde bin"],
            feedback:
              "weil is a subordinating conjunction, so the finite verb goes to the end of its clause. Note that denn means the same thing and does not move the verb, which is why the two are not interchangeable.",
          },
          { row: "q4", col: "pos", expected: "Last", marks: 2 },
          {
            row: "q5",
            col: "answer",
            expected: "Nächsten Montag fahre ich nach Berlin",
            marks: 3,
            accepts: [
              "nachsten montag fahre ich nach berlin",
              "naechsten montag fahre ich nach berlin",
              "Nächsten Montag fahre ich nach Berlin.",
            ],
            feedback:
              "Nächsten Montag is three words and one element, so the verb still comes immediately after it. Counting words rather than constituents is what produces nächsten Montag ich fahre.",
          },
          { row: "q5", col: "pos", expected: "Second element", marks: 2 },
        ],
        invariants: [],
        hints: [
          "Find the finite verb first, the one that is conjugated for the subject. Then ask whether the clause is a main clause or starts with weil, dass or wenn.",
          "Second element means second constituent, not second word. A three-word time phrase counts as one thing.",
          "For sentence 3 there are two verb parts. The conjugated one goes to position two and the participle goes to the very end, which leaves everything else sitting in the gap between them.",
        ],
        workedAnswer: `<ol>
<li><strong>Ich gehe heute ins Kino.</strong> Verb second, time before place.</li>
<li><strong>Heute gehe ich ins Kino.</strong> Verb still second. Fronting the adverb displaced the subject, not the verb.</li>
<li><strong>Ich habe gestern einen Film gesehen.</strong> habe second, gesehen last, everything else in between.</li>
<li><strong>..., weil ich müde bin.</strong> Subordinating conjunction sends the finite verb to the end.</li>
<li><strong>Nächsten Montag fahre ich nach Berlin.</strong> Three words, one element, verb immediately after.</li>
</ol>
<p><strong>Sentences 1 and 2 are the same sentence.</strong> That is the point of putting them next to each other. German word order is not free and it is not fixed either: exactly one thing goes before the finite verb and you choose what. Putting heute there emphasises the time. The verb did not move, and nothing about the meaning changed.</p>
<p><strong>Why learners write "heute ich gehe".</strong> They are counting words. "Second element" counts constituents, and nächsten Montag in sentence 5 is the clearest demonstration: three words occupying one slot. Once you count phrases rather than words, the rule stops producing surprises.</p>
<p><strong>The bracket in sentence 3.</strong> habe near the front and gesehen at the very end, with the content in the gap. German routinely withholds the most informative part of the verb until the end of the clause, which is why you cannot interrupt a German sentence and expect to know what it means. It is also why listening feels harder than reading for much longer than you expect.</p>
<p><strong>The trap in sentence 4.</strong> weil and denn translate identically into English and behave completely differently. Ich bleibe zu Hause, weil ich müde bin, but ich bleibe zu Hause, denn ich bin müde. Weil is subordinating and sends the verb to the end; denn is coordinating and leaves it alone. Choosing denn when you are unsure is a legitimate strategy and native speakers do it too.</p>`,
        minutes: 22,
        skills: ["Verb second", "Sentence bracket", "Subordinate clause", "Inversion"],
      },
    ],
    questions: [
      {
        n: 1,
        question: "Which is correct?",
        options: [
          "Heute gehe ich ins Kino",
          "Heute ich gehe ins Kino",
          "Gehe heute ich ins Kino",
          "Heute ins Kino ich gehe",
        ],
        answer: 0,
        explanation:
          "The finite verb must be the second element. Fronting heute pushes the subject behind the verb rather than moving the verb. Option two is the most common word order error at this level and comes from counting words instead of constituents.",
        difficulty: "Easy",
        skill: "Verb second",
      },
      {
        n: 2,
        question: "In Nächsten Montag fahre ich nach Berlin, why is fahre in that position?",
        options: [
          "Nächsten Montag is one element, so the verb is still second",
          "Time phrases always precede the verb",
          "Fahren is irregular",
          "It is a question",
        ],
        answer: 0,
        explanation:
          "Second element counts constituents, not words, and a three-word time phrase occupies a single slot. Counting words produces nächsten Montag ich fahre, which is ungrammatical.",
        difficulty: "Medium",
        skill: "Verb second",
      },
      {
        n: 3,
        question: "Where does the finite verb go after weil?",
        options: ["To the end of the clause", "Second, as usual", "First", "Immediately after weil"],
        answer: 0,
        explanation:
          "Subordinating conjunctions such as weil, dass, wenn, ob and obwohl send the finite verb to the final position in their clause. This is the main-clause and subordinate-clause asymmetry that defines German word order.",
        difficulty: "Easy",
        skill: "Subordinate clause",
      },
      {
        n: 4,
        question: "Weil and denn both mean because. The difference is:",
        options: [
          "Weil sends the verb to the end, denn leaves the word order alone",
          "Denn is more formal",
          "Weil can only be used in writing",
          "There is no difference",
        ],
        answer: 0,
        explanation:
          "Weil is subordinating and denn is coordinating. Ich bleibe zu Hause, weil ich müde bin, against ich bleibe zu Hause, denn ich bin müde. Learners treat them as interchangeable because they translate the same way.",
        difficulty: "Hard",
        skill: "Subordinate clause",
      },
      {
        n: 5,
        question: "In Ich habe gestern einen Film gesehen, the participle gesehen is at the end because:",
        options: [
          "The non-finite part of the verb closes the sentence bracket",
          "Participles always follow their object",
          "Gestern pushes it there",
          "It would otherwise be confused with the infinitive",
        ],
        answer: 0,
        explanation:
          "The finite verb takes second position and everything else verbal goes to the end, forming the bracket with the content in between. The same happens with modals and with separable prefixes.",
        difficulty: "Medium",
        skill: "Sentence bracket",
      },
      {
        n: 6,
        question: "The time-manner-place ordering is best described as:",
        options: [
          "A useful default that native speakers vary for emphasis",
          "An absolute rule with no exceptions",
          "A rule that applies only in subordinate clauses",
          "An invention of textbooks with no basis in usage",
        ],
        answer: 0,
        explanation:
          "Middle field ordering is driven by information structure: pronouns before nouns, given before new, definite before indefinite. Time-manner-place falls out of those tendencies as a default and is violated routinely for emphasis without producing anything ungrammatical.",
        difficulty: "Hard",
        skill: "Time manner place",
      },
      {
        n: 7,
        question: "Why does German feel harder to listen to than to read, even at the same level?",
        options: [
          "The most informative part of the verb is often withheld until the end of the clause",
          "Germans speak faster than other Europeans",
          "Written German uses simpler grammar",
          "Spoken German has different word order rules",
        ],
        answer: 0,
        explanation:
          "The sentence bracket holds the participle, infinitive or separable prefix until the end, so a listener must maintain an incomplete verbal dependency across everything in between. Readers can look ahead; listeners cannot.",
        difficulty: "Hard",
        skill: "Sentence bracket",
      },
    ],
  },
  /* ===================================================================== */
  5102: {
    topicId: 5102,
    title: "Shopping and asking for what you cannot name",
    summary:
      "The most useful A1 skill is not vocabulary. It is the handful of phrases that let you get what you want without knowing the word for it.",
    concepts: ["Einkaufen", "Circumlocution", "Höflichkeit", "Pfand", "Kartenzahlung"],
    glossary: {
      Einkaufen: "Shopping, in the sense of buying provisions.",
      Circumlocution: "Describing a thing you cannot name, which is the single most useful strategy at A1.",
      Höflichkeit: "Politeness. German shop interactions are brisk and still expect bitte and danke.",
      Pfand: "The refundable deposit on bottles, reclaimed at a machine in the shop.",
      Kartenzahlung: "Card payment, still refused in many small German businesses.",
      "Wie bitte?": "Pardon? The single most useful repair phrase in the language.",
    },
    body: {
      Beginner: `<p>You will constantly want something whose German name you do not know. There are four ways around it and all of them work.</p>
<figure>
<svg viewBox="0 0 1000 500" role="img" aria-label="Four ways to ask for something when you do not know its name">
<rect x="24" y="40" width="464" height="140" rx="16" fill="#0369a1" opacity="0.14"/>
<text x="56" y="94" font-size="30" font-weight="800" fill="#0369a1">Say what it does</text>
<text x="56" y="142" font-size="27" font-weight="800" fill="currentColor">Etwas zum Schneiden</text>
<text x="56" y="172" font-size="26" fill="currentColor" opacity="0.75">something for cutting</text>
<rect x="512" y="40" width="464" height="140" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="544" y="94" font-size="30" font-weight="800" fill="#0f766e">Say where it goes</text>
<text x="544" y="142" font-size="27" font-weight="800" fill="currentColor">Das fuer die Kueche</text>
<text x="544" y="172" font-size="26" fill="currentColor" opacity="0.75">the thing for the kitchen</text>
<rect x="24" y="204" width="464" height="140" rx="16" fill="#b45309" opacity="0.14"/>
<text x="56" y="258" font-size="30" font-weight="800" fill="#b45309">Compare it</text>
<text x="56" y="306" font-size="27" font-weight="800" fill="currentColor">Wie ein Loeffel, aber...</text>
<text x="56" y="336" font-size="26" fill="currentColor" opacity="0.75">like a spoon, but</text>
<rect x="512" y="204" width="464" height="140" rx="16" fill="#7c3aed" opacity="0.14"/>
<text x="544" y="258" font-size="30" font-weight="800" fill="#7c3aed">Point and ask</text>
<text x="544" y="306" font-size="27" font-weight="800" fill="currentColor">Wie heisst das?</text>
<text x="544" y="336" font-size="26" fill="currentColor" opacity="0.75">what is that called</text>
<rect x="24" y="368" width="952" height="110" rx="16" fill="#be123c" opacity="0.13"/>
<text x="500" y="414" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">The fourth one also teaches you the word.</text>
<text x="500" y="456" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Write it down before you leave the shop.</text>
</svg>
<figcaption><strong>Working around a missing word is a skill, not a failure.</strong> Native speakers do it constantly in their own language. A learner who stops dead at every unknown noun will stay silent; one with four strategies will complete the transaction and leave with the word.</figcaption>
</figure>
<h3>The phrases</h3>
<table>
<tr><th>German</th><th>English</th></tr>
<tr><td>Ich suche etwas zum ...</td><td>I am looking for something for ...</td></tr>
<tr><td>Wie heisst das auf Deutsch?</td><td>What is that called in German?</td></tr>
<tr><td>Haben Sie so etwas?</td><td>Do you have something like this?</td></tr>
<tr><td>Was kostet das?</td><td>What does that cost?</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Pointing is allowed</span><p>Das da, bitte means that one there please. It is not cheating and shopkeepers hear it all day.</p></div>
<div class="warning"><span class="callout-label">Many shops are cash only</span><p>Especially bakeries and small shops. Carry cash, and expect a deposit on bottles that you get back when you return them.</p></div>`,
      Intermediate: `<p>Circumlocution is a learnable technique rather than a sign of failure, and it is the single highest-value thing you can practise at this level.</p>
<figure>
<svg viewBox="0 0 1000 500" role="img" aria-label="Four ways to ask for something when you do not know its name">
<rect x="24" y="40" width="464" height="140" rx="16" fill="#0369a1" opacity="0.14"/>
<text x="56" y="94" font-size="30" font-weight="800" fill="#0369a1">Say what it does</text>
<text x="56" y="142" font-size="27" font-weight="800" fill="currentColor">Etwas zum Schneiden</text>
<text x="56" y="172" font-size="26" fill="currentColor" opacity="0.75">something for cutting</text>
<rect x="512" y="40" width="464" height="140" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="544" y="94" font-size="30" font-weight="800" fill="#0f766e">Say where it goes</text>
<text x="544" y="142" font-size="27" font-weight="800" fill="currentColor">Das fuer die Kueche</text>
<text x="544" y="172" font-size="26" fill="currentColor" opacity="0.75">the thing for the kitchen</text>
<rect x="24" y="204" width="464" height="140" rx="16" fill="#b45309" opacity="0.14"/>
<text x="56" y="258" font-size="30" font-weight="800" fill="#b45309">Compare it</text>
<text x="56" y="306" font-size="27" font-weight="800" fill="currentColor">Wie ein Loeffel, aber...</text>
<text x="56" y="336" font-size="26" fill="currentColor" opacity="0.75">like a spoon, but</text>
<rect x="512" y="204" width="464" height="140" rx="16" fill="#7c3aed" opacity="0.14"/>
<text x="544" y="258" font-size="30" font-weight="800" fill="#7c3aed">Point and ask</text>
<text x="544" y="306" font-size="27" font-weight="800" fill="currentColor">Wie heisst das?</text>
<text x="544" y="336" font-size="26" fill="currentColor" opacity="0.75">what is that called</text>
<rect x="24" y="368" width="952" height="110" rx="16" fill="#be123c" opacity="0.13"/>
<text x="500" y="414" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">The fourth one also teaches you the word.</text>
<text x="500" y="456" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Write it down before you leave the shop.</text>
</svg>
<figcaption><strong>Working around a missing word is a skill, not a failure.</strong> Native speakers do it constantly in their own language. A learner who stops dead at every unknown noun will stay silent; one with four strategies will complete the transaction and leave with the word.</figcaption>
</figure>
<h3>Four strategies, in order of usefulness</h3>
<table>
<tr><th>Strategy</th><th>Pattern</th></tr>
<tr><td>Function</td><td>Etwas zum Oeffnen, something for opening</td></tr>
<tr><td>Location</td><td>Das fuer das Badezimmer</td></tr>
<tr><td>Comparison</td><td>Wie ein Messer, aber kleiner</td></tr>
<tr><td>Ask outright</td><td>Wie heisst das?</td></tr>
</table>
<div class="key-idea"><span class="callout-label">zum plus a verb is the workhorse</span><p>Etwas zum Schreiben, zum Putzen, zum Schneiden. One pattern covers a very large number of objects, and it buys you time while you think.</p></div>
<div class="warning"><span class="callout-label">Say the number back when you pay</span><p>Prices are said quickly and two digit numbers are inverted. Repeating the amount before you hand money over costs two seconds and catches the misheard ones.</p></div>`,
      Advanced: `<p>What separates a smooth transaction from an awkward one is managing the exchange, not knowing more nouns.</p>
<figure>
<svg viewBox="0 0 1000 500" role="img" aria-label="Four ways to ask for something when you do not know its name">
<rect x="24" y="40" width="464" height="140" rx="16" fill="#0369a1" opacity="0.14"/>
<text x="56" y="94" font-size="30" font-weight="800" fill="#0369a1">Say what it does</text>
<text x="56" y="142" font-size="27" font-weight="800" fill="currentColor">Etwas zum Schneiden</text>
<text x="56" y="172" font-size="26" fill="currentColor" opacity="0.75">something for cutting</text>
<rect x="512" y="40" width="464" height="140" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="544" y="94" font-size="30" font-weight="800" fill="#0f766e">Say where it goes</text>
<text x="544" y="142" font-size="27" font-weight="800" fill="currentColor">Das fuer die Kueche</text>
<text x="544" y="172" font-size="26" fill="currentColor" opacity="0.75">the thing for the kitchen</text>
<rect x="24" y="204" width="464" height="140" rx="16" fill="#b45309" opacity="0.14"/>
<text x="56" y="258" font-size="30" font-weight="800" fill="#b45309">Compare it</text>
<text x="56" y="306" font-size="27" font-weight="800" fill="currentColor">Wie ein Loeffel, aber...</text>
<text x="56" y="336" font-size="26" fill="currentColor" opacity="0.75">like a spoon, but</text>
<rect x="512" y="204" width="464" height="140" rx="16" fill="#7c3aed" opacity="0.14"/>
<text x="544" y="258" font-size="30" font-weight="800" fill="#7c3aed">Point and ask</text>
<text x="544" y="306" font-size="27" font-weight="800" fill="currentColor">Wie heisst das?</text>
<text x="544" y="336" font-size="26" fill="currentColor" opacity="0.75">what is that called</text>
<rect x="24" y="368" width="952" height="110" rx="16" fill="#be123c" opacity="0.13"/>
<text x="500" y="414" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">The fourth one also teaches you the word.</text>
<text x="500" y="456" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Write it down before you leave the shop.</text>
</svg>
<figcaption><strong>Working around a missing word is a skill, not a failure.</strong> Native speakers do it constantly in their own language. A learner who stops dead at every unknown noun will stay silent; one with four strategies will complete the transaction and leave with the word.</figcaption>
</figure>
<table>
<tr><th>Moment</th><th>Phrase</th></tr>
<tr><td>Opening</td><td>Entschuldigung, koennen Sie mir helfen?</td></tr>
<tr><td>Narrowing</td><td>Nein, eher so etwas wie ...</td></tr>
<tr><td>Not understanding</td><td>Wie bitte? Langsamer, bitte.</td></tr>
<tr><td>Deciding not to buy</td><td>Ich schaue mich nur um, danke.</td></tr>
<tr><td>Closing</td><td>Das nehme ich. Danke schoen.</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Having a decline ready matters</span><p>A learner without a phrase for leaving without buying will buy things they do not want. Ich ueberlege es mir, I will think about it, ends the conversation politely and is worth having automatic.</p></div>
<h3>Service culture is different, not unfriendly</h3>
<p>Staff are typically direct and efficient rather than effusive, and they will not fill silences for you. Greeting on entry and thanking on leaving is expected and noticed; the absence of small talk in between is normal.</p>`,
      Expert: `<p>Communication strategies are a studied part of language competence, and the finding most relevant here is that strategic competence can be taught directly and transfers quickly.</p>
<figure>
<svg viewBox="0 0 1000 500" role="img" aria-label="Four ways to ask for something when you do not know its name">
<rect x="24" y="40" width="464" height="140" rx="16" fill="#0369a1" opacity="0.14"/>
<text x="56" y="94" font-size="30" font-weight="800" fill="#0369a1">Say what it does</text>
<text x="56" y="142" font-size="27" font-weight="800" fill="currentColor">Etwas zum Schneiden</text>
<text x="56" y="172" font-size="26" fill="currentColor" opacity="0.75">something for cutting</text>
<rect x="512" y="40" width="464" height="140" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="544" y="94" font-size="30" font-weight="800" fill="#0f766e">Say where it goes</text>
<text x="544" y="142" font-size="27" font-weight="800" fill="currentColor">Das fuer die Kueche</text>
<text x="544" y="172" font-size="26" fill="currentColor" opacity="0.75">the thing for the kitchen</text>
<rect x="24" y="204" width="464" height="140" rx="16" fill="#b45309" opacity="0.14"/>
<text x="56" y="258" font-size="30" font-weight="800" fill="#b45309">Compare it</text>
<text x="56" y="306" font-size="27" font-weight="800" fill="currentColor">Wie ein Loeffel, aber...</text>
<text x="56" y="336" font-size="26" fill="currentColor" opacity="0.75">like a spoon, but</text>
<rect x="512" y="204" width="464" height="140" rx="16" fill="#7c3aed" opacity="0.14"/>
<text x="544" y="258" font-size="30" font-weight="800" fill="#7c3aed">Point and ask</text>
<text x="544" y="306" font-size="27" font-weight="800" fill="currentColor">Wie heisst das?</text>
<text x="544" y="336" font-size="26" fill="currentColor" opacity="0.75">what is that called</text>
<rect x="24" y="368" width="952" height="110" rx="16" fill="#be123c" opacity="0.13"/>
<text x="500" y="414" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">The fourth one also teaches you the word.</text>
<text x="500" y="456" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Write it down before you leave the shop.</text>
</svg>
<figcaption><strong>Working around a missing word is a skill, not a failure.</strong> Native speakers do it constantly in their own language. A learner who stops dead at every unknown noun will stay silent; one with four strategies will complete the transaction and leave with the word.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">Achievement beats avoidance</span><p>Learners broadly split into those who work around a gap and those who abandon the message. The first group gets more practice, more input and more corrections, and improves faster. Deliberately choosing to stay in the conversation when you lack a word is therefore not just about today's transaction; it changes the rate at which you learn.</p></div>
<h3>What to do with the word once you get it</h3>
<p>A word acquired at the moment you needed it is retained far better than one from a list, because the context and the need are both encoded with it. Writing it down before leaving the shop takes seconds and converts a transaction into a vocabulary item you will not forget.</p>
<h3>Regional practicalities worth knowing</h3>
<p>The bottle deposit system is widespread and the amounts are not trivial, so returning bottles is routine rather than eccentric. Sunday closing is near-universal for shops, which catches visitors out repeatedly. Neither is a language issue and both will shape your week more than any grammar point in this course.</p>`,
    },
    speaking: [
      {
        n: 1,
        kind: "roleplay",
        title: "Buy something you cannot name",
        level: "CEFR A1",
        lang: "de-DE",
        prompt: `<p>You are in a hardware shop. You need a funnel. You do not know the German word for funnel, and you are not going to look it up.</p>
<p>Get one anyway. Describe it: what it is made of, what it is for, what it is like. The assistant will help you if you give her something to work with.</p>
<p><strong>This is the assessment.</strong> Not vocabulary, which you do not have, but whether you can stay in the conversation and get the object. A learner who says "sorry, my German is not good" and leaves has failed a task that a learner with the same vocabulary and four useful frames completes easily.</p>`,
        turns: [
          {
            speaker: "Verkäuferin",
            line: "Guten Tag! Kann ich Ihnen helfen?",
            translation: "Good afternoon. Can I help you?",
            expect: "Greet her and say you are looking for something. Ich suche etwas ...",
          },
          {
            speaker: "Verkäuferin",
            line: "Natürlich. Wofür brauchen Sie das?",
            translation: "Of course. What do you need it for?",
            expect: "Say what it is for. Es ist zum ... or man benutzt das für ...",
          },
          {
            speaker: "Verkäuferin",
            line: "Hmm. Und wie sieht das aus?",
            translation: "Hmm. And what does it look like?",
            expect: "Describe the shape or compare it. Es ist wie ein ... aber ...",
          },
          {
            speaker: "Verkäuferin",
            line: "Ach, ein Trichter! Aus Plastik oder aus Metall?",
            translation: "Ah, a funnel. Plastic or metal?",
            expect: "Choose one, ask the price, and close the transaction politely.",
          },
        ],
        mustMention: [
          "An opening that states you are looking for something, using suchen",
          "What the object is used for, using zum or für",
          "A comparison or a description of its shape or material",
          "A question about the price, using was kostet",
          "A polite closing with danke",
        ],
        seconds: 75,
        rubric: [
          {
            key: "strategy",
            label: "You got the object without the word",
            bands: [
              "Gave up, switched to English, or named the object in another language and stopped",
              "Attempted a description but abandoned it when it did not land first time",
              "Described it successfully using at least two of purpose, material and comparison",
              "Described it successfully and adapted when the first attempt did not land, which is the actual skill",
            ],
            weight: 3,
          },
          {
            key: "frames",
            label: "The useful frames were used",
            bands: [
              "No recognisable frame; single words only",
              "One frame used, repeated",
              "At least two of ich suche, es ist zum, man benutzt das für, es ist wie",
              "Three or more frames used naturally, including one adapted rather than recited",
            ],
            weight: 2,
          },
          {
            key: "transaction",
            label: "The transaction completed",
            bands: [
              "Price never asked or the exchange left unfinished",
              "Object identified but the transaction not closed",
              "Price asked and the exchange closed politely",
              "All of that at the brisk register a German shop expects, without padding it with English-style pleasantries",
            ],
            weight: 2,
          },
          {
            key: "repair",
            label: "Handling not being understood",
            bands: [
              "Froze or fell silent when she did not understand",
              "Repeated the same words more loudly",
              "Rephrased, or used wie bitte to buy time",
              "Rephrased with a different frame rather than repeating, which is what actually gets you there",
            ],
            weight: 3,
          },
        ],
        skills: ["Einkaufen", "Circumlocution", "Höflichkeit"],
      },
    ],
    scenarios: [
      {
        n: 1,
        title: "Cash only, and the bottle deposit",
        blurb:
          "Two German retail conventions with no English equivalent, and both of them catch newcomers in their first fortnight.",
        role: "You have been in Germany for nine days.",
        start: "e1",
        minutes: 10,
        idealPath: ["e1", "e2", "e3"],
        nodes: [
          {
            id: "e1",
            situation: `<p>You are in a small Imbiss at lunchtime. There is a queue behind you. You have ordered a Döner and a drink, and the man behind the counter has made it and is waiting.</p>
<p>You hold out your card. He points at a small handwritten sign you had not seen: <em>Nur Barzahlung</em>.</p>`,
            prompt: "What do you do?",
            choices: [
              {
                id: "a",
                label: '"Entschuldigung, gibt es einen Geldautomaten in der Nähe?" and go and get cash',
                outcome:
                  "He points down the street and says the food will be waiting. You are back in four minutes, you pay, and nothing about the exchange was awkward because you handled it in German and did not hold up the queue arguing.",
                next: "e2",
                delta: 3,
                cost: { minutes: 6 },
              },
              {
                id: "b",
                label: "Explain in English that your card works everywhere else",
                outcome:
                  "It does not help. He is not refusing cards as a preference; many small businesses here simply do not accept them, and the queue is still behind you. You end up going to the cash machine anyway, several minutes later and with more friction.",
                next: "e2",
                delta: -1,
                cost: { minutes: 10 },
              },
              {
                id: "c",
                label: "Leave the food and walk out",
                outcome:
                  "He has made it and now throws it away. You have avoided an awkward minute at the cost of wasting his food and your lunch, and the phrase you needed was eight words long.",
                next: "e3",
                delta: -3,
                cost: { minutes: 2 },
                violation: "Prepared food was abandoned rather than resolving a four-minute problem.",
              },
              {
                id: "d",
                label: 'Ask "Kann ich mit Karte zahlen?" now',
                outcome:
                  "Slightly late: the sign has already answered it and the food is made. It is exactly the right question, though, and asking it before ordering is the habit worth forming.",
                next: "e2",
                delta: 1,
                cost: { minutes: 2 },
              },
            ],
          },
          {
            id: "e2",
            situation: `<p>Later, in the supermarket. You have a shopping bag of empty bottles that have been accumulating in your kitchen, because you noticed every bottle you buy costs more than the label says.</p>
<p>By the entrance there is a machine with a round opening and a conveyor inside.</p>`,
            prompt: "What is going on?",
            choices: [
              {
                id: "a",
                label: "Feed the bottles in one at a time and take the printed slip to the till",
                outcome:
                  "Each bottle is scanned and credited. The machine prints a slip for 3.75 euro, which the cashier deducts from your shopping. The extra you were paying was Pfand, a refundable deposit, and you have just got it back.",
                next: "e3",
                delta: 3,
                cost: { minutes: 6 },
              },
              {
                id: "b",
                label: "Put them in the recycling bin outside instead",
                outcome:
                  "You have thrown away about four euro. The deposit is refundable and binning the bottle forfeits it, which is exactly why you see people collecting bottles from beside public bins rather than from inside them.",
                next: "e3",
                delta: -2,
                cost: { rupees: 360 },
              },
              {
                id: "c",
                label: "Ask at the till what the machine is for",
                outcome:
                  "Entschuldigung, wofür ist diese Maschine? A perfectly good question that gets you a one-sentence explanation and the same outcome, slightly slower. Asking is never the wrong move.",
                next: "e3",
                delta: 2,
                cost: { minutes: 8 },
              },
            ],
          },
          {
            id: "e3",
            situation: `<p>You now ask Kann ich mit Karte zahlen? before ordering anywhere small, and your bottles go back to the shop rather than into a bin.</p>`,
            prompt: "",
            ending: {
              verdict: "ideal",
              title: "Two conventions learned in a fortnight rather than a year",
              debrief: `<p>Neither of these is a language problem and both are usually experienced as one. Cash-only is not a shop being difficult: card acceptance in small German businesses remains genuinely patchy, particularly in bakeries, Imbisse and smaller restaurants, and the habit that solves it permanently is one question asked before you order rather than after.</p>
<p>The Pfand system is the one that costs people real money quietly. A bottle carries a refundable deposit of up to 25 cents, added at the till and returned when you feed the empty into the machine. Bin it and you have forfeited it, which is why bottles are left standing beside public bins rather than dropped into them: somebody else will claim the deposit, and leaving them accessible is a small courtesy rather than littering.</p>
<p>The option worth dwelling on is walking out of the Imbiss. It is the most expensive choice on the page and it is chosen out of embarrassment rather than calculation. The food is wasted, your lunch is gone, and the phrase that would have solved it is Gibt es einen Geldautomaten in der Nähe, which is eight words. Social discomfort is the most common reason a solvable problem in a second language becomes an unsolved one.</p>
<p>The general lesson is that a good deal of what makes living in a new country difficult is procedural rather than linguistic. Knowing the words for the Anmeldung does not tell you that you need an appointment weeks ahead, and these routines are rarely in a course because they are not language. They determine how much friction you live with.</p>`,
            },
          },
        ],
        skills: ["Einkaufen", "Pfand", "Kartenzahlung", "Höflichkeit"],
      },
    ],
  },

  /* ===================================================================== */
  5103: {
    topicId: 5103,
    title: "At the doctor: describing a symptom precisely",
    summary:
      "A consultation you may have to manage in German. Three structures and thirty words cover most of what a doctor needs from you.",
    concepts: ["Schmerzen", "Seit wann", "Körperteile", "Krankmeldung", "Termin"],
    glossary: {
      Schmerzen: "Pain. Used in compounds: Kopfschmerzen, Bauchschmerzen, Halsschmerzen.",
      "Seit wann": "Since when. The question every doctor asks first, answered with seit plus a dative time.",
      Körperteile: "Parts of the body, which take the definite article rather than a possessive in German.",
      Krankmeldung: "The sick note an employer requires, issued by the doctor.",
      Termin: "An appointment. Almost everything in Germany requires one.",
      "Es tut weh": "It hurts. The construction that pairs with a dative person: mir tut der Kopf weh.",
    },
    body: {
      Beginner: `<p>Describing a symptom needs three things: where, what it feels like, and how long it has been going on.</p>
<figure>
<svg viewBox="0 0 1000 480" role="img" aria-label="The three parts of describing a symptom in German">
<rect x="24" y="40" width="300" height="180" rx="16" fill="#0369a1" opacity="0.14"/>
<text x="174" y="98" font-size="30" font-weight="800" fill="#0369a1" text-anchor="middle">WHERE</text>
<text x="174" y="150" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">Mein Hals</text>
<text x="174" y="192" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">my throat</text>
<rect x="350" y="40" width="300" height="180" rx="16" fill="#be123c" opacity="0.14"/>
<text x="500" y="98" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">WHAT</text>
<text x="500" y="150" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">tut weh</text>
<text x="500" y="192" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">hurts</text>
<rect x="676" y="40" width="300" height="180" rx="16" fill="#b45309" opacity="0.14"/>
<text x="826" y="98" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">HOW LONG</text>
<text x="826" y="150" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">seit drei Tagen</text>
<text x="826" y="192" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">for three days</text>
<rect x="24" y="252" width="952" height="96" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="500" y="312" font-size="32" font-weight="800" fill="currentColor" text-anchor="middle">Mein Hals tut seit drei Tagen weh.</text>
<rect x="24" y="372" width="952" height="92" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="418" font-size="29" font-weight="800" fill="#b45309" text-anchor="middle">seit takes the dative, and it takes the present tense.</text>
<text x="500" y="452" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Not the past, even though English uses have been.</text>
</svg>
<figcaption><strong>Three slots, and the duration is the one that changes the diagnosis.</strong> A sore throat for a day and a sore throat for three weeks are different problems, so the part a learner is most likely to leave out is the part the doctor most needs.</figcaption>
</figure>
<h3>The two patterns</h3>
<table>
<tr><th>German</th><th>English</th></tr>
<tr><td>Ich habe Kopfschmerzen</td><td>I have a headache</td></tr>
<tr><td>Mein Hals tut weh</td><td>My throat hurts</td></tr>
<tr><td>Mir ist schlecht</td><td>I feel sick</td></tr>
<tr><td>Ich habe Fieber</td><td>I have a fever</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Schmerzen attaches to the body part</span><p>Kopfschmerzen, Halsschmerzen, Bauchschmerzen, Rueckenschmerzen. One ending, and you have four symptoms.</p></div>
<div class="warning"><span class="callout-label">Say how long, unprompted</span><p>seit gestern, seit drei Tagen, seit einer Woche. It is the piece of information a doctor needs most and the piece learners most often leave out.</p></div>`,
      Intermediate: `<p>German uses the present tense with seit where English uses a perfect. Ich habe seit drei Tagen Fieber, literally I have fever since three days.</p>
<figure>
<svg viewBox="0 0 1000 480" role="img" aria-label="The three parts of describing a symptom in German">
<rect x="24" y="40" width="300" height="180" rx="16" fill="#0369a1" opacity="0.14"/>
<text x="174" y="98" font-size="30" font-weight="800" fill="#0369a1" text-anchor="middle">WHERE</text>
<text x="174" y="150" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">Mein Hals</text>
<text x="174" y="192" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">my throat</text>
<rect x="350" y="40" width="300" height="180" rx="16" fill="#be123c" opacity="0.14"/>
<text x="500" y="98" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">WHAT</text>
<text x="500" y="150" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">tut weh</text>
<text x="500" y="192" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">hurts</text>
<rect x="676" y="40" width="300" height="180" rx="16" fill="#b45309" opacity="0.14"/>
<text x="826" y="98" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">HOW LONG</text>
<text x="826" y="150" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">seit drei Tagen</text>
<text x="826" y="192" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">for three days</text>
<rect x="24" y="252" width="952" height="96" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="500" y="312" font-size="32" font-weight="800" fill="currentColor" text-anchor="middle">Mein Hals tut seit drei Tagen weh.</text>
<rect x="24" y="372" width="952" height="92" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="418" font-size="29" font-weight="800" fill="#b45309" text-anchor="middle">seit takes the dative, and it takes the present tense.</text>
<text x="500" y="452" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Not the past, even though English uses have been.</text>
</svg>
<figcaption><strong>Three slots, and the duration is the one that changes the diagnosis.</strong> A sore throat for a day and a sore throat for three weeks are different problems, so the part a learner is most likely to leave out is the part the doctor most needs.</figcaption>
</figure>
<h3>Describing the pain itself</h3>
<table>
<tr><th>German</th><th>Means</th></tr>
<tr><td>stechend</td><td>stabbing</td></tr>
<tr><td>dumpf</td><td>dull</td></tr>
<tr><td>brennend</td><td>burning</td></tr>
<tr><td>staendig</td><td>constant</td></tr>
<tr><td>ab und zu</td><td>on and off</td></tr>
</table>
<div class="key-idea"><span class="callout-label">What you will be asked</span><p>Seit wann? Wo genau? Haben Sie Fieber? Nehmen Sie Medikamente? Preparing answers to those four covers most of a first consultation.</p></div>
<div class="warning"><span class="callout-label">Say if you did not understand</span><p>Ich habe das nicht verstanden. Getting a medical instruction wrong is worse than admitting you missed it, and no doctor will mind being asked to repeat.</p></div>`,
      Advanced: `<p>Precision matters more here than in most conversations, because the words are carrying clinical information rather than social meaning.</p>
<figure>
<svg viewBox="0 0 1000 480" role="img" aria-label="The three parts of describing a symptom in German">
<rect x="24" y="40" width="300" height="180" rx="16" fill="#0369a1" opacity="0.14"/>
<text x="174" y="98" font-size="30" font-weight="800" fill="#0369a1" text-anchor="middle">WHERE</text>
<text x="174" y="150" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">Mein Hals</text>
<text x="174" y="192" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">my throat</text>
<rect x="350" y="40" width="300" height="180" rx="16" fill="#be123c" opacity="0.14"/>
<text x="500" y="98" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">WHAT</text>
<text x="500" y="150" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">tut weh</text>
<text x="500" y="192" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">hurts</text>
<rect x="676" y="40" width="300" height="180" rx="16" fill="#b45309" opacity="0.14"/>
<text x="826" y="98" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">HOW LONG</text>
<text x="826" y="150" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">seit drei Tagen</text>
<text x="826" y="192" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">for three days</text>
<rect x="24" y="252" width="952" height="96" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="500" y="312" font-size="32" font-weight="800" fill="currentColor" text-anchor="middle">Mein Hals tut seit drei Tagen weh.</text>
<rect x="24" y="372" width="952" height="92" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="418" font-size="29" font-weight="800" fill="#b45309" text-anchor="middle">seit takes the dative, and it takes the present tense.</text>
<text x="500" y="452" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Not the past, even though English uses have been.</text>
</svg>
<figcaption><strong>Three slots, and the duration is the one that changes the diagnosis.</strong> A sore throat for a day and a sore throat for three weeks are different problems, so the part a learner is most likely to leave out is the part the doctor most needs.</figcaption>
</figure>
<table>
<tr><th>Vague</th><th>Useful</th></tr>
<tr><td>Es tut weh</td><td>Es tut stechend weh, besonders beim Schlucken</td></tr>
<tr><td>Seit kurzem</td><td>Seit Montagabend</td></tr>
<tr><td>Manchmal</td><td>Zwei oder drei Mal pro Tag</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Bring a written list</span><p>Symptoms, when they started, current medication, allergies, previous conditions. Reading from a list in a consultation is completely normal, and it removes the risk of your German failing at the moment accuracy matters most.</p></div>
<h3>How the system works</h3>
<p>You usually see a Hausarzt first, who refers you onward. The Krankenkasse card is required at every visit. Appointments for specialists can be weeks out, and an acute problem goes to the Notaufnahme rather than waiting.</p>`,
      Expert: `<p>Medical German has a register split worth knowing about: a Latin or Greek technical term used in writing, and a plain German word used with patients.</p>
<figure>
<svg viewBox="0 0 1000 480" role="img" aria-label="The three parts of describing a symptom in German">
<rect x="24" y="40" width="300" height="180" rx="16" fill="#0369a1" opacity="0.14"/>
<text x="174" y="98" font-size="30" font-weight="800" fill="#0369a1" text-anchor="middle">WHERE</text>
<text x="174" y="150" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">Mein Hals</text>
<text x="174" y="192" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">my throat</text>
<rect x="350" y="40" width="300" height="180" rx="16" fill="#be123c" opacity="0.14"/>
<text x="500" y="98" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">WHAT</text>
<text x="500" y="150" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">tut weh</text>
<text x="500" y="192" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">hurts</text>
<rect x="676" y="40" width="300" height="180" rx="16" fill="#b45309" opacity="0.14"/>
<text x="826" y="98" font-size="30" font-weight="800" fill="#b45309" text-anchor="middle">HOW LONG</text>
<text x="826" y="150" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">seit drei Tagen</text>
<text x="826" y="192" font-size="26" fill="currentColor" opacity="0.8" text-anchor="middle">for three days</text>
<rect x="24" y="252" width="952" height="96" rx="16" fill="#0f766e" opacity="0.14"/>
<text x="500" y="312" font-size="32" font-weight="800" fill="currentColor" text-anchor="middle">Mein Hals tut seit drei Tagen weh.</text>
<rect x="24" y="372" width="952" height="92" rx="16" fill="#b45309" opacity="0.13"/>
<text x="500" y="418" font-size="29" font-weight="800" fill="#b45309" text-anchor="middle">seit takes the dative, and it takes the present tense.</text>
<text x="500" y="452" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">Not the past, even though English uses have been.</text>
</svg>
<figcaption><strong>Three slots, and the duration is the one that changes the diagnosis.</strong> A sore throat for a day and a sore throat for three weeks are different problems, so the part a learner is most likely to leave out is the part the doctor most needs.</figcaption>
</figure>
<table>
<tr><th>Technical</th><th>Everyday</th></tr>
<tr><td>Hypertonie</td><td>hoher Blutdruck</td></tr>
<tr><td>Fraktur</td><td>Bruch</td></tr>
<tr><td>Nausea</td><td>Uebelkeit</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Which helps more than it looks</span><p>Many technical terms are internationally recognisable, so a letter or a report is often more readable to a non-native speaker than the conversation was. If the spoken explanation did not land, asking for it in writing is a legitimate and effective request.</p></div>
<h3>Interpreting is a right, not an imposition</h3>
<p>For anything consequential, ask whether an interpreter is available. Hospitals in larger cities generally have access to one. Relying on a family member to interpret is common and is known to produce omissions, particularly where the subject is uncomfortable.</p>
<h3>Consent is a language problem before it is a legal one</h3>
<p>Signing an Einverstaendniserklaerung you have not fully understood is a bad idea, and saying so is unremarkable: Ich moechte das in Ruhe lesen. Nobody will be offended, and a clinician would far rather explain twice than proceed on a misunderstanding.</p>`,
    },
    speaking: [
      {
        n: 1,
        kind: "respond",
        title: "Describe a symptom to a doctor",
        level: "CEFR A2",
        lang: "de-DE",
        prompt: `<p>You are in a doctor's surgery. She asks: <strong>Was kann ich für Sie tun?</strong></p>
<p>Describe your complaint. Cover the four things any doctor needs, in any order: <em>what</em> is wrong, <em>where</em> it is, <em>since when</em>, and <em>what makes it worse or better</em>.</p>
<p>German consultations are shorter and more directive than you may be used to, and the doctor may not draw the information out of you. Arriving with it organised is the skill being assessed.</p>
<p>Use seit plus a dative time for the duration, and remember German puts this in the present tense: ich habe seit drei Tagen Kopfschmerzen, not ich hatte.</p>`,
        mustMention: [
          "The symptom itself, using either Schmerzen or tut weh",
          "Where it is, with the body part taking the definite article",
          "How long, using seit plus a dative time expression",
          "Something that makes it better or worse",
          "Whether you need a Krankmeldung for your employer",
        ],
        seconds: 60,
        rubric: [
          {
            key: "content",
            label: "The doctor has what she needs",
            bands: [
              "Only a general statement of feeling unwell, with nothing localised",
              "Symptom and location given, but no duration",
              "What, where and since when all given",
              "All four including what makes it worse, which is the one that most often separates two diagnoses",
            ],
            weight: 3,
          },
          {
            key: "duration",
            label: "The seit construction",
            bands: [
              "Duration not expressed, or expressed without seit",
              "seit used but with the wrong case or the wrong tense",
              "seit plus dative, in the present tense",
              "seit plus dative in the present, including the plural -n on seit drei Tagen",
            ],
            weight: 3,
          },
          {
            key: "bodyparts",
            label: "Body part constructions",
            bands: [
              "Body parts named with a possessive throughout, as in English",
              "Mixed, with some definite articles and some possessives",
              "Definite article used with body parts",
              "The possessive dative produced naturally: mir tut der Hals weh rather than mein Hals tut weh",
            ],
            weight: 2,
          },
          {
            key: "admin",
            label: "The practical request",
            bands: [
              "No mention of a sick note where one would be needed",
              "Mentioned vaguely without naming the document",
              "Krankmeldung or Arbeitsunfähigkeitsbescheinigung asked for by name",
              "Asked for by name and before leaving, which saves a second appointment",
            ],
            weight: 2,
          },
        ],
        skills: ["Schmerzen", "Seit wann", "Körperteile", "Krankmeldung"],
      },
    ],
    decks: [
      {
        n: 1,
        title: "Symptoms, body parts and the words for how it hurts",
        blurb:
          "Quality adjectives are where learner vocabularies are thinnest and where the diagnostic information lives. Typed recall, because you will have to produce these.",
        mode: "type",
        lang: "de-DE",
        cards: [
          { id: 1, front: "headache", back: "Kopfschmerzen", accepts: ["die Kopfschmerzen", "kopfschmerzen"], tags: ["Symptoms"] },
          { id: 2, front: "sore throat", back: "Halsschmerzen", accepts: ["halsschmerzen"], tags: ["Symptoms"] },
          { id: 3, front: "stomach ache", back: "Bauchschmerzen", accepts: ["bauchschmerzen", "magenschmerzen"], tags: ["Symptoms"] },
          { id: 4, front: "back pain", back: "Rückenschmerzen", accepts: ["ruckenschmerzen", "rueckenschmerzen"], tags: ["Symptoms"] },
          { id: 5, front: "fever", back: "Fieber", accepts: ["das Fieber", "fieber"], tags: ["Symptoms"] },
          { id: 6, front: "cough", back: "Husten", accepts: ["der Husten", "husten"], tags: ["Symptoms"] },
          { id: 7, front: "nausea", back: "Übelkeit", accepts: ["ubelkeit", "uebelkeit", "mir ist schlecht"], tags: ["Symptoms"] },
          { id: 8, front: "dizziness", back: "Schwindel", accepts: ["schwindel", "mir ist schwindelig"], tags: ["Symptoms"] },
          { id: 9, front: "stabbing (pain)", back: "stechend", tags: ["Quality"], hint: "Sharp and sudden, like a needle" },
          { id: 10, front: "dull (pain)", back: "dumpf", tags: ["Quality"] },
          { id: 11, front: "burning (pain)", back: "brennend", tags: ["Quality"] },
          { id: 12, front: "cramping (pain)", back: "krampfartig", accepts: ["krampfhaft"], tags: ["Quality"] },
          { id: 13, front: "Since when? (what the doctor asks first)", back: "Seit wann?", accepts: ["seit wann"], tags: ["Consultation"] },
          { id: 14, front: "for three days", back: "seit drei Tagen", accepts: ["seit 3 Tagen"], tags: ["Consultation"], hint: "seit takes the dative, so Tagen with the -n" },
          { id: 15, front: "My throat hurts (the natural spoken form)", back: "Mir tut der Hals weh", accepts: ["mir tut der hals weh"], tags: ["Consultation"], hint: "Dative person, definite article on the body part" },
          { id: 16, front: "I need a sick note for my employer", back: "Ich brauche eine Krankmeldung", accepts: ["ich brauche eine arbeitsunfahigkeitsbescheinigung", "ich brauche eine krankmeldung"], tags: ["Admin"] },
          { id: 17, front: "Do you have an appointment free today?", back: "Haben Sie heute einen Termin frei?", accepts: ["haben sie heute einen termin frei"], tags: ["Admin"] },
          { id: 18, front: "high blood pressure (the patient word)", back: "Bluthochdruck", accepts: ["bluthochdruck", "hoher blutdruck"], tags: ["Register"], hint: "The clinical word you may hear instead is Hypertonie" },
          { id: 19, front: "shortness of breath (the patient word)", back: "Atemnot", accepts: ["atemnot", "kurzatmigkeit"], tags: ["Register"], hint: "Clinically you may hear Dyspnoe" },
          { id: 20, front: "I need an interpreter", back: "Ich brauche einen Dolmetscher", accepts: ["ich brauche einen dolmetscher"], tags: ["Admin"], hint: "Say this when booking, not in the consulting room" },
        ],
        skills: ["Schmerzen", "Körperteile", "Krankmeldung", "Termin"],
      },
    ],
  },
  /* ===================================================================== */
  5104: {
    topicId: 5104,
    title: "Termin beim Amt: the appointment that decides your paperwork",
    summary:
      "German bureaucracy is navigable and unforgiving. The language is the smaller half; knowing what the office wants is the larger one.",
    concepts: ["Anmeldung", "Termin", "Unterlagen", "Bürgeramt", "Aufenthaltstitel"],
    glossary: {
      Anmeldung: "Registering your address, which almost everything else depends on.",
      Termin: "An appointment. Most offices will not see you without one.",
      Unterlagen: "The documents you must bring. A missing one ends the appointment.",
      Bürgeramt: "The citizens' office handling registration, ID and similar civil matters.",
      Aufenthaltstitel: "A residence permit, issued by the Ausländerbehörde rather than the Bürgeramt.",
      Meldebescheinigung: "The certificate of registration issued at the Anmeldung, needed by banks and employers.",
    },
    body: {
      Beginner: `<p>Dealing with a German public office is mostly about paperwork and timing. The German you need is a small set of fixed phrases.</p>
<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="The sequence of an appointment at a German public office">
<rect x="24" y="40" width="952" height="72" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="56" y="86" font-size="29" font-weight="800" fill="currentColor">1. Book online, weeks ahead</text>
<rect x="24" y="126" width="952" height="72" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="56" y="172" font-size="29" font-weight="800" fill="currentColor">2. Take a number, wait to be called</text>
<rect x="24" y="212" width="952" height="72" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="258" font-size="29" font-weight="800" fill="currentColor">3. Hand over every document, in order</text>
<rect x="24" y="298" width="952" height="72" rx="14" fill="#b45309" opacity="0.14"/>
<text x="56" y="344" font-size="29" font-weight="800" fill="currentColor">4. Answer closed questions, quickly asked</text>
<rect x="24" y="398" width="952" height="104" rx="16" fill="#be123c" opacity="0.14"/>
<text x="500" y="444" font-size="29" font-weight="800" fill="#be123c" text-anchor="middle">One missing document ends the appointment.</text>
<text x="500" y="484" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">The next one may be weeks away.</text>
</svg>
<figcaption><strong>The language is the easy part of this; the paperwork is what decides the outcome.</strong> Officials are efficient rather than unhelpful, and the appointment is short because it assumes you arrived with everything. Bring originals and copies of more than you think you need.</figcaption>
</figure>
<h3>The phrases</h3>
<table>
<tr><th>German</th><th>English</th></tr>
<tr><td>Ich habe einen Termin</td><td>I have an appointment</td></tr>
<tr><td>Ich moechte mich anmelden</td><td>I would like to register my address</td></tr>
<tr><td>Hier sind meine Unterlagen</td><td>Here are my documents</td></tr>
<tr><td>Wie lange dauert das?</td><td>How long will that take?</td></tr>
</table>
<div class="warning"><span class="callout-label">Book the appointment weeks ahead</span><p>Walk-in slots are rare and often gone by early morning. Registering an address usually has a legal deadline after you move in, so the booking has to happen before you are ready.</p></div>
<div class="key-idea"><span class="callout-label">Bring more documents than asked</span><p>Passport, landlord confirmation, rental contract, and copies of everything. One missing paper ends the appointment.</p></div>`,
      Intermediate: `<p>The appointment is short and assumes you came prepared. Most of the risk sits in the documents rather than in the conversation.</p>
<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="The sequence of an appointment at a German public office">
<rect x="24" y="40" width="952" height="72" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="56" y="86" font-size="29" font-weight="800" fill="currentColor">1. Book online, weeks ahead</text>
<rect x="24" y="126" width="952" height="72" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="56" y="172" font-size="29" font-weight="800" fill="currentColor">2. Take a number, wait to be called</text>
<rect x="24" y="212" width="952" height="72" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="258" font-size="29" font-weight="800" fill="currentColor">3. Hand over every document, in order</text>
<rect x="24" y="298" width="952" height="72" rx="14" fill="#b45309" opacity="0.14"/>
<text x="56" y="344" font-size="29" font-weight="800" fill="currentColor">4. Answer closed questions, quickly asked</text>
<rect x="24" y="398" width="952" height="104" rx="16" fill="#be123c" opacity="0.14"/>
<text x="500" y="444" font-size="29" font-weight="800" fill="#be123c" text-anchor="middle">One missing document ends the appointment.</text>
<text x="500" y="484" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">The next one may be weeks away.</text>
</svg>
<figcaption><strong>The language is the easy part of this; the paperwork is what decides the outcome.</strong> Officials are efficient rather than unhelpful, and the appointment is short because it assumes you arrived with everything. Bring originals and copies of more than you think you need.</figcaption>
</figure>
<h3>What is usually required to register</h3>
<table>
<tr><th>Document</th><th>Note</th></tr>
<tr><td>Passport or ID</td><td>Original</td></tr>
<tr><td>Wohnungsgeberbestaetigung</td><td>From your landlord, on their form</td></tr>
<tr><td>Completed Anmeldeformular</td><td>Fill it in beforehand</td></tr>
<tr><td>Marriage or birth certificates</td><td>If registering family members</td></tr>
</table>
<div class="key-idea"><span class="callout-label">The questions are closed and quick</span><p>Seit wann wohnen Sie da? Sind Sie verheiratet? Short factual answers are expected, and you are not required to elaborate.</p></div>
<div class="warning"><span class="callout-label">Say when you did not catch it</span><p>Wie bitte? or Koennen Sie das bitte wiederholen? Guessing at a question about your legal status is a much worse outcome than asking twice.</p></div>`,
      Advanced: `<p>The registration certificate is a key that unlocks other things, which is why its timing matters more than it first appears.</p>
<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="The sequence of an appointment at a German public office">
<rect x="24" y="40" width="952" height="72" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="56" y="86" font-size="29" font-weight="800" fill="currentColor">1. Book online, weeks ahead</text>
<rect x="24" y="126" width="952" height="72" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="56" y="172" font-size="29" font-weight="800" fill="currentColor">2. Take a number, wait to be called</text>
<rect x="24" y="212" width="952" height="72" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="258" font-size="29" font-weight="800" fill="currentColor">3. Hand over every document, in order</text>
<rect x="24" y="298" width="952" height="72" rx="14" fill="#b45309" opacity="0.14"/>
<text x="56" y="344" font-size="29" font-weight="800" fill="currentColor">4. Answer closed questions, quickly asked</text>
<rect x="24" y="398" width="952" height="104" rx="16" fill="#be123c" opacity="0.14"/>
<text x="500" y="444" font-size="29" font-weight="800" fill="#be123c" text-anchor="middle">One missing document ends the appointment.</text>
<text x="500" y="484" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">The next one may be weeks away.</text>
</svg>
<figcaption><strong>The language is the easy part of this; the paperwork is what decides the outcome.</strong> Officials are efficient rather than unhelpful, and the appointment is short because it assumes you arrived with everything. Bring originals and copies of more than you think you need.</figcaption>
</figure>
<table>
<tr><th>Needs the Meldebescheinigung</th><th>Why</th></tr>
<tr><td>Opening a bank account</td><td>Proof of address</td></tr>
<tr><td>The tax ID</td><td>Arrives by post afterwards</td></tr>
<tr><td>A phone or internet contract</td><td>Address verification</td></tr>
<tr><td>A residence permit</td><td>Part of the application</td></tr>
</table>
<div class="key-idea"><span class="callout-label">So the queue is serial, not parallel</span><p>No registration means no tax ID, which means an emergency tax rate on your first salary. Booking the appointment is therefore the first thing to do on arrival rather than something to get around to.</p></div>
<h3>Written German is the fallback</h3>
<p>If the conversation is not working, asking for it in writing is a reasonable request and often produces a clearer answer. Koennen Sie mir das bitte schriftlich geben is a sentence worth having ready.</p>`,
      Expert: `<p>The system is rule-bound rather than discretionary, which is unfamiliar if you come from an administrative culture where an official can make an exception.</p>
<figure>
<svg viewBox="0 0 1000 520" role="img" aria-label="The sequence of an appointment at a German public office">
<rect x="24" y="40" width="952" height="72" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="56" y="86" font-size="29" font-weight="800" fill="currentColor">1. Book online, weeks ahead</text>
<rect x="24" y="126" width="952" height="72" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="56" y="172" font-size="29" font-weight="800" fill="currentColor">2. Take a number, wait to be called</text>
<rect x="24" y="212" width="952" height="72" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="258" font-size="29" font-weight="800" fill="currentColor">3. Hand over every document, in order</text>
<rect x="24" y="298" width="952" height="72" rx="14" fill="#b45309" opacity="0.14"/>
<text x="56" y="344" font-size="29" font-weight="800" fill="currentColor">4. Answer closed questions, quickly asked</text>
<rect x="24" y="398" width="952" height="104" rx="16" fill="#be123c" opacity="0.14"/>
<text x="500" y="444" font-size="29" font-weight="800" fill="#be123c" text-anchor="middle">One missing document ends the appointment.</text>
<text x="500" y="484" font-size="27" font-weight="800" fill="currentColor" text-anchor="middle">The next one may be weeks away.</text>
</svg>
<figcaption><strong>The language is the easy part of this; the paperwork is what decides the outcome.</strong> Officials are efficient rather than unhelpful, and the appointment is short because it assumes you arrived with everything. Bring originals and copies of more than you think you need.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">Which changes what persuasion is worth</span><p>Arguing with a clerk about a missing document is close to useless, because they usually cannot waive it. Asking what would satisfy the requirement is useful, because that is a question they can answer. The distinction is the single most practical thing to understand about German bureaucracy.</p></div>
<h3>Everything happens by post</h3>
<p>Decisions, tax IDs and requests for further information arrive as letters, and deadlines run from the date on the letter. A missing nameplate on your letterbox genuinely causes problems, because undeliverable post is treated as delivered in some contexts. Put your surname on the box on the day you move in.</p>
<h3>Deadlines are real and appealable</h3>
<p>Most decisions carry a Rechtsbehelfsbelehrung at the end, stating how and by when you may object. That paragraph is the most important part of any official letter you receive, and it is the part a non-native reader is most likely to skip because it is the densest German on the page.</p>
<div class="field"><span class="callout-label">Keep everything</span><p>Every letter, every form, every appointment confirmation, in one folder. German administration assumes you have the paper, and reconstructing a file later is far harder than keeping it. This is the habit that most distinguishes people who find the system workable from people who find it hostile.</p></div>`,
    },
    scenarios: [
      {
        n: 1,
        title: "The appointment you waited three weeks for",
        blurb:
          "You have one slot, fifteen minutes, and a document you are not sure about. What you do in the next ten minutes decides whether you wait another three weeks.",
        role: "You arrived in Germany eleven days ago and need to register.",
        start: "t1",
        minutes: 12,
        idealPath: ["t1", "t2", "t3"],
        nodes: [
          {
            id: "t1",
            situation: `<p>It is the evening before. Your Anmeldung appointment is at 9:20 tomorrow and it took three weeks to get.</p>
<p>You have your passport and the completed Anmeldeformular. You also have your signed tenancy agreement. You have seen the word Wohnungsgeberbestätigung on a forum and you are not sure whether the tenancy agreement counts as one.</p>`,
            prompt: "What do you do tonight?",
            choices: [
              {
                id: "a",
                label: "Message the landlord now and ask for a signed Wohnungsgeberbestätigung",
                outcome:
                  "He replies within the hour: he knows exactly what it is, every landlord does, and he sends a signed PDF before midnight. A tenancy agreement is not a substitute, because the confirmation is a separate statutory document stating that you actually moved in and when.",
                next: "t2",
                delta: 3,
                cost: { minutes: 20 },
              },
              {
                id: "b",
                label: "Assume the tenancy agreement will do and go to bed",
                outcome:
                  "It will not. The Wohnungsgeberbestätigung is a specific document required by the Bundesmeldegesetz and a lease does not replace it. You will be turned away in the morning and the next slot is in three weeks.",
                next: "t4",
                delta: -3,
                cost: { minutes: 1 },
                violation: "An appointment that took three weeks to get was attended without the required documents.",
              },
              {
                id: "c",
                label: "Check the Bürgeramt's own page for the document list",
                outcome:
                  "The list is on the page, which is where it always is, and it names the Wohnungsgeberbestätigung explicitly. You message the landlord at eleven, which is late but works. The official list is more reliable than a forum post from another city.",
                next: "t2",
                delta: 3,
                cost: { minutes: 25 },
              },
              {
                id: "d",
                label: "Plan to explain the situation in English at the appointment",
                outcome:
                  "The official may speak English and is not obliged to, and in any case the problem is a missing document rather than a language barrier. No amount of explaining produces a signature you do not have.",
                next: "t4",
                delta: -2,
              },
            ],
          },
          {
            id: "t2",
            situation: `<p>9:20 the next morning. You are called to the counter. The official is brisk and does not open in English.</p>`,
            prompt: "How do you start?",
            choices: [
              {
                id: "a",
                label: '"Guten Morgen. Ich möchte mich anmelden. Ich habe einen Termin um neun Uhr zwanzig."',
                outcome:
                  "He nods, asks for the Unterlagen, and you hand over the three documents in the order he asks for them. Four minutes later you have a stamped Meldebescheinigung.",
                next: "t3",
                delta: 3,
                cost: { minutes: 5 },
              },
              {
                id: "b",
                label: '"Hi, do you speak English?"',
                outcome:
                  "He says nein and waits. You now have to do it in German anyway, from a worse starting position, and you have spent a few seconds of a fifteen minute slot establishing that you would rather not.",
                next: "t3",
                delta: -1,
                cost: { minutes: 2 },
              },
              {
                id: "c",
                label: "Hand over the documents without saying anything",
                outcome:
                  "It works, in the narrow sense. He processes them. A four word greeting costs nothing and changes the temperature of an interaction you may need to repeat for a residence permit later.",
                next: "t3",
                delta: 1,
              },
            ],
          },
          {
            id: "t3",
            situation: `<p>You have the Meldebescheinigung. He tells you the Steueridentifikationsnummer will arrive by post in a few weeks, which you did not know was separate.</p>
<p>You book the bank appointment that afternoon, because the bank needs the certificate you are now holding.</p>`,
            prompt: "",
            ending: {
              verdict: "ideal",
              title: "Prepared the night before, which is where the appointment was actually won",
              debrief: `<p>Nothing that happened at the counter was difficult. The appointment was decided the evening before, when you found out what was required instead of assuming. The Wohnungsgeberbestätigung is the document newcomers miss, because it has no equivalent in most countries and because a tenancy agreement looks like it ought to count. It does not: it is a separate statutory confirmation that you actually moved in, and every German landlord knows what it is.</p>
<p>Checking the office's own page rather than a forum is the habit worth keeping. Requirements vary by municipality and digitalisation has been uneven, so advice from somebody who registered in a different city two years ago can be wrong in both directions. The authoritative list is always on the Amt's own site.</p>
<p>Opening in German mattered less than the document and still mattered. Officials are not obliged to use English and many will not, and the interaction is mostly them asking closed questions, so comprehension carries more weight than production. Four words of greeting and one sentence of purpose is the whole requirement.</p>
<p>Finally, note the dependency chain you have just started: the Anmeldung produces the Meldebescheinigung, which unlocks the bank account, which the employer needs for payroll, while the tax ID arrives separately by post and health insurance needs both. Each link has its own lead time. Starting on day eleven rather than day thirty is what compresses the whole sequence, and it is the single most useful thing anybody can tell a newcomer.</p>`,
            },
          },
          {
            id: "t4",
            situation: `<p>You are turned away for a missing document, or you have spent the appointment on something other than the problem. The next slot is in three weeks, and the bank account, the payroll and the health insurance all sit behind it.</p>`,
            prompt: "",
            ending: {
              verdict: "poor",
              title: "The appointment was lost the night before, not at the counter",
              debrief: `<p>The failure here is not linguistic and it is not bad luck. The required document list is published on the Bürgeramt's own page, and twenty minutes the previous evening would have surfaced the Wohnungsgeberbestätigung and got it signed. A tenancy agreement does not substitute for it, and no amount of explaining at the counter produces a signature.</p>
<p>The instinct to plan an explanation in English is worth examining, because it reflects a reasonable but wrong model of the encounter. German administrative interactions are rule-bound rather than discretionary: the official telling you a document is missing is describing a constraint on what they are permitted to do, not exercising judgement that could be argued with. Learners from systems with more discretion read this as obstruction and respond in ways that do not help.</p>
<p>The cost is not the appointment, it is everything behind it. The Meldebescheinigung unlocks the bank account, the bank account is needed for payroll, health insurance needs both, and each has its own lead time. A three week delay at the first link delays all of them.</p>
<p>The lesson generalises past this office. Administrative burden research separates learning costs, compliance costs and psychological costs, and all three fall harder on somebody operating in a second language. The one you can control cheaply is the learning cost: find out exactly what is required before the appointment rather than in the room.</p>`,
            },
          },
        ],
        skills: ["Anmeldung", "Termin", "Unterlagen", "Bürgeramt"],
      },
    ],
    speaking: [
      {
        n: 1,
        kind: "roleplay",
        title: "Register your address at the Bürgeramt",
        level: "CEFR A2",
        lang: "de-DE",
        prompt: `<p>You are at the counter. Handle the whole interaction in German.</p>
<figure>
<svg viewBox="0 0 1000 652" role="img" aria-label="The four stages of the counter exchange at a registration office">
<rect x="24" y="24" width="952" height="110" rx="16" fill="#7c3aed" opacity="0.1"/>
<rect x="24" y="24" width="952" height="110" rx="16" fill="none" stroke="#7c3aed" stroke-width="3"/>
<circle cx="80" cy="79" r="28" fill="#7c3aed"/>
<text x="80" y="91" font-size="32" font-weight="800" fill="#ffffff" text-anchor="middle">1</text>
<text x="144" y="74" font-size="34" font-weight="800" fill="currentColor">Guten Tag. Ich moechte mich anmelden.</text>
<text x="144" y="114" font-size="27" fill="currentColor" opacity="0.75">Greet, and say why you are here.</text>
<rect x="24" y="146" width="952" height="110" rx="16" fill="#0369a1" opacity="0.1"/>
<rect x="24" y="146" width="952" height="110" rx="16" fill="none" stroke="#0369a1" stroke-width="3"/>
<circle cx="80" cy="201" r="28" fill="#0369a1"/>
<text x="80" y="213" font-size="32" font-weight="800" fill="#ffffff" text-anchor="middle">2</text>
<text x="144" y="196" font-size="34" font-weight="800" fill="currentColor">Hier, bitte schoen.</text>
<text x="144" y="236" font-size="27" fill="currentColor" opacity="0.75">Hand over the documents asked for.</text>
<rect x="24" y="268" width="952" height="110" rx="16" fill="#b45309" opacity="0.1"/>
<rect x="24" y="268" width="952" height="110" rx="16" fill="none" stroke="#b45309" stroke-width="3"/>
<circle cx="80" cy="323" r="28" fill="#b45309"/>
<text x="80" y="335" font-size="32" font-weight="800" fill="#ffffff" text-anchor="middle">3</text>
<text x="144" y="318" font-size="34" font-weight="800" fill="currentColor">Seit wann wohnen Sie da?</text>
<text x="144" y="358" font-size="27" fill="currentColor" opacity="0.75">Closed questions, asked fast. The hard part.</text>
<rect x="24" y="390" width="952" height="110" rx="16" fill="#0f766e" opacity="0.1"/>
<rect x="24" y="390" width="952" height="110" rx="16" fill="none" stroke="#0f766e" stroke-width="3"/>
<circle cx="80" cy="445" r="28" fill="#0f766e"/>
<text x="80" y="457" font-size="32" font-weight="800" fill="#ffffff" text-anchor="middle">4</text>
<text x="144" y="440" font-size="34" font-weight="800" fill="currentColor">Vielen Dank.</text>
<text x="144" y="480" font-size="27" fill="currentColor" opacity="0.75">Take the paper, then thank them.</text>
<rect x="24" y="518" width="952" height="110" rx="16" fill="#be123c" opacity="0.13"/>
<text x="500" y="566" font-size="30" font-weight="800" fill="#be123c" text-anchor="middle">When you lose the thread, say so.</text>
<text x="500" y="606" font-size="30" font-weight="800" fill="currentColor" text-anchor="middle">Wie bitte? &#183; Koennen Sie das bitte wiederholen?</text>
</svg>
<figcaption><strong>Four moves, and only two of them need sentences you compose.</strong> Stages one and four are fixed phrases you can have ready. Stage three is comprehension under time pressure, which is the hard part, and asking for a repeat is a normal move at that counter rather than an admission of failure.</figcaption>
</figure>
<p>The official speaks quickly and asks closed questions, which is normal. Most of this task is comprehension rather than production: your sentences are short, and the difficulty is catching theirs.</p>
<h3>Have these ready before you start</h3>
<table>
<tr><th>You will be asked</th><th>You answer with</th></tr>
<tr><td>Why you are here</td><td>Ich moechte mich anmelden</td></tr>
<tr><td>Since when you have lived there</td><td>Seit dem ersten Maerz</td></tr>
<tr><td>Whether you have the landlord confirmation</td><td>Ja, hier ist die Wohnungsgeberbestaetigung</td></tr>
<tr><td>Your date of birth</td><td>The date, said as a date and not spelled out</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Asking for a repeat is part of the task, not a failure of it</span><p><strong>Wie bitte?</strong> and <strong>Koennen Sie das bitte wiederholen?</strong> are what native speakers say at that counter too. Using one of them and then answering correctly scores better than guessing at a question you did not catch, and the rubric is written that way on purpose.</p></div>
<div class="warning"><span class="callout-label">The trap is answering the question you expected</span><p>The official may ask something off the script, and a confident answer to a question that was not asked is the most common way this goes wrong. If the reply does not fit, you misheard. Ask again.</p></div>`,
        turns: [
          {
            speaker: "Sachbearbeiter",
            line: "Guten Morgen. Was kann ich für Sie tun?",
            translation: "Good morning. What can I do for you?",
            expect: "Greet him and say why you are here. Ich möchte mich anmelden.",
          },
          {
            speaker: "Sachbearbeiter",
            line: "Haben Sie einen Termin?",
            translation: "Do you have an appointment?",
            expect: "Say yes and give the time. Ja, ich habe einen Termin um ...",
          },
          {
            speaker: "Sachbearbeiter",
            line: "Ihre Unterlagen bitte. Pass, Anmeldeformular und die Wohnungsgeberbestätigung.",
            translation: "Your documents please. Passport, registration form and the landlord's confirmation.",
            expect: "Hand them over and say so. Hier, bitte. Or ask if something is missing.",
          },
          {
            speaker: "Sachbearbeiter",
            line: "Seit wann wohnen Sie an dieser Adresse?",
            translation: "Since when have you been living at this address?",
            expect: "Answer with seit plus a dative time. Seit dem ersten März, or seit zwei Wochen.",
          },
          {
            speaker: "Sachbearbeiter",
            line: "Gut. Die Meldebescheinigung bekommen Sie gleich. Die Steuer-ID kommt per Post.",
            translation: "Good. You will get the registration certificate shortly. The tax ID comes by post.",
            expect: "Thank him, and ask roughly how long the tax ID takes if you want to know.",
          },
        ],
        mustMention: [
          "A greeting and a statement of purpose using anmelden",
          "Confirmation that you have an appointment, with the time",
          "A response when the documents are requested",
          "How long you have lived there, using seit plus dative",
          "A closing thank you",
        ],
        seconds: 90,
        rubric: [
          {
            key: "comprehension",
            label: "You understood what was asked",
            bands: [
              "Several questions answered with something unrelated",
              "Most questions understood, with one significant miss not repaired",
              "Every question answered appropriately",
              "Every question answered, with any missed item repaired using wie bitte rather than guessed at",
            ],
            weight: 3,
          },
          {
            key: "register",
            label: "Register appropriate to an Amt",
            bands: [
              "du used, or no greeting at all",
              "Sie used but the tone is conversational rather than transactional",
              "Sie throughout, with an appropriate greeting and closing",
              "Sie throughout at the brisk register the setting expects, without padding",
            ],
            weight: 2,
          },
          {
            key: "seit",
            label: "The duration answer",
            bands: [
              "Duration not given or given without seit",
              "seit used with the wrong case or the wrong tense",
              "seit plus dative in the present tense",
              "Correct, and with a date form rather than only a vague duration, which is what the form actually needs",
            ],
            weight: 3,
          },
          {
            key: "repair",
            label: "Handling not understanding",
            bands: [
              "Froze or switched to English",
              "Guessed at an answer rather than asking",
              "Asked for repetition where needed",
              "Asked for repetition or slower speech naturally, without apologising at length for it",
            ],
            weight: 2,
          },
        ],
        skills: ["Anmeldung", "Termin", "Unterlagen"],
      },
    ],
  },

  /* ===================================================================== */
  5105: {
    topicId: 5105,
    title: "Writing an email a German office will answer",
    summary:
      "Formal written German is more rule-bound than the spoken language and therefore easier. Six conventions and you are credible on paper.",
    concepts: [
      "Anrede",
      "Betreff",
      "Grußformel",
      "Formal register",
      "Konjunktiv höflich",
      "Anhang",
    ],
    glossary: {
      Anrede: "The salutation. Sehr geehrte Damen und Herren when you do not know the name.",
      Betreff: "The subject line, which German emails use more purposefully than English ones.",
      Grußformel: "The closing formula. Mit freundlichen Grüßen for anything formal.",
      "Formal register": "The written style expected by offices, landlords, insurers and employers.",
      "Konjunktiv höflich": "The polite subjunctive: ich hätte, ich würde, könnten Sie.",
      Anhang: "An attachment, which is always named in the body rather than left to be discovered.",
    },
    body: {
      Beginner: `<p>A German official email has four parts, and they are always the same. Learn the template and you only have to write the middle.</p>
<figure>
<svg viewBox="0 0 1000 540" role="img" aria-label="The fixed structure of a formal German email">
<rect x="24" y="40" width="952" height="80" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="56" y="78" font-size="27" font-weight="800" fill="#7c3aed">BETREFF</text>
<text x="56" y="108" font-size="28" font-weight="800" fill="currentColor">Anmeldung, Termin am 12. Maerz, Kundennummer 88213</text>
<rect x="24" y="134" width="952" height="80" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="56" y="172" font-size="27" font-weight="800" fill="#0369a1">ANREDE</text>
<text x="56" y="202" font-size="28" font-weight="800" fill="currentColor">Sehr geehrte Damen und Herren,</text>
<rect x="24" y="228" width="952" height="130" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="266" font-size="27" font-weight="800" fill="#0f766e">ANLIEGEN</text>
<text x="56" y="300" font-size="28" font-weight="800" fill="currentColor">What you want, in the first sentence.</text>
<text x="56" y="340" font-size="28" fill="currentColor" opacity="0.85">Then the detail, then the deadline.</text>
<rect x="24" y="372" width="952" height="80" rx="14" fill="#b45309" opacity="0.14"/>
<text x="56" y="410" font-size="27" font-weight="800" fill="#b45309">GRUSS</text>
<text x="56" y="440" font-size="28" font-weight="800" fill="currentColor">Mit freundlichen Gruessen</text>
<rect x="24" y="466" width="952" height="60" rx="12" fill="#be123c" opacity="0.13"/>
<text x="500" y="506" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">Four blocks. None of them is optional.</text>
</svg>
<figcaption><strong>German official correspondence is formulaic, and that is good news.</strong> The structure is fixed, so you are filling in a template rather than composing. An email missing the formal greeting reads as rude in a way that a grammar error does not.</figcaption>
</figure>
<h3>The fixed parts</h3>
<table>
<tr><th>Part</th><th>Use</th></tr>
<tr><td>Betreff</td><td>Subject, with your reference number</td></tr>
<tr><td>Sehr geehrte Damen und Herren,</td><td>When you do not know the name</td></tr>
<tr><td>Sehr geehrter Herr Schmidt,</td><td>When you do</td></tr>
<tr><td>Mit freundlichen Gruessen</td><td>The standard sign-off</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Say what you want in the first sentence</span><p>Ich schreibe Ihnen, weil ... Officials read a great many emails and the request should not be at the bottom.</p></div>
<div class="warning"><span class="callout-label">A comma after the greeting, then a lower case letter</span><p>Sehr geehrte Damen und Herren, then the next line starts in lower case. It looks wrong to an English eye and it is correct.</p></div>`,
      Intermediate: `<p>The register is more formal than an English business email, and matching it is what gets an answer.</p>
<figure>
<svg viewBox="0 0 1000 540" role="img" aria-label="The fixed structure of a formal German email">
<rect x="24" y="40" width="952" height="80" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="56" y="78" font-size="27" font-weight="800" fill="#7c3aed">BETREFF</text>
<text x="56" y="108" font-size="28" font-weight="800" fill="currentColor">Anmeldung, Termin am 12. Maerz, Kundennummer 88213</text>
<rect x="24" y="134" width="952" height="80" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="56" y="172" font-size="27" font-weight="800" fill="#0369a1">ANREDE</text>
<text x="56" y="202" font-size="28" font-weight="800" fill="currentColor">Sehr geehrte Damen und Herren,</text>
<rect x="24" y="228" width="952" height="130" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="266" font-size="27" font-weight="800" fill="#0f766e">ANLIEGEN</text>
<text x="56" y="300" font-size="28" font-weight="800" fill="currentColor">What you want, in the first sentence.</text>
<text x="56" y="340" font-size="28" fill="currentColor" opacity="0.85">Then the detail, then the deadline.</text>
<rect x="24" y="372" width="952" height="80" rx="14" fill="#b45309" opacity="0.14"/>
<text x="56" y="410" font-size="27" font-weight="800" fill="#b45309">GRUSS</text>
<text x="56" y="440" font-size="28" font-weight="800" fill="currentColor">Mit freundlichen Gruessen</text>
<rect x="24" y="466" width="952" height="60" rx="12" fill="#be123c" opacity="0.13"/>
<text x="500" y="506" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">Four blocks. None of them is optional.</text>
</svg>
<figcaption><strong>German official correspondence is formulaic, and that is good news.</strong> The structure is fixed, so you are filling in a template rather than composing. An email missing the formal greeting reads as rude in a way that a grammar error does not.</figcaption>
</figure>
<h3>Useful sentences</h3>
<table>
<tr><th>Purpose</th><th>Sentence</th></tr>
<tr><td>Stating your request</td><td>Ich moechte Sie bitten, ...</td></tr>
<tr><td>Attaching something</td><td>Im Anhang finden Sie ...</td></tr>
<tr><td>Asking for confirmation</td><td>Koennten Sie mir bitte bestaetigen, ob ...</td></tr>
<tr><td>Giving a deadline</td><td>bis zum 15. Maerz</td></tr>
<tr><td>Closing</td><td>Vielen Dank im Voraus.</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Put your reference number in the subject</span><p>Kundennummer, Aktenzeichen or Geschaeftszeichen. An email without one may be filed rather than answered, and including it is the single biggest improvement you can make to your response rate.</p></div>
<div class="warning"><span class="callout-label">Do not open with a question</span><p>State who you are and what this concerns first. An email that opens with a question and explains afterwards reads as abrupt in this register.</p></div>`,
      Advanced: `<p>What distinguishes an email that gets acted on is structure rather than vocabulary. One request, clearly bounded, with everything needed to act on it present.</p>
<figure>
<svg viewBox="0 0 1000 540" role="img" aria-label="The fixed structure of a formal German email">
<rect x="24" y="40" width="952" height="80" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="56" y="78" font-size="27" font-weight="800" fill="#7c3aed">BETREFF</text>
<text x="56" y="108" font-size="28" font-weight="800" fill="currentColor">Anmeldung, Termin am 12. Maerz, Kundennummer 88213</text>
<rect x="24" y="134" width="952" height="80" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="56" y="172" font-size="27" font-weight="800" fill="#0369a1">ANREDE</text>
<text x="56" y="202" font-size="28" font-weight="800" fill="currentColor">Sehr geehrte Damen und Herren,</text>
<rect x="24" y="228" width="952" height="130" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="266" font-size="27" font-weight="800" fill="#0f766e">ANLIEGEN</text>
<text x="56" y="300" font-size="28" font-weight="800" fill="currentColor">What you want, in the first sentence.</text>
<text x="56" y="340" font-size="28" fill="currentColor" opacity="0.85">Then the detail, then the deadline.</text>
<rect x="24" y="372" width="952" height="80" rx="14" fill="#b45309" opacity="0.14"/>
<text x="56" y="410" font-size="27" font-weight="800" fill="#b45309">GRUSS</text>
<text x="56" y="440" font-size="28" font-weight="800" fill="currentColor">Mit freundlichen Gruessen</text>
<rect x="24" y="466" width="952" height="60" rx="12" fill="#be123c" opacity="0.13"/>
<text x="500" y="506" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">Four blocks. None of them is optional.</text>
</svg>
<figcaption><strong>German official correspondence is formulaic, and that is good news.</strong> The structure is fixed, so you are filling in a template rather than composing. An email missing the formal greeting reads as rude in a way that a grammar error does not.</figcaption>
</figure>
<table>
<tr><th>Paragraph</th><th>Contains</th></tr>
<tr><td>One</td><td>Who you are, your reference, what this is about</td></tr>
<tr><td>Two</td><td>The request, stated once</td></tr>
<tr><td>Three</td><td>Relevant facts and dates, briefly</td></tr>
<tr><td>Four</td><td>What you would like to happen, and by when</td></tr>
</table>
<div class="key-idea"><span class="callout-label">One email, one request</td></p><p>Two unrelated questions in one message reliably get one answer. Send two emails with two subjects instead; they are tracked separately and both get handled.</p></div>
<h3>Chasing politely</h3>
<p>Ich moechte hoeflich nachfragen, ob es Neuigkeiten gibt. Quoting the original date and reference makes it easy to locate, and a chaser without them usually produces a request for them rather than an answer.</p>`,
      Expert: `<p>The formality is doing real work rather than being decorative: it signals that the writer knows the conventions, and in administrative correspondence that correlates with the file being complete.</p>
<figure>
<svg viewBox="0 0 1000 540" role="img" aria-label="The fixed structure of a formal German email">
<rect x="24" y="40" width="952" height="80" rx="14" fill="#7c3aed" opacity="0.14"/>
<text x="56" y="78" font-size="27" font-weight="800" fill="#7c3aed">BETREFF</text>
<text x="56" y="108" font-size="28" font-weight="800" fill="currentColor">Anmeldung, Termin am 12. Maerz, Kundennummer 88213</text>
<rect x="24" y="134" width="952" height="80" rx="14" fill="#0369a1" opacity="0.14"/>
<text x="56" y="172" font-size="27" font-weight="800" fill="#0369a1">ANREDE</text>
<text x="56" y="202" font-size="28" font-weight="800" fill="currentColor">Sehr geehrte Damen und Herren,</text>
<rect x="24" y="228" width="952" height="130" rx="14" fill="#0f766e" opacity="0.14"/>
<text x="56" y="266" font-size="27" font-weight="800" fill="#0f766e">ANLIEGEN</text>
<text x="56" y="300" font-size="28" font-weight="800" fill="currentColor">What you want, in the first sentence.</text>
<text x="56" y="340" font-size="28" fill="currentColor" opacity="0.85">Then the detail, then the deadline.</text>
<rect x="24" y="372" width="952" height="80" rx="14" fill="#b45309" opacity="0.14"/>
<text x="56" y="410" font-size="27" font-weight="800" fill="#b45309">GRUSS</text>
<text x="56" y="440" font-size="28" font-weight="800" fill="currentColor">Mit freundlichen Gruessen</text>
<rect x="24" y="466" width="952" height="60" rx="12" fill="#be123c" opacity="0.13"/>
<text x="500" y="506" font-size="28" font-weight="800" fill="currentColor" text-anchor="middle">Four blocks. None of them is optional.</text>
</svg>
<figcaption><strong>German official correspondence is formulaic, and that is good news.</strong> The structure is fixed, so you are filling in a template rather than composing. An email missing the formal greeting reads as rude in a way that a grammar error does not.</figcaption>
</figure>
<div class="key-idea"><span class="callout-label">Mirror what you received</span><p>If their reply opens Sehr geehrte, stay formal. If it opens Hallo and signs Viele Gruesse, you may follow. The person who de-escalates register first is the one with more status in the exchange, and as the person making the request that is not you.</p></div>
<h3>Where the genitive and passive still live</h3>
<p>Administrative German retains constructions that have retreated from speech: full genitives, extended passive forms, and nominalisations. You do not need to produce them, but you do need to read them, and official letters are written in exactly this style.</p>
<h3>The paragraph to read twice</h3>
<p>Any decision letter ends with the Rechtsbehelfsbelehrung, which states the deadline and the form for objecting. It is dense, it is formulaic, and it is the part that determines whether you still have options. Everything above it describes what was decided; that paragraph describes what you can do about it.</p>
<div class="field"><span class="callout-label">Keep your own sent copies</span><p>With dates. Being able to say that you wrote on a given date and received no reply changes a conversation entirely, and it is the kind of evidence that cannot be assembled afterwards.</p></div>`,
    },
    questions: [
      {
        n: 1,
        question: "You are writing to an office and do not know the recipient's name. The correct salutation is:",
        options: [
          "Sehr geehrte Damen und Herren,",
          "Hallo,",
          "Liebe Damen und Herren,",
          "Sehr geehrter Herr oder Frau,",
        ],
        answer: 0,
        explanation:
          "This is the fixed formula for an unnamed recipient. Hallo is fine in many workplaces and not with an authority, and Liebe is for people you actually know. The fourth option is not German.",
        difficulty: "Easy",
        skill: "Anrede",
      },
      {
        n: 2,
        question: "After Sehr geehrte Frau Weber, the next line begins:",
        options: [
          "With a lower case letter, because the salutation is part of the sentence",
          "With a capital, as a new sentence",
          "With a blank line and then a capital",
          "Either is acceptable",
        ],
        answer: 0,
        explanation:
          "The comma after the salutation means the sentence continues, so ich schreibe Ihnen begins in lower case. It is a small detail and it is one of the most visible markers of whether somebody has written German letters before.",
        difficulty: "Medium",
        skill: "Anrede",
      },
      {
        n: 3,
        question: "Which is the better subject line for an appointment request?",
        options: [
          "Terminanfrage Anmeldung, Familie Sharma",
          "Frage",
          "Hallo, ich brauche Hilfe",
          "Wichtig! Bitte lesen",
        ],
        answer: 0,
        explanation:
          "German administrative correspondence is routed and filed by subject line, so naming the matter and your name produces a faster response. A vague or urgent-sounding subject does the opposite.",
        difficulty: "Medium",
        skill: "Betreff",
      },
      {
        n: 4,
        question: "Why write Könnten Sie mir bitte mitteilen rather than Sagen Sie mir?",
        options: [
          "The subjunctive is the conventional softener in formal German requests",
          "Sagen is not a formal verb",
          "Könnten is grammatically required after bitte",
          "They are identical in register",
        ],
        answer: 0,
        explanation:
          "Könnten, hätten and würden are conventional politeness markers in written requests, and their absence reads as peremptory rather than as direct. This is the single cheapest adjustment that makes a learner's letter sound right.",
        difficulty: "Medium",
        skill: "Konjunktiv höflich",
      },
      {
        n: 5,
        question: "You are sending a notice with a legal deadline, such as a Kündigung. Email is risky because:",
        options: [
          "Many such notices require Schriftform, a handwritten signature, which email does not satisfy",
          "Emails are not admissible as evidence in Germany",
          "German offices do not read email",
          "The deadline is calculated from when it is read",
        ],
        answer: 0,
        explanation:
          "Where a contract or a statute prescribes written form, an emailed notice is formally ineffective regardless of whether it arrived. Registered post with acknowledgement is the defensive practice, and the distinction between Schriftform and the weaker Textform decides which applies.",
        difficulty: "Hard",
        skill: "Formal register",
      },
      {
        n: 6,
        question: "Why name your attachments in the body of the email?",
        options: [
          "Administrative processing often separates the message from its attachments, so the list is the record",
          "German email clients hide attachments by default",
          "It is required by DIN 5008",
          "Attachments cannot be opened without being named",
        ],
        answer: 0,
        explanation:
          "Anbei sende ich Ihnen, followed by an explicit list, establishes what was sent. That matters when a deadline is involved and a document is later said not to have arrived.",
        difficulty: "Hard",
        skill: "Anhang",
      },
      {
        n: 7,
        question: "A learner translates an English request literally into German. The usual result is:",
        options: [
          "Something over-hedged and vague by German standards",
          "Something too direct and rude",
          "A perfectly natural German request",
          "An ungrammatical sentence",
        ],
        answer: 0,
        explanation:
          "German requests carry their indirectness in modal particles and subjunctive morphology rather than in lexical hedging, so English-style hedging stacks on top of that and reads as evasive. Translated the other way it reads as brusque, and neither speaker intends either.",
        difficulty: "Hard",
        skill: "Formal register",
      },
    ],
    deliverables: [
      {
        n: 1,
        title: "Three emails a German office will actually answer",
        brief: `<p>Write three short formal emails in German. Each is a real situation you will meet.</p>
<ol>
<li><strong>An den Vermieter.</strong> Your heating has not worked for four days. Ask for it to be repaired, state when you are available, and be firm without being rude.</li>
<li><strong>An das Bürgeramt.</strong> Request an appointment for your Anmeldung, state which documents you have, and ask whether anything else is needed.</li>
<li><strong>An die Krankenkasse.</strong> You have been sent a form you do not understand. Ask what it is for and what you have to do.</li>
</ol>
<p>None of these needs to be long. Eight to twelve lines each is right, and a longer one is usually a worse one.</p>
<p><strong>What is being assessed</strong> is the shape and the register, not your vocabulary range. A correct letter can be assembled from a template without sounding assembled, and that is the skill.</p>
<p>Also submit a short note in English explaining the register choices you made and why, so an assessor can tell a deliberate choice from a lucky one.</p>`,
        requires: [
          {
            key: "emails",
            label: "The three emails",
            formats: ["PDF", "DOCX"],
            note: "Each with a Betreff, a correct Anrede, a body and a Grußformel. Plain text is fine; layout is not the point.",
          },
          {
            key: "note",
            label: "Your commentary",
            formats: ["PDF", "DOCX"],
            note: "In English. Which register you chose for each and why, and anything you were unsure of.",
          },
        ],
        rubric: [
          {
            key: "structure",
            label: "The letters have the right shape",
            bands: [
              "Missing salutation, subject or closing, or in an order that is not conventional",
              "All parts present but the subject lines are vague or the salutation is mismatched",
              "Betreff, Anrede, body and Grußformel all correct and conventional",
              "All correct, including the lower case start after the salutation and specific subject lines naming the matter and the writer",
            ],
            weight: 3,
          },
          {
            key: "register",
            label: "Register is right for each recipient",
            bands: [
              "du used, or a casual greeting to an authority",
              "Sie used but with English-style hedging that reads as evasive in German",
              "Sie throughout with appropriate formality for all three",
              "Register differentiated correctly between the landlord, the Amt and the insurer, which are not identical",
            ],
            weight: 3,
          },
          {
            key: "politeness",
            label: "The polite subjunctive is used",
            bands: [
              "Bare imperatives or plain indicatives throughout",
              "One or two softeners, inconsistently applied",
              "Könnten, hätten and würden used appropriately in requests",
              "Used appropriately and sparingly, so the letters are polite without becoming vague",
            ],
            weight: 2,
          },
          {
            key: "purpose",
            label: "Each letter gets its job done",
            bands: [
              "The reader would not know what action is being requested",
              "The request is present but buried",
              "The purpose is clear in the opening and the action requested is explicit",
              "All of that, plus the heating letter states availability and the Amt letter lists documents held, so the reply can be a yes rather than a question",
            ],
            weight: 2,
          },
        ],
        modelAnswer: `<p><strong>Email 1, to the landlord.</strong></p>
<p><em>Betreff: Heizungsausfall seit 4. Februar, Wohnung 3B, Sharma</em></p>
<p>Sehr geehrter Herr Krüger,<br>
seit dem 4. Februar funktioniert die Heizung in meiner Wohnung nicht mehr. Die Temperatur liegt tagsüber bei etwa 14 Grad.</p>
<p>Ich möchte Sie bitten, die Heizung so bald wie möglich reparieren zu lassen. Ich bin diese Woche montags bis mittwochs ab 16 Uhr zu Hause und am Samstag ganztägig.</p>
<p>Könnten Sie mir bitte mitteilen, wann mit einer Reparatur zu rechnen ist?</p>
<p>Mit freundlichen Grüßen<br>Priya Sharma</p>
<p><strong>Why this works.</strong> The subject names the fault, the date and the flat, so it can be filed and acted on without being opened. The opening sentence states the problem and the second gives a measurement, which is harder to dismiss than "it is cold". Availability is offered, so the reply can be a date rather than a question. And Könnten Sie mir bitte mitteilen is firm: it requests a commitment without threatening anything, which is the right tone for a first letter.</p>
<p><strong>Email 2, to the Bürgeramt.</strong> Subject: Terminanfrage Anmeldung, Sharma. Salutation Sehr geehrte Damen und Herren, since you have no name. State what you want in the first sentence, then list the documents you already hold, then ask whether anything else is required. Listing what you have turns an open question into a closed one and is the difference between a reply that books you in and a reply that sends you the general information page.</p>
<p><strong>Email 3, to the Krankenkasse.</strong> Quote any reference number in the subject, because insurers route on it. Say plainly that you do not understand the form rather than pretending otherwise, and ask two specific questions: what it is for and what you must do by when. Asking two specific questions produces two specific answers; asking "can you explain this" produces a copy of the form.</p>
<p><strong>The adjustment most submissions miss.</strong> English-style hedging stacked on top of German subjunctive softeners reads as evasive. Ich wollte nur mal ganz kurz fragen, ob es eventuell vielleicht möglich wäre is four hedges doing the work of one. Könnten Sie mir bitte mitteilen is the whole softener, and the rest of the sentence should then be direct.</p>
<p><strong>And one thing worth knowing beyond these three.</strong> For anything with a legal deadline, a Kündigung or a Widerspruch, email may not be valid at all: where Schriftform is required a handwritten signature is needed, and registered post with acknowledgement is the defensive practice. None of these three letters is in that category, and the next one you write might be.</p>`,
        minutes: 120,
        skills: ["Anrede", "Betreff", "Grußformel", "Konjunktiv höflich", "Formal register"],
      },
    ],
  },
};

export default curriculum;
