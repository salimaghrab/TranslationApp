import React, { useState } from 'react';
import axios from 'axios';

const TranslationForm = () => {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [detectedLang, setDetectedLang] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    const handleTranslate = async () => {
      setLoading(true);
      setError(''); // Reset error state
      try {
        // Use the provided Ngrok URL
        const response = await axios.post('https://a88d-34-125-244-120.ngrok-free.app/translate/', { text });
        setTranslatedText(response.data.translated_text);
        setDetectedLang(response.data.detected_language);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to translate text. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
        <h1>Text Translation</h1>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate"
          rows="4"
          cols="50"
        />
        <br />
        <button onClick={handleTranslate} disabled={loading}>
          {loading ? 'Translating...' : 'Translate'}
        </button>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {detectedLang && <p><strong>Detected Language:</strong> {detectedLang}</p>}
        {translatedText && <p><strong>Translated Text:</strong> {translatedText}</p>}
      </div>
    );
};

export default TranslationForm;
