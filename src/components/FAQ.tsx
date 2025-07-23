/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 22/07/2025 - 23:48:05
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : 
**/
/**
 * @description      : FAQ component with accordion toggle
 * @author           : kudakwashe Ellijah
 * @created          : 24/07/2025
 * 
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 24/07/2025
 * - Author          : kudakwashe Ellijah
 * - Modification    : Created FAQ component
 **/
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How do I register for the tournament?',
    answer: 'You can register by clicking the "Register Now" button and filling out the registration form.',
  },
  {
    question: 'What games are included in the tournament?',
    answer: 'The tournament features popular battle royale games. Specific titles will be announced closer to the event date.',
  },
  {
    question: 'How can I watch the tournament?',
    answer: 'The tournament will be streamed live on Twitch. A link will be provided on the event page.',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-6 sm:px-12 md:px-24 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleIndex(index)}
              className="w-full text-left px-6 py-4 bg-gray-100 hover:bg-gray-200 focus:outline-none flex justify-between items-center"
              aria-expanded={openIndex === index}
              aria-controls={`faq-panel-${index}`}
              id={`faq-header-${index}`}
            >
              <span className="font-medium">{item.question}</span>
              <span className="text-xl">{openIndex === index ? '−' : '+'}</span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-header-${index}`}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { height: 'auto', opacity: 1 },
                    collapsed: { height: 0, opacity: 0 },
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="px-6 py-4 bg-white text-gray-700"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
