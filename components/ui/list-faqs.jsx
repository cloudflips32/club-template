'use client';

import React, {useState,useEffect} from 'react'
import { collection, query, getDocs, orderBy } from '@firebase/firestore';
import { db } from '@/app/config/firebaseConfig'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const ListFAQs = () => {
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
    </>
  )
}

export default ListFAQs
