import { getLocalStore, saveLocalStore, LocalUser, LocalModule } from './local-data';

export const localDb = {
  user: {
    findUnique: async ({ where, include }: { where: { email?: string; id?: string }; include?: any }) => {
      const store = getLocalStore();
      const user = store.users.find(
        (u) => (where.email && u.email.toLowerCase() === where.email.toLowerCase()) || (where.id && u.id === where.id)
      );
      if (!user) return null;

      const userProgress = store.progress
        .filter((p) => p.userId === user.id)
        .map((p) => ({
          ...p,
          module: store.modules.find((m) => m.id === p.moduleId) || { id: p.moduleId, title: `Module ${p.moduleId}` },
        }));

      const userBadges = (store.userBadges || [])
        .filter((ub: any) => ub.userId === user.id)
        .map((ub: any) => ({
          ...ub,
          badge: store.badges.find((b: any) => b.id === ub.badgeId) || {
            id: ub.badgeId,
            name: 'Badge',
            description: 'Achievement Badge',
            iconUrl: '',
            xpBonus: 100,
          },
        }));

      return {
        ...user,
        progress: userProgress,
        badges: userBadges,
        knowledgeCheckAttempts: (store.knowledgeCheckAttempts || []).filter((kca: any) => kca.userId === user.id),
      };
    },
    findFirst: async ({ where }: { where?: any } = {}) => {
      const store = getLocalStore();
      if (!where) return store.users[0] || null;
      const user = store.users.find((u) => {
        if (where.email && u.email.toLowerCase() !== where.email.toLowerCase()) return false;
        if (where.id && u.id !== where.id) return false;
        return true;
      });
      return user || null;
    },
    findMany: async (args?: any) => {
      const store = getLocalStore();
      let users = [...store.users];

      if (args?.orderBy) {
        if (args.orderBy.totalXP === 'desc') {
          users.sort((a, b) => b.totalXP - a.totalXP);
        } else if (args.orderBy.createdAt === 'desc') {
          users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
      }

      if (args?.take) {
        users = users.slice(0, args.take);
      }

      return users.map((u) => {
        const userProgress = store.progress
          .filter((p) => p.userId === u.id && (!args?.include?.progress?.where?.status || p.status === args.include.progress.where.status))
          .map((p) => ({
            ...p,
            module: store.modules.find((m) => m.id === p.moduleId) || { id: p.moduleId, title: `Module ${p.moduleId}` },
          }));

        const userBadges = (store.userBadges || [])
          .filter((ub: any) => ub.userId === u.id)
          .map((ub: any) => ({
            ...ub,
            badge: store.badges.find((b: any) => b.id === ub.badgeId) || null,
          }));

        return {
          ...u,
          progress: userProgress,
          badges: userBadges,
          knowledgeCheckAttempts: (store.knowledgeCheckAttempts || []).filter((kca: any) => kca.userId === u.id),
          _count: {
            progress: userProgress.length,
            badges: userBadges.length,
          },
        };
      });
    },
    create: async ({ data }: { data: any }) => {
      const store = getLocalStore();
      const newUser: LocalUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        email: data.email,
        name: data.name || null,
        password: data.password,
        role: data.role || 'STUDENT',
        totalXP: 0,
        level: 1,
        currentStreak: 0,
        lastActive: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      store.users.push(newUser);
      saveLocalStore(store);
      return newUser;
    },
    update: async ({ where, data }: { where: { id?: string; email?: string }; data: any }) => {
      const store = getLocalStore();
      const index = store.users.findIndex(
        (u) => (where.id && u.id === where.id) || (where.email && u.email === where.email)
      );
      if (index === -1) return null;

      let newXP = store.users[index].totalXP;
      if (data.totalXP?.increment) {
        newXP += data.totalXP.increment;
      } else if (data.totalXP !== undefined) {
        newXP = data.totalXP;
      }

      const updated = {
        ...store.users[index],
        ...data,
        totalXP: newXP,
        level: data.level !== undefined ? data.level : Math.floor(newXP / 1000) + 1,
        lastActive: data.lastActive || new Date(),
        updatedAt: new Date(),
      };
      store.users[index] = updated;
      saveLocalStore(store);
      return updated;
    },
    count: async (args?: any) => {
      const store = getLocalStore();
      if (args?.where?.lastActive?.gte) {
        const threshold = new Date(args.where.lastActive.gte).getTime();
        return store.users.filter((u) => new Date(u.lastActive).getTime() >= threshold).length;
      }
      return store.users.length;
    },
  },

  module: {
    findUnique: async ({ where, include }: { where: { id?: string; order?: number }; include?: any }) => {
      const store = getLocalStore();
      const mod = store.modules.find(
        (m) => (where.id !== undefined && m.id === where.id) || (where.order !== undefined && m.order === where.order)
      );
      if (!mod) return null;
      return {
        ...mod,
        topics: [
          {
            id: `${mod.id}-01`,
            moduleId: mod.id,
            title: `${mod.title} - Core Fundamentals`,
            description: `Primary concepts and threat analysis for Module ${mod.id}`,
            order: 0,
            _count: { units: 4, knowledgeChecks: 2 },
          },
          {
            id: `${mod.id}-02`,
            moduleId: mod.id,
            title: `${mod.title} - Practical Investigation`,
            description: `Operational workflows and triage procedures for Module ${mod.id}`,
            order: 1,
            _count: { units: 3, knowledgeChecks: 1 },
          },
        ],
        progress: store.progress.filter((p) => p.moduleId === mod.id),
        scenarios: [],
      };
    },
    findMany: async (args?: any) => {
      const store = getLocalStore();
      const mods = [...store.modules];
      mods.sort((a, b) => a.order - b.order);
      return mods.map((m) => {
        let prog = store.progress.filter((p) => p.moduleId === m.id);
        if (args?.select?.progress?.where?.status) {
          prog = prog.filter((p) => p.status === args.select.progress.where.status);
        } else if (args?.include?.progress?.where?.status) {
          prog = prog.filter((p) => p.status === args.include.progress.where.status);
        }
        return {
          ...m,
          _count: {
            topics: 2,
            scenarios: 1,
            progress: prog.length,
          },
          topics: [
            {
              id: `${m.id}-01`,
              moduleId: m.id,
              title: `${m.title} - Core Fundamentals`,
              order: 0,
              _count: { units: 4, knowledgeChecks: 2 },
            },
          ],
          progress: prog,
        };
      });
    },
    count: async () => {
      return getLocalStore().modules.length;
    },
  },

  topic: {
    findUnique: async ({ where }: { where: { id: string } }) => {
      const store = getLocalStore();
      const parts = where.id.split('-');
      const moduleId = parts[0] || '00';
      const mod = store.modules.find((m) => m.id === moduleId);
      return {
        id: where.id,
        moduleId,
        title: mod ? `${mod.title} - Fundamentals` : 'Security Topic',
        description: 'Key principles and operational procedures.',
        order: 0,
        module: mod,
        units: [],
        knowledgeChecks: [],
      };
    },
    findFirst: async ({ where }: { where: { moduleId: string } }) => {
      return {
        id: `${where.moduleId}-01`,
        moduleId: where.moduleId,
        title: 'Core Fundamentals',
        order: 0,
      };
    },
    findMany: async () => [],
  },

  badge: {
    findUnique: async ({ where }: { where: { id?: string; name?: string } }) => {
      const store = getLocalStore();
      return (
        store.badges.find(
          (b) =>
            (where.id && b.id === where.id) ||
            (where.name && b.name.toLowerCase() === where.name.toLowerCase())
        ) || null
      );
    },
    findMany: async () => {
      return getLocalStore().badges;
    },
    count: async () => {
      return getLocalStore().badges.length;
    },
  },

  userBadge: {
    findMany: async ({ where, include }: any = {}) => {
      const store = getLocalStore();
      const userBadges = store.userBadges || [];
      let list = where?.userId ? userBadges.filter((ub: any) => ub.userId === where.userId) : [...userBadges];
      if (include?.badge) {
        list = list.map((ub: any) => ({
          ...ub,
          badge: store.badges.find((b: any) => b.id === ub.badgeId) || null,
        }));
      }
      return list;
    },
    upsert: async ({ where, update, create }: any) => {
      const store = getLocalStore();
      if (!store.userBadges) store.userBadges = [];
      const userId = where?.userId_badgeId?.userId || create.userId;
      const badgeId = where?.userId_badgeId?.badgeId || create.badgeId;
      const existingIndex = store.userBadges.findIndex((ub: any) => ub.userId === userId && ub.badgeId === badgeId);
      if (existingIndex !== -1) {
        return store.userBadges[existingIndex];
      }
      const item = {
        id: `ub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        userId,
        badgeId,
        earnedAt: new Date().toISOString(),
      };
      store.userBadges.push(item);
      saveLocalStore(store);
      return item;
    },
  },

  knowledgeCheckAttempt: {
    findMany: async () => getLocalStore().knowledgeCheckAttempts || [],
    create: async ({ data }: any) => {
      const store = getLocalStore();
      if (!store.knowledgeCheckAttempts) store.knowledgeCheckAttempts = [];
      const item = {
        id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        ...data,
        attemptedAt: new Date().toISOString(),
      };
      store.knowledgeCheckAttempts.push(item);
      saveLocalStore(store);
      return item;
    },
  },

  progress: {
    findFirst: async ({ where }: any = {}) => {
      const store = getLocalStore();
      return (
        store.progress.find((p) => {
          if (where?.userId && p.userId !== where.userId) return false;
          if (where?.moduleId && p.moduleId !== where.moduleId) return false;
          if (where?.status && p.status !== where.status) return false;
          return true;
        }) || null
      );
    },
    findMany: async ({ where }: { where?: { userId?: string; status?: string } } = {}) => {
      const store = getLocalStore();
      let list = [...store.progress];
      if (where?.userId) {
        list = list.filter((p) => p.userId === where.userId);
      }
      if (where?.status) {
        list = list.filter((p) => p.status === where.status);
      }
      return list.map((p) => ({
        ...p,
        module: store.modules.find((m) => m.id === p.moduleId) || {
          id: p.moduleId,
          title: `Module ${p.moduleId}`,
          order: parseInt(p.moduleId, 10) || 0,
          difficulty: 'BEGINNER',
        },
      }));
    },
    findUnique: async ({ where }: { where: { userId_moduleId: { userId: string; moduleId: string } } }) => {
      const store = getLocalStore();
      return store.progress.find(
        (p) => p.userId === where.userId_moduleId.userId && p.moduleId === where.userId_moduleId.moduleId
      ) || null;
    },
    count: async (args?: any) => {
      const store = getLocalStore();
      let list = store.progress;
      if (args?.where) {
        list = list.filter((p: any) => {
          if (args.where.userId && p.userId !== args.where.userId) return false;
          if (args.where.status && p.status !== args.where.status) return false;
          if (args.where.moduleId) {
            if (args.where.moduleId.in && Array.isArray(args.where.moduleId.in)) {
              if (!args.where.moduleId.in.includes(p.moduleId)) return false;
            } else if (typeof args.where.moduleId === 'string' && p.moduleId !== args.where.moduleId) {
              return false;
            }
          }
          return true;
        });
      }
      return list.length;
    },
    upsert: async ({ where, update, create }: any) => {
      const store = getLocalStore();
      const index = store.progress.findIndex(
        (p) => p.userId === where.userId_moduleId.userId && p.moduleId === where.userId_moduleId.moduleId
      );
      if (index !== -1) {
        const currentXP = typeof store.progress[index].totalXpEarned === 'number'
          ? store.progress[index].totalXpEarned
          : parseInt(String(store.progress[index].totalXpEarned), 10) || 0;
        const inc = update.totalXpEarned?.increment
          ? Number(update.totalXpEarned.increment)
          : (typeof update.totalXpEarned === 'number' ? update.totalXpEarned : 0);
        const earnedXP = currentXP + inc;

        store.progress[index] = {
          ...store.progress[index],
          ...update,
          totalXpEarned: earnedXP,
          status: update.completionPercentage === 100 || update.status === 'COMPLETED' ? 'COMPLETED' : (update.status || store.progress[index].status),
          updatedAt: new Date(),
        };
        saveLocalStore(store);
        return store.progress[index];
      } else {
        const item = {
          id: `prog_${Date.now()}`,
          userId: where.userId_moduleId.userId,
          moduleId: where.userId_moduleId.moduleId,
          topicProgress: create.topicProgress || {},
          totalXpEarned: create.totalXpEarned || 0,
          completionPercentage: create.completionPercentage || 0,
          timeSpentMinutes: create.timeSpentMinutes || 0,
          status: create.status || 'IN_PROGRESS',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        store.progress.push(item);
        saveLocalStore(store);
        return item;
      }
    },
  },
};
