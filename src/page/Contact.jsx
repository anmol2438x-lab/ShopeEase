import { PageToHome, ContactSection } from "../components/index";

function Contact() {
  return (
    <>
      <div className="container mx-auto">
        <PageToHome pageName={"Contact"} />
      </div>
      <ContactSection />
    </>
  );
}

export default Contact;
