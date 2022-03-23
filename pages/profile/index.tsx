import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export {default} from "@/components/Profile/Index"

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, [
                "header",
                "footer",
                "profile",
                "routes"
            ]))
        }
    }
}
