/**
 * Course 206: Finance & Accounting Essentials.
 *
 * Authored around the worksheet, because accounting is a producing discipline.
 * Every module ends with a working paper the learner fills in and that is marked
 * cell by cell, with method marks where a figure is correct given the learner's
 * own earlier number. That is how an accounting paper is actually marked, and it
 * is the thing a multiple-choice bank cannot do at any price.
 *
 * Figures are Indian: rupees, GST, an April to March year, and the account names
 * a Tally user would recognise. A course that teaches debits in dollars and then
 * sends a learner to an Indian employer has taught them the easy half.
 */

import type { CourseCurriculum } from "./types";

/** The chart of accounts the worksheets draw their account names from. */
const CHART = [
  "Cash",
  "Bank",
  "Sales",
  "Purchases",
  "Capital",
  "Drawings",
  "Rent Expense",
  "Salaries",
  "Trade Receivables",
  "Trade Payables",
  "Furniture",
  "Machinery",
  "Bank Loan",
  "Interest Expense",
  "Closing Stock",
];

const curriculum: CourseCurriculum = {
  /* ===================================================================== */
  5070: {
    topicId: 5070,
    title: "What a transaction does to the books",
    summary:
      "Every business event changes at least two things at once. Learn to see the pair before you learn the rules for writing it down.",
    concepts: ["Transaction", "Accounting equation", "Asset", "Liability", "Equity"],
    glossary: {
      Transaction: "An event that changes what a business owns or owes, and that can be measured in money.",
      Asset: "A resource the business controls that is expected to bring it money later.",
      Liability: "An amount the business owes to somebody outside it.",
      Equity: "What the owners have in the business: assets less liabilities.",
      "Accounting equation": "Assets equal liabilities plus equity, at every moment, without exception.",
      "Source document": "The invoice, receipt or bank advice that proves a transaction happened.",
    },
    body: {
      Beginner: `<p>Imagine you start a tea stall. You put in 20,000 rupees of your own money. Two things just happened at the same time: the stall now has 20,000 rupees of cash, and the stall now owes you 20,000 rupees. One event, two changes.</p>
<div class="key-idea"><span class="callout-label">The whole idea</span><p>A transaction never changes just one thing. If you can find only one change, you have not finished looking.</p></div>
<h3>Seeing the pair</h3>
<p>Buy a kettle for 2,000 rupees cash and your cash goes down by 2,000 while your equipment goes up by 2,000. Buy the same kettle on credit and your equipment still goes up by 2,000, but now the amount you owe the shop goes up instead.</p>
<table>
<tr><th>What happened</th><th>One change</th><th>The other change</th></tr>
<tr><td>You put in 20,000 cash</td><td>Cash up 20,000</td><td>You are owed 20,000</td></tr>
<tr><td>Kettle for 2,000 cash</td><td>Equipment up 2,000</td><td>Cash down 2,000</td></tr>
<tr><td>Kettle for 2,000 on credit</td><td>Equipment up 2,000</td><td>Owed to shop up 2,000</td></tr>
</table>
<h3>Why people find this hard</h3>
<p>They try to memorise rules before they can see the pairs. So practise the seeing first. For any event, ask two questions. What came in or went out? And where did it come from or go to? The answer to both questions together is the transaction.</p>
<div class="field"><span class="callout-label">Worth knowing early</span><p>Accounting only records what you can measure in money and prove with a document. Hiring a brilliant cook is good news and it is not a transaction. Paying that cook 8,000 rupees is.</p></div>`,
      Intermediate: `<p>A transaction is an event that changes the composition of a business and can be measured in money. The defining property is that it always changes at least two accounts, which is why the system that records it is called double entry.</p>
<div class="key-idea"><span class="callout-label">The identity everything rests on</span><p>Assets equal liabilities plus equity. It holds at every instant, not just at year end, so any event that increased only one side could not be recorded at all.</p></div>
<h3>Why a one-sided entry cannot exist</h3>
<p>What looks like a one-sided change is always a pair where you have not yet found the second half. That is a useful diagnostic rather than a slogan: when an entry refuses to balance, the question is not which rule to apply but which half of the event you have not identified.</p>
<h3>A transaction worked through</h3>
<div class="worked"><span class="callout-label">Machinery, 1,50,000 rupees, half by cheque</span>
<table>
<tr><th>Effect</th><th class="num">Assets</th><th class="num">Liabilities</th></tr>
<tr><td>Machinery acquired</td><td class="num">+1,50,000</td><td class="num"></td></tr>
<tr><td>Bank paid</td><td class="num">(75,000)</td><td class="num"></td></tr>
<tr><td>Amount still owed</td><td class="num"></td><td class="num">+75,000</td></tr>
<tr><td><strong>Net movement</strong></td><td class="num"><strong>+75,000</strong></td><td class="num"><strong>+75,000</strong></td></tr>
</table>
<p>Both sides moved by 75,000, so the identity survives.</p></div>
<h3>Two distinctions to fix now</h3>
<p>A transaction is not the same as a cash movement: a credit sale is a transaction on the day the goods leave, not the day the customer pays. And a transaction needs a source document, because an entry nobody can trace to an invoice or bank advice is an assertion rather than a record.</p>
<div class="warning"><span class="callout-label">What an auditor pulls on first</span><p>The entries with no document behind them. Not the large ones, the unsupported ones.</p></div>`,
      Advanced: `<p>Treat the accounting equation as an invariant that the recording system is built to preserve, and double entry becomes an engineering choice rather than a convention. Every posting is a transformation that must leave assets minus liabilities minus equity equal to zero.</p>
<div class="key-idea"><span class="callout-label">Why the technique survived five centuries</span><p>The invariant is checked arithmetically at every level of aggregation, so a violation surfaces as an imbalance you can actually find.</p></div>
<h3>Recognition: deciding when an event has occurred</h3>
<p>Under accrual accounting the trigger is the transfer of control or the incurring of an obligation, not settlement. A customer order is not a transaction, because neither party has yet done anything irreversible. Dispatch under an enforceable contract is, because a receivable now exists and revenue has been earned.</p>
<h3>Measurement is a separate decision</h3>
<p>An asset acquired for 1,50,000 rupees enters at that cost even if its market value is 2,00,000, because historical cost is verifiable from a document and a valuation is an opinion. The cost of this choice is a balance sheet that systematically understates appreciating assets, which is why disclosure exists alongside measurement.</p>
<table>
<tr><th>Question</th><th>What answers it</th><th>What it costs you</th></tr>
<tr><td>Has an event occurred?</td><td>Transfer of control, or an obligation incurred</td><td>Judgement; two preparers can differ in good faith</td></tr>
<tr><td>At what amount?</td><td>Historical cost, from the document</td><td>Appreciating assets are understated</td></tr>
</table>
<div class="field"><span class="callout-label">What the ledger structurally cannot hold</span><p>An operating lease commitment, a key-person dependency and a pending lawsuit all change what a business is worth without producing a measurable obligation at a point in time. They live in the notes, which is why the notes are read rather than skipped.</p></div>`,
      Expert: `<p>The equation is better read as a statement about the closure of a double-entry system under its own operations. Define the ledger as a set of accounts with signed balances and require that the signed sum over all accounts be identically zero. Posting is then any operation preserving that sum.</p>
<div class="key-idea"><span class="callout-label">The consequence worth drawing</span><p>Asset, liability and equity are a partition imposed on the account set for presentation, not a feature of the algebra. That is why the equation rearranges freely, and why a trial balance that sums to zero tells you about arithmetic rather than about truth.</p></div>
<h3>Recognition as contract analysis</h3>
<p>Ind AS 115 locates revenue at the satisfaction of a performance obligation, which replaced a transfer-of-risks test precisely because risk is continuous and control is comparatively discrete. The practical consequence for a preparer is that the recognition date is a matter of contract analysis, and two competent accountants can disagree on it in good faith.</p>
<h3>A mixed attribute model, and why it is incoherent on purpose</h3>
<table>
<tr><th>Class</th><th>Attribute</th><th>The compromise being struck</th></tr>
<tr><td>Most non-financial assets</td><td>Historical cost</td><td>Verifiability over relevance</td></tr>
<tr><td>Several financial instruments</td><td>Fair value</td><td>Relevance over verifiability</td></tr>
<tr><td>Impaired assets</td><td>Recoverable amount</td><td>Prudence overriding both</td></tr>
</table>
<p>The model is indefensible as a single theory of value and defensible as a set of local compromises. Knowing which compromise applies to a given line is most of what distinguishes a preparer from a data entry operator.</p>
<div class="warning"><span class="callout-label">The permanent gap</span><p>The system cannot represent anything whose obligation is not measurable at a point in time. That is why off-balance-sheet structuring has been a recurring source of accounting scandal rather than an occasional one.</p></div>`,
    },
    questions: [
      {
        n: 1,
        question: "A business buys furniture for 40,000 rupees on credit. What happens?",
        options: [
          "Assets rise by 40,000 and liabilities rise by 40,000",
          "Assets rise by 40,000 and equity rises by 40,000",
          "Assets fall by 40,000 and liabilities rise by 40,000",
          "Only assets change, because nothing has been paid yet",
        ],
        answer: 0,
        explanation:
          "The furniture is an asset the business now controls, so assets rise. Nothing was paid, so the supplier is owed, and liabilities rise by the same amount. The tempting last option confuses a transaction with a payment: the event happened when the furniture arrived under an enforceable obligation, not when cash moves.",
        difficulty: "Easy",
        skill: "Transaction",
      },
      {
        n: 2,
        question: "Which of these is NOT a transaction for accounting purposes?",
        options: [
          "Signing a contract to hire a manager starting next month",
          "Paying 12,000 rupees of rent by cheque",
          "Selling goods worth 5,000 rupees on 30 days credit",
          "Writing off a customer balance of 3,000 rupees as unrecoverable",
        ],
        answer: 0,
        explanation:
          "Signing a future employment contract changes nothing measurable yet: no obligation has been incurred for work not yet done. The credit sale is a transaction on dispatch even though no cash moved, and a write-off is a transaction because it reduces a recorded asset.",
        difficulty: "Medium",
        skill: "Transaction",
      },
      {
        n: 3,
        question: "The owner withdraws 10,000 rupees from the business for personal use. The accounting equation stays balanced because:",
        options: [
          "Assets fall by 10,000 and equity falls by 10,000",
          "Assets fall by 10,000 and liabilities fall by 10,000",
          "Equity falls by 10,000 and liabilities rise by 10,000",
          "It does not stay balanced; drawings are an exception",
        ],
        answer: 0,
        explanation:
          "Cash leaves the business so assets fall. The withdrawal reduces what the owner has in the business, so equity falls by the same amount. There is no exception to the identity: drawings reduce equity exactly as profit increases it.",
        difficulty: "Medium",
        skill: "Accounting equation",
      },
      {
        n: 4,
        question: "A business has assets of 8,00,000 rupees and equity of 5,50,000 rupees. Its liabilities are:",
        options: ["2,50,000 rupees", "13,50,000 rupees", "5,50,000 rupees", "Cannot be determined"],
        answer: 0,
        explanation:
          "Rearranging the identity, liabilities equal assets less equity, so 8,00,000 less 5,50,000 gives 2,50,000. The second option adds the two figures, which is the most common slip and produces a number larger than everything the business owns.",
        difficulty: "Easy",
        skill: "Liability",
      },
      {
        n: 5,
        question: "Why does an asset bought for 1,50,000 rupees stay in the books at that figure even if it is worth 2,00,000?",
        options: [
          "Because cost is verifiable from a document and a valuation is an opinion",
          "Because assets are never revalued under any accounting standard",
          "Because the gain is taxable only when the asset is sold",
          "Because the accounting equation would otherwise not balance",
        ],
        answer: 0,
        explanation:
          "Historical cost is preferred where verifiability matters more than current relevance, and a purchase invoice is evidence in a way an estimate is not. Some asset classes are revalued under specific standards, so the second option overstates the rule, and the equation would balance perfectly well either way.",
        difficulty: "Hard",
        skill: "Asset",
      },
      {
        n: 6,
        question: "Equity of a sole proprietorship increases when:",
        options: [
          "The business earns a profit or the owner introduces capital",
          "The business borrows money from a bank",
          "A customer pays an outstanding invoice",
          "The business buys stock on credit",
        ],
        answer: 0,
        explanation:
          "Profit and fresh capital are the two routes by which the owner's stake grows. Borrowing raises an asset and a liability together, and a customer paying simply swaps one asset for another, leaving equity untouched.",
        difficulty: "Easy",
        skill: "Equity",
      },
    ],
    decks: [
      {
        n: 1,
        title: "The vocabulary of the books",
        blurb:
          "Twenty terms that every later topic assumes. Typed recall, because you will have to produce these words in a meeting rather than recognise them in a list.",
        mode: "type",
        cards: [
          {
            id: 1,
            front: "A resource the business controls, expected to bring money later",
            back: "Asset",
            accepts: ["an asset", "assets"],
            tags: ["Fundamentals"],
          },
          {
            id: 2,
            front: "An amount owed by the business to an outside party",
            back: "Liability",
            accepts: ["a liability", "liabilities"],
            tags: ["Fundamentals"],
          },
          {
            id: 3,
            front: "Assets less liabilities: the owner's stake",
            back: "Equity",
            accepts: ["capital", "owners equity", "net worth"],
            tags: ["Fundamentals"],
          },
          {
            id: 4,
            front: "Amounts customers owe the business for credit sales",
            back: "Trade receivables",
            accepts: ["debtors", "sundry debtors", "accounts receivable", "receivables"],
            tags: ["Working capital"],
          },
          {
            id: 5,
            front: "Amounts the business owes suppliers for credit purchases",
            back: "Trade payables",
            accepts: ["creditors", "sundry creditors", "accounts payable", "payables"],
            tags: ["Working capital"],
          },
          {
            id: 6,
            front: "The invoice or bank advice that proves a transaction happened",
            back: "Source document",
            accepts: ["voucher", "supporting document"],
            tags: ["Controls"],
          },
          {
            id: 7,
            front: "Recording revenue when earned rather than when cash arrives",
            back: "Accrual basis",
            accepts: ["accrual accounting", "accruals basis", "mercantile system"],
            tags: ["Principles"],
          },
          {
            id: 8,
            front: "Money the owner takes out of the business for personal use",
            back: "Drawings",
            accepts: ["drawing"],
            tags: ["Fundamentals"],
            hint: "Not called a salary in a proprietorship",
          },
          {
            id: 9,
            front: "The book in which a transaction is first recorded",
            back: "Journal",
            accepts: ["day book", "the journal"],
            tags: ["Books"],
          },
          {
            id: 10,
            front: "The book that collects all entries affecting one account",
            back: "Ledger",
            accepts: ["the ledger", "general ledger"],
            tags: ["Books"],
          },
          {
            id: 11,
            front: "A list of every ledger balance, used to check the arithmetic",
            back: "Trial balance",
            accepts: ["trialbalance"],
            tags: ["Books"],
          },
          {
            id: 12,
            front: "Spreading the cost of a fixed asset over the years it is used",
            back: "Depreciation",
            accepts: ["depreciate"],
            tags: ["Adjustments"],
          },
          {
            id: 13,
            front: "An expense incurred but not yet paid at the year end",
            back: "Accrued expense",
            accepts: ["accrual", "outstanding expense", "accrued liability"],
            tags: ["Adjustments"],
          },
          {
            id: 14,
            front: "An amount paid in advance for a benefit not yet received",
            back: "Prepaid expense",
            accepts: ["prepayment", "prepaid"],
            tags: ["Adjustments"],
          },
          {
            id: 15,
            front: "A customer balance judged unrecoverable and removed",
            back: "Bad debt",
            accepts: ["bad debts", "write off", "write-off"],
            tags: ["Adjustments"],
          },
          {
            id: 16,
            front: "Revenue less the cost of the goods that produced it",
            back: "Gross profit",
            accepts: ["gross margin"],
            tags: ["Final accounts"],
          },
          {
            id: 17,
            front: "What is left after every expense, including non-cash ones",
            back: "Net profit",
            accepts: ["net income", "profit for the year", "bottom line"],
            tags: ["Final accounts"],
          },
          {
            id: 18,
            front: "The statement of what a business owns and owes on one date",
            back: "Balance sheet",
            accepts: ["statement of financial position"],
            tags: ["Final accounts"],
          },
          {
            id: 19,
            front: "The principle that expenses belong in the period of the revenue they earned",
            back: "Matching principle",
            accepts: ["matching concept", "matching"],
            tags: ["Principles"],
          },
          {
            id: 20,
            front: "Assuming the business will keep operating for the foreseeable future",
            back: "Going concern",
            accepts: ["going concern assumption"],
            tags: ["Principles"],
          },
        ],
        skills: ["Transaction", "Asset", "Liability", "Equity"],
      },
    ],
  },

  /* ===================================================================== */
  5071: {
    topicId: 5071,
    title: "Debit and credit without the mnemonics",
    summary:
      "Debit and credit are left and right, nothing more. Learn the one rule that replaces every acronym you have been given.",
    concepts: ["Debit", "Credit", "Account", "Nominal account", "Real account"],
    glossary: {
      Debit: "The left side of an account. It increases assets and expenses, and decreases liabilities, equity and income.",
      Credit: "The right side of an account. It increases liabilities, equity and income, and decreases assets and expenses.",
      Account: "A running record of everything that happened to one item, such as cash or rent.",
      "Nominal account": "An account for an income or an expense, closed off at the year end.",
      "Real account": "An account for an asset, carried forward from year to year.",
      "Contra entry": "A transaction between two of the business's own cash and bank accounts.",
    },
    body: {
      Beginner: `<p>Debit means left. Credit means right. That is genuinely all the words mean. They are not good and bad, and they are not plus and minus.</p>
<div class="key-idea"><span class="callout-label">The one rule worth learning</span><p>Assets and expenses grow on the left. Liabilities, your own capital, and income grow on the right. Everything else follows from that sentence.</p></div>
<h3>Every account is a page with a line down it</h3>
<p>Cash has a page. Rent has a page. Your supplier has a page. Whatever happens, something goes on the left of one page and the same amount goes on the right of another page.</p>
<table>
<tr><th>Grows on the LEFT</th><th>Grows on the RIGHT</th></tr>
<tr><td>Assets: cash, bank, stock, furniture</td><td>Liabilities: suppliers, loans</td></tr>
<tr><td>Expenses: rent, salaries, electricity</td><td>Capital: what you put in</td></tr>
<tr><td></td><td>Income: sales, commission</td></tr>
</table>
<h3>Try it on two events</h3>
<p>When cash comes in, cash grows, and cash is an asset, so it goes on the left. When you pay rent, rent is an expense, so rent goes on the left, and cash is going down, so cash goes on the right this time.</p>
<div class="warning"><span class="callout-label">Skip the acronyms</span><p>You will be offered mnemonics that promise to do this for you. They work until the first unusual transaction and then they fail silently, which is worse than not having a rule. The two-sided rule above never fails.</p></div>`,
      Intermediate: `<p>Debit and credit are positional labels: debit is the left column of an account and credit is the right. The confusion they cause is almost entirely a vocabulary problem, because a bank uses the words from its own books rather than yours.</p>
<div class="key-idea"><span class="callout-label">Derived, not memorised</span><p>Assets sit on the left of the accounting identity, so they increase with a left-side entry. Liabilities and equity sit on the right, so they increase with a right-side entry. Income increases equity, which puts it on the right; expenses reduce equity, which puts them on the left.</p></div>
<h3>Five categories, one derivation</h3>
<table>
<tr><th>Category</th><th>Increases with</th><th>Why</th></tr>
<tr><td>Asset</td><td>Debit</td><td>Left of the identity</td></tr>
<tr><td>Expense</td><td>Debit</td><td>Reduces equity, which is on the right</td></tr>
<tr><td>Liability</td><td>Credit</td><td>Right of the identity</td></tr>
<tr><td>Equity</td><td>Credit</td><td>Right of the identity</td></tr>
<tr><td>Income</td><td>Credit</td><td>Increases equity</td></tr>
</table>
<h3>Test it on something awkward</h3>
<div class="worked"><span class="callout-label">Repaying 50,000 of a bank loan by cheque</span><p>The loan is a liability being reduced. Liabilities increase on the right, so a reduction is a left-side entry: debit Bank Loan 50,000. The bank balance is an asset being reduced, so it takes the right side: credit Bank 50,000. No acronym was consulted.</p></div>
<h3>Where the errors actually come from</h3>
<p>Name the two accounts before you decide the sides. Most mistakes at this stage are not side errors but account errors, where a learner debits Purchases for something that was in substance an asset acquisition, and the sides were never the problem.</p>
<div class="field"><span class="callout-label">The bank statement lies to you</span><p>Your statement says "credit 25,000" because the bank is recording that it owes you more. In your books the asset grew, so Bank is debited. Copying the word straight off the statement is the single most common beginner error.</p></div>`,
      Advanced: `<p>The debit and credit convention is a sign system chosen so that the invariant is checkable by addition rather than by subtraction. Assign debit as positive and credit as negative, and the requirement becomes that every transaction sums to zero across accounts.</p>
<div class="key-idea"><span class="callout-label">Why this makes a trial balance possible at all</span><p>Journal validation becomes a single arithmetic test that holds at any level of aggregation, from one entry to a year of them.</p></div>
<h3>Real, nominal and personal</h3>
<p>The classical Indian presentation carries a distinction the five-element model obscures: real accounts persist across periods while nominal accounts are closed to the profit and loss account and reopened at zero. That difference is what makes year-end closing a mechanical operation rather than a judgement, and it determines which balances a trial balance carries forward.</p>
<h3>The failure that arithmetic cannot catch</h3>
<div class="warning"><span class="callout-label">Misclassification, not inversion</span><p>Debiting an expense for what is in substance a capital acquisition understates profit this year and overstates it in every later year. Because both sides of the entry are internally consistent the trial balance still balances. No arithmetic check will find it; only a reviewer asking whether the benefit extends beyond this period will.</p></div>
<h3>Contra entries</h3>
<p>A cash withdrawal from the business bank account moves value between two of the business's own asset accounts, so it debits Cash and credits Bank and touches neither income nor obligation. Treating it as an expense is a recurring error in small-business books and inflates both expenses and apparent cash discipline problems.</p>`,
      Expert: `<p>Formally, a journal entry is a vector in the free module over the set of accounts, constrained to the hyperplane where coordinates sum to zero. Debit and credit are the sign convention on that module, and the ledger is the running total of all posted vectors.</p>
<div class="key-idea"><span class="callout-label">The consequence</span><p>Nothing in the formalism privileges either direction, which is why the words are arbitrary and why every attempt to teach them as semantic rather than positional eventually confuses somebody.</p></div>
<h3>Chart design is a reporting decision taken at the point of recording</h3>
<p>The chart of accounts is a partition whose granularity determines what questions the books can answer later, and that choice is irreversible without restating history. A business that posts all vehicle running costs to a single Motor Expenses account cannot later separate fuel from maintenance for the periods already closed; one that splits them per vehicle can answer a utilisation question its competitor cannot.</p>
<h3>Capital against revenue</h3>
<p>The highest-consequence judgement at this level, and deliberately not reducible to a rule. The tests in practice are whether the expenditure extends the asset's capacity or useful life, whether it merely restores previously assumed performance, and whether it is incurred to bring an asset into working condition for its intended use.</p>
<div class="field"><span class="callout-label">Where learners diverge from the standard</span><p>The last test. It pulls installation, freight and non-refundable duties into cost, which is counterintuitive to anyone treating "cost" as the invoice total.</p></div>
<div class="warning"><span class="callout-label">Why this is a control problem</span><p>Both halves of a misclassified entry are self-consistent, so detection is never arithmetic. That is the structural reason capital expenditure authorisation, asset registers and reviews of repairs accounts above a threshold exist as separate controls, and why an unqualified audit opinion is not evidence that classification was correct.</p></div>`,
    },
    questions: [
      {
        n: 1,
        question: "Your bank statement shows 'credit 25,000'. In the business's own books this is:",
        options: [
          "A debit to Bank, because the business's asset has increased",
          "A credit to Bank, because the statement says credit",
          "A credit to Cash, because money has come in",
          "A debit to Sales, because the receipt is income",
        ],
        answer: 0,
        explanation:
          "The statement is written from the bank's point of view: the bank now owes you more, which is a credit in the bank's books. In your books the asset has grown, so Bank is debited. Copying the word straight off the statement is the single most common beginner error.",
        difficulty: "Medium",
        skill: "Debit",
      },
      {
        n: 2,
        question: "Repaying 50,000 rupees of a bank loan by cheque is recorded as:",
        options: [
          "Debit Bank Loan 50,000, credit Bank 50,000",
          "Debit Bank 50,000, credit Bank Loan 50,000",
          "Debit Interest Expense 50,000, credit Bank 50,000",
          "Debit Bank Loan 50,000, credit Capital 50,000",
        ],
        answer: 0,
        explanation:
          "A liability is reduced, and since liabilities grow on the credit side a reduction is a debit. The bank balance falls, and an asset falling is a credit. Option three confuses repaying principal with paying interest, which are separate entries.",
        difficulty: "Medium",
        skill: "Credit",
      },
      {
        n: 3,
        question: "Which pair of accounts both increase with a debit?",
        options: [
          "Machinery and Salaries",
          "Sales and Trade Payables",
          "Capital and Rent Expense",
          "Bank Loan and Trade Receivables",
        ],
        answer: 0,
        explanation:
          "Machinery is an asset and Salaries is an expense, and both of those categories increase on the debit side. Every other pair mixes a debit-increasing account with a credit-increasing one, which is what makes them tempting.",
        difficulty: "Easy",
        skill: "Account",
      },
      {
        n: 4,
        question: "A business pays 90,000 rupees to install a new machine it has just bought. Posting this to Repairs Expense would:",
        options: [
          "Understate this year's profit and overstate profit in later years",
          "Overstate this year's profit and understate it later",
          "Have no effect on profit, only on the balance sheet",
          "Cause the trial balance to stop balancing",
        ],
        answer: 0,
        explanation:
          "Installation needed to bring an asset into working condition is part of its cost, so it should be capitalised and depreciated. Expensing it all now understates current profit, and later years avoid the depreciation they should have borne. The trial balance still balances, which is exactly why this error survives.",
        difficulty: "Hard",
        skill: "Nominal account",
      },
      {
        n: 5,
        question: "Which of these is a real account that is carried forward to next year?",
        options: ["Furniture", "Rent Expense", "Commission Received", "Discount Allowed"],
        answer: 0,
        explanation:
          "Furniture is an asset, so its balance persists across periods. The other three are nominal accounts for income or expense, and they are closed to the profit and loss account at the year end and reopened at zero.",
        difficulty: "Easy",
        skill: "Real account",
      },
      {
        n: 6,
        question: "Withdrawing 10,000 rupees cash from the business bank account for the till is:",
        options: [
          "A contra entry: debit Cash, credit Bank",
          "An expense: debit Drawings, credit Bank",
          "Not recorded, because total assets have not changed",
          "Income: debit Cash, credit Bank Interest",
        ],
        answer: 0,
        explanation:
          "Value moves between two of the business's own asset accounts, which is what a contra entry is. Total assets are unchanged but the composition is, so it must be recorded. Calling it Drawings would wrongly suggest the owner took the money personally.",
        difficulty: "Medium",
        skill: "Account",
      },
    ],
    worksheets: [
      {
        n: 1,
        title: "Journalise seven transactions",
        difficulty: "Easy",
        brief: `<p>Hemant Traders started on 1 April. Record each of the seven transactions below as a journal entry. Pick the account from the dropdown and put the amount in the debit or the credit column, not both.</p>
<ul>
<li><strong>1 April</strong> Hemant pays 2,00,000 rupees of his own money into the business bank account.</li>
<li><strong>3 April</strong> Buys goods for resale worth 60,000 rupees, paying by cheque.</li>
<li><strong>6 April</strong> Sells goods for 45,000 rupees, the customer to pay in 30 days.</li>
<li><strong>9 April</strong> Pays the month's shop rent of 18,000 rupees by cheque.</li>
<li><strong>14 April</strong> Buys a counter and shelving for 35,000 rupees on credit from Modern Furnishers.</li>
<li><strong>21 April</strong> The 6 April customer pays in full.</li>
<li><strong>28 April</strong> Hemant takes 12,000 rupees out of the bank for his own use.</li>
</ul>
<p>Each transaction needs exactly two lines, and the two columns must end up equal. The sheet tells you the moment they are not.</p>`,
        stubLabel: "Date and entry",
        columns: [
          { key: "account", label: "Account", type: "select", options: CHART, flex: 2 },
          { key: "dr", label: "Debit (₹)", type: "number", align: "right" },
          { key: "cr", label: "Credit (₹)", type: "number", align: "right" },
        ],
        rows: [
          { key: "r1a", label: "1 Apr · capital introduced" },
          { key: "r1b", label: "1 Apr · the other side" },
          { key: "r2a", label: "3 Apr · goods bought" },
          { key: "r2b", label: "3 Apr · the other side" },
          { key: "r3a", label: "6 Apr · credit sale" },
          { key: "r3b", label: "6 Apr · the other side" },
          { key: "r4a", label: "9 Apr · rent paid" },
          { key: "r4b", label: "9 Apr · the other side" },
          { key: "r5a", label: "14 Apr · furniture bought" },
          { key: "r5b", label: "14 Apr · the other side" },
          { key: "r6a", label: "21 Apr · customer pays" },
          { key: "r6b", label: "21 Apr · the other side" },
          { key: "r7a", label: "28 Apr · owner withdraws" },
          { key: "r7b", label: "28 Apr · the other side" },
          { key: "tot", label: "Totals", kind: "total" },
        ],
        cells: [
          { row: "r1a", col: "account", expected: "Bank", marks: 1, feedback: "Money arrived in the bank, and that asset increase is the debit side." },
          { row: "r1a", col: "dr", expected: 200000, marks: 1 },
          { row: "r1b", col: "account", expected: "Capital", marks: 1, feedback: "The business now owes the owner what he put in, which is capital rather than a loan." },
          { row: "r1b", col: "cr", expected: 200000, marks: 1 },
          { row: "r2a", col: "account", expected: "Purchases", marks: 1, feedback: "Goods bought for resale go to Purchases, not to a stock asset account, under the periodic method this course uses." },
          { row: "r2a", col: "dr", expected: 60000, marks: 1 },
          { row: "r2b", col: "account", expected: "Bank", marks: 1 },
          { row: "r2b", col: "cr", expected: 60000, marks: 1 },
          { row: "r3a", col: "account", expected: "Trade Receivables", marks: 1, feedback: "The sale is recorded on dispatch, so the customer owes you. Cash has not moved." },
          { row: "r3a", col: "dr", expected: 45000, marks: 1 },
          { row: "r3b", col: "account", expected: "Sales", marks: 1 },
          { row: "r3b", col: "cr", expected: 45000, marks: 1 },
          { row: "r4a", col: "account", expected: "Rent Expense", marks: 1 },
          { row: "r4a", col: "dr", expected: 18000, marks: 1 },
          { row: "r4b", col: "account", expected: "Bank", marks: 1 },
          { row: "r4b", col: "cr", expected: 18000, marks: 1 },
          { row: "r5a", col: "account", expected: "Furniture", marks: 1, feedback: "A counter and shelving last for years, so this is a fixed asset and not a purchase of goods for resale." },
          { row: "r5a", col: "dr", expected: 35000, marks: 1 },
          { row: "r5b", col: "account", expected: "Trade Payables", marks: 1 },
          { row: "r5b", col: "cr", expected: 35000, marks: 1 },
          { row: "r6a", col: "account", expected: "Bank", marks: 1 },
          { row: "r6a", col: "dr", expected: 45000, marks: 1 },
          { row: "r6b", col: "account", expected: "Trade Receivables", marks: 1, feedback: "The customer no longer owes you, so the receivable is cleared. This is not a second sale." },
          { row: "r6b", col: "cr", expected: 45000, marks: 1 },
          { row: "r7a", col: "account", expected: "Drawings", marks: 1, feedback: "Money taken for personal use is Drawings. It is not a salary and not an expense of the business." },
          { row: "r7a", col: "dr", expected: 12000, marks: 1 },
          { row: "r7b", col: "account", expected: "Bank", marks: 1 },
          { row: "r7b", col: "cr", expected: 12000, marks: 1 },
          {
            row: "tot",
            col: "dr",
            expected: 415000,
            marks: 2,
            derivedFrom: { op: "sum", from: ["r1a:dr", "r2a:dr", "r3a:dr", "r4a:dr", "r5a:dr", "r6a:dr", "r7a:dr"] },
            methodMarks: 1,
            feedback: "The debit column should add to 4,15,000.",
          },
          {
            row: "tot",
            col: "cr",
            expected: 415000,
            marks: 2,
            derivedFrom: { op: "sum", from: ["r1b:cr", "r2b:cr", "r3b:cr", "r4b:cr", "r5b:cr", "r6b:cr", "r7b:cr"] },
            methodMarks: 1,
            feedback: "The credit column should add to 4,15,000.",
          },
        ],
        invariants: [
          {
            key: "dr-cr",
            label: "Debits equal credits",
            kind: "columns-equal",
            cols: ["dr", "cr"],
            marks: 4,
            hint: "Every transaction puts the same amount on both sides, so the two columns have to come out equal. If they do not, one entry has only one leg or an amount is mistyped.",
          },
        ],
        hints: [
          "Do the account names for all fourteen lines first and leave the numbers until afterwards. Most mistakes on this sheet are the wrong account rather than the wrong side.",
          "Assets and expenses grow on the debit side. Liabilities, capital and income grow on the credit side. Everything on this sheet follows from those two sentences.",
          "The 14 April entry is the one that catches people: shelving is not goods for resale, so it belongs in Furniture, and nothing was paid, so the other side is Trade Payables rather than Bank.",
        ],
        workedAnswer: `<p>The seven entries, with the reasoning that decides each one.</p>
<table>
<tr><th>Date</th><th>Debit</th><th class="num">₹</th><th>Credit</th><th class="num">₹</th></tr>
<tr><td>1 Apr</td><td>Bank</td><td class="num">2,00,000</td><td>Capital</td><td class="num">2,00,000</td></tr>
<tr><td>3 Apr</td><td>Purchases</td><td class="num">60,000</td><td>Bank</td><td class="num">60,000</td></tr>
<tr><td>6 Apr</td><td>Trade Receivables</td><td class="num">45,000</td><td>Sales</td><td class="num">45,000</td></tr>
<tr><td>9 Apr</td><td>Rent Expense</td><td class="num">18,000</td><td>Bank</td><td class="num">18,000</td></tr>
<tr><td>14 Apr</td><td>Furniture</td><td class="num">35,000</td><td>Trade Payables</td><td class="num">35,000</td></tr>
<tr><td>21 Apr</td><td>Bank</td><td class="num">45,000</td><td>Trade Receivables</td><td class="num">45,000</td></tr>
<tr><td>28 Apr</td><td>Drawings</td><td class="num">12,000</td><td>Bank</td><td class="num">12,000</td></tr>
<tr><td><strong>Total</strong></td><td></td><td class="num"><strong>4,15,000</strong></td><td></td><td class="num"><strong>4,15,000</strong></td></tr>
</table>
<p><strong>Three decisions worth revisiting.</strong></p>
<p>On 6 April the sale is recorded even though no money arrived. That is the accrual basis: the revenue was earned when the goods left. A business that waited for the cash would report no sales in a month where it sold everything on credit, which is the opposite of useful.</p>
<p>On 14 April the shelving is capitalised. The test is whether the benefit extends past this accounting period, and a shop counter plainly does. Had you debited Purchases, your trial balance would still have balanced perfectly, and that is the point: this class of error is invisible to arithmetic and has to be caught by someone asking the question.</p>
<p>On 28 April the entry is Drawings rather than Salaries. A sole proprietor cannot be an employee of their own business, so money taken out reduces capital instead of being an expense that reduces profit. Getting this wrong understates profit and understates the owner's stake at the same time.</p>`,
        minutes: 22,
        skills: ["Debit", "Credit", "Account"],
      },
    ],
  },
  /* ===================================================================== */
  5072: {
    topicId: 5072,
    title: "Posting a journal to the ledger",
    summary:
      "The journal records events in date order. The ledger reorganises them by account, which is the only form in which they answer a question.",
    concepts: ["Ledger", "Posting", "Balancing", "Opening balance", "T account"],
    glossary: {
      Posting: "Copying a journal line into the account it names, on the same side.",
      Ledger: "The collection of accounts, each holding every entry that touched it.",
      Balancing: "Totalling both sides of an account and carrying the difference down as the closing figure.",
      "T account": "The two-column layout of a single ledger account, named for its shape.",
      "Opening balance": "The closing balance of the previous period, brought forward as this period's starting figure.",
      "Folio reference": "The cross reference between a journal line and the ledger page it was posted to.",
    },
    body: {
      Beginner: `<p>The journal is a diary. It lists what happened, in the order it happened. That is useful for proving a sequence and useless for answering a question like "how much cash do we have".</p>
<div class="key-idea"><span class="callout-label">What posting is</span><p>Copying. A debit in the journal becomes a debit on the account's page. You never flip the side.</p></div>
<h3>One page per account</h3>
<p>To answer "how much cash", you need everything about cash in one place. So each account gets its own page with a left and a right side, and you copy each journal line onto the page it names.</p>
<h3>Finding the balance</h3>
<div class="worked"><span class="callout-label">A page that adds up</span><p>If the left adds to 90,000 and the right to 55,000, the account has 35,000 left over on the debit side. That is the balance.</p></div>
<div class="field"><span class="callout-label">The habit that prevents most errors</span><p>Tick each journal line as you post it. Almost every mistake at this stage is a line posted twice or not at all, and a tick stops both.</p></div>`,
      Intermediate: `<p>Posting is a transformation from one ordering to another. The journal is chronological, which makes it the evidential record. The ledger is organised by account, which makes it the analytical record, and it is the only form from which a balance can be read.</p>
<div class="key-idea"><span class="callout-label">Why the rule is so rigid</span><p>Nothing is recalculated and nothing is flipped. Because each journal entry summed to zero, the whole ledger sums to zero too, so any imbalance you later find is a posting error rather than a thinking error.</p></div>
<h3>Balancing an account</h3>
<p>Total both columns, write the difference on the smaller side as "balance carried down", and bring the same figure in on the opposite side as the next period's opening balance. The double appearance is not duplication: one occurrence closes this period, the other opens the next.</p>
<h3>Which balances survive the year end</h3>
<table>
<tr><th>Account type</th><th>At the year end</th><th>Example</th></tr>
<tr><td>Real</td><td>Balance carried forward</td><td>Bank, Furniture, Trade Payables</td></tr>
<tr><td>Nominal</td><td>Closed to profit and loss, reopens at zero</td><td>Rent Expense, Sales</td></tr>
</table>
<div class="field"><span class="callout-label">A consequence worth noticing</span><p>A Rent Expense account never has an opening balance. If you find one, something was carried forward that should have been closed.</p></div>`,
      Advanced: `<p>In a manual system the folio reference is the control that makes posting auditable: each journal line records the ledger page it went to and each ledger line records the journal page it came from, so a line posted twice or not at all is findable by following references rather than by recomputing totals.</p>
<div class="key-idea"><span class="callout-label">An account is a running signed total</span><p>Presenting it as two columns and a difference is a convention from pen and paper, and it survives because the two totals are themselves useful.</p></div>
<h3>What the net movement conceals</h3>
<p>Knowing that Trade Receivables had 14,00,000 of debits and 12,60,000 of credits in a year tells you about billing and collection volumes. A net movement of 1,40,000 conceals both.</p>
<h3>Control accounts</h3>
<p>Individual customer accounts live in a subsidiary ledger, and a single Trade Receivables control account in the main ledger carries their total. The reconciliation between the two is an independent check on the subsidiary ledger's completeness, and it catches a class of error the trial balance cannot see, because a misposting between two customer accounts leaves every total unchanged.</p>
<h3>Error signatures, which are worth memorising</h3>
<table>
<tr><th>What you did</th><th>What the trial balance does</th></tr>
<tr><td>Posted one side only</td><td>Out by the amount</td></tr>
<tr><td>Transposed digits within one side</td><td>Out by a multiple of nine</td></tr>
<tr><td>Posted to the wrong account, correct side</td><td>Nothing. It still balances.</td></tr>
<tr><td>Two errors that cancel</td><td>Nothing. It still balances.</td></tr>
</table>`,
      Expert: `<p>Posting is the materialisation of an index. The journal is the write-ahead log and the ledger is a projection of it grouped by account, which means the ledger is derived data and the journal is the system of record.</p>
<div class="key-idea"><span class="callout-label">What follows from that</span><p>Every well-designed accounting system keeps the journal append-only and reconstructs balances by replay rather than by mutation. A system that permits editing a posted balance directly has collapsed the distinction and lost the ability to explain how any figure came to be.</p></div>
<h3>It settles an argument practitioners keep having</h3>
<p>Should correcting an error overwrite the original entry or add a reversing one? If the journal is the record, overwriting destroys evidence and a reversal is the only defensible mechanism, which is also why statutory audit trails and Ind AS alike require that a posted entry not be altered. The cost is a ledger containing both the mistake and its correction, and that cost is the price of being able to prove anything.</p>
<h3>Control reconciliation is a completeness assertion</h3>
<p>The subsidiary ledger and the control account are populated by different processes, one transaction by transaction and one in summary, so agreement between them is evidence that neither process dropped anything. When they disagree the difference localises the failure to one of a small number of mechanisms: an entry posted to the control but not the subsidiary, a direct posting to the control that bypassed the sales process, or a subsidiary entry outside the period.</p>
<div class="field"><span class="callout-label">Three divisions before an unbounded hunt</span><p>A single transposition produces a difference divisible by nine. A single omission produces a difference equal to the omitted amount. A side error produces a difference equal to twice the amount. Testing those three costs a minute.</p></div>`,
    },
    worksheets: [
      {
        n: 1,
        title: "Post and balance the bank account",
        difficulty: "Medium",
        brief: `<p>Below are the five journal lines that touched the bank account of Hemant Traders in April, plus the opening balance. Post each one to the correct side of the Bank account, then total both sides and bring the closing balance down.</p>
<table>
<tr><th>Date</th><th>Entry</th><th class="num">Amount (₹)</th></tr>
<tr><td>1 Apr</td><td>Capital introduced</td><td class="num">2,00,000</td></tr>
<tr><td>3 Apr</td><td>Purchases paid by cheque</td><td class="num">60,000</td></tr>
<tr><td>9 Apr</td><td>Rent paid by cheque</td><td class="num">18,000</td></tr>
<tr><td>21 Apr</td><td>Customer settled an invoice</td><td class="num">45,000</td></tr>
<tr><td>28 Apr</td><td>Owner's drawings</td><td class="num">12,000</td></tr>
</table>
<p>Remember that the Bank account is an asset: money arriving is a debit, money leaving is a credit. The balance carried down goes on the <em>smaller</em> side so that the two columns total the same, which is the part that feels wrong the first time.</p>`,
        stubLabel: "Particulars",
        columns: [
          { key: "dr", label: "Debit (₹)", type: "number", align: "right" },
          { key: "cr", label: "Credit (₹)", type: "number", align: "right" },
        ],
        rows: [
          { key: "cap", label: "1 Apr · To Capital" },
          { key: "pur", label: "3 Apr · By Purchases" },
          { key: "rent", label: "9 Apr · By Rent Expense" },
          { key: "recv", label: "21 Apr · To Trade Receivables" },
          { key: "draw", label: "28 Apr · By Drawings" },
          // Not a subtotal: in a T account the balance carried down is a line
          // IN the column, which is exactly what makes the two sides rule off
          // to the same figure. Marking it as a subtotal excluded it from the
          // column sum and the sheet declared its own answer key unbalanced.
          { key: "bcd", label: "30 Apr · Balance carried down" },
          { key: "tot", label: "Totals", kind: "total" },
        ],
        cells: [
          { row: "cap", col: "dr", expected: 200000, marks: 2, feedback: "Capital arriving in the bank increases an asset, so it belongs on the debit side." },
          { row: "pur", col: "cr", expected: 60000, marks: 2, feedback: "Paying for goods reduces the bank balance, which is a credit to Bank." },
          { row: "rent", col: "cr", expected: 18000, marks: 2 },
          { row: "recv", col: "dr", expected: 45000, marks: 2, feedback: "The customer's payment brings money in, so Bank is debited." },
          { row: "draw", col: "cr", expected: 12000, marks: 2 },
          {
            row: "bcd",
            col: "cr",
            expected: 155000,
            marks: 3,
            feedback:
              "Debits total 2,45,000 and credits total 90,000, so 1,55,000 is left on the debit side. The balance is written on the credit side to square the two columns off.",
          },
          {
            row: "tot",
            col: "dr",
            expected: 245000,
            marks: 2,
            derivedFrom: { op: "sum", from: ["cap:dr", "recv:dr"] },
            methodMarks: 1,
          },
          {
            row: "tot",
            col: "cr",
            expected: 245000,
            marks: 2,
            derivedFrom: { op: "sum", from: ["pur:cr", "rent:cr", "draw:cr", "bcd:cr"] },
            methodMarks: 1,
          },
        ],
        invariants: [
          {
            key: "ruled-off",
            label: "The account rules off",
            kind: "columns-equal",
            cols: ["dr", "cr"],
            marks: 4,
            hint: "Once the balance carried down is in place, both columns must total the same figure. If they do not, either the balance is on the wrong side or it is the wrong amount.",
          },
        ],
        hints: [
          "Post the five transactions first and leave the balance row empty. Only once all five are placed can you see which side is larger.",
          "Money in is a debit, money out is a credit. Three of these five reduce the bank.",
          "Debits come to 2,45,000 and credits to 90,000. The difference of 1,55,000 is written in the credit column so that both sides total 2,45,000, and it is that same 1,55,000 that opens May as a debit balance.",
        ],
        workedAnswer: `<table>
<tr><th>Particulars</th><th class="num">Debit</th><th>Particulars</th><th class="num">Credit</th></tr>
<tr><td>To Capital</td><td class="num">2,00,000</td><td>By Purchases</td><td class="num">60,000</td></tr>
<tr><td>To Trade Receivables</td><td class="num">45,000</td><td>By Rent Expense</td><td class="num">18,000</td></tr>
<tr><td></td><td class="num"></td><td>By Drawings</td><td class="num">12,000</td></tr>
<tr><td></td><td class="num"></td><td>By Balance c/d</td><td class="num">1,55,000</td></tr>
<tr><td><strong>Total</strong></td><td class="num"><strong>2,45,000</strong></td><td><strong>Total</strong></td><td class="num"><strong>2,45,000</strong></td></tr>
</table>
<p><strong>Why the balance goes on the smaller side.</strong> Balancing is not a calculation about the account, it is the act of making the page add up. The account genuinely holds 1,55,000 on the debit side, and writing that figure in the credit column is a bookkeeping device that lets you rule the page off with equal totals. On 1 May the same 1,55,000 reappears as "To Balance b/d" in the debit column, which is where the real balance has been all along.</p>
<p><strong>What the two totals tell you that the balance does not.</strong> The debit total of 2,45,000 is everything that came into the bank this month and the credit total of 90,000 is everything that went out. A closing balance of 1,55,000 conceals both. For a lender assessing this business the turnover through the account matters at least as much as what is sitting in it, which is the practical reason the columns are totalled rather than netted.</p>`,
        minutes: 18,
        skills: ["Posting", "Balancing", "T account"],
      },
    ],
  },

  /* ===================================================================== */
  5073: {
    topicId: 5073,
    title: "The trial balance, and what it cannot catch",
    summary:
      "A trial balance proves the arithmetic held. It proves nothing about whether the entries were right, and knowing the difference is the point of this topic.",
    concepts: ["Trial balance", "Suspense account", "Error of principle", "Compensating error", "Transposition"],
    glossary: {
      "Trial balance": "A list of every ledger balance with debits in one column and credits in the other, used to test that the arithmetic holds.",
      "Suspense account": "A temporary account that absorbs a trial balance difference until the error behind it is found.",
      "Error of principle": "An entry posted to a wrong class of account, such as capital expenditure treated as an expense.",
      "Compensating error": "Two errors whose effects cancel, leaving the totals equal and both entries wrong.",
      Transposition: "Writing digits in the wrong order, such as 5,940 for 5,490.",
      "Error of omission": "A transaction never recorded at all, which leaves the trial balance in agreement.",
    },
    body: {
      Beginner: `<p>Once every account has a balance, you list them all in two columns: debit balances on the left, credit balances on the right. Add both columns. They should be equal.</p>
<p>They are equal because every single entry put the same amount on both sides, so when you add everything up the two sides have to match. If they do not, you have made a mechanical mistake somewhere, and you now know to go looking.</p>
<div class="warning"><span class="callout-label">The part people miss</span><p>A trial balance agreeing does not mean your books are right. Pay the electricity bill and record it as rent, and both sides still match. You put the same amount on each side. You just put one of them in the wrong place.</p></div>
<h3>What it is for</h3>
<p>Treat it as a spell-check, not a proof-read. It finds one specific kind of error, and it is silent about several others.</p>`,
      Intermediate: `<p>A trial balance tests exactly one property: that the sum of debit balances equals the sum of credit balances. Because every journal entry is constructed to sum to zero, the aggregate must too, and a difference is proof of a mechanical failure somewhere in posting or totalling.</p>
<div class="key-idea"><span class="callout-label">It detects asymmetry, nothing else</span><p>Anything that breaks the left-right symmetry shows up. Anything that preserves it does not, however wrong the entry is.</p></div>
<h3>What it catches, and what walks past it</h3>
<table>
<tr><th>Error</th><th>Caught?</th><th>Signature</th></tr>
<tr><td>One-sided posting</td><td>Yes</td><td>Out by the amount</td></tr>
<tr><td>Side error (debit posted as credit)</td><td>Yes</td><td>Out by twice the amount</td></tr>
<tr><td>Omission: never recorded at all</td><td>No</td><td>Both columns short equally</td></tr>
<tr><td>Commission: right amount, wrong customer</td><td>No</td><td>Totals unchanged</td></tr>
<tr><td>Principle: capital expenditure expensed</td><td>No</td><td>Totals unchanged</td></tr>
<tr><td>Two errors that cancel</td><td>No</td><td>Totals unchanged</td></tr>
</table>
<h3>When a difference will not resolve</h3>
<p>A suspense account holds the difference so work can continue, with the balance investigated and cleared before the accounts are finalised.</p>
<div class="warning"><span class="callout-label">A suspense balance at year end</span><p>Is not a rounding issue. It is an unexplained error, and no set of final accounts should be signed off over one.</p></div>`,
      Advanced: `<p>Before searching line by line, read the shape of the difference. Three signatures account for most single-error cases, and testing them costs a minute against an unbounded hunt.</p>
<div class="worked"><span class="callout-label">Three divisions</span>
<table>
<tr><th>The difference is</th><th>Look for</th></tr>
<tr><td>Divisible by nine</td><td>A transposition: any digit swap changes a value by a multiple of nine</td></tr>
<tr><td>Exactly twice a transaction amount</td><td>A side error</td></tr>
<tr><td>Equal to a round transaction amount</td><td>A one-sided posting, or an omitted balance</td></tr>
</table></div>
<h3>What kind of assurance this is</h3>
<p>An internal consistency check on a closed arithmetic system, and such a check can never speak to the relationship between the system and the world outside it. Completeness is unverifiable from inside: a sale that was never invoiced leaves no trace anywhere in the ledger. That is why completeness assurance comes from reconciliation against external records rather than from the trial balance.</p>
<h3>Error of principle</h3>
<p>Both invisible to the trial balance and material to the numbers that matter. Expensing an asset reduces profit now and inflates it later; capitalising a repair does the reverse. Either can move a business from loss to profit.</p>
<div class="field"><span class="callout-label">In software this has inverted</span><p>An unbalanced entry is usually rejected at input, so trial balance differences are nearly extinct. The errors that remain are almost entirely the ones it never caught. Spending review time on a check the software already enforces is a habit inherited from pen and paper.</p></div>`,
      Expert: `<p>Cast the ledger as a vector space over accounts with the zero-sum constraint, and the trial balance is the assertion that the aggregate posting vector lies in the constraint hyperplane.</p>
<div class="key-idea"><span class="callout-label">The limitation is a theorem, not a caution</span><p>The test has power only against operations that leave that hyperplane. Any error that is itself a valid zero-sum vector, including every misclassification and every compensating pair, is undetectable by construction.</p></div>
<h3>Three assertions, three kinds of evidence</h3>
<table>
<tr><th>Assertion</th><th>Testable how</th></tr>
<tr><td>Accuracy</td><td>Internally; the trial balance partially addresses it</td></tr>
<tr><td>Classification</td><td>Against an external criterion, the standards, by judgement</td></tr>
<tr><td>Completeness</td><td>Against an independent population: bank confirmations, supplier statements, cut-off testing, margin analysis</td></tr>
</table>
<h3>Suspense accounts carry a governance dimension</h3>
<div class="warning"><span class="callout-label">How an error becomes permanent</span><p>A suspense balance that survives a period end tends to be written off to profit and loss as immaterial, converting an unknown error into a known adjustment without anyone establishing what happened. Material weaknesses have been reported over exactly this pattern. The control is a clearance window with named ownership.</p></div>
<p>Note also that the extended trial balance, with adjustment and final-accounts columns beside the ledger balances, remains the working paper of choice even where software generates statements directly, because it makes every adjusting judgement visible in one place and reviewable by a second person.</p>`,
    },
    worksheets: [
      {
        n: 1,
        title: "Draw up a trial balance that will not balance",
        difficulty: "Medium",
        brief: `<p>These are the closing ledger balances of Hemant Traders at 30 April. Put each one in the debit or the credit column according to what kind of account it is.</p>
<figure>
<svg viewBox="0 0 1000 460" role="img" aria-label="Which kinds of account carry a debit balance and which carry a credit balance">
<rect x="30" y="40" width="450" height="380" rx="18" fill="#0f766e" opacity="0.1"/>
<rect x="30" y="40" width="450" height="380" rx="18" fill="none" stroke="#0f766e" stroke-width="3"/>
<text x="255" y="104" font-size="42" font-weight="800" fill="#0f766e" text-anchor="middle">DEBIT</text>
<text x="255" y="146" font-size="26" font-weight="700" fill="currentColor" opacity="0.6" text-anchor="middle">what the business HAS or SPENDS</text>
<text x="70" y="212" font-size="32" font-weight="800" fill="currentColor">Assets</text>
<text x="70" y="264" font-size="32" font-weight="800" fill="currentColor">Expenses</text>
<text x="70" y="316" font-size="32" font-weight="800" fill="currentColor">Drawings</text>
<text x="70" y="382" font-size="26" fill="currentColor" opacity="0.7">Bank, Furniture, Rent, Purchases</text>
<rect x="520" y="40" width="450" height="380" rx="18" fill="#7c3aed" opacity="0.1"/>
<rect x="520" y="40" width="450" height="380" rx="18" fill="none" stroke="#7c3aed" stroke-width="3"/>
<text x="745" y="104" font-size="42" font-weight="800" fill="#7c3aed" text-anchor="middle">CREDIT</text>
<text x="745" y="146" font-size="26" font-weight="700" fill="currentColor" opacity="0.6" text-anchor="middle">where the money CAME FROM</text>
<text x="560" y="212" font-size="32" font-weight="800" fill="currentColor">Liabilities</text>
<text x="560" y="264" font-size="32" font-weight="800" fill="currentColor">Income</text>
<text x="560" y="316" font-size="32" font-weight="800" fill="currentColor">Capital</text>
<text x="560" y="382" font-size="26" fill="currentColor" opacity="0.7">Trade Payables, Sales, Capital</text>
</svg>
<figcaption><strong>Drawings is the one that catches people.</strong> It sits on the debit side even though it belongs to the owner, because it reduces capital and capital is a credit balance. A reduction in a credit balance is a debit.</figcaption>
</figure>
<table>
<tr><th>Account</th><th class="num">Balance (&#8377;)</th></tr>
<tr><td>Bank</td><td class="num">1,55,000</td></tr>
<tr><td>Purchases</td><td class="num">60,000</td></tr>
<tr><td>Sales</td><td class="num">45,000</td></tr>
<tr><td>Rent Expense</td><td class="num">18,000</td></tr>
<tr><td>Furniture</td><td class="num">35,000</td></tr>
<tr><td>Trade Payables</td><td class="num">35,000</td></tr>
<tr><td>Drawings</td><td class="num">12,000</td></tr>
<tr><td>Capital</td><td class="num">2,00,000</td></tr>
</table>
<div class="key-idea"><span class="callout-label">How this sheet is marked</span><p>One mark per balance placed in the right column, and further marks on the two totals. The totals carry method marks, so a total that is correct given the figures you actually entered still earns most of them even where a balance above it went to the wrong side. Accounting is marked on method, and so is this.</p></div>
<p>Then answer the question in the last row. Having balanced, how many rupees of your books has this exercise proved to be correct? Enter the figure in rupees.</p>
<div class="warning"><span class="callout-label">That last row is the point of the whole task</span><p>It is not a trick and it is not arithmetic. Think about what the two columns agreeing actually demonstrates, and then about everything that could be wrong in a set of books while they still agree.</p></div>`,
        stubLabel: "Account",
        columns: [
          { key: "dr", label: "Debit (₹)", type: "number", align: "right" },
          { key: "cr", label: "Credit (₹)", type: "number", align: "right" },
        ],
        rows: [
          { key: "bank", label: "Bank" },
          { key: "purch", label: "Purchases" },
          { key: "sales", label: "Sales" },
          { key: "rent", label: "Rent Expense" },
          { key: "furn", label: "Furniture" },
          { key: "pay", label: "Trade Payables" },
          { key: "draw", label: "Drawings" },
          { key: "cap", label: "Capital" },
          { key: "tot", label: "Totals", kind: "total" },
          { key: "proved", label: "Rupees of your books this proves correct", kind: "subtotal" },
        ],
        cells: [
          { row: "bank", col: "dr", expected: 155000, marks: 1 },
          { row: "purch", col: "dr", expected: 60000, marks: 1, feedback: "Purchases is an expense account, so its balance is a debit." },
          { row: "sales", col: "cr", expected: 45000, marks: 1, feedback: "Sales is income, and income balances sit on the credit side." },
          { row: "rent", col: "dr", expected: 18000, marks: 1 },
          { row: "furn", col: "dr", expected: 35000, marks: 1 },
          { row: "pay", col: "cr", expected: 35000, marks: 1 },
          { row: "draw", col: "dr", expected: 12000, marks: 1, feedback: "Drawings reduce capital, and since capital is a credit balance a reduction carries a debit balance of its own." },
          { row: "cap", col: "cr", expected: 200000, marks: 1 },
          {
            row: "tot",
            col: "dr",
            expected: 280000,
            marks: 2,
            derivedFrom: { op: "sum", from: ["bank:dr", "purch:dr", "rent:dr", "furn:dr", "draw:dr"] },
            methodMarks: 1,
          },
          {
            row: "tot",
            col: "cr",
            expected: 280000,
            marks: 2,
            derivedFrom: { op: "sum", from: ["sales:cr", "pay:cr", "cap:cr"] },
            methodMarks: 1,
          },
          {
            row: "proved",
            col: "dr",
            expected: 0,
            marks: 3,
            tolerance: 0,
            feedback:
              "Zero. A trial balance that agrees proves the arithmetic held and nothing else. Every rupee here could be posted to the wrong account and the totals would still match.",
          },
        ],
        invariants: [
          {
            key: "tb",
            label: "The trial balance agrees",
            kind: "columns-equal",
            cols: ["dr", "cr"],
            marks: 4,
            hint: "Both columns should reach 2,80,000. A difference means an account is in the wrong column, and a difference of exactly twice a balance tells you which one.",
          },
        ],
        hints: [
          "Five of these eight are debit balances. Assets, expenses and drawings; liabilities, income and capital are the credits.",
          "Drawings is the one that trips people. It reduces the owner's stake, so it carries a debit balance even though capital carries a credit one.",
          "For the last row, think about what the test actually measures. It compares two totals that were constructed from entries that each summed to zero, so agreement is guaranteed by the method and carries no information about whether any entry named the right account.",
        ],
        workedAnswer: `<h3>The completed trial balance</h3>
<table>
<tr><th>Account</th><th class="num">Debit (&#8377;)</th><th class="num">Credit (&#8377;)</th></tr>
<tr><td>Bank</td><td class="num">1,55,000</td><td class="num"></td></tr>
<tr><td>Purchases</td><td class="num">60,000</td><td class="num"></td></tr>
<tr><td>Sales</td><td class="num"></td><td class="num">45,000</td></tr>
<tr><td>Rent Expense</td><td class="num">18,000</td><td class="num"></td></tr>
<tr><td>Furniture</td><td class="num">35,000</td><td class="num"></td></tr>
<tr><td>Trade Payables</td><td class="num"></td><td class="num">35,000</td></tr>
<tr><td>Drawings</td><td class="num">12,000</td><td class="num"></td></tr>
<tr><td>Capital</td><td class="num"></td><td class="num">2,00,000</td></tr>
<tr><th>Totals</th><th class="num">2,80,000</th><th class="num">2,80,000</th></tr>
</table>
<div class="worked"><span class="callout-label">The two that are worth checking</span><p>Purchases is an expense, so it is a debit even though it sounds like something you now own. Drawings is a debit because it reduces capital, and capital is a credit balance, so a reduction in it carries the opposite sign.</p></div>
<h3>And the last row is zero</h3>
<figure>
<svg viewBox="0 0 1000 620" role="img" aria-label="Errors a trial balance catches compared with errors it cannot catch">
<rect x="30" y="40" width="450" height="420" rx="18" fill="#0f766e" opacity="0.1"/>
<rect x="30" y="40" width="450" height="420" rx="18" fill="none" stroke="#0f766e" stroke-width="3"/>
<text x="255" y="104" font-size="38" font-weight="800" fill="#0f766e" text-anchor="middle">IT CATCHES</text>
<text x="70" y="176" font-size="28" font-weight="700" fill="currentColor">One side posted</text>
<text x="70" y="240" font-size="28" font-weight="700" fill="currentColor">Wrong amount, one side</text>
<text x="70" y="304" font-size="28" font-weight="700" fill="currentColor">Addition error</text>
<text x="70" y="368" font-size="28" font-weight="700" fill="currentColor">Balance on the wrong side</text>
<text x="255" y="428" font-size="26" fill="currentColor" opacity="0.65" text-anchor="middle">anything that breaks the arithmetic</text>
<rect x="520" y="40" width="450" height="420" rx="18" fill="#be123c" opacity="0.1"/>
<rect x="520" y="40" width="450" height="420" rx="18" fill="none" stroke="#be123c" stroke-width="3"/>
<text x="745" y="104" font-size="38" font-weight="800" fill="#be123c" text-anchor="middle">IT MISSES</text>
<text x="560" y="176" font-size="28" font-weight="700" fill="currentColor">Left out completely</text>
<text x="560" y="240" font-size="28" font-weight="700" fill="currentColor">Right side, wrong account</text>
<text x="560" y="304" font-size="28" font-weight="700" fill="currentColor">Two errors cancelling</text>
<text x="560" y="368" font-size="28" font-weight="700" fill="currentColor">Both entries reversed</text>
<text x="745" y="428" font-size="26" fill="currentColor" opacity="0.65" text-anchor="middle">the arithmetic still works perfectly</text>
<rect x="30" y="500" width="940" height="88" rx="16" fill="currentColor" opacity="0.07"/>
<text x="500" y="556" font-size="34" font-weight="800" fill="currentColor" text-anchor="middle">Balanced proves the arithmetic, not the truth.</text>
</svg>
<figcaption><strong>This is why the last row of the sheet asks for a rupee figure and the answer is zero.</strong> A trial balance that balances has proved that every entry was posted to two sides with the same number on each. It has proved nothing at all about whether those were the right two accounts, or whether the transaction happened.</figcaption>
</figure>
<p>Both columns come to 2,80,000, and that agreement proves exactly one thing: every entry was posted to two sides with the same number on each. It is a check on the arithmetic of double entry and on nothing else.</p>
<table>
<tr><th>If this happened</th><th>Does the trial balance still balance?</th></tr>
<tr><td>A sale of 10,000 was never entered at all</td><td>Yes. Both sides are missing, so both columns are short by the same amount.</td></tr>
<tr><td>Rent was debited to Furniture</td><td>Yes. A debit is still a debit; it is in the wrong account.</td></tr>
<tr><td>Bank was overstated by 5,000 and Sales by 5,000</td><td>Yes. The two errors cancel.</td></tr>
<tr><td>A payment was credited to Bank and debited to the supplier the wrong way round</td><td>Yes. Both entries are reversed, so the columns are undisturbed.</td></tr>
</table>
<div class="field"><span class="callout-label">Which is why the rest of the course exists</span><p>If a balanced trial balance proved the books, there would be no need for bank reconciliation, no need to confirm balances with suppliers, and no need for an audit. Every one of those procedures exists to test something the trial balance cannot see. A balanced trial balance is the start of the checking, not the end of it.</p></div>`,
        minutes: 20,
        skills: ["Trial balance", "Error of principle", "Compensating error"],
      },
    ],
    scenarios: [
      {
        n: 1,
        title: "The difference of 5,400",
        blurb:
          "Your trial balance is out by 5,400 rupees and the accounts have to go to the owner's bank tomorrow morning. What you do next is the whole topic.",
        role: "You are the bookkeeper at a 40-person trading firm.",
        start: "s1",
        minutes: 12,
        idealPath: ["s1", "s2", "s3"],
        nodes: [
          {
            id: "s1",
            situation: `<p>It is 6pm on 7 April. You have just totalled the March trial balance and the debit column is 5,400 rupees higher than the credit column. The owner needs the accounts emailed to the bank by 10am tomorrow for a working capital renewal.</p><p>The ledger has about 900 entries for the month.</p>`,
            prompt: "What do you do first?",
            choices: [
              {
                id: "a",
                label: "Check whether 5,400 is divisible by nine before looking at anything else",
                outcome:
                  "It is: 5,400 divided by 9 is 600. That points hard at a transposition, so instead of 900 entries you are now looking for a pair of digits in the wrong order. You scan amounts containing the same digits and find a supplier invoice entered as 23,400 against a document reading 18,000. That is not it. Then you find a receipt posted as 9,540 where the bank statement says 9,450. Difference: 90. Not it either, but you are now reading amounts against documents, which is the right activity.",
                next: "s2",
                delta: 3,
                cost: { minutes: 20 },
              },
              {
                id: "b",
                label: "Post 5,400 to a suspense account and send the accounts",
                outcome:
                  "The accounts balance and go out on time. The bank's analyst queries the suspense line on the Thursday, and the owner has to explain a figure nobody can account for during a credit renewal. That is a worse conversation than a day's delay.",
                next: "s4",
                delta: -2,
                cost: { minutes: 5 },
                violation:
                  "An unexplained suspense balance was sent to a lender as part of a credit application.",
              },
              {
                id: "c",
                label: "Start at entry one and re-check all 900 postings",
                outcome:
                  "Thorough and almost certainly effective, but it is 6pm and you are working through a population of 900 when the difference itself tells you which small subset to look at. You get through 300 entries by 9pm and find nothing.",
                next: "s2",
                delta: 0,
                cost: { minutes: 180 },
              },
              {
                id: "d",
                label: "Adjust the Capital account by 5,400 so the two columns agree",
                outcome:
                  "The trial balance now balances and the owner's stake is overstated by 5,400. You have converted a findable mechanical error into a permanent misstatement, and the audit trail shows you did it deliberately.",
                next: "s4",
                delta: -3,
                cost: { minutes: 2 },
                violation: "A balancing figure was plugged into a real account to hide a difference.",
              },
            ],
          },
          {
            id: "s2",
            situation: `<p>It is 7:30pm. You have the divisibility clue and you have started comparing entered amounts against source documents. The ledger has 900 entries but only 61 of them are over 5,000 rupees.</p>`,
            prompt: "Where do you look next?",
            choices: [
              {
                id: "a",
                label: "Compare the 61 entries over 5,000 rupees against their documents",
                outcome:
                  "Twenty minutes in you find it. A sales invoice for 15,300 was posted as 20,700 in the receivables ledger. The digits were not transposed, but both figures contain a 3 and a 0 and the difference is exactly 5,400. One corrected entry and both columns reach the same total.",
                next: "s3",
                delta: 3,
                cost: { minutes: 25 },
              },
              {
                id: "b",
                label: "Check the control account against the customer sub-ledger",
                outcome:
                  "A reasonable instinct, and it does narrow things: the receivables control and the sub-ledger disagree by 5,400, which tells you the error is in receivables. It costs a little longer than reading the large entries but it localises the problem properly.",
                next: "s3",
                delta: 2,
                cost: { minutes: 40 },
              },
              {
                id: "c",
                label: "Ask the owner for permission to send unbalanced accounts with a note",
                outcome:
                  "The owner says no, as any owner would the night before a credit renewal, and you have lost twenty minutes.",
                next: "s2",
                delta: -1,
                cost: { minutes: 20 },
              },
            ],
          },
          {
            id: "s3",
            situation: `<p>You found it: one sales invoice entered as 20,700 instead of 15,300. You post a correcting entry, the trial balance agrees at 48,61,200 on both sides, and the accounts go to the bank at 8:40am.</p>`,
            prompt: "",
            ending: {
              verdict: "ideal",
              title: "Found, corrected, and documented before the deadline",
              debrief: `<p>You did the one thing that makes a trial balance difference tractable: you read the shape of the number before you read the ledger. A difference divisible by nine says transposition, a difference of exactly twice an amount says a side error, and a round difference says a one-sided posting or an omitted balance. Three divisions, and the search space collapses.</p>
<p>Note what you did <em>not</em> do. You did not plug the figure into a real account, which would have turned a findable error into a permanent misstatement under your own name in the audit trail. And you did not send a suspense balance to a lender during a credit application, which is the version of this that gets bookkeepers into real trouble: the number is a written admission that the accounts contain an error nobody has explained.</p>
<p>The one thing worth doing tomorrow is a correcting entry with a narration that says what happened, rather than a silent edit. The journal is the evidential record, and a corrected figure that cannot be traced back to the mistake is worth less than the mistake plus its correction.</p>`,
            },
          },
          {
            id: "s4",
            situation: `<p>The accounts went out balanced. The difference is still in the books, either sitting in a suspense account the lender has now asked about, or buried inside a real balance that is now wrong.</p>`,
            prompt: "",
            ending: {
              verdict: "poor",
              title: "The difference went out of the door with the accounts",
              debrief: `<p>Both of the shortcuts here fail for the same underlying reason: they treat the trial balance as a thing to be made to agree rather than as a signal that something specific is wrong. The difference was 5,400, divisible by nine, pointing at one mistyped amount in a population you could have narrowed to 61 entries. It was findable in under an hour.</p>
<p>Plugging a real account is the more serious of the two. It misstates a balance, it is deliberate, and the audit trail records who did it. A suspense account at least leaves the problem visible, which is what it is for, but a suspense balance that reaches a lender during a credit renewal is a self-reported unexplained error in a document being used to borrow money.</p>
<p>The defensible version of being short of time is to tell the owner the accounts are out by 5,400, say what you have ruled out, and ask for the morning. A day's delay is a smaller problem than either of the alternatives, and an owner who understands the choice will nearly always take it.</p>`,
            },
          },
        ],
        skills: ["Trial balance", "Suspense account", "Transposition"],
      },
    ],
  },
  /* ===================================================================== */
  5074: {
    topicId: 5074,
    title: "Accruals, prepayments and the matching principle",
    summary:
      "The bank statement tells you when money moved. The accounts have to say which period the cost belonged to, and those are rarely the same month.",
    concepts: ["Accrual", "Prepayment", "Matching principle", "Accounting period", "Adjusting entry"],
    glossary: {
      Accrual: "An expense incurred in the period but not yet paid or invoiced at the period end.",
      Prepayment: "An amount paid in advance for a benefit that falls in a later period.",
      "Matching principle": "Expenses belong in the period of the revenue they helped earn, not the period they were paid.",
      "Adjusting entry": "A year-end entry that moves a cost or an income into the period it belongs to.",
      "Accounting period": "The span of time a set of accounts reports on, usually April to March in India.",
      "Income received in advance": "Money taken for goods or services not yet delivered, which is a liability rather than revenue.",
    },
    body: {
      Beginner: `<p>Your landlord asks for six months of rent in advance in March. You pay 90,000 rupees. Does your March accounts show a 90,000 rupee rent cost?</p>
<div class="key-idea"><span class="callout-label">No, and here is the rule</span><p>Put the cost in the period you actually used the thing. Paying early does not make it this year's cost, and paying late does not make it next year's.</p></div>
<h3>Both directions</h3>
<table>
<tr><th>Situation</th><th>This year's cost</th><th>On the balance sheet</th></tr>
<tr><td>Paid 90,000 for six months, one month used</td><td>15,000</td><td>75,000 you have paid for and not used</td></tr>
<tr><td>Used March electricity, bill arrives April</td><td>The full March cost</td><td>The amount you still owe</td></tr>
</table>
<p>The first is a prepayment, the second an accrual. Both exist because the month you pay and the month you use are different months.</p>`,
      Intermediate: `<p>Cash movement and economic consumption are separate events, and the accrual basis records the second. The matching principle makes this concrete: a cost belongs in the period whose revenue it helped produce, which means the payment date is evidence of a transaction but not of its period.</p>
<h3>The four adjustments</h3>
<table>
<tr><th>Name</th><th>Situation</th><th>Entry</th><th>It is a</th></tr>
<tr><td>Accrual</td><td>Incurred, not yet paid</td><td>Dr expense, Cr accrued liability</td><td>Liability</td></tr>
<tr><td>Prepayment</td><td>Paid, not yet consumed</td><td>Dr prepaid asset, Cr expense</td><td>Asset</td></tr>
<tr><td>Accrued income</td><td>Earned, not yet invoiced</td><td>Dr accrued income, Cr income</td><td>Asset</td></tr>
<tr><td>Income in advance</td><td>Taken, not yet delivered</td><td>Dr income, Cr deferred income</td><td>Liability</td></tr>
</table>
<div class="field"><span class="callout-label">The pair that gets neglected</span><p>The income side. Income received in advance is money taken for undelivered goods, and it is a liability rather than revenue. That entry is what distinguishes a deposit from a sale.</p></div>
<h3>Why reviewers test these first</h3>
<div class="warning"><span class="callout-label">Scale</span><p>Getting an accrual wrong by 40,000 in a business making 3,00,000 of profit moves the reported figure by 13%, and since the adjustment reverses next period the error appears twice with opposite signs.</p></div>`,
      Advanced: `<p>Accruals are where the accounts stop being a transcription of the bank statement and start being a set of judgements. Each adjusting entry is an estimate about an amount, a period, or both.</p>
<div class="key-idea"><span class="callout-label">The distribution of those estimates is not random</span><p>Management has an interest in the direction of each one, which is why the standard checks test the estimate rather than the arithmetic.</p></div>
<h3>Cut-off is the sharper form of the problem</h3>
<p>A business that leaves its purchase ledger open for an extra week after year end pulls next year's costs into this year, and one that closes it early does the reverse. Neither action requires a false entry, only a choice about when to stop, which is why cut-off testing traces transactions either side of the period end to delivery dates rather than to invoice dates.</p>
<h3>Reversing entries are a control, not bookkeeping</h3>
<p>If every accrual is reversed on the first day of the new period, the actual invoice can be posted in full when it arrives without anyone having to remember what was estimated. Releasing accruals by hand against invoices works until the person who made the estimate leaves.</p>
<div class="warning"><span class="callout-label">Deferred revenue carries the heaviest consequences</span><p>A business that recognises annual subscription income on receipt reports a year of revenue in one month and nothing afterwards. It is both wrong and the single most common accounting failure among young subscription businesses.</p></div>`,
      Expert: `<p>Under Ind AS 115 the accrual question is reframed: revenue follows the satisfaction of performance obligations, and the contract rather than the invoice becomes the unit of account.</p>
<div class="key-idea"><span class="callout-label">Where preparers diverge</span><p>Identifying the distinct performance obligations. A bundled sale of equipment with twelve months of maintenance is one invoice and at least two obligations, one satisfied at a point in time and one over time.</p></div>
<h3>There is no symmetric expense standard, and that is instructive</h3>
<p>Expenses are recognised as a consequence of other decisions: asset derecognition, liability recognition under Ind AS 37, or the depletion of a prepaid right. Matching therefore survives as an organising intuition rather than an enforceable rule, and the Conceptual Framework is explicit that it cannot justify recognising an item failing the definition of an asset or a liability. Definitions first, matching second.</p>
<h3>Ind AS 37, and what each limb excludes</h3>
<table>
<tr><th>Limb</th><th>What it rules out</th></tr>
<tr><td>Present obligation from a past event</td><td>A planned restructuring with no announcement</td></tr>
<tr><td>Probable outflow</td><td>Future operating losses: no past event</td></tr>
<tr><td>Reliable estimate</td><td>A claim too uncertain to measure: disclosed, not provided</td></tr>
</table>
<p>The historical abuse this replaced was the big-bath provision, taken in a bad year and released into good ones to smooth reported earnings.</p>
<div class="field"><span class="callout-label">The analytical signature</span><p>Accruals are the difference between accounting profit and operating cash flow, and a widening gap sustained over several periods is the most studied earnings-quality indicator in the literature. A growing business legitimately shows it, which is why the measure is read against revenue growth rather than alone.</p></div>`,
    },
    questions: [
      {
        n: 1,
        question: "On 1 March a business pays 90,000 rupees for six months of rent. At the 31 March year end, the correct treatment is:",
        options: [
          "Rent expense 15,000 and a prepayment asset of 75,000",
          "Rent expense 90,000, because the money has been paid",
          "Rent expense nil and a prepayment of 90,000",
          "Rent expense 15,000 and an accrued liability of 75,000",
        ],
        answer: 0,
        explanation:
          "One of the six months falls in this year, so 15,000 is this year's cost and the remaining 75,000 is a benefit still to come, which is an asset. The last option gets the split right but calls it a liability, when in fact the business has paid rather than owing.",
        difficulty: "Medium",
        skill: "Prepayment",
      },
      {
        n: 2,
        question: "A March electricity bill of 8,000 rupees arrives on 12 April, after the year end. It should be:",
        options: [
          "Accrued in March: debit Electricity, credit accrued liabilities",
          "Recorded in April, because that is when the bill arrived",
          "Ignored, because no cash moved in March",
          "Split equally between March and April",
        ],
        answer: 0,
        explanation:
          "The electricity was consumed in March, so the cost belongs to March regardless of when the invoice or the payment follows. Waiting for the bill would understate March's expenses and overstate April's, and the adjustment reverses next period.",
        difficulty: "Easy",
        skill: "Accrual",
      },
      {
        n: 3,
        question: "A gym collects 24,000 rupees in March for a twelve month membership starting 1 April. In the March accounts this is:",
        options: [
          "A liability of 24,000, because nothing has been delivered yet",
          "Revenue of 24,000, because the cash has been banked",
          "Revenue of 2,000 and a liability of 22,000",
          "An asset of 24,000 and no revenue",
        ],
        answer: 0,
        explanation:
          "The membership year has not begun, so the gym owes twelve months of service and has earned nothing. The whole amount is income received in advance. Option three would be right if the membership had started on 1 March, which is the detail that decides it.",
        difficulty: "Hard",
        skill: "Matching principle",
      },
      {
        n: 4,
        question: "Why is a reversing entry on the first day of the new period a useful habit?",
        options: [
          "The real invoice can then be posted in full without anyone recalling the estimate",
          "It removes the need to make accruals at all",
          "It prevents the trial balance from going out of balance",
          "It converts the accrual into a prepayment automatically",
        ],
        answer: 0,
        explanation:
          "If the estimate is cleared automatically, the arriving invoice is just a normal posting. Releasing accruals by hand against invoices works until the person who made the estimate leaves, and it is a reliable way to recognise one expense twice.",
        difficulty: "Hard",
        skill: "Adjusting entry",
      },
      {
        n: 5,
        question: "Leaving the purchase ledger open for an extra week after the year end would:",
        options: [
          "Pull some of next year's costs into this year, overstating this year's expenses",
          "Have no effect, since the invoices are dated correctly",
          "Improve this year's reported profit",
          "Only matter if the amounts are immaterial",
        ],
        answer: 0,
        explanation:
          "Costs relating to the new period get recorded in the old one, which overstates current expenses and understates current profit. No individual entry is false, which is precisely why cut-off is tested by tracing to delivery dates rather than by checking invoices.",
        difficulty: "Medium",
        skill: "Accounting period",
      },
    ],
    worksheets: [
      {
        n: 1,
        title: "Four year-end adjustments",
        difficulty: "Medium",
        brief: `<p>Sunrise Stationers closes its books on 31 March. The bookkeeper has drafted the figures but has made none of the year-end adjustments. For each item below, enter the amount that belongs in this year's profit and loss account, and the amount that should sit on the balance sheet, choosing whether it is an asset or a liability.</p>
<ol>
<li><strong>Rent.</strong> Paid 1,44,000 rupees on 1 January covering twelve months from that date.</li>
<li><strong>Electricity.</strong> Bills paid during the year total 52,000 rupees. The March bill of 9,000 rupees arrived on 10 April and is unpaid.</li>
<li><strong>Insurance.</strong> Paid 36,000 rupees on 1 October for a twelve month policy from that date.</li>
<li><strong>Shop sublet.</strong> A tenant paid 60,000 rupees on 1 February for six months of sublet from that date. The whole amount was credited to Rent Received.</li>
</ol>
<p>Use whole months. The balance sheet column takes a positive figure in all four rows; the dropdown is where you say whether it is an asset or a liability.</p>`,
        stubLabel: "Item",
        columns: [
          { key: "pl", label: "This year's P&L (₹)", type: "number", align: "right", flex: 1.2 },
          { key: "bs", label: "Balance sheet (₹)", type: "number", align: "right", flex: 1.2 },
          { key: "type", label: "Asset or liability", type: "select", options: ["Asset", "Liability"], flex: 1.3 },
        ],
        rows: [
          { key: "rent", label: "1. Rent paid", given: { } },
          { key: "elec", label: "2. Electricity" },
          { key: "ins", label: "3. Insurance" },
          { key: "sublet", label: "4. Rent received" },
        ],
        cells: [
          {
            row: "rent",
            col: "pl",
            expected: 36000,
            marks: 2,
            feedback:
              "The twelve months run from 1 January, so only January, February and March fall in this year. Three months of 12,000 is 36,000.",
          },
          {
            row: "rent",
            col: "bs",
            expected: 108000,
            marks: 2,
            feedback: "Nine months of the year remain unused, which is 1,08,000 of prepaid rent.",
          },
          { row: "rent", col: "type", expected: "Asset", marks: 1, feedback: "Rent paid for a period still to come is a benefit owed to you, so it is an asset." },
          {
            row: "elec",
            col: "pl",
            expected: 61000,
            marks: 2,
            feedback:
              "The 52,000 actually paid plus the 9,000 March bill that was consumed this year but invoiced next. The cost follows consumption, not the invoice.",
          },
          { row: "elec", col: "bs", expected: 9000, marks: 2 },
          { row: "elec", col: "type", expected: "Liability", marks: 1, feedback: "You have had the electricity and not paid for it, so you owe the amount: an accrued liability." },
          {
            row: "ins",
            col: "pl",
            expected: 18000,
            marks: 2,
            feedback: "October to March is six of the twelve months, so half of 36,000 belongs to this year.",
          },
          { row: "ins", col: "bs", expected: 18000, marks: 2 },
          { row: "ins", col: "type", expected: "Asset", marks: 1 },
          {
            row: "sublet",
            col: "pl",
            expected: 20000,
            marks: 2,
            feedback:
              "February and March are two of the six months, so 20,000 has been earned. The rest is money held for a service not yet given.",
          },
          { row: "sublet", col: "bs", expected: 40000, marks: 2 },
          {
            row: "sublet",
            col: "type",
            expected: "Liability",
            marks: 1,
            feedback:
              "Four months of sublet are still owed to the tenant, so the 40,000 is income received in advance, which is a liability and not revenue.",
          },
        ],
        invariants: [
          {
            key: "total-split",
            label: "Nothing has been lost in the split",
            kind: "column-total",
            cols: ["pl"],
            value: 135000,
            marks: 3,
            hint: "The four profit and loss figures should come to 1,35,000 in total. If they do not, one of the four has been apportioned over the wrong number of months, and the month count is the thing to re-check rather than the arithmetic.",
          },
        ],
        hints: [
          "Count months, not days, and count only the months that fall on or before 31 March. Three of these four periods straddle the year end.",
          "Two of these are things you have paid for and not yet used, which makes them assets. One is something you have used and not paid for. One is money you have taken for a service you have not yet given.",
          "Item 4 is the one that catches people. The whole 60,000 was credited to Rent Received, so you are correcting an overstatement of income: only February and March were earned, which is 20,000, and the other 40,000 is a liability to the tenant.",
        ],
        workedAnswer: `<table>
<tr><th>Item</th><th class="num">P&amp;L</th><th class="num">Balance sheet</th><th>Classification</th></tr>
<tr><td>Rent paid</td><td class="num">36,000</td><td class="num">1,08,000</td><td>Prepaid expense (asset)</td></tr>
<tr><td>Electricity</td><td class="num">61,000</td><td class="num">9,000</td><td>Accrued expense (liability)</td></tr>
<tr><td>Insurance</td><td class="num">18,000</td><td class="num">18,000</td><td>Prepaid expense (asset)</td></tr>
<tr><td>Rent received</td><td class="num">20,000</td><td class="num">40,000</td><td>Income in advance (liability)</td></tr>
<tr><td><strong>Total to P&amp;L</strong></td><td class="num"><strong>1,35,000</strong></td><td class="num"></td><td></td></tr>
</table>
<p><strong>The four adjusting entries.</strong> Debit Prepaid Rent 1,08,000, credit Rent Expense. Debit Electricity 9,000, credit Accrued Expenses. Debit Prepaid Insurance 18,000, credit Insurance. Debit Rent Received 40,000, credit Income Received in Advance.</p>
<p><strong>Why item four is the dangerous one.</strong> The other three affect expenses, and getting one wrong moves profit by a few tens of thousands. Item four affects revenue, and treating the whole 60,000 as earned is the pattern that destroys young subscription businesses: a year of income recognised in the month it was collected, followed by eleven months reporting nothing while the service is actually being delivered. The liability is not a technicality, it is a genuine obligation to provide four more months of premises.</p>
<p><strong>Every one of these reverses.</strong> On 1 April the prepaid rent becomes rent expense as the months are used, the accrued electricity is cleared by the arriving bill, and the deferred sublet income is earned month by month. If the entries are reversed automatically on day one of the new year, the real invoices can be posted in full without anyone needing to remember what was estimated, which is the habit that stops a cost being recognised twice.</p>`,
        minutes: 24,
        skills: ["Accrual", "Prepayment", "Matching principle"],
      },
    ],
  },

  /* ===================================================================== */
  5075: {
    topicId: 5075,
    title: "Depreciation: straight line and written down value",
    summary:
      "An asset wears out whether or not you write anything down. Depreciation is the entry that admits it, and the method you pick changes every year's profit.",
    concepts: ["Depreciation", "Straight line method", "Written down value", "Residual value", "Carrying amount"],
    glossary: {
      Depreciation: "The systematic allocation of an asset's cost over the periods that benefit from using it.",
      "Straight line method": "An equal charge each year, computed on cost less residual value divided by useful life.",
      "Written down value": "A fixed percentage applied each year to the reducing carrying amount, so the charge falls over time.",
      "Residual value": "What the asset is expected to fetch at the end of its useful life with the business.",
      "Carrying amount": "Cost less accumulated depreciation: the figure the asset appears at in the balance sheet.",
      "Accumulated depreciation": "The running total of all depreciation charged on an asset since it was bought.",
    },
    body: {
      Beginner: `<p>You buy a delivery van for 6,00,000 rupees. You will use it for five years and then sell it for about 1,00,000. Has the van cost you 6,00,000 this year?</p>
<div class="key-idea"><span class="callout-label">No. You used up one fifth of it</span><p>The cost belonging to this year is one fifth of what you will never get back: 6,00,000 less 1,00,000, so 5,00,000 over five years, which is 1,00,000 a year. That annual charge is depreciation.</p></div>
<h3>Two ways to spread it</h3>
<table>
<tr><th>Method</th><th>How it charges</th><th>Year one on this van</th></tr>
<tr><td>Straight line</td><td>The same amount every year</td><td class="num">1,00,000</td></tr>
<tr><td>Written down value</td><td>A fixed percentage of what it is currently worth in the books</td><td class="num">1,80,000</td></tr>
</table>
<div class="field"><span class="callout-label">What depreciation is not</span><p>It is not a guess about the van's market price. It spreads a cost you have already paid. The van does not become more depreciated because second-hand prices fell.</p></div>`,
      Intermediate: `<p>Depreciation allocates the cost of a long-lived asset across the periods that benefit from it, which is the matching principle applied to something used over years rather than months.</p>
<h3>The entry, and why it uses a contra account</h3>
<p>Debit depreciation expense, credit accumulated depreciation. Accumulated depreciation is a contra-asset rather than a reduction of the asset's cost, so the original cost and the wear on it stay separately visible.</p>
<h3>Which pattern suits which asset</h3>
<table>
<tr><th>If the asset</th><th>Use</th><th>Because</th></tr>
<tr><td>Delivers the same service every year</td><td>Straight line</td><td>A building, a shop fitting</td></tr>
<tr><td>Is most productive when new, with rising repairs</td><td>Reducing balance</td><td>Depreciation plus repairs stays level across its life</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Neither is more accurate</span><p>Both allocate the same total cost in different patterns. The question is which pattern matches how the benefit is consumed.</p></div>
<h3>Three estimates, not three facts</h3>
<p>Useful life, residual value and method are all estimates. Changing any of them changes reported profit, and under Ind AS 16 each is reviewed at least annually, with a change treated as a change in estimate applied prospectively rather than by restating the past.</p>`,
      Advanced: `<p>The written down value rate that fully depreciates an asset to its residual value over its life is determinable rather than conventional: r equals one minus the nth root of residual over cost.</p>
<div class="worked"><span class="callout-label">Why Schedule II rates are not round numbers</span><p>For a 6,00,000 van with a 1,00,000 residual over five years, that is one minus the fifth root of one sixth, about 30.1%. Each published rate encodes an assumed life and residual, and reading them as arbitrary percentages hides what they are made of.</p></div>
<h3>Component accounting changes the answer</h3>
<p>Where parts of an asset have significantly different useful lives and costs significant relative to the whole, each is depreciated separately. An aircraft engine, a building's lifts and a plant's refractory lining all have lives unrelated to the structure around them. Treating the asset as a single unit both understates early depreciation and converts a later replacement into a repair that should have been a derecognition.</p>
<h3>Depreciation and impairment are independent</h3>
<p>Depreciation is a systematic allocation, indifferent to current value. Impairment under Ind AS 36 is a write-down to recoverable amount when the carrying amount is no longer supportable. An asset can be fully depreciated and still productive, or newly bought and already impaired.</p>
<div class="warning"><span class="callout-label">Your books and your tax computation will never agree</span><p>The Income Tax Act prescribes block-of-assets written down value rates regardless of the book method, so the two differ by design and the gap is a timing difference producing deferred tax. Hunting for the error that reconciles them is a long and fruitless exercise.</p></div>`,
      Expert: `<p>Ind AS 16 asks the method to reflect the pattern in which the asset's future economic benefits are expected to be consumed. That framing makes unit-of-production the conceptually cleanest where output is measurable, and it also makes the revenue-based method prohibited, since revenue reflects price and volume together rather than consumption.</p>
<div class="field"><span class="callout-label">Why the prohibition exists</span><p>Revenue-based depreciation was being used to smooth margins.</p></div>
<h3>Deferred tax, derived rather than memorised</h3>
<p>Where the tax written down value falls faster than the book carrying amount, the asset's tax base is lower than its carrying amount, giving a taxable temporary difference and a deferred tax liability under Ind AS 12. It unwinds over the asset's life as the book charge overtakes the tax charge, so a capital-intensive business in a growth phase accumulates these liabilities and one that has stopped investing releases them.</p>
<div class="warning"><span class="callout-label">A frequent analytical error</span><p>Reading a rising deferred tax liability as a warning sign rather than as evidence of investment.</p></div>
<h3>Component accounting meets derecognition</h3>
<p>If a component was never separately identified, replacing it has no carrying amount to remove, so the replacement either gets expensed, understating the asset, or capitalised on top of an undepreciated whole, double counting the part. Ind AS 16 permits using the replacement's cost as an indication of the replaced part's original cost, which is a pragmatic fiction and the only workable answer.</p>
<h3>The governance consequence of prospective treatment</h3>
<p>Extending a useful life reduces the annual charge immediately and never requires restating prior periods, so it is an available and entirely legal lever on reported profit. The control is disclosure plus a reviewer asking what changed about the asset, and life extensions concentrated in weak years are a recognised earnings-management signature.</p>`,
    },
    worksheets: [
      {
        n: 1,
        title: "Depreciate the same van two ways",
        difficulty: "Medium",
        brief: `<p>Sunrise Stationers buys a delivery van on 1 April for <strong>6,00,000 rupees</strong>. It expects to use it for <strong>five years</strong> and then sell it for about <strong>1,00,000 rupees</strong>.</p>
<p>Complete both schedules below for the first three years.</p>
<p><strong>Left pair of columns, straight line.</strong> An equal charge each year on cost less residual value.</p>
<p><strong>Right pair of columns, written down value at 30%.</strong> Thirty per cent of the carrying amount at the start of each year, so the charge falls as the carrying amount does. Round each figure to the nearest rupee.</p>
<p>The closing carrying amount of one year is the opening figure of the next, so an error in year one travels down the column. The marker knows that: a figure that is right given your own earlier number keeps most of its marks.</p>`,
        stubLabel: "Year",
        columns: [
          { key: "slc", label: "SLM charge (₹)", type: "number", align: "right", flex: 1.1 },
          { key: "slv", label: "SLM carrying amount (₹)", type: "number", align: "right", flex: 1.3 },
          { key: "wdc", label: "WDV charge (₹)", type: "number", align: "right", flex: 1.1 },
          { key: "wdv", label: "WDV carrying amount (₹)", type: "number", align: "right", flex: 1.3 },
        ],
        rows: [
          { key: "y0", label: "At purchase", given: { slc: "", slv: 600000, wdc: "", wdv: 600000 } },
          { key: "y1", label: "Year 1" },
          { key: "y2", label: "Year 2" },
          { key: "y3", label: "Year 3" },
        ],
        cells: [
          {
            row: "y1",
            col: "slc",
            expected: 100000,
            marks: 2,
            feedback: "Cost 6,00,000 less residual 1,00,000 is 5,00,000, spread over five years: 1,00,000 a year.",
          },
          {
            row: "y1",
            col: "slv",
            expected: 500000,
            marks: 2,
            derivedFrom: { op: "difference", from: ["y0:slv", "y1:slc"] },
            methodMarks: 1,
          },
          {
            row: "y1",
            col: "wdc",
            expected: 180000,
            marks: 2,
            feedback: "Thirty per cent of the full 6,00,000, because nothing has been written off yet. Residual value plays no part in the reducing balance charge.",
          },
          {
            row: "y1",
            col: "wdv",
            expected: 420000,
            marks: 2,
            derivedFrom: { op: "difference", from: ["y0:wdv", "y1:wdc"] },
            methodMarks: 1,
          },
          { row: "y2", col: "slc", expected: 100000, marks: 1, feedback: "Straight line means the same charge every year, so year two matches year one." },
          {
            row: "y2",
            col: "slv",
            expected: 400000,
            marks: 2,
            derivedFrom: { op: "difference", from: ["y1:slv", "y2:slc"] },
            methodMarks: 1,
          },
          {
            row: "y2",
            col: "wdc",
            expected: 126000,
            marks: 2,
            derivedFrom: { op: "product", from: ["y1:wdv"], factor: 0.3 },
            methodMarks: 1,
            feedback: "Thirty per cent of the 4,20,000 carried forward, not of the original cost. This is the step people get wrong.",
          },
          {
            row: "y2",
            col: "wdv",
            expected: 294000,
            marks: 2,
            derivedFrom: { op: "difference", from: ["y1:wdv", "y2:wdc"] },
            methodMarks: 1,
          },
          { row: "y3", col: "slc", expected: 100000, marks: 1 },
          {
            row: "y3",
            col: "slv",
            expected: 300000,
            marks: 2,
            derivedFrom: { op: "difference", from: ["y2:slv", "y3:slc"] },
            methodMarks: 1,
          },
          {
            row: "y3",
            col: "wdc",
            expected: 88200,
            marks: 2,
            derivedFrom: { op: "product", from: ["y2:wdv"], factor: 0.3 },
            methodMarks: 1,
          },
          {
            row: "y3",
            col: "wdv",
            expected: 205800,
            marks: 2,
            derivedFrom: { op: "difference", from: ["y2:wdv", "y3:wdc"] },
            methodMarks: 1,
          },
        ],
        invariants: [
          {
            key: "slm-total",
            label: "Three years of straight line charges",
            kind: "column-total",
            cols: ["slc"],
            value: 300000,
            marks: 3,
            hint: "Straight line charges the same figure every year, so three years should total exactly three times the annual charge. If this does not come to 3,00,000, the depreciable amount has probably been taken as the full cost rather than cost less residual value.",
          },
        ],
        hints: [
          "Straight line uses cost less residual value. Written down value ignores residual value entirely and works on the carrying amount.",
          "For the reducing balance column, each year's charge is 30% of the figure in the carrying amount cell directly above it, not 30% of 6,00,000.",
          "Year 2 written down value: 30% of 4,20,000 is 1,26,000, leaving 2,94,000. Year 3: 30% of 2,94,000 is 88,200, leaving 2,05,800. The charge falls every year, which is the whole point of the method.",
        ],
        workedAnswer: `<table>
<tr><th>Year</th><th class="num">SLM charge</th><th class="num">SLM carrying</th><th class="num">WDV charge</th><th class="num">WDV carrying</th></tr>
<tr><td>At purchase</td><td class="num"></td><td class="num">6,00,000</td><td class="num"></td><td class="num">6,00,000</td></tr>
<tr><td>1</td><td class="num">1,00,000</td><td class="num">5,00,000</td><td class="num">1,80,000</td><td class="num">4,20,000</td></tr>
<tr><td>2</td><td class="num">1,00,000</td><td class="num">4,00,000</td><td class="num">1,26,000</td><td class="num">2,94,000</td></tr>
<tr><td>3</td><td class="num">1,00,000</td><td class="num">3,00,000</td><td class="num">88,200</td><td class="num">2,05,800</td></tr>
</table>
<p><strong>The same van, two profit figures.</strong> In year one the method choice changes the charge by 80,000 rupees, which for a small business is the difference between a good year and an average one. By year three the reducing balance charge has fallen below the straight line one. Neither schedule is more correct: both allocate a cost that has already been paid, and the total allocated over the asset's whole life is the same money.</p>
<p><strong>Why 30% and not 20%.</strong> The rate that writes an asset down to its residual value over its life is one minus the nth root of residual divided by cost. Here that is one minus the fifth root of 1,00,000 over 6,00,000, which is about 30.1%. This is why the rates published in Schedule II of the Companies Act are never round figures: each one encodes an assumed life and an assumed residual, and reading them as arbitrary percentages hides what they are made of.</p>
<p><strong>Which to choose.</strong> Match the pattern to how the benefit is consumed. The van is most useful when new and its repair bills climb with age, so reducing balance keeps the combined charge of depreciation plus repairs more level across the five years. A shop fitting that delivers the same service every year suits straight line. That is the actual test under Ind AS 16, which asks the method to reflect the pattern of consumption rather than to be conventional.</p>
<p><strong>One thing this schedule will never agree with.</strong> Your tax computation. The Income Tax Act applies block-of-assets written down value rates regardless of the method in your books, so the two charges differ by design and the gap is a timing difference that produces deferred tax. Hunting for the error that reconciles them is a long and fruitless exercise.</p>`,
        minutes: 26,
        skills: ["Depreciation", "Straight line method", "Written down value"],
      },
    ],
  },
  /* ===================================================================== */
  5076: {
    topicId: 5076,
    title: "Bad debts, provisions and the judgement involved",
    summary:
      "Some customers will never pay. Deciding which ones, and when to admit it, is the first place accounting stops being arithmetic.",
    concepts: [
      "Bad debt",
      "Provision for doubtful debts",
      "Prudence",
      "Ageing analysis",
      "Recovery",
      "Expected credit loss",
    ],
    glossary: {
      "Bad debt": "A receivable identified as unrecoverable and removed from the books.",
      "Provision for doubtful debts": "An estimate against receivables that may not be collected, without naming them as lost.",
      Prudence: "Exercising caution in judgements so that assets and income are not overstated.",
      "Ageing analysis": "A breakdown of receivables by how long they have been outstanding.",
      Recovery: "A payment received on a debt previously written off.",
      "Expected credit loss": "A forward-looking estimate of the credit losses a portfolio of receivables will suffer.",
    },
    body: {
      Beginner: `<p>You sold goods for 40,000 rupees to a shop that has now closed down and the owner is not answering. Your books still show that someone owes you 40,000. Do they?</p>
<div class="key-idea"><span class="callout-label">No, and keeping it makes you look richer than you are</span><p>Remove it: the receivable goes down by 40,000 and you record a 40,000 expense called bad debts. That is a write-off, and you do it when you are reasonably sure a specific customer will not pay.</p></div>
<h3>The softer version</h3>
<p>Across all your customers you know from experience that some proportion never pays, even though you cannot yet say which ones. For that you make a provision: a cushion against the total, which reduces the receivables figure without accusing any particular customer.</p>
<div class="field"><span class="callout-label">When somebody pays after a write-off</span><p>It happens. Record the receipt as income in the year it arrives rather than quietly undoing the write-off, because the write-off was a reasonable judgement at the time.</p></div>`,
      Intermediate: `<p>A write-off is specific and a provision is general, and keeping them apart matters because they answer different questions.</p>
<table>
<tr><th></th><th>Write-off</th><th>Provision</th></tr>
<tr><td>Scope</td><td>One named receivable</td><td>The remaining portfolio</td></tr>
<tr><td>Entry</td><td>Dr Bad Debts, Cr Trade Receivables</td><td>Dr Bad Debt Expense, Cr Provision</td></tr>
<tr><td>Effect on the customer account</td><td>Disappears</td><td>Untouched</td></tr>
</table>
<div class="warning"><span class="callout-label">The commonest error in this area</span><p>The provision is adjusted, not recreated. If last year's was 30,000 and this year's required figure is 42,000, only the 12,000 increase hits the profit and loss account. Charging the whole 42,000 again double counts.</p></div>
<h3>Base the estimate on ageing, not a round percentage</h3>
<p>Receivables are grouped by how long they have been outstanding and historical recovery rates applied to each band, because a balance 180 days old is a different risk from one 20 days old. A flat 5% of total receivables is defensible only where nothing better exists, and it reliably understates the provision of a business whose collection is deteriorating.</p>
<h3>What prudence actually licenses</h3>
<p>It sets the direction of error: where judgement is genuinely balanced, do not overstate the asset. It does not license deliberate understatement, and modern standards are explicit that prudence means caution rather than pessimism.</p>`,
      Advanced: `<p>Ind AS 109 replaced the incurred-loss model with expected credit losses, and for trade receivables it permits a simplified approach: recognise lifetime expected losses from the outset, typically through a provision matrix built from ageing bands and observed historical loss rates.</p>
<div class="key-idea"><span class="callout-label">A consequence worth stating plainly</span><p>A provision now exists against receivables that are not yet overdue. Businesses moving to this basis usually see the provision rise, and the increase is a change in measurement rather than evidence of deteriorating customers.</p></div>
<h3>The forward-looking adjustment is where it gets fudged</h3>
<p>Historical loss rates embed the conditions that produced them, so applying 2019 rates to a sector in contraction understates losses. The standard asks for reasonable and supportable information without undue cost, which is an invitation to judgement, and the defensible implementation documents the adjustment and its basis rather than picking a number.</p>
<h3>Two mechanical traps</h3>
<p>The provision must be adjusted to the required closing figure with only the movement charged, and the GST on a written-off debt is not recoverable merely because the customer failed to pay, so the write-off is of the gross amount. A recovery on a previously written-off debt is credited to income in the year received, not back to the customer account.</p>
<div class="warning"><span class="callout-label">The signal auditors look for</span><p>Receivable days lengthening while the provision rate stays flat. The business is either unusually lucky or not revising its estimate, and the second explanation is far more common.</p></div>`,
      Expert: `<p>The expected credit loss model is a probability-weighted estimate of cash shortfalls discounted at the original effective interest rate. The simplified matrix for trade receivables is a permitted shortcut rather than a different concept, and understanding it as a shortcut matters because the matrix's assumptions remain the model's assumptions.</p>
<h3>What the matrix assumes, and where each assumption fails</h3>
<table>
<tr><th>Assumption</th><th>Violated when</th></tr>
<tr><td>Ageing is a sufficient statistic for credit risk</td><td>A large balance is current but the counterparty is distressed</td></tr>
<tr><td>Historical rates are unbiased within a band</td><td>Conditions have shifted since the sample</td></tr>
<tr><td>Forward adjustment applies at portfolio level</td><td>Concentration, which the matrix cannot represent at all</td></tr>
</table>
<div class="key-idea"><span class="callout-label">Concentration is the practical limit</span><p>A portfolio where one customer is 40% of receivables has a loss distribution dominated by a single Bernoulli event. A matrix built on average rates returns an estimate that is right on average and wrong in every actual state of the world.</p></div>
<h3>A presentation boundary worth naming</h3>
<p>Under Ind AS 115 a receivable is recognised at the transaction price, and expected credit losses are presented separately as an impairment loss rather than as a reduction of revenue. That keeps the top line a statement about what was sold and pushes collectability into its own line.</p>
<div class="field"><span class="callout-label">What an experienced reviewer tests first</span><p>Not the level of the provision but whether the methodology changed, because an unexplained change in method is a stronger signal than any level. The controls that constrain this lever are the ones that make the estimate reproducible: a documented matrix, consistent application, and retrospective comparison of prior provisions against subsequent write-offs.</p></div>`,
    },
    questions: [
      {
        n: 1,
        question: "Last year's provision for doubtful debts was 30,000 rupees. This year the required provision is 42,000. The charge to the profit and loss account is:",
        options: ["12,000", "42,000", "30,000", "72,000"],
        answer: 0,
        explanation:
          "The provision is adjusted to the closing figure, so only the 12,000 increase is an expense this year. Charging the full 42,000 again double counts the 30,000 that was already expensed last year, and it is the most common error in this area.",
        difficulty: "Medium",
        skill: "Provision for doubtful debts",
      },
      {
        n: 2,
        question: "A customer whose 25,000 rupee balance was written off two years ago suddenly pays in full. The correct entry is:",
        options: [
          "Debit Bank, credit Bad Debts Recovered as income this year",
          "Debit Bank, credit Trade Receivables, reversing the original write-off",
          "Debit Bank, credit Capital, since it is a windfall",
          "No entry; the debt no longer exists in the books",
        ],
        answer: 0,
        explanation:
          "The receipt is income in the year it arrives. Reinstating the receivable would imply the original write-off was an error, when in fact it was a reasonable judgement on the information available then, and the money has in any case already been received.",
        difficulty: "Medium",
        skill: "Recovery",
      },
      {
        n: 3,
        question: "Why is an ageing analysis a better basis for a provision than a flat percentage of total receivables?",
        options: [
          "Because risk differs sharply by how long a balance has been outstanding",
          "Because it produces a larger provision, which is more prudent",
          "Because accounting standards prohibit flat percentages",
          "Because it removes the need for any judgement",
        ],
        answer: 0,
        explanation:
          "A balance 180 days old carries a very different recovery probability from one 20 days old, and a flat rate averages them away. It is not about producing a bigger number, and judgement is still needed to set the rate for each band and to adjust for conditions ahead.",
        difficulty: "Medium",
        skill: "Ageing analysis",
      },
      {
        n: 4,
        question: "A business's receivable days have grown from 42 to 71 over two years while its provision rate has stayed at 3%. The most likely explanation is:",
        options: [
          "The provision has not been revised to reflect slower collection",
          "The customers have become more creditworthy",
          "The 3% rate is mandated and cannot be changed",
          "Receivable days have no relationship to credit risk",
        ],
        answer: 0,
        explanation:
          "A lengthening collection period with a flat provision rate means the estimate is not tracking the portfolio. It is a standard audit risk indicator because the provision is the most available lever on reported profit in a receivables-heavy business.",
        difficulty: "Hard",
        skill: "Prudence",
      },
      {
        n: 5,
        question: "Under the expected credit loss approach, a provision may be carried against receivables that:",
        options: [
          "Are not yet overdue at all",
          "Have been outstanding more than 180 days only",
          "Belong to customers who have formally defaulted",
          "Are secured by a bank guarantee",
        ],
        answer: 0,
        explanation:
          "Expected credit loss is forward looking, so a lifetime estimate applies from the outset and not only once a balance has aged. Businesses moving onto this basis usually see the provision rise, and that increase is a change in measurement rather than a deterioration in customers.",
        difficulty: "Hard",
        skill: "Expected credit loss",
      },
      {
        n: 6,
        question: "Writing off a bad debt has what effect on the accounting equation?",
        options: [
          "Assets fall and equity falls by the same amount",
          "Assets fall and liabilities fall by the same amount",
          "Assets are unchanged; only the receivables mix changes",
          "Equity falls and liabilities rise",
        ],
        answer: 0,
        explanation:
          "The receivable disappears, so assets fall, and the write-off is an expense, which reduces profit and therefore equity. Both sides of the identity move by the same figure, as they must.",
        difficulty: "Easy",
        skill: "Bad debt",
      },
    ],
    scenarios: [
      {
        n: 1,
        title: "The customer who has gone quiet",
        blurb:
          "A 2,40,000 rupee balance is 210 days old and the owner wants this year's profit to look strong for a loan application. Both of those facts are about the same number.",
        role: "You are the accountant preparing the year-end accounts of a small trading firm.",
        start: "q1",
        minutes: 14,
        idealPath: ["q1", "q2", "q3"],
        nodes: [
          {
            id: "q1",
            situation: `<p>It is 10 April. You are closing the March accounts. Eastern Hardware owes 2,40,000 rupees against an invoice dated 1 September, so the balance is 210 days old. Your last four emails have gone unanswered and their landline rings out.</p>
<p>The firm's draft profit is 6,10,000 rupees. The owner mentioned this morning that the bank wants the accounts for a working capital renewal and that "a strong year would help".</p>`,
            prompt: "What is your first move?",
            choices: [
              {
                id: "a",
                label: "Find out what is actually happening at Eastern Hardware before deciding anything",
                outcome:
                  "You check the GST portal and find their registration is still active and they filed a return last month. A call to a mutual supplier tells you Eastern Hardware is trading but has lost a big contract and is paying everyone late. That is a very different situation from a closed business, and it is now a question of recoverability rather than of existence.",
                next: "q2",
                delta: 3,
                cost: { minutes: 45 },
              },
              {
                id: "b",
                label: "Write the whole 2,40,000 off as a bad debt now",
                outcome:
                  "Prudent sounding, but you have written off a debt owed by a business that is still trading and still filing returns, on the strength of four unanswered emails. You have understated profit by 2,40,000 and you have given up a claim that may well be collectable. Prudence means caution, not pessimism.",
                next: "q4",
                delta: -1,
                cost: { minutes: 10 },
              },
              {
                id: "c",
                label: "Leave the balance at full value; nothing is formally in default",
                outcome:
                  "The accounts go out showing a 2,40,000 asset against a customer who has not responded in four months. Nothing is formally in default, which is exactly the argument the incurred-loss model used to permit and which the expected credit loss approach exists to close.",
                next: "q4",
                delta: -2,
                cost: { minutes: 2 },
              },
              {
                id: "d",
                label: "Ask the owner what provision he would like to see",
                outcome:
                  "He suggests nothing at all this year, given the loan application. You now have a documented instruction to understate a provision in accounts going to a lender, which is worse for you than having never asked.",
                next: "q4",
                delta: -3,
                cost: { minutes: 15 },
                violation:
                  "The provision was set to suit a loan application rather than to reflect recoverability.",
              },
            ],
          },
          {
            id: "q2",
            situation: `<p>So: a trading customer, late with everyone, 210 days outstanding, no formal default. You pull the ageing analysis for the whole receivables ledger and the firm's own history of recovery by band.</p>
<table>
<tr><th>Age</th><th class="num">Balance</th><th class="num">Historic recovery</th></tr>
<tr><td>0 to 30 days</td><td class="num">8,40,000</td><td class="num">99%</td></tr>
<tr><td>31 to 90 days</td><td class="num">3,10,000</td><td class="num">96%</td></tr>
<tr><td>91 to 180 days</td><td class="num">1,20,000</td><td class="num">82%</td></tr>
<tr><td>Over 180 days</td><td class="num">2,95,000</td><td class="num">45%</td></tr>
</table>`,
            prompt: "How do you measure the provision?",
            choices: [
              {
                id: "a",
                label: "Assess Eastern Hardware individually, and use the matrix for everyone else",
                outcome:
                  "Eastern Hardware is 2,40,000 of the 2,95,000 in the oldest band, so the band average is really a statement about one customer. You assess them individually at a 50% expected loss on the specific facts, and apply the matrix rates to the rest. The aggregate provision comes to about 1,43,000, and every component of it can be explained to a reviewer.",
                next: "q3",
                delta: 3,
                cost: { minutes: 60 },
              },
              {
                id: "b",
                label: "Apply the matrix rates to every band, including the oldest",
                outcome:
                  "Defensible and quick, giving a provision of around 1,45,000. The weakness is that 81% of the oldest band is one customer, so an average loss rate describes a portfolio that does not exist here. The number lands in roughly the right place for the wrong reason.",
                next: "q3",
                delta: 1,
                cost: { minutes: 25 },
              },
              {
                id: "c",
                label: "Use a flat 5% of total receivables",
                outcome:
                  "That gives 78,250 against a ledger with 2,95,000 sitting over 180 days and a 45% historic recovery rate in that band. The flat rate averages away the one fact that matters, and it understates the provision by roughly half.",
                next: "q3",
                delta: -1,
                cost: { minutes: 10 },
              },
            ],
          },
          {
            id: "q3",
            situation: `<p>You put the provision at 1,43,000 with a one page schedule: the matrix, the individual assessment of Eastern Hardware, and the GST and supplier evidence behind it. Profit falls to 4,67,000.</p>
<p>The owner is not pleased. You point out that the bank's analyst will run the ageing himself, and that a 2,40,000 balance over 180 days with no provision is the first thing he will ask about.</p>`,
            prompt: "",
            ending: {
              verdict: "ideal",
              title: "An estimate a reviewer can reproduce",
              debrief: `<p>The right answer here was never a number, it was a method. You established the facts before measuring anything, which turned "has this customer disappeared" into "how much of this will we collect", and those are different questions with different answers.</p>
<p>Assessing Eastern Hardware individually matters more than the arithmetic. They are 81% of the oldest ageing band, so the band's 45% average recovery rate is a statement about one customer dressed up as a portfolio statistic. A matrix cannot represent concentration, and where one balance dominates a band the loss distribution is a single event rather than an average. Individual assessment of significant balances alongside a matrix for the remainder is both the defensible treatment and the one that can be explained line by line.</p>
<p>On the owner's request: notice that the version of this that ends badly is not refusing him, it is asking him. A documented instruction to set a provision at a level that suits a loan application converts your professional judgement into somebody else's commercial preference, in writing, in accounts going to a lender. The argument that actually worked was not an ethical one, it was that the bank's own analyst will run the ageing, and an unprovided 210 day balance is the first question he asks.</p>
<p>What to do in May: compare this provision against what is actually recovered. A retrospective check of prior estimates against subsequent write-offs is the single most useful piece of evidence that your method is calibrated, and it is the thing an experienced reviewer asks for before looking at the level of the provision at all.</p>`,
            },
          },
          {
            id: "q4",
            situation: `<p>The accounts have been finalised on a figure that was not arrived at by assessing recoverability: either nothing provided against a 210 day balance, the whole amount written off against a trading customer, or a provision chosen to suit a loan application.</p>`,
            prompt: "",
            ending: {
              verdict: "poor",
              title: "The number was decided before the question was asked",
              debrief: `<p>All three routes here share a shape: the provision was settled without establishing what was actually happening at Eastern Hardware. Twenty minutes on the GST portal and one call to a mutual supplier distinguished "closed down" from "trading but late", and those two facts justify completely different figures.</p>
<p>Writing the lot off is the error that feels safe and is not. Prudence sets the direction of error where judgement is genuinely balanced; it does not license writing off a claim against a business that is still filing returns. You have understated profit by 2,40,000 and weakened a collectable claim, and a reviewer comparing your write-offs against subsequent recoveries will find the pattern.</p>
<p>Carrying the balance at full value is the opposite error and the one the expected credit loss approach was written to close. "Nothing is formally in default" was a sufficient answer under the old incurred-loss model, and that is precisely why the model changed: it permitted a known-doubtful balance to sit at full value until the loss had already happened.</p>
<p>Asking the owner what provision he wanted is the only one of the three with a personal consequence for you. It produces a written record that the estimate in a set of accounts supporting a credit application was set to a commercial preference. The ask was the mistake, not his answer.</p>`,
            },
          },
        ],
        skills: ["Provision for doubtful debts", "Ageing analysis", "Prudence"],
      },
    ],
  },
  /* ===================================================================== */
  5077: {
    topicId: 5077,
    title: "Final accounts from a trial balance",
    summary:
      "The trial balance is a heap of balances. The final accounts are the two statements a bank, a tax officer and an owner all actually read.",
    concepts: ["Trading account", "Profit and loss account", "Gross profit", "Net profit", "Closing stock"],
    glossary: {
      "Trading account": "The first statement, which arrives at gross profit by setting sales against the cost of the goods sold.",
      "Profit and loss account": "The second statement, which takes gross profit and deducts every other expense to reach net profit.",
      "Gross profit": "Sales less the cost of the goods that were sold, before any overhead.",
      "Net profit": "What remains after every expense, including non-cash ones like depreciation.",
      "Closing stock": "Unsold goods at the period end, valued at the lower of cost and net realisable value.",
      "Cost of goods sold": "Opening stock plus purchases less closing stock.",
    },
    body: {
      Beginner: `<p>You now have a list of balances. Nobody reads a list of balances. What they read is two short statements: how much you made on the goods, and what was left after the bills.</p>
<h3>Statement one: the trading account</h3>
<p>Put your sales on one side. On the other put what those goods cost you: the stock you started with, plus what you bought, minus the stock still sitting unsold. The difference is gross profit.</p>
<h3>Statement two: the profit and loss account</h3>
<p>Start with that gross profit and take off everything else: rent, salaries, electricity, depreciation. What is left is net profit, and that is the figure people mean when they ask how the business did.</p>
<div class="warning"><span class="callout-label">Closing stock appears twice, and both are right</span><p>Once reducing your cost of goods in the trading account, and once as an asset on the balance sheet. The goods are both not-yet-a-cost and still-owned, which are two different statements saying two true things.</p></div>`,
      Intermediate: `<p>The trading account isolates trading margin from overhead, which is why it is kept separate rather than folded into one statement.</p>
<div class="key-idea"><span class="callout-label">Why the split earns its keep</span><p>A fall in profit can be attributed either to margin or to overhead, and those have entirely different remedies.</p></div>
<h3>Getting to gross profit</h3>
<table>
<tr><th>Line</th><th>Effect</th></tr>
<tr><td>Opening stock</td><td>Add to cost</td></tr>
<tr><td>Purchases</td><td>Add to cost</td></tr>
<tr><td>Closing stock</td><td>Deduct from cost</td></tr>
<tr><td>Sales less the above</td><td><strong>Gross profit</strong></td></tr>
</table>
<p>Expressing gross profit as a percentage of sales gives the most diagnostic ratio in a trading business, because it is largely insulated from overhead decisions and therefore comparable across years.</p>
<h3>The order to work in</h3>
<p>Accruals and prepayments, then depreciation, then bad debts and the provision, then closing stock, and only then draw up the statements. Attempting the statements first and adjusting afterwards is how figures get adjusted twice.</p>`,
      Advanced: `<p>Stock valuation is where the most judgement sits and where the most profit can be moved.</p>
<div class="warning"><span class="callout-label">Item by item, never in aggregate</span><p>Lower of cost and net realisable value applied to the total would let a write-down on one line be offset against an unrealised gain on another.</p></div>
<h3>Cost needs a flow assumption</h3>
<p>Ind AS 2 permits FIFO or weighted average and prohibits LIFO, which matters in an inflationary period because the choice changes both profit and the balance sheet figure.</p>
<h3>Why the extended trial balance survives software</h3>
<p>Ledger balances in one pair of columns, adjustments in the next, final figures in the last, with every judgement visible on one sheet and attributable to a person. A system that posts adjustments straight into the ledger produces the same statements and loses the audit surface, which is why practitioners who could skip the step do not.</p>
<h3>Gross margin analysis is the cheapest completeness check there is</h3>
<p>A margin that moves more than a point or two without an explanation in pricing, mix or input cost points at a short list: unrecorded sales, stock misstatement, purchases in the wrong period, or classification drift between trading and overhead. It is the first analytical procedure in most audit programmes for exactly that reason.</p>
<div class="field"><span class="callout-label">Presentation is not cosmetic</span><p>Schedule III prescribes the format for a company, including the current and non-current division. A set of accounts in a free format is not merely untidy, it is non-compliant.</p></div>`,
      Expert: `<p>The trading account is a presentational convention rather than a requirement of any standard, and Schedule III does not use it: a company reports revenue from operations, cost of materials consumed, changes in inventories and so on, from which gross margin is derivable but not stated.</p>
<div class="field"><span class="callout-label">Worth knowing before you open audited accounts</span><p>It is a teaching and management device. Looking for it in a filed set and not finding it is a predictable confusion.</p></div>
<h3>Inventory error is self-reversing, which is what makes it hard to see</h3>
<p>Overstating closing stock overstates this year's profit and understates next year's by the same amount, so a single misstatement cancels over two periods and is invisible to a year-on-year comparison. Net realisable value testing, and in particular slow-moving lines, is where the judgement concentrates; a provision policy driven by ageing bands is reproducible, while line-by-line optimism is not.</p>
<h3>Overhead absorption, and the constraint that stops an abuse</h3>
<p>For a manufacturer, Ind AS 2 requires conversion costs including a systematic allocation of fixed production overhead based on normal capacity. Producing below normal capacity therefore cannot be used to inflate unit cost and defer the shortfall into inventory. That deferral was a standard device for smoothing a bad year, and the normal-capacity constraint is the only thing stopping it.</p>
<h3>Decomposing a margin movement</h3>
<table>
<tr><th>Component</th><th>Persistence</th></tr>
<tr><td>Gross margin change</td><td>Tends to persist</td></tr>
<tr><td>Operating leverage</td><td>Reverses with volume</td></tr>
<tr><td>One-off items</td><td>Does not recur, by definition</td></tr>
</table>
<p>Presenting a profit movement without that decomposition is the most common failure in management reporting, and it is why a board can be surprised by a result fully visible in the margin two quarters earlier.</p>`,
    },
    worksheets: [
      {
        n: 1,
        title: "Trading and profit and loss account",
        difficulty: "Hard",
        brief: `<p>These are the adjusted balances of Sunrise Stationers for the year to 31 March. Draw up the trading account and then the profit and loss account, in the two-sided form.</p>
<table>
<tr><th>Item</th><th class="num">₹</th></tr>
<tr><td>Sales</td><td class="num">5,60,000</td></tr>
<tr><td>Purchases</td><td class="num">3,60,000</td></tr>
<tr><td>Opening stock</td><td class="num">40,000</td></tr>
<tr><td>Closing stock (counted 31 March)</td><td class="num">55,000</td></tr>
<tr><td>Rent (after the prepayment adjustment)</td><td class="num">36,000</td></tr>
<tr><td>Salaries</td><td class="num">60,000</td></tr>
<tr><td>Depreciation on the van</td><td class="num">1,00,000</td></tr>
</table>
<p>Gross profit is carried down from the trading account and brought back in as the opening credit of the profit and loss account, so it appears twice: once as a debit closing the first statement and once as a credit opening the second. Both statements must rule off with equal columns.</p>`,
        stubLabel: "Particulars",
        columns: [
          { key: "dr", label: "Debit (₹)", type: "number", align: "right" },
          { key: "cr", label: "Credit (₹)", type: "number", align: "right" },
        ],
        rows: [
          { key: "ostock", label: "Trading · To Opening stock" },
          { key: "purch", label: "Trading · To Purchases" },
          { key: "gpcd", label: "Trading · To Gross profit c/d" },
          { key: "sales", label: "Trading · By Sales" },
          { key: "cstock", label: "Trading · By Closing stock" },
          { key: "ttot", label: "Trading account totals", kind: "total" },
          { key: "rent", label: "P&L · To Rent" },
          { key: "sal", label: "P&L · To Salaries" },
          { key: "dep", label: "P&L · To Depreciation" },
          { key: "np", label: "P&L · To Net profit" },
          { key: "gpbd", label: "P&L · By Gross profit b/d" },
          { key: "ptot", label: "Profit and loss totals", kind: "total" },
        ],
        cells: [
          { row: "ostock", col: "dr", expected: 40000, marks: 1 },
          { row: "purch", col: "dr", expected: 360000, marks: 1 },
          {
            row: "gpcd",
            col: "dr",
            expected: 215000,
            marks: 3,
            feedback:
              "Sales 5,60,000 plus closing stock 55,000 is 6,15,000. Less opening stock 40,000 and purchases 3,60,000 leaves a gross profit of 2,15,000.",
          },
          { row: "sales", col: "cr", expected: 560000, marks: 1 },
          {
            row: "cstock",
            col: "cr",
            expected: 55000,
            marks: 2,
            feedback:
              "Closing stock reduces the cost of goods sold, so it appears on the credit side of the trading account. It also appears on the balance sheet as an asset, and that double appearance is correct.",
          },
          {
            row: "ttot",
            col: "dr",
            expected: 615000,
            marks: 1,
            derivedFrom: { op: "sum", from: ["ostock:dr", "purch:dr", "gpcd:dr"] },
            methodMarks: 1,
          },
          {
            row: "ttot",
            col: "cr",
            expected: 615000,
            marks: 1,
            derivedFrom: { op: "sum", from: ["sales:cr", "cstock:cr"] },
            methodMarks: 1,
          },
          { row: "rent", col: "dr", expected: 36000, marks: 1 },
          { row: "sal", col: "dr", expected: 60000, marks: 1 },
          { row: "dep", col: "dr", expected: 100000, marks: 1 },
          {
            row: "np",
            col: "dr",
            expected: 19000,
            marks: 3,
            derivedFrom: { op: "difference", from: ["gpbd:cr", "rent:dr", "sal:dr", "dep:dr"] },
            methodMarks: 2,
            feedback:
              "Gross profit 2,15,000 less rent 36,000, salaries 60,000 and depreciation 1,00,000 leaves 19,000.",
          },
          {
            row: "gpbd",
            col: "cr",
            expected: 215000,
            marks: 2,
            feedback: "The same gross profit comes back in as the opening credit of the second statement.",
          },
          {
            row: "ptot",
            col: "dr",
            expected: 215000,
            marks: 1,
            derivedFrom: { op: "sum", from: ["rent:dr", "sal:dr", "dep:dr", "np:dr"] },
            methodMarks: 1,
          },
          {
            row: "ptot",
            col: "cr",
            expected: 215000,
            marks: 1,
            derivedFrom: { op: "sum", from: ["gpbd:cr"] },
            methodMarks: 1,
          },
        ],
        invariants: [
          {
            key: "both-rule-off",
            label: "Both statements rule off",
            kind: "columns-equal",
            cols: ["dr", "cr"],
            marks: 4,
            hint: "Each statement is closed by its own balancing figure, gross profit for the trading account and net profit for the profit and loss account, so once both are in place the debit and credit columns across the whole sheet must agree. A difference means one of the two balancing figures is wrong.",
          },
        ],
        hints: [
          "Do the trading account completely before you touch the second statement. The gross profit it produces is the only input the profit and loss account needs from it.",
          "Cost of goods sold is opening stock plus purchases less closing stock, which here is 40,000 plus 3,60,000 less 55,000, so 3,45,000. Sales of 5,60,000 less that is your gross profit.",
          "Gross profit is 2,15,000. It is written as a debit to close the trading account and as a credit to open the profit and loss account, which is what makes both statements rule off. Net profit of 19,000 then closes the second one.",
        ],
        workedAnswer: `<p><strong>Trading account for the year to 31 March</strong></p>
<table>
<tr><th>Particulars</th><th class="num">₹</th><th>Particulars</th><th class="num">₹</th></tr>
<tr><td>To Opening stock</td><td class="num">40,000</td><td>By Sales</td><td class="num">5,60,000</td></tr>
<tr><td>To Purchases</td><td class="num">3,60,000</td><td>By Closing stock</td><td class="num">55,000</td></tr>
<tr><td>To Gross profit c/d</td><td class="num">2,15,000</td><td></td><td class="num"></td></tr>
<tr><td><strong>Total</strong></td><td class="num"><strong>6,15,000</strong></td><td><strong>Total</strong></td><td class="num"><strong>6,15,000</strong></td></tr>
</table>
<p><strong>Profit and loss account for the year to 31 March</strong></p>
<table>
<tr><th>Particulars</th><th class="num">₹</th><th>Particulars</th><th class="num">₹</th></tr>
<tr><td>To Rent</td><td class="num">36,000</td><td>By Gross profit b/d</td><td class="num">2,15,000</td></tr>
<tr><td>To Salaries</td><td class="num">60,000</td><td></td><td class="num"></td></tr>
<tr><td>To Depreciation</td><td class="num">1,00,000</td><td></td><td class="num"></td></tr>
<tr><td>To Net profit</td><td class="num">19,000</td><td></td><td class="num"></td></tr>
<tr><td><strong>Total</strong></td><td class="num"><strong>2,15,000</strong></td><td><strong>Total</strong></td><td class="num"><strong>2,15,000</strong></td></tr>
</table>
<p><strong>Read the two numbers together.</strong> Gross margin is 2,15,000 on 5,60,000 of sales, which is 38.4%. Net margin is 19,000, which is 3.4%. The business is buying and selling well and is being eaten by overhead, and the largest single item of that overhead is the 1,00,000 of depreciation on a van bought this year. Those are two completely different management problems, and folding the statements into one would have hidden the distinction entirely. That separation is the whole reason the trading account exists.</p>
<p><strong>Closing stock appears twice and both are right.</strong> On the credit of the trading account it removes from cost the goods not yet sold. On the balance sheet it is a 55,000 current asset, because the business still owns them. One adjusting entry, debit Closing Stock and credit Trading Account, produces both.</p>
<p><strong>Where the profit could have been moved.</strong> Closing stock is the most available lever in this statement. Valuing it at 70,000 instead of 55,000 lifts reported profit from 19,000 to 34,000 and nothing in the arithmetic objects. The constraint is the rule that stock is carried at the lower of cost and net realisable value, applied line by line rather than to the total, and the reason for line by line is that an aggregate test lets a write-down on one product be offset against an unrealised gain on another.</p>`,
        minutes: 30,
        skills: ["Trading account", "Gross profit", "Net profit", "Closing stock"],
      },
    ],
    deliverables: [
      {
        n: 1,
        title: "Final accounts for a real set of books",
        brief: `<p>Rekha Sharma runs Sunrise Stationers and banks with Union Bank. She has emailed you:</p>
<blockquote><p>"The bank wants my accounts for the year to 31 March for an overdraft renewal. I have attached my Tally export and the stock sheet we did on the 31st. There are a few things I was not sure about: I paid the shop insurance for a full year in October, the van was bought in April, and one customer who owes me about 2.4 lakh has gone quiet. Can you put together what the bank needs?"</p></blockquote>
<p>Produce the accounts she has asked for. The bank will read them, so they need to be a set of statements rather than a spreadsheet of workings.</p>
<p><strong>What to submit</strong></p>
<ol>
<li>A trading and profit and loss account for the year, and a balance sheet as at 31 March.</li>
<li>Your workings for every adjustment, as a schedule the bank's analyst could follow without asking you a question.</li>
<li>A covering note of no more than one page.</li>
</ol>
<p>Rekha's three uncertainties are the assessment. Each one is an adjustment she has not made, and one of them is a judgement rather than a calculation. The covering note is where you tell her what you assumed and why, which is the part of this job that is actually professional work rather than bookkeeping.</p>`,
        requires: [
          {
            key: "accounts",
            label: "The final accounts",
            formats: ["PDF", "XLSX"],
            note: "Trading and profit and loss account plus balance sheet. A format a lender would recognise, not a list of balances.",
          },
          {
            key: "workings",
            label: "Adjustment schedule",
            formats: ["XLSX", "PDF"],
            note: "One line per adjustment showing the figure, the basis and the entry. An analyst should be able to tie every adjusted figure back to the Tally export.",
          },
          {
            key: "note",
            label: "Covering note",
            formats: ["PDF", "DOCX"],
            note: "One page. State each assumption you had to make and why, and name anything you could not resolve from the information given.",
          },
        ],
        rubric: [
          {
            key: "adjustments",
            label: "The adjustments are right",
            bands: [
              "Adjustments are missing or the arithmetic does not hold together",
              "The insurance and depreciation adjustments are made; the receivable is left at full value",
              "All three adjustments are made and correctly computed, with the provision supported by the ageing",
              "All three are correct and the schedule shows the method well enough that a reviewer could reproduce every figure independently",
            ],
            weight: 3,
          },
          {
            key: "presentation",
            label: "It reads as a set of accounts",
            bands: [
              "A spreadsheet of balances with no statement structure",
              "The statements exist but headings, periods or subtotals are inconsistent",
              "Properly structured statements with correct subtotals and a clear period heading",
              "Presentation a lender would accept without a question, with the current and non-current split handled correctly",
            ],
            weight: 2,
          },
          {
            key: "judgement",
            label: "The judgement is defended, not hidden",
            bands: [
              "The doubtful receivable is ignored or written off with no basis given",
              "A provision is made but the basis is a round percentage with no reasoning",
              "The provision is supported by the ageing and the reasoning is stated",
              "The provision is individually assessed, the concentration in the oldest band is named, and the effect on profit is disclosed to the client plainly",
            ],
            weight: 3,
          },
          {
            key: "communication",
            label: "The covering note does its job",
            bands: [
              "No note, or a note that only restates the figures",
              "Assumptions are listed but not explained",
              "Each assumption is stated with the reason behind it",
              "The note names what could not be resolved from the information given and says what it would take to resolve it, which is what a client can actually act on",
            ],
            weight: 2,
          },
        ],
        modelAnswer: `<p><strong>The three adjustments Rekha did not make.</strong></p>
<p><em>Insurance.</em> 36,000 paid on 1 October for twelve months. Six of those months fall in this year, so 18,000 is this year's expense and 18,000 is a prepaid asset. Debit Prepaid Insurance 18,000, credit Insurance.</p>
<p><em>The van.</em> Bought 1 April for 6,00,000, five year life, 1,00,000 expected residual. On a straight line basis the charge is 1,00,000 and the carrying amount at the year end is 5,00,000. Because the van was bought on the first day of the year there is no part-year apportionment, which is worth stating in the note because it will not be true next time she buys something.</p>
<p><em>The quiet customer.</em> This is the judgement, not a calculation. The balance is 2,40,000 and 210 days old. The defensible treatment is to establish the facts first, assess that balance individually because it is the large majority of the oldest ageing band, and apply a matrix to the rest of the ledger. A 50% expected loss on the specific balance plus matrix rates elsewhere gives a provision of roughly 1,43,000.</p>
<p><strong>What goes in the note, and why it matters more than the arithmetic.</strong></p>
<p>The provision takes about 1,43,000 off a profit Rekha is taking to her bank, so she needs to hear it from you before the bank does. The argument that works is not an appeal to prudence: it is that the bank's analyst will run the ageing himself, and an unprovided 210 day balance of 2,40,000 is the first thing he will ask about. A provision you have explained is a sign of competent books; one he finds himself is a question about everything else in the file.</p>
<p>The note should also name what you could not resolve. You do not know whether Eastern Hardware has disputed the invoice, whether any part of it is secured, or whether Rekha has a personal guarantee. Each would change the figure, and saying so tells her exactly what to go and find out.</p>
<p><strong>One thing many submissions get wrong.</strong> The GST on a written-off or provided debt is not recoverable merely because the customer failed to pay, so the provision is against the gross amount including tax. Treating it as net understates the provision by the tax fraction.</p>`,
        minutes: 150,
        skills: ["Trading account", "Profit and loss account", "Net profit"],
      },
    ],
  },

  /* ===================================================================== */
  5078: {
    topicId: 5078,
    title: "Bank reconciliation against a statement that disagrees",
    summary:
      "Your cash book and the bank almost never agree, and the useful skill is telling the differences that will fix themselves from the ones that need an entry.",
    concepts: ["Bank reconciliation", "Unpresented cheque", "Uncredited deposit", "Timing difference", "Bank charges"],
    glossary: {
      "Bank reconciliation": "A statement explaining every difference between the cash book balance and the bank statement balance.",
      "Unpresented cheque": "A cheque written and recorded by the business that the bank has not yet paid.",
      "Uncredited deposit": "Money paid in and recorded by the business that the bank has not yet cleared.",
      "Timing difference": "A difference that will disappear on its own as items clear, needing no entry.",
      "Bank charges": "Fees the bank has taken directly, which the business learns about only from the statement.",
      "Standing instruction": "A recurring payment the bank makes automatically, often missed in the cash book.",
    },
    body: {
      Beginner: `<p>Your cash book says you have 1,09,800 rupees. The bank statement says 1,24,500. One of you is wrong, and usually neither is.</p>
<div class="key-idea"><span class="callout-label">Two piles, and only one needs you</span><p>Some differences fix themselves as items clear. Others are things the bank did that your books have never heard of, and those need entries.</p></div>
<h3>The pile that sorts itself out</h3>
<p>You wrote a cheque and recorded it, so your book has gone down. The supplier has not banked it yet, so the bank still shows the money. That difference disappears the day the cheque clears, and you do nothing.</p>
<h3>The pile that needs you</h3>
<p>The bank took 900 rupees of charges and paid you 1,200 of interest, and you only found out by reading the statement. Those are real transactions you have not recorded.</p>
<div class="warning"><span class="callout-label">The output of a reconciliation is the second pile</span><p>Missing it is why some cash books are permanently a few thousand rupees out.</p></div>`,
      Intermediate: `<p>A reconciliation explains the gap between two records of the same account maintained by two parties with different information. The business knows about cheques it has issued and deposits it has made; the bank knows about charges, interest, standing instructions and dishonoured cheques. Neither record is wrong.</p>
<h3>Four recurring categories, split in two</h3>
<table>
<tr><th>Item</th><th>Type</th><th>Action</th></tr>
<tr><td>Unpresented cheques</td><td>Timing</td><td>None; the bank will catch up</td></tr>
<tr><td>Uncredited deposits</td><td>Timing</td><td>None</td></tr>
<tr><td>Bank charges</td><td>Not in your books</td><td>Journal entry</td></tr>
<tr><td>Interest, standing instructions, dishonours</td><td>Not in your books</td><td>Journal entry</td></tr>
</table>
<h3>Direction, when laying the statement out</h3>
<p>Starting from the bank statement balance: deduct unpresented cheques because the bank has not yet taken them, add uncredited deposits because the bank has not yet given credit, add back charges the bank took that you did not record, and deduct interest the bank credited that you did not record. The result should be the cash book balance.</p>
<div class="key-idea"><span class="callout-label">Why this is more than arithmetic</span><p>It is the only routine procedure that tests completeness, because the bank statement is an independent population. A payment made but never recorded in the cash book cannot be found anywhere inside the ledger.</p></div>`,
      Advanced: `<p>The reconciliation is the primary fraud control in a small business, and that is a stronger claim than it sounds: the bank statement is produced by an independent party, so it is the one record a dishonest bookkeeper cannot edit.</p>
<div class="warning"><span class="callout-label">Two ways the control fails while still being performed</span><p>When the person who makes payments also performs the reconciliation. And when stale unpresented cheques are allowed to accumulate as a parking space for differences nobody wants to explain.</p></div>
<h3>Age the unpresented list before you check the addition</h3>
<p>A cheque outstanding beyond about three months has almost certainly not been presented because it does not exist or was never sent, and carrying it forward quietly absorbs a shortfall of exactly that amount. Any review should start there.</p>
<h3>Dishonoured cheques are the subtlest routine item</h3>
<p>When a customer cheque bounces, the original receipt entry has to be reversed, the receivable reinstated, and any bank charge recorded. Reversing only the bank side leaves a receivable understated and a reconciliation that balances, which is the quiet kind of error.</p>
<div class="field"><span class="callout-label">Automation moved the skill, it did not remove it</span><p>Matching is now largely automatic, so the professional work is investigating exceptions. An automated matcher keyed on amount and date will happily match two unrelated transactions of the same value, which means the exception report is the output worth reading and the clean match rate is not.</p></div>`,
      Expert: `<p>Framed as an assurance procedure, reconciliation to an externally generated record is the only routine control providing evidence over completeness of recorded cash transactions, and completeness is the assertion internal checks structurally cannot reach.</p>
<div class="key-idea"><span class="callout-label">Why bank confirmations survive a fully testable ledger</span><p>The ledger is a closed system and the question is about events outside it.</p></div>
<h3>Segregation is not negotiable by size</h3>
<p>If one person initiates payments, records them and reconciles, then the reconciliation tests that person's own work against a record they can also obtain, and the control provides no assurance beyond their diligence. The compensating control in a business too small to segregate is owner review of the statement itself, not of the reconciliation, because the reconciliation is prepared by the person under test.</p>
<h3>Stale items need a number, not judgement</h3>
<p>A cheque unpresented beyond ninety days is written back to payables with the reason documented. Material weaknesses have been reported over reconciliations performed every month, signed every month, carrying the same unexplained item for two years.</p>
<div class="warning"><span class="callout-label">Match confidence is not reconciliation evidence</span><p>A matcher keyed on amount and near date produces false positives at a rate proportional to transaction homogeneity, which is highest in exactly the businesses with the most transactions. A system reporting a 99% match rate with no owned exception queue has replaced a control with a metric.</p></div>`,
    },
    worksheets: [
      {
        n: 1,
        title: "Reconcile the statement to the cash book",
        difficulty: "Medium",
        brief: `<p>Sunrise Stationers' bank statement at 31 March shows a balance of <strong>1,24,500 rupees</strong>. The cash book shows something different. You have found five differences.</p>
<ol>
<li>Cheques totalling <strong>32,400</strong> were written and recorded in March but have not yet been paid by the bank.</li>
<li>A deposit of <strong>18,000</strong> paid in on 30 March has not yet been credited.</li>
<li>Bank charges of <strong>900</strong> appear on the statement and are not in the cash book.</li>
<li>Interest of <strong>1,200</strong> was credited by the bank and is not in the cash book.</li>
<li>A standing instruction for insurance of <strong>2,400</strong> was paid by the bank and is not in the cash book.</li>
</ol>
<p><strong>Enter each adjustment as a signed figure</strong>: positive if it increases the figure as you work down from the statement towards the cash book, negative if it decreases it. The last row is the cash book balance you should arrive at.</p>
<p>In the second column, say whether each item is a timing difference that will clear on its own, or something missing from your books that needs a journal entry. That column is the actual output of a reconciliation.</p>`,
        stubLabel: "Item",
        columns: [
          { key: "amt", label: "Signed amount (₹)", type: "number", align: "right", flex: 1.3 },
          {
            key: "kind",
            label: "Timing, or needs an entry",
            type: "select",
            options: ["Timing difference", "Needs a journal entry"],
            flex: 1.6,
          },
        ],
        rows: [
          { key: "stmt", label: "Balance per bank statement", given: { amt: 124500, kind: "" } },
          { key: "unpres", label: "1. Cheques not yet presented" },
          { key: "uncred", label: "2. Deposit not yet credited" },
          { key: "charges", label: "3. Bank charges" },
          { key: "interest", label: "4. Interest credited" },
          { key: "si", label: "5. Standing instruction paid" },
          { key: "cashbook", label: "Balance per cash book", kind: "total" },
        ],
        cells: [
          {
            row: "unpres",
            col: "amt",
            expected: -32400,
            marks: 2,
            feedback:
              "The bank has not taken these yet, so the statement is higher than the cash book by this amount. Working from the statement towards the cash book, deduct it.",
          },
          {
            row: "unpres",
            col: "kind",
            expected: "Timing difference",
            marks: 1,
            feedback: "You recorded these correctly. The bank will catch up when the cheques are presented, so no entry is needed.",
          },
          {
            row: "uncred",
            col: "amt",
            expected: 18000,
            marks: 2,
            feedback: "You have recorded the receipt and the bank has not credited it yet, so the cash book is higher. Add it.",
          },
          { row: "uncred", col: "kind", expected: "Timing difference", marks: 1 },
          {
            row: "charges",
            col: "amt",
            expected: 900,
            marks: 2,
            feedback:
              "The bank has already deducted these, so the statement is lower than your unadjusted cash book. Add them back as you work towards the cash book figure, and then record the expense.",
          },
          {
            row: "charges",
            col: "kind",
            expected: "Needs a journal entry",
            marks: 1,
            feedback: "Debit Bank Charges, credit Bank. Until that entry is made your cash book is genuinely wrong.",
          },
          { row: "interest", col: "amt", expected: -1200, marks: 2 },
          {
            row: "interest",
            col: "kind",
            expected: "Needs a journal entry",
            marks: 1,
            feedback: "Debit Bank, credit Interest Income. Interest the bank paid you is income you have not recorded.",
          },
          {
            row: "si",
            col: "amt",
            expected: 2400,
            marks: 2,
            feedback:
              "The bank paid it and you did not record it, so like the charges it is added as you move from the statement towards the cash book, and then it needs an entry.",
          },
          { row: "si", col: "kind", expected: "Needs a journal entry", marks: 1 },
          {
            row: "cashbook",
            col: "amt",
            expected: 112200,
            marks: 3,
            derivedFrom: { op: "sum", from: ["stmt:amt", "unpres:amt", "uncred:amt", "charges:amt", "interest:amt", "si:amt"] },
            methodMarks: 2,
            feedback: "1,24,500 less 32,400 plus 18,000 plus 900 less 1,200 plus 2,400 gives 1,12,200.",
          },
        ],
        invariants: [
          {
            key: "reconciles",
            label: "The statement reconciles to the cash book",
            kind: "cell-is-column-sum",
            cols: ["amt"],
            cell: "cashbook:amt",
            marks: 4,
            hint: "The cash book figure has to equal the statement balance plus every signed adjustment above it. If it does not, one of the five has the wrong sign, and the two that catch people are the charges and the standing instruction: the bank has already taken them, so they move the figure upward as you work towards the cash book.",
          },
        ],
        hints: [
          "You are working downward from the statement balance to the cash book balance. For each item ask: does the cash book already know about this, and did the bank already act on it?",
          "Three of the five are things the bank did that your books have never heard of. Those three are the ones that need journal entries, and all three are in the same direction.",
          "Signs: cheques not presented are negative 32,400 because the bank still shows that money. The deposit is positive 18,000. Charges are positive 900 and the standing instruction is positive 2,400, because the bank has already taken both and your cash book has not. Interest is negative 1,200.",
        ],
        workedAnswer: `<table>
<tr><th>Item</th><th class="num">₹</th><th>Treatment</th></tr>
<tr><td>Balance per bank statement</td><td class="num">1,24,500</td><td></td></tr>
<tr><td>Less cheques not presented</td><td class="num">(32,400)</td><td>Timing</td></tr>
<tr><td>Add deposit not credited</td><td class="num">18,000</td><td>Timing</td></tr>
<tr><td>Add bank charges</td><td class="num">900</td><td>Journal entry needed</td></tr>
<tr><td>Less interest credited</td><td class="num">(1,200)</td><td>Journal entry needed</td></tr>
<tr><td>Add standing instruction</td><td class="num">2,400</td><td>Journal entry needed</td></tr>
<tr><td><strong>Balance per cash book</strong></td><td class="num"><strong>1,12,200</strong></td><td></td></tr>
</table>
<p><strong>The second column is the point of the exercise.</strong> Two of these five need nothing from you: the cheques will be presented and the deposit will clear, and the difference disappears without an entry. Three of them mean your cash book is currently wrong, and until you post them your recorded cash balance is out by 2,100 rupees. A reconciliation that arrives at the right total without producing those three entries has balanced a statement and left the books wrong, which is the most common way this procedure is performed badly.</p>
<p><strong>The three entries.</strong> Debit Bank Charges 900 and credit Bank. Debit Bank 1,200 and credit Interest Income. Debit Insurance 2,400 and credit Bank. After posting, the cash book reads 1,12,200 and agrees with the reconciliation.</p>
<p><strong>What to check before you check the addition.</strong> Age the unpresented cheque list. A cheque outstanding beyond about ninety days has usually not been presented because it was never sent or no longer exists, and carrying it forward month after month quietly absorbs a shortfall of exactly that amount. A reconciliation can be performed and signed every month for two years and still be hiding a difference in that one line, which is why a reviewer looks at the age of the list first and the arithmetic second.</p>
<p><strong>And the reason this procedure matters more than its difficulty suggests.</strong> The bank statement is produced by somebody outside your business, so it is the one record a dishonest bookkeeper cannot edit. A payment made but never entered in the cash book appears nowhere in the ledger and cannot be found by any internal check. This is the control that finds it, and it provides no assurance at all when the person who makes the payments is also the person who does the reconciliation.</p>`,
        minutes: 24,
        skills: ["Bank reconciliation", "Timing difference", "Unpresented cheque"],
      },
    ],
  },
  /* ===================================================================== */
  5079: {
    topicId: 5079,
    title: "GST mechanics: input credit, output tax, reverse charge",
    summary:
      "GST is a tax on value added, collected in instalments along a chain. Once you see it as a chain, input credit stops being a rule to memorise.",
    concepts: ["Output tax", "Input tax credit", "Reverse charge", "Place of supply", "Composition scheme"],
    glossary: {
      "Output tax": "GST charged by a business on what it sells.",
      "Input tax credit": "GST paid on purchases, which a registered business sets against its output tax.",
      "Reverse charge": "A mechanism where the recipient rather than the supplier pays the tax to the government.",
      "Place of supply": "The rule that decides whether a supply is intra-state (CGST plus SGST) or inter-state (IGST).",
      "Composition scheme": "A simplified low-rate option for small suppliers, who in exchange cannot claim input credit.",
      "E-invoice": "A government-registered invoice, mandatory above a turnover threshold, carrying an IRN.",
    },
    body: {
      Beginner: `<p>GST looks complicated and is built on one idea: each business in a chain pays tax only on the value it adds.</p>
<div class="worked"><span class="callout-label">One link in the chain</span><p>You buy stock for 1,00,000 plus 18,000 of GST. You sell it for 1,50,000 plus 27,000 of GST. You collected 27,000 and you paid 18,000, so you send the government the difference of 9,000, which is 18% of the 50,000 you added.</p></div>
<div class="key-idea"><span class="callout-label">The tax is not yours</span><p>It is not your cost and it is not your income. It passes through you. The only part that is yours is the 9,000 you actually remit.</p></div>
<h3>Two things to get right from day one</h3>
<p>Intra-state sales carry CGST and SGST, half each; inter-state sales carry IGST at the full rate. And you can only claim credit if your supplier actually filed and paid.</p>
<div class="warning"><span class="callout-label">Which means</span><p>A cheap invoice from a supplier who does not file is not cheap at all.</p></div>`,
      Intermediate: `<p>GST is a destination-based consumption tax levied at each stage with credit for tax paid at earlier stages, so the cumulative burden lands on the final consumer and no business bears tax on its inputs.</p>
<div class="key-idea"><span class="callout-label">The accounting consequence</span><p>Output and input GST are liability and asset accounts, not income and expense. A business that routes GST through its profit and loss account overstates both revenue and purchases by the tax.</p></div>
<h3>Place of supply, not location of parties</h3>
<p>For goods it is generally where the goods are delivered; for services there is a general rule with a long list of exceptions covering immovable property, events, transport and online services.</p>
<div class="warning"><span class="callout-label">Getting the head wrong is expensive in a specific way</span><p>Tax paid under the wrong head is not adjusted. It has to be paid again under the right head and refunded under the wrong one.</p></div>
<h3>Credit is conditional, not automatic</h3>
<table>
<tr><th>Condition</th><th>Within your control?</th></tr>
<tr><td>The invoice exists</td><td>Yes</td></tr>
<tr><td>The goods or services were received</td><td>Yes</td></tr>
<tr><td>Used for business purposes</td><td>Yes</td></tr>
<tr><td>The supplier filed and paid</td><td><strong>No</strong></td></tr>
</table>
<p>The last one is why supplier compliance is a commercial question and not just a tax one. And some credits are blocked outright under section 17(5): motor vehicles below a seat threshold, food and beverage, club memberships, construction of immovable property.</p>`,
      Advanced: `<p>Understanding the credit chain as a chain explains the design of the compliance regime. Because your credit depends on your supplier having filed, the government has effectively deputised every buyer as an enforcement agent against their own vendors.</p>
<div class="key-idea"><span class="callout-label">Which makes one routine the highest-value one you have</span><p>Reconciling purchase records against the auto-populated GSTR-2B monthly. A mismatch found in month one is a phone call; the same mismatch at the annual return is a cash cost.</p></div>
<h3>Blocked credits convert a pass-through into a real cost</h3>
<p>Construction of immovable property on own account is the largest in practice: a business fitting out a new office cannot recover the GST on the civil work, which adds about 18% to a capital project a naive budget treats as recoverable. The same logic makes the apportionment rules under sections 17(1) and 17(2) material for any business with both taxable and exempt outputs.</p>
<h3>The composition scheme is a trade, not a concession</h3>
<p>A low rate on turnover with no input credit suits a business selling to final consumers with low input tax. It is actively harmful for a business selling to other registered businesses, because the dealer cannot pass on credit and their customers therefore bear the full tax.</p>
<div class="field"><span class="callout-label">A timing fact that strains project businesses</span><p>Liability arises on the earlier of invoice or payment for services, so a business can owe output tax before it has collected anything. Advances received for services carry tax at the time of receipt.</p></div>`,
      Expert: `<p>The structural tension in India's GST is between the credit chain, which requires matching, and federalism, which requires revenue attribution between the Centre and the states. IGST resolves the second without breaking the first: an inter-state supply bears a single levy collected by the Centre and apportioned to the destination state.</p>
<h3>Utilisation order, and the cash surprise it produces</h3>
<p>Sections 49, 49A and 49B mandate that IGST credit be exhausted first, and prohibit cross-utilisation between CGST and SGST.</p>
<div class="warning"><span class="callout-label">What catches well-run businesses</span><p>An entity can hold a substantial SGST credit balance while paying CGST in cash, because the balances are not fungible. Modelling the cash position on a single net GST figure understates the outflow, and the error grows with the asymmetry between purchase and sale geographies.</p></div>
<h3>Inverted duty structure</h3>
<p>Where output rates sit below input rates, the refund formula in rule 89(5) restricts refund to credit on inputs, historically excluding input services, which was litigated to the Supreme Court in Union of India v VKC Footsteps. The holding upheld the exclusion, so a business with a high input-service cost base in an inverted structure bears unrecoverable credit by design rather than by error. That is a pricing issue rather than a compliance one.</p>
<div class="field"><span class="callout-label">The provision practitioners forget exists</span><p>Anti-profiteering under section 171 requires a rate reduction or an additional credit benefit to be passed on by way of a commensurate price reduction. No methodology is prescribed, the determinations are inconsistent, and the exposure is real for any business that absorbed a rate cut into margin. It is one of the few places a tax statute directly constrains a pricing decision.</p></div>`,
    },
    questions: [
      {
        n: 1,
        question: "You buy stock for 1,00,000 plus 18,000 GST and sell it for 1,50,000 plus 27,000 GST. What do you remit?",
        options: ["9,000", "27,000", "45,000", "18,000"],
        answer: 0,
        explanation:
          "You collected 27,000 and already paid 18,000, which you set off as input credit, so 9,000 goes to the government. That is 18% of the 50,000 of value you added, which is what a value added tax is designed to collect at each stage.",
        difficulty: "Easy",
        skill: "Input tax credit",
      },
      {
        n: 2,
        question: "Output GST collected on sales should be recorded as:",
        options: [
          "A liability, because the money is owed to the government",
          "Revenue, because it was received with the sale",
          "An expense, because it reduces what the business keeps",
          "A contra-asset against receivables",
        ],
        answer: 0,
        explanation:
          "The tax passes through the business and belongs to the government, so it is a liability until remitted. Routing it through revenue overstates the top line by the tax and is a frequent error in small-business books.",
        difficulty: "Medium",
        skill: "Output tax",
      },
      {
        n: 3,
        question: "Your supplier invoices you correctly but never files their return. Your input credit is:",
        options: [
          "At risk, because credit depends on the supplier having filed and paid",
          "Safe, because you hold a valid tax invoice",
          "Safe, because you paid the supplier in full",
          "Available only at half the invoiced rate",
        ],
        answer: 0,
        explanation:
          "Holding an invoice is necessary but not sufficient: the supplier's filing is one of the conditions, and it is the one outside your control. This is why reconciling purchases against the auto-populated GSTR-2B every month matters, and why a cheap invoice from a non-filer is not cheap.",
        difficulty: "Medium",
        skill: "Input tax credit",
      },
      {
        n: 4,
        question: "A business pays a goods transport agency for freight. Under reverse charge:",
        options: [
          "The business pays the GST directly to the government and claims it as credit",
          "The transporter collects and remits the GST as normal",
          "No GST applies to freight at all",
          "The GST is shared equally between the two parties",
        ],
        answer: 0,
        explanation:
          "Reverse charge inverts who remits, so the recipient pays the government and then takes credit, which often nets to nil in cash while being a full compliance obligation. Missing it is one of the most common reasons a small business receives a notice.",
        difficulty: "Hard",
        skill: "Reverse charge",
      },
      {
        n: 5,
        question: "A business fitting out a new office cannot recover the GST on the civil construction work. This is because:",
        options: [
          "Credit on construction of immovable property is blocked under section 17(5)",
          "Construction is exempt from GST entirely",
          "Capital expenditure never carries input credit",
          "The contractor is on the composition scheme",
        ],
        answer: 0,
        explanation:
          "Section 17(5) blocks several specific credits, and construction of immovable property on own account is the largest in practice. It adds roughly 18% to a capital project that a budget treating all tax as recoverable will have understated.",
        difficulty: "Hard",
        skill: "Input tax credit",
      },
      {
        n: 6,
        question: "The composition scheme is a poor choice for a business that:",
        options: [
          "Sells mainly to other registered businesses",
          "Sells mainly to final consumers",
          "Has very low input tax on its purchases",
          "Has a turnover well below the threshold",
        ],
        answer: 0,
        explanation:
          "A composition dealer cannot pass on input credit, so a registered buyer bears the full tax and the dealer becomes uncompetitive at the same price. The scheme suits a business selling to consumers, who have no credit to lose.",
        difficulty: "Medium",
        skill: "Composition scheme",
      },
      {
        n: 7,
        question: "Goods are sold by a Pune business and delivered to a buyer in Nagpur. The correct levy is:",
        options: [
          "CGST and SGST, because both places are in Maharashtra",
          "IGST, because the two cities are different",
          "IGST, because the buyer is registered elsewhere",
          "No GST, because it is an intra-state movement",
        ],
        answer: 0,
        explanation:
          "Place of supply for goods is generally where they are delivered, and both Pune and Nagpur are in Maharashtra, so it is intra-state and carries CGST plus SGST at half the rate each. Tax paid under the wrong head cannot simply be adjusted: it is payable again correctly and refundable incorrectly.",
        difficulty: "Medium",
        skill: "Place of supply",
      },
    ],
    decks: [
      {
        n: 1,
        title: "GST terms and rates you will be asked about",
        blurb:
          "The vocabulary a client uses on the phone. Typed recall, because you need to produce the term rather than recognise it.",
        mode: "type",
        cards: [
          { id: 1, front: "GST a business charges on what it sells", back: "Output tax", accepts: ["output gst", "output"], tags: ["Mechanics"] },
          { id: 2, front: "GST paid on purchases, set against output tax", back: "Input tax credit", accepts: ["itc", "input credit", "input tax"], tags: ["Mechanics"] },
          { id: 3, front: "The two levies on an intra-state supply", back: "CGST and SGST", accepts: ["cgst sgst", "cgst and sgst", "sgst and cgst"], tags: ["Mechanics"] },
          { id: 4, front: "The single levy on an inter-state supply", back: "IGST", accepts: ["integrated gst", "integrated goods and services tax"], tags: ["Mechanics"] },
          { id: 5, front: "The rule deciding whether a supply is intra-state or inter-state", back: "Place of supply", accepts: ["pos", "place of supply rules"], tags: ["Mechanics"] },
          { id: 6, front: "Mechanism where the recipient rather than the supplier remits the tax", back: "Reverse charge", accepts: ["rcm", "reverse charge mechanism"], tags: ["Mechanics"] },
          { id: 7, front: "The monthly summary return of outward supplies and tax payable", back: "GSTR-3B", accepts: ["gstr 3b", "3b"], tags: ["Returns"] },
          { id: 8, front: "The return reporting invoice-level outward supplies", back: "GSTR-1", accepts: ["gstr 1", "r1"], tags: ["Returns"] },
          { id: 9, front: "The auto-populated statement of input credit from supplier filings", back: "GSTR-2B", accepts: ["gstr 2b", "2b"], tags: ["Returns"] },
          { id: 10, front: "Low-rate option for small suppliers who forgo input credit", back: "Composition scheme", accepts: ["composition", "composition levy"], tags: ["Schemes"] },
          { id: 11, front: "The section listing credits that cannot be claimed at all", back: "Section 17(5)", accepts: ["17(5)", "section 175", "blocked credits"], tags: ["Credits"], hint: "Motor vehicles, food, club memberships, immovable property" },
          { id: 12, front: "The reference number a government-registered invoice carries", back: "IRN", accepts: ["invoice reference number"], tags: ["Compliance"] },
          { id: 13, front: "The document required to move goods above a value threshold", back: "E-way bill", accepts: ["eway bill", "e way bill"], tags: ["Compliance"] },
          { id: 14, front: "Where output rates sit below input rates, producing unusable credit", back: "Inverted duty structure", accepts: ["inverted duty", "inversion"], tags: ["Credits"] },
          { id: 15, front: "The 15-digit registration number of a GST taxpayer", back: "GSTIN", accepts: ["gst number", "gst identification number"], tags: ["Compliance"] },
          { id: 16, front: "A credit note's purpose when a sale is returned", back: "To reduce output tax liability", accepts: ["reduce output tax", "reduces output liability", "reverse the output tax"], tags: ["Mechanics"] },
          { id: 17, front: "The provision requiring a rate cut to be passed on to customers", back: "Anti-profiteering", accepts: ["section 171", "anti profiteering"], tags: ["Compliance"] },
          { id: 18, front: "The annual reconciliation return for larger taxpayers", back: "GSTR-9C", accepts: ["gstr 9c", "9c", "gstr-9c"], tags: ["Returns"] },
        ],
        skills: ["Output tax", "Input tax credit", "Reverse charge"],
      },
    ],
  },

  /* ===================================================================== */
  5080: {
    topicId: 5080,
    title: "Filing a GSTR-3B from a month of invoices",
    summary:
      "Take a month of messy sales and purchases and produce the summary figures the return actually asks for, slab by slab.",
    concepts: ["GSTR-3B", "Rate slab", "Taxable value", "Net tax payable", "Reconciliation"],
    glossary: {
      "GSTR-3B": "The monthly summary return reporting outward supplies, input credit claimed and tax paid.",
      "Rate slab": "One of the standard GST rates: 5, 12, 18 or 28 per cent, with a few special rates.",
      "Taxable value": "The value of a supply before GST, on which the rate is applied.",
      "Net tax payable": "Output tax less input tax credit, computed separately for each head.",
      Reconciliation: "Agreeing the return figures against the books and against the auto-populated GSTR-2B.",
      "Cash ledger": "The balance of money deposited with the government, used to settle what credit cannot.",
    },
    body: {
      Beginner: `<p>At the end of each month you file a short summary called GSTR-3B. It asks for three things: what you sold and the tax on it, what credit you are claiming, and therefore what you owe.</p>
<div class="key-idea"><span class="callout-label">Group before you multiply</span><p>Your sales are at different rates, so you cannot add them up and apply one percentage. Group by rate, then apply each rate to its own group.</p></div>
<h3>And halve every rate</h3>
<p>For an intra-state sale the rate splits in half: an 18% item carries 9% CGST and 9% SGST. So a 7,00,000 rupee group at 18% gives 63,000 of CGST and 63,000 of SGST, not 1,26,000 of one thing.</p>
<div class="warning"><span class="callout-label">Then subtract credit head by head</span><p>You cannot use SGST credit to pay CGST. You can be sitting on credit and still have to pay cash.</p></div>`,
      Intermediate: `<p>GSTR-3B is a summary, which means every figure in it has to be derivable from something underneath it. Invoices are grouped by rate slab, the taxable value of each group totalled, and the rate applied to each group separately.</p>
<div class="key-idea"><span class="callout-label">The check the return cannot perform for you</span><p>That the slab-wise taxable values add back to the month's turnover from the books. If they do not, an invoice has been dropped or allocated to the wrong slab.</p></div>
<h3>Credit is claimed head by head</h3>
<p>Utilisation follows a mandated order with IGST credit exhausted first, and cross-utilisation between CGST and SGST prohibited. A business whose purchases are mostly inter-state and whose sales are mostly intra-state accumulates IGST credit and pays CGST and SGST, and the balances are not interchangeable.</p>
<h3>Before filing</h3>
<p>Reconcile claimed credit against GSTR-2B, which is populated from what your suppliers actually filed.</p>
<div class="warning"><span class="callout-label">The single most common cause of a notice</span><p>Credit claimed beyond 2B. The remedy is almost always a supplier who has not filed rather than an error in your own records.</p></div>`,
      Advanced: `<p>The return is a summary of a summary, which makes the audit trail beneath it the real deliverable.</p>
<div class="key-idea"><span class="callout-label">What a defensible monthly file contains</span><p>The slab-wise reconciliation to book turnover, the 2B reconciliation with named mismatches and their reason, the utilisation computation in the mandated order, and the resulting cash payment. Practitioners who keep that file find annual reconciliation a morning's work.</p></div>
<h3>Work the utilisation order rather than trusting the portal</h3>
<p>IGST credit must be used first against IGST liability and then against CGST and SGST in any order; only after it is exhausted may CGST credit be used against CGST and SGST credit against SGST. The asymmetry means two businesses with identical net credit can have very different cash outflows depending on head composition.</p>
<h3>Credit notes and amendments</h3>
<p>A credit note reduces output tax liability only if issued within the statutory window and reported in the correct period. A sales return handled by raising a fresh purchase invoice instead overstates both turnover and input credit permanently. The two routes look equivalent in the books and are not equivalent in the return.</p>
<div class="warning"><span class="callout-label">The liabilities that net to nil and still get you a notice</span><p>Reverse charge on freight, legal fees and imported services must be self-assessed and paid in cash, with the credit available in the same or a later period. Because the net effect is nil it is easy to omit entirely, and the omission is visible to the department from the expense side of a filed income tax return.</p></div>`,
      Expert: `<p>The design asks the taxpayer to self-assess under a credit-matching regime, which produces an asymmetry worth naming: the cost of a supplier's non-compliance falls on the recipient, whose only remedies are commercial.</p>
<div class="key-idea"><span class="callout-label">Which makes vendor GST compliance a procurement criterion</span><p>A mature purchase process holds back a portion of payment until the supply appears in 2B. Section 16(2)(c) is the statutory hook, challenged repeatedly without being struck down, so the allocation of risk is settled whether or not it is fair.</p></div>
<h3>Rule 86B, the provision most often missed in cash planning</h3>
<p>Certain taxpayers must discharge at least 1% of output liability in cash regardless of available credit. It targets credit-only filers as a fraud control, and the exclusions are specific enough that eligibility has to be tested rather than assumed. A business modelling outflow purely from net liability will be short by that 1% in every month the rule applies.</p>
<h3>Interest, and why the history still matters</h3>
<p>Section 50 as amended charges interest on the net cash liability for delayed filing rather than on gross output tax, which resolved a long-running dispute and materially reduced exposure for late filers holding credit. The amendment was given retrospective effect, and older demands computed on gross are occasionally still pursued.</p>
<div class="field"><span class="callout-label">Where the quality of the monthly file is tested</span><p>GSTR-9C, reconciling turnover per audited accounts against turnover per returns. The recurring reconciling items are predictable: supplies without consideration, schedule I deemed supplies, credit notes in a later year, and the treatment of discounts. A business whose monthly file already explains each produces the reconciliation mechanically; one that does not is reverse-engineering a year of filings against signed accounts, which is where previously invisible errors surface with interest attached.</p></div>`,
    },
    worksheets: [
      {
        n: 1,
        title: "Work out the month's GST liability",
        difficulty: "Hard",
        brief: `<p>Sunrise Stationers is registered in Maharashtra and all of March's sales were to customers within the state, so every supply carries CGST and SGST at half the applicable rate.</p>
<p>March's invoices have been grouped by rate slab, and the taxable values are given. <strong>Compute the CGST and SGST on each slab.</strong> Remember the rate splits in half: an 18% item carries 9% CGST and 9% SGST.</p>
<table>
<tr><th>Slab</th><th class="num">Taxable value (₹)</th></tr>
<tr><td>5% (exercise books, printing paper)</td><td class="num">2,00,000</td></tr>
<tr><td>12% (files, folders)</td><td class="num">3,00,000</td></tr>
<tr><td>18% (pens, office machines)</td><td class="num">7,00,000</td></tr>
</table>
<p>Input credit available for the month, already reconciled against GSTR-2B, is <strong>51,000 of CGST and 51,000 of SGST</strong>, which is given on the sheet. Finish by computing the net tax payable under each head.</p>`,
        stubLabel: "Slab",
        columns: [
          { key: "value", label: "Taxable value (₹)", type: "number", align: "right", flex: 1.3 },
          { key: "cgst", label: "CGST (₹)", type: "number", align: "right" },
          { key: "sgst", label: "SGST (₹)", type: "number", align: "right" },
        ],
        rows: [
          { key: "s5", label: "5% supplies", given: { value: 200000 } },
          { key: "s12", label: "12% supplies", given: { value: 300000 } },
          { key: "s18", label: "18% supplies", given: { value: 700000 } },
          { key: "outtot", label: "Total output tax", kind: "total" },
          { key: "itc", label: "Input tax credit (per GSTR-2B)", kind: "total", given: { cgst: 51000, sgst: 51000 } },
          { key: "net", label: "Net tax payable in cash", kind: "total" },
        ],
        cells: [
          {
            row: "s5",
            col: "cgst",
            expected: 5000,
            marks: 2,
            derivedFrom: { op: "product", from: ["s5:value"], factor: 0.025 },
            methodMarks: 1,
            feedback: "5% splits into 2.5% CGST and 2.5% SGST, so 2.5% of 2,00,000 is 5,000.",
          },
          { row: "s5", col: "sgst", expected: 5000, marks: 1, derivedFrom: { op: "product", from: ["s5:value"], factor: 0.025 }, methodMarks: 1 },
          {
            row: "s12",
            col: "cgst",
            expected: 18000,
            marks: 2,
            derivedFrom: { op: "product", from: ["s12:value"], factor: 0.06 },
            methodMarks: 1,
            feedback: "6% of 3,00,000 is 18,000. The commonest slip here is applying the full 12%.",
          },
          { row: "s12", col: "sgst", expected: 18000, marks: 1, derivedFrom: { op: "product", from: ["s12:value"], factor: 0.06 }, methodMarks: 1 },
          {
            row: "s18",
            col: "cgst",
            expected: 63000,
            marks: 2,
            derivedFrom: { op: "product", from: ["s18:value"], factor: 0.09 },
            methodMarks: 1,
          },
          { row: "s18", col: "sgst", expected: 63000, marks: 1, derivedFrom: { op: "product", from: ["s18:value"], factor: 0.09 }, methodMarks: 1 },
          {
            row: "outtot",
            col: "cgst",
            expected: 86000,
            marks: 2,
            derivedFrom: { op: "sum", from: ["s5:cgst", "s12:cgst", "s18:cgst"] },
            methodMarks: 1,
          },
          {
            row: "outtot",
            col: "sgst",
            expected: 86000,
            marks: 2,
            derivedFrom: { op: "sum", from: ["s5:sgst", "s12:sgst", "s18:sgst"] },
            methodMarks: 1,
          },
          {
            row: "net",
            col: "cgst",
            expected: 35000,
            marks: 3,
            derivedFrom: { op: "difference", from: ["outtot:cgst", "itc:cgst"] },
            methodMarks: 2,
            feedback: "Output CGST 86,000 less CGST credit 51,000 gives 35,000 payable in cash under that head.",
          },
          {
            row: "net",
            col: "sgst",
            expected: 35000,
            marks: 3,
            derivedFrom: { op: "difference", from: ["outtot:sgst", "itc:sgst"] },
            methodMarks: 2,
            feedback:
              "The same arithmetic separately. Credit under one head cannot pay liability under the other, which is why the two are computed apart rather than netted together.",
          },
        ],
        invariants: [
          {
            key: "turnover",
            label: "The slab split reconciles to the month's turnover",
            kind: "column-total",
            cols: ["value"],
            value: 1200000,
            marks: 3,
            hint: "The three slab values must add back to the 12,00,000 of turnover in the books. If they do not, an invoice has been dropped or put in the wrong slab, and that is the check the return itself cannot perform for you.",
          },
          {
            key: "outtotal",
            label: "Total output CGST equals the sum of the slabs",
            kind: "cell-is-column-sum",
            cols: ["cgst"],
            cell: "outtot:cgst",
            marks: 3,
            hint: "The output tax total has to equal the three slab figures added together. A mismatch here almost always means a full rate was applied to one slab instead of half of it.",
          },
        ],
        hints: [
          "Halve every rate before you apply it. Intra-state means the levy is split between the Centre and the state, so the figure you apply is 2.5, 6 or 9 per cent.",
          "Do the six slab cells first, then total them, then subtract the credit. The credit is given to you and already reconciled against 2B, so there is no judgement in the last step.",
          "CGST comes to 5,000 plus 18,000 plus 63,000, which is 86,000, and SGST is the same. Less 51,000 of credit under each head leaves 35,000 payable in cash under each, so 70,000 in total.",
        ],
        workedAnswer: `<table>
<tr><th>Slab</th><th class="num">Taxable value</th><th class="num">CGST</th><th class="num">SGST</th></tr>
<tr><td>5%</td><td class="num">2,00,000</td><td class="num">5,000</td><td class="num">5,000</td></tr>
<tr><td>12%</td><td class="num">3,00,000</td><td class="num">18,000</td><td class="num">18,000</td></tr>
<tr><td>18%</td><td class="num">7,00,000</td><td class="num">63,000</td><td class="num">63,000</td></tr>
<tr><td><strong>Output tax</strong></td><td class="num"><strong>12,00,000</strong></td><td class="num"><strong>86,000</strong></td><td class="num"><strong>86,000</strong></td></tr>
<tr><td>Less input credit</td><td class="num"></td><td class="num">(51,000)</td><td class="num">(51,000)</td></tr>
<tr><td><strong>Payable in cash</strong></td><td class="num"></td><td class="num"><strong>35,000</strong></td><td class="num"><strong>35,000</strong></td></tr>
</table>
<p><strong>Why the two heads are never netted.</strong> Cross-utilisation between CGST and SGST is prohibited, so a credit balance under one head cannot discharge a liability under the other. Here the position is symmetric and it looks like it would not matter. It matters enormously the moment a business buys inter-state and sells intra-state: it accumulates IGST credit while owing CGST and SGST, and two businesses with identical net credit can face very different cash outflows depending on the head composition. Modelling the outflow from a single net GST figure is the most common cash flow error in a growing trading business.</p>
<p><strong>The check that earns its keep.</strong> The three slab values add to 12,00,000, which is the turnover in the books. That reconciliation is the only thing standing between you and a dropped invoice or a misallocated slab, and the return does not perform it. A misallocation is particularly quiet: move 1,00,000 from the 18% slab to the 12% slab and the turnover still ties, while the tax is understated by 6,000 under each head. The slab-wise reconciliation catches the dropped invoice; only reading the invoices catches the misallocation.</p>
<p><strong>What is not on this sheet and should be in your file.</strong> A reconciliation of the 51,000 against GSTR-2B with any mismatch named and explained, because credit claimed beyond 2B is the single most common cause of a notice and the reason is nearly always a supplier who has not filed. A check for reverse charge liabilities on freight, legal fees and imported services, which must be paid in cash even though the credit comes back. And if rule 86B applies, at least 1% of the output liability has to be paid in cash whatever credit is sitting there, which a model built on net liability alone will have missed.</p>`,
        minutes: 28,
        skills: ["GSTR-3B", "Rate slab", "Net tax payable", "Reconciliation"],
      },
    ],
    deliverables: [
      {
        n: 1,
        title: "A month-end GST file somebody else could defend",
        brief: `<p>You have been asked to take over the GST compliance of a 40-lakh-turnover trading business. The previous bookkeeper filed every return on time and kept no working papers at all: the portal has the filings and there is nothing behind them.</p>
<p>Produce the month-end file for March that should have existed. The test is not whether the return is right. It is whether somebody who has never seen this business, sitting in front of a departmental query eighteen months from now, could pick up your file and defend every figure in it without asking you a question.</p>
<p><strong>What to submit</strong></p>
<ol>
<li>The GSTR-3B computation, slab by slab, reconciled to turnover per the books.</li>
<li>A GSTR-2B reconciliation listing every mismatch, its amount, the supplier and what you did about it.</li>
<li>A one-page note covering reverse charge, any blocked credits and the utilisation order you applied.</li>
</ol>
<p>Use the figures from the worksheet in this topic for the outward side, and assume two 2B mismatches: a 9,000 CGST and SGST credit from a supplier who has not filed, and a 2,160 difference where your invoice value and theirs disagree.</p>`,
        requires: [
          {
            key: "computation",
            label: "GSTR-3B computation and turnover reconciliation",
            formats: ["XLSX", "PDF"],
            note: "Slab-wise output tax, credit claimed, utilisation and cash payable, with the slab values tied back to book turnover.",
          },
          {
            key: "recon2b",
            label: "GSTR-2B reconciliation",
            formats: ["XLSX", "PDF"],
            note: "Every mismatch named with supplier, amount, reason and the action taken. A summary that says 'reconciled' is not a reconciliation.",
          },
          {
            key: "note",
            label: "Compliance note",
            formats: ["PDF", "DOCX"],
            note: "One page: reverse charge position, blocked credits identified, utilisation order applied, and anything you could not resolve.",
          },
        ],
        rubric: [
          {
            key: "computation",
            label: "The computation is right and traceable",
            bands: [
              "Figures appear with no derivation, or the rates have not been halved",
              "The tax is computed correctly but nothing ties back to the books",
              "Correct computation with the slab values reconciled to book turnover",
              "Correct, reconciled, and the utilisation order is computed explicitly rather than taken from the portal",
            ],
            weight: 3,
          },
          {
            key: "recon",
            label: "The 2B reconciliation is real work",
            bands: [
              "A statement that the credit agrees, with nothing behind it",
              "Mismatches are totalled but not identified by supplier",
              "Each mismatch is named with supplier, amount and reason",
              "Each mismatch carries an action and an owner, and the non-filing supplier is flagged as a commercial issue rather than only a tax one",
            ],
            weight: 3,
          },
          {
            key: "riskareas",
            label: "The quiet liabilities are picked up",
            bands: [
              "Reverse charge and blocked credits are not mentioned",
              "They are mentioned in general terms without testing the month",
              "The month is tested for freight, legal fees and imported services, and blocked credits are identified",
              "Each is tested, quantified, and the cash effect is stated, including rule 86B if it applies",
            ],
            weight: 2,
          },
          {
            key: "defensibility",
            label: "A stranger could defend it",
            bands: [
              "The file only makes sense to its author",
              "The figures are followable but the judgements are not explained",
              "Every figure has a source and every judgement a stated reason",
              "The file names what could not be resolved and what evidence would resolve it, which is what an eventual query actually needs",
            ],
            weight: 2,
          },
        ],
        modelAnswer: `<p><strong>The outward side.</strong> Slab-wise: 2,00,000 at 5% gives 5,000 CGST and 5,000 SGST; 3,00,000 at 12% gives 18,000 and 18,000; 7,00,000 at 18% gives 63,000 and 63,000. Output tax is 86,000 under each head, and the three taxable values add to 12,00,000, which must equal turnover per the books. That last line is the one a departmental officer will look for, because it is the only evidence that no invoice was dropped.</p>
<p><strong>The 2B reconciliation, which is where the marks are.</strong> Credit per your purchase register is 60,000 under each head; credit per 2B is 51,000. The two differences:</p>
<ul>
<li><em>9,000 each head, supplier has not filed.</em> Do not claim it. Section 16(2)(c) makes the supplier's filing a condition of your credit, so claiming it is a liability waiting to be found. Write to the supplier, and treat it as a procurement issue: hold back payment until the supply appears in 2B. This is the item most bookkeepers claim anyway, and it is the single most common cause of a notice.</li>
<li><em>2,160, invoice value disagreement.</em> Check your own invoice first. If the supplier's figure is right, your purchase is understated and the correction affects purchases as well as credit, which is why this one cannot be resolved inside the GST file alone.</li>
</ul>
<p><strong>The quiet liabilities.</strong> Test the month's expenses for freight to a goods transport agency, any advocate's fee, and any payment to an overseas service provider. All three attract reverse charge, must be paid in cash, and net to nil once the credit is taken, which is exactly why they get omitted. The department finds them from the expense side of the income tax return, not from the GST return.</p>
<p>Check also for blocked credits under section 17(5). In a trading business of this size the usual candidates are motor vehicle running costs, staff food and any office fit-out work. Credit on those is not recoverable and a budget that assumed it was will be short by roughly the tax fraction.</p>
<p><strong>What separates a strong submission.</strong> Writing down the utilisation order you applied rather than accepting what the portal computed. IGST credit is exhausted first, and CGST and SGST credit cannot cross-utilise, so the cash figure is not simply output less total credit. And naming what you could not resolve: if you cannot tell whether the 2,160 difference is your error or the supplier's, say so and say that the supplier's copy of the invoice would settle it. A file that admits its open items is more defensible than one that implies everything was clean.</p>`,
        minutes: 180,
        skills: ["GSTR-3B", "Reconciliation", "Net tax payable"],
      },
    ],
  },

  /* ===================================================================== */
  5081: {
    topicId: 5081,
    title: "Fraud red flags and the ethics of the figure",
    summary:
      "Most accounting fraud is not clever. It is a small anomaly that nobody asked about, repeated until it was large.",
    concepts: ["Segregation of duties", "Red flag", "Round-sum anomaly", "Professional scepticism", "Whistleblowing"],
    glossary: {
      "Segregation of duties": "Splitting a process so that no one person can both commit and conceal an error.",
      "Red flag": "An observable pattern that is consistent with fraud and worth asking about.",
      "Round-sum anomaly": "An unusual concentration of round figures, often a sign of estimated or fabricated entries.",
      "Professional scepticism": "A questioning mind that does not assume honesty or dishonesty, and seeks evidence either way.",
      Whistleblowing: "Raising a concern through a channel outside the ordinary reporting line.",
      "Override of controls": "A senior person bypassing a control, which is the mechanism behind most large frauds.",
    },
    body: {
      Beginner: `<p>Fraud in a small business is rarely dramatic. It is usually one person who has been allowed to do too many parts of the same job, taking a small amount for a long time.</p>
<div class="key-idea"><span class="callout-label">The strongest protection is boringly simple</span><p>The person who orders something should not be the person who pays for it, and neither should be the person who checks the bank statement. A single person then cannot both take the money and hide the fact.</p></div>
<h3>The signs are mundane</h3>
<p>A supplier nobody has heard of. Payments just under the limit that would need a second signature. A bookkeeper who never takes leave and gets uncomfortable when someone else opens the ledger. Lots of suspiciously round numbers.</p>
<div class="warning"><span class="callout-label">None of those proves anything</span><p>Each is a reason to ask a question, and the question is the control. Most frauds that run for years ran because the anomaly was visible and nobody wanted the awkward conversation.</p></div>`,
      Intermediate: `<p>The usual framing is the fraud triangle: pressure, opportunity and rationalisation. Only one of those is within an employer's control, which is why the practical emphasis sits on opportunity, and opportunity is created overwhelmingly by concentration of duties rather than by weak people.</p>
<h3>Three red flags worth memorising, because they are cheap to check</h3>
<table>
<tr><th>Flag</th><th>What it suggests</th></tr>
<tr><td>Payments clustering just below an authorisation threshold</td><td>Somebody who knows where the threshold is</td></tr>
<tr><td>Round figures in a population that should be irregular</td><td>Fabricated or estimated entries</td></tr>
<tr><td>Profit and operating cash flow diverging without explanation</td><td>Manipulation flatters profit and cannot manufacture cash</td></tr>
</table>
<h3>Override is the mechanism behind nearly every large fraud</h3>
<p>It is the one a control framework structurally cannot prevent, since the person overriding is the person the framework reports to. The only real mitigations are independent review, a channel for raising concerns that does not pass through the person concerned, and a culture where the question gets asked.</p>
<div class="warning"><span class="callout-label">Escalate, do not investigate</span><p>A quiet enquiry destroys evidence, warns the person involved and places you personally at risk. It is the single most common mistake made in good faith.</p></div>`,
      Advanced: `<p>The empirical profile is consistent across jurisdictions and contradicts intuition.</p>
<table>
<tr><th>Finding</th><th>Implication</th></tr>
<tr><td>Detected by tip far more often than by audit or controls</td><td>The reporting channel outperforms additional procedures</td></tr>
<tr><td>Median duration before detection measured in years</td><td>Loss rises with duration, so value is in detecting early</td></tr>
<tr><td>Smaller organisations suffer higher median losses</td><td>They have the least segregation</td></tr>
</table>
<h3>Digit distribution tests, properly understood</h3>
<p>Benford's law describes leading digits in many naturally occurring multiplicative datasets, and genuine accounting populations often approximate it. A deviation is not evidence of fraud: it is evidence the population is not of that character, which happens for innocent reasons such as price points, authorisation thresholds and round-number contracting. The test selects where to look, and treating its output as a finding is the error.</p>
<h3>Reporting duties are not discretionary</h3>
<p>Suspicion triggers escalation under the applicable ethical code, and for a statutory auditor section 143(12) of the Companies Act requires reporting to the Board or Audit Committee and, above a threshold, to the Central Government within prescribed timelines. Those duties survive a client instruction to the contrary and cannot be discharged by resigning quietly.</p>
<div class="field"><span class="callout-label">The subtler professional risk</span><p>Nobody asks you to falsify a figure. They ask you to accept an estimate slightly more favourable than the evidence supports, repeatedly, each time by a small margin. Because each step is defensible there is no obvious moment to object. Documenting the basis for each estimate at the time makes the drift visible in a way no single judgement does.</p></div>`,
      Expert: `<p>Three factors in the standard model and only opportunity is tractable, which is why control design concentrates there. The harder result is that the concentration-of-duties problem has no solution at small scale.</p>
<div class="key-idea"><span class="callout-label">The honest design for a three-person finance function</span><p>Substitute owner involvement for segregation, specifically owner review of the bank statement itself rather than of a reconciliation prepared by the person under test. A control matrix documenting a segregation nobody practises is worse than none.</p></div>
<h3>Management override as a structural limit</h3>
<p>Every control operates within an authority that can suspend it, so override risk is irreducible by internal design and can only be addressed from outside the reporting line: external audit, an audit committee with genuine independence, and a whistleblowing channel terminating somewhere other than at management. The empirical record is that the first two detect a modest fraction and the third detects the plurality, which is uncomfortable given where the profession puts its effort.</p>
<h3>Accrual-based earnings quality measures, and their limit</h3>
<p>Total accruals to assets, and the discretionary accruals residual from a Jones-type model, both carry real information in large samples and essentially none about any individual firm, because the standard errors swamp the point estimate at n equals one. Using them to select a population for closer work is sound; characterising a specific company with them is a statistical error dressed up as rigour, and it appears regularly in commentary.</p>
<div class="field"><span class="callout-label">A convenient alignment worth being explicit about</span><p>A contemporaneous file documenting the evidential basis for each judgement is both a professional duty and the thing that distinguishes an accountant who was misled from one who participated.</p></div>`,
    },
    scenarios: [
      {
        n: 1,
        title: "The supplier nobody has heard of",
        blurb:
          "Four payments, each just under the second-signature threshold, to a vendor added three months ago. What you do in the next hour decides whether this becomes a case or a cover-up.",
        role: "You are the accountant at a 60-person manufacturing firm, reporting to the Finance Manager.",
        start: "f1",
        minutes: 15,
        idealPath: ["f1", "f2", "f3"],
        nodes: [
          {
            id: "f1",
            situation: `<p>You are reviewing the purchase ledger and notice Vidarbha Engineering Services. Added as a vendor three months ago. Four payments since: 48,500, 49,000, 47,800 and 49,200 rupees. Your second-signature threshold is 50,000.</p>
<p>The invoices describe "maintenance support services" with no detail. There is no purchase order against any of them. All four were approved by your Finance Manager, who is also the person who added the vendor.</p>`,
            prompt: "What do you do?",
            choices: [
              {
                id: "a",
                label: "Document what you have found and take it outside your reporting line",
                outcome:
                  "You take screenshots of the vendor master record with its creation date and user, the four payment vouchers and the invoices, and save them somewhere your Finance Manager does not control. Then you ask for a meeting with the Managing Director. You have not accused anybody of anything, and you have preserved the evidence.",
                next: "f2",
                delta: 3,
                cost: { minutes: 45 },
              },
              {
                id: "b",
                label: "Ask the Finance Manager to explain the four payments",
                outcome:
                  "He tells you it is a consultant he uses for shop floor work and that he will send the engagement letter. The letter arrives two days later, dated nine months ago, and the vendor's bank account is closed by the end of the week. You have warned the one person who could destroy the evidence, and you did it in good faith.",
                next: "f4",
                delta: -2,
                cost: { minutes: 20 },
              },
              {
                id: "c",
                label: "Call the number on the invoice and investigate yourself",
                outcome:
                  "A mobile number, answered by someone who says he will call back and does not. You have now left a trace that somebody is looking, you have no authority to investigate, and anything you find yourself is worth less than the same thing found by someone whose job it is.",
                next: "f2",
                delta: -1,
                cost: { minutes: 60 },
              },
              {
                id: "d",
                label: "Nothing. All four are within the approval limit and properly authorised",
                outcome:
                  "Each payment is individually compliant, which is precisely the point: four payments at 97% of the threshold, to a vendor created by the approver, with no purchase order and a one-line description, is a pattern rather than four transactions. The payments continue for another fourteen months.",
                next: "f4",
                delta: -3,
                cost: { minutes: 0 },
                violation:
                  "A clear red-flag pattern was observed and not escalated.",
              },
            ],
          },
          {
            id: "f2",
            situation: `<p>You are in front of the Managing Director with your file. She asks the obvious question: what exactly are you alleging?</p>`,
            prompt: "How do you put it?",
            choices: [
              {
                id: "a",
                label: "Describe the pattern, name no conclusion, and recommend an independent review",
                outcome:
                  "You say: a vendor created by the person who approves its payments, four amounts within 4% of the authorisation threshold, no purchase orders, and invoice descriptions that do not identify a deliverable. You say you do not know whether there is an innocent explanation and that finding out is not your job. She appoints the firm's auditors to look at it that afternoon, and asks you to put the vendor on hold without telling anyone why.",
                next: "f3",
                delta: 3,
                cost: { minutes: 30 },
              },
              {
                id: "b",
                label: "Tell her the Finance Manager has been taking money",
                outcome:
                  "You may be right and you have overstated what you know. She now has an accusation rather than a set of observations, and if it turns out there is a consultancy agreement you have damaged a colleague and your own judgement is in question. The file said everything that needed saying.",
                next: "f3",
                delta: 0,
                cost: { minutes: 30 },
              },
              {
                id: "c",
                label: "Soften it: say there are some documentation gaps worth tidying up",
                outcome:
                  "She agrees that documentation should be improved and asks the Finance Manager to tighten it up. The pattern you actually came to report has been converted into a filing issue and handed back to the person it concerns.",
                next: "f4",
                delta: -2,
                cost: { minutes: 20 },
              },
            ],
          },
          {
            id: "f3",
            situation: `<p>The auditors find no engagement, no deliverables and a bank account in the name of the Finance Manager's brother-in-law. Total 1,94,500 rupees over three months. The matter goes to the board, the firm reports it, and the threshold-based approval limit is replaced with a rule requiring a purchase order for every vendor payment regardless of amount.</p>`,
            prompt: "",
            ending: {
              verdict: "ideal",
              title: "Escalated, not investigated",
              debrief: `<p>The single most important thing you did was not detect the fraud. It was to resist investigating it. A quiet enquiry would have warned the one person able to destroy the evidence, and the version where you ask the Finance Manager for an explanation is the version where an engagement letter appears dated nine months ago and a bank account closes. That route is taken in good faith constantly, and it is the most common way a detectable fraud becomes undetectable.</p>
<p>The second thing was describing a pattern rather than asserting a conclusion. Four payments at 97% of a 50,000 threshold is not four compliant transactions, it is somebody who knows where the threshold is. Add a vendor created by its own approver, no purchase orders, and a description that identifies no deliverable, and you have enough to require an independent look and nowhere near enough to name a crime. Saying exactly that is both more accurate and more persuasive than an accusation.</p>
<p>Note where the detection came from. Occupational fraud is found by tip far more often than by audit or by controls, and median duration before detection runs to years, with loss rising the longer it runs. The entire value of what you did lies in it being month three rather than month seventeen.</p>
<p>And note the fix. The control that failed was not the approval limit, it was the limit existing without a purchase order requirement, which made the threshold a target rather than a constraint. Removing the concentration of duties, so that the person who creates a vendor cannot approve its payments, is the change that matters more than the limit itself.</p>`,
            },
          },
          {
            id: "f4",
            situation: `<p>The payments continue. When they are eventually found, the questions include why they were not raised earlier, and your review notes show you looked at this ledger.</p>`,
            prompt: "",
            ending: {
              verdict: "poor",
              title: "The pattern was visible and the conversation did not happen",
              debrief: `<p>Every route here fails on the same point: a pattern that was visible stayed inside the reporting line it concerned. Doing nothing because each payment was within the approval limit is the most defensible-sounding and the weakest. Individual compliance is what the pattern is constructed from. Four payments at 97% of a threshold, approved by the person who created the vendor, with no purchase order and no identifiable deliverable, is a single observation about a system and not four observations about transactions.</p>
<p>Asking the Finance Manager is the one most people choose, and it is the one that destroys the case. You hand the only person with motive and access three days of warning. The instinct behind it is decent, which is exactly why it needs naming as an error rather than as a kindness: the request for an explanation belongs to whoever has the authority to investigate, and that is never the person reporting to the subject.</p>
<p>Softening it to a documentation issue is the subtlest failure. You escalated and then withdrew the content of the escalation, and the matter was routed back to the person it concerned with instructions to tidy up. The Managing Director acted reasonably on what she was told; she was told the wrong thing.</p>
<p>What all three needed was the same hour of work: preserve the evidence somewhere the subject does not control, describe the pattern without drawing a conclusion, and take it to someone outside the line. Escalate, do not investigate. That ordering is not timidity, it is what keeps the evidence admissible and keeps you out of it.</p>`,
            },
          },
        ],
        skills: ["Segregation of duties", "Red flag", "Professional scepticism"],
      },
    ],
  },
};

export default curriculum;
