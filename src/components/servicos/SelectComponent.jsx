import { Select } from "@radix-ui/themes";

export function SelectComponent({selectedType, setSelectedType}) {

    return (
        <Select.Root defaultValue={selectedType} size={"3"} onValueChange={setSelectedType} >
            <Select.Trigger radius="medium" className="bg-rosesecundary"/>
            <Select.Content>
                <Select.Item value="todos">Todos</Select.Item>
                <Select.Separator />
                <Select.Group>
                    <Select.Item value="nagô">Nagô</Select.Item>
                    <Select.Item value="lemonade">Lemonade</Select.Item>
                    <Select.Item value="ghana braids">Ghana Braids</Select.Item>
                </Select.Group>
                <Select.Separator />
                <Select.Group>
                    <Select.Item value="box braids">Box Braids</Select.Item>
                    <Select.Item value="gypsy braids">Gypsy Braids</Select.Item>
                    <Select.Item value="boho braids">Boho Braids</Select.Item>
                    <Select.Item value="knotles">Knotles</Select.Item>
                </Select.Group>
                <Select.Separator />
                <Select.Item value="faux locs">Faux Locs</Select.Item>
                <Select.Separator />
                <Select.Group>
                    <Select.Item value="twist">Twist</Select.Item>
                    <Select.Item value="barrel twist">Barrel Twist</Select.Item>
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}