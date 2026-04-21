import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { question, classLevel, subject, examMode } = body ?? {};

    if (!question || !question.trim()) {
      return NextResponse.json(
        { error: 'Question cannot be empty.' },
        { status: 400 }
      );
    }

    if (!process.env.HF_API_TOKEN) {
      return NextResponse.json(
        {
          error: 'HF_API_TOKEN is missing.',
          details: 'Add HF_API_TOKEN to .env.local and restart the dev server.',
        },
        { status: 500 }
      );
    }

    const messages = [
      {
        role: 'system',
        content: `You are EduSolver, a pedagogy-first STEM tutor for Indian students.
The student is in ${classLevel || 'Class 10'}, studying ${subject || 'Mathematics'}, preparing for ${examMode || 'Board Exam (CBSE)'}.

You MUST respond with ONLY a valid JSON object (no markdown, no extra text) in this exact format:
{
  "steps": [
    {
      "stepNumber": 1,
      "title": "Step title",
      "explanation": "Clear explanation",
      "calculation": "Show the math/work"
    }
  ],
  "pedagogicalNote": "A teaching insight for the student",
  "commonMistake": "A common mistake students make",
  "examTip": "A tip for the exam"
}`,
      },
      {
        role: 'user',
        content: question,
      },
    ];

    const hfResponse = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'Qwen/Qwen3-32B',
        messages,
        temperature: 0.1,
        max_tokens: 2048,
      }),
    });

    const responseText = await hfResponse.text();
    console.log('HF status:', hfResponse.status);
    console.log('HF raw response:', responseText);

    if (!hfResponse.ok) {
      return NextResponse.json(
        {
          error: `Hugging Face API error (${hfResponse.status})`,
          details: responseText,
        },
        { status: 502 }
      );
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        {
          error: 'Invalid JSON returned by Hugging Face.',
          details: responseText,
        },
        { status: 502 }
      );
    }

    let content = data?.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        {
          error: 'Model returned an empty response.',
          details: data,
        },
        { status: 500 }
      );
    }

    // Qwen3 is a thinking model — strip <think>...</think> block
    if (typeof content === 'string') {
      content = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    }

    let parsedResult;
    try {
      // Extract JSON object from the response text
      const jsonMatch = typeof content === 'string' ? content.match(/\{[\s\S]*\}/) : null;
      parsedResult = jsonMatch ? JSON.parse(jsonMatch[0]) : (typeof content === 'string' ? JSON.parse(content) : content);
    } catch {
      return NextResponse.json(
        {
          error: 'Model response was not valid JSON.',
          details: content,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: parsedResult });
  } catch (error) {
    console.error('EduSolver route error:', error);

    return NextResponse.json(
      {
        error: 'An unexpected error occurred.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}