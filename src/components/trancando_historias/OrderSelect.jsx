import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function OrderSelect({ value, setValue }) {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[180px] h-10  bg-roseprimary text-white font-semibold" > 
        <SelectValue placeholder="Selecione a Ordenação" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ordenação</SelectLabel>
          <SelectItem value="none">Sem Ordenação</SelectItem>
          <SelectItem value="asc">Crescente</SelectItem>
          <SelectItem value="desc">Decrescente</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
