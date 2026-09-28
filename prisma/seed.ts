import { PrismaClient, Difficulty } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean database
  await prisma.userBadge.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.scenarioAttempt.deleteMany();
  await prisma.scenario.deleteMany();
  await prisma.knowledgeCheckAttempt.deleteMany();
  await prisma.knowledgeCheck.deleteMany();
  await prisma.learningUnit.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.module.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Database cleaned');

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@socplatform.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
      totalXP: 0,
      level: 1,
    },
  });

  const studentUser = await prisma.user.create({
    data: {
      email: 'student@socplatform.com',
      name: 'John Analyst',
      password: hashedPassword,
      role: 'STUDENT',
      totalXP: 0,
      level: 1,
    },
  });

  console.log('✅ Users created');

  // Create all 18 modules
  const modules = [
    {
      id: '00',
      title: 'Course Orientation',
      description: 'Welcome to SOC Analyst L1. Learn about cybersecurity, SOC operations, and your learning journey.',
      order: 0,
      difficulty: Difficulty.BEGINNER,
      estimatedHours: 2,
      resourceLabs: 1,
      liveLabs: 1,
      isPublished: true,
      isLocked: false,
      learningObjectives: [
        'Understand what cybersecurity and SOC operations are',
        'Learn about SOC roles and responsibilities',
        'Develop the SOC analyst mindset',
        'Understand the course workflow'
      ],
      prerequisites: [],
    },
    {
      id: '01',
      title: 'Computer Fundamentals',
      description: 'Master the foundational computer concepts required for SOC analysis.',
      order: 1,
      difficulty: Difficulty.BEGINNER,
      estimatedHours: 10,
      resourceLabs: 3,
      liveLabs: 3,
      isPublished: true,
      isLocked: false,
      learningObjectives: [
        'Understand operating systems (Windows & Linux)',
        'Learn about processes, services, and system activity',
        'Master users, groups, and permissions',
        'Identify suspicious system activity'
      ],
      prerequisites: ['00'],
    },
    {
      id: '02',
      title: 'Networking Fundamentals',
      description: 'Build essential networking knowledge for security monitoring.',
      order: 2,
      difficulty: Difficulty.BEGINNER,
      estimatedHours: 10,
      resourceLabs: 3,
      liveLabs: 3,
      isPublished: true,
      isLocked: false,
      learningObjectives: [
        'Understand OSI and TCP/IP models',
        'Learn IP addressing, ports, and protocols',
        'Master network services (DNS, DHCP, HTTP, SSH)',
        'Understand basic network security concepts'
      ],
      prerequisites: ['01'],
    },
    {
      id: '03',
      title: 'Cybersecurity Fundamentals',
      description: 'Learn core security principles, threats, and defense concepts.',
      order: 3,
      difficulty: Difficulty.BEGINNER,
      estimatedHours: 7,
      resourceLabs: 3,
      liveLabs: 1,
      isPublished: true,
      isLocked: false,
      learningObjectives: [
        'Understand CIA triad and security principles',
        'Learn about common threats and malware types',
        'Identify attack patterns and IOCs',
        'Understand security controls'
      ],
      prerequisites: ['02'],
    },
    {
      id: '04',
      title: 'SOC Operations',
      description: 'Master the core workflows and responsibilities of a SOC Analyst L1.',
      order: 4,
      difficulty: Difficulty.INTERMEDIATE,
      estimatedHours: 6,
      resourceLabs: 3,
      liveLabs: 2,
      isPublished: true,
      isLocked: false,
      learningObjectives: [
        'Understand SOC architecture and data flow',
        'Master alert triage workflow',
        'Learn to identify false positives',
        'Classify severity and escalate properly',
        'Document investigations effectively'
      ],
      prerequisites: ['03'],
    },
    {
      id: '05',
      title: 'SIEM',
      description: 'Learn Security Information and Event Management fundamentals.',
      order: 5,
      difficulty: Difficulty.INTERMEDIATE,
      estimatedHours: 12,
      resourceLabs: 3,
      liveLabs: 4,
      isPublished: false,
      isLocked: true,
      learningObjectives: [
        'Understand SIEM architecture and purpose',
        'Learn log collection and normalization',
        'Master SIEM searches and correlation',
        'Understand detection rules and alerts'
      ],
      prerequisites: ['04'],
    },
    {
      id: '06',
      title: 'Log & Event Analysis',
      description: 'Master the art of analyzing security logs and events.',
      order: 6,
      difficulty: Difficulty.INTERMEDIATE,
      estimatedHours: 7,
      resourceLabs: 4,
      liveLabs: 2,
      isPublished: false,
      isLocked: true,
      learningObjectives: [
        'Understand log fundamentals',
        'Master Windows Event IDs',
        'Analyze Linux and network logs',
        'Correlate events across sources'
      ],
      prerequisites: ['05'],
    },
    {
      id: '07',
      title: 'Windows & Linux Security Monitoring',
      description: 'Learn to monitor and investigate endpoint security events.',
      order: 7,
      difficulty: Difficulty.INTERMEDIATE,
      estimatedHours: 8,
      resourceLabs: 3,
      liveLabs: 5,
      isPublished: false,
      isLocked: true,
      learningObjectives: [
        'Monitor Windows security events',
        'Analyze PowerShell and Sysmon logs',
        'Investigate Linux authentication',
        'Detect authentication attacks'
      ],
      prerequisites: ['06'],
    },
    {
      id: '08',
      title: 'Network Security Monitoring',
      description: 'Master network traffic analysis and threat detection.',
      order: 8,
      difficulty: Difficulty.ADVANCED,
      estimatedHours: 7,
      resourceLabs: 4,
      liveLabs: 3,
      isPublished: false,
      isLocked: true,
      learningObjectives: [
        'Analyze DNS and HTTP traffic',
        'Investigate firewall logs',
        'Use Wireshark for packet analysis',
        'Understand IDS/IPS alerts'
      ],
      prerequisites: ['07'],
    },
    {
      id: '09',
      title: 'EDR & Endpoint Monitoring',
      description: 'Learn Endpoint Detection and Response technologies.',
      order: 9,
      difficulty: Difficulty.ADVANCED,
      estimatedHours: 5,
      resourceLabs: 2,
      liveLabs: 1,
      isPublished: false,
      isLocked: true,
      learningObjectives: [
        'Understand EDR architecture',
        'Analyze endpoint telemetry',
        'Investigate process trees',
        'Respond to EDR alerts'
      ],
      prerequisites: ['08'],
    },
    {
      id: '10',
      title: 'Detection & Response Ecosystem',
      description: 'Understand the full spectrum of detection technologies.',
      order: 10,
      difficulty: Difficulty.ADVANCED,
      estimatedHours: 5,
      resourceLabs: 2,
      liveLabs: 1,
      isPublished: false,
      isLocked: true,
      learningObjectives: [
        'Understand EDR, NDR, XDR concepts',
        'Learn IDR and CDR capabilities',
        'Understand MDR service models',
        'Correlate across detection platforms'
      ],
      prerequisites: ['09'],
    },
    {
      id: '11',
      title: 'Identity, Email & Threat Intelligence',
      description: 'Master identity security, email analysis, and threat intelligence.',
      order: 11,
      difficulty: Difficulty.INTERMEDIATE,
      estimatedHours: 9,
      resourceLabs: 7,
      liveLabs: 3,
      isPublished: false,
      isLocked: true,
      learningObjectives: [
        'Understand Active Directory security',
        'Analyze phishing emails',
        'Use threat intelligence for enrichment',
        'Investigate authentication threats'
      ],
      prerequisites: ['10'],
    },
    {
      id: '12',
      title: 'SOAR & SOC Automation',
      description: 'Learn Security Orchestration, Automation and Response.',
      order: 12,
      difficulty: Difficulty.INTERMEDIATE,
      estimatedHours: 5,
      resourceLabs: 2,
      liveLabs: 1,
      isPublished: false,
      isLocked: true,
      learningObjectives: [
        'Understand SOAR concepts',
        'Learn playbook automation',
        'Understand when to automate',
        'Balance automation with human oversight'
      ],
      prerequisites: ['11'],
    },
    {
      id: '13',
      title: 'MITRE ATT&CK for SOC',
      description: 'Map security events to adversary tactics and techniques.',
      order: 13,
      difficulty: Difficulty.INTERMEDIATE,
      estimatedHours: 3,
      resourceLabs: 1,
      liveLabs: 1,
      isPublished: false,
      isLocked: true,
      learningObjectives: [
        'Understand ATT&CK framework',
        'Map evidence to techniques',
        'Use ATT&CK with SIEM and EDR',
        'Identify attack patterns'
      ],
      prerequisites: ['12'],
    },
    {
      id: '14',
      title: 'Incident Response & SOC Documentation',
      description: 'Learn incident response processes and documentation.',
      order: 14,
      difficulty: Difficulty.INTERMEDIATE,
      estimatedHours: 5,
      resourceLabs: 2,
      liveLabs: 1,
      isPublished: false,
      isLocked: true,
      learningObjectives: [
        'Understand IR lifecycle',
        'Learn L1 role in incidents',
        'Build incident timelines',
        'Document and escalate properly'
      ],
      prerequisites: ['13'],
    },
    {
      id: '15',
      title: 'OT & ICS Security',
      description: 'Understand Operational Technology security monitoring.',
      order: 15,
      difficulty: Difficulty.INTERMEDIATE,
      estimatedHours: 5,
      resourceLabs: 3,
      liveLabs: 2,
      isPublished: false,
      isLocked: true,
      learningObjectives: [
        'Understand IT vs OT differences',
        'Learn OT architecture and protocols',
        'Monitor OT networks safely',
        'Respond to OT security events'
      ],
      prerequisites: ['14'],
    },
    {
      id: '16',
      title: 'SOC L1 Investigation Scenarios',
      description: 'Apply all skills in realistic SOC investigation scenarios.',
      order: 16,
      difficulty: Difficulty.ADVANCED,
      estimatedHours: 8,
      resourceLabs: 4,
      liveLabs: 4,
      isPublished: false,
      isLocked: true,
      learningObjectives: [
        'Investigate brute force attacks',
        'Analyze phishing incidents',
        'Handle multi-source alerts',
        'Perform complete L1 investigations'
      ],
      prerequisites: ['15'],
    },
    {
      id: '17',
      title: 'Final SOC L1 Assessment',
      description: 'Demonstrate your SOC Analyst L1 capabilities.',
      order: 17,
      difficulty: Difficulty.ADVANCED,
      estimatedHours: 3,
      resourceLabs: 1,
      liveLabs: 1,
      isPublished: false,
      isLocked: true,
      learningObjectives: [
        'Pass knowledge assessment',
        'Complete resource-based investigation',
        'Perform live SOC investigation',
        'Write professional incident report'
      ],
      prerequisites: ['16'],
    },
  ];

  for (const moduleData of modules) {
    await prisma.module.create({ data: moduleData });
  }

  console.log('✅ All 18 modules created');

  // Create badges
  const badges = [
    {
      name: 'Foundation Ready',
      description: 'Complete foundational modules (0-3)',
      icon: 'foundation',
      criteria: { type: 'modules_completed', modules: ['00', '01', '02', '03'] },
      xpBonus: 500,
    },
    {
      name: 'Network Navigator',
      description: 'Master networking fundamentals',
      icon: 'network',
      criteria: { type: 'module_perfect', moduleId: '02' },
      xpBonus: 250,
    },
    {
      name: 'Alert Triage Ready',
      description: 'Complete SOC Operations module',
      icon: 'alert',
      criteria: { type: 'module_completed', moduleId: '04' },
      xpBonus: 300,
    },
    {
      name: 'Log Reader',
      description: 'Master log analysis',
      icon: 'logs',
      criteria: { type: 'module_completed', moduleId: '06' },
      xpBonus: 300,
    },
    {
      name: 'Endpoint Observer',
      description: 'Complete EDR module',
      icon: 'endpoint',
      criteria: { type: 'module_completed', moduleId: '09' },
      xpBonus: 350,
    },
    {
      name: 'Detection Explorer',
      description: 'Understand detection ecosystem',
      icon: 'detection',
      criteria: { type: 'module_completed', moduleId: '10' },
      xpBonus: 400,
    },
    {
      name: 'Incident Documenter',
      description: 'Master incident response documentation',
      icon: 'document',
      criteria: { type: 'module_completed', moduleId: '14' },
      xpBonus: 350,
    },
    {
      name: 'SOC L1 Ready',
      description: 'Complete all modules and final assessment',
      icon: 'graduate',
      criteria: { type: 'course_completed' },
      xpBonus: 1000,
    },
  ];

  for (const badgeData of badges) {
    await prisma.badge.create({ data: badgeData });
  }

  console.log('✅ Badges created');

  console.log('🎉 Database seed completed!');
  console.log(`👤 Admin: admin@socplatform.com / password123`);
  console.log(`👤 Student: student@socplatform.com / password123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
