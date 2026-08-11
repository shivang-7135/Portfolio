import {FC, memo, useCallback, useMemo, useState} from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: FC = memo(() => {
  const defaultData = useMemo(
    () => ({
      name: '',
      email: '',
      message: '',
    }),
    [],
  );

  const [data, setData] = useState<FormData>(defaultData);

  const onChange = useCallback(
    <T extends HTMLInputElement | HTMLTextAreaElement>(event: React.ChangeEvent<T>): void => {
      const {name, value} = event.target;
      const fieldData: Partial<FormData> = {[name]: value};
      setData({...data, ...fieldData});
    },
    [data],
  );

  const handleSendMessage = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      /**
       * This is a good starting point to wire up your form submission logic
       * */
      console.log('Data to send: ', data);
    },
    [data],
  );

  const inputClasses =
    'peer w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pt-6 text-sm text-text-primary font-mono placeholder-transparent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 focus:shadow-glow-sm transition-all duration-300';
  
  const labelClasses =
    'absolute left-4 top-2 text-xs font-mono text-text-muted transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-text-muted/70 peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent pointer-events-none';

  return (
    <form className="grid min-h-[320px] grid-cols-1 gap-y-6" method="POST" onSubmit={handleSendMessage}>
      <div className="relative">
        <input 
          className={inputClasses} 
          id="name"
          name="name" 
          onChange={onChange} 
          placeholder="Your name" 
          required 
          type="text" 
          value={data.name}
        />
        <label htmlFor="name" className={labelClasses}>Your name</label>
      </div>

      <div className="relative">
        <input
          autoComplete="email"
          className={inputClasses}
          id="email"
          name="email"
          onChange={onChange}
          placeholder="Your email"
          required
          type="email"
          value={data.email}
        />
        <label htmlFor="email" className={labelClasses}>Your email</label>
      </div>

      <div className="relative">
        <textarea
          className={inputClasses}
          id="message"
          maxLength={250}
          name="message"
          onChange={onChange}
          placeholder="Your message"
          required
          rows={6}
          value={data.message}
        />
        <label htmlFor="message" className={labelClasses}>Your message</label>
      </div>

      <button
        aria-label="Submit contact form"
        className="w-max rounded-full bg-accent px-8 py-3 text-sm font-semibold font-body text-bg shadow-glow hover:bg-accent-hover hover:scale-105 hover:shadow-glow-accent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface mt-2"
        type="submit">
        Send Message
      </button>
    </form>
  );
});

ContactForm.displayName = 'ContactForm';
export default ContactForm;
