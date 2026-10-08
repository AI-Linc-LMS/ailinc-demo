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
      Beginner: `<p>German spelling is honest. Unlike English, a letter almost always sounds the same way. That means a short list of rules gets you a long way.</p>
<p><strong>w sounds like v.</strong> Wasser is "vasser". <strong>v usually sounds like f.</strong> Vater is "fater". <strong>z always sounds like ts.</strong> Zwei is "tsvai", never "zwai".</p>
<p><strong>The dots change the vowel.</strong> They are not decoration. Schon means already; schön means beautiful. Different words.</p>
<p><strong>ch is not k.</strong> After i or e it is a soft hiss made at the front of your mouth, like the start of the English word "huge". Milch is not "milk".</p>
<p><strong>ei sounds like "eye" and ie sounds like "ee".</strong> This feels backwards to English speakers and it is the single most common reading mistake. Bier is "beer". Mein is "mine".</p>
<p>Six rules. Practise them out loud rather than reading them, because the muscles have to learn this and your eyes cannot do it for them.</p>`,
      Intermediate: `<p>German orthography is close to phonemic, so unlike English the written form is a reliable guide once you know the correspondences. The investment in learning them is small and it pays on every word you ever read.</p>
<p>The umlauts are genuinely new sounds rather than modifications you can approximate. For ü, hold your tongue where it sits for "ee" and round your lips as for "oo"; for ö, hold the tongue for "eh" and round the lips as for "oh". The reason approximating fails is that these distinctions carry meaning: Mutter is mother and Mütter is mothers, schwul and schwül are entirely different words.</p>
<p>The two ch sounds are allophones determined by the preceding vowel, which means you do not have to choose. After a, o, u and au it is the back-of-throat Ach-Laut as in Buch. After everything else, including i, e, ä, ö, ü and consonants, it is the front Ich-Laut as in ich and Milch. Substituting k for either is the single most recognisable marker of a foreign accent.</p>
<p>Final devoicing is the rule nobody teaches early enough. A b, d or g at the end of a syllable is pronounced as p, t or k, so Tag ends in a k sound and Hund ends in a t. It matters for comprehension as much as for production, because you will hear "hunt" and need to recognise Hund.</p>`,
      Advanced: `<p>The functional load of these distinctions is what makes them worth drilling rather than approximating. Front rounded vowels carry grammatical information in German, most visibly in plural formation and in the subjunctive, so a learner who collapses ü into u is not merely accented: they are deleting morphology. Mutter and Mütter differ only in that vowel, and so do a long list of singular and plural pairs.</p>
<p>The ch allophony is conditioned by the preceding segment rather than chosen, which is pedagogically useful because it removes a decision. The one systematic exception worth knowing is the diminutive suffix -chen, which takes the front Ich-Laut regardless of what precedes it, so Frauchen does not take the back sound its preceding vowel would otherwise dictate. That exception exists because the morpheme boundary blocks the assimilation.</p>
<p>The r is the sound most courses teach badly by ignoring it. In standard German it is uvular in onset position, close to the French r, but in syllable codas and in the unstressed -er ending it vocalises to something near a schwa: Vater ends in a vowel, not a consonant. Learners who produce an English retroflex r in coda position sound markedly foreign even when every other sound is correct, and the fix is to stop producing a consonant there at all.</p>
<p>Prosody matters more than any single segment and is almost never taught at A1. German is stress-timed with fairly even syllable weight and strong word-initial stress in native vocabulary, and it tolerates consonant clusters that English would break up. A learner who inserts an epenthetic vowel into Strumpf or Herbst will be understood with effort; one who gets the clusters and the stress right will be understood even with imperfect vowels.</p>`,
      Expert: `<p>The umlaut vowels are front rounded, a cross-linguistically marked combination that English lacks entirely, and the acquisition literature is consistent that the difficulty is perceptual before it is articulatory. Learners assimilate ü to their nearest native category, typically /u/, and because they cannot reliably hear the contrast they cannot monitor their own production. The pedagogical implication is that discrimination training precedes production training, which inverts how most courses sequence it, and it is the reason a listening task on minimal pairs belongs before a speaking task on the same sounds.</p>
<p>Final devoicing, Auslautverhärtung, is a syllable-final neutralisation and its interaction with morphology is what makes it a genuine learning problem rather than a pronunciation rule. The underlying voiced segment resurfaces when a vowel-initial suffix resyllabifies it, so Tag is realised with a final k but Tage has an intervocalic g. A learner who has internalised the surface form as the lexical form will produce Take for Tage, which is a morphophonological error rather than a phonetic one.</p>
<p>The vocalised r deserves formal treatment because it changes syllable structure rather than merely colouring a consonant. Coda r surfaces as a non-syllabic low central vocoid, and the -er sequence as a schwa-like vowel, which means words like Vater and besser are phonologically vowel-final. This has downstream effects on connected speech that learners notice as native speakers "swallowing" endings, and the fix is to produce the vowel rather than to listen harder.</p>
<p>On assessment, the construct worth measuring at this level is intelligibility rather than nativelikeness, and those come apart in identifiable ways. Segmental errors on high functional load contrasts, chiefly the front rounded vowels and the ch distinction, damage intelligibility; errors on low functional load features such as the exact quality of the uvular r do not. A scoring scheme that weights all segments equally will penalise a perfectly comprehensible speaker and reward one whose accent is tidy but whose plurals are inaudible.</p>`,
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
          { id: 1, front: "Mutter / Mütter", back: "mother / mothers", extra: { Sound: "u against ü", "Why it matters": "The plural is carried entirely by that vowel" }, tags: ["Umlaut"] },
          { id: 2, front: "schon / schön", back: "already / beautiful", extra: { Sound: "o against ö" }, tags: ["Umlaut"] },
          { id: 3, front: "Vater / Väter", back: "father / fathers", extra: { Sound: "a against ä", "Why it matters": "Plural again" }, tags: ["Umlaut"] },
          { id: 4, front: "mochte / möchte", back: "wanted to / would like", extra: { Sound: "o against ö", "Why it matters": "Past against polite present, in every shop transaction" }, tags: ["Umlaut"] },
          { id: 5, front: "Mann / man", back: "man / one (impersonal)", extra: { Sound: "Same sound, different word", Note: "Heard identically, told apart by grammar" }, tags: ["Listening"] },
          { id: 6, front: "Bier / Bär", back: "beer / bear", extra: { Sound: "ie as ee, ä as a long e" }, tags: ["Vowels"] },
          { id: 7, front: "mein / Mien", back: "my / (not a word, but read it)", extra: { Rule: "ei is eye, ie is ee. The reverse of English intuition." }, tags: ["Vowels"] },
          { id: 8, front: "Kirche / Kirsche", back: "church / cherry", extra: { Sound: "ch against sch" }, tags: ["Consonants"] },
          { id: 9, front: "Tag", back: "day, ending in a k sound", extra: { Rule: "Final devoicing: b, d, g become p, t, k at the end", Contrast: "But Tage has a real g, because the suffix resyllabifies it" }, tags: ["Devoicing"] },
          { id: 10, front: "Hund", back: "dog, ending in a t sound", extra: { Rule: "Final devoicing again", Contrast: "Hunde has the d back" }, tags: ["Devoicing"] },
          { id: 11, front: "Zeit", back: "time, pronounced tsait", extra: { Rule: "z is always ts" }, tags: ["Consonants"] },
          { id: 12, front: "Wasser", back: "water, pronounced vasser", extra: { Rule: "w is v" }, tags: ["Consonants"] },
          { id: 13, front: "Vogel", back: "bird, pronounced fogel", extra: { Rule: "v is usually f in native words" }, tags: ["Consonants"] },
          { id: 14, front: "ich", back: "I, with the soft front ch", extra: { Warning: "Not ik. This is the most recognisable accent marker there is." }, tags: ["Ich-Laut"] },
          { id: 15, front: "Buch", back: "book, with the hard back ch", extra: { Rule: "After a, o, u the ch moves to the back of the throat" }, tags: ["Ach-Laut"] },
          { id: 16, front: "Vater", back: "father, ending in a vowel sound not an r", extra: { Rule: "Coda r vocalises. Producing an English r here sounds markedly foreign." }, tags: ["The r"] },
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
      Beginner: `<p>Four sentences and one question. That is the whole introduction, and you will use it hundreds of times.</p>
<p><strong>Ich heiße Priya.</strong> My name is Priya. Literally "I am called".<br>
<strong>Ich komme aus Indien.</strong> I come from India.<br>
<strong>Ich wohne in Berlin.</strong> I live in Berlin.<br>
<strong>Ich bin Ingenieurin.</strong> I am an engineer. Note that German drops the "an" here.</p>
<p>Then the part that matters more than all of it: <strong>Und Sie?</strong> And you? Two words, and they turn your four sentences into a conversation instead of a speech.</p>
<p>To ask, use the w words. <strong>Wie heißen Sie?</strong> What are you called. <strong>Woher kommen Sie?</strong> Where do you come from. <strong>Wo wohnen Sie?</strong> Where do you live. Notice the verb is always the second thing in the sentence. That rule will follow you through the whole language.</p>`,
      Intermediate: `<p>Learn this as a routine rather than as four separate grammar points, because that is how it is used. The pattern is: name, origin, residence, occupation, and then hand the turn back.</p>
<p>Three verbs carry it. Heißen, to be called, is the normal way to give a name; mein Name ist exists but sounds stiff. Kommen aus takes a country or city for origin. Wohnen in takes a place of residence, and it is distinct from leben, which is to live in the broader sense.</p>
<p>Occupations drop the article: Ich bin Ingenieurin, not ich bin eine Ingenieurin. They also take a feminine form, usually with -in, and using the masculine form of your own occupation when you are female is a visible error rather than a neutral choice.</p>
<p>The question forms all put the verb second, which is the rule that governs German word order generally. Wie heißen Sie, woher kommen Sie, wo wohnen Sie. The w word occupies the first position, the verb takes the second, and the subject follows, which is the inversion English only does in questions and German does whenever anything other than the subject comes first.</p>`,
      Advanced: `<p>Heißen is worth examining because it is unusual: it takes a predicate nominative rather than an object, so the name is in the nominative case. That matters once you move past names, since the same structure appears in constructions where learners expect an accusative. Mein Name ist exists as an alternative and carries a register difference, appearing in formal introductions and on the telephone rather than in ordinary conversation.</p>
<p>The distinction between wohnen and leben is one learners flatten and native speakers maintain. Wohnen is about residence, about where your address is; leben is about living in a broader sense, about existence or a way of life. Ich wohne in Berlin and ich lebe in Berlin are both correct and not equivalent, with the second implying something about one's life rather than one's postal address.</p>
<p>Occupation without an article is a genuine structural feature rather than an idiom, and it extends to nationalities and to religious affiliation. The article reappears as soon as the noun is modified: ich bin Ingenieurin, but ich bin eine gute Ingenieurin. The rule is that the bare form names a category membership while the article introduces an individual instance, which is also why it feels wrong to a speaker whose language does not make the distinction.</p>
<p>Asking back is not merely polite, it is structurally expected, and a learner who answers and stops creates an awkwardness that reads as rudeness rather than as limited vocabulary. Und Sie is the minimal form and carries the whole function, which is why it is worth drilling to the point of automaticity before any of the grammar underneath it is understood.</p>`,
      Expert: `<p>The verb-second constraint visible in these question forms is the surface reflex of a deeper property: German is a V2 language in main clauses, with the finite verb in the C position and exactly one constituent in the specifier before it. What makes this harder than it looks for learners is that the pre-verbal position is not reserved for subjects, so any topicalised element triggers inversion, and a learner who has memorised question inversion as a question rule will produce ungrammatical declaratives the moment they front an adverbial.</p>
<p>The articleless predicate nominal in ich bin Ingenieurin is a well-studied construction, and the analysis that generalises is that bare predicate nominals denote properties while determined ones denote individuals. This correctly predicts that modification forces the article, that the bare form is restricted to professions, nationalities and similar category nouns, and that it is unavailable in argument positions. Learners who are given the fact without the principle overapply it to objects.</p>
<p>Sociolinguistically, the introduction routine is also where the Sie and du decision is first made and it is rarely neutral. The default in any transaction with a stranger over about sixteen is Sie, but the domains where du is default have expanded in recent decades, notably in tech workplaces, among students, and in much of the service sector aimed at younger customers. A learner operating on a 1990s textbook rule will sound stiff in a Berlin startup and a learner operating on English informality will cause genuine offence in an Amt.</p>
<p>Finally, the pedagogical case for teaching this as an unanalysed chunk is strong and worth stating, because it conflicts with grammar-first instruction. Formulaic sequences are processed holistically, which frees working memory for the parts of the interaction that cannot be automated, and the research on chunk learning indicates that early formulaic competence correlates with later analytic competence rather than competing with it. Drilling the block first and unpacking the grammar afterwards is the right order.</p>`,
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
      Beginner: `<p>Numbers to twelve you just learn: eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf.</p>
<p>Then the thing that catches everybody. From twenty-one upwards, German says the small digit first. <strong>Einundzwanzig</strong> is literally "one and twenty", which is 21. <strong>Siebenundvierzig</strong> is "seven and forty", which is 47. You have to hold the first number in your head and wait for the second, which is exhausting at first and becomes automatic.</p>
<p>Phone numbers avoid this entirely. Germans usually read them in pairs: 0176 23 45 67 is read as null eins sieben sechs, dreiundzwanzig, fünfundvierzig, siebenundsechzig. Or they read them digit by digit, which you are allowed to ask for: <strong>Können Sie das bitte einzeln sagen?</strong></p>
<p>And one trap in telling the time. <strong>Halb drei</strong> is not half past three. It is half an hour before three, so 2:30. Germans count toward the coming hour, not back from the past one.</p>`,
      Intermediate: `<p>The reversed order of two digit numbers is the single hardest listening feature at A1, because it imposes a working memory cost. Hearing "sieben und vierzig" requires holding the seven while waiting for the forty, and then assembling 47. Native speakers do this without noticing; learners lose the first digit under load, which is why numbers go wrong on the phone long after they are solid on paper.</p>
<p>The practical defence is to write as you hear rather than to listen and then write. Note the first digit immediately, leave a gap, and fill in the tens when it arrives. This feels clumsy and it is substantially more reliable than trying to assemble the number in your head.</p>
<p>Spelling aloud is a survival skill rather than an exercise, because any non-German name will be asked for letter by letter in every office you ever enter. The letters that cause trouble are the ones that differ from English: e is "ay", i is "ee", a is "ah", j is "yot", v is "fau", w is "vay", y is "üpsilon", and z is "tsett". Confusing e and i is the most common error and produces a misspelled name on an official document.</p>
<p>For the clock, remember that German orients toward the coming hour. Halb drei is half an hour before three. Viertel vor and viertel nach work as in English, but the halb form is a genuine trap and getting it wrong moves an appointment by an hour.</p>`,
      Advanced: `<p>The reversed decade construction is a Germanic retention that English lost, surviving only in archaisms like four and twenty blackbirds, and knowing that it is a retention rather than an oddity helps learners stop fighting it. Dutch and Danish do the same thing. What matters pedagogically is that the cost is perceptual rather than conceptual: learners understand the rule immediately and still fail to parse numbers in real time, which means drilling has to be aural and under time pressure rather than written.</p>
<p>Telephone number conventions vary regionally and by context, and all three patterns are current: pairs, digit by digit, and a mixed form where the dialling code is read digitally and the rest in pairs. Asking for one form explicitly is entirely normal and not a mark of incompetence, which is worth telling learners because they will otherwise guess and write down a wrong number rather than ask.</p>
<p>The clock has a further regional complication worth knowing even at A1. In southern Germany and Austria, dreiviertel drei means 2:45 and viertel drei means 2:15, counting quarters toward the coming hour rather than using vor and nach. A learner who has only the northern forms will misunderstand an appointment time by half an hour in Bavaria, and the forms are not interchangeable in either direction.</p>
<p>Ordinals deserve a mention because dates use them and the written form is a trap. Der erste Mai is written 1. Mai, with a full stop standing for the ordinal ending, and a date written 1.5. means the first of May rather than the fifth of January. The day-month order is standard and the full stop is doing grammatical work, which is why a date copied from an English form into a German one is a recurring administrative error.</p>`,
      Expert: `<p>The processing cost of decade inversion has been measured, and it shows up as longer latencies and higher error rates in number transcoding tasks for German relative to English even among native speakers, with the effect magnified in multi-digit sequences. The implication for instruction is that automaticity, not comprehension, is the bottleneck, and the training that works is high-volume aural practice with immediate transcription rather than explanation.</p>
<p>There is an interesting downstream consequence in arithmetic acquisition. Cross-linguistic work on early number development finds that inverted decade languages produce measurable disadvantages in place value tasks in young children, and that transparent systems such as the East Asian ones produce advantages. That is not directly relevant to an adult learner, but it does indicate that the inversion imposes a genuine cognitive cost rather than being a surface convention one simply habituates to.</p>
<p>On spelling, the Deutsches Funkalphabet, the German spelling alphabet, is the professional register for this task and is still in regular use in administrative and telephone contexts: Anton, Berta, Cäsar and so on. A learner who can use it is operating at a level above letter-by-letter spelling and will be understood on a poor telephone line where letter names fail, which is precisely the situation where this matters most.</p>
<p>The dates convention interacts with a broader issue of document literacy that language courses typically omit. German administrative forms use the day-month-year order with full stops, write decimal commas and thousands separators the opposite way round from the Indian and English conventions, and use the comma as the decimal separator. A learner filling in a form with 1,5 meaning one and a half and 1.500 meaning fifteen hundred is reading correctly; one who imports English conventions will make errors that are invisible to them and consequential on a rental application or a tax form.</p>`,
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
      Beginner: `<p>German has two words for "you". <strong>Sie</strong> is formal and <strong>du</strong> is informal, and you have to choose one every time you speak to somebody.</p>
<p>The safe default with any adult stranger is <strong>Sie</strong>. Shop staff, officials, colleagues you have just met, your landlord, a doctor. Using Sie when du would have been fine makes you sound slightly formal. Using du when Sie was expected can genuinely offend, so the risk is not symmetrical.</p>
<p>Use <strong>du</strong> with children, with family, with close friends, and with people who have offered it to you. In many younger workplaces, especially in tech, everybody uses du from the first day, and you will notice within an hour.</p>
<p>If somebody offers you du, take it. <strong>Wir können uns duzen</strong> means "we can use du with each other". Saying no is a refusal of friendliness, and continuing with Sie after it has been offered is its own small insult.</p>
<p>The grammar follows the pronoun. Sie takes the same verb form as the infinitive: Sie kommen. Du has its own ending: du kommst.</p>`,
      Intermediate: `<p>The choice is a social judgement that German forces into the grammar, so it cannot be avoided the way English allows. The error is asymmetric: excessive formality reads as reserve, while unwarranted familiarity reads as disrespect, and in an official setting it can affect how you are treated.</p>
<p>The reliable defaults are worth memorising. Sie with anybody in a service or official role, with colleagues on first meeting, with anybody notably older, and in writing to an organisation. Du with children up to about sixteen, within families, among students, among close friends, and in workplaces that have declared themselves du cultures.</p>
<p>The transition is conventionally offered by the older or more senior person, and the formula is wir können uns duzen or the more direct ich bin Thomas accompanied by a handshake. Once offered it is not withdrawn, and going back to Sie afterwards is a deliberate act of distancing that will be read as such.</p>
<p>Grammatically, Sie takes third person plural forms and is always capitalised, which distinguishes it in writing from sie meaning she or they. Du has its own conjugation with the -st ending. Mixing them within one conversation, which learners do constantly under pressure, is more noticeable to a German ear than a mispronounced vowel.</p>`,
      Advanced: `<p>The distinction is a classic T-V system, and the useful framing is that it encodes two different dimensions that usually but not always align: social distance and relative power. Historically the asymmetric use, where a superior said du and received Sie, marked hierarchy directly. That asymmetry has largely disappeared from German, and its absence is itself informative: modern usage is overwhelmingly reciprocal, so an asymmetric exchange signals something marked rather than something normal.</p>
<p>Usage has shifted substantially in two generations and a learner working from an older textbook will be miscalibrated. Advertising addresses customers with du routinely. Most startups and much of the tech sector are du from the first interview. IKEA famously uses du with all customers, which caused genuine controversy when introduced and is now unremarkable. Against that, Ämter, banks, medicine, law and most of the traditional professions remain firmly Sie.</p>
<p>The Hamburger Sie, first name plus Sie, is now common in workplaces trying to be informal without the commitment of du, and it occupies a genuine middle position rather than being an error. Its mirror image, the Münchner Du of surname plus du, is rarer and marks a specific kind of long familiarity. A learner who encounters either and corrects it will be the only person in the room who thought it was wrong.</p>
<p>Repair strategies matter because mistakes will happen. Having used du wrongly, the recovery is a brief explicit apology, Entschuldigung, ich meinte Sie, and then simply continuing. The version that compounds the error is over-apologising, which draws attention to it and makes the other person manage your embarrassment. Germans generally treat a learner's slip as unremarkable unless it is made into an event.</p>`,
      Expert: `<p>Brown and Gilman's analysis of the pronouns of power and solidarity remains the standard framework, and the German case is a good illustration of the predicted historical trajectory: a shift from power-based asymmetric usage toward solidarity-based reciprocal usage, with the solidarity semantic progressively widening the du domain. What the model does not predict well is the recent partial reversal in some professional contexts, where Sie has been reasserted as a marker of professionalism specifically because du has become commercially ubiquitous.</p>
<p>The sociolinguistic variables that actually predict usage in contemporary German are age, sector and regional culture, roughly in that order, with age the strongest. Speakers under thirty-five duzen far more readily across contexts than their parents did, and the effect is strongest in urban and in internationally oriented workplaces. A learner can use this: the prior should be conditioned on who is in front of them rather than on a flat rule.</p>
<p>There is a legal dimension that surprises people. German labour case law has treated unsolicited duzen in a workplace as potentially constituting a slight in specific circumstances, and the right not to be duzt has been upheld in employment disputes. That is not a reason for a learner to worry, but it does establish that the distinction carries weight beyond etiquette, which is the fact that justifies teaching it carefully rather than as a curiosity.</p>
<p>Finally, note what the system does that English cannot. Every German utterance to another person encodes a claim about the relationship, which means the relationship is continuously negotiated in the grammar rather than left implicit. English speakers experience this as an extra burden; it is more accurately a different distribution of the same information, since English carries it in address terms, hedging and intonation instead. Learners who understand it as relocation rather than addition stop treating it as an arbitrary obstacle.</p>`,
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
};

export default curriculum;
