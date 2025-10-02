import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  Button,
} from '@/shared/components/ui'
import { SelectedSkillsList } from './components/selected-skill-list'
import { SkillInput } from './components/skill-input'
import {
  type FormValues,
  FormSchema,
  useSkillSelection,
} from './hooks/use-skill-selection'
import { useProfileSearch } from '@/app/context'
import { useCallback } from 'react'

export function SearchProfilesForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      skills: [],
    },
  })

  const searchLogic = useSkillSelection({ form })
  const { performSearch } = useProfileSearch()

  const onSubmit = useCallback(
    (data: FormValues) => {
      performSearch(data.skills)
      searchLogic.setSearchQuery('')
    },
    [performSearch, searchLogic],
  )

  return (
    <div className="flex flex-col items-center md:p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
        Search Profiles
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-xl space-y-4"
        >
          <FormField
            control={form.control}
            name="skills"
            render={({ fieldState }) => (
              <FormItem>
                <div className="flex space-x-2">
                  <div className="flex-1 min-w-0">
                    <SkillInput searchLogic={searchLogic} />
                  </div>

                  <Button
                    type="submit"
                    className="h-10 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md"
                  >
                    Search
                  </Button>
                </div>
                {fieldState.error && <FormMessage />}
              </FormItem>
            )}
          />

          <SelectedSkillsList searchLogic={searchLogic} />
        </form>
      </Form>
    </div>
  )
}
