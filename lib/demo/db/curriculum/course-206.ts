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
<p>That is the whole idea. A transaction never changes just one thing. If you buy a kettle for 2,000 rupees cash, your cash goes down by 2,000 and your equipment goes up by 2,000. If you buy it on credit, your equipment goes up by 2,000 and the amount you owe the shop goes up by 2,000.</p>
<p>People find accounting hard because they try to memorise rules before they can see the pairs. So practise the seeing first. For any event, ask two questions. What came in or went out? And where did it come from or go to? The answer to both questions together is the transaction.</p>
<p>One more thing to know early: accounting only records events you can measure in money and prove with a document. Hiring a brilliant cook is good news but it is not a transaction. Paying that cook 8,000 rupees is.</p>`,
      Intermediate: `<p>A transaction is an event that changes the composition of a business and can be measured in money. The defining property is that it always changes at least two accounts, which is why the system that records it is called double entry.</p>
<p>The structural reason sits in one identity: assets equal liabilities plus equity. It holds at every instant, not just at year end. Any event that increased only one side would break it, so no such event can be recorded; what looks like a one-sided change is always a pair where you have not yet found the second half.</p>
<p>Work through a purchase of machinery for 1,50,000 rupees, half paid by cheque and half on credit. Assets rise by 1,50,000 for the machinery and fall by 75,000 for the bank, a net asset increase of 75,000. Liabilities rise by 75,000 for the amount still owed. Both sides moved by 75,000, so the identity survives.</p>
<p>Two distinctions matter from the start. A transaction is not the same as a cash movement: a credit sale is a transaction on the day the goods leave, not the day the customer pays. And a transaction needs a source document, because an entry nobody can trace to an invoice or bank advice is an assertion rather than a record, and it is the first thing an auditor pulls on.</p>`,
      Advanced: `<p>Treat the accounting equation as an invariant that the recording system is built to preserve, and double entry becomes an engineering choice rather than a convention. Every posting is a transformation that must leave assets minus liabilities minus equity equal to zero. Because the invariant is checked arithmetically at every level of aggregation, a violation surfaces as an imbalance you can find, which is the property that made the technique survive five centuries.</p>
<p>The subtler content is in recognition: deciding when an event has occurred at all. Under accrual accounting the trigger is the transfer of control or the incurring of an obligation, not settlement. A customer order is not a transaction, because neither party has yet done anything irreversible. Dispatch under an enforceable contract is, because a receivable now exists and revenue has been earned.</p>
<p>Measurement is a second decision, independent of the first. An asset acquired for 1,50,000 rupees enters at that cost even if its market value is 2,00,000, because historical cost is verifiable from a document and a valuation is an opinion. The cost of this choice is a balance sheet that systematically understates appreciating assets, which is why disclosure exists alongside measurement.</p>
<p>This also explains why some events with large economic consequences never appear. An operating lease commitment, a key-person dependency and a pending lawsuit all change what a business is worth without producing a measurable obligation at a point in time, so they live in the notes rather than the ledger.</p>`,
      Expert: `<p>The equation is better read as a statement about the closure of a double-entry system under its own operations. Define the ledger as a set of accounts with signed balances and require that the signed sum over all accounts be identically zero. Posting is then any operation preserving that sum, and the familiar categories of asset, liability and equity are a partition imposed on the account set for presentation, not a feature of the algebra. This is why the equation can be rearranged freely and why a trial balance that sums to zero tells you about arithmetic rather than about truth.</p>
