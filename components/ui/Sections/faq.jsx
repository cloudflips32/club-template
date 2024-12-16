import React, {useState,useEffect} from 'react'
import { collection, query, getDocs, orderBy } from '@firebase/firestore';
import { db } from '@/app/config/firebaseConfig'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsRef = collection(db, 'questions');
        const q = query(questionsRef, orderBy('value', 'asc'));
        const querySnapshot = await getDocs(q);
        const newQuestions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(newQuestions);
      } catch (error) {
        console.error("Error fetching questions: ", error)
      }
    }
    fetchQuestions()
  }, [])

  return (
    <>
      <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-6 md:px-8 mx-auto">
          <h2 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {questions.map((question) => (
              <div key={question.id}>
                <AccordionItem value={question.value}>
                  <AccordionTrigger>{question.question}</AccordionTrigger>
                  <AccordionContent>
                    {question.answer}
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  )
}

export default FAQ