'use server';
export async function translateDocument(
  documentData: string,
  targetLang: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORKER_BACKEND_URL}/translateDocument`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({ documentData, targetLang }),
      }
    );

    if (!response.ok) {
      throw new Error('Translation failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error translating document:', error);
    return "Sorry, I couldn't translate the document. Please try again.";
  }
}

export async function chatToDocument(documentData: any, question: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORKER_BACKEND_URL}/chatToDocument`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          documentData,
          question,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch AI response');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return "Sorry, I couldn't process your request. Please try again.";
  }
}

export async function generateContent(prompt: string, documentData: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORKER_BACKEND_URL}/generateContent`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ prompt, documentData }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to generate content');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error generating content:', error);
    return "Sorry, I couldn't generate content. Please try again.";
  }
}

export async function summarizeDocument(documentData: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORKER_BACKEND_URL}/summarizeDocument`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({ documentData }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to summarize document');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error summarizing document:', error);
    return "Sorry, I couldn't summarize the document. Please try again.";
  }
}
