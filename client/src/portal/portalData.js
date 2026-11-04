// ASR Author Tracking Portal Central Data Store & State Manager

export const defaultPapers = [
  {
    id: "ASR-2024-ENG-084",
    title: "Deep Learning Based Adaptive MPPT for Hybrid Solar-Wind Microgrid Systems",
    journal: "Energy Conversion and Management (Elsevier)",
    indexing: "SCI / SCIE (Q1) • Scopus Indexed",
    authors: "Dr. K. Sharma (1st Author), Prof. M. Verma, A. Reddy",
    email: "kancharlahemanth89@gmail.com",
    submittedDate: "2024-03-12",
    currentStatus: "Under Review",
    statusCode: "under_review",
    department: "Electrical & Renewable Systems",
    coordinator: "Dr. Rajesh K. (Publication Lead)",
    coordinatorPhone: "+919515207724",
    actionRequired: "Awaiting peer review feedback from 2 external reviewers. Estimated decision: 3-4 weeks.",
    notes: [
      { date: "22 Mar 2024", author: "Dr. Rajesh K.", text: "Reviewers assigned by Editor-in-Chief. Tracking under ID #ECM-2024-918." },
      { date: "14 Mar 2024", author: "Editorial Desk", text: "Technical screening completed with zero formatting remarks." }
    ],
    documents: [
      { id: "doc-1", name: "Submission_Confirmation_Receipt.pdf", size: "420 KB", type: "Submission Proof", date: "14 Mar 2024" },
      { id: "doc-2", name: "Turnitin_Plagiarism_Report_6_Percent.pdf", size: "1.8 MB", type: "Plagiarism Report", date: "10 Mar 2024" },
      { id: "doc-3", name: "Submitted_Manuscript_Blind_Copy.docx", size: "3.2 MB", type: "Manuscript Copy", date: "12 Mar 2024" },
      { id: "doc-4", name: "Copyright_Transfer_Form_Acknowledged.pdf", size: "290 KB", type: "Copyright Form", date: "15 Mar 2024" }
    ],
    timeline: [
      { step: "Paper Registered & Intake Completed", date: "10 Mar 2024", completed: true, desc: "Author metadata & manuscript draft entered into ASR system." },
      { step: "Technical Proofreading & Plagiarism Audit", date: "12 Mar 2024", completed: true, desc: "Plagiarism checked at 6% similarity via Turnitin." },
      { step: "Journal Submission with Proof", date: "14 Mar 2024", completed: true, desc: "Official submission receipt logged and validated." },
      { step: "Under Peer Review", date: "22 Mar 2024", completed: true, active: true, desc: "Manuscript undergoing double-blind peer review." },
      { step: "Editorial Decision & Minor Revisions", date: "Pending", completed: false, desc: "Reviewers' remarks compilation and response drafting." },
      { step: "Acceptance Letter Issued", date: "Pending", completed: false, desc: "Formal signed acceptance letter from Elsevier." },
      { step: "Published Online with DOI", date: "Pending", completed: false, desc: "Volume, Issue & DOI assigned with indexing proof." }
    ],
    payment: {
      status: "Paid",
      amount: "₹ 45,000",
      balance: "₹ 0",
      invoiceId: "INV-ASR-8491",
      date: "10 Mar 2024",
      method: "Bank Transfer (NEFT)",
      receiptName: "INV-ASR-8491_Tax_Receipt.pdf"
    }
  },
  {
    id: "ASR-2023-CS-119",
    title: "Optimized Graph Neural Networks for Fraud Detection in Real-Time Banking Transactions",
    journal: "Knowledge-Based Systems (Elsevier)",
    indexing: "SCI / SCIE (Q1) • Impact Factor: 8.8",
    authors: "Dr. K. Sharma (Corresponding Author), Dr. P. Iyer",
    email: "kancharlahemanth89@gmail.com",
    submittedDate: "2023-11-05",
    currentStatus: "Accepted (In Press)",
    statusCode: "accepted",
    department: "Artificial Intelligence & Computer Science",
    coordinator: "S. Ananya (Senior Editorial Lead)",
    coordinatorPhone: "+919515207724",
    actionRequired: "Galley proof confirmed. Publisher is registering official DOI.",
    notes: [
      { date: "18 Feb 2024", author: "S. Ananya", text: "Paper officially ACCEPTED! Acceptance letter uploaded below." },
      { date: "15 Jan 2024", author: "Editorial Desk", text: "Revised manuscript and point-by-point rebuttal accepted." }
    ],
    documents: [
      { id: "doc-5", name: "Official_Acceptance_Letter_Signed.pdf", size: "650 KB", type: "Acceptance Letter", date: "18 Feb 2024" },
      { id: "doc-6", name: "Proof_Ready_Clean_Manuscript.pdf", size: "2.4 MB", type: "Proof-Ready Paper", date: "22 Feb 2024" },
      { id: "doc-7", name: "Revision_Response_to_Reviewers.pdf", size: "540 KB", type: "Revision Response", date: "15 Jan 2024" },
      { id: "doc-8", name: "Official_GST_Invoice_Receipt.pdf", size: "520 KB", type: "Tax Invoice", date: "06 Nov 2023" }
    ],
    timeline: [
      { step: "Paper Registered & Intake Completed", date: "05 Nov 2023", completed: true, desc: "Manuscript intake verified." },
      { step: "Technical Proofreading & Formatting", date: "08 Nov 2023", completed: true, desc: "Formatting matched to Elsevier requirements." },
      { step: "Journal Submission with Proof", date: "12 Nov 2023", completed: true, desc: "Submission proof recorded." },
      { step: "Under Peer Review", date: "25 Nov 2023", completed: true, desc: "2 rounds of external peer review." },
      { step: "Revision Submitted & Approved", date: "15 Jan 2024", completed: true, desc: "Response to reviewers cleared by Editor." },
      { step: "Acceptance Letter Issued", date: "18 Feb 2024", completed: true, active: true, desc: "Signed letter of acceptance issued." },
      { step: "Published Online with DOI", date: "Scheduled", completed: false, desc: "Awaiting final production issue placement." }
    ],
    payment: {
      status: "Paid",
      amount: "₹ 52,000",
      balance: "₹ 0",
      invoiceId: "INV-ASR-7201",
      date: "06 Nov 2023",
      method: "Online Gateway (Razorpay)",
      receiptName: "INV-ASR-7201_Tax_Receipt.pdf"
    }
  }
];