<p>Recognition is the hard boundary, and the standards treat it as a question about control rather than about risk. Ind AS 115 locates revenue at the satisfaction of a performance obligation, which replaced a transfer-of-risks test precisely because risk is continuous and control is comparatively discrete. The practical consequence for a bookkeeper is that the recognition date is a matter of contract analysis, and two competent accountants can disagree on it in good faith.</p>
<p>Measurement then layers a mixed attribute model on top. Historical cost for most non-financial assets, fair value for several classes of financial instrument, recoverable amount on impairment. The model is incoherent as a single theory of value and defensible as a set of local compromises between relevance and verifiability, and knowing which compromise applies to a given line is most of what distinguishes a preparer from a data entry operator.</p>
<p>Finally, note what the system structurally cannot represent: anything whose obligation is not measurable at a point in time. That gap is the permanent reason financial statements are read alongside their notes rather than instead of them, and it is why off-balance-sheet structuring has been a recurring source of accounting scandal rather than an occasional one.</p>`,
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
<p>Picture every account as a page with a line down the middle. Cash has a page. Rent has a page. Your supplier has a page. Whatever happens, something goes on the left of one page and the same amount goes on the right of another page.</p>
<p>Now the single rule worth learning. Assets and expenses grow on the left. Liabilities, your own capital, and income grow on the right. So when cash comes in, cash grows, and cash is an asset, so it goes on the left. When you pay rent, rent is an expense, so rent goes on the left, and cash is going down, so cash goes on the right this time.</p>
<p>You will meet acronyms that promise to do this for you. Skip them. They work until the first unusual transaction and then they fail silently, which is worse than not having a rule at all. The two-sided rule above never fails, and after thirty transactions you will stop having to recite it.</p>`,
      Intermediate: `<p>Debit and credit are positional labels: debit is the left column of an account and credit is the right. The confusion they cause is almost entirely a vocabulary problem, because a bank uses the words from its own books rather than yours, so the "credit" on your statement is the bank recording that it owes you more.</p>
<p>The rule that replaces all the mnemonics follows from the accounting equation. Assets sit on the left of the identity, so they increase with a left-side entry. Liabilities and equity sit on the right, so they increase with a right-side entry. Income increases equity, which puts it on the right, and expenses reduce equity, which puts them on the left. Five categories, one derivation, nothing to memorise.</p>
<p>Test it on something awkward. You repay 50,000 rupees of a bank loan by cheque. The loan is a liability being reduced, and liabilities increase on the right, so a reduction is a left-side entry: debit Bank Loan 50,000. The bank balance is an asset being reduced, so it takes the right side: credit Bank 50,000. No acronym was consulted.</p>
<p>One practical habit: name the two accounts before you decide the sides. Most errors at this stage are not side errors but account errors, where a learner debits "Purchases" for something that was actually an asset acquisition, and the sides were never the problem.</p>`,
      Advanced: `<p>The debit and credit convention is a sign system chosen so that the invariant is checkable by addition rather than by subtraction. Assign debit as positive and credit as negative, and the requirement becomes that every transaction sums to zero across accounts. Journal validation is then a single arithmetic test that holds at any level of aggregation, from one entry to a year of them, which is the property that makes a trial balance possible at all.</p>
<p>Categorising accounts into real, nominal and personal is the classical Indian presentation, and it carries a useful distinction the five-element model obscures: real accounts persist across periods while nominal accounts are closed to the profit and loss account and reopened at zero. That difference is what makes year-end closing a mechanical operation rather than a judgement, and it determines which balances a trial balance carries forward.</p>
<p>The common failure in practice is misclassification rather than inversion. Debiting an expense for what is in substance a capital acquisition understates profit this year and overstates it in every later year, and because both sides of the entry are internally consistent the trial balance still balances. No arithmetic check will find it; only a reviewer asking whether the benefit extends beyond this period will.</p>
<p>Contra entries are worth separating explicitly. A cash withdrawal from the business bank account moves value between two of the business's own asset accounts, so it debits Cash and credits Bank and touches neither income nor obligation. Treating it as an expense is a recurring error in small-business books and inflates both expenses and apparent cash discipline problems.</p>`,
      Expert: `<p>Formally, a journal entry is a vector in the free module over the set of accounts, constrained to the hyperplane where coordinates sum to zero. Debit and credit are the sign convention on that module, and the ledger is the running total of all posted vectors. Nothing in the formalism privileges either direction, which is why the words are arbitrary and why every attempt to teach them as semantic rather than positional eventually confuses someone.</p>
<p>The interesting constraint is not arithmetic but classificatory. The chart of accounts is a partition whose granularity determines what questions the books can answer later, and that choice is irreversible without restating history. A business that posts all vehicle running costs to a single Motor Expenses account cannot later separate fuel from maintenance for the periods already closed, and a business that splits them per vehicle can answer a utilisation question its competitor cannot. Chart design is therefore a reporting decision taken at the point of recording.</p>
<p>Capital versus revenue classification is the highest-consequence judgement at this level, and it is deliberately not reducible to a rule. The tests in practice are whether the expenditure extends the asset's capacity or useful life, whether it merely restores previously assumed performance, and whether it is incurred to bring an asset into working condition for its intended use. The last of these pulls installation, freight and non-refundable duties into cost, which is where learners most often diverge from the standard.</p>
<p>Since both halves of a misclassified entry are self-consistent, detection is a control problem rather than an arithmetic one. This is the structural reason capital expenditure authorisation, asset registers and reviews of repairs accounts above a threshold exist as separate controls, and why an unqualified audit opinion is not evidence that classification was correct.</p>`,
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
<p>To answer that you need everything about cash in one place. So each account gets its own page with a left and a right side, and you copy each journal line onto the page it names. Copying is all posting means. A debit in the journal becomes a debit on the page; you never flip the side.</p>
<p>When you want a figure, you add up each side of the page and find the difference. If the left adds to 90,000 and the right to 55,000, the account has 35,000 left over on the debit side, and that is the balance.</p>
<p>Do it slowly at first and tick each journal line as you post it. Almost every error at this stage is a line posted twice or not at all, and a tick stops both.</p>`,
      Intermediate: `<p>Posting is a transformation from one ordering to another. The journal is chronological, which makes it the evidential record: it shows what was recorded and when, and an auditor reads it to establish a sequence. The ledger is organised by account, which makes it the analytical record, and it is the only form from which a balance can be read.</p>
