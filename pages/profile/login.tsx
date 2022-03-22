import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export {default} from "@/components/Profile/Login";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, [
                "header",
                "footer",
                "profile_login",
                "routes"
            ]))
        }
    }
}
