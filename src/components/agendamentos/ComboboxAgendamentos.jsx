import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

export function ComboboxAgendamentos() {
    const [value, setValue] = React.useState("")
    const [inputValue, setInputValue] = React.useState("")
    const [isOpen, setIsOpen] = React.useState(false)

    React.useEffect(() => {
        console.log(value)
        setInputValue(value)
    },[value])

    return (

        <Command>
            <CommandInput value={inputValue} onInput={(e) => setInputValue(e.target.value)} onClick={() => setIsOpen(true)} placeholder="Buscar cliente..." />
            <CommandList >
                <CommandGroup className="absolute bg-white rounded-sm w-64">
                    {
                        isOpen &&
                        frameworks.map((framework) => (
                            <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setIsOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === framework.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {framework.label}
                            </CommandItem>
                        ))
                    }

                </CommandGroup>
            </CommandList>
        </Command>

    )
}
