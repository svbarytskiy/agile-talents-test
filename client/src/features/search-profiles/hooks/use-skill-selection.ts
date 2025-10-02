import { SKILLS } from '@/shared/constants/skills'
import { useState, useCallback, useMemo } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

export const FormSchema = z.object({
  skills: z.array(z.string()).min(1, {
    message: 'Please select at least one skill to search for..',
  }),
})
export type FormValues = z.infer<typeof FormSchema>

export const MAX_SKILLS_ALLOWED = 5

interface UseSkillSelectionProps {
  form: UseFormReturn<FormValues>
}

export function useSkillSelection({ form }: UseSkillSelectionProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const selectedSkills = form.watch('skills')

  const handleSkillSelect = useCallback(
    (skill: string) => {
      const currentSkills = form.getValues('skills')

      if (
        currentSkills.includes(skill) ||
        currentSkills.length >= MAX_SKILLS_ALLOWED
      ) {
        return
      }

      form.setValue('skills', [...currentSkills, skill], {
        shouldValidate: true,
      })

      setSearchQuery('')
    },
    [form],
  )

  const handleSkillRemove = useCallback(
    (skillToRemove: string) => {
      const currentSkills = form.getValues('skills')
      form.setValue(
        'skills',
        currentSkills.filter(skill => skill !== skillToRemove),
        { shouldValidate: true },
      )
    },
    [form],
  )

  const filteredSkills = useMemo(() => {
    if (!searchQuery) return []

    const query = searchQuery.toLowerCase().trim()

    return SKILLS.filter(
      skill =>
        skill.toLowerCase().includes(query) && !selectedSkills.includes(skill),
    )
  }, [searchQuery, selectedSkills])

  return {
    searchQuery,
    setSearchQuery,
    selectedSkills,
    handleSkillSelect,
    handleSkillRemove,
    filteredSkills,
    canSelectMore: selectedSkills.length < MAX_SKILLS_ALLOWED,
  }
}
