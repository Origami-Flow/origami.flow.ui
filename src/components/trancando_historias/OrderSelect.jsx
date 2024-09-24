import { Flex, Select } from "@radix-ui/themes";

export default function OrderSelect({ value, setValue }) {
  return (
    <Flex direction="column" maxWidth="160px">
      <Select.Root value={value} onValueChange={setValue}>
        <Select.Trigger />
        <Select.Content position="popper">
          <Select.Item value="none">Sem Ordenação</Select.Item>
          <Select.Item value="asc">Crescente</Select.Item>
          <Select.Item value="desc">Decrescente</Select.Item>
        </Select.Content>
      </Select.Root>
    </Flex>
  );
}
