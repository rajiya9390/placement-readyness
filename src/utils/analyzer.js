/**
 * Placement Readiness Heuristic Analyzer
 * No External APIs - Pure Logic
 */

export const SKILL_CATEGORIES = {
    'Core CS': ['DSA', 'OOP', 'DBMS', 'OS', 'Networks'],
    'Languages': ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go'],
    'Web': ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL'],
    'Data': ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
    'Cloud/DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
    'Testing': ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest']
};

export const QUESTION_BANK = {
    'SQL': 'Explain indexing and when it helps. How do you optimize a slow join query?',
    'React': 'Explain state management options in React. What are the trade-offs of using Context vs Redux?',
    'DSA': 'How would you optimize search in sorted data? Explain the time complexity of QuickSort.',
    'Node.js': 'Explain the event loop in Node.js. How does it handle concurrency?',
    'Java': 'What are the pillars of OOP and how are they implemented in Java?',
    'Python': 'Explain the difference between a list and a tuple in Python. When to use which?',
    'JavaScript': 'What is a closure in JavaScript? Provide a real-world use case.',
    'DBMS': 'Explain ACID properties in a database system.',
    'Docker': 'What is the difference between an Image and a Container?',
    'AWS': 'What are the core components of the AWS cloud infrastructure (EC2, S3, RDS)?',
    'OS': 'What is virtual memory and how does paging work?',
    'Default': 'Tell me about a challenging project you worked on and the technical hurdles you overcame.'
};

export function extractSkills(jdText) {
    const detected = {};
    const lowerJD = jdText.toLowerCase();
    let totalDetected = 0;

    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
        const found = skills.filter(skill => {
            // Use word boundaries for accurate matching
            const regex = new RegExp(`\\b${skill.replace(/[+#]/g, '\\$&')}\\b`, 'i');
            return regex.test(lowerJD);
        });

        if (found.length > 0) {
            detected[category] = found;
            totalDetected += found.length;
        }
    });

    return {
        grouped: detected,
        flat: Object.values(detected).flat(),
        categoriesCount: Object.keys(detected).length
    };
}

export function calculateReadinessScore(params) {
    const { categoriesCount, company, role, jdText } = params;
    let score = 35;

    // +5 per category (max 30)
    score += Math.min(categoriesCount * 5, 30);

    // +10 if company provided
    if (company && company.trim().length > 0) score += 10;

    // +10 if role provided
    if (role && role.trim().length > 0) score += 10;

    // +10 if JD length > 800
    if (jdText && jdText.length > 800) score += 10;

    return Math.min(score, 100);
}

export function generateChecklist(extracted) {
    const { flat } = extracted;
    const isWeb = flat.some(s => SKILL_CATEGORIES.Web.includes(s));
    const isData = flat.some(s => SKILL_CATEGORIES.Data.includes(s));

    return [
        {
            round: 'Round 1: Aptitude / Basics',
            items: [
                'Practice quantitative aptitude (Time & Work, Profit/Loss)',
                'Review logical reasoning patterns',
                'Basic coding (String manipulation, Arrays)',
                'Brush up on verbal ability',
                'Speed math techniques'
            ]
        },
        {
            round: 'Round 2: DSA + Core CS',
            items: [
                'Revise Linked Lists and Trees',
                'Implement Binary Search and Sorts',
                ...flat.slice(0, 3).map(s => `Basics of ${s} concepts`),
                'Conceptual OS and DBMS questions',
                'Complexity analysis (Big O)'
            ]
        },
        {
            round: 'Round 3: Tech Interview (Projects + Stack)',
            items: [
                'Prepare 2-minute project elevator pitches',
                isWeb ? 'Revise Frontend architecture and API handling' : 'Revise System Architecture',
                isData ? 'Explain DB schema and Query optimization' : 'Revise data management',
                ...flat.map(s => `Advanced ${s} features & patterns`),
                'Live coding: Implement a small feature from the JD stack'
            ]
        },
        {
            round: 'Round 4: Managerial / HR',
            items: [
                'Prepare "Tell me about yourself" for this specific company',
                'Why do you want to join?',
                'Situation-based questions (Conflict, Leadership)',
                'Weakness vs Strength strategy',
                'Salary and Role expectations alignment'
            ]
        }
    ];
}

export function generatePlan(extracted) {
    const { flat } = extracted;
    const hasReact = flat.includes('React');

    return [
        { day: 'Day 1-2', task: 'Basics + core CS', description: 'Review OS concepts, basic OOP, and networking basics.' },
        { day: 'Day 3-4', task: 'DSA + coding practice', description: `Solve 5 problems daily related to ${flat.length > 0 ? flat[0] : 'Arrays/Strings'}.` },
        { day: 'Day 5', task: 'Project + resume alignment', description: `Highlight ${flat.slice(0, 2).join(', ')} in your project descriptions.` },
        { day: 'Day 6', task: 'Mock interview questions', description: `Self-interview on ${hasReact ? 'React state management and hooks' : 'core architectural concepts'}.` },
        { day: 'Day 7', task: 'Revision + weak areas', description: 'Quick scan of missed concepts and final resume review.' }
    ];
}

export function generateQuestions(extracted) {
    const { flat } = extracted;
    const questions = [];

    // Use unique set of mapped questions
    const uniqueSkills = [...new Set(flat)];
    uniqueSkills.forEach(skill => {
        if (QUESTION_BANK[skill]) questions.push(QUESTION_BANK[skill]);
    });

    // Fill up to 10
    if (questions.length < 10) {
        const core = SKILL_CATEGORIES['Core CS'];
        core.forEach(s => {
            if (questions.length < 10 && QUESTION_BANK[s]) questions.push(QUESTION_BANK[s]);
        });
    }

    while (questions.length < 10) {
        questions.push(QUESTION_BANK.Default);
    }

    return questions.slice(0, 10);
}

export function performAnalysis(data) {
    const { company, role, jdText } = data;
    const extracted = extractSkills(jdText);
    const readinessScore = calculateReadinessScore({
        categoriesCount: extracted.categoriesCount,
        company,
        role,
        jdText
    });

    return {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        company: company || 'General',
        role: role || 'Candidate',
        jdText,
        extractedSkills: extracted.grouped,
        readinessScore,
        plan: generatePlan(extracted),
        checklist: generateChecklist(extracted),
        questions: generateQuestions(extracted)
    };
}
