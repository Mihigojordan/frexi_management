import ContactForm from "../../components/landing/contact/ContactForm";
import ContactInfo from "../../components/landing/contact/ContactInfo";
import MapSection from "../../components/landing/contact/MapSection";
import HeaderBanner from "../../components/landing/HeaderBanner";

const ContactUs = () => {
    return (
        <>
            <HeaderBanner title={'Contact Us'} />
            <ContactInfo />
            <ContactForm />
            <MapSection />
        </>
    )
}

export default ContactUs;