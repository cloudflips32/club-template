'use client';

import React, {useState,useEffect} from 'react'
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/app/config/firebaseConfig'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const ListFAQs = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching questions from Firebase...');
        
        const questionsRef = collection(db, 'questions');
        const q = query(questionsRef, orderBy('value', 'asc'));
        const querySnapshot = await getDocs(q);
        
        console.log('Query snapshot size:', querySnapshot.size);
        
        const newQuestions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        console.log('Fetched questions:', newQuestions);
        setQuestions(newQuestions);
      } catch (error) {
        console.error("Error fetching questions: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions()
  }, [])

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto text-center py-8">
        <p className="text-white">Loading FAQs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-3xl mx-auto text-center py-8">
        <p className="text-red-400">Error loading FAQs: {error}</p>
        <p className="text-white text-sm mt-2">Check console for more details</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto text-center py-8">
        <p className="text-white">No FAQs found. Check your Firebase collection 'questions' has data.</p>
      </div>
    );
  }

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