<p>The mechanics are deliberately dull. Each journal line names an account, a side and an amount, and posting writes exactly that onto the account. Nothing is recalculated and nothing is flipped. The reason the rule is so rigid is that it keeps the arithmetic invariant: since each journal entry summed to zero, the whole ledger sums to zero too, and any imbalance you later find is a posting error rather than a thinking error.</p>
<p>Balancing an account means totalling both columns, writing the difference on the smaller side as "balance carried down", and bringing the same figure in on the opposite side as the next period's opening balance. The double appearance is not duplication: one occurrence closes this period, the other opens the next.</p>
<p>Real accounts carry their balance forward. Nominal accounts do not: at the year end their balances are transferred to the profit and loss account and the accounts reopen at zero, which is why a Rent Expense account never has an opening balance.</p>`,
      Advanced: `<p>In a manual system the folio reference is the control that makes posting auditable: each journal line records the ledger page it went to and each ledger line records the journal page it came from, so a line that was posted twice or not at all is findable by following references rather than by recomputing totals. Software replaces this with an immutable link from entry to account, which is why a correctly designed accounting package has no "post" step at all and why a package that does have one usually also has an unposted-batch problem.</p>
<p>The useful mental model for balancing is that an account is a running signed total and the balance is its value at a point in time. Presenting it as two columns and a difference is a convention from pen and paper, and it survives because the two totals are themselves useful: knowing that Trade Receivables had 14,00,000 of debits and 12,60,000 of credits in a year tells you about billing and collection volumes, which a net movement of 1,40,000 conceals entirely.</p>
<p>Control accounts extend the same idea one level up. Individual customer accounts live in a subsidiary ledger, and a single Trade Receivables control account in the main ledger carries their total. The reconciliation between the two is an independent check on the subsidiary ledger's completeness, and it catches a class of error that the trial balance cannot see, because a misposting between two customer accounts leaves every total unchanged.</p>
<p>The error profile here is specific and worth memorising. A one-sided posting breaks the trial balance. A transposition within one side breaks it by a multiple of nine, which is a fast arithmetic check. A posting to the wrong account on the correct side does not break it at all, and neither does a compensating pair of errors.</p>`,
      Expert: `<p>Posting is the materialisation of an index. The journal is the write-ahead log and the ledger is a projection of it grouped by account, which means the ledger is derived data and the journal is the system of record. Every well-designed accounting system makes that explicit, keeps the journal append-only, and reconstructs balances by replay rather than by mutation. A system that permits editing a posted balance directly has collapsed the distinction and has lost the ability to explain how any figure came to be.</p>
