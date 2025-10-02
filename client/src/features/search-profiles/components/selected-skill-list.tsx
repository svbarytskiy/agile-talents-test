import { X } from 'lucide-react'
import { Badge } from '@/shared/components/ui'
import {
  useSkillSelection,
  MAX_SKILLS_ALLOWED,
} from '../hooks/use-skill-selection'

interface SelectedSkillsListProps {
  searchLogic: ReturnType<typeof useSkillSelection>
}

export function SelectedSkillsList({ searchLogic }: SelectedSkillsListProps) {
  const { selectedSkills, handleSkillRemove } = searchLogic

  if (selectedSkills.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 pt-2">
      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        Chosen skills ({selectedSkills.length}/{MAX_SKILLS_ALLOWED})
      </p>
      <div className="flex flex-wrap gap-2 justify-start">
        {selectedSkills.map(skill => (
          <Badge
            key={`selected-tag-${skill}`}
            variant="secondary"
            onClick={() => handleSkillRemove(skill)}
            className="cursor-pointer px-3 py-1.5 text-sm font-medium transition-colors 
                      rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 
                      dark:bg-blue-900/50 dark:text-blue-200 dark:hover:bg-blue-900 shadow-sm"
          >
            {skill}
            <X className="ml-1 h-3 w-3" />
          </Badge>
        ))}
      </div>
    </div>
  )
}
