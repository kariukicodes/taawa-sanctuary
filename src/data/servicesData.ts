export type Service = {
  id: string;
  icon: string;
  title: string;
  category: string;
  categoryLabel: string;
  tagline: string;
  description: string;
  approach: string;
  whoItsFor: string[];
  whatToExpect: string[];
  sessionInfo: string;
  relatedIds: string[];
};

export const services: Service[] = [
  {
    id: "individual-counselling",
    icon: "🧠",
    title: "Individual Counselling",
    category: "core",
    categoryLabel: "Core Support",
    tagline: "Personalised mental health support, just for you.",
    description:
      "Individual counselling provides a confidential, one-on-one space where you can explore your thoughts, emotions, and challenges at your own pace. Our counsellors use an integrative approach — drawing from multiple therapeutic models to create a plan that fits your unique personality, background, and goals.",
    approach:
      "We use an eclectic, integrative approach — combining CBT, person-centred therapy, psychodynamic principles, and mindfulness-based techniques depending on what works best for you.",
    whoItsFor: [
      "Anyone feeling overwhelmed, stuck, or struggling emotionally",
      "Those going through a difficult life period or transition",
      "People who want to better understand themselves",
      "Anyone seeking a safe, non-judgmental space to talk",
    ],
    whatToExpect: [
      "A warm, confidential initial consultation to understand your needs",
      "A personalised plan built around your goals",
      "Regular sessions at a pace that works for you",
      "Practical tools and coping strategies between sessions",
    ],
    sessionInfo: "50-minute sessions · Online & In-person · Weekly or fortnightly",
    relatedIds: ["anxiety-stress-burnout", "depression-mood", "self-esteem"],
  },
  {
    id: "trauma-healing",
    icon: "💔",
    title: "Trauma & Emotional Healing",
    category: "core",
    categoryLabel: "Core Support",
    tagline: "Heal what has been buried. Reclaim your peace.",
    description:
      "Trauma can show up in many ways — flashbacks, emotional numbness, relationship difficulties, or a persistent sense of unsafety. Our trauma-informed counsellors create a gentle, paced environment where you can begin to process and heal without being retraumatised.",
    approach:
      "We use trauma-informed approaches including EMDR-informed techniques, somatic awareness, narrative therapy, and safe attachment-based methods to support healing at a pace you control.",
    whoItsFor: [
      "Survivors of childhood trauma or adverse experiences",
      "Those dealing with PTSD or complex trauma (C-PTSD)",
      "People who feel stuck in patterns rooted in past experiences",
      "Anyone who has experienced loss, abuse, or a traumatic event",
    ],
    whatToExpect: [
      "A trauma-informed, paced approach — never forced",
      "Grounding and stabilisation techniques in early sessions",
      "Gradual, safe processing of traumatic memories",
      "Support in rebuilding a sense of safety and self-worth",
    ],
    sessionInfo: "50–80 minute sessions · Online & In-person · Weekly recommended",
    relatedIds: ["narcissistic-abuse", "grief-loss", "individual-counselling"],
  },
  {
    id: "narcissistic-abuse",
    icon: "🔮",
    title: "Narcissistic Abuse Recovery",
    category: "core",
    categoryLabel: "Core Support",
    tagline: "Reclaim your identity after emotional manipulation.",
    description:
      "Narcissistic abuse — whether from a partner, parent, or colleague — leaves deep emotional scars that are often invisible to others. You may doubt your own reality, feel worthless, or struggle to trust again. Our specialised counsellors understand the complexity of this experience and support you in rebuilding your sense of self.",
    approach:
      "We use psychoeducation, CBT, inner child work, and boundary-setting techniques to help you understand what happened, validate your experience, and rebuild healthy self-worth.",
    whoItsFor: [
      "Survivors of emotionally abusive relationships",
      "Those who have experienced gaslighting or manipulation",
      "People struggling with people-pleasing or lack of boundaries",
      "Anyone recovering from a coercive or controlling relationship",
    ],
    whatToExpect: [
      "Validation and psychoeducation about narcissistic dynamics",
      "Support in recognising manipulation patterns",
      "Rebuilding self-esteem and healthy boundaries",
      "Tools to prevent re-entry into toxic relationships",
    ],
    sessionInfo: "50-minute sessions · Online & In-person · Weekly recommended",
    relatedIds: ["trauma-healing", "self-esteem", "relationship-dating"],
  },
  {
    id: "relationship-dating",
    icon: "💑",
    title: "Relationship & Dating Counselling",
    category: "relationships",
    categoryLabel: "Relationships",
    tagline: "Build the relationships you actually want.",
    description:
      "Whether you're struggling in a current relationship, repeating patterns in dating, or recovering from heartbreak — relationship counselling helps you understand your attachment style, communication patterns, and what you truly need from a partner.",
    approach:
      "Drawing from attachment theory, emotionally focused therapy (EFT), and CBT — we help you identify patterns, improve communication, and build secure, fulfilling connections.",
    whoItsFor: [
      "Individuals struggling in their current relationship",
      "Those experiencing repeated unhealthy patterns in dating",
      "People recovering from a breakup or betrayal",
      "Anyone wanting to understand their attachment style",
    ],
    whatToExpect: [
      "Exploration of your relationship history and patterns",
      "Understanding your attachment style and needs",
      "Practical communication and conflict resolution skills",
      "A clearer vision of the relationship you deserve",
    ],
    sessionInfo: "50-minute sessions · Online & In-person · Individual or couples",
    relatedIds: ["family-counselling", "narcissistic-abuse", "self-esteem"],
  },
  {
    id: "family-counselling",
    icon: "👨‍👩‍👧",
    title: "Family Counselling & Conflict Resolution",
    category: "relationships",
    categoryLabel: "Relationships",
    tagline: "Restore harmony and understanding within your family.",
    description:
      "Family conflict — whether between parents and children, siblings, or partners — can be exhausting and isolating. Family counselling creates a structured, neutral space where all voices are heard and families can work toward healthier communication and genuine understanding.",
    approach:
      "We use systemic family therapy, communication frameworks, and conflict resolution tools to address both surface tensions and the deeper patterns driving them.",
    whoItsFor: [
      "Families experiencing ongoing conflict or tension",
      "Parents struggling to communicate with their children",
      "Blended families navigating complex dynamics",
      "Families dealing with a major change or loss",
    ],
    whatToExpect: [
      "A neutral, structured space for all family members",
      "Identification of communication breakdowns",
      "Practical conflict resolution strategies",
      "Improved understanding and empathy between family members",
    ],
    sessionInfo: "60–80 minute sessions · Online & In-person · Flexible scheduling",
    relatedIds: ["relationship-dating", "grief-loss", "individual-counselling"],
  },
  {
    id: "lgbtq-counselling",
    icon: "🏳️‍🌈",
    title: "LGBTQ+ Affirmative Counselling",
    category: "identity",
    categoryLabel: "Identity & Inclusion",
    tagline: "A safe, affirming space where you are fully accepted.",
    description:
      "Our LGBTQ+ affirmative counselling provides a genuinely safe, non-judgmental, and celebratory space. Whether you're navigating coming out, identity exploration, relationship challenges, or the mental health impacts of discrimination — our affirming counsellors understand and fully support your experience.",
    approach:
      "We use an affirming, strengths-based approach that celebrates your identity, addresses minority stress, and supports your mental health without agenda or assumptions.",
    whoItsFor: [
      "LGBTQ+ individuals exploring their identity",
      "Those navigating coming out to family or workplace",
      "People experiencing minority stress or discrimination",
      "LGBTQ+ couples seeking relationship support",
    ],
    whatToExpect: [
      "A genuinely safe and affirming therapeutic relationship",
      "No assumptions — you lead, we follow",
      "Support with identity, relationships, family, and community",
      "A counsellor who truly understands your experience",
    ],
    sessionInfo: "50-minute sessions · Online & In-person · Fully confidential",
    relatedIds: ["individual-counselling", "self-esteem", "relationship-dating"],
  },
  {
    id: "grief-loss",
    icon: "🕊️",
    title: "Grief & Loss Support",
    category: "core",
    categoryLabel: "Core Support",
    tagline: "You don't have to grieve alone.",
    description:
      "Grief is not only about death — it includes the loss of a relationship, a job, a home, a sense of identity, or a version of the future you imagined. Our counsellors hold space for all types of grief without rushing you toward 'moving on'.",
    approach:
      "We draw from grief models including the Dual Process Model and narrative therapy — honoring your loss while gently supporting your capacity to re-engage with life.",
    whoItsFor: [
      "Those who have lost a loved one",
      "People grieving the end of a relationship or major life change",
      "Those experiencing anticipatory grief",
      "Anyone who feels their grief is misunderstood by those around them",
    ],
    whatToExpect: [
      "A space to grieve fully — without judgment or timeline",
      "Support in making meaning of your loss",
      "Tools for managing grief's physical and emotional symptoms",
      "Gentle re-engagement with life at your own pace",
    ],
    sessionInfo: "50-minute sessions · Online & In-person · Open-ended",
    relatedIds: ["trauma-healing", "individual-counselling", "depression-mood"],
  },
  {
    id: "anxiety-stress-burnout",
    icon: "🌊",
    title: "Anxiety, Stress & Burnout Management",
    category: "core",
    categoryLabel: "Core Support",
    tagline: "Calm the storm. Restore your energy.",
    description:
      "Anxiety, chronic stress, and burnout are among the most common reasons people seek counselling — and among the most treatable. We help you understand the roots of your anxiety, break the stress cycle, and build genuine resilience.",
    approach:
      "We use CBT, ACT (Acceptance and Commitment Therapy), mindfulness-based stress reduction, and somatic techniques to address both the mind and body's stress response.",
    whoItsFor: [
      "Those experiencing persistent worry, panic, or overwhelm",
      "Professionals experiencing workplace burnout",
      "People struggling to switch off or rest",
      "Those with social anxiety or performance anxiety",
    ],
    whatToExpect: [
      "Understanding the triggers and patterns behind your anxiety",
      "Practical tools for immediate relief and long-term management",
      "Mindfulness and grounding techniques",
      "A sustainable plan for stress resilience",
    ],
    sessionInfo: "50-minute sessions · Online & In-person · Weekly recommended",
    relatedIds: ["depression-mood", "individual-counselling", "mindfulness"],
  },
  {
    id: "depression-mood",
    icon: "🌧️",
    title: "Depression & Mood Support",
    category: "core",
    categoryLabel: "Core Support",
    tagline: "You deserve to feel like yourself again.",
    description:
      "Depression can make everything feel heavy, meaningless, or impossible. Our counsellors provide a warm, patient space where you don't have to perform wellness — just show up as you are and begin the gentle work of healing.",
    approach:
      "We use an integrated approach combining CBT, behavioural activation, interpersonal therapy, and compassion-focused therapy to address low mood from multiple angles.",
    whoItsFor: [
      "Those experiencing persistent low mood or loss of interest",
      "People who feel disconnected, empty, or hopeless",
      "Those managing depression alongside other challenges",
      "Anyone who has tried to 'push through' but can't",
    ],
    whatToExpect: [
      "A non-judgmental space — no pressure to be positive",
      "Understanding the patterns maintaining your depression",
      "Small, sustainable steps toward re-engagement with life",
      "Support for sleep, energy, motivation, and self-care",
    ],
    sessionInfo: "50-minute sessions · Online & In-person · Weekly recommended",
    relatedIds: ["anxiety-stress-burnout", "grief-loss", "self-esteem"],
  },
  {
    id: "self-esteem",
    icon: "🌟",
    title: "Self-Esteem & Confidence Building",
    category: "growth",
    categoryLabel: "Growth & Coaching",
    tagline: "Rediscover your worth. Stand in your power.",
    description:
      "Low self-esteem affects every area of life — relationships, career, daily decisions, and how you speak to yourself. Our counsellors help you identify where your self-esteem was wounded and do the deep work of rebuilding it from the inside out.",
    approach:
      "We use schema therapy, compassion-focused therapy, inner child work, and CBT to challenge core negative beliefs and build a stable, authentic sense of self-worth.",
    whoItsFor: [
      "Those who constantly doubt themselves or seek external validation",
      "People with a harsh inner critic or persistent shame",
      "Those who struggle to set boundaries or say no",
      "Anyone who has been told — directly or indirectly — that they're not enough",
    ],
    whatToExpect: [
      "Identifying the roots of your low self-esteem",
      "Challenging and rewriting negative core beliefs",
      "Building a compassionate inner voice",
      "Practical daily practices to reinforce self-worth",
    ],
    sessionInfo: "50-minute sessions · Online & In-person · 8–12 sessions recommended",
    relatedIds: ["individual-counselling", "narcissistic-abuse", "personal-development"],
  },
  {
    id: "personal-development",
    icon: "🧭",
    title: "Personal Development & Life Coaching",
    category: "growth",
    categoryLabel: "Growth & Coaching",
    tagline: "Clarity, direction, and the confidence to move forward.",
    description:
      "Sometimes you're not in crisis — you're just stuck. You know you want more but don't know how to get there. Our life direction coaching combines psychological insight with practical coaching tools to help you design and live a more intentional life.",
    approach:
      "We blend solution-focused therapy, motivational interviewing, values clarification, and strengths-based coaching to move you from stuck to purposeful.",
    whoItsFor: [
      "Those feeling purposeless, directionless, or unfulfilled",
      "People at a crossroads — career, relationships, or life path",
      "High-achievers who feel empty despite external success",
      "Anyone who wants to live more intentionally",
    ],
    whatToExpect: [
      "Deep values and strengths exploration",
      "Clarity on what you actually want — not what you 'should' want",
      "Actionable goals and accountability",
      "A renewed sense of direction and motivation",
    ],
    sessionInfo: "50-minute sessions · Online & In-person · Flexible package",
    relatedIds: ["self-esteem", "career-transition", "mindfulness"],
  },
  {
    id: "mindfulness",
    icon: "🧘",
    title: "Emotional Intelligence & Mindfulness Training",
    category: "growth",
    categoryLabel: "Growth & Coaching",
    tagline: "Feel more, react less. Live with intention.",
    description:
      "Emotional intelligence is the ability to understand, manage, and express your emotions — and to navigate relationships with empathy. Combined with mindfulness, it's one of the most transformative skills you can develop.",
    approach:
      "We use MBSR (Mindfulness-Based Stress Reduction), EQ frameworks, DBT-informed skills, and somatic practices to build lasting emotional awareness and regulation.",
    whoItsFor: [
      "Those who feel controlled by their emotions",
      "People who struggle in relationships due to emotional reactivity",
      "Professionals wanting to improve leadership and empathy",
      "Anyone wanting to develop a mindfulness practice",
    ],
    whatToExpect: [
      "Understanding your emotional triggers and patterns",
      "Practical mindfulness techniques for daily life",
      "Improved emotional regulation and self-awareness",
      "Better relationships through empathy and communication",
    ],
    sessionInfo: "50-minute sessions · Online & In-person · 6–8 sessions recommended",
    relatedIds: ["anxiety-stress-burnout", "personal-development", "self-esteem"],
  },
  {
    id: "anger-management",
    icon: "🔥",
    title: "Anger Management",
    category: "core",
    categoryLabel: "Core Support",
    tagline: "Understand your anger. Channel it wisely.",
    description:
      "Anger is not the problem — unmanaged anger is. Often anger is a secondary emotion covering pain, fear, or injustice. Our counsellors help you understand what's really driving your anger and develop healthy, assertive ways to express it.",
    approach:
      "We use CBT, emotion-focused therapy, and somatic approaches to address the physiological and psychological roots of anger — not just the surface behaviour.",
    whoItsFor: [
      "Those who feel out of control when angry",
      "People whose anger is damaging their relationships",
      "Those referred for anger management support",
      "Anyone who wants to express frustration assertively rather than aggressively",
    ],
    whatToExpect: [
      "Understanding the triggers and underlying causes of your anger",
      "Physiological techniques to de-escalate in the moment",
      "Assertiveness training and healthy expression skills",
      "Long-term strategies for emotional regulation",
    ],
    sessionInfo: "50-minute sessions · Online & In-person · 6–10 sessions typical",
    relatedIds: ["individual-counselling", "mindfulness", "anxiety-stress-burnout"],
  },
  {
    id: "addiction-habit",
    icon: "🔓",
    title: "Addiction & Habit Support",
    category: "core",
    categoryLabel: "Core Support",
    tagline: "Break the cycle. Rebuild with intention.",
    description:
      "Addictive habits — whether substances, screens, gambling, food, or relationships — are often coping mechanisms for deeper pain. Our non-clinical support helps you understand the function of your habit and build healthier alternatives.",
    approach:
      "We use motivational interviewing, CBT for addiction, and psychoeducation — working collaboratively and non-judgmentally to support lasting change.",
    whoItsFor: [
      "Those struggling with non-clinical addictive behaviours",
      "People who want to break unhealthy habits or patterns",
      "Those in early recovery seeking emotional support",
      "Anyone who feels their habits are controlling them",
    ],
    whatToExpect: [
      "A non-judgmental exploration of your relationship with the habit",
      "Understanding the emotional needs driving the behaviour",
      "Building healthier coping strategies",
      "Practical relapse prevention and resilience tools",
    ],
    sessionInfo: "50-minute sessions · Online & In-person · Ongoing support available",
    relatedIds: ["individual-counselling", "trauma-healing", "anxiety-stress-burnout"],
  },
  {
    id: "student-counselling",
    icon: "🎓",
    title: "Student Counselling",
    category: "specialist",
    categoryLabel: "Specialist Programs",
    tagline: "Support for the pressures of student life.",
    description:
      "Student life comes with unique pressures — academic stress, identity formation, social anxiety, financial worry, and the weight of expectation. Our student counselling is accessible, affordable, and tailored to where you are in life.",
    approach:
      "We use person-centred, CBT and narrative approaches — meeting students where they are and focusing on what matters most to them right now.",
    whoItsFor: [
      "Students experiencing academic pressure or exam anxiety",
      "Those navigating identity, belonging, or imposter syndrome",
      "Students dealing with homesickness or isolation",
      "Young people facing family pressure or uncertainty about the future",
    ],
    whatToExpect: [
      "A non-clinical, relatable therapeutic relationship",
      "Practical support for academic stress and time management",
      "Space to explore identity, purpose, and direction",
      "Affordable, flexible session options",
    ],
    sessionInfo: "50-minute sessions · Online & In-person · Student-friendly pricing",
    relatedIds: ["anxiety-stress-burnout", "self-esteem", "personal-development"],
  },
  {
    id: "career-transition",
    icon: "💼",
    title: "Career & Life Transition Counselling",
    category: "growth",
    categoryLabel: "Growth & Coaching",
    tagline: "Navigate change with clarity and confidence.",
    description:
      "Major transitions — changing careers, relocating, retirement, divorce, or becoming a parent — can trigger anxiety, grief, and identity confusion even when they're positive changes. We help you navigate the emotional landscape of change.",
    approach:
      "We blend transition-focused counselling, values clarification, narrative therapy, and practical coaching to help you process the old and step into the new.",
    whoItsFor: [
      "Those facing a major career change or redundancy",
      "People navigating life after divorce or relationship breakdown",
      "Those adjusting to parenthood, retirement, or relocation",
      "Anyone who feels lost in the middle of a major life change",
    ],
    whatToExpect: [
      "Processing the emotional weight of change",
      "Clarity on your values and what matters most going forward",
      "Practical tools for decision-making under uncertainty",
      "Confidence to step into the next chapter",
    ],
    sessionInfo: "50-minute sessions · Online & In-person · Flexible scheduling",
    relatedIds: ["personal-development", "self-esteem", "anxiety-stress-burnout"],
  },
  {
    id: "group-therapy",
    icon: "👥",
    title: "Group Therapy & Support Groups",
    category: "specialist",
    categoryLabel: "Specialist Programs",
    tagline: "Heal in community. You are not alone.",
    description:
      "Group therapy offers something individual counselling cannot — the lived experience of others who truly understand. Facilitated by a trained counsellor, our groups provide a safe, confidential space to share, learn, and heal together.",
    approach:
      "Our groups use interpersonal process therapy, psychoeducation, and peer support to create a powerful healing container. Groups are theme-based and carefully facilitated.",
    whoItsFor: [
      "Those who feel isolated in their struggles",
      "People who benefit from peer connection and shared experience",
      "Those who want an affordable alternative or complement to individual therapy",
      "Anyone looking for community and accountability in their healing",
    ],
    whatToExpect: [
      "A carefully screened, confidential group environment",
      "Structured sessions with a trained facilitator",
      "The healing power of being truly understood",
      "Lasting connections and community beyond sessions",
    ],
    sessionInfo: "90-minute group sessions · Online & In-person · Rolling intake",
    relatedIds: ["individual-counselling", "anxiety-stress-burnout", "self-esteem"],
  },
  {
    id: "corporate-wellness",
    icon: "🏢",
    title: "Workshops, Webinars & Corporate Wellness",
    category: "specialist",
    categoryLabel: "Specialist Programs",
    tagline: "Bring mental health to your workplace.",
    description:
      "We partner with organisations to deliver impactful mental health workshops, lunch-and-learns, webinars, and ongoing corporate wellness programs. Investing in your team's mental health drives performance, reduces absenteeism, and builds psychological safety.",
    approach:
      "We design bespoke sessions drawing from psychoeducation, stress management, emotional intelligence training, and mental health first aid — tailored to your organisation's culture and needs.",
    whoItsFor: [
      "HR teams wanting to support employee wellbeing",
      "Companies experiencing high stress or burnout culture",
      "Organisations building psychological safety",
      "Teams wanting practical mental health skills",
    ],
    whatToExpect: [
      "A needs assessment to tailor content to your team",
      "Engaging, evidence-based workshops and webinars",
      "Practical tools staff can use immediately",
      "Follow-up resources and ongoing support options",
    ],
    sessionInfo: "Flexible format · Online & In-person · Custom packages available",
    relatedIds: ["anxiety-stress-burnout", "mindfulness", "group-therapy"],
  },
];

export const getServiceById = (id: string): Service | undefined =>
  services.find((s) => s.id === id);

export const getRelatedServices = (ids: string[]): Service[] =>
  ids.map((id) => services.find((s) => s.id === id)).filter(Boolean) as Service[];

export const servicesByCategory = (category: string): Service[] =>
  services.filter((s) => s.category === category);