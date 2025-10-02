import { Search, Check } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
} from '@/shared/components/ui'
import type { useSkillSelection } from '../hooks/use-skill-selection'
import { useState, useRef, useLayoutEffect } from 'react'

interface SkillInputProps {
  searchLogic: ReturnType<typeof useSkillSelection>
}

export function SkillInput({ searchLogic }: SkillInputProps) {
  const {
    searchQuery,
    setSearchQuery,
    filteredSkills,
    handleSkillSelect,
    canSelectMore,
  } = searchLogic

  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputWidth, setInputWidth] = useState(0)

  useLayoutEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.offsetWidth)
    }
  }, [open])

  const handleInputChange = (value: string) => {
    setSearchQuery(value)
    if (value.length > 0) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  const handleSelect = (skill: string) => {
    handleSkillSelect(skill)
    setOpen(false)
    inputRef.current?.focus()
  }

  const limitMessage = `A maximum of ${searchLogic.selectedSkills.length} skills selected.`

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative" ref={inputRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={canSelectMore ? 'Skills...' : limitMessage}
            className="pl-10 pr-4 h-10 w-full"
            value={searchQuery}
            onChange={e => handleInputChange(e.target.value)}
            onClick={() => setOpen(true)}
            disabled={!canSelectMore}
          />
        </div>
      </PopoverTrigger>

      {open && filteredSkills.length > 0 && canSelectMore && (
        <PopoverContent
          style={{ width: inputWidth }}
          className="p-0"
          onOpenAutoFocus={e => e.preventDefault()}
        >
          <Command>
            <CommandList>
              <CommandGroup>
                {filteredSkills.map(skill => (
                  <CommandItem
                    key={skill}
                    onSelect={() => handleSelect(skill)}
                    className="cursor-pointer"
                  >
                    <Check className="mr-2 h-4 w-4 opacity-0" />
                    {skill}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      )}

      {open && searchQuery.length > 0 && filteredSkills.length === 0 && (
        <PopoverContent
          style={{ width: inputWidth }}
          className="p-2 text-center text-muted-foreground"
        >
          Skills "{searchQuery}" not found.
        </PopoverContent>
      )}
    </Popover>
  )
}
