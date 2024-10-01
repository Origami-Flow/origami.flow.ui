import iconInstagram from "../../../assets/icon-instagram.svg"
import iconFacebook from "../../../assets/icon-facebook.svg";
import iconWhatsapp from "../../../assets/icon-whatsapp.svg";
import FooterText from "./FooterText";
import FooterSocial from "./FooterSocial";

const Footer = () => {
    const socialLinks = [
        { icon: iconInstagram, name: "Instagram", text: "@salgadotrancas" },
        { icon: iconFacebook, name: "Facebook", text: "Salgado Tranças" },
        { icon: iconWhatsapp, name: "Whatsapp", text: "(11) 91234-1234" }
    ];

    return (
        <footer className="bg-verdeprimary w-full h-[25%] flex justify-center p-6 ">
            <div className="w-3/4 flex justify-evenly items-center">
                <FooterText items={["Termos de uso", "Política de privacidade"]} />
                <hr className="border h-4/6 border-rosesecundary" />
                <FooterSocial socialLinks={socialLinks} />
                <hr className="border h-4/6 border-rosesecundary" />
                <FooterText items={["Localização", "Av. Itinguçu - Vila Ré, 518A"]} />
            </div>
        </footer>
    )
}

export default Footer;