<p>This framing resolves a question practitioners often argue about: whether correcting an error should overwrite the original entry or add a reversing one. If the journal is the record, overwriting destroys evidence and a reversal is the only defensible mechanism, which is also why statutory audit trails and Ind AS alike require that a posted entry not be altered. The cost is a ledger that contains both the mistake and its correction, and that cost is the price of being able to prove anything.</p>
<p>Control account reconciliation deserves treating as a genuine completeness assertion rather than as arithmetic hygiene. The subsidiary ledger and the control account are populated by different processes, one transaction by transaction and one in summary, so agreement between them is evidence that neither process dropped anything. When they disagree the difference localises the failure to one of a small number of mechanisms: an entry posted to the control but not the subsidiary, a direct posting to the control that bypassed the sales process, or a subsidiary entry outside the period.</p>
<p>Finally, the arithmetic of error signatures is worth knowing because it is cheap. A single transposition of digits produces a difference divisible by nine. A single omission produces a difference equal to the omitted amount. A side error produces a difference equal to twice the amount. Checking the difference against these three shapes before searching line by line converts an unbounded hunt into three divisions.</p>`,
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
<p>Here is the part people miss. The trial balance agreeing does not mean your books are right. If you paid the electricity bill and recorded it as rent, both sides still match, because you still put the same amount on each side. You just put one of them in the wrong place.</p>
<p>So treat it as a spell-check, not a proof-read. It finds one specific kind of error, and it is silent about several others. Those others are what the rest of this topic is about.</p>`,
      Intermediate: `<p>A trial balance tests exactly one property: that the sum of debit balances equals the sum of credit balances. Because every journal entry is constructed to sum to zero, the aggregate must too, and a difference is proof of a mechanical failure somewhere in posting or totalling.</p>
<p>The errors it detects are those that break the symmetry. A one-sided posting, where only the debit went in. A side error, where a debit was posted as a credit, which shows up as a difference of twice the amount. An arithmetic slip in totalling an account. A balance carried to the wrong column of the trial balance itself.</p>
<p>Four classes pass through untouched. An error of omission, where the transaction was never recorded, leaves both columns short by the same amount. An error of commission, where the right amount went to the wrong account of the right type, such as one customer debited instead of another. An error of principle, where capital expenditure was expensed. And compensating errors, where two independent mistakes happen to cancel.</p>
<p>When a difference will not resolve, the practical move is a suspense account holding the difference so that work can continue, with the balance investigated and cleared before the accounts are finalised. A suspense balance still sitting there at year end is not a rounding issue, it is an unexplained error, and no set of final accounts should be signed off over one.</p>`,
      Advanced: `<p>Before searching line by line, read the shape of the difference, because three signatures account for most single-error cases. A difference divisible by nine suggests a transposition, since any digit swap changes the value by a multiple of nine. A difference equal to exactly twice a transaction amount suggests a side error. A difference equal to a round transaction amount suggests a one-sided posting or an omitted balance. Testing those three costs a minute and converts an unbounded search into a targeted one.</p>
<p>The deeper point is about what kind of assurance a trial balance is. It is an internal consistency check on a closed arithmetic system, and such a check can never speak to the relationship between the system and the world outside it. Completeness is unverifiable from inside: a sale that was never invoiced leaves no trace anywhere in the ledger, so no amount of internal checking will surface it. That is why completeness assurance comes from reconciliation against external records, chiefly the bank statement and supplier statements, rather than from the trial balance.</p>
<p>Error of principle deserves separate attention because it is both invisible to the trial balance and material to the numbers that matter. Expensing an asset reduces profit now and inflates it later; capitalising a repair does the reverse. Either can move a business from loss to profit, and both leave a perfectly balanced trial balance. The only effective controls are a capitalisation policy with a threshold, an asset register, and a review of repairs and maintenance for items that look like assets.</p>
<p>In software the analogue of a trial balance difference is nearly extinct, because an entry that does not balance is usually rejected at input. The errors that remain are therefore almost entirely the ones the trial balance never caught in the first place, which changes where review effort should go. Spending time on a check the software already enforces is a habit inherited from pen and paper.</p>`,
      Expert: `<p>Cast the ledger as a vector space over accounts with the zero-sum constraint, and the trial balance is the assertion that the aggregate posting vector lies in the constraint hyperplane. The test has nontrivial power only against operations that leave that hyperplane, which is precisely the class of mechanical failures. Any error that is itself a valid zero-sum vector, including every misclassification and every compensating pair, is undetectable by construction rather than by oversight. Stating it this way makes the limitation a theorem instead of a caution.</p>
<p>The consequence for assurance design is that the three financial statement assertions require structurally different evidence. Accuracy is testable internally and the trial balance partially addresses it. Classification requires an external criterion, namely the standards, applied by judgement. Completeness requires an independent population, which is why bank confirmations, supplier statements, cut-off testing and analytical review of gross margin exist as distinct procedures rather than as refinements of one.</p>
<p>Suspense accounts carry a governance dimension that textbooks underplay. A suspense balance is an admission of an unexplained difference, and it is a documented route by which errors become permanent: once a balance sits in suspense across a period end it tends to be written off to the profit and loss account as immaterial, which converts an unknown error into a known adjustment without anyone establishing what happened. Material weaknesses in internal control have been reported over exactly this pattern, and the control is a policy requiring clearance within a short window with named ownership.</p>
<p>Worth noting too that an extended trial balance, with adjustment and final-accounts columns beside the ledger balances, is still the working paper of choice in practice even where software generates statements directly. The reason is that it makes every adjusting judgement visible in one place and reviewable by a second person, which a system that posts adjustments straight into the ledger does not.</p>`,
    },
    worksheets: [
      {
        n: 1,
        title: "Draw up a trial balance that will not balance",
        difficulty: "Medium",
        brief: `<p>These are the closing ledger balances of Hemant Traders at 30 April. Put each one in the debit or the credit column according to what kind of account it is.</p>
<table>
<tr><th>Account</th><th class="num">Balance (₹)</th></tr>
<tr><td>Bank</td><td class="num">1,55,000</td></tr>
<tr><td>Purchases</td><td class="num">60,000</td></tr>
<tr><td>Sales</td><td class="num">45,000</td></tr>
<tr><td>Rent Expense</td><td class="num">18,000</td></tr>
<tr><td>Furniture</td><td class="num">35,000</td></tr>
<tr><td>Trade Payables</td><td class="num">35,000</td></tr>
<tr><td>Drawings</td><td class="num">12,000</td></tr>
<tr><td>Capital</td><td class="num">2,00,000</td></tr>
</table>
<p>Then answer the question in the last row: having balanced, how much of your books has this proved to be correct? Enter the figure in rupees.</p>`,
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
        workedAnswer: `<table>
<tr><th>Account</th><th class="num">Debit</th><th class="num">Credit</th></tr>
<tr><td>Bank</td><td class="num">1,55,000</td><td class="num"></td></tr>
<tr><td>Purchases</td><td class="num">60,000</td><td class="num"></td></tr>
<tr><td>Rent Expense</td><td class="num">18,000</td><td class="num"></td></tr>
<tr><td>Furniture</td><td class="num">35,000</td><td class="num"></td></tr>
<tr><td>Drawings</td><td class="num">12,000</td><td class="num"></td></tr>
<tr><td>Sales</td><td class="num"></td><td class="num">45,000</td></tr>
<tr><td>Trade Payables</td><td class="num"></td><td class="num">35,000</td></tr>
<tr><td>Capital</td><td class="num"></td><td class="num">2,00,000</td></tr>
<tr><td><strong>Total</strong></td><td class="num"><strong>2,80,000</strong></td><td class="num"><strong>2,80,000</strong></td></tr>
</table>
<p><strong>The last row is zero, and that is the lesson of the topic.</strong> The two totals were built from entries that were each constructed to sum to zero. Agreement is therefore a property of the method, not a finding about the books. Four whole classes of error survive it intact.</p>
<p>Suppose the 18,000 had been the electricity bill and you posted it to Rent Expense. Both columns still reach 2,80,000. Suppose you had never recorded the 35,000 furniture purchase at all: both columns fall to 2,45,000 and still agree. Suppose you had treated the furniture as Purchases: profit drops by 35,000, the balance sheet loses an asset, and the trial balance notices nothing.</p>
<p><strong>What would have caught each one.</strong> The electricity misposting is found by someone reading the expense accounts and recognising that the rent is a round monthly figure. The omission is found by reconciling to the supplier's statement, because Modern Furnishers will still think they are owed 35,000. The capitalisation error is found by a policy that says anything over a threshold with a life beyond the year goes to the asset register. None of the three is an arithmetic control, and that is why a set of books is reviewed rather than merely totalled.</p>`,
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
};

export default curriculum;
