import Header from "@/components/shared/Header";
import Menu from "@/components/shared/Menu";

export function NotFound() {
    return (
        <>
        <Header />
        <Menu />
        <div class="grid h-screen place-content-center bg-white px-4">
            <div class="text-center">
                <h1 class="text-9xl font-laisha text-gray-300">404</h1>
                <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>
                <p class="mt-4 text-gray-500">Não conseguimos achar essa página</p>
                <a href="/" class="mt-6 inline-block rounded bg-roseprimary px-5 py-3 text-sm font-medium text-white hover:bg-marromsecundary focus:outline-none focus:ring">
                    Voltar para página inicial
                </a>
            </div>
        </div>
        </> 
    )
}