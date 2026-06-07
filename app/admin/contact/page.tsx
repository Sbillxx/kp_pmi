import { getContact } from './actions';
import ContactForm from './ContactForm';

export default async function ContactAdmin() {
  const contact = await getContact();

  return (
    <div>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>Manajemen Kontak</h2>
      <ContactForm contact={contact} />
    </div>
  );
}
