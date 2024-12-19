import React, { useState, useEffect } from 'react';
import { db } from '@/app/config/firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AdminFAQ = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ question: '', answer: '', value: `item-${questions.length+1}` });
  const [editingQuestion, setEditingQuestion] = useState(null);

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

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAddQuestions = async () => {
    try {
      const newValue = `item-${questions.length + 1}`;
      await addDoc(collection(db, 'questions'), { ...newQuestion, value: newValue });
      setNewQuestion({ question: '', answer: '', value: '' });
      await fetchQuestions();
    } catch (error) {
      console.error("Error adding question: ", error);
    }
  };

  const handleUpdateQuestions = async () => {
    if (editingQuestion) {
      try {
        await updateDoc(doc(db, 'questions', editingQuestion.id), {
          question: editingQuestion.question,
          answer: editingQuestion.answer
        });
        setEditingQuestion(null);
        await fetchQuestions();
      } catch (error) {
        console.error("Error updating question: ", error);
      }
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteDoc(doc(db, 'questions', id));
      await fetchQuestions();
    } catch (error) {
      console.error("Error deleting question: ", error);
    }
  };

  return (
    <div className="space-y-6 my-6">
      <h2 className="text-2xl font-bold">FAQ Manager</h2>
      {/* List of FAQs */}
      <div className="space-y-4">
        {questions.map((question) => (
          <div key={question.id} className="border p-4 rounded">
            {editingQuestion && editingQuestion.id === question.id ? (
              <>
                <Input
                  value={editingQuestion.question}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                />
                <Textarea
                  value={editingQuestion.answer}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, answer: e.target.value })}
                />
                <Button onClick={handleUpdateQuestions}>Save</Button>
                <Button variant="outline" onClick={() => setEditingQuestion(null)}>Cancel</Button>
              </>
            ) : (
              <>
                <h3 className="font-bold">{question.question}</h3>
                <p>{question.answer}</p>
                <Button onClick={() => setEditingQuestion(question)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDeleteQuestion(question.id)}>Delete</Button>
              </>
            )}
          </div>
        ))}
      </div>
      {/* Add new FAQ form */}
      <div className="space-y-2">
        <Input
          placeholder="Question"
          value={newQuestion.question}
          onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
        />
        <Textarea
          placeholder="Answer"
          value={newQuestion.answer}
          onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
        />
        <Button onClick={handleAddQuestions}>Add FAQ</Button>
      </div>
    </div>
  );
};

export default AdminFAQ;