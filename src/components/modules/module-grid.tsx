import { ModuleCard } from './module-card';

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  difficulty: string;
  estimatedHours: number;
  resourceLabs: number;
  liveLabs: number;
  isPublished: boolean;
  isLocked: boolean;
  learningObjectives: string[];
}

interface Progress {
  moduleId: string;
  status: string;
  completionPercentage: number;
}

interface ModuleGridProps {
  modules: Module[];
  userProgress: Progress[];
}

export function ModuleGrid({ modules, userProgress }: ModuleGridProps) {
  const progressMap = new Map(
    userProgress.map(p => [p.moduleId, p])
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          module={module}
          progress={progressMap.get(module.id)}
        />
      ))}
    </div>
  );
}
