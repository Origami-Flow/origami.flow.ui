import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const AccordionComponent = (props) => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value={props.itemValue}>
                <AccordionTrigger>{props.titulo}</AccordionTrigger>
                <AccordionContent>
                    {props.descricao}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default AccordionComponent;