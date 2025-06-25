const API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const callGeminiAPI = async (userMessage) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    const response = await fetch(`${API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage }] }]
        })
    });

    if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
};