// Helper to get papers from localStorage or fallback
export const getStoredPapers = () => {
  const local = localStorage.getItem('asr_portal_papers');
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      return defaultPapers;
    }
  }
  return defaultPapers;
};

// Helper to save papers to localStorage
export const saveStoredPapers = (papers) => {
  localStorage.setItem('asr_portal_papers', JSON.stringify(papers));
};

// Helper to get notifications
export const getStoredNotifications = () => {
  return [
    {
      id: "notif-1",
      title: "Manuscript Status Update: Accepted",
      paperId: "ASR-2023-CS-119",
      date: "18 Feb 2024",
      desc: "Knowledge-Based Systems (Elsevier) has officially accepted your paper. View and download your signed acceptance letter.",
      unread: true,
      type: "acceptance"
    },
    {
      id: "notif-2",
      title: "Peer Review Underway",
      paperId: "ASR-2024-ENG-084",
      date: "22 Mar 2024",
      desc: "Energy Conversion and Management has assigned 2 independent reviewers to evaluate your manuscript.",
      unread: false,
      type: "status"
    },
    {
      id: "notif-3",
      title: "Payment Invoice Generated",
      paperId: "ASR-2024-ENG-084",
      date: "10 Mar 2024",
      desc: "Tax invoice INV-ASR-8491 generated and confirmed. Receipt ready for institutional reimbursement.",
      unread: false,
      type: "payment"
    }
  ];
};

