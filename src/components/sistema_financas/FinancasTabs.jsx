import React from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import Extrato from "./Extrato";
import Loading from "../shared/Loading";

const FinancasTabs = ({ dados, loading, error }) => {
    const [activeTab, setActiveTab] = React.useState("geral");
    const data = [
        {
            label: "Geral",
            value: "geral",
        },
        {
            label: "Receitas",
            value: "receitas",
        },
        {
            label: "Despesas",
            value: "despesas",
        }
    ];

    return (
        <Tabs value={activeTab}>
            <TabsHeader
                className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 w-full z-0"
                indicatorProps={{
                    className:
                        "bg-transparent border-b-2 border-roseprimary shadow-none rounded-none w-full",
                }}
            >
                {data.map(({ label, value }) => (
                    <Tab
                        key={value}
                        value={value}
                        onClick={() => setActiveTab(value)}
                        className={activeTab === value ? "text-gray-900" : ""}
                    >
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody className="w-full">
                {data.map(({ value }) => (
                    <TabPanel key={value} value={value}>
                        {loading ? (
                            <Loading />
                        ) : (
                            <Extrato tipoExtrato={activeTab} error={error} dados={dados} showTooltip/>
                        )}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}

export default FinancasTabs;