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
      Beginner: `<p>Every German noun is der, die or das, and you have to learn which. The usual advice is to memorise the article with every word, which is correct and incomplete, because a lot of the time you can work it out.</p>
<p>Here are the rules that pay for themselves immediately.</p>
<p><strong>Always feminine:</strong> words ending in -ung, -heit, -keit, -schaft, -ion, -tät. Die Wohnung, die Freiheit, die Universität. No exceptions worth worrying about.</p>
<p><strong>Always neuter:</strong> words ending in -chen or -lein. Das Mädchen is neuter even though it means girl, because the ending wins over the meaning.</p>
<p><strong>Usually masculine:</strong> days, months, seasons, and weather. Der Montag, der Juli, der Sommer, der Regen.</p>
<p><strong>Compound words take the gender of the last part.</strong> Die Hand plus der Schuh gives der Handschuh, a glove. This one rule covers thousands of words.</p>
<p>Learn the plural with the word too. German has five plural patterns and no reliable way to guess, so "die Wohnung, die Wohnungen" is the unit to learn rather than just the singular.</p>`,
      Intermediate: `<p>Grammatical gender is a classification system rather than a semantic one, which is why das Mädchen is neuter: the diminutive suffix -chen determines the class and overrides the meaning entirely. Treating gender as arbitrary is the standard beginner position and it is costly, because the suffix rules alone cover a substantial proportion of the nouns a learner meets.</p>
<p>The reliable feminine endings are -ung, -heit, -keit, -schaft, -ion, -tät, -ik and -ei. The reliable neuter endings are -chen, -lein, -ment and -um. Masculine is the weakest set and tends to be defined by semantic fields rather than by form: days, months, seasons, weather phenomena, points of the compass, and most agent nouns in -er.</p>
<p>Compounding is the single highest-value rule because German builds nouns freely and the last element always determines gender. Die Hand plus der Schuh gives der Handschuh. That means learning the gender of a few hundred base nouns gives you the gender of tens of thousands of compounds for nothing.</p>
<p>Plurals must be learned with the noun because the five patterns, no ending, -e, -er, -en and -s, are not predictable from the singular in most cases, although gender correlates: feminine nouns overwhelmingly take -n or -en. Learning article plus noun plus plural as one three-part unit from the first encounter is far cheaper than relearning it later.</p>`,
      Advanced: `<p>The predictive structure is stronger than most courses admit, and the research on German gender assignment finds that phonological and morphological cues together account for a large majority of nouns. Monosyllabic nouns are a notable hard case where the cues are weakest and frequency effects dominate, which is exactly the set beginners encounter first, so learners form the impression that gender is arbitrary from the least representative sample in the language.</p>
<p>The feminine suffix set is worth treating as absolute because it is, and the apparent exceptions are illuminating rather than troublesome. Das Verhältnis ends in -nis, which is a different suffix and takes neuter. Der Reichtum takes -tum which is masculine here against the usual neuter, and it is one of a pair with der Irrtum. Knowing that the exceptions are lexically listed rather than random is what makes the rules usable.</p>
<p>Gender is doing more work than identification. It is the hook on which case marking hangs, so a learner who is unsure of gender cannot produce correct case marking even when they know the case system perfectly. That dependency is the practical argument for drilling gender early and hard: it is a prerequisite rather than a parallel topic, and the errors it causes surface as case errors, which get misdiagnosed.</p>
<p>On plurals, the five patterns correlate with gender and with syllable structure strongly enough to be worth teaching as tendencies. Feminine nouns take -n or -en in the overwhelming majority of cases. Masculine and neuter monosyllables tend toward -e, often with umlaut on the masculine. The -s plural is largely restricted to loanwords and abbreviations, which is why it feels foreign: it is.</p>`,
      Expert: `<p>The assignment system is best modelled as a hierarchy of competing cues with morphological ones ranked above phonological and phonological above semantic, which correctly predicts that das Mädchen is neuter despite a semantic cue pointing the other way. Connectionist models trained on German noun form alone reach accuracies in the high eighties, which establishes that the system is substantially learnable from form and that the folk belief in arbitrariness is an artefact of how it is taught.</p>
<p>What makes gender hard for adult learners specifically is not the assignment but the retrieval. Lexical access models suggest gender is stored as a lemma-level feature retrieved along with the noun, and late learners show slower and less reliable retrieval even at high proficiency, with errors concentrated under time pressure. This predicts the observed pattern: advanced learners who know the gender of a word in isolation and produce the wrong article in running speech. The instructional consequence is that gender needs automatising through production rather than merely learning through recognition.</p>
<p>The sociolinguistic dimension has become live. Gendered agent nouns, where der Lehrer and die Lehrerin encode sex, have made German a focus of inclusive language debate, with competing conventions including the Binnen-I, the Gendersternchen and the Doppelpunkt. A learner will encounter all of them in written German and should know that none is uncontroversial, that official style guides differ, and that the Rat für deutsche Rechtschreibung has so far declined to incorporate the starred forms into the official orthography.</p>
<p>Finally, there is a measurable processing consequence worth knowing. Gender marking on the article provides predictive information that native listeners exploit to anticipate the upcoming noun, and eye-tracking studies show this prediction effect robustly. Learners who have not automatised gender lose that predictive advantage and consequently process German more slowly, which means gender accuracy pays off in listening comprehension and not only in production correctness.</p>`,
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
      Beginner: `<p>In English, word order tells you who did what. "The dog bites the man" and "The man bites the dog" use the same words and mean opposite things.</p>
<p>German marks it on the article instead. That is the whole point of cases, and it means German can move words around without losing track of who did what.</p>
<p>Here is the good news. Only one article changes in the singular: masculine <strong>der</strong> becomes <strong>den</strong>. Everything else stays the same.</p>
<ul>
<li>Masculine: der → <strong>den</strong>. Ich sehe <strong>den</strong> Mann.</li>
<li>Feminine: die → die. Ich sehe <strong>die</strong> Frau.</li>
<li>Neuter: das → das. Ich sehe <strong>das</strong> Kind.</li>
<li>Plural: die → die. Ich sehe <strong>die</strong> Kinder.</li>
</ul>
<p>So three quarters of the accusative is "no change". Learn der to den properly and you have most of it.</p>
<p>Five prepositions always take the accusative no matter what: <strong>durch, für, gegen, ohne, um</strong>. Für den Mann. Ohne den Hund. Learn them as a block.</p>`,
      Intermediate: `<p>Case is how German encodes grammatical role, which is why its word order can be freer than English. Den Mann sehe ich is perfectly grammatical and means the same as ich sehe den Mann, with the fronting adding emphasis rather than changing who did what. English cannot do that because it has nothing but position to carry the information.</p>
<p>The economy of the singular accusative is worth emphasising because it is usually taught as a four-cell table that looks harder than it is. Only the masculine changes: der to den, and correspondingly ein to einen, kein to keinen, mein to meinen. Feminine, neuter and plural are identical to the nominative.</p>
<p>The accusative marks the direct object, meaning the entity directly affected by the verb. Separating it from the subject is straightforward once the question is asked explicitly: who or what is doing this, and who or what is it being done to. For most learners the errors come not from confusion about roles but from failing to apply the marking under time pressure.</p>
<p>The accusative prepositions are a closed set and should be memorised as a unit: durch, für, gegen, ohne, um. They take the accusative regardless of whether any motion or affectedness is involved, which is the point of calling them fixed. A sixth, bis, belongs to the set but rarely appears with an article.</p>`,
      Advanced: `<p>The structural insight that makes the case system coherent is that German is a configurationally freer language precisely because its morphology carries the role information. Scrambling in the Mittelfeld is licensed by case marking, and where case marking is ambiguous, as it is for feminine and neuter singular and all plurals, word order reasserts itself as the disambiguator. Die Mutter sieht die Tochter is genuinely ambiguous out of context, and native speakers default to subject-first exactly because nothing else resolves it.</p>
<p>That ambiguity is a useful teaching point rather than a defect. It demonstrates that case and word order are two mechanisms for the same job, operating in complementary distribution: German uses morphology where it has it and position where it does not. A learner who understands this stops treating free word order as an alarming property and starts treating it as a consequence of the case endings they are learning.</p>
<p>The weak noun class, the n-declension, is the loose end at this level and is worth flagging early. A set of masculine nouns, mostly animate and many ending in -e, take -n in every case except the nominative singular: der Junge but den Jungen, der Student but den Studenten. Learners who meet these as exceptions after internalising the regular pattern tend to treat them as errors in the text.</p>
<p>On acquisition order, case marking is late and effortful, and the accusative reliably precedes the dative. Learners typically pass through a stage of producing the nominative everywhere, which is a developmental sequence rather than carelessness, and correcting it is a matter of increasing automaticity rather than re-explaining the rule. The rule is almost never the problem by the time a learner reaches this stage.</p>`,
      Expert: `<p>Treating case as morphological role marking rather than as a list of endings explains its distribution within the language and across its relatives. German retains four cases where English retains them only in pronouns, and the retention correlates with the freer constituent order in the Mittelfeld, which is the expected trade-off: a language can encode grammatical function positionally or morphologically, and the two are to a first approximation substitutable.</p>
<p>The syncretism pattern in German is not random and is worth examining because it bears on learnability. Nominative and accusative are distinguished only in the masculine singular across the entire determiner paradigm, which means the accusative is the weakest-marked case in the system and is consequently the first to erode in language contact varieties. Observed simplification in German spoken by second generation migrants tends to collapse exactly this distinction, which is evidence about where the functional load is lowest.</p>
<p>The n-declension is a remnant of the Proto-Germanic weak noun class and its membership is largely predictable from semantic and phonological properties: animate masculine nouns ending in unstressed -e, plus a set of learned borrowings in -ant, -ent, -ist and -oge. It is also demonstrably in retreat, with the accusative -n increasingly omitted in spoken German, and prescriptive sources treating the omission as an error while descriptive corpora show it widely. A learner will meet both positions.</p>
<p>Finally, the processing evidence matters for how case should be drilled. ERP studies show native speakers producing reliable responses to case violations, indicating automatic morphosyntactic processing, while late learners show reduced or absent effects at comparable proficiency. The implication is that explicit knowledge of the paradigm and automatic processing of it are genuinely separate attainments, and that production practice under time pressure is the only thing that converts one into the other.</p>`,
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
      Beginner: `<p>The dative marks the person something is done <em>for</em> or given <em>to</em>. In "I give the man the book", the book is the direct object and the man is the one receiving it, so the man is dative.</p>
<p>Unlike the accusative, every article changes:</p>
<ul>
<li>Masculine: der → <strong>dem</strong>. Ich gebe <strong>dem</strong> Mann das Buch.</li>
<li>Feminine: die → <strong>der</strong>. Ich gebe <strong>der</strong> Frau das Buch.</li>
<li>Neuter: das → <strong>dem</strong>. Ich gebe <strong>dem</strong> Kind das Buch.</li>
<li>Plural: die → <strong>den</strong>, and the noun adds an <strong>-n</strong>. Ich gebe <strong>den</strong> Kinder<strong>n</strong> das Buch.</li>
</ul>
<p>Watch the feminine: die becomes <strong>der</strong>, which looks exactly like the masculine nominative. That trips everybody for a while.</p>
<p>Seven prepositions always take the dative: <strong>aus, bei, mit, nach, seit, von, zu</strong>. Learn them as a chant, because reasoning about them does not work.</p>
<p>And some verbs just take the dative with no logic: helfen, danken, gehören, gefallen, antworten. Ich helfe <strong>dem</strong> Mann, not den Mann. There is no rule. It is a list.</p>`,
      Intermediate: `<p>The dative is the case of the indirect object: the recipient, the beneficiary, the person affected rather than acted upon. Geben, schenken, zeigen, schicken and kaufen take two objects, an accusative thing and a dative person, and the ordering convention is dative before accusative when both are nouns.</p>
<p>Every determiner changes in the dative, which makes it more visible than the accusative but also more work. The collision worth naming is that the feminine dative der is identical in form to the masculine nominative der, so der Frau can only be read correctly from the verb and the context. Learners spend a long period parsing that wrongly.</p>
<p>The dative plural carries an additional mark that nothing else does: the noun itself takes -n unless its plural already ends in one. Mit den Kindern, aus den Häusern, von den Freunden. It is the only place in modern German where a case ending appears on the noun rather than only on its determiner, and omitting it is one of the most audible learner errors.</p>
<p>The seven dative prepositions, aus, bei, mit, nach, seit, von and zu, are a closed set to be memorised rather than derived. Separately, the two-way prepositions take accusative for movement into a location and dative for position within it: ich gehe in die Küche against ich bin in der Küche. That distinction does carry meaning and is worth reasoning about, unlike the fixed set.</p>`,
      Advanced: `<p>The dative verbs are a lexical class rather than a semantic one, although a tendency is visible: many of them involve a person affected without being directly acted upon, which is the dative's core function. Helfen, danken, folgen, gratulieren, antworten, gehören, gefallen, passen and schmecken are the core set. The semantic generalisation is weak enough that the list has to be learned, but strong enough to make the list memorable rather than arbitrary.</p>
<p>Gefallen deserves separate attention because its argument structure reverses what learners expect. Das Buch gefällt mir means I like the book, with the book as grammatical subject and the person in the dative. Learners consistently produce ich gefalle das Buch, which means something close to the book finds me pleasing. The same pattern governs schmecken and gehören, and recognising it as a class rather than as three oddities is what makes it stick.</p>
<p>The two-way prepositions encode a genuine semantic distinction and are therefore the one part of the case system where reasoning is productive. The test is whether the prepositional phrase answers wohin, where to, which takes accusative, or wo, where, which takes dative. Ich hänge das Bild an die Wand against das Bild hängt an der Wand. Verbs of placement and position pair up systematically: legen against liegen, stellen against stehen, setzen against sitzen, hängen doing both.</p>
<p>On the dative plural -n, note the interaction with the -s plural class: das Auto gives die Autos and mit den Autos, with no additional -n, because the -s plural does not take it. That is the only systematic exception and it follows from the loanword status of the class rather than from anything structural.</p>`,
      Expert: `<p>The German dative is best analysed as covering two distinguishable functions that happen to share a form: a structural dative assigned to the indirect object of ditransitives, and a lexical dative selected idiosyncratically by particular verbs and prepositions. The split matters because the two behave differently under passivisation. The structural dative survives as a dative in the passive, which is why German has no true dative passive and resorts to bekommen-passives, while the lexical dative with helfen yields the impersonal mir wird geholfen.</p>
<p>The free dative constructions are a feature with no English equivalent and are worth knowing because they are frequent in speech. The dativus ethicus or dative of interest, as in das ist mir zu teuer, and the possessive dative, ich wasche mir die Hände rather than meine Hände, both express a participant's involvement without any verb selecting the dative. The possessive dative is obligatory with inalienable possession, so a learner producing ich wasche meine Hände is grammatical and sounds foreign.</p>
<p>Diachronically the German case system is eroding from the edges, and the genitive is the visible casualty: prepositions historically taking the genitive, wegen, trotz, während, are now routinely used with the dative in speech and increasingly in writing. The dative itself is stable, which is consistent with its higher functional load. A learner will encounter prescriptive sources insisting on wegen des Wetters and native speakers saying wegen dem Wetter, and both are facts about the language.</p>
<p>On acquisition, the dative is reliably later than the accusative across studies of learner German, and the ordering holds regardless of first language, which suggests a processing explanation rather than a transfer one. The dative requires tracking an additional argument role and carries more morphological distinctions, so the load is simply higher. The practical consequence is that dative errors in an otherwise fluent learner are developmental rather than evidence that the rule was never taught.</p>`,
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
      Beginner: `<p>You will not know the word. That is normal and it is not a problem, because there are three ways around it.</p>
<p><strong>Describe it.</strong> Ich suche etwas für... I am looking for something for... Es ist aus Plastik. It is made of plastic. Es ist wie ein Löffel, aber größer. It is like a spoon but bigger.</p>
<p><strong>Point and ask.</strong> Was ist das? Wie heißt das auf Deutsch? Both are completely normal questions and nobody minds.</p>
<p><strong>Ask for help.</strong> Können Sie mir helfen? Ich suche... Entschuldigung, wo finde ich Milch?</p>
<p>The basics of the transaction: <strong>Ich hätte gern...</strong> is the polite way to ask for something, more so than ich will. <strong>Was kostet das?</strong> for the price. <strong>Das ist alles, danke.</strong> when they ask whether you want anything else.</p>
<p>Two things that surprise people. Many small shops and even restaurants are <strong>cash only</strong>, so ask nur Bargeld? before you order. And bottles carry a deposit called <strong>Pfand</strong>, which you get back by feeding them into a machine in the supermarket.</p>`,
      Intermediate: `<p>Circumlocution is the highest-leverage skill at this level because it converts a vocabulary gap from a conversation-ending problem into a slightly longer sentence. The useful frames are small in number: es ist aus plus a material, man benutzt das für plus a purpose, es ist wie ein plus a known thing, and es ist zum plus an infinitive. Four frames will get you almost any object in a hardware shop.</p>
<p>Register in German shops is brisk rather than effusive, and learners carrying Anglophone service expectations often read it as rudeness. The expected exchange is short: a greeting, the request, the payment, danke, tschüss. Bitte and danke are not optional, but the extended pleasantries that pad an English transaction are absent, and attempting them reads as odd rather than warm.</p>
<p>Ich hätte gern is a subjunctive form and it is the standard polite request, more so than ich möchte and considerably more so than ich will, which sounds blunt to the point of rudeness. Learning it as a fixed phrase long before the subjunctive is taught is entirely sensible, because it is used dozens of times a week.</p>
<p>The practical culture matters as much as the language. Cash remains common, particularly in bakeries, Imbisse and smaller restaurants, and asking Kann ich mit Karte zahlen? before ordering avoids an awkward moment. Bags are not free and not offered. And the Pfand system means an empty bottle has monetary value, which is why people leave them beside bins rather than in them.</p>`,
      Advanced: `<p>Communication strategy research distinguishes achievement strategies, where the learner finds a way to convey the message, from avoidance strategies, where they abandon or alter it. Circumlocution is the prototypical achievement strategy and the evidence is consistent that learners who deploy achievement strategies make faster progress, because they stay in interactions that generate input rather than retreating from them. This is a strong argument for teaching the frames explicitly rather than hoping learners improvise them.</p>
<p>The politeness system in German transactional encounters is organised differently from English rather than being less polite. German tends toward negative politeness, respecting autonomy and not imposing, which surfaces as brevity and as the Sie form. English service register leans on positive politeness, friendliness and solidarity markers. A learner transferring English norms will produce utterances that are grammatical and socially miscalibrated, and the usual feedback is a slight coolness they cannot account for.</p>
<p>Repair strategies deserve as much drilling as the requests themselves, because comprehension will fail long before production does. Wie bitte, Können Sie das bitte wiederholen, Langsamer bitte, and Ich habe das nicht verstanden are a complete toolkit, and the key point to convey is that using them is normal rather than an admission of failure. Learners who will not interrupt to ask for repetition accumulate misunderstandings instead.</p>
<p>Regional variation is worth flagging so learners are not thrown by it. Grüß Gott rather than Guten Tag in the south, Moin in the north, Semmel against Brötchen for a bread roll, and a range of greeting conventions that differ by Land. None of this is optional knowledge if a learner is going to be living somewhere specific, and none of it is in most A1 textbooks.</p>`,
      Expert: `<p>The service encounter is one of the most heavily scripted genres in any language, which makes it unusually teachable and unusually revealing when the script is violated. German retail scripts are notably compressed relative to English ones: the opening is a greeting without a how-are-you, the closing is a thank you without a have-a-nice-day, and the body is the transaction. Learners who insert the missing English moves are not misunderstood, they are read as doing something marked, and the attribution is usually to personality rather than to nationality.</p>
<p>The Pfand system is worth understanding as an instance of something broader, which is that German daily life contains a number of institutionally organised routines with no close Anglophone equivalent, and that competence in them is read as integration. The Pfandautomat, the Anmeldung, the Mülltrennung system and the Termin culture all require procedural knowledge that language instruction typically omits and that determines how much friction a resident experiences.</p>
<p>On strategy instruction, the research literature is somewhat divided on whether communication strategies can be taught or merely transferred from the first language, with the stronger evidence suggesting that explicit instruction improves deployment particularly for learners whose first language or educational culture discourages approximate production. For learners from contexts where accuracy is prized and error is penalised, giving explicit permission to approximate is a substantive intervention rather than a tip.</p>
<p>Finally, there is a measurable relationship between willingness to communicate and proficiency gain, mediated by the quantity of interaction a learner enters into. The practical consequence for course design is that teaching the four circumlocution frames and the four repair phrases in the first weeks has outsized returns, because they determine whether a learner stays in conversations long enough to get the input that everything else depends on. They are not survival phrases, they are the mechanism of acquisition.</p>`,
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
      Beginner: `<p>Three ways to say something hurts, and you need all three because German uses them differently.</p>
<p><strong>Ich habe Kopfschmerzen.</strong> I have a headache. Build these as compounds: Kopf plus Schmerzen, Bauchschmerzen, Halsschmerzen, Rückenschmerzen, Zahnschmerzen.</p>
<p><strong>Mein Hals tut weh.</strong> My throat hurts. Or more naturally, <strong>mir tut der Hals weh</strong>, with the person in the dative and the body part taking the definite article.</p>
<p><strong>Ich fühle mich nicht gut.</strong> I do not feel well. The general one for when you cannot be specific.</p>
<p>The first question will be <strong>Seit wann?</strong> Since when. Answer with seit: seit gestern, seit drei Tagen, seit einer Woche. Note that seit takes the dative, so it is seit drei Tagen with the plural -n.</p>
<p>And the practical part. You almost always need a <strong>Termin</strong>. If you need a sick note for work, ask for a <strong>Krankmeldung</strong> or an <strong>Arbeitsunfähigkeitsbescheinigung</strong>, and in many jobs you need it from the first day of absence.</p>`,
      Intermediate: `<p>The three pain constructions are not interchangeable and learners benefit from seeing why. The compound noun form, ich habe Kopfschmerzen, states a condition. The weh tun form, mir tut der Kopf weh, reports a sensation and is the more natural spoken option. Ich fühle mich nicht gut is a general statement of unwellness and is what you say when you cannot localise it.</p>
<p>Body parts take the definite article where English takes a possessive, which is a systematic feature rather than an oddity. Mir tut der Kopf weh rather than mein Kopf, ich wasche mir die Hände rather than meine Hände. The possessor appears as a dative pronoun, which is the possessive dative construction, and it is obligatory with body parts.</p>
<p>Seit plus dative is the structure for duration, and the tense is the point that catches English speakers: German uses the present where English uses a perfect. Ich habe seit drei Tagen Kopfschmerzen means I have had a headache for three days. Saying ich hatte will be understood as the pain having stopped.</p>
<p>The administrative layer is as important as the language. Most practices require an appointment, many require registration with your insurance card on the first visit, and the Krankmeldung is a formal document your employer is entitled to require. Knowing to ask for it before leaving saves a second appointment, and many employment contracts require it from the first day rather than the fourth.</p>`,
      Advanced: `<p>Medical communication in a second language carries documented risk, and the asymmetry is the problem: the clinician controls the register and the patient controls the information. Learners under-report because they lack vocabulary for qualities of symptoms, and the qualities are frequently what distinguishes diagnoses. Stechend for stabbing, dumpf for dull, brennend for burning, ziehend for pulling, krampfartig for cramping: thirty words covering quality, onset, duration and radiation materially improve the quality of the consultation.</p>
<p>Patients have a legal right to understand, and in practice the mechanism is a Dolmetscher. German law does not generally oblige a practice to provide one at its own cost for routine outpatient care, which means the practical advice is to bring somebody or to use a telephone interpreting service, and to say at the point of booking that you need one. A learner who discovers this in the consulting room has already lost the appointment.</p>
<p>The Krankmeldung deserves precision because it has employment-law consequences. The Arbeitsunfähigkeitsbescheinigung is now largely transmitted electronically to the insurer, with the employee responsible for notifying the employer of absence immediately. The common error is assuming the electronic transmission discharges the duty to inform the employer, which it does not, and the resulting gap has cost people their notice protection.</p>
<p>Culturally, German medical consultations tend to be shorter and more directive than Anglophone norms, and patients are expected to come with their information organised. A learner who prepares the four facts a doctor needs, what, where, since when and what makes it worse, will have a substantially better consultation than one who waits to be drawn out, because the drawing out may not happen.</p>`,
      Expert: `<p>The research on language-discordant medical consultation consistently finds elevated rates of diagnostic error, longer consultations, lower adherence and worse outcomes, and the effect is only partly mitigated by ad hoc interpreters such as family members, who introduce their own error modes including omission and editing of embarrassing content. Professional interpreting substantially closes the gap, which is the empirical basis for the advice to arrange one rather than to improvise.</p>
<p>What makes symptom description a distinctive linguistic task is that the relevant vocabulary is largely in the quality dimension, which is exactly where second language lexicons are thinnest. Learners acquire nouns for body parts early and adjectives for sensation qualities late, so they can say where it hurts long before they can say how, and the how carries much of the diagnostic information. Front-loading the quality adjectives inverts the usual sequencing and is defensible on utility grounds.</p>
<p>There is also a register trap specific to German medicine. The clinical register uses Latinate terminology heavily, and patients are routinely addressed in it, so a learner may encounter Hypertonie rather than Bluthochdruck or Dyspnoe rather than Atemnot. Teaching the common pairs is cheap and prevents a learner from failing to recognise a condition they actually know about.</p>
<p>Finally the structural point about the possessive dative is worth making explicitly because it generalises beyond the medical context. German treats inalienable possession as a relation between a dative participant and a definite noun phrase rather than as a possessive modifier, which is why mir tut der Kopf weh is natural and mein Kopf tut mir weh is redundant. The same structure governs reflexive body-part constructions and a range of benefactive readings, so learning it here pays elsewhere.</p>`,
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
      Beginner: `<p>The <strong>Anmeldung</strong> is registering where you live, and it is the thing everything else depends on. Without it you will struggle to open a bank account, start a job properly or get a tax number.</p>
<p>You need an appointment, a <strong>Termin</strong>, and in some cities they are booked weeks ahead. Book it online the day you arrive, not the week you need it.</p>
<p>Bring your documents, the <strong>Unterlagen</strong>. Usually: your passport, the completed registration form, and a <strong>Wohnungsgeberbestätigung</strong>, which is a confirmation from your landlord that you actually live there. If one of these is missing the appointment ends and you book another one.</p>
<p>Useful sentences:</p>
<ul>
<li><strong>Ich möchte mich anmelden.</strong> I would like to register.</li>
<li><strong>Ich habe einen Termin um zehn Uhr.</strong> I have an appointment at ten.</li>
<li><strong>Welche Unterlagen brauche ich?</strong> Which documents do I need?</li>
<li><strong>Können Sie das bitte wiederholen?</strong> Could you repeat that please?</li>
</ul>
<p>Speak German if you can. Officials are not obliged to speak English, and many will not.</p>`,
      Intermediate: `<p>The registration requirement is a legal obligation under the Bundesmeldegesetz, typically within two weeks of moving in, and it generates the Meldebescheinigung that banks, employers and the tax office all ask for. Treating it as the first task rather than an administrative afterthought avoids a cascade of blocked downstream processes.</p>
<p>The document list is the part that determines whether the appointment succeeds. Passport, the Anmeldeformular, and the Wohnungsgeberbestätigung signed by whoever controls the property. The last of these is the one newcomers miss, because it has no equivalent in many countries and because a tenancy agreement is not a substitute for it.</p>
<p>Appointment scarcity is real in the larger cities and the practical strategies are worth knowing: book online immediately, check early in the morning when cancellations are released, and be willing to travel to a less central office, since any Bürgeramt in the city will generally do.</p>
<p>Language-wise the register is formal Sie throughout, and the useful set is small: a statement of what you want, a statement that you have an appointment, questions about documents, and repair phrases for when you do not understand. Most of the interaction is the official asking closed questions, so comprehension matters more than production.</p>`,
      Advanced: `<p>The institutional map matters because newcomers conflate offices that handle different things. The Bürgeramt handles registration and civil matters. The Ausländerbehörde handles residence permits. The Finanzamt handles tax and issues the Steueridentifikationsnummer, which arrives by post after registration rather than being issued at it. The Agentur für Arbeit handles employment matters. Turning up at the wrong one costs an appointment slot that may be weeks away.</p>
<p>The dependency chain is the thing to internalise: Anmeldung produces the Meldebescheinigung, which unlocks the bank account, which the employer needs for payroll, while the tax ID arrives separately by post and the health insurance registration requires both. Each link has its own lead time, and the total is measured in weeks, which is why starting at the Anmeldung on day one rather than day twenty compresses the whole sequence.</p>
<p>On rights, you may bring somebody to interpret and there is no requirement that you manage alone. Officials vary enormously in their willingness to use English and are within their rights to decline. Bringing a German-speaking friend to a consequential appointment is normal and sensible rather than an admission of inadequacy.</p>
<p>The cultural expectation worth naming is that German administrative encounters are rule-bound rather than discretionary. An official who says a document is missing is usually describing a constraint rather than exercising judgement, so arguing is unproductive while asking exactly what is needed and when you can return is productive. Learners from administrative cultures with more discretion read this as obstruction and respond in ways that do not help them.</p>`,
      Expert: `<p>The Meldepflicht is a distinctive feature of German administration with no equivalent in several comparable countries, and understanding that the state maintains a population register explains a great deal of downstream behaviour: why your address is known to the tax authority, why the broadcasting fee finds you, and why deregistration on leaving is also a legal obligation that affects your final tax position. Newcomers who treat registration as a formality often discover its consequences at departure.</p>
<p>Digitalisation has been slow and uneven, and the Onlinezugangsgesetz set targets that have been substantially missed, so the practical position varies sharply by municipality. Some cities offer online Anmeldung and some still require physical attendance with original documents. This variability is itself the operational fact: advice from somebody who registered in a different city two years ago may be wrong in both directions.</p>
<p>On the residence side, the distinction between a Visum, an Aufenthaltstitel and a Niederlassungserlaubnis is consequential and routinely confused. The relevant point for a learner is that the Ausländerbehörde is a different authority with different appointment systems and much longer lead times, and that its decisions can be contingent on documents the Bürgeramt issued, which makes the sequencing a hard dependency rather than a preference.</p>
<p>Finally there is a well-documented equity dimension. Research on administrative burden distinguishes learning costs, compliance costs and psychological costs, and all three fall disproportionately on people operating in a second language. A learner who understands that the difficulty is a property of the system rather than of their German is better placed to deal with it, chiefly by front-loading the learning cost: find out exactly what is required before the appointment rather than discovering it in the room.</p>`,
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
      Beginner: `<p>A formal German email has a fixed shape. Learn the shape and the content is the easy part.</p>
<p><strong>Betreff:</strong> a specific subject line. Not "Question" but "Terminanfrage Anmeldung, Familie Sharma". German offices sort by subject and a vague one gets a slower answer.</p>
<p><strong>Anrede:</strong> Sehr geehrte Damen und Herren if you do not know the name. Sehr geehrte Frau Weber or Sehr geehrter Herr Weber if you do. Note the comma after it, and that the next line starts with a small letter.</p>
<p><strong>Body:</strong> say why you are writing in the first sentence. Ich schreibe Ihnen, weil... Then the detail. Then what you want them to do.</p>
<p><strong>Grußformel:</strong> Mit freundlichen Grüßen, then your name on the next line.</p>
<p>Two things that make it sound right. Use <strong>Sie</strong> and capitalise it. And use the polite forms: <strong>Könnten Sie</strong> rather than Können Sie, <strong>Ich hätte eine Frage</strong> rather than Ich habe eine Frage. They are softer and they are what a German reader expects.</p>`,
      Intermediate: `<p>Written formal German is more codified than the spoken language, which makes it easier rather than harder for a learner: the structure is fixed and a correct letter can be assembled from a template without sounding assembled.</p>
<p>The subject line does real work. German administrative correspondence is routed and filed by Betreff, so naming the matter, the reference number if you have one, and your name produces a faster response than a general enquiry. Terminanfrage, Kündigung, Widerspruch and Anfrage are the conventional openers.</p>
<p>The salutation convention is strict. Sehr geehrte Damen und Herren with no name, Sehr geehrte Frau X or Sehr geehrter Herr X with one, and note that the sentence following the comma begins in lower case because the salutation is grammatically part of it. Hallo is acceptable in many workplaces and not with an authority.</p>
<p>The polite subjunctive is what separates a competent letter from a blunt one. Könnten Sie mir bitte mitteilen rather than sagen Sie mir, ich hätte eine Frage rather than ich habe eine Frage, ich würde mich freuen rather than ich freue mich. These are conventional softeners and their absence reads as peremptory rather than as direct.</p>`,
      Advanced: `<p>The DIN 5008 standard governs the layout of German business correspondence down to the placement of the subject and the spacing around it, and while nobody will reject an email for deviating from it, documents that follow it read as professionally produced. The conventions worth adopting are the bold or marked Betreff without the word Betreff itself, a blank line after the salutation, and the closing without a comma before the name.</p>
<p>Register calibration is the recurring difficulty. German formal writing tolerates and expects a level of impersonality that Anglophone business writing has largely abandoned, so hedging, warmth markers and apologetic framing read as unprofessional rather than as polite. Conversely, directness that would be acceptable in an English email can read as rude without the subjunctive softeners, so the two adjustments pull in opposite directions and both are needed.</p>
<p>Naming attachments in the body is a convention with a practical rationale, since administrative processing frequently separates the message from its attachments. Anbei sende ich Ihnen followed by an explicit list, or Im Anhang finden Sie, establishes a record of what was sent, which matters when a deadline is involved and a document is later said not to have arrived.</p>
<p>For consequential correspondence, particularly anything with a legal deadline such as a Kündigung or a Widerspruch, email is often not the right channel at all. German contract and administrative law frequently requires Schriftform, which means a physical signature, and the defensive practice is Einschreiben mit Rückschein, registered post with acknowledgement. A learner who sends a notice by email because it is faster may find it was never validly served.</p>`,
      Expert: `<p>The persistence of highly codified German business correspondence is sociolinguistically interesting because it has resisted the informalisation that has transformed Anglophone professional writing. The explanation most often advanced is institutional: the conventions are taught explicitly in the Ausbildung system, assessed, and reproduced by people who were examined on them, which creates a stabilising feedback loop that informal transmission does not.</p>
<p>The Schriftform requirement deserves precision because it has caught competent people. Section 126 of the Bürgerliches Gesetzbuch requires a handwritten signature on the document itself for written form, and section 126a permits a qualified electronic signature as a substitute, which an ordinary email is not. Where a contract or a statute prescribes Schriftform, an emailed notice is formally ineffective regardless of receipt, and the Textform of section 126b is a weaker requirement that email does satisfy. Knowing which applies to a given notice is the whole question.</p>
<p>On the gendered salutation, Sehr geehrte Damen und Herren is a binary formulation that is increasingly supplemented or replaced, with Guten Tag and Sehr geehrte Damen und Herren alongside Liebe Lesende and similar constructions appearing in institutional usage. There is no settled convention, official style guides diverge, and a learner should know both that the traditional form remains safe with an authority and that its alternatives are not errors.</p>
<p>Finally, the pragmatics literature on German and English requests is consistent and useful here. German speakers tend toward more direct request strategies with more conventional indirectness carried by modal particles and subjunctive morphology, while English speakers favour conventionally indirect formulations with more lexical hedging. The learner consequence is specific: translating an English request literally produces something over-hedged and vague in German, while translating a German one literally produces something that reads as brusque in English. Neither speaker is being rude, and both think the other is.</p>`,
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